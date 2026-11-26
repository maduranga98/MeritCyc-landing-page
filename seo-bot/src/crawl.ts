/** Crawls robots.txt, the sitemap and every listed page, then checks internal links and schema assets. */
import { checkDuplicates, checkPage, extractFacts, normalizeUrl, type Issue, type PageFacts } from './audit.js';

const UA = 'MeritCycSEOBot/1.0';
const TIMEOUT_MS = 15_000;
const CONCURRENCY = 5;
const SLOW_MS = 2_000;
const MAX_LINK_CHECKS = 150;

export interface CrawlResult {
  sitemapUrls: number;
  pagesCrawled: number;
  avgResponseMs: number;
  errors: number;
  warnings: number;
  issues: Issue[];
}

export interface CrawlOptions {
  /** Fetch from this origin instead of the sitemap's (e.g. a local preview); reported URLs stay canonical. */
  fetchOrigin?: string;
}

async function request(url: string, method: 'GET' | 'HEAD' = 'GET') {
  const started = Date.now();
  const res = await fetch(url, { method, redirect: 'manual', headers: { 'user-agent': UA }, signal: AbortSignal.timeout(TIMEOUT_MS) });
  return { res, ms: Date.now() - started };
}

async function pool<T, R>(items: T[], fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await fn(items[i]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, items.length) }, worker));
  return out;
}

const locs = (xml: string) => [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'));

export async function crawlSite(siteUrl: string, { fetchOrigin }: CrawlOptions = {}): Promise<CrawlResult> {
  const site = new URL(siteUrl).origin;
  const toFetch = (u: string) => (fetchOrigin ? fetchOrigin.replace(/\/$/, '') + new URL(u).pathname : u);
  const issues: Issue[] = [];
  const add = (level: Issue['level'], url: string, check: string, detail: string) => issues.push({ level, url, check, detail });

  // robots.txt
  try {
    const { res } = await request(toFetch(`${site}/robots.txt`));
    const txt = res.ok ? await res.text() : '';
    if (!res.ok) add('error', `${site}/robots.txt`, 'robots', `HTTP ${res.status}`);
    else {
      if (/^\s*disallow:\s*\/\s*$/im.test(txt)) add('error', `${site}/robots.txt`, 'robots', '"Disallow: /" blocks the whole site');
      if (!/^\s*sitemap:/im.test(txt)) add('warn', `${site}/robots.txt`, 'robots', 'No Sitemap: line');
    }
  } catch (e) {
    add('error', `${site}/robots.txt`, 'robots', (e as Error).message);
  }

  // sitemap (supports one level of sitemap index)
  let urls: string[] = [];
  try {
    const { res } = await request(toFetch(`${site}/sitemap.xml`));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    if (/<sitemapindex/i.test(xml)) {
      const children = await pool(locs(xml), async (u) => (await (await request(toFetch(u))).res.text()));
      urls = children.flatMap(locs);
    } else urls = locs(xml);
    if (!urls.length) add('error', `${site}/sitemap.xml`, 'sitemap', 'Sitemap has no URLs');
  } catch (e) {
    add('error', `${site}/sitemap.xml`, 'sitemap', (e as Error).message);
  }
  urls = [...new Set(urls)];

  // pages
  const timings: number[] = [];
  const pages = (
    await pool(urls, async (url): Promise<PageFacts | null> => {
      try {
        const { res, ms } = await request(toFetch(url));
        timings.push(ms);
        if (res.status >= 300 && res.status < 400) {
          add('error', url, 'redirect', `Sitemap URL redirects (${res.status}) to ${res.headers.get('location')}`);
          return null;
        }
        if (!res.ok) {
          add('error', url, 'status', `HTTP ${res.status}`);
          return null;
        }
        if ((res.headers.get('x-robots-tag') ?? '').includes('noindex')) add('error', url, 'noindex', 'X-Robots-Tag: noindex');
        if (ms > SLOW_MS) add('warn', url, 'slow', `Responded in ${ms} ms`);
        const facts = extractFacts(url, await res.text());
        issues.push(...checkPage(facts, url));
        return facts;
      } catch (e) {
        add('error', url, 'fetch', (e as Error).message);
        return null;
      }
    })
  ).filter((p): p is PageFacts => p !== null);

  issues.push(...checkDuplicates(pages));

  // internal links + schema assets that are not sitemap pages
  const known = new Set(urls.map(normalizeUrl));
  const linkedFrom = new Map<string, string>();
  for (const p of pages) {
    for (const l of [...p.internalLinks, ...p.schemaUrls]) if (!known.has(normalizeUrl(l)) && !linkedFrom.has(l)) linkedFrom.set(l, p.url);
  }
  await pool([...linkedFrom.keys()].slice(0, MAX_LINK_CHECKS), async (link) => {
    try {
      let { res } = await request(toFetch(link), 'HEAD');
      if (res.status === 405) ({ res } = await request(toFetch(link)));
      if (res.status >= 400) add('error', link, 'broken-link', `HTTP ${res.status}, linked from ${linkedFrom.get(link)}`);
      else if (res.status >= 300) add('warn', link, 'link-redirect', `Redirects (${res.status}), linked from ${linkedFrom.get(link)}`);
    } catch (e) {
      add('error', link, 'broken-link', `${(e as Error).message}, linked from ${linkedFrom.get(link)}`);
    }
  });

  issues.sort((a, b) => (a.level === b.level ? a.check.localeCompare(b.check) : a.level === 'error' ? -1 : 1));
  return {
    sitemapUrls: urls.length,
    pagesCrawled: pages.length,
    avgResponseMs: timings.length ? Math.round(timings.reduce((s, t) => s + t, 0) / timings.length) : 0,
    errors: issues.filter((i) => i.level === 'error').length,
    warnings: issues.filter((i) => i.level === 'warn').length,
    issues,
  };
}

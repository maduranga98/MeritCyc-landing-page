/** Pure on-page SEO checks for one HTML document — no I/O, unit tested. */
import { load } from 'cheerio';

export type Level = 'error' | 'warn';
export interface Issue { level: Level; url: string; check: string; detail: string }
export interface PageFacts {
  url: string;
  title: string;
  description: string;
  canonical: string;
  robots: string;
  h1: number;
  words: number;
  imagesWithoutAlt: number;
  internalLinks: string[];
  schemaUrls: string[];
  schemaErrors: number;
}

const LIMITS = { title: 60, descMin: 70, descMax: 160, thinWords: 300 };

const normalize = (u: string) => {
  const x = new URL(u);
  x.hash = '';
  x.search = '';
  return x.origin + (x.pathname.replace(/\/+$/, '') || '/');
};

export function extractFacts(url: string, html: string): PageFacts {
  const $ = load(html);
  const origin = new URL(url).origin;

  const schemaUrls = new Set<string>();
  let schemaErrors = 0;
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const walk = (v: unknown): void => {
        if (typeof v === 'string' && /\.(png|jpe?g|webp|svg|gif)$/i.test(v) && v.startsWith(origin)) schemaUrls.add(v);
        else if (v && typeof v === 'object') Object.values(v).forEach(walk);
      };
      walk(JSON.parse($(el).text()));
    } catch {
      schemaErrors++;
    }
  });

  const internalLinks = new Set<string>();
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') ?? '';
    if (/^(mailto:|tel:|javascript:|#)/i.test(href)) return;
    try {
      const abs = new URL(href, url);
      if (abs.origin === origin && !abs.pathname.startsWith('/_next/')) internalLinks.add(normalize(abs.href));
    } catch { /* ignore malformed href */ }
  });

  $('script, style, noscript').remove();
  return {
    url,
    title: $('head > title').first().text().trim(),
    description: $('meta[name="description"]').attr('content')?.trim() ?? '',
    canonical: $('link[rel="canonical"]').attr('href')?.trim() ?? '',
    robots: ($('meta[name="robots"]').attr('content') ?? '').toLowerCase(),
    h1: $('h1').length,
    words: $('body').text().split(/\s+/).filter(Boolean).length,
    imagesWithoutAlt: $('img:not([alt])').length,
    internalLinks: [...internalLinks],
    schemaUrls: [...schemaUrls],
    schemaErrors,
  };
}

/** Per-page checks. `canonicalUrl` is the URL as listed in the sitemap. */
export function checkPage(f: PageFacts, canonicalUrl: string): Issue[] {
  const out: Issue[] = [];
  const add = (level: Level, check: string, detail: string) => out.push({ level, url: canonicalUrl, check, detail });

  if (f.robots.includes('noindex')) add('error', 'noindex', 'Page in sitemap is set to noindex');
  if (!f.title) add('error', 'title', 'Missing <title>');
  else if (f.title.length > LIMITS.title) add('warn', 'title', `Title is ${f.title.length} chars (max ${LIMITS.title})`);
  if (!f.description) add('error', 'description', 'Missing meta description');
  else if (f.description.length > LIMITS.descMax) add('warn', 'description', `Description is ${f.description.length} chars (max ${LIMITS.descMax})`);
  else if (f.description.length < LIMITS.descMin) add('warn', 'description', `Description is only ${f.description.length} chars`);
  if (!f.canonical) add('error', 'canonical', 'Missing canonical tag');
  else if (normalize(f.canonical) !== normalize(canonicalUrl)) add('error', 'canonical', `Canonical points to ${f.canonical}`);
  if (f.h1 !== 1) add('warn', 'h1', `${f.h1} <h1> tags (expected 1)`);
  if (f.imagesWithoutAlt) add('warn', 'img-alt', `${f.imagesWithoutAlt} image(s) without alt text`);
  if (f.schemaErrors) add('error', 'schema', `${f.schemaErrors} JSON-LD block(s) fail to parse`);
  if (new URL(canonicalUrl).pathname.startsWith('/blog/') && f.words < LIMITS.thinWords) {
    add('error', 'thin-content', `Only ${f.words} words`);
  }
  return out;
}

/** Cross-page checks: duplicate titles / descriptions. */
export function checkDuplicates(pages: PageFacts[]): Issue[] {
  const out: Issue[] = [];
  for (const field of ['title', 'description'] as const) {
    const groups = new Map<string, string[]>();
    for (const p of pages) if (p[field]) groups.set(p[field], [...(groups.get(p[field]) ?? []), p.url]);
    for (const [value, urls] of groups) {
      if (urls.length > 1) {
        out.push({ level: 'warn', url: urls[0], check: `duplicate-${field}`, detail: `"${value.slice(0, 60)}" also on ${urls.slice(1).join(', ')}` });
      }
    }
  }
  return out;
}

export { normalize as normalizeUrl };

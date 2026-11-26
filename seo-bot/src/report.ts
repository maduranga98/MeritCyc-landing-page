/** Builds the weekly report object and its chat/terminal text. */
import { ctrOpportunities, movers, newEntries, pctChange, strikingDistance, totals, type Metric, type Move, type Totals } from './analyze.js';
import type { CrawlResult } from './crawl.js';
import type { Window } from './gsc.js';

export interface SearchData {
  window: { current: Window; previous: Window };
  /** Date-dimension rows: summing these matches Search Console's own totals (query/page rows double count). */
  daily: { current: Metric[]; previous: Metric[] };
  queries: { current: Metric[]; previous: Metric[] };
  pages: { current: Metric[]; previous: Metric[] };
}

export interface SeoReport {
  site: string;
  generatedAt: string;
  search?: {
    window: SearchData['window'];
    totals: { current: Totals; previous: Totals; clicksChangePct: number | null; impressionsChangePct: number | null };
    strikingDistance: Metric[];
    lowCtr: Metric[];
    queryDrops: Move[];
    queryGains: Move[];
    newQueries: Metric[];
    pageDrops: Move[];
    pageGains: Move[];
    topPages: Metric[];
  };
  searchError?: string;
  crawl?: CrawlResult;
  crawlError?: string;
}

export function buildReport(site: string, search: SearchData | Error, crawl: CrawlResult | Error): SeoReport {
  const report: SeoReport = { site, generatedAt: new Date().toISOString() };
  if (search instanceof Error) report.searchError = search.message;
  else {
    const cur = totals(search.daily.current);
    const prev = totals(search.daily.previous);
    const q = movers(search.queries.current, search.queries.previous);
    const p = movers(search.pages.current, search.pages.previous, { minImpressions: 20 });
    report.search = {
      window: search.window,
      totals: {
        current: cur,
        previous: prev,
        clicksChangePct: pctChange(cur.clicks, prev.clicks),
        impressionsChangePct: pctChange(cur.impressions, prev.impressions),
      },
      strikingDistance: strikingDistance(search.queries.current),
      lowCtr: ctrOpportunities(search.queries.current),
      queryDrops: q.drops,
      queryGains: q.gains,
      newQueries: newEntries(search.queries.current, search.queries.previous),
      pageDrops: p.drops,
      pageGains: p.gains,
      topPages: [...search.pages.current].sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions).slice(0, 10),
    };
  }
  if (crawl instanceof Error) report.crawlError = crawl.message;
  else report.crawl = crawl;
  return report;
}

/* ---------------- formatting ---------------- */

const MAX_LEN = 4000; // Telegram limit is 4096
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const num = (n: number) => n.toLocaleString('en-US');
const pct = (n: number | null) => (n === null ? 'new' : `${n > 0 ? '+' : ''}${n}%`);
const pos = (n: number | null) => (n === null ? 'gone' : n.toFixed(1));
const short = (u: string) => u.replace(/^https?:\/\/(www\.)?/, '').replace(/^meritcyc\.com/, '') || '/';

/** HTML for Telegram; pass `html = false` for plain terminal text. */
export function formatMessage(r: SeoReport, html = true): string {
  const b = (s: string) => (html ? `<b>${s}</b>` : s.toUpperCase());
  const lines: string[] = [];
  const section = (title: string, rows: string[]) => {
    if (rows.length) lines.push('', b(title), ...rows);
  };

  lines.push(b(`SEO weekly · ${esc(r.site.replace(/^https?:\/\//, ''))}`));

  if (r.search) {
    const { window: w, totals: t } = r.search;
    lines.push(
      `${w.current.start} → ${w.current.end} (vs previous 28 days)`,
      `Clicks ${num(t.current.clicks)} (${pct(t.clicksChangePct)}) · Impressions ${num(t.current.impressions)} (${pct(t.impressionsChangePct)})`,
      `Avg position ${t.current.position} (was ${t.previous.position}) · CTR ${(t.current.ctr * 100).toFixed(2)}%`,
    );
    section('🎯 Close to the top (pos 4–20)', r.search.strikingDistance.slice(0, 6).map((m) => `• ${esc(m.key)} — pos ${pos(m.position)}, ${m.impressions} impr`));
    section('✏️ Ranks well, few clicks → rewrite title', r.search.lowCtr.slice(0, 4).map((m) => `• ${esc(m.key)} — pos ${pos(m.position)}, CTR ${(m.ctr * 100).toFixed(1)}%`));
    section('📉 Dropping', [...r.search.pageDrops.slice(0, 3).map((m) => `• ${esc(short(m.key))} — ${pos(m.from)} → ${pos(m.to)}`), ...r.search.queryDrops.slice(0, 4).map((m) => `• "${esc(m.key)}" — ${pos(m.from)} → ${pos(m.to)}`)]);
    section('📈 Rising', [...r.search.pageGains.slice(0, 3).map((m) => `• ${esc(short(m.key))} — ${pos(m.from)} → ${pos(m.to)}`), ...r.search.queryGains.slice(0, 4).map((m) => `• "${esc(m.key)}" — ${pos(m.from)} → ${pos(m.to)}`)]);
    section('🆕 New queries', r.search.newQueries.slice(0, 5).map((m) => `• ${esc(m.key)} — pos ${pos(m.position)}, ${m.impressions} impr`));
  } else {
    lines.push('', `⚠️ Search Console: ${esc(r.searchError ?? 'not run')}`);
  }

  if (r.crawl) {
    const c = r.crawl;
    const icon = c.errors ? '🔴' : c.warnings ? '🟡' : '🟢';
    section(`${icon} Site health — ${c.pagesCrawled}/${c.sitemapUrls} pages, ${c.errors} errors, ${c.warnings} warnings, avg ${c.avgResponseMs} ms`,
      c.issues.slice(0, 10).map((i) => `• ${i.level === 'error' ? '❌' : '⚠️'} ${esc(short(i.url))} — ${esc(i.detail)}`));
    if (c.issues.length > 10) lines.push(`…and ${c.issues.length - 10} more (see Firestore report)`);
  } else {
    lines.push('', `⚠️ Crawl failed: ${esc(r.crawlError ?? 'not run')}`);
  }

  const text = lines.join('\n');
  return text.length > MAX_LEN ? `${text.slice(0, MAX_LEN - 20)}\n…(truncated)` : text;
}

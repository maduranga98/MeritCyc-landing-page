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

interface Section { title: string; rows: string[] }

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const num = (n: number) => n.toLocaleString('en-US');
const pct = (n: number | null) => (n === null ? 'new' : `${n > 0 ? '+' : ''}${n}%`);
const pos = (n: number | null) => (n === null ? 'gone' : n.toFixed(1));
const host = (u: string) => u.replace(/^https?:\/\//, '').replace(/\/$/, '');
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;
const short = (u: string) => u.replace(/^https?:\/\/(www\.)?meritcyc\.com/, '') || '/';

/** Report as plain-text sections (escaping happens at render time). */
function sections(r: SeoReport, maxIssues: number): { summary: string[]; sections: Section[] } {
  const summary: string[] = [];
  const out: Section[] = [];
  const add = (title: string, rows: string[]) => rows.length && out.push({ title, rows });

  if (r.search) {
    const { window: w, totals: t } = r.search;
    summary.push(
      `${w.current.start} → ${w.current.end} (vs previous 28 days)`,
      `Clicks ${num(t.current.clicks)} (${pct(t.clicksChangePct)}) · Impressions ${num(t.current.impressions)} (${pct(t.impressionsChangePct)})`,
      `Avg position ${t.current.position} (was ${t.previous.position}) · CTR ${(t.current.ctr * 100).toFixed(2)}%`,
    );
    add('🎯 Close to the top (position 4–20)', r.search.strikingDistance.slice(0, 8).map((m) => `${m.key} — pos ${pos(m.position)}, ${m.impressions} impressions`));
    add('✏️ Ranks on page 1 but few clicks → rewrite the title', r.search.lowCtr.slice(0, 5).map((m) => `${m.key} — pos ${pos(m.position)}, CTR ${(m.ctr * 100).toFixed(1)}%`));
    add('📉 Dropping', [
      ...r.search.pageDrops.slice(0, 4).map((m) => `${short(m.key)} — ${pos(m.from)} → ${pos(m.to)}`),
      ...r.search.queryDrops.slice(0, 5).map((m) => `"${m.key}" — ${pos(m.from)} → ${pos(m.to)}`),
    ]);
    add('📈 Rising', [
      ...r.search.pageGains.slice(0, 4).map((m) => `${short(m.key)} — ${pos(m.from)} → ${pos(m.to)}`),
      ...r.search.queryGains.slice(0, 5).map((m) => `"${m.key}" — ${pos(m.from)} → ${pos(m.to)}`),
    ]);
    add('🆕 New queries', r.search.newQueries.slice(0, 6).map((m) => `${m.key} — pos ${pos(m.position)}, ${m.impressions} impressions`));
    add('🏆 Top pages', r.search.topPages.slice(0, 5).map((m) => `${short(m.key)} — ${plural(m.clicks, 'click')}, ${plural(m.impressions, 'impression')}, pos ${pos(m.position)}`));
  } else {
    summary.push(`⚠️ Search Console: ${r.searchError ?? 'not run'}`);
  }

  if (r.crawl) {
    const c = r.crawl;
    const icon = c.errors ? '🔴' : c.warnings ? '🟡' : '🟢';
    const rows = c.issues.slice(0, maxIssues).map((i) => `${i.level === 'error' ? '❌' : '⚠️'} ${short(i.url)} — ${i.detail}`);
    if (c.issues.length > maxIssues) rows.push(`…and ${c.issues.length - maxIssues} more in Firestore (seoReports)`);
    out.push({ title: `${icon} Site health — ${c.pagesCrawled}/${c.sitemapUrls} pages, ${plural(c.errors, 'error')}, ${plural(c.warnings, 'warning')}, avg ${c.avgResponseMs} ms`, rows: rows.length ? rows : ['All checks passed.'] });
  } else {
    out.push({ title: '⚠️ Crawl failed', rows: [r.crawlError ?? 'not run'] });
  }
  return { summary, sections: out };
}

export function formatSubject(r: SeoReport): string {
  const health = r.crawl ? (r.crawl.errors ? `🔴 ${plural(r.crawl.errors, 'error')}` : r.crawl.warnings ? `🟡 ${plural(r.crawl.warnings, 'warning')}` : '🟢 healthy') : '⚠️ crawl failed';
  const clicks = r.search ? ` · ${num(r.search.totals.current.clicks)} clicks (${pct(r.search.totals.clicksChangePct)})` : '';
  return `SEO weekly · ${host(r.site)} · ${health}${clicks}`;
}

/** Plain text for the terminal. */
export function formatText(r: SeoReport): string {
  const { summary, sections: secs } = sections(r, 100);
  return [formatSubject(r), ...summary, ...secs.flatMap((s) => ['', s.title.toUpperCase(), ...s.rows.map((x) => `• ${x}`)])].join('\n');
}

/** Minimal, email-client-safe HTML (inline styles, single column). */
export function formatEmail(r: SeoReport): string {
  const { summary, sections: secs } = sections(r, 40);
  const font = 'font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif';
  const block = secs
    .map((s) => `<h2 style="margin:28px 0 8px;font-size:15px;color:#0f172a">${esc(s.title)}</h2>` +
      `<ul style="margin:0;padding-left:18px;color:#334155;font-size:14px;line-height:1.6">${s.rows.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`)
    .join('');
  return `<!doctype html><html><body style="margin:0;background:#f8fafc;${font}">
<div style="max-width:640px;margin:0 auto;padding:32px 24px;background:#fff">
<h1 style="margin:0 0 12px;font-size:20px;color:#0f172a">SEO weekly · ${esc(host(r.site))}</h1>
${summary.map((x) => `<p style="margin:4px 0;color:#475569;font-size:14px">${esc(x)}</p>`).join('')}
${block}
<p style="margin-top:32px;color:#94a3b8;font-size:12px">Generated ${esc(r.generatedAt.slice(0, 16).replace('T', ' '))} UTC · full report in Firestore → seoReports</p>
</div></body></html>`;
}

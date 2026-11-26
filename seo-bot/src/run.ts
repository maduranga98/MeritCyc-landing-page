/** One full run: Search Console + crawl in parallel; a failure in one still returns the other. */
import { crawlSite, type CrawlOptions } from './crawl.js';
import { query, windows } from './gsc.js';
import { buildReport, type SearchData, type SeoReport } from './report.js';

export interface RunOptions extends CrawlOptions {
  siteUrl: string;
  property: string;
  skipSearch?: boolean;
}

async function fetchSearch(property: string): Promise<SearchData> {
  const window = windows();
  const [dc, dp, qc, qp, pc, pp] = await Promise.all([
    query(property, window.current, 'date'),
    query(property, window.previous, 'date'),
    query(property, window.current, 'query'),
    query(property, window.previous, 'query'),
    query(property, window.current, 'page'),
    query(property, window.previous, 'page'),
  ]);
  return { window, daily: { current: dc, previous: dp }, queries: { current: qc, previous: qp }, pages: { current: pc, previous: pp } };
}

const asError = (e: unknown) => (e instanceof Error ? e : new Error(String(e)));

export async function runSeoReport({ siteUrl, property, skipSearch, ...crawlOpts }: RunOptions): Promise<SeoReport> {
  const [search, crawl] = await Promise.allSettled([
    skipSearch ? Promise.reject(new Error('skipped')) : fetchSearch(property),
    crawlSite(siteUrl, crawlOpts),
  ]);
  return buildReport(
    siteUrl,
    search.status === 'fulfilled' ? search.value : asError(search.reason),
    crawl.status === 'fulfilled' ? crawl.value : asError(crawl.reason),
  );
}

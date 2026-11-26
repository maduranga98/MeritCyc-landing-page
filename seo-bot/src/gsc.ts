/** Minimal Search Console client (REST + Application Default Credentials). */
import { GoogleAuth } from 'google-auth-library';
import type { Metric } from './analyze.js';

const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/webmasters.readonly'] });
const PAGE_SIZE = 25_000;

interface Row { keys: string[]; clicks: number; impressions: number; ctr: number; position: number }

export interface Window { start: string; end: string }

const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86_400_000);

/** Two back-to-back windows ending `lag` days ago (Search Console data is ~2–3 days behind). */
export function windows(days = 28, lag = 3, today = new Date()): { current: Window; previous: Window } {
  const end = addDays(today, -lag);
  const start = addDays(end, -(days - 1));
  const prevEnd = addDays(start, -1);
  return {
    current: { start: iso(start), end: iso(end) },
    previous: { start: iso(addDays(prevEnd, -(days - 1))), end: iso(prevEnd) },
  };
}

export async function query(property: string, w: Window, dimension: 'query' | 'page' | 'date'): Promise<Metric[]> {
  const client = await auth.getClient();
  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`;
  const rows: Row[] = [];
  for (let startRow = 0; ; startRow += PAGE_SIZE) {
    const { data } = await client.request<{ rows?: Row[] }>({
      url,
      method: 'POST',
      data: { startDate: w.start, endDate: w.end, dimensions: [dimension], type: 'web', rowLimit: PAGE_SIZE, startRow },
    });
    rows.push(...(data.rows ?? []));
    if ((data.rows?.length ?? 0) < PAGE_SIZE) break;
  }
  return rows.map((r) => ({
    key: r.keys[0],
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: r.ctr,
    position: Math.round(r.position * 10) / 10,
  }));
}

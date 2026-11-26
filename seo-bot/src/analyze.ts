/** Pure Search Console analysis — no I/O, unit tested. */

/** ctr is a fraction (0.05 = 5%). */
export interface Metric { key: string; clicks: number; impressions: number; ctr: number; position: number }
export interface Totals { clicks: number; impressions: number; ctr: number; position: number }
export interface Move { key: string; impressions: number; from: number | null; to: number | null; delta: number }

/** Rough organic CTR by position (1–10). Only used to flag titles that under-perform their rank. */
const EXPECTED_CTR = [0, 0.28, 0.15, 0.1, 0.07, 0.05, 0.04, 0.03, 0.025, 0.02, 0.018];

const round = (n: number, d = 1) => Math.round(n * 10 ** d) / 10 ** d;

export function totals(ms: Metric[]): Totals {
  const clicks = ms.reduce((s, m) => s + m.clicks, 0);
  const impressions = ms.reduce((s, m) => s + m.impressions, 0);
  const pos = ms.reduce((s, m) => s + m.position * m.impressions, 0);
  return {
    clicks,
    impressions,
    ctr: impressions ? round(clicks / impressions, 4) : 0,
    position: impressions ? round(pos / impressions) : 0,
  };
}

/** Queries/pages on page 1–2 that a small improvement could push into the top 3. */
export function strikingDistance(ms: Metric[], { min = 4, max = 20, minImpressions = 5, limit = 15 } = {}): Metric[] {
  return ms
    .filter((m) => m.position >= min && m.position <= max && m.impressions >= minImpressions)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, limit);
}

/** Ranking on page 1 but getting far fewer clicks than that position usually earns → rewrite title/description. */
export function ctrOpportunities(ms: Metric[], { minImpressions = 20, ratio = 0.5, limit = 10 } = {}) {
  return ms
    .filter((m) => m.position <= 10 && m.impressions >= minImpressions)
    .map((m) => ({ ...m, expectedCtr: EXPECTED_CTR[Math.max(1, Math.round(m.position))] }))
    .filter((m) => m.ctr < m.expectedCtr * ratio)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, limit);
}

/** Position changes between two windows. delta > 0 = improved (moved up). A missing side = gained/lost. */
export function movers(cur: Metric[], prev: Metric[], { minImpressions = 10, minDelta = 3, limit = 10 } = {}) {
  const before = new Map(prev.map((m) => [m.key, m]));
  const now = new Map(cur.map((m) => [m.key, m]));
  const moves: Move[] = [];
  for (const key of new Set([...now.keys(), ...before.keys()])) {
    const a = before.get(key), b = now.get(key);
    const impressions = Math.max(a?.impressions ?? 0, b?.impressions ?? 0);
    if (impressions < minImpressions) continue;
    if (a && b) {
      const delta = round(a.position - b.position);
      if (Math.abs(delta) >= minDelta) moves.push({ key, impressions, from: a.position, to: b.position, delta });
    } else if (a && !b) {
      moves.push({ key, impressions, from: a.position, to: null, delta: round(a.position - 100) }); // dropped out of results
    }
  }
  const byImpact = (x: Move, y: Move) => Math.abs(y.delta) * y.impressions - Math.abs(x.delta) * x.impressions || y.impressions - x.impressions;
  return {
    drops: moves.filter((m) => m.delta < 0).sort(byImpact).slice(0, limit),
    gains: moves.filter((m) => m.delta > 0).sort(byImpact).slice(0, limit),
  };
}

/** Queries/pages that appear now but had no impressions in the previous window. */
export function newEntries(cur: Metric[], prev: Metric[], { minImpressions = 5, limit = 10 } = {}): Metric[] {
  const seen = new Set(prev.map((m) => m.key));
  return cur
    .filter((m) => !seen.has(m.key) && m.impressions >= minImpressions)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, limit);
}

export function pctChange(now: number, before: number): number | null {
  return before ? round(((now - before) / before) * 100) : null;
}

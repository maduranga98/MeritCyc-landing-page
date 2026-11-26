import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ctrOpportunities, movers, newEntries, pctChange, strikingDistance, totals, type Metric } from './analyze.js';

const m = (key: string, impressions: number, position: number, clicks = 0): Metric => ({
  key, impressions, position, clicks, ctr: impressions ? clicks / impressions : 0,
});

test('totals weights position by impressions', () => {
  const t = totals([m('a', 90, 10, 9), m('b', 10, 50, 1)]);
  assert.deepEqual(t, { clicks: 10, impressions: 100, ctr: 0.1, position: 14 });
  assert.deepEqual(totals([]), { clicks: 0, impressions: 0, ctr: 0, position: 0 });
});

test('strikingDistance keeps pos 4–20 with enough impressions, biggest first', () => {
  const rows = [m('merit cycle', 105, 9.1), m('merit planning', 66, 7), m('top', 50, 2), m('deep', 80, 40), m('tiny', 2, 8)];
  assert.deepEqual(strikingDistance(rows).map((r) => r.key), ['merit cycle', 'merit planning']);
});

test('ctrOpportunities flags page-1 rankings with far-below-expected CTR', () => {
  const rows = [m('low', 100, 2, 1), m('fine', 100, 2, 15), m('page2', 100, 15, 0)];
  assert.deepEqual(ctrOpportunities(rows).map((r) => r.key), ['low']);
});

test('movers finds drops, gains and lost entries', () => {
  const prev = [m('down', 50, 5), m('up', 50, 30), m('lost', 40, 8), m('steady', 50, 10)];
  const cur = [m('down', 50, 15), m('up', 50, 9), m('steady', 50, 11)];
  const { drops, gains } = movers(cur, prev);
  assert.deepEqual(drops.map((d) => d.key), ['lost', 'down']);
  assert.equal(drops.find((d) => d.key === 'lost')?.to, null);
  assert.deepEqual(gains.map((g) => [g.key, g.delta]), [['up', 21]]);
});

test('newEntries and pctChange', () => {
  assert.deepEqual(newEntries([m('old', 10, 5), m('fresh', 10, 5)], [m('old', 3, 5)]).map((r) => r.key), ['fresh']);
  assert.equal(pctChange(150, 100), 50);
  assert.equal(pctChange(5, 0), null);
});

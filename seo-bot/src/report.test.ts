import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseRecipients } from './notify.js';
import { buildReport, formatEmail, formatSubject, formatText } from './report.js';

const crawl = {
  sitemapUrls: 2, pagesCrawled: 2, avgResponseMs: 50, errors: 1, warnings: 0,
  issues: [{ level: 'error' as const, url: 'https://meritcyc.com/blog/x', check: 'thin-content', detail: 'Only <80> words' }],
};

test('subject, text and email reflect crawl health and search errors', () => {
  const r = buildReport('https://meritcyc.com', new Error('403 no access'), crawl);
  assert.equal(formatSubject(r), 'SEO weekly · meritcyc.com · 🔴 1 error');
  assert.match(formatText(r), /Search Console: 403 no access/);
  const html = formatEmail(r);
  assert.match(html, /\/blog\/x — Only &lt;80&gt; words/); // escaped
  assert.doesNotMatch(html, /<80>/);
});

test('parseRecipients splits on commas, semicolons and spaces', () => {
  assert.deepEqual(parseRecipients(' a@x.com, b@y.com;c@z.com '), ['a@x.com', 'b@y.com', 'c@z.com']);
});

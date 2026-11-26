import assert from 'node:assert/strict';
import { test } from 'node:test';
import { checkDuplicates, checkPage, extractFacts } from './audit.js';

const page = (head: string, body: string) => `<!doctype html><html><head>${head}</head><body>${body}</body></html>`;
const URL_ = 'https://meritcyc.com/blog/post';
const goodHead =
  '<title>Merit Cycle Guide</title><meta name="description" content="' + 'x'.repeat(120) + '">' +
  `<link rel="canonical" href="${URL_}">` +
  '<script type="application/ld+json">{"logo":"https://meritcyc.com/logo.png","image":"https://other.com/a.png"}</script>';

test('a healthy page has no issues and its facts are extracted', () => {
  const f = extractFacts(URL_, page(goodHead, `<h1>Hi</h1><p>${'word '.repeat(400)}</p><a href="/blog/other#x">o</a><a href="https://x.com">e</a><a href="mailto:a@b.c">m</a>`));
  assert.deepEqual(checkPage(f, URL_), []);
  assert.deepEqual(f.internalLinks, ['https://meritcyc.com/blog/other']);
  assert.deepEqual(f.schemaUrls, ['https://meritcyc.com/logo.png']);
});

test('flags thin, noindex, bad canonical, long title, missing alt, broken JSON-LD', () => {
  const head = `<title>${'T'.repeat(70)}</title><meta name="robots" content="noindex"><link rel="canonical" href="https://meritcyc.com/elsewhere"><script type="application/ld+json">{bad</script>`;
  const f = extractFacts(URL_, page(head, '<h1>a</h1><h1>b</h1><img src="x.png"> short'));
  const checks = checkPage(f, URL_).map((i) => i.check).sort();
  assert.deepEqual(checks, ['canonical', 'description', 'h1', 'img-alt', 'noindex', 'schema', 'thin-content', 'title']);
});

test('trailing slash on canonical is not an error', () => {
  const f = extractFacts(URL_, page(goodHead.replace(URL_, URL_ + '/'), `<h1>a</h1>${'w '.repeat(400)}`));
  assert.equal(checkPage(f, URL_).length, 0);
});

test('duplicate titles across pages are reported once', () => {
  const a = extractFacts('https://meritcyc.com/a', page('<title>Same</title>', ''));
  const b = extractFacts('https://meritcyc.com/b', page('<title>Same</title>', ''));
  const d = checkDuplicates([a, b]);
  assert.equal(d.length, 1);
  assert.match(d[0].detail, /also on https:\/\/meritcyc.com\/b/);
});

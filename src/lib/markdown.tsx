import Link from 'next/link';
import type { ReactNode } from 'react';
import s from '@/components/blog.module.css';

export interface TocItem { id: string; text: string }
export interface FaqItem { question: string; answer: string }
export interface Rendered { nodes: ReactNode[]; toc: TocItem[]; faq: FaqItem[] }

type Block =
  | { t: 'h'; text: string }
  | { t: 'p'; text: string }
  | { t: 'ul' | 'ol'; items: string[] }
  | { t: 'table'; head: string[]; align: string[]; rows: string[][] };

export const slugify = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');

const plain = (t: string) =>
  t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*`]/g, '').replace(/\s+/g, ' ').trim();

function inline(text: string, key = ''): ReactNode[] {
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\n)/g;
  return text.split(re).filter(Boolean).map((part, i) => {
    const k = `${key}${i}`;
    if (part === '\n') return <br key={k} />;
    if (part.startsWith('**')) return <strong key={k}>{inline(part.slice(2, -2), k)}</strong>;
    if (part.startsWith('`')) return <code key={k}>{part.slice(1, -1)}</code>;
    const a = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (a) {
      return a[2].startsWith('/')
        ? <Link key={k} href={a[2]}>{a[1]}</Link>
        : <a key={k} href={a[2]} target="_blank" rel="noopener noreferrer">{a[1]}</a>;
    }
    return part;
  });
}

const cells = (l: string) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());

function parse(md: string): Block[] {
  const blocks: Block[] = [];
  const lines = md.split('\n');
  let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim() || /^---+$/.test(l.trim())) { i++; continue; }
    const h = l.match(/^#{2,4}\s+(.*)/);
    if (h) { blocks.push({ t: 'h', text: h[1].trim() }); i++; continue; }
    if (l.trim().startsWith('|') && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1] ?? '')) {
      const head = cells(l);
      const align = cells(lines[i + 1]).map((c) => (c.endsWith(':') ? (c.startsWith(':') ? 'center' : 'right') : 'left'));
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && lines[i].trim().startsWith('|')) rows.push(cells(lines[i++]));
      blocks.push({ t: 'table', head, align, rows });
      continue;
    }
    const list = l.match(/^(\s*)([-*]|\d+\.)\s+/);
    if (list) {
      const ordered = /\d/.test(list[2]);
      const items: string[] = [];
      while (i < lines.length && /^(\s*)([-*]|\d+\.)\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*([-*]|\d+\.)\s+/, ''));
        i++;
      }
      blocks.push({ t: ordered ? 'ol' : 'ul', items });
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^#{2,4}\s/.test(lines[i]) && !/^\s*([-*]|\d+\.)\s+/.test(lines[i]) && !lines[i].trim().startsWith('|')) {
      para.push(lines[i].replace(/\s{2,}$/, '')); // trailing double space = line break
      i++;
    }
    blocks.push({ t: 'p', text: para.join('\n') });
  }
  return blocks;
}

export function renderMarkdown(md: string): Rendered {
  const blocks = parse(md);
  const nodes: ReactNode[] = [];
  const toc: TocItem[] = [];
  const faq: FaqItem[] = [];
  let mode: 'normal' | 'quick' | 'faq' = 'normal';
  let quick: ReactNode[] = [];

  const flushQuick = () => {
    if (quick.length) nodes.push(<aside key={`q${nodes.length}`} className={s.quick}>{quick}</aside>);
    quick = [];
  };
  const push = (n: ReactNode) => (mode === 'quick' ? quick.push(n) : nodes.push(n));

  blocks.forEach((b, idx) => {
    const key = `b${idx}`;
    if (b.t === 'h') {
      const text = plain(b.text);
      const isQuick = /^quick answer/i.test(text);
      if (mode === 'quick') { flushQuick(); mode = 'normal'; }
      mode = isQuick ? 'quick' : /^frequently asked questions/i.test(text) ? 'faq' : 'normal';
      if (isQuick) { quick.push(<p key={key} className={s.quickLabel}>Quick answer</p>); return; }
      const id = slugify(text);
      toc.push({ id, text });
      nodes.push(<h2 key={key} id={id}>{inline(b.text, key)}</h2>);
      return;
    }
    if (b.t === 'p') {
      if (mode === 'faq') {
        const [q, ...rest] = b.text.split('\n');
        if (/^\*\*.+\*\*$/.test(q) && rest.length) {
          faq.push({ question: plain(q), answer: plain(rest.join(' ')) });
          nodes.push(
            <div key={key} className={s.faqItem}>
              <h3>{plain(q)}</h3>
              <p>{inline(rest.join('\n'), key)}</p>
            </div>,
          );
          return;
        }
      }
      // standalone bold line (e.g. "**Formula**") renders as a formula callout
      if (/^\*\*[^*]+\*\*$/.test(b.text) && /[=÷×]/.test(b.text)) {
        push(<p key={key} className={s.formula}>{plain(b.text)}</p>);
        return;
      }
      push(<p key={key}>{inline(b.text, key)}</p>);
      return;
    }
    if (b.t === 'ul' || b.t === 'ol') {
      const Tag = b.t === 'ol' ? 'ol' : 'ul';
      push(<Tag key={key}>{b.items.map((it, j) => <li key={j}>{inline(it, `${key}-${j}`)}</li>)}</Tag>);
      return;
    }
    if (b.t !== 'table') return;
    push(
      <div key={key} className={s.tableWrap}>
        <table>
          <thead><tr>{b.head.map((c, j) => <th key={j} style={{ textAlign: b.align[j] as 'left' }}>{inline(c, `${key}h${j}`)}</th>)}</tr></thead>
          <tbody>{b.rows.map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k} style={{ textAlign: b.align[k] as 'left' }}>{inline(c, `${key}-${j}-${k}`)}</td>)}</tr>)}</tbody>
        </table>
      </div>,
    );
  });
  flushQuick();
  return { nodes, toc, faq };
}

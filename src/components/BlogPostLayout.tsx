import Link from 'next/link';
import s from './blog.module.css';

export interface TocEntry { id: string; text: string }

interface BlogPostLayoutProps {
  title: string;
  date: string;
  readTime: string;
  children: React.ReactNode;
  relatedPosts: { title: string; href: string }[];
  jsonLd: object | object[];
  toc?: TocEntry[];
  sources?: { label: string; href: string }[];
}

export default function BlogPostLayout({
  title, date, readTime, children, relatedPosts, jsonLd, toc = [], sources = [],
}: BlogPostLayoutProps) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className={s.narrow}>
        <nav className={s.crumbs} aria-label="Breadcrumb">
          <Link href="/">MeritCyc</Link>
          <span aria-hidden>/</span>
          <Link href="/blog">Blog</Link>
          <span aria-hidden>/</span>
          <span aria-current="page">{title}</span>
        </nav>

        <header className={s.header}>
          <div className={s.meta}>
            {date && <time dateTime={date}>{date}</time>}
            {readTime && <span className={s.pill}>{readTime}</span>}
          </div>
          <h1 className={s.title}>{title}</h1>
          <p className={s.byline}>By the MeritCyc team</p>
        </header>

        {toc.length > 2 && (
          <nav className={s.toc} aria-label="Table of contents">
            <p>In this article</p>
            <ol>
              {toc.map((t) => (
                <li key={t.id}><a href={`#${t.id}`}>{t.text}</a></li>
              ))}
            </ol>
          </nav>
        )}

        <article className={s.prose}>{children}</article>

        {sources.length > 0 && (
          <aside className={s.sources}>
            <h2>Sources &amp; further reading</h2>
            <ul>
              {sources.map((src) => (
                <li key={src.href}>
                  <a href={src.href} target="_blank" rel="noopener noreferrer">{src.label}</a>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <div className={s.cta}>
          <p className={s.ctaKicker}>Try MeritCyc</p>
          <h2 className={s.ctaTitle}>Run your increment cycle with MeritCyc</h2>
          <p className={s.ctaText}>
            Budget simulation, criteria lock, and increment stories — built for 50–500 employee companies.
          </p>
          <Link href="/#pricing" className={s.btn}>Start Free Trial</Link>
        </div>

        {relatedPosts.length > 0 && (
          <section className={s.related}>
            <h2>Keep reading</h2>
            <div className={s.relatedList}>
              {relatedPosts.map((rp) => (
                <Link key={rp.href} href={rp.href} className={s.relatedLink}>{rp.title} &rarr;</Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}

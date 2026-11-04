import type { Metadata } from 'next';
import Link from 'next/link';
import { POSTS } from '@/lib/posts';
import s from '@/components/blog.module.css';

const TITLE = 'MeritCyc Blog — Salary Increment & Compensation Cycle Insights';
const DESC = 'Practical guides for HR Directors and CFOs on running salary increment cycles, merit budgeting, pay equity and pay transparency.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: '/blog' },
  openGraph: { title: TITLE, description: DESC, type: 'website', url: 'https://meritcyc.com/blog', images: ['https://meritcyc.com/og-image.png'] },
};

export default function BlogIndex() {
  const [featured, ...rest] = POSTS;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'MeritCyc Blog',
    description: DESC,
    url: 'https://meritcyc.com/blog',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: POSTS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://meritcyc.com/blog/${p.slug}`,
        name: p.title,
      })),
    },
  };

  return (
    <main className={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className={s.crumbs} aria-label="Breadcrumb">
        <Link href="/">MeritCyc</Link>
        <span aria-hidden>/</span>
        <span aria-current="page">Blog</span>
      </nav>

      <header className={s.hero}>
        <p className={s.eyebrow}>The MeritCyc Blog</p>
        <h1 className={s.h1}>Compensation, made clear.</h1>
        <p className={s.lead}>
          Practical guides for HR Directors and CFOs on running salary increment cycles, merit budgeting, pay equity and pay transparency.
        </p>
      </header>

      {featured && (
        <Link href={`/blog/${featured.slug}`} className={s.featured}>
          <div className={s.meta}>
            <span className={s.pill}>Latest</span>
            <time dateTime={featured.date}>{featured.date}</time>
            <span>{featured.readTime}</span>
          </div>
          <h2 className={s.featuredTitle}>{featured.title}</h2>
          <p className={s.featuredDesc}>{featured.description}</p>
          <span className={s.more}>Read the guide &rarr;</span>
        </Link>
      )}

      <p className={s.count}>{POSTS.length} articles</p>
      <div className={s.grid}>
        {rest.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={s.card}>
            <div className={s.meta}>
              <time dateTime={post.date}>{post.date}</time>
              {post.readTime && <span className={s.pill}>{post.readTime}</span>}
            </div>
            <h2 className={s.cardTitle}>{post.title}</h2>
            <p className={s.cardDesc}>{post.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

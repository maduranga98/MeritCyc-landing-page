import type { Metadata } from 'next';
import Link from 'next/link';
import { POSTS } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'MeritCyc Blog — Salary Increment & Compensation Cycle Insights',
  description: 'Practical guides for HR Directors and CFOs on running salary increment cycles, merit budgeting, and pay transparency.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'MeritCyc Blog — Salary Increment & Compensation Cycle Insights',
    description: 'Practical guides for HR Directors and CFOs on running salary increment cycles, merit budgeting, and pay transparency.',
    type: 'website',
    url: 'https://meritcyc-landing.web.app/blog',
    images: ['https://meritcyc-landing.web.app/og-image.png'],
  },
};

export default function BlogIndex() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px 120px' }}>
      {/* Nav back */}
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 14,
          color: 'var(--emerald)',
          fontWeight: 600,
          textDecoration: 'none',
          marginBottom: 32,
        }}
      >
        &larr; Back to MeritCyc
      </Link>

      <h1
        style={{
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 700,
          color: 'var(--navy)',
          letterSpacing: '-0.02em',
          marginBottom: 16,
        }}
      >
        MeritCyc Blog
      </h1>
      <p
        style={{
          fontSize: 18,
          color: 'var(--slate-500)',
          lineHeight: 1.7,
          marginBottom: 48,
          maxWidth: 600,
        }}
      >
        Practical guides for HR Directors and CFOs on running salary increment
        cycles, merit budgeting, and pay transparency.
      </p>

      {/* Post cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{
              display: 'block',
              background: 'white',
              border: '1px solid var(--slate-200)',
              borderRadius: 12,
              padding: '28px 32px',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--slate-400)',
                  letterSpacing: '0.04em',
                }}
              >
                {post.date}
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--emerald)',
                  background: '#D1FAE5',
                  padding: '2px 8px',
                  borderRadius: 4,
                  fontWeight: 600,
                }}
              >
                {post.readTime}
              </span>
            </div>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: 'var(--navy)',
                marginBottom: 8,
                letterSpacing: '-0.01em',
              }}
            >
              {post.title}
            </h2>
            <p
              style={{
                fontSize: 15,
                color: 'var(--slate-500)',
                lineHeight: 1.7,
              }}
            >
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}

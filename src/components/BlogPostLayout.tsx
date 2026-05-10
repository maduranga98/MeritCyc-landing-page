'use client';

import Link from 'next/link';

interface BlogPostLayoutProps {
  title: string;
  date: string;
  readTime: string;
  children: React.ReactNode;
  relatedPosts: { title: string; href: string }[];
  jsonLd: object;
}

export default function BlogPostLayout({ title, date, readTime, children, relatedPosts, jsonLd }: BlogPostLayoutProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '80px 24px 120px' }}>
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

        {/* Post header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span
              style={{
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                color: 'var(--slate-400)',
                letterSpacing: '0.04em',
              }}
            >
              {date}
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
              {readTime}
            </span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(26px, 4vw, 36px)',
              fontWeight: 700,
              color: 'var(--navy)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>
        </div>

        {/* Post body */}
        <div style={{ fontSize: 16, color: 'var(--slate-600)', lineHeight: 1.8 }}>
          {children}
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: 56,
            background: 'var(--navy)',
            borderRadius: 12,
            padding: '32px 28px',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'var(--emerald)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
            Try MeritCyc
          </p>
          <h3 style={{ color: 'white', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
            Run your increment cycle with MeritCyc
          </h3>
          <p style={{ color: 'var(--slate-400)', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
            Budget simulation, criteria lock, and increment stories — built for 50–500 employee companies.
          </p>
          <Link
            href="/#pricing"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#10B981',
              color: 'white',
              fontWeight: 600,
              padding: '12px 24px',
              borderRadius: 10,
              textDecoration: 'none',
              fontSize: 15,
              fontFamily: 'var(--font-main)',
            }}
          >
            Start Free Trial
          </Link>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--navy)', marginBottom: 16 }}>
              Related posts
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.href}
                  href={rp.href}
                  style={{
                    fontSize: 15,
                    color: 'var(--emerald)',
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  {rp.title} &rarr;
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

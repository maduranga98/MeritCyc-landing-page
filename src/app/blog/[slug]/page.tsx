import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostLayout from '@/components/BlogPostLayout';
import { POSTS, getAllJsonSlugs, getJsonPost } from '@/lib/posts';

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllJsonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getJsonPost(slug);
  if (!post) return {};
  const url = `https://meritcyc-landing.web.app/blog/${slug}`;
  return {
    title: post.meta.title,
    description: post.meta.meta_description,
    keywords: post.meta.meta_keywords,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.meta.title,
      description: post.meta.meta_description,
      type: 'article',
      url,
      images: ['https://meritcyc-landing.web.app/og-image.png'],
    },
  };
}

function renderBody(text: string, keyPrefix: string) {
  // Split on blank lines into paragraphs; preserve list-like lines.
  const blocks = text.split(/\n\n+/);
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    const lines = trimmed.split('\n');
    const isList = lines.every((l) => /^\s*[-*]\s+/.test(l) || /^\s*\d+\.\s+/.test(l));
    if (isList) {
      const ordered = /^\s*\d+\.\s+/.test(lines[0]);
      const Tag = ordered ? 'ol' : 'ul';
      return (
        <Tag key={`${keyPrefix}-${i}`} style={{ paddingLeft: 24, marginBottom: 20 }}>
          {lines.map((l, j) => (
            <li key={j} style={{ marginBottom: 8 }}>
              {renderInline(l.replace(/^\s*(?:[-*]|\d+\.)\s+/, ''))}
            </li>
          ))}
        </Tag>
      );
    }
    return (
      <p key={`${keyPrefix}-${i}`} style={{ marginBottom: 20 }}>
        {renderInline(trimmed)}
      </p>
    );
  });
}

function renderInline(text: string): React.ReactNode {
  // Minimal **bold** support.
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getJsonPost(slug);
  if (!post) notFound();

  const summary = POSTS.find((p) => p.slug === slug);
  const title = post.content.h1 || post.meta.title;
  const date = post.content.suggested_publish_date ?? '';
  const readTime = post.content.reading_time_minutes
    ? `${post.content.reading_time_minutes} min read`
    : '';

  const related = POSTS.filter((p) => p.slug !== slug)
    .slice(0, 3)
    .map((p) => ({ title: p.title, href: `/blog/${p.slug}` }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: post.meta.meta_description,
    datePublished: date,
    author: { '@type': 'Organization', name: 'MeritCyc' },
    publisher: {
      '@type': 'Organization',
      name: 'Lumora Ventures PVT LTD',
      logo: { '@type': 'ImageObject', url: 'https://meritcyc-landing.web.app/logo.png' },
    },
    image: 'https://meritcyc-landing.web.app/og-image.png',
    mainEntityOfPage: `https://meritcyc-landing.web.app/blog/${slug}`,
  };

  return (
    <BlogPostLayout
      title={title}
      date={date}
      readTime={readTime || summary?.readTime || ''}
      relatedPosts={related}
      jsonLd={jsonLd}
    >
      {post.content.intro && (
        <p
          style={{
            fontSize: 18,
            color: 'var(--slate-600)',
            marginBottom: 28,
            lineHeight: 1.7,
          }}
        >
          {post.content.intro}
        </p>
      )}

      {post.content.sections?.map((section, i) => (
        <section key={i} style={{ marginBottom: 32 }}>
          {section.h2 && (
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: 'var(--navy)',
                marginTop: 40,
                marginBottom: 16,
                letterSpacing: '-0.01em',
              }}
            >
              {section.h2}
            </h2>
          )}
          {section.h3 && (
            <h3
              style={{
                fontSize: 19,
                fontWeight: 600,
                color: 'var(--navy)',
                marginTop: 28,
                marginBottom: 12,
              }}
            >
              {section.h3}
            </h3>
          )}
          {section.body && renderBody(section.body, `s${i}`)}
        </section>
      ))}

      {post.content.cta && (
        <aside
          style={{
            marginTop: 48,
            padding: '28px 32px',
            background: '#F0FDF4',
            border: '1px solid #D1FAE5',
            borderRadius: 12,
          }}
        >
          {post.content.cta.heading && (
            <h3
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: 'var(--navy)',
                marginBottom: 12,
              }}
            >
              {post.content.cta.heading}
            </h3>
          )}
          {post.content.cta.body && (
            <p style={{ marginBottom: 16, color: 'var(--slate-600)', lineHeight: 1.7 }}>
              {post.content.cta.body}
            </p>
          )}
          {post.content.cta.button_text && post.content.cta.button_url && (
            <a
              href={post.content.cta.button_url}
              style={{
                display: 'inline-block',
                background: 'var(--emerald)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: 8,
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: 14,
              }}
            >
              {post.content.cta.button_text}
            </a>
          )}
        </aside>
      )}
    </BlogPostLayout>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostLayout from '@/components/BlogPostLayout';
import { getAllDynamicSlugs, getJsonPost, getMarkdownPost, getRelated } from '@/lib/posts';
import { renderMarkdown } from '@/lib/markdown';
import s from '@/components/blog.module.css';

interface Params {
  params: Promise<{ slug: string }>;
}

const SITE = 'https://meritcyc.com';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllDynamicSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const md = getMarkdownPost(slug);
  const json = getJsonPost(slug);
  const title = md?.seoTitle ?? json?.meta.title;
  const description = md?.description ?? json?.meta.meta_description;
  if (!title || !description) return {};
  return {
    title,
    description,
    keywords: md?.keywords ?? json?.meta.meta_keywords,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { title, description, type: 'article', url: `${SITE}/blog/${slug}`, images: [`${SITE}/og-image.png`] },
    twitter: { card: 'summary_large_image', title, description },
  };
}

const publisher = {
  '@type': 'Organization',
  name: 'Lumora Ventures PVT LTD',
  logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
};

function breadcrumbs(title: string, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'MeritCyc', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 3, name: title, item: `${SITE}/blog/${slug}` },
    ],
  };
}

/* ---- JSON-backed posts: simple paragraph / list renderer ---- */

function renderInline(text: string): React.ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    /^\*\*[^*]+\*\*$/.test(part) ? <strong key={i}>{part.slice(2, -2)}</strong> : <span key={i}>{part}</span>,
  );
}

function renderBody(text: string, keyPrefix: string) {
  return text.split(/\n\n+/).map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    const lines = trimmed.split('\n');
    if (lines.every((l) => /^\s*[-*]\s+/.test(l) || /^\s*\d+\.\s+/.test(l))) {
      const Tag = /^\s*\d+\.\s+/.test(lines[0]) ? 'ol' : 'ul';
      return (
        <Tag key={`${keyPrefix}-${i}`}>
          {lines.map((l, j) => <li key={j}>{renderInline(l.replace(/^\s*(?:[-*]|\d+\.)\s+/, ''))}</li>)}
        </Tag>
      );
    }
    return <p key={`${keyPrefix}-${i}`}>{renderInline(trimmed)}</p>;
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;

  /* ---- Markdown posts ---- */
  const md = getMarkdownPost(slug);
  if (md) {
    const { nodes, toc, faq } = renderMarkdown(md.body);
    const related = getRelated(slug, md.related).map((p) => ({ title: p.title, href: `/blog/${p.slug}` }));
    const jsonLd = [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: md.title,
        description: md.description,
        datePublished: md.date,
        dateModified: md.date,
        keywords: md.keywords.join(', '),
        author: { '@type': 'Organization', name: 'MeritCyc', url: SITE },
        publisher,
        image: `${SITE}/og-image.png`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/blog/${slug}` },
      },
      breadcrumbs(md.title, slug),
      ...(faq.length
        ? [{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }]
        : []),
    ];
    return (
      <BlogPostLayout
        title={md.title}
        date={md.date}
        readTime={md.readTime}
        relatedPosts={related}
        jsonLd={jsonLd}
        toc={toc}
        sources={md.sources}
      >
        {nodes}
      </BlogPostLayout>
    );
  }

  /* ---- JSON posts ---- */
  const post = getJsonPost(slug);
  if (!post) notFound();

  const title = post.content.h1 || post.meta.title;
  const date = post.content.suggested_publish_date ?? '';
  const readTime = post.content.reading_time_minutes ? `${post.content.reading_time_minutes} min read` : '';
  const related = getRelated(slug).map((p) => ({ title: p.title, href: `/blog/${p.slug}` }));
  const toc = (post.content.sections ?? []).flatMap((sec, i) =>
    sec.h2 ? [{ id: `section-${i}`, text: sec.h2 }] : [],
  );

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: post.meta.meta_description,
      datePublished: date,
      author: { '@type': 'Organization', name: 'MeritCyc' },
      publisher,
      image: `${SITE}/og-image.png`,
      mainEntityOfPage: `${SITE}/blog/${slug}`,
    },
    breadcrumbs(title, slug),
  ];

  return (
    <BlogPostLayout title={title} date={date} readTime={readTime} relatedPosts={related} jsonLd={jsonLd} toc={toc}>
      {post.content.intro && <p style={{ fontSize: 19, color: 'var(--slate-500)', marginBottom: 28 }}>{post.content.intro}</p>}

      {post.content.sections?.map((section, i) => (
        <section key={i}>
          {section.h2 && <h2 id={`section-${i}`}>{section.h2}</h2>}
          {section.h3 && <h3 style={{ fontSize: 19, fontWeight: 600, color: 'var(--navy)', margin: '28px 0 12px' }}>{section.h3}</h3>}
          {section.body && renderBody(section.body, `s${i}`)}
        </section>
      ))}

      {post.content.cta && (
        <aside className={s.quick} style={{ marginTop: 48 }}>
          {post.content.cta.heading && <p className={s.quickLabel} style={{ marginBottom: 8 }}>{post.content.cta.heading}</p>}
          {post.content.cta.body && <p>{post.content.cta.body}</p>}
          {post.content.cta.button_text && post.content.cta.button_url && (
            <a href={post.content.cta.button_url} className={s.btn} style={{ color: '#fff', textDecoration: 'none' }}>
              {post.content.cta.button_text}
            </a>
          )}
        </aside>
      )}
    </BlogPostLayout>
  );
}

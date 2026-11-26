import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostLayout from '@/components/BlogPostLayout';
import { getAllDynamicSlugs, getJsonPost, getMarkdownPost, getRelated, jsonPostContent } from '@/lib/posts';
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
  logo: { '@type': 'ImageObject', url: `${SITE}/meritcyclogo.png` },
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

  /* ---- JSON posts (same renderer as markdown posts: tables, FAQ, TOC) ---- */
  const post = getJsonPost(slug);
  if (!post) notFound();

  const { h1, intro, sections } = jsonPostContent(post);
  const title = h1 || post.meta.title;
  const date = post.content.suggested_publish_date ?? '';
  const readTime = post.content.reading_time_minutes ? `${post.content.reading_time_minutes} min read` : '';
  const related = getRelated(slug).map((p) => ({ title: p.title, href: `/blog/${p.slug}` }));
  const markdown = sections
    .map((sec) => [sec.h2 && `## ${sec.h2}`, sec.h3 && `### ${sec.h3}`, sec.body].filter(Boolean).join('\n\n'))
    .join('\n\n');
  const { nodes, toc, faq } = renderMarkdown(markdown);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description: post.meta.meta_description,
      datePublished: date,
      dateModified: date,
      keywords: (post.meta.meta_keywords ?? []).join(', '),
      author: { '@type': 'Organization', name: 'MeritCyc', url: SITE },
      publisher,
      image: `${SITE}/og-image.png`,
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/blog/${slug}` },
    },
    breadcrumbs(title, slug),
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
    <BlogPostLayout title={title} date={date} readTime={readTime} relatedPosts={related} jsonLd={jsonLd} toc={toc}>
      {intro && <p className={s.lead}>{intro}</p>}
      {nodes}
    </BlogPostLayout>
  );
}

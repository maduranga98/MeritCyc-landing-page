import { MetadataRoute } from 'next';
import { POSTS } from '@/lib/posts';

export const dynamic = 'force-static';

const BASE = 'https://meritcyc.com';

// URLs must match each page's canonical exactly (no trailing slash, except the root),
// otherwise Search Console reports "Page with redirect" / "Alternate page with proper canonical".
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ];
  const posts: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.date || undefined,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  return [...pages, ...posts];
}

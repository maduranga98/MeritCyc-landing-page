import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://meritcyc.com', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: 'https://meritcyc.com/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://meritcyc.com/privacy-policy', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://meritcyc.com/terms', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://meritcyc.com/blog/salary-increment-management-software', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://meritcyc.com/blog/merit-cycle-best-practices', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://meritcyc.com/blog/compensation-budget-simulation', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://meritcyc.com/blog/criteria-lock-compensation', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://meritcyc.com/blog/spreadsheet-vs-compensation-software', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://meritcyc.com/blog/cfo-guide-merit-cycles', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];
}

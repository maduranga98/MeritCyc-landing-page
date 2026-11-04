import fs from 'node:fs';
import path from 'node:path';
import blogData from '@/app/blog/data.json';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  keywords: string[];
  content: React.ReactNode;
}

export type PostSummary = Omit<BlogPost, 'content'>;

const STATIC_POSTS: PostSummary[] = [
  {
    slug: 'salary-increment-management-software',
    title: 'What Is Salary Increment Management Software? A 2026 Buyer Guide',
    description: 'A complete guide to salary increment management software for HR Directors and CFOs at 50–500 employee companies. Covers features, pricing, and how to choose.',
    date: '2026-05-06',
    readTime: '12 min read',
    keywords: ['salary increment management software', 'increment cycle software', 'merit cycle software', 'compensation planning software'],
  },
  {
    slug: 'merit-cycle-best-practices',
    title: 'How to Run a Merit Cycle in 2026: Step-by-Step Best Practices',
    description: 'A practical guide to running a merit cycle from setup to employee communication. Covers criteria design, budget simulation, criteria lock, and increment stories.',
    date: '2026-05-06',
    readTime: '14 min read',
    keywords: ['merit cycle best practices', 'merit cycle software', 'how to run a merit cycle', 'compensation cycle management'],
  },
  {
    slug: 'compensation-budget-simulation',
    title: 'Compensation Budget Simulation: How to Model Merit Cycle Costs Before You Commit',
    description: 'Learn how compensation budget simulation helps HR and finance teams model merit cycle costs before publishing criteria — eliminating budget surprises and overruns.',
    date: '2026-05-06',
    readTime: '10 min read',
    keywords: ['compensation budget simulation', 'merit cycle budget simulator', 'salary increment budget planning', 'budget simulation compensation'],
  },
  {
    slug: 'criteria-lock-compensation',
    title: 'Criteria Lock in Compensation Cycles: Why It Matters and How It Works',
    description: 'Criteria lock prevents mid-cycle changes to increment criteria after publication. Learn why it is essential for employee trust, pay equity, and compensation governance.',
    date: '2026-05-06',
    readTime: '9 min read',
    keywords: ['criteria lock compensation', 'increment criteria lock', 'compensation governance', 'merit cycle criteria management'],
  },
  {
    slug: 'spreadsheet-vs-compensation-software',
    title: 'Spreadsheets vs Compensation Software: The Real Cost Comparison for Mid-Size Companies',
    description: 'A practical cost and risk comparison of managing salary increment cycles in spreadsheets versus dedicated compensation management software. Built for 50–500 employee teams.',
    date: '2026-05-06',
    readTime: '11 min read',
    keywords: ['spreadsheet vs compensation software', 'salary increment software vs spreadsheet', 'compensation software for mid-size companies', 'merit cycle software ROI'],
  },
  {
    slug: 'cfo-guide-merit-cycles',
    title: "The CFO's Guide to Salary Increment Cycles: Budget Control, Governance, and ROI",
    description: 'A finance-first guide to salary increment cycles for CFOs and VP Finance. Covers budget simulation, criteria governance, pay equity compliance, and the ROI of structured increment management.',
    date: '2026-05-06',
    readTime: '13 min read',
    keywords: ['CFO compensation planning', 'salary increment budget control', 'compensation software for CFO', 'merit cycle budget governance', 'increment cycle finance'],
  },
];

/* ---------- JSON-backed posts (src/app/blog/data.json) ---------- */

interface JsonBlogPost {
  meta: { slug: string; title: string; meta_description: string; meta_keywords?: string[] };
  content: {
    suggested_publish_date?: string;
    reading_time_minutes?: number;
    h1?: string;
    intro?: string;
    sections?: Array<{ h2?: string; h3?: string; body?: string }>;
    cta?: { heading?: string; body?: string; button_text?: string; button_url?: string };
  };
}

const JSON_POSTS_RAW = (blogData as { blog_posts: JsonBlogPost[] }).blog_posts;

const jsonPostSummaries: PostSummary[] = JSON_POSTS_RAW.map((p) => ({
  slug: p.meta.slug,
  title: p.meta.title,
  description: p.meta.meta_description,
  date: p.content.suggested_publish_date ?? '',
  readTime: p.content.reading_time_minutes ? `${p.content.reading_time_minutes} min read` : '',
  keywords: p.meta.meta_keywords ?? [],
}));

/* ---------- Markdown-backed posts (src/content/blog/*.md) ---------- */

export interface MarkdownPost extends PostSummary {
  seoTitle: string;
  order: number;
  intent: string;
  body: string;
  related: { label: string; href: string }[];
  sources: { label: string; href: string }[];
}

const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog');

function loadMarkdownPosts(): MarkdownPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      // File format: "---\n{json frontmatter}\n---\n{markdown body}"
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
      const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (!m) throw new Error(`Invalid frontmatter in ${file}`);
      const fm = JSON.parse(m[1]);
      const body = m[2].trim();
      const minutes = Math.max(1, Math.round(body.split(/\s+/).length / 220));
      return { ...fm, body, readTime: `${minutes} min read` } as MarkdownPost;
    });
}

const MARKDOWN_POSTS = loadMarkdownPosts();

const toSummary = ({ slug, title, description, date, readTime, keywords }: PostSummary): PostSummary => ({
  slug, title, description, date, readTime, keywords,
});

const mdOrder = new Map(MARKDOWN_POSTS.map((p) => [p.slug, p.order]));

/** Newest first; posts sharing a date keep their editorial publishing order. */
export const POSTS: PostSummary[] = [
  ...MARKDOWN_POSTS.map(toSummary),
  ...STATIC_POSTS,
  ...jsonPostSummaries,
].sort((a, b) => {
  if (a.date !== b.date) return b.date > a.date ? 1 : -1;
  return (mdOrder.get(a.slug) ?? 999) - (mdOrder.get(b.slug) ?? 999);
});

export function getPostSummary(slug: string): PostSummary | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getMarkdownPost(slug: string): MarkdownPost | undefined {
  return MARKDOWN_POSTS.find((p) => p.slug === slug);
}

export function getJsonPost(slug: string): JsonBlogPost | undefined {
  return JSON_POSTS_RAW.find((p) => p.meta.slug === slug);
}

/** Slugs rendered by the dynamic [slug] route (JSON + markdown posts). */
export function getAllDynamicSlugs(): string[] {
  return [...JSON_POSTS_RAW.map((p) => p.meta.slug), ...MARKDOWN_POSTS.map((p) => p.slug)];
}

/** Related posts: explicit links first, then fill with the newest others. */
export function getRelated(slug: string, explicit: { href: string }[] = [], count = 3) {
  const picked = explicit
    .map((r) => getPostSummary(r.href.replace('/blog/', '')))
    .filter((p): p is PostSummary => !!p && p.slug !== slug);
  const rest = POSTS.filter((p) => p.slug !== slug && !picked.includes(p));
  return [...picked, ...rest].slice(0, count);
}

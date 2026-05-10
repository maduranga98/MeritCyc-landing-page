export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  keywords: string[];
  content: React.ReactNode;
}

export const POSTS: Omit<BlogPost, 'content'>[] = [
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

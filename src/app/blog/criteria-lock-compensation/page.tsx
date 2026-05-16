import type { Metadata } from 'next';
import Link from 'next/link';
import BlogPostLayout from '@/components/BlogPostLayout';

export const metadata: Metadata = {
  title: 'Criteria Lock in Compensation Cycles: Why It Matters and How It Works',
  description:
    'Criteria lock prevents mid-cycle changes to increment criteria after publication. Learn why it is essential for employee trust, pay equity, and compensation governance.',
  keywords: ['criteria lock compensation', 'increment criteria lock', 'compensation governance', 'merit cycle criteria management'],
  alternates: { canonical: '/blog/criteria-lock-compensation' },
  openGraph: {
    title: 'Criteria Lock in Compensation Cycles: Why It Matters and How It Works',
    description: 'Criteria lock prevents mid-cycle changes to increment criteria after publication.',
    type: 'article',
    url: 'https://meritcyc-landing.web.app/blog/criteria-lock-compensation',
    images: ['https://meritcyc-landing.web.app/og-image.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Criteria Lock in Compensation Cycles: Why It Matters and How It Works',
  description: 'Criteria lock prevents mid-cycle changes to increment criteria after publication.',
  datePublished: '2026-05-06',
  author: { '@type': 'Organization', name: 'MeritCyc' },
  publisher: { '@type': 'Organization', name: 'Lumora Ventures PVT LTD', logo: { '@type': 'ImageObject', url: 'https://meritcyc-landing.web.app/logo.png' } },
  image: 'https://meritcyc-landing.web.app/og-image.png',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://meritcyc-landing.web.app/blog/criteria-lock-compensation' },
  dateModified: '2026-05-16',
};

export default function Post() {
  return (
    <BlogPostLayout
      title="Criteria Lock in Compensation Cycles: Why It Matters and How It Works"
      date="2026-05-06"
      readTime="9 min read"
      jsonLd={jsonLd}
      relatedPosts={[
        { title: 'Compensation Budget Simulation: How to Model Merit Cycle Costs', href: '/blog/compensation-budget-simulation' },
        { title: 'How to Run a Merit Cycle: A 2026 Step-by-Step Guide', href: '/blog/merit-cycle-best-practices' },
        { title: "The CFO's Guide to Merit Cycle Budget Planning", href: '/blog/cfo-guide-merit-cycles' },
      ]}
    >
      <p style={{ fontStyle: 'italic', color: 'var(--slate-500)', marginBottom: 24, borderLeft: '3px solid var(--emerald)', paddingLeft: 16 }}>
        <strong>Quick Answer:</strong> Criteria lock is a compensation governance mechanism that makes increment criteria immutable once published to employees. After a cycle goes live, no changes can be made to scoring criteria, thresholds, or weights. This prevents mid-cycle adjustments that could advantage or disadvantage specific employees, and protects the company against pay discrimination claims.
      </p>

      <p style={{ marginBottom: 16 }}>
        If employees can see the rules change after they start working toward them, the rules are not rules. They are suggestions. And suggestions do not build compensation trust.
      </p>
      <p style={{ marginBottom: 24 }}>
        Criteria lock is the technical mechanism that turns increment criteria from suggestions into commitments. It is the natural complement to <Link href="/blog/compensation-budget-simulation" style={{ color: 'var(--emerald)', textDecoration: 'underline' }}>compensation budget simulation</Link> — simulation validates the cost before publication; lock enforces the commitment after.
      </p>

      <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--navy)', marginTop: 40, marginBottom: 16 }}>
        What Is Criteria Lock?
      </h2>
      <p style={{ marginBottom: 16 }}>
        Criteria lock is a feature in compensation management software that prevents any modification to increment criteria after a cycle has been published.
      </p>
      <p style={{ marginBottom: 16 }}>
        &ldquo;Published&rdquo; means the moment employees are notified of the active cycle and given access to view the criteria. From that point:
      </p>
      <p style={{ marginBottom: 8 }}>- No threshold adjustments are possible (e.g., changing the Tier 1 cutoff from 80 to 85 points)</p>
      <p style={{ marginBottom: 8 }}>- No weight changes are possible (e.g., shifting performance from 40% to 50% and reducing tenure from 20% to 10%)</p>
      <p style={{ marginBottom: 8 }}>- No criteria additions or removals are possible</p>
      <p style={{ marginBottom: 16 }}>- No tier structure changes are possible</p>
      <p style={{ marginBottom: 24 }}>
        The lock is enforced at the database level, not just the UI. In <Link href="/" style={{ color: 'var(--emerald)', textDecoration: 'underline' }}>MeritCyc</Link>, Firestore security rules block all writes to locked cycle documents, regardless of user role. Even a super admin cannot edit locked criteria — the only resolution is to cancel the cycle and create a new one, which generates a full audit log entry.
      </p>

      <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--navy)', marginTop: 40, marginBottom: 16 }}>
        Why Criteria Lock Matters for Employee Trust
      </h2>
      <p style={{ marginBottom: 16 }}>
        The trust mechanism is simple: employees need to know what they are working toward, and they need to know it will not change.
      </p>
      <p style={{ marginBottom: 16 }}>When criteria can be adjusted mid-cycle, three things happen:</p>
      <p style={{ marginBottom: 8 }}>First, employees who are on track lose confidence — they do not know if the threshold they are meeting will still exist at evaluation time.</p>
      <p style={{ marginBottom: 8 }}>Second, employees who advocate for threshold changes create an unfair dynamic — some employees know about the change, others do not.</p>
      <p style={{ marginBottom: 16 }}>Third, if a change benefits certain groups or departments disproportionately, the company has a discrimination exposure even if the intent was innocent.</p>
      <p style={{ marginBottom: 24 }}>Criteria lock eliminates all three scenarios by making mid-cycle changes structurally impossible. See how <Link href="/#features" style={{ color: 'var(--emerald)', textDecoration: 'underline' }}>criteria lock works in MeritCyc</Link>.</p>

      <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--navy)', marginTop: 40, marginBottom: 16 }}>
        Why Criteria Lock Matters for Finance and Legal
      </h2>
      <p style={{ marginBottom: 16 }}>Finance and legal have a different reason to care about criteria lock: budget and compliance.</p>
      <p style={{ marginBottom: 16 }}>
        When the CFO approves an increment budget based on a budget simulation, that approval is conditioned on specific criteria and thresholds. A mid-cycle criteria change can invalidate the financial model — moving a threshold from 85 to 80 can double the number of qualifying employees and double the budget exposure.
      </p>
      <p style={{ marginBottom: 24 }}>
        From a legal standpoint, in jurisdictions with pay equity legislation (EU Pay Transparency Directive, UK gender pay gap reporting, US state-level salary transparency laws), companies must be able to demonstrate that compensation decisions were made on consistent, pre-defined criteria applied equally across the workforce. Mid-cycle changes break that demonstrability.
      </p>

      <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--navy)', marginTop: 40, marginBottom: 16 }}>
        How Criteria Lock Is Implemented in MeritCyc
      </h2>
      <p style={{ marginBottom: 16 }}><Link href="/" style={{ color: 'var(--emerald)', textDecoration: 'underline' }}>MeritCyc</Link> enforces criteria lock at three layers:</p>
      <p style={{ marginBottom: 8 }}><strong>Layer 1 — Firestore security rules.</strong> The cycle document in Firestore has a <code>lockedAt</code> field set at publication time. Security rules block all write operations on criteria sub-documents once <code>lockedAt</code> is populated. This enforcement happens server-side, not in the UI.</p>
      <p style={{ marginBottom: 8 }}><strong>Layer 2 — Cloud Function gate.</strong> All cycle update functions check for lock status before processing. Any edit request on a locked cycle returns a 403 with the error code <code>CYCLE_LOCKED</code>.</p>
      <p style={{ marginBottom: 16 }}><strong>Layer 3 — UI enforcement.</strong> The criteria builder UI removes all edit controls and displays a lock icon with the lock timestamp when a cycle is in locked status. The only visible action is &ldquo;Cancel Cycle&rdquo; — which requires confirmation and generates an audit log entry.</p>

      <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--navy)', marginTop: 40, marginBottom: 16 }}>
        What Happens When Criteria Need to Change?
      </h2>
      <p style={{ marginBottom: 16 }}>Legitimate situations arise where criteria genuinely need adjustment. A data feed breaks. A department changes scope. A regulatory requirement shifts.</p>
      <p style={{ marginBottom: 16 }}>The correct response is never to unlock criteria. The correct response is:</p>
      <p style={{ marginBottom: 8 }}>1. Cancel the active cycle (audit logged, employees notified)</p>
      <p style={{ marginBottom: 8 }}>2. Create a new cycle with the revised criteria</p>
      <p style={{ marginBottom: 8 }}>3. Run budget simulation on the new criteria</p>
      <p style={{ marginBottom: 16 }}>4. Publish and lock the new cycle</p>
      <p style={{ marginBottom: 24 }}>This process is transparent, auditable, and honest. Employees know a change was made and why. Finance reviews the new budget model. The new criteria are just as locked as the original.</p>

      <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--navy)', marginTop: 40, marginBottom: 16 }}>FAQ</h2>

      <p style={{ marginBottom: 8 }}><strong>Can criteria lock be overridden by an admin?</strong></p>
      <p style={{ marginBottom: 16 }}>In <Link href="/" style={{ color: 'var(--emerald)', textDecoration: 'underline' }}>MeritCyc</Link>, no. Criteria lock is enforced at the Firestore rules level, not the application level. No role — including platform admin — can write to a locked cycle document. The only action available is cycle cancellation followed by new cycle creation.</p>

      <p style={{ marginBottom: 8 }}><strong>What is the difference between criteria lock and approval workflow?</strong></p>
      <p style={{ marginBottom: 16 }}>An approval workflow requires a second person to approve criteria before publication. Criteria lock prevents modification after publication. Both are needed in a complete governance model: approval ensures the right people agreed to the criteria; lock ensures those criteria cannot change once agreed.</p>

      <p style={{ marginBottom: 8 }}><strong>Does criteria lock apply to the scoring period or just the criteria themselves?</strong></p>
      <p style={{ marginBottom: 16 }}>Lock applies to the criteria definition — the weights, thresholds, and measurement rules. Scores submitted by managers are not &ldquo;locked&rdquo; in the same way; HR can override scores with justification until the cycle is finalized. The distinction is between the <em>rules</em> (immutable) and the <em>results</em> (reviewable until finalization).</p>
    </BlogPostLayout>
  );
}

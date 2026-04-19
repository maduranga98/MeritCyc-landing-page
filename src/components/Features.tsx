'use client';

const FEATURES = [
  {
    icon: '🧮',
    title: 'Budget Simulation Engine',
    desc: 'Model 5 scenarios side-by-side before committing. No more budget surprises after criteria go live.',
  },
  {
    icon: '🔒',
    title: 'Criteria Lock Mechanism',
    desc: "Once a cycle is published, it's locked. Firestore-enforced. No exceptions. No appeals.",
  },
  {
    icon: '🗺️',
    title: 'Employee Career Map',
    desc: 'Visual progression roadmap. Employees see exactly where they stand and what moves them to the next level.',
  },
  {
    icon: '📖',
    title: 'Increment Stories',
    desc: 'Auto-generated decision explanations for every employee. Replace "budget constraints" with real data.',
  },
  {
    icon: '⚖️',
    title: 'Fairness & Pay Equity Audit',
    desc: 'Automated detection of increment disparities across departments, gender, and tenure.',
  },
  {
    icon: '📋',
    title: 'Audit Trail',
    desc: 'Immutable, append-only log of every action. Built for compliance. Exportable as CSV.',
  },
];

export default function Features() {
  return (
    <section id="features" style={{ padding: '96px 24px', background: 'var(--slate-50)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 60 }}>
          <p
            style={{
              fontSize: 13,
              fontFamily: 'var(--font-mono)',
              color: 'var(--slate-400)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: 14,
            }}
          >
            Capabilities
          </p>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--navy)',
            }}
          >
            Everything Your HR Team Needs
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${(i % 3) + 1}`}
              style={{
                background: 'white',
                border: '1px solid var(--slate-100)',
                borderRadius: 14,
                padding: 28,
                boxShadow: '0 1px 3px rgba(15,23,42,0.04)',
                transition: 'box-shadow 0.25s, transform 0.25s',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(15,23,42,0.09)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(15,23,42,0.04)';
                e.currentTarget.style.transform = '';
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
              <h3
                style={{ fontSize: 17, fontWeight: 600, color: 'var(--navy)', marginBottom: 8 }}
              >
                {f.title}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--slate-500)', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

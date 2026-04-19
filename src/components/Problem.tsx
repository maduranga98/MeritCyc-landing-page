'use client';

const CARDS = [
  {
    icon: '⚠️',
    title: 'Zero Transparency',
    desc: "Employees never know why they got (or didn't get) an increment. Trust erodes — silently, until it's too late.",
  },
  {
    icon: '💸',
    title: 'Budget Overruns',
    desc: 'Criteria set without simulation. Too many qualify. Finance scrambles to cover the gap after the cycle is already live.',
  },
  {
    icon: '⚖️',
    title: 'Compliance Risk',
    desc: "No audit trail. Pay equity laws are tightening globally. Spreadsheets can't defend decisions when regulators ask.",
  },
];

export default function Problem() {
  return (
    <section style={{ padding: '96px 24px', background: 'var(--slate-50)' }}>
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
            The status quo
          </p>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--navy)',
            }}
          >
            The Problem With Spreadsheet Increments
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {CARDS.map((c, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1}`}
              style={{
                background: 'white',
                border: '1px solid var(--slate-200)',
                borderRadius: 12,
                padding: 28,
                boxShadow: '0 1px 4px rgba(15,23,42,0.04)',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,23,42,0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 4px rgba(15,23,42,0.04)';
                e.currentTarget.style.transform = '';
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 16 }}>{c.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--navy)', marginBottom: 10 }}>
                {c.title}
              </h3>
              <p style={{ fontSize: 15, color: 'var(--slate-500)', lineHeight: 1.7 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

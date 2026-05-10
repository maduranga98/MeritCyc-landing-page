'use client';

const ACCENT = '#10B981';

const STEPS = [
  {
    n: '01',
    title: 'Run Budget Simulation Before Publishing Criteria',
    desc: 'Before any employee sees the rules, HR runs multiple scenarios using historical data. See exactly how many employees qualify at each increment tier — and the total budget impact — before you commit.',
  },
  {
    n: '02',
    title: 'Lock Increment Criteria — No Mid-Cycle Changes',
    desc: 'Once published, criteria are immutably locked in Firestore. Employees see the same rules throughout. No mid-cycle adjustments. No favoritism claims. Built-in governance your finance team can audit.',
  },
  {
    n: '03',
    title: 'Every Employee Gets an Increment Story',
    desc: 'MeritCyc auto-generates a personalized decision explanation for each employee — their score breakdown, tier placement, and specific improvement guidance for the next cycle.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: '96px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
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
            The process
          </p>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--navy)',
            }}
          >
            How Salary Increment Cycles Work in MeritCyc
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 0,
            position: 'relative',
          }}
        >
          {/* Connector line (desktop only) */}
          <div
            className="connector-line"
            style={{
              position: 'absolute',
              top: 28,
              left: '16.5%',
              right: '16.5%',
              height: 1,
              background: `linear-gradient(to right, transparent, ${ACCENT}40, transparent)`,
              pointerEvents: 'none',
            }}
          />

          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1}`}
              style={{ padding: '0 32px', textAlign: 'center', position: 'relative' }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: `${ACCENT}12`,
                  border: `2px solid ${ACCENT}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 15,
                    fontWeight: 500,
                    color: ACCENT,
                  }}
                >
                  {s.n}
                </span>
              </div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--navy)',
                  marginBottom: 12,
                  letterSpacing: '-0.01em',
                }}
              >
                {s.title}
              </h3>
              <p style={{ fontSize: 15, color: 'var(--slate-500)', lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

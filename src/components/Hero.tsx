'use client';

const ACCENT = '#10B981';

export default function Hero() {
  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  return (
    <section style={{ padding: '80px 24px 96px', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
      {/* Eyebrow */}
      <div
        className="reveal"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          border: `1.5px solid ${ACCENT}`,
          borderRadius: 999,
          padding: '6px 16px',
          marginBottom: 32,
          background: 'var(--slate-50)',
        }}
      >
        <span
          style={{ width: 7, height: 7, borderRadius: '50%', background: ACCENT, display: 'inline-block' }}
        />
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: ACCENT,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)',
          }}
        >
          Salary Increment Intelligence
        </span>
      </div>

      {/* Headline */}
      <h1
        className="reveal reveal-delay-1"
        style={{
          fontSize: 'clamp(36px, 5vw, 54px)',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          color: 'var(--navy)',
          maxWidth: 760,
          margin: '0 auto 24px',
        }}
      >
        Fair Salary Increments.<br />Smart Budgets.<br />
        <span style={{ color: ACCENT }}>Zero Surprises.</span>
      </h1>

      {/* Subheadline */}
      <p
        className="reveal reveal-delay-2"
        style={{
          fontSize: 20,
          color: 'var(--slate-500)',
          maxWidth: 600,
          margin: '0 auto 12px',
          lineHeight: 1.7,
          fontWeight: 400,
        }}
      >
        MeritCyc is the <strong>salary increment management platform</strong> for
        mid-size companies. Simulate your budget before you publish criteria,
        lock decisions to build trust, and give every employee a data-driven
        Increment Story.
      </p>

      <p
        className="reveal reveal-delay-2"
        style={{
          fontSize: 14,
          color: 'var(--slate-400)',
          maxWidth: 600,
          margin: '0 auto 40px',
          lineHeight: 1.6,
        }}
      >
        Where merit meets budget — built for HR Directors and CFOs at 50–500 employee companies.
      </p>

      {/* CTAs */}
      <div
        className="reveal reveal-delay-3"
        style={{ marginBottom: 8 }}
      >
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
          <button
            style={{
              padding: '14px 28px',
              background: ACCENT,
              border: 'none',
              borderRadius: 10,
              fontFamily: 'var(--font-main)',
              fontSize: 16,
              fontWeight: 600,
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: `0 4px 14px ${ACCENT}40`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = `0 6px 20px ${ACCENT}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = `0 4px 14px ${ACCENT}40`;
            }}
          >
            Start Free Trial
          </button>
          <button
            onClick={scrollToHowItWorks}
            style={{
              padding: '14px 28px',
              background: 'transparent',
              border: '1.5px solid var(--slate-200)',
              borderRadius: 10,
              fontFamily: 'var(--font-main)',
              fontSize: 16,
              fontWeight: 600,
              color: 'var(--navy)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = ACCENT;
              e.currentTarget.style.color = ACCENT;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--slate-200)';
              e.currentTarget.style.color = 'var(--navy)';
            }}
          >
            See How It Works &rarr;
          </button>
        </div>
        {/* Friction reducer */}
        <p style={{ fontSize: 13, color: 'var(--slate-400)', textAlign: 'center', marginTop: 8 }}>
          14-day free trial &middot; No credit card required &middot; Setup in under 10 minutes
        </p>
      </div>

      {/* Social proof */}
      <p
        className="reveal reveal-delay-4"
        style={{
          fontSize: 13,
          color: 'var(--slate-400)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.02em',
        }}
      >
        Built for HR teams and finance leaders at 50–500 employee companies.
      </p>

      {/* Platform Preview — Budget Simulation Mockup */}
      <div
        className="reveal reveal-delay-5"
        style={{
          marginTop: 64,
          maxWidth: 880,
          margin: '64px auto 0',
          borderRadius: 16,
          border: '1px solid var(--slate-200)',
          background: 'white',
          boxShadow: '0 4px 24px rgba(15,23,42,0.08)',
          overflow: 'hidden',
        }}
      >
        {/* Top bar */}
        <div style={{
          background: 'var(--navy)',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#EF4444' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#F59E0B' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10B981' }} />
          <span style={{ color: 'var(--slate-400)', fontSize: 12, marginLeft: 8, fontFamily: 'var(--font-mono)' }}>
            MeritCyc — Budget Simulation
          </span>
        </div>

        {/* Sidebar + content layout */}
        <div style={{ display: 'flex' }}>
          {/* Sidebar strip */}
          <div style={{
            width: 48,
            background: 'var(--navy)',
            height: 192,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            paddingTop: 16,
          }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: ACCENT, opacity: 0.8 }} />
            <div style={{ width: 24, height: 6, borderRadius: 3, background: 'var(--slate-600)' }} />
            <div style={{ width: 24, height: 6, borderRadius: 3, background: 'var(--slate-600)' }} />
            <div style={{ width: 24, height: 6, borderRadius: 3, background: 'var(--slate-600)' }} />
          </div>

          {/* Content area */}
          <div style={{ flex: 1, padding: 16, background: 'var(--slate-50)' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 8 }}>
              Budget Simulation — Q2 Increment Cycle
            </div>

            {/* Scenario bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--slate-500)', marginBottom: 4 }}>
                  <span>Scenario A (85% threshold)</span>
                  <span style={{ color: '#059669', fontWeight: 500 }}>$1.9M</span>
                </div>
                <div style={{ width: '100%', background: 'var(--slate-200)', borderRadius: 4, height: 8 }}>
                  <div style={{ background: ACCENT, height: 8, borderRadius: 4, width: '55%' }} />
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--slate-500)', marginBottom: 4 }}>
                  <span>Scenario B (80% threshold)</span>
                  <span style={{ color: '#F59E0B', fontWeight: 500 }}>$3.4M</span>
                </div>
                <div style={{ width: '100%', background: 'var(--slate-200)', borderRadius: 4, height: 8 }}>
                  <div style={{ background: '#F59E0B', height: 8, borderRadius: 4, width: '95%' }} />
                </div>
              </div>
            </div>

            {/* Stat row */}
            <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>41</div>
                <div style={{ fontSize: 11, color: 'var(--slate-500)' }}>Qualifying</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: ACCENT }}>$1.9M</div>
                <div style={{ fontSize: 11, color: 'var(--slate-500)' }}>Budget Used</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>&#x1F512; Locked</div>
                <div style={{ fontSize: 11, color: 'var(--slate-500)' }}>Criteria</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

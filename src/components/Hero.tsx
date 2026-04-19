'use client';

const ACCENT = '#10B981';

const STAT_COLORS = [ACCENT, '#64748B', '#94A3B8'];

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
        Fair Increments.<br />Smart Budgets.<br />
        <span style={{ color: ACCENT }}>Zero Surprises.</span>
      </h1>

      {/* Subheadline */}
      <p
        className="reveal reveal-delay-2"
        style={{
          fontSize: 20,
          color: 'var(--slate-500)',
          maxWidth: 600,
          margin: '0 auto 40px',
          lineHeight: 1.7,
          fontWeight: 400,
        }}
      >
        MeritCyc replaces spreadsheet-driven salary decisions with a transparent, data-driven
        platform — so every increment is defensible, budget-safe, and trusted by employees.
      </p>

      {/* CTAs */}
      <div
        className="reveal reveal-delay-3"
        style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}
      >
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
          See How It Works →
        </button>
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
        Trusted by HR teams managing 50–500 employees
      </p>

      {/* Hero mockup */}
      <div
        className="reveal reveal-delay-5"
        style={{
          marginTop: 64,
          maxWidth: 880,
          margin: '64px auto 0',
          background: 'var(--slate-50)',
          borderRadius: 16,
          aspectRatio: '16/9',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--slate-200)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Window chrome */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 40,
            background: 'var(--slate-100)',
            borderBottom: '1px solid var(--slate-200)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            gap: 8,
          }}
        >
          {['#EF4444', '#F59E0B', '#10B981'].map((c) => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
          <div
            style={{
              flex: 1,
              height: 22,
              background: 'var(--slate-200)',
              borderRadius: 4,
              margin: '0 60px',
            }}
          />
        </div>

        {/* Mock dashboard */}
        <div
          style={{
            width: '100%',
            height: '100%',
            padding: '60px 32px 24px',
            display: 'flex',
            gap: 16,
          }}
        >
          {/* Sidebar */}
          <div style={{ width: '18%', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[80, 60, 70, 50, 65].map((w, i) => (
              <div
                key={i}
                style={{
                  height: 10,
                  background: 'var(--slate-200)',
                  borderRadius: 4,
                  width: `${w}%`,
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Stat cards */}
            <div style={{ display: 'flex', gap: 12 }}>
              {STAT_COLORS.map((c, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: 64,
                    background: `${c}18`,
                    borderRadius: 8,
                    border: `1px solid ${c}30`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '8px 12px',
                  }}
                >
                  <div
                    style={{ height: 8, width: '60%', background: c, borderRadius: 3, opacity: 0.7 }}
                  />
                </div>
              ))}
            </div>

            {/* Table */}
            <div
              style={{
                flex: 1,
                background: 'white',
                borderRadius: 8,
                border: '1px solid var(--slate-200)',
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {[100, 85, 70, 90, 60, 75].map((w, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: i % 3 === 0 ? ACCENT : 'var(--slate-200)',
                      flexShrink: 0,
                    }}
                  />
                  <div
                    style={{
                      height: 8,
                      background: 'var(--slate-100)',
                      borderRadius: 3,
                      width: `${w}%`,
                    }}
                  />
                  <div
                    style={{
                      marginLeft: 'auto',
                      height: 8,
                      width: 40,
                      background: i % 3 === 0 ? `${ACCENT}30` : 'var(--slate-100)',
                      borderRadius: 3,
                      flexShrink: 0,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 12,
            color: 'var(--slate-400)',
            fontFamily: 'var(--font-mono)',
            whiteSpace: 'nowrap',
          }}
        >
          Platform Preview
        </div>
      </div>
    </section>
  );
}

'use client';

const ACCENT = '#10B981';

export default function Testimonials() {
  return (
    <section style={{ padding: '96px 24px', background: 'var(--slate-50)' }}>
      <div className="reveal" style={{ maxWidth: 680, margin: '0 auto' }}>
        <div
          style={{
            background: 'var(--navy)',
            borderRadius: 16,
            padding: '48px 32px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              color: ACCENT,
              fontSize: 13,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 12,
              fontFamily: 'var(--font-mono)',
            }}
          >
            Early Access
          </p>
          <h3
            style={{
              color: 'white',
              fontSize: 'clamp(24px, 3vw, 32px)',
              fontWeight: 700,
              marginBottom: 16,
              letterSpacing: '-0.02em',
            }}
          >
            Join HR teams already on the waitlist
          </h3>
          <p
            style={{
              color: 'var(--slate-400)',
              maxWidth: 440,
              margin: '0 auto 24px',
              lineHeight: 1.7,
              fontSize: 16,
            }}
          >
            MeritCyc is currently in early access. Companies managing 50–500 employees
            are joining now to replace spreadsheet-driven increment cycles.
          </p>
          <a
            href="#pricing"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: ACCENT,
              color: 'white',
              fontWeight: 600,
              padding: '14px 28px',
              borderRadius: 10,
              textDecoration: 'none',
              transition: 'background 0.2s',
              fontSize: 16,
              fontFamily: 'var(--font-main)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#059669')}
            onMouseLeave={(e) => (e.currentTarget.style.background = ACCENT)}
          >
            Start Free Trial
          </a>
        </div>
      </div>
    </section>
  );
}

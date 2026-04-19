'use client';

const ACCENT = '#10B981';

export default function FinalCTA() {
  return (
    <section style={{ padding: '96px 24px', background: 'var(--navy)' }}>
      <div className="reveal" style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            color: 'white',
            letterSpacing: '-0.02em',
            marginBottom: 20,
            lineHeight: 1.15,
          }}
        >
          Ready to Replace<br />Spreadsheet Chaos?
        </h2>
        <p
          style={{
            fontSize: 18,
            color: 'var(--slate-400)',
            marginBottom: 40,
            lineHeight: 1.7,
          }}
        >
          Join companies that have made salary increment decisions fair, transparent, and
          financially responsible.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
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
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = '';
            }}
          >
            Start Free Trial
          </button>
          <button
            style={{
              padding: '14px 28px',
              background: 'transparent',
              border: '1.5px solid rgba(255,255,255,0.2)',
              borderRadius: 10,
              fontFamily: 'var(--font-main)',
              fontSize: 16,
              fontWeight: 600,
              color: 'white',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
          >
            Book a Demo
          </button>
        </div>
      </div>
    </section>
  );
}

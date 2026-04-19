'use client';

const TESTIMONIALS = [
  {
    quote: 'MeritCyc saved our HR team 40 hours per increment cycle. What used to take weeks now takes hours.',
    author: 'VP People Ops',
    company: 'Tech Company',
  },
  {
    quote: 'For the first time, employees actually trust our increment process. Transparency changed everything.',
    author: 'HR Director',
    company: 'Finance Firm',
  },
  {
    quote: 'The budget simulation alone was worth switching from spreadsheets. No more finance fire drills.',
    author: 'CFO',
    company: 'Professional Services',
  },
];

export default function Testimonials() {
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
            Social proof
          </p>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--navy)',
            }}
          >
            Built for People-First Companies
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1}`}
              style={{
                background: 'white',
                border: '1px solid var(--slate-200)',
                borderRadius: 14,
                padding: 28,
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,23,42,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 16, color: 'var(--slate-200)' }}>&ldquo;</div>
              <p
                style={{
                  fontSize: 16,
                  fontStyle: 'italic',
                  color: 'var(--slate-600)',
                  lineHeight: 1.7,
                  marginBottom: 20,
                }}
              >
                {t.quote}
              </p>
              <div style={{ borderTop: '1px solid var(--slate-100)', paddingTop: 16 }}>
                <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--navy)' }}>{t.author}</p>
                <p style={{ fontSize: 13, color: 'var(--slate-400)', fontFamily: 'var(--font-mono)' }}>
                  {t.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

const ACCENT = '#10B981';

const TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$3',
    unit: '/emp/mo',
    desc: 'For teams just getting started with structured increments.',
    features: ['Up to 2 cycles/year', 'Basic criteria (5 max)', '3 simulation scenarios', 'Basic employee portal'],
    cta: 'Get Started',
    ctaFilled: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$7',
    unit: '/emp/mo',
    badge: 'Most Popular',
    desc: 'The complete platform for data-driven increment decisions.',
    features: [
      'Unlimited cycles',
      'Advanced criteria builder',
      'Unlimited scenarios',
      'Full career map',
      'Increment Stories',
      'Fairness audit',
    ],
    cta: 'Start Free Trial',
    ctaFilled: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$12',
    unit: '/emp/mo',
    desc: 'Full compliance and AI-powered predictions for large orgs.',
    features: [
      'Everything in Growth',
      'AI predictions',
      'Full compliance suite',
      'SAML SSO',
      'Dedicated CSM + SLA',
    ],
    cta: 'Contact Sales',
    ctaFilled: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: '96px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
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
            Pricing
          </p>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--navy)',
            }}
          >
            Simple, Transparent Pricing
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            alignItems: 'start',
          }}
        >
          {TIERS.map((tier, i) => {
            const isHL = tier.id === 'growth';
            return (
              <div
                key={tier.id}
                className={`reveal reveal-delay-${i + 1}`}
                style={{
                  background: 'white',
                  borderRadius: 16,
                  padding: '32px 28px',
                  border: isHL ? `2px solid ${ACCENT}` : '1px solid var(--slate-200)',
                  boxShadow: isHL ? `0 8px 32px ${ACCENT}18` : '0 1px 4px rgba(15,23,42,0.04)',
                  position: 'relative',
                  transform: isHL ? 'scale(1.02)' : 'scale(1)',
                  transition: 'transform 0.2s',
                }}
              >
                {tier.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: -13,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: ACCENT,
                      color: 'white',
                      fontSize: 11,
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '4px 14px',
                      borderRadius: 999,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {tier.badge}
                  </div>
                )}

                <div style={{ marginBottom: 8 }}>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: 'var(--slate-400)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {tier.name}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                  <span
                    style={{
                      fontSize: 44,
                      fontWeight: 700,
                      color: 'var(--navy)',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {tier.price}
                  </span>
                  <span
                    style={{ fontSize: 14, color: 'var(--slate-400)', fontFamily: 'var(--font-mono)' }}
                  >
                    {tier.unit}
                  </span>
                </div>

                <p style={{ fontSize: 14, color: 'var(--slate-500)', marginBottom: 24, lineHeight: 1.6 }}>
                  {tier.desc}
                </p>

                <ul
                  style={{
                    listStyle: 'none',
                    marginBottom: 28,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  {tier.features.map((f, fi) => (
                    <li
                      key={fi}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        fontSize: 14,
                        color: 'var(--navy)',
                      }}
                    >
                      <span
                        style={{
                          color: ACCENT,
                          fontWeight: 700,
                          fontSize: 16,
                          lineHeight: 1.2,
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  style={{
                    width: '100%',
                    padding: '12px 0',
                    borderRadius: 9,
                    fontFamily: 'var(--font-main)',
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: tier.ctaFilled ? ACCENT : 'transparent',
                    color: tier.ctaFilled ? 'white' : 'var(--navy)',
                    border: tier.ctaFilled ? 'none' : '1.5px solid var(--slate-200)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.88';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = '';
                  }}
                >
                  {tier.cta}
                </button>
              </div>
            );
          })}
        </div>

        <p
          className="reveal"
          style={{
            textAlign: 'center',
            marginTop: 32,
            fontSize: 14,
            color: 'var(--slate-400)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          14-day free trial on Growth plan. No credit card required.
        </p>
      </div>
    </section>
  );
}

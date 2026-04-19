'use client';

import { useState, useEffect } from 'react';

const ACCENT = '#10B981';

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
];

function useScrolled(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, [threshold]);
  return scrolled;
}

export default function Navbar() {
  const scrolled = useScrolled(80);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(15,23,42,0.08)' : 'none',
        transition: 'all 0.3s ease',
        padding: '0 24px',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 68,
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            fontFamily: 'var(--font-main)',
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: '-0.02em',
            cursor: 'pointer',
          }}
        >
          <span style={{ color: 'var(--navy)' }}>Merit</span>
          <span style={{ color: ACCENT }}>Cyc</span>
        </div>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                color: 'var(--slate-500)',
                textDecoration: 'none',
                fontSize: 15,
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--navy)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--slate-500)')}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTAs + Hamburger */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button
            className="nav-cta-desktop"
            style={{
              padding: '9px 20px',
              background: 'transparent',
              border: '1.5px solid var(--slate-200)',
              borderRadius: 8,
              fontFamily: 'var(--font-main)',
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--navy)',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = ACCENT)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--slate-200)')}
          >
            Log In
          </button>
          <button
            className="nav-cta-desktop"
            style={{
              padding: '9px 20px',
              background: ACCENT,
              border: 'none',
              borderRadius: 8,
              fontFamily: 'var(--font-main)',
              fontSize: 14,
              fontWeight: 600,
              color: 'white',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Get Started
          </button>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
            }}
            aria-label="Toggle menu"
          >
            <div style={{ width: 22, height: 2, background: 'var(--navy)', margin: '4px 0' }} />
            <div style={{ width: 22, height: 2, background: 'var(--navy)', margin: '4px 0' }} />
            <div style={{ width: 22, height: 2, background: 'var(--navy)', margin: '4px 0' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: 'white',
            borderTop: '1px solid var(--slate-100)',
            padding: '16px 24px 24px',
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                color: 'var(--slate-500)',
                textDecoration: 'none',
                padding: '10px 0',
                fontSize: 16,
                fontWeight: 500,
                borderBottom: '1px solid var(--slate-100)',
              }}
            >
              {l.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button
              style={{
                flex: 1,
                padding: '10px 0',
                background: 'transparent',
                border: '1.5px solid var(--slate-200)',
                borderRadius: 8,
                fontFamily: 'var(--font-main)',
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--navy)',
                cursor: 'pointer',
              }}
            >
              Log In
            </button>
            <button
              style={{
                flex: 1,
                padding: '10px 0',
                background: ACCENT,
                border: 'none',
                borderRadius: 8,
                fontFamily: 'var(--font-main)',
                fontSize: 14,
                fontWeight: 600,
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

'use client';

import { Calculator, Lock, Map, BookOpen, Scale, ClipboardList } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ACCENT = '#10B981';

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const FEATURES: Feature[] = [
  {
    icon: Calculator,
    title: 'Salary Increment Budget Simulator',
    desc: 'Model 5 scenarios side-by-side before criteria go live. See projected budget at each tier threshold. No surprises when the cycle closes.',
  },
  {
    icon: Lock,
    title: 'Criteria Lock — Governance Built In',
    desc: 'Once a cycle is published, criteria are locked. Firestore-enforced. No exceptions. Eliminates mid-cycle drift and protects against compliance risk.',
  },
  {
    icon: Map,
    title: 'Employee Career Map & Progression',
    desc: 'Visual roadmap showing current level, next milestone, and what drives progression. Employees see where they stand — every cycle, not just once a year.',
  },
  {
    icon: BookOpen,
    title: 'Increment Stories — Transparent Decisions',
    desc: 'Auto-generated explanations for every employee: score, tier, and what to improve. Replace vague "budget constraints" with real, auditable data.',
  },
  {
    icon: Scale,
    title: 'Fairness & Pay Equity Audit',
    desc: 'Automated detection of increment disparities across departments, tenure, and role. Exportable PDF reports for legal review and board-level reporting.',
  },
  {
    icon: ClipboardList,
    title: 'Immutable Audit Trail',
    desc: 'Append-only log of every cycle action: criteria changes, overrides, approvals. Built for compliance. Exportable as CSV at any time.',
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
            Everything a CFO and HR Director Need to Run Increment Cycles
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}
        >
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
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
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `${ACCENT}10`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}
                >
                  <Icon size={24} color={ACCENT} />
                </div>
                <h3
                  style={{ fontSize: 17, fontWeight: 600, color: 'var(--navy)', marginBottom: 8 }}
                >
                  {f.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--slate-500)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

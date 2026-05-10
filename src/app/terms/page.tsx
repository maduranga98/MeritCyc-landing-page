import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | MeritCyc',
  description: 'Terms of Service for MeritCyc — Salary Increment Intelligence Platform by Lumora Ventures PVT LTD.',
};

export default function Terms() {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '80px 24px 120px' }}>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: 'var(--navy)', marginBottom: 24 }}>
        Terms of Service
      </h1>
      <p style={{ fontSize: 14, color: 'var(--slate-500)', fontFamily: 'var(--font-mono)', marginBottom: 32 }}>
        Last updated May 2026
      </p>
      <div style={{ fontSize: 16, color: 'var(--slate-600)', lineHeight: 1.8 }}>
        <p style={{ marginBottom: 16 }}>
          These Terms of Service govern your use of the MeritCyc platform, provided by Lumora Ventures PVT LTD. By accessing or using MeritCyc, you agree to these terms.
        </p>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--navy)', marginTop: 32, marginBottom: 12 }}>
          Use of Service
        </h2>
        <p style={{ marginBottom: 16 }}>
          MeritCyc provides a salary increment management platform for mid-size companies. You may use the service only for lawful business purposes and in accordance with these terms.
        </p>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--navy)', marginTop: 32, marginBottom: 12 }}>
          Account Responsibilities
        </h2>
        <p style={{ marginBottom: 16 }}>
          You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must notify us immediately of any unauthorized use.
        </p>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--navy)', marginTop: 32, marginBottom: 12 }}>
          Data Ownership
        </h2>
        <p style={{ marginBottom: 16 }}>
          You retain ownership of all data you input into MeritCyc. We do not claim ownership of your company or employee data. We process data solely to provide the service.
        </p>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--navy)', marginTop: 32, marginBottom: 12 }}>
          Limitation of Liability
        </h2>
        <p style={{ marginBottom: 16 }}>
          MeritCyc is provided &ldquo;as is&rdquo; without warranties of any kind. Lumora Ventures PVT LTD shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.
        </p>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--navy)', marginTop: 32, marginBottom: 12 }}>
          Contact
        </h2>
        <p>
          For questions about these terms, contact us at{' '}
          <a href="mailto:hello@meritcyc.com" style={{ color: 'var(--emerald)', textDecoration: 'underline' }}>
            hello@meritcyc.com
          </a>.
          Full terms coming soon.
        </p>
      </div>
      <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--slate-200)' }}>
        <a href="/" style={{ fontSize: 14, color: 'var(--emerald)', fontWeight: 600, textDecoration: 'none' }}>
          &larr; Back to MeritCyc
        </a>
      </div>
    </main>
  );
}

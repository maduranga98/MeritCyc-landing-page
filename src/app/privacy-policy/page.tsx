import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | MeritCyc',
  description: 'Privacy Policy for MeritCyc — Salary Increment Intelligence Platform by Lumora Ventures PVT LTD.',
};

export default function PrivacyPolicy() {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '80px 24px 120px' }}>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: 'var(--navy)', marginBottom: 24 }}>
        Privacy Policy
      </h1>
      <p style={{ fontSize: 14, color: 'var(--slate-500)', fontFamily: 'var(--font-mono)', marginBottom: 32 }}>
        Last updated May 2026
      </p>
      <div style={{ fontSize: 16, color: 'var(--slate-600)', lineHeight: 1.8 }}>
        <p style={{ marginBottom: 16 }}>
          MeritCyc (Lumora Ventures PVT LTD) collects and processes data as described below. This privacy policy applies to the MeritCyc platform, website, and related services.
        </p>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--navy)', marginTop: 32, marginBottom: 12 }}>
          Information We Collect
        </h2>
        <p style={{ marginBottom: 16 }}>
          We collect information you provide directly, including account details, company information, and employee data entered into the platform. We also collect usage data and analytics to improve our service.
        </p>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--navy)', marginTop: 32, marginBottom: 12 }}>
          How We Use Your Data
        </h2>
        <p style={{ marginBottom: 16 }}>
          Your data is used to provide and improve the MeritCyc platform, process salary increment cycles, generate reports, and communicate with you about your account. We do not sell your data to third parties.
        </p>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--navy)', marginTop: 32, marginBottom: 12 }}>
          Data Security
        </h2>
        <p style={{ marginBottom: 16 }}>
          We implement industry-standard security measures to protect your data, including encryption at rest and in transit, access controls, and regular security audits.
        </p>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--navy)', marginTop: 32, marginBottom: 12 }}>
          Your Rights
        </h2>
        <p style={{ marginBottom: 16 }}>
          You have the right to access, correct, or delete your personal data. You may also request data portability or object to processing. Contact us to exercise any of these rights.
        </p>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--navy)', marginTop: 32, marginBottom: 12 }}>
          Contact
        </h2>
        <p>
          For privacy-related inquiries, contact us at{' '}
          <a href="mailto:hello@meritcyc.com" style={{ color: 'var(--emerald)', textDecoration: 'underline' }}>
            hello@meritcyc.com
          </a>.
          Full policy coming soon.
        </p>
      </div>
      <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--slate-200)' }}>
        <Link href="/" style={{ fontSize: 14, color: 'var(--emerald)', fontWeight: 600, textDecoration: 'none' }}>
          &larr; Back to MeritCyc
        </Link>
      </div>
    </main>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import RevealObserver from '@/components/RevealObserver';

export const metadata: Metadata = {
  metadataBase: new URL('https://meritcyc-landing.web.app'),
  alternates: { canonical: '/' },
  title: 'MeritCyc — Salary Increment Management Software',
  description:
    'Run salary increment cycles with budget simulation and criteria lock. Built for CFOs and HR Directors at 50–500 employee companies. Start your free trial.',
  keywords: [
    'salary increment management software',
    'merit cycle software',
    'compensation budget simulation',
    'salary increment intelligence platform',
    'increment cycle software',
    'criteria lock compensation',
    'merit increase software',
    'compensation management software mid-size',
  ],
  openGraph: {
    title: 'MeritCyc — Salary Increment Management Software',
    description:
      'Run salary increment cycles with budget simulation and criteria lock. Built for CFOs and HR Directors at 50–500 employee companies. Start your free trial.',
    url: 'https://meritcyc-landing.web.app',
    siteName: 'MeritCyc',
    type: 'website',
    images: [
      {
        url: 'https://meritcyc-landing.web.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MeritCyc — Salary Increment Intelligence Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MeritCyc — Salary Increment Management Software',
    description:
      'Run salary increment cycles with budget simulation and criteria lock. Built for CFOs and HR Directors at 50–500 employee companies. Start your free trial.',
    images: ['https://meritcyc-landing.web.app/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'MeritCyc',
  applicationCategory: 'BusinessApplication',
  description:
    'Salary Increment Intelligence Platform for mid-size companies. Features budget simulation, criteria lock, and employee career maps.',
  url: 'https://meritcyc-landing.web.app',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '3',
    highPrice: '12',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '3',
      priceCurrency: 'USD',
      referenceQuantity: {
        '@type': 'QuantitativeValue',
        value: '1',
        unitText: 'employee per month',
      },
    },
  },
  operatingSystem: 'Web',
  provider: {
    '@type': 'Organization',
    name: 'Lumora Ventures PVT LTD',
    email: 'hello@meritcyc.com',
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MeritCyc',
  url: 'https://meritcyc-landing.web.app',
  logo: 'https://meritcyc-landing.web.app/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@meritcyc.com',
    contactType: 'customer support',
  },
  sameAs: ['https://www.linkedin.com/company/meritcyc'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <RevealObserver />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';
import RevealObserver from '@/components/RevealObserver';

const dmSans = DM_Sans({
  variable: '--font-main',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const dmMono = DM_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'MeritCyc — Salary Increment Intelligence',
  description:
    'MeritCyc replaces spreadsheet-driven salary decisions with a transparent, data-driven platform — so every increment is defensible, budget-safe, and trusted by employees.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
      <body suppressHydrationWarning>
        <RevealObserver />
        {children}
      </body>
    </html>
  );
}

/** Firebase entry point: weekly scheduled SEO report → Firestore + email. */
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { defineSecret, defineString } from 'firebase-functions/params';
import { logger } from 'firebase-functions/v2';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { parseRecipients, sendEmail } from './notify.js';
import { formatEmail, formatSubject, formatText } from './report.js';
import { runSeoReport } from './run.js';

initializeApp();
const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });

// Override with seo-bot/.env.<projectId> if needed. "sc-domain:" = Domain property (covers app.meritcyc.com too);
// use "https://meritcyc.com/" for a URL-prefix property.
const SITE_URL = defineString('SITE_URL', { default: 'https://meritcyc.com' });
const GSC_PROPERTY = defineString('GSC_PROPERTY', { default: 'sc-domain:meritcyc.com' });
// Resend's shared sender works without DNS setup but only delivers to your Resend account's email.
// After verifying meritcyc.com in Resend, set EMAIL_FROM to e.g. "MeritCyc SEO <seo@meritcyc.com>".
const EMAIL_FROM = defineString('EMAIL_FROM', { default: 'MeritCyc SEO Bot <onboarding@resend.dev>' });
const RESEND_API_KEY = defineSecret('RESEND_API_KEY');
// A secret (not a param) so the address never lands in this public repo. Comma-separate for several.
const REPORT_EMAIL = defineSecret('REPORT_EMAIL');

export const weeklySeoReport = onSchedule(
  {
    schedule: 'every monday 09:00',
    timeZone: 'Asia/Colombo',
    memory: '512MiB',
    timeoutSeconds: 300,
    retryCount: 1,
    secrets: [RESEND_API_KEY, REPORT_EMAIL],
  },
  async () => {
    const report = await runSeoReport({ siteUrl: SITE_URL.value(), property: GSC_PROPERTY.value() });
    const id = report.search?.window.current.end ?? report.generatedAt.slice(0, 10);
    await db.collection('seoReports').doc(id).set(report);
    logger.info('SEO report saved', { id, crawlErrors: report.crawl?.errors, searchError: report.searchError });
    await sendEmail(RESEND_API_KEY.value(), {
      from: EMAIL_FROM.value(),
      to: parseRecipients(REPORT_EMAIL.value()),
      subject: formatSubject(report),
      html: formatEmail(report),
      text: formatText(report),
    });
  },
);

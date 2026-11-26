/** Firebase entry point: weekly scheduled SEO report → Firestore + email. */
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { defineSecret, defineString } from 'firebase-functions/params';
import { logger } from 'firebase-functions/v2';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { parseRecipients, sendGmail } from './notify.js';
import { formatEmail, formatSubject, formatText } from './report.js';
import { runSeoReport } from './run.js';

initializeApp();
const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });

// Override with seo-bot/.env.<projectId> if needed. "sc-domain:" = Domain property (covers app.meritcyc.com too);
// use "https://meritcyc.com/" for a URL-prefix property.
const SITE_URL = defineString('SITE_URL', { default: 'https://meritcyc.com' });
const GSC_PROPERTY = defineString('GSC_PROPERTY', { default: 'sc-domain:meritcyc.com' });
// Gmail account that sends the report + its App Password (https://myaccount.google.com/apppasswords).
const GMAIL_USER = defineSecret('GMAIL_USER');
const GMAIL_APP_PASSWORD = defineSecret('GMAIL_APP_PASSWORD');
// Optional extra recipients (comma-separated); the report always goes to GMAIL_USER.
const REPORT_CC = defineString('REPORT_CC', { default: '' });

export const weeklySeoReport = onSchedule(
  {
    schedule: 'every monday 09:00',
    timeZone: 'Asia/Colombo',
    memory: '512MiB',
    timeoutSeconds: 300,
    retryCount: 1,
    secrets: [GMAIL_USER, GMAIL_APP_PASSWORD],
  },
  async () => {
    const report = await runSeoReport({ siteUrl: SITE_URL.value(), property: GSC_PROPERTY.value() });
    const id = report.search?.window.current.end ?? report.generatedAt.slice(0, 10);
    await db.collection('seoReports').doc(id).set(report);
    logger.info('SEO report saved', { id, crawlErrors: report.crawl?.errors, searchError: report.searchError });
    await sendGmail(GMAIL_USER.value(), GMAIL_APP_PASSWORD.value(), {
      to: [GMAIL_USER.value(), ...parseRecipients(REPORT_CC.value())],
      subject: formatSubject(report),
      html: formatEmail(report),
      text: formatText(report),
    });
  },
);

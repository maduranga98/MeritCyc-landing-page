/** Firebase entry point: weekly scheduled SEO report → Firestore + Telegram. */
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { defineSecret, defineString } from 'firebase-functions/params';
import { logger } from 'firebase-functions/v2';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { sendTelegram } from './notify.js';
import { formatMessage } from './report.js';
import { runSeoReport } from './run.js';

initializeApp();
const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });

// Override with seo-bot/.env.<projectId> if needed. "sc-domain:" = Domain property (covers app.meritcyc.com too);
// use "https://meritcyc.com/" for a URL-prefix property.
const SITE_URL = defineString('SITE_URL', { default: 'https://meritcyc.com' });
const GSC_PROPERTY = defineString('GSC_PROPERTY', { default: 'sc-domain:meritcyc.com' });
const TELEGRAM_BOT_TOKEN = defineSecret('TELEGRAM_BOT_TOKEN');
const TELEGRAM_CHAT_ID = defineSecret('TELEGRAM_CHAT_ID');

export const weeklySeoReport = onSchedule(
  {
    schedule: 'every monday 09:00',
    timeZone: 'Asia/Colombo',
    memory: '512MiB',
    timeoutSeconds: 300,
    retryCount: 1,
    secrets: [TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID],
  },
  async () => {
    const report = await runSeoReport({ siteUrl: SITE_URL.value(), property: GSC_PROPERTY.value() });
    const id = report.search?.window.current.end ?? report.generatedAt.slice(0, 10);
    await db.collection('seoReports').doc(id).set(report);
    logger.info('SEO report saved', { id, crawlErrors: report.crawl?.errors, searchError: report.searchError });
    await sendTelegram(TELEGRAM_BOT_TOKEN.value(), TELEGRAM_CHAT_ID.value(), formatMessage(report));
  },
);

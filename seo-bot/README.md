# MeritCyc SEO bot

A scheduled Firebase Function that runs **every Monday 09:00 (Asia/Colombo)**:

1. **Search Console** – last 28 days vs the previous 28: clicks, impressions, avg position, queries close to the top (pos 4–20), page-1 rankings with low CTR, ranking drops/gains, new queries.
2. **Site crawl** – robots.txt, sitemap and every page in it: status/redirects, noindex, title & description length, canonical, `<h1>`, image alt text, thin content, duplicate titles/descriptions, broken internal links and schema images.
3. Saves the full report to Firestore `seoReports/{YYYY-MM-DD}` and sends a summary to **Telegram**.

Cost: one run a week is well inside the free tiers (the project must be on the Blaze plan for scheduled functions).

## One-time setup

```bash
# 1. Enable the Search Console API
gcloud services enable searchconsole.googleapis.com --project meritcyc-7a683

# 2. Find the function's service account (default compute SA)
gcloud projects describe meritcyc-7a683 --format='value(projectNumber)'
#    → PROJECT_NUMBER-compute@developer.gserviceaccount.com
```

3. **Search Console** → *Settings → Users and permissions → Add user* → paste that service account email, permission **Restricted**.
4. **Telegram**: message [@BotFather](https://t.me/BotFather) → `/newbot` → copy the token. Send your new bot any message, then open `https://api.telegram.org/bot<TOKEN>/getUpdates` and copy `chat.id`.
5. Store both as secrets:

```bash
firebase functions:secrets:set TELEGRAM_BOT_TOKEN
firebase functions:secrets:set TELEGRAM_CHAT_ID
```

`SITE_URL` and `GSC_PROPERTY` live in `seo-bot/.env` (not secret). `sc-domain:meritcyc.com` is a Domain property; use `https://meritcyc.com/` if yours is a URL-prefix property.

## Deploy

```bash
firebase deploy --only functions:seo-bot
```

Run it immediately instead of waiting for Monday: Google Cloud console → **Cloud Scheduler** → `firebase-schedule-weeklySeoReport-…` → **Force run**.

## Local

```bash
cd seo-bot && npm ci
npm test                                   # unit tests
npm run report -- --skip-search            # crawl the live site only
npm run report -- --skip-search --fetch-origin http://localhost:3000   # crawl a local preview
npm run report                             # full report (needs gcloud ADC with the webmasters.readonly scope)
```

The CLI exits with code 1 when the crawl finds errors, so it can also gate CI.

## Layout

| File | Role |
|---|---|
| `src/analyze.ts` | Pure Search Console maths (tested) |
| `src/audit.ts` | Pure per-page HTML checks (tested) |
| `src/crawl.ts` | robots / sitemap / page / link fetching |
| `src/gsc.ts` | Search Console REST client + date windows |
| `src/report.ts` | Report object + Telegram/terminal text |
| `src/index.ts` | Scheduled function |
| `src/cli.ts` | Local runner |

# MeritCyc SEO bot

A scheduled Firebase Function that runs **every Monday 09:00 (Asia/Colombo)**:

1. **Search Console** – last 28 days vs the previous 28: clicks, impressions, avg position, queries close to the top (pos 4–20), page-1 rankings with low CTR, ranking drops/gains, new queries.
2. **Site crawl** – robots.txt, sitemap and every page in it: status/redirects, noindex, title & description length, canonical, `<h1>`, image alt text, thin content, duplicate titles/descriptions, broken internal links and schema images.
3. Saves the full report to Firestore `seoReports/{YYYY-MM-DD}` and **emails** you a summary (via [Resend](https://resend.com), free up to 3,000 emails/month).

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
4. **Email**: sign up at [resend.com](https://resend.com) **with the address you want the reports sent to**, then *API Keys → Create* (permission: Sending access).
5. Store the key and your address as secrets (the address is a secret so it never appears in this public repo; comma-separate several):

```bash
firebase functions:secrets:set RESEND_API_KEY
firebase functions:secrets:set REPORT_EMAIL
```

By default mail is sent from Resend's shared `onboarding@resend.dev` address, which **only delivers to your own Resend account email**, with no DNS setup. To send from `seo@meritcyc.com` or to other people, verify `meritcyc.com` under *Resend → Domains* (adds a few DNS records), then create `seo-bot/.env.meritcyc-7a683` containing `EMAIL_FROM=MeritCyc SEO <seo@meritcyc.com>` and redeploy.

`SITE_URL` and `GSC_PROPERTY` default to `https://meritcyc.com` and `sc-domain:meritcyc.com` (see `src/index.ts`). `sc-domain:meritcyc.com` is a Domain property; use `https://meritcyc.com/` if yours is a URL-prefix property.

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
npm run report -- --skip-search --email-html preview.html   # also write the email to a file to preview
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
| `src/report.ts` | Report object + email HTML / terminal text |
| `src/notify.ts` | Email via Resend |
| `src/index.ts` | Scheduled function |
| `src/cli.ts` | Local runner |

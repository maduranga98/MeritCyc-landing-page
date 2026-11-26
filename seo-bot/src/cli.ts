/**
 * Run the report locally:  npm run report -- [--skip-search] [--fetch-origin http://localhost:3000] [--json] [--email-html out.html]
 * Search Console needs:   gcloud auth application-default login --scopes=https://www.googleapis.com/auth/webmasters.readonly,https://www.googleapis.com/auth/cloud-platform
 */
import { writeFileSync } from 'node:fs';
import { parseArgs } from 'node:util';
import { formatEmail, formatText } from './report.js';
import { runSeoReport } from './run.js';

const { values } = parseArgs({
  options: {
    site: { type: 'string', default: process.env.SITE_URL ?? 'https://meritcyc.com' },
    property: { type: 'string', default: process.env.GSC_PROPERTY ?? 'sc-domain:meritcyc.com' },
    'fetch-origin': { type: 'string' },
    'skip-search': { type: 'boolean', default: false },
    json: { type: 'boolean', default: false },
    'email-html': { type: 'string' }, // write the email HTML to this path for previewing
  },
});

const report = await runSeoReport({
  siteUrl: values.site,
  property: values.property,
  fetchOrigin: values['fetch-origin'],
  skipSearch: values['skip-search'],
});
if (values['email-html']) writeFileSync(values['email-html'], formatEmail(report));
console.log(values.json ? JSON.stringify(report, null, 2) : formatText(report));
process.exitCode = report.crawl?.errors ? 1 : 0;

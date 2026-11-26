/**
 * Run the report locally:  npm run report -- [--skip-search] [--fetch-origin http://localhost:3000] [--json]
 * Search Console needs:   gcloud auth application-default login --scopes=https://www.googleapis.com/auth/webmasters.readonly,https://www.googleapis.com/auth/cloud-platform
 */
import { parseArgs } from 'node:util';
import { formatMessage } from './report.js';
import { runSeoReport } from './run.js';

const { values } = parseArgs({
  options: {
    site: { type: 'string', default: process.env.SITE_URL ?? 'https://meritcyc.com' },
    property: { type: 'string', default: process.env.GSC_PROPERTY ?? 'sc-domain:meritcyc.com' },
    'fetch-origin': { type: 'string' },
    'skip-search': { type: 'boolean', default: false },
    json: { type: 'boolean', default: false },
  },
});

const report = await runSeoReport({
  siteUrl: values.site,
  property: values.property,
  fetchOrigin: values['fetch-origin'],
  skipSearch: values['skip-search'],
});
console.log(values.json ? JSON.stringify(report, null, 2) : formatMessage(report, false));
process.exitCode = report.crawl?.errors ? 1 : 0;

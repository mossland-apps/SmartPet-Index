import { products, brands } from '../lib/catalog.js';
import { BEST_OF_LISTS } from '../lib/rankings.js';
import { expectedRoutes, troubleshootingPath } from '../lib/routes.js';
import { troubleshootingHubs } from '../lib/troubleshooting.js';
import { featuredComparisons } from '../lib/comparisons.js';
import { SITE } from '../config/site.js';

// The sitemap lists only pages we want in Google's index. Pages carrying noindex
// — auto-generated comparisons and thin troubleshooting hubs — stay out, so the
// two signals never contradict each other.
export function GET() {
  const hidden = new Set(
    troubleshootingHubs.filter((h) => !h.indexable).map((h) => troubleshootingPath(h.product))
  );

  const routes = new Set(
    expectedRoutes({ products, brands, lists: BEST_OF_LISTS }).filter((r) => !hidden.has(r))
  );
  for (const c of featuredComparisons) routes.add('/compare/' + c.slug + '/');

  const urls = [...routes].map((r) => '  <url><loc>' + SITE.url + r + '</loc></url>').join('\n');
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls +
    '\n</urlset>\n';
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}

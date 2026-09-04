import { products, brands } from '../lib/catalog.js';
import { BEST_OF_LISTS } from '../lib/rankings.js';
import { expectedRoutes, comparePath } from '../lib/routes.js';
import { SITE } from '../config/site.js';

export function GET() {
  const routes = new Set(expectedRoutes({ products, brands, lists: BEST_OF_LISTS }));
  for (let i = 0; i < products.length; i += 1) {
    for (let j = i + 1; j < products.length; j += 1) {
      routes.add(comparePath(products[i].slug, products[j].slug));
    }
  }
  const urls = [...routes]
    .map((r) => '  <url><loc>' + SITE.url + r + '</loc></url>')
    .join('\n');
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls +
    '\n</urlset>\n';
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}

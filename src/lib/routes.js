import { comparePairSlug } from './compare.js';
import { guides } from './guides.js';

export const productPath = (slug) => '/reviews/' + slug + '/';
export const listPath = (slug) => '/litter-boxes/' + slug + '/';
export const brandPath = (slug) => '/brands/' + slug + '/';
export const troubleshootingPath = (slug) => '/troubleshooting/' + slug + '/';
export const guidePath = (slug) => '/guides/' + slug + '/';
export const comparePath = (a, b) => '/compare/' + comparePairSlug(a, b) + '/';

export const STATIC_ROUTES = [
  '/',
  '/litter-boxes/',
  '/reviews/',
  '/brands/',
  '/compare/',
  '/troubleshooting/',
  '/guides/',
  '/how-we-test/',
  '/about/',
  '/about/disclosure/',
  '/about/contact/',
];

export { guides as GUIDES } from './guides.js';

export function expectedRoutes({ products = [], brands = [], lists = [] } = {}) {
  return [
    ...STATIC_ROUTES,
    ...lists.map((l) => listPath(l.slug)),
    ...products.map((p) => productPath(p.slug)),
    ...products.map((p) => troubleshootingPath(p.slug)),
    ...brands.map((b) => brandPath(b.slug)),
    ...guides.map((g) => guidePath(g.slug)),
  ];
}

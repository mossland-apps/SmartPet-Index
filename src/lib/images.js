import { SITE } from '../config/site.js';

// Social scrapers crop to 1200x630. Google's product image wants a clean square.
export const OG_SIZE = { width: 1200, height: 630 };
export const PRODUCT_IMAGE_SIZE = { width: 1200, height: 1200 };

export const DEFAULT_OG = '/og/default.png';

export const productImagePath = (slug) => '/img/products/' + slug + '.png';
export const productOgPath = (slug) => '/og/products/' + slug + '.png';
export const listOgPath = (slug) => '/og/rankings/' + slug + '.png';
export const guideOgPath = (slug) => '/og/guides/' + slug + '.png';

export function absoluteUrl(path) {
  if (/^https?:\/\//.test(path)) return path;
  return SITE.url + path;
}

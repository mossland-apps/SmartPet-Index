// Outbound retailer links. One place, so a tag change is a one-line edit.

export const AMAZON_TAG = 'rainpuddle-20';

const ASIN_PATTERN = /^[A-Z0-9]{10}$/;

// Direct product links convert far better than dropping someone on a search page,
// so a product without an ASIN is a gap worth closing rather than a normal state.
export function amazonUrl(product) {
  const asin = product && product.asin;
  if (asin) {
    if (!ASIN_PATTERN.test(asin)) {
      throw new Error('Invalid ASIN for ' + (product.model || 'unknown product') + ': ' + asin);
    }
    return 'https://www.amazon.com/dp/' + asin + '?tag=' + AMAZON_TAG;
  }
  const params = new URLSearchParams({ k: product.model, tag: AMAZON_TAG });
  return 'https://www.amazon.com/s?' + params.toString();
}

export function chewyUrl(product) {
  const params = new URLSearchParams({ query: product.model });
  return 'https://www.chewy.com/s?' + params.toString();
}

export function retailerLinks(product) {
  return [
    { name: 'Amazon', href: amazonUrl(product), rel: 'nofollow sponsored noopener' },
    { name: 'Chewy', href: chewyUrl(product), rel: 'nofollow sponsored noopener' },
  ];
}

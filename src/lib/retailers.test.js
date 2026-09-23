import { describe, it, expect } from 'vitest';
import { AMAZON_TAG, amazonUrl, retailerLinks } from './retailers.js';
import { products } from './catalog.js';

describe('amazon associate links', () => {
  it('uses our associate tag', () => {
    expect(AMAZON_TAG).toBe('rainpuddle-20');
  });

  it('links straight to the product when we know its ASIN', () => {
    expect(amazonUrl({ asin: 'B0CSKBWBF6', model: 'Neakasa M1 Plus' })).toBe(
      'https://www.amazon.com/dp/B0CSKBWBF6?tag=rainpuddle-20'
    );
  });

  it('falls back to a tagged search when we have no ASIN', () => {
    const url = amazonUrl({ model: 'Some Box' });
    expect(url.startsWith('https://www.amazon.com/s?')).toBe(true);
    expect(url).toContain('k=Some+Box');
    expect(url).toContain('tag=rainpuddle-20');
  });

  it('rejects a malformed ASIN rather than emitting a dead link', () => {
    expect(() => amazonUrl({ asin: 'nope', model: 'X' })).toThrow(/ASIN/);
  });

  it('builds one labelled link per retailer', () => {
    const links = retailerLinks({ asin: 'B0CSKBWBF6', model: 'Neakasa M1 Plus' });
    const amazon = links.find((l) => l.name === 'Amazon');
    expect(amazon.href).toContain('/dp/B0CSKBWBF6');
    expect(amazon.href).toContain('tag=rainpuddle-20');
    for (const link of links) {
      expect(link.rel).toBe('nofollow sponsored noopener');
    }
  });

  it('tags every amazon link for every product in the catalog', () => {
    for (const p of products) {
      const amazon = retailerLinks(p).find((l) => l.name === 'Amazon');
      expect(amazon.href, p.slug).toContain('tag=rainpuddle-20');
    }
  });
});

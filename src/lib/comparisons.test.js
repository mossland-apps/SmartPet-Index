import { describe, it, expect } from 'vitest';
import { products } from './catalog.js';
import { featuredComparisons, getFeaturedComparison, isFeaturedPair } from './comparisons.js';
import { comparePairSlug } from './compare.js';

describe('featured comparisons', () => {
  it('keeps the set small — these are the only comparison pages offered to search engines', () => {
    expect(featuredComparisons.length).toBeGreaterThanOrEqual(3);
    expect(featuredComparisons.length).toBeLessThanOrEqual(12);
  });

  it('only features pairs of real, current, verified products', () => {
    for (const c of featuredComparisons) {
      for (const slug of c.pair) {
        const p = products.find((x) => x.slug === slug);
        expect(p, c.slug + ' names missing product ' + slug).toBeDefined();
        expect(p.lastVerified, slug + ' is not verified').toBeTruthy();
        expect((p.availability ?? 'current'), slug).toBe('current');
      }
    }
  });

  it('stores each pair under its canonical alphabetical slug', () => {
    for (const c of featuredComparisons) {
      expect(c.slug).toBe(comparePairSlug(c.pair[0], c.pair[1]));
    }
  });

  it('gives every featured comparison a written verdict, not just two tables', () => {
    for (const c of featuredComparisons) {
      expect(c.summary.length, c.slug).toBeGreaterThan(120);
      expect(c.chooseA.length, c.slug).toBeGreaterThanOrEqual(2);
      expect(c.chooseB.length, c.slug).toBeGreaterThanOrEqual(2);
    }
  });

  it('looks a featured pair up from either order', () => {
    const c = featuredComparisons[0];
    expect(getFeaturedComparison(c.slug)).toBe(c);
    expect(isFeaturedPair(c.pair[1], c.pair[0])).toBe(true);
    expect(isFeaturedPair('nope', 'nada')).toBe(false);
  });
});

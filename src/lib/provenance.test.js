import { describe, it, expect } from 'vitest';
import { products } from './catalog.js';
import { BEST_OF_LISTS, resolveList } from './rankings.js';

const VERIFIED_SLUGS = [
  'litter-robot-4',
  'casa-leo-leos-loo-too',
  'petkit-purobot-ultra',
  'neakasa-m1-plus',
  'petsnowy-snow-plus',
  'catlink-ultra',
  'catlink-scoop-robot-pro',
  'petkit-pura-max-2',
  'catlink-luxury-pro-x',
  'omega-paw-roll-n-clean',
  'petsafe-scoopfree-smartspin',
  'meowant-sc02',
  'meowant-sc10',
  'catlink-open-x',
  'petpivot-open-top',
  'petsafe-scoopfree-crystal-pro-legacy',
];

const MAX_AGE_DAYS = 45;
const ASIN = /^[A-Z0-9]{10}$/;

function daysOld(iso) {
  return (Date.now() - Date.parse(iso)) / 86400000;
}

describe('product provenance', () => {
  it('records where every verified figure came from', () => {
    for (const slug of VERIFIED_SLUGS) {
      const p = products.find((x) => x.slug === slug);
      expect(p, slug + ' is missing').toBeDefined();
      expect(Array.isArray(p.sources) && p.sources.length > 0, slug + ': no sources').toBe(true);
      for (const source of p.sources) {
        expect(source.name, slug).toBeTruthy();
        expect(source.url.startsWith('https://'), slug + ': ' + source.url).toBe(true);
      }
    }
  });

  it('only cites manufacturer sites and current retail listings', () => {
    // Blogs, aggregators and old review sites are how we got burned the first time.
    const banned = /blog|medium\.com|reddit|pinterest|wordpress|youtube/i;
    for (const p of products) {
      for (const source of p.sources || []) {
        expect(banned.test(source.url), p.slug + ': ' + source.url).toBe(false);
      }
    }
  });

  it('stamps a verification date on every verified product', () => {
    for (const slug of VERIFIED_SLUGS) {
      const p = products.find((x) => x.slug === slug);
      expect(p.lastVerified, slug + ': never verified').toBeTruthy();
      expect(Number.isNaN(Date.parse(p.lastVerified)), slug).toBe(false);
    }
  });

  it('fails once verified data goes stale', () => {
    const stale = VERIFIED_SLUGS.map((slug) => products.find((x) => x.slug === slug))
      .filter((p) => daysOld(p.lastVerified) > MAX_AGE_DAYS)
      .map((p) => p.slug + ' (' + Math.round(daysOld(p.lastVerified)) + ' days)');
    expect(stale, 'prices and models move — re-check these against the brand listing').toEqual([]);
  });

  it('gives every verified product a well-formed ASIN', () => {
    for (const slug of VERIFIED_SLUGS) {
      const p = products.find((x) => x.slug === slug);
      expect(ASIN.test(p.asin || ''), slug + ': bad ASIN ' + p.asin).toBe(true);
    }
  });

  it('never carries a stated cost without a source to back it', () => {
    for (const p of products) {
      const hasCost =
        typeof p.specs.replacementCost === 'number' || typeof p.specs.filterCost === 'number';
      if (hasCost && VERIFIED_SLUGS.includes(p.slug)) {
        expect(p.sources?.length, p.slug + ': cost figure with no source').toBeGreaterThan(0);
      }
    }
  });
});

describe('availability', () => {
  it('keeps unbuyable products out of every recommendation list', () => {
    const unbuyable = products.filter((p) => (p.availability ?? 'current') !== 'current');
    expect(unbuyable.length, 'expected some retired products').toBeGreaterThan(0);
    for (const list of BEST_OF_LISTS) {
      const ranked = resolveList(list, products).map((e) => e.product.slug);
      for (const p of unbuyable) {
        expect(ranked, list.slug + ' recommends ' + p.slug).not.toContain(p.slug);
      }
    }
  });

  it('explains itself and points somewhere useful whenever a product is not current', () => {
    for (const p of products) {
      if ((p.availability ?? 'current') === 'current') continue;
      expect(p.availabilityNote?.length, p.slug + ': no explanation').toBeGreaterThan(40);
      expect(products.some((x) => x.slug === p.supersededBy), p.slug + ': bad supersededBy').toBe(true);
    }
  });
});

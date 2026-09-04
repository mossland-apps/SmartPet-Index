import { describe, it, expect } from 'vitest';
import { products, brands, getProduct, getBrand, productsByBrand } from './catalog.js';
import { validateProduct } from './schema.js';
import { BEST_OF_LISTS, resolveList } from './rankings.js';

describe('catalog data integrity', () => {
  it('ships at least eleven litter boxes', () => {
    expect(products.length).toBeGreaterThanOrEqual(11);
  });

  it('has no duplicate slugs', () => {
    const slugs = products.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('validates every product against the schema', () => {
    const failures = products
      .map((p) => [p.slug, validateProduct(p)])
      .filter(([, errs]) => errs.length);
    expect(failures).toEqual([]);
  });

  it('points every product at a brand that exists', () => {
    for (const p of products) {
      expect(getBrand(p.brand), `missing brand ${p.brand}`).toBeDefined();
    }
  });

  it('gives every brand at least one product', () => {
    for (const b of brands) {
      expect(productsByBrand(b.slug).length, `empty brand ${b.slug}`).toBeGreaterThan(0);
    }
  });

  it('looks products up by slug', () => {
    expect(getProduct(products[0].slug).model).toBe(products[0].model);
    expect(getProduct('nope')).toBeUndefined();
  });

  it('fills every best-of list with at least three real products', () => {
    for (const list of BEST_OF_LISTS) {
      expect(resolveList(list, products).length, `thin list ${list.slug}`).toBeGreaterThanOrEqual(3);
    }
  });

  it('gives every product real prose, not lorem placeholder', () => {
    for (const p of products) {
      expect(p.verdict.length, p.slug).toBeGreaterThan(80);
      expect(p.pros.length).toBeGreaterThanOrEqual(3);
      expect(p.cons.length).toBeGreaterThanOrEqual(2);
      expect(p.verdict.toLowerCase()).not.toContain('lorem');
    }
  });

  it('gives every product all eight structured review sections', () => {
    const required = [
      'setup', 'app', 'odorControl', 'noise',
      'cleaning', 'safety', 'consumables', 'longTermCost',
    ];
    for (const p of products) {
      expect(p.sections, p.slug).toBeDefined();
      for (const key of required) {
        expect(typeof p.sections[key], p.slug + '.' + key).toBe('string');
        expect(p.sections[key].length, p.slug + '.' + key).toBeGreaterThan(20);
      }
    }
  });

  it('marks every launch product as research-scored, not hands-on tested', () => {
    for (const p of products) {
      expect(p.scoreBasis).toBe('research');
    }
  });
});

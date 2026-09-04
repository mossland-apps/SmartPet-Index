import { describe, it, expect } from 'vitest';
import { BEST_OF_LISTS, resolveList, getList } from './rankings.js';

const products = [
  {
    slug: 'pricey-smart', model: 'Pricey Smart', price: 700, category: 'litter-boxes',
    specs: { wifi: true, bagType: 'standard kitchen bags', maximumCatWeight: '20 lb', multiCatCapable: true },
    scores: { cleaning: 9, odorControl: 9, safety: 9, app: 9, maintenance: 9, value: 6 },
  },
  {
    slug: 'cheap-dumb', model: 'Cheap Dumb', price: 180, category: 'litter-boxes',
    specs: { wifi: false, bagType: 'proprietary', maximumCatWeight: '15 lb', multiCatCapable: false },
    scores: { cleaning: 6, odorControl: 6, safety: 7, app: 0, maintenance: 6, value: 9 },
  },
  {
    slug: 'mid-open', model: 'Mid Open', price: 420, category: 'litter-boxes',
    specs: { wifi: true, bagType: 'standard kitchen bags', maximumCatWeight: '22 lb', multiCatCapable: true },
    scores: { cleaning: 8, odorControl: 9.5, safety: 8, app: 7, maintenance: 8, value: 8 },
  },
];

describe('best-of lists', () => {
  it('defines the seven launch lists with slugs and titles', () => {
    const slugs = BEST_OF_LISTS.map((l) => l.slug);
    expect(slugs).toEqual([
      'best-automatic-litter-boxes',
      'best-smart-litter-boxes',
      'best-litter-boxes-for-multiple-cats',
      'best-litter-boxes-for-large-cats',
      'best-litter-boxes-for-odor-control',
      'best-budget-automatic-litter-boxes',
      'best-litter-boxes-without-proprietary-bags',
    ]);
    for (const list of BEST_OF_LISTS) {
      expect(list.title.length).toBeGreaterThan(5);
      expect(list.intro.length).toBeGreaterThan(20);
      expect(list.cardLabel.length).toBeGreaterThan(3);
      expect(list.cardLabel.toLowerCase().startsWith('best')).toBe(false);
    }
  });

  it('looks a list up by slug', () => {
    expect(getList('best-smart-litter-boxes').slug).toBe('best-smart-litter-boxes');
    expect(getList('nope')).toBeUndefined();
  });

  it('ranks the overall list by overall score, best first', () => {
    const ranked = resolveList(getList('best-automatic-litter-boxes'), products);
    expect(ranked.map((r) => r.product.slug)).toEqual(['pricey-smart', 'mid-open', 'cheap-dumb']);
    expect(ranked[0].rank).toBe(1);
  });

  it('excludes non-wifi models from the smart list', () => {
    const ranked = resolveList(getList('best-smart-litter-boxes'), products);
    expect(ranked.map((r) => r.product.slug)).not.toContain('cheap-dumb');
  });

  it('sorts the odor list by odour score, not overall', () => {
    const ranked = resolveList(getList('best-litter-boxes-for-odor-control'), products);
    expect(ranked[0].product.slug).toBe('mid-open');
  });

  it('keeps only sub-$350 models in the budget list', () => {
    const ranked = resolveList(getList('best-budget-automatic-litter-boxes'), products);
    expect(ranked.map((r) => r.product.slug)).toEqual(['cheap-dumb']);
  });

  it('excludes proprietary-bag models from the no-proprietary-bags list', () => {
    const ranked = resolveList(getList('best-litter-boxes-without-proprietary-bags'), products);
    expect(ranked.map((r) => r.product.slug)).not.toContain('cheap-dumb');
  });

  it('keeps only models rated for 20 lb cats in the large-cat list', () => {
    const ranked = resolveList(getList('best-litter-boxes-for-large-cats'), products);
    expect(ranked.map((r) => r.product.slug).sort()).toEqual(['mid-open', 'pricey-smart']);
  });

  it('gives each ranked entry an award label for the top three', () => {
    const ranked = resolveList(getList('best-automatic-litter-boxes'), products);
    expect(ranked[0].award).toBeTruthy();
    expect(typeof ranked[0].award).toBe('string');
  });
});

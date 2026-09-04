import { describe, it, expect } from 'vitest';
import { annualRunningCost, costOverYears, ownershipTable, relatedProducts } from './ownership.js';

const boxA = {
  slug: 'a',
  model: 'A',
  price: 700,
  specs: { replacementCost: 30, filterCost: 60, bagType: 'Standard kitchen bags' },
  scores: { cleaning: 9, odorControl: 9, safety: 9, app: 9, maintenance: 9, value: 7 },
};
const boxB = {
  slug: 'b',
  model: 'B',
  price: 229,
  specs: { replacementCost: 220, filterCost: 0, bagType: 'Proprietary disposable crystal tray' },
  scores: { cleaning: 7, odorControl: 7, safety: 7, app: 7, maintenance: 7, value: 7 },
};
const boxC = {
  slug: 'c',
  model: 'C',
  price: 649,
  specs: { replacementCost: 120, filterCost: 45, bagType: 'Proprietary sealing film cartridge' },
  scores: { cleaning: 8, odorControl: 9, safety: 8, app: 8, maintenance: 8, value: 7 },
};

describe('cost of ownership', () => {
  it('adds bag and filter costs into one annual figure', () => {
    expect(annualRunningCost(boxA)).toBe(90);
    expect(annualRunningCost(boxB)).toBe(220);
  });

  it('treats missing consumable costs as zero, not as an error', () => {
    expect(annualRunningCost({ specs: {} })).toBe(0);
  });

  it('adds purchase price to running cost across a span of years', () => {
    expect(costOverYears(boxA, 1)).toBe(790);
    expect(costOverYears(boxA, 4)).toBe(1060);
    expect(costOverYears(boxB, 4)).toBe(1109);
  });

  it('shows the cheap box overtaking the expensive one', () => {
    // The whole point of publishing this table.
    expect(costOverYears(boxB, 1)).toBeLessThan(costOverYears(boxA, 1));
    expect(costOverYears(boxB, 4)).toBeGreaterThan(costOverYears(boxA, 4));
  });

  it('builds a year-by-year table with a break-even flag', () => {
    const rows = ownershipTable(boxB, boxA, [1, 2, 3, 4, 5]);
    expect(rows).toHaveLength(5);
    expect(rows[0].year).toBe(1);
    expect(rows[0].cheaper).toBe('a');
    expect(rows.at(-1).cheaper).toBe('b');
  });
});

describe('related products', () => {
  it('never returns the product itself', () => {
    const related = relatedProducts(boxA, [boxA, boxB, boxC]);
    expect(related.map((p) => p.slug)).not.toContain('a');
  });

  it('returns the nearest priced alternatives first', () => {
    const related = relatedProducts(boxA, [boxA, boxB, boxC]);
    expect(related[0].slug).toBe('c');
  });

  it('caps the list', () => {
    const many = Array.from({ length: 20 }, (_, i) => ({
      ...boxC,
      slug: 's' + i,
      price: 100 + i * 10,
    }));
    expect(relatedProducts(boxA, [boxA, ...many]).length).toBeLessThanOrEqual(3);
  });
});

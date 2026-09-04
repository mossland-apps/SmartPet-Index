import { describe, it, expect } from 'vitest';
import { buildComparison, comparePairSlug, parsePairSlug } from './compare.js';

const a = {
  slug: 'litter-robot-4',
  model: 'Litter-Robot 4',
  price: 699,
  specs: { entryHeight: '8.5 in', wifi: true, bagType: 'standard kitchen bags' },
  scores: { cleaning: 9.1, odorControl: 8.8, safety: 9.4, app: 8.9, maintenance: 8.6, value: 7.2 },
};
const b = {
  slug: 'catlink-scooper-pro-x',
  model: 'CATLINK Scooper Pro X',
  price: 499,
  specs: { entryHeight: '6.7 in', wifi: true, bagType: 'proprietary' },
  scores: { cleaning: 8.4, odorControl: 8.2, safety: 8.0, app: 7.6, maintenance: 7.9, value: 8.3 },
};

describe('compare', () => {
  it('returns one aligned row per standardized spec field', () => {
    const rows = buildComparison(a, b).specRows;
    const entry = rows.find((r) => r.key === 'entryHeight');
    expect(entry.label).toBe('Entry height');
    expect(entry.a).toBe('8.5 in');
    expect(entry.b).toBe('6.7 in');
  });

  it('fills missing spec values with a dash rather than dropping the row', () => {
    const rows = buildComparison(a, b).specRows;
    const missing = rows.find((r) => r.key === 'warranty');
    expect(missing).toBeDefined();
    expect(missing.a).toBe('—');
  });

  it('renders booleans as Yes and No', () => {
    const rows = buildComparison(a, b).specRows;
    expect(rows.find((r) => r.key === 'wifi').a).toBe('Yes');
  });

  it('flags which side is different', () => {
    const rows = buildComparison(a, b).specRows;
    expect(rows.find((r) => r.key === 'wifi').differs).toBe(false);
    expect(rows.find((r) => r.key === 'bagType').differs).toBe(true);
  });

  it('marks the winner on each score row', () => {
    const rows = buildComparison(a, b).scoreRows;
    expect(rows.find((r) => r.key === 'cleaning').winner).toBe('a');
    expect(rows.find((r) => r.key === 'value').winner).toBe('b');
  });

  it('includes an overall row', () => {
    const c = buildComparison(a, b);
    expect(c.overall.a).toBeGreaterThan(0);
    expect(c.overall.b).toBeGreaterThan(0);
  });

  it('builds and parses a stable alphabetical pair slug', () => {
    expect(comparePairSlug(a, b)).toBe('catlink-scooper-pro-x-vs-litter-robot-4');
    expect(comparePairSlug(b, a)).toBe('catlink-scooper-pro-x-vs-litter-robot-4');
    expect(parsePairSlug('catlink-scooper-pro-x-vs-litter-robot-4')).toEqual([
      'catlink-scooper-pro-x',
      'litter-robot-4',
    ]);
  });
});

import { describe, it, expect } from 'vitest';
import {
  PRODUCT_REQUIRED_FIELDS,
  SPEC_FIELDS,
  SCORE_CATEGORIES,
  validateProduct,
} from './schema.js';

const valid = {
  slug: 'litter-robot-4',
  brand: 'litter-robot',
  model: 'Litter-Robot 4',
  category: 'litter-boxes',
  price: 699,
  releaseYear: 2022,
  specs: {
    dimensions: '22 x 27 x 29.5 in',
    footprint: '22 x 27 in',
    entryHeight: '8.5 in',
    weight: '24 lb',
    minimumCatWeight: '3 lb',
    maximumCatWeight: '20 lb',
    wasteCapacity: '9 L',
    litterTypes: ['clumping clay'],
    wifi: true,
    app: 'Whisker',
    odorSystem: 'OdorTrap + carbon filter',
    safetySensors: ['weight', 'laser', 'pinch detect'],
    noiseLevel: '38 dB',
    warranty: '1 year',
    bagType: 'standard kitchen bags',
    replacementCost: 0,
    filterCost: 25,
  },
  scores: {
    cleaning: 9.1,
    odorControl: 8.8,
    safety: 9.4,
    app: 8.9,
    maintenance: 8.6,
    value: 7.2,
  },
  scoreBasis: 'research',
  testedDate: null,
  verdict: 'Placeholder verdict.',
  pros: ['Quiet'],
  cons: ['Expensive'],
  bestFor: ['Multiple cats'],
  notIdealFor: ['Tight budgets'],
};

describe('product schema', () => {
  it('exposes the standardized spec field list', () => {
    expect(SPEC_FIELDS).toContain('entryHeight');
    expect(SPEC_FIELDS).toContain('maximumCatWeight');
    expect(SPEC_FIELDS).toContain('bagType');
    expect(SPEC_FIELDS).toContain('replacementCost');
  });

  it('exposes exactly six score categories', () => {
    expect(SCORE_CATEGORIES.map((c) => c.key)).toEqual([
      'cleaning',
      'odorControl',
      'safety',
      'app',
      'maintenance',
      'value',
    ]);
  });

  it('accepts a well-formed product', () => {
    expect(validateProduct(valid)).toEqual([]);
  });

  it('reports every missing required field', () => {
    const errors = validateProduct({ slug: 'x' });
    for (const field of PRODUCT_REQUIRED_FIELDS) {
      if (field === 'slug') continue;
      expect(errors.join(' ')).toContain(field);
    }
  });

  it('rejects a score outside 0-10', () => {
    const bad = { ...valid, scores: { ...valid.scores, cleaning: 11 } };
    expect(validateProduct(bad).join(' ')).toMatch(/cleaning/);
  });

  it('rejects a missing score category', () => {
    const { value, ...rest } = valid.scores;
    const bad = { ...valid, scores: rest };
    expect(validateProduct(bad).join(' ')).toMatch(/value/);
  });

  it('rejects an unknown scoreBasis', () => {
    const bad = { ...valid, scoreBasis: 'vibes' };
    expect(validateProduct(bad).join(' ')).toMatch(/scoreBasis/);
  });

  it('requires every standardized spec key to be present', () => {
    const bad = { ...valid, specs: { ...valid.specs } };
    delete bad.specs.entryHeight;
    expect(validateProduct(bad).join(' ')).toMatch(/entryHeight/);
  });
});

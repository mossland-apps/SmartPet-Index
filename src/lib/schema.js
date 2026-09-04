// The standardized product model. Every litter box is stored as one of these,
// so rankings, comparison tables and review pages all read the same source.

export const SPEC_FIELD_DEFS = [
  { key: 'dimensions', label: 'Dimensions (W x D x H)', group: 'Size & fit' },
  { key: 'footprint', label: 'Floor footprint', group: 'Size & fit' },
  { key: 'entryHeight', label: 'Entry height', group: 'Size & fit' },
  { key: 'weight', label: 'Unit weight', group: 'Size & fit' },
  { key: 'minimumCatWeight', label: 'Minimum cat weight', group: 'Size & fit' },
  { key: 'maximumCatWeight', label: 'Maximum cat weight', group: 'Size & fit' },
  { key: 'wasteCapacity', label: 'Waste drawer capacity', group: 'Capacity & litter' },
  { key: 'litterTypes', label: 'Litter types accepted', group: 'Capacity & litter' },
  { key: 'wifi', label: 'Wi-Fi', group: 'Smart features' },
  { key: 'app', label: 'App', group: 'Smart features' },
  { key: 'odorSystem', label: 'Odor system', group: 'Odor & noise' },
  { key: 'noiseLevel', label: 'Measured noise', group: 'Odor & noise' },
  { key: 'safetySensors', label: 'Safety sensors', group: 'Safety' },
  { key: 'bagType', label: 'Waste bag type', group: 'Running costs' },
  { key: 'replacementCost', label: 'Bag cost per year', group: 'Running costs' },
  { key: 'filterCost', label: 'Filter cost per year', group: 'Running costs' },
  { key: 'warranty', label: 'Warranty', group: 'Running costs' },
];

export const SPEC_FIELDS = SPEC_FIELD_DEFS.map((f) => f.key);

// Optional fields: recorded where known, never required, still comparable.
export const OPTIONAL_SPEC_FIELD_DEFS = [
  { key: 'multiCatCapable', label: 'Rated for multiple cats', group: 'Capacity & litter' },
  { key: 'catsSupported', label: 'Cats supported', group: 'Capacity & litter' },
  { key: 'cycleTime', label: 'Cycle time', group: 'Odor & noise' },
  { key: 'power', label: 'Power', group: 'Smart features' },
];

export const ALL_SPEC_FIELD_DEFS = [...SPEC_FIELD_DEFS, ...OPTIONAL_SPEC_FIELD_DEFS];

export const SCORE_CATEGORIES = [
  { key: 'cleaning', label: 'Cleaning', blurb: 'How completely and reliably it clears waste on every cycle.' },
  { key: 'odorControl', label: 'Odor control', blurb: 'Seal quality, filtration, and how the room smells after a week.' },
  { key: 'safety', label: 'Safety', blurb: 'Sensor coverage, pinch protection, and behaviour when a cat re-enters.' },
  { key: 'app', label: 'App', blurb: 'Setup, connection reliability, and whether the data is actually useful.' },
  { key: 'maintenance', label: 'Maintenance', blurb: 'How long a full clean takes and how well the unit comes apart.' },
  { key: 'value', label: 'Value', blurb: 'Purchase price plus consumables against what it delivers.' },
];

export const SCORE_KEYS = SCORE_CATEGORIES.map((c) => c.key);

export const SCORE_BASES = ['research', 'tested'];

export const PRODUCT_REQUIRED_FIELDS = [
  'slug',
  'brand',
  'model',
  'category',
  'price',
  'specs',
  'scores',
  'scoreBasis',
  'verdict',
  'pros',
  'cons',
  'bestFor',
  'notIdealFor',
];

export function validateProduct(product) {
  const errors = [];
  if (!product || typeof product !== 'object') return ['product is not an object'];

  for (const field of PRODUCT_REQUIRED_FIELDS) {
    const value = product[field];
    if (value === undefined || value === null || value === '') {
      errors.push('missing required field: ' + field);
    }
  }

  if (product.specs && typeof product.specs === 'object') {
    for (const key of SPEC_FIELDS) {
      if (product.specs[key] === undefined) {
        errors.push('missing spec field: ' + key);
      }
    }
  }

  if (product.scores && typeof product.scores === 'object') {
    for (const key of SCORE_KEYS) {
      const value = product.scores[key];
      if (typeof value !== 'number') {
        errors.push('missing or non-numeric score: ' + key);
      } else if (value < 0 || value > 10) {
        errors.push('score out of range (0-10): ' + key);
      }
    }
  }

  if (product.scoreBasis && !SCORE_BASES.includes(product.scoreBasis)) {
    errors.push('invalid scoreBasis: ' + product.scoreBasis);
  }

  for (const listField of ['pros', 'cons', 'bestFor', 'notIdealFor']) {
    if (product[listField] !== undefined && !Array.isArray(product[listField])) {
      errors.push(listField + ' must be an array');
    }
  }

  return errors;
}

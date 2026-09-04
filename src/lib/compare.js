import { ALL_SPEC_FIELD_DEFS, SCORE_CATEGORIES } from './schema.js';
import { overallScore } from './scoring.js';

const DASH = '—';

export function formatSpecValue(value) {
  if (value === undefined || value === null || value === '') return DASH;
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (Array.isArray(value)) return value.length ? value.join(', ') : DASH;
  if (typeof value === 'number') return String(value);
  return String(value);
}

export function buildComparison(a, b) {
  const specRows = ALL_SPEC_FIELD_DEFS.map((def) => {
    const av = formatSpecValue(a && a.specs ? a.specs[def.key] : undefined);
    const bv = formatSpecValue(b && b.specs ? b.specs[def.key] : undefined);
    return {
      key: def.key,
      label: def.label,
      group: def.group,
      a: av,
      b: bv,
      differs: av !== bv,
    };
  });

  const scoreRows = SCORE_CATEGORIES.map((cat) => {
    const av = a && a.scores && typeof a.scores[cat.key] === 'number' ? a.scores[cat.key] : null;
    const bv = b && b.scores && typeof b.scores[cat.key] === 'number' ? b.scores[cat.key] : null;
    let winner = null;
    if (av !== null && bv !== null && av !== bv) winner = av > bv ? 'a' : 'b';
    return { key: cat.key, label: cat.label, a: av, b: bv, winner };
  });

  const oa = overallScore(a && a.scores);
  const ob = overallScore(b && b.scores);

  return {
    a,
    b,
    specRows,
    scoreRows,
    overall: {
      a: oa,
      b: ob,
      winner: oa === null || ob === null || oa === ob ? null : oa > ob ? 'a' : 'b',
    },
  };
}

export function comparePairSlug(a, b) {
  const sa = typeof a === 'string' ? a : a.slug;
  const sb = typeof b === 'string' ? b : b.slug;
  return [sa, sb].sort().join('-vs-');
}

export function parsePairSlug(slug) {
  const parts = String(slug).split('-vs-');
  return parts.length === 2 ? parts : [];
}

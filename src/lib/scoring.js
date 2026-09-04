import { SCORE_KEYS } from './schema.js';

// Weighted because odor and cleaning are why people buy these.
// A great app does not rescue a box that leaks smell.
export const SCORE_WEIGHTS = {
  cleaning: 0.22,
  odorControl: 0.22,
  safety: 0.2,
  app: 0.12,
  maintenance: 0.12,
  value: 0.12,
};

export function overallScore(scores) {
  if (!scores) return null;
  let total = 0;
  for (const key of SCORE_KEYS) {
    const value = scores[key];
    if (typeof value !== 'number') return null;
    total += value * SCORE_WEIGHTS[key];
  }
  return Math.round(total * 10) / 10;
}

export function scoreLabel(score) {
  if (score === null || score === undefined) return 'Not scored';
  if (score >= 9) return 'Excellent';
  if (score >= 8) return 'Very good';
  if (score >= 7) return 'Good';
  if (score >= 6) return 'Fair';
  return 'Poor';
}

export function formatScore(score) {
  if (typeof score !== 'number' || Number.isNaN(score)) return '—';
  return score.toFixed(1);
}

export function scoreBand(score) {
  if (typeof score !== 'number') return 'none';
  if (score >= 9) return 'high';
  if (score >= 7.5) return 'mid';
  return 'low';
}

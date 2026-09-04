import { describe, it, expect } from 'vitest';
import { SCORE_WEIGHTS, overallScore, scoreLabel, formatScore } from './scoring.js';

const scores = {
  cleaning: 9.0,
  odorControl: 8.0,
  safety: 10.0,
  app: 6.0,
  maintenance: 7.0,
  value: 5.0,
};

describe('scoring', () => {
  it('weights sum to 1', () => {
    const total = Object.values(SCORE_WEIGHTS).reduce((a, b) => a + b, 0);
    expect(total).toBeCloseTo(1, 6);
  });

  it('computes a weighted overall rounded to one decimal', () => {
    const expected =
      9.0 * SCORE_WEIGHTS.cleaning +
      8.0 * SCORE_WEIGHTS.odorControl +
      10.0 * SCORE_WEIGHTS.safety +
      6.0 * SCORE_WEIGHTS.app +
      7.0 * SCORE_WEIGHTS.maintenance +
      5.0 * SCORE_WEIGHTS.value;
    expect(overallScore(scores)).toBe(Math.round(expected * 10) / 10);
  });

  it('returns null when scores are absent', () => {
    expect(overallScore(null)).toBeNull();
    expect(overallScore({})).toBeNull();
  });

  it('labels score bands', () => {
    expect(scoreLabel(9.3)).toBe('Excellent');
    expect(scoreLabel(8.2)).toBe('Very good');
    expect(scoreLabel(7.1)).toBe('Good');
    expect(scoreLabel(6.0)).toBe('Fair');
    expect(scoreLabel(4.4)).toBe('Poor');
  });

  it('formats scores with one decimal and a dash for nothing', () => {
    expect(formatScore(9)).toBe('9.0');
    expect(formatScore(8.75)).toBe('8.8');
    expect(formatScore(null)).toBe('—');
  });
});

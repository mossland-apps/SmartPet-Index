import { describe, it, expect } from 'vitest';
import {
  OG_SIZE,
  PRODUCT_IMAGE_SIZE,
  DEFAULT_OG,
  productImagePath,
  productOgPath,
  listOgPath,
  guideOgPath,
  absoluteUrl,
} from './images.js';

describe('image paths', () => {
  it('uses the sizes the social platforms expect', () => {
    expect(OG_SIZE).toEqual({ width: 1200, height: 630 });
    expect(PRODUCT_IMAGE_SIZE).toEqual({ width: 1200, height: 1200 });
  });

  it('builds a path per image kind', () => {
    expect(productImagePath('litter-robot-4')).toBe('/img/products/litter-robot-4.png');
    expect(productOgPath('litter-robot-4')).toBe('/og/products/litter-robot-4.png');
    expect(listOgPath('best-smart-litter-boxes')).toBe('/og/rankings/best-smart-litter-boxes.png');
    expect(guideOgPath('litter-box-cost-per-year')).toBe('/og/guides/litter-box-cost-per-year.png');
    expect(DEFAULT_OG).toBe('/og/default.png');
  });

  it('keeps every path root-relative and a png', () => {
    const paths = [
      productImagePath('x'),
      productOgPath('x'),
      listOgPath('x'),
      guideOgPath('x'),
      DEFAULT_OG,
    ];
    for (const p of paths) {
      expect(p.startsWith('/'), p).toBe(true);
      expect(p.endsWith('.png'), p).toBe(true);
    }
  });

  it('makes an absolute url, because social scrapers reject relative ones', () => {
    expect(absoluteUrl('/og/default.png')).toBe('https://smartpetindex.com/og/default.png');
    expect(absoluteUrl('https://cdn.example.com/a.png')).toBe('https://cdn.example.com/a.png');
  });
});

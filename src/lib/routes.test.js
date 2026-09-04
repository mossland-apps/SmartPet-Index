import { describe, it, expect } from 'vitest';
import {
  productPath,
  listPath,
  brandPath,
  troubleshootingPath,
  comparePath,
  expectedRoutes,
} from './routes.js';
import { products, brands } from './catalog.js';
import { BEST_OF_LISTS } from './rankings.js';

describe('routes', () => {
  it('builds a trailing-slash path for every entity type', () => {
    expect(productPath('litter-robot-4')).toBe('/reviews/litter-robot-4/');
    expect(listPath('best-smart-litter-boxes')).toBe('/litter-boxes/best-smart-litter-boxes/');
    expect(brandPath('whisker')).toBe('/brands/whisker/');
    expect(troubleshootingPath('litter-robot-4')).toBe('/troubleshooting/litter-robot-4/');
  });

  it('orders a compare path alphabetically so one pair has one URL', () => {
    expect(comparePath('litter-robot-4', 'catlink-scooper-pro-x')).toBe(
      '/compare/catlink-scooper-pro-x-vs-litter-robot-4/'
    );
    expect(comparePath('catlink-scooper-pro-x', 'litter-robot-4')).toBe(
      '/compare/catlink-scooper-pro-x-vs-litter-robot-4/'
    );
  });

  it('lists every route the site must publish', () => {
    const routes = expectedRoutes({ products, brands, lists: BEST_OF_LISTS });
    expect(routes).toContain('/');
    expect(routes).toContain('/litter-boxes/');
    expect(routes).toContain('/reviews/');
    expect(routes).toContain('/brands/');
    expect(routes).toContain('/compare/');
    expect(routes).toContain('/troubleshooting/');
    expect(routes).toContain('/how-we-test/');
    expect(routes).toContain('/about/');

    for (const p of products) {
      expect(routes).toContain('/reviews/' + p.slug + '/');
      expect(routes).toContain('/troubleshooting/' + p.slug + '/');
    }
    for (const b of brands) {
      expect(routes).toContain('/brands/' + b.slug + '/');
    }
    for (const l of BEST_OF_LISTS) {
      expect(routes).toContain('/litter-boxes/' + l.slug + '/');
    }
  });

  it('never emits a route without a trailing slash', () => {
    const routes = expectedRoutes({ products, brands, lists: BEST_OF_LISTS });
    for (const r of routes) {
      expect(r.endsWith('/'), r).toBe(true);
      expect(r.startsWith('/'), r).toBe(true);
    }
  });
});

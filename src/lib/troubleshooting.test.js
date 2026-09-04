import { describe, it, expect } from 'vitest';
import { products } from './catalog.js';
import { troubleshootingHubs, getHub } from './troubleshooting.js';

describe('troubleshooting hubs', () => {
  it('gives every product a hub', () => {
    for (const p of products) {
      expect(getHub(p.slug), 'no hub for ' + p.slug).toBeDefined();
    }
    expect(troubleshootingHubs.length).toBe(products.length);
  });

  it('gives every hub an intro and at least two symptoms', () => {
    for (const hub of troubleshootingHubs) {
      expect(hub.intro.length, hub.product).toBeGreaterThan(60);
      expect(hub.symptoms.length, hub.product).toBeGreaterThanOrEqual(2);
    }
  });

  it('gives every symptom a unique slug within its hub', () => {
    for (const hub of troubleshootingHubs) {
      const slugs = hub.symptoms.map((s) => s.slug);
      expect(new Set(slugs).size, hub.product).toBe(slugs.length);
    }
  });

  it('gives every symptom causes, ordered fixes and an escalation note', () => {
    for (const hub of troubleshootingHubs) {
      for (const s of hub.symptoms) {
        const where = hub.product + '/' + s.slug;
        expect(s.title.length, where).toBeGreaterThan(3);
        expect(s.summary.length, where).toBeGreaterThan(30);
        expect(s.causes.length, where).toBeGreaterThanOrEqual(2);
        expect(s.fixes.length, where).toBeGreaterThanOrEqual(2);
        expect(s.escalate.length, where).toBeGreaterThan(20);
        for (const fix of s.fixes) {
          expect(typeof fix.step, where).toBe('string');
          expect(fix.detail.length, where).toBeGreaterThan(20);
        }
      }
    }
  });

  it('uses only known severity levels', () => {
    for (const hub of troubleshootingHubs) {
      for (const s of hub.symptoms) {
        expect(['common', 'serious']).toContain(s.severity);
      }
    }
  });
});

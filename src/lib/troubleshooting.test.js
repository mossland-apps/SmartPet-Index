import { describe, it, expect } from 'vitest';
import { products } from './catalog.js';
import { troubleshootingHubs, getHub, commonSymptoms, COMMON_SLUGS } from './troubleshooting.js';

const allText = (hub) => JSON.stringify(hub).toLowerCase();

describe('common troubleshooting guide', () => {
  it('holds the generic fixes in exactly one place', () => {
    expect(commonSymptoms.length).toBeGreaterThanOrEqual(5);
    for (const s of commonSymptoms) {
      expect(s.causes.length, s.slug).toBeGreaterThanOrEqual(2);
      expect(s.fixes.length, s.slug).toBeGreaterThanOrEqual(2);
      expect(s.escalate.length, s.slug).toBeGreaterThan(20);
    }
  });
});

describe('product troubleshooting hubs', () => {
  it('gives every product a hub', () => {
    for (const p of products) {
      expect(getHub(p.slug), 'no hub for ' + p.slug).toBeDefined();
    }
    expect(troubleshootingHubs.length).toBe(products.length);
  });

  it('never repeats a generic fix inside a product hub', () => {
    // Copying the same generic fixes into every hub is what made the hubs
    // near-duplicates of each other. Those live once, on the shared page.
    for (const hub of troubleshootingHubs) {
      for (const s of hub.symptoms) {
        expect(COMMON_SLUGS.has(s.slug), hub.product + ' repeats ' + s.slug).toBe(false);
      }
    }
  });

  it('says plainly whether each hub is offered to search engines', () => {
    for (const hub of troubleshootingHubs) {
      expect(typeof hub.indexable, hub.product).toBe('boolean');
      expect(hub.intro.length, hub.product).toBeGreaterThan(60);
    }
  });

  it('only offers a hub to search engines when it has real product-specific substance', () => {
    for (const hub of troubleshootingHubs.filter((h) => h.indexable)) {
      expect(hub.symptoms.length, hub.product).toBeGreaterThanOrEqual(2);
      expect(hub.symptoms.length + (hub.facts || []).length, hub.product).toBeGreaterThanOrEqual(5);
      expect(hub.sources?.length, hub.product + ' has no sources').toBeGreaterThan(0);
      for (const src of hub.sources) {
        expect(src.url.startsWith('https://'), hub.product).toBe(true);
      }
    }
  });

  it('keeps every symptom and fact well formed', () => {
    for (const hub of troubleshootingHubs) {
      const slugs = hub.symptoms.map((s) => s.slug);
      expect(new Set(slugs).size, hub.product).toBe(slugs.length);
      for (const s of hub.symptoms) {
        const where = hub.product + '/' + s.slug;
        expect(['common', 'serious', 'normal']).toContain(s.severity);
        expect(s.title.length, where).toBeGreaterThan(3);
        expect(s.summary.length, where).toBeGreaterThan(15);
        expect(s.causes.length, where).toBeGreaterThanOrEqual(1);
        expect(s.fixes.length, where).toBeGreaterThanOrEqual(1);
        expect(s.escalate.length, where).toBeGreaterThan(20);
        for (const f of s.fixes) expect(f.detail.length, where).toBeGreaterThan(15);
      }
      for (const fact of hub.facts || []) {
        expect(fact.text.length, hub.product).toBeGreaterThan(10);
        if (fact.common) expect(COMMON_SLUGS.has(fact.common), hub.product + ' -> ' + fact.common).toBe(true);
      }
    }
  });
});

describe('troubleshooting accuracy regressions', () => {
  // Each of these was live on the site and wrong. Never again.
  it('describes the Litter-Robot 4 light codes the way Whisker does', () => {
    const hub = getHub('litter-robot-4');
    const code = (slug) => hub.symptoms.find((s) => s.slug === slug);
    expect(code('flashing-blue-light').summary.toLowerCase()).toContain('drawer');
    expect(code('flashing-yellow-light').summary.toLowerCase()).toContain('bonnet');
    expect(code('flashing-red-light').summary.toLowerCase()).toContain('30 minutes');
  });

  it('does not describe a heat-sealing mechanism the PetSnowy does not have', () => {
    const text = allText(getHub('petsnowy-snow-plus'));
    expect(text).not.toMatch(/heat|film|sealing bar|melting/);
  });

  it('does not describe a bag roll the PuraMax 2 does not have', () => {
    expect(allText(getHub('petkit-pura-max-2'))).not.toMatch(/bag roll/);
  });

  it('tells Omega Paw owners to roll it onto its top, as Omega Paw do', () => {
    const text = allText(getHub('omega-paw-roll-n-clean'));
    expect(text).toMatch(/onto its top/);
    expect(text).not.toMatch(/onto its side/);
  });
});

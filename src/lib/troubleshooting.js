import common from '../data/troubleshooting-common.json';

const modules = import.meta.glob('../data/troubleshooting/*.json', { eager: true });

export const troubleshootingHubs = Object.values(modules).map((m) => (m && m.default ? m.default : m));

// Generic fixes that apply to almost every box. They are published once, on the
// shared troubleshooting page, and product hubs link to them rather than copying
// them — copying them into every hub is what made the hubs near-duplicates.
export const commonIntro = common.intro;
export const commonSymptoms = common.symptoms;
export const COMMON_SLUGS = new Set(commonSymptoms.map((s) => s.slug));

export function getHub(productSlug) {
  return troubleshootingHubs.find((h) => h.product === productSlug);
}

export function getCommonSymptom(slug) {
  return commonSymptoms.find((s) => s.slug === slug);
}

import { comparePairSlug } from './compare.js';

const modules = import.meta.glob('../data/comparisons/*.json', { eager: true });

// The only comparison pages offered to search engines. Every other pair is still
// generated for readers using the comparison tool, but carries noindex: a page
// per possible pair, with no written judgement, is the kind of scaled content
// Google's spam policies target.
export const featuredComparisons = Object.values(modules).map((m) => (m && m.default ? m.default : m));

export function getFeaturedComparison(pairSlug) {
  return featuredComparisons.find((c) => c.slug === pairSlug);
}

export function isFeaturedPair(a, b) {
  return Boolean(getFeaturedComparison(comparePairSlug(a, b)));
}

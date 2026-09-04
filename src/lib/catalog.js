import { overallScore } from './scoring.js';

const productModules = import.meta.glob('../data/products/*.json', { eager: true });
const brandModules = import.meta.glob('../data/brands/*.json', { eager: true });

function unwrap(modules) {
  return Object.values(modules).map((m) => (m && m.default ? m.default : m));
}

export const products = unwrap(productModules).sort(
  (a, b) => (overallScore(b.scores) ?? -1) - (overallScore(a.scores) ?? -1)
);

export const brands = unwrap(brandModules).sort((a, b) => a.name.localeCompare(b.name));

export function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}

export function getBrand(slug) {
  return brands.find((b) => b.slug === slug);
}

export function productsByBrand(brandSlug) {
  return products.filter((p) => p.brand === brandSlug);
}

export function withOverall(product) {
  return { ...product, overall: overallScore(product.scores) };
}

export const CATEGORIES = [
  { slug: 'litter-boxes', name: 'Litter Boxes', live: true, blurb: 'Self-cleaning and app-connected boxes.' },
  { slug: 'feeders', name: 'Feeders', live: false, blurb: 'Scheduled and portion-controlled feeders.' },
  { slug: 'fountains', name: 'Fountains', live: false, blurb: 'Filtered water fountains for cats and dogs.' },
  { slug: 'cameras', name: 'Cameras', live: false, blurb: 'Pet cameras, treat tossers and monitors.' },
  { slug: 'trackers', name: 'Trackers', live: false, blurb: 'GPS collars and activity trackers.' },
  { slug: 'pet-doors', name: 'Pet Doors', live: false, blurb: 'Microchip and app-controlled pet doors.' },
];

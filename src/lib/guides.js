const modules = import.meta.glob('../data/guides/*.json', { eager: true });

export const guides = Object.values(modules).map((m) => (m && m.default ? m.default : m));

export function getGuide(slug) {
  return guides.find((g) => g.slug === slug);
}

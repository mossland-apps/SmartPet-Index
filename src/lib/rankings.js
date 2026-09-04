import { overallScore } from './scoring.js';

function poundsFrom(value) {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return null;
  const match = value.match(/([\d.]+)/);
  return match ? Number(match[1]) : null;
}

const byOverall = (a, b) => (overallScore(b.scores) ?? -1) - (overallScore(a.scores) ?? -1);
const byScore = (key) => (a, b) => (b.scores?.[key] ?? -1) - (a.scores?.[key] ?? -1);

const DEFAULT_AWARDS = ['Best Overall', 'Runner-Up', 'Also Great'];

export const BEST_OF_LISTS = [
  {
    slug: 'best-automatic-litter-boxes',
    cardLabel: 'Automatic Litter Boxes',
    title: 'Best Automatic Litter Boxes',
    shortTitle: 'Best Overall',
    intro:
      'Every self-cleaning box we have researched, ranked on the six things that actually matter: cleaning, odor control, safety, app, maintenance and value.',
    filter: () => true,
    sort: byOverall,
    awards: DEFAULT_AWARDS,
  },
  {
    slug: 'best-smart-litter-boxes',
    cardLabel: 'Smart Litter Boxes',
    title: 'Best Smart Litter Boxes',
    shortTitle: 'Best Smart',
    intro:
      'App-connected boxes only. Wi-Fi is worth paying for when the app tracks weight and visits — and worth nothing when it drops offline every week.',
    filter: (p) => p.specs?.wifi === true,
    sort: byOverall,
    awards: ['Best Smart Box', 'Runner-Up', 'Best Smart Value'],
  },
  {
    slug: 'best-litter-boxes-for-multiple-cats',
    cardLabel: 'For Multiple Cats',
    title: 'Best Litter Boxes for Multiple Cats',
    shortTitle: 'Multiple Cats',
    intro:
      'Two or more cats means twice the waste and half the tolerance for a full drawer. These are the boxes with the capacity and the cycle logic to keep up.',
    filter: (p) => p.specs?.multiCatCapable === true,
    sort: byOverall,
    awards: ['Best for Multi-Cat Homes', 'Runner-Up', 'Best Budget Multi-Cat'],
  },
  {
    slug: 'best-litter-boxes-for-large-cats',
    cardLabel: 'For Large Cats',
    title: 'Best Litter Boxes for Large Cats',
    shortTitle: 'Large Cats',
    intro:
      'Maine Coons, Ragdolls and any cat over 16 lb need a wide globe, a low entry and a weight sensor that will not lock them out. These qualify.',
    filter: (p) => (poundsFrom(p.specs?.maximumCatWeight) ?? 0) >= 20,
    sort: byOverall,
    awards: ['Best for Large Cats', 'Runner-Up', 'Also Great'],
  },
  {
    slug: 'best-litter-boxes-for-odor-control',
    cardLabel: 'For Odor Control',
    title: 'Best Litter Boxes for Odor Control',
    shortTitle: 'Odor Control',
    intro:
      'Ranked purely on odor: drawer seal, carbon filtration, and whether the room still smells fine on day seven. This is the reason most people buy one.',
    filter: () => true,
    sort: byScore('odorControl'),
    awards: ['Best Odor Control', 'Runner-Up', 'Also Great'],
  },
  {
    slug: 'best-budget-automatic-litter-boxes',
    cardLabel: 'Budget Picks',
    title: 'Best Budget Automatic Litter Boxes',
    shortTitle: 'Best Budget',
    intro:
      'Under $350. The cheap end of this market is full of compromises, so the question is which compromises you can live with.',
    filter: (p) => typeof p.price === 'number' && p.price <= 350,
    sort: byOverall,
    awards: ['Best Budget Pick', 'Runner-Up', 'Cheapest Worth Buying'],
  },
  {
    slug: 'best-litter-boxes-without-proprietary-bags',
    cardLabel: 'Without Proprietary Bags',
    title: 'Best Litter Boxes Without Proprietary Bags',
    shortTitle: 'No Proprietary Bags',
    intro:
      'Locked-in bags and cartridges can add $150 a year. These boxes take ordinary kitchen bags or no bag at all.',
    filter: (p) => !/proprietar|cartridge/i.test(String(p.specs?.bagType ?? '')),
    sort: byOverall,
    awards: ['Best No-Lock-In Pick', 'Runner-Up', 'Also Great'],
  },
];

export function getList(slug) {
  return BEST_OF_LISTS.find((l) => l.slug === slug);
}

export function resolveList(list, products) {
  if (!list) return [];
  return products
    .filter((p) => p.category === undefined || p.category === 'litter-boxes')
    .filter(list.filter)
    .sort(list.sort)
    .map((product, index) => ({
      rank: index + 1,
      product,
      overall: overallScore(product.scores),
      award: (list.awards ?? DEFAULT_AWARDS)[index] ?? null,
    }));
}

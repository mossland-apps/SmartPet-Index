// One place for everything commercial. Drop the affiliate tags in here and
// every buy button on the site becomes an affiliate link.

export const SITE = {
  name: 'SmartPet Index',
  wordmark: { first: 'SMARTPET', second: 'INDEX' },
  domain: 'smartpetindex.com',
  url: 'https://smartpetindex.com',
  tagline: 'Smart Pet Tech Tested and Ranked',
  description:
    'Independent testing, rankings and troubleshooting for automatic litter boxes and smart pet tech. Structured reviews, real spec sheets, and side-by-side comparisons.',
  disclosure:
    'SmartPet Index is reader supported. When you buy through links on our site we may earn a commission.',
};

// Retailer links live in src/lib/retailers.js.

export const NAV = [
  {
    label: 'Litter Boxes',
    href: '/litter-boxes/',
    columns: [
      {
        heading: 'Best Of',
        links: [
          { label: 'Best Automatic Litter Boxes', href: '/litter-boxes/best-automatic-litter-boxes/' },
          { label: 'Best Smart Litter Boxes', href: '/litter-boxes/best-smart-litter-boxes/' },
          { label: 'Best for Multiple Cats', href: '/litter-boxes/best-litter-boxes-for-multiple-cats/' },
          { label: 'Best for Large Cats', href: '/litter-boxes/best-litter-boxes-for-large-cats/' },
          { label: 'Best for Odor Control', href: '/litter-boxes/best-litter-boxes-for-odor-control/' },
          { label: 'Best Budget Picks', href: '/litter-boxes/best-budget-automatic-litter-boxes/' },
          { label: 'Best Without Proprietary Bags', href: '/litter-boxes/best-litter-boxes-without-proprietary-bags/' },
        ],
      },
      {
        heading: 'Reviews & Brands',
        links: [
          { label: 'All Litter Box Reviews', href: '/reviews/' },
          { label: 'Litter-Robot', href: '/brands/whisker/' },
          { label: 'CATLINK', href: '/brands/catlink/' },
          { label: 'PETKIT', href: '/brands/petkit/' },
          { label: 'Neakasa', href: '/brands/neakasa/' },
          { label: 'Casa Leo', href: '/brands/casa-leo/' },
          { label: 'All Brands', href: '/brands/' },
        ],
      },
      {
        heading: 'Help & Guides',
        links: [
          { label: 'Troubleshooting Hub', href: '/troubleshooting/' },
          { label: 'Buying Guide', href: '/guides/automatic-litter-box-buying-guide/' },
          { label: 'True Cost Per Year', href: '/guides/litter-box-cost-per-year/' },
          { label: 'Are They Safe for Cats?', href: '/guides/are-automatic-litter-boxes-safe/' },
        ],
      },
    ],
  },
  { label: 'Compare', href: '/compare/' },
  { label: 'How We Test', href: '/how-we-test/' },
  { label: 'About', href: '/about/' },
];

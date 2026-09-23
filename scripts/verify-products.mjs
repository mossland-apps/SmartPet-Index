// Applies verified product data. Run: node scripts/verify-products.mjs
//
// RULE: nothing goes in here that was not read off the manufacturer's own product
// page or the brand's current Amazon listing, with the URL recorded. Anything we
// cannot source is set to null so it renders as "—" rather than as a number we
// made up. A blank cell is accurate; an invented one is not.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src/data/products');

const CHECKED = '2026-09-23';

const VERIFIED = {
  'litter-robot-4': {
    asin: 'B0FFDNZSHT',
    price: 699,
    priceNote: 'Robot Only configuration. The Supply Bundle on the same listing is $749.',
    sources: [
      { name: 'Whisker (manufacturer)', url: 'https://www.litter-robot.com/litter-robot-4.html' },
      { name: 'Amazon — Whisker Store', url: 'https://www.amazon.com/dp/B0FFDNZSHT' },
    ],
    specs: {
      dimensions: '22 in W x 27 in D x 29.5 in H',
      footprint: '22 x 27 in',
      entryHeight: null,
      entryOpening: '15.75 x 15.75 in',
      weight: '24 lb',
      minimumCatWeight: '3 lb',
      maximumCatWeight: '25 lb',
      wasteCapacity: null,
      litterTypes: ['Clumping clay', 'Some silica gel'],
      wifi: true,
      app: 'Whisker (iOS, Android)',
      odorSystem: 'OdorTrap packs + carbon filter + sealed drawer',
      noiseLevel: null,
      safetySensors: null,
      bagType: 'Standard kitchen bags or Whisker drawer liners',
      proprietaryBags: false,
      replacementCost: null,
      filterCost: null,
      warranty: '1 year (3-year extended plan $129)',
      multiCatCapable: true,
      catsSupported: 'Up to 4',
      cycleTime: null,
      power: '15 V DC',
    },
    fixes: {
      // Our figure was 20 lb. Whisker publishes 3-25 lb.
      maximumCatWeight: 'was "20 lb"',
      power: 'was "Mains, 24 V adapter"',
      noiseLevel: 'was "~44 dB at 3 ft" — Whisker publishes no dB figure',
    },
  },

  'casa-leo-leos-loo-too': {
    asin: 'B09LL9S99B',
    price: 599,
    priceNote: "Amazon's Choice. The bundle with filters, bags and mat is $699.",
    sources: [
      { name: 'Amazon — Smarty Pear Store', url: 'https://www.amazon.com/dp/B09LL9S99B' },
    ],
    specs: {
      dimensions: '27.6 in L x 22 in W x 24 in H',
      footprint: '27.6 x 22 in',
      entryHeight: null,
      weight: '30 lb',
      minimumCatWeight: '1 lb',
      maximumCatWeight: '20 lb',
      wasteCapacity: '6 L (1.5 gal)',
      litterTypes: ['Clumping clay'],
      wifi: true,
      app: "Casa Leo (iOS, Android), Alexa and Google Assistant",
      odorSystem: 'UV odor control + bamboo carbon filters + sealed waste drawer',
      noiseLevel: '~30 dB (manufacturer claim)',
      safetySensors: ['Radar motion detection', 'Four weight sensors', 'Anti-pinch protection'],
      bagType: 'Casa Leo drawer liners or standard bags',
      proprietaryBags: false,
      replacementCost: null,
      filterCost: null,
      warranty: '1 year limited',
      multiCatCapable: true,
      catsSupported: null,
      cycleTime: null,
      power: null,
    },
    fixes: {
      price: 'was $649',
      wasteCapacity: 'was "9 L" — the listing states 1.5 gal / 6 L',
      minimumCatWeight: 'was "3 lb" — the listing states 1 lb',
      weight: 'was "26 lb"',
      litterTypes: 'was "Clumping clay, Tofu" — only clumping clay is recommended',
    },
  },

  'petkit-purobot-ultra': {
    asin: 'B0DFYJ29XG',
    price: 799,
    priceNote: 'List price $799.99 on the PETKIT store.',
    sources: [{ name: 'Amazon — PETKIT Store', url: 'https://www.amazon.com/dp/B0DFYJ29XG' }],
    specs: {
      dimensions: '20.86 in L x 32.4 in W x 24.01 in H',
      footprint: '20.86 x 32.4 in',
      entryHeight: null,
      weight: '46 lb',
      minimumCatWeight: null,
      maximumCatWeight: null,
      wasteCapacity: '10 L',
      litterTypes: ['Clumping clay', 'Tofu', 'Mixed'],
      wifi: true,
      app: 'PETKIT (iOS, Android), 2.4 GHz and 5 GHz',
      odorSystem: 'Auto-sealed waste bag + N60 odour eliminator',
      noiseLevel: null,
      safetySensors: null,
      bagType: 'PETKIT bag roll (auto-seal, auto-refill)',
      proprietaryBags: true,
      replacementCost: null,
      filterCost: null,
      warranty: null,
      multiCatCapable: true,
      catsSupported: null,
      cycleTime: null,
      power: null,
    },
    fixes: {
      price: 'was $899',
      weight: 'was "30 lb" — the listing states 46 lb',
      dimensions: 'was "22.4 x 25.2 x 24.8 in"',
      app: 'now confirmed dual-band; we listed 2.4 GHz only by implication',
    },
  },

  'neakasa-m1': {
    slug: 'neakasa-m1-plus',
    model: 'Neakasa M1 Plus',
    shortName: 'Neakasa M1 Plus',
    asin: 'B0CSKBWBF6',
    price: 449,
    priceNote: 'List price $449.99. Frequently discounted to $399.99.',
    sources: [
      { name: 'Neakasa (manufacturer)', url: 'https://neakasa.com/products/neakasa-m1-cat-litter-box' },
      { name: 'Amazon — Neakasa Official', url: 'https://www.amazon.com/dp/B0CSKBWBF6' },
    ],
    specs: {
      dimensions: '22 in L x 20 in W x 26 in H',
      footprint: '22 x 20 in',
      entryHeight: null,
      weight: '22 lb',
      minimumCatWeight: '3.3 lb (Kitten Mode below this)',
      maximumCatWeight: '33 lb',
      wasteCapacity: '11.2 L',
      litterTypes: null,
      wifi: true,
      app: 'Neakasa (iOS, Android), 2.4 GHz only',
      odorSystem: 'Built-in sealing strip + brush strip seal — no carbon filter required',
      noiseLevel: null,
      safetySensors: ['6-array rotary infrared detection', 'Gear-limited rotation', 'Kitten Mode'],
      bagType: 'Neakasa refill bag rolls',
      proprietaryBags: true,
      replacementCost: null,
      filterCost: 0,
      warranty: '2-year protection plan',
      multiCatCapable: true,
      catsSupported: 'Up to 3',
      cycleTime: null,
      power: null,
      litterCapacity: '7.2 L',
    },
    fixes: {
      model: 'was "Neakasa M1" — that model is superseded; M1 Plus is current',
      price: 'was $599',
      maximumCatWeight: 'was "22 lb" — Neakasa states 33 lb',
      wasteCapacity: 'was "8 L" — Neakasa states 11.2 L',
      bagType: 'was "Standard kitchen bags" — it uses Neakasa refill rolls',
      filterCost: 'was $40/yr — no carbon filter is used at all',
      catsSupported: 'was "Up to 4" — Neakasa states up to 3',
    },
  },

  'petsnowy-snow-plus': {
    asin: 'B0CFVJ71GZ',
    price: 599,
    priceNote: 'List price has ranged $529–$599 over the past year; currently $529.99.',
    sources: [{ name: 'Amazon — PetSnowy Store', url: 'https://www.amazon.com/dp/B0CFVJ71GZ' }],
    specs: {
      dimensions: '31 in L x 21 in W x 27 in H',
      footprint: '31 x 21 in',
      entryHeight: null,
      weight: '37 lb',
      minimumCatWeight: null,
      maximumCatWeight: null,
      wasteCapacity: null,
      litterTypes: null,
      wifi: true,
      app: 'PetSnowy (iOS, Android), 2.4 GHz only',
      odorSystem: 'TiO2 photocatalyst + auto-sealed disposable liners',
      noiseLevel: null,
      safetySensors: ['SnowSafe+ 7-stage safety system'],
      bagType: 'PetSnowy self-sealing liners',
      proprietaryBags: true,
      replacementCost: 50,
      filterCost: null,
      warranty: null,
      multiCatCapable: true,
      catsSupported: null,
      cycleTime: null,
      power: null,
    },
    fixes: {
      price: 'was $649',
      odorSystem: 'was "Heat-sealed waste bag + deodoriser + carbon filter" — it is a TiO2 photocatalyst system with auto-sealing liners, not a heat seal',
      weight: 'was "28 lb"',
      dimensions: 'was "23.6 x 21.7 x 24.8 in"',
      replacementCost: 'was $120/yr — a genuine 50-pack of liners is $49.99',
    },
  },
};

let changed = 0;
for (const [currentSlug, v] of Object.entries(VERIFIED)) {
  const file = join(dir, currentSlug + '.json');
  const record = JSON.parse(readFileSync(file, 'utf8'));

  if (v.model) record.model = v.model;
  if (v.shortName) record.shortName = v.shortName;
  record.asin = v.asin;
  record.price = v.price;
  record.priceNote = v.priceNote;
  record.sources = v.sources;
  record.lastVerified = CHECKED;
  record.lastUpdated = CHECKED;
  record.specs = { ...record.specs, ...v.specs };
  delete record.retailers;

  const outSlug = v.slug || currentSlug;
  record.slug = outSlug;
  writeFileSync(join(dir, outSlug + '.json'), JSON.stringify(record, null, 2) + '\n');
  if (outSlug !== currentSlug) {
    const { unlinkSync } = await import('node:fs');
    unlinkSync(file);
    console.log('renamed ' + currentSlug + ' -> ' + outSlug);
  }
  changed += 1;
}

console.log('Applied verified data to ' + changed + ' products (checked ' + CHECKED + ').');

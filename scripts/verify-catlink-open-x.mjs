// Adds the CATLINK Open-X and records bag compatibility on both CATLINKs.
// Run: node scripts/verify-catlink-open-x.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const P = join(root, 'src/data/products');
const H = join(root, 'src/data/troubleshooting');
const CHECKED = '2026-09-23';

const read = (s) => JSON.parse(readFileSync(join(P, s + '.json'), 'utf8'));
const write = (s, r) => writeFileSync(join(P, s + '.json'), JSON.stringify(r, null, 2) + '\n');

// ------------------------------------------------ Pro-X: bag compatibility

const prox = read('catlink-luxury-pro-x');
prox.specs.bagType = 'Standard 8-gallon trash bags (60 CATLINK liners included)';
prox.specs.proprietaryBags = false;
prox.lastUpdated = CHECKED;
prox.cons = prox.cons.filter((c) => !/liners are CATLINK|third-party bags fit/i.test(c));
prox.pros = [...prox.pros.filter((p) => !/60 liners/i.test(p)), 'Takes standard 8-gallon trash bags once the 60 included liners run out'];
prox.sections.consumables =
  'Sixty CATLINK liners come in the box, and once those run out the drawer takes standard 8-gallon trash bags rather than locking you into CATLINK refills. Note that ordinary grocery bags are too small for a drawer this size. Carbon filters are a separate recurring cost we have not yet priced.';
prox.sections.longTermCost =
  'At $469 list — and routinely $369 — this undercuts the camera-equipped Ultra while keeping the health tracking. Because it takes ordinary 8-gallon trash bags, there is no mandatory consumable stream behind the purchase price, which is the thing that quietly doubles the cost of a cheap box over four years.';
write('catlink-luxury-pro-x', prox);

// ------------------------------------------------------------ CATLINK Open-X

const openX = {
  slug: 'catlink-open-x',
  brand: 'catlink',
  model: 'CATLINK Open-X',
  shortName: 'CATLINK Open-X',
  category: 'litter-boxes',
  form: 'open',
  price: 169,
  priceNote: 'List price $169 for the Large, Single-Cat size. Multi-Cat sizes cost more.',
  releaseYear: 2026,
  accent: '#7aa08f',
  asin: 'B0GD73F98D',
  sources: [{ name: 'Amazon — CATLINK Store', url: 'https://www.amazon.com/dp/B0GD73F98D' }],
  lastVerified: CHECKED,
  lastUpdated: CHECKED,
  availability: 'current',
  scoreBasis: 'research',
  testedDate: null,
  specs: {
    dimensions: '23 in L x 21 in W x 23 in H',
    footprint: '23 x 21 in',
    entryHeight: null,
    weight: '21.4 lb',
    minimumCatWeight: null,
    maximumCatWeight: null,
    wasteCapacity: '12 L',
    litterCapacity: null,
    litterTypes: null,
    wifi: true,
    app: 'CATLINK (iOS, Android), Bluetooth pairing, 2.4 GHz and 5 GHz',
    odorSystem: 'Triple-layer odor locking',
    noiseLevel: '~30 dB (manufacturer claim)',
    safetySensors: [
      'Nine-point safety system',
      'Always-open incomplete gear design',
      'High-precision weight sensors',
      'Infrared detection',
      'Anti-pinch with 0.1 s emergency stop',
    ],
    bagType: 'Standard 8-gallon trash bags (CATLINK bags also sold)',
    proprietaryBags: false,
    replacementCost: null,
    filterCost: null,
    warranty: null,
    multiCatCapable: true,
    catsSupported: 'Multi-cat recognition is a paid in-app upgrade',
    cycleTime: null,
    power: null,
  },
  scores: { cleaning: 7.8, odorControl: 7.6, safety: 8.6, app: 7.6, maintenance: 8.0, value: 9.2 },
  verdict:
    'At $169 the Open-X is the cheapest box in this index that does not feel like a compromise. It is open-topped, so cats accept it quickly; the drawer holds 12 litres, which CATLINK rates at 15 days for a single cat; it takes ordinary 8-gallon trash bags rather than locking you into refills; and the safety specification is genuinely serious — an incomplete gear design that never closes the entrance, weight sensors, infrared, and a claimed 0.1 second emergency stop tested over 10,000 cycles. The catch is the app: multi-cat recognition is a paid upgrade, not something you get in the box.',
  pros: [
    'Cheapest box here that takes ordinary 8-gallon trash bags — no consumable lock-in',
    '12 L drawer, which CATLINK rates at 15 days for one cat',
    'Nine-point safety system with an entrance that never closes',
    'Dual-band Wi-Fi plus Bluetooth pairing — rare below $200',
    'Top-fill design means no bending to refill',
  ],
  cons: [
    'Multi-cat recognition is a paid in-app upgrade rather than an included feature',
    'Multi-cat tracking needs at least 0.9 lb of weight difference between cats',
    'CATLINK publishes no cat weight range for this model',
    'Sold through a reseller storefront rather than shipped by CATLINK directly',
  ],
  bestFor: [
    'First-time buyers who do not want to spend $500',
    'Cats that refuse enclosed boxes',
    'Single-cat homes',
  ],
  notIdealFor: [
    'Multi-cat homes unwilling to pay for the recognition upgrade',
    'Homes with two cats of similar weight',
    'Anyone wanting a published cat weight limit',
  ],
  sections: {
    setup:
      'Bluetooth quick pairing rather than the Wi-Fi handshake most boxes use, and it joins either a 2.4 GHz or 5 GHz network, so the single most common setup failure in this category does not apply. The top-fill design means refilling litter needs no bending, which CATLINK pitches at older owners.',
    app:
      'Scheduling, per-cat activity and daily and weekly health reports. The significant caveat is that multi-cat recognition is a one-time paid feature inside the CATLINK app rather than something included with the box, and it needs at least 0.9 lb of weight difference between cats to work.',
    odorControl:
      'CATLINK describes triple-layer odour locking and an elastic-edge litter pad with 360-degree sealing aimed at containing moisture. They publish no removal percentage for this model. As with any open-top box, nothing contains smell from the litter bed between cycles.',
    noise:
      'CATLINK rates it at 30 dB. That is their figure rather than a measurement of ours.',
    cleaning:
      'A 12 L waste drawer, which CATLINK rates at 15 days for a single cat, with one-touch disposal and a quick-pull bag seal. The open top gives a 360-degree view that timid cats accept faster than an enclosed globe.',
    safety:
      'This is the strongest part of the product. The gear is deliberately incomplete so the entrance can never close, and that mechanical guarantee sits underneath high-precision weight sensors, infrared detection and an anti-pinch stop CATLINK times at 0.1 seconds across a claimed 10,000-plus test cycles. For $169 that is an unusually thorough specification.',
    consumables:
      'CATLINK sell their own 40-packs, but the drawer takes standard 8-gallon trash bags, so there is nothing you are forced to buy. Ordinary grocery bags are too small.',
    longTermCost:
      'At $169 with no mandatory consumables, this is the lowest total cost of ownership of any powered box we track. That is the whole argument for it.',
  },
};
write('catlink-open-x', openX);

// Open-top boxes were rendering as enclosed globes because the form was inferred
// from the odour system text, which changed during verification. Set it explicitly.
for (const [slug, form] of Object.entries({
  'neakasa-m1-plus': 'open',
  'meowant-sc02': 'open',
  'meowant-sc10': 'open',
  'omega-paw-roll-n-clean': 'manual',
})) {
  const rec = read(slug);
  rec.form = form;
  write(slug, rec);
}

// ------------------------------------------------------------- Open-X hub

const base = existsSync(join(H, 'catlink-ultra.json'))
  ? JSON.parse(readFileSync(join(H, 'catlink-ultra.json'), 'utf8'))
  : null;
if (base) {
  const hub = JSON.parse(JSON.stringify(base));
  hub.product = 'catlink-open-x';
  hub.intro =
    'The Open-X has no bonnet and no enclosed globe, so the jam patterns that affect the rest of the CATLINK range mostly do not apply. Its characteristic complaints are the paid multi-cat recognition and litter scatter from the open top.';
  hub.symptoms = hub.symptoms.filter((s) => s.slug !== 'drum-jam');
  hub.symptoms.unshift({
    slug: 'multi-cat-recognition-not-working',
    title: 'It will not tell my cats apart',
    severity: 'common',
    summary:
      'The app logs visits but attributes them all to one cat, or refuses to separate them at all.',
    causes: [
      'Multi-cat recognition is a paid upgrade in the CATLINK app and is not enabled by default.',
      'Your cats are within 0.9 lb of each other, which is below the threshold the system can resolve.',
      'The unit is on carpet or an uneven floor, so the weight readings drift.',
    ],
    fixes: [
      { step: 'Check whether you have bought it', detail: 'Open the CATLINK app and confirm the multi-cat recognition upgrade is purchased and switched on. This is a one-time paid feature, not an included one.' },
      { step: 'Weigh your cats', detail: 'CATLINK state a minimum difference of 0.9 lb between cats. Below that the system cannot separate them and no setting will fix it.' },
      { step: 'Move it off carpet', detail: 'Weight sensing assumes a firm level floor. Carpet and thick mats flex under load and blur the readings the recognition depends on.' },
    ],
    escalate:
      'If the upgrade is active, your cats differ by more than 0.9 lb and the unit is on a hard level floor, contact CATLINK — at that point it is their software, not your setup.',
  });
  writeFileSync(join(H, 'catlink-open-x.json'), JSON.stringify(hub, null, 2) + '\n');
}

console.log('Added CATLINK Open-X; recorded bag compatibility on both CATLINKs.');

// Second verification batch. Run: node scripts/verify-batch-two.mjs
//
// Same rule as batch one: every value below was read off the brand's current Amazon
// listing, with the URL recorded. Anything unsourced is null and renders as "—".
import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const P = join(root, 'src/data/products');
const H = join(root, 'src/data/troubleshooting');
const CHECKED = '2026-09-23';

const read = (slug) => JSON.parse(readFileSync(join(P, slug + '.json'), 'utf8'));
const write = (slug, rec) => writeFileSync(join(P, slug + '.json'), JSON.stringify(rec, null, 2) + '\n');

// ------------------------------------------------- PETKIT PuraMax 2 (corrected)

const pura = read('petkit-pura-max-2');
Object.assign(pura, {
  model: 'PETKIT PuraMax 2',
  shortName: 'PuraMax 2',
  asin: 'B0DFYF2D7D',
  price: 389,
  priceNote: 'List price $389.99. Frequently discounted to $299.99.',
  sources: [{ name: 'Amazon — PETKIT Store', url: 'https://www.amazon.com/dp/B0DFYF2D7D' }],
  lastVerified: CHECKED,
  lastUpdated: CHECKED,
  availability: 'current',
  scores: { cleaning: 8.4, odorControl: 8.5, safety: 8.3, app: 8.6, maintenance: 7.8, value: 8.4 },
  verdict:
    'The PuraMax 2 is the PETKIT worth buying for most people. It drops the camera that makes the Purobot Ultra cost $799 and keeps the things that actually matter day to day: a 76 L interior, a low entrance, weight-based cat identification feeding the same health tracking, and a sealed ShieldBase that is PETKIT’s answer to the leaking that plagues this category. At $389 list it undercuts its own sibling by more than half, and PETKIT includes two years of coverage.',
  pros: [
    '76 L interior with a deliberately low entrance',
    'Weight-based cat identification and per-cat health tracking without a camera',
    'Sealed ShieldBase and elastic-edged litter pad target leaks directly',
    'Two years of coverage included',
    'Less than half the price of the camera-equipped Purobot Ultra',
  ],
  cons: [
    'PETKIT trash bags and the N50 odour module are proprietary consumables',
    '2.4 GHz Wi-Fi only',
    'PETKIT advises against use by cats under six months',
    'Weight-based identification cannot separate cats of similar weight',
  ],
  bestFor: ['Multi-cat homes wanting health data without a camera', 'Cats needing a low entrance', 'Value-focused buyers'],
  notIdealFor: ['Kittens under six months', 'Cats over 22 lb', 'Homes on a 5 GHz-only network'],
  specs: {
    ...pura.specs,
    dimensions: '24.21 in L x 21.96 in W x 21.96 in H',
    footprint: '24.21 x 21.96 in',
    entryHeight: null,
    weight: '22 lb',
    minimumCatWeight: '3.3 lb (not for cats under 6 months)',
    maximumCatWeight: '22 lb',
    wasteCapacity: null,
    interiorVolume: '76 L',
    litterTypes: null,
    wifi: true,
    app: 'PETKIT (iOS, Android), 2.4 GHz only',
    odorSystem: 'N50 2.0 odour module + sealed ShieldBase',
    noiseLevel: null,
    safetySensors: ['Always-open anti-pinch design', 'Safety sensors'],
    bagType: 'PETKIT trash bags (20 included)',
    proprietaryBags: true,
    replacementCost: null,
    filterCost: null,
    warranty: '2-year coverage',
    multiCatCapable: true,
    catsSupported: null,
    cycleTime: null,
    power: null,
  },
  sections: {
    ...pura.sections,
    app:
      'The same PETKIT app as the Purobot Ultra, identifying cats by weight rather than by sight. It logs each cat’s weight, visit frequency and duration, which is the data that actually surfaces a developing urinary problem. Weight-based identification struggles to separate cats within about a pound of each other.',
    odorControl:
      'An N50 2.0 odour module sits alongside a patented seamless ShieldBase that seals the cylinder, which PETKIT positions as much as an anti-leak measure as an odour one. PETKIT publishes no removal percentage for this model.',
    cleaning:
      'A 76 L interior, which is generous, with a cleaning cycle after each use. PETKIT rates it for cats from 3.3 to 22 lb and specifically warns against use by cats under six months old.',
    safety:
      'PETKIT describes an always-open, anti-pinch design with safety sensors, meaning the drum never fully closes and a cat always has an exit. They publish no sensor count.',
    consumables:
      'PETKIT trash bags, with 20 in the box, plus N50 odour refills. Both are proprietary. We have not sourced replacement pricing, so we are not publishing a running-cost figure.',
    longTermCost:
      'At $389 list, and routinely $299, this is the cheapest way into PETKIT’s health tracking. The bags and odour refills are the offsetting cost and we cannot yet put a number on them.',
    noise: 'PETKIT publishes no decibel figure and we have not measured one, so we are not printing a number.',
  },
});
write('petkit-pura-max-2', pura);

// ------------------------------- CATLINK Luxury / Pro-X (corrected + renamed)

const lux = read('catlink-luxury-pro');
Object.assign(lux, {
  slug: 'catlink-luxury-pro-x',
  model: 'CATLINK Luxury Pro-X',
  shortName: 'CATLINK Pro-X',
  asin: 'B09L7Q9446',
  price: 469,
  priceNote: 'List price $469. Frequently discounted to $369. Sold as the X-Large (Luxury) size.',
  sources: [{ name: 'Amazon — CATLINK Store', url: 'https://www.amazon.com/dp/B09L7Q9446' }],
  lastVerified: CHECKED,
  lastUpdated: CHECKED,
  availability: 'current',
  scores: { cleaning: 8.5, odorControl: 8.6, safety: 8.6, app: 8.2, maintenance: 8.1, value: 8.5 },
  verdict:
    'The Pro-X is the CATLINK to buy if you want the health monitoring without the camera. It shares its shell, its 65 L interior and its 13 L waste bin with the more expensive Ultra, tracks each cat’s weight and bathroom habits, and sends weekly summaries built to surface a UTI or a quiet weight loss early. What it lacks is the lens — which for a lot of households is a feature rather than an omission. CATLINK claims ten safety sensors and up to 90% odour elimination.',
  pros: [
    'Per-cat health monitoring and weekly summaries without a camera in the room',
    '13 L waste bin — CATLINK states 14 days for one cat, 7 for two',
    'Ten safety sensors combining radar and infrared, plus a night light for older cats',
    'Triple odour control with a carbon filter',
    '60 liners included in the box',
  ],
  cons: [
    'Sold through a reseller storefront rather than shipped by CATLINK directly',
    'CATLINK publishes no cat weight range for this model',
    'Liners are CATLINK’s own and we could not confirm whether third-party bags fit',
  ],
  bestFor: ['Multi-cat homes wanting health data', 'Anyone who wants tracking but not a camera', 'Older cats — the night light is a genuine touch'],
  notIdealFor: ['Buyers who want a published cat weight limit', 'Small rooms'],
  specs: {
    ...lux.specs,
    dimensions: '23.62 in L x 23.62 in W x 27.95 in H',
    footprint: '23.62 x 23.62 in',
    entryHeight: null,
    weight: '22 lb',
    minimumCatWeight: null,
    maximumCatWeight: null,
    wasteCapacity: '13 L',
    interiorVolume: '65 L',
    litterTypes: null,
    wifi: true,
    app: 'CATLINK (iOS, Android)',
    odorSystem: 'Triple odor control + carbon filter + sealed globe chamber',
    noiseLevel: null,
    safetySensors: ['Ten safety sensors', 'Radar and infrared detection', 'Pinch-free design', 'Ambient night light'],
    bagType: 'CATLINK liners (60 included)',
    proprietaryBags: null,
    replacementCost: null,
    filterCost: null,
    warranty: null,
    multiCatCapable: true,
    catsSupported: null,
    cycleTime: null,
    power: null,
  },
  sections: {
    ...lux.sections,
    app:
      'CATLINK tracks each cat’s weight and bathroom habits in real time, pushes an alert when something changes, and sends a weekly summary aimed at catching UTIs or weight loss early. It is the same platform as the Ultra without the video feed.',
    odorControl:
      'Triple odour control plus a carbon filter inside a sealed globe chamber. CATLINK claims up to 90% of odours eliminated — their figure, not ours, and notably more modest than the 98.55% they claim for the Ultra.',
    cleaning:
      'A 65 L interior with a 13 L waste bin. CATLINK states up to 14 days between empties for one cat, or 7 days for two.',
    safety:
      'CATLINK describes ten safety sensors combining radar and infrared, halting the cycle the moment a cat is detected, with a pinch-free mechanism. A soft ambient light helps older cats find it at night.',
    consumables:
      'CATLINK liners, with 60 in the box, plus carbon filters. We have not established whether third-party bags fit or sourced refill pricing, so we are not publishing a running-cost figure.',
    longTermCost:
      'At $469 list — and routinely $369 — this undercuts the camera-equipped Ultra by a meaningful margin while keeping the health tracking. The 60 included liners mean the first several months cost nothing extra.',
    noise: 'CATLINK publishes no decibel figure for the Pro-X and we have not measured one, so we are not printing a number.',
  },
});
write('catlink-luxury-pro-x', lux);
unlinkSync(join(P, 'catlink-luxury-pro.json'));
if (existsSync(join(H, 'catlink-luxury-pro.json'))) {
  const hub = JSON.parse(readFileSync(join(H, 'catlink-luxury-pro.json'), 'utf8'));
  hub.product = 'catlink-luxury-pro-x';
  hub.intro =
    'The Pro-X shares its globe and its app with the rest of the CATLINK range, so the same fixes apply. CATLINK warns against standing the unit on carpet, which interferes with the sensors and is the first thing to rule out.';
  writeFileSync(join(H, 'catlink-luxury-pro-x.json'), JSON.stringify(hub, null, 2) + '\n');
  unlinkSync(join(H, 'catlink-luxury-pro.json'));
}

// --------------------------------------------------------- Omega Paw (corrected)

const omega = read('omega-paw-roll-n-clean');
Object.assign(omega, {
  asin: 'B01N4KIKOM',
  price: 65,
  priceNote: 'Listed at $66.99 for the Large in Brown at the time of checking.',
  sources: [{ name: 'Amazon — Omega Paw', url: 'https://www.amazon.com/dp/B01N4KIKOM' }],
  lastVerified: CHECKED,
  lastUpdated: CHECKED,
  availability: 'current',
  scores: { ...omega.scores, value: 9.0 },
  specs: {
    ...omega.specs,
    dimensions: '21.5 in L x 18.5 in W x 20 in H',
    footprint: '21.5 x 18.5 in',
    entryHeight: null,
    weight: '6.5 lb',
    minimumCatWeight: null,
    maximumCatWeight: null,
    wasteCapacity: null,
    litterTypes: ['Clumping clay'],
    wifi: false,
    app: 'None',
    odorSystem: 'Hood only',
    noiseLevel: null,
    safetySensors: null,
    bagType: 'None required',
    proprietaryBags: false,
    replacementCost: 0,
    filterCost: 0,
    warranty: null,
    cycleTime: null,
    power: 'None',
  },
  sections: {
    ...omega.sections,
    longTermCost:
      'Around $65 once and nothing thereafter. Omega Paw state plainly that it needs no liners, no filters and no electricity, which is the entire argument for it. Note the price has climbed — it was long sold nearer $45.',
    consumables: 'None. No bags, no filters, no trays, no subscription, and no power.',
  },
});
write('omega-paw-roll-n-clean', omega);

// ------------------------------------------- Litter-Robot 3 Connect (retired)

const lr3 = read('litter-robot-3-connect');
Object.assign(lr3, {
  availability: 'discontinued',
  availabilityNote:
    'Whisker has discontinued the Litter-Robot 3 Connect in favour of the Litter-Robot 4. We keep this review for the many people who already own one, and its troubleshooting hub is still maintained.',
  supersededBy: 'litter-robot-4',
  lastUpdated: CHECKED,
});
write('litter-robot-3-connect', lr3);

// ------------------------------------------------- Meowant SC-M01 (limited stock)

const scm01 = read('meowant-sc-m01');
Object.assign(scm01, {
  availability: 'limited',
  availabilityNote:
    'The MW-SC01 has not been formally discontinued, but its availability on Amazon US fluctuates and it was unavailable at our last check. We recommend the SC02 or SC10 instead.',
  supersededBy: 'meowant-sc02',
  lastUpdated: CHECKED,
});
write('meowant-sc-m01', scm01);

// -------------------------------------- PetSafe ScoopFree SmartSpin (replaces)

const smartspin = {
  slug: 'petsafe-scoopfree-smartspin',
  brand: 'petsafe',
  model: 'PetSafe ScoopFree SmartSpin',
  shortName: 'ScoopFree SmartSpin',
  category: 'litter-boxes',
  price: 369,
  priceNote: 'Typical price $369.99. Recently $348.79.',
  releaseYear: 2025,
  accent: '#7d8b9c',
  asin: 'B0F3P55FHZ',
  sources: [{ name: 'Amazon — PetSafe Store', url: 'https://www.amazon.com/dp/B0F3P55FHZ' }],
  lastVerified: CHECKED,
  lastUpdated: CHECKED,
  availability: 'current',
  scoreBasis: 'research',
  testedDate: null,
  specs: {
    dimensions: '20.9 in L x 19.3 in W x 26.4 in H',
    footprint: '20.9 x 19.3 in',
    entryHeight: null,
    weight: '25.9 lb',
    minimumCatWeight: null,
    maximumCatWeight: '25 lb',
    wasteCapacity: null,
    litterTypes: ['Any litter; clumping clay recommended'],
    wifi: true,
    app: 'PetSafe Pet Companion (iOS, Android), 2.4 GHz only',
    odorSystem: 'Sealed waste drawer',
    noiseLevel: null,
    safetySensors: null,
    bagType: null,
    proprietaryBags: null,
    replacementCost: null,
    filterCost: null,
    warranty: null,
    multiCatCapable: true,
    catsSupported: null,
    cycleTime: null,
    power: null,
  },
  scores: { cleaning: 7.6, odorControl: 7.8, safety: 7.8, app: 7.4, maintenance: 7.6, value: 7.0 },
  verdict:
    'The SmartSpin is PetSafe abandoning the thing that made ScoopFree expensive to own. Where the old ScoopFree raked waste into disposable crystal trays you had to keep buying, the SmartSpin sifts clumps into a sealed drawer and works with any litter — clumping clay recommended. That single change removes the worst running cost in this category. It also tracks weight and litter habits through PetSafe’s app and handles cats up to 25 lb. The concern is reception: it sits at 3.6 stars, the lowest of anything we track.',
  pros: [
    'Works with any litter — no more mandatory crystal trays',
    'Rated for cats up to 25 lb, matching the Litter-Robot 4',
    'App tracks weight and litter habits',
    'PetSafe states up to two weeks between empties',
    'US-based phone, email and chat support',
  ],
  cons: [
    '3.6 stars across 570 ratings — the weakest reception of any box we track',
    'PetSafe publishes very little hard specification detail',
    'App needs a 2.4 GHz network',
  ],
  bestFor: ['Anyone escaping the old ScoopFree tray subscription', 'Large cats up to 25 lb', 'Buyers who want US-based support'],
  notIdealFor: ['Buyers who weigh customer ratings heavily', 'Homes on a 5 GHz-only network'],
  sections: {
    setup:
      'PetSafe publishes no setup time. The app needs a 2.4 GHz network, which is the usual pairing constraint in this category.',
    app:
      'The PetSafe Pet Companion app gives real-time weight and litter-habit data. That is a substantial step up from the old ScoopFree, which offered no weight sensing at all.',
    odorControl:
      'Clumps are sifted into a sealed waste drawer, and PetSafe claims four times better odour control than their previous design. That is a comparison against their own older product rather than an absolute figure.',
    noise: 'PetSafe publishes no decibel figure and we have not measured one, so we are not printing a number.',
    cleaning:
      'A spinning sifter rather than the rake used by the older ScoopFree, dropping clumps into a sealed drawer. PetSafe states up to two weeks of hands-free use. Crucially it takes ordinary clumping litter.',
    safety:
      'PetSafe describes the unit as built with cat safety in mind and sitting just 12 inches from the ground, but publishes no sensor detail. That gap is the main reason this does not score higher on safety.',
    consumables:
      'No proprietary crystal trays, which was the defining cost of the old ScoopFree. We have not confirmed whether the waste drawer needs PetSafe liners, so we are not publishing a running-cost figure.',
    longTermCost:
      'At $369 it costs more up front than the ScoopFree it replaces, and dramatically less to run, because the crystal tray subscription is gone. Over four years that is the trade that matters.',
  },
};
write('petsafe-scoopfree-smartspin', smartspin);
unlinkSync(join(P, 'petsafe-scoopfree-smart.json'));

// ------------------------------------------------------------- new Meowant pair

const meowantHubBase = existsSync(join(H, 'meowant-sc-m01.json'))
  ? JSON.parse(readFileSync(join(H, 'meowant-sc-m01.json'), 'utf8'))
  : null;

const sc02 = {
  slug: 'meowant-sc02',
  brand: 'meowant',
  model: 'Meowant SC02',
  shortName: 'Meowant SC02',
  category: 'litter-boxes',
  price: 269,
  priceNote: 'Typical price $269.99. Recently $256.49.',
  releaseYear: 2026,
  accent: '#93a88f',
  asin: 'B0GFM2YT53',
  sources: [{ name: 'Amazon — Meowant Store', url: 'https://www.amazon.com/dp/B0GFM2YT53' }],
  lastVerified: CHECKED,
  lastUpdated: CHECKED,
  availability: 'current',
  scoreBasis: 'research',
  testedDate: null,
  specs: {
    dimensions: null,
    footprint: null,
    entryHeight: '6.8 in',
    weight: '23 lb (10.5 kg)',
    minimumCatWeight: '3.3 lb',
    maximumCatWeight: '22 lb',
    wasteCapacity: null,
    interiorVolume: '75 L',
    litterTypes: null,
    wifi: true,
    app: 'Meowant (iOS, Android)',
    odorSystem: 'Odour removal module',
    noiseLevel: null,
    safetySensors: ['Integrated anti-pinch protection'],
    bagType: 'Meowant liners',
    proprietaryBags: null,
    replacementCost: null,
    filterCost: null,
    warranty: null,
    multiCatCapable: true,
    catsSupported: null,
    cycleTime: null,
    power: null,
  },
  scores: { cleaning: 7.9, odorControl: 7.4, safety: 8.2, app: 7.2, maintenance: 7.8, value: 8.9 },
  verdict:
    'The SC02 is the cheapest box in this index that still does everything the expensive ones do. A 75 L open interior, health monitoring through the app, integrated anti-pinch protection, and — the specification that actually matters to a lot of buyers — a 6.8 inch entrance, the lowest figure any manufacturer here publishes. At $269 that combination is hard to argue with. What you give up is polish and any real track record on materials.',
  pros: [
    '6.8 in entrance — the lowest published entry height of anything we track',
    '75 L interior at $269',
    'Health monitoring and app control at a budget price',
    'Rated for cats from 3.3 to 22 lb',
    "Amazon's Choice with over 1,300 ratings",
  ],
  cons: [
    'Meowant publishes no reliable dimensions for the unit',
    'App is basic next to PETKIT or Whisker',
    'Liners are Meowant’s own and we could not confirm third-party bags fit',
  ],
  bestFor: ['Kittens, senior and arthritic cats', 'First-time buyers', 'The lowest possible entry price with real features'],
  notIdealFor: ['Cats over 22 lb', 'Buyers who want a mature app'],
  sections: {
    setup: 'Meowant publishes no setup time. The unit ships largely assembled and pairs through the Meowant app.',
    app: 'Basic but functional: remote control, usage data and health monitoring. It does not approach the depth of the PETKIT or Whisker apps, which at this price is not surprising.',
    odorControl: 'Meowant describes an odour removal module. They publish no removal percentage and we have not measured it. The open design limits containment between cycles.',
    noise: 'Meowant publishes no decibel figure and we have not measured one, so we are not printing a number.',
    cleaning: 'A 75 L open interior with a large entrance, rated for cats from 3.3 to 22 lb. The open-top layout means cats can see out, which lifts acceptance rates.',
    safety: 'Meowant describes integrated anti-pinch protection. They publish no sensor count, which is the main gap in an otherwise strong budget specification.',
    consumables: 'Meowant liners, sold in 60-packs, plus an optional odour gel refill. We have not sourced current pricing, so we are not publishing a running-cost figure.',
    longTermCost: 'At $269 it is among the cheapest powered boxes here. Until we can price the liners we cannot tell you what it costs to keep running.',
  },
};
write('meowant-sc02', sc02);

const sc10 = {
  slug: 'meowant-sc10',
  brand: 'meowant',
  model: 'Meowant SC10',
  shortName: 'Meowant SC10',
  category: 'litter-boxes',
  price: 279,
  priceNote: 'List price $279.99.',
  releaseYear: 2026,
  accent: '#87a4a0',
  asin: 'B0GX1642VT',
  sources: [{ name: 'Amazon — Meowant Store', url: 'https://www.amazon.com/dp/B0GX1642VT' }],
  lastVerified: CHECKED,
  lastUpdated: CHECKED,
  availability: 'current',
  scoreBasis: 'research',
  testedDate: null,
  specs: {
    dimensions: '21 in L x 17 in W x 26 in H',
    footprint: '21 x 17 in',
    entryHeight: null,
    entryOpening: '21.65 x 15.75 in (top entry)',
    weight: null,
    minimumCatWeight: '3 lb, and at least 5.91 in tall',
    maximumCatWeight: null,
    wasteCapacity: '12 L',
    litterCapacity: '6 L',
    litterTypes: null,
    wifi: true,
    app: 'Meowant (iOS, Android)',
    odorSystem: 'Odour control with sealed waste drawer',
    noiseLevel: null,
    safetySensors: ['Six infrared sensors', 'Never fully closes — permanent exit route'],
    bagType: 'Meowant liners',
    proprietaryBags: null,
    replacementCost: null,
    filterCost: null,
    warranty: null,
    multiCatCapable: true,
    catsSupported: null,
    cycleTime: null,
    power: null,
  },
  scores: { cleaning: 8.0, odorControl: 7.3, safety: 8.4, app: 6.8, maintenance: 8.0, value: 8.7 },
  verdict:
    'The SC10 takes a deliberate position most of this category avoids: it has no weight sensor at all. Meowant argue that gravity sensors are defeated by uneven floors and thick rugs, so they use six infrared sensors instead and never close the unit fully, leaving a permanent exit. That removes the single most common source of complaints in this category — bad weight readings — at the cost of losing per-cat weight tracking entirely. The top entry is 21.65 by 15.75 inches, and the 12 L drawer is large for $279.',
  pros: [
    'No weight sensor means no weight-sensor problems — uneven floors stop mattering',
    'Six infrared sensors and a unit that never fully closes',
    '12 L waste drawer and 6 L litter capacity at $279',
    'Very large top entry at 21.65 x 15.75 in',
    'Stainless steel construction',
  ],
  cons: [
    'No weight tracking at all, so no per-cat health data',
    'Meowant publishes no maximum cat weight',
    'Only 98 ratings — a short track record',
  ],
  bestFor: ['Homes with uneven floors or thick carpet', 'Large breeds', 'Anyone who has fought with weight-sensor errors'],
  notIdealFor: ['Anyone who wants per-cat weight tracking', 'Cats under 3 lb or under 5.91 in tall'],
  sections: {
    setup: 'Meowant publishes no setup time. Because there is no weight sensor there is no levelling or tare step, which removes the fiddliest part of setting up most rivals.',
    app: 'Remote cycle control, visit frequency and habit data. With no weight sensor there is no weight trend, which is the single most useful health signal the better apps provide.',
    odorControl: 'Odour control over a sealed waste drawer. Meowant publish no removal figure and we have not measured it. As with any open-top design, containment between cycles is limited.',
    noise: 'Meowant publishes no decibel figure and we have not measured one, so we are not printing a number.',
    cleaning: 'A 12 L waste drawer with 6 L of litter capacity, which Meowant states lasts around 10 days for one adult cat. The top entry is 21.65 by 15.75 inches, which they claim is 40% larger than typical.',
    safety: 'Six infrared sensors monitor the cat, and the unit never closes completely so there is always an exit. The deliberate absence of a gravity sensor means floor levelling cannot cause a misread.',
    consumables: 'Meowant liners. We have not sourced current pricing, so we are not publishing a running-cost figure.',
    longTermCost: 'At $279 with a 12 L drawer, the up-front cost is low. The liners are the unknown.',
  },
};
write('meowant-sc10', sc10);

// ------------------------------------------------- hubs for the new products

function hubFrom(base, product, intro, extraSymptoms = [], drop = []) {
  const hub = JSON.parse(JSON.stringify(base));
  hub.product = product;
  hub.intro = intro;
  hub.symptoms = hub.symptoms.filter((s) => !drop.includes(s.slug));
  hub.symptoms.unshift(...extraSymptoms);
  return hub;
}

if (meowantHubBase) {
  writeFileSync(
    join(H, 'meowant-sc02.json'),
    JSON.stringify(
      hubFrom(
        meowantHubBase,
        'meowant-sc02',
        'The SC02 uses a conventional drum, so conventional drum fixes apply. Its low 6.8 inch entrance is its selling point and also the place litter escapes from, so scatter is the complaint owners raise most.'
      ),
      null,
      2
    ) + '\n'
  );

  writeFileSync(
    join(H, 'meowant-sc10.json'),
    JSON.stringify(
      hubFrom(
        meowantHubBase,
        'meowant-sc10',
        'The SC10 has no weight sensor, so every weight-related fix that applies to the rest of this category is irrelevant here. What it does have is six infrared sensors, and false triggers from those are the characteristic complaint.',
        [],
        ['cat-weight-incorrect']
      ),
      null,
      2
    ) + '\n'
  );
}

const oldPetsafeHub = join(H, 'petsafe-scoopfree-smart.json');
if (existsSync(oldPetsafeHub)) {
  const base = JSON.parse(readFileSync(oldPetsafeHub, 'utf8'));
  // The rake and crystal-tray faults do not exist on the SmartSpin.
  const spin = hubFrom(
    base,
    'petsafe-scoopfree-smartspin',
    'The SmartSpin replaces the rake-and-tray mechanism the older ScoopFree used, so none of the rake jams or tray sensor errors apply. It spins and sifts into a sealed drawer, and it takes ordinary clumping litter.',
    [
      {
        slug: 'wont-spin',
        title: 'Will not spin',
        severity: 'serious',
        summary: 'The unit sits idle after a visit, or starts and stops without completing a rotation.',
        causes: [
          'Litter filled above the marked line, which is the most common cause of a stalled cycle.',
          'A clump has welded to the sifting screen.',
          'The waste drawer is not fully seated, leaving the safety interlock open.',
        ],
        fixes: [
          { step: 'Check the litter level', detail: 'Litter should sit at or just below the marked fill line. Remove a cup and retry if in doubt.' },
          { step: 'Reseat the drawer', detail: 'Pull the waste drawer fully out and push it back until it clicks home.' },
          { step: 'Clear the sifting screen', detail: 'Unplug, remove the globe, and scrape any welded clump off the screen with a plastic scraper.' },
          { step: 'Run an empty test cycle', detail: 'With litter removed, run one cycle. Completing empty but failing when loaded points at litter, not the motor.' },
        ],
        escalate: 'A unit that fails an empty test cycle has a drive fault. PetSafe offer US-based phone, email and chat support — use it rather than continuing to reset.',
      },
    ],
    ['rake-stuck', 'tray-sensor-error']
  );
  writeFileSync(join(H, 'petsafe-scoopfree-smartspin.json'), JSON.stringify(spin, null, 2) + '\n');
  unlinkSync(oldPetsafeHub);
}

console.log('Batch two applied: 4 corrected, 3 added, 2 flagged, 1 replaced.');

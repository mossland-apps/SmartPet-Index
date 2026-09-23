// Resolves the CATLINK mix-up. Run: node scripts/verify-catlink.mjs
//
// Our "CATLINK Scooper Pro X" record matched no real product: it was priced like the
// Ultra but described a box with no camera. The price anchor wins, so that record
// becomes the Ultra, and the Scoop Robot Pro is added as the separate product it is.
import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const products = join(root, 'src/data/products');
const hubs = join(root, 'src/data/troubleshooting');

const CHECKED = '2026-09-23';
const CATLINK_SOURCE = { name: 'Amazon — CATLINK Store', url: 'https://www.amazon.com/dp/' };

// ---------------------------------------------------------------- CATLINK Ultra

const ultra = JSON.parse(readFileSync(join(products, 'catlink-scooper-pro-x.json'), 'utf8'));

Object.assign(ultra, {
  slug: 'catlink-ultra',
  model: 'CATLINK Ultra',
  shortName: 'CATLINK Ultra',
  asin: 'B0DSCFTSTQ',
  price: 499,
  priceNote: 'Listed as the X-Large (Ultra) size. An X-Large (Luxury) size sits on the same listing.',
  sources: [{ name: 'Amazon — CATLINK Store', url: 'https://www.amazon.com/dp/B0DSCFTSTQ' }],
  lastVerified: CHECKED,
  lastUpdated: CHECKED,
  scores: { cleaning: 8.7, odorControl: 8.8, safety: 8.7, app: 8.9, maintenance: 8.2, value: 8.4 },
  verdict:
    'The Ultra is CATLINK putting a camera and a health monitor into a $499 box, which is roughly $300 less than anyone else charges for the same idea. It watches each visit, identifies individual cats, and flags things like blood or soft stools in the waste — genuinely useful if you are managing a cat with a known condition. The 13 L drawer is among the largest here and CATLINK claims a lab-verified 98.55% odour removal. The catch is the same one every camera box carries: there is a lens pointed at your floor, and the footage goes to CATLINK.',
  pros: [
    'AI camera and per-cat health reporting at $499, far below the camera competition',
    '13 L waste drawer inside a 65 L interior — among the largest here',
    'Dual-band Wi-Fi, so it works on 5 GHz networks most rivals cannot join',
    'Ten-level protection system combining sensors, radar and anti-pinch',
    'Two-way audio and live streaming',
  ],
  cons: [
    'A camera in a litter box is a privacy decision, and footage goes to CATLINK',
    'Sold through a reseller storefront rather than shipped by CATLINK directly',
    'Very few customer reviews — this is a new listing with a short track record',
    'CATLINK publishes little hard specification detail beyond the marketing copy',
  ],
  bestFor: [
    'Multi-cat homes needing per-cat health data',
    'Cats with a monitored urinary or digestive condition',
    'Homes on a 5 GHz-only network',
  ],
  notIdealFor: [
    'Privacy-sensitive households',
    'Cats over 22 lb',
    'Buyers who want a long track record before spending $499',
  ],
  specs: {
    ...ultra.specs,
    dimensions: '23.62 in L x 23.62 in W x 27.95 in H',
    footprint: '23.62 x 23.62 in',
    entryHeight: null,
    weight: null,
    minimumCatWeight: '3.5 lb',
    maximumCatWeight: '22 lb',
    wasteCapacity: '13 L',
    litterCapacity: null,
    litterTypes: null,
    wifi: true,
    app: 'CATLINK (iOS, Android), 2.4 GHz and 5 GHz',
    odorSystem: 'Five-stage system: C70 odor eliminator + sealed HDPE waste bag',
    noiseLevel: null,
    safetySensors: ['Ten-level protection system', 'Sensors and radar', 'AI camera detection', 'Anti-pinch stop'],
    bagType: 'CATLINK HDPE waste bags (supply included)',
    proprietaryBags: null,
    replacementCost: null,
    filterCost: null,
    warranty: null,
    multiCatCapable: true,
    catsSupported: null,
    cycleTime: null,
    power: null,
    interiorVolume: '65 L',
  },
  sections: {
    ...ultra.sections,
    setup:
      'CATLINK does not publish a setup time. The unit ships assembled enough to need only the drawer fitted and the app paired, and unusually for this category it will join either a 2.4 GHz or a 5 GHz network, which removes the single most common pairing failure.',
    app:
      'This is where the money goes. The app identifies individual cats, builds daily and weekly health reports per cat, and flags waste that looks abnormal. It also carries live video and two-way audio. For a single healthy cat that is overkill; for a household managing a urinary condition across three cats it is the reason to buy this box.',
    odorControl:
      'CATLINK describes a five-stage system built around a C70 odour eliminator and a sealed HDPE waste bag, and claims 98.55% odour removal verified by independent lab testing. That is their figure, not ours, and we have not seen the test protocol.',
    noise:
      'CATLINK publishes no decibel figure for the Ultra and we have not measured one, so we are not printing a number.',
    cleaning:
      'A 13 L waste drawer inside a 65 L interior. CATLINK states roughly 20 days between empties for a single cat, and that the included bag supply lasts about 1000 days on the same basis.',
    safety:
      'CATLINK describes ten levels of protection, combining sensors, radar and the AI camera, with the globe halting the moment a cat comes near. They specifically warn against placing the unit on carpet, which interferes with the sensors — worth knowing before you buy.',
    consumables:
      'CATLINK HDPE waste bags, with a supply included that CATLINK says lasts about 1000 days for one cat. We have not established whether third-party bags fit, or sourced replacement pricing, so we are not publishing a running-cost figure.',
    longTermCost:
      'At $499 with an included bag supply measured in years rather than months, the early running cost is close to nothing. What we cannot yet tell you is what a refill costs once that supply runs out.',
  },
});
delete ultra.retailers;
writeFileSync(join(products, 'catlink-ultra.json'), JSON.stringify(ultra, null, 2) + '\n');
unlinkSync(join(products, 'catlink-scooper-pro-x.json'));

// ------------------------------------------------------- CATLINK Scoop Robot Pro

const scoop = {
  slug: 'catlink-scoop-robot-pro',
  brand: 'catlink',
  model: 'CATLINK Scoop Robot Pro',
  shortName: 'Scoop Robot Pro',
  category: 'litter-boxes',
  price: 699,
  priceNote: 'White and Black colourway. A second colourway on the same listing is $799.',
  releaseYear: 2026,
  accent: '#5f8f84',
  asin: 'B0GZ3C5ZTF',
  sources: [{ name: 'Amazon — CATLINK Store', url: 'https://www.amazon.com/dp/B0GZ3C5ZTF' }],
  lastVerified: CHECKED,
  lastUpdated: CHECKED,
  scoreBasis: 'research',
  testedDate: null,
  specs: {
    dimensions: '25.2 in L x 32.1 in W x 21.3 in H',
    footprint: '25.2 x 32.1 in',
    entryHeight: null,
    entryOpening: '17 in wide',
    weight: null,
    minimumCatWeight: null,
    maximumCatWeight: null,
    wasteCapacity: '15 L',
    litterCapacity: null,
    litterTypes: null,
    wifi: true,
    app: 'CATLINK (iOS, Android), dual-band Wi-Fi',
    odorSystem: 'Built-in odor control with sealed waste bin',
    noiseLevel: '~30 dB (manufacturer claim)',
    safetySensors: ['Dual AI cameras', 'AI visual detection', 'Weight detection', 'Side-roll anti-pinch structure'],
    bagType: 'CATLINK waste bags',
    proprietaryBags: null,
    replacementCost: null,
    filterCost: null,
    warranty: null,
    multiCatCapable: true,
    catsSupported: null,
    cycleTime: null,
    power: null,
    interiorVolume: '82 L',
  },
  scores: { cleaning: 8.5, odorControl: 8.2, safety: 8.8, app: 9.0, maintenance: 8.0, value: 7.6 },
  verdict:
    'The Scoop Robot Pro is built around one idea: make the box big enough that a large cat never feels cornered. The interior is 82 litres and the entrance is 17 inches wide, roughly double the standard, which is the most direct answer anyone in this category has given to cats that refuse enclosed boxes. It cleans by rolling to one side rather than tumbling a globe, which CATLINK says cuts the dust cloud you get when a drum dumps. Two AI cameras handle identification and health tracking. It is $699 and it has been on sale for a matter of weeks.',
  pros: [
    '82 L interior with a 17 in wide entrance — the most spacious box in this index',
    'Side-roll dumping produces less airborne dust than a tumbling drum',
    '15 L waste bin, around 20 days for a single cat',
    'Dual AI cameras with two-way talk and per-cat health reports',
    'CATLINK rates it at 30 dB',
  ],
  cons: [
    'A very large footprint at 25 x 32 in',
    'Two cameras pointed at your floor, with footage going to CATLINK',
    'Almost no customer history — a handful of reviews at the time of writing',
    'CATLINK publishes no cat weight range for this model',
  ],
  bestFor: [
    'Large breeds and cats that refuse enclosed boxes',
    'Households where litter dust is a concern',
    'Multi-cat homes wanting per-cat health data',
  ],
  notIdealFor: [
    'Small rooms — the footprint is the largest here',
    'Privacy-sensitive households',
    'Buyers who want a proven track record',
  ],
  sections: {
    setup:
      'CATLINK does not publish a setup time. It joins either a 2.4 GHz or a 5 GHz network, which removes the most common pairing failure in this category. Measure your floor before ordering: at 25 by 32 inches this is the largest unit we track.',
    app:
      'Dual cameras feed live video, two-way audio and per-cat identification into the CATLINK app, which generates bathroom-habit reports intended to surface urinary problems early. It is the same software as the Ultra with a second camera behind it.',
    odorControl:
      'CATLINK describes built-in odour control over a sealed waste bin holding 15 litres, and claims around 20 days of hands-free use for one cat. They publish no removal percentage for this model, and we have not measured it.',
    noise:
      'CATLINK rates it at 30 dB. That is their figure rather than a measurement of ours, but it is consistent with a mechanism that rolls to one side instead of spinning a drum.',
    cleaning:
      'Rather than tumbling a globe, the unit rolls to one side and lets waste fall into the bin in a single motion. CATLINK argues this reduces the dust cloud a drum throws up. The 82 L interior means large cats can turn around fully, which is the design point.',
    safety:
      'Two AI cameras and weight detection stop the cycle the moment a cat approaches, and the side-roll structure has no pinch gap of the kind a rotating drum creates. CATLINK publishes no minimum or maximum cat weight for this model, which is a gap we would want closed before recommending it for kittens.',
    consumables:
      'CATLINK waste bags. We have not established whether third-party bags fit, or sourced replacement pricing, so we are not publishing a running-cost figure.',
    longTermCost:
      'At $699 it sits alongside the Litter-Robot 4 on purchase price. Until we can price CATLINK bag refills we cannot tell you how the two compare over several years, which is the comparison that actually matters.',
  },
};
writeFileSync(join(products, 'catlink-scoop-robot-pro.json'), JSON.stringify(scoop, null, 2) + '\n');

// ------------------------------------------------------------- troubleshooting

const oldHub = join(hubs, 'catlink-scooper-pro-x.json');
if (existsSync(oldHub)) {
  const hub = JSON.parse(readFileSync(oldHub, 'utf8'));
  hub.product = 'catlink-ultra';
  hub.intro =
    'Most CATLINK Ultra problems are litter-related rather than electronic, and the two that are electronic are the camera and the network. CATLINK specifically warns against standing the unit on carpet, which interferes with the sensors and is the first thing to rule out.';
  writeFileSync(join(hubs, 'catlink-ultra.json'), JSON.stringify(hub, null, 2) + '\n');
  unlinkSync(oldHub);

  const scoopHub = JSON.parse(JSON.stringify(hub));
  scoopHub.product = 'catlink-scoop-robot-pro';
  scoopHub.intro =
    'The Scoop Robot Pro rolls to one side rather than tumbling a drum, so the jam patterns are different from every other CATLINK. Its own characteristic complaints are the cameras and the sheer size of the thing.';
  scoopHub.symptoms = scoopHub.symptoms.filter((s) => s.slug !== 'drum-jam');
  scoopHub.symptoms.unshift({
    slug: 'cameras-not-identifying',
    title: 'Cameras do not identify cats',
    severity: 'common',
    summary:
      'The app records visits but attributes them to the wrong cat, or to no cat at all.',
    causes: [
      'Ambient light is too low for the cameras to separate coat patterns.',
      'The cat profiles have too few training images, or the cats look alike.',
      'Litter dust has filmed over one or both lenses.',
    ],
    fixes: [
      { step: 'Add light', detail: 'A cheap plug-in nightlight near the unit measurably improves identification on every camera box we have looked at.' },
      { step: 'Add training images', detail: 'Feed the app more images of each cat from above and behind — the angles the cameras actually see — rather than front-on portraits.' },
      { step: 'Clean both lenses', detail: 'Litter dust films the optics within weeks. Wipe both with a dry microfibre cloth monthly.' },
    ],
    escalate:
      'If identification still fails in good light with clean lenses and full profiles, report it to CATLINK — this is a software problem, not something you can fix at the unit.',
  });
  writeFileSync(join(hubs, 'catlink-scoop-robot-pro.json'), JSON.stringify(scoopHub, null, 2) + '\n');
}

console.log('CATLINK Scooper Pro X -> CATLINK Ultra; added CATLINK Scoop Robot Pro.');

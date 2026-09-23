// Adds the two budget models. Run: node scripts/verify-budget-pair.mjs
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const P = join(root, 'src/data/products');
const B = join(root, 'src/data/brands');
const H = join(root, 'src/data/troubleshooting');
const CHECKED = '2026-09-23';
const w = (dir, name, obj) => writeFileSync(join(dir, name + '.json'), JSON.stringify(obj, null, 2) + '\n');

// ----------------------------------------------------------------- new brand

w(B, 'petpivot', {
  slug: 'petpivot',
  name: 'PetPivot',
  country: 'United States',
  site: 'amazon.com/stores/PetPivot',
  summary:
    'PetPivot sells one thing and sells it cheaply: an open-top self-cleaning box with no app, no account and no subscription. In a category where every rival is racing to add cameras, building something deliberately dumb and putting the money into safety sensors instead is a defensible position.',
  strengths: ['Serious safety hardware at a budget price', 'No app, no account, no subscription', 'Takes ordinary bags and ordinary clumping litter'],
  weaknesses: ['No smart tracking of any kind', 'Short company history', 'Interior is tight for large breeds'],
});

// ------------------------------------------------------- PetPivot Open Top

w(P, 'petpivot-open-top', {
  slug: 'petpivot-open-top',
  brand: 'petpivot',
  model: 'PetPivot Open Top',
  shortName: 'PetPivot Open Top',
  category: 'litter-boxes',
  form: 'open',
  price: 199,
  priceNote: 'List price $199.99. Frequently discounted, recently $139.98 on a Prime deal.',
  releaseYear: 2026,
  accent: '#6e8b98',
  asin: 'B0GL7Q6YXZ',
  sources: [{ name: 'Amazon — PetPivot Official', url: 'https://www.amazon.com/dp/B0GL7Q6YXZ' }],
  lastVerified: CHECKED,
  lastUpdated: CHECKED,
  availability: 'current',
  scoreBasis: 'research',
  testedDate: null,
  specs: {
    dimensions: '21.06 in L x 15.75 in W x 21.85 in H',
    footprint: '21.06 x 15.75 in',
    entryHeight: null,
    weight: '20.6 lb',
    minimumCatWeight: null,
    maximumCatWeight: '22 lb',
    wasteCapacity: '8 L',
    litterCapacity: null,
    litterTypes: ['Bentonite and mineral-based clumping litter'],
    wifi: false,
    app: 'None — deliberately app-free',
    odorSystem: null,
    noiseLevel: null,
    safetySensors: [
      'Seven pairs of precision infrared sensors',
      'Touch-sensitive safety pedal',
      'Mechanical rotation limiter',
    ],
    bagType: 'Standard grocery bags or generic trash liners',
    proprietaryBags: false,
    replacementCost: null,
    filterCost: null,
    warranty: null,
    multiCatCapable: true,
    catsSupported: null,
    cycleTime: null,
    power: null,
  },
  scores: { cleaning: 7.8, odorControl: 6.8, safety: 8.8, app: 0, maintenance: 8.2, value: 9.3 },
  verdict:
    'The PetPivot is the anti-smart-box. No app, no account, no subscription, no connectivity to go wrong — and the money that would have gone into a camera has gone into safety hardware instead: seven pairs of infrared sensors, a touch-sensitive pedal that halts the cycle on contact, and a mechanical limiter that physically restricts rotation. It also does something clever that expensive boxes often get wrong, holding a deliberate clumping delay before it rotates so litter has set and does not smear. The catch is size: the basin is tight, and owners with large cats say so even though PetPivot rate it to 22 lb.',
  pros: [
    'Three independent safety layers, including a mechanical rotation limiter',
    'No app, no account and nothing to lose connection',
    'Clumping delay before rotation cuts pancaking and smearing',
    'Takes ordinary clumping litter and ordinary bags',
    'An access step built in for senior cats',
  ],
  cons: [
    'The basin is tight for large breeds despite the 22 lb rating',
    'No tracking of any kind — no weight, no visit history, no health data',
    'PetPivot describes no active odour system',
    'Short company track record',
  ],
  bestFor: [
    'Anyone who wants automatic scooping and nothing else',
    'Senior cats — the access step is a real design feature',
    'Households avoiding apps and accounts entirely',
  ],
  notIdealFor: ['Large breeds', 'Anyone who wants health or weight tracking', 'Odour-sensitive rooms'],
  sections: {
    setup:
      'There is nothing to pair, no account to create and no network to join, so setup is assembly and litter. For a lot of buyers — particularly older owners, whom PetPivot name explicitly — that is the entire appeal.',
    app: 'There is no app, by design. No subscription, no account, and nothing that stops working when a server goes down. You also get no visit history, no weight trend and no health data at all.',
    odorControl:
      'PetPivot describe no active odour system, and it is an open-top box, so nothing contains smell from the litter bed between cycles. This is the clearest compromise in the product and the main reason it does not score higher.',
    noise: 'PetPivot publishes no decibel figure and we have not measured one, so we are not printing a number.',
    cleaning:
      'The interesting part is the timing. A built-in clumping delay lets litter solidify fully before rotation starts, which is aimed squarely at pancaking and wall smearing — two of the most common complaints about cheap automatic boxes. The 8 L bin is modest but adequate for one cat.',
    safety:
      'Three independent layers: seven pairs of infrared sensors covering the opening, a touch-sensitive pedal that interrupts the cycle on contact, and a mechanical limiter restricting how far the drum can turn. That last one matters because it is physical rather than electronic — it works even if a sensor fails.',
    consumables:
      'Ordinary clumping litter and ordinary bags. PetPivot sell replacement liners but nothing obliges you to use them, and at 8 L a heavy-duty grocery bag fits.',
    longTermCost:
      'At $199 list — and often nearer $140 — with no mandatory consumables and no subscription, this is among the cheapest boxes to own that we track. You are trading data for money.',
  },
});

// -------------------------------------- PetSafe ScoopFree Crystal Pro Legacy

w(P, 'petsafe-scoopfree-crystal-pro-legacy', {
  slug: 'petsafe-scoopfree-crystal-pro-legacy',
  brand: 'petsafe',
  model: 'PetSafe ScoopFree Crystal Pro Legacy',
  shortName: 'ScoopFree Crystal Pro',
  category: 'litter-boxes',
  form: 'tray',
  price: 149,
  priceNote: 'List price $149.99 for the Pro Uncovered with Health Monitor. Recently $129.99. Front Entry and Smart variants cost more.',
  releaseYear: 2024,
  accent: '#8f9bab',
  asin: 'B07WZPJ2LW',
  sources: [{ name: 'Amazon — PetSafe Store', url: 'https://www.amazon.com/dp/B07WZPJ2LW' }],
  lastVerified: CHECKED,
  lastUpdated: CHECKED,
  availability: 'current',
  scoreBasis: 'research',
  testedDate: null,
  specs: {
    dimensions: '27.6 in L x 19.1 in W x 6.2 in H',
    footprint: '27.6 x 19.1 in',
    entryHeight: null,
    weight: '13.3 lb',
    minimumCatWeight: null,
    maximumCatWeight: null,
    wasteCapacity: null,
    litterCapacity: null,
    litterTypes: ['ScoopFree crystal litter only'],
    wifi: false,
    app: 'None — health counter is on the unit itself',
    odorSystem: 'Crystal litter absorption + lined disposable tray',
    noiseLevel: null,
    safetySensors: null,
    bagType: 'Disposable crystal litter trays',
    proprietaryBags: true,
    replacementCost: null,
    filterCost: null,
    warranty: null,
    multiCatCapable: false,
    catsSupported: null,
    cycleTime: null,
    power: null,
  },
  scores: { cleaning: 7.4, odorControl: 7.6, safety: 7.4, app: 3.0, maintenance: 8.0, value: 7.2 },
  verdict:
    'This is the oldest idea in the category and the one most people have actually bought — over ten thousand ratings, which is more than everything else in this index combined. A rake sweeps clumps into a covered compartment inside a disposable crystal tray, and the crystals do the rest: they absorb urine and dry solid waste rather than clumping it. The low, uncovered profile fits under shelves where a globe never will, and the on-unit health counter tracks visits without needing an app. The cost is the trays, which you will buy forever.',
  pros: [
    'Over 10,000 ratings — by far the longest track record here',
    'Crystals are low-tracking and 99% dust-free, which uncovered boxes usually are not',
    'Health counter works on the unit itself, with no app or account needed',
    'Only 6.2 in tall, so it fits where nothing else does',
    'US-based phone, email and chat support',
  ],
  cons: [
    'Disposable crystal trays are mandatory and recurring',
    'Takes no litter other than ScoopFree crystals',
    'No app on this model — the Smart variant costs more',
    'Uncovered, so odour containment depends entirely on the crystals',
  ],
  bestFor: [
    'Low spaces where a globe box will not fit',
    'Single-cat homes',
    'Anyone who wants a proven design over a new one',
  ],
  notIdealFor: [
    'Anyone calculating cost per year',
    'Clumping litter users',
    'Multi-cat homes',
  ],
  sections: {
    setup:
      'The fastest setup here: slide in a pre-filled crystal tray and plug it in. There is nothing to assemble, no account to create and no network to join.',
    app:
      'There is no app on this model. What you get instead is a health counter on the unit with motion sensors, showing how often the box is being used. That is a genuine signal — a cat visiting far more than usual is the earliest warning most owners get — but it lives on a display rather than in a trend you can look back through.',
    odorControl:
      'Crystal litter absorbs urine and dries solid waste rather than clumping it, and each disposable tray is plastic-lined with a lid for disposal. It works well for the first stretch of a tray and tails off as the crystals saturate. Being uncovered, there is no sealed drawer doing any of the work.',
    noise: 'PetSafe publishes no decibel figure and we have not measured one, so we are not printing a number.',
    cleaning:
      'A rake sweeps clumps into a covered compartment at one end of the tray. It is a simpler mechanism than a rotating globe with correspondingly less to break, though a rake smears more than a sifting drum does.',
    safety:
      'PetSafe publish no safety sensor detail for this model. The rake is slow and low-force, which limits the risk inherently, but the absence of a stated sensor specification is why this does not score higher.',
    consumables:
      'Disposable crystal trays, and they are not optional — the box takes no other litter. This is the defining ownership cost and the main argument against it. Reusable trays are available from PetSafe for owners who would rather buy crystals loose.',
    longTermCost:
      'Cheap to buy at $149 and the most consumable-dependent box in this index. The calculation that matters is how many trays a year your cat gets through, because that number, not the $149, is what you are really signing up for.',
  },
});

// ------------------------------------------------------------------- hubs

w(H, 'petpivot-open-top', {
  product: 'petpivot-open-top',
  intro:
    'There is no app, no network and no account, so most of the troubleshooting that dominates this category simply does not apply. What is left is mechanical, and nearly all of it comes back to litter.',
  symptoms: [
    {
      slug: 'wont-rotate',
      title: 'Will not rotate',
      severity: 'serious',
      summary: 'The drum sits idle after a visit, or starts and stops partway through.',
      causes: [
        'Litter filled above the line — the most common cause of a stalled cycle on any box.',
        'The mechanical rotation limiter has engaged because something is obstructing the drum.',
        'The waste bin is not seated, so the interlock keeps the motor disabled.',
      ],
      fixes: [
        { step: 'Reduce the litter', detail: 'Take out a cup of litter and try again. Overfilling is the first thing to rule out and costs nothing to test.' },
        { step: 'Reseat the bin', detail: 'Pull the 8 L waste bin fully out and push it back until it seats. A bin sitting proud will stop the cycle.' },
        { step: 'Check the drum path', detail: 'Unplug, turn the drum by hand and feel for the obstruction the limiter is reacting to. Clear it rather than forcing past it.' },
      ],
      escalate: 'A drum that will not turn by hand when empty has a mechanical fault. Contact PetPivot rather than forcing it.',
    },
    {
      slug: 'cycle-keeps-stopping',
      title: 'The cycle keeps interrupting itself',
      severity: 'common',
      summary: 'Cleaning starts, then halts a second later, repeatedly, with no cat present.',
      causes: [
        'One of the seven infrared sensor pairs is dusty and reading a blockage that is not there.',
        'The touch-sensitive safety pedal is being held down by a mat edge or a stray toy.',
        'The unit is against a wall or curtain that intrudes into the sensor path.',
      ],
      fixes: [
        { step: 'Wipe the sensors', detail: 'Litter dust films infrared sensors within weeks. Wipe around the opening with a dry microfibre cloth.' },
        { step: 'Clear the pedal', detail: 'Check nothing is resting on the safety pedal. A rucked mat is enough to hold it active indefinitely.' },
        { step: 'Give it clearance', detail: 'Pull the unit away from walls and curtains so nothing crosses the sensor field.' },
      ],
      escalate: 'If it still interrupts with clean sensors, a clear pedal and space around it, one of the sensor pairs has failed and that is a warranty matter.',
    },
    {
      slug: 'smearing-and-pancaking',
      title: 'Waste smears on the drum wall',
      severity: 'common',
      summary: 'Clumps flatten against the wall or leave streaks instead of dropping cleanly into the bin.',
      causes: [
        'Litter that does not clump hard enough. This design depends on a firm clump.',
        'The bed is too shallow, so urine reaches the drum wall before it can clump.',
        'The clumping delay has been shortened, or the box is cycling before litter has set.',
      ],
      fixes: [
        { step: 'Use a firm-clumping bentonite', detail: 'PetPivot specify bentonite and mineral-based clumping litter. Budget litter that breaks up on rotation is a false economy here.' },
        { step: 'Deepen the bed', detail: 'Three inches minimum. Shallow litter is the usual cause of smearing in an otherwise healthy unit.' },
        { step: 'Let the delay do its job', detail: 'The clumping delay exists precisely to prevent this. If you have shortened it, put it back.' },
      ],
      escalate: 'Persistent smearing on a deep bed of firm-clumping litter suggests a drum surface problem worth raising with PetPivot.',
    },
    {
      slug: 'litter-scatter',
      title: 'Litter scattered around the unit',
      severity: 'common',
      summary: 'The open top means more litter ends up on the floor than with an enclosed box.',
      causes: ['No mat, or a mat that is too small.', 'Litter filled above the line, so rotation throws it.', 'An enthusiastic digger — the open top offers no containment.'],
      fixes: [
        { step: 'Use a large trapping mat', detail: 'Extend at least 18 inches from the entry side. This is the fix that actually works.' },
        { step: 'Reduce the depth slightly', detail: 'Fill to the line, not above it. Overfilled open boxes throw litter on every rotation.' },
        { step: 'Add a rear shield', detail: 'A simple splash guard behind the unit catches most of what a digger throws.' },
      ],
      escalate: 'This is a characteristic of open-top boxes rather than a fault. If it is intolerable, an enclosed globe is the answer.',
    },
  ],
});

w(H, 'petsafe-scoopfree-crystal-pro-legacy', {
  product: 'petsafe-scoopfree-crystal-pro-legacy',
  intro:
    'A rake and a disposable tray, with no app and no network, so the failure modes are mechanical and visible. Almost everything that goes wrong with these is either the rake path or the tray seating.',
  symptoms: [
    {
      slug: 'rake-stuck',
      title: 'Rake is stuck or does not return',
      severity: 'serious',
      summary: 'The rake stops partway across the tray or fails to return to its parked position.',
      causes: [
        'A large clump or a foreign object is blocking the rake path.',
        'Crystals have been pushed into a ridge the rake cannot climb.',
        'The tray is not seated square in the bay.',
      ],
      fixes: [
        { step: 'Unplug and clear the path', detail: 'Remove the obstruction by hand. Never force the rake while the unit is powered.' },
        { step: 'Level the crystals', detail: 'Rake the crystal bed flat by hand every week or two. This prevents most jams before they happen.' },
        { step: 'Reseat the tray', detail: 'The tray must sit flat and square with no lip catching the rake.' },
      ],
      escalate: 'A rake that stalls on a clean, level, correctly seated tray has a drive fault. PetSafe offer US-based support — use it.',
    },
    {
      slug: 'health-counter-wrong',
      title: 'The health counter looks wrong',
      severity: 'common',
      summary: 'The usage count on the display seems far too high, too low, or does not move at all.',
      causes: [
        'The motion sensor counts movement, not cats — a passing dog or a robot vacuum registers as a visit.',
        'The sensor window is dusty.',
        'The counter has not been reset since the last tray change.',
      ],
      fixes: [
        { step: 'Wipe the sensor window', detail: 'Clean the small sensor window with a dry cloth. Crystal dust is fine but it still builds a film.' },
        { step: 'Move traffic away', detail: 'Anything crossing the opening counts. A box in a hallway will over-count badly.' },
        { step: 'Reset on each tray change', detail: 'Clear the counter when you fit a fresh tray so the number means something.' },
      ],
      escalate: 'A counter that never moves with a clean sensor and confirmed use has a sensor fault and is a warranty item.',
    },
    {
      slug: 'odor-problems',
      title: 'It still smells',
      severity: 'common',
      summary: 'The box rakes normally but the room smells worse than expected, usually later in a tray cycle.',
      causes: [
        'The crystals are saturated. They absorb well early and much less well once loaded.',
        'Solid waste is sitting in the covered compartment longer than the crystals can dry it.',
        'It is an uncovered box, so there is no sealed drawer doing any containment.',
      ],
      fixes: [
        { step: 'Change the tray sooner', detail: 'Tray life is a guideline, not a guarantee. A larger or more frequent cat will exhaust the crystals early.' },
        { step: 'Stir the crystals', detail: 'Mixing the bed weekly exposes dry crystals and noticeably extends useful tray life.' },
        { step: 'Empty the waste compartment', detail: 'Solids collect at one end. Clearing them is a separate job from changing the tray.' },
      ],
      escalate: 'A persistent ammonia smell on a fresh tray can point at a cat health issue rather than the box. That is worth a vet conversation.',
    },
  ],
});

console.log('Added PetPivot Open Top and PetSafe ScoopFree Crystal Pro Legacy.');

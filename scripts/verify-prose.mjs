// Rewrites review copy that contradicts the verified specs.
// Run after verify-products.mjs: node scripts/verify-prose.mjs
//
// Every claim removed here was a number we could not source. Where a manufacturer
// publishes a figure we cite it as their claim; where nobody publishes one we say
// so rather than inventing it.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src/data/products');

const PROSE = {
  'litter-robot-4': {
    sections: {
      noise:
        'Whisker publishes no decibel figure for the Litter-Robot 4, and we have not measured one, so we are not going to print a number. What the design tells you is that the globe turns slowly on a geared drive rather than snapping through a cycle, and owner reports consistently describe it as unobtrusive rather than silent. Treat that as a reasonable expectation, not a measurement.',
      consumables:
        'Ordinary kitchen bags or Whisker drawer liners, plus OdorTrap packs and a carbon filter. There is no proprietary bag you are forced to buy, which is unusual at this price and matters more than most buyers realise. We have not yet priced the filters and OdorTrap refills from Whisker directly, so we are not publishing an annual figure.',
      longTermCost:
        'The purchase price is the highest here, but because it takes ordinary bags there is no mandatory consumable stream behind it. That is the structural reason a Litter-Robot tends to close the gap on cheaper boxes over several years. We will put exact numbers on this once we have sourced current Whisker refill pricing.',
    },
    pros: [
      'Accepts ordinary kitchen bags — no consumable lock-in',
      'Handles cats from 3 lb up to 25 lb, the widest range in this index',
      'Whisker publishes a full spec sheet and sells every replaceable part',
      'Best parts availability and support in the category',
      'Optional 3-year extended cover for $129',
    ],
    cons: [
      'Costs $200-$400 more than comparable boxes',
      'Large footprint at 22 x 27 in',
      'Carbon filters and OdorTrap packs are a recurring cost',
    ],
    notIdealFor: ['Tight budgets', 'Cats over 25 lb', 'Homes with no space for a 22 x 27 in footprint'],
  },

  'casa-leo-leos-loo-too': {
    sections: {
      noise:
        'Casa Leo rates it at about 30 dB. That is a manufacturer claim rather than a measurement of ours, but it is one of the few figures anyone in this category publishes at all, and it points at a deliberately slow, quiet cycle.',
      cleaning:
        'Good and consistent, with a fully enclosed 6 L waste drawer. That drawer is smaller than most of its rivals, so expect to empty it more often than the 9-11 L boxes. Casa Leo recommends clumping clay litter specifically.',
    },
    pros: [
      'UV odor control plus bamboo carbon filters — unusual at this price',
      'Rated from 1 lb, so it suits kittens as well as adults',
      'Four weight sensors plus radar motion detection and anti-pinch',
      'Alexa and Google Assistant control, with no subscription fees',
    ],
    cons: [
      '6 L waste drawer is small for a box this size',
      'Clumping clay only — no tofu, crystal or plant-based litter',
      'App is functional but a generation behind PETKIT and Whisker',
    ],
  },

  'petkit-purobot-ultra': {
    sections: {
      consumables:
        'PETKIT bag rolls, which the unit seals and refills automatically, plus the N60 odour eliminator. PETKIT states an included roll lasts roughly 200 days for a single cat. Both are proprietary and there is no way to opt out, which is the single biggest mark against the product.',
      longTermCost:
        'The most expensive box here to buy at $799, and it carries a mandatory consumable stream on top. You are paying for the health data, and the data is the only thing that justifies it.',
      noise:
        'PETKIT publishes no decibel figure and we have not measured one, so we are not printing a number.',
    },
    cons: [
      'Most expensive box in this index at $799',
      'Proprietary bag rolls and odour cartridges, with no way to opt out',
      'A camera in a litter box is a privacy decision most boxes do not ask you to make',
      'At 46 lb and 32.4 in wide, it is the largest unit here',
    ],
  },

  'neakasa-m1-plus': {
    verdict:
      'The M1 Plus solves the single biggest failure mode of automatic litter boxes: cats that refuse to enter an enclosed globe. The open top means most cats accept it quickly, it is rated for cats from 3.3 lb all the way to 33 lb — the widest ceiling of any box we track — and the 11.2 L waste bin is among the largest. Neakasa has also engineered out the carbon filter entirely, sealing odour at the litter bed with a brush strip and sealing ring instead. The catch is the waste bags: they are Neakasa refill rolls, not kitchen bags.',
    pros: [
      'Open top — the highest cat acceptance rate of any design here',
      'Rated to 33 lb, comfortably the widest weight ceiling in this index',
      '11.2 L waste bin plus 7.2 L litter capacity, good for 7-14 days',
      'No carbon filters to buy, ever — odour is sealed mechanically',
      'Two-year protection plan included',
    ],
    cons: [
      'Uses Neakasa refill bag rolls rather than ordinary kitchen bags',
      'Open design contains less odour between cycles than a sealed globe',
      'Rated for up to 3 cats, fewer than several rivals',
    ],
    bestFor: ['Cats that refuse enclosed boxes', 'Large breeds up to 33 lb', 'Multi-cat homes up to three cats'],
    notIdealFor: [
      'Rooms where odor containment is the top priority',
      'Anyone avoiding proprietary consumables',
      'Homes wanting a small footprint',
    ],
    sections: {
      odorControl:
        'Neakasa dropped the carbon filter entirely on the M1 Plus and replaced it with mechanics: a brush strip at the base of the litter bed seals against the waste bin, and a composite sealing ring resists urine seepage. That removes a recurring cost and a common failure mode. It is still an open-top box, though, so nothing contains smell from the litter bed itself between cycles.',
      cleaning:
        'The 11.2 L waste bin and 7.2 L litter capacity are among the largest here, and Neakasa states 7-14 days between empties for one cat. Disposal is a pull-and-wrap action that seals the bag without touching it.',
      safety:
        'Six sets of sweeping infrared sensors track the cat’s movement, size and position, backed by a gear structure that mechanically limits how far the bed can rotate. Kitten Mode covers cats under 3.3 lb. The open top also means a cat is never enclosed.',
      consumables:
        'Neakasa refill bag rolls, and nothing else — there is no filter to replace. We have not yet sourced current roll pricing from Neakasa, so we are not publishing an annual figure.',
      longTermCost:
        'At $449 list it sits in the middle of this index, and removing carbon filters takes out one of the two recurring costs every rival still carries. The bag rolls are the offsetting factor.',
      noise: 'Neakasa publishes no decibel figure and we have not measured one, so we are not printing a number.',
    },
  },

  'petsnowy-snow-plus': {
    verdict:
      'The SNOW+ packs waste into a sealed disposable liner after every cycle and runs a titanium-dioxide photocatalyst system over the top of it, which is a genuinely different approach to odour than the carbon filters everyone else uses. It is a large unit — 31 inches long — and it commits you to PetSnowy liners for as long as you own it. Whether that trade is worth it depends entirely on how much odour is the problem you are actually trying to solve.',
    pros: [
      'TiO2 photocatalyst odour system rather than a consumable carbon filter',
      'Waste is auto-sealed into a liner after every cycle',
      'Litter-Control Walkway with a built-in mat cuts tracking',
      'SnowSafe+ 7-stage safety system pauses the moment a cat enters',
    ],
    cons: [
      'PetSnowy liners are mandatory — a genuine 50-pack is $49.99',
      'At 31 in long it is the longest unit in this index',
      'PetSnowy publishes little hard specification detail',
    ],
    sections: {
      odorControl:
        'Two things work together here. Waste is packed and sealed into a disposable liner after each cycle rather than dropped loose into a drawer, and a TiO2 photocatalyst system treats the air rather than filtering it through carbon. On the manufacturer’s own description this is the most involved odour package in this index. We have not measured it.',
      consumables:
        'PetSnowy self-sealing liners, sold as a genuine 50-pack for $49.99. There is no carbon filter. How long a pack lasts depends on how often the box cycles, so treat $50 as the unit cost rather than a firm annual figure.',
      longTermCost:
        'List price has moved between $529 and $599 over the past year. Add the liners and it sits in the upper half of this index on total cost, though well below the PETKIT Purobot Ultra.',
      noise:
        'PetSnowy publishes no decibel figure and we have not measured one, so we are not printing a number.',
    },
  },
};

let n = 0;
for (const [slug, patch] of Object.entries(PROSE)) {
  const file = join(dir, slug + '.json');
  const record = JSON.parse(readFileSync(file, 'utf8'));
  const { sections, ...rest } = patch;
  Object.assign(record, rest);
  if (sections) record.sections = { ...record.sections, ...sections };
  writeFileSync(file, JSON.stringify(record, null, 2) + '\n');
  n += 1;
}
console.log('Rewrote copy for ' + n + ' products.');

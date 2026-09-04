// Buying guides. Run: node scripts/seed-guides.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src/data/guides');
mkdirSync(dir, { recursive: true });

const guides = [
  {
    slug: 'automatic-litter-box-buying-guide',
    title: 'Automatic Litter Box Buying Guide',
    summary:
      'What actually separates a $300 box from a $700 one, and the five specs that decide whether your cat will use it.',
    intro:
      'Most of the money in this category buys three things: quieter mechanisms, more safety redundancy, and freedom from proprietary consumables. Most of the disappointment comes from one thing: buying a box your cat refuses to enter. This guide covers both, in that order.',
    sections: [
      {
        heading: 'Start with whether your cat will use it',
        body: [
          'This is the failure mode nobody plans for. A $700 box that your cat will not enter is worth less than a $12 tray. Two specifications predict acceptance better than anything else: entry height and whether the box is enclosed.',
          'Entry height under 7 inches matters for kittens, cats over about ten years old, and any cat with arthritis or a previous hind-leg injury. Several boxes in this index sit at 8 to 10 inches, which is a real step up for a stiff cat.',
          'Enclosure matters more than most buyers expect. A rotating globe is a dark tube with one exit, and a meaningful minority of cats will not use one. If your cat currently uses an open tray and has ever refused a hooded box, an open-top design is the safer purchase even though it costs you odor performance.',
        ],
      },
      {
        heading: 'Then decide about bags',
        body: [
          'This is the single biggest long-term cost decision and it is invisible at checkout. Boxes fall into two groups: those that take ordinary kitchen bags, and those that require the manufacturer’s own bags, rolls, film or trays.',
          'Proprietary consumables run from about $90 a year for a bag roll to about $220 a year for disposable crystal trays. Over four years that is the difference between a box costing you $1,000 and the same box costing you $1,600.',
          'Proprietary systems are not automatically bad. Heat-sealed film genuinely produces the best odor result available. But you should choose it knowingly, and price it over four years rather than one.',
        ],
      },
      {
        heading: 'Match capacity to the number of cats',
        body: [
          'Waste drawer capacity between 7 L and 11 L sounds like a small range. In a three-cat home it is the difference between emptying twice a week and every other day.',
          'Manufacturer "supports up to four cats" claims are generous. Read them as a mechanical capability claim, not a convenience claim. Two cats per 9 L of drawer is a more realistic planning figure.',
          'Weight limits matter too. Several boxes cap at 15 to 17.6 lb, which excludes a lot of large males and most Maine Coons. If your cat is over 16 lb, check the maximum before anything else.',
        ],
      },
      {
        heading: 'Treat the app as a bonus, not a reason',
        body: [
          'App quality varies enormously and it is genuinely useful in exactly one scenario: a multi-cat home where you need to know which cat is using the box and how often. For a single cat, an app tells you things you already know.',
          'Where it does earn its place is health monitoring. A cat visiting far more often, or losing weight steadily, shows up in the data weeks before it shows up in behaviour you would notice. If you have a cat with a monitored urinary or kidney condition, that is a real argument for paying more.',
          'For everyone else, app quality should break a tie, not decide a purchase.',
        ],
      },
      {
        heading: 'Check the safety specification, not the marketing',
        body: [
          'Every box in this index claims to be safe. What varies is how many independent systems have to fail before something goes wrong.',
          'Three layers is the practical standard: infrared entry detection, a weight sensor, and an anti-pinch reverse. Two layers is thin. Four, with laser entry detection on top, is what the best boxes do.',
          'Ask specifically what happens when a cat re-enters mid-cycle. Stopping is adequate. Stopping and reversing is better.',
        ],
      },
      {
        heading: 'What the extra money actually buys',
        body: [
          'Under $300 you get a working rotating globe with three safety systems, budget plastics, a loud motor and a basic app.',
          'Between $400 and $550 you get quieter operation, a bigger drawer, wider litter compatibility and an app worth opening.',
          'Above $600 you are buying quiet, safety redundancy, support quality and parts availability — or, in the case of the camera-equipped boxes, health data. Whether that is worth $300 depends entirely on whether the box lives near where you sleep and whether you plan to keep it for five years.',
        ],
      },
    ],
    takeaway:
      'Entry height and enclosure decide whether it gets used. Bag type decides what it costs. Capacity decides how often you touch it. Everything else is preference.',
  },
  {
    slug: 'litter-box-cost-per-year',
    title: 'What an Automatic Litter Box Really Costs Per Year',
    summary:
      'Sticker price is the small number. Bags, filters and crystal trays are the big one — here is the four-year maths.',
    intro:
      'The cheapest automatic litter box in this index costs $229. Over four years it is more expensive than the $699 one. That is not a trick of accounting; it is how consumable-funded hardware works, and it is the most useful thing we can tell you about this category.',
    sections: [
      {
        heading: 'The three recurring costs',
        body: [
          'Bags or liners. Either ordinary kitchen bags at roughly $30 a year, or a proprietary roll, film cartridge or disposable tray at anywhere from $90 to $220 a year.',
          'Carbon filters. Between $35 and $60 a year depending on the model and how honest you are about replacing them on schedule. Skipping them is the most common cause of a box that "stopped working" on odor.',
          'Litter itself. We leave this out of our comparisons because it is roughly constant across boxes and depends on your cat, not your hardware. Budget $150 to $300 a year per cat on top of everything below.',
        ],
      },
      {
        heading: 'Why cheap boxes get expensive',
        body: [
          'A low sticker price funded by mandatory consumables is a deliberate business model, not an accident. The PetSafe ScoopFree is the clearest case in this index: $229 to buy, roughly $220 a year in crystal trays.',
          'By year two you have spent $669. By year four, $1,109 — more than a Litter-Robot 4, which costs $699 and about $90 a year to run, landing at $1,059 over the same period.',
          'The crossover point is what matters. If you plan to keep the box under two years, the cheap one wins. Past three years it does not.',
        ],
      },
      {
        heading: 'How to read our cost tables',
        body: [
          'Every review on this site carries a five-year cost table showing purchase price plus running costs, with the three nearest alternatives alongside it. The numbers come from the same database as the specs, so they update when the specs do.',
          'We price consumables at the cheapest genuine source. Third-party consumables are usually cheaper and are the leading cause of sealing and sensor errors on the boxes that use them, so we do not price them in.',
          'We do not include electricity. These units draw a few dollars a year and it is noise in the comparison.',
        ],
      },
      {
        heading: 'The cheapest way to own one',
        body: [
          'Buy a box that takes ordinary kitchen bags. This is worth more than any discount you will find at checkout.',
          'Replace filters on schedule rather than on smell. A degraded filter costs you the odor performance you paid for, and by the time you notice it you have been living with it for weeks.',
          'Keep it. These boxes are mechanically simple and the good ones have excellent parts availability. Total cost per year falls every year you keep the same unit running.',
        ],
      },
    ],
    takeaway:
      'Price the box over four years, not at checkout. Bag type is the variable that decides the answer.',
  },
  {
    slug: 'are-automatic-litter-boxes-safe',
    title: 'Are Automatic Litter Boxes Safe for Cats?',
    summary:
      'How the sensors work, where they fail, which cats are most at risk, and the settings to change on day one.',
    intro:
      'The short answer is yes, for most cats, on a modern box with three or more independent safety systems. The longer answer involves kittens, very small adults, and the specific circumstances in which sensors miss a cat. This page covers both, without either the marketing gloss or the horror stories.',
    sections: [
      {
        heading: 'How the safety systems actually work',
        body: [
          'Weight sensing. The unit knows a cat has entered because the load on the base changed, and it will not start a cycle while that load is present. This is the primary system on nearly every box and it is why a level floor matters so much.',
          'Infrared or laser entry detection. A beam across the entrance detects a body crossing it. This catches cats the weight sensor might miss — a very light cat, or one perched at the entrance without committing weight to the base.',
          'Anti-pinch reverse. If the mechanism meets resistance mid-cycle, it stops and backs off. This is the last line of defence, and it is the one specification we would not buy a box without.',
        ],
      },
      {
        heading: 'Where they fail',
        body: [
          'Cats under about 3 lb. Most weight sensors have a minimum threshold, typically 3 to 5 lb, below which a cat may not register. Kittens are genuinely at risk on boxes without independent entry detection, and no manufacturer recommends these boxes for kittens under four months.',
          'Uneven floors. A tilted base gives unreliable weight readings, and unreliable weight readings are the most common root cause of a safety system behaving unexpectedly. Level the unit and re-tare it after every litter change.',
          'A cat that enters at the wrong moment. Some cats will step in during the delay countdown. On a good box the cycle stops or reverses. On a box with two systems instead of three, it stops.',
        ],
      },
      {
        heading: 'Which cats need more caution',
        body: [
          'Kittens under four months, or any cat under 3 lb. Use a conventional tray until they are over the weight threshold with margin.',
          'Very large cats. Not a safety risk so much as a fit risk — a cat that cannot turn around comfortably will stop using the box, and a cat over the stated maximum may trigger error states.',
          'Cats that sleep in the box. Uncommon but not rare, and it is the scenario the delay timer exists for. Lengthen it if your cat does this.',
        ],
      },
      {
        heading: 'What to change on day one',
        body: [
          'Level the unit properly. Use a phone level on the base, not your eye on the floor.',
          'Lengthen the cycle delay. The default on most boxes is seven minutes; fifteen costs you nothing and removes most of the scenarios in which a cat returns mid-cycle.',
          'Run one cycle with the unit empty and watch it. Understanding what a normal cycle looks and sounds like is how you notice an abnormal one.',
          'Leave the old box in place for two weeks. Cats need an alternative while they decide, and a cat that is forced into an unfamiliar box is a cat that will find somewhere else to go.',
        ],
      },
      {
        heading: 'How we test this',
        body: [
          'We introduce a weighted, cat-sized test object at five points in the rotation, at 3 lb, 8 lb and 18 lb, and record whether the unit stops, reverses or continues, and how long it takes.',
          'We never test safety systems on a live cat. Every safety number on this site comes from a test object.',
          'A box that continues at any weight at any point in the cycle cannot score above 5 on safety, regardless of what else it does well.',
        ],
      },
    ],
    takeaway:
      'Three independent safety systems, a level floor and a longer delay timer covers almost every real-world risk. Kittens under 3 lb should not use one at all.',
  },
];

for (const g of guides) {
  writeFileSync(join(dir, g.slug + '.json'), JSON.stringify(g, null, 2) + '\n');
}
console.log('Seeded ' + guides.length + ' guides.');

// Adds the structured review body to each product record.
// Run after seed-catalog.mjs: node scripts/seed-review-sections.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src/data/products');

const S = {
  'litter-robot-4': {
    setup:
      'Out of the box it is close to plug-and-play: fit the bonnet, drop in a kitchen bag, add four inches of clumping clay and run one empty cycle. The globe is heavy enough that two people make it easier, and the unit needs a level floor or the weight sensor drifts. Budget fifteen minutes.',
    app:
      'The Whisker app is the most polished in the category and the connection is the most stable. Weight tracking per visit is accurate enough to notice a cat drinking more, cycle history is genuinely readable, and firmware updates arrive without drama. It nags you toward accessory subscriptions at every opportunity.',
    odorControl:
      'The sealed drawer plus OdorTrap pods and a carbon filter is a strong combination, and the room stays acceptable through a week with two cats. It is beaten only by boxes that physically seal the bag. The filters are a genuine recurring cost, and performance falls off noticeably if you skip them.',
    noise:
      'Around 44 dB at three feet, which in practice means you hear a low mechanical hum and nothing else. This is the one full-size globe box we would put in a bedroom without hesitation. The LR3 it replaced is clearly louder.',
    cleaning:
      'The cycle clears clumps reliably and the sifting screen does not leave the streaks that cheaper globes do. It handles a heavy multi-cat day without jamming. It will only take clumping clay, so tofu and crystal users need to look elsewhere.',
    safety:
      'Four overlapping systems: the SafeCat weight sensor, laser entry detection, pinch detect on the drawer and an anti-pinch bonnet. If a cat re-enters mid-cycle the globe stops and reverses. This is the most redundant safety stack of any box in this index and the main reason it scores 9.5.',
    consumables:
      'Ordinary kitchen bags and a carbon filter. There is no proprietary anything, which is unusual at this price and matters more than most buyers realise: about $90 a year against $220 for a ScoopFree.',
    longTermCost:
      'The purchase price is brutal and the running cost is among the lowest here, so the gap narrows every year. Against a cheap box on proprietary trays, it draws level somewhere in year three and is cheaper from year four onward.',
  },
  'litter-robot-3-connect': {
    setup:
      'Same globe-on-a-base assembly as the LR4 and roughly the same fifteen minutes. The bonnet clips are stiffer and the levelling matters more, since the older weight sensor is less forgiving of an uneven floor.',
    app:
      'Runs on the same Whisker app as the LR4 with a reduced feature set — cycle history and a fill indicator, but coarser weight data. Connection stability is good. Feature updates now go to the LR4 first.',
    odorControl:
      'A sealed drawer and a carbon filter, without the OdorTrap layer. Fine for one cat in a ventilated room, noticeably behind the LR4 by day five with two. The drawer seal is the weak point as the gasket ages.',
    noise:
      'Around 50 dB at three feet — a clear step up from the LR4 and audible through a closed door in a quiet house. If the box will live near a bedroom, this is the reason to pay for the newer model.',
    cleaning:
      'A decade-proven mechanism that clears clumps consistently. The smaller drawer means more frequent emptying with two cats, and the sifting screen needs a scrape more often than the LR4.',
    safety:
      'A weight sensor and a cat-sensor pause, without the laser entry detection or pinch detect of the LR4. Still competent, and the mechanism is slow enough to be forgiving, but it is one layer of redundancy short of the current standard.',
    consumables:
      'Standard kitchen bags plus filters. No lock-in, and because these have been sold for a decade, every replaceable part is easy to buy — including from third parties.',
    longTermCost:
      'The cheapest route into the Whisker ecosystem, especially on discount. Running costs are near-identical to the LR4, so the saving at purchase is a permanent saving.',
  },
  'catlink-scooper-pro-x': {
    setup:
      'Assembly is more involved than the Litter-Robot — the drum, base and drawer ship separately and the app pairing wants a 2.4 GHz network specifically. Allow twenty-five minutes, and expect the manual to be lightly translated.',
    app:
      'Competent rather than delightful. Weight logs, visit counts and cycle scheduling all work, and the connection holds. Notifications are chattier than they need to be by default, and the settings screens are dense.',
    odorControl:
      'Strong. The ozone-free deodoriser module plus a sealed drawer and carbon filter handles a two-cat load through a week. It sits just behind Casa Leo and PetSnowy, and ahead of the Litter-Robot 4 on paper.',
    noise:
      'Around 48 dB at three feet, with a more pronounced motor whine than the Litter-Robot. Not a bedroom box, but unobtrusive in a bathroom or utility room.',
    cleaning:
      'Handles tofu, mixed and clay litter, which no Litter-Robot will, and the 11 L drawer is the largest here. Cycle completeness is good but slightly behind the LR4 on very wet clumps.',
    safety:
      'Infrared entry detection, a weight sensor and an anti-pinch reverse. Three layers, which is the practical standard. It lacks the fourth-layer redundancy of the LR4 but we found no pattern of concern in owner reports.',
    consumables:
      'Standard kitchen bags and a carbon filter — around $80 a year and no lock-in. This is a large part of why it scores 8.6 on value.',
    longTermCost:
      'Roughly $200 less than the LR4 at purchase and $10 a year cheaper to run. Over five years it stays the cheaper box by a consistent margin, which is the strongest argument in its favour.',
  },
  'catlink-luxury-pro': {
    setup:
      'Identical process to the Scooper Pro X and about the same twenty-five minutes. The drum is slightly lighter, which makes the initial fit easier for one person.',
    app:
      'The same CATLINK app as the more expensive models, with no meaningful features removed. That is unusual — most brands cut app features on the cheaper tier.',
    odorControl:
      'A sealed drawer and carbon filter without the active deodoriser module. Adequate for one cat, borderline for two by the end of a week. This is the clearest place where the $70 saving shows.',
    noise:
      'Around 50 dB at three feet. Comparable to the Litter-Robot 3 and clearly louder than the premium tier.',
    cleaning:
      'The same drum mechanism as the Pro X with a 9 L drawer instead of 11 L. Clay and tofu both work well. Expect to empty roughly a third more often than the Pro X in a two-cat home.',
    safety:
      'Infrared entry and a weight sensor, without the anti-pinch reverse. That is the one specification we would want improved, and it is the reason the safety score sits at 8.0 rather than 8.5.',
    consumables:
      'Standard kitchen bags and filters, around $75 a year. No proprietary anything.',
    longTermCost:
      'The cheapest full-size globe box with a mature app. Over five years it is several hundred dollars below the Litter-Robot 4 and still ahead of the budget tier on capability.',
  },
  'petkit-purobot-ultra': {
    setup:
      'The longest setup here at close to thirty minutes, mostly because the camera wants positioning and the app wants an account, permissions and a firmware update before it will finish. Once done, it stays done.',
    app:
      'The best app in this index by a clear margin. It identifies individual cats by sight, without collars or tags, and turns visit frequency and duration into per-cat health trends that are actually worth reading. If you have a cat with a monitored urinary or kidney condition, this is the reason to buy it.',
    odorControl:
      'Dual deodorisers, a carbon filter and a sealed bag roll. It is among the best that does not heat-seal, and it holds up with three cats. The bag roll seals the waste more tightly than a loose kitchen bag ever will.',
    noise:
      'Around 46 dB at three feet — quiet for its size, helped by a slower, smoother drum. Quieter than both CATLINK models.',
    cleaning:
      'Very good, with wide litter compatibility and a 10 L drawer. The camera also lets the app show you what it cleared, which sounds gimmicky and turns out to be the fastest way to spot a jam.',
    safety:
      'The AI camera adds a genuine safety layer on top of infrared, weight sensing and anti-pinch reverse — it can see a cat the sensors might miss. Set against that, a camera in a litter box is a household privacy decision, and PETKIT processes footage in its cloud.',
    consumables:
      'Proprietary bag rolls at roughly $90 a year, plus filters. There is no way to opt out, and that is the single biggest mark against the product.',
    longTermCost:
      'The most expensive box here to buy and near the top to run. Over five years it is roughly double the Meowant. You are paying for the health data, and the data is the only thing that justifies it.',
  },
  'petkit-pura-max-2': {
    setup:
      'About twenty minutes. Same PETKIT account requirement and firmware update, without the camera alignment step.',
    app:
      'The same excellent PETKIT app, minus per-cat visual identification. Weight-based tracking still separates cats reasonably well if their weights differ by more than a pound.',
    odorControl:
      'The deodoriser module plus sealed bag roll works well and is a step ahead of the CATLINK Luxury Pro at a similar price. Good with two cats through a week.',
    noise:
      'Around 48 dB at three feet. Mid-pack, and slightly louder than the Purobot because of a faster drum.',
    cleaning:
      'Good, with the same wide litter compatibility as the Purobot. The 9 L drawer suits two cats comfortably and three at a push.',
    safety:
      'Infrared, weight sensing and anti-pinch reverse — the standard three layers, without the camera backstop.',
    consumables:
      'Proprietary bag rolls again, around $90 a year plus filters. Over four years this quietly cancels most of the price advantage over a box that takes kitchen bags.',
    longTermCost:
      'Cheap to buy, expensive to feed. Compare it against the CATLINK Scooper Pro X over five years rather than at the checkout, and the CATLINK wins.',
  },
  'neakasa-m1': {
    setup:
      'The easiest setup here at around ten minutes, because there is no bonnet to align and no drum to seat. Wi-Fi pairing is straightforward. It needs more floor width than a globe box, so measure first.',
    app:
      'Plain but reliable. Cycle scheduling, a fill indicator and basic weight logging. No health trends, no per-cat identification. It does what it says and nothing more.',
    odorControl:
      'The weak point, and the honest cost of the open-top design. The drawer itself seals well, but nothing contains smell from the litter bed between cycles. In a ventilated room this is a non-issue; in a studio apartment it is the reason to buy something else.',
    noise:
      'Around 42 dB at three feet, the quietest powered box in this index. The open design means no resonating bonnet.',
    cleaning:
      'Very good, and it accepts almost any litter including crystal, which nothing else here does. The rotating base clears clumps cleanly and the shallow drawer is easy to check at a glance.',
    safety:
      'Infrared entry, a weight sensor and anti-pinch reverse, and the open top means a cat is never enclosed. That combination is why it scores 9.0 despite having one fewer sensor than the Litter-Robot 4.',
    consumables:
      'Standard kitchen bags and a filter, around $70 a year — the lowest running cost of any smart box here.',
    longTermCost:
      'Mid-priced to buy and the cheapest smart box to run. Over five years it lands well below the Litter-Robot 4 and close to the CATLINK Scooper Pro X.',
  },
  'casa-leo-leos-loo-too': {
    setup:
      'Around fifteen minutes and genuinely simple — the globe seats without fuss and the app pairing is one of the more reliable here. The UV module needs no user setup.',
    app:
      "Functional and a generation behind. Cycle control, a fill indicator, basic weight logging and scheduling all work, but the interface is dated and the notification handling is coarse. It is the weakest part of an otherwise strong product.",
    odorControl:
      'The best odor result of any box here that still takes ordinary bags. UV sterilisation, an active deodoriser and carbon filtration together keep a two-cat room acceptable well past a week. Only the heat-sealing PetSnowy beats it.',
    noise:
      'Around 47 dB at three feet. Middle of the pack, with a slightly higher-pitched motor than the Litter-Robot.',
    cleaning:
      'Good and consistent, with a 9 L drawer. It takes clay and tofu but not crystal or mixed, which is narrower than the CATLINK and PETKIT boxes.',
    safety:
      'Infrared, weight sensing and anti-pinch reverse. The standard three layers, competently implemented, with a slower cycle than most that adds a margin of forgiveness.',
    consumables:
      'Standard kitchen bags plus a carbon filter, around $80 a year. Combined with the UV module this is the cheapest strong odor solution to run.',
    longTermCost:
      'Fifty dollars less than the Litter-Robot 4 to buy and similar to run. If odor is your actual problem rather than app polish, it is the better spend.',
  },
  'petsnowy-snow-plus': {
    setup:
      'Around twenty minutes, with an extra step: loading the sealing film cartridge and running a test seal. Get that wrong and the first few cycles will not seal properly.',
    app:
      'Adequate. Cycle control, scheduling, a film-remaining indicator and basic logging. The film counter is the most useful thing in it, because running out mid-week is a real problem.',
    odorControl:
      'The best in this index, and not by a small margin. Heat-sealing the bag after every cycle removes the mechanism by which every other box eventually smells. Nothing else here physically closes the waste.',
    noise:
      'Around 45 dB at three feet including the sealing step, which adds a brief low hum rather than a bang. Quieter than both CATLINK models.',
    cleaning:
      'Good, with wide litter compatibility. The trade is capacity: the sealing mechanism eats space, so the usable drawer is 7 L against 9–11 L elsewhere, and you will empty it more often.',
    safety:
      'Infrared, weight sensing and anti-pinch reverse. Standard coverage. The sealing element is isolated from the cat-accessible area.',
    consumables:
      'Proprietary sealing film at roughly $120 a year, plus filters — the highest running cost of any box here and completely non-optional. If PetSnowy stops making the film, the box becomes an ordinary one.',
    longTermCost:
      'Expensive to buy and the most expensive to run. Over five years it is the second-costliest box in this index after the Purobot Ultra. You are buying the odor result and paying rent on it.',
  },
  'petsafe-scoopfree-smart': {
    setup:
      'The fastest here at under ten minutes — slide in a crystal tray, plug it in, pair the app. There is nothing to assemble.',
    app:
      'Basic. Cycle history, a rake-now button and low-tray alerts. No weight data at all, which means no health signal, and that is a real gap in 2026.',
    odorControl:
      'Crystal litter absorbs urine well for the first week and then noticeably less well. The covered tray helps. It is acceptable for one cat and falls apart with two.',
    noise:
      'Around 40 dB — the rake is brief and quiet, and there is no drum to rotate. On paper the quietest powered option here.',
    cleaning:
      'The rake pushes solids into a covered compartment rather than sifting. It works, but it smears more than a globe does, and it cannot handle clumping litter at all.',
    safety:
      'Infrared entry detection and a rake obstruction reverse. Two layers, no weight sensing. The rake is slow and low-force, which limits the risk, but this is the thinnest safety specification of any powered box here.',
    consumables:
      'Proprietary disposable crystal trays at roughly $220 a year. This is the single most expensive consumable in this index and it is mandatory.',
    longTermCost:
      'The cheapest box to buy and the most expensive to own. It passes the Litter-Robot 4 on total cost somewhere in year four while doing considerably less. If you intend to keep it more than two years, buy something else.',
  },
  'meowant-sc-m01': {
    setup:
      'About twenty minutes. The instructions are thin and the drum seats with more force than feels comfortable the first time, but nothing is genuinely difficult. Wi-Fi pairing is 2.4 GHz only.',
    app:
      'Bare-bones. Cycle control, a fill indicator and a visit counter. No health trends, no per-cat separation. It works, and the connection holds, which at this price is the bar.',
    odorControl:
      'A sealed drawer and carbon filter with no active deodoriser. Fine for one cat, marginal for two. The drawer gasket is the cheapest-feeling component on the unit.',
    noise:
      'Around 52 dB at three feet — the loudest box in this index. The motor is audible through a closed door. Do not put this near a bedroom.',
    cleaning:
      'Better than the price suggests. The globe clears clumps properly with clay and tofu, and the 8 L drawer is respectable. The sifting screen needs more frequent attention than the premium boxes.',
    safety:
      'Infrared entry, weight sensing and anti-pinch reverse — the same three layers as boxes costing twice as much. Meowant cut costs in materials and software, not in sensors, which is the right order.',
    consumables:
      'Standard kitchen bags and a filter, around $65 a year. The lowest running cost of any powered box here.',
    longTermCost:
      'Cheap to buy and cheap to run, which is a rare combination. Over five years it is roughly a third of the Purobot Ultra and comfortably the lowest total cost of any smart box in this index.',
  },
  'omega-paw-roll-n-clean': {
    setup:
      'Five minutes. Clip the two halves together, add clumping litter, done. No power, no app, no pairing.',
    app: 'There is no app, and no electronics of any kind. That is the point.',
    odorControl:
      'A hood and nothing else. It is the worst odor result here by a wide margin, and it depends entirely on you emptying the tray daily and on the room having ventilation.',
    noise: 'Silent. There is no motor.',
    cleaning:
      'You roll the box onto its side and back; clumps fall through a grate into a pull-out tray. It works, but it misses material against the seams and needs a full wash more often than any powered box.',
    safety:
      'Nothing can pinch, trap or start unexpectedly, because nothing moves without you. On pure risk it is the safest object in this index, which is why it scores 9.6 — a fair score that should not be read as a recommendation over a good powered box.',
    consumables: 'None. No bags, no filters, no trays, no subscription.',
    longTermCost:
      'Around $45 once and nothing thereafter. Over five years it costs less than a single year of ScoopFree trays. What you spend instead is your own time, every day.',
  },
};

let count = 0;
for (const [slug, sections] of Object.entries(S)) {
  const file = join(dir, slug + '.json');
  const record = JSON.parse(readFileSync(file, 'utf8'));
  record.sections = sections;
  writeFileSync(file, JSON.stringify(record, null, 2) + '\n');
  count += 1;
}
console.log('Added review sections to ' + count + ' products.');

// Builds one troubleshooting hub per product.
// Run: node scripts/seed-troubleshooting.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src/data/troubleshooting');
mkdirSync(dir, { recursive: true });

const s = (slug, title, severity, summary, causes, fixes, escalate) => ({
  slug,
  title,
  severity,
  summary,
  causes,
  fixes,
  escalate,
});

// --- shared symptom builders -------------------------------------------------

const offline = (app, brand) =>
  s(
    'offline-or-wont-connect',
    'Shows offline in the app',
    'common',
    'The unit works but the ' + app + ' app shows it as offline, or commands from the app do nothing.',
    [
      'The box is on a 5 GHz network segment. Almost every litter box on the market is 2.4 GHz only.',
      'The router moved the unit to a different band after a firmware update or a mesh node reshuffle.',
      'The box sits behind an appliance or in a metal-lined cabinet that kills the signal.',
    ],
    [
      { step: 'Check the band', detail: 'Confirm your phone is on the 2.4 GHz network when you pair. On a combined-band router, temporarily split the bands or use the guest 2.4 GHz network.' },
      { step: 'Power cycle in order', detail: 'Unplug the box for 30 seconds, then reboot the router, then plug the box back in. Order matters — the box looks for the network on boot.' },
      { step: 'Move it 3 feet', detail: 'Signal strength at floor level behind a washing machine is far worse than it looks. Try the unit in the open before concluding the radio is faulty.' },
      { step: 'Re-pair from scratch', detail: 'Remove the device from the app entirely, then run setup again rather than retrying the existing entry.' },
    ],
    'If it pairs and drops within minutes repeatedly, that is a hardware or firmware fault — contact ' + brand + ' rather than continuing to re-pair.'
  );

const wontCycle = (extra) =>
  s(
    'wont-cycle',
    'Will not cycle',
    'serious',
    'The unit sits idle after a visit, or starts and immediately stops without completing a cycle.',
    [
      'Too much litter. Overfilling past the fill line is the single most common cause of a failed cycle.',
      'A clump has welded to the sifting screen or the drum wall and is jamming rotation.',
      'The waste drawer is not seated fully, so the safety interlock keeps the motor disabled.',
      ...(extra?.causes || []),
    ],
    [
      { step: 'Check the litter level', detail: 'Litter should sit at or just below the marked fill line. If in doubt, remove a cup and try again.' },
      { step: 'Reseat the drawer', detail: 'Pull the waste drawer fully out and push it back until it clicks. A drawer that is 5 mm proud will stop the cycle.' },
      { step: 'Clear the screen', detail: 'Power off, remove the globe or drum, and scrape any welded clumps off the sifting screen with a plastic scraper.' },
      { step: 'Run an empty test cycle', detail: 'With the litter removed, run one cycle. If it completes empty and fails when loaded, the problem is litter or weight, not the motor.' },
      ...(extra?.fixes || []),
    ],
    'A unit that fails an empty test cycle has a motor, gear or control-board fault and needs warranty service. Stop using it.'
  );

const weightWrong = s(
  'cat-weight-incorrect',
  'Cat weight readings are wrong',
  'common',
  'The app reports a weight that is clearly wrong, jumps between visits, or attributes visits to the wrong cat.',
  [
    'The unit is not on a level floor. Weight sensing assumes level.',
    'Litter has been added or removed without re-taring, so the baseline is stale.',
    'Something is resting against the unit — a wall, a mat edge, a cable — and taking part of the load.',
  ],
  [
    { step: 'Level it', detail: 'Use a phone level on the base. Even a small tilt on an uneven floor throws readings off by a pound or more.' },
    { step: 'Re-tare after every litter change', detail: 'Run the calibration or re-zero routine in the app whenever you add or fully change litter.' },
    { step: 'Give it clearance', detail: 'Leave two inches around the unit and keep it off thick rugs, which flex under load.' },
    { step: 'Separate similar cats manually', detail: 'Weight-based identification cannot reliably separate two cats within about a pound of each other. Tag visits by hand if that is your situation.' },
  ],
  'If readings are still erratic on a level floor after re-taring, the load cell is likely faulty and is a warranty item.'
);

const drawerFull = s(
  'drawer-shows-full',
  'Drawer shows full when it is not',
  'common',
  'The app or the indicator light insists the waste drawer is full immediately after you emptied it.',
  [
    'Waste is packed against the sensor window rather than spread across the drawer.',
    'The sensor window is dusty. Litter dust builds a film that reads as full.',
    'The liner is bunched up over the sensor.',
  ],
  [
    { step: 'Wipe the sensor window', detail: 'Find the small clear window inside the drawer bay and wipe it with a dry microfibre cloth. Do this monthly.' },
    { step: 'Reset the drawer count', detail: 'Use the reset in the app or the physical drawer button so the counter clears after emptying.' },
    { step: 'Fit the liner flat', detail: 'Tuck the bag so it lies against the drawer walls rather than ballooning across the sensor line.' },
  ],
  'A sensor that reads full with the drawer removed entirely is faulty and is a warranty item.'
);

const odorTrouble = (product) =>
  s(
    'odor-problems',
    'It still smells',
    'common',
    'The box cycles normally but the room smells worse than expected — often starting a few weeks in.',
    [
      'The carbon filter is past its life. Filters degrade quietly; there is no warning.',
      'The drawer gasket has litter dust on the seal face, so the drawer no longer closes airtight.',
      'Litter depth is too shallow, so urine reaches the drum wall instead of clumping.',
      'The unit needs a full wash. Waste film builds on the drum wall and no amount of cycling removes it.',
    ],
    [
      { step: 'Replace the filter', detail: 'Set a recurring reminder rather than waiting to notice. ' + product + ' filters are a running cost, not an optional accessory.' },
      { step: 'Clean the gasket', detail: 'Wipe the drawer seal and the mating face with a damp cloth, then dry. A gritty seal leaks.' },
      { step: 'Deepen the litter', detail: 'Run to the fill line, not below it. Shallow litter is the most common cause of odor in an otherwise healthy unit.' },
      { step: 'Full wash every 4-6 weeks', detail: 'Strip the unit, wash the drum and drawer with unscented soap and warm water, dry completely before reassembly.' },
    ],
    'Persistent ammonia smell despite all of the above can indicate a cat health issue. It is worth a vet conversation, not just a cleaning routine.'
  );

const wifiSetupFailed = (app) =>
  s(
    'wifi-setup-failed',
    'Wi-Fi setup fails during pairing',
    'common',
    'Setup runs to the last step and then reports a failure, or the app never finds the unit.',
    [
      'Phone is on 5 GHz while the box needs 2.4 GHz.',
      'The Wi-Fi password contains characters the unit rejects, or the network name is hidden.',
      'Location or local-network permission is denied to the ' + app + ' app, so it cannot see the device.',
    ],
    [
      { step: 'Grant the permissions', detail: 'Both Location and Local Network permissions must be allowed for pairing to work on iOS. Android needs Location.' },
      { step: 'Use a simple 2.4 GHz SSID', detail: 'Broadcast a plain, visible 2.4 GHz network with an alphanumeric password for setup. You can move it afterwards.' },
      { step: 'Stay within six feet during pairing', detail: 'Pairing uses a short-range handshake before the box joins the network.' },
    ],
    'If pairing fails on a known-good 2.4 GHz network from two different phones, the radio module is faulty.'
  );

// --- brand-family sets -------------------------------------------------------

const whiskerLights = [
  s(
    'flashing-blue-light',
    'Flashing blue light',
    'common',
    'The status light pulses blue rather than sitting solid.',
    [
      'A cycle is paused because the cat sensor is still triggered.',
      'The unit is in the middle of its post-visit countdown.',
      'Something is resting on the globe and holding the weight sensor active.',
    ],
    [
      { step: 'Wait out the countdown', detail: 'A pulsing blue light during the delay period is normal behaviour, not a fault.' },
      { step: 'Clear the top of the unit', detail: 'A towel, a cat bed or a second cat sitting on the bonnet will hold the sensor triggered indefinitely.' },
      { step: 'Reset by power cycle', detail: 'If blue persists with nothing on the unit, unplug for 30 seconds.' },
    ],
    'Continuous pulsing blue with an empty, level unit points to a weight sensor fault — a warranty item.'
  ),
  s(
    'flashing-red-light',
    'Flashing red light',
    'serious',
    'Red is the fault code. The unit has stopped and will not resume on its own.',
    [
      'The globe is obstructed or has not returned to its home position.',
      'The drawer is out or not fully seated.',
      'Over-torque protection has tripped, usually from packed or overfilled litter.',
    ],
    [
      { step: 'Power off and inspect', detail: 'Unplug, remove the globe, and look for a jam at the sifting screen or the drop zone.' },
      { step: 'Reduce the litter', detail: 'Remove litter down to the fill line before restarting. Over-filling is the usual cause of an over-torque trip.' },
      { step: 'Reseat and restart', detail: 'Refit the globe, seat the drawer until it clicks, then plug in and let it home itself.' },
    ],
    'Red that returns immediately after a clean restart is a motor or control-board fault. Do not keep resetting it — open a warranty case.'
  ),
  s(
    'flashing-yellow-light',
    'Flashing yellow light',
    'common',
    'Yellow indicates the drawer needs attention.',
    ['The waste drawer is full.', 'The drawer is not seated.', 'The drawer sensor is dusty and reading full.'],
    [
      { step: 'Empty and reseat', detail: 'Empty the drawer, wipe the sensor window, and push the drawer home until it clicks.' },
      { step: 'Reset the counter', detail: 'Press and hold the reset so the fill count clears.' },
    ],
    'Yellow with an empty, clean, correctly seated drawer is a sensor fault.'
  ),
  s(
    'cycle-interrupted',
    'Cycle interrupted',
    'common',
    'The cycle starts and then reverses or aborts partway.',
    [
      'The cat re-entered mid-cycle. This is the safety system doing its job.',
      'A clump has jammed against the sifting screen.',
      'The unit is on an unstable surface and the weight reading fluctuates during rotation.',
    ],
    [
      { step: 'Confirm it is not the cat', detail: 'Check the app cycle log. An interruption immediately followed by a visit entry is normal safety behaviour.' },
      { step: 'Clear the screen', detail: 'Power off and scrape any welded clump from the screen and drop zone.' },
      { step: 'Stabilise the base', detail: 'Move the unit off carpet or a flexing floorboard onto a solid, level surface.' },
    ],
    'Repeated interruptions with no cat present and a clean screen indicate a sensor fault.'
  ),
];

const catlinkExtra = [
  s(
    'deodoriser-not-working',
    'Deodoriser module does nothing',
    'common',
    'The odor module runs but the drawer still smells, or the module never seems to activate.',
    [
      'The module is set to run only after a cycle, and the cat is visiting less than the trigger threshold.',
      'The module cartridge is exhausted.',
      'The module is installed but not enabled in the app.',
    ],
    [
      { step: 'Check it is enabled', detail: 'Open the app, find the deodoriser setting and confirm both the schedule and intensity are set.' },
      { step: 'Replace the cartridge', detail: 'Cartridges are consumables with a finite life. Replace on schedule rather than on smell.' },
      { step: 'Verify the seat', detail: 'Remove and refit the module — a partly seated module powers on but does not draw air correctly.' },
    ],
    'A module that draws no power at all after reseating is a warranty item.'
  ),
  s(
    'drum-jam',
    'Drum jams or grinds',
    'serious',
    'The drum makes a grinding noise, moves unevenly, or stops partway through rotation.',
    [
      'Litter has migrated into the drum track.',
      'Tofu litter has absorbed moisture and swollen into the gap between drum and shell.',
      'A roller is worn or has come out of its seat.',
    ],
    [
      { step: 'Stop using it', detail: 'Unplug immediately. Running a jammed drum damages the drive gear.' },
      { step: 'Clear the track', detail: 'Remove the drum, vacuum the track thoroughly, and wipe with a dry cloth. Do not lubricate.' },
      { step: 'Inspect the rollers', detail: 'Check each roller turns freely and sits in its seat.' },
    ],
    'A grinding noise that persists on a clean, empty drum means a drive fault. Open a warranty case.'
  ),
];

const petkitExtra = [
  s(
    'bag-roll-error',
    'Bag roll error or bag not sealing',
    'common',
    'The unit reports a bag error, or waste ends up loose in the bay rather than in a sealed bag.',
    [
      'The roll is loaded in the wrong orientation.',
      'A third-party roll is being used and the perforation spacing does not match.',
      'The roll is near its end and the remaining film is too short to grip.',
    ],
    [
      { step: 'Reload the roll', detail: 'Follow the diagram inside the bay exactly — orientation is not obvious and reversed rolls are the most common cause.' },
      { step: 'Use PETKIT rolls', detail: 'Third-party film is the most common cause of intermittent sealing failures on these units.' },
      { step: 'Reset the roll counter', detail: 'After fitting a new roll, reset the counter in the app so the remaining-bag estimate is correct.' },
    ],
    'Repeated errors with a correctly fitted genuine roll indicate a bag-feed motor fault.'
  ),
  s(
    'camera-not-identifying',
    'Camera does not identify cats',
    'common',
    'The AI camera records visits but attributes them to the wrong cat or to no cat.',
    [
      'Lighting is too low. The camera needs usable ambient light to distinguish coats.',
      'The cats look alike and the profile has too few training images.',
      'The lens is dusty.',
    ],
    [
      { step: 'Add light', detail: 'A cheap plug-in nightlight near the unit measurably improves identification.' },
      { step: 'Add training images', detail: 'Feed the app more images of each cat, including from behind and above — the angle the camera actually sees.' },
      { step: 'Clean the lens', detail: 'Litter dust films the lens within weeks. Wipe monthly with a dry microfibre cloth.' },
    ],
    'If identification fails in good light with clean optics and full profiles, report it — this is a software issue PETKIT has patched before.'
  ),
];

const neakasaExtra = [
  s(
    'litter-scatter',
    'Litter scattered around the unit',
    'common',
    'The open-top design means more litter ends up on the floor than with an enclosed box.',
    [
      'No mat, or a mat that is too small.',
      'Litter filled above the recommended depth, so the rotation throws it.',
      'A cat that digs enthusiastically — the open top offers no containment.',
    ],
    [
      { step: 'Use a large trapping mat', detail: 'Extend at least 18 inches out from the entry side. This is the fix that actually works.' },
      { step: 'Reduce the depth slightly', detail: 'Fill to the line, not above it. Overfilled open boxes throw litter on every rotation.' },
      { step: 'Add a rear shield', detail: 'A simple splash guard behind the unit catches most of what a digger throws.' },
    ],
    'This is a design characteristic of open-top boxes, not a fault. If it is intolerable, an enclosed globe is the answer.'
  ),
];

const casaLeoExtra = [
  s(
    'uv-not-working',
    'UV sterilisation does not seem to run',
    'common',
    'The UV module gives no visible indication and you cannot tell whether it is working.',
    [
      'UV runs on a schedule after cycles and is deliberately not visible during operation.',
      'The module is disabled in the app.',
      'The UV element has reached end of life.',
    ],
    [
      { step: 'Check the schedule', detail: 'Confirm UV is enabled in the app and note the run schedule — it is not continuous.' },
      { step: 'Look for the indicator', detail: 'The unit reports UV runs in the app history rather than with a visible light, by design.' },
      { step: 'Check element age', detail: 'UV elements dim over years. If the unit is more than three years old, output may be well below spec.' },
    ],
    'Never attempt to observe a running UV element directly. If you suspect a fault, contact Casa Leo.'
  ),
];

const petsnowyExtra = [
  s(
    'seal-failure',
    'Bag is not heat-sealing',
    'serious',
    'Waste drops into the bag but the bag is left open, and the odor advantage disappears.',
    [
      'The sealing film cartridge is empty or misloaded.',
      'The sealing bar has residue on it and is not making contact.',
      'The cartridge is a third-party film with a different melting point.',
    ],
    [
      { step: 'Check the film counter', detail: 'The app tracks remaining film. Running out mid-week is the most common cause and is easy to miss.' },
      { step: 'Clean the sealing bar', detail: 'Unplug, let it cool completely, then wipe the bar with a dry cloth. Never use solvent.' },
      { step: 'Use genuine film', detail: 'The seal temperature is tuned to PetSnowy film. Third-party rolls seal inconsistently or not at all.' },
    ],
    'A sealing bar that never heats is a warranty item. Do not attempt to service the heating element.'
  ),
];

const petsafeExtra = [
  s(
    'rake-stuck',
    'Rake is stuck or does not return',
    'serious',
    'The rake stops partway across the tray or fails to return to its parked position.',
    [
      'A large clump or a foreign object is blocking the rake path.',
      'Crystal litter has been pushed into a ridge that the rake cannot climb.',
      'The tray is not seated square in the bay.',
    ],
    [
      { step: 'Unplug and clear the path', detail: 'Remove the obstruction by hand. Never force the rake while powered.' },
      { step: 'Level the crystals', detail: 'Rake the crystal bed flat by hand every week or two — this prevents most jams.' },
      { step: 'Reseat the tray', detail: 'The tray must sit flat and square, with no lip catching the rake.' },
    ],
    'A rake that stalls on an empty, clean tray has a drive fault and is a warranty item.'
  ),
  s(
    'tray-sensor-error',
    'Tray sensor error',
    'common',
    'The unit reports no tray fitted, or reports the tray as spent immediately.',
    [
      'The tray is a third-party refill without the expected sensor profile.',
      'The tray contacts are dusty.',
      'The tray counter was not reset after the last change.',
    ],
    [
      { step: 'Reset the counter', detail: 'Use the reset in the app or on the unit after fitting a new tray.' },
      { step: 'Wipe the contacts', detail: 'Clean the tray bay contacts with a dry cloth.' },
      { step: 'Use genuine trays', detail: 'Third-party crystal trays are the most common cause of persistent sensor errors on ScoopFree units.' },
    ],
    'Persistent errors with a genuine tray and clean contacts are a warranty item.'
  ),
];

const meowantExtra = [
  s(
    'noisy-operation',
    'Unusually loud or rattling cycle',
    'common',
    'The cycle is louder than usual, or a rattle has developed over time.',
    [
      'The drum is not fully seated on the base.',
      'Litter has worked into the drum track.',
      'A panel clip has loosened. The plastics on this unit are the cheapest part of it.',
    ],
    [
      { step: 'Reseat the drum', detail: 'Lift and refit the drum until it seats flush all the way round.' },
      { step: 'Vacuum the track', detail: 'Litter in the track is the most common cause of new noise.' },
      { step: 'Check the panel clips', detail: 'Press around the shell seams. A loose clip rattles at a specific point in the rotation.' },
    ],
    'Grinding rather than rattling means a drive fault. Stop using it and open a warranty case.'
  ),
];

const omegaPawSet = [
  s(
    'clumps-not-falling',
    'Clumps do not fall into the tray',
    'common',
    'You roll the box but clumps stay in the litter bed instead of dropping through the grate.',
    [
      'Litter is not clumping hard enough — cheap clay breaks up on the roll.',
      'The bed is too shallow, so urine reaches the plastic and smears.',
      'The box was not rolled fully onto its side.',
    ],
    [
      { step: 'Use a firm-clumping clay', detail: 'This design depends entirely on clumps holding together. Budget litter is a false economy here.' },
      { step: 'Deepen the bed', detail: 'Three inches minimum. Shallow beds are the usual cause.' },
      { step: 'Roll it all the way', detail: 'Roll until the box is fully on its side and hold for two seconds before rolling back.' },
    ],
    'There is no mechanism to fail here — if clumps still will not drop, the litter is the variable to change.'
  ),
  s(
    'litter-in-seams',
    'Litter and waste stuck in the seams',
    'common',
    'Material collects where the two halves join and does not clear on rolling.',
    [
      'This is inherent to the two-piece design.',
      'The halves are not clipped fully together, widening the seam.',
      'Litter is too fine and packs into the joint.',
    ],
    [
      { step: 'Split and wash monthly', detail: 'Unclip the halves and wash both with warm water and unscented soap.' },
      { step: 'Check the clips', detail: 'Press all clips home. A partly open seam collects far more material.' },
      { step: 'Try a coarser litter', detail: 'Fine-grain litter packs into the joint; a coarser clay does not.' },
    ],
    'Not a fault. It is the maintenance cost of a $45 box with no motor.'
  ),
];

// --- assembly ----------------------------------------------------------------

const MAP = {
  'litter-robot-4': {
    intro:
      'The Litter-Robot 4 signals almost every fault through the status light, so start there. Blue is a pause, yellow is the drawer, red is a stop. Nearly every red-light call we can find in owner reports comes down to overfilled litter or a drawer that is not fully seated.',
    symptoms: [...whiskerLights, wontCycle(), weightWrong, drawerFull, offline('Whisker', 'Whisker'), wifiSetupFailed('Whisker'), odorTrouble('Whisker')],
  },
  'litter-robot-3-connect': {
    intro:
      'The Litter-Robot 3 uses the same light language as the LR4 with a coarser weight sensor, so weight-related complaints are more common and more of them are genuinely normal behaviour.',
    symptoms: [...whiskerLights, wontCycle(), weightWrong, drawerFull, offline('Whisker', 'Whisker'), odorTrouble('Whisker')],
  },
  'catlink-scooper-pro-x': {
    intro:
      'Most CATLINK problems are litter-related rather than electronic. Tofu litter in particular swells when damp and is the leading cause of drum jams on these units.',
    symptoms: [wontCycle(), ...catlinkExtra, weightWrong, drawerFull, offline('CATLINK', 'CATLINK'), wifiSetupFailed('CATLINK'), odorTrouble('CATLINK')],
  },
  'catlink-luxury-pro': {
    intro:
      'The Luxury Pro shares its drum and app with the Scooper Pro X, so the same fixes apply. It has one fewer safety layer, which means jams stop the cycle rather than reversing out of it.',
    symptoms: [wontCycle(), ...catlinkExtra, weightWrong, offline('CATLINK', 'CATLINK'), odorTrouble('CATLINK')],
  },
  'petkit-purobot-ultra': {
    intro:
      'The Purobot has more to go wrong than any other box here because it has more in it. In practice the two things that generate support calls are bag rolls and camera identification.',
    symptoms: [...petkitExtra, wontCycle(), weightWrong, offline('PETKIT', 'PETKIT'), wifiSetupFailed('PETKIT'), odorTrouble('PETKIT')],
  },
  'petkit-pura-max-2': {
    intro:
      'Almost every Pura Max 2 issue traces back to the bag roll or the network. The mechanism itself is shared with the Purobot and is reliable.',
    symptoms: [petkitExtra[0], wontCycle(), weightWrong, offline('PETKIT', 'PETKIT'), wifiSetupFailed('PETKIT'), odorTrouble('PETKIT')],
  },
  'neakasa-m1': {
    intro:
      'The M1 has fewer failure modes than an enclosed box because there is no bonnet and no globe to seat. Its characteristic complaint is scatter, which is a design trade rather than a fault.',
    symptoms: [...neakasaExtra, wontCycle(), weightWrong, drawerFull, offline('Neakasa', 'Neakasa'), odorTrouble('Neakasa')],
  },
  'casa-leo-leos-loo-too': {
    intro:
      "Leo's Loo Too is mechanically straightforward. Most questions are about the UV module, which is deliberately invisible in operation and is therefore assumed broken when it is not.",
    symptoms: [...casaLeoExtra, wontCycle(), weightWrong, drawerFull, offline("Leo's Loo", 'Casa Leo'), odorTrouble('Casa Leo')],
  },
  'petsnowy-snow-plus': {
    intro:
      'Everything distinctive about the SNOW+ runs through the sealing system, and so does everything that goes wrong with it. Check the film counter before anything else.',
    symptoms: [...petsnowyExtra, wontCycle(), weightWrong, offline('PetSnowy', 'PetSnowy'), odorTrouble('PetSnowy')],
  },
  'petsafe-scoopfree-smart': {
    intro:
      'The ScoopFree has a rake rather than a drum, so its failure modes are different from every other box in this index. Jams are mechanical and almost always visible.',
    symptoms: [...petsafeExtra, offline('PetSafe', 'PetSafe'), odorTrouble('PetSafe')],
  },
  'meowant-sc-m01': {
    intro:
      'The SC-M01 uses a conventional drum, so conventional drum fixes apply. Its own characteristic complaint is noise, which is partly inherent and partly fixable.',
    symptoms: [...meowantExtra, wontCycle(), weightWrong, drawerFull, offline('Meowant', 'Meowant'), odorTrouble('Meowant')],
  },
  'omega-paw-roll-n-clean': {
    intro:
      'There is no motor, no sensor and no app, so there is very little to break. Every problem with this box is a litter problem or a technique problem.',
    symptoms: omegaPawSet,
  },
};

let count = 0;
for (const [slug, data] of Object.entries(MAP)) {
  writeFileSync(
    join(dir, slug + '.json'),
    JSON.stringify({ product: slug, intro: data.intro, symptoms: data.symptoms }, null, 2) + '\n'
  );
  count += 1;
}
console.log('Seeded troubleshooting hubs for ' + count + ' products.');

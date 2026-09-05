// Generates the social cards and product images the site links to.
// Runs automatically before `npm run build` and `npm run dev`.
//
// Everything is drawn as SVG and rasterised offline with resvg, so builds are
// deterministic and need no network, no headless browser and no system fonts.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import { decompress } from 'wawoff2';

import { productArtMarkup, ART_VIEWBOX } from '../src/lib/product-art.js';
import { OG_SIZE, PRODUCT_IMAGE_SIZE } from '../src/lib/images.js';
import { overallScore, formatScore } from '../src/lib/scoring.js';
import { BEST_OF_LISTS, resolveList } from '../src/lib/rankings.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');

const C = {
  blue600: '#3d86b4',
  blue700: '#2c6a92',
  blue800: '#235d80',
  blue050: '#eef5fa',
  sage300: '#c2ddbc',
  sage600: '#6a9a65',
  ink: '#1f2c36',
  inkSoft: '#566875',
  inkFaint: '#8494a0',
  bgSoft: '#f6f9fb',
  white: '#ffffff',
};

// --- fonts -------------------------------------------------------------------
// resvg cannot read woff2, so decompress the packaged weights to ttf once.

async function loadFonts() {
  const cache = join(root, 'node_modules/.cache/smartpet-fonts');
  mkdirSync(cache, { recursive: true });
  const files = [];
  for (const weight of [400, 500, 600]) {
    const ttf = join(cache, `oswald-${weight}.ttf`);
    try {
      readFileSync(ttf);
    } catch {
      const src = join(root, `node_modules/@fontsource/oswald/files/oswald-latin-${weight}-normal.woff2`);
      writeFileSync(ttf, Buffer.from(await decompress(readFileSync(src))));
    }
    files.push(ttf);
  }
  return files;
}

// --- helpers -----------------------------------------------------------------

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Oswald is condensed; this factor is measured against the rendered output.
const CHAR_W = 0.47;

function wrap(text, fontSize, maxWidth, maxLines = 2) {
  const perLine = Math.floor(maxWidth / (fontSize * CHAR_W));
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? line + ' ' + word : word;
    if (candidate.length > perLine && line) {
      lines.push(line);
      line = word;
      if (lines.length === maxLines) break;
    } else {
      line = candidate;
    }
  }
  if (lines.length < maxLines && line) lines.push(line);
  const overflowed = lines.length === maxLines && line && lines[maxLines - 1] !== line;
  if (overflowed) {
    // Cut back to a whole word rather than mid-syllable.
    const last = lines[maxLines - 1].replace(/[\s,.;:—-]+$/, '');
    lines[maxLines - 1] = last.replace(/\s+\S*$/, '') + '…';
  }
  return lines;
}

function textBlock(lines, { x, y, size, weight, fill, lineHeight = 1.12 }) {
  return lines
    .map(
      (l, i) =>
        `<text x="${x}" y="${y + i * size * lineHeight}" font-family="Oswald" font-weight="${weight}" ` +
        `font-size="${size}" fill="${fill}">${esc(l)}</text>`
    )
    .join('');
}

function artGroup(product, { x, y, scale }) {
  return (
    `<g transform="translate(${x} ${y}) scale(${scale})">` +
    productArtMarkup(product) +
    `</g>`
  );
}

function render(svg, fontFiles, outPath) {
  const resvg = new Resvg(svg, {
    font: { loadSystemFonts: false, fontFiles, defaultFontFamily: 'Oswald' },
  });
  const png = resvg.render().asPng();
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, png);
  return png.length;
}

function wordmark(x, y, size, firstFill, secondFill) {
  return (
    `<text x="${x}" y="${y}" font-family="Oswald" font-weight="600" font-size="${size}" ` +
    `letter-spacing="${size * 0.05}">` +
    `<tspan fill="${firstFill}">SMARTPET</tspan>` +
    `<tspan fill="${secondFill}" dx="${size * 0.34}">INDEX</tspan>` +
    `</text>`
  );
}

// --- card templates ----------------------------------------------------------

function productOgCard(product, brandName, score) {
  const { width: W, height: H } = OG_SIZE;
  const panel = 470;
  const padX = panel + 64;
  const textWidth = W - padX - 64;
  const titleLines = wrap(product.model, 64, textWidth, 2);
  const titleY = titleLines.length === 1 ? 300 : 262;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${C.white}"/>
  <rect x="0" y="0" width="${panel}" height="${H}" fill="${C.blue050}"/>
  <rect x="0" y="0" width="${W}" height="14" fill="${C.blue600}"/>
  ${artGroup(product, { x: panel / 2 - (ART_VIEWBOX.width * 1.6) / 2, y: 186, scale: 1.6 })}
  <text x="${padX}" y="188" font-family="Oswald" font-weight="500" font-size="26"
        letter-spacing="3.4" fill="${C.sage600}">${esc(brandName.toUpperCase())}</text>
  ${textBlock(titleLines, { x: padX, y: titleY, size: 64, weight: 600, fill: C.ink })}
  <rect x="${padX}" y="${titleY + (titleLines.length === 1 ? 42 : 100)}" width="150" height="82" rx="12" fill="${C.blue600}"/>
  <text x="${padX + 75}" y="${titleY + (titleLines.length === 1 ? 100 : 158)}" font-family="Oswald" font-weight="600"
        font-size="46" fill="${C.white}" text-anchor="middle">${esc(score)}</text>
  <text x="${padX + 75}" y="${titleY + (titleLines.length === 1 ? 122 : 180)}" font-family="Oswald" font-weight="400"
        font-size="15" letter-spacing="2.2" fill="${C.white}" text-anchor="middle">OVERALL</text>
  <text x="${padX + 176}" y="${titleY + (titleLines.length === 1 ? 88 : 146)}" font-family="Oswald" font-weight="600"
        font-size="36" fill="${C.ink}">$${product.price}</text>
  <text x="${padX + 176}" y="${titleY + (titleLines.length === 1 ? 122 : 180)}" font-family="Oswald" font-weight="400"
        font-size="27" fill="${C.inkSoft}">Full review, specs &amp; costs</text>
  ${wordmark(padX, H - 62, 30, C.blue800, C.sage600)}
</svg>`;
}

function productImage(product) {
  const { width: W, height: H } = PRODUCT_IMAGE_SIZE;
  const scale = 5.6;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${C.bgSoft}"/>
  ${artGroup(product, { x: W / 2 - (ART_VIEWBOX.width * scale) / 2, y: H / 2 - (ART_VIEWBOX.height * scale) / 2, scale })}
</svg>`;
}

function listOgCard(list, count) {
  const { width: W, height: H } = OG_SIZE;
  const titleLines = wrap(list.title, 76, W - 200, 3);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.blue600}"/>
      <stop offset="1" stop-color="${C.blue800}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <text x="100" y="180" font-family="Oswald" font-weight="500" font-size="28"
        letter-spacing="4.5" fill="${C.sage300}">RANKING</text>
  ${textBlock(titleLines, { x: 100, y: 274, size: 76, weight: 600, fill: C.white })}
  <text x="100" y="${274 + titleLines.length * 85 + 26}" font-family="Oswald" font-weight="400" font-size="32"
        fill="#cfe3f0">${count} models ranked · scored on six categories</text>
  ${wordmark(100, H - 72, 32, C.white, C.sage300)}
</svg>`;
}

function guideOgCard(guide) {
  const { width: W, height: H } = OG_SIZE;
  const titleLines = wrap(guide.title, 68, W - 200, 3);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${C.white}"/>
  <rect x="0" y="0" width="${W}" height="14" fill="${C.sage600}"/>
  <rect x="0" y="0" width="26" height="${H}" fill="${C.blue050}"/>
  <text x="100" y="176" font-family="Oswald" font-weight="500" font-size="28"
        letter-spacing="4.5" fill="${C.sage600}">BUYING GUIDE</text>
  ${textBlock(titleLines, { x: 100, y: 268, size: 68, weight: 600, fill: C.ink })}
  <text x="100" y="${268 + titleLines.length * 76 + 30}" font-family="Oswald" font-weight="400" font-size="30"
        fill="${C.inkFaint}">${esc(wrap(guide.summary, 30, W - 220, 1)[0])}</text>
  ${wordmark(100, H - 72, 32, C.blue800, C.sage600)}
</svg>`;
}

function defaultOgCard(productCount) {
  const { width: W, height: H } = OG_SIZE;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.blue600}"/>
      <stop offset="1" stop-color="${C.blue800}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  ${wordmark(100, 300, 82, C.white, C.sage300)}
  <text x="100" y="372" font-family="Oswald" font-weight="400" font-size="38" fill="#cfe3f0">
    Smart pet tech, tested and ranked
  </text>
  <text x="100" y="440" font-family="Oswald" font-weight="400" font-size="28" fill="#a8cbe2">
    ${productCount} automatic litter boxes · full spec sheets · side-by-side comparisons
  </text>
</svg>`;
}

// --- run ---------------------------------------------------------------------

function loadJson(dir) {
  const full = join(root, dir);
  return readdirSync(full)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(join(full, f), 'utf8')));
}

const fontFiles = await loadFonts();
const products = loadJson('src/data/products');
const brands = loadJson('src/data/brands');
const guides = loadJson('src/data/guides');
const brandName = (slug) => (brands.find((b) => b.slug === slug) || {}).name || slug;

let count = 0;
let bytes = 0;

for (const product of products) {
  const score = formatScore(overallScore(product.scores));
  bytes += render(
    productOgCard(product, brandName(product.brand), score),
    fontFiles,
    join(pub, 'og/products', product.slug + '.png')
  );
  bytes += render(productImage(product), fontFiles, join(pub, 'img/products', product.slug + '.png'));
  count += 2;
}

for (const list of BEST_OF_LISTS) {
  bytes += render(
    listOgCard(list, resolveList(list, products).length),
    fontFiles,
    join(pub, 'og/rankings', list.slug + '.png')
  );
  count += 1;
}

for (const guide of guides) {
  bytes += render(guideOgCard(guide), fontFiles, join(pub, 'og/guides', guide.slug + '.png'));
  count += 1;
}

bytes += render(defaultOgCard(products.length), fontFiles, join(pub, 'og/default.png'));
count += 1;

console.log(`Generated ${count} images (${(bytes / 1024 / 1024).toFixed(2)} MB total).`);

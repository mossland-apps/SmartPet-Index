# SmartPet Index

Smart pet tech testing and buying guide. Static site, no database server, no login,
no build-time API calls — every page is plain HTML on a CDN.

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm test         # builds, then runs the full suite
```

`npm test` runs the unit tests **and** a build-output check that link-checks every
generated page, verifies every expected route exists, catches duplicate titles and
missing meta descriptions, and confirms every retailer link is marked
`rel="nofollow sponsored"`.

## Where the content lives

Nothing is typed into an article. Every page reads from these:

| What | Where |
| --- | --- |
| Products (specs + scores + review prose) | `src/data/products/*.json` |
| Brands | `src/data/brands/*.json` |
| Troubleshooting hubs (model-specific only) | `src/data/troubleshooting/*.json` |
| Common troubleshooting (shared by every model) | `src/data/troubleshooting-common.json` |
| Featured comparisons + written verdicts | `src/data/comparisons/*.json` |
| Buying guides | `src/data/guides/*.json` |
| Best-of rankings (filters + sort rules) | `src/lib/rankings.js` |
| Score weights | `src/lib/scoring.js` |
| Amazon associate tag + retailer links | `src/lib/retailers.js` |
| Navigation | `src/config/site.js` |

The JSON files are the single source of truth. There are deliberately no generator
scripts: the original seed scripts held unverified data, and re-running one would have
silently overwritten verified records. Edit the JSON directly.

## Accuracy rules

Every product carries `sources` (the manufacturer page and/or current Amazon listing
the figures came from) and a `lastVerified` date. Anything that cannot be sourced is
`null` and renders as "—" rather than as a guess. `npm test` fails once a verified
product is more than 45 days old — that failure is the prompt to re-check prices and
models, not something to silence.

## What Google is allowed to index

The site generates far more pages than it offers to search engines:

- **Comparison pages** exist for every pair of products so the comparison tool works,
  but only the pairs in `src/data/comparisons/` — each with a written verdict — are
  indexable. Every other pair carries `noindex, follow`.
- **Troubleshooting hubs** hold only model-specific content. Generic fixes live once on
  `/troubleshooting/` and every hub links to them. A hub with too little verified,
  model-specific material is marked `"indexable": false` and stays live for owners.
- **The sitemap** lists only indexable pages, so the two signals never disagree.

This is deliberate. In September 2026 the site lost its search traffic during a Google
spam update, when 74% of its pages were auto-generated comparisons and the
troubleshooting hubs were near-copies of each other. Tests now fail if a non-featured
comparison becomes indexable, if a hub repeats a generic fix, or if two indexable hubs
share more than 20% of their text.

## Adding a product

1. Copy an existing file in `src/data/products/`. Record `sources` and `lastVerified`,
   and leave anything you cannot source as `null`.
2. Fill in every field — `npm test` fails if a standardized spec field or a score is
   missing, which is deliberate.
3. Add a matching file in `src/data/troubleshooting/` keyed to the same slug, with only
   model-specific content, its own `sources`, and an honest `indexable` flag.
4. Run `npm test`.

The review page, every ranking it qualifies for, its brand hub entry, its
troubleshooting hub, its cost tables and a comparison page against every other
product are all generated from that one file.

## Prices

`price` is the **Amazon list price**, not the sale price and not the brand store's
"was" price (brand stores tend to inflate that figure). When a listing has several
variants, use the higher list price. Amazon blocks automated access, so price checks
are done by a person; brand stores are used to confirm models are still sold.

## Products queued for later

- **PETKIT Purobot Max 3** — successor to the PuraMax 2 on PETKIT's own store
  (November 2026). The PuraMax 2 stays: it is still sold on Amazon and Chewy at its
  $389 list price.
- **Meowant MW-SC02** — check first whether it is the same box as our existing
  `meowant-sc02` page. Meowant's own store dates the MW-SC02 to 2024; our page says
  2026.

## Products to remove or replace if they do not come back

- **Omega Paw Roll'n Clean** — unavailable on Amazon US since November 2026 and not
  sold by Omega Paw directly. Marked hard to find. If it is not relisted, remove or
  replace it (removing a product needs redirects for its old URLs).

## Scores

Six categories out of 10 — cleaning, odor control, safety, app, maintenance, value —
weighted in `src/lib/scoring.js` into an overall. The weighting and the seven
measurements behind it are published on `/how-we-test/`.

Each product also carries an internal `scoreBasis` (`"research"` or `"tested"`) and an
optional `testedDate`. These are not rendered anywhere — they exist so provenance can
be tracked in the data and surfaced later if that is ever wanted.

## Images

`scripts/build-images.mjs` generates every social card and product image from the
product data, and runs automatically before `npm run dev` and `npm run build`
(`npm run images` to regenerate on demand). Output lands in `public/og/` and
`public/img/products/` — both gitignored, because they are build artifacts.

Per product it produces a 1200x630 social card (illustration, brand, model, score,
price) and a 1200x1200 product image (illustration only), plus a card for every
ranking, every guide, and a site default. Rankings, guides and the homepage each get
their own card so a shared link never shows a generic image.

The illustration geometry lives in `src/lib/product-art.js` and is used by both the
on-page component and the generated images, so they cannot drift apart. Rendering is
SVG rasterised offline with resvg using the packaged Oswald weights — no network, no
headless browser, no system fonts, so a build produces identical bytes anywhere.

These are our own illustrations, not photographs. Replace them with real product
photos once units have been shot.

## Categories beyond litter boxes

`src/lib/catalog.js` already defines feeders, fountains, cameras, trackers and pet
doors with `live: false`. They appear as "coming next" and stay out of the
navigation. Flipping one to `live: true` and adding products is all that is needed —
the product model, rankings engine, compare tool and troubleshooting template are
category-agnostic.

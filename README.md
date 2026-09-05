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
| Troubleshooting hubs | `src/data/troubleshooting/*.json` |
| Buying guides | `src/data/guides/*.json` |
| Best-of rankings (filters + sort rules) | `src/lib/rankings.js` |
| Score weights | `src/lib/scoring.js` |
| Navigation + affiliate settings | `src/config/site.js` |

The seed scripts in `scripts/` generated the current data files. They are kept so the
whole catalogue can be regenerated, but day-to-day edits go straight into the JSON.

## Turning on affiliate links

Open `src/config/site.js` and put the tag in `AFFILIATES.amazon.tag`. Every
"Check Price" button on the site picks it up. Nothing else needs to change.

## Adding a product

1. Copy an existing file in `src/data/products/`.
2. Fill in every field — `npm test` fails if a standardized spec field or a score is
   missing, which is deliberate.
3. Add a matching file in `src/data/troubleshooting/` keyed to the same slug.
4. Run `npm test`.

The review page, every ranking it qualifies for, its brand hub entry, its
troubleshooting hub, its cost tables and a comparison page against every other
product are all generated from that one file.

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

import { describe, it, expect, beforeAll } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { products, brands } from '../src/lib/catalog.js';
import { BEST_OF_LISTS } from '../src/lib/rankings.js';
import { expectedRoutes } from '../src/lib/routes.js';
import { guides } from '../src/lib/guides.js';
import {
  OG_SIZE,
  PRODUCT_IMAGE_SIZE,
  DEFAULT_OG,
  productImagePath,
  productOgPath,
  listOgPath,
  guideOgPath,
} from '../src/lib/images.js';

const dist = resolve('dist');

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

let htmlFiles = [];

beforeAll(() => {
  if (!existsSync(dist)) {
    throw new Error('dist/ is missing. Run "npm run build" before the test suite.');
  }
  htmlFiles = walk(dist).filter((f) => f.endsWith('.html'));
});

describe('built site', () => {
  it('publishes every expected route', () => {
    const missing = expectedRoutes({ products, brands, lists: BEST_OF_LISTS }).filter(
      (route) => !existsSync(join(dist, route, 'index.html'))
    );
    expect(missing).toEqual([]);
  });

  it('publishes a comparison page for every pair of products', () => {
    const expected = (products.length * (products.length - 1)) / 2;
    const built = readdirSync(join(dist, 'compare')).filter((n) => n.includes('-vs-'));
    expect(built.length).toBe(expected);
  });

  it('publishes a sitemap listing every page', () => {
    const xml = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
    expect(xml).toContain('https://smartpetindex.com/');
    expect(xml).toContain('/reviews/litter-robot-4/');
    expect(xml).toContain('/troubleshooting/litter-robot-4/');
  });

  it('has no broken internal links', () => {
    const broken = [];
    for (const file of htmlFiles) {
      const html = readFileSync(file, 'utf8');
      const hrefs = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);
      for (const href of new Set(hrefs)) {
        const asPage = join(dist, href, 'index.html');
        const asFile = join(dist, href);
        if (existsSync(asPage)) continue;
        if (existsSync(asFile) && statSync(asFile).isFile()) continue;
        broken.push(relative(dist, file) + ' -> ' + href);
      }
    }
    expect(broken).toEqual([]);
  });

  it('gives every page a unique title and a meta description', () => {
    const titles = new Map();
    const problems = [];
    for (const file of htmlFiles) {
      const html = readFileSync(file, 'utf8');
      const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
      const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
      const page = relative(dist, file);
      if (!title) problems.push(page + ': no title');
      if (!desc || desc.length < 40) problems.push(page + ': weak meta description');
      if (title) {
        if (titles.has(title)) problems.push(page + ': duplicate title with ' + titles.get(title));
        else titles.set(title, page);
      }
    }
    expect(problems).toEqual([]);
  });

  it('gives every page exactly one h1', () => {
    const problems = [];
    for (const file of htmlFiles) {
      const html = readFileSync(file, 'utf8');
      const count = (html.match(/<h1[\s>]/g) || []).length;
      if (count !== 1) problems.push(relative(dist, file) + ': ' + count + ' h1 tags');
    }
    expect(problems).toEqual([]);
  });

  it('marks every outbound retailer link as sponsored and nofollow', () => {
    const problems = [];
    for (const file of htmlFiles) {
      const html = readFileSync(file, 'utf8');
      for (const m of html.matchAll(/<a\s([^>]*href="https?:\/\/(?:www\.)?(?:amazon|chewy)[^"]*"[^>]*)>/g)) {
        const attrs = m[1];
        if (!/nofollow/.test(attrs) || !/sponsored/.test(attrs)) {
          problems.push(relative(dist, file) + ': unmarked retailer link');
        }
      }
    }
    expect(problems).toEqual([]);
  });

  it('loads no third-party scripts, stylesheets or fonts', () => {
    // Canonical and Open Graph URLs are metadata, not loaded resources.
    const problems = [];
    for (const file of htmlFiles) {
      const html = readFileSync(file, 'utf8');
      for (const m of html.matchAll(/<script[^>]*\ssrc="(https?:\/\/[^"]+)"/g)) {
        problems.push(relative(dist, file) + ': script ' + m[1]);
      }
      for (const m of html.matchAll(/<link[^>]*\shref="(https?:\/\/[^"]+)"[^>]*>/g)) {
        const tag = m[0];
        if (/rel="canonical"/.test(tag)) continue;
        problems.push(relative(dist, file) + ': link ' + m[1]);
      }
    }
    expect(problems).toEqual([]);
  });
});

describe('structured data', () => {
  function jsonLdOf(file) {
    const html = readFileSync(file, 'utf8');
    return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) =>
      JSON.parse(m[1])
    );
  }

  it('never claims to sell anything', () => {
    // We are a publisher, not a merchant. An offers block makes Google treat the
    // page as a merchant listing and demand image/availability/shipping/returns.
    const offenders = [];
    for (const file of htmlFiles) {
      for (const blob of jsonLdOf(file)) {
        const text = JSON.stringify(blob);
        if (/"offers"|"@type":"Offer"|"priceCurrency"|"availability"/.test(text)) {
          offenders.push(relative(dist, file));
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  it('describes every review page as a Product that carries our review', () => {
    const problems = [];
    for (const p of products) {
      const file = join(dist, 'reviews', p.slug, 'index.html');
      const blobs = jsonLdOf(file);
      expect(blobs.length, p.slug + ': no structured data').toBe(1);
      const ld = blobs[0];
      if (ld['@type'] !== 'Product') problems.push(p.slug + ': @type is ' + ld['@type']);
      if (ld.name !== p.model) problems.push(p.slug + ': name mismatch');
      if (!ld.brand?.name) problems.push(p.slug + ': no brand');
      if (ld.review?.['@type'] !== 'Review') problems.push(p.slug + ': no nested Review');
      if (!ld.review?.author?.name) problems.push(p.slug + ': review has no author');
      if (!ld.review?.datePublished) problems.push(p.slug + ': review has no datePublished');
      if (!ld.review?.reviewBody) problems.push(p.slug + ': review has no body');
    }
    expect(problems).toEqual([]);
  });

  it('satisfies the rule that a Product must carry offers, review or aggregateRating', () => {
    // The exact rule Google's Product snippets validator enforces. Since we never
    // publish offers, the nested review is the only thing keeping these valid.
    const invalid = [];
    const walk = (node, file) => {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) return node.forEach((n) => walk(n, file));
      if (node['@type'] === 'Product' && !node.offers && !node.review && !node.aggregateRating) {
        invalid.push(relative(dist, file) + ': Product "' + node.name + '" has none of the three');
      }
      Object.values(node).forEach((v) => walk(v, file));
    };
    for (const file of htmlFiles) for (const ld of jsonLdOf(file)) walk(ld, file);
    expect(invalid).toEqual([]);
  });

  it('gives every review a rating Google can read', () => {
    const problems = [];
    for (const p of products) {
      const ld = jsonLdOf(join(dist, 'reviews', p.slug, 'index.html'))[0];
      const r = ld.review?.reviewRating || {};
      if (r['@type'] !== 'Rating') problems.push(p.slug + ': reviewRating is not a Rating');
      if (typeof r.ratingValue !== 'number') problems.push(p.slug + ': ratingValue is not a number');
      if (r.bestRating !== 10) problems.push(p.slug + ': bestRating is not 10');
      if (r.worstRating !== 0) problems.push(p.slug + ': worstRating is not 0');
      if (r.ratingValue > r.bestRating || r.ratingValue < r.worstRating) {
        problems.push(p.slug + ': ratingValue outside its own scale');
      }
    }
    expect(problems).toEqual([]);
  });

  it('emits valid JSON in every ld+json block on every page', () => {
    for (const file of htmlFiles) {
      expect(() => jsonLdOf(file), relative(dist, file)).not.toThrow();
    }
  });
});

describe('images', () => {
  // PNG stores its dimensions in the IHDR chunk at a fixed offset.
  function pngSize(file) {
    const buf = readFileSync(file);
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20), bytes: buf.length };
  }

  function checkImage(publicPath, expected, label) {
    const file = join(dist, publicPath);
    if (!existsSync(file)) return label + ': missing';
    const { width, height, bytes } = pngSize(file);
    if (width !== expected.width || height !== expected.height) {
      return label + `: ${width}x${height}, expected ${expected.width}x${expected.height}`;
    }
    // A blank render still produces a valid but tiny PNG, so guard on size too.
    if (bytes < 5000) return label + ': only ' + bytes + ' bytes, probably blank';
    return null;
  }

  it('generates a social card and a product image for every product', () => {
    const problems = [];
    for (const p of products) {
      problems.push(checkImage(productOgPath(p.slug), OG_SIZE, p.slug + ' og'));
      problems.push(checkImage(productImagePath(p.slug), PRODUCT_IMAGE_SIZE, p.slug + ' product image'));
    }
    expect(problems.filter(Boolean)).toEqual([]);
  });

  it('generates a social card for every ranking, guide and the site default', () => {
    const problems = [];
    for (const l of BEST_OF_LISTS) problems.push(checkImage(listOgPath(l.slug), OG_SIZE, l.slug));
    for (const g of guides) problems.push(checkImage(guideOgPath(g.slug), OG_SIZE, g.slug));
    problems.push(checkImage(DEFAULT_OG, OG_SIZE, 'default'));
    expect(problems.filter(Boolean)).toEqual([]);
  });

  it('gives every page an absolute og:image that actually exists', () => {
    const problems = [];
    for (const file of htmlFiles) {
      const html = readFileSync(file, 'utf8');
      const page = relative(dist, file);
      const og = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
      if (!og) {
        problems.push(page + ': no og:image');
        continue;
      }
      if (!og.startsWith('https://smartpetindex.com/')) {
        problems.push(page + ': og:image is not absolute (' + og + ')');
        continue;
      }
      const local = join(dist, og.replace('https://smartpetindex.com', ''));
      if (!existsSync(local)) problems.push(page + ': og:image 404s (' + og + ')');
    }
    expect(problems).toEqual([]);
  });

  it('declares the image dimensions and mirrors them to twitter', () => {
    const problems = [];
    for (const file of htmlFiles) {
      const html = readFileSync(file, 'utf8');
      const page = relative(dist, file);
      const og = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
      const tw = html.match(/<meta name="twitter:image" content="([^"]+)"/)?.[1];
      const w = html.match(/<meta property="og:image:width" content="(\d+)"/)?.[1];
      const h = html.match(/<meta property="og:image:height" content="(\d+)"/)?.[1];
      const alt = html.match(/<meta property="og:image:alt" content="([^"]*)"/)?.[1];
      if (tw !== og) problems.push(page + ': twitter:image does not match og:image');
      if (Number(w) !== OG_SIZE.width || Number(h) !== OG_SIZE.height) {
        problems.push(page + ': og:image dimensions missing or wrong');
      }
      if (!alt || alt.length < 10) problems.push(page + ': weak og:image:alt');
    }
    expect(problems).toEqual([]);
  });

  it('points every review page at a product image Google can fetch', () => {
    const problems = [];
    for (const p of products) {
      const html = readFileSync(join(dist, 'reviews', p.slug, 'index.html'), 'utf8');
      const ld = JSON.parse(
        html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]
      );
      const image = ld.image;
      if (!image) {
        problems.push(p.slug + ': Product has no image');
        continue;
      }
      if (!image.startsWith('https://smartpetindex.com/')) {
        problems.push(p.slug + ': product image is not absolute');
        continue;
      }
      const local = join(dist, image.replace('https://smartpetindex.com', ''));
      if (!existsSync(local)) problems.push(p.slug + ': product image 404s');
    }
    expect(problems).toEqual([]);
  });

  it('gives products, rankings and guides their own card rather than the default', () => {
    const generic = [];
    const pages = [
      ...products.map((p) => ['reviews/' + p.slug, productOgPath(p.slug)]),
      ...BEST_OF_LISTS.map((l) => ['litter-boxes/' + l.slug, listOgPath(l.slug)]),
      ...guides.map((g) => ['guides/' + g.slug, guideOgPath(g.slug)]),
    ];
    for (const [route, expectedPath] of pages) {
      const html = readFileSync(join(dist, route, 'index.html'), 'utf8');
      const og = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
      if (og !== 'https://smartpetindex.com' + expectedPath) {
        generic.push(route + ' -> ' + og);
      }
    }
    expect(generic).toEqual([]);
  });
});

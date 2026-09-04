import { describe, it, expect, beforeAll } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { products, brands } from '../src/lib/catalog.js';
import { BEST_OF_LISTS } from '../src/lib/rankings.js';
import { expectedRoutes } from '../src/lib/routes.js';

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

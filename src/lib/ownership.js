// Sticker price is the small number. This is the big one.

// Returns null when we have not sourced the consumable prices. Treating unknown
// as zero would quietly present an expensive box as cheap to run.
export function annualRunningCost(product) {
  const s = (product && product.specs) || {};
  const bags = typeof s.replacementCost === 'number' ? s.replacementCost : null;
  const filters = typeof s.filterCost === 'number' ? s.filterCost : null;
  // Both halves must be known. A box with free filters but unpriced bags is not
  // a box that costs nothing to run, and printing "$0" would say exactly that.
  if (bags === null || filters === null) return null;
  return bags + filters;
}

export function costOverYears(product, years) {
  const running = annualRunningCost(product);
  if (running === null) return null;
  const price = typeof product.price === 'number' ? product.price : 0;
  return price + running * years;
}

export function ownershipTable(a, b, years = [1, 2, 3, 4, 5]) {
  return years.map((year) => {
    const ca = costOverYears(a, year);
    const cb = costOverYears(b, year);
    const comparable = ca !== null && cb !== null;
    return {
      year,
      a: ca,
      b: cb,
      cheaper: !comparable || ca === cb ? null : ca < cb ? 'a' : 'b',
      gap: comparable ? Math.abs(ca - cb) : null,
    };
  });
}

export function relatedProducts(product, all, limit = 3) {
  return all
    .filter((p) => p.slug !== product.slug)
    .map((p) => ({ p, distance: Math.abs((p.price || 0) - (product.price || 0)) }))
    .sort((x, y) => x.distance - y.distance)
    .slice(0, limit)
    .map((x) => x.p);
}

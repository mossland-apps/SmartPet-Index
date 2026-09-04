// Sticker price is the small number. This is the big one.

export function annualRunningCost(product) {
  const s = (product && product.specs) || {};
  const bags = typeof s.replacementCost === 'number' ? s.replacementCost : 0;
  const filters = typeof s.filterCost === 'number' ? s.filterCost : 0;
  return bags + filters;
}

export function costOverYears(product, years) {
  const price = typeof product.price === 'number' ? product.price : 0;
  return price + annualRunningCost(product) * years;
}

export function ownershipTable(a, b, years = [1, 2, 3, 4, 5]) {
  return years.map((year) => {
    const ca = costOverYears(a, year);
    const cb = costOverYears(b, year);
    return {
      year,
      a: ca,
      b: cb,
      cheaper: ca === cb ? null : ca < cb ? 'a' : 'b',
      gap: Math.abs(ca - cb),
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

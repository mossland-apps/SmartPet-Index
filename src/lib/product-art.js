// One source of truth for the product illustrations. The on-page component and the
// generated social/product images both render from here, so they cannot drift apart.

export const ART_VIEWBOX = { width: 200, height: 160 };
export const DEFAULT_ACCENT = '#3d86b4';

// Derived from the product data rather than hard-coded per model, so a new product
// picks up the right silhouette from its own specs.
export function productForm(product) {
  const s = (product && product.specs) || {};
  if (!s.wifi && String(s.app) === 'None') return 'manual';
  if (/open top/i.test(String(s.odorSystem))) return 'open';
  if (/tray|rake/i.test(String(s.bagType) + ' ' + String(s.cycleTime))) return 'tray';
  return 'globe';
}

const SHAPES = {
  globe: `
    <path d="M100 18a46 46 0 0 1 46 46v40H54V64a46 46 0 0 1 46-46z" fill="ACCENT"/>
    <path d="M100 30a34 34 0 0 1 34 34v40H66V64a34 34 0 0 1 34-34z" fill="#fff" opacity="0.14"/>
    <ellipse cx="100" cy="74" rx="26" ry="30" fill="#f4f7f9"/>
    <ellipse cx="100" cy="76" rx="18" ry="22" fill="#1f2c36" opacity="0.18"/>
    <circle cx="100" cy="30" r="3.5" fill="#fff" opacity="0.85"/>
    <rect x="42" y="104" width="116" height="34" rx="6" fill="ACCENT" opacity="0.78"/>
    <rect x="42" y="104" width="116" height="5" rx="2.5" fill="#1f2c36" opacity="0.12"/>
    <rect x="76" y="119" width="48" height="5" rx="2.5" fill="#fff" opacity="0.72"/>`,

  open: `
    <rect x="40" y="108" width="120" height="34" rx="7" fill="ACCENT" opacity="0.92"/>
    <rect x="54" y="120" width="92" height="4" rx="2" fill="#fff" opacity="0.55"/>
    <path d="M44 60h112v50H44z" fill="ACCENT"/>
    <path d="M56 66h88v40H56z" fill="#f4f7f9"/>
    <ellipse cx="100" cy="60" rx="56" ry="12" fill="ACCENT"/>
    <ellipse cx="100" cy="60" rx="44" ry="8" fill="#1f2c36" opacity="0.2"/>
    <rect x="132" y="72" width="16" height="24" rx="4" fill="#fff" opacity="0.35"/>`,

  tray: `
    <rect x="26" y="96" width="148" height="46" rx="8" fill="ACCENT" opacity="0.92"/>
    <rect x="40" y="108" width="120" height="6" rx="3" fill="#fff" opacity="0.5"/>
    <path d="M26 96V70a10 10 0 0 1 10-10h128a10 10 0 0 1 10 10v26z" fill="ACCENT"/>
    <rect x="42" y="72" width="116" height="22" rx="4" fill="#f4f7f9"/>
    <rect x="42" y="72" width="116" height="22" rx="4" fill="#1f2c36" opacity="0.12"/>
    <rect x="52" y="58" width="96" height="6" rx="3" fill="#fff" opacity="0.4"/>`,

  manual: `
    <path d="M40 142V86a60 60 0 0 1 120 0v56z" fill="ACCENT"/>
    <path d="M56 142V88a44 44 0 0 1 88 0v54z" fill="#fff" opacity="0.18"/>
    <ellipse cx="100" cy="112" rx="30" ry="26" fill="#f4f7f9"/>
    <ellipse cx="100" cy="112" rx="22" ry="19" fill="#1f2c36" opacity="0.16"/>
    <rect x="150" y="112" width="20" height="30" rx="5" fill="ACCENT" opacity="0.75"/>`,
};

const GROUND = '<ellipse cx="100" cy="145" rx="62" ry="7" fill="rgba(31,44,54,0.09)"/>';

// Returns the inner markup for a 200x160 viewBox, with the accent colour inlined.
export function productArtMarkup(product, { ground = true } = {}) {
  const accent = (product && product.accent) || DEFAULT_ACCENT;
  const shape = SHAPES[productForm(product)] || SHAPES.globe;
  return (ground ? GROUND : '') + shape.replaceAll('ACCENT', accent);
}

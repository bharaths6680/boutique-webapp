/**
 * images.config.js
 * ─────────────────
 * Single source of truth for every image used in the app.
 *
 * FALLBACK STRATEGY
 * ─────────────────
 * If an image path is empty or the image fails to load in the browser,
 * the component falls back in this order:
 *
 *   1. Real image from  src/assets/images/...
 *   2. DEFAULTS[type]  — a type-specific default image
 *                        e.g. DEFAULTS.product, DEFAULTS.category
 *   3. DEFAULTS.generic — the universal fallback (a simple branded placeholder)
 *
 * HOW TO USE
 * ──────────
 * import { img, imgWithFallback, DEFAULTS } from '../config/images.config.js';
 *
 * // Get a path (returns DEFAULTS.generic if missing)
 * img('categories.readyMade')
 *
 * // Get a path + a typed fallback
 * imgWithFallback('products.anarkaliKurti', 'product')
 */

const BASE = '/src/assets/images';

/* ── Default / fallback images ─────────────────────────────
   These are shown when a specific image is not yet available.
   Point each to a real file, or use a free placeholder service.
   ──────────────────────────────────────────────────────────── */
export const DEFAULTS = {
  /* Generic catch-all — shown for anything without a typed default */
  generic: 'https://placehold.co/600x800/F3EDE6/C8504A?text=WF',
  product: 'https://placehold.co/480x640/F2DAD8/C8504A?text=No Image Found WF',
  category: 'https://placehold.co/600x800/E8DDD4/C8504A?text=WF',
  avatar: 'https://placehold.co/80x80/F2DAD8/C8504A?text=WF',

  /*
   * While you set up real images, you can also use an online placeholder:
   *
   * generic:  'https://placehold.co/600x800/F3EDE6/C8504A?text=WF',
   * product:  'https://placehold.co/480x640/F2DAD8/C8504A?text=WF',
   * category: 'https://placehold.co/600x800/E8DDD4/C8504A?text=WF',
   * avatar:   'https://placehold.co/80x80/F2DAD8/C8504A?text=WF',
   * hero:     'https://placehold.co/900x1100/F3EDE6/C8504A?text=WF',
   */
};

/* ── All image paths ────────────────────────────────────────── */
export const IMAGES = {

  /* ── Brand ─────────────────────────────────────────────── */
  logo: `${BASE}/brand-logo.jpg`,

  /* ── Hero ───────────────────────────────────────────────── */
  hero: {
    main: `${BASE}/hero/hero-main.jpg`,
  },

  /* ── Categories ─────────────────────────────────────────── */
  categories: {
    readyMade: `${BASE}/categories/ready-made.jpg`,
    custom: `${BASE}/categories/custom.jpg`,
    rental: `${BASE}/categories/rental.jpg`,
  },

  /* ── Products ───────────────────────────────────────────── */
  products: {
    anarkaliKurti: `${BASE}/products/anarkali-kurti.jpg`,
    banarasiLehenga: `${BASE}/products/banarasi-lehenga.jpg`,
    chiffonGown: `${BASE}/products/chiffon-gown.jpg`,
    embroideredSaree: `${BASE}/products/embroidered-saree.jpg`,
    silkKurtiSet: `${BASE}/products/silk-kurti-set.jpg`,
    bridalLehenga: `${BASE}/products/bridal-lehenga.jpg`,
    floralMaxiDress: `${BASE}/products/floral-maxi-dress.jpg`,
    designerGown: `${BASE}/products/designer-gown.jpg`,
  },

  /* ── Testimonials ───────────────────────────────────────── */
  testimonials: {
    priyaRamesh: `${BASE}/testimonials/priya-ramesh.jpg`,
    ananyaKumar: `${BASE}/testimonials/ananya-kumar.jpg`,
    snehaKrishnan: `${BASE}/testimonials/sneha-krishnan.jpg`,
  },

  /* ── Social ─────────────────────────────────────────────── */
  social: {
    instagram: `${BASE}/social/instagram.svg`,
    facebook: `${BASE}/social/facebook.svg`,
    whatsapp: `${BASE}/social/whatsapp.svg`,
    youtube: `${BASE}/social/youtube.svg`,
  },
};

/* ── Helpers ────────────────────────────────────────────────── */

/**
 * img(dotPath)
 * Returns the image path for a given dot-notation key.
 * Returns DEFAULTS.generic if the key doesn't exist or resolves to empty.
 *
 * @param {string} dotPath  e.g. 'categories.readyMade'
 * @returns {string}        image URL
 */
export function img(dotPath) {
  const value = _resolve(IMAGES, dotPath);
  return value || DEFAULTS.generic;
}

/**
 * imgWithFallback(dotPath, type)
 * Same as img() but uses a type-specific default instead of generic.
 *
 * @param {string} dotPath  e.g. 'products.anarkaliKurti'
 * @param {string} type     e.g. 'product' | 'category' | 'avatar' | 'hero'
 * @returns {string}        image URL
 */
export function imgWithFallback(dotPath, type = 'generic') {
  const value = _resolve(IMAGES, dotPath);
  const fallback = DEFAULTS[type] ?? DEFAULTS.generic;
  return value || fallback;
}

/**
 * onImgError(event, type)
 * Attach to <img @error> to swap in the default on load failure.
 * Works directly in Lit templates.
 *
 * Usage in a component:
 *   <img src=${img('products.x')} @error=${e => onImgError(e, 'product')} />
 *
 * @param {Event}  event  the error event from the <img> element
 * @param {string} type   fallback type key
 */
export function onImgError(event, type = 'generic') {
  const el = event.target;
  const fallback = DEFAULTS[type] ?? DEFAULTS.generic;

  /* Avoid infinite loop if the fallback itself fails */
  if (el.src.includes(fallback) || el.dataset.fallbackApplied) return;
  el.dataset.fallbackApplied = 'true';
  el.src = fallback;
}

/* ── Internal resolver ──────────────────────────────────────── */
function _resolve(obj, dotPath) {
  const parts = dotPath.split('.');
  let cursor = obj;
  for (const part of parts) {
    if (cursor == null || typeof cursor !== 'object') return '';
    cursor = cursor[part];
  }
  return typeof cursor === 'string' ? cursor : '';
}
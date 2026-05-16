/**
 * images.config.js
 * ─────────────────────────────────────────────────────────────
 * Dynamically reads ALL images from src/assets/images/ at build
 * time using Vite's import.meta.glob.
 *
 * HOW IT WORKS
 * ─────────────
 * Vite scans the folder, imports every file, hashes the filenames
 * for production, and makes them available as a keyed map.
 *
 * The key is the file path relative to the project root:
 *   '/src/assets/images/products/anarkali-kurti.jpg'
 *
 * We convert that into a short lookup key:
 *   'products/anarkali-kurti'
 *
 * USAGE
 * ─────
 * import { img, onImgError, DEFAULTS } from '../config/images.config.js';
 *
 * img('products/anarkali-kurti')     → hashed URL in prod, raw URL in dev
 * img('categories/ready-made')       → same
 * img('logo')                        → src/assets/images/logo.jpg
 * img('hero/hero-main')              → src/assets/images/hero/hero-main.jpg
 *
 * ADD A NEW IMAGE
 * ───────────────
 * Just drop the file into the right subfolder under src/assets/images/.
 * No code changes needed — it's picked up automatically.
 *
 * FOLDER STRUCTURE
 * ────────────────
 * src/assets/images/
 * ├── logo.jpg
 * ├── defaults/
 * │   ├── default.jpg          ← generic fallback
 * │   ├── default-product.jpg
 * │   ├── default-category.jpg
 * │   ├── default-avatar.jpg
 * │   └── default-hero.jpg
 * ├── hero/
 * │   └── hero-main.jpg
 * ├── categories/
 * │   ├── ready-made.jpg
 * │   ├── custom.jpg
 * │   └── rental.jpg
 * ├── products/
 * │   ├── anarkali-kurti.jpg
 * │   ├── banarasi-lehenga.jpg
 * │   └── ...
 * └── testimonials/
 *     ├── priya-ramesh.jpg
 *     └── ...
 */

/* ── Step 1: Glob import all images ────────────────────────────
   { eager: true } means Vite resolves them at build time (no lazy).
   The result is an object like:
   {
     '/src/assets/images/logo.jpg':                    { default: '/assets/logo.abc123.jpg' },
     '/src/assets/images/products/anarkali-kurti.jpg': { default: '/assets/anarkali-kurti.xyz.jpg' },
     ...
   }
   ──────────────────────────────────────────────────────────── */
const modules = import.meta.glob(
  '../../assets/images/**/*.{jpg,jpeg,png,webp,svg,gif}',
  { eager: true }
);

/* ── Step 2: Build a clean lookup map ──────────────────────────
   Convert full paths like:
     '/src/assets/images/products/anarkali-kurti.jpg'
   into short keys like:
     'products/anarkali-kurti'
   ──────────────────────────────────────────────────────────── */
const IMAGE_MAP = {};

for (const [fullPath, mod] of Object.entries(modules)) {
  // Strip prefix and extension → 'products/anarkali-kurti'
  const key = fullPath
    .replace(/^.*assets\/images\//, '')  // remove base path
    .replace(/\.[^/.]+$/, '');            // remove extension
  IMAGE_MAP[key] = mod.default;
}

/* ── Step 3: Defaults ──────────────────────────────────────────
   Type-specific fallbacks shown when a specific image is missing.
   These are also read from the folder — just drop the file in
   src/assets/images/defaults/ and they're picked up.
   ──────────────────────────────────────────────────────────── */
export const DEFAULTS = {
  generic:  IMAGE_MAP['defaults/default']          ?? _placeholder('F3EDE6', 'C8504A', 'WF'),
  product:  IMAGE_MAP['defaults/default-product']  ?? _placeholder('F2DAD8', 'C8504A', 'WF'),
  category: IMAGE_MAP['defaults/default-category'] ?? _placeholder('E8DDD4', 'C8504A', 'WF'),
  avatar:   IMAGE_MAP['defaults/default-avatar']   ?? _placeholder('F2DAD8', 'C8504A', 'WF'),
  hero:     IMAGE_MAP['defaults/default-hero']     ?? _placeholder('F3EDE6', 'C8504A', 'WF'),
};

/* ── Public API ─────────────────────────────────────────────── */

/**
 * img(key)
 * Returns the resolved URL for a given image key.
 * Falls back to DEFAULTS.generic if not found.
 *
 * @param {string} key  e.g. 'products/anarkali-kurti'
 * @returns {string}    resolved image URL
 *
 * @example
 *   img('logo')                      // logo.jpg
 *   img('hero/hero-main')            // hero/hero-main.jpg
 *   img('categories/ready-made')     // categories/ready-made.jpg
 *   img('products/banarasi-lehenga') // products/banarasi-lehenga.jpg
 */
export function img(key) {
  return IMAGE_MAP[key] ?? DEFAULTS.generic;
}

/**
 * imgWithFallback(key, type)
 * Same as img() but uses a type-specific default.
 *
 * @param {string} key   e.g. 'products/anarkali-kurti'
 * @param {string} type  'product' | 'category' | 'avatar' | 'hero' | 'generic'
 * @returns {string}     resolved image URL
 */
export function imgWithFallback(key, type = 'generic') {
  return IMAGE_MAP[key] ?? DEFAULTS[type] ?? DEFAULTS.generic;
}

/**
 * onImgError(event, type?)
 * Attach to <img @error> — swaps in the typed default on load failure.
 * Prevents infinite loops if the fallback itself also fails.
 *
 * @example (in a Lit template)
 *   <img src=${img('products/x')} @error=${e => onImgError(e, 'product')} />
 */
export function onImgError(event, type = 'generic') {
  const el       = event.target;
  const fallback = DEFAULTS[type] ?? DEFAULTS.generic;
  if (!fallback || el.src === fallback || el.dataset.fallbackApplied) return;
  el.dataset.fallbackApplied = 'true';
  el.src = fallback;
}

/**
 * listImages(prefix?)
 * Returns all resolved image URLs, optionally filtered by folder prefix.
 * Useful for debugging — call in browser console:
 *   import('/src/client/config/images.config.js').then(m => console.log(m.listImages()))
 *
 * @param {string} prefix  e.g. 'products' to list only product images
 * @returns {Object}       { key: url, ... }
 */
export function listImages(prefix = '') {
  if (!prefix) return { ...IMAGE_MAP };
  return Object.fromEntries(
    Object.entries(IMAGE_MAP).filter(([k]) => k.startsWith(prefix))
  );
}

/* ── Internal: CSS gradient placeholder ────────────────────────
   Used when a default image file hasn't been added yet.
   Returns a placehold.co URL — requires internet connection.
   Replace with a local SVG/PNG once you have real defaults.
   ──────────────────────────────────────────────────────────── */
function _placeholder(bg, text, label) {
  return `https://placehold.co/600x800/${bg}/${text}?text=${label}`;
}
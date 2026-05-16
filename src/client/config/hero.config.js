/**
 * hero.config.js
 * Drives <hero-section> entirely.
 * Change copy, stats, CTAs, badge, or image here.
 */

import { imgWithFallback } from './images.config.js';

export const HERO_CONFIG = {

  /* ── Eyebrow tag ────────────────────────────────────────── */
  eyebrow: 'New Collection 2025',

  /* ── Heading ────────────────────────────────────────────── */
  heading: {
    normal: 'Fashion That Tells',
    em:     'Your Story',
  },

  /* ── Description ────────────────────────────────────────── */
  description: 'Ready-made elegance, custom-crafted perfection, and rental luxury for every occasion — curated exclusively for the modern Indian woman.',

  /* ── CTA buttons ────────────────────────────────────────── */
  ctas: [
    { label: 'Explore Collection', path: '/shop',   style: 'primary' },
    { label: 'Custom Order',       path: '/custom', style: 'ghost'   },
  ],

  /* ── Stats row ──────────────────────────────────────────── */
  stats: [
    { value: '2,400+', label: 'Happy Customers' },
    { value: '350+',   label: 'Styles Available' },
    { value: '4.9★',   label: 'Average Rating'   },
  ],

  /* ── Right panel image ──────────────────────────────────── */
  image: {
    src:         imgWithFallback('hero.main', 'hero'),
    alt:         'Winter Flower Designs — Featured Collection',
    placeholder: 'Hero image goes here',
  },

  /* ── Floating badge ─────────────────────────────────────── */
  badge: {
    value: '14 Days',
    label: 'Custom Delivery',
  },
};
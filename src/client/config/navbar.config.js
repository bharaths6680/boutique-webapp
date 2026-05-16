/**
 * navbar.config.js
 * All data that drives <app-navbar>.
 * Change links, logo alt text, or section anchors here — not in the component.
 */

import { IMAGES } from './images.config.js';

export const NAVBAR_CONFIG = {

  /* ── Brand ─────────────────────────────────────────────── */
  brand: {
    logoSrc:  IMAGES.logo,
    logoAlt:  'Winter Flower Designs',
    logoPath: '/',                     // navigate to on click
    /* Text shown if logo image fails to load */
    fallbackText: 'Winter Flower Designs',
  },

  /* ── Main nav links ─────────────────────────────────────── */
  links: [
    { label: 'Shop',    path: '/shop'    },
    { label: 'Custom',  path: '/custom'  },
    { label: 'Rentals', path: '/rentals' },
    { label: 'Offers',  path: '/offers'  },
    { label: 'Contact', path: '/contact' },
  ],

  /* ── Homepage section anchors (jump dropdown) ───────────── */
  sections: [
    { hash: '#hero',         label: 'Home'         },
    { hash: '#categories',   label: 'Categories'   },
    { hash: '#featured',     label: 'Featured'     },
    { hash: '#how-it-works', label: 'How It Works' },
    { hash: '#testimonials', label: 'Reviews'      },
    { hash: '#newsletter',   label: 'Newsletter'   },
  ],

  /* ── CTA button ─────────────────────────────────────────── */
  cta: {
    label: 'Login',
    path:  '/login',
  },
};
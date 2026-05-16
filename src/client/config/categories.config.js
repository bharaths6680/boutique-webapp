/**
 * categories.config.js
 * Drives the "Shop by Category" section on the homepage.
 */

import { img } from './images.config.js';

export const CATEGORIES_CONFIG = {

  section: {
    tag:   'Shop by Category',
    title: 'Find Your',
    titleEm: 'Perfect Style',
  },

  items: [
    {
      id:      'ready-made',
      label:   'Ready-Made',
      sub:     '120+ styles · Ships in 2 days',
      path:    '/shop?category=ready-made',
      imgSrc:  img('categories.readyMade'),
      imgAlt:  'Ready-made dress collection',
      /* aspect ratio of this card's image wrap */
      aspect:  '2 / 3',
    },
    {
      id:      'custom',
      label:   'Custom Stitch',
      sub:     'Your exact measurements',
      path:    '/custom',
      imgSrc:  img('categories.custom'),
      imgAlt:  'Custom stitch collection',
      aspect:  '3 / 4',
    },
    {
      id:      'rental',
      label:   'Rental',
      sub:     'Special occasions · Book now',
      path:    '/rentals',
      imgSrc:  img('categories.rental'),
      imgAlt:  'Rental dress collection',
      aspect:  '3 / 4',
    },
  ],
};
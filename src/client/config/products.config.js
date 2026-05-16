/**
 * products.config.js
 * Phase 1 mock product data — images referenced from images.config.js.
 * Phase 2: delete this file and fetch from /api/products instead.
 */

import { img } from './images.config.js';

export const PRODUCTS_CONFIG = {

  featured: [
    {
      _id:           'p1',
      _idx:          0,
      slug:          'anarkali-kurti',
      name:          'Anarkali Kurti',
      subCategory:   'Cotton · Ready-Made',
      category:      'ready-made',
      basePrice:     1299,
      salePrice:     1099,
      averageRating: 4.8,
      reviewCount:   124,
      badge:         'Sale',
      sizes:         ['S', 'M', 'L', 'XL'],
      images:        [{ url: img('products.anarkaliKurti'), alt: 'Anarkali Kurti' }],
    },
    {
      _id:           'p2',
      _idx:          1,
      slug:          'banarasi-lehenga',
      name:          'Banarasi Lehenga',
      subCategory:   'Silk · Custom Order',
      category:      'custom',
      basePrice:     8500,
      salePrice:     null,
      averageRating: 4.9,
      reviewCount:   56,
      badge:         'New',
      sizes:         ['S', 'M', 'L'],
      images:        [{ url: img('products.banarasiLehenga'), alt: 'Banarasi Lehenga' }],
    },
    {
      _id:           'p3',
      _idx:          2,
      slug:          'chiffon-gown',
      name:          'Chiffon Party Gown',
      subCategory:   'Chiffon · Rental',
      category:      'rental',
      basePrice:     699,
      salePrice:     null,
      averageRating: 4.7,
      reviewCount:   89,
      badge:         'Rental',
      sizes:         ['M', 'L', 'XL'],
      images:        [{ url: img('products.chiffonGown'), alt: 'Chiffon Party Gown' }],
    },
    {
      _id:           'p4',
      _idx:          3,
      slug:          'embroidered-saree',
      name:          'Embroidered Saree',
      subCategory:   'Georgette · Ready-Made',
      category:      'ready-made',
      basePrice:     3200,
      salePrice:     2600,
      averageRating: 4.6,
      reviewCount:   200,
      badge:         'Sale',
      sizes:         ['S', 'M', 'L', 'XL', 'XXL'],
      images:        [{ url: img('products.embroideredSaree'), alt: 'Embroidered Saree' }],
    },
  ],

  /* Tab filter mapping  badge value → tab label */
  tabs: ['All', 'New Arrivals', 'On Sale', 'Rentals'],

  tabMap: {
    'New Arrivals': 'New',
    'On Sale':      'Sale',
    'Rentals':      'Rental',
  },

  section: {
    tag:      'Handpicked for You',
    title:    'Featured',
    titleEm:  'Picks',
    viewAll:  { label: 'View All →', path: '/shop' },
  },
};
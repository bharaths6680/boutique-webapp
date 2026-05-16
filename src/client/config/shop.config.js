/**
 * shop.config.js
 * Drives <shop-page> entirely.
 * Categories, sizes, sort options, and mock products all live here.
 * Phase 2: keep categories/sizes/sorts, replace products with API call.
 */

import { imgWithFallback } from './images.config.js';

export const SHOP_CONFIG = {

  /* ── Page header ────────────────────────────────────────── */
  page: {
    tag:     'Our Collection',
    heading: { normal: 'Our', em: 'Collection' },
    breadcrumb: [
      { label: 'Home', path: '/' },
      { label: 'Shop', path: null },
    ],
  },

  /* ── Pagination ─────────────────────────────────────────── */
  perPage: 8,

  /* ── Filter: categories ─────────────────────────────────── */
  categories: [
    { value: 'all',        label: 'All'         },
    { value: 'ready-made', label: 'Ready-Made'  },
    { value: 'custom',     label: 'Custom'      },
    { value: 'rental',     label: 'Rental'      },
  ],

  /* ── Filter: sizes ──────────────────────────────────────── */
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

  /* ── Filter: price range ─────────────────────────────────── */
  price: {
    min:     500,
    max:     20000,
    step:    500,
    default: 20000,
  },

  /* ── Sort options ───────────────────────────────────────── */
  sortOptions: [
    { value: 'featured',   label: 'Featured'            },
    { value: 'newest',     label: 'Newest'              },
    { value: 'price-asc',  label: 'Price: Low to High'  },
    { value: 'price-desc', label: 'Price: High to Low'  },
    { value: 'rating',     label: 'Top Rated'           },
  ],

  /* ── Filter sidebar labels ───────────────────────────────── */
  sidebar: {
    title:     'Filters',
    clearAll:  'Clear all',
    labels: {
      category: 'Category',
      price:    'Max Price',
      size:     'Size',
    },
  },

  /* ── Toolbar labels ─────────────────────────────────────── */
  toolbar: {
    searchPlaceholder: 'Search dresses…',
    filterToggle:      'Filters',
    resultSuffix:      'result',          // pluralised in component
  },

  /* ── Phase 1 mock products ───────────────────────────────── */
  products: [
    {
      _id:           'p1', _idx: 0,
      slug:          'anarkali-kurti',
      name:          'Anarkali Kurti',
      subCategory:   'Cotton · Ready-Made',
      category:      'ready-made',
      basePrice:     1299, salePrice: 1099,
      averageRating: 4.8,  reviewCount: 124,
      badge:         'Sale',
      sizes:         ['S', 'M', 'L', 'XL'],
      images:        [{ url: imgWithFallback('products.anarkaliKurti', 'product'), alt: 'Anarkali Kurti' }],
    },
    {
      _id:           'p2', _idx: 1,
      slug:          'banarasi-lehenga',
      name:          'Banarasi Lehenga',
      subCategory:   'Silk · Custom Order',
      category:      'custom',
      basePrice:     8500, salePrice: null,
      averageRating: 4.9,  reviewCount: 56,
      badge:         'New',
      sizes:         ['S', 'M', 'L'],
      images:        [{ url: imgWithFallback('products.banarasiLehenga', 'product'), alt: 'Banarasi Lehenga' }],
    },
    {
      _id:           'p3', _idx: 2,
      slug:          'chiffon-gown',
      name:          'Chiffon Party Gown',
      subCategory:   'Chiffon · Rental',
      category:      'rental',
      basePrice:     699,  salePrice: null,
      averageRating: 4.7,  reviewCount: 89,
      badge:         'Rental',
      sizes:         ['M', 'L', 'XL'],
      images:        [{ url: imgWithFallback('products.chiffonGown', 'product'), alt: 'Chiffon Party Gown' }],
    },
    {
      _id:           'p4', _idx: 3,
      slug:          'embroidered-saree',
      name:          'Embroidered Saree',
      subCategory:   'Georgette · Ready-Made',
      category:      'ready-made',
      basePrice:     3200, salePrice: 2600,
      averageRating: 4.6,  reviewCount: 200,
      badge:         'Sale',
      sizes:         ['S', 'M', 'L', 'XL', 'XXL'],
      images:        [{ url: imgWithFallback('products.embroideredSaree', 'product'), alt: 'Embroidered Saree' }],
    },
    {
      _id:           'p5', _idx: 4,
      slug:          'silk-kurti-set',
      name:          'Silk Kurti Set',
      subCategory:   'Silk · Ready-Made',
      category:      'ready-made',
      basePrice:     2100, salePrice: null,
      averageRating: 4.5,  reviewCount: 78,
      badge:         'New',
      sizes:         ['XS', 'S', 'M', 'L'],
      images:        [{ url: imgWithFallback('products.silkKurtiSet', 'product'), alt: 'Silk Kurti Set' }],
    },
    {
      _id:           'p6', _idx: 5,
      slug:          'bridal-lehenga',
      name:          'Bridal Lehenga',
      subCategory:   'Velvet · Custom',
      category:      'custom',
      basePrice:     15000, salePrice: null,
      averageRating: 5.0,   reviewCount: 32,
      badge:         'New',
      sizes:         ['S', 'M', 'L'],
      images:        [{ url: imgWithFallback('products.bridalLehenga', 'product'), alt: 'Bridal Lehenga' }],
    },
    {
      _id:           'p7', _idx: 6,
      slug:          'floral-maxi-dress',
      name:          'Floral Maxi Dress',
      subCategory:   'Chiffon · Ready-Made',
      category:      'ready-made',
      basePrice:     1800, salePrice: 1499,
      averageRating: 4.4,  reviewCount: 155,
      badge:         'Sale',
      sizes:         ['XS', 'S', 'M', 'L', 'XL'],
      images:        [{ url: imgWithFallback('products.floralMaxiDress', 'product'), alt: 'Floral Maxi Dress' }],
    },
    {
      _id:           'p8', _idx: 7,
      slug:          'designer-gown',
      name:          'Designer Gown',
      subCategory:   'Net · Rental',
      category:      'rental',
      basePrice:     1200, salePrice: null,
      averageRating: 4.8,  reviewCount: 44,
      badge:         'Rental',
      sizes:         ['M', 'L', 'XL'],
      images:        [{ url: imgWithFallback('products.designerGown', 'product'), alt: 'Designer Gown' }],
    },
  ],
};
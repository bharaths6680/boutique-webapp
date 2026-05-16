/**
 * rentals.config.js
 * Drives <rentals-page> entirely.
 * Occasions, info strip, and mock products all live here.
 * Phase 2: keep occasions/infoStrip, replace products with API call.
 */

import { imgWithFallback } from './images.config.js';

export const RENTALS_CONFIG = {

  /* ── Page header ────────────────────────────────────────── */
  page: {
    breadcrumb: [
      { label: 'Home',    path: '/'        },
      { label: 'Rentals', path: null       },
    ],
    heading: { normal: 'Rental', em: 'Collection' },
    description: 'Wear stunning outfits for every occasion without the full price tag. Book, wear, return — it\'s that simple.',
  },

  /* ── Info strip (dark bar below header) ─────────────────── */
  infoStrip: [
    { label: 'Rental Price',      value: 'Per day pricing'       },
    { label: 'Security Deposit',  value: 'Fully refundable'      },
    { label: 'Delivery',          value: '2 days before event'   },
    { label: 'Return',            value: '1 day after event'     },
  ],

  /* ── Occasion filter pills ──────────────────────────────── */
  occasions: ['All', 'Wedding', 'Party', 'Festival', 'Formal'],

  /* ── Booking modal labels ───────────────────────────────── */
  booking: {
    title:          'Book',            // appended with product name
    dateFrom:       'From',
    dateTo:         'To',
    datesLabel:     'Rental Dates',
    sizeLabel:      'Size',
    summaryLabels: {
      pricePerDay:  'Price per day',
      days:         'Number of days',
      rentalFee:    'Rental fee',
      deposit:      'Security deposit',
      total:        'Total payable',
    },
    confirmBtn:     'Confirm Booking',
    successTitle:   'Booking Received!',
    successMsg:     'We\'ll confirm your booking within 2 hours. The outfit will be delivered 2 days before your event date.',
    closeBtn:       'Close',
  },

  /* ── Phase 1 mock products ───────────────────────────────── */
  products: [
    {
      _id:           'r1', _idx: 0,
      slug:          'designer-gown',
      name:          'Designer Gown',
      subCategory:   'Net · Rental',
      category:      'rental',
      basePrice:     1200, salePrice: null,
      averageRating: 4.8,  reviewCount: 44,
      badge:         'Rental',
      sizes:         ['M', 'L', 'XL'],
      occasion:      'Wedding',
      deposit:       3000,
      images:        [{ url: imgWithFallback('products.designerGown', 'product'), alt: 'Designer Gown' }],
    },
    {
      _id:           'r2', _idx: 1,
      slug:          'silk-lehenga-rent',
      name:          'Silk Lehenga',
      subCategory:   'Silk · Rental',
      category:      'rental',
      basePrice:     900,  salePrice: null,
      averageRating: 4.9,  reviewCount: 61,
      badge:         'Rental',
      sizes:         ['S', 'M', 'L'],
      occasion:      'Wedding',
      deposit:       2500,
      images:        [{ url: imgWithFallback('products.banarasiLehenga', 'product'), alt: 'Silk Lehenga' }],
    },
    {
      _id:           'r3', _idx: 2,
      slug:          'chiffon-gown-rent',
      name:          'Chiffon Party Gown',
      subCategory:   'Chiffon · Rental',
      category:      'rental',
      basePrice:     699,  salePrice: null,
      averageRating: 4.7,  reviewCount: 89,
      badge:         'Rental',
      sizes:         ['M', 'L', 'XL'],
      occasion:      'Party',
      deposit:       2000,
      images:        [{ url: imgWithFallback('products.chiffonGown', 'product'), alt: 'Chiffon Party Gown' }],
    },
    {
      _id:           'r4', _idx: 3,
      slug:          'anarkali-rent',
      name:          'Anarkali Suit',
      subCategory:   'Georgette · Rental',
      category:      'rental',
      basePrice:     499,  salePrice: null,
      averageRating: 4.6,  reviewCount: 120,
      badge:         'Rental',
      sizes:         ['S', 'M', 'L', 'XL'],
      occasion:      'Festival',
      deposit:       1500,
      images:        [{ url: imgWithFallback('products.anarkaliKurti', 'product'), alt: 'Anarkali Suit' }],
    },
    {
      _id:           'r5', _idx: 4,
      slug:          'saree-rent',
      name:          'Designer Saree',
      subCategory:   'Banarasi · Rental',
      category:      'rental',
      basePrice:     599,  salePrice: null,
      averageRating: 4.5,  reviewCount: 55,
      badge:         'Rental',
      sizes:         ['Free size'],
      occasion:      'Wedding',
      deposit:       1800,
      images:        [{ url: imgWithFallback('products.embroideredSaree', 'product'), alt: 'Designer Saree' }],
    },
    {
      _id:           'r6', _idx: 5,
      slug:          'cocktail-dress',
      name:          'Cocktail Dress',
      subCategory:   'Satin · Rental',
      category:      'rental',
      basePrice:     799,  salePrice: null,
      averageRating: 4.7,  reviewCount: 38,
      badge:         'Rental',
      sizes:         ['S', 'M', 'L'],
      occasion:      'Formal',
      deposit:       2200,
      images:        [{ url: imgWithFallback('products.floralMaxiDress', 'product'), alt: 'Cocktail Dress' }],
    },
  ],
};
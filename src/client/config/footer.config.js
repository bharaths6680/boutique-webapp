/**
 * footer.config.js
 * Drives <app-footer> entirely — links, social, payments, brand copy.
 */

import { IMAGES } from './images.config.js';

export const FOOTER_CONFIG = {

  /* ── Brand ─────────────────────────────────────────────── */
  brand: {
    logoSrc:      IMAGES.logo,
    logoAlt:      'Winter Flower Designs',
    fallbackText: 'Winter Flower Designs',
    description:  'Curated women\'s fashion — ready-made, custom-stitched, and rental collections for every occasion and budget.',
  },

  /* ── Link columns ───────────────────────────────────────── */
  columns: [
    {
      title: 'Shop',
      links: [
        { label: 'Ready-Made',    path: '/shop?category=ready-made' },
        { label: 'Custom Orders', path: '/custom'                   },
        { label: 'Rental Dresses',path: '/rentals'                  },
        { label: 'New Arrivals',  path: '/shop?sort=new'            },
        { label: 'Sale',          path: '/offers'                   },
      ],
    },
    {
      title: 'Account',
      links: [
        { label: 'My Orders',        path: '/orders'               },
        { label: 'Wishlist',         path: '/account#wishlist'     },
        { label: 'Measurements',     path: '/account#measurements' },
        { label: 'Login / Register', path: '/login'                },
        { label: 'Track Order',      path: '/track'                },
      ],
    },
    {
      title: 'Help',
      links: [
        { label: 'Size Guide',      path: '/size-guide' },
        { label: 'Shipping Policy', path: '/shipping'   },
        { label: 'Returns',         path: '/returns'    },
        { label: 'Contact Us',      path: '/contact'    },
        { label: 'WhatsApp Chat',   path: '#'           },
      ],
    },
  ],

  /* ── Social links ───────────────────────────────────────── */
  social: [
    { label: 'Instagram', href: 'https://instagram.com/winterflowerdesigns', icon: 'ti ti-brand-instagram' },
    { label: 'Facebook',  href: 'https://facebook.com/winterflowerdesigns',  icon: 'ti ti-brand-facebook'  },
    { label: 'WhatsApp',  href: 'https://wa.me/919876543210',                icon: 'ti ti-brand-whatsapp'  },
    { label: 'YouTube',   href: 'https://youtube.com/@winterflowerdesigns',  icon: 'ti ti-brand-youtube'   },
    { label: 'Pinterest', href: 'https://pinterest.com/winterflowerdesigns', icon: 'ti ti-brand-pinterest' },
  ],

  /* ── Payment badges ──────────────────────────────────────── */
  payments: ['Razorpay', 'UPI', 'Cards', 'NetBanking', 'COD'],

  /* ── Copyright ───────────────────────────────────────────── */
  copyright: `© ${new Date().getFullYear()} Winter Flower Designs. All rights reserved.`,
};
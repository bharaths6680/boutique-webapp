/**
 * testimonials.config.js
 * Drives the "Loved by Thousands" review cards section.
 */

import { img } from './images.config.js';

export const TESTIMONIALS_CONFIG = {

  section: {
    tag:     'What Our Customers Say',
    title:   'Loved by',
    titleEm: 'Thousands',
  },

  reviews: [
    {
      id:       'r1',
      initials: 'PR',
      name:     'Priya Ramesh',
      meta:     'Custom Order · Chennai',
      rating:   5,
      text:     '"The custom lehenga fit me perfectly — like it was made exactly for my body. The fabric quality is outstanding and delivery was right on time!"',
      avatar:   img('testimonials.priyaRamesh'),
    },
    {
      id:       'r2',
      initials: 'AK',
      name:     'Ananya Kumar',
      meta:     'Rental · Bangalore',
      rating:   5,
      text:     '"Rented a gown for my sister\'s wedding — perfect condition, effortless booking process, and the deposit came back without any fuss!"',
      avatar:   img('testimonials.ananyaKumar'),
    },
    {
      id:       'r3',
      initials: 'SK',
      name:     'Sneha Krishnan',
      meta:     'Ready-Made · Coimbatore',
      rating:   4.5,
      text:     '"The WhatsApp support is so helpful. They helped me pick the right size and the kurti arrived in just 2 days. Will definitely order again!"',
      avatar:   img('testimonials.snehaKrishnan'),
    },
  ],
};
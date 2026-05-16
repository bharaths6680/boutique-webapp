# 🌸 Winter Flower Designs — Boutique Frontend

A modern women's fashion e-commerce web app built with **Lit.js** and **Vite**.
Fully config-driven UI — change content, images, and links without touching component code.

---

## Tech Stack

| Layer       | Technology                  |
|-------------|-----------------------------|
| UI Framework| Lit 3.x (Web Components)    |
| Bundler     | Vite 5.x                    |
| Styling     | Scoped CSS in Lit components|
| Icons       | Inline SVG                  |
| Fonts       | Cormorant Garamond + DM Sans|
| Images      | Vite `import.meta.glob`     |
| Routing     | Custom client-side router   |
| State       | Lightweight pub-sub store   |

---

## Project Structure

```
BOUTIQUE-FRONTEND/
├── public/
├── src/
│   ├── assets/
│   │   └── images/                  ← All images live here
│   │       ├── logo.jpg
│   │       ├── defaults/            ← Fallback images
│   │       ├── hero/
│   │       ├── categories/
│   │       ├── products/
│   │       └── testimonials/
│   │
│   └── client/
│       ├── root.js                  ← App entry + router
│       │
│       ├── config/                  ← All content lives here
│       │   ├── images.config.js     ← Single source for all images
│       │   ├── navbar.config.js
│       │   ├── hero.config.js
│       │   ├── marquee.config.js
│       │   ├── categories.config.js
│       │   ├── products.config.js
│       │   ├── how-it-works.config.js
│       │   ├── testimonials.config.js
│       │   ├── footer.config.js
│       │   ├── shop.config.js
│       │   └── rentals.config.js
│       │
│       ├── components/              ← Reusable Lit components
│       │   ├── app-navbar.js
│       │   ├── app-footer.js
│       │   ├── hero-section.js
│       │   ├── marquee-strip.js
│       │   ├── category-grid.js
│       │   ├── featured-products.js
│       │   ├── product-card.js
│       │   ├── how-it-works.js
│       │   ├── testimonials-section.js
│       │   ├── newsletter-section.js
│       │   ├── toast-notification.js
│       │   ├── whatsapp-fab.js
│       │   └── coming-soon-page.js
│       │
│       └── pages/                   ← Route-level components
│           ├── home-page.js
│           ├── shop-page.js
│           ├── custom-page.js
│           ├── rentals-page.js
│           ├── offers-page.js
│           └── contact-page.js
│
├── index.html
├── package.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:5173

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Pages & Routes

| Route      | Component           | Status      |
|------------|---------------------|-------------|
| `/`        | `home-page.js`      | ✅ Built    |
| `/shop`    | `shop-page.js`      | ✅ Built    |
| `/custom`  | `custom-page.js`    | ✅ Built    |
| `/rentals` | `rentals-page.js`   | ✅ Built    |
| `/offers`  | `offers-page.js`    | ✅ Built    |
| `/contact` | `contact-page.js`   | ✅ Built    |
| `/cart`    | —                   | 🔜 Phase 2 |
| `/login`   | —                   | 🔜 Phase 2 |
| `/account` | —                   | 🔜 Phase 2 |

### Hash Anchors (Homepage Sections)

| URL                | Scrolls to           |
|--------------------|----------------------|
| `/#hero`           | Hero section         |
| `/#categories`     | Shop by Category     |
| `/#featured`       | Featured Picks       |
| `/#how-it-works`   | How It Works         |
| `/#testimonials`   | Customer Reviews     |
| `/#newsletter`     | Newsletter signup    |

---

## Config-Driven Architecture

All content is managed through config files — **no hardcoded data inside components**.

### Quick reference

| Want to change          | Edit this file               |
|-------------------------|------------------------------|
| Nav links / logo        | `navbar.config.js`           |
| Marquee announcements   | `marquee.config.js`          |
| Hero copy / stats / CTA | `hero.config.js`             |
| Category cards          | `categories.config.js`       |
| Featured products       | `products.config.js`         |
| How-it-works steps      | `how-it-works.config.js`     |
| Customer reviews        | `testimonials.config.js`     |
| Footer links / social   | `footer.config.js`           |
| Shop filters / products | `shop.config.js`             |
| Rental products         | `rentals.config.js`          |
| **Any image**           | `images.config.js`           |

---

## Image Management

Images are dynamically loaded using **Vite's `import.meta.glob`** — no manual imports needed.

### Add a new image

Just drop the file into the correct folder:

```
src/assets/images/
├── logo.jpg                      → img('logo')
├── hero/
│   └── hero-main.jpg             → img('hero/hero-main')
├── categories/
│   ├── ready-made.jpg            → img('categories/ready-made')
│   ├── custom.jpg                → img('categories/custom')
│   └── rental.jpg                → img('categories/rental')
├── products/
│   └── anarkali-kurti.jpg        → img('products/anarkali-kurti')
├── testimonials/
│   └── priya-ramesh.jpg          → img('testimonials/priya-ramesh')
└── defaults/
    ├── default.jpg               ← generic fallback
    ├── default-product.jpg       ← product fallback
    ├── default-category.jpg      ← category fallback
    ├── default-avatar.jpg        ← avatar fallback
    └── default-hero.jpg          ← hero fallback
```

Vite picks it up automatically on next `npm run dev`. No code changes needed.

### Fallback chain

```
Real image
  ↓ file missing
Type-specific default  (default-product.jpg)
  ↓ also missing
Branded placeholder    (placehold.co — rose/cream, WF text)
```

### Usage in components

```js
import { img, imgWithFallback, onImgError } from '../config/images.config.js';

// Basic
img('products/anarkali-kurti')

// With typed fallback
imgWithFallback('products/anarkali-kurti', 'product')

// In Lit template — auto-swap on load failure
html`<img src=${img('products/x')} @error=${e => onImgError(e, 'product')} />`

// Debug — list all loaded images
import('/src/client/config/images.config.js')
  .then(m => console.log(m.listImages('products')))
```

---

## Navigation

Navigation is event-driven — no imports needed between components.

```js
// Fire from any component
window.dispatchEvent(new CustomEvent('app-navigate', {
  detail: { path: '/shop' },          // full page
  // or
  detail: { path: '/#featured' },     // hash scroll
  bubbles: true,
  composed: true,
}));
```

`root.js` listens at the top and handles routing + scroll.

---

## Component Architecture

```
boutique-app  (root.js)
├── app-navbar
├── [page outlet]
│   └── home-page
│       ├── hero-section
│       ├── marquee-strip
│       ├── category-grid
│       ├── featured-products
│       │   └── product-card
│       ├── how-it-works
│       ├── testimonials-section
│       └── newsletter-section
├── app-footer
├── whatsapp-fab
└── toast-notification
```

### Toast notifications (global)

```js
// Fire from anywhere
window.dispatchEvent(new CustomEvent('show-toast', {
  detail: { msg: 'Added to cart!', type: 'success' }  // type: success | error
}));
```

---

## Development Phases

### Phase 1 — UI (current)
- ✅ All pages built with Lit components
- ✅ Config-driven content and images
- ✅ Mock data in config files
- ✅ Client-side routing with hash anchor support
- ✅ Responsive design (mobile, tablet, desktop)

### Phase 2 — Backend (next)
- 🔜 Node.js + Express API in `src/server/`
- 🔜 MongoDB + Mongoose models
- 🔜 JWT authentication
- 🔜 Razorpay payment integration
- 🔜 Cloudinary image storage
- 🔜 Replace mock data with real API calls

### Switching from Phase 1 → Phase 2

In each page component, replace the mock data line:

```js
// Phase 1 (current)
this._products = SHOP_CONFIG.products;

// Phase 2 — one line change
const { products } = await api.get('/products');
this._products = products;
```

---

## Git Workflow

```bash
# Initial commit
git add .
git commit -m "feat: Phase 1 UI — Lit.js boutique frontend"
git push origin main

# Feature branches
git checkout -b feat/cart-page
git checkout -b feat/login-page
git checkout -b feat/phase-2-backend
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
# API base URL (used in Phase 2)
VITE_API_URL=http://localhost:5000/api

# Phase: '1' = mock data, '2' = real API
VITE_PHASE=1
```

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome  | ✅ 89+  |
| Firefox | ✅ 89+  |
| Safari  | ✅ 15+  |
| Edge    | ✅ 89+  |

> Lit Web Components require browsers with native Custom Elements v1 support.

---

## License

Private — Winter Flower Designs. All rights reserved.
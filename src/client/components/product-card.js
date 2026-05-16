import { LitElement, html, css } from 'lit';
import { onImgError } from '../config/images.config';

/**
 * <product-card>
 * Single product card matching the mockup:
 *   - 3:4 image (placeholder gradient or real img)
 *   - Badge top-left  (Sale / New / Rental)
 *   - Wishlist heart  top-right (reveals on hover)
 *   - Product name, sub-category
 *   - Price row  (sale + original strikethrough)
 *   - Star rating + review count
 *   - "Add to Cart" button (reveals on hover)
 *
 * Property:
 *   product {Object} — shape matches mocks/products.json
 *
 * Fires window 'show-toast' and 'cart-update' on add-to-cart.
 */
export class ProductCard extends LitElement {
  static properties = {
    product:     { type: Object },
    _wishlisted: { state: true },
    _added:      { state: true },
  };

  /* Placeholder gradient per index */
  static PH = ['ph-1', 'ph-2', 'ph-3', 'ph-4'];

  static styles = css`
    :host { display: block; }

    /* ── Card wrapper ─────────────────────────────────────── */
    .card {
      cursor: pointer;
    }

    /* ── Image area ───────────────────────────────────────── */
    .img-wrap {
      position: relative;
      aspect-ratio: 3 / 4;
      overflow: hidden;
      border-radius: 3px;
      margin-bottom: 14px;
    }

    /* Placeholder gradients */
    .placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      color: #C8504A;
      opacity: 0.28;
      transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
    }
    .ph-1 { background: linear-gradient(160deg, #F2E4E4, #EDD5D3); }
    .ph-2 { background: linear-gradient(160deg, #EAE0D8, #F0E6DC); }
    .ph-3 { background: linear-gradient(160deg, #E8DDD4, #EDE4DA); }
    .ph-4 { background: linear-gradient(160deg, #F5ECE8, #EDD9D3); }

    .card:hover .placeholder { transform: scale(1.04); }

    /* Real image */
    .img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
    }
    .card:hover .img-wrap img { transform: scale(1.04); }

    /* ── Badge ────────────────────────────────────────────── */
    .badge {
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 3px 9px;
      border-radius: 2px;
      color: #fff;
    }
    .badge-sale   { background: #C8504A; }
    .badge-new    { background: #1C1917; }
    .badge-rental { background: #C9A96E; }

    /* ── Wishlist button ──────────────────────────────────── */
    .wish {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.88);
      backdrop-filter: blur(4px);
      border: none;
      cursor: pointer;
      display: grid;
      place-items: center;
      font-size: 14px;
      opacity: 0;
      transform: translateY(-4px);
      transition: opacity 0.2s, transform 0.2s, background 0.15s;
    }
    /* Always show if wishlisted */
    .card:hover .wish,
    .wish.active {
      opacity: 1;
      transform: translateY(0);
    }
    .wish:hover { background: #fff; }

    /* ── Info area ────────────────────────────────────────── */
    .name {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.05rem;
      font-weight: 400;
      color: #1C1917;
      margin-bottom: 3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sub {
      font-size: 11px;
      color: #B8ABA8;
      letter-spacing: 0.04em;
      margin-bottom: 9px;
    }

    /* Price */
    .price-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    .price {
      font-weight: 500;
      font-size: 0.95rem;
      color: #1C1917;
    }
    .old-price {
      font-size: 0.82rem;
      color: #B8ABA8;
      text-decoration: line-through;
    }

    /* Rating */
    .rating {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 12px;
      color: #6B6260;
      margin-bottom: 0;
    }
    .stars { display: flex; gap: 2px; }
    .star  { font-size: 11px; color: #C9A96E; }
    .star-empty { opacity: 0.25; }

    /* ── Add to cart button ───────────────────────────────── */
    .add-btn {
      width: 100%;
      margin-top: 12px;
      padding: 10px 0;
      background: none;
      border: 1px solid #E8DDD4;
      border-radius: 2px;
      font-family: inherit;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #6B6260;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      /* Reveals on hover */
      opacity: 0;
      transform: translateY(4px);
      transition: opacity 0.2s, transform 0.2s, background 0.2s, color 0.2s, border-color 0.2s;
    }
    .card:hover .add-btn {
      opacity: 1;
      transform: translateY(0);
    }
    .add-btn:hover,
    .add-btn.done {
      background: #1C1917;
      color: #fff;
      border-color: #1C1917;
    }
    .add-btn.done {
      background: #2d6a4f;
      border-color: #2d6a4f;
    }
    .add-btn:disabled { cursor: wait; }
  `;

  constructor() {
    super();
    this.product     = null;
    this._wishlisted = false;
    this._added      = false;
  }

  /* ── Wishlist toggle ─────────────────────────────────────── */
  _toggleWish(e) {
    e.stopPropagation();
    this._wishlisted = !this._wishlisted;
    window.dispatchEvent(new CustomEvent('show-toast', {
      detail: {
        msg:  this._wishlisted ? 'Added to wishlist ❤' : 'Removed from wishlist',
        type: 'success',
      },
    }));
  }

  /* ── Add to cart ─────────────────────────────────────────── */
  _addToCart(e) {
    e.stopPropagation();
    if (this._added) return;
    this._added = true;

    /* Update cart count in localStorage */
    const count = parseInt(localStorage.getItem('b_cart') || '0') + 1;
    localStorage.setItem('b_cart', count);
    window.dispatchEvent(new CustomEvent('cart-update', { detail: { count } }));
    window.dispatchEvent(new CustomEvent('show-toast', {
      detail: { msg: `${this.product?.name ?? 'Item'} added to cart`, type: 'success' },
    }));

    setTimeout(() => { this._added = false; }, 2500);
  }

  /* ── Navigate to PDP ─────────────────────────────────────── */
  _goDetail(e) {
    if (!this.product?.slug) return;
    window.dispatchEvent(new CustomEvent('app-navigate', {
      detail: { path: `/shop/${this.product.slug}` },
      bubbles: true,
      composed: true,
    }));
  }

  /* ── Star helper ─────────────────────────────────────────── */
  _stars(rating = 0) {
    return [1, 2, 3, 4, 5].map(i => {
      const filled = i <= Math.floor(rating);
      const half   = !filled && i - rating < 1 && i > rating;
      return html`
        <span class="star ${filled || half ? '' : 'star-empty'}">
          ${filled ? '★' : half ? '½' : '★'}
        </span>
      `;
    });
  }

  /* ── Badge class helper ──────────────────────────────────── */
  _badgeClass(badge) {
    if (!badge) return '';
    const map = { Sale: 'badge-sale', New: 'badge-new', Rental: 'badge-rental' };
    return map[badge] ?? 'badge-sale';
  }

  /* ── Placeholder gradient ────────────────────────────────── */
  _ph() {
    const idx = (this.product?._idx ?? 0) % 4;
    return ProductCard.PH[idx];
  }

  render() {
    const p = this.product;
    if (!p) return html``;

    const hasDiscount = p.salePrice && p.salePrice < p.basePrice;
    const price       = p.salePrice ?? p.basePrice;

    return html`
      <article class="card" @click=${this._goDetail} role="link" tabindex="0">

        <!-- Image -->
        <div class="img-wrap">
          ${p.images?.[0]?.url
            ? html`<img src=${p.images[0].url} alt=${p.name} loading="lazy"   @error=${e => onImgError(e, 'product')} />`
            : html`<div class="placeholder ${this._ph()}">❋</div>`
          }

          <!-- Badge -->
          ${p.badge ? html`
            <span class="badge ${this._badgeClass(p.badge)}">${p.badge}</span>
          ` : ''}

          <!-- Wishlist -->
          <button
            class="wish ${this._wishlisted ? 'active' : ''}"
            @click=${this._toggleWish}
            aria-label="${this._wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}"
          >
            ${this._wishlisted ? '❤' : '♡'}
          </button>
        </div>

        <!-- Info -->
        <div class="name">${p.name}</div>
        <div class="sub">${p.subCategory ?? p.category ?? ''}</div>

        <div class="price-row">
          <span class="price">₹${price.toLocaleString('en-IN')}</span>
          ${hasDiscount ? html`
            <span class="old-price">₹${p.basePrice.toLocaleString('en-IN')}</span>
          ` : ''}
        </div>

        <div class="rating">
          <div class="stars">${this._stars(p.averageRating ?? 4.5)}</div>
          <span>${(p.averageRating ?? 4.5).toFixed(1)} (${p.reviewCount ?? 0})</span>
        </div>

        <!-- Add to cart -->
        <button
          class="add-btn ${this._added ? 'done' : ''}"
          ?disabled=${this._added}
          @click=${this._addToCart}
        >
          ${this._added ? '✓ Added!' : '+ Add to Cart'}
        </button>

      </article>
    `;
  }
}

customElements.define('product-card', ProductCard);
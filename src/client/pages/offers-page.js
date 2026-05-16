import { LitElement, html, css } from 'lit';
import '../components/product-card.js';

/**
 * <offers-page>
 * Promotions, coupons, and sale items page.
 *
 * Sections:
 *   1. Active banners (seasonal sale, new member offer)
 *   2. Coupon codes
 *   3. Sale products grid
 */
export class OffersPage extends LitElement {

  static properties = {
    _copied:   { state: true },   // which coupon was copied
    _products: { state: true },
    _loading:  { state: true },
  };

  static BANNERS = [
    {
      title:    'End of Season Sale',
      sub:      'Up to 40% off on ready-made collection',
      tag:      'Limited Time',
      bg:       '#F2DAD8',
      accent:   '#C8504A',
    },
    {
      title:    'New Member Discount',
      sub:      'Get ₹200 off your first order',
      tag:      'First Order',
      bg:       '#1C1917',
      accent:   '#E8857F',
      dark:     true,
    },
    {
      title:    'Free Shipping',
      sub:      'On all orders above ₹999',
      tag:      'Always On',
      bg:       '#F3EDE6',
      accent:   '#C9A96E',
    },
  ];

  static COUPONS = [
    { code: 'WELCOME200', desc: '₹200 off your first order',      min: '₹999 minimum',   type: 'flat' },
    { code: 'FLAT10',     desc: '10% off on all ready-made items', min: '₹1499 minimum',  type: 'percent' },
    { code: 'RENTAL15',   desc: '15% off on rental bookings',      min: 'No minimum',     type: 'percent' },
    { code: 'CUSTOM500',  desc: '₹500 off custom orders',         min: '₹5000 minimum',  type: 'flat' },
  ];

  static SALE_MOCK = [
    { _id:'s1', _idx:0, slug:'anarkali-kurti',    name:'Anarkali Kurti',    subCategory:'Cotton · Ready-Made',    category:'ready-made', basePrice:1299, salePrice:1099, averageRating:4.8, reviewCount:124, badge:'Sale', images:[] },
    { _id:'s2', _idx:1, slug:'floral-maxi',       name:'Floral Maxi Dress', subCategory:'Chiffon · Ready-Made',   category:'ready-made', basePrice:1800, salePrice:1499, averageRating:4.4, reviewCount:155, badge:'Sale', images:[] },
    { _id:'s3', _idx:2, slug:'embroidered-saree', name:'Embroidered Saree', subCategory:'Georgette · Ready-Made', category:'ready-made', basePrice:3200, salePrice:2600, averageRating:4.6, reviewCount:200, badge:'Sale', images:[] },
    { _id:'s4', _idx:3, slug:'silk-set',          name:'Silk Kurti Set',    subCategory:'Silk · Ready-Made',      category:'ready-made', basePrice:2100, salePrice:1699, averageRating:4.5, reviewCount:78,  badge:'Sale', images:[] },
  ];

  static styles = css`
    :host { display: block; }

    /* ── Header ───────────────────────────────────────────── */
    .page-header {
      background: #F3EDE6;
      padding: 48px 48px 36px;
      border-bottom: 1px solid #E8DDD4;
    }
    .breadcrumb { font-size:11px;letter-spacing:.08em;color:#B8ABA8;margin-bottom:10px;display:flex;gap:6px;align-items:center; }
    .breadcrumb span { cursor:pointer;transition:color .2s; }
    .breadcrumb span:hover { color:#C8504A; }
    .page-header h1 { font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2rem,4vw,3rem);font-weight:300;color:#1C1917;margin:0; }
    .page-header h1 em { font-style:italic;color:#C8504A; }

    /* ── Body ─────────────────────────────────────────────── */
    .body { max-width: 1200px; margin: 0 auto; padding: 48px; }

    /* ── Section heading ──────────────────────────────────── */
    .sec-head { margin-bottom: 24px; }
    .sec-tag {
      display:inline-flex;align-items:center;gap:10px;
      font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#C8504A;margin-bottom:10px;
    }
    .sec-tag::before { content:'';width:28px;height:1px;background:#C8504A; }
    .sec-title { font-family:'Cormorant Garamond',Georgia,serif;font-size:1.8rem;font-weight:300;color:#1C1917;margin:0; }
    .sec-title em { font-style:italic;color:#C8504A; }

    /* ── Banners grid ─────────────────────────────────────── */
    .banners {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 16px;
      margin-bottom: 56px;
    }
    .banner {
      border-radius: 4px;
      padding: 36px 28px;
      position: relative;
      overflow: hidden;
    }
    .banner-tag {
      display: inline-block;
      font-size: 10px;
      letter-spacing: .14em;
      text-transform: uppercase;
      padding: 3px 10px;
      border-radius: 2px;
      margin-bottom: 14px;
      font-weight: 500;
    }
    .banner h3 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.5rem;
      font-weight: 300;
      line-height: 1.2;
      margin: 0 0 8px;
    }
    .banner p { font-size: 13px; opacity: .75; margin: 0 0 20px; }
    .banner-btn {
      display: inline-block;
      padding: 9px 20px;
      font-family: inherit;
      font-size: 11px;
      letter-spacing: .1em;
      text-transform: uppercase;
      border: none;
      border-radius: 2px;
      cursor: pointer;
      font-weight: 500;
      transition: opacity .2s, transform .15s;
    }
    .banner-btn:hover { opacity: .85; transform: translateY(-1px); }

    /* ── Coupons ──────────────────────────────────────────── */
    .coupons-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
      margin-bottom: 56px;
    }
    .coupon-card {
      border: 1.5px dashed #E8DDD4;
      border-radius: 4px;
      padding: 20px 22px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      transition: border-color .2s;
    }
    .coupon-card:hover { border-color: #C8504A; }
    .coupon-code {
      font-family: monospace;
      font-size: 1.1rem;
      font-weight: 600;
      letter-spacing: .08em;
      color: #C8504A;
      margin-bottom: 4px;
    }
    .coupon-desc { font-size: 13px; color: #1C1917; margin-bottom: 3px; }
    .coupon-min  { font-size: 11px; color: #B8ABA8; }
    .copy-btn {
      flex-shrink: 0;
      padding: 8px 16px;
      background: none;
      border: 1px solid #E8DDD4;
      border-radius: 2px;
      font-family: inherit;
      font-size: 11px;
      letter-spacing: .08em;
      text-transform: uppercase;
      color: #6B6260;
      cursor: pointer;
      transition: background .15s, color .15s, border-color .15s;
      white-space: nowrap;
    }
    .copy-btn:hover  { border-color: #C8504A; color: #C8504A; }
    .copy-btn.copied { background: #2d6a4f; color: #fff; border-color: #2d6a4f; }

    /* ── Sale products ────────────────────────────────────── */
    .sale-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 28px;
    }
    .skeleton { aspect-ratio:3/4;background:#F3EDE6;border-radius:3px;animation:pulse 1.4s ease-in-out infinite; }
    @keyframes pulse { 0%,100%{opacity:1}50%{opacity:.5} }

    /* ── Responsive ───────────────────────────────────────── */
    @media (max-width:900px) {
      .banners    { grid-template-columns:1fr 1fr; }
      .sale-grid  { grid-template-columns:repeat(2,1fr); }
    }
    @media (max-width:600px) {
      .page-header { padding:32px 20px 24px; }
      .body        { padding:28px 20px; }
      .banners     { grid-template-columns:1fr; }
      .coupons-grid{ grid-template-columns:1fr; }
      .sale-grid   { grid-template-columns:1fr 1fr;gap:14px; }
    }
  `;

  constructor() {
    super();
    this._copied   = null;
    this._products = OffersPage.SALE_MOCK;
    this._loading  = false;
  }

  _go(path) {
    window.dispatchEvent(new CustomEvent('app-navigate', { detail: { path }, bubbles: true, composed: true }));
  }

  _copyCoupon(code) {
    navigator.clipboard.writeText(code).catch(() => {});
    this._copied = code;
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { msg: `Coupon ${code} copied!`, type: 'success' } }));
    setTimeout(() => { this._copied = null; }, 2500);
  }

  render() {
    return html`
      <!-- Header -->
      <div class="page-header">
        <div class="breadcrumb">
          <span @click=${() => this._go('/')}>Home</span>
          <span style="opacity:.4">/</span>
          <span>Offers</span>
        </div>
        <h1>Deals &amp; <em>Offers</em></h1>
      </div>

      <div class="body">

        <!-- Banners -->
        <div class="sec-head">
          <div class="sec-tag">Current Promotions</div>
          <h2 class="sec-title">What's <em>On Sale</em></h2>
        </div>
        <div class="banners">
          ${OffersPage.BANNERS.map(b => html`
            <div class="banner" style="background:${b.bg};color:${b.dark?'rgba(255,255,255,.85)':'#1C1917'}">
              <div class="banner-tag" style="background:${b.accent};color:#fff">${b.tag}</div>
              <h3 style="color:${b.dark?'#fff':'#1C1917'}">${b.title}</h3>
              <p>${b.sub}</p>
              <button
                class="banner-btn"
                style="background:${b.dark?'#C8504A':'#1C1917'};color:#fff"
                @click=${() => this._go('/shop')}
              >Shop Now</button>
            </div>
          `)}
        </div>

        <!-- Coupons -->
        <div class="sec-head">
          <div class="sec-tag">Coupon Codes</div>
          <h2 class="sec-title">Copy &amp; <em>Save</em></h2>
        </div>
        <div class="coupons-grid">
          ${OffersPage.COUPONS.map(c => html`
            <div class="coupon-card">
              <div>
                <div class="coupon-code">${c.code}</div>
                <div class="coupon-desc">${c.desc}</div>
                <div class="coupon-min">${c.min}</div>
              </div>
              <button
                class="copy-btn ${this._copied === c.code ? 'copied' : ''}"
                @click=${() => this._copyCoupon(c.code)}
              >${this._copied === c.code ? '✓ Copied' : 'Copy'}</button>
            </div>
          `)}
        </div>

        <!-- Sale products -->
        <div class="sec-head">
          <div class="sec-tag">Sale Items</div>
          <h2 class="sec-title">On <em>Sale Now</em></h2>
        </div>
        <div class="sale-grid">
          ${this._loading
            ? Array.from({length:4}).map(() => html`<div class="skeleton"></div>`)
            : this._products.map(p => html`<product-card .product=${p}></product-card>`)
          }
        </div>

      </div>
    `;
  }
}

customElements.define('offers-page', OffersPage);
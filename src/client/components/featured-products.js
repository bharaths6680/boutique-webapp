import { LitElement, html, css } from 'lit';
import { PRODUCTS_CONFIG } from '../config/products.config.js';
import './product-card.js';

/**
 * <featured-products>
 * Config-driven featured products section.
 */
export class FeaturedProducts extends LitElement {
  static properties = {
    _products: { state: true },
    _filtered: { state: true },
    _loading:  { state: true },
    _tab:      { state: true },
  };

  static styles = css`
    :host { display: block; }

    section { padding: 0 48px 96px; max-width: 1296px; margin: 0 auto; }

    .header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }

    .tag {
      display: inline-flex; align-items: center; gap: 10px;
      font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
      color: #C8504A; margin-bottom: 12px;
    }
    .tag::before { content: ''; width: 28px; height: 1px; background: #C8504A; }

    h2 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 300; color: #1C1917; margin: 0;
    }
    h2 em { font-style: italic; color: #C8504A; }

    .view-all {
      font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
      color: #C8504A; background: none; border: none; cursor: pointer;
      display: flex; align-items: center; gap: 5px;
      transition: gap 0.2s; padding: 0; font-family: inherit;
    }
    .view-all:hover { gap: 9px; }

    .tabs { display: flex; border-bottom: 1px solid #E8DDD4; margin-bottom: 40px; }
    .tab {
      padding: 10px 24px; font-size: 11px; letter-spacing: 0.1em;
      text-transform: uppercase; color: #B8ABA8; cursor: pointer;
      border: none; border-bottom: 2px solid transparent; margin-bottom: -1px;
      background: none; font-family: inherit; transition: color 0.2s, border-color 0.2s;
    }
    .tab:hover:not(.active) { color: #1C1917; }
    .tab.active { color: #1C1917; border-bottom-color: #C8504A; }

    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; }

    .skeleton {
      aspect-ratio: 3/4; background: #F3EDE6; border-radius: 3px;
      animation: pulse 1.4s ease-in-out infinite;
    }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }

    .empty {
      grid-column: 1/-1; text-align: center; padding: 48px 0;
      font-size: 14px; color: #B8ABA8;
    }

    @media (max-width: 1100px) { .grid { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 768px)  { section { padding: 0 20px 64px; } .grid { grid-template-columns: repeat(2, 1fr); gap: 16px; } }
    @media (max-width: 420px)  { .grid { grid-template-columns: 1fr; } }
  `;

  constructor() {
    super();
    this._products = [];
    this._filtered = [];
    this._loading  = true;
    this._tab      = 'All';
  }

  async connectedCallback() {
    super.connectedCallback();
    await this._load();
  }

  async _load() {
    this._loading = true;
    await new Promise(r => setTimeout(r, 350));
    this._products = PRODUCTS_CONFIG.featured;
    this._loading  = false;
    this._filter('All');
  }

  _filter(tab) {
    this._tab = tab;
    if (tab === 'All') { this._filtered = this._products; return; }
    const badge = PRODUCTS_CONFIG.tabMap[tab];
    this._filtered = this._products.filter(p => p.badge === badge);
  }

  _go(path) {
    window.dispatchEvent(new CustomEvent('app-navigate', { detail: { path }, bubbles: true, composed: true }));
  }

  render() {
    const { section, tabs } = PRODUCTS_CONFIG;
    return html`
      <section>
        <div class="header">
          <div>
            <div class="tag">${section.tag}</div>
            <h2>${section.title} <em>${section.titleEm}</em></h2>
          </div>
          <button class="view-all" @click=${() => this._go(section.viewAll.path)}>
            ${section.viewAll.label}
          </button>
        </div>

        <div class="tabs" role="tablist">
          ${tabs.map(tab => html`
            <button
              class="tab ${this._tab === tab ? 'active' : ''}"
              role="tab" aria-selected=${this._tab === tab}
              @click=${() => this._filter(tab)}
            >${tab}</button>
          `)}
        </div>

        <div class="grid">
          ${this._loading
            ? Array.from({length: 4}).map(() => html`<div class="skeleton"></div>`)
            : this._filtered.length === 0
              ? html`<p class="empty">No products in this category yet.</p>`
              : this._filtered.map(p => html`<product-card .product=${p}></product-card>`)
          }
        </div>
      </section>
    `;
  }
}

customElements.define('featured-products', FeaturedProducts);
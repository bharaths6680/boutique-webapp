import { LitElement, html, css } from 'lit';
import { SHOP_CONFIG } from '../config/shop.config.js';
import '../components/product-card.js';

/**
 * <shop-page>
 * Fully config-driven product listing page.
 * All filter options, sort options, labels, and mock products
 * come from shop.config.js.
 *
 * Phase 2: replace _loadProducts() body with:
 *   const data = await api.get('/products?' + params.toString());
 *   this._products = data.products;
 */
export class ShopPage extends LitElement {
  static properties = {
    _products:    { state: true },
    _filtered:    { state: true },
    _loading:     { state: true },
    _search:      { state: true },
    _category:    { state: true },
    _sort:        { state: true },
    _sizes:       { state: true },
    _maxPrice:    { state: true },
    _page:        { state: true },
    _sidebarOpen: { state: true },
  };

  static styles = css`
    :host { display: block; }

    /* ── Page header ──────────────────────────────────────── */
    .page-header {
      background: #F3EDE6;
      padding: 48px 48px 36px;
      border-bottom: 1px solid #E8DDD4;
    }
    .breadcrumb {
      font-size: 11px; letter-spacing: 0.08em; color: #B8ABA8;
      margin-bottom: 10px; display: flex; gap: 6px; align-items: center;
    }
    .breadcrumb span { cursor: pointer; transition: color 0.2s; }
    .breadcrumb span:hover { color: #C8504A; }
    .breadcrumb .sep { opacity: 0.4; cursor: default; }
    h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(2rem, 4vw, 3rem); font-weight: 300; color: #1C1917; margin: 0;
    }
    h1 em { font-style: italic; color: #C8504A; }

    /* ── Body layout ──────────────────────────────────────── */
    .body {
      display: grid;
      grid-template-columns: 260px 1fr;
      max-width: 1400px; margin: 0 auto;
      padding: 40px 48px;
      align-items: start;
    }

    /* ── Sidebar ──────────────────────────────────────────── */
    .sidebar {
      position: sticky; top: 80px;
      padding-right: 36px;
      border-right: 1px solid #E8DDD4;
    }
    .filter-head {
      font-size: 11px; font-weight: 500; letter-spacing: 0.15em;
      text-transform: uppercase; color: #1C1917; margin-bottom: 20px;
      display: flex; justify-content: space-between; align-items: center;
    }
    .clear-btn {
      font-size: 10px; letter-spacing: 0.08em; color: #C8504A;
      background: none; border: none; cursor: pointer; font-family: inherit; padding: 0;
    }
    .clear-btn:hover { text-decoration: underline; }

    .filter-group { margin-bottom: 28px; }
    .group-label {
      font-size: 11px; font-weight: 500; letter-spacing: 0.12em;
      text-transform: uppercase; color: #6B6260; margin-bottom: 12px; display: block;
    }

    /* Category options */
    .cat-list { display: flex; flex-direction: column; gap: 8px; }
    .cat-opt {
      display: flex; align-items: center; gap: 8px;
      cursor: pointer; font-size: 13px; color: #6B6260; transition: color 0.2s;
    }
    .cat-opt:hover   { color: #1C1917; }
    .cat-opt.active  { color: #C8504A; font-weight: 500; }
    .cat-dot {
      width: 14px; height: 14px; border-radius: 50%;
      border: 1.5px solid #E8DDD4; flex-shrink: 0;
      display: grid; place-items: center; transition: border-color 0.2s;
    }
    .cat-opt.active .cat-dot { border-color: #C8504A; background: #C8504A; }
    .cat-dot::after {
      content: ''; width: 5px; height: 5px; border-radius: 50%;
      background: #fff; opacity: 0;
    }
    .cat-opt.active .cat-dot::after { opacity: 1; }

    /* Price */
    .price-range { display: flex; flex-direction: column; gap: 10px; }
    .price-labels { display: flex; justify-content: space-between; font-size: 12px; color: #6B6260; }
    input[type="range"] { width: 100%; accent-color: #C8504A; cursor: pointer; }

    /* Size */
    .size-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
    .size-chip {
      padding: 6px 4px; text-align: center; font-size: 11px; letter-spacing: 0.06em;
      border: 1px solid #E8DDD4; border-radius: 2px; cursor: pointer;
      color: #6B6260; transition: background 0.15s, color 0.15s, border-color 0.15s;
      user-select: none;
    }
    .size-chip:hover  { border-color: #C8504A; color: #C8504A; }
    .size-chip.active { background: #1C1917; color: #fff; border-color: #1C1917; }

    /* ── Main ─────────────────────────────────────────────── */
    .main { padding-left: 36px; }

    .toolbar {
      display: flex; gap: 14px; align-items: center;
      margin-bottom: 28px; flex-wrap: wrap;
    }
    .search-wrap { flex: 1; position: relative; min-width: 200px; }
    .search-wrap input {
      width: 100%; padding: 10px 14px 10px 36px;
      border: 1px solid #E8DDD4; border-radius: 2px;
      font-family: inherit; font-size: 13px; color: #1C1917;
      background: #fff; outline: none; transition: border-color 0.2s; box-sizing: border-box;
    }
    .search-wrap input:focus { border-color: #C8504A; }
    .search-wrap input::placeholder { color: #B8ABA8; }
    .search-icon {
      position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
      font-size: 14px; color: #B8ABA8; pointer-events: none;
    }

    select.sort {
      padding: 10px 14px; border: 1px solid #E8DDD4; border-radius: 2px;
      font-family: inherit; font-size: 13px; color: #6B6260;
      background: #fff; outline: none; cursor: pointer; transition: border-color 0.2s;
    }
    select.sort:focus { border-color: #C8504A; }

    .result-count { font-size: 12px; color: #B8ABA8; white-space: nowrap; }

    .filter-toggle {
      display: none; align-items: center; gap: 6px;
      padding: 10px 14px; border: 1px solid #E8DDD4; border-radius: 2px;
      font-family: inherit; font-size: 12px; letter-spacing: 0.08em;
      text-transform: uppercase; color: #6B6260; background: #fff; cursor: pointer;
    }

    /* Grid */
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
    .skeleton {
      aspect-ratio: 3/4; background: #F3EDE6; border-radius: 3px;
      animation: pulse 1.4s ease-in-out infinite;
    }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
    .empty {
      grid-column: 1/-1; text-align: center; padding: 60px 0; color: #B8ABA8;
    }
    .empty h3 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.4rem; font-weight: 300; margin-bottom: 8px; color: #6B6260;
    }

    /* Pagination */
    .pagination {
      display: flex; justify-content: center; gap: 8px;
      margin-top: 48px; flex-wrap: wrap;
    }
    .page-btn {
      width: 36px; height: 36px; border: 1px solid #E8DDD4; border-radius: 2px;
      background: none; font-family: inherit; font-size: 13px; color: #6B6260;
      cursor: pointer; display: grid; place-items: center;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
    }
    .page-btn:hover        { border-color: #C8504A; color: #C8504A; }
    .page-btn.active       { background: #1C1917; color: #fff; border-color: #1C1917; }
    .page-btn:disabled     { opacity: 0.35; cursor: not-allowed; }

    /* Responsive */
    @media (max-width: 1024px) { .grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 768px) {
      .page-header { padding: 32px 20px 24px; }
      .body        { grid-template-columns: 1fr; padding: 24px 20px; }
      .sidebar     { position: static; border-right: none; border-bottom: 1px solid #E8DDD4; padding: 0 0 24px; margin-bottom: 24px; display: none; }
      .sidebar.open{ display: block; }
      .filter-toggle { display: flex; }
      .main        { padding-left: 0; }
    }
    @media (max-width: 480px) { .grid { grid-template-columns: 1fr 1fr; gap: 14px; } }
  `;

  constructor() {
    super();
    const cfg          = SHOP_CONFIG;
    this._products     = [];
    this._filtered     = [];
    this._loading      = true;
    this._search       = '';
    this._category     = 'all';
    this._sort         = cfg.sortOptions[0].value;
    this._sizes        = new Set();
    this._maxPrice     = cfg.price.default;
    this._page         = 1;
    this._sidebarOpen  = false;
    this._searchTimer  = null;
  }

  async connectedCallback() {
    super.connectedCallback();
    /* Read URL params */
    const params = new URLSearchParams(location.search);
    if (params.get('category')) this._category = params.get('category');
    if (params.get('sort') === 'new') this._sort = 'newest';
    await this._loadProducts();
  }

  async _loadProducts() {
    this._loading = true;
    /* Phase 2: const data = await api.get('/products'); this._products = data.products; */
    await new Promise(r => setTimeout(r, 350));
    this._products = SHOP_CONFIG.products;
    this._loading  = false;
    this._applyFilters();
  }

  /* ── Filtering ───────────────────────────────────────────── */
  _applyFilters() {
    let list = [...this._products];

    if (this._category !== 'all')
      list = list.filter(p => p.category === this._category);

    if (this._search.trim())
      list = list.filter(p =>
        p.name.toLowerCase().includes(this._search.toLowerCase()) ||
        (p.subCategory ?? '').toLowerCase().includes(this._search.toLowerCase())
      );

    list = list.filter(p => (p.salePrice ?? p.basePrice) <= this._maxPrice);

    if (this._sizes.size > 0)
      list = list.filter(p => p.sizes?.some(s => this._sizes.has(s)));

    const sortMap = {
      'price-asc':  (a, b) => (a.salePrice ?? a.basePrice) - (b.salePrice ?? b.basePrice),
      'price-desc': (a, b) => (b.salePrice ?? b.basePrice) - (a.salePrice ?? a.basePrice),
      'rating':     (a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0),
      'newest':     (a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0),
    };
    if (sortMap[this._sort]) list.sort(sortMap[this._sort]);

    this._filtered = list;
    this._page = 1;
  }

  _onSearch(e) {
    clearTimeout(this._searchTimer);
    this._searchTimer = setTimeout(() => {
      this._search = e.target.value;
      this._applyFilters();
    }, 280);
  }

  _clearFilters() {
    this._category = 'all';
    this._search   = '';
    this._sizes    = new Set();
    this._maxPrice = SHOP_CONFIG.price.default;
    this._sort     = SHOP_CONFIG.sortOptions[0].value;
    this._applyFilters();
    const inp = this.shadowRoot?.querySelector('.search-wrap input');
    if (inp) inp.value = '';
  }

  _toggleSize(s) {
    const set = new Set(this._sizes);
    set.has(s) ? set.delete(s) : set.add(s);
    this._sizes = set;
    this._applyFilters();
  }

  /* ── Pagination ──────────────────────────────────────────── */
  get _totalPages() {
    return Math.max(1, Math.ceil(this._filtered.length / SHOP_CONFIG.perPage));
  }
  get _pageItems() {
    const start = (this._page - 1) * SHOP_CONFIG.perPage;
    return this._filtered.slice(start, start + SHOP_CONFIG.perPage);
  }

  _go(path) {
    window.dispatchEvent(new CustomEvent('app-navigate', {
      detail: { path }, bubbles: true, composed: true,
    }));
  }

  /* ── Render sidebar ──────────────────────────────────────── */
  _sidebar() {
    const cfg = SHOP_CONFIG;
    const sb  = cfg.sidebar;

    return html`
      <aside class="sidebar ${this._sidebarOpen ? 'open' : ''}">
        <div class="filter-head">
          ${sb.title}
          <button class="clear-btn" @click=${this._clearFilters}>${sb.clearAll}</button>
        </div>

        <!-- Category -->
        <div class="filter-group">
          <span class="group-label">${sb.labels.category}</span>
          <div class="cat-list">
            ${cfg.categories.map(c => html`
              <div
                class="cat-opt ${this._category === c.value ? 'active' : ''}"
                @click=${() => { this._category = c.value; this._applyFilters(); }}
              >
                <span class="cat-dot"></span>${c.label}
              </div>
            `)}
          </div>
        </div>

        <!-- Price -->
        <div class="filter-group">
          <span class="group-label">${sb.labels.price}</span>
          <div class="price-range">
            <div class="price-labels">
              <span>₹0</span>
              <span>₹${this._maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min=${cfg.price.min} max=${cfg.price.max} step=${cfg.price.step}
              .value=${this._maxPrice}
              @input=${e => { this._maxPrice = parseInt(e.target.value); this._applyFilters(); }}
            />
          </div>
        </div>

        <!-- Size -->
        <div class="filter-group">
          <span class="group-label">${sb.labels.size}</span>
          <div class="size-grid">
            ${cfg.sizes.map(s => html`
              <div
                class="size-chip ${this._sizes.has(s) ? 'active' : ''}"
                @click=${() => this._toggleSize(s)}
              >${s}</div>
            `)}
          </div>
        </div>
      </aside>
    `;
  }

  render() {
    const cfg   = SHOP_CONFIG;
    const tb    = cfg.toolbar;
    const ph    = cfg.page;
    const pages = Array.from({ length: this._totalPages }, (_, i) => i + 1);
    const count = this._filtered.length;

    return html`
      <!-- Header -->
      <div class="page-header">
        <div class="breadcrumb">
          ${ph.breadcrumb.map((b, i) => html`
            ${i > 0 ? html`<span class="sep">/</span>` : ''}
            <span @click=${() => b.path && this._go(b.path)}
                  style=${b.path ? '' : 'cursor:default'}>
              ${b.label}
            </span>
          `)}
        </div>
        <h1>${ph.heading.normal} <em>${ph.heading.em}</em></h1>
      </div>

      <div class="body">
        ${this._sidebar()}

        <div class="main">
          <!-- Toolbar -->
          <div class="toolbar">
            <button
              class="filter-toggle"
              @click=${() => this._sidebarOpen = !this._sidebarOpen}
            >
              ⊞ ${tb.filterToggle} ${this._sidebarOpen ? '▲' : '▼'}
            </button>

            <div class="search-wrap">
              <span class="search-icon">⌕</span>
              <input
                type="search"
                placeholder=${tb.searchPlaceholder}
                @input=${this._onSearch}
              />
            </div>

            <select class="sort" @change=${e => { this._sort = e.target.value; this._applyFilters(); }}>
              ${cfg.sortOptions.map(o => html`
                <option value=${o.value} ?selected=${this._sort === o.value}>
                  ${o.label}
                </option>
              `)}
            </select>

            <span class="result-count">
              ${count} ${tb.resultSuffix}${count !== 1 ? 's' : ''}
            </span>
          </div>

          <!-- Product grid -->
          <div class="grid">
            ${this._loading
              ? Array.from({ length: 6 }).map(() => html`<div class="skeleton"></div>`)
              : this._pageItems.length === 0
                ? html`
                    <div class="empty">
                      <h3>No results found</h3>
                      <p>Try adjusting your filters or search term.</p>
                    </div>
                  `
                : this._pageItems.map(p => html`
                    <product-card .product=${p}></product-card>
                  `)
            }
          </div>

          <!-- Pagination -->
          ${this._totalPages > 1 ? html`
            <div class="pagination">
              <button class="page-btn" ?disabled=${this._page === 1}
                @click=${() => this._page--}>‹</button>
              ${pages.map(n => html`
                <button
                  class="page-btn ${this._page === n ? 'active' : ''}"
                  @click=${() => this._page = n}
                >${n}</button>
              `)}
              <button class="page-btn" ?disabled=${this._page === this._totalPages}
                @click=${() => this._page++}>›</button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}

customElements.define('shop-page', ShopPage);
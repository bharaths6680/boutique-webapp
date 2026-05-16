import { LitElement, html, css } from 'lit';
import { RENTALS_CONFIG } from '../config/rentals.config.js';
import '../components/product-card.js';

/**
 * <rentals-page>
 * Fully config-driven rental listing + booking modal.
 * All labels, occasions, info strip, and products come from rentals.config.js.
 *
 * Phase 2: replace _load() body with:
 *   const data = await api.get('/rentals');
 *   this._products = data.products;
 */
export class RentalsPage extends LitElement {
  static properties = {
    _products:  { state: true },
    _occasion:  { state: true },
    _loading:   { state: true },
    _booking:   { state: true },
    _fromDate:  { state: true },
    _toDate:    { state: true },
    _size:      { state: true },
    _submitted: { state: true },
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
      font-size: 11px; letter-spacing: .08em; color: #B8ABA8;
      margin-bottom: 10px; display: flex; gap: 6px; align-items: center;
    }
    .breadcrumb span { cursor: pointer; transition: color .2s; }
    .breadcrumb span:hover { color: #C8504A; }
    .breadcrumb .sep { opacity: .4; cursor: default; }
    h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(2rem,4vw,3rem); font-weight: 300; color: #1C1917; margin: 0;
    }
    h1 em { font-style: italic; color: #C8504A; }
    .page-desc {
      font-size: 14px; color: #6B6260; margin-top: 10px;
      max-width: 540px; line-height: 1.7;
    }

    /* ── Info strip ───────────────────────────────────────── */
    .info-strip {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      background: #1C1917;
      padding: 32px 48px;
      gap: 24px;
    }
    .info-item { border-top: 1px solid rgba(255,255,255,.1); padding-top: 16px; }
    .info-label {
      font-size: 11px; letter-spacing: .12em; text-transform: uppercase;
      color: rgba(255,255,255,.4); margin-bottom: 6px;
    }
    .info-value { font-size: 13px; color: #fff; font-weight: 500; }

    /* ── Body ─────────────────────────────────────────────── */
    .body { max-width: 1296px; margin: 0 auto; padding: 40px 48px; }

    /* Occasion filter */
    .occ-filter { display: flex; gap: 10px; margin-bottom: 36px; flex-wrap: wrap; }
    .occ-btn {
      padding: 8px 20px; border: 1px solid #E8DDD4; border-radius: 2px;
      background: none; font-family: inherit; font-size: 12px;
      letter-spacing: .08em; text-transform: uppercase; color: #6B6260;
      cursor: pointer; transition: background .15s, color .15s, border-color .15s;
    }
    .occ-btn:hover  { border-color: #C8504A; color: #C8504A; }
    .occ-btn.active { background: #1C1917; color: #fff; border-color: #1C1917; }

    /* Product grid */
    .grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 28px; }

    .skeleton {
      aspect-ratio: 3/4; background: #F3EDE6; border-radius: 3px;
      animation: pulse 1.4s ease-in-out infinite;
    }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }

    /* Book button below each card */
    .book-btn {
      width: 100%; margin-top: 8px; padding: 11px;
      background: none; border: 1px solid #C8504A;
      color: #C8504A; font-family: inherit; font-size: 11px;
      letter-spacing: .1em; text-transform: uppercase;
      cursor: pointer; border-radius: 2px;
      transition: background .15s, color .15s;
    }
    .book-btn:hover { background: #C8504A; color: #fff; }

    /* ── Modal overlay ────────────────────────────────────── */
    .overlay {
      position: fixed; inset: 0;
      background: rgba(28,25,23,.55);
      z-index: 300;
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
    }
    .modal {
      background: #fff; border-radius: 4px;
      width: 100%; max-width: 520px;
      max-height: 90vh; overflow-y: auto;
    }
    .modal-head {
      display: flex; justify-content: space-between; align-items: center;
      padding: 20px 24px; border-bottom: 1px solid #E8DDD4;
    }
    .modal-head h3 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.3rem; font-weight: 300; margin: 0;
    }
    .close-btn {
      background: none; border: none; font-size: 20px;
      cursor: pointer; color: #6B6260; line-height: 1; padding: 4px;
    }
    .close-btn:hover { color: #1C1917; }

    .modal-body { padding: 24px; }

    .modal-label {
      font-size: 11px; font-weight: 500; letter-spacing: .1em;
      text-transform: uppercase; color: #6B6260;
      margin-bottom: 8px; display: block;
    }

    /* Date row */
    .date-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
    .date-row input {
      width: 100%; padding: 11px 14px;
      border: 1px solid #E8DDD4; border-radius: 2px;
      font-family: inherit; font-size: 14px; color: #1C1917;
      outline: none; box-sizing: border-box; transition: border-color .2s;
    }
    .date-row input:focus { border-color: #C8504A; }

    /* Size options */
    .size-opts { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
    .size-opt {
      padding: 8px 16px; border: 1px solid #E8DDD4; border-radius: 2px;
      font-size: 12px; cursor: pointer; color: #6B6260;
      transition: background .15s, color .15s, border-color .15s;
    }
    .size-opt:hover  { border-color: #C8504A; color: #C8504A; }
    .size-opt.active { background: #1C1917; color: #fff; border-color: #1C1917; }

    /* Summary */
    .summary { background: #F3EDE6; border-radius: 4px; padding: 20px; margin-bottom: 20px; }
    .sum-row {
      display: flex; justify-content: space-between;
      padding: 5px 0; font-size: 13px;
      border-bottom: 1px solid #E8DDD4;
    }
    .sum-row:last-child { border-bottom: none; font-weight: 500; color: #1C1917; }
    .sum-key { color: #6B6260; }

    /* Confirm button */
    .confirm-btn {
      width: 100%; padding: 14px; background: #C8504A; color: #fff; border: none;
      font-family: inherit; font-size: 12px; letter-spacing: .12em;
      text-transform: uppercase; cursor: pointer; border-radius: 2px;
      transition: background .2s;
    }
    .confirm-btn:hover { background: #1C1917; }

    /* Success */
    .success { text-align: center; padding: 40px 24px; }
    .success .icon { font-size: 40px; color: #2d6a4f; margin-bottom: 16px; }
    .success h3 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.5rem; font-weight: 300; margin-bottom: 10px;
    }
    .success p { font-size: 13px; color: #6B6260; line-height: 1.7; margin-bottom: 20px; }

    /* Responsive */
    @media (max-width: 900px) {
      .grid       { grid-template-columns: repeat(2,1fr); }
      .info-strip { grid-template-columns: repeat(2,1fr); padding: 28px 20px; }
    }
    @media (max-width: 600px) {
      .page-header { padding: 32px 20px 24px; }
      .body        { padding: 28px 20px; }
      .grid        { grid-template-columns: 1fr 1fr; gap: 14px; }
    }
  `;

  constructor() {
    super();
    this._products  = [];
    this._occasion  = 'All';
    this._loading   = true;
    this._booking   = null;
    this._fromDate  = '';
    this._toDate    = '';
    this._size      = '';
    this._submitted = false;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this._load();
  }

  async _load() {
    this._loading = true;
    /* Phase 2: const data = await api.get('/rentals'); this._products = data.products; */
    await new Promise(r => setTimeout(r, 300));
    this._products = RENTALS_CONFIG.products;
    this._loading  = false;
  }

  /* ── Helpers ─────────────────────────────────────────────── */
  get _filtered() {
    if (this._occasion === 'All') return this._products;
    return this._products.filter(p => p.occasion === this._occasion);
  }

  get _rentalDays() {
    if (!this._fromDate || !this._toDate) return 0;
    const diff = new Date(this._toDate) - new Date(this._fromDate);
    return Math.max(0, Math.ceil(diff / 86400000));
  }

  get _rentalTotal() {
    return this._booking ? this._booking.basePrice * this._rentalDays : 0;
  }

  _openBooking(p) {
    this._booking   = p;
    this._fromDate  = '';
    this._toDate    = '';
    this._size      = p.sizes?.[0] ?? '';
    this._submitted = false;
  }

  _closeBooking() { this._booking = null; }

  async _confirm() {
    if (!this._fromDate || !this._toDate || !this._size) {
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { msg: 'Please fill all booking details', type: 'error' },
      }));
      return;
    }
    /* Phase 2: await api.post('/rentals', { ... }) */
    await new Promise(r => setTimeout(r, 500));
    this._submitted = true;
    window.dispatchEvent(new CustomEvent('show-toast', {
      detail: { msg: 'Booking confirmed!', type: 'success' },
    }));
  }

  _go(path) {
    window.dispatchEvent(new CustomEvent('app-navigate', {
      detail: { path }, bubbles: true, composed: true,
    }));
  }

  /* ── Booking modal ───────────────────────────────────────── */
  _renderModal() {
    const cfg = RENTALS_CONFIG.booking;
    const p   = this._booking;

    return html`
      <div class="overlay" @click=${e => e.target === e.currentTarget && this._closeBooking()}>
        <div class="modal">
          <div class="modal-head">
            <h3>${this._submitted ? cfg.successTitle : `${cfg.title} — ${p.name}`}</h3>
            <button class="close-btn" @click=${this._closeBooking}>✕</button>
          </div>

          <div class="modal-body">
            ${this._submitted ? html`
              <div class="success">
                <div class="icon">✓</div>
                <h3>${cfg.successTitle}</h3>
                <p>${cfg.successMsg}</p>
                <button class="confirm-btn" @click=${this._closeBooking}>
                  ${cfg.closeBtn}
                </button>
              </div>
            ` : html`

              <!-- Dates -->
              <span class="modal-label">${cfg.datesLabel}</span>
              <div class="date-row">
                <div>
                  <span class="modal-label" style="font-size:10px">${cfg.dateFrom}</span>
                  <input type="date" .value=${this._fromDate}
                    @input=${e => this._fromDate = e.target.value} />
                </div>
                <div>
                  <span class="modal-label" style="font-size:10px">${cfg.dateTo}</span>
                  <input type="date" .value=${this._toDate}
                    @input=${e => this._toDate = e.target.value} />
                </div>
              </div>

              <!-- Size -->
              <span class="modal-label">${cfg.sizeLabel}</span>
              <div class="size-opts">
                ${p.sizes?.map(s => html`
                  <div
                    class="size-opt ${this._size === s ? 'active' : ''}"
                    @click=${() => this._size = s}
                  >${s}</div>
                `)}
              </div>

              <!-- Summary -->
              ${this._rentalDays > 0 ? html`
                <div class="summary">
                  ${[
                    [cfg.summaryLabels.pricePerDay, `₹${p.basePrice}`],
                    [cfg.summaryLabels.days,        `${this._rentalDays} days`],
                    [cfg.summaryLabels.rentalFee,   `₹${this._rentalTotal.toLocaleString('en-IN')}`],
                    [cfg.summaryLabels.deposit,     `₹${(p.deposit ?? 0).toLocaleString('en-IN')}`],
                    [cfg.summaryLabels.total,       `₹${(this._rentalTotal + (p.deposit ?? 0)).toLocaleString('en-IN')}`],
                  ].map(([k, v]) => html`
                    <div class="sum-row">
                      <span class="sum-key">${k}</span>
                      <span>${v}</span>
                    </div>
                  `)}
                </div>
              ` : ''}

              <button class="confirm-btn" @click=${this._confirm}>
                ${cfg.confirmBtn}
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const cfg = RENTALS_CONFIG;

    return html`
      <!-- Page header -->
      <div class="page-header">
        <div class="breadcrumb">
          ${cfg.page.breadcrumb.map((b, i) => html`
            ${i > 0 ? html`<span class="sep">/</span>` : ''}
            <span
              @click=${() => b.path && this._go(b.path)}
              style=${b.path ? '' : 'cursor:default'}
            >${b.label}</span>
          `)}
        </div>
        <h1>${cfg.page.heading.normal} <em>${cfg.page.heading.em}</em></h1>
        <p class="page-desc">${cfg.page.description}</p>
      </div>

      <!-- Info strip -->
      <div class="info-strip">
        ${cfg.infoStrip.map(item => html`
          <div class="info-item">
            <div class="info-label">${item.label}</div>
            <div class="info-value">${item.value}</div>
          </div>
        `)}
      </div>

      <!-- Body -->
      <div class="body">

        <!-- Occasion filter -->
        <div class="occ-filter">
          ${cfg.occasions.map(o => html`
            <button
              class="occ-btn ${this._occasion === o ? 'active' : ''}"
              @click=${() => this._occasion = o}
            >${o}</button>
          `)}
        </div>

        <!-- Grid -->
        <div class="grid">
          ${this._loading
            ? Array.from({ length: 6 }).map(() => html`<div class="skeleton"></div>`)
            : this._filtered.map(p => html`
                <div>
                  <product-card .product=${p}></product-card>
                  <button class="book-btn" @click=${() => this._openBooking(p)}>
                    Book Now — ₹${p.basePrice}/day
                  </button>
                </div>
              `)
          }
        </div>
      </div>

      <!-- Booking modal -->
      ${this._booking ? this._renderModal() : ''}
    `;
  }
}

customElements.define('rentals-page', RentalsPage);
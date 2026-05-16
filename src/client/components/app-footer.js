import { LitElement, html, css } from 'lit';
import { FOOTER_CONFIG } from '../config/footer.config.js';

/**
 * <app-footer>
 * Config-driven footer with inline SVG social icons.
 * No external font needed — SVGs work inside shadow DOM.
 */
export class AppFooter extends LitElement {

  /* ── Inline SVG icons — keyed by label ─────────────────────
     These are simple brand-accurate outlines at 18×18.          */
  static ICONS = {
    Instagram: html`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>`,

    Facebook: html`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>`,

    WhatsApp: html`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>`,

    YouTube: html`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
    </svg>`,

    Pinterest: html`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.62-.31-1.55c0-1.45.84-2.54 1.89-2.54.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.87 3.48-.25 1.04.52 1.88 1.54 1.88 1.85 0 3.09-2.37 3.09-5.17 0-2.14-1.44-3.63-3.5-3.63-2.38 0-3.78 1.79-3.78 3.63 0 .72.27 1.49.62 1.91.07.08.08.15.06.23-.06.26-.2.84-.23.96-.04.15-.13.19-.3.11-1.12-.52-1.82-2.17-1.82-3.49 0-2.84 2.06-5.44 5.94-5.44 3.12 0 5.54 2.22 5.54 5.19 0 3.1-1.95 5.59-4.66 5.59-.91 0-1.76-.47-2.06-1.03l-.56 2.09c-.2.78-.75 1.75-1.12 2.34.85.26 1.75.4 2.68.4 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
    </svg>`,
  };

  static styles = css`
    :host { display: block; }

    footer {
      background: #1C1917;
      color: rgba(255, 255, 255, 0.55);
      font-family: 'DM Sans', system-ui, sans-serif;
      font-size: 14px;
    }

    /* ── Top grid ─────────────────────────────────────────── */
    .footer-top {
      padding: 60px 48px 48px;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 40px;
      min-width: 0;
    }
    .footer-top > * { min-width: 0; }

    /* ── Brand ────────────────────────────────────────────── */
    .logo-wrap {
      display: inline-block;
      cursor: pointer;
      margin-bottom: 16px;
    }
    .logo-img {
      height: 48px; width: auto; display: block; object-fit: contain;
      filter: brightness(1) invert(0);
      opacity: 0.85;
      transition: opacity 0.2s;
    }
    .logo-img:hover { opacity: 0.65; }
    .logo-text {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.25rem; font-style: italic; color: #fff;
      cursor: pointer; display: none;
    }
    .logo-text .accent { color: #E8857F; }

    .brand-desc {
      font-size: 13px; line-height: 1.75;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 22px; max-width: 260px;
    }

    /* ── Social icons ─────────────────────────────────────── */
    .socials { display: flex; flex-wrap: wrap; gap: 8px; }

    .social-btn {
      width: 36px; height: 36px;
      border-radius: 2px;
      border: 1px solid rgba(255, 255, 255, 0.14);
      background: none;
      color: rgba(255, 255, 255, 0.55);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: border-color 0.2s, color 0.2s, background 0.2s;
      /* SVGs inherit currentColor */
    }
    .social-btn:hover {
      border-color: #C8504A;
      color: #E8857F;
      background: rgba(200, 80, 74, 0.1);
    }
    .social-btn svg {
      display: block;
      flex-shrink: 0;
    }

    /* ── Link columns ─────────────────────────────────────── */
    .col-title {
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.15em; text-transform: uppercase;
      color: #fff; margin-bottom: 16px;
    }
    .link-list {
      list-style: none; padding: 0; margin: 0;
      display: flex; flex-direction: column; gap: 10px;
    }
    .link-list li a {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.5);
      text-decoration: none;
      cursor: pointer;
      transition: color 0.2s;
      display: block;
    }
    .link-list li a:hover { color: #fff; }

    /* ── Bottom bar ───────────────────────────────────────── */
    .footer-bottom {
      padding: 20px 48px 28px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }
    .copyright { font-size: 12px; color: rgba(255, 255, 255, 0.35); }

    .pay-row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
    .pay-label { font-size: 11px; color: rgba(255, 255, 255, 0.35); margin-right: 2px; }
    .pay-badge {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 2px;
      padding: 3px 9px;
      font-size: 11px;
      letter-spacing: 0.03em;
      color: rgba(255, 255, 255, 0.45);
    }

    /* ── Responsive ───────────────────────────────────────── */
    @media (max-width: 1024px) {
      .footer-top { grid-template-columns: 1fr 1fr 1fr; }
      .brand-col  { grid-column: 1 / -1; }
    }
    @media (max-width: 768px) {
      .footer-top    { grid-template-columns: 1fr 1fr; padding: 40px 24px 32px; }
      .brand-col     { grid-column: 1 / -1; }
      .footer-bottom { padding: 16px 24px 24px; flex-direction: column; align-items: flex-start; }
    }
    @media (max-width: 480px) {
      .footer-top    { grid-template-columns: 1fr; padding: 32px 20px 28px; }
      .footer-bottom { padding: 16px 20px 20px; }
    }
  `;

  _go(path) {
    window.dispatchEvent(new CustomEvent('app-navigate', {
      detail: { path }, bubbles: true, composed: true,
    }));
  }

  _onLogoError(e) {
    e.target.style.display = 'none';
    const text = this.shadowRoot?.querySelector('.logo-text');
    if (text) text.style.display = 'block';
  }

  render() {
    const c = FOOTER_CONFIG;

    return html`
      <footer>
        <div class="footer-top">

          <!-- Brand column -->
          <div class="brand-col">
            <div class="logo-wrap" @click=${() => this._go('/')}>
              <img
                class="logo-img"
                src=${c.brand.logoSrc}
                alt=${c.brand.logoAlt}
                @error=${this._onLogoError}
              />
              <span class="logo-text">
                Winter <span class="accent">Flower</span> Designs
              </span>
            </div>

            <p class="brand-desc">${c.brand.description}</p>

            <div class="socials">
              ${c.social.map(s => html`
                <a
                  class="social-btn"
                  href=${s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label=${s.label}
                  title=${s.label}
                >
                  ${AppFooter.ICONS[s.label] ?? html`<span style="font-size:11px">${s.label.slice(0,2)}</span>`}
                </a>
              `)}
            </div>
          </div>

          <!-- Link columns -->
          ${c.columns.map(col => html`
            <div>
              <div class="col-title">${col.title}</div>
              <ul class="link-list">
                ${col.links.map(link => html`
                  <li><a @click=${() => this._go(link.path)}>${link.label}</a></li>
                `)}
              </ul>
            </div>
          `)}

        </div>

        <!-- Bottom bar -->
        <div class="footer-bottom">
          <span class="copyright">${c.copyright}</span>
          <div class="pay-row">
            <span class="pay-label">Payments:</span>
            ${c.payments.map(p => html`<span class="pay-badge">${p}</span>`)}
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('app-footer', AppFooter);
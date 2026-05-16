import { LitElement, html, css } from 'lit';
import { NAVBAR_CONFIG } from '../config/navbar.config.js';
/**
 * <app-navbar>
 * Fixed top navigation bar.
 * - Logo: "Winter Flower Designs" (italic, serif)
 * - Links: SHOP | CUSTOM | RENTALS | OFFERS | CONTACT
 * - Right: LOGIN button
 * - Compact shadow on scroll
 * - Mobile: hamburger menu
 *
 * Fires 'app-navigate' CustomEvent on every link click.
 */
export class AppNavbar extends LitElement {
  static properties = {
    _scrolled: { state: true },
    _menuOpen: { state: true },
    _cartCount: { state: true },
  };

  static styles = css`
    :host {
      display: block;
    }

    /* ── Bar ─────────────────────────────────────────────── */
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 200;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 48px;
      background: rgba(250, 247, 244, 0.96);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid transparent;
      transition: border-color 0.3s, box-shadow 0.3s;
    }
    nav.scrolled {
      border-bottom-color: rgba(200, 80, 74, 0.12);
      box-shadow: 0 2px 16px rgba(28, 25, 23, 0.06);
    }

     /* ── Logo ────────────────────────────────────────────── */
    .logo {
      cursor: pointer;
      display: flex;
      align-items: center;
      flex-shrink: 0;
      user-select: none;
    }
    .logo-img {
      /* Show logo at a comfortable navbar height */
      height: 44px;
      width: auto;
      object-fit: contain;
      /* The logo has a cream/off-white background — mix-blend-mode
         lets it sit cleanly on the ivory navbar without a white box */
      mix-blend-mode: multiply;
      transition: opacity 0.2s;
    }
    .logo-img:hover { opacity: 0.82; }

    /* Text fallback (shown if image 404s) */
    .logo-fallback {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.15rem;
      font-style: italic;
      letter-spacing: 0.02em;
      color: #1C1917;
      display: none;   /* shown via JS onerror */
    }
    .logo-fallback .flower { color: #C8504A; }

    /* ── Links ────────────────────────────────────────────── */
    .nav-links {
      display: flex;
      gap: 36px;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .nav-links a {
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #6B6260;
      cursor: pointer;
      text-decoration: none;
      position: relative;
      transition: color 0.2s;
    }
    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -3px; left: 0;
      width: 0; height: 1px;
      background: #C8504A;
      transition: width 0.3s ease;
    }
    .nav-links a:hover        { color: #1C1917; }
    .nav-links a:hover::after { width: 100%; }

    /* ── Right actions ────────────────────────────────────── */
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .login-btn {
      background: #1C1917;
      color: #fff;
      border: none;
      padding: 9px 22px;
      font-family: inherit;
      font-size: 12px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      cursor: pointer;
      border-radius: 2px;
      transition: background 0.2s, transform 0.15s;
    }
    .login-btn:hover {
      background: #C8504A;
      transform: translateY(-1px);
    }

    /* ── Hamburger (mobile only) ──────────────────────────── */
    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
    }
    .hamburger span {
      display: block;
      width: 22px;
      height: 1.5px;
      background: #1C1917;
      transition: transform 0.2s, opacity 0.2s;
    }

    /* ── Mobile drawer ────────────────────────────────────── */
    .mobile-menu {
      display: none;
      position: fixed;
      top: 64px; left: 0; right: 0;
      background: #FAF7F4;
      border-top: 1px solid #E8DDD4;
      padding: 24px 24px 32px;
      z-index: 199;
      flex-direction: column;
      gap: 20px;
    }
    .mobile-menu.open { display: flex; }
    .mobile-menu a {
      font-size: 13px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #6B6260;
      cursor: pointer;
      text-decoration: none;
    }
    .mobile-menu a:hover { color: #C8504A; }
    .mobile-menu .login-btn { align-self: flex-start; }

    /* ── Responsive ───────────────────────────────────────── */
    @media (max-width: 768px) {
      nav          { padding: 0 20px; }
      .nav-links   { display: none; }
      .login-btn   { display: none; }
      .hamburger   { display: flex; }
    }
  `;

  constructor() {
    super();
    this._scrolled = false;
    this._menuOpen = false;
    this._cartCount = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this._onScroll = () => { this._scrolled = window.scrollY > 30; };
    window.addEventListener('scroll', this._onScroll, { passive: true });

    /* Sync cart count from localStorage */
    this._cartCount = parseInt(localStorage.getItem('b_cart') || '0');
    window.addEventListener('cart-update', e => { this._cartCount = e.detail.count; });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this._onScroll);
  }

  /* ── Helpers ─────────────────────────────────────────────── */
  _go(path) {
    this._menuOpen = false;
    window.dispatchEvent(new CustomEvent('app-navigate', {
      detail: { path },
      bubbles: true,
      composed: true,
    }));
  }

  _toggleMenu() {
    this._menuOpen = !this._menuOpen;
  }

  /* ── Links config ────────────────────────────────────────── */
  get _links() {
    return NAVBAR_CONFIG.links;
    // return [
    //   { label: 'Shop', path: '/shop' },
    //   { label: 'Custom', path: '/custom' },
    //   { label: 'Rentals', path: '/rentals' },
    //   { label: 'Offers', path: '/offers' },
    //   { label: 'Contact', path: '/contact' },
    // ];
  }

  /* ── Render ──────────────────────────────────────────────── */
  render() {
    const cfg = NAVBAR_CONFIG;
    return html`
      <nav class=${this._scrolled ? 'scrolled' : ''}>

        <!-- Logo -->
        <div class="logo" @click=${() => this._go('/')}>
          <img
            class="logo-img"
            src="${cfg.brand.logoSrc}"
            alt="${cfg.brand.logoAlt}"
            @error=${e => onImgError(e, 'generic')}
          />
          <!-- Text fallback (hidden until image 404) -->
          <span class="logo-fallback">
            ${cfg.brand.fallbackText}
          </span>
        </div>

        <!-- Desktop links -->
        <ul class="nav-links">
          ${this._links.map(l => html`
            <li>
              <a @click=${() => this._go(l.path)}>${l.label}</a>
            </li>
          `)}
        </ul>

        <!-- Right actions -->
        <div class="nav-actions">
          <!--<button class="login-btn" @click=${() => this._go('/login')}>
            Login
          </button>-->
          <button class="hamburger" aria-label="Toggle menu" @click=${this._toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

      </nav>

      <!-- Mobile drawer -->
      <div class="mobile-menu ${this._menuOpen ? 'open' : ''}">
        ${this._links.map(l => html`
          <a @click=${() => this._go(l.path)}>${l.label}</a>
        `)}
        <button class="login-btn" @click=${() => this._go('/login')}>Login</button>
      </div>
    `;
  }
}

customElements.define('app-navbar', AppNavbar);
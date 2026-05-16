// import { LitElement, html, css } from 'lit';
// import './components/app-navbar.js';
// import './components/app-footer.js';
// import './components/toast-notification.js';
// import './components/whatsapp-fab.js';
// import './components/coming-soon-page.js';
// /**
//  * <boutique-app>
//  * Root shell — owns the router.
//  * Listens for 'app-navigate' CustomEvent bubbling from any child.
//  * Lazy-imports page components on first visit.
//  *
//  * Usage in index.html:
//  *   <script type="module" src="/src/client/root.js"></script>
//  *   <root-element></root-element>
//  */
// export class RootElement extends LitElement {
//   static properties = {
//     _page: { state: true },
//   };

//   static styles = css`
//     :host {
//       display: block;
//       min-height: 100vh;
//       width: 100%;
//     }
//     main {
//       /* offset for fixed nav (64px) */
//       padding-top: 64px;
//       min-height: calc(100vh - 64px);
//     }
//   `;

//   /* ── Route map ─────────────────────────────────────────── */
//   static routes = {
//     '/':         () => import('./pages/home-page.js').then(() => html`<home-page></home-page>`),
//     '/shop':     () => import('./pages/shop-page.js').then(() => html`<shop-page></shop-page>`).catch(() => html`<coming-soon-page label="Shop"></coming-soon-page>`),
//     '/custom':   () => html`<coming-soon-page label="Custom Orders"></coming-soon-page>`,
//     '/rentals':  () => html`<coming-soon-page label="Rentals"></coming-soon-page>`,
//     '/offers':   () => html`<coming-soon-page label="Offers"></coming-soon-page>`,
//     '/contact':  () => html`<coming-soon-page label="Contact"></coming-soon-page>`,
//     '/cart':     () => html`<coming-soon-page label="Cart"></coming-soon-page>`,
//     '/login':    () => html`<coming-soon-page label="Login"></coming-soon-page>`,
//     '/account':  () => html`<coming-soon-page label="Account"></coming-soon-page>`,
//   };

//   constructor() {
//     super();
//     this._page = null;
//   }

//   connectedCallback() {
//     super.connectedCallback();

//     /* Listen for navigation events from any child component */
//     window.addEventListener('app-navigate', this._onNavigate.bind(this));

//     /* Handle browser back / forward */
//     window.addEventListener('popstate', () => this._load(location.pathname));

//     /* Initial load — works on both http:// and file:// */
//     const isFile = location.protocol === 'file:';
//     this._load(isFile ? '/' : location.pathname);
//   }

//   disconnectedCallback() {
//     super.disconnectedCallback();
//     window.removeEventListener('app-navigate', this._onNavigate.bind(this));
//   }

//   /* ── Navigation handler ────────────────────────────────── */
//   _onNavigate(e) {
//     const path = e.detail?.path ?? '/';
//     try { history.pushState({}, '', path); } catch (_) {}
//     this._load(path);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }

//   /* ── Route resolver ────────────────────────────────────── */
//   async _load(rawPath) {
//     const path = rawPath.split('?')[0];

//     /* On file:// any .html filename maps to home */
//     const isHome = path === '/' || path === '' || path.endsWith('.html');

//     const resolver = isHome
//       ? RootElement.routes['/']
//       : BoutiqueApp.routes[path] ?? this._notFound(path);

//     this._page = await resolver();
//   }

//   _notFound(path) {
//     return () => html`<coming-soon-page label="${path.replace('/', '')}"></coming-soon-page>`;
//   }

//   /* ── Render ────────────────────────────────────────────── */
//   render() {
//     return html`
//       <app-navbar></app-navbar>

//       <main role="main">
//         ${this._page}
//       </main>

//       <app-footer></app-footer>

//       <whatsapp-fab></whatsapp-fab>
//       <toast-notification></toast-notification>
//     `;
//   }
// }

// customElements.define('root-element', RootElement);

// /* ── Register shared layout components eagerly ─────────────
//    These are needed on every page so no reason to lazy-load. */




import { LitElement, html, css } from 'lit';

/* Eagerly import layout components */
import './components/app-navbar.js';
import './components/app-footer.js';
import './components/toast-notification.js';
import './components/whatsapp-fab.js';
import './components/coming-soon-page.js';

/**
 * <boutique-app>
 * Root shell — owns the router.
 *
 * ROUTING STRATEGY
 * ─────────────────
 * Full page routes  →  /shop | /custom | /rentals | /offers | /contact
 *                       /cart | /login  | /account
 *
 * Hash anchors      →  /#hero | /#categories | /#featured
 *                       /#how-it-works | /#testimonials | /#newsletter
 *                       (homepage sections only)
 *
 * Navigation
 * ──────────
 * Any component fires:
 *   window.dispatchEvent(new CustomEvent('app-navigate', {
 *     detail: { path: '/shop' }        // full page
 *     detail: { path: '/#featured' }   // hash scroll
 *   }))
 *
 * Active state
 * ────────────
 * Broadcasts 'route-changed' { path, hash }
 * so app-navbar can highlight the correct link.
 */
export class RootElement extends LitElement {
  static properties = {
    _page:    { state: true },
    _loading: { state: true },
  };

  static styles = css`
    :host { display: block; min-height: 100vh; width: 100%; }
    main  { padding-top: 64px; min-height: calc(100vh - 64px); }

    .page-enter {
      animation: pageFade 0.3s ease forwards;
    }
    @keyframes pageFade {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;

  /* ── Route definitions ─────────────────────────────────── */
  static ROUTES = {
    '/':        () => import('./pages/home-page.js').then(() => html`<home-page></home-page>`),
    '/shop':    () => import('./pages/shop-page.js').then(() => html`<shop-page></shop-page>`).catch(() => html`<coming-soon-page label="Shop"></coming-soon-page>`),
    '/custom':  () => import('./pages/custom-page.js').then(() => html`<custom-page></custom-page>`).catch(() => html`<coming-soon-page label="Custom Orders"></coming-soon-page>`),
    '/rentals': () => import('./pages/rentals-page.js').then(() => html`<rentals-page></rentals-page>`).catch(() => html`<coming-soon-page label="Rentals"></coming-soon-page>`),
    // '/offers':  () => import('./pages/offers-page.js').then(() => html`<offers-page></offers-page>`).catch(() => html`<coming-soon-page label="Offers"></coming-soon-page>`),
    // '/contact': () => import('./pages/contact-page.js').then(() => html`<contact-page></contact-page>`).catch(() => html`<coming-soon-page label="Contact"></coming-soon-page>`),
    // '/cart':    () => import('./pages/cart-page.js').then(() => html`<cart-page></cart-page>`).catch(() => html`<coming-soon-page label="Cart"></coming-soon-page>`),
    // '/login':   () => import('./pages/login-page.js').then(() => html`<login-page></login-page>`).catch(() => html`<coming-soon-page label="Login"></coming-soon-page>`),
    // '/account': () => import('./pages/account-page.js').then(() => html`<account-page></account-page>`).catch(() => html`<coming-soon-page label="Account"></coming-soon-page>`),
  };

  constructor() {
    super();
    this._page    = null;
    this._loading = false;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('app-navigate', this._onNavigate.bind(this));
    window.addEventListener('popstate',     this._onPopState.bind(this));
    this._initialLoad();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('app-navigate', this._onNavigate.bind(this));
    window.removeEventListener('popstate',     this._onPopState.bind(this));
  }

  /* ── Initial page load ─────────────────────────────────── */
  _initialLoad() {
    if (location.protocol === 'file:') {
      this._load('/');
      return;
    }
    this._load(location.pathname || '/', location.hash || '');
  }

  /* ── Handle app-navigate event ─────────────────────────── */
  _onNavigate(e) {
    const raw = e.detail?.path ?? '/';

    /* Split path and hash */
    let path = raw, hash = '';
    if (raw.includes('#')) {
      const idx = raw.indexOf('#');
      path = raw.slice(0, idx) || '/';
      hash = raw.slice(idx);          // e.g. "#featured"
    }

    /* Same-page hash scroll — no full reload */
    const samePage = path === '/' && location.pathname === '/';
    if (hash && samePage) {
      try { history.pushState({}, '', path + hash); } catch (_) {}
      this._scrollToHash(hash);
      this._broadcastRoute(path, hash);
      return;
    }

    try { history.pushState({}, '', path + hash); } catch (_) {}
    this._load(path, hash);
  }

  /* ── Handle browser back / forward ─────────────────────── */
  _onPopState() {
    this._load(location.pathname || '/', location.hash || '');
  }

  /* ── Load a page component ─────────────────────────────── */
  async _load(path, hash = '') {
    this._loading = true;
    window.scrollTo({ top: 0, behavior: 'instant' });

    const isHome   = path === '/' || path === '' || path.endsWith('.html');
    const key      = isHome ? '/' : path;
    const resolver = RootElement.ROUTES[key]
                  ?? (() => Promise.resolve(html`<coming-soon-page label="${key.replace('/', '')}"></coming-soon-page>`));

    this._page    = await resolver();
    this._loading = false;

    this._broadcastRoute(isHome ? '/' : path, hash);

    /* Scroll to section after render */
    if (hash) {
      await this.updateComplete;
      requestAnimationFrame(() => this._scrollToHash(hash));
    }
  }

  /* ── Smooth-scroll to a section by hash ────────────────── */
  _scrollToHash(hash) {
    const id = hash.replace('#', '');
    setTimeout(() => {
      const el = document.getElementById(id)
               ?? document.querySelector(`[data-section="${id}"]`);
      if (!el) return;
      const NAV_HEIGHT = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 80);
  }

  /* ── Tell navbar which route is active ─────────────────── */
  _broadcastRoute(path, hash = '') {
    window.dispatchEvent(new CustomEvent('route-changed', {
      detail: { path, hash },
    }));
  }

  render() {
    return html`
      <app-navbar></app-navbar>
      <main role="main">
        <div class="${this._loading ? '' : 'page-enter'}">
          ${this._page}
        </div>
      </main>
      <app-footer></app-footer>
      <whatsapp-fab></whatsapp-fab>
      <toast-notification></toast-notification>
    `;
  }
}

customElements.define('root-element', RootElement);


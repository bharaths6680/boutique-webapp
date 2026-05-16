import { LitElement, html, css } from 'lit';
import { CATEGORIES_CONFIG } from '../config/categories.config.js';
import { onImgError } from '../config/images.config.js';

/**
 * <category-grid>
 * Config-driven category cards.
 * Images come from categories.config.js → images.config.js.
 * Shows gradient placeholder when image is missing or fails.
 */
export class CategoryGrid extends LitElement {
  static properties = {
    _imgErrors: { state: true },
  };

  /* Placeholder gradients per category index */
  static PH_GRADIENTS = [
    'linear-gradient(160deg, #F2DAD8 0%, #E8DDD4 100%)',
    'linear-gradient(160deg, #F3EDE6 0%, #F2DAD8 100%)',
    'linear-gradient(160deg, #E8DDD4 0%, #F3EDE6 100%)',
  ];

  static styles = css`
    :host { display: block; }

    section { padding: 96px 48px; }
    .inner  { max-width: 1200px; margin: 0 auto; }

    .tag {
      display: inline-flex; align-items: center; gap: 10px;
      font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
      color: #C8504A; margin-bottom: 14px;
    }
    .tag::before { content: ''; width: 28px; height: 1px; background: #C8504A; }

    h2 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 300; line-height: 1.15; color: #1C1917; margin: 0 0 52px;
    }
    h2 em { font-style: italic; color: #C8504A; }

    .grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr 1fr;
      gap: 20px;
    }

    .card { position: relative; overflow: hidden; border-radius: 4px; cursor: pointer; }

    .img-wrap { position: relative; overflow: hidden; width: 100%; }

    .img-wrap img {
      width: 100%; height: 100%; object-fit: cover; display: block;
      transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
    }
    .card:hover .img-wrap img { transform: scale(1.05); }

    .placeholder {
      width: 100%; min-height: 260px; height: 100%;
      display: flex; align-items: center; justify-content: center;
      font-size: 40px; color: #C8504A; opacity: 0.3;
      transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
    }
    .card:hover .placeholder { transform: scale(1.04); }

    .overlay {
      position: absolute; bottom: 0; left: 0; right: 0;
      padding: 28px 24px;
      background: linear-gradient(to top, rgba(28,25,23,.75) 0%, transparent 100%);
      color: #fff;
    }
    .overlay h3 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.55rem; font-weight: 300; font-style: italic; margin: 0 0 4px;
    }
    .overlay p { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.72; margin: 0; }

    .arrow {
      position: absolute; top: 18px; right: 18px;
      width: 34px; height: 34px; border-radius: 50%;
      background: rgba(255,255,255,.15); backdrop-filter: blur(4px);
      display: grid; place-items: center;
      font-size: 16px; color: #fff;
      opacity: 0; transform: translateY(6px);
      transition: opacity 0.28s, transform 0.28s cubic-bezier(0.16,1,0.3,1);
    }
    .card:hover .arrow { opacity: 1; transform: translateY(0); }

    @media (max-width: 900px)  { .grid { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 560px)  { section { padding: 64px 20px; } .grid { grid-template-columns: 1fr; } }
  `;

  constructor() {
    super();
  }

  _go(path) {
    window.dispatchEvent(new CustomEvent('app-navigate', { detail: { path }, bubbles: true, composed: true }));
  }

  render() {
    const { section, items } = CATEGORIES_CONFIG;

    return html`
      <section>
        <div class="inner">
          <div class="tag">${section.tag}</div>
          <h2>${section.title} <em>${section.titleEm}</em></h2>

          <div class="grid">
            ${items.map((cat, i) => html`
              <div
                class="card"
                role="link" tabindex="0"
                aria-label="Shop ${cat.label}"
                @click=${() => this._go(cat.path)}
                @keydown=${e => e.key === 'Enter' && this._go(cat.path)}
              >
                <div class="img-wrap" style="aspect-ratio: ${cat.aspect}">
                  ${cat.imgSrc ? html`
                    <img
                      src=${cat.imgSrc}
                      alt=${cat.imgAlt}
                      loading="lazy"
                      @error=${e => onImgError(e, 'category')}
                    />
                  ` : html`
                    <div
                      class="placeholder"
                      style="background: ${CategoryGrid.PH_GRADIENTS[i % 3]}"
                    >❋</div>
                  `}
                </div>
                <div class="overlay">
                  <h3>${cat.label}</h3>
                  <p>${cat.sub}</p>
                </div>
                <div class="arrow" aria-hidden="true">→</div>
              </div>
            `)}
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('category-grid', CategoryGrid);
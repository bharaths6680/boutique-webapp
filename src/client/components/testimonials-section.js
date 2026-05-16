import { LitElement, html, css } from 'lit';
import { TESTIMONIALS_CONFIG } from '../config/testimonials.config.js';
import { onImgError } from '../config/images.config.js';

/**
 * <testimonials-section>
 * Config-driven customer review cards.
 * Shows real avatar image if available, falls back to initials circle.
 */
export class TestimonialsSection extends LitElement {
  static properties = {
    _avatarErrors: { state: true },
  };

  static styles = css`
    :host { display: block; 
    --rose: #C8504A;
    --rose-mid: #E8857F;
    --rose-light: #F2DAD8;
    --ivory: #FAF7F4;
    --cream: #F3EDE6;
    --warm: #E8DDD4;
    --charcoal: #1C1917;
    --stone: #6B6260;
    --mist: #B8ABA8;
    --gold: #C9A96E;
    --font-d: 'Cormorant Garamond', Georgia, serif;
    --font-b: 'DM Sans', system-ui, sans-serif;
    --ease: cubic-bezier(0.16, 1, 0.3, 1);
    --r: 2px; 
    }

    section { padding: 96px 48px; background: #F3EDE6; }

    .center { text-align: center; margin-bottom: 56px; }

    .tag {
      display: inline-flex; align-items: center; justify-content: center; gap: 10px;
      font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
      color: #C8504A; margin-bottom: 14px;
    }
    .tag::before { content: ''; width: 28px; height: 1px; background: #C8504A; }

    h2 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(2rem, 4vw, 3rem); font-weight: 300; color: #1C1917; margin: 0;
    }
    h2 em { font-style: italic; color: #C8504A; }

    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1200px; margin: 0 auto; }

    .card {
      background: #FAF7F4; padding: 32px 28px; border-radius: 4px;
      border: 1px solid #E8DDD4; position: relative;
    }
    .card::before {
      content: '\u201C'; position: absolute; top: 18px; right: 24px;
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 2.8rem; color: #F2DAD8; line-height: 1;
    }

    .stars { display: flex; gap: 3px; margin-bottom: 14px; }
    .star  { font-size: 13px; color: #C9A96E; }
    .star-half  { opacity: 0.65; }
    .star-empty { opacity: 0.2;  }

    .text {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1rem; font-style: italic; font-weight: 300;
      line-height: 1.72; color: #1C1917; margin-bottom: 22px;
    }

    .author { display: flex; align-items: center; gap: 12px; }

    /* Avatar image */
    .avatar-img {
      width: 38px; height: 38px; border-radius: 50%;
      object-fit: cover; flex-shrink: 0;
    }
    /* Initials fallback */
    .avatar-initials {
      width: 38px; height: 38px; border-radius: 50%;
      background: #F2DAD8; display: grid; place-items: center;
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 0.95rem; color: #C8504A; font-weight: 500; flex-shrink: 0;
    }

    .a-name { font-size: 13px; font-weight: 500; color: #1C1917; margin-bottom: 2px; }
    .a-meta { font-size: 11px; color: #B8ABA8; }

    @media (max-width: 900px) { .grid { grid-template-columns: 1fr; max-width: 520px; } }
    @media (max-width: 600px) { section { padding: 64px 20px; } }
  `;

  constructor() {
    super();
    this._avatarErrors = new Set();
  }

  _stars(rating) {
    return [1, 2, 3, 4, 5].map(i => {
      let cls = 'star';
      if (i > Math.ceil(rating))                             cls += ' star-empty';
      else if (i === Math.ceil(rating) && rating % 1 !== 0) cls += ' star-half';
      return html`<span class="${cls}">★</span>`;
    });
  }

  render() {
    const { section, reviews } = TESTIMONIALS_CONFIG;
    return html`
      <section>
        <div class="center">
          <div class="tag">${section.tag}</div>
          <h2>${section.title} <em>${section.titleEm}</em></h2>
        </div>

        <div class="grid">
          ${reviews.map(r => html`
            <div class="card">
              <div class="stars">${this._stars(r.rating)}</div>
              <p class="text">${r.text}</p>
              <div class="author">

                ${r.avatar && !this._avatarErrors.has(r.id) ? html`
                  <img
                    class="avatar-img"
                    src=${r.avatar}
                    alt=${r.name}
                    @error=${e => onImgError(e, 'avatar')}
                  />
                ` : html`
                  <div class="avatar-initials">${r.initials}</div>
                `}

                <div>
                  <div class="a-name">${r.name}</div>
                  <div class="a-meta">${r.meta}</div>
                </div>
              </div>
            </div>
          `)}
        </div>
      </section>
    `;
  }
}

customElements.define('testimonials-section', TestimonialsSection);
import { LitElement, html, css } from 'lit';
import { HERO_CONFIG } from '../config/hero.config.js';
import { onImgError } from '../config/images.config.js';

/**
 * <hero-section>
 * Fully config-driven hero.
 * All copy, stats, CTAs, image, and badge come from hero.config.js.
 */
export class HeroSection extends LitElement {
  static properties = {
    _imgError: { state: true },
  };

  static styles = css`
    :host { display: block; }

    section {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      overflow: hidden;
    }

    /* ── Left ─────────────────────────────────────────────── */
    .left {
      display: flex; flex-direction: column; justify-content: center;
      padding: 80px 56px 80px 48px;
    }

    .eyebrow {
      display: inline-flex; align-items: center; gap: 10px;
      font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
      color: #C8504A; margin-bottom: 24px;
      opacity: 0; animation: fadeUp 0.8s 0.2s cubic-bezier(0.16,1,0.3,1) forwards;
    }
    .eyebrow::before { content: ''; width: 28px; height: 1px; background: #C8504A; flex-shrink: 0; }

    h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(2.6rem, 4.5vw, 4rem);
      font-weight: 300; line-height: 1.1; color: #1C1917;
      margin: 0 0 28px;
      opacity: 0; animation: fadeUp 0.9s 0.35s cubic-bezier(0.16,1,0.3,1) forwards;
    }
    h1 em { font-style: italic; color: #C8504A; }

    .desc {
      font-size: 15px; line-height: 1.78; color: #6B6260;
      max-width: 400px; margin-bottom: 40px;
      opacity: 0; animation: fadeUp 0.9s 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
    }

    .ctas {
      display: flex; gap: 14px; flex-wrap: wrap;
      opacity: 0; animation: fadeUp 0.9s 0.65s cubic-bezier(0.16,1,0.3,1) forwards;
    }
    .btn-primary {
      background: #C8504A; color: #fff; border: none;
      padding: 14px 30px; font-family: inherit;
      font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
      font-weight: 500; cursor: pointer; border-radius: 2px;
      transition: background 0.2s, transform 0.15s;
    }
    .btn-primary:hover { background: #1C1917; transform: translateY(-2px); }

    .btn-ghost {
      background: none; border: 1.5px solid #1C1917; color: #1C1917;
      padding: 13px 29px; font-family: inherit;
      font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
      font-weight: 500; cursor: pointer; border-radius: 2px;
      transition: background 0.2s, color 0.2s, transform 0.15s;
    }
    .btn-ghost:hover { background: #1C1917; color: #fff; transform: translateY(-2px); }

    .stats {
      display: flex; gap: 40px; margin-top: 52px;
      padding-top: 40px; border-top: 1px solid #E8DDD4;
      opacity: 0; animation: fadeUp 0.9s 0.8s cubic-bezier(0.16,1,0.3,1) forwards;
    }
    .stat-val {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 2rem; font-weight: 300; color: #1C1917; line-height: 1;
    }
    .stat-lbl {
      font-size: 11px; letter-spacing: 0.1em;
      text-transform: uppercase; color: #B8ABA8; margin-top: 4px;
    }

    /* ── Right ────────────────────────────────────────────── */
    .right {
      position: relative; background: #F3EDE6; overflow: hidden;
      opacity: 0; animation: fadeRight 1s 0.3s cubic-bezier(0.16,1,0.3,1) forwards;
    }

    .hero-img {
      width: 100%; height: 100%; object-fit: cover;
      display: block; min-height: 600px;
    }

    .placeholder {
      width: 100%; min-height: 600px; height: 100%;
      background: linear-gradient(160deg, #F2DAD8 0%, #F3EDE6 50%, #E8DDD4 100%);
      display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 14px;
    }
    .placeholder-icon { font-size: 56px; color: #E8857F; opacity: 0.42; }
    .placeholder-text {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-style: italic; font-size: 1rem;
      color: #E8857F; opacity: 0.6;
    }

    /* Floating badge */
    .badge {
      position: absolute; bottom: 48px; left: -24px;
      background: #1C1917; color: #fff;
      padding: 18px 24px; border-radius: 4px;
      box-shadow: 0 16px 40px rgba(28,25,23,0.28);
      opacity: 0; animation: fadeUp 0.8s 1.0s cubic-bezier(0.16,1,0.3,1) forwards;
    }
    .badge-val {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 2rem; font-weight: 300; line-height: 1;
    }
    .badge-lbl {
      font-size: 11px; letter-spacing: 0.1em;
      text-transform: uppercase; color: #B8ABA8; margin-top: 4px;
    }

    /* Scroll hint */
    .scroll-hint {
      position: absolute; bottom: 36px; right: 32px;
      display: flex; flex-direction: column; align-items: center; gap: 6px;
      font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
      color: #6B6260; animation: bounce 2.2s ease-in-out infinite;
    }
    .scroll-arrow { font-size: 18px; color: #C8504A; }

    /* Animations */
    @keyframes fadeUp   { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } }
    @keyframes fadeRight{ from { opacity:0; transform:translateX(32px); } to { opacity:1; transform:none; } }
    @keyframes bounce   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }

    /* Responsive */
    @media (max-width: 900px) { section { grid-template-columns: 1fr; } .right { display: none; } .left { padding: 60px 24px; } }
    @media (max-width: 480px) { .ctas { flex-direction: column; } .stats { gap: 24px; flex-wrap: wrap; } }
  `;

  constructor() {
    super();
    this._imgError = false;
  }

  _go(path) {
    window.dispatchEvent(new CustomEvent('app-navigate', {
      detail: { path }, bubbles: true, composed: true,
    }));
  }

  render() {
    const c = HERO_CONFIG;

    return html`
      <section>

        <!-- Left: copy -->
        <div class="left">

          <span class="eyebrow">${c.eyebrow}</span>

          <h1>
            ${c.heading.normal} <em>${c.heading.em}</em>
          </h1>

          <p class="desc">${c.description}</p>

          <div class="ctas">
            ${c.ctas.map(btn => html`
              <button
                class=${btn.style === 'primary' ? 'btn-primary' : 'btn-ghost'}
                @click=${() => this._go(btn.path)}
              >${btn.label}</button>
            `)}
          </div>

          <div class="stats">
            ${c.stats.map(s => html`
              <div>
                <div class="stat-val">${s.value}</div>
                <div class="stat-lbl">${s.label}</div>
              </div>
            `)}
          </div>

        </div>

        <!-- Right: image panel -->
        <div class="right">

          ${c.image.src && !this._imgError ? html`
            <img
              class="hero-img"
              src=${c.image.src}
              alt=${c.image.alt}
              @error=${() => { this._imgError = true; }}
            />
          ` : html`
            <div class="placeholder">
              <span class="placeholder-icon">❋</span>
              <span class="placeholder-text">${c.image.placeholder}</span>
            </div>
          `}

          <div class="badge">
            <div class="badge-val">${c.badge.value}</div>
            <div class="badge-lbl">${c.badge.label}</div>
          </div>

          <div class="scroll-hint" aria-hidden="true">
            <span>Scroll</span>
            <span class="scroll-arrow">↓</span>
          </div>

        </div>

      </section>
    `;
  }
}

customElements.define('hero-section', HeroSection);
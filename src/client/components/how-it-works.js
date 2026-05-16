import { LitElement, html, css } from 'lit';
import { HOW_IT_WORKS_CONFIG } from '../config/how-it-works.config.js';

/**
 * <how-it-works>
 * Config-driven process steps strip.
 */
export class HowItWorks extends LitElement {
  static styles = css`
    :host { display: block; }

    section {
      background: #1C1917; padding: 80px 48px;
      display: grid; grid-template-columns: 1fr 3fr;
      gap: 64px; align-items: center;
    }

    .tag {
      display: inline-flex; align-items: center; gap: 10px;
      font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
      color: #C8504A; margin-bottom: 14px;
    }
    .tag::before { content: ''; width: 28px; height: 1px; background: #C8504A; }

    h2 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 2rem; font-weight: 300; color: #fff; line-height: 1.2; margin: 0;
    }
    h2 em { font-style: italic; color: #E8857F; }

    .steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; }

    .step { border-top: 1px solid rgba(255,255,255,.1); padding-top: 22px; }
    .num  { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 2.2rem; font-weight: 300; color: rgba(255,255,255,.08); line-height: 1; margin-bottom: 14px; }
    .icon { font-size: 20px; color: #E8857F; margin-bottom: 10px; display: block; }
    .title{ font-size: 13px; font-weight: 500; color: #fff; margin-bottom: 8px; }
    .desc { font-size: 12px; color: rgba(255,255,255,.4); line-height: 1.65; }

    @media (max-width: 1024px) { section { grid-template-columns: 1fr; gap: 40px; } .steps { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 600px)  { section { padding: 60px 20px; } .steps { grid-template-columns: 1fr; } }
  `;

  render() {
    const { section, steps } = HOW_IT_WORKS_CONFIG;
    console.log('HOW_IT_WORKS_CONFIG:', HOW_IT_WORKS_CONFIG);
    return html`
      <section>
        <div>
          <div class="tag">${section.tag}</div>
          <h2>${section.title} <em>${section.titleEm}</em></h2>
        </div>
        <div class="steps">
          ${steps.map(s => html`
            <div class="step">
              <div class="num">${s.num}</div>
              <span class="icon">${s.icon}</span>
              <div class="title">${s.title}</div>
              <div class="desc">${s.desc}</div>
            </div>
          `)}
        </div>
      </section>
    `;
  }
}

customElements.define('how-it-works', HowItWorks);
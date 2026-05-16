import { LitElement, html, css } from 'lit';
import { MARQUEE_CONFIG } from '../config/marquee-strip.config.js';

/**
 * <marquee-strip>
 * Config-driven infinite-scroll announcement bar.
 */
export class MarqueeStrip extends LitElement {
  static styles = css`
    :host { display: block; }
    .strip {
      background: #1C1917;
      padding: 13px 0;
      overflow: hidden;
      user-select: none;
    }
    .strip:hover .track { animation-play-state: paused; }
    .track {
      display: flex;
      white-space: nowrap;
      animation: scroll var(--speed, 28s) linear infinite;
    }
    .item {
      display: inline-flex;
      align-items: center;
      gap: 14px;
      padding: 0 32px;
      font-size: 11px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #B8ABA8;
      flex-shrink: 0;
    }
    .dot {
      width: 4px; height: 4px;
      border-radius: 50%;
      background: #C8504A;
      flex-shrink: 0;
    }
    @keyframes scroll {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
  `;

  render() {
    const { items, speed } = MARQUEE_CONFIG;
    const doubled = [...items, ...items];
    return html`
      <div class="strip" aria-hidden="true" style="--speed: ${speed}s">
        <div class="track">
          ${doubled.map(item => html`
            <span class="item">
              <span class="dot"></span>${item}
            </span>
          `)}
        </div>
      </div>
    `;
  }
}

customElements.define('marquee-strip', MarqueeStrip);
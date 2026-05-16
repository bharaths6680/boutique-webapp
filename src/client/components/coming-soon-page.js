import { LitElement, html, css } from 'lit';

/**
 * <coming-soon-page>
 * Shown for routes not yet built.
 * Attribute:
 *   label — page name shown in the message
 */
export class ComingSoonPage extends LitElement {
  static properties = {
    label: { type: String },
  };

  static styles = css`
    :host { display: block; }

    .wrap {
      min-height: 60vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      text-align: center;
      padding: 40px 24px;
    }
    h2 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 2.2rem;
      font-weight: 300;
      color: #1C1917;
    }
    h2 em {
      font-style: italic;
      color: #C8504A;
    }
    p {
      font-size: 14px;
      color: #6B6260;
      max-width: 320px;
      line-height: 1.65;
    }
    button {
      margin-top: 8px;
      background: none;
      border: 1.5px solid #1C1917;
      padding: 10px 28px;
      font-family: inherit;
      font-size: 12px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      cursor: pointer;
      border-radius: 2px;
      transition: background 0.2s, color 0.2s;
    }
    button:hover {
      background: #1C1917;
      color: #fff;
    }
  `;

  constructor() {
    super();
    this.label = 'Page';
  }

  _goHome() {
    window.dispatchEvent(new CustomEvent('app-navigate', {
      detail: { path: '/' },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    return html`
      <div class="wrap">
        <h2><em>${this.label}</em> — Coming Soon</h2>
        <p>This module will be built in the next sprint. Check back soon!</p>
        <button @click=${this._goHome}>← Back to Home</button>
      </div>
    `;
  }
}

customElements.define('coming-soon-page', ComingSoonPage);
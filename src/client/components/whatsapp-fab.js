import { LitElement, html, css } from 'lit';

/**
 * <whatsapp-fab>
 * Fixed WhatsApp floating action button (bottom-right).
 *
 * Attributes:
 *   phone   — full number with country code, no +  (default: 919XXXXXXXXX)
 *   message — pre-filled message text
 */
export class WhatsappFab extends LitElement {
  static properties = {
    phone:   { type: String },
    message: { type: String },
  };

  static styles = css`
    :host { display: block; }

    a {
      position: fixed;
      bottom: 32px;
      right: 32px;
      z-index: 500;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: #25D366;
      color: #fff;
      display: grid;
      place-items: center;
      text-decoration: none;
      font-size: 26px;
      box-shadow: 0 4px 18px rgba(37, 211, 102, 0.45);
      transition: transform 0.2s ease, box-shadow 0.2s;
    }
    a:hover {
      transform: scale(1.1);
      box-shadow: 0 8px 26px rgba(37, 211, 102, 0.55);
    }
    /* Pulse ring */
    a::before {
      content: '';
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      border: 2px solid rgba(37, 211, 102, 0.35);
      animation: pulse 2.5s ease-out infinite;
    }
    @keyframes pulse {
      0%          { transform: scale(0.9); opacity: 0.8; }
      80%, 100%   { transform: scale(1.35); opacity: 0; }
    }
  `;

  constructor() {
    super();
    this.phone   = '919XXXXXXXXX';
    this.message = "Hi! I'd like to enquire about your collection.";
  }

  render() {
    const url = `https://wa.me/${this.phone}?text=${encodeURIComponent(this.message)}`;
    return html`
      <a href=${url} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <!-- WhatsApp icon via Unicode -->
        &#128172;
      </a>
    `;
  }
}

customElements.define('whatsapp-fab', WhatsappFab);
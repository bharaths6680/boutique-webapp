import { LitElement, html, css } from 'lit';

/**
 * <toast-notification>
 * Global snackbar. Listens on window for 'show-toast' CustomEvent.
 * Auto-dismisses after 3.2 s.
 *
 * Dispatch from anywhere:
 *   window.dispatchEvent(new CustomEvent('show-toast', {
 *     detail: { msg: 'Added to cart!', type: 'success' }   // type: 'success' | 'error'
 *   }));
 */
export class ToastNotification extends LitElement {
  static properties = {
    _toast: { state: true },
  };

  static styles = css`
    :host { display: block; }

    .toast {
      position: fixed;
      bottom: 88px;
      left: 50%;
      z-index: 999;
      transform: translateX(-50%) translateY(16px);
      background: #1C1917;
      color: #fff;
      padding: 13px 24px;
      border-radius: 99px;
      font-family: 'DM Sans', system-ui, sans-serif;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      white-space: nowrap;
      max-width: 90vw;
      box-shadow: 0 8px 28px rgba(28, 25, 23, 0.22);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.28s ease, transform 0.28s ease;
    }
    .toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
      pointer-events: auto;
    }
    .toast.error { background: #b91c1c; }
  `;

  #timer = null;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('show-toast', e => {
      this._toast = e.detail;
      clearTimeout(this.#timer);
      this.#timer = setTimeout(() => { this._toast = null; }, 3200);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this.#timer);
  }

  render() {
    const t = this._toast;
    return html`
      <div
        class="toast ${t ? 'show' : ''} ${t?.type === 'error' ? 'error' : ''}"
        role="status"
        aria-live="polite"
      >
        ${t ? html`${t.msg}` : ''}
      </div>
    `;
  }
}

customElements.define('toast-notification', ToastNotification);
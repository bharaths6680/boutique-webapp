import { LitElement, html, css } from 'lit';

/**
 * <newsletter-section>
 * "Get Exclusive Offers First" email capture section.
 * Matching the mockup: centered heading + inline email form + note.
 *
 * Validates email, shows success state, fires show-toast on submit.
 */
export class NewsletterSection extends LitElement {
  static properties = {
    _email:   { state: true },
    _loading: { state: true },
    _success: { state: true },
    _error:   { state: true },
  };

  static styles = css`
    :host { display: block; }

    /* ── Section ──────────────────────────────────────────── */
    section {
      padding: 96px 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .inner {
      max-width: 500px;
      width: 100%;
    }

    /* ── Heading ──────────────────────────────────────────── */
    .tag {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-size: 11px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #C8504A;
      margin-bottom: 14px;
    }
    .tag::before {
      content: '';
      width: 28px;
      height: 1px;
      background: #C8504A;
    }

    h2 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(1.8rem, 4vw, 2.6rem);
      font-weight: 300;
      color: #1C1917;
      line-height: 1.15;
      margin: 0 0 14px;
    }
    h2 em { font-style: italic; color: #C8504A; }

    .desc {
      font-size: 14px;
      line-height: 1.72;
      color: #6B6260;
      margin-bottom: 32px;
    }

    /* ── Form row ─────────────────────────────────────────── */
    .form {
      display: flex;
      border: 1px solid #E8DDD4;
      border-radius: 2px;
      overflow: hidden;
      max-width: 400px;
      margin: 0 auto;
      transition: border-color 0.2s;
    }
    .form:focus-within { border-color: #C8504A; }
    .form.has-error    { border-color: #b91c1c; }

    input {
      flex: 1;
      padding: 13px 18px;
      border: none;
      outline: none;
      font-family: inherit;
      font-size: 14px;
      color: #1C1917;
      background: #fff;
    }
    input::placeholder { color: #B8ABA8; }

    .submit-btn {
      padding: 13px 22px;
      background: #1C1917;
      color: #fff;
      border: none;
      font-family: inherit;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      cursor: pointer;
      white-space: nowrap;
      transition: background 0.2s;
    }
    .submit-btn:hover   { background: #C8504A; }
    .submit-btn:disabled{ opacity: 0.6; cursor: wait; }

    /* ── Messages ─────────────────────────────────────────── */
    .msg {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-top: 12px;
      font-size: 13px;
    }
    .msg.success { color: #2d6a4f; }
    .msg.error   { color: #b91c1c; }

    /* ── Success state ────────────────────────────────────── */
    .success-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      padding: 24px;
      background: #F3EDE6;
      border-radius: 4px;
      max-width: 400px;
      margin: 0 auto;
    }
    .success-box .check {
      font-size: 28px;
      color: #2d6a4f;
    }
    .success-box p {
      font-size: 14px;
      color: #1C1917;
      margin: 0;
    }

    /* ── Note ─────────────────────────────────────────────── */
    .note {
      font-size: 11px;
      color: #B8ABA8;
      margin-top: 14px;
      line-height: 1.6;
    }

    /* ── Responsive ───────────────────────────────────────── */
    @media (max-width: 600px) {
      section { padding: 64px 20px; }
      .form   { flex-direction: column; }
      .submit-btn { padding: 13px; }
    }
  `;

  constructor() {
    super();
    this._email   = '';
    this._loading = false;
    this._success = false;
    this._error   = '';
  }

  /* ── Validation ──────────────────────────────────────────── */
  _validate() {
    if (!this._email.trim())
      return 'Please enter your email address.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this._email))
      return 'Please enter a valid email address.';
    return '';
  }

  /* ── Submit ──────────────────────────────────────────────── */
  async _submit() {
    const err = this._validate();
    if (err) { this._error = err; return; }

    this._error   = '';
    this._loading = true;

    try {
      /*
       * Phase 2: replace with real API call
       * await api.post('/newsletter/subscribe', { email: this._email });
       */
      await new Promise(r => setTimeout(r, 700)); // simulate
      this._success = true;
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { msg: 'Subscribed! Welcome to Winter Flower Designs 🌸', type: 'success' },
      }));
    } catch (e) {
      this._error = e.message ?? 'Something went wrong. Please try again.';
    } finally {
      this._loading = false;
    }
  }

  _onInput(e) {
    this._email = e.target.value;
    if (this._error) this._error = '';
  }

  _onKeydown(e) {
    if (e.key === 'Enter') this._submit();
  }

  render() {
    return html`
      <section>
        <div class="inner">

          <div class="tag">Stay in the Loop</div>
          <h2>Get <em>Exclusive</em> Offers First</h2>
          <p class="desc">
            New arrivals, seasonal sales, and styling tips — straight to your inbox.
            No spam, ever.
          </p>

          ${this._success
            ? html`
                <div class="success-box">
                  <span class="check">✓</span>
                  <p>You're subscribed! Check your inbox for a welcome gift.</p>
                </div>
              `
            : html`
                <div class="form ${this._error ? 'has-error' : ''}">
                  <input
                    type="email"
                    placeholder="Your email address"
                    .value=${this._email}
                    @input=${this._onInput}
                    @keydown=${this._onKeydown}
                    ?disabled=${this._loading}
                    aria-label="Email address"
                  />
                  <button
                    class="submit-btn"
                    @click=${this._submit}
                    ?disabled=${this._loading}
                  >
                    ${this._loading ? 'Subscribing…' : 'Subscribe'}
                  </button>
                </div>

                ${this._error ? html`
                  <div class="msg error">⚠ ${this._error}</div>
                ` : ''}
              `
          }

          <p class="note">
            By subscribing you agree to our privacy policy. Unsubscribe anytime.
          </p>

        </div>
      </section>
    `;
  }
}

customElements.define('newsletter-section', NewsletterSection);
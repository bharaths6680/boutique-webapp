import { LitElement, html, css } from 'lit';

/**
 * <custom-page>
 * Custom dress order page.
 *
 * Sections:
 *   1. Page header
 *   2. How custom works (3 steps)
 *   3. Order form
 *      - Garment type + occasion + fabric + colour
 *      - 6 body measurements
 *      - Description + reference image upload
 *      - Delivery date + budget
 *      - Submit
 */
export class CustomPage extends LitElement {

  static properties = {
    _step:       { state: true },   // 1 | 2 | 3
    _form:       { state: true },
    _submitted:  { state: true },
    _errors:     { state: true },
  };

  static GARMENTS = ['Kurti', 'Lehenga', 'Saree Blouse', 'Gown', 'Salwar Suit', 'Anarkali', 'Other'];
  static FABRICS  = ['Cotton', 'Silk', 'Georgette', 'Chiffon', 'Velvet', 'Net', 'Linen'];
  static OCCASIONS= ['Casual', 'Wedding', 'Festival', 'Party', 'Office', 'Other'];

  static styles = css`
    :host { display: block; }

    /* ── Header ───────────────────────────────────────────── */
    .page-header {
      background: #F3EDE6;
      padding: 48px 48px 36px;
      border-bottom: 1px solid #E8DDD4;
    }
    .breadcrumb {
      font-size: 11px; letter-spacing: .08em; color: #B8ABA8;
      margin-bottom: 10px; display: flex; gap: 6px; align-items: center;
    }
    .breadcrumb span { cursor: pointer; transition: color .2s; }
    .breadcrumb span:hover { color: #C8504A; }
    .page-header h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(2rem,4vw,3rem); font-weight: 300; color: #1C1917; margin: 0;
    }
    .page-header h1 em { font-style: italic; color: #C8504A; }
    .page-header p { font-size: 14px; color: #6B6260; margin-top: 10px; max-width: 560px; line-height: 1.7; }

    /* ── How it works strip ───────────────────────────────── */
    .steps-strip {
      background: #1C1917;
      padding: 40px 48px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
    }
    .how-step { border-top: 1px solid rgba(255,255,255,.1); padding-top: 20px; }
    .how-num  { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 2rem; font-weight: 300; color: rgba(255,255,255,.1); line-height: 1; margin-bottom: 10px; }
    .how-title{ font-size: 13px; font-weight: 500; color: #fff; margin-bottom: 6px; }
    .how-desc { font-size: 12px; color: rgba(255,255,255,.42); line-height: 1.65; }

    /* ── Form wrapper ─────────────────────────────────────── */
    .form-wrap {
      max-width: 860px;
      margin: 0 auto;
      padding: 56px 48px;
    }

    /* ── Step indicator ───────────────────────────────────── */
    .step-bar {
      display: flex;
      gap: 0;
      margin-bottom: 44px;
      border-bottom: 1px solid #E8DDD4;
    }
    .step-tab {
      padding: 12px 24px;
      font-size: 11px;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: #B8ABA8;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      transition: color .2s, border-color .2s;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .step-tab .num {
      width: 20px; height: 20px;
      border-radius: 50%;
      border: 1.5px solid #E8DDD4;
      display: grid; place-items: center;
      font-size: 10px;
      transition: background .2s, border-color .2s;
    }
    .step-tab.active { color: #1C1917; border-bottom-color: #C8504A; }
    .step-tab.active .num { background: #C8504A; border-color: #C8504A; color: #fff; }
    .step-tab.done .num   { background: #2d6a4f; border-color: #2d6a4f; color: #fff; }
    .step-tab.done { color: #6B6260; }

    /* ── Section heading ──────────────────────────────────── */
    .section-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.4rem; font-weight: 300; color: #1C1917;
      margin-bottom: 24px;
    }
    .section-title em { font-style: italic; color: #C8504A; }

    /* ── Fields ───────────────────────────────────────────── */
    .fields      { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 32px; }
    .field-full  { grid-column: 1 / -1; }

    .field label {
      display: block;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: .1em;
      text-transform: uppercase;
      color: #6B6260;
      margin-bottom: 7px;
    }
    .field input,
    .field select,
    .field textarea {
      width: 100%;
      padding: 11px 14px;
      border: 1px solid #E8DDD4;
      border-radius: 2px;
      font-family: inherit;
      font-size: 14px;
      color: #1C1917;
      background: #fff;
      outline: none;
      transition: border-color .2s;
      box-sizing: border-box;
    }
    .field input:focus,
    .field select:focus,
    .field textarea:focus { border-color: #C8504A; }
    .field textarea  { resize: vertical; min-height: 100px; }
    .field.error input,
    .field.error select { border-color: #b91c1c; }
    .field .err-msg { font-size: 11px; color: #b91c1c; margin-top: 4px; }
    .field .hint    { font-size: 11px; color: #B8ABA8; margin-top: 4px; }

    /* Measurement grid */
    .measure-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px; }
    .measure-field label { display: block; font-size: 11px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; color: #6B6260; margin-bottom: 7px; }
    .measure-input-wrap { position: relative; }
    .measure-input-wrap input {
      width: 100%; padding: 11px 36px 11px 14px;
      border: 1px solid #E8DDD4; border-radius: 2px;
      font-family: inherit; font-size: 14px; color: #1C1917;
      background: #fff; outline: none; box-sizing: border-box;
      transition: border-color .2s;
    }
    .measure-input-wrap input:focus { border-color: #C8504A; }
    .measure-unit { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); font-size: 11px; color: #B8ABA8; pointer-events: none; }

    /* File upload */
    .file-drop {
      border: 2px dashed #E8DDD4;
      border-radius: 4px;
      padding: 32px;
      text-align: center;
      cursor: pointer;
      transition: border-color .2s;
    }
    .file-drop:hover { border-color: #C8504A; }
    .file-drop p { font-size: 13px; color: #B8ABA8; margin: 0; }
    .file-drop span { color: #C8504A; text-decoration: underline; cursor: pointer; }

    /* ── Nav buttons ──────────────────────────────────────── */
    .form-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 36px;
      padding-top: 28px;
      border-top: 1px solid #E8DDD4;
    }
    .btn-back {
      background: none; border: 1.5px solid #E8DDD4;
      padding: 12px 28px; font-family: inherit;
      font-size: 12px; letter-spacing: .1em; text-transform: uppercase;
      color: #6B6260; cursor: pointer; border-radius: 2px;
      transition: border-color .2s, color .2s;
    }
    .btn-back:hover { border-color: #1C1917; color: #1C1917; }
    .btn-next {
      background: #C8504A; color: #fff; border: none;
      padding: 13px 36px; font-family: inherit;
      font-size: 12px; letter-spacing: .1em; text-transform: uppercase;
      cursor: pointer; border-radius: 2px;
      transition: background .2s, transform .15s;
    }
    .btn-next:hover { background: #1C1917; transform: translateY(-1px); }

    /* ── Success ──────────────────────────────────────────── */
    .success-box {
      text-align: center;
      padding: 64px 24px;
    }
    .success-box .icon { font-size: 48px; color: #2d6a4f; margin-bottom: 20px; }
    .success-box h2 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 2rem; font-weight: 300; color: #1C1917; margin-bottom: 12px;
    }
    .success-box h2 em { font-style: italic; color: #C8504A; }
    .success-box p { font-size: 14px; color: #6B6260; line-height: 1.7; max-width: 400px; margin: 0 auto 28px; }
    .btn-home {
      background: #1C1917; color: #fff; border: none;
      padding: 13px 36px; font-family: inherit;
      font-size: 12px; letter-spacing: .1em; text-transform: uppercase;
      cursor: pointer; border-radius: 2px; transition: background .2s;
    }
    .btn-home:hover { background: #C8504A; }

    /* ── Responsive ───────────────────────────────────────── */
    @media (max-width: 768px) {
      .page-header { padding: 32px 20px 24px; }
      .steps-strip { grid-template-columns: 1fr; padding: 32px 20px; }
      .form-wrap   { padding: 36px 20px; }
      .fields      { grid-template-columns: 1fr; }
      .measure-grid{ grid-template-columns: 1fr 1fr; }
      .step-tab span.label { display: none; }
    }
  `;

  constructor() {
    super();
    this._step = 1;
    this._submitted = false;
    this._errors = {};
    this._form = {
      garment: '', occasion: '', fabric: '', colour: '', description: '',
      bust: '', waist: '', hips: '', shoulder: '', sleeveLen: '', height: '',
      deliveryDate: '', budget: '', notes: '',
    };
  }

  _go(path) {
    window.dispatchEvent(new CustomEvent('app-navigate', { detail: { path }, bubbles: true, composed: true }));
  }

  _update(field, val) {
    this._form = { ...this._form, [field]: val };
    if (this._errors[field]) {
      const e = { ...this._errors }; delete e[field]; this._errors = e;
    }
  }

  _validateStep1() {
    const e = {};
    if (!this._form.garment)   e.garment   = 'Please select a garment type';
    if (!this._form.fabric)    e.fabric     = 'Please select a fabric';
    if (!this._form.occasion)  e.occasion   = 'Please select an occasion';
    this._errors = e;
    return Object.keys(e).length === 0;
  }

  _validateStep2() {
    const e = {};
    const required = ['bust','waist','hips','shoulder'];
    required.forEach(k => { if (!this._form[k]) e[k] = 'Required'; });
    this._errors = e;
    return Object.keys(e).length === 0;
  }

  _next() {
    if (this._step === 1 && !this._validateStep1()) return;
    if (this._step === 2 && !this._validateStep2()) return;
    if (this._step < 3) this._step++;
  }
  _back() { if (this._step > 1) this._step--; }

  async _submit() {
    /* Phase 2: await api.post('/custom-orders', this._form) */
    await new Promise(r => setTimeout(r, 600));
    this._submitted = true;
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { msg: 'Custom order submitted! We\'ll contact you shortly.', type: 'success' } }));
  }

  _renderStep1() {
    return html`
      <div class="section-title">Style & <em>Details</em></div>
      <div class="fields">
        <div class="field ${this._errors.garment ? 'error' : ''}">
          <label>Garment Type *</label>
          <select @change=${e => this._update('garment', e.target.value)}>
            <option value="">Select type…</option>
            ${CustomPage.GARMENTS.map(g => html`<option value=${g} ?selected=${this._form.garment===g}>${g}</option>`)}
          </select>
          ${this._errors.garment ? html`<div class="err-msg">${this._errors.garment}</div>` : ''}
        </div>
        <div class="field ${this._errors.occasion ? 'error' : ''}">
          <label>Occasion *</label>
          <select @change=${e => this._update('occasion', e.target.value)}>
            <option value="">Select occasion…</option>
            ${CustomPage.OCCASIONS.map(o => html`<option value=${o} ?selected=${this._form.occasion===o}>${o}</option>`)}
          </select>
          ${this._errors.occasion ? html`<div class="err-msg">${this._errors.occasion}</div>` : ''}
        </div>
        <div class="field ${this._errors.fabric ? 'error' : ''}">
          <label>Fabric *</label>
          <select @change=${e => this._update('fabric', e.target.value)}>
            <option value="">Select fabric…</option>
            ${CustomPage.FABRICS.map(f => html`<option value=${f} ?selected=${this._form.fabric===f}>${f}</option>`)}
          </select>
          ${this._errors.fabric ? html`<div class="err-msg">${this._errors.fabric}</div>` : ''}
        </div>
        <div class="field">
          <label>Preferred Colour</label>
          <input type="text" placeholder="e.g. Deep maroon, Pastel pink" .value=${this._form.colour} @input=${e => this._update('colour', e.target.value)} />
        </div>
        <div class="field field-full">
          <label>Description</label>
          <textarea placeholder="Describe your design, embroidery preferences, neckline style…" .value=${this._form.description} @input=${e => this._update('description', e.target.value)}></textarea>
        </div>
        <div class="field field-full">
          <label>Reference Images (optional)</label>
          <div class="file-drop">
            <p>Drag & drop images or <span>browse</span></p>
            <p style="font-size:11px;margin-top:6px">JPG, PNG up to 5MB each</p>
          </div>
        </div>
      </div>
    `;
  }

  _renderStep2() {
    const mf = [
      { key:'bust',      label:'Bust',          hint:'Around fullest part' },
      { key:'waist',     label:'Waist',         hint:'Narrowest point' },
      { key:'hips',      label:'Hips',          hint:'Fullest part' },
      { key:'shoulder',  label:'Shoulder Width', hint:'Shoulder to shoulder' },
      { key:'sleeveLen', label:'Sleeve Length',  hint:'Shoulder to wrist' },
      { key:'height',    label:'Height',         hint:'Standing straight' },
    ];
    return html`
      <div class="section-title">Your <em>Measurements</em></div>
      <div class="measure-grid">
        ${mf.map(m => html`
          <div class="measure-field">
            <label>${m.label} ${['bust','waist','hips','shoulder'].includes(m.key) ? '*' : ''}</label>
            <div class="measure-input-wrap">
              <input
                type="number" min="20" max="200" step="0.5"
                placeholder="0"
                .value=${this._form[m.key]}
                @input=${e => this._update(m.key, e.target.value)}
                style="${this._errors[m.key] ? 'border-color:#b91c1c' : ''}"
              />
              <span class="measure-unit">cm</span>
            </div>
            ${this._errors[m.key]
              ? html`<div style="font-size:11px;color:#b91c1c;margin-top:3px">${this._errors[m.key]}</div>`
              : html`<div style="font-size:11px;color:#B8ABA8;margin-top:3px">${m.hint}</div>`
            }
          </div>
        `)}
      </div>
      <div class="fields">
        <div class="field">
          <label>Additional Notes</label>
          <textarea placeholder="Any specific requirements about fit, loose/fitted preference…" .value=${this._form.notes} @input=${e => this._update('notes', e.target.value)}></textarea>
        </div>
      </div>
    `;
  }

  _renderStep3() {
    return html`
      <div class="section-title">Delivery & <em>Budget</em></div>
      <div class="fields">
        <div class="field">
          <label>Requested Delivery Date</label>
          <input type="date" .value=${this._form.deliveryDate} @input=${e => this._update('deliveryDate', e.target.value)} />
          <div class="hint">Minimum 14 days from today</div>
        </div>
        <div class="field">
          <label>Budget (₹)</label>
          <input type="number" min="500" step="100" placeholder="e.g. 5000" .value=${this._form.budget} @input=${e => this._update('budget', e.target.value)} />
          <div class="hint">We'll quote based on your requirements</div>
        </div>
      </div>

      <!-- Order summary -->
      <div style="background:#F3EDE6;border-radius:4px;padding:24px;margin-bottom:24px">
        <div style="font-size:11px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:#6B6260;margin-bottom:14px">Order Summary</div>
        ${[
          ['Garment',   this._form.garment],
          ['Fabric',    this._form.fabric],
          ['Occasion',  this._form.occasion],
          ['Colour',    this._form.colour || '—'],
          ['Delivery',  this._form.deliveryDate || 'Not specified'],
          ['Budget',    this._form.budget ? `₹${parseInt(this._form.budget).toLocaleString('en-IN')}` : 'Not specified'],
        ].map(([k,v]) => html`
          <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #E8DDD4;font-size:13px">
            <span style="color:#6B6260">${k}</span>
            <span style="color:#1C1917;font-weight:500">${v}</span>
          </div>
        `)}
      </div>
    `;
  }

  render() {
    if (this._submitted) return html`
      <div class="success-box">
        <div class="icon">✓</div>
        <h2>Order <em>Received!</em></h2>
        <p>We've received your custom order request. Our team will review your measurements and get back to you within 24 hours with a quote.</p>
        <button class="btn-home" @click=${() => this._go('/')}>Back to Home</button>
      </div>
    `;

    return html`
      <div class="page-header">
        <div class="breadcrumb">
          <span @click=${() => this._go('/')}>Home</span>
          <span style="opacity:.4">/</span>
          <span>Custom Order</span>
        </div>
        <h1>Custom <em>Stitch</em></h1>
        <p>Tell us your dream outfit. We'll stitch it to your exact measurements in 14 days.</p>
      </div>

      <div class="steps-strip">
        ${[['01','Share Details','Garment, fabric, occasion'],['02','Your Measurements','6 key measurements'],['03','Confirm & Submit','Review and place order']].map(([n,t,d]) => html`
          <div class="how-step">
            <div class="how-num">${n}</div>
            <div class="how-title">${t}</div>
            <div class="how-desc">${d}</div>
          </div>
        `)}
      </div>

      <div class="form-wrap">
        <!-- Step indicator -->
        <div class="step-bar">
          ${[['Style Details',1],['Measurements',2],['Confirm',3]].map(([label, n]) => html`
            <div class="step-tab ${this._step === n ? 'active' : ''} ${this._step > n ? 'done' : ''}">
              <span class="num">${this._step > n ? '✓' : n}</span>
              <span class="label">${label}</span>
            </div>
          `)}
        </div>

        <!-- Step content -->
        ${this._step === 1 ? this._renderStep1() : ''}
        ${this._step === 2 ? this._renderStep2() : ''}
        ${this._step === 3 ? this._renderStep3() : ''}

        <!-- Actions -->
        <div class="form-actions">
          ${this._step > 1
            ? html`<button class="btn-back" @click=${this._back}>← Back</button>`
            : html`<span></span>`
          }
          ${this._step < 3
            ? html`<button class="btn-next" @click=${this._next}>Next Step →</button>`
            : html`<button class="btn-next" @click=${this._submit}>Submit Order</button>`
          }
        </div>
      </div>
    `;
  }
}

customElements.define('custom-page', CustomPage);
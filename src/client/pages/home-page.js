import { LitElement, html } from 'lit';

/* Import all section components */
import '../components/hero-section.js';
import '../components/marquee-strip.js';
import '../components/category-grid.js';
import '../components/featured-products.js';
import '../components/how-it-works.js';
import '../components/testimonials-section.js';
import '../components/newsletter-section.js';
/**
 * <home-page>
 * Assembles all homepage sections.
 * Each section wrapper has an id matching the hash anchor:
 *
 *   #hero          →  hero-section
 *   #categories    →  category-grid
 *   #featured      →  featured-products
 *   #how-it-works  →  how-it-works
 *   #testimonials  →  testimonials-section
 *   #newsletter    →  newsletter-section
 *
 * No shadow DOM — global CSS scroll-reveal works directly.
 * IntersectionObserver is set up here AND in app-navbar.
 */
export class HomePage extends LitElement {

  createRenderRoot() { return this; }

  connectedCallback() {
    super.connectedCallback();
    requestAnimationFrame(() => this._initReveal());
  }

  _initReveal() {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.07 },
    );
    this.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  render() {
    return html`

      <!-- ① Hero ─────────────────────────────── #hero -->
      <section id="hero" data-section="hero">
        <hero-section></hero-section>
      </section>

      <!-- Marquee strip (no anchor needed) -->
      <marquee-strip></marquee-strip>

      <!-- ② Categories ───────────────────── #categories -->
      <section id="categories" data-section="categories" class="reveal">
        <category-grid></category-grid>
      </section>

      <!-- ③ Featured products ─────────────── #featured -->
      <section id="featured" data-section="featured" class="reveal">
        <featured-products></featured-products>
      </section>

      <!-- ④ How it works ──────────────── #how-it-works -->
      <section id="how-it-works" data-section="how-it-works" class="reveal">
        <how-it-works></how-it-works>
      </section>

      <!-- ⑤ Testimonials ──────────────── #testimonials -->
      <section id="testimonials" data-section="testimonials" class="reveal">
        <testimonials-section></testimonials-section>
      </section>

      <!-- ⑥ Newsletter ─────────────────── #newsletter -->
      <section id="newsletter" data-section="newsletter" class="reveal">
        <newsletter-section></newsletter-section>
      </section>

    `;
  }
}

customElements.define('home-page', HomePage);

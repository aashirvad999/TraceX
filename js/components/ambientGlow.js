// TraceX - Ambient Mouse-Following Glow Component

export class AmbientGlow {
  constructor() {
    this.element = null;
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;
    this.currentX = this.mouseX;
    this.currentY = this.mouseY;
    this.isHovered = false;
    this.rafId = null;
    this.isMobileOrReducedMotion = false;
  }

  init() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion || isCoarsePointer) {
      this.isMobileOrReducedMotion = true;
      return;
    }

    this.element = document.getElementById('ambient-glow');
    if (!this.element) {
      this.element = document.createElement('div');
      this.element.id = 'ambient-glow';
      document.body.appendChild(this.element);
    }

    this.attachEvents();
    this.animate();
  }

  attachEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      const target = e.target;
      if (target && target.closest('button, a, input, textarea, [data-nav], [data-sample-idx], [data-hop-index], .btn-inspect-ioc, .graph-node')) {
        if (!this.isHovered) {
          this.isHovered = true;
          this.element?.classList.add('interactive-hover');
        }
      } else {
        if (this.isHovered) {
          this.isHovered = false;
          this.element?.classList.remove('interactive-hover');
        }
      }
    }, { passive: true });
  }

  animate() {
    if (this.isMobileOrReducedMotion) return;

    // Smooth lerp (0.12 factor for subtle fluid inertia)
    this.currentX += (this.mouseX - this.currentX) * 0.12;
    this.currentY += (this.mouseY - this.currentY) * 0.12;

    if (this.element) {
      this.element.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;
    }

    this.rafId = requestAnimationFrame(() => this.animate());
  }
}

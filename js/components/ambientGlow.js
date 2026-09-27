// TraceX - Ambient Mouse-Following Glow Component with Smooth Idle Fade

export class AmbientGlow {
  constructor() {
    this.element = null;
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;
    this.currentX = this.mouseX;
    this.currentY = this.mouseY;
    this.isHovered = false;
    this.idleTimer = null;
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

    // Remove temporary floating control panel if present in DOM
    const existingPanel = document.getElementById('glow-control-panel');
    if (existingPanel) {
      existingPanel.remove();
    }

    this.element = document.getElementById('ambient-glow');
    if (!this.element) {
      this.element = document.createElement('div');
      this.element.id = 'ambient-glow';
      document.body.appendChild(this.element);
    }

    this.attachEvents();
    this.animate();
    this.resetIdleTimer();
  }

  resetIdleTimer() {
    if (!this.element) return;

    // Remove idle class smoothly when cursor moves
    this.element.classList.remove('glow-idle');

    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }

    // 2.5s idle fade out timer
    this.idleTimer = setTimeout(() => {
      if (this.element) {
        this.element.classList.add('glow-idle');
      }
    }, 2500);
  }

  attachEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      this.resetIdleTimer();

      const target = e.target;
      if (target && target.closest('button, a, input, textarea, [data-nav], [data-sample-idx], [data-hop-index], .btn-inspect-ioc, .graph-node-group')) {
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

    // Smooth lerp (0.12 factor for fluid inertia)
    this.currentX += (this.mouseX - this.currentX) * 0.12;
    this.currentY += (this.mouseY - this.currentY) * 0.12;

    if (this.element) {
      this.element.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;
    }

    this.rafId = requestAnimationFrame(() => this.animate());
  }
}

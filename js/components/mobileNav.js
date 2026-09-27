// TraceX - Mobile Menu Drawer Component

export function renderMobileNav() {
  return `
    <div id="mobile-menu-drawer" class="hidden md:hidden fixed inset-x-0 top-16 bg-[#101214] border-b border-[#24282D] p-6 space-y-4 z-50 shadow-2xl">
      <nav class="flex flex-col space-y-3 text-sm font-medium text-[#9CA3AF]">
        <button data-nav="analyze" class="mobile-nav-link text-left py-2 hover:text-white transition-colors">
          Scanner
        </button>
        <button data-nav="how-it-works" class="mobile-nav-link text-left py-2 hover:text-white transition-colors">
          How It Works
        </button>
      </nav>
    </div>
  `;
}

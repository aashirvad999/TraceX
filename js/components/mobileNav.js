// TraceX - Mobile Menu Drawer Component

export function renderMobileNav() {
  return `
    <div id="mobile-menu-drawer" class="hidden md:hidden fixed inset-x-0 top-16 bg-[#101214] border-b border-[#24282D] p-6 space-y-4 z-50 shadow-2xl">
      <nav class="flex flex-col space-y-3 text-sm font-medium text-[#9CA3AF]">
        <button data-nav="platform" class="mobile-nav-link text-left py-2 hover:text-white transition-colors">
          Platform
        </button>
        <button data-nav="how-it-works" class="mobile-nav-link text-left py-2 hover:text-white transition-colors">
          How It Works
        </button>
        <button data-nav="threat-intelligence" class="mobile-nav-link text-left py-2 hover:text-white transition-colors">
          Threat Intelligence
        </button>
        <button data-nav="forensics" class="mobile-nav-link text-left py-2 hover:text-white transition-colors">
          Forensics
        </button>
      </nav>

      <div class="pt-4 border-t border-[#24282D]">
        <button data-nav="analyze" class="w-full py-3 rounded-lg bg-[#D6A84F] hover:bg-[#C2943E] text-[#08090B] font-semibold text-sm transition-colors text-center">
          Analyze Email
        </button>
      </div>
    </div>
  `;
}

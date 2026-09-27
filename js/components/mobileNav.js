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
        <button data-nav="sih-project" class="mobile-nav-link text-left py-2 hover:text-white transition-colors">
          About SIH Project
        </button>
      </nav>

      <div class="pt-4 border-t border-[#24282D]">
        <button data-nav="analyze" class="w-full py-3 rounded-xl bg-[#D6A84F] hover:bg-[#C2943E] text-[#08090B] font-extrabold text-sm transition-colors text-center flex items-center justify-center gap-2">
          <span class="material-symbols-outlined text-lg">upload_file</span>
          Upload & Analyze .eml
        </button>
      </div>
    </div>
  `;
}


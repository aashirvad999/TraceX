// TraceX - Single-Page Header Navigation Component

export function renderHeader() {
  return `
    <div class="w-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-8 h-full">
      
      <!-- Brand Logo (Left) -->
      <a href="#platform" data-nav="platform" id="nav-brand" class="flex items-center gap-3 group shrink-0">
        <div class="w-8 h-8 rounded-lg bg-[#D6A84F]/10 border border-[#D6A84F]/30 flex items-center justify-center text-[#D6A84F] font-mono text-sm font-bold group-hover:bg-[#D6A84F]/20 transition-colors">
          TX
        </div>
        <span class="text-xl font-bold tracking-tight text-white group-hover:text-[#D6A84F] transition-colors">
          Trace<span class="text-[#D6A84F]">X</span>
        </span>
      </a>

      <!-- Desktop Navigation Links (Center with Smooth Sliding Active Line Indicator) -->
      <nav id="desktop-nav" class="hidden md:flex items-center justify-center gap-8 lg:gap-10 text-sm font-medium flex-1 relative py-2">
        <button data-nav="platform" class="nav-link active">
          Platform
        </button>
        <button data-nav="how-it-works" class="nav-link">
          How It Works
        </button>
        <button data-nav="threat-intelligence" class="nav-link">
          Threat Intelligence
        </button>
        <button data-nav="forensics" class="nav-link">
          Forensics
        </button>

        <!-- Smooth Sliding Active Underline Indicator Bar -->
        <div id="nav-indicator" class="absolute bottom-0 left-0 h-0.5 bg-[#D6A84F] rounded-full transition-all duration-300 ease-out pointer-events-none opacity-0 shadow-[0_0_8px_rgba(214,168,79,0.6)]"></div>
      </nav>

      <!-- Primary Action CTA (Right) -->
      <div class="hidden md:flex items-center shrink-0">
        <button data-nav="analyze" class="px-5 py-2.5 rounded-lg bg-[#D6A84F] hover:bg-[#C2943E] text-[#08090B] font-semibold text-sm transition-colors shadow-sm">
          Analyze Email
        </button>
      </div>

      <!-- Mobile Hamburger Menu Button -->
      <button id="btn-mobile-menu-toggle" class="md:hidden p-2 text-[#9CA3AF] hover:text-white transition-colors">
        <span class="material-symbols-outlined">menu</span>
      </button>

    </div>
  `;
}

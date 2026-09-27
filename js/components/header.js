// TraceX - Single-Page Header Navigation Component
import { SAMPLE_EMAILS } from '../sampleData.js';

export function renderHeader() {
  return `
    <div class="w-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6 h-full">
      
      <!-- Brand Logo (Left) with Cyber Decrypt Logo & Terminal Cursor -->
      <a href="#platform" data-nav="platform" id="nav-brand" class="flex items-center gap-3 group shrink-0">
        <div class="w-9 h-9 rounded-xl bg-[#D6A84F]/10 border border-[#D6A84F]/30 flex items-center justify-center text-[#D6A84F] group-hover:bg-[#D6A84F]/20 group-hover:border-[#D6A84F]/60 transition-all shadow-[0_0_12px_rgba(214,168,79,0.15)] relative">
          <span class="material-symbols-outlined text-xl text-[#D6A84F] group-hover:scale-105 transition-transform duration-300 animate-pulse">security</span>
        </div>
        <div class="flex items-center font-mono font-bold text-xl tracking-tight select-none">
          <span id="brand-decrypt-text" class="text-[#D6A84F]">Tracex</span>
          <span id="brand-terminal-cursor" class="text-[#D6A84F] font-bold animate-blink">_</span>
        </div>
      </a>

      <!-- Desktop Navigation Links -->
      <nav id="desktop-nav" class="hidden md:flex items-center justify-center gap-8 lg:gap-10 text-sm font-medium flex-1 relative py-2">
        <button data-nav="analyze" class="nav-link">
          Scanner
        </button>
        <button data-nav="how-it-works" class="nav-link">
          How It Works
        </button>
        <button data-nav="forensics" class="nav-link">
          Forensics
        </button>

        <!-- Smooth Sliding Active Underline Indicator Bar -->
        <div id="nav-indicator" class="absolute bottom-0 left-0 h-0.5 bg-[#D6A84F] rounded-full transition-all duration-300 ease-out pointer-events-none opacity-0 shadow-[0_0_8px_rgba(214,168,79,0.6)]"></div>
      </nav>

      <!-- Right Action Container (SIH Evaluator Sample Files Dropdown) -->
      <div class="hidden md:flex items-center shrink-0">
        <div class="relative inline-block text-left" id="sample-menu-container">
          <button id="sample-dropdown-btn" type="button" class="border border-[#24282D] hover:border-[#D6A84F]/50 bg-[#15181C] text-xs px-3.5 py-2 rounded-xl text-[#9CA3AF] hover:text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-sm">
            <span class="material-symbols-outlined text-sm text-[#D6A84F]">folder_open</span>
            <span class="font-bold text-white">Sample Files</span>
            <span class="material-symbols-outlined text-xs">arrow_drop_down</span>
          </button>
          
          <!-- Floating Dropdown -->
          <div id="sample-dropdown-menu" class="hidden absolute right-0 mt-2 w-80 sm:w-88 bg-[#101214] border border-[#24282D] shadow-2xl rounded-xl p-2.5 z-50 backdrop-blur-md">
            <div class="px-2 py-1.5 border-b border-[#24282D] mb-1.5 flex justify-between items-center">
              <span class="text-[11px] font-mono uppercase tracking-wider text-[#D6A84F] font-bold">SIH Evaluator Test Files</span>
              <span class="text-[10px] text-[#9CA3AF] font-mono">Click to run • Icon to save</span>
            </div>
            <div id="sample-items-container" class="space-y-1.5">
              ${Object.keys(SAMPLE_EMAILS).map(key => {
                const item = SAMPLE_EMAILS[key];
                return `
                  <div class="group flex items-center justify-between p-2.5 rounded-lg bg-[#08090B] hover:bg-[#15181C] border border-transparent hover:border-[#D6A84F]/30 transition-all cursor-pointer" data-load-sample="${key}">
                    <div class="flex-1 pr-2">
                      <div class="flex items-center gap-2 mb-1">
                        <span class="text-xs font-bold text-white group-hover:text-[#D6A84F] transition-colors">${item.title}</span>
                        <span class="text-[9px] font-mono px-1.5 py-0.5 rounded border ${item.badgeClass}">${item.badge}</span>
                      </div>
                      <p class="text-[11px] text-[#9CA3AF] line-clamp-1 leading-tight">${item.description}</p>
                    </div>
                    <!-- Explicit Download Button -->
                    <button type="button" class="p-1.5 rounded hover:bg-[#24282D] text-[#9CA3AF] hover:text-[#D6A84F] transition-colors shrink-0" title="Download .eml file" data-download-sample="${key}">
                      <span class="material-symbols-outlined text-base">download</span>
                    </button>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Hamburger Menu Button -->
      <button id="btn-mobile-menu-toggle" class="md:hidden p-2 text-[#9CA3AF] hover:text-white transition-colors">
        <span class="material-symbols-outlined">menu</span>
      </button>

    </div>
  `;
}

// Decryption Scramble Engine for Logo Title
export function initLogoDecryptAnimation() {
  const targetText = "Tracex";
  const element = document.getElementById("brand-decrypt-text");
  const cursor = document.getElementById("brand-terminal-cursor");
  if (!element) return;

  const cipherChars = "01#x%_&$!*<>~@1389";
  let iteration = 0;
  const totalIterations = targetText.length * 3.5;

  // Keep cursor visible but paused while decrypting
  if (cursor) cursor.classList.remove("animate-blink");

  const decryptInterval = setInterval(() => {
    element.innerText = targetText
      .split("")
      .map((targetChar, index) => {
        // If this character position has finished resolving, lock in the real character
        if (index < iteration / 3.5) {
          return targetChar;
        }
        // Otherwise, return a random glitch / cipher glyph
        return cipherChars[Math.floor(Math.random() * cipherChars.length)];
      })
      .join("");

    if (iteration >= totalIterations) {
      clearInterval(decryptInterval);
      element.innerText = targetText; // Ensure pristine final casing "Tracex"
      
      // Start terminal underscore blinking once decrypt finishes
      if (cursor) cursor.classList.add("animate-blink");
    }

    iteration += 1;
  }, 45);
}

// TraceX - Trust Strip & How It Works Process Component

export function renderWorkflow() {
  return `
    <!-- Trust / Capability Strip -->
    <section class="border-y border-[#24282D]/40 bg-[#101214]/50 py-8 mb-16">
      <div class="max-w-7xl mx-auto px-6 lg:px-12">
        <div class="flex flex-wrap items-center justify-between gap-6 text-center md:text-left">
          <div class="text-xs font-mono font-semibold tracking-widest text-[#9CA3AF] uppercase">
            EMAIL ANALYSIS
          </div>
          <div class="hidden sm:block text-[#24282D]">•</div>
          <div class="text-xs font-mono font-semibold tracking-widest text-[#9CA3AF] uppercase">
            THREAT DETECTION
          </div>
          <div class="hidden sm:block text-[#24282D]">•</div>
          <div class="text-xs font-mono font-semibold tracking-widest text-[#9CA3AF] uppercase">
            INFRASTRUCTURE INTELLIGENCE
          </div>
          <div class="hidden sm:block text-[#24282D]">•</div>
          <div class="text-xs font-mono font-semibold tracking-widest text-[#9CA3AF] uppercase">
            DIGITAL FORENSICS
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="py-16 max-w-7xl mx-auto px-6 lg:px-12 scroll-mt-24">
      <div class="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <h2 class="text-3xl font-bold text-white tracking-tight">How TraceX Works</h2>
        <p class="text-base text-[#9CA3AF]">
          An end-to-end automated pipeline transforming raw email artifacts into verifiable forensic intelligence.
        </p>
      </div>

      <!-- Linear Pipeline Flow -->
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        
        <!-- Step 1 -->
        <div class="p-4 rounded-xl bg-[#101214] border border-[#24282D]/60 space-y-2 text-center">
          <span class="text-xs font-mono font-semibold text-[#D6A84F]">01</span>
          <h4 class="text-sm font-bold text-white">INGEST</h4>
          <p class="text-xs text-[#9CA3AF]">Raw .eml upload & header parsing</p>
        </div>

        <!-- Step 2 -->
        <div class="p-4 rounded-xl bg-[#101214] border border-[#24282D]/60 space-y-2 text-center">
          <span class="text-xs font-mono font-semibold text-[#D6A84F]">02</span>
          <h4 class="text-sm font-bold text-white">DETECT</h4>
          <p class="text-xs text-[#9CA3AF]">SPF, DKIM & DMARC alignment</p>
        </div>

        <!-- Step 3 -->
        <div class="p-4 rounded-xl bg-[#101214] border border-[#24282D]/60 space-y-2 text-center">
          <span class="text-xs font-mono font-semibold text-[#D6A84F]">03</span>
          <h4 class="text-sm font-bold text-white">ANALYZE</h4>
          <p class="text-xs text-[#9CA3AF]">AI classification & risk scoring</p>
        </div>

        <!-- Step 4 -->
        <div class="p-4 rounded-xl bg-[#101214] border border-[#24282D]/60 space-y-2 text-center">
          <span class="text-xs font-mono font-semibold text-[#D6A84F]">04</span>
          <h4 class="text-sm font-bold text-white">TRACE</h4>
          <p class="text-xs text-[#9CA3AF]">Relay hop & origin IP mapping</p>
        </div>

        <!-- Step 5 -->
        <div class="p-4 rounded-xl bg-[#101214] border border-[#24282D]/60 space-y-2 text-center">
          <span class="text-xs font-mono font-semibold text-[#D6A84F]">05</span>
          <h4 class="text-sm font-bold text-white">CORRELATE</h4>
          <p class="text-xs text-[#9CA3AF]">IOC matrix & threat campaign graph</p>
        </div>

        <!-- Step 6 -->
        <div class="p-4 rounded-xl bg-[#101214] border border-[#24282D]/60 space-y-2 text-center">
          <span class="text-xs font-mono font-semibold text-[#D6A84F]">06</span>
          <h4 class="text-sm font-bold text-white">PRESERVE</h4>
          <p class="text-xs text-[#9CA3AF]">SHA-256 evidence chain lock</p>
        </div>

        <!-- Step 7 -->
        <div class="p-4 rounded-xl bg-[#101214] border border-[#24282D]/60 space-y-2 text-center col-span-2 md:col-span-1">
          <span class="text-xs font-mono font-semibold text-[#D6A84F]">07</span>
          <h4 class="text-sm font-bold text-white">REPORT</h4>
          <p class="text-xs text-[#9CA3AF]">Executive PDF & JSON export</p>
        </div>

      </div>
    </section>
  `;
}

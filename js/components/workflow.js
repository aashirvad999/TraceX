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

    <!-- About SIH Project Section -->
    <section id="sih-project" class="pt-6 pb-16 max-w-7xl mx-auto px-6 lg:px-12 scroll-mt-24">
      <div class="bg-[#101214] border border-[#24282D] rounded-2xl p-6 lg:p-8 space-y-4 shadow-xl relative overflow-hidden">
        <div class="flex flex-wrap items-center gap-3">
          <span class="px-3 py-1 rounded-md bg-[#D6A84F]/10 border border-[#D6A84F]/30 text-[#D6A84F] text-xs font-mono font-bold uppercase">
            SIH 2026 Prototype
          </span>
          <span class="text-xs font-mono text-[#9CA3AF]">Smart India Hackathon 2026 Submission</span>
        </div>
        <h3 class="text-2xl font-bold text-white tracking-tight">AI-Powered Email Threat & Spam Detection System</h3>
        <p class="text-sm sm:text-base text-[#9CA3AF] leading-relaxed max-w-3xl">
          TraceX provides security analysts and cyber investigators with an automated, end-to-end detection pipeline. Upload any <code class="font-mono text-[#D6A84F] bg-[#08090B] px-1.5 py-0.5 rounded border border-[#24282D]">.eml</code> file to inspect SPF, DKIM, and DMARC authentication records, trace network hops, analyze header and body telemetry, and receive a clear 0–100 risk score in seconds.
        </p>
      </div>
    </section>
  `;
}


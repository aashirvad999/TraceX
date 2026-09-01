// TraceX - Executive Forensic Report & Export Component

export function renderForensicReport(currentCase = {}, activeEmail = {}, hasAnalyzedFile = true) {
  if (!hasAnalyzedFile || !activeEmail) return "";

  return `
    <section class="py-16 max-w-7xl mx-auto px-6 lg:px-12 border-t border-[#24282D]/60">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div class="space-y-2">
          <span class="text-xs font-mono font-semibold tracking-widest text-[#D6A84F] uppercase">09. EXECUTIVE FORENSIC REPORT</span>
          <h3 class="text-2xl font-bold text-white tracking-tight">Incident Intelligence Summary</h3>
          <p class="text-xs text-[#9CA3AF]">
            Printable and exportable executive forensic investigation report for SOC compliance and legal disclosure.
          </p>
        </div>

        <!-- Export Actions Bar -->
        <div class="flex items-center gap-3">
          <button id="btn-export-json" class="px-4 py-2.5 rounded-lg bg-[#15181C] border border-[#24282D] hover:border-[#D6A84F] text-white font-mono text-xs transition-colors inline-flex items-center gap-2">
            <span class="material-symbols-outlined text-sm">download</span>
            Export JSON Bundle
          </button>

          <button id="btn-export-pdf" class="px-5 py-2.5 rounded-lg bg-[#D6A84F] hover:bg-[#C2943E] text-[#08090B] font-bold text-xs transition-colors inline-flex items-center gap-2 shadow-md">
            <span class="material-symbols-outlined text-sm">print</span>
            Print / Save Executive PDF
          </button>
        </div>
      </div>

      <!-- Report Printable Document Card -->
      <div id="printable-report-card" class="bg-[#101214] border border-[#24282D] rounded-2xl p-8 lg:p-10 space-y-8 shadow-2xl">
        
        <!-- Report Header Strip -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#24282D]">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-[#D6A84F]/10 border border-[#D6A84F]/30 flex items-center justify-center text-[#D6A84F] font-mono text-base font-bold">
              TX
            </div>
            <div>
              <h4 class="text-lg font-bold text-white tracking-tight">TraceX Forensic Intelligence System</h4>
              <span class="text-xs font-mono text-[#9CA3AF]">Official Incident Investigation Dossier</span>
            </div>
          </div>

          <div class="text-left sm:text-right font-mono text-xs space-y-0.5">
            <div class="text-white font-bold">${currentCase.id || 'CASE-2026-0042'}</div>
            <div class="text-[#9CA3AF]">Date: ${activeEmail.date || '2026-09-01'}</div>
          </div>
        </div>

        <!-- Case Overview Executive Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
          <div class="bg-[#08090B] p-4 rounded-xl border border-[#24282D] space-y-2">
            <span class="text-[10px] text-[#9CA3AF] uppercase block">TARGET CLASSIFICATION</span>
            <div class="text-sm font-bold ${activeEmail.riskScore > 75 ? 'text-[#EF4444]' : activeEmail.riskScore > 35 ? 'text-[#F59E0B]' : 'text-[#10B981]'}">
              ${activeEmail.classification || 'EML THREAT'}
            </div>
            <p class="text-[11px] text-[#9CA3AF]">Risk Score: ${activeEmail.riskScore}/100</p>
          </div>

          <div class="bg-[#08090B] p-4 rounded-xl border border-[#24282D] space-y-2">
            <span class="text-[10px] text-[#9CA3AF] uppercase block">ORIGIN SENDER PATH</span>
            <div class="text-xs font-bold text-[#D6A84F] break-all">${activeEmail.sender || ''}</div>
            <p class="text-[11px] text-[#9CA3AF]">Reply-To: ${activeEmail.replyTo || ''}</p>
          </div>

          <div class="bg-[#08090B] p-4 rounded-xl border border-[#24282D] space-y-2">
            <span class="text-[10px] text-[#9CA3AF] uppercase block">EVIDENCE VAULT SEAL</span>
            <div class="text-xs font-bold text-[#10B981]">SHA-256 VERIFIED</div>
            <p class="text-[11px] text-[#9CA3AF] truncate">${currentCase.sha256 || ''}</p>
          </div>
        </div>

        <!-- Executive Narrative Findings -->
        <div class="bg-[#08090B] p-6 rounded-xl border border-[#24282D] space-y-3 text-xs leading-relaxed">
          <span class="text-[10px] font-mono text-[#D6A84F] uppercase font-bold tracking-wider block">EXECUTIVE INVESTIGATION FINDINGS</span>
          <p class="text-[#E5E7EB]">
            On ${activeEmail.date}, the TraceX Intelligence Engine ingested email evidence payload <code class="font-mono text-[#D6A84F]">${currentCase.fileName || 'evidence.eml'}</code> subject line <code class="font-mono text-white">"${activeEmail.subject}"</code>.
          </p>
          <p class="text-[#9CA3AF]">
            Analysis confirmed ${activeEmail.classification} signals with a threat score of <strong class="text-white font-mono">${activeEmail.riskScore}/100</strong>. Header relay tracking identified origin infrastructure from <strong class="text-white font-mono">${activeEmail.originGeo ? activeEmail.originGeo.probableOrigin : 'Remote Node'}</strong>. Cryptographic integrity has been sealed with SHA-256 hash checksums.
          </p>
        </div>

        <!-- Closing Final Action Strip -->
        <div class="pt-6 border-t border-[#24282D] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="text-xs text-[#9CA3AF] font-mono">
            Generated autonomously by TraceX • Enterprise Forensic Intelligence
          </div>
          <div class="text-xs font-bold text-[#D6A84F] font-mono">
            Trace the threat. Preserve the evidence.
          </div>
        </div>

      </div>

      <!-- Minimal Footer -->
      <footer class="mt-20 pt-8 border-t border-[#24282D]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9CA3AF] font-mono">
        <div>
          © 2026 TraceX Platform Inc. All rights reserved.
        </div>
        <div class="flex items-center gap-6">
          <a href="#platform" data-nav="platform" class="hover:text-white transition-colors">Platform</a>
          <a href="#how-it-works" data-nav="how-it-works" class="hover:text-white transition-colors">How It Works</a>
          <a href="#analyze" data-nav="analyze" class="hover:text-white transition-colors">Analyze Email</a>
        </div>
      </footer>

    </section>
  `;
}

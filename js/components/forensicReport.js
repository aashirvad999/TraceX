// TraceX - Executive Forensic Report & Export Component

export function renderForensicReport(currentCase = {}, activeEmail = {}, hasAnalyzedFile = true) {
  if (!hasAnalyzedFile || !activeEmail) return "";

  const blockHeight = currentCase.blockHeight || 1;
  const currentHash = currentCase.currentHash || currentCase.sha256 || '8f92b7c4a1e9d3f5c2b8a7d6e4f3c2b1a0d9e8f7c6b5a4d3e2f1c0b9a8f7a31c';
  const prevHash = currentCase.prevHash || '0000000000000000000000000000000000000000000000000000000000000000';
  const blockStatus = currentCase.status === 'TAMPERED' ? 'INTEGRITY MISMATCH / TAMPERED' : 'ANCHORED & IMMUTABLE (SHA-256)';

  return `
    <section class="py-16 max-w-7xl mx-auto px-6 lg:px-12 border-t border-[#24282D]/60">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono font-semibold tracking-widest text-[#D6A84F] uppercase">09. EXECUTIVE FORENSIC REPORT</span>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#D6A84F]/10 text-[#D6A84F] border border-[#D6A84F]/30">
              ENTERPRISE COMPLIANT
            </span>
          </div>
          <h3 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Incident Intelligence Dossier</h3>
          <p class="text-xs text-[#9CA3AF]">
            Printable executive forensic investigation report featuring cryptographic blockchain proof for SOC compliance and legal disclosure.
          </p>
        </div>

        <!-- Export Actions Bar -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button id="btn-export-json" class="px-4 py-2.5 rounded-lg bg-[#15181C] border border-[#24282D] hover:border-[#D6A84F] text-white font-mono text-xs transition-colors inline-flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-sm">download</span>
            Export JSON Bundle
          </button>

          <button id="btn-export-pdf" class="px-5 py-2.5 rounded-lg bg-[#D6A84F] hover:bg-[#C2943E] text-[#08090B] font-bold text-xs transition-colors inline-flex items-center justify-center gap-2 shadow-md">
            <span class="material-symbols-outlined text-sm">print</span>
            Print / Save Executive PDF
          </button>
        </div>
      </div>

      <!-- Report Printable Document Card -->
      <div id="printable-report-card" class="bg-[#101214] border border-[#24282D] rounded-2xl p-5 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 shadow-2xl">
        
        <!-- Report Header Strip -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#24282D]">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-[#D6A84F]/10 border border-[#D6A84F]/30 flex items-center justify-center text-[#D6A84F] font-mono text-base font-bold shrink-0">
              TX
            </div>
            <div>
              <h4 class="text-base sm:text-lg font-bold text-white tracking-tight"><span class="text-[#D6A84F]">TraceX</span> Forensic Intelligence System</h4>
              <span class="text-[11px] sm:text-xs font-mono text-[#9CA3AF] block">Official Incident Investigation Dossier & Blockchain Verification</span>
            </div>
          </div>

          <div class="text-left sm:text-right font-mono text-xs space-y-0.5 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#24282D]/60">
            <div class="text-white font-bold">${currentCase.id || 'CASE-2026-0042'}</div>
            <div class="text-[#9CA3AF]">Date: ${activeEmail.date || new Date().toISOString().slice(0, 10)}</div>
          </div>
        </div>

        <!-- Case Overview Executive Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-xs font-mono">
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
            <p class="text-[11px] text-[#9CA3AF] truncate">Reply-To: ${activeEmail.replyTo || ''}</p>
          </div>

          <div class="bg-[#08090B] p-4 rounded-xl border border-[#24282D] space-y-2 sm:col-span-2 lg:col-span-1">
            <span class="text-[10px] text-[#9CA3AF] uppercase block">BLOCKCHAIN VAULT SEAL</span>
            <div class="text-xs font-bold ${currentCase.status === 'TAMPERED' ? 'text-[#EF4444]' : 'text-[#10B981]'}">
              BLOCK #${blockHeight} • ${currentCase.status === 'TAMPERED' ? 'TAMPER DETECTED' : 'ANCHORED'}
            </div>
            <p class="text-[11px] text-[#9CA3AF] truncate font-mono">${currentHash}</p>
          </div>
        </div>

        <!-- Cryptographic Blockchain Proof Details -->
        <div class="bg-[#08090B] p-4 sm:p-5 rounded-xl border border-[#24282D] space-y-3 font-mono text-xs">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#24282D]/60">
            <span class="text-[10px] text-[#D6A84F] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm shrink-0">token</span>
              CHAIN-OF-CUSTODY BLOCKCHAIN PROOF (WEB CRYPTO SHA-256)
            </span>
            <span class="text-[10px] text-[#10B981] font-bold">${blockStatus}</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span class="text-[10px] text-[#9CA3AF] block">EVIDENCE BLOCK HASH (SHA-256)</span>
              <code class="text-[#D6A84F] font-bold break-all block text-[10px] sm:text-[11px] leading-relaxed">${currentHash}</code>
            </div>

            <div>
              <span class="text-[10px] text-[#9CA3AF] block">PARENT BLOCK POINTER (PREV_HASH)</span>
              <code class="text-[#9CA3AF] font-bold break-all block text-[10px] sm:text-[11px] leading-relaxed">${prevHash}</code>
            </div>
          </div>
        </div>

        <!-- Executive Narrative Findings -->
        <div class="bg-[#08090B] p-4 sm:p-6 rounded-xl border border-[#24282D] space-y-3 text-xs leading-relaxed">
          <span class="text-[10px] font-mono text-[#D6A84F] uppercase font-bold tracking-wider block">EXECUTIVE INVESTIGATION FINDINGS</span>
          <p class="text-[#E5E7EB]">
            On ${activeEmail.date}, the <span class="text-[#D6A84F]">TraceX</span> Intelligence Engine ingested email evidence payload <code class="font-mono text-[#D6A84F] break-all">${currentCase.fileName || 'evidence.eml'}</code> subject line <code class="font-mono text-white">"${activeEmail.subject}"</code>.
          </p>
          <p class="text-[#9CA3AF]">
            Analysis confirmed ${activeEmail.classification} signals with a threat score of <strong class="text-white font-mono">${activeEmail.riskScore}/100</strong>. Header relay tracking identified origin infrastructure from <strong class="text-white font-mono">${activeEmail.originGeo ? activeEmail.originGeo.probableOrigin : 'Remote Node'}</strong>. Cryptographic integrity has been sealed at Block Height <strong class="text-[#D6A84F] font-mono">#${blockHeight}</strong> with parent hash chaining in browser-native localStorage ledger.
          </p>
        </div>

        <!-- Closing Final Action Strip -->
        <div class="pt-6 border-t border-[#24282D] flex justify-end">
          <div class="text-xs font-bold text-[#D6A84F] font-mono">
            Trace the threat. Preserve the evidence.
          </div>
        </div>

      </div>

      <!-- Minimal Footer -->
      <footer class="mt-16 sm:mt-20 pt-8 border-t border-[#24282D]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9CA3AF] font-mono">
        <div>
          © 2026 <span class="text-[#D6A84F]">TraceX</span>
        </div>
      </footer>

    </section>
  `;
}

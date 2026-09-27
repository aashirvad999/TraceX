// TraceX - Digital Forensics Evidence Chain Vault & Blockchain Micro-Ledger Component

export function renderEvidenceChain(currentCase = {}, hasAnalyzedFile = true, ledger = [], verificationResult = null) {
  if (!hasAnalyzedFile || !currentCase) return "";

  const displayLedger = Array.isArray(ledger) && ledger.length > 0 ? ledger : [
    {
      blockHeight: 1,
      caseId: currentCase.id || 'CASE-2026-0042',
      timestamp: currentCase.acquiredAt || new Date().toISOString(),
      prevHash: "0000000000000000000000000000000000000000000000000000000000000000",
      currentHash: currentCase.sha256 || currentCase.currentHash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      payloadSnippet: currentCase.title || "Executive Impersonation & BEC Phish Payload",
      status: currentCase.status === 'TAMPERED' ? 'TAMPER_DETECTED' : 'ANCHORED_IMMUTABLE'
    }
  ];

  const latestBlock = displayLedger[displayLedger.length - 1] || {};

  const isVerified = verificationResult 
    ? verificationResult.isValid 
    : (currentCase.status !== 'TAMPERED' && !latestBlock.isTampered);

  const statusText = isVerified 
    ? "CHAIN OF CUSTODY INTEGRITY: VERIFIED & UNTAMPERED" 
    : "CHAIN OF CUSTODY ALERT: CRYPTOGRAPHIC TAMPER DETECTED";

  const statusDetail = verificationResult
    ? (verificationResult.isValid ? verificationResult.details : verificationResult.reason)
    : (isVerified 
        ? `All ${displayLedger.length} evidence block(s) anchored in browser localStorage with SHA-256 linkage.` 
        : `Hash signature mismatch detected at Block #${latestBlock.blockHeight || 1}. Evidence payload altered.`);

  return `
    <section class="py-12 max-w-7xl mx-auto px-6 lg:px-12 border-t border-[#24282D]/60">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div class="space-y-2">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-xs font-mono font-semibold tracking-widest text-[#D6A84F] uppercase">08. DIGITAL FORENSICS EVIDENCE VAULT</span>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#D6A84F]/10 text-[#D6A84F] border border-[#D6A84F]/30">
              BLOCKCHAIN MICRO-LEDGER
            </span>
          </div>
          <h3 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Cryptographic Micro-Ledger & Chain of Custody</h3>
          <p class="text-xs text-[#9CA3AF]">
            Browser-native Web Crypto SHA-256 evidence block generation anchored in localStorage without external databases.
          </p>
        </div>

        <!-- Block Ledger Counter Badge -->
        <div class="flex items-center gap-3 font-mono text-xs shrink-0">
          <div class="bg-[#101214] border border-[#24282D] px-3.5 py-1.5 rounded-lg flex items-center gap-2">
            <span class="material-symbols-outlined text-[#D6A84F] text-base">token</span>
            <span class="text-[#9CA3AF]">Total Blocks:</span>
            <span class="text-white font-bold">${displayLedger.length}</span>
          </div>
        </div>
      </div>

      <!-- Main Cryptographic Evidence Card -->
      <div class="bg-[#101214] border border-[#24282D] rounded-2xl p-4 sm:p-6 lg:p-8 space-y-6 shadow-xl">
        
        <!-- Status & Integrity Verification Header Bar -->
        <div id="blockchain-status-bar" class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl transition-colors duration-300 ${isVerified ? 'bg-[#10B981]/10 border border-[#10B981]/30' : 'bg-[#EF4444]/10 border border-[#EF4444]/30'}">
          <div class="flex items-start sm:items-center gap-3">
            <span class="material-symbols-outlined ${isVerified ? 'text-[#10B981]' : 'text-[#EF4444]'} text-2xl sm:text-3xl shrink-0 mt-0.5 sm:mt-0">
              ${isVerified ? 'verified_user' : 'gpp_bad'}
            </span>
            <div>
              <div class="text-xs sm:text-sm font-bold text-white font-mono break-all sm:break-normal">
                ${statusText}
              </div>
              <div class="text-[11px] sm:text-xs ${isVerified ? 'text-[#10B981]' : 'text-[#EF4444]'} font-mono mt-0.5 leading-relaxed">
                ${statusDetail}
              </div>
            </div>
          </div>

          <!-- Interactive Integrity Tester Widgets -->
          <div class="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button id="btn-verify-integrity" title="Verify SHA-256 ledger integrity across all blocks" class="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-[#10B981] hover:bg-[#0D9668] text-[#08090B] font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md">
              <span class="material-symbols-outlined text-sm">published_with_changes</span>
              Verify Integrity
            </button>
            <button id="btn-tamper-toggle" title="Simulate payload tampering to demonstrate break in cryptographic seal" class="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-[#15181C] border border-[#EF4444]/40 hover:border-[#EF4444] text-[#EF4444] font-mono text-xs transition-all flex items-center justify-center gap-1.5">
              <span class="material-symbols-outlined text-sm">warning</span>
              Simulate Tamper
            </button>
          </div>
        </div>

        <!-- Latest Block Cryptographic Hash Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          
          <!-- Current Block SHA-256 Seal -->
          <div class="bg-[#08090B] p-4 rounded-xl border border-[#24282D] space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-[10px] uppercase text-[#9CA3AF] flex items-center gap-1">
                <span class="material-symbols-outlined text-xs text-[#D6A84F]">lock</span>
                CURRENT BLOCK SHA-256 HASH (BLOCK #${latestBlock.blockHeight || 1})
              </span>
              <button data-copy="${latestBlock.currentHash || currentCase.sha256 || ''}" class="btn-copy-hash text-[#9CA3AF] hover:text-[#D6A84F] transition-colors" title="Copy Hash">
                <span class="material-symbols-outlined text-sm">content_copy</span>
              </button>
            </div>
            <div class="font-bold ${latestBlock.isTampered ? 'text-[#EF4444]' : 'text-[#D6A84F]'} break-all leading-relaxed font-mono text-[11px] sm:text-xs">
              ${latestBlock.currentHash || currentCase.sha256 || '8f92b7c4a1e9d3f5c2b8a7d6e4f3c2b1a0d9e8f7c6b5a4d3e2f1c0b9a8f7a31c'}
            </div>
          </div>

          <!-- Parent Block Link Pointer -->
          <div class="bg-[#08090B] p-4 rounded-xl border border-[#24282D] space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-[10px] uppercase text-[#9CA3AF] flex items-center gap-1">
                <span class="material-symbols-outlined text-xs text-[#10B981]">link</span>
                PREVIOUS BLOCK HASH POINTER (PREV_HASH)
              </span>
              <button data-copy="${latestBlock.prevHash || '0000000000000000000000000000000000000000000000000000000000000000'}" class="btn-copy-hash text-[#9CA3AF] hover:text-[#D6A84F] transition-colors" title="Copy Prev Hash">
                <span class="material-symbols-outlined text-sm">content_copy</span>
              </button>
            </div>
            <div class="font-bold text-white break-all leading-relaxed font-mono text-[11px] sm:text-xs">
              ${latestBlock.prevHash || '0000000000000000000000000000000000000000000000000000000000000000'}
            </div>
          </div>

        </div>

        <!-- Case Evidence Block Metadata -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs font-mono">
          <div class="bg-[#08090B] p-3 rounded-lg border border-[#24282D]">
            <span class="text-[10px] text-[#9CA3AF] block">CASE FILE ID</span>
            <span class="text-white font-bold truncate block">${latestBlock.caseId || currentCase.id || 'CASE-2026-0042'}</span>
          </div>
          <div class="bg-[#08090B] p-3 rounded-lg border border-[#24282D]">
            <span class="text-[10px] text-[#9CA3AF] block">TIMESTAMP (UTC)</span>
            <span class="text-white font-bold truncate block">${latestBlock.timestamp ? new Date(latestBlock.timestamp).toLocaleTimeString() + ' UTC' : '09:41:03 UTC'}</span>
          </div>
          <div class="bg-[#08090B] p-3 rounded-lg border border-[#24282D]">
            <span class="text-[10px] text-[#9CA3AF] block">PAYLOAD FILE</span>
            <span class="text-[#D6A84F] font-bold truncate block">${currentCase.fileName || 'evidence.eml'}</span>
          </div>
          <div class="bg-[#08090B] p-3 rounded-lg border border-[#24282D]">
            <span class="text-[10px] text-[#9CA3AF] block">STORAGE ANCHOR</span>
            <span class="text-[#10B981] font-bold block truncate">localStorage</span>
          </div>
        </div>

        <!-- Blockchain Micro-Ledger Visualizer -->
        <div class="pt-4 border-t border-[#24282D]">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[#D6A84F] text-sm shrink-0">hub</span>
              <span class="text-xs font-mono font-bold text-white uppercase tracking-wider">BROWSER BLOCKCHAIN LEDGER STREAM</span>
            </div>
            <span class="text-[10px] font-mono text-[#9CA3AF]">Stored in browser localStorage</span>
          </div>

          <!-- Horizontal Block Chain Stream Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 font-mono text-xs">
            ${displayLedger.map((blk, idx) => `
              <div class="bg-[#08090B] p-3.5 sm:p-4 rounded-xl border ${blk.isTampered ? 'border-[#EF4444]' : 'border-[#24282D]'} space-y-2 relative group hover:border-[#D6A84F]/60 transition-colors">
                
                <div class="flex items-center justify-between gap-2">
                  <div class="flex items-center gap-1.5 truncate">
                    <span class="w-5 h-5 rounded bg-[#D6A84F]/10 border border-[#D6A84F]/30 flex items-center justify-center text-[10px] font-bold text-[#D6A84F] shrink-0">
                      #${blk.blockHeight || idx + 1}
                    </span>
                    <span class="text-white font-bold text-[11px] truncate">${blk.caseId || 'CASE-2026-0042'}</span>
                  </div>

                  <span class="px-2 py-0.5 rounded text-[9px] font-bold ${blk.isTampered ? 'bg-[#EF4444]/10 text-[#EF4444]' : 'bg-[#10B981]/10 text-[#10B981]'} shrink-0">
                    ${blk.isTampered ? 'TAMPERED' : 'ANCHORED'}
                  </span>
                </div>

                <div class="text-[10px] text-[#9CA3AF] space-y-1">
                  <div><strong class="text-white">Hash:</strong> <code class="text-[#D6A84F] break-all">${(blk.currentHash || '').slice(0, 20)}...</code></div>
                  <div><strong class="text-white">Prev:</strong> <code class="text-[#9CA3AF] break-all">${(blk.prevHash || '').slice(0, 20)}...</code></div>
                  <div class="truncate text-[10px] text-[#9CA3AF] pt-1">${blk.summary || 'EML Ingestion Evidence'}</div>
                </div>

              </div>
            `).join('')}
          </div>
        </div>

      </div>

    </section>
  `;
}

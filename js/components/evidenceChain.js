// TraceX - Digital Forensics Evidence Chain Vault Component

export function renderEvidenceChain(currentCase = {}, hasAnalyzedFile = true) {
  if (!hasAnalyzedFile || !currentCase) return "";

  const isVerified = currentCase.status === 'VERIFIED';

  return `
    <section class="py-12 max-w-7xl mx-auto px-6 lg:px-12 border-t border-[#24282D]/60">
      
      <!-- Section Header -->
      <div class="space-y-2 mb-8">
        <span class="text-xs font-mono font-semibold tracking-widest text-[#D6A84F] uppercase">08. DIGITAL FORENSICS EVIDENCE VAULT</span>
        <h3 class="text-xl font-bold text-white tracking-tight">Chain of Custody & Cryptographic Hashing</h3>
        <p class="text-xs text-[#9CA3AF]">
          Cryptographic SHA-256 and MD5 hash integrity verification securing RFC822 payload evidence.
        </p>
      </div>

      <!-- Main Cryptographic Evidence Card -->
      <div class="bg-[#101214] border border-[#24282D] rounded-2xl p-6 lg:p-8 space-y-6 shadow-xl">
        
        <!-- Status & Integrity Verification Header Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl ${isVerified ? 'bg-[#10B981]/10 border border-[#10B981]/30' : 'bg-[#EF4444]/10 border border-[#EF4444]/30'}">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined ${isVerified ? 'text-[#10B981]' : 'text-[#EF4444]'} text-2xl">
              ${isVerified ? 'verified_user' : 'gpp_bad'}
            </span>
            <div>
              <div class="text-sm font-bold text-white font-mono">
                Chain of Custody Status: ${isVerified ? 'VERIFIED & UNTAMPERED' : 'INTEGRITY MISMATCH / TAMPERED'}
              </div>
              <div class="text-xs ${isVerified ? 'text-[#10B981]' : 'text-[#EF4444]'} font-mono">
                ${isVerified ? 'Cryptographic SHA-256 hash matches original vault seal.' : 'Hash signature mismatch detected. Evidence payload modified.'}
              </div>
            </div>
          </div>

          <!-- Interactive Integrity Tester Toggle -->
          <div class="flex items-center gap-2 shrink-0">
            <button id="btn-verify-integrity" class="px-3.5 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#0D9668] text-[#08090B] font-bold text-xs transition-colors">
              Re-Verify Seal
            </button>
            <button id="btn-tamper-toggle" class="px-3.5 py-1.5 rounded-lg bg-[#15181C] border border-[#24282D] hover:border-[#EF4444] text-[#EF4444] font-mono text-xs transition-colors">
              Simulate Tamper
            </button>
          </div>
        </div>

        <!-- Hash Signature Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          
          <div class="bg-[#08090B] p-4 rounded-xl border border-[#24282D] space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-[10px] uppercase text-[#9CA3AF]">SHA-256 HASH SIGNATURE</span>
              <button data-copy="${currentCase.sha256 || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}" class="btn-copy-hash text-[#9CA3AF] hover:text-[#D6A84F] transition-colors">
                <span class="material-symbols-outlined text-sm">content_copy</span>
              </button>
            </div>
            <div class="font-bold text-[#D6A84F] break-all leading-relaxed">${currentCase.sha256 || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}</div>
          </div>

          <div class="bg-[#08090B] p-4 rounded-xl border border-[#24282D] space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-[10px] uppercase text-[#9CA3AF]">MD5 HASH SIGNATURE</span>
              <button data-copy="${currentCase.md5 || 'd41d8cd98f00b204e9800998ecf8427e'}" class="btn-copy-hash text-[#9CA3AF] hover:text-[#D6A84F] transition-colors">
                <span class="material-symbols-outlined text-sm">content_copy</span>
              </button>
            </div>
            <div class="font-bold text-white break-all leading-relaxed">${currentCase.md5 || 'd41d8cd98f00b204e9800998ecf8427e'}</div>
          </div>

        </div>

        <!-- Case Evidence Metadata -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div class="bg-[#08090B] p-3 rounded-lg border border-[#24282D]">
            <span class="text-[10px] text-[#9CA3AF] block">CASE FILE ID</span>
            <span class="text-white font-bold">${currentCase.id || 'CASE-2026-0042'}</span>
          </div>
          <div class="bg-[#08090B] p-3 rounded-lg border border-[#24282D]">
            <span class="text-[10px] text-[#9CA3AF] block">INGESTION TIME</span>
            <span class="text-white font-bold">${currentCase.createdAt || '09:41:03 UTC'}</span>
          </div>
          <div class="bg-[#08090B] p-3 rounded-lg border border-[#24282D]">
            <span class="text-[10px] text-[#9CA3AF] block">PAYLOAD FILE</span>
            <span class="text-[#D6A84F] font-bold truncate block">${currentCase.fileName || 'evidence.eml'}</span>
          </div>
          <div class="bg-[#08090B] p-3 rounded-lg border border-[#24282D]">
            <span class="text-[10px] text-[#9CA3AF] block">INVESTIGATOR</span>
            <span class="text-white font-bold">${currentCase.analyst || 'TraceX SOC Agent'}</span>
          </div>
        </div>

      </div>

    </section>
  `;
}

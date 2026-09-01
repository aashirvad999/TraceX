// TraceX - Minimal Hero Section Component

export function renderHero(activeEmail = null, hasAnalyzedFile = false) {
  const isHighRisk = activeEmail && activeEmail.riskScore > 75;
  const isMedRisk = activeEmail && activeEmail.riskScore > 30 && activeEmail.riskScore <= 75;
  
  const scoreColorClass = isHighRisk ? 'text-[#EF4444]' : isMedRisk ? 'text-[#F59E0B]' : 'text-[#10B981]';
  const scoreBgClass = isHighRisk ? 'border-[#EF4444] text-[#EF4444]' : isMedRisk ? 'border-[#F59E0B] text-[#F59E0B]' : 'border-[#10B981] text-[#10B981]';

  return `
    <section id="platform" class="relative pt-24 pb-20 max-w-7xl mx-auto px-6 lg:px-12 scroll-mt-24">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <!-- Left Headline & Copy Column -->
        <div class="lg:col-span-7 space-y-8">
          
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15181C] border border-[#24282D] text-xs font-mono text-[#D6A84F]">
            <span class="w-2 h-2 rounded-full bg-[#D6A84F] animate-pulse"></span>
            Enterprise Email Threat Intelligence Platform
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            AI-Powered Email Threat Detection & <span class="text-[#D6A84F]">Forensic Intelligence</span>
          </h1>

          <p class="text-lg text-[#9CA3AF] leading-relaxed max-w-2xl">
            TraceX parses raw RFC822 email evidence, verifies authentication protocols, traces infrastructure hops, and generates cryptographically sealed forensic dossiers.
          </p>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button data-nav="analyze" class="px-7 py-3.5 rounded-lg bg-[#D6A84F] hover:bg-[#C2943E] text-[#08090B] font-bold text-sm transition-colors text-center shadow-lg flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-lg">radar</span>
              Analyze an Email
            </button>
            <button data-nav="how-it-works" class="px-7 py-3.5 rounded-lg bg-[#15181C] border border-[#24282D] hover:border-[#D6A84F] text-white font-medium text-sm transition-colors text-center">
              Explore TraceX Architecture
            </button>
          </div>

        </div>

        <!-- Right Dynamic Product Preview Card Column (No Hardcoded Dummy Data) -->
        <div class="lg:col-span-5 relative">
          
          <div class="bg-[#101214] border border-[#24282D] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative z-10">
            
            ${hasAnalyzedFile && activeEmail ? `
              <!-- Active Analyzed File Live Preview Card -->
              <div class="flex items-center justify-between pb-4 border-b border-[#24282D]">
                <div class="flex items-center gap-2 text-xs font-mono font-bold text-[#D6A84F]">
                  <span class="w-2 h-2 rounded-full bg-[#D6A84F] animate-pulse"></span>
                  THREAT ANALYZED
                </div>
                <span class="text-xs font-mono text-[#9CA3AF]">${activeEmail.id || 'EVIDENCE-01'}</span>
              </div>

              <div class="space-y-2">
                <div class="text-xs font-mono uppercase ${scoreColorClass} font-bold">${activeEmail.classification}</div>
                <h3 class="text-xl font-bold text-white tracking-tight line-clamp-2">${activeEmail.subject}</h3>
                <div class="text-xs text-[#9CA3AF] font-mono truncate">From: ${activeEmail.sender}</div>
              </div>

              <div class="p-4 rounded-xl bg-[#08090B] border border-[#24282D] flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono text-[#9CA3AF] uppercase block">DYNAMIC RISK SCORE</span>
                  <div class="text-2xl font-extrabold font-mono ${scoreColorClass}">${activeEmail.riskScore} / 100</div>
                </div>
                <div class="px-3 py-1 rounded-full border text-xs font-mono font-bold ${scoreBgClass}">
                  ${isHighRisk ? 'HIGH RISK' : isMedRisk ? 'SUSPICIOUS' : 'CLEAN'}
                </div>
              </div>

              <div class="pt-2 flex items-center justify-between text-xs text-[#9CA3AF]">
                <span class="flex items-center gap-1.5 font-mono text-emerald-400">
                  <span class="material-symbols-outlined text-sm">check_circle</span>
                  Infrastructure traced (${activeEmail.relayHops ? activeEmail.relayHops.length : 4} hops)
                </span>
                <button data-nav="threat-intelligence" class="text-[#D6A84F] font-bold hover:underline inline-flex items-center gap-0.5">
                  View Investigation →
                </button>
              </div>
            ` : `
              <!-- Initial Idle State Preview Card (No File Analyzed Yet) -->
              <div class="flex items-center justify-between pb-4 border-b border-[#24282D]">
                <div class="flex items-center gap-2 text-xs font-mono font-bold text-[#10B981]">
                  <span class="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                  INGESTION ENGINE READY
                </div>
                <span class="text-xs font-mono text-[#9CA3AF]">v2.4 SECURE</span>
              </div>

              <div class="space-y-2">
                <div class="text-xs font-mono uppercase text-[#D6A84F] font-bold">AWAITING EVIDENCE PAYLOAD</div>
                <h3 class="text-xl font-bold text-white tracking-tight">TraceX Threat Analysis System</h3>
                <p class="text-xs text-[#9CA3AF] leading-relaxed">
                  Upload an .eml payload file to execute automated AI scanning, spoof verification, and authentication diagnostics.
                </p>
              </div>

              <div class="p-4 rounded-xl bg-[#08090B] border border-[#24282D] flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono text-[#9CA3AF] uppercase block">ENGINE STATUS</span>
                  <div class="text-sm font-bold text-white font-mono">READY FOR INGESTION</div>
                </div>
                <div class="px-3 py-1 rounded-full border border-[#24282D] text-xs font-mono text-[#D6A84F]">
                  RFC822 PARSER
                </div>
              </div>

              <div class="pt-2 flex items-center justify-between text-xs text-[#9CA3AF]">
                <span class="flex items-center gap-1.5 font-mono">
                  <span class="material-symbols-outlined text-sm text-[#D6A84F]">verified</span>
                  SHA-256 Custody Vault
                </span>
                <button data-nav="analyze" class="text-[#D6A84F] font-bold hover:underline inline-flex items-center gap-0.5">
                  Upload .eml File →
                </button>
              </div>
            `}

          </div>

          <div class="absolute -inset-4 bg-gradient-to-r from-[#D6A84F]/10 to-transparent rounded-3xl blur-2xl pointer-events-none"></div>

        </div>

      </div>
    </section>
  `;
}

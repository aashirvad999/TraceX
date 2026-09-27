// TraceX - Hop-by-Hop Header Relay Forensics Component

export function renderHeaderForensics(activeEmail = {}, hasAnalyzedFile = true) {
  if (!hasAnalyzedFile || !activeEmail || !activeEmail.relayHops) return "";

  const hops = activeEmail.relayHops;
  const firstHop = hops[0] || {};

  return `
    <section class="py-12 max-w-7xl mx-auto px-6 lg:px-12 border-t border-[#24282D]/60">
      
      <!-- Section Header -->
      <div class="space-y-2 mb-8">
        <span class="text-xs font-mono font-semibold tracking-widest text-[#D6A84F] uppercase">03. RELAY INFRASTRUCTURE FORENSICS</span>
        <h3 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Hop-by-Hop SMTP Path Analysis</h3>
        <p class="text-xs text-[#9CA3AF]">
          Sequential extraction of Received headers detailing IP origin, intermediary transit nodes, and latency timestamps.
        </p>
      </div>

      <!-- Hop Steps Horizontal Grid (1 column mobile, 2 columns tablet, 4 columns desktop) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        ${hops.map((hop, idx) => `
          <button data-hop-index="${idx}" class="btn-select-hop text-left p-4 rounded-xl bg-[#101214] border ${idx === 0 ? 'border-[#D6A84F]' : 'border-[#24282D]'} hover:border-[#D6A84F]/60 transition-colors space-y-2 group">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-mono font-bold text-[#D6A84F] uppercase">HOP 0${hop.step}</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded ${hop.status === 'HIGH-RISK' || hop.status === 'SUSPICIOUS' ? 'bg-[#EF4444]/10 text-[#EF4444]' : 'bg-[#10B981]/10 text-[#10B981]'}">
                ${hop.status}
              </span>
            </div>
            
            <div class="space-y-0.5">
              <div class="text-xs font-bold text-white group-hover:text-[#D6A84F] transition-colors truncate">${hop.label}</div>
              <div class="text-[11px] font-mono text-[#9CA3AF] break-all">${hop.ip}</div>
            </div>

            <div class="text-[10px] font-mono text-[#9CA3AF] pt-2 border-t border-[#24282D] flex items-center justify-between gap-1">
              <span class="truncate">${hop.country}</span>
              <span class="shrink-0">${hop.latency}</span>
            </div>
          </button>
        `).join('')}
      </div>

      <!-- Active Hop Detail Panel -->
      <div id="hop-detail-panel" class="bg-[#101214] border border-[#24282D] rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#24282D]">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-[#D6A84F] text-lg shrink-0">dns</span>
            <span id="hop-detail-title" class="text-xs sm:text-sm font-bold text-white font-mono break-all">Hop 01 Metadata: ${firstHop.label || ''}</span>
          </div>
          <span id="hop-detail-status" class="font-mono text-xs px-2.5 py-0.5 rounded ${firstHop.status === 'HIGH-RISK' || firstHop.status === 'SUSPICIOUS' ? 'bg-[#EF4444]/10 text-[#EF4444]' : 'bg-[#10B981]/10 text-[#10B981]'} self-start sm:self-auto">
            ${firstHop.status || 'NORMAL'}
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs">
          <div class="bg-[#08090B] p-3.5 rounded-xl border border-[#24282D] space-y-1">
            <span class="text-[10px] font-mono uppercase text-[#9CA3AF] block">RESOLVED IP</span>
            <div id="hop-detail-ip" class="font-mono font-bold text-white break-all">${firstHop.ip || ''}</div>
          </div>
          <div class="bg-[#08090B] p-3.5 rounded-xl border border-[#24282D] space-y-1">
            <span class="text-[10px] font-mono uppercase text-[#9CA3AF] block">LOCATION & ASN</span>
            <div id="hop-detail-asn" class="font-mono text-white break-all">${firstHop.country || ''} • ${firstHop.asn || ''}</div>
          </div>
          <div class="bg-[#08090B] p-3.5 rounded-xl border border-[#24282D] space-y-1">
            <span class="text-[10px] font-mono uppercase text-[#9CA3AF] block">TIMESTAMP</span>
            <div id="hop-detail-time" class="font-mono text-white">${firstHop.timestamp || ''}</div>
          </div>
          <div class="bg-[#08090B] p-3.5 rounded-xl border border-[#24282D] space-y-1">
            <span class="text-[10px] font-mono uppercase text-[#9CA3AF] block">DELTA LATENCY</span>
            <div id="hop-detail-latency" class="font-mono text-[#D6A84F]">${firstHop.latency || ''}</div>
          </div>
        </div>

        <div class="bg-[#08090B] p-4 rounded-xl border border-[#24282D] space-y-1 text-xs">
          <span class="text-[10px] font-mono uppercase text-[#9CA3AF] block">FORENSIC OBSERVATION</span>
          <p id="hop-detail-desc" class="text-[#9CA3AF] leading-relaxed">${firstHop.detail || ''}</p>
        </div>
      </div>

    </section>
  `;
}

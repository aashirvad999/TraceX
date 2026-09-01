// TraceX - Geographic Transit Route Map Component

export function renderMapVisualizer(originGeo = {}, hasAnalyzedFile = true) {
  if (!hasAnalyzedFile || !originGeo) return "";

  const routeHops = originGeo.route || ["Origin", "Relay Node", "Cloud Gateway", "Target MX"];

  return `
    <section class="py-12 max-w-7xl mx-auto px-6 lg:px-12 border-t border-[#24282D]/60">
      
      <!-- Section Header -->
      <div class="space-y-2 mb-8">
        <span class="text-xs font-mono font-semibold tracking-widest text-[#D6A84F] uppercase">04. GEOGRAPHIC INFRASTRUCTURE ROUTE</span>
        <h3 class="text-xl font-bold text-white tracking-tight">Geographic Origin & Transit Route</h3>
        <p class="text-xs text-[#9CA3AF]">
          Mapped geographic nodes derived from header hops and ASN network telemetry.
        </p>
      </div>

      <div class="bg-[#101214] border border-[#24282D] rounded-2xl p-6 space-y-6 shadow-xl">
        
        <!-- Interactive Geographic Map Graphic Representation -->
        <div class="relative w-full h-64 sm:h-80 bg-[#08090B] border border-[#24282D] rounded-xl overflow-hidden flex items-center justify-center p-6">
          
          <!-- Subtle Grid Backdrop Overlay -->
          <div class="absolute inset-0 bg-[radial-gradient(#24282D_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

          <!-- Transit Vector Connection Lines -->
          <div class="relative z-10 w-full max-w-3xl flex items-center justify-between gap-2 sm:gap-4">
            
            ${routeHops.map((nodeIp, idx) => `
              <div class="flex flex-col items-center text-center space-y-2 group">
                <div class="w-10 h-10 rounded-full ${idx === 0 ? 'bg-[#EF4444]/20 border-2 border-[#EF4444] text-[#EF4444]' : idx === routeHops.length - 1 ? 'bg-[#10B981]/20 border-2 border-[#10B981] text-[#10B981]' : 'bg-[#D6A84F]/10 border-2 border-[#D6A84F] text-[#D6A84F]'} flex items-center justify-center font-mono text-xs font-bold shadow-md group-hover:scale-110 transition-transform">
                  0${idx + 1}
                </div>
                <div class="space-y-0.5">
                  <span class="text-[11px] font-bold text-white block line-clamp-1">${nodeIp}</span>
                  <span class="text-[10px] font-mono text-[#9CA3AF] block">${idx === 0 ? 'Attacker Subnet' : idx === routeHops.length - 1 ? 'Internal MX' : 'Transit Node'}</span>
                </div>
              </div>

              ${idx < routeHops.length - 1 ? `
                <div class="flex-1 h-0.5 border-t-2 border-dashed border-[#D6A84F]/40 relative top-[-14px]"></div>
              ` : ''}
            `).join('')}

          </div>

          <!-- Geolocation Disclaimer Pill -->
          <div class="absolute bottom-3 left-4 right-4 sm:left-6 sm:right-auto bg-[#15181C]/90 backdrop-blur border border-[#24282D] px-3 py-1.5 rounded-lg text-[11px] font-mono text-[#9CA3AF] flex items-center gap-2">
            <span class="material-symbols-outlined text-sm text-[#D6A84F]">info</span>
            <span>${originGeo.disclaimer || 'Observed header network routing infrastructure.'}</span>
          </div>

        </div>

        <!-- Summary Geo Metrics Strip -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div class="bg-[#08090B] p-4 rounded-xl border border-[#24282D] space-y-1">
            <span class="text-[10px] font-mono uppercase text-[#9CA3AF] block">PRIMARY SENDING NODE</span>
            <div class="font-bold text-white font-mono">${originGeo.sendingNode || 'External Node'}</div>
          </div>
          <div class="bg-[#08090B] p-4 rounded-xl border border-[#24282D] space-y-1">
            <span class="text-[10px] font-mono uppercase text-[#9CA3AF] block">PROBABLE ORIGIN INFRASTRUCTURE</span>
            <div class="font-bold text-[#D6A84F] font-mono">${originGeo.probableOrigin || 'Remote Relay'}</div>
          </div>
          <div class="bg-[#08090B] p-4 rounded-xl border border-[#24282D] space-y-1">
            <span class="text-[10px] font-mono uppercase text-[#9CA3AF] block">GEO CONFIDENCE SCORE</span>
            <div class="font-bold text-[#10B981] font-mono">${originGeo.confidence || 85}% Alignment</div>
          </div>
        </div>

      </div>

    </section>
  `;
}

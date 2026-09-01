// TraceX - Indicators of Compromise Matrix Component

export function renderIocMatrix(iocs = [], hasAnalyzedFile = true) {
  if (!hasAnalyzedFile || !iocs || iocs.length === 0) return "";

  return `
    <section class="py-12 max-w-7xl mx-auto px-6 lg:px-12 border-t border-[#24282D]/60">
      
      <!-- Section Header -->
      <div class="space-y-2 mb-8">
        <span class="text-xs font-mono font-semibold tracking-widest text-[#D6A84F] uppercase">06. INDICATORS OF COMPROMISE</span>
        <h3 class="text-xl font-bold text-white tracking-tight">Extracted IOC Telemetry Matrix</h3>
        <p class="text-xs text-[#9CA3AF]">
          Structured IOC indicators extracted from header payloads, URLs, and attachment hashes.
        </p>
      </div>

      <!-- Main IOC Telemetry Table Card -->
      <div class="bg-[#101214] border border-[#24282D] rounded-2xl overflow-hidden shadow-xl">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs font-mono">
            <thead class="bg-[#15181C] text-[#9CA3AF] uppercase text-[10px] border-b border-[#24282D]">
              <tr>
                <th class="py-3.5 px-6">INDICATOR</th>
                <th class="py-3.5 px-6">TYPE</th>
                <th class="py-3.5 px-6">REPUTATION</th>
                <th class="py-3.5 px-6">FIRST SEEN</th>
                <th class="py-3.5 px-6">ACTION</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#24282D]/60 text-white">
              ${iocs.map((ioc, idx) => `
                <tr class="hover:bg-[#15181C]/50 transition-colors">
                  <td class="py-4 px-6 font-bold text-white font-mono break-all">${ioc.indicator}</td>
                  <td class="py-4 px-6 text-[#9CA3AF]">${ioc.type}</td>
                  <td class="py-4 px-6">
                    <span class="px-2 py-0.5 rounded text-[11px] font-bold ${ioc.reputation === 'MALICIOUS' ? 'bg-[#EF4444]/10 text-[#EF4444]' : ioc.reputation === 'SUSPICIOUS' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' : 'bg-[#10B981]/10 text-[#10B981]'}">
                      ${ioc.reputation}
                    </span>
                  </td>
                  <td class="py-4 px-6 text-[#9CA3AF]">${ioc.firstSeen}</td>
                  <td class="py-4 px-6">
                    <button data-ioc-index="${idx}" class="btn-inspect-ioc text-[#D6A84F] hover:underline font-bold inline-flex items-center gap-1">
                      Inspect Telemetry
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Slide-Over Drawer Modal Backdrop -->
      <div id="ioc-drawer-backdrop" class="hidden fixed inset-0 bg-[#08090B]/80 backdrop-blur-sm z-50 flex justify-end">
        <div class="w-full max-w-md bg-[#101214] border-l border-[#24282D] h-full p-6 space-y-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
          <div class="space-y-6">
            <div class="flex items-center justify-between pb-4 border-b border-[#24282D]">
              <h4 class="text-base font-bold text-white tracking-tight">IOC Intelligence Inspector</h4>
              <button id="btn-close-ioc-drawer" class="p-1 text-[#9CA3AF] hover:text-white transition-colors">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <div id="ioc-drawer-content" class="space-y-4 text-xs font-mono">
              <!-- Dynamic Content Injected on Click -->
            </div>
          </div>

          <div class="pt-4 border-t border-[#24282D] text-center">
            <span class="text-[11px] font-mono text-[#9CA3AF]">TraceX Intelligence Network</span>
          </div>
        </div>
      </div>

    </section>
  `;
}

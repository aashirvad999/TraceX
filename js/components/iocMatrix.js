// TraceX - Indicators of Compromise Matrix Component with High-Density Truncation

export function renderIocMatrix(iocs = [], hasAnalyzedFile = true, isExpanded = false) {
  if (!hasAnalyzedFile || !iocs || iocs.length === 0) return "";

  const defaultLimit = 3;
  const hasMore = iocs.length > defaultLimit;
  const displayedIocs = isExpanded ? iocs : iocs.slice(0, defaultLimit);

  return `
    <section class="py-12 max-w-7xl mx-auto px-6 lg:px-12 border-t border-[#24282D]/60">
      
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div class="space-y-2">
          <span class="text-xs font-mono font-semibold tracking-widest text-[#D6A84F] uppercase">06. INDICATORS OF COMPROMISE</span>
          <h3 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Extracted IOC Telemetry Matrix</h3>
          <p class="text-xs text-[#9CA3AF]">
            Structured IOC indicators extracted from header payloads, URLs, and attachment hashes.
          </p>
        </div>

        <div class="text-xs font-mono text-[#9CA3AF] shrink-0">
          Showing ${displayedIocs.length} of ${iocs.length} Indicators
        </div>
      </div>

      <!-- Main IOC Telemetry Table Card -->
      <div class="bg-[#101214] border border-[#24282D] rounded-2xl overflow-hidden shadow-xl space-y-0">
        <div class="overflow-x-auto scrollbar-thin">
          <table class="w-full text-left text-xs font-mono min-w-[580px]">
            <thead class="bg-[#15181C] text-[#9CA3AF] uppercase text-[10px] border-b border-[#24282D]">
              <tr>
                <th class="py-3.5 px-4 sm:px-6">INDICATOR</th>
                <th class="py-3.5 px-4 sm:px-6">TYPE</th>
                <th class="py-3.5 px-4 sm:px-6">REPUTATION</th>
                <th class="py-3.5 px-4 sm:px-6">FIRST SEEN</th>
                <th class="py-3.5 px-4 sm:px-6">ACTION</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#24282D]/60 text-white">
              ${displayedIocs.map((ioc, idx) => `
                <tr class="hover:bg-[#15181C]/50 transition-colors">
                  <td class="py-3.5 px-4 sm:px-6 font-bold text-white font-mono break-all max-w-[200px] sm:max-w-none">${ioc.indicator}</td>
                  <td class="py-3.5 px-4 sm:px-6 text-[#9CA3AF]">${ioc.type}</td>
                  <td class="py-3.5 px-4 sm:px-6">
                    <span class="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold ${ioc.reputation === 'MALICIOUS' || ioc.reputation.includes('High') || ioc.reputation.includes('Malicious') ? 'bg-[#EF4444]/10 text-[#EF4444]' : ioc.reputation === 'SUSPICIOUS' || ioc.reputation.includes('Unverified') ? 'bg-[#F59E0B]/10 text-[#F59E0B]' : 'bg-[#10B981]/10 text-[#10B981]'}">
                      ${ioc.reputation}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 sm:px-6 text-[#9CA3AF] whitespace-nowrap">${ioc.firstSeen}</td>
                  <td class="py-3.5 px-4 sm:px-6">
                    <button data-ioc-index="${idx}" class="btn-inspect-ioc text-[#D6A84F] hover:underline font-bold inline-flex items-center gap-1">
                      Inspect
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Sleek Centered Toggle Button -->
        ${hasMore ? `
          <div class="p-3.5 bg-[#08090B] border-t border-[#24282D] text-center">
            <button id="btn-toggle-ioc-expansion" type="button" class="border border-[#24282D] bg-[#15181C] hover:bg-[#24282D] text-xs px-4 py-1.5 rounded-full text-[#9CA3AF] hover:text-white transition-colors inline-flex items-center justify-center gap-1.5 mx-auto font-mono cursor-pointer shadow-sm">
              <span>${isExpanded ? 'Show Less' : `View All Indicators (Total: ${iocs.length})`}</span>
              <span class="material-symbols-outlined text-sm text-[#D6A84F]">${isExpanded ? 'expand_less' : 'expand_more'}</span>
            </button>
          </div>
        ` : ''}
      </div>

      <!-- Slide-Over Drawer Modal Backdrop -->
      <div id="ioc-drawer-backdrop" class="hidden fixed inset-0 bg-[#08090B]/80 backdrop-blur-sm z-50 flex justify-end">
        <div class="w-full sm:max-w-md bg-[#101214] border-l border-[#24282D] h-full p-6 space-y-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
          <div class="space-y-6">
            <div class="flex items-center justify-between pb-4 border-b border-[#24282D]">
              <h4 class="text-base font-bold text-white tracking-tight">IOC Intelligence Inspector</h4>
              <button id="btn-close-ioc-drawer" class="p-1.5 text-[#9CA3AF] hover:text-white transition-colors rounded-lg bg-[#08090B] border border-[#24282D]">
                <span class="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div id="ioc-drawer-content" class="space-y-4 text-xs font-mono">
              <!-- Dynamic Content Injected on Click -->
            </div>
          </div>

          <div class="pt-4 border-t border-[#24282D] text-center">
            <span class="text-[11px] font-mono text-[#9CA3AF]"><span class="text-[#D6A84F]">TraceX</span> Intelligence Network</span>
          </div>
        </div>
      </div>

    </section>
  `;
}

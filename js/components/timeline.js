// TraceX - Chronological Incident Timeline Component with High-Density Truncation

export function renderTimeline(timelineEvents = [], hasAnalyzedFile = true, isExpanded = false) {
  if (!hasAnalyzedFile || !timelineEvents || timelineEvents.length === 0) return "";

  const defaultLimit = 3;
  const hasMore = timelineEvents.length > defaultLimit;
  const displayedEvents = isExpanded ? timelineEvents : timelineEvents.slice(0, defaultLimit);

  return `
    <section class="py-12 max-w-7xl mx-auto px-6 lg:px-12 border-t border-[#24282D]/60">
      
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div class="space-y-2">
          <span class="text-xs font-mono font-semibold tracking-widest text-[#D6A84F] uppercase">07. CHRONOLOGICAL EVENT TIMELINE</span>
          <h3 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Incident Investigation Timeline</h3>
          <p class="text-xs text-[#9CA3AF]">
            Sequential chronological reconstruction of email transmission, relay transit, and automated threat interception.
          </p>
        </div>

        <div class="text-xs font-mono text-[#9CA3AF] shrink-0">
          Showing ${displayedEvents.length} of ${timelineEvents.length} Key Events
        </div>
      </div>

      <!-- Vertical Timeline Flow Container -->
      <div class="bg-[#101214] border border-[#24282D] rounded-2xl p-5 sm:p-8 shadow-xl space-y-6">
        <div class="relative border-l-2 border-[#24282D] ml-2 sm:ml-4 pl-4 sm:pl-6 space-y-6">
          ${displayedEvents.map((evt) => {
            const timeStr = evt.timestamp || evt.time || '00:00:00';
            const titleStr = evt.title || evt.event || 'System Audit Event';
            const descStr = evt.description || evt.detail || '';
            const severityStr = evt.severity || evt.status || 'INFO';
            
            const isHigh = severityStr === 'HIGH' || severityStr === 'THREAT';
            const isMed = severityStr === 'MED' || severityStr === 'SUSPICIOUS' || severityStr === 'AUTH_FAIL';
            
            const bulletColor = isHigh ? 'bg-[#EF4444]' : isMed ? 'bg-[#F59E0B]' : 'bg-[#10B981]';
            const badgeStyle = isHigh ? 'bg-[#EF4444]/10 text-[#EF4444]' : isMed ? 'bg-[#F59E0B]/10 text-[#F59E0B]' : 'bg-[#10B981]/10 text-[#10B981]';

            return `
              <div class="relative group">
                <!-- Node Bullet Circle -->
                <div class="absolute -left-[23px] sm:-left-[31px] top-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full ${bulletColor} border-2 sm:border-4 border-[#101214] group-hover:scale-125 transition-transform"></div>
                
                <div class="bg-[#08090B] border border-[#24282D] rounded-xl p-3.5 sm:p-4 space-y-2">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span class="text-xs font-mono font-bold text-[#D6A84F]">${timeStr}</span>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded ${badgeStyle} font-semibold inline-block self-start sm:self-auto">
                      ${severityStr}
                    </span>
                  </div>
                  
                  <h4 class="text-xs sm:text-sm font-bold text-white">${titleStr}</h4>
                  <p class="text-xs text-[#9CA3AF] leading-relaxed">${descStr}</p>

                  <div class="pt-2 border-t border-[#24282D]/60 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-[#9CA3AF]">
                    <span>Source: ${evt.source || 'Header Parser'}</span>
                    <span>Target IP: ${evt.ip || 'Recorded Hop'}</span>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Sleek Centered Toggle Button -->
        ${hasMore ? `
          <div class="pt-4 border-t border-[#24282D] text-center">
            <button id="btn-toggle-timeline-expansion" type="button" class="border border-[#24282D] bg-[#15181C] hover:bg-[#24282D] text-xs px-4 py-1.5 rounded-full text-[#9CA3AF] hover:text-white transition-colors inline-flex items-center justify-center gap-1.5 mx-auto font-mono cursor-pointer shadow-sm">
              <span>${isExpanded ? 'Collapse Timeline' : `View Full Timeline (${timelineEvents.length} Events)`}</span>
              <span class="material-symbols-outlined text-sm text-[#D6A84F]">${isExpanded ? 'expand_less' : 'expand_more'}</span>
            </button>
          </div>
        ` : ''}

      </div>

    </section>
  `;
}

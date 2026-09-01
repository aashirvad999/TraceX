// TraceX - Chronological Incident Timeline Component

export function renderTimeline(timelineEvents = [], hasAnalyzedFile = true) {
  if (!hasAnalyzedFile || !timelineEvents || timelineEvents.length === 0) return "";

  return `
    <section class="py-12 max-w-7xl mx-auto px-6 lg:px-12 border-t border-[#24282D]/60">
      
      <!-- Section Header -->
      <div class="space-y-2 mb-8">
        <span class="text-xs font-mono font-semibold tracking-widest text-[#D6A84F] uppercase">07. CHRONOLOGICAL EVENT TIMELINE</span>
        <h3 class="text-xl font-bold text-white tracking-tight">Incident Investigation Timeline</h3>
        <p class="text-xs text-[#9CA3AF]">
          Sequential chronological reconstruction of email transmission, relay transit, and automated threat interception.
        </p>
      </div>

      <!-- Vertical Timeline Flow -->
      <div class="bg-[#101214] border border-[#24282D] rounded-2xl p-6 lg:p-8 shadow-xl space-y-6">
        <div class="relative border-l-2 border-[#24282D] ml-4 pl-6 space-y-8">
          ${timelineEvents.map((evt, idx) => `
            <div class="relative group">
              <!-- Node Bullet Circle -->
              <div class="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full ${evt.severity === 'HIGH' ? 'bg-[#EF4444] border-4 border-[#101214]' : evt.severity === 'MED' ? 'bg-[#F59E0B] border-4 border-[#101214]' : 'bg-[#10B981] border-4 border-[#101214]'} group-hover:scale-125 transition-transform"></div>
              
              <div class="bg-[#08090B] border border-[#24282D] rounded-xl p-4 space-y-2">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span class="text-xs font-mono font-bold text-[#D6A84F]">${evt.timestamp}</span>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded ${evt.severity === 'HIGH' ? 'bg-[#EF4444]/10 text-[#EF4444]' : evt.severity === 'MED' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' : 'bg-[#10B981]/10 text-[#10B981]'}">
                    ${evt.severity} SEVERITY
                  </span>
                </div>
                
                <h4 class="text-sm font-bold text-white">${evt.title}</h4>
                <p class="text-xs text-[#9CA3AF] leading-relaxed">${evt.description}</p>

                <div class="pt-2 border-t border-[#24282D]/60 flex items-center justify-between text-[11px] font-mono text-[#9CA3AF]">
                  <span>Source: ${evt.source || 'SMTP Header Engine'}</span>
                  <span>IP: ${evt.ip || 'Recorded IP'}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

    </section>
  `;
}

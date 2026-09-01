// TraceX - Threat Correlation Graph Visualizer Component

export function renderInvestigationGraph(graphData = { nodes: [], links: [] }, hasAnalyzedFile = true) {
  if (!hasAnalyzedFile) return "";

  const nodes = graphData.nodes || [];
  const links = graphData.links || [];

  return `
    <section class="py-12 max-w-7xl mx-auto px-6 lg:px-12 border-t border-[#24282D]/60">
      
      <!-- Section Header -->
      <div class="space-y-2 mb-8">
        <span class="text-xs font-mono font-semibold tracking-widest text-[#D6A84F] uppercase">05. CAMPAIGN CORRELATION GRAPH</span>
        <h3 class="text-xl font-bold text-white tracking-tight">Threat Entity Correlation Network</h3>
        <p class="text-xs text-[#9CA3AF]">
          Interactive SVG graph showing cross-case relationship links between infrastructure IPs, domains, and payload hashes.
        </p>
      </div>

      <!-- Graph Visualizer Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- SVG Interactive Graph Canvas Container -->
        <div class="lg:col-span-2 bg-[#101214] border border-[#24282D] rounded-2xl p-6 shadow-xl space-y-4">
          
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono uppercase text-[#9CA3AF]">ENTITY GRAPH CANVAS</span>
            <div class="flex items-center gap-4 text-[11px] font-mono">
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></span> Threat IP</span>
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span> Domain</span>
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#D6A84F]"></span> Payload Hash</span>
            </div>
          </div>

          <div class="w-full h-80 sm:h-96 bg-[#08090B] border border-[#24282D] rounded-xl overflow-hidden relative flex items-center justify-center p-4">
            
            <svg class="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
              <!-- Links -->
              ${links.map(link => {
                const sourceNode = nodes.find(n => n.id === link.source) || { x: 300, y: 200 };
                const targetNode = nodes.find(n => n.id === link.target) || { x: 300, y: 200 };
                return `
                  <line x1="${sourceNode.x}" y1="${sourceNode.y}" x2="${targetNode.x}" y2="${targetNode.y}" class="graph-link" stroke-width="1.5" />
                `;
              }).join('')}

              <!-- Nodes -->
              ${nodes.map(node => {
                const isHigh = node.risk === 'HIGH';
                const isMed = node.risk === 'MED';
                const fillColor = isHigh ? '#EF4444' : isMed ? '#F59E0B' : '#D6A84F';
                return `
                  <g class="graph-node-group cursor-pointer group" data-node-id="${node.id}">
                    <circle cx="${node.x}" cy="${node.y}" r="${node.size || 16}" fill="${fillColor}" fill-opacity="0.2" stroke="${fillColor}" stroke-width="2" class="transition-all duration-300 group-hover:scale-125" />
                    <circle cx="${node.x}" cy="${node.y}" r="4" fill="${fillColor}" />
                    <text x="${node.x}" y="${node.y + (node.size || 16) + 14}" text-anchor="middle" fill="#E5E7EB" font-size="10" font-family="JetBrains Mono" font-weight="600">${node.label}</text>
                  </g>
                `;
              }).join('')}
            </svg>

            <!-- Graph Canvas Watermark -->
            <div class="absolute bottom-3 right-4 text-[10px] font-mono text-[#9CA3AF] pointer-events-none">
              Interactive Nodes • Click to Inspect
            </div>

          </div>

        </div>

        <!-- Node Inspector Details Side Card -->
        <div class="bg-[#101214] border border-[#24282D] rounded-2xl p-6 shadow-xl space-y-6 flex flex-col justify-between">
          
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono uppercase text-[#9CA3AF]">ENTITY INSPECTOR</span>
              <span id="graph-panel-badge" class="font-mono text-xs px-2 py-0.5 rounded bg-[#EF4444]/10 text-[#EF4444]">
                HIGH RISK
              </span>
            </div>

            <h4 id="graph-panel-title" class="text-lg font-bold text-white tracking-tight">
              Selected Entity: ${nodes[0]?.label || 'Threat Entity'}
            </h4>

            <div id="graph-panel-body" class="space-y-4 text-xs">
              <div class="p-4 rounded-xl bg-[#15181C] border border-[#24282D]/60 space-y-2">
                <span class="text-[#9CA3AF] text-[10px] font-mono uppercase block">ENTITY DETAILS</span>
                <div class="text-sm font-bold text-white">${nodes[0]?.label || ''}</div>
                <div class="text-xs text-[#9CA3AF]">${nodes[0]?.details || 'Observed in active phishing campaign headers.'}</div>
              </div>

              <div class="p-4 rounded-xl bg-[#15181C] border border-[#24282D]/60 space-y-2">
                <span class="text-[#9CA3AF] text-[10px] font-mono uppercase block">CORRELATED RELATIONS</span>
                <div class="text-xs text-[#D6A84F] space-y-1 font-mono">
                  <div>• Linked to Campaign #APEX-PHISH-2026</div>
                  <div>• Correlated with CASE-2026-0042 (.eml)</div>
                  <div>• Observed in Relay Infrastructure</div>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-4 border-t border-[#24282D] text-[11px] font-mono text-[#9CA3AF]">
            Click any graph node to inspect cross-campaign correlation details.
          </div>

        </div>

      </div>

    </section>
  `;
}

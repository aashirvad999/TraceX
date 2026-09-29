// TraceX - Email Analyzer & Ingestion Component

export function renderAnalyzer(sampleEmails = [], fileHistory = [], activeEmailId = null, hasAnalyzedFile = false, uploadedFileText = null) {
  const becSample = sampleEmails[0] || {};
  
  // Only pre-fill textarea if a file has actually been uploaded or analyzed
  const initialTextareaValue = (hasAnalyzedFile || uploadedFileText) 
    ? (uploadedFileText || (becSample.rawHeaders ? `${becSample.rawHeaders}\n\n${becSample.body}` : ''))
    : '';

  return `
    <section id="analyze" class="py-16 max-w-7xl mx-auto px-6 lg:px-12 scroll-mt-24">
      
      <!-- Section Header -->
      <div class="space-y-3 mb-10">
        <span class="text-xs font-mono font-semibold tracking-widest text-[#D6A84F] uppercase">01. INGESTION & THREAT DETECTION</span>
        <h2 class="text-3xl font-bold text-white tracking-tight">Analyze an Email</h2>
        <p class="text-base text-[#9CA3AF] max-w-2xl">
          Upload suspicious .eml files or select preset scenarios to execute automated AI scanning, spoof verification, and authentication alignment checks.
        </p>
      </div>

      <!-- Main Ingestion Panel -->
      <div class="bg-[#101214] border border-[#24282D] rounded-2xl p-6 lg:p-8 space-y-8 shadow-xl">
        
        <!-- Prominent Drag & Drop File Upload Box Zone -->
        <div class="space-y-2">
          <label class="text-xs font-mono text-[#9CA3AF] uppercase block">Evidence File Upload (.eml)</label>
          
          <div id="dropzone-area" class="border-2 border-dashed border-[#24282D] hover:border-[#D6A84F]/60 rounded-xl p-6 lg:p-8 text-center bg-[#08090B] hover:bg-[#15181C]/40 transition-all cursor-pointer space-y-3 group relative">
            <div class="w-12 h-12 rounded-full bg-[#15181C] border border-[#24282D] mx-auto flex items-center justify-center text-[#D6A84F] group-hover:scale-110 transition-transform shadow-sm">
              <span class="material-symbols-outlined text-2xl">cloud_upload</span>
            </div>
            <div class="text-xs sm:text-sm text-[#E5E7EB] font-medium">
              Drag & drop suspicious <code class="font-mono text-[#D6A84F] bg-[#101214] px-1.5 py-0.5 rounded border border-[#24282D]">.eml</code> file here, or <button id="btn-browse-file" type="button" class="text-[#D6A84F] underline font-semibold hover:text-[#C2943E]">browse files</button>
            </div>
            <p class="text-[11px] text-[#9CA3AF]">Upload an .eml payload file to analyze email headers and extract threat telemetry</p>
            <input type="file" id="file-input-eml" accept=".eml,.msg,.txt" class="hidden" />

            <!-- Selected File Badge with Instant "Analyze Uploaded File" and "Remove File" Action Buttons -->
            <div id="file-selected-badge" class="hidden mt-4 p-3.5 rounded-xl bg-[#15181C] border border-[#10B981]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-left">
              <div class="flex items-center gap-2.5 text-[#10B981]">
                <span class="material-symbols-outlined text-base">check_circle</span>
                <span class="text-white font-bold font-sans">Attached:</span>
                <span id="file-name-span" class="text-[#10B981] font-semibold break-all">file.eml</span>
              </div>
              
              <div class="flex items-center gap-2 w-full sm:w-auto">
                <button id="btn-remove-file" type="button" class="p-2 rounded-lg bg-[#08090B] border border-[#24282D] hover:border-[#EF4444] text-[#9CA3AF] hover:text-[#EF4444] transition-colors flex items-center justify-center shrink-0" title="Remove uploaded file">
                  <span class="material-symbols-outlined text-base">delete</span>
                </button>

                <button id="btn-analyze-uploaded-file" type="button" class="flex-1 sm:flex-initial px-4 py-2 rounded-lg bg-[#D6A84F] hover:bg-[#C2943E] text-[#08090B] font-bold font-sans text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                  <span class="material-symbols-outlined text-sm">analytics</span>
                  Analyze Uploaded File
                </button>
              </div>
            </div>

          </div>
        </div>

        <!-- Uploaded Files Navigation History Strip (Appears when files have been analyzed) -->
        ${fileHistory && fileHistory.length > 0 ? `
          <div class="space-y-3 pb-4 border-b border-[#24282D]/60">
            <div class="flex items-center justify-between">
              <label class="text-xs font-mono text-[#D6A84F] uppercase font-semibold flex items-center gap-2">
                <span class="material-symbols-outlined text-sm">history</span>
                Uploaded Files History (${fileHistory.length})
              </label>
              <button id="btn-clear-history" type="button" class="text-[11px] text-[#9CA3AF] hover:text-[#EF4444] transition-colors">Clear History</button>
            </div>
            
            <div class="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
              ${fileHistory.map((item, hIdx) => {
                const isActive = activeEmailId && item.email && item.email.id === activeEmailId;
                return `
                  <button data-history-idx="${hIdx}" type="button" class="btn-select-history shrink-0 px-3.5 py-2.5 rounded-xl border ${isActive ? 'border-[#D6A84F] bg-[#15181C]' : 'border-[#24282D] bg-[#08090B]'} hover:border-[#D6A84F]/60 transition-all flex items-center gap-3 text-left group">
                    <span class="w-2.5 h-2.5 rounded-full ${item.email.riskScore > 75 ? 'bg-[#EF4444]' : item.email.riskScore > 35 ? 'bg-[#F59E0B]' : 'bg-[#10B981]'}"></span>
                    <div>
                      <div class="text-xs font-bold text-white group-hover:text-[#D6A84F] transition-colors line-clamp-1 max-w-[180px]">
                        ${item.fileName}
                      </div>
                      <div class="text-[10px] font-mono text-[#9CA3AF]">
                        Risk: ${item.email.riskScore}/100 • ${item.email.classification ? item.email.classification.split(' ')[0] : 'EML'}
                      </div>
                    </div>
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Preset Scenario Selectors (4 Quick-Test Presets) -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <label class="text-xs font-mono text-[#9CA3AF] uppercase block">Load a Quick-Test Threat Preset Scenario</label>
            <span class="text-xs text-[#9CA3AF]"><span class="text-[#D6A84F]">Click</span> to load & analyze test payload</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            ${sampleEmails.map((email, idx) => {
              const isClean = email.riskScore <= 25;
              const isMed = email.riskScore > 25 && email.riskScore <= 60;
              const colorClass = isClean ? 'text-[#81c784]' : isMed ? 'text-[#f59e0b]' : 'text-[#ffb4ab]';
              const borderClass = hasAnalyzedFile && activeEmailId === email.id ? 'border-[#D6A84F] bg-[#15181C]' : 'border-[#24282D] bg-[#08090B]';
              return `
                <button data-sample-idx="${idx}" class="btn-select-sample text-left p-4 rounded-xl border ${borderClass} hover:border-[#D6A84F]/60 transition-colors space-y-2 group">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-mono font-bold ${colorClass}">
                      Risk: ${email.riskScore}/100
                    </span>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded ${isClean ? 'bg-[#81c784]/10 text-[#81c784]' : isMed ? 'bg-[#f59e0b]/10 text-[#f59e0b]' : 'bg-[#ffb4ab]/10 text-[#ffb4ab]'} font-semibold">
                      ${isClean ? 'CLEAN' : isMed ? 'SUSPICIOUS' : 'THREAT'}
                    </span>
                  </div>
                  <div class="text-xs font-bold text-white group-hover:text-[#D6A84F] transition-colors line-clamp-2">
                    ${email.title}
                  </div>
                  <div class="text-[10px] font-mono text-[#9CA3AF] truncate">
                    ${email.badges || (isClean ? 'SPF: PASS | DKIM: PASS' : 'SPF: FAIL | DKIM: FAIL')}
                  </div>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Raw Header / Payload Textarea -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <label for="raw-email-input" class="text-xs font-mono text-[#9CA3AF] uppercase">Raw Email Headers & Message Content</label>
          </div>
          <textarea id="raw-email-input" rows="6" class="w-full bg-[#08090B] border border-[#24282D] rounded-xl p-4 font-mono text-xs text-[#E5E7EB] focus:outline-none focus:border-[#D6A84F] transition-colors leading-relaxed selection:bg-[#D6A84F] selection:text-[#08090B]" placeholder="No file uploaded yet. Drag & drop an .eml file above, select a preset scenario, or paste raw email headers here to begin threat analysis...">${initialTextareaValue}</textarea>
        </div>

      </div>
    </section>
  `;
}

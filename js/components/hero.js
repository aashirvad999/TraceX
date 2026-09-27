// TraceX - Refactored Hero Section Component (Analyst & Scanner Focused)

export function renderHero(activeEmail = null, hasAnalyzedFile = false) {
  // Determine display values from activeEmail or default sample preview output
  const displayEmail = (hasAnalyzedFile && activeEmail) ? activeEmail : {
    fileName: 'sample_invoice.eml',
    subject: 'Urgent: Invoice Payment & Wire Transfer Request',
    sender: 'finance-update@paypa1-security.com',
    riskScore: 98,
    classification: 'HIGH-RISK PHISHING',
    authStatus: {
      spf: { status: 'FAILED' },
      dkim: { status: 'FAILED' },
      url: { status: 'SUSPICIOUS' },
      socialEng: { status: 'HIGH' }
    }
  };

  const fileName = (hasAnalyzedFile && activeEmail && activeEmail.fileName) 
    ? activeEmail.fileName 
    : (displayEmail.fileName || 'sample_invoice.eml');
    
  const score = displayEmail.riskScore;
  const isHighRisk = score > 75;
  const isMedRisk = score > 30 && score <= 75;

  const scoreColorClass = isHighRisk ? 'text-[#EF4444]' : isMedRisk ? 'text-[#F59E0B]' : 'text-[#10B981]';
  const scoreBgClass = isHighRisk ? 'border-[#EF4444]/40 bg-[#EF4444]/10 text-[#EF4444]' : isMedRisk ? 'border-[#F59E0B]/40 bg-[#F59E0B]/10 text-[#F59E0B]' : 'border-[#10B981]/40 bg-[#10B981]/10 text-[#10B981]';
  const badgeStatusText = (hasAnalyzedFile && activeEmail) ? 'Analyzed' : 'Sample Output';

  const spfDkimFailed = displayEmail.authStatus?.spf?.status === 'FAILED' || displayEmail.authStatus?.dkim?.status === 'FAILED';
  const linkSuspicious = displayEmail.authStatus?.url?.status === 'SUSPICIOUS';
  const phishingHigh = displayEmail.authStatus?.socialEng?.status === 'HIGH' || isHighRisk;

  return `
    <section id="platform" class="relative pt-20 pb-16 max-w-7xl mx-auto px-6 lg:px-12 scroll-mt-24">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <!-- Left Headline & Copy Column -->
        <div class="lg:col-span-7 space-y-6">
          
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            AI-Driven Email Threat & <span class="text-[#D6A84F]">Spam Detection</span>
          </h1>

          <p class="text-base sm:text-lg text-[#9CA3AF] leading-relaxed max-w-xl">
            Upload any <code class="font-mono text-[#D6A84F] bg-[#15181C] px-1.5 py-0.5 rounded border border-[#24282D]">.eml</code> file to parse authentication records, scan headers and content, and generate a 0–100 risk score in seconds.
          </p>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button data-nav="analyze" id="btn-hero-upload" class="px-7 py-3.5 rounded-xl bg-[#D6A84F] hover:bg-[#C2943E] text-[#08090B] font-extrabold text-sm transition-all shadow-lg flex items-center justify-center gap-2 group">
              <span class="material-symbols-outlined text-xl">upload_file</span>
              Upload & Analyze .eml
            </button>
          </div>

        </div>

        <!-- Right Live Output Preview Card Column -->
        <div class="lg:col-span-5 relative">
          
          <div class="bg-[#101214] border border-[#24282D] rounded-2xl p-6 sm:p-7 space-y-5 shadow-2xl relative z-10">
            
            <!-- Top: Simple File Status Badge -->
            <div class="flex items-center justify-between pb-3.5 border-b border-[#24282D]">
              <div class="flex items-center gap-2 text-xs font-mono text-[#E5E7EB]">
                <span class="material-symbols-outlined text-base text-[#D6A84F]">description</span>
                <span class="font-semibold truncate max-w-[200px]" title="${fileName}">${fileName}</span>
              </div>
              <div class="flex items-center gap-1.5 text-xs font-mono font-semibold ${hasAnalyzedFile ? 'text-[#10B981]' : 'text-[#D6A84F]'}">
                <span class="w-2 h-2 rounded-full ${hasAnalyzedFile ? 'bg-[#10B981]' : 'bg-[#D6A84F]'} animate-pulse"></span>
                ${badgeStatusText}
              </div>
            </div>

            <!-- Middle: Score Metric Display -->
            <div class="p-5 rounded-xl bg-[#08090B] border border-[#24282D] flex items-center justify-between">
              <div>
                <span class="text-[10px] font-mono text-[#9CA3AF] uppercase tracking-wider block mb-1">Spam Risk Score</span>
                <div class="text-4xl sm:text-5xl font-extrabold font-mono ${scoreColorClass}">
                  ${score} <span class="text-lg text-[#9CA3AF] font-normal">/ 100</span>
                </div>
              </div>
              <div class="px-3 py-1 rounded-full border text-xs font-mono font-bold ${scoreBgClass}">
                ${isHighRisk ? 'HIGH RISK' : isMedRisk ? 'SUSPICIOUS' : 'CLEAN'}
              </div>
            </div>

            <!-- Simple Category Breakdown Bullets -->
            <div class="space-y-2 text-xs font-mono">
              <div class="flex items-center justify-between p-2.5 rounded-lg bg-[#08090B]/60 border border-[#24282D]/80">
                <span class="text-[#9CA3AF]">SPF/DKIM:</span>
                <span class="font-bold ${spfDkimFailed ? 'text-[#EF4444]' : 'text-[#10B981]'}">
                  ${spfDkimFailed ? 'Failed' : 'Passed'}
                </span>
              </div>
              <div class="flex items-center justify-between p-2.5 rounded-lg bg-[#08090B]/60 border border-[#24282D]/80">
                <span class="text-[#9CA3AF]">Suspicious Link Detected:</span>
                <span class="font-bold ${linkSuspicious ? 'text-[#EF4444]' : 'text-[#10B981]'}">
                  ${linkSuspicious ? 'Yes' : 'None'}
                </span>
              </div>
              <div class="flex items-center justify-between p-2.5 rounded-lg bg-[#08090B]/60 border border-[#24282D]/80">
                <span class="text-[#9CA3AF]">Phishing Tone:</span>
                <span class="font-bold ${phishingHigh ? 'text-[#EF4444]' : isMedRisk ? 'text-[#F59E0B]' : 'text-[#10B981]'}">
                  ${phishingHigh ? 'High' : isMedRisk ? 'Moderate' : 'Low'}
                </span>
              </div>
            </div>

            <!-- Bottom: Primary Text Link -->
            <div class="pt-2 flex items-center justify-end border-t border-[#24282D]/60">
              <button data-nav="threat-intelligence" class="text-[#D6A84F] font-bold hover:underline text-xs inline-flex items-center gap-1 transition-colors">
                View Full Report →
              </button>
            </div>

          </div>

          <!-- Ambient Glow Background Accent -->
          <div class="absolute -inset-4 bg-gradient-to-r from-[#D6A84F]/10 to-transparent rounded-3xl blur-2xl pointer-events-none"></div>

        </div>

      </div>
    </section>
  `;
}



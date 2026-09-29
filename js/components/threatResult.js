// TraceX - Threat Analysis Result Dashboard Component

export function renderThreatResult({ activeEmail, hasAnalyzedFile = true }) {
  if (!hasAnalyzedFile || !activeEmail) {
    return `
      <section class="py-16 max-w-7xl mx-auto px-6 lg:px-12 border-t border-[#24282D]/60">
        <div class="bg-[#101214] border border-[#24282D] rounded-2xl p-12 text-center space-y-4 shadow-xl">
          <div class="w-16 h-16 rounded-full bg-[#15181C] border border-[#24282D] mx-auto flex items-center justify-center text-[#D6A84F] shadow-inner">
            <span class="material-symbols-outlined text-3xl">shield</span>
          </div>
          <div class="space-y-1">
            <h3 class="text-xl font-bold text-white">No Email Evidence Analyzed Yet</h3>
            <p class="text-sm text-[#9CA3AF] max-w-md mx-auto">
              Upload an .eml payload file or select a scenario above to run AI threat scanning, authentication diagnostics, and forensic intelligence.
            </p>
          </div>
          <button data-nav="analyze" class="px-6 py-3 rounded-lg bg-[#D6A84F] hover:bg-[#C2943E] text-[#08090B] font-bold text-sm transition-colors inline-flex items-center gap-2 shadow-md">
            <span class="material-symbols-outlined text-lg">cloud_upload</span>
            Upload or Select Email File
          </button>
        </div>
      </section>
    `;
  }

  const { title, riskScore, classification, confidence, sender, replyTo, returnPath, messageId, date, subject, authStatus, authProof } = activeEmail;

  const isClean = riskScore <= 25;
  const isMedRisk = riskScore > 25 && riskScore <= 60;
  const isHighRisk = riskScore > 60;
  
  const scoreColorClass = isClean ? 'text-[#81c784]' : isMedRisk ? 'text-[#f59e0b]' : 'text-[#ffb4ab]';
  const gaugeBorderClass = isClean ? 'border-[#81c784]' : isMedRisk ? 'border-[#f59e0b]' : 'border-[#ffb4ab]';
  const badgeBgClass = isClean ? 'bg-[#81c784]/10 text-[#81c784] border-[#81c784]/30' : isMedRisk ? 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30' : 'bg-[#ffb4ab]/10 text-[#ffb4ab] border-[#ffb4ab]/30';

  const spfPass = (authProof && authProof.spf === 'PASS') || authStatus.spf.status === 'VERIFIED';
  const dkimPass = (authProof && authProof.dkim && authProof.dkim.includes('PASS')) || authStatus.dkim.status === 'VERIFIED';
  const dmarcPass = (authProof && authProof.dmarc === 'PASS') || authStatus.dmarc.status === 'VERIFIED';

  const extractDomain = (str) => {
    const match = (str || '').match(/@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    return match ? match[1] : '';
  };
  const senderDomain = extractDomain(sender);

  return `
    <section class="py-16 max-w-7xl mx-auto px-6 lg:px-12 border-t border-[#24282D]/60">
      
      <!-- Decluttered Authentication Proof Badge Bar -->
      <div class="mb-8 p-3.5 sm:p-4 rounded-xl ${isClean ? 'bg-[#81c784]/10 border border-[#81c784]/30' : isMedRisk ? 'bg-[#f59e0b]/10 border border-[#f59e0b]/30' : 'bg-[#ffb4ab]/10 border border-[#ffb4ab]/30'} flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
        <div class="flex items-center gap-2.5">
          <span class="material-symbols-outlined text-lg sm:text-xl ${scoreColorClass}">
            ${isClean ? 'verified_user' : isMedRisk ? 'gpp_maybe' : 'gpp_bad'}
          </span>
          <span class="text-xs font-mono font-bold uppercase tracking-wider text-white">AUTH PROOF</span>
        </div>

        <div class="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span class="px-2.5 py-1 rounded-lg ${spfPass ? 'bg-[#81c784]/20 text-[#81c784] border border-[#81c784]/40' : 'bg-[#ffb4ab]/20 text-[#ffb4ab] border border-[#ffb4ab]/40'} font-bold flex items-center gap-1">
            ✔ SPF: ${spfPass ? 'Pass' : 'Fail'}
          </span>
          <span class="px-2.5 py-1 rounded-lg ${dkimPass ? 'bg-[#81c784]/20 text-[#81c784] border border-[#81c784]/40' : 'bg-[#ffb4ab]/20 text-[#ffb4ab] border border-[#ffb4ab]/40'} font-bold flex items-center gap-1">
            ✔ DKIM: ${dkimPass ? `Signed (@${senderDomain || 'Verified'})` : 'Fail'}
          </span>
          <span class="px-2.5 py-1 rounded-lg ${dmarcPass ? 'bg-[#81c784]/20 text-[#81c784] border border-[#81c784]/40' : 'bg-[#ffb4ab]/20 text-[#ffb4ab] border border-[#ffb4ab]/40'} font-bold flex items-center gap-1">
            ✔ DMARC: ${dmarcPass ? 'Aligned' : 'Fail'}
          </span>
        </div>
      </div>

      <!-- Threat Result Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div class="space-y-2">
          <div class="flex items-center gap-3">
            <span class="text-xs font-mono font-semibold tracking-widest text-[#D6A84F] uppercase">02. THREAT ASSESSMENT RESULT</span>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border ${badgeBgClass}">
              ${classification}
            </span>
          </div>
          <h2 class="text-2xl lg:text-3xl font-bold text-white tracking-tight">${title}</h2>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <button id="download-current-case-btn" type="button" class="text-xs font-mono px-3 py-2 rounded-xl border border-[#D6A84F]/50 shadow-[0_0_10px_rgba(214,168,79,0.2)] hover:border-[#D6A84F] hover:shadow-[0_0_14px_rgba(214,168,79,0.35)] bg-[#15181C] text-[#9CA3AF] hover:text-white flex items-center gap-1.5 transition-all cursor-pointer">
            <span class="material-symbols-outlined text-sm text-[#D6A84F]">download</span>
            <span>Export Raw .eml</span>
          </button>

          <div class="flex items-center gap-4 bg-[#15181C] border border-[#24282D] px-5 py-3 rounded-xl">
            <div class="text-right">
              <span class="text-[10px] font-mono uppercase text-[#9CA3AF] block">CONFIDENCE</span>
              <span class="text-sm font-bold text-white font-mono">${confidence}</span>
            </div>
            <div class="h-8 w-px bg-[#24282D]"></div>
            <div class="text-right">
              <span class="text-[10px] font-mono uppercase text-[#9CA3AF] block">RISK SCORE</span>
              <span class="text-xl font-bold font-mono ${scoreColorClass}">${riskScore}/100</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Risk Summary Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        <!-- Risk Gauge & Core Classification -->
        <div class="bg-[#101214] border border-[#24282D] rounded-2xl p-6 space-y-6 flex flex-col justify-between shadow-xl">
          <div class="space-y-4">
            <span class="text-xs font-mono uppercase text-[#9CA3AF]">THREAT SCORE ENGINE</span>
            
            <div class="flex items-center justify-center py-4">
              <div class="relative w-36 h-36 flex items-center justify-center rounded-full border-4 ${gaugeBorderClass} bg-[#08090B]">
                <div class="text-center">
                  <span class="text-4xl font-extrabold font-mono ${scoreColorClass}">${riskScore}</span>
                  <span class="text-[11px] font-mono text-[#9CA3AF] block uppercase mt-0.5">SCORE</span>
                </div>
              </div>
            </div>

            <p class="text-xs text-[#9CA3AF] text-center leading-relaxed">
              ${isHighRisk 
                ? 'High severity threat detected. Urgent quarantine and executive alert recommended.' 
                : isMedRisk 
                ? 'Moderate threat signals or unverified relay. Manual SOC verification suggested.' 
                : 'Safe & authenticated email payload. SPF, DKIM, and DMARC alignment verified.'}
            </p>
          </div>

          <div class="pt-4 border-t border-[#24282D] flex items-center justify-between text-xs font-mono">
            <span class="text-[#9CA3AF]">ANALYSIS AGENT</span>
            <span class="text-[#D6A84F]">TRACEX-V2.4</span>
          </div>
        </div>

        <!-- Email Envelope & Headers Metadata -->
        <div class="lg:col-span-2 bg-[#101214] border border-[#24282D] rounded-2xl p-6 space-y-6 shadow-xl">
          <span class="text-xs font-mono uppercase text-[#9CA3AF]">ENVELOPE & HEADER TELEMETRY</span>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div class="bg-[#08090B] p-3.5 rounded-xl border border-[#24282D] space-y-1">
              <span class="text-[10px] font-mono uppercase text-[#9CA3AF] block">SUBJECT LINE</span>
              <div class="font-semibold text-white break-all">${subject}</div>
            </div>

            <div class="bg-[#08090B] p-3.5 rounded-xl border border-[#24282D] space-y-1">
              <span class="text-[10px] font-mono uppercase text-[#9CA3AF] block">SENDER (FROM)</span>
              <div class="font-semibold text-[#D6A84F] break-all">${sender}</div>
            </div>

            <div class="bg-[#08090B] p-3.5 rounded-xl border border-[#24282D] space-y-1">
              <span class="text-[10px] font-mono uppercase text-[#9CA3AF] block">REPLY-TO PATH</span>
              <div class="font-semibold text-white break-all">${replyTo}</div>
            </div>

            <div class="bg-[#08090B] p-3.5 rounded-xl border border-[#24282D] space-y-1">
              <span class="text-[10px] font-mono uppercase text-[#9CA3AF] block">RETURN PATH</span>
              <div class="font-semibold text-white break-all">${returnPath}</div>
            </div>

            <div class="bg-[#08090B] p-3.5 rounded-xl border border-[#24282D] space-y-1">
              <span class="text-[10px] font-mono uppercase text-[#9CA3AF] block">MESSAGE ID</span>
              <div class="font-mono text-[#9CA3AF] text-[11px] break-all">${messageId}</div>
            </div>

            <div class="bg-[#08090B] p-3.5 rounded-xl border border-[#24282D] space-y-1">
              <span class="text-[10px] font-mono uppercase text-[#9CA3AF] block">TIMESTAMP</span>
              <div class="font-mono text-white">${date}</div>
            </div>
          </div>

          <!-- Raw Header Toggle Action -->
          <div class="flex items-center justify-between pt-2">
            <button id="btn-toggle-raw-headers" class="text-xs text-[#D6A84F] hover:underline font-medium inline-flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">code</span>
              View Full Unfiltered Headers
            </button>
            <span class="text-[11px] font-mono text-[#9CA3AF]">RFC822 Validated</span>
          </div>

          <!-- Unfiltered Header Pane (Collapsible) -->
          <div id="raw-headers-pane" class="hidden bg-[#08090B] border border-[#24282D] rounded-xl p-4 font-mono text-[11px] text-[#9CA3AF] overflow-x-auto max-h-48 whitespace-pre-wrap leading-relaxed select-all">
${activeEmail.rawHeaders}
          </div>

        </div>

      </div>

      <!-- Authentication Checks Matrix (SPF, DKIM, DMARC, Domain, URL, Social Eng) -->
      <div class="bg-[#101214] border border-[#24282D] rounded-2xl p-6 space-y-4 shadow-xl">
        <span class="text-xs font-mono uppercase text-[#9CA3AF]">AUTHENTICATION & ALIGNMENT DIAGNOSTICS</span>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div class="bg-[#08090B] p-4 rounded-xl border border-[#24282D] space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold text-white">SPF Protocol</span>
              <span class="text-xs font-mono px-2 py-0.5 rounded ${authStatus.spf.status === 'VERIFIED' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'}">
                ${authStatus.spf.status}
              </span>
            </div>
            <p class="text-xs text-[#9CA3AF]">${authStatus.spf.detail}</p>
          </div>

          <div class="bg-[#08090B] p-4 rounded-xl border border-[#24282D] space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold text-white">DKIM RSA Signature</span>
              <span class="text-xs font-mono px-2 py-0.5 rounded ${authStatus.dkim.status === 'VERIFIED' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'}">
                ${authStatus.dkim.status}
              </span>
            </div>
            <p class="text-xs text-[#9CA3AF]">${authStatus.dkim.detail}</p>
          </div>

          <div class="bg-[#08090B] p-4 rounded-xl border border-[#24282D] space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold text-white">DMARC Alignment</span>
              <span class="text-xs font-mono px-2 py-0.5 rounded ${authStatus.dmarc.status === 'VERIFIED' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'}">
                ${authStatus.dmarc.status}
              </span>
            </div>
            <p class="text-xs text-[#9CA3AF]">${authStatus.dmarc.detail}</p>
          </div>

          <div class="bg-[#08090B] p-4 rounded-xl border border-[#24282D] space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold text-white">Domain Reputation</span>
              <span class="text-xs font-mono px-2 py-0.5 rounded ${authStatus.domain.status === 'SAFE' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'}">
                ${authStatus.domain.status}
              </span>
            </div>
            <p class="text-xs text-[#9CA3AF]">${authStatus.domain.detail}</p>
          </div>

          <div class="bg-[#08090B] p-4 rounded-xl border border-[#24282D] space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold text-white">URL Telemetry</span>
              <span class="text-xs font-mono px-2 py-0.5 rounded ${authStatus.url.status === 'SAFE' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'}">
                ${authStatus.url.status}
              </span>
            </div>
            <p class="text-xs text-[#9CA3AF]">${authStatus.url.detail}</p>
          </div>

          <div class="bg-[#08090B] p-4 rounded-xl border border-[#24282D] space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold text-white">Social Engineering</span>
              <span class="text-xs font-mono px-2 py-0.5 rounded ${authStatus.socialEng.status === 'SAFE' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'}">
                ${authStatus.socialEng.status}
              </span>
            </div>
            <p class="text-xs text-[#9CA3AF]">${authStatus.socialEng.detail}</p>
          </div>

        </div>
      </div>

    </section>
  `;
}

// TraceX - Refactored Analysis Progress Overlay Modal Component

export function renderAnalysisModal() {
  return `
    <div id="analysis-modal-backdrop" class="fixed inset-0 z-50 bg-[#08090B]/95 backdrop-blur-md flex flex-col justify-center items-center p-4 overflow-y-auto hidden">
      <!-- Background Glow Grid -->
      <div class="absolute inset-0 pointer-events-none opacity-15 bg-[radial-gradient(#D6A84F_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div class="max-w-md w-full mx-auto text-center relative z-10 space-y-4 max-h-[85vh]">
        
        <!-- Animation Icon Header -->
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#15181C] border border-[#D6A84F]/40 relative shadow-2xl shrink-0 mx-auto">
          <span class="material-symbols-outlined text-[#D6A84F] text-2xl animate-pulse">security</span>
          <div class="absolute inset-0 rounded-full border border-[#D6A84F] animate-ping opacity-25"></div>
        </div>

        <div class="space-y-1">
          <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Analyzing evidence...</h2>
          <p class="font-mono text-xs text-[#D6A84F] uppercase tracking-widest font-semibold">TRACE ID: TX-8892-A</p>

          <!-- Master Single Progress Bar -->
          <div class="w-full space-y-1.5 pt-2 max-w-xs mx-auto">
            <div class="h-1.5 w-full bg-[#15181C] rounded-full overflow-hidden border border-[#24282D]">
              <div id="master-progress-bar" class="h-full bg-[#D6A84F] transition-all duration-300 rounded-full" style="width: 25%;"></div>
            </div>
            <div class="flex justify-between items-center text-[10px] font-mono text-[#9CA3AF]">
              <span>ANALYSIS PROGRESS</span>
              <span id="master-progress-percent" class="text-[#D6A84F] font-bold">25%</span>
            </div>
          </div>
        </div>

        <!-- 4 Core Forensic Stages Checklist Card -->
        <div class="bg-[#101214] rounded-2xl border border-[#24282D] p-5 sm:p-6 shadow-2xl text-left relative space-y-3">
          <ul id="analysis-checklist" class="space-y-3 font-mono text-xs">
            
            <!-- Stage 1 -->
            <li class="progress-line relative flex items-start gap-3 transition-opacity duration-200" data-step="1">
              <div class="step-icon relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-[#15181C] border border-[#D6A84F]/50 flex items-center justify-center text-[#D6A84F]">
                <span class="material-symbols-outlined text-sm text-[#D6A84F] animate-spin">autorenew</span>
              </div>
              <div class="flex-1 pt-0.5">
                <p class="font-bold text-white">1. RFC Structure & Auth Verification</p>
                <p class="text-[11px] text-[#9CA3AF] font-sans">MIME structure, SPF, DKIM & DMARC alignment checks</p>
              </div>
            </li>

            <!-- Stage 2 -->
            <li class="progress-line relative flex items-start gap-3 opacity-40 transition-opacity duration-200" data-step="2">
              <div class="step-icon relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-[#15181C] border border-[#24282D] flex items-center justify-center text-[#9CA3AF]">
                <span class="material-symbols-outlined text-sm text-[#9CA3AF]">pending</span>
              </div>
              <div class="flex-1 pt-0.5">
                <p class="font-bold text-white">2. AI Threat & Intent Classification</p>
                <p class="text-[11px] text-[#9CA3AF] font-sans">Natural language analysis for BEC, urgency & phishing intent</p>
              </div>
            </li>

            <!-- Stage 3 -->
            <li class="progress-line relative flex items-start gap-3 opacity-40 transition-opacity duration-200" data-step="3">
              <div class="step-icon relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-[#15181C] border border-[#24282D] flex items-center justify-center text-[#9CA3AF]">
                <span class="material-symbols-outlined text-sm text-[#9CA3AF]">pending</span>
              </div>
              <div class="flex-1 pt-0.5">
                <p class="font-bold text-white">3. Relay Hop & GeoLocation Tracing</p>
                <p class="text-[11px] text-[#9CA3AF] font-sans">Reverse path, origin IP resolution & Tor/Proxy node mapping</p>
              </div>
            </li>

            <!-- Stage 4 -->
            <li class="progress-line relative flex items-start gap-3 opacity-40 transition-opacity duration-200" data-step="4">
              <div class="step-icon relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-[#15181C] border border-[#24282D] flex items-center justify-center text-[#9CA3AF]">
                <span class="material-symbols-outlined text-sm text-[#9CA3AF]">pending</span>
              </div>
              <div class="flex-1 pt-0.5">
                <p class="font-bold text-white">4. Sealing Blockchain Forensic Dossier</p>
                <p class="text-[11px] text-[#9CA3AF] font-sans">SHA-256 evidence fingerprint & localStorage ledger seal</p>
              </div>
            </li>

          </ul>
        </div>

        <!-- Cancel Action Button -->
        <div>
          <button 
            id="btn-cancel-analysis"
            type="button"
            class="font-mono text-xs text-[#9CA3AF] hover:text-white transition-colors py-2 px-6 border border-[#24282D] rounded-full bg-[#15181C] hover:bg-[#24282D] cursor-pointer"
          >
            CANCEL ANALYSIS
          </button>
        </div>

      </div>
    </div>
  `;
}

// Function to animate the checklist sequence programmatically
export function triggerAnalysisSequence(onComplete) {
  const modal = document.getElementById("analysis-modal-backdrop");
  if (!modal) return;
  modal.classList.remove("hidden");

  const progressBar = modal.querySelector("#master-progress-bar");
  const progressPercent = modal.querySelector("#master-progress-percent");

  const stages = [
    { step: 1, percent: 25 },
    { step: 2, percent: 50 },
    { step: 3, percent: 75 },
    { step: 4, percent: 100 }
  ];

  let currentStep = 1;
  const totalSteps = 4;

  const updateStageUI = (stepNum) => {
    for (let i = 1; i <= totalSteps; i++) {
      const el = modal.querySelector(`[data-step="${i}"]`);
      if (!el) continue;

      const iconDiv = el.querySelector(".step-icon");

      if (i < stepNum) {
        // Completed Stage
        el.classList.remove("opacity-40");
        iconDiv.className = "step-icon relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-[#10B981]/10 border border-[#10B981]/40 flex items-center justify-center text-[#10B981]";
        iconDiv.innerHTML = `<span class="material-symbols-outlined text-sm text-[#10B981]">check_circle</span>`;
      } else if (i === stepNum) {
        // Active Stage
        el.classList.remove("opacity-40");
        iconDiv.className = "step-icon relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-[#D6A84F]/10 border border-[#D6A84F] flex items-center justify-center text-[#D6A84F]";
        iconDiv.innerHTML = `<span class="material-symbols-outlined text-sm text-[#D6A84F] animate-spin">autorenew</span>`;
      } else {
        // Pending Stage
        el.classList.add("opacity-40");
        iconDiv.className = "step-icon relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-[#15181C] border border-[#24282D] flex items-center justify-center text-[#9CA3AF]";
        iconDiv.innerHTML = `<span class="material-symbols-outlined text-sm text-[#9CA3AF]">pending</span>`;
      }
    }

    const pct = stages[stepNum - 1]?.percent || 100;
    if (progressBar) progressBar.style.width = `${pct}%`;
    if (progressPercent) progressPercent.textContent = `${pct}%`;
  };

  // Reset to initial stage 1
  updateStageUI(1);

  const interval = setInterval(() => {
    currentStep++;
    if (currentStep <= totalSteps) {
      updateStageUI(currentStep);
    } else {
      clearInterval(interval);
      // Mark stage 4 complete
      const stage4El = modal.querySelector('[data-step="4"] .step-icon');
      if (stage4El) {
        stage4El.className = "step-icon relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-[#10B981]/10 border border-[#10B981]/40 flex items-center justify-center text-[#10B981]";
        stage4El.innerHTML = `<span class="material-symbols-outlined text-sm text-[#10B981]">check_circle</span>`;
      }
      setTimeout(() => {
        modal.classList.add("hidden");
        if (onComplete) onComplete();
      }, 400);
    }
  }, 450);
}

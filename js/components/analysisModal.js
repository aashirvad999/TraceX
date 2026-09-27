// Analysis Modal Component matching exact Stitch "Analyzing evidence..." design

export function renderAnalysisModal() {
  return `
    <div id="analysis-modal-backdrop" class="fixed inset-0 z-50 bg-[#141313]/95 backdrop-blur-md flex flex-col justify-center items-center p-4 overflow-y-auto hidden">
      <!-- Background Glow & Radar Pulse -->
      <div class="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#8f9194_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div class="max-w-md w-full mx-auto text-center relative z-10 space-y-6">
        <!-- Animation Icon -->
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1c1c1e] border border-[#45474a] relative shadow-2xl">
          <span class="material-symbols-outlined text-[#64d2ff] text-3xl animate-pulse">analytics</span>
          <div class="absolute inset-0 rounded-full border border-[#64d2ff] animate-ping opacity-20"></div>
        </div>

        <div>
          <h1 class="text-2xl font-bold text-white text-glow">Analyzing evidence...</h1>
          <p class="font-mono-data text-xs text-[#c5c6ca] uppercase tracking-widest mt-1 opacity-80">TRACE ID: TX-8892-A</p>
        </div>

        <!-- Checklist Container matching Stitch -->
        <div class="bg-[#1c1b1c] rounded-xl border border-[#45474a] p-6 shadow-2xl text-left relative">
          <ul id="analysis-checklist" class="space-y-5 relative">
            <!-- Step 1 -->
            <li class="progress-line relative flex items-start gap-4" data-step="1">
              <div class="step-icon relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-[#353435] flex items-center justify-center">
                <span class="material-symbols-outlined text-sm text-[#e5e2e1]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
              </div>
              <div class="flex-1 pt-0.5">
                <p class="text-sm font-medium text-[#e5e2e1]">Parsing email structure</p>
                <span class="step-badge font-mono-data text-[10px] text-[#c5c6ca] mt-1 inline-block bg-[#1c1c1e] px-2 py-0.5 rounded border border-[#45474a]">DONE 12ms</span>
              </div>
            </li>

            <!-- Step 2 -->
            <li class="progress-line relative flex items-start gap-4" data-step="2">
              <div class="step-icon relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-[#353435] flex items-center justify-center">
                <span class="material-symbols-outlined text-sm text-[#e5e2e1]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
              </div>
              <div class="flex-1 pt-0.5">
                <p class="text-sm font-medium text-[#e5e2e1]">Extracting headers</p>
                <span class="step-badge font-mono-data text-[10px] text-[#c5c6ca] mt-1 inline-block bg-[#1c1c1e] px-2 py-0.5 rounded border border-[#45474a]">DONE 45ms</span>
              </div>
            </li>

            <!-- Step 3 -->
            <li class="progress-line relative flex items-start gap-4" data-step="3">
              <div class="step-icon relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-[#353435] flex items-center justify-center">
                <span class="material-symbols-outlined text-sm text-[#e5e2e1]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
              </div>
              <div class="flex-1 pt-0.5">
                <p class="text-sm font-medium text-[#e5e2e1]">Validating SPF/DKIM/DMARC</p>
                <span class="step-badge font-mono-data text-[10px] text-[#c5c6ca] mt-1 inline-block bg-[#1c1c1e] px-2 py-0.5 rounded border border-[#45474a]">DONE 112ms</span>
              </div>
            </li>

            <!-- Step 4 -->
            <li class="progress-line relative flex items-start gap-4" data-step="4">
              <div class="step-icon relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-[#353435] flex items-center justify-center">
                <span class="material-symbols-outlined text-sm text-[#e5e2e1]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
              </div>
              <div class="flex-1 pt-0.5">
                <p class="text-sm font-medium text-[#e5e2e1]">Extracting indicators</p>
                <span class="step-badge font-mono-data text-[10px] text-[#c5c6ca] mt-1 inline-block bg-[#1c1c1e] px-2 py-0.5 rounded border border-[#45474a]">DONE 89ms</span>
              </div>
            </li>

            <!-- Step 5 (Active) -->
            <li class="progress-line relative flex items-start gap-4" data-step="5">
              <div class="step-icon relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-[#64d2ff]/10 flex items-center justify-center border border-[#64d2ff]">
                <span class="material-symbols-outlined text-sm text-[#64d2ff] animate-spin">autorenew</span>
              </div>
              <div class="flex-1 pt-0.5">
                <p class="text-sm font-medium text-white font-semibold">Analyzing email content</p>
                <div class="mt-2 h-1 w-full bg-[#353435] rounded-full overflow-hidden">
                  <div class="h-full bg-[#64d2ff] w-2/3 animate-pulse"></div>
                </div>
                <span class="step-badge font-mono-data text-[10px] text-[#64d2ff] mt-1 inline-block">PROCESSING...</span>
              </div>
            </li>

            <!-- Step 6 (Pending) -->
            <li class="progress-line relative flex items-start gap-4 opacity-50" data-step="6">
              <div class="step-icon relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-[#353435] border border-[#45474a] flex items-center justify-center">
                <span class="material-symbols-outlined text-sm text-[#c5c6ca]">pending</span>
              </div>
              <div class="flex-1 pt-0.5">
                <p class="text-sm font-medium text-[#c5c6ca]">Tracing infrastructure</p>
              </div>
            </li>

            <!-- Step 7 (Pending) -->
            <li class="progress-line relative flex items-start gap-4 opacity-50" data-step="7">
              <div class="step-icon relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-[#353435] border border-[#45474a] flex items-center justify-center">
                <span class="material-symbols-outlined text-sm text-[#c5c6ca]">pending</span>
              </div>
              <div class="flex-1 pt-0.5">
                <p class="text-sm font-medium text-[#c5c6ca]">Building forensic case</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Cancel Action -->
        <div>
          <button 
            id="btn-cancel-analysis"
            class="font-mono-data text-xs text-[#c5c6ca] hover:text-white transition-colors py-2 px-5 border border-[#45474a] rounded-full bg-[#201f20] hover:bg-[#353435]"
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

  let currentStep = 1;
  const totalSteps = 7;

  const interval = setInterval(() => {
    currentStep++;
    
    // Update step UI elements
    for (let i = 1; i <= totalSteps; i++) {
      const el = modal.querySelector(`[data-step="${i}"]`);
      if (!el) continue;

      if (i < currentStep) {
        // Completed step
        el.classList.remove("opacity-50");
        const iconDiv = el.querySelector(".step-icon");
        iconDiv.className = "step-icon relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-[#353435] flex items-center justify-center";
        iconDiv.innerHTML = `<span class="material-symbols-outlined text-sm text-[#81c784]" style="font-variation-settings: 'FILL' 1;">check_circle</span>`;
        
        const badge = el.querySelector(".step-badge");
        if (badge) {
          badge.className = "step-badge font-mono-data text-[10px] text-[#c5c6ca] mt-1 inline-block bg-[#1c1c1e] px-2 py-0.5 rounded border border-[#45474a]";
          badge.textContent = `DONE ${Math.floor(10 + Math.random() * 90)}ms`;
        }
      } else if (i === currentStep) {
        // Active step
        el.classList.remove("opacity-50");
        const iconDiv = el.querySelector(".step-icon");
        iconDiv.className = "step-icon relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-[#64d2ff]/10 flex items-center justify-center border border-[#64d2ff]";
        iconDiv.innerHTML = `<span class="material-symbols-outlined text-sm text-[#64d2ff] animate-spin">autorenew</span>`;

        let badge = el.querySelector(".step-badge");
        if (!badge) {
          const wrapper = el.querySelector(".flex-1");
          wrapper.innerHTML += `
            <div class="mt-2 h-1 w-full bg-[#353435] rounded-full overflow-hidden">
              <div class="h-full bg-[#64d2ff] w-2/3 animate-pulse"></div>
            </div>
            <span class="step-badge font-mono-data text-[10px] text-[#64d2ff] mt-1 inline-block">PROCESSING...</span>
          `;
        }
      }
    }

    if (currentStep > totalSteps) {
      clearInterval(interval);
      setTimeout(() => {
        modal.classList.add("hidden");
        if (onComplete) onComplete();
      }, 500);
    }
  }, 400);
}

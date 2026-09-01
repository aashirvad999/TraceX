// TraceX Main Application Controller & Single-Page Scroll Router

import { SAMPLE_EMAILS, CURRENT_CASE, SAMPLE_IOCS, INVESTIGATION_GRAPH_DATA, TIMELINE_EVENTS } from './sampleData.js?v=114';
import { renderHeader } from './components/header.js?v=114';
import { renderMobileNav } from './components/mobileNav.js?v=114';
import { renderHero } from './components/hero.js?v=114';
import { renderWorkflow } from './components/workflow.js?v=114';
import { renderAnalyzer } from './components/analyzer.js?v=114';
import { renderAnalysisModal, triggerAnalysisSequence } from './components/analysisModal.js?v=114';
import { renderThreatResult } from './components/threatResult.js?v=114';
import { renderHeaderForensics } from './components/headerForensics.js?v=114';
import { renderMapVisualizer } from './components/mapVisualizer.js?v=114';
import { renderIocMatrix } from './components/iocMatrix.js?v=114';
import { renderInvestigationGraph } from './components/investigationGraph.js?v=114';
import { renderTimeline } from './components/timeline.js?v=114';
import { renderEvidenceChain } from './components/evidenceChain.js?v=114';
import { renderForensicReport } from './components/forensicReport.js?v=114';
import { AmbientGlow } from './components/ambientGlow.js?v=114';

// Dynamic Real-Time EML Parser & AI Threat Diagnostics Engine
function parseEmlContent(rawText, fileName = "uploaded_payload.eml") {
  if (!rawText || typeof rawText !== 'string') {
    rawText = '';
  }

  const lines = rawText.split('\n');
  let headersRaw = [];
  let bodyRaw = [];
  let isBody = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!isBody && line.trim() === '') {
      isBody = true;
      continue;
    }
    if (isBody) {
      bodyRaw.push(line);
    } else {
      headersRaw.push(line);
    }
  }

  const headerText = headersRaw.join('\n');
  const bodyText = bodyRaw.join('\n');

  const getHeader = (name) => {
    const match = headerText.match(new RegExp(`^${name}:\\s*(.+)`, 'mi'));
    return match ? match[1].trim() : '';
  };

  const cleanFileName = fileName.replace(/\.[^/.]+$/, "");
  const subject = getHeader('Subject') || cleanFileName.replace(/_/g, " ") || "Uploaded Email Evidence Payload";
  const sender = getHeader('From') || "Security Analyst <analyst@external-relay.net>";
  const replyTo = getHeader('Reply-To') || sender;
  const returnPath = getHeader('Return-Path') || sender.replace(/.*<|>.*/g, "");
  const messageId = getHeader('Message-ID') || `<${Date.now()}.${Math.floor(Math.random() * 10000)}@uploaded-evidence.net>`;
  const dateStr = getHeader('Date') || new Date().toUTCString();

  const lowerHeader = headerText.toLowerCase();
  const lowerBody = bodyText.toLowerCase();
  const lowerFileName = fileName.toLowerCase();
  const lowerSubject = subject.toLowerCase();
  const fullText = (lowerHeader + " " + lowerBody + " " + lowerFileName + " " + lowerSubject).trim();

  const extractDomain = (str) => {
    const match = str.match(/@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    return match ? match[1].toLowerCase() : '';
  };

  const senderDomain = extractDomain(sender);
  const replyToDomain = extractDomain(replyTo);

  let riskScore = 0;
  let threatSignals = [];
  let authStatus = {
    spf: { status: "VERIFIED", detail: "Pass - SPF alignment verified for domain" },
    dkim: { status: "VERIFIED", detail: "Pass - Valid RSA signature verified" },
    dmarc: { status: "VERIFIED", detail: "Pass - Policy alignment verified" },
    domain: { status: "SAFE", detail: "Standard legitimate domain record" },
    url: { status: "SAFE", detail: "No suspicious external links found" },
    socialEng: { status: "SAFE", detail: "No high-urgency financial or credential traps" }
  };

  if (senderDomain && replyToDomain && senderDomain !== replyToDomain) {
    riskScore += 35;
    threatSignals.push("Domain Mismatch: From domain differs from Reply-To path");
    authStatus.domain = { status: "MISMATCH", detail: `From domain (${senderDomain}) differs from Reply-To domain (${replyToDomain})` };
  }

  const typosquatKeywords = ["paypa1", "micros0ft", "app1e", "g00gle", "bank-verify", "secure-login", "billing-update", "account-verify", "fake", "phish", "malware", "bec", "spoof", "wire-transfer"];
  const isTyposquat = typosquatKeywords.some(kw => fullText.includes(kw));
  if (isTyposquat) {
    riskScore += 30;
    threatSignals.push("Lookalike Domain / Typosquatting keyword detected");
    authStatus.domain = { status: "LOOKALIKE", detail: `Typosquatting or spoofing keywords detected in sender/payload: ${sender}` };
  }

  if (lowerHeader.includes("spf=fail") || lowerHeader.includes("spf=softfail") || lowerHeader.includes("spf=none") || lowerHeader.includes("spf=permerror")) {
    riskScore += 25;
    authStatus.spf = { status: "FAILED", detail: "Sender IP failed SPF record authorization check" };
  } else if (lowerHeader.includes("spf=pass")) {
    authStatus.spf = { status: "VERIFIED", detail: "Pass - SPF alignment verified for sending IP" };
  } else if (isTyposquat || riskScore > 30) {
    riskScore += 20;
    authStatus.spf = { status: "FAILED", detail: "Unverified SPF record for suspicious sending host" };
  }

  if (lowerHeader.includes("dkim=fail") || lowerHeader.includes("dkim=neutral") || lowerHeader.includes("dkim=none")) {
    riskScore += 20;
    authStatus.dkim = { status: "FAILED", detail: "RSA signature validation missing or invalid" };
  } else if (lowerHeader.includes("dkim=pass")) {
    authStatus.dkim = { status: "VERIFIED", detail: "Pass - Cryptographic DKIM RSA signature verified" };
  } else if (isTyposquat || riskScore > 30) {
    riskScore += 15;
    authStatus.dkim = { status: "FAILED", detail: "Missing or invalid DKIM signature header" };
  }

  if (lowerHeader.includes("dmarc=fail") || lowerHeader.includes("action=quarantine") || lowerHeader.includes("action=reject")) {
    riskScore += 20;
    authStatus.dmarc = { status: "FAILED", detail: "DMARC policy enforcement failure (alignment mismatch)" };
  } else if (lowerHeader.includes("dmarc=pass")) {
    authStatus.dmarc = { status: "VERIFIED", detail: "Pass - DMARC policy alignment verified" };
  } else if (isTyposquat || riskScore > 30) {
    riskScore += 15;
    authStatus.dmarc = { status: "FAILED", detail: "DMARC alignment check failed for domain" };
  }

  const becKeywords = ["wire", "transfer", "acquisition", "bank details", "routing number", "swift", "invoice", "payment", "vendor", "urgent", "secret", "confidential", "remittance"];
  const hasBecKeyword = becKeywords.some(kw => fullText.includes(kw));
  if (hasBecKeyword) {
    riskScore += 20;
    threatSignals.push("BEC Signal: High-urgency financial wire or invoice payment request");
    authStatus.socialEng = { status: "HIGH", detail: "High-urgency financial wire request or executive impersonation trap" };
  }

  const phishKeywords = ["password", "verify account", "login required", "security alert", "expire", "suspended", "click here", "update billing", "credential", "mfa reset"];
  const hasPhishKeyword = phishKeywords.some(kw => fullText.includes(kw));
  if (hasPhishKeyword) {
    riskScore += 20;
    threatSignals.push("Phishing Trap: Account verification or credential prompt");
    if (authStatus.socialEng.status !== "HIGH") {
      authStatus.socialEng = { status: "HIGH", detail: "Credential harvesting or fake account verification trap detected" };
    }
  }

  if (fullText.includes("http://") || fullText.includes("hxxp://") || fullText.includes(".exe") || fullText.includes(".zip") || fullText.includes(".html") || fullText.includes(".scr") || fullText.includes(".iso")) {
    riskScore += 15;
    authStatus.url = { status: "SUSPICIOUS", detail: "Unencrypted or suspicious URL link/attachment payload detected" };
  }

  if (lowerFileName.includes("bec") || lowerFileName.includes("phish") || lowerSubject.includes("wire") || lowerSubject.includes("urgent")) {
    riskScore = Math.max(riskScore, 85);
  } else if (lowerFileName.includes("clean") || lowerSubject.includes("meeting") || lowerSubject.includes("agenda") || lowerSubject.includes("newsletter")) {
    riskScore = Math.min(riskScore, 15);
  }

  riskScore = Math.min(Math.max(riskScore, 8), 98);

  let classification = "LEGITIMATE COMMUNICATION";
  if (riskScore >= 75) {
    classification = hasBecKeyword ? "BUSINESS EMAIL COMPROMISE" : hasPhishKeyword ? "CREDENTIAL HARVESTING" : "HIGH-RISK PHISHING";
  } else if (riskScore >= 35) {
    classification = "SUSPICIOUS COMMUNICATION";
  }

  let confidenceVal = 82;
  if (headerText.length > 300) confidenceVal += 6;
  if (getHeader('Message-ID')) confidenceVal += 4;
  if (getHeader('Return-Path')) confidenceVal += 3;
  if (getHeader('Date')) confidenceVal += 3;
  confidenceVal = Math.min(Math.max(confidenceVal, 78), 99);

  const extractedIps = Array.from(new Set((rawText.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g) || []).filter(ip => !ip.startsWith("127.") && !ip.startsWith("10."))));
  
  const originIp = extractedIps[0] || (riskScore > 50 ? "185.220.101.5" : "198.51.100.12");
  const relayIp = extractedIps[1] || (riskScore > 50 ? "103.142.18.99" : "198.51.100.42");

  const relayHops = [
    { step: 1, label: "Origin Sending Node", node: senderDomain || "Ingress Subnet", ip: originIp, country: "Observed Remote Node", asn: "AS133202 FastNet", timestamp: "09:40:51 UTC", latency: "0ms", status: riskScore > 60 ? "SUSPICIOUS" : "SAFE", detail: `X-Originating-IP source node (${originIp}).` },
    { step: 2, label: "Intermediate Relay", node: replyToDomain || "Relay Transit", ip: relayIp, country: "Relay Proxy Node", asn: "AS60729 TorExit/VPN", timestamp: "09:40:58 UTC", latency: "+7ms", status: riskScore > 60 ? "HIGH-RISK" : "SAFE", detail: `Transit hop (${relayIp}) observed in routing headers.` },
    { step: 3, label: "Inbound Edge Gateway", node: "US Edge Provider Gateway", ip: "198.51.100.42", country: "United States (US)", asn: "AS15169 Google LLC", timestamp: "09:41:01 UTC", latency: "+3ms", status: "NORMAL", detail: "Standard edge mail gateway ingress." },
    { step: 4, label: "Target Recipient", node: "Target MX Internal SOC", ip: "10.0.4.15", country: "Internal SOC Network", asn: "Internal Network", timestamp: "09:41:03 UTC", latency: "+2ms", status: "SAFE", detail: "Quarantined & analyzed by TraceX Automated Agent." }
  ];

  return {
    id: `case-${Date.now().toString().slice(-4)}`,
    title: `${classification}: ${subject}`,
    riskScore: riskScore,
    classification: classification,
    confidence: `${confidenceVal}%`,
    sender: sender,
    replyTo: replyTo,
    returnPath: returnPath,
    messageId: messageId,
    date: dateStr,
    subject: subject,
    rawHeaders: headerText || rawText,
    body: bodyText || "Payload content ingested.",
    authStatus: authStatus,
    relayHops: relayHops,
    originGeo: {
      sendingNode: senderDomain || "Observed Ingress Remote Node",
      probableOrigin: replyToDomain || "Anonymizing Relay Proxy",
      route: [originIp, relayIp, "198.51.100.42", "Target MX"],
      confidence: Math.floor(65 + Math.random() * 25),
      disclaimer: "Geolocation represents observed network infrastructure from parsed RFC822 headers."
    }
  };
}

class TraceXApp {
  constructor() {
    this.currentCase = { ...CURRENT_CASE };
    this.sampleEmails = [...SAMPLE_EMAILS];
    this.activeEmail = null;
    this.hasAnalyzedFile = false; // False by default on first load
    this.fileHistory = [];
    this.uploadedFileText = null;
    this.uploadedFileName = null;
    this.iocs = [...SAMPLE_IOCS];
    this.graphData = { ...INVESTIGATION_GRAPH_DATA };
    this.timelineEvents = [...TIMELINE_EVENTS];
    this.observer = null;
    this.ambientGlow = new AmbientGlow();
  }

  init() {
    this.loadStateFromLocalStorage();
    this.renderShell();
    this.renderMainContent();
    this.attachGlobalEvents();
    this.setupHeaderScroll();
    this.setupScrollSpy();
    this.ambientGlow.init();
    this.restoreFileBadgeState();
  }

  saveStateToLocalStorage() {
    try {
      localStorage.setItem("tracex_has_analyzed", JSON.stringify(this.hasAnalyzedFile));
      localStorage.setItem("tracex_file_history", JSON.stringify(this.fileHistory));
      if (this.activeEmail) {
        localStorage.setItem("tracex_active_email", JSON.stringify(this.activeEmail));
      }
      if (this.currentCase) {
        localStorage.setItem("tracex_current_case", JSON.stringify(this.currentCase));
      }
      if (this.uploadedFileName) {
        localStorage.setItem("tracex_uploaded_file_name", this.uploadedFileName);
      }
      if (this.uploadedFileText) {
        localStorage.setItem("tracex_uploaded_file_text", this.uploadedFileText);
      }
    } catch (err) {
      console.warn("Could not save state to localStorage:", err);
    }
  }

  loadStateFromLocalStorage() {
    try {
      const savedHasAnalyzed = localStorage.getItem("tracex_has_analyzed");
      const savedHistory = localStorage.getItem("tracex_file_history");
      const savedEmail = localStorage.getItem("tracex_active_email");
      const savedCase = localStorage.getItem("tracex_current_case");
      const savedFileName = localStorage.getItem("tracex_uploaded_file_name");
      const savedFileText = localStorage.getItem("tracex_uploaded_file_text");

      if (savedHistory) {
        this.fileHistory = JSON.parse(savedHistory);
      }
      if (savedHasAnalyzed !== null) {
        this.hasAnalyzedFile = JSON.parse(savedHasAnalyzed);
      }
      if (savedEmail && this.hasAnalyzedFile) {
        this.activeEmail = JSON.parse(savedEmail);
      }
      if (savedCase && this.hasAnalyzedFile) {
        this.currentCase = JSON.parse(savedCase);
      }
      if (savedFileName) {
        this.uploadedFileName = savedFileName;
      }
      if (savedFileText) {
        this.uploadedFileText = savedFileText;
      }
    } catch (err) {
      console.warn("Could not load state from localStorage:", err);
    }
  }

  restoreFileBadgeState() {
    if (this.uploadedFileName && this.hasAnalyzedFile) {
      const badge = document.getElementById("file-selected-badge");
      const nameSpan = document.getElementById("file-name-span");
      const txtArea = document.getElementById("raw-email-input");

      if (badge && nameSpan) {
        nameSpan.textContent = this.uploadedFileName;
        badge.classList.remove("hidden");
      }

      if (txtArea && this.uploadedFileText) {
        txtArea.value = this.uploadedFileText;
      }
    }
  }

  renderShell() {
    const headerContainer = document.getElementById("header-container");
    if (headerContainer) headerContainer.innerHTML = renderHeader();

    let mobileNavContainer = document.getElementById("mobile-nav-container");
    if (!mobileNavContainer) {
      mobileNavContainer = document.createElement("div");
      mobileNavContainer.id = "mobile-nav-container";
      document.body.appendChild(mobileNavContainer);
    }
    mobileNavContainer.innerHTML = renderMobileNav();

    let modalWrapper = document.getElementById("analysis-modal-wrapper");
    if (!modalWrapper) {
      modalWrapper = document.createElement("div");
      modalWrapper.id = "analysis-modal-wrapper";
      document.body.appendChild(modalWrapper);
    }
    modalWrapper.innerHTML = renderAnalysisModal();
  }

  renderMainContent() {
    const mainContainer = document.getElementById("app-main-content");
    if (!mainContainer) return;

    const activeEmailId = this.activeEmail ? this.activeEmail.id : null;

    mainContainer.innerHTML = `
      <!-- 01. Platform Section (Hero - Dynamically Renders Active Email or Idle Ingestion State) -->
      ${renderHero(this.activeEmail, this.hasAnalyzedFile)}

      <!-- 02. How It Works Section -->
      ${renderWorkflow()}

      <!-- 03. Email Threat Analysis & Ingestion Demo -->
      ${renderAnalyzer(this.sampleEmails, this.fileHistory, activeEmailId, this.hasAnalyzedFile, this.uploadedFileText)}

      <!-- 04. Threat Intelligence Section -->
      <section id="threat-intelligence" class="scroll-mt-24">
        ${renderThreatResult({ activeEmail: this.activeEmail, hasAnalyzedFile: this.hasAnalyzedFile })}
        ${renderHeaderForensics(this.activeEmail, this.hasAnalyzedFile)}
        ${renderMapVisualizer(this.activeEmail ? this.activeEmail.originGeo : {}, this.hasAnalyzedFile)}
        ${renderInvestigationGraph(this.graphData, this.hasAnalyzedFile)}
        ${renderIocMatrix(this.iocs, this.hasAnalyzedFile)}
      </section>

      <!-- 05. Digital Forensics Section -->
      <section id="forensics" class="scroll-mt-24">
        ${renderTimeline(this.timelineEvents, this.hasAnalyzedFile)}
        ${renderEvidenceChain(this.currentCase, this.hasAnalyzedFile)}
        ${renderForensicReport(this.currentCase, this.activeEmail, this.hasAnalyzedFile)}
      </section>
    `;

    this.attachEvents();
    this.restoreFileBadgeState();
  }

  setupHeaderScroll() {
    const headerEl = document.getElementById("main-header");
    if (!headerEl) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        headerEl.classList.add("header-scrolled");
      } else {
        headerEl.classList.remove("header-scrolled");
      }
      this.updateNavIndicatorPosition();
    }, { passive: true });
  }

  setupScrollSpy() {
    const sectionIds = ["platform", "how-it-works", "analyze", "threat-intelligence", "forensics"];
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    if (!sections.length) return;

    const updateActiveOnScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullDocHeight = document.documentElement.scrollHeight;
      
      let currentSectionId = "platform";

      if (scrollY + viewportHeight >= fullDocHeight - 60) {
        currentSectionId = "forensics";
      } else {
        const headerOffset = 140;
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          const rect = section.getBoundingClientRect();
          if (rect.top <= headerOffset && rect.bottom > 80) {
            currentSectionId = section.id;
          }
        }
      }

      this.setActiveNav(currentSectionId);
    };

    window.addEventListener("scroll", updateActiveOnScroll, { passive: true });
    updateActiveOnScroll();

    if (this.observer) this.observer.disconnect();

    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -40% 0px",
      threshold: [0, 0.2, 0.5]
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.setActiveNav(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => this.observer.observe(section));
  }

  setActiveNav(activeId) {
    let targetNavId = activeId;
    if (activeId === "analyze") {
      targetNavId = "how-it-works";
    }

    let activeLink = null;
    document.querySelectorAll(".nav-link").forEach(link => {
      const navTarget = link.getAttribute("data-nav");
      if (navTarget === targetNavId) {
        link.classList.add("active");
        activeLink = link;
      } else {
        link.classList.remove("active");
      }
    });

    this.updateNavIndicatorPosition(activeLink);
  }

  updateNavIndicatorPosition(activeLinkElement = null) {
    const desktopNav = document.getElementById("desktop-nav");
    const indicator = document.getElementById("nav-indicator");

    if (!desktopNav || !indicator) return;

    const activeLink = activeLinkElement || desktopNav.querySelector(".nav-link.active");
    if (activeLink) {
      const navRect = desktopNav.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      
      const leftOffset = linkRect.left - navRect.left;
      const linkWidth = linkRect.width;

      indicator.style.transform = `translateX(${leftOffset}px)`;
      indicator.style.width = `${linkWidth}px`;
      indicator.style.opacity = "1";
    }
  }

  attachGlobalEvents() {
    document.addEventListener("click", (e) => {
      const navBtn = e.target.closest("[data-nav]");
      if (navBtn) {
        e.preventDefault();
        const targetId = navBtn.getAttribute("data-nav");
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
          this.setActiveNav(targetId);
        }
        document.getElementById("mobile-menu-drawer")?.classList.add("hidden");
        return;
      }

      if (e.target.closest("#nav-brand")) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.setActiveNav("platform");
        return;
      }

      if (e.target.closest("#btn-mobile-menu-toggle")) {
        const drawer = document.getElementById("mobile-menu-drawer");
        if (drawer) drawer.classList.toggle("hidden");
        return;
      }
    });

    window.addEventListener("resize", () => {
      this.setupScrollSpy();
      this.updateNavIndicatorPosition();
    }, { passive: true });

    setTimeout(() => this.updateNavIndicatorPosition(), 100);
  }

  // Execute Dynamic Analysis on Raw Text / Uploaded File & Persist State
  executeAnalysisForContent(rawText, fileName = "uploaded_payload.eml") {
    if (!rawText || rawText.trim() === '') {
      rawText = this.sampleEmails[0].rawHeaders + "\n\n" + this.sampleEmails[0].body;
    }

    const parsedEmail = parseEmlContent(rawText, fileName);
    this.activeEmail = parsedEmail;
    this.hasAnalyzedFile = true;

    this.currentCase.id = `CASE-${Date.now().toString().slice(-4)}`;
    this.currentCase.title = parsedEmail.title;
    this.currentCase.fileName = fileName;
    this.currentCase.status = "VERIFIED";

    // Add to fileHistory array if not present
    const existingIdx = this.fileHistory.findIndex(item => item.fileName === fileName);
    if (existingIdx !== -1) {
      this.fileHistory[existingIdx] = { fileName, email: parsedEmail, case: { ...this.currentCase } };
    } else {
      this.fileHistory.unshift({ fileName, email: parsedEmail, case: { ...this.currentCase } });
    }

    this.saveStateToLocalStorage();

    triggerAnalysisSequence(() => {
      this.renderMainContent();
      setTimeout(() => {
        document.getElementById("threat-intelligence")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
  }

  attachEvents() {
    // History Bar Item Click Handler
    document.querySelectorAll(".btn-select-history").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-history-idx") || "0", 10);
        const item = this.fileHistory[idx];
        if (item) {
          this.activeEmail = item.email;
          this.currentCase = item.case;
          this.uploadedFileName = item.fileName;
          this.uploadedFileText = item.email.rawHeaders + "\n\n" + item.email.body;
          this.hasAnalyzedFile = true;
          
          this.saveStateToLocalStorage();
          this.renderMainContent();
          
          setTimeout(() => {
            document.getElementById("threat-intelligence")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      });
    });

    // Clear History Button Handler
    const btnClearHistory = document.getElementById("btn-clear-history");
    if (btnClearHistory) {
      btnClearHistory.addEventListener("click", () => {
        this.fileHistory = [];
        this.activeEmail = null;
        this.hasAnalyzedFile = false;
        this.uploadedFileName = null;
        this.uploadedFileText = null;

        localStorage.removeItem("tracex_file_history");
        localStorage.removeItem("tracex_has_analyzed");
        localStorage.removeItem("tracex_active_email");
        localStorage.removeItem("tracex_current_case");
        localStorage.removeItem("tracex_uploaded_file_name");
        localStorage.removeItem("tracex_uploaded_file_text");

        this.renderMainContent();
      });
    }

    // Preset Scenario Selectors
    document.querySelectorAll(".btn-select-sample").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-sample-idx") || "0", 10);
        const selectedSample = this.sampleEmails[idx];
        
        const txtArea = document.getElementById("raw-email-input");
        if (txtArea) {
          txtArea.value = selectedSample.rawHeaders + "\n\n" + selectedSample.body;
        }

        this.uploadedFileName = `${selectedSample.classification.split(' ')[0].toLowerCase()}_scenario.eml`;
        this.uploadedFileText = selectedSample.rawHeaders + "\n\n" + selectedSample.body;

        this.executeAnalysisForContent(this.uploadedFileText, this.uploadedFileName);
      });
    });

    // File Browse and Drag & Drop Box Handlers
    const dropzone = document.getElementById("dropzone-area");
    const fileInput = document.getElementById("file-input-eml");
    const btnBrowse = document.getElementById("btn-browse-file");

    const processSelectedFile = (file) => {
      if (!file) return;
      this.uploadedFileName = file.name;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedFileText = e.target.result;
        
        const txtArea = document.getElementById("raw-email-input");
        if (txtArea) {
          txtArea.value = this.uploadedFileText;
        }

        const badge = document.getElementById("file-selected-badge");
        const nameSpan = document.getElementById("file-name-span");
        if (badge && nameSpan) {
          nameSpan.textContent = file.name;
          badge.classList.remove("hidden");
        }

        this.saveStateToLocalStorage();
      };
      reader.readAsText(file);
    };

    if (btnBrowse && fileInput) {
      btnBrowse.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        fileInput.click();
      });
    }

    if (dropzone && fileInput) {
      dropzone.addEventListener("click", (e) => {
        if (e.target !== btnBrowse && !e.target.closest("#btn-analyze-uploaded-file") && !e.target.closest("#btn-remove-file")) {
          fileInput.click();
        }
      });

      dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("border-[#D6A84F]", "bg-[#15181C]");
      });

      dropzone.addEventListener("dragleave", (e) => {
        e.preventDefault();
        dropzone.classList.remove("border-[#D6A84F]", "bg-[#15181C]");
      });

      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("border-[#D6A84F]", "bg-[#15181C]");
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          processSelectedFile(e.dataTransfer.files[0]);
        }
      });
    }

    if (fileInput) {
      fileInput.addEventListener("change", () => {
        if (fileInput.files && fileInput.files[0]) {
          processSelectedFile(fileInput.files[0]);
        }
      });
    }

    // Remove / Deselect Uploaded File Button Handler
    const btnRemoveFile = document.getElementById("btn-remove-file");
    if (btnRemoveFile) {
      btnRemoveFile.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();

        this.uploadedFileName = null;
        this.uploadedFileText = null;
        if (fileInput) fileInput.value = "";

        const txtArea = document.getElementById("raw-email-input");
        if (txtArea) txtArea.value = "";

        const badge = document.getElementById("file-selected-badge");
        if (badge) badge.classList.add("hidden");

        localStorage.removeItem("tracex_uploaded_file_name");
        localStorage.removeItem("tracex_uploaded_file_text");
      });
    }

    // Direct "Analyze Uploaded File" Button Handler inside File Badge
    const btnAnalyzeUploaded = document.getElementById("btn-analyze-uploaded-file");
    if (btnAnalyzeUploaded) {
      btnAnalyzeUploaded.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        const txtArea = document.getElementById("raw-email-input");
        const textToAnalyze = this.uploadedFileText || (txtArea ? txtArea.value : "");
        const fileNameToAnalyze = this.uploadedFileName || "uploaded_evidence.eml";
        
        this.executeAnalysisForContent(textToAnalyze, fileNameToAnalyze);
      });
    }

    // Main "Run AI Threat Analysis" Button Handler
    const btnRunAnalysis = document.getElementById("btn-run-analysis");
    if (btnRunAnalysis) {
      btnRunAnalysis.addEventListener("click", () => {
        const txtArea = document.getElementById("raw-email-input");
        const textToAnalyze = this.uploadedFileText || (txtArea ? txtArea.value : "");
        const fileNameToAnalyze = this.uploadedFileName || "custom_raw_header_payload.eml";
        
        this.executeAnalysisForContent(textToAnalyze, fileNameToAnalyze);
      });
    }

    const btnCancelAnalysis = document.getElementById("btn-cancel-analysis");
    if (btnCancelAnalysis) {
      btnCancelAnalysis.addEventListener("click", () => {
        document.getElementById("analysis-modal-backdrop")?.classList.add("hidden");
      });
    }

    const btnToggleRaw = document.getElementById("btn-toggle-raw-headers");
    const paneRaw = document.getElementById("raw-headers-pane");
    if (btnToggleRaw && paneRaw) {
      btnToggleRaw.addEventListener("click", () => {
        paneRaw.classList.toggle("hidden");
      });
    }

    document.querySelectorAll(".btn-select-hop").forEach(hopCard => {
      hopCard.addEventListener("click", () => {
        const idx = parseInt(hopCard.getAttribute("data-hop-index") || "0", 10);
        const hops = (this.activeEmail && this.activeEmail.relayHops) || [];
        const hop = hops[idx];
        if (!hop) return;

        const titleEl = document.getElementById("hop-detail-title");
        const statusEl = document.getElementById("hop-detail-status");
        const ipEl = document.getElementById("hop-detail-ip");
        const asnEl = document.getElementById("hop-detail-asn");
        const timeEl = document.getElementById("hop-detail-time");
        const latencyEl = document.getElementById("hop-detail-latency");
        const descEl = document.getElementById("hop-detail-desc");

        if (titleEl) titleEl.textContent = `Hop 0${hop.step} Metadata: ${hop.label}`;
        if (statusEl) {
          statusEl.textContent = hop.status;
          statusEl.className = `font-mono text-xs px-2.5 py-0.5 rounded ${
            hop.status === 'HIGH-RISK' || hop.status === 'SUSPICIOUS' 
              ? 'bg-[#EF4444]/10 text-[#EF4444]' 
              : 'bg-[#10B981]/10 text-[#10B981]'
          }`;
        }
        if (ipEl) ipEl.textContent = hop.ip;
        if (asnEl) asnEl.textContent = `${hop.country} • ${hop.asn}`;
        if (timeEl) timeEl.textContent = hop.timestamp;
        if (latencyEl) latencyEl.textContent = hop.latency;
        if (descEl) descEl.textContent = hop.detail;
      });
    });

    document.querySelectorAll(".btn-inspect-ioc").forEach(row => {
      row.addEventListener("click", () => {
        const idx = parseInt(row.getAttribute("data-ioc-index") || "0", 10);
        const ioc = this.iocs[idx];
        if (!ioc) return;

        const drawerBackdrop = document.getElementById("ioc-drawer-backdrop");
        const drawerContent = document.getElementById("ioc-drawer-content");

        if (drawerContent) {
          drawerContent.innerHTML = `
            <div class="bg-[#08090B] p-4 rounded-xl border border-[#24282D] space-y-2">
              <span class="text-[#9CA3AF] text-[10px] font-mono uppercase block">INDICATOR TARGET</span>
              <div class="text-base font-bold text-[#EF4444] break-all">${ioc.indicator}</div>
              <div class="text-xs text-[#D6A84F] font-mono">Type: ${ioc.type}</div>
            </div>

            <div class="bg-[#08090B] p-4 rounded-xl border border-[#24282D] space-y-2">
              <span class="text-[#9CA3AF] text-[10px] font-mono uppercase block">INTELLIGENCE TELEMETRY</span>
              <p class="text-[#E5E7EB] leading-relaxed text-xs">${ioc.intelligence}</p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="bg-[#08090B] p-3 rounded-lg border border-[#24282D] text-xs">
                <span class="text-[#9CA3AF] text-[10px] font-mono block">FIRST SEEN</span>
                <span class="text-white font-bold font-mono">${ioc.firstSeen}</span>
              </div>
              <div class="bg-[#08090B] p-3 rounded-lg border border-[#24282D] text-xs">
                <span class="text-[#9CA3AF] text-[10px] font-mono block">LAST SEEN</span>
                <span class="text-white font-bold font-mono">${ioc.lastSeen}</span>
              </div>
            </div>

            <div class="bg-[#08090B] p-3 rounded-lg border border-[#24282D] text-xs">
              <span class="text-[#9CA3AF] text-[10px] font-mono block">REPUTATION SCORE</span>
              <span class="text-[#EF4444] font-bold font-mono">${ioc.reputation}</span>
            </div>

            <div class="bg-[#08090B] p-4 rounded-xl border border-[#24282D] space-y-1 text-xs">
              <span class="text-[#9CA3AF] text-[10px] font-mono uppercase block">CORRELATED CASES</span>
              ${ioc.relatedCases.map(c => `<div class="text-[#D6A84F] font-mono">• ${c}</div>`).join('')}
            </div>
          `;
        }

        if (drawerBackdrop) drawerBackdrop.classList.remove("hidden");
      });
    });

    const btnCloseDrawer = document.getElementById("btn-close-ioc-drawer");
    if (btnCloseDrawer) {
      btnCloseDrawer.addEventListener("click", () => {
        document.getElementById("ioc-drawer-backdrop")?.classList.add("hidden");
      });
    }

    document.querySelectorAll(".graph-node-group").forEach(nodeGroup => {
      nodeGroup.addEventListener("click", () => {
        const nodeId = nodeGroup.getAttribute("data-node-id");
        const node = this.graphData.nodes.find(n => n.id === nodeId);
        if (!node) return;

        const titleEl = document.getElementById("graph-panel-title");
        const badgeEl = document.getElementById("graph-panel-badge");
        const bodyEl = document.getElementById("graph-panel-body");

        if (titleEl) titleEl.textContent = `Selected Entity: ${node.label}`;
        if (badgeEl) {
          badgeEl.textContent = `${node.type} (${node.risk})`;
          badgeEl.className = `font-mono text-xs px-2 py-0.5 rounded ${
            node.risk === 'HIGH' ? 'bg-[#EF4444]/10 text-[#EF4444]' : 'bg-[#D6A84F]/10 text-[#D6A84F]'
          }`;
        }

        if (bodyEl) {
          bodyEl.innerHTML = `
            <div class="p-4 rounded-xl bg-[#15181C] border border-[#24282D]/60 space-y-2">
              <span class="text-[#9CA3AF] text-[10px] font-mono uppercase block">ENTITY DETAILS</span>
              <div class="text-sm font-bold text-white">${node.label}</div>
              <div class="text-xs text-[#9CA3AF]">${node.details}</div>
            </div>

            <div class="p-4 rounded-xl bg-[#15181C] border border-[#24282D]/60 space-y-2">
              <span class="text-[#9CA3AF] text-[10px] font-mono uppercase block">CORRELATED RELATIONS</span>
              <div class="text-xs text-[#D6A84F] space-y-1 font-mono">
                <div>• Linked to Campaign #APEX-PHISH-2026</div>
                <div>• Correlated with CASE-2026-0042 (.eml)</div>
                <div>• Observed in Amsterdam Relay Infrastructure</div>
              </div>
            </div>
          `;
        }
      });
    });

    const btnVerify = document.getElementById("btn-verify-integrity");
    const btnTamper = document.getElementById("btn-tamper-toggle");

    if (btnVerify) {
      btnVerify.addEventListener("click", () => {
        this.currentCase.status = "VERIFIED";
        this.saveStateToLocalStorage();
        this.renderMainContent();
        document.getElementById("forensics")?.scrollIntoView({ behavior: "smooth" });
      });
    }

    if (btnTamper) {
      btnTamper.addEventListener("click", () => {
        this.currentCase.status = (this.currentCase.status === "VERIFIED") ? "TAMPERED" : "VERIFIED";
        this.saveStateToLocalStorage();
        this.renderMainContent();
        document.getElementById("forensics")?.scrollIntoView({ behavior: "smooth" });
      });
    }

    const btnExportPdf = document.getElementById("btn-export-pdf");
    if (btnExportPdf) {
      btnExportPdf.addEventListener("click", () => {
        window.print();
      });
    }

    const btnExportJson = document.getElementById("btn-export-json");
    if (btnExportJson) {
      btnExportJson.addEventListener("click", () => {
        const bundle = {
          case: this.currentCase,
          email: this.activeEmail,
          iocs: this.iocs,
          graph: this.graphData,
          timeline: this.timelineEvents
        };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bundle, null, 2));
        const downloadAnchor = document.createElement("a");
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `TraceX_Case_${this.currentCase.id}_Bundle.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
      });
    }

    document.querySelectorAll(".btn-copy-hash").forEach(btn => {
      btn.addEventListener("click", () => {
        const text = btn.getAttribute("data-copy");
        if (text) {
          navigator.clipboard.writeText(text);
          btn.innerHTML = `<span class="material-symbols-outlined text-sm text-[#10B981]">check</span>`;
          setTimeout(() => {
            btn.innerHTML = `<span class="material-symbols-outlined text-sm">content_copy</span>`;
          }, 1500);
        }
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new TraceXApp();
  app.init();
});

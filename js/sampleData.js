// TraceX - Sample Cybersecurity Threat & Forensic Data (SIH Evaluator Test Suite)

export const SAMPLE_EMAILS = {
  sbi_clean: {
    id: "sbi_clean",
    fileName: "sbi_branch_operations.eml",
    title: "SBI Customer Advisory",
    riskScore: 5,
    classification: "CLEAN TRANSACTIONAL",
    confidence: "99%",
    sender: "State Bank of India <notifications@communications.sbi.co.in>",
    replyTo: "notifications@communications.sbi.co.in",
    returnPath: "notifications@communications.sbi.co.in",
    messageId: "<sbi-notice-20260927-99120@communications.sbi.co.in>",
    date: "2026-09-27 09:15:00 UTC",
    subject: "SBI Customer Advisory: Branch Operations Notice",
    badge: "SAFE • 05/100",
    badgeClass: "text-[#10B981] border-[#10B981]/30 bg-[#10B981]/10",
    description: "Validates false-positive prevention on signed institutional notices (SPF/DKIM/DMARC Pass).",
    rawContent: `Received: from mail-out-02.sbi.co.in (mail-out-02.sbi.co.in [115.240.236.42])
    by mx.target-enterprise.in (Postfix) with ESMTPS id 4Zb9Kq2M15z8Q
    for <employee@target-enterprise.in>; Sun, 27 Sep 2026 09:15:20 +0530
Authentication-Results: mx.target-enterprise.in;
    spf=pass (mx.target-enterprise.in: domain of notifications@communications.sbi.co.in designates 115.240.236.42 as permitted sender) smtp.mailfrom=notifications@communications.sbi.co.in;
    dkim=pass header.i=@communications.sbi.co.in header.s=sbi2026;
    dmarc=pass (p=REJECT sp=REJECT) header.from=communications.sbi.co.in
From: "State Bank of India" <notifications@communications.sbi.co.in>
To: <employee@target-enterprise.in>
Subject: SBI Customer Advisory: Branch Operations Notice
Date: Sun, 27 Sep 2026 09:15:00 +0530
Message-ID: <sbi-notice-20260927-99120@communications.sbi.co.in>
MIME-Version: 1.0
Content-Type: text/plain; charset="UTF-8"

Dear Customer,

This is an informational broadcast from the State Bank of India. Select administrative branches will remain operational on Sunday, 27 September 2026 for statutory quarterly settlement. Regular banking services remain available via YONO and INB portals.

Warm regards,
State Bank of India`,
    rawHeaders: `Received: from mail-out-02.sbi.co.in (mail-out-02.sbi.co.in [115.240.236.42]) by mx.target-enterprise.in; Sun, 27 Sep 2026 09:15:20 +0530
From: "State Bank of India" <notifications@communications.sbi.co.in>
To: <employee@target-enterprise.in>
Subject: SBI Customer Advisory: Branch Operations Notice
Date: Sun, 27 Sep 2026 09:15:00 +0530
Message-ID: <sbi-notice-20260927-99120@communications.sbi.co.in>
Authentication-Results: mx.target-enterprise.in; spf=pass; dkim=pass; dmarc=pass`,
    body: `Dear Customer,

This is an informational broadcast from the State Bank of India. Select administrative branches will remain operational on Sunday, 27 September 2026 for statutory quarterly settlement. Regular banking services remain available via YONO and INB portals.

Warm regards,
State Bank of India`,
    summary: "Signed public banking notice; no credential harvesting, links, or actionable threats detected.",
    badges: "SPF: PASS | DKIM: PASS | DMARC: PASS",
    authStatus: {
      spf: { status: "VERIFIED", detail: "Pass - Sender IP 115.240.236.42 authorized for sbi.co.in" },
      dkim: { status: "VERIFIED", detail: "Pass - RSA signature verified (@communications.sbi.co.in)" },
      dmarc: { status: "VERIFIED", detail: "Pass - DMARC policy alignment verified" },
      domain: { status: "SAFE", detail: "Legitimate State Bank of India domain (sbi.co.in)" },
      url: { status: "SAFE", detail: "Informational text link pointing to official sbi.co.in portal" },
      socialEng: { status: "SAFE", detail: "Public awareness broadcast notice; zero call-to-action or credential prompts" }
    },
    relayHops: [
      { step: 1, label: "SBI Internal Mailer", node: "SBI Outbound Cluster", ip: "115.240.236.42", country: "India (IN)", asn: "AS4755 TATA Communications", timestamp: "09:15:00 UTC", latency: "0ms", status: "SAFE", detail: "Verified SBI corporate mail relay node." },
      { step: 2, label: "Target MX Ingress", node: "Customer MX Gateway", ip: "198.51.100.42", country: "United States (US)", asn: "AS15169 Google LLC", timestamp: "09:15:20 UTC", latency: "+5ms", status: "SAFE", detail: "Delivered to target inbox." }
    ],
    originGeo: {
      sendingNode: "Mumbai, Maharashtra, India",
      probableOrigin: "SBI IT Centre Belapur Infrastructure",
      route: ["SBI Mailer (115.240.236.42)", "Target MX"],
      confidence: 99,
      disclaimer: "Geolocation represents observed network infrastructure from authenticated headers."
    }
  },

  bec_urgent: {
    id: "bec_urgent",
    fileName: "ceo_urgent_wire_transfer.eml",
    title: "CEO Wire Transfer (BEC)",
    riskScore: 94,
    classification: "CRITICAL THREAT",
    confidence: "96%",
    sender: "Dr. Vikram Sarabhai - Director <ceo-alert@exec-direct-portal.com>",
    replyTo: "executive-wire-transfers@secure-escrow-routing.com",
    returnPath: "bounce-handler@103-attacker-relay.net",
    messageId: "<tx-case-9076-sec-req-884920@exec-direct-portal.com>",
    date: "2026-09-27 15:41:40 UTC",
    subject: "URGENT: Confidential Acquisition Wire Settlement",
    badge: "CRITICAL • 94/100",
    badgeClass: "text-[#EF4444] border-[#EF4444]/30 bg-[#EF4444]/10",
    description: "Tests 4-hop relay extraction, Tor exit node detection (185.220.101.5), and urgency cues.",
    rawContent: `Received: from mx.target-enterprise.in (mx.target-enterprise.in [198.51.100.42])
    by internal-inbox-gateway (Postfix) with ESMTPS id 7Kq11B
    for <cfo@target-enterprise.in>; Sun, 27 Sep 2026 15:42:10 +0000
Received: from mail-relay-04.threat-net.org (mail-relay-04.threat-net.org [185.220.101.5])
    by mx.target-enterprise.in with ESMTPS id 4Zb9Kq2M15z8Q; Sun, 27 Sep 2026 15:42:08 +0000
Received: from anonymizer.proxy-node.ru (HELO vps-node-01.tor-exit.net) (185.220.101.5)
    by mail-relay-04.threat-net.org with ESMTP; Sun, 27 Sep 2026 15:42:01 +0000
Received: from internal-lan-client.local (10.0.4.12)
    by vps-node-01.tor-exit.net with SMTP; Sun, 27 Sep 2026 15:41:50 +0000
Authentication-Results: mx.target-enterprise.in;
    spf=softfail smtp.mailfrom=ceo-alert@exec-direct-portal.com;
    dkim=none;
    dmarc=fail (p=REJECT) header.from=target-enterprise.in
From: "Dr. Vikram Sarabhai - Director" <ceo-alert@exec-direct-portal.com>
Reply-To: executive-wire-transfers@secure-escrow-routing.com
To: <cfo@target-enterprise.in>
Subject: URGENT: Confidential Acquisition Wire Settlement
Date: Sun, 27 Sep 2026 15:41:40 +0000
Message-ID: <tx-case-9076-sec-req-884920@exec-direct-portal.com>
MIME-Version: 1.0
Content-Type: text/plain; charset="UTF-8"

Team, please execute an immediate confidential wire transfer of $84,500 USD for the acquisition closure agreements finalized this morning. Complete the release using the settlement coordinates below and reply with the transfer confirmation slip.

Beneficiary Name: Secure Escrow Holding LLC
Routing Code: #TX-9076-CONFIDENTIAL`,
    rawHeaders: `Received: from mail-relay-04.threat-net.org (185.220.101.5) by mx.target-enterprise.in; Sun, 27 Sep 2026 15:42:08 +0000
From: "Dr. Vikram Sarabhai - Director" <ceo-alert@exec-direct-portal.com>
Reply-To: executive-wire-transfers@secure-escrow-routing.com
To: <cfo@target-enterprise.in>
Subject: URGENT: Confidential Acquisition Wire Settlement
Date: Sun, 27 Sep 2026 15:41:40 +0000
Authentication-Results: mx.target-enterprise.in; spf=softfail; dkim=none; dmarc=fail`,
    body: `Team, please execute an immediate confidential wire transfer of $84,500 USD for the acquisition closure agreements finalized this morning. Complete the release using the settlement coordinates below and reply with the transfer confirmation slip.

Beneficiary Name: Secure Escrow Holding LLC
Routing Code: #TX-9076-CONFIDENTIAL`,
    summary: "Executive impersonation wire transfer scam requesting urgent financial disbursement.",
    badges: "SPF: SOFTFAIL | Tor Exit Node | Anonymized Relay",
    authStatus: {
      spf: { status: "FAILED", detail: "Softfail - IP 185.220.101.5 not authorized in SPF record" },
      dkim: { status: "FAILED", detail: "RSA signature header missing or invalid body hash" },
      dmarc: { status: "FAILED", detail: "DMARC policy rejection - From domain mismatch" },
      domain: { status: "LOOKALIKE", detail: "Typosquatting domain exec-direct-portal.com registered recently" },
      url: { status: "SUSPICIOUS", detail: "Unverified wire transfer payment gateway request" },
      socialEng: { status: "HIGH", detail: "Urgent executive wire transfer, out-of-band communication block, secrecy demand" }
    },
    relayHops: [
      { step: 1, label: "Origin Sending Node", node: "Internal LAN Client", ip: "10.0.4.12", country: "Internal (LAN)", asn: "Private IP", timestamp: "15:41:50 UTC", latency: "0ms", status: "SUSPICIOUS", detail: "Source node broadcasting spoofed headers." },
      { step: 2, label: "Tor Exit Relay", node: "Amsterdam Proxy VPS", ip: "185.220.101.5", country: "Netherlands (NL)", asn: "AS60729 TorExit", timestamp: "15:42:01 UTC", latency: "+11ms", status: "HIGH-RISK", detail: "Anonymizing tunnel node with active threat reputation flags." },
      { step: 3, label: "Threat Net Relay", node: "Threat-Net Mail Relay", ip: "185.220.101.5", country: "Netherlands (NL)", asn: "AS60729 TorExit", timestamp: "15:42:08 UTC", latency: "+7ms", status: "HIGH-RISK", detail: "Rogue mail relay forwarding spoofed payload." },
      { step: 4, label: "Target MX Ingress", node: "Customer MX Gateway", ip: "198.51.100.42", country: "United States (US)", asn: "AS15169 Google LLC", timestamp: "15:42:10 UTC", latency: "+2ms", status: "SAFE", detail: "Quarantined by TraceX Automated Agent." }
    ],
    originGeo: {
      sendingNode: "Amsterdam, Netherlands (TOR/Relay VPS)",
      probableOrigin: "Bulletproof Proxy Hosting Subnet",
      route: ["Tor Exit (185.220.101.5)", "Target MX"],
      confidence: 96,
      disclaimer: "Geolocation represents observed network infrastructure from unauthenticated headers."
    }
  },

  paypal_phish: {
    id: "paypal_phish",
    fileName: "paypal_account_restricted.eml",
    title: "PayPal Credential Phish",
    riskScore: 91,
    classification: "CRITICAL THREAT",
    confidence: "94%",
    sender: "PayPal Security <service@paypal-secure-auth.com>",
    replyTo: "support@paypal-secure-auth.com",
    returnPath: "bounce@paypal-secure-auth.com",
    messageId: "<20260927.120950.4412@paypal-secure-auth.com>",
    date: "2026-09-27 12:09:50 UTC",
    subject: "Action Required: Your PayPal account has been restricted",
    badge: "THREAT • 91/100",
    badgeClass: "text-[#F59E0B] border-[#F59E0B]/30 bg-[#F59E0B]/10",
    description: "Tests link domain mismatch, spoofed Return-Path, and .pdf.exe dropper attachment.",
    rawContent: `Received: from vps-mail-host.hk-relay.net ([103.142.18.99])
    by mx.target-enterprise.in; Sun, 27 Sep 2026 12:10:04 +0000
Authentication-Results: mx.target-enterprise.in;
    spf=fail; dkim=fail; dmarc=fail
From: "PayPal Security" <service@paypal-secure-auth.com>
To: <accounts@target-enterprise.in>
Subject: Action Required: Your PayPal account has been restricted
Date: Sun, 27 Sep 2026 12:09:50 +0000
MIME-Version: 1.0
Content-Type: text/html; charset="UTF-8"

<p>Unauthorized attempt detected. <a href="https://auth-gate.paypa1-secure.com/wire-login">https://www.paypal.com/verify</a></p>
<p>Attached: wire_transfer_invoice_450k.pdf.exe</p>`,
    rawHeaders: `Received: from vps-mail-host.hk-relay.net (103.142.18.99) by mx.target-enterprise.in; Sun, 27 Sep 2026 12:10:04 +0000
From: "PayPal Security" <service@paypal-secure-auth.com>
To: <accounts@target-enterprise.in>
Subject: Action Required: Your PayPal account has been restricted
Date: Sun, 27 Sep 2026 12:09:50 +0000
Authentication-Results: mx.target-enterprise.in; spf=fail; dkim=fail; dmarc=fail`,
    body: `<p>Unauthorized attempt detected. <a href="https://auth-gate.paypa1-secure.com/wire-login">https://www.paypal.com/verify</a></p>
<p>Attached: wire_transfer_invoice_450k.pdf.exe</p>`,
    summary: "Credential phishing attempt with deceptive link mismatch and obfuscated dropper payload.",
    badges: "SPF: FAIL | DKIM: FAIL | DMARC: FAIL",
    authStatus: {
      spf: { status: "FAILED", detail: "SPF Fail - Unauthorized IP 103.142.18.99" },
      dkim: { status: "FAILED", detail: "Invalid DKIM signature for paypal-secure-auth.com" },
      dmarc: { status: "FAILED", detail: "DMARC Policy Rejection" },
      domain: { status: "LOOKALIKE", detail: "Lookalike typosquatting domain paypal-secure-auth.com" },
      url: { status: "SUSPICIOUS", detail: "Link text displays paypal.com but href points to auth-gate.paypa1-secure.com" },
      socialEng: { status: "HIGH", detail: "Account suspension threat, fake security verify link" }
    },
    relayHops: [
      { step: 1, label: "Rogue VPS Mailer", node: "HK Relay VPS", ip: "103.142.18.99", country: "Hong Kong (HK)", asn: "AS133202 FastNet", timestamp: "12:09:50 UTC", latency: "0ms", status: "HIGH-RISK", detail: "Bulletproof host node." },
      { step: 2, label: "Target MX Ingress", node: "Customer MX Gateway", ip: "198.51.100.42", country: "United States (US)", asn: "AS15169 Google LLC", timestamp: "12:10:04 UTC", latency: "+14ms", status: "SAFE", detail: "Quarantined by TraceX." }
    ],
    originGeo: {
      sendingNode: "Hong Kong (Attacker VPS)",
      probableOrigin: "FastNet Subnet",
      route: ["HK Relay (103.142.18.99)", "Target MX"],
      confidence: 94,
      disclaimer: "Geolocation represents observed network infrastructure from unauthenticated headers."
    }
  }
};

export const CURRENT_CASE = {
  id: "CASE-2026-0042",
  title: "High-Risk Email Threat Detected: Executive Impersonation & BEC",
  evidenceId: "EVD-00482",
  sha256: "8f92b7c4a1e9d3f5c2b8a7d6e4f3c2b1a0d9e8f7c6b5a4d3e2f1c0b9a8f7a31c",
  md5: "d41d8cd98f00b204e9800998ecf8427e",
  acquiredAt: "2026-09-01 09:41:03 UTC",
  source: "Uploaded .eml evidence payload",
  fileSize: "42.8 KB",
  fileName: "suspicious_wire_invoice_v2.eml",
  operator: "ANALYST_T3 (UID: 8842)",
  status: "VERIFIED"
};

export const SAMPLE_IOCS = [
  { type: "IP", indicator: "185.220.101.5", intelligence: "Known TOR Exit Node / Bulletproof Proxy", risk: "HIGH", firstSeen: "2026-08-14", lastSeen: "2026-09-01", reputation: "14/100 (Malicious)", associatedDomains: ["paypa1-secure.com", "verify-apex-auth.com"], relatedCases: ["CASE-2026-0042", "CASE-2026-0019"] },
  { type: "IP", indicator: "103.142.18.99", intelligence: "X-Originating Sender IP (Mumbai Subnet)", risk: "HIGH", firstSeen: "2026-08-28", lastSeen: "2026-09-01", reputation: "08/100 (High-Risk Spam Host)", associatedDomains: ["103-attacker-relay.net"], relatedCases: ["CASE-2026-0042"] },
  { type: "Domain", indicator: "paypa1-secure.com", intelligence: "Lookalike Typosquatting Domain", risk: "HIGH", firstSeen: "2026-08-31", lastSeen: "2026-09-01", reputation: "02/100 (Freshly Registered)", associatedDomains: ["auth-gate.paypa1-secure.com"], relatedCases: ["CASE-2026-0042", "CASE-2026-0038"] },
  { type: "URL", indicator: "hxxps://auth-gate.paypa1-secure.com/wire-login", intelligence: "Credential Harvesting / Fake Portal", risk: "HIGH", firstSeen: "2026-09-01", lastSeen: "2026-09-01", reputation: "00/100 (Active Phish)", associatedDomains: ["paypa1-secure.com"], relatedCases: ["CASE-2026-0042"] },
  { type: "Email", indicator: "finance-override@another-domain.com", intelligence: "Impersonation Reply-To Header", risk: "MEDIUM", firstSeen: "2026-09-01", lastSeen: "2026-09-01", reputation: "35/100 (Unverified Domain)", associatedDomains: ["another-domain.com"], relatedCases: ["CASE-2026-0042"] },
  { type: "Attachment", indicator: "wire_transfer_invoice_450k.pdf.exe", intelligence: "Obfuscated Executable Payload (SHA256: 4f1a...)", risk: "HIGH", firstSeen: "2026-09-01", lastSeen: "2026-09-01", reputation: "00/100 (Malware Dropper)", associatedDomains: ["paypa1-secure.com"], relatedCases: ["CASE-2026-0042"] }
];

export const INVESTIGATION_GRAPH_DATA = {
  nodes: [
    { id: "n-email", label: "CASE-2026-0042 (.eml)", type: "Email", risk: "HIGH", color: "#EF4444", details: "Wire Transfer BEC Phish Payload", x: 300, y: 150, size: 20 },
    { id: "n-domain1", label: "paypa1-secure.com", type: "Domain", risk: "HIGH", color: "#EF4444", details: "Lookalike typosquat domain registered Aug 31", x: 140, y: 90, size: 16 },
    { id: "n-domain2", label: "another-domain.com", type: "Domain", risk: "MEDIUM", color: "#F59E0B", details: "Reply-To Destination header", x: 460, y: 90, size: 16 },
    { id: "n-ip1", label: "185.220.101.5", type: "IP", risk: "HIGH", color: "#EF4444", details: "Amsterdam Anonymizing Relay Node", x: 90, y: 230, size: 16 },
    { id: "n-ip2", label: "103.142.18.99", type: "IP", risk: "HIGH", color: "#EF4444", details: "Mumbai Originating Host Subnet", x: 180, y: 330, size: 16 },
    { id: "n-url", label: "auth-gate.paypa1-secure.com", type: "URL", risk: "HIGH", color: "#EF4444", details: "Credential Harvesting Phishing Portal", x: 300, y: 340, size: 16 },
    { id: "n-attach", label: "wire_invoice.pdf.exe", type: "Attachment", risk: "HIGH", color: "#EF4444", details: "Malicious Trojan Payload Dropper", x: 510, y: 230, size: 16 },
    { id: "n-[#campaign]", label: "Campaign #APEX-PHISH-2026", type: "Campaign", risk: "HIGH", color: "#D6A84F", details: "7 Correlated Incidents across 3 Enterprises", x: 440, y: 330, size: 18 }
  ],
  links: [
    { source: "n-email", target: "n-domain1", label: "sent_from" },
    { source: "n-email", target: "n-domain2", label: "reply_to" },
    { source: "n-email", target: "n-attach", label: "contains_payload" },
    { source: "n-domain1", target: "n-ip1", label: "resolves_to" },
    { source: "n-domain1", target: "n-url", label: "hosts_portal" },
    { source: "n-ip1", target: "n-ip2", label: "relayed_from" },
    { source: "n-domain1", target: "n-[#campaign]", label: "linked_to" },
    { source: "n-ip2", target: "n-[#campaign]", label: "associated_with" }
  ]
};

export const TIMELINE_EVENTS = [
  { timestamp: "09:41:03.120", title: "Email Received & Quarantined", severity: "HIGH", description: "Suspicious message intercepted at perimeter edge gateway mx.target-corp.com.", source: "Perimeter Gateway", ip: "198.51.100.42" },
  { timestamp: "09:41:03.850", title: "Cryptographic Evidence Block Sealed", severity: "SAFE", description: "SHA-256 seal calculated and written to browser Web Crypto micro-ledger.", source: "Blockchain Vault", ip: "Local Engine" },
  { timestamp: "09:41:04.012", title: "SPF Authentication Failure", severity: "HIGH", description: "Header check: IP 103.142.18.99 failed SPF alignment for domain paypa1-secure.com.", source: "SPF Engine", ip: "103.142.18.99" },
  { timestamp: "09:41:04.115", title: "DKIM Signature Invalid", severity: "HIGH", description: "RSA public key lookup mismatch. Message body hash verification failed.", source: "DKIM Verifier", ip: "185.220.101.5" },
  { timestamp: "09:41:04.290", title: "DMARC Policy Enforcement Triggered", severity: "HIGH", description: "Policy action: QUARANTINE enforced due to envelope alignment failure.", source: "DMARC Evaluator", ip: "198.51.100.42" },
  { timestamp: "09:41:05.045", title: "Lookalike Domain Typosquatting Flagged", severity: "HIGH", description: "Detected character substitution '1' for 'l' in paypa1-secure.com (Risk: 94/100).", source: "Domain Diagnostics", ip: "paypa1-secure.com" },
  { timestamp: "09:41:06.110", title: "Infrastructure Relay Path Traced", severity: "MED", description: "Routed across 3 hops: Mumbai (103.142.18.99) -> Amsterdam VPN (185.220.101.5).", source: "Header Parser", ip: "185.220.101.5" },
  { timestamp: "09:41:07.450", title: "Campaign Cluster Correlated", severity: "MED", description: "Matched 7 historical cases under Campaign #APEX-PHISH-2026 (Confidence: 93%).", source: "Threat Intel Sync", ip: "185.220.101.5" },
  { timestamp: "09:41:08.000", title: "Forensic Case Dossier Rendered", severity: "SAFE", description: "Automated Case CASE-2026-0042 compiled. Risk score 94/100.", source: "TraceX SOC Core", ip: "127.0.0.1" }
];

export const EVIDENCE_CHAIN_LOGS = [
  { time: "2026-09-01 09:41:03 UTC", action: "Evidence Acquired", operator: "SECURE_PORTAL_INGEST", detail: "File uploaded to forensic vault via automated ingress pipeline." },
  { time: "2026-09-01 09:41:03 UTC", action: "SHA-256 & MD5 Sealed", operator: "CRYPTO_VAULT_AGENT", detail: "Hashes computed: 8f92...a31c. Write-once immutability lock engaged." },
  { time: "2026-09-01 09:41:04 UTC", action: "Header & Routing Analysis", operator: "TRACE_PARSER_V2", detail: "Headers extracted in read-only sandbox. Zero payload modifications." },
  { time: "2026-09-01 09:41:07 UTC", action: "Threat Intel Enrichment", operator: "INTEL_FEED_SYNC", detail: "Correlated against global threat telemetry databases." }
];

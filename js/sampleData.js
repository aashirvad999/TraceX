// TraceX - Sample Cybersecurity Threat & Forensic Data

export const SAMPLE_EMAILS = [
  {
    id: "sample-bec-01",
    title: "BEC Financial Fraud - Executive Impersonation",
    riskScore: 94,
    classification: "BUSINESS EMAIL COMPROMISE",
    confidence: "91%",
    sender: "CEO <ceo@paypa1-secure.com>",
    replyTo: "finance-override@another-domain.com",
    returnPath: "bounce-handler@103-attacker-relay.net",
    messageId: "<20260901.094103.8892@paypa1-secure.com>",
    date: "2026-09-01 09:41:03 UTC",
    subject: "URGENT: Confidential Acquisition Wire Transfer Authorization ($450,000)",
    rawHeaders: `Received: from mail-relay.fake-isp.com (103.142.18.99) by mx.target-corp.com with ESMTPS; Tue, 01 Sep 2026 09:41:03 +0000
Received: from amsterdam-node.shadow-net.io (185.220.101.5) by mail-relay.fake-isp.com; Tue, 01 Sep 2026 09:40:58 +0000
From: CEO <ceo@paypa1-secure.com>
To: CFO <cfo@target-corp.com>
Reply-To: finance-override@another-domain.com
Subject: URGENT: Confidential Acquisition Wire Transfer Authorization ($450,000)
Date: Tue, 01 Sep 2026 09:41:03 +0000
Message-ID: <20260901.094103.8892@paypa1-secure.com>
Authentication-Results: mx.target-corp.com; spf=fail (sender 103.142.18.99 not in spf record); dkim=fail (signature verification failed); dmarc=fail (p=reject action=quarantine)
X-Originating-IP: 103.142.18.99
X-Mailer: Microsoft Outlook 16.0`,
    body: `Team,

I am currently in an offsite executive board meeting regarding an active M&A transaction. 
We need to immediately release an initial earnest deposit of $450,000.00 USD to escrow agent accounts today to finalize the contract before 12:00 PM EST.

Please review the attached invoice PDF and process the wire transfer to the following updated routing coordinates immediately:
Beneficiary Bank: Offshore Apex Commercial Bank
Routing No: 021000021 / Account: 8849-201-9924-X

Do not discuss this via phone as the deal remains strictly under NDA. Confirm via reply once initiated.

Best regards,
Chief Executive Officer`,
    authStatus: {
      spf: { status: "FAILED", detail: "IP 103.142.18.99 not authorized in SPF record for paypa1-secure.com" },
      dkim: { status: "FAILED", detail: "RSA signature header missing or invalid body hash" },
      dmarc: { status: "FAILED", detail: "Alignment failure (p=reject). Envelope From domain mismatch" },
      domain: { status: "LOOKALIKE", detail: "Character typo-squatting detected: 'paypa1-secure.com' vs 'paypal.com'" },
      url: { status: "SUSPICIOUS", detail: "Obfuscated payload link pointing to hxxps://auth-gate.paypa1-secure.com/wire-login" },
      socialEng: { status: "HIGH", detail: "Urgency signals, authority pressure, financial wire demand, out-of-band communication request" }
    },
    relayHops: [
      { step: 1, label: "Origin Sending Node", node: "Mumbai Attacker Subnet", ip: "103.142.18.99", country: "India (IN)", asn: "AS133202 FastNet", timestamp: "09:40:51 UTC", latency: "0ms", status: "SUSPICIOUS", detail: "X-Originating-IP source node. Known bulletproof VPN endpoint." },
      { step: 2, label: "Intermediate Relay", node: "Amsterdam VPN Node", ip: "185.220.101.5", country: "Netherlands (NL)", asn: "AS60729 TorExit", timestamp: "09:40:58 UTC", latency: "+7ms", status: "HIGH-RISK", detail: "Anonymizing tunnel node with active threat reputation flags." },
      { step: 3, label: "Inbound Mail Provider", node: "US Edge Provider Gateway", ip: "198.51.100.42", country: "United States (US)", asn: "AS15169 Google LLC", timestamp: "09:41:01 UTC", latency: "+3ms", status: "NORMAL", detail: "Standard customer edge mail gateway ingress." },
      { step: 4, label: "Target Recipient", node: "Target Corp Internal MX", ip: "10.0.4.15", country: "Internal Corporate SOC", asn: "Internal Network", timestamp: "09:41:03 UTC", latency: "+2ms", status: "SAFE", detail: "Quarantined by TraceX Automated Ingest Agent." }
    ],
    originGeo: {
      sendingNode: "Mumbai, MH, India",
      probableOrigin: "Amsterdam, Netherlands (TOR/Relay VPN)",
      route: ["Mumbai (103.142.18.99)", "Amsterdam (185.220.101.5)", "US Mail Gateway (198.51.100.42)", "Target MX"],
      confidence: 73,
      disclaimer: "Geolocation represents observed network infrastructure and may not represent the attacker's physical location."
    }
  },

  {
    id: "sample-phish-02",
    title: "Credential Harvesting Phishing - Office 365 Password Reset",
    riskScore: 88,
    classification: "CREDENTIAL HARVESTING",
    confidence: "89%",
    sender: "Microsoft Security <no-reply@account-verify-login.com>",
    replyTo: "harvest@account-verify-login.com",
    returnPath: "bounce@account-verify-login.com",
    messageId: "<20260901.081200.4410@account-verify-login.com>",
    date: "2026-09-01 08:12:00 UTC",
    subject: "ACTION REQUIRED: Your Office 365 Password Expires in 2 Hours",
    rawHeaders: `Received: from relay-phish.net (192.241.200.12) by mx.target-corp.com; Tue, 01 Sep 2026 08:12:00 +0000
From: Microsoft Security <no-reply@account-verify-login.com>
To: User <employee@target-corp.com>
Authentication-Results: mx.target-corp.com; spf=softfail; dkim=neutral; dmarc=fail`,
    body: `Your corporate Microsoft 365 password is set to expire today. Click below to keep your current password:
hxxps://login-office365-verify.com/token=884910294812`,
    authStatus: {
      spf: { status: "FAILED", detail: "Softfail authentication result" },
      dkim: { status: "FAILED", detail: "Neutral / Unsigned payload" },
      dmarc: { status: "FAILED", detail: "Domain spoofing detected" },
      domain: { status: "LOOKALIKE", detail: "Domain registered 4 hours ago" },
      url: { status: "SUSPICIOUS", detail: "Credential harvesting portal detected" },
      socialEng: { status: "MEDIUM", detail: "Standard corporate password expiry trap" }
    },
    relayHops: [
      { step: 1, label: "Sending Host", node: "Cloud VPS Provider", ip: "192.241.200.12", country: "Germany (DE)", asn: "AS203020 HostDigital", timestamp: "08:11:55 UTC", latency: "0ms", status: "SUSPICIOUS", detail: "Newly provisioned VPS node." },
      { step: 2, label: "Inbound MX", node: "Target MX", ip: "10.0.4.15", country: "Internal", asn: "Internal", timestamp: "08:12:00 UTC", latency: "+5ms", status: "SAFE", detail: "Delivered to sandbox." }
    ],
    originGeo: {
      sendingNode: "Frankfurt, Germany",
      probableOrigin: "Frankfurt Cloud VPS Subnet",
      route: ["Frankfurt (192.241.200.12)", "Target MX"],
      confidence: 84,
      disclaimer: "Geolocation represents observed network infrastructure and may not represent the attacker's physical location."
    }
  },

  {
    id: "sample-clean-03",
    title: "Clean Corporate Email - IT Support Ticket #9810",
    riskScore: 6,
    classification: "LEGITIMATE COMMUNICATION",
    confidence: "99%",
    sender: "IT Support <support@target-corp.com>",
    replyTo: "support@target-corp.com",
    returnPath: "support-bounce@target-corp.com",
    messageId: "<20260901.070000.1102@target-corp.com>",
    date: "2026-09-01 07:00:00 UTC",
    subject: "Ticket #9810: Scheduled System Maintenance Tonight",
    rawHeaders: `Received: from internal-smtp.target-corp.com (10.0.1.50) by mx.target-corp.com; Tue, 01 Sep 2026 07:00:00 +0000
Authentication-Results: mx.target-corp.com; spf=pass; dkim=pass; dmarc=pass`,
    body: `Hello Team, Please be advised that routine server maintenance is scheduled for tonight at 23:00 UTC.`,
    authStatus: {
      spf: { status: "VERIFIED", detail: "Pass - IP 10.0.1.50 authorized" },
      dkim: { status: "VERIFIED", detail: "Pass - Valid 2048-bit RSA signature" },
      dmarc: { status: "VERIFIED", detail: "Pass - Perfect domain alignment" },
      domain: { status: "SAFE", detail: "Internal trusted corporate domain" },
      url: { status: "SAFE", detail: "No suspicious external links found" },
      socialEng: { status: "SAFE", detail: "Standard internal IT maintenance notification" }
    },
    relayHops: [
      { step: 1, label: "Internal SMTP", node: "Corporate Mail Server", ip: "10.0.1.50", country: "United States (US)", asn: "Internal Corporate Network", timestamp: "07:00:00 UTC", latency: "0ms", status: "SAFE", detail: "Verified internal exchange server." }
    ],
    originGeo: {
      sendingNode: "Dallas, TX, USA",
      probableOrigin: "Corporate Internal Infrastructure",
      route: ["Internal Exchange (10.0.1.50)", "Target MX"],
      confidence: 99,
      disclaimer: "Geolocation represents observed network infrastructure and may not represent the attacker's physical location."
    }
  }
];

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
    { id: "n-email", label: "CASE-2026-0042 (.eml)", type: "Email", risk: "HIGH", color: "#ffb4ab", details: "Wire Transfer BEC Phish" },
    { id: "n-domain1", label: "paypa1-secure.com", type: "Domain", risk: "HIGH", color: "#ffb4ab", details: "Lookalike registered Aug 31" },
    { id: "n-domain2", label: "another-domain.com", type: "Domain", risk: "MEDIUM", color: "#ffb74d", details: "Reply-To Destination" },
    { id: "n-ip1", label: "185.220.101.5", type: "IP", risk: "HIGH", color: "#ffb4ab", details: "Amsterdam Relay Node" },
    { id: "n-ip2", label: "103.142.18.99", type: "IP", risk: "HIGH", color: "#ffb4ab", details: "Mumbai Originating Host" },
    { id: "n-url", label: "auth-gate.paypa1-secure.com", type: "URL", risk: "HIGH", color: "#ffb4ab", details: "Phishing Landing Portal" },
    { id: "n-attach", label: "wire_invoice.pdf.exe", type: "Attachment", risk: "HIGH", color: "#ffb4ab", details: "Malicious Trojan Dropper" },
    { id: "n-[#campaign]", label: "Campaign #APEX-PHISH-2026", type: "Campaign", risk: "HIGH", color: "#64d2ff", details: "7 Correlated Incidents across 3 Enterprises" }
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
  { time: "09:41:03.120", event: "Email Received & Quarantined", status: "INGEST", detail: "Suspicious message intercepted at perimeter edge gateway mx.target-corp.com." },
  { time: "09:41:03.850", event: "Cryptographic Evidence Sealed", status: "PRESERVE", detail: "SHA-256 (8f92b7c4...) & MD5 hashes calculated and written to immutable ledger." },
  { time: "09:41:04.012", event: "SPF Authentication Failure", status: "AUTH_FAIL", detail: "Header check: IP 103.142.18.99 failed SPF alignment for domain paypa1-secure.com." },
  { time: "09:41:04.115", event: "DKIM Signature Invalid", status: "AUTH_FAIL", detail: "RSA public key lookup mismatch. Message body hash verification failed." },
  { time: "09:41:04.290", event: "DMARC Policy Enforcement Triggered", status: "POLICY", detail: "Policy action: QUARANTINE enforced due to envelope alignment failure." },
  { time: "09:41:05.045", event: "Lookalike Domain Typosquatting Flagged", status: "THREAT", detail: "Detected character substitution '1' for 'l' in paypa1-secure.com (Score: 94/100)." },
  { time: "09:41:06.110", event: "Infrastructure Relay Path Traced", status: "TRACE", detail: "Routed across 4 hops: Mumbai (103.142.18.99) -> Amsterdam VPN (185.220.101.5)." },
  { time: "09:41:07.450", event: "Campaign Correlation Identified", status: "CORRELATE", detail: "Matched 7 historical cases under Campaign #APEX-PHISH-2026 (Confidence: 86%)." },
  { time: "09:41:08.000", event: "Forensic Case Created & Report Rendered", status: "CASE", detail: "Automated Case CASE-2026-0042 compiled. Risk score 94/100." }
];

export const EVIDENCE_CHAIN_LOGS = [
  { time: "2026-09-01 09:41:03 UTC", action: "Evidence Acquired", operator: "SECURE_PORTAL_INGEST", detail: "File uploaded to forensic vault via automated ingress pipeline." },
  { time: "2026-09-01 09:41:03 UTC", action: "SHA-256 & MD5 Sealed", operator: "CRYPTO_VAULT_AGENT", detail: "Hashes computed: 8f92...a31c. Write-once immutability lock engaged." },
  { time: "2026-09-01 09:41:04 UTC", action: "Header & Routing Analysis", operator: "TRACE_PARSER_V2", detail: "Headers extracted in read-only sandbox. Zero payload modifications." },
  { time: "2026-09-01 09:41:07 UTC", action: "Threat Intel Enrichment", operator: "INTEL_FEED_SYNC", detail: "Correlated against global threat telemetry databases." },
  { time: "2026-09-01 09:41:08 UTC", action: "Forensic Report Generated", operator: "ANALYST_T3 (UID: 8842)", detail: "Comprehensive investigation report generated and signed." }
];

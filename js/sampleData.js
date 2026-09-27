// TraceX - Sample Cybersecurity Threat & Forensic Data

export const SAMPLE_EMAILS = [
  {
    id: "spotify-login-01",
    fileName: "spotify_security_alert.eml",
    title: "Spotify Security Alert - New Device Login Notice",
    riskScore: 8,
    classification: "CLEAN TRANSACTIONAL",
    confidence: "99%",
    sender: "Spotify Security <no-reply@spotify.com>",
    replyTo: "no-reply@spotify.com",
    returnPath: "bounce@spotify.com",
    messageId: "<20260927.104211.8821@spotify.com>",
    date: "2026-09-27 10:42:11 UTC",
    subject: "New login to Spotify from Chrome on Windows",
    rawHeaders: `Received: from mail-relay.spotify.com (198.22.240.12) by mx.target-corp.com with ESMTPS; Sun, 27 Sep 2026 10:42:11 +0000
From: Spotify Security <no-reply@spotify.com>
To: User <user@target-corp.com>
Reply-To: no-reply@spotify.com
Return-Path: bounce@spotify.com
Subject: New login to Spotify from Chrome on Windows
Date: Sun, 27 Sep 2026 10:42:11 +0000
Message-ID: <20260927.104211.8821@spotify.com>
Authentication-Results: mx.target-corp.com; spf=pass (sender 198.22.240.12 verified); dkim=pass (header.i=@spotify.com); dmarc=pass (p=reject)
Received-SPF: pass (spotify.com: domain of bounce@spotify.com designates 198.22.240.12 as permitted sender)
DKIM-Signature: v=1; a=rsa-sha256; d=spotify.com; s=s1; c=relaxed/relaxed;`,
    body: `Hi User,

We noticed a new login to your Spotify account from Chrome on Windows.

Location: Mumbai, India
IP Address: 103.22.14.8
Time: September 27, 2026 10:42 UTC

If this was you, no action is needed. If you did not perform this login, please secure your account immediately at https://accounts.spotify.com/account/overview.

Thank you,
The Spotify Security Team`,
    summary: "Authentic automated device login notification from verified Spotify infrastructure.",
    badges: "SPF: PASS | DKIM: PASS (spotify.com) | DMARC: PASS",
    authStatus: {
      spf: { status: "VERIFIED", detail: "Pass - Sender IP 198.22.240.12 verified in SPF record for spotify.com" },
      dkim: { status: "VERIFIED", detail: "Pass - Cryptographic RSA signature verified (@spotify.com)" },
      dmarc: { status: "VERIFIED", detail: "Pass - Strict DMARC domain alignment verified" },
      domain: { status: "SAFE", detail: "Official verified Spotify domain" },
      url: { status: "SAFE", detail: "All embedded links point strictly to official *.spotify.com endpoints" },
      socialEng: { status: "SAFE", detail: "Standard automated security login notification; zero credential trap" }
    },
    relayHops: [
      { step: 1, label: "Spotify Edge Mailer", node: "Spotify Authorized Relay", ip: "198.22.240.12", country: "Sweden (SE)", asn: "AS8403 Spotify AB", timestamp: "10:42:08 UTC", latency: "0ms", status: "SAFE", detail: "Verified Spotify outbound mail infrastructure." },
      { step: 2, label: "Target Customer Gateway", node: "Target MX Ingress", ip: "198.51.100.42", country: "United States (US)", asn: "AS15169 Google LLC", timestamp: "10:42:11 UTC", latency: "+3ms", status: "SAFE", detail: "Authenticated edge mail gateway ingress." }
    ],
    originGeo: {
      sendingNode: "Stockholm, Sweden (Spotify Infrastructure)",
      probableOrigin: "Spotify Production Mail Cluster",
      route: ["Spotify Relay (198.22.240.12)", "Target MX"],
      confidence: 99,
      disclaimer: "Geolocation represents observed network infrastructure from authenticated headers."
    }
  },

  {
    id: "sbi-advisory-02",
    fileName: "sbi_customer_advisory.eml",
    title: "SBI Advisory - Branch Timings & Holiday Notice",
    riskScore: 5,
    classification: "CLEAN INFORMATIONAL",
    confidence: "99%",
    sender: "State Bank of India <circulars@sbi.co.in>",
    replyTo: "circulars@sbi.co.in",
    returnPath: "notice-bounce@sbi.co.in",
    messageId: "<20260927.081500.3341@sbi.co.in>",
    date: "2026-09-27 08:15:00 UTC",
    subject: "Official Advisory: Revised Branch Banking Hours for Upcoming National Holidays",
    rawHeaders: `Received: from mail-out.sbi.co.in (121.240.54.18) by mx.target-corp.com with ESMTPS; Sun, 27 Sep 2026 08:15:00 +0000
From: State Bank of India <circulars@sbi.co.in>
To: Valued Customer <customer@target-corp.com>
Reply-To: circulars@sbi.co.in
Return-Path: notice-bounce@sbi.co.in
Subject: Official Advisory: Revised Branch Banking Hours for Upcoming National Holidays
Date: Sun, 27 Sep 2026 08:15:00 +0000
Message-ID: <20260927.081500.3341@sbi.co.in>
Authentication-Results: mx.target-corp.com; spf=pass (sender 121.240.54.18 verified); dkim=pass (header.i=@sbi.co.in); dmarc=pass (p=reject)
Received-SPF: pass (sbi.co.in: domain of notice-bounce@sbi.co.in designates 121.240.54.18 as permitted sender)
DKIM-Signature: v=1; a=rsa-sha256; d=sbi.co.in; s=k1; c=relaxed/relaxed;`,
    body: `Dear Customer,

Please be informed about the revised branch operating hours during the upcoming national holiday schedule.

1. All branches will remain closed on October 2nd.
2. Digital banking services (YONO, INB, ATMs) will remain operational 24/7.

SECURITY ADVISORY: State Bank of India NEVER asks for PIN, OTP, CVV, or passwords over email or SMS. Please visit https://sbi.co.in for official updates.

Issued in public interest by State Bank of India.`,
    summary: "Signed public banking notice; no credential harvesting, links, or actionable threats detected.",
    badges: "SPF: PASS | DKIM: PASS (sbi.co.in) | DMARC: PASS",
    authStatus: {
      spf: { status: "VERIFIED", detail: "Pass - Sender IP 121.240.54.18 authorized for sbi.co.in" },
      dkim: { status: "VERIFIED", detail: "Pass - RSA signature verified (@sbi.co.in)" },
      dmarc: { status: "VERIFIED", detail: "Pass - DMARC policy alignment verified" },
      domain: { status: "SAFE", detail: "Legitimate State Bank of India domain (sbi.co.in)" },
      url: { status: "SAFE", detail: "Informational text link pointing to official sbi.co.in website" },
      socialEng: { status: "SAFE", detail: "Public awareness broadcast notice; zero call-to-action or credential prompts" }
    },
    relayHops: [
      { step: 1, label: "SBI Internal Mailer", node: "SBI Outbound Cluster", ip: "121.240.54.18", country: "India (IN)", asn: "AS4755 TATA Communications", timestamp: "08:14:55 UTC", latency: "0ms", status: "SAFE", detail: "Verified SBI corporate mail relay node." },
      { step: 2, label: "Target MX Ingress", node: "Customer MX Gateway", ip: "198.51.100.42", country: "United States (US)", asn: "AS15169 Google LLC", timestamp: "08:15:00 UTC", latency: "+5ms", status: "SAFE", detail: "Delivered to target inbox." }
    ],
    originGeo: {
      sendingNode: "Mumbai, Maharashtra, India",
      probableOrigin: "SBI IT Centre Belapur Infrastructure",
      route: ["SBI Mailer (121.240.54.18)", "Target MX"],
      confidence: 99,
      disclaimer: "Geolocation represents observed network infrastructure from authenticated headers."
    }
  },

  {
    id: "sbi-kyc-phish-03",
    fileName: "sbi_urgent_kyc_update.eml",
    title: "Malicious Phishing - Deceptive SBI Account Suspension",
    riskScore: 94,
    classification: "CRITICAL THREAT",
    confidence: "96%",
    sender: "State Bank of India <notice@sbi.co.in>",
    replyTo: "kyc-verification@attacker-phish.net",
    returnPath: "bounce@attacker-phish.net",
    messageId: "<20260927.110000.9912@attacker-phish.net>",
    date: "2026-09-27 11:00:00 UTC",
    subject: "URGENT: Your SBI Account Will Be Blocked Within 24 Hours - KYC Update",
    rawHeaders: `Received: from phish-relay.fake-host.io (185.220.101.5) by mx.target-corp.com; Sun, 27 Sep 2026 11:00:00 +0000
From: State Bank of India <notice@sbi.co.in>
To: Customer <victim@target-corp.com>
Reply-To: kyc-verification@attacker-phish.net
Return-Path: bounce@attacker-phish.net
Subject: URGENT: Your SBI Account Will Be Blocked Within 24 Hours - KYC Update
Date: Sun, 27 Sep 2026 11:00:00 +0000
Message-ID: <20260927.110000.9912@attacker-phish.net>
Authentication-Results: mx.target-corp.com; spf=fail (sender 185.220.101.5 not authorized); dkim=fail (signature missing); dmarc=fail (p=reject)
Received-SPF: fail (sbi.co.in: IP 185.220.101.5 is not permitted)`,
    body: `Dear SBI Customer,

Your State Bank of India account has been flagged for missing Mandatory KYC (Know Your Customer) compliance.

Failure to complete KYC verification within 24 hours will result in permanent debit freezing of your account and net banking access.

Please click the secure link below to update your PAN and Aadhaar details immediately:
http://185.220.101.5/sbi-verify-kyc

State Bank of India Online Security Division`,
    summary: "Deceptive banking phishing attempt with spoofed SBI headers and external credential harvesting link.",
    badges: "SPF: FAIL | DKIM: NONE | DMARC: FAIL",
    authStatus: {
      spf: { status: "FAILED", detail: "SPF Fail - Unauthorized IP 185.220.101.5 spoofing sbi.co.in" },
      dkim: { status: "FAILED", detail: "Missing cryptographic DKIM RSA signature header" },
      dmarc: { status: "FAILED", detail: "DMARC Alignment Fail - From domain sbi.co.in mismatched with Return-Path" },
      domain: { status: "SPOOFED", detail: "Header spoofing of trusted domain sbi.co.in from rogue sender" },
      url: { status: "SUSPICIOUS", detail: "Deceptive link mismatch: text displays sbi.co.in but points to malicious IP 185.220.101.5" },
      socialEng: { status: "HIGH", detail: "High-urgency fear tactic, threat of account suspension, credential harvesting link" }
    },
    relayHops: [
      { step: 1, label: "Rogue VPS Relay", node: "Malicious Bulletproof Host", ip: "185.220.101.5", country: "Netherlands (NL)", asn: "AS60729 TorExit/Proxy", timestamp: "10:59:55 UTC", latency: "0ms", status: "HIGH-RISK", detail: "Known malicious IP host broadcasting spoofed headers." },
      { step: 2, label: "Target MX Ingress", node: "Customer MX Gateway", ip: "198.51.100.42", country: "United States (US)", asn: "AS15169 Google LLC", timestamp: "11:00:00 UTC", latency: "+5ms", status: "SAFE", detail: "Intercepted by TraceX Automated Agent." }
    ],
    originGeo: {
      sendingNode: "Amsterdam, Netherlands (Attacker Relay VPS)",
      probableOrigin: "Bulletproof Proxy Hosting Subnet",
      route: ["Attacker IP (185.220.101.5)", "Target MX"],
      confidence: 88,
      disclaimer: "Geolocation represents observed network infrastructure from unauthenticated headers."
    }
  },

  {
    id: "ceo-wire-bec-04",
    fileName: "ceo_wire_transfer_bec.eml",
    title: "BEC Financial Fraud - Executive Wire Transfer Authorization",
    riskScore: 91,
    classification: "CRITICAL THREAT",
    confidence: "93%",
    sender: "Chief Executive Officer <ceo@paypa1-secure.com>",
    replyTo: "finance-override@another-domain.com",
    returnPath: "bounce-handler@103-attacker-relay.net",
    messageId: "<20260927.094103.8892@paypa1-secure.com>",
    date: "2026-09-27 09:41:03 UTC",
    subject: "URGENT: Confidential Acquisition Wire Transfer Authorization ($450,000)",
    rawHeaders: `Received: from mail-relay.fake-isp.com (103.142.18.99) by mx.target-corp.com with ESMTPS; Sun, 27 Sep 2026 09:41:03 +0000
Received: from amsterdam-node.shadow-net.io (185.220.101.5) by mail-relay.fake-isp.com; Sun, 27 Sep 2026 09:40:58 +0000
From: Chief Executive Officer <ceo@paypa1-secure.com>
To: CFO <cfo@target-corp.com>
Reply-To: finance-override@another-domain.com
Subject: URGENT: Confidential Acquisition Wire Transfer Authorization ($450,000)
Date: Sun, 27 Sep 2026 09:41:03 +0000
Message-ID: <20260927.094103.8892@paypa1-secure.com>
Authentication-Results: mx.target-corp.com; spf=softfail (sender 103.142.18.99 not in spf record); dkim=fail (signature invalid); dmarc=fail (p=reject)
X-Originating-IP: 103.142.18.99`,
    body: `Team,

I am currently in an offsite executive board meeting regarding an active M&A acquisition transaction. 
We need to immediately release an initial earnest deposit of $450,000.00 USD to escrow agent accounts today to finalize the contract before 12:00 PM EST.

Please review the wire transfer coordinates immediately:
Beneficiary Bank: Offshore Apex Commercial Bank
Routing No: 021000021 / Account: 8849-201-9924-X

Do not discuss this via phone as the deal remains strictly under NDA. Confirm via reply once initiated.

Best regards,
Chief Executive Officer`,
    summary: "Executive impersonation wire transfer scam requesting urgent financial disbursement.",
    badges: "SPF: SOFTFAIL | Display-Name Spoof | Anonymized Relay",
    authStatus: {
      spf: { status: "FAILED", detail: "Softfail - IP 103.142.18.99 not authorized in SPF record for paypa1-secure.com" },
      dkim: { status: "FAILED", detail: "RSA signature header missing or invalid body hash" },
      dmarc: { status: "FAILED", detail: "DMARC policy rejection - From domain paypa1-secure.com mismatch" },
      domain: { status: "LOOKALIKE", detail: "Typosquatting domain paypa1-secure.com registered recently" },
      url: { status: "SUSPICIOUS", detail: "Unverified wire transfer payment gateway request" },
      socialEng: { status: "HIGH", detail: "Urgent executive wire transfer, out-of-band communication block, secrecy demand" }
    },
    relayHops: [
      { step: 1, label: "Origin Sending Node", node: "Mumbai Attacker Subnet", ip: "103.142.18.99", country: "India (IN)", asn: "AS133202 FastNet", timestamp: "09:40:51 UTC", latency: "0ms", status: "SUSPICIOUS", detail: "X-Originating-IP source node. Known bulletproof VPN endpoint." },
      { step: 2, label: "Intermediate Relay", node: "Amsterdam VPN Node", ip: "185.220.101.5", country: "Netherlands (NL)", asn: "AS60729 TorExit", timestamp: "09:40:58 UTC", latency: "+7ms", status: "HIGH-RISK", detail: "Anonymizing tunnel node with active threat reputation flags." },
      { step: 3, label: "Target MX Ingress", node: "Customer MX Gateway", ip: "198.51.100.42", country: "United States (US)", asn: "AS15169 Google LLC", timestamp: "09:41:03 UTC", latency: "+5ms", status: "SAFE", detail: "Quarantined by TraceX Automated Agent." }
    ],
    originGeo: {
      sendingNode: "Mumbai, MH, India",
      probableOrigin: "Amsterdam, Netherlands (TOR/Relay VPN)",
      route: ["Mumbai (103.142.18.99)", "Amsterdam (185.220.101.5)", "Target MX"],
      confidence: 73,
      disclaimer: "Geolocation represents observed network infrastructure from unauthenticated headers."
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

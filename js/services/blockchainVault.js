// TraceX - Client-Side Cryptographic Blockchain Vault & Chain-of-Custody Ledger
// Built for SIH26106 (Blockchain & Cybersecurity Track) using Web Crypto API

/**
 * Native SHA-256 calculation using browser Web Crypto API
 * @param {string} text - Payload or metadata string to hash
 * @returns {Promise<string>} 64-character hexadecimal SHA-256 string
 */
export async function computeSHA256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text || '');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Retrieves the cryptographic evidence ledger array from localStorage
 * @returns {Array} Array of evidence blocks
 */
export function getLedger() {
  try {
    const raw = localStorage.getItem('tracex_ledger');
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("TraceX Blockchain Vault: Error reading ledger from localStorage:", err);
  }
  return [];
}

/**
 * Persists the cryptographic evidence ledger to localStorage
 * @param {Array} ledger - Array of evidence blocks
 */
export function saveLedger(ledger) {
  try {
    localStorage.setItem('tracex_ledger', JSON.stringify(ledger));
  } catch (err) {
    console.warn("TraceX Blockchain Vault: Error saving ledger to localStorage:", err);
  }
}

/**
 * Creates an immutable, tamper-evident cryptographic block for ingested evidence
 * @param {string} caseId - Case identifier (e.g. CASE-2026-0042)
 * @param {string} rawEmlContent - Raw EML content or header snippet
 * @param {string} analysisSummary - Brief threat analysis summary
 * @returns {Promise<Object>} Created block object
 */
export async function createEvidenceBlock(caseId, rawEmlContent = '', analysisSummary = '') {
  const ledger = getLedger();
  const prevBlock = ledger.length > 0 ? ledger[ledger.length - 1] : null;
  const prevHash = prevBlock 
    ? prevBlock.currentHash 
    : "0000000000000000000000000000000000000000000000000000000000000000";
  
  const timestamp = new Date().toISOString();
  const payloadToHash = `${rawEmlContent}|${timestamp}|${prevHash}|${caseId}`;
  const currentHash = await computeSHA256(payloadToHash);

  const block = {
    blockHeight: ledger.length + 1,
    caseId,
    timestamp,
    prevHash,
    currentHash,
    payloadSnippet: typeof rawEmlContent === 'string' ? rawEmlContent.slice(0, 120) : '',
    rawEmlContent: rawEmlContent,
    summary: analysisSummary || "Ingested EML Evidence Payload",
    status: 'ANCHORED_IMMUTABLE'
  };

  ledger.push(block);
  saveLedger(ledger);
  return block;
}

/**
 * Seeds initial demo blocks if localStorage ledger is currently empty
 */
export async function seedInitialGenesisBlock() {
  const ledger = getLedger();
  if (ledger.length === 0) {
    const genesisEml = `From: Chief Executive Officer <ceo@paypa1-secure.com>\nTo: CFO <cfo@target-corp.com>\nSubject: URGENT: Confidential Acquisition Wire Transfer Authorization ($450,000)\nDate: Sun, 27 Sep 2026 09:41:03 +0000\nMessage-ID: <20260927.094103.8892@paypa1-secure.com>\n\nTeam,\nPlease review the wire transfer coordinates immediately...`;
    await createEvidenceBlock(
      'CASE-2026-0042', 
      genesisEml, 
      'Genesis Evidence Block: Executive Impersonation & BEC Phish'
    );
  }
}

/**
 * Verifies the entire cryptographic ledger chain of custody
 * @param {Array|null} ledger - Optional ledger array to verify
 * @returns {Promise<Object>} Verification results with isValid status and reason
 */
export async function verifyLedgerIntegrity(ledger = null) {
  const targetLedger = ledger || getLedger();
  if (!targetLedger || targetLedger.length === 0) {
    return {
      isValid: true,
      brokenBlockIndex: -1,
      totalBlocks: 0,
      details: "Ledger is empty."
    };
  }

  for (let i = 0; i < targetLedger.length; i++) {
    const block = targetLedger[i];
    const expectedPrevHash = (i === 0)
      ? "0000000000000000000000000000000000000000000000000000000000000000"
      : targetLedger[i - 1].currentHash;

    // Check link integrity between blocks
    if (block.prevHash !== expectedPrevHash) {
      return {
        isValid: false,
        brokenBlockIndex: i,
        blockHeight: block.blockHeight,
        reason: `Previous hash linkage broken at Block #${block.blockHeight} (Case ${block.caseId}). Expected: ${expectedPrevHash.slice(0, 16)}..., Found: ${block.prevHash.slice(0, 16)}...`,
        totalBlocks: targetLedger.length
      };
    }

    // Recompute payload hash to verify zero tamper
    const payloadText = block.rawEmlContent || block.payloadSnippet || "";
    const payloadToHash = `${payloadText}|${block.timestamp}|${block.prevHash}|${block.caseId}`;
    const recomputedHash = await computeSHA256(payloadToHash);

    if (block.isTampered || block.currentHash !== recomputedHash) {
      return {
        isValid: false,
        brokenBlockIndex: i,
        blockHeight: block.blockHeight,
        reason: `Cryptographic SHA-256 seal mismatch at Block #${block.blockHeight} (Case ${block.caseId}). Tampering or payload modification detected!`,
        totalBlocks: targetLedger.length
      };
    }
  }

  return {
    isValid: true,
    brokenBlockIndex: -1,
    totalBlocks: targetLedger.length,
    details: `All ${targetLedger.length} cryptographic block signature(s) & linkage pointers successfully verified.`
  };
}

/**
 * Toggles tamper simulation on the latest block in localStorage for live evaluator demos
 * @returns {Object|null} Modified block object
 */
export function toggleTamperLatestBlock() {
  const ledger = getLedger();
  if (ledger.length === 0) return null;

  const lastIndex = ledger.length - 1;
  const lastBlock = ledger[lastIndex];

  if (lastBlock.isTampered) {
    // Restore block hash & payload
    delete lastBlock.isTampered;
    if (lastBlock.originalHash) {
      lastBlock.currentHash = lastBlock.originalHash;
      delete lastBlock.originalHash;
    }
    lastBlock.status = 'ANCHORED_IMMUTABLE';
  } else {
    // Inject tamper flaw
    lastBlock.originalHash = lastBlock.currentHash;
    lastBlock.isTampered = true;
    lastBlock.currentHash = "ff9900_TAMPERED_SIGNATURE_MISMATCH_" + Math.random().toString(16).slice(2, 10);
    lastBlock.status = 'TAMPER_DETECTED';
  }

  saveLedger(ledger);
  return lastBlock;
}

/**
 * Clears the localStorage evidence ledger
 */
export function clearLedger() {
  localStorage.removeItem('tracex_ledger');
}

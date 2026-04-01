// LawLog AI — Legal Tracker Modules
// ContractRegistry, ObligationTracker, DeadlineCalendar, ClauseLibrary, RiskAssessor, DefinitionIndex, LegalInsights

export interface Contract {
  id: string;
  name: string;
  counterparty: string;
  type: 'employment' | 'lease' | 'service' | 'nda' | 'purchase';
  effectiveDate: string;
  expiryDate: string;
  renewalTerms: string;
  status: 'active' | 'expired' | 'pending';
}

export interface Obligation {
  id: string;
  contractId: string;
  contractName: string;
  description: string;
  dueDate: string;
  frequency: 'one-time' | 'monthly' | 'annual';
  status: 'pending' | 'completed' | 'overdue';
  responsibleParty: string;
}

export interface Deadline {
  id: string;
  contractName: string;
  whatsDue: string;
  date: string;
  reminder30: boolean;
  reminder14: boolean;
  reminder7: boolean;
}

export interface Clause {
  id: string;
  contractName: string;
  sectionNumber: string;
  clauseType: 'termination' | 'confidentiality' | 'non-compete' | 'indemnification' | 'payment';
  summary: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface Risk {
  id: string;
  contractId: string;
  contract: string;
  riskDescription: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  mitigationSuggestion: string;
}

export interface Definition {
  id: string;
  legalTerm: string;
  plainEnglish: string;
  contracts: string[];
  differences: string;
}

export interface Alert {
  id: string;
  type: 'deadline' | 'expiring' | 'overdue' | 'risk';
  title: string;
  detail: string;
  date: string;
  severity: 'info' | 'warning' | 'critical';
}

// ─── SEED DATA ─────────────────────────────────────────────

function today(): Date { return new Date(); }
function daysFromNow(d: number): string {
  const t = today();
  t.setDate(t.getDate() + d);
  return t.toISOString().split('T')[0];
}
function monthsFromNow(m: number): string {
  const t = today();
  t.setMonth(t.getMonth() + m);
  return t.toISOString().split('T')[0];
}
function monthsAgo(m: number): string {
  const t = today();
  t.setMonth(t.getMonth() - m);
  return t.toISOString().split('T')[0];
}
function yearsAgo(y: number): string {
  const t = today();
  t.setFullYear(t.getFullYear() - y);
  return t.toISOString().split('T')[0];
}

const SEED_CONTRACTS: Contract[] = [
  {
    id: 'c1',
    name: 'Apartment Lease — 1420 Oak Street, Apt 4B',
    counterparty: 'Meridian Property Group',
    type: 'lease',
    effectiveDate: monthsAgo(8),
    expiryDate: monthsFromNow(4),
    renewalTerms: 'Auto-renews month-to-month unless either party provides 60 days written notice. Rent increases capped at 3% per renewal period.',
    status: 'active',
  },
  {
    id: 'c2',
    name: 'Employment Agreement — Senior Software Engineer',
    counterparty: 'Pinnacle Dynamics Corp.',
    type: 'employment',
    effectiveDate: yearsAgo(1),
    expiryDate: monthsFromNow(11),
    renewalTerms: 'Automatic annual renewal. Either party may terminate with 30 days written notice. Annual performance review precedes renewal.',
    status: 'active',
  },
  {
    id: 'c3',
    name: 'Freelance Development Services — ClientConnect Platform',
    counterparty: 'ClientConnect Inc.',
    type: 'service',
    effectiveDate: monthsAgo(3),
    expiryDate: monthsFromNow(9),
    renewalTerms: 'One-time engagement. Option to extend for maintenance phase at negotiated rate.',
    status: 'active',
  },
  {
    id: 'c4',
    name: 'Cloud Hosting Services Agreement',
    counterparty: 'StratosCloud Solutions',
    type: 'service',
    effectiveDate: monthsAgo(6),
    expiryDate: monthsFromNow(6),
    renewalTerms: 'Auto-renews annually. 30-day cancellation window before renewal date. SLA guarantees 99.9% uptime.',
    status: 'active',
  },
  {
    id: 'c5',
    name: 'Mutual Non-Disclosure Agreement',
    counterparty: 'Vertex Innovations LLC',
    type: 'nda',
    effectiveDate: monthsAgo(2),
    expiryDate: monthsFromNow(22),
    renewalTerms: 'Survives for 3 years from execution. Confidentiality obligations extend 2 years beyond termination.',
    status: 'active',
  },
  {
    id: 'c6',
    name: 'Vehicle Purchase Agreement — 2023 Subaru Outback',
    counterparty: 'Summit Auto Group',
    type: 'purchase',
    effectiveDate: monthsAgo(10),
    expiryDate: 'N/A',
    renewalTerms: 'One-time purchase. Extended warranty expires ' + monthsFromNow(14) + '. Service contract renewable annually.',
    status: 'active',
  },
];

const SEED_OBLIGATIONS: Obligation[] = [
  {
    id: 'o1',
    contractId: 'c1',
    contractName: 'Apartment Lease — 1420 Oak Street, Apt 4B',
    description: 'Monthly rent payment of $2,150',
    dueDate: daysFromNow(5),
    frequency: 'monthly',
    status: 'pending',
    responsibleParty: 'Tenant (You)',
  },
  {
    id: 'o2',
    contractId: 'c1',
    contractName: 'Apartment Lease — 1420 Oak Street, Apt 4B',
    description: 'Provide 60-day written notice if not renewing lease',
    dueDate: monthsFromNow(2),
    frequency: 'one-time',
    status: 'pending',
    responsibleParty: 'Tenant (You)',
  },
  {
    id: 'o3',
    contractId: 'c1',
    contractName: 'Apartment Lease — 1420 Oak Street, Apt 4B',
    description: 'Renter\'s insurance policy renewal with $100K liability minimum',
    dueDate: monthsFromNow(3),
    frequency: 'annual',
    status: 'pending',
    responsibleParty: 'Tenant (You)',
  },
  {
    id: 'o4',
    contractId: 'c2',
    contractName: 'Employment Agreement — Senior Software Engineer',
    description: 'Annual non-compete acknowledgment and compliance certification',
    dueDate: monthsFromNow(2),
    frequency: 'annual',
    status: 'pending',
    responsibleParty: 'Employee (You)',
  },
  {
    id: 'o5',
    contractId: 'c2',
    contractName: 'Employment Agreement — Senior Software Engineer',
    description: 'Submit quarterly invention disclosure report',
    dueDate: daysFromNow(18),
    frequency: 'monthly',
    status: 'pending',
    responsibleParty: 'Employee (You)',
  },
  {
    id: 'o6',
    contractId: 'c3',
    contractName: 'Freelance Development Services — ClientConnect Platform',
    description: 'Deliver Phase 3 milestone: API integration module',
    dueDate: daysFromNow(25),
    frequency: 'one-time',
    status: 'pending',
    responsibleParty: 'Contractor (You)',
  },
  {
    id: 'o7',
    contractId: 'c3',
    contractName: 'Freelance Development Services — ClientConnect Platform',
    description: 'Monthly progress report and invoice submission',
    dueDate: daysFromNow(3),
    frequency: 'monthly',
    status: 'pending',
    responsibleParty: 'Contractor (You)',
  },
  {
    id: 'o8',
    contractId: 'c4',
    contractName: 'Cloud Hosting Services Agreement',
    description: 'Monthly hosting fee payment of $349',
    dueDate: daysFromNow(8),
    frequency: 'monthly',
    status: 'pending',
    responsibleParty: 'Customer (You)',
  },
  {
    id: 'o9',
    contractId: 'c5',
    contractName: 'Mutual Non-Disclosure Agreement',
    description: 'Return or destroy all confidential materials upon project completion',
    dueDate: monthsFromNow(10),
    frequency: 'one-time',
    status: 'pending',
    responsibleParty: 'Receiving Party (You)',
  },
  {
    id: 'o10',
    contractId: 'c6',
    contractName: 'Vehicle Purchase Agreement — 2023 Subaru Outback',
    description: 'Monthly auto loan payment of $485',
    dueDate: daysFromNow(12),
    frequency: 'monthly',
    status: 'pending',
    responsibleParty: 'Buyer (You)',
  },
  {
    id: 'o11',
    contractId: 'c6',
    contractName: 'Vehicle Purchase Agreement — 2023 Subaru Outback',
    description: 'Annual state vehicle inspection',
    dueDate: monthsFromNow(1),
    frequency: 'annual',
    status: 'pending',
    responsibleParty: 'Owner (You)',
  },
  {
    id: 'o12',
    contractId: 'c4',
    contractName: 'Cloud Hosting Services Agreement',
    description: 'Annual security compliance audit participation',
    dueDate: monthsFromNow(5),
    frequency: 'annual',
    status: 'pending',
    responsibleParty: 'Customer (You)',
  },
];

const SEED_DEADLINES: Deadline[] = [
  {
    id: 'd1',
    contractName: 'Apartment Lease — 1420 Oak Street, Apt 4B',
    whatsDue: 'Monthly rent payment ($2,150)',
    date: daysFromNow(5),
    reminder30: true,
    reminder14: true,
    reminder7: true,
  },
  {
    id: 'd2',
    contractName: 'Freelance Development Services — ClientConnect Platform',
    whatsDue: 'Monthly progress report and invoice',
    date: daysFromNow(3),
    reminder30: true,
    reminder14: true,
    reminder7: true,
  },
  {
    id: 'd3',
    contractName: 'Freelance Development Services — ClientConnect Platform',
    whatsDue: 'Phase 3 milestone delivery: API integration module',
    date: daysFromNow(25),
    reminder30: true,
    reminder14: true,
    reminder7: true,
  },
  {
    id: 'd4',
    contractName: 'Apartment Lease — 1420 Oak Street, Apt 4B',
    whatsDue: 'Lease renewal decision — 60-day notice deadline',
    date: monthsFromNow(2),
    reminder30: true,
    reminder14: true,
    reminder7: true,
  },
  {
    id: 'd5',
    contractName: 'Vehicle Purchase Agreement — 2023 Subaru Outback',
    whatsDue: 'Annual state vehicle inspection',
    date: monthsFromNow(1),
    reminder30: true,
    reminder14: true,
    reminder7: true,
  },
];

const SEED_CLAUSES: Clause[] = [
  {
    id: 'cl1',
    contractName: 'Employment Agreement — Senior Software Engineer',
    sectionNumber: '§8.2',
    clauseType: 'non-compete',
    summary: 'You cannot work for a direct competitor or start a competing business within 50 miles for 12 months after leaving. This covers companies listed in Schedule A and any business generating >30% revenue from similar products.',
    riskLevel: 'high',
  },
  {
    id: 'cl2',
    contractName: 'Apartment Lease — 1420 Oak Street, Apt 4B',
    sectionNumber: '§11.3',
    clauseType: 'termination',
    summary: 'Early termination requires 60 days notice plus payment of 2 months\' rent as penalty. Landlord may terminate with 30 days notice for lease violations after one written warning.',
    riskLevel: 'medium',
  },
  {
    id: 'cl3',
    contractName: 'Mutual Non-Disclosure Agreement — Vertex Innovations',
    sectionNumber: '§4.1',
    clauseType: 'confidentiality',
    summary: 'Both parties must protect confidential information with "reasonable care" standard. No specific encryption or security measures defined. Oral disclosures must be confirmed in writing within 5 business days.',
    riskLevel: 'medium',
  },
  {
    id: 'cl4',
    contractName: 'Freelance Development Services — ClientConnect Platform',
    sectionNumber: '§6.1',
    clauseType: 'indemnification',
    summary: 'You indemnify ClientConnect against all claims arising from your work product. No mutual indemnification — you bear all liability. Cap is limited to total contract value ($45,000).',
    riskLevel: 'high',
  },
  {
    id: 'cl5',
    contractName: 'Employment Agreement — Senior Software Engineer',
    sectionNumber: '§5.1',
    clauseType: 'payment',
    summary: 'Base salary of $145,000 annually, paid bi-weekly. Annual bonus up to 15% based on company and individual performance. Bonus is discretionary, not guaranteed.',
    riskLevel: 'low',
  },
  {
    id: 'cl6',
    contractName: 'Cloud Hosting Services Agreement',
    sectionNumber: '§9.2',
    clauseType: 'termination',
    summary: 'Either party may terminate for cause immediately upon written notice. Termination without cause requires 30-day notice. Data retrieval window is only 7 days post-termination.',
    riskLevel: 'high',
  },
  {
    id: 'cl7',
    contractName: 'Vehicle Purchase Agreement — 2023 Subaru Outback',
    sectionNumber: '§3.2',
    clauseType: 'payment',
    summary: 'Total purchase price $31,500. Financing through Summit Auto Finance at 4.9% APR for 60 months. Monthly payment $485. Late fee of $25 after 10-day grace period.',
    riskLevel: 'low',
  },
  {
    id: 'cl8',
    contractName: 'Apartment Lease — 1420 Oak Street, Apt 4B',
    sectionNumber: '§7.1',
    clauseType: 'payment',
    summary: 'Rent of $2,150 due on the 1st of each month. Late fee of $50 after 5-day grace period. Acceptable payment methods: check, electronic transfer. No credit cards.',
    riskLevel: 'low',
  },
];

const SEED_RISKS: Risk[] = [
  {
    id: 'r1',
    contractId: 'c2',
    contract: 'Employment Agreement — Senior Software Engineer',
    riskDescription: 'Non-compete clause is geographically broad (50 miles) and lasts 12 months. Could significantly restrict job opportunities in the local tech market if you leave Pinnacle Dynamics.',
    severity: 'high',
    mitigationSuggestion: 'Review with employment attorney before signing any new offer. Consider negotiating the radius down to 25 miles or the duration to 6 months at next renewal. Document that Schedule A competitor list has not been provided.',
  },
  {
    id: 'r2',
    contractId: 'c3',
    contract: 'Freelance Development Services — ClientConnect Platform',
    riskDescription: 'One-sided indemnification clause — you bear all liability for work product with no mutual protection. Maximum liability equals total contract value ($45,000), which is your entire fee.',
    severity: 'high',
    mitigationSuggestion: 'Negotiate for mutual indemnification before next engagement. Consider professional liability / errors & omissions insurance. Add clause capping indemnification at fees received (not total contract value).',
  },
  {
    id: 'r3',
    contractId: 'c4',
    contract: 'Cloud Hosting Services Agreement',
    riskDescription: 'Only 7-day data retrieval window after termination. If you miss this window, all data may be permanently deleted. No backup obligation on StratosCloud\'s part post-termination.',
    severity: 'critical',
    mitigationSuggestion: 'Maintain independent backups of all hosted data. Set calendar reminder 30 days before any potential termination. Negotiate extension of data retrieval window to 30 days at next renewal.',
  },
  {
    id: 'r4',
    contractId: 'c1',
    contract: 'Apartment Lease — 1420 Oak Street, Apt 4B',
    riskDescription: 'Lease expires in 4 months. Auto-renews month-to-month but at potentially higher rate (up to 3% increase). Month-to-month means less housing stability.',
    severity: 'medium',
    mitigationSuggestion: 'Decide whether to renew for another fixed term or go month-to-month by month 2 before expiry. Month-to-month offers flexibility but less rent protection. Get any renewal terms in writing.',
  },
  {
    id: 'r5',
    contractId: 'c5',
    contract: 'Mutual Non-Disclosure Agreement',
    riskDescription: 'NDA uses vague "reasonable care" standard without specifying required security measures. Oral disclosure confirmation window of 5 business days is short.',
    severity: 'medium',
    mitigationSuggestion: 'Establish your own documentation process for all oral exchanges. Confirm in writing within 2 days (not 5). Use encrypted channels for all Vertex Innovations communications.',
  },
];

const SEED_DEFINITIONS: Definition[] = [
  {
    id: 'def1',
    legalTerm: 'Force Majeure',
    plainEnglish: 'An unexpected, uncontrollable event (like a natural disaster, war, or pandemic) that prevents someone from fulfilling their contractual duties. If this happens, neither party can be held responsible for delays.',
    contracts: ['Apartment Lease', 'Freelance Development Services', 'Cloud Hosting Services'],
    differences: 'In your lease, it only covers natural disasters. In your service contracts, it also includes labor strikes and government actions.',
  },
  {
    id: 'def2',
    legalTerm: 'Indemnification',
    plainEnglish: 'A promise to protect someone else from legal blame or financial loss. If a third party sues, the indemnifying party covers the costs and damages.',
    contracts: ['Freelance Development Services', 'Cloud Hosting Services'],
    differences: 'In ClientConnect contract, indemnification is one-way (you protect them). In StratosCloud, it\'s mutual (both sides protect each other).',
  },
  {
    id: 'def3',
    legalTerm: 'Severability',
    plainEnglish: 'If one part of the contract is found to be illegal or unenforceable, the rest of the contract still applies. One bad clause doesn\'t ruin the whole agreement.',
    contracts: ['Employment Agreement', 'Apartment Lease', 'Mutual NDA'],
    differences: 'Standard across all three contracts. No meaningful variation.',
  },
  {
    id: 'def4',
    legalTerm: 'Governing Law',
    plainEnglish: 'Specifies which state or country\'s laws apply if there\'s a dispute. This determines which courts have jurisdiction and what legal rules are used.',
    contracts: ['Employment Agreement', 'Apartment Lease', 'Freelance Development Services', 'Vehicle Purchase'],
    differences: 'Employment and lease use your home state. Freelance contract uses ClientConnect\'s state (Delaware). Vehicle purchase uses your home state.',
  },
  {
    id: 'def5',
    legalTerm: 'Liquidated Damages',
    plainEnglish: 'A pre-agreed amount of money one party pays if they breach the contract. This avoids going to court to prove actual damages.',
    contracts: ['Apartment Lease', 'Vehicle Purchase'],
    differences: 'Lease sets liquidated damages at 2 months\' rent for early termination. Vehicle purchase has no liquidated damages clause — relies on actual damages.',
  },
  {
    id: 'def6',
    legalTerm: 'Confidential Information',
    plainEnglish: 'Information that must be kept secret. Typically includes business plans, customer lists, financial data, trade secrets, and technical details. The definition matters because it determines what you can and cannot share.',
    contracts: ['Mutual NDA', 'Employment Agreement'],
    differences: 'Employment agreement specifically includes source code and algorithms. NDA has a broader definition covering any non-public business information.',
  },
  {
    id: 'def7',
    legalTerm: 'Assignment',
    plainEnglish: 'Transferring your rights or obligations under a contract to someone else. Many contracts require the other party\'s consent before you can assign.',
    contracts: ['Apartment Lease', 'Cloud Hosting Services', 'Freelance Development Services'],
    differences: 'Lease allows subletting with landlord consent. Cloud hosting is non-assignable without written consent. Freelance contract is personal and cannot be assigned at all.',
  },
  {
    id: 'def8',
    legalTerm: 'Waiver',
    plainEnglish: 'If someone doesn\'t enforce a contract right once, they don\'t lose the right to enforce it later. Just because they let something slide doesn\'t mean they\'ve given up.',
    contracts: ['Employment Agreement', 'Apartment Lease', 'Cloud Hosting Services', 'Mutual NDA'],
    differences: 'Consistent language across all contracts. Some require waivers to be in writing.',
  },
  {
    id: 'def9',
    legalTerm: 'Entire Agreement',
    plainEnglish: 'This written contract is the complete deal. Any prior conversations, emails, or verbal promises that aren\'t written in here don\'t count. Only what\'s on paper matters.',
    contracts: ['Employment Agreement', 'Freelance Development Services', 'Cloud Hosting Services', 'Mutual NDA', 'Vehicle Purchase'],
    differences: 'All contracts include this clause. Employment agreement specifically notes that the employee handbook is NOT part of the agreement.',
  },
  {
    id: 'def10',
    legalTerm: 'Non-Compete',
    plainEnglish: 'A restriction on working for competitors or starting a competing business for a certain period after leaving. Limits your ability to work in your field.',
    contracts: ['Employment Agreement'],
    differences: 'Your employment agreement has a 12-month, 50-mile restriction. Your other contracts don\'t include non-compete clauses.',
  },
  {
    id: 'def11',
    legalTerm: 'Arbitration',
    plainEnglish: 'A private dispute resolution process instead of going to court. An arbitrator (like a private judge) hears both sides and makes a binding decision.',
    contracts: ['Employment Agreement', 'Cloud Hosting Services'],
    differences: 'Employment uses American Arbitration Association rules. Cloud hosting uses JAMS. Both require arbitration before litigation.',
  },
  {
    id: 'def12',
    legalTerm: 'SLA (Service Level Agreement)',
    plainEnglish: 'A commitment to maintain a certain level of service quality. If the provider fails to meet it, you may be entitled to credits or refunds.',
    contracts: ['Cloud Hosting Services'],
    differences: 'Only your StratosCloud contract includes an SLA — 99.9% uptime guarantee with service credits for downtime exceeding the threshold.',
  },
  {
    id: 'def13',
    legalTerm: 'Intellectual Property (IP) Assignment',
    plainEnglish: 'An agreement about who owns creations, inventions, or ideas. Typically, work created during employment belongs to the employer.',
    contracts: ['Employment Agreement', 'Freelance Development Services'],
    differences: 'Employment agreement assigns ALL work-related IP to employer. Freelance contract assigns delivered work product to client, but you retain rights to pre-existing tools and frameworks.',
  },
  {
    id: 'def14',
    legalTerm: 'Limitation of Liability',
    plainEnglish: 'A cap on how much money one party can be required to pay if something goes wrong. Sets a ceiling on financial exposure.',
    contracts: ['Cloud Hosting Services', 'Freelance Development Services'],
    differences: 'StratosCloud limits liability to fees paid in the last 12 months. ClientConnect limits to total contract value ($45,000). Both exclude liability for indirect/consequential damages.',
  },
  {
    id: 'def15',
    legalTerm: 'Representations and Warranties',
    plainEnglish: 'Promises that certain facts are true when signing. If they turn out to be false, the other party may have grounds to terminate or sue.',
    contracts: ['Vehicle Purchase', 'Mutual NDA', 'Cloud Hosting Services'],
    differences: 'Vehicle purchase warrants the car is free of liens and has accurate mileage. NDA warrants each party has authority to enter the agreement. Cloud services warrant compliance with data protection laws.',
  },
];

// ─── MODULES ────────────────────────────────────────────────

export class ContractRegistry {
  private contracts: Contract[] = [...SEED_CONTRACTS];

  getAll(): Contract[] { return this.contracts; }
  getById(id: string): Contract | undefined { return this.contracts.find(c => c.id === id); }
  add(c: Contract): void { this.contracts.push(c); }
  update(id: string, data: Partial<Contract>): Contract | null {
    const idx = this.contracts.findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.contracts[idx] = { ...this.contracts[idx], ...data };
    return this.contracts[idx];
  }
  delete(id: string): boolean {
    const len = this.contracts.length;
    this.contracts = this.contracts.filter(c => c.id !== id);
    return this.contracts.length < len;
  }
  getActive(): Contract[] { return this.contracts.filter(c => c.status === 'active'); }
  getExpiring(days: number): Contract[] {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + days);
    return this.contracts.filter(c => {
      if (c.status !== 'active' || c.expiryDate === 'N/A') return false;
      return new Date(c.expiryDate) <= cutoff;
    });
  }
}

export class ObligationTracker {
  private obligations: Obligation[] = [...SEED_OBLIGATIONS];

  getAll(): Obligation[] { return this.obligations; }
  add(o: Obligation): void { this.obligations.push(o); }
  update(id: string, data: Partial<Obligation>): Obligation | null {
    const idx = this.obligations.findIndex(o => o.id === id);
    if (idx === -1) return null;
    this.obligations[idx] = { ...this.obligations[idx], ...data };
    return this.obligations[idx];
  }
  delete(id: string): boolean {
    const len = this.obligations.length;
    this.obligations = this.obligations.filter(o => o.id !== id);
    return this.obligations.length < len;
  }
  getByContract(contractId: string): Obligation[] {
    return this.obligations.filter(o => o.contractId === contractId);
  }
  getPending(): Obligation[] { return this.obligations.filter(o => o.status === 'pending'); }
  getOverdue(): Obligation[] { return this.obligations.filter(o => o.status === 'overdue'); }
  getDueWithin(days: number): Obligation[] {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + days);
    return this.obligations.filter(o => {
      if (o.status !== 'pending') return false;
      return new Date(o.dueDate) <= cutoff;
    });
  }
}

export class DeadlineCalendar {
  private deadlines: Deadline[] = [...SEED_DEADLINES];

  getAll(): Deadline[] { return this.deadlines; }
  add(d: Deadline): void { this.deadlines.push(d); }
  update(id: string, data: Partial<Deadline>): Deadline | null {
    const idx = this.deadlines.findIndex(d => d.id === id);
    if (idx === -1) return null;
    this.deadlines[idx] = { ...this.deadlines[idx], ...data };
    return this.deadlines[idx];
  }
  delete(id: string): boolean {
    const len = this.deadlines.length;
    this.deadlines = this.deadlines.filter(d => d.id !== id);
    return this.deadlines.length < len;
  }
  getUpcoming(days: number): Deadline[] {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + days);
    return this.deadlines.filter(d => new Date(d.date) <= cutoff);
  }
}

export class ClauseLibrary {
  private clauses: Clause[] = [...SEED_CLAUSES];

  getAll(): Clause[] { return this.clauses; }
  add(c: Clause): void { this.clauses.push(c); }
  update(id: string, data: Partial<Clause>): Clause | null {
    const idx = this.clauses.findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.clauses[idx] = { ...this.clauses[idx], ...data };
    return this.clauses[idx];
  }
  delete(id: string): boolean {
    const len = this.clauses.length;
    this.clauses = this.clauses.filter(c => c.id !== id);
    return this.clauses.length < len;
  }
  getByContract(contractName: string): Clause[] {
    return this.clauses.filter(c => c.contractName.includes(contractName));
  }
  getByType(type: Clause['clauseType']): Clause[] {
    return this.clauses.filter(c => c.clauseType === type);
  }
  getHighRisk(): Clause[] { return this.clauses.filter(c => c.riskLevel === 'high'); }
}

export class RiskAssessor {
  private risks: Risk[] = [...SEED_RISKS];

  getAll(): Risk[] { return this.risks; }
  add(r: Risk): void { this.risks.push(r); }
  update(id: string, data: Partial<Risk>): Risk | null {
    const idx = this.risks.findIndex(r => r.id === id);
    if (idx === -1) return null;
    this.risks[idx] = { ...this.risks[idx], ...data };
    return this.risks[idx];
  }
  delete(id: string): boolean {
    const len = this.risks.length;
    this.risks = this.risks.filter(r => r.id !== id);
    return this.risks.length < len;
  }
  getBySeverity(severity: Risk['severity']): Risk[] {
    return this.risks.filter(r => r.severity === severity);
  }
  getHighSeverity(): Risk[] {
    return this.risks.filter(r => r.severity === 'high' || r.severity === 'critical');
  }
}

export class DefinitionIndex {
  private definitions: Definition[] = [...SEED_DEFINITIONS];

  getAll(): Definition[] { return this.definitions; }
  getByName(term: string): Definition | undefined {
    return this.definitions.find(d => d.legalTerm.toLowerCase() === term.toLowerCase());
  }
  add(d: Definition): void { this.definitions.push(d); }
  update(id: string, data: Partial<Definition>): Definition | null {
    const idx = this.definitions.findIndex(d => d.id === id);
    if (idx === -1) return null;
    this.definitions[idx] = { ...this.definitions[idx], ...data };
    return this.definitions[idx];
  }
  delete(id: string): boolean {
    const len = this.definitions.length;
    this.definitions = this.definitions.filter(d => d.id !== id);
    return this.definitions.length < len;
  }
}

export class LegalInsights {
  constructor(
    private contracts: ContractRegistry,
    private obligations: ObligationTracker,
    private deadlines: DeadlineCalendar,
    private clauses: ClauseLibrary,
    private risks: RiskAssessor,
    private definitions: DefinitionIndex,
  ) {}

  generateAlerts(): Alert[] {
    const alerts: Alert[] = [];
    let alertId = 1;

    // Deadlines in next 30 days
    for (const dl of this.deadlines.getUpcoming(30)) {
      const daysUntil = Math.ceil((new Date(dl.date).getTime() - Date.now()) / 86400000);
      alerts.push({
        id: `a${alertId++}`,
        type: 'deadline',
        title: `Deadline in ${daysUntil} days`,
        detail: `${dl.whatsDue} (${dl.contractName})`,
        date: dl.date,
        severity: daysUntil <= 7 ? 'critical' : daysUntil <= 14 ? 'warning' : 'info',
      });
    }

    // Expiring contracts
    for (const c of this.contracts.getExpiring(90)) {
      const daysUntil = Math.ceil((new Date(c.expiryDate).getTime() - Date.now()) / 86400000);
      alerts.push({
        id: `a${alertId++}`,
        type: 'expiring',
        title: `Contract expires in ${daysUntil} days`,
        detail: `${c.name} with ${c.counterparty}`,
        date: c.expiryDate,
        severity: daysUntil <= 30 ? 'critical' : 'warning',
      });
    }

    // Overdue obligations
    for (const o of this.obligations.getOverdue()) {
      alerts.push({
        id: `a${alertId++}`,
        type: 'overdue',
        title: 'Overdue obligation',
        detail: `${o.description} (${o.contractName})`,
        date: o.dueDate,
        severity: 'critical',
      });
    }

    // High-risk clauses
    for (const cl of this.clauses.getHighRisk()) {
      alerts.push({
        id: `a${alertId++}`,
        type: 'risk',
        title: 'High-risk clause without mitigation',
        detail: `${cl.sectionNumber} ${cl.clauseType} — ${cl.contractName}`,
        date: '',
        severity: 'warning',
      });
    }

    return alerts.sort((a, b) => {
      const severityOrder = { critical: 0, warning: 1, info: 2 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    });
  }

  getContextForChat(): string {
    const contracts = this.contracts.getAll();
    const obligations = this.obligations.getPending();
    const deadlines = this.deadlines.getUpcoming(30);
    const highRisks = this.risks.getHighSeverity();
    const highClauses = this.clauses.getHighRisk();

    let ctx = 'CONTRACT PORTFOLIO:\n';
    for (const c of contracts) {
      ctx += `- ${c.name} (${c.type}, ${c.status}, expires ${c.expiryDate}) with ${c.counterparty}\n`;
    }

    ctx += '\nPENDING OBLIGATIONS:\n';
    for (const o of obligations) {
      ctx += `- [${o.contractName}] ${o.description} (due ${o.dueDate}, ${o.frequency})\n`;
    }

    ctx += '\nUPCOMING DEADLINES (30 days):\n';
    for (const d of deadlines) {
      ctx += `- [${d.contractName}] ${d.whatsDue} on ${d.date}\n`;
    }

    ctx += '\nHIGH-RISK ITEMS:\n';
    for (const r of highRisks) {
      ctx += `- [${r.contract}] ${r.riskDescription}\n  Mitigation: ${r.mitigationSuggestion}\n`;
    }

    ctx += '\nHIGH-RISK CLAUSES:\n';
    for (const cl of highClauses) {
      ctx += `- [${cl.contractName}] ${cl.sectionNumber} (${cl.clauseType}): ${cl.summary}\n`;
    }

    return ctx;
  }
}

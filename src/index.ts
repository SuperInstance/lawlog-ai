import {
  ContractRegistry, ObligationTracker, DeadlineCalendar,
  ClauseLibrary, RiskAssessor, DefinitionIndex, LegalInsights,
  type Contract, type Obligation, type Deadline, type Clause, type Risk, type Definition,
} from './law/tracker';

export interface Env {
  DEEPSEEK_API_KEY: string;
}

const registry = new ContractRegistry();
const obligationTracker = new ObligationTracker();
const deadlineCalendar = new DeadlineCalendar();
const clauseLibrary = new ClauseLibrary();
const riskAssessor = new RiskAssessor();
const definitionIndex = new DefinitionIndex();
const insights = new LegalInsights(registry, obligationTracker, deadlineCalendar, clauseLibrary, riskAssessor, definitionIndex);

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}

function error(msg: string, status = 400): Response {
  return json({ error: msg }, status);
}

async function handleChat(req: Request, env: Env): Promise<Response> {
  const body = await req.json() as { message?: string };
  const userMessage = body.message;
  if (!userMessage) return error('message is required');

  const apiKey = env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    // Fallback: return a helpful response without streaming
    const context = insights.getContextForChat();
    return json({
      reply: `I understand your question: "${userMessage}"\n\nI'm currently running without a DeepSeek API key configured. To enable AI-powered responses, set the DEEPSEEK_API_KEY environment variable.\n\nHowever, I can confirm I have access to your contract portfolio:\n${context}`,
    });
  }

  const systemPrompt = `You are LawLog, a contract companion. You have read every agreement this person has signed. You know their obligations, rights, deadlines, and risks. Cross-reference across all contracts. Explain legalese in plain English. Reference specific clauses by contract name and section number.\n\nCURRENT PORTFOLIO CONTEXT:\n${insights.getContextForChat()}`;

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        const response = await fetch('https://api.deepseek.com/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userMessage },
            ],
            stream: true,
          }),
        });

        if (!response.ok) {
          const errText = await response.text();
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: `DeepSeek API error: ${response.status}` })}\n\n`));
          controller.close();
          return;
        }

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                continue;
              }
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
                }
              } catch { /* skip malformed chunks */ }
            }
          }
        }
      } catch (err) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: String(err) })}\n\n`));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

async function handleContracts(req: Request): Promise<Response> {
  if (req.method === 'GET') {
    return json(registry.getAll());
  }
  const body = await req.json() as Partial<Contract>;
  if (!body.name || !body.counterparty || !body.type) {
    return error('name, counterparty, and type are required');
  }
  const contract: Contract = {
    id: 'c' + Date.now(),
    name: body.name,
    counterparty: body.counterparty,
    type: body.type,
    effectiveDate: body.effectiveDate || new Date().toISOString().split('T')[0],
    expiryDate: body.expiryDate || 'N/A',
    renewalTerms: body.renewalTerms || '',
    status: body.status || 'active',
  };
  registry.add(contract);
  return json(contract, 201);
}

async function handleObligations(req: Request): Promise<Response> {
  if (req.method === 'GET') {
    return json(obligationTracker.getAll());
  }
  const body = await req.json() as Partial<Obligation>;
  if (!body.contractId || !body.description) {
    return error('contractId and description are required');
  }
  const contract = registry.getById(body.contractId);
  const obligation: Obligation = {
    id: 'o' + Date.now(),
    contractId: body.contractId,
    contractName: contract?.name || body.contractName || 'Unknown',
    description: body.description,
    dueDate: body.dueDate || new Date().toISOString().split('T')[0],
    frequency: body.frequency || 'one-time',
    status: body.status || 'pending',
    responsibleParty: body.responsibleParty || 'You',
  };
  obligationTracker.add(obligation);
  return json(obligation, 201);
}

async function handleDeadlines(req: Request): Promise<Response> {
  if (req.method === 'GET') {
    return json(deadlineCalendar.getAll());
  }
  const body = await req.json() as Partial<Deadline>;
  if (!body.contractName || !body.whatsDue || !body.date) {
    return error('contractName, whatsDue, and date are required');
  }
  const deadline: Deadline = {
    id: 'd' + Date.now(),
    contractName: body.contractName,
    whatsDue: body.whatsDue,
    date: body.date,
    reminder30: body.reminder30 ?? true,
    reminder14: body.reminder14 ?? true,
    reminder7: body.reminder7 ?? true,
  };
  deadlineCalendar.add(deadline);
  return json(deadline, 201);
}

async function handleClauses(req: Request): Promise<Response> {
  if (req.method === 'GET') {
    return json(clauseLibrary.getAll());
  }
  const body = await req.json() as Partial<Clause>;
  if (!body.contractName || !body.sectionNumber || !body.clauseType || !body.summary) {
    return error('contractName, sectionNumber, clauseType, and summary are required');
  }
  const clause: Clause = {
    id: 'cl' + Date.now(),
    contractName: body.contractName,
    sectionNumber: body.sectionNumber,
    clauseType: body.clauseType,
    summary: body.summary,
    riskLevel: body.riskLevel || 'medium',
  };
  clauseLibrary.add(clause);
  return json(clause, 201);
}

async function handleRisks(req: Request): Promise<Response> {
  if (req.method === 'GET') {
    return json(riskAssessor.getAll());
  }
  const body = await req.json() as Partial<Risk>;
  if (!body.contract || !body.riskDescription || !body.severity) {
    return error('contract, riskDescription, and severity are required');
  }
  const risk: Risk = {
    id: 'r' + Date.now(),
    contractId: body.contractId || '',
    contract: body.contract,
    riskDescription: body.riskDescription,
    severity: body.severity,
    mitigationSuggestion: body.mitigationSuggestion || '',
  };
  riskAssessor.add(risk);
  return json(risk, 201);
}

async function handleDefinitions(req: Request): Promise<Response> {
  if (req.method === 'GET') {
    return json(definitionIndex.getAll());
  }
  const body = await req.json() as Partial<Definition>;
  if (!body.legalTerm || !body.plainEnglish) {
    return error('legalTerm and plainEnglish are required');
  }
  const def: Definition = {
    id: 'def' + Date.now(),
    legalTerm: body.legalTerm,
    plainEnglish: body.plainEnglish,
    contracts: body.contracts || [],
    differences: body.differences || '',
  };
  definitionIndex.add(def);
  return json(def, 201);
}

function handleAlerts(): Response {
  return json(insights.generateAlerts());
}

async function handleHTML(): Promise<Response> {
  const html = await (await fetch(new URL('../public/app.html', import.meta.url))).text();
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/' || path === '/app.html') return handleHTML();

    if (path === '/api/chat' && request.method === 'POST') return handleChat(request, env);
    if (path === '/api/contracts' && (request.method === 'GET' || request.method === 'POST')) return handleContracts(request);
    if (path === '/api/obligations' && (request.method === 'GET' || request.method === 'POST')) return handleObligations(request);
    if (path === '/api/deadlines' && (request.method === 'GET' || request.method === 'POST')) return handleDeadlines(request);
    if (path === '/api/clauses' && (request.method === 'GET' || request.method === 'POST')) return handleClauses(request);
    if (path === '/api/risks' && (request.method === 'GET' || request.method === 'POST')) return handleRisks(request);
    if (path === '/api/definitions' && (request.method === 'GET' || request.method === 'POST')) return handleDefinitions(request);
    if (path === '/api/alerts' && request.method === 'GET') return handleAlerts();

    return error('Not found', 404);
  },
};

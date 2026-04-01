# LawLog AI — Your Contract Companion

A contract companion that remembers every obligation across every agreement and becomes your irreplaceable legal memory.

After a year, LawLog knows every deadline, every clause, every risk in all your contracts. No generic legal AI has YOUR specific obligations.

## Architecture

- **Cloudflare Worker** — all API routes and static serving
- **Single HTML file** — professional legal UI, no build step
- **DeepSeek integration** — SSE streaming chat with full contract context

## API Routes

| Route | Methods | Description |
|-------|---------|-------------|
| `/api/chat` | POST | SSE streaming chat with LawLog AI |
| `/api/contracts` | GET, POST | Contract registry |
| `/api/obligations` | GET, POST | Obligation tracker |
| `/api/deadlines` | GET, POST | Deadline calendar |
| `/api/clauses` | GET, POST | Key clause library |
| `/api/risks` | GET, POST | Risk assessment |
| `/api/definitions` | GET, POST | Legal term definitions |
| `/api/alerts` | GET | Active alerts and warnings |

## Setup

```bash
npm install
export DEEPSEEK_API_KEY=your-key
npx wrangler dev
```

## Deploy

```bash
npx wrangler deploy
```

## Seed Data

Includes realistic contracts for a person with:
- Apartment lease (active, expires in 4 months)
- Employment contract (Senior Software Engineer)
- 2 service agreements (freelance + cloud hosting)
- 1 mutual NDA
- 1 vehicle purchase agreement
- 12 tracked obligations
- 5 upcoming deadlines
- 8 key clauses across all contracts
- 5 risk assessments (including 1 critical)
- 15 legal term definitions with cross-contract comparisons

## Tech Stack

- Cloudflare Workers (TypeScript)
- DeepSeek API (SSE streaming)
- Vanilla HTML/CSS/JS (no framework)

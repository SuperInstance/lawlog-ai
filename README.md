# lawlog-ai

You don't need a bar membership to spot concerning terms in a contract. This is a private, self-hosted AI assistant for legal text review, built as a Cocapn Fleet vessel. It runs exclusively on your own infrastructure.

**Live Reference Instance:** [lawlog-ai.casey-digennaro.workers.dev](https://lawlog-ai.casey-digennaro.workers.dev)

## Purpose

You've likely stared at a rental agreement, freelance contract, or terms of service and wondered if you're missing something. This tool lets you get a second opinion without routing your private documents through a third-party service.

## What It Does

*   **Private Analysis:** All requests go directly from your deployed worker to your chosen LLM provider's API. Your data never passes through any other server.
*   **Provider Flexibility:** Configure it to use DeepSeek, Moonshot, DeepInfra, SiliconFlow, or other compatible LLM APIs.
*   **Simple Deployment:** Deploy in under 2 minutes to Cloudflare Workers. No servers, databases, or complex build steps.
*   **Optional Memory:** Enable private conversation history stored only in your Cloudflare KV namespace.
*   **API Endpoint:** Includes a standard `/api/chat` endpoint for programmatic use, with a health check at `/`.

## Key Principles

1.  **Fork-First:** This is not a SaaS. You fork the repository, deploy it yourself, and maintain full control. There is no central platform, account, or rate limits we impose.
2.  **Zero Dependencies:** The entire application is a single, readable JavaScript file. No `npm install` or external packages.
3.  **No Upsells:** It performs the specific task of contract review. No email collection, advertising, or feature upselling.

## Quick Start

1.  **Fork** this repository.
2.  **Deploy** to Cloudflare Workers using `npx wrangler deploy`.
3.  Add your LLM API key as a Cloudflare Secret (`LLM_API_KEY`).

After deployment, visit your worker's `/setup` page for detailed configuration instructions.

## A Specific Limitation

This tool uses general-purpose language models. For complex, high-stakes contracts (e.g., corporate merger agreements), its analysis may lack the nuanced context a specialized legal professional provides and may miss critical jurisdiction-specific clauses. Always verify its suggestions manually.

## Contributing

This is a fork-first repository. You are encouraged to clone and modify it for your specific needs. Pull requests for clear bug fixes and modest, scope-contained improvements are welcome.

## License

MIT License

<div style="text-align:center;padding:16px;color:#64748b;font-size:.8rem"><a href="https://the-fleet.casey-digennaro.workers.dev" style="color:#64748b">The Fleet</a> &middot; <a href="https://cocapn.ai" style="color:#64748b">Cocapn</a></div>
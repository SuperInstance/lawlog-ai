# LawLog AI — Self-Hosted Legal Assistant

You can sanity-check a contract without a bar membership. This is a private, self-hosted AI helper for legal text, built as a Cocapn Fleet vessel. It runs on your own infrastructure.

---

## Try the Reference Instance
A public instance is available for testing. No signup required:
https://lawlog-ai.casey-digennaro.workers.dev

---

## How It Works
This tool provides a web interface and API for analyzing legal documents. It sends prompts directly from your deployed instance to your chosen LLM provider. Your data, API keys, and conversation context never pass through our servers.

**One Limitation:** You are responsible for sourcing and configuring your own LLM API keys, which requires accounts with those providers.

## Quick Start
1.  Fork this repository.
2.  Deploy to Cloudflare Workers using `npx wrangler deploy`.
3.  Add your LLM API key as a Cloudflare Secret (e.g., `DEEPSEEK_API_KEY`).

## Features
*   **Privacy-First:** Requests go directly from your edge instance to your LLM provider. No data is logged or stored by us.
*   **Multi-Provider Support:** Configure with keys for DeepSeek, Moonshot, DeepInfra, or SiliconFlow. You pay them directly.
*   **Self-Hosted:** You own your fork. There is no central service to depend on.
*   **Simple Runtime:** Zero dependencies. Deploys to Cloudflare Workers in seconds.
*   **Persistent Context:** Optional Cloudflare KV storage for maintaining conversation history across sessions.
*   **Defined Endpoints:** Includes API routes for contract analysis and standard health checks.

## Configuration
After deployment, visit `/setup` for instructions. Add your preferred LLM API key as a Cloudflare Secret:
- `DEEPSEEK_API_KEY`
- `MOONSHOT_API_KEY`
- `DEEPINFRA_API_KEY`
- `SILICONFLOW_API_KEY`

## Contributing
This is a fork-first repository. Clone it, modify it for your needs, and deploy your own version. Pull requests for fixes and improvements are welcome.

## License
MIT License

---

Superinstance & Lucineer (DiGennaro et al.)

<div>
  <a href="https://the-fleet.casey-digennaro.workers.dev">Fleet</a> · 
  <a href="https://cocapn.ai">Cocapn</a>
</div>
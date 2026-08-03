> **Live demo:** https://felipeofdev-ai.github.io/labs/secure-ship-kit/

# Secure Ship Kit

**Defensive, white-hat, secure-by-default shipping checklist** for TypeScript/Node teams â€” especially agentic systems that must **not** submit irreversible actions without a human checkpoint.

> Anti-fraud mindset = white-hat ethos. Same judgment behind [TrustHire](https://github.com/felipeofdev-ai/trusthire): protect people first.

**Author:** Felipe Fernandes ([@felipeofdev-ai](https://github.com/felipeofdev-ai)) Â· `felipe.of.dev@gmail.com`  
**Portfolio:** https://felipeofdev-ai.github.io/  
**License:** MIT

---

## What this is

A small CLI + templates pack that answers: *â€œAre we shipping securely enough for a bank/fintech reviewer to trust this repo?â€*

| Area | Examples |
|------|----------|
| Secrets | `.gitignore`, secret-scan configs, no committed `.env` |
| HITL | Review/checkpoint before prod submit Â· dry-run defaults |
| Headers | CSP / HSTS / `nosniff` sketches Â· `security.txt` |
| LGPD | Data minimization notes Â· no PII in logs |
| Supply chain | Dependabot Â· CodeQL/Semgrep Â· `SECURITY.md` |

## What this is NOT

- Not a vulnerability scanner aimed at live third-party systems  
- Not exploits, PoCs, credential stuffing, or auth bypass tooling  
- Not a substitute for a full ASVS assessment  

---

## Quick start

```bash
pnpm install   # or npm / yarn
pnpm check -- .
# or after build:
pnpm build && node dist/cli.js check .
```

```bash
npx tsx src/cli.ts check /path/to/your/app
npx tsx src/cli.ts list
```

Exit code `1` = fail findings (treat as ship hold). `0` = pass/warn only.

---

## Signature block (reuse on PRs)

```
â€” Felipe Fernandes Â· Crystal Engineer / Agentic AI
White-hat / defensive only Â· https://github.com/felipeofdev-ai/secure-ship-kit
```

---

## Templates included

| Path | Purpose |
|------|---------|
| `templates/github/dependabot.yml` | Weekly npm + Actions updates |
| `templates/github/codeql.yml` | GitHub CodeQL workflow |
| `templates/github/semgrep.yml` | Semgrep CI (defensive rules) |
| `templates/security-txt/security.txt` | RFC 9116 example |
| `rules/semgrep/` | Example Semgrep rules (secrets / dangerous sinks â€” defensive) |
| `checklists/` | Human-readable Markdown checklists (EN + LGPD) |

Copy templates into your repo; adapt contacts and scopes.

---

## Topics

`security` Â· `whitehat` Â· `owasp` Â· `lgpd` Â· `typescript` Â· `secure-by-default` Â· `hitl` Â· `csp`

---

## Related work by Felipe

- [TrustHire](https://github.com/felipeofdev-ai/trusthire) â€” hiring fraud / anti-scam defense  
- [hitl-langgraph-kit](https://github.com/felipeofdev-ai/hitl-langgraph-kit) â€” interrupt before irreversible actions  
- [Meridian](https://github.com/felipeofdev-ai/Meridian) â€” append-only engineering audit  

---

## Contributing

PRs welcome if they stay **defensive**. Offensive exploit content will be closed without merge.

```
Â© 2026 Felipe Fernandes Â· felipeofdev-ai
```

---

## Live demo

**Try it in the browser (no clone):** see badge / homepage above, or the [Labs hub](https://felipeofdev-ai.github.io/labs/).

## Constellation

| Project | Demo |
|---------|------|
| [CardOpsAI](https://github.com/felipeofdev-ai/CardOpsAI) | [lab](https://felipeofdev-ai.github.io/labs/cardopsai/) |
| [BridgeTrace-AI](https://github.com/felipeofdev-ai/BridgeTrace-AI) | [lab](https://felipeofdev-ai.github.io/labs/bridgetrace/) |
| [Meridian](https://github.com/felipeofdev-ai/Meridian) | [lab](https://felipeofdev-ai.github.io/labs/meridian/) |
| [TrustHire](https://github.com/felipeofdev-ai/trusthire) | [lab](https://felipeofdev-ai.github.io/labs/trusthire/) |
| [secure-ship-kit](https://github.com/felipeofdev-ai/secure-ship-kit) | [lab](https://felipeofdev-ai.github.io/labs/secure-ship-kit/) |
| [agentic-rag-cite](https://github.com/felipeofdev-ai/agentic-rag-cite) | [lab](https://felipeofdev-ai.github.io/labs/agentic-rag-cite/) |
| [hitl-langgraph-kit](https://github.com/felipeofdev-ai/hitl-langgraph-kit) | [lab](https://felipeofdev-ai.github.io/labs/hitl-langgraph-kit/) |
| [forge-mcp-server](https://github.com/felipeofdev-ai/forge-mcp-server) | [lab](https://felipeofdev-ai.github.io/labs/forge-mcp-server/) |
| [agent-eval-harness](https://github.com/felipeofdev-ai/agent-eval-harness) | [lab](https://felipeofdev-ai.github.io/labs/agent-eval-harness/) |
| [lgpd-checklist-agent](https://github.com/felipeofdev-ai/lgpd-checklist-agent) | [lab](https://felipeofdev-ai.github.io/labs/lgpd-checklist-agent/) |
| [hiring-packet](https://github.com/felipeofdev-ai/hiring-packet) | [lab](https://felipeofdev-ai.github.io/labs/hiring-packet/) |
| [philo-ai-os](https://github.com/felipeofdev-ai/philo-ai-os) | [lab](https://felipeofdev-ai.github.io/labs/philo-ai-os/) |
| [balcaoia-local](https://github.com/felipeofdev-ai/balcaoia-local) | [studio](https://balcaoia-studio.vercel.app) |

Portfolio: [felipeofdev-ai.github.io](https://felipeofdev-ai.github.io/) · Author: Felipe Fernandes · `felipe.of.dev@gmail.com`

> If this helped you, **star this repo** — organic only. No bots, no paid stars.
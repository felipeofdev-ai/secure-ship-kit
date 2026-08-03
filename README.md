# Secure Ship Kit

**Defensive, white-hat, secure-by-default shipping checklist** for TypeScript/Node teams — especially agentic systems that must **not** submit irreversible actions without a human checkpoint.

> Anti-fraud mindset = white-hat ethos. Same judgment behind [TrustHire](https://github.com/felipeofdev-ai/trusthire): protect people first.

**Author:** Felipe Fernandes ([@felipeofdev-ai](https://github.com/felipeofdev-ai)) · `felipe.of.dev@gmail.com`  
**Portfolio:** https://felipeofdev-ai.github.io/  
**License:** MIT

---

## What this is

A small CLI + templates pack that answers: *“Are we shipping securely enough for a bank/fintech reviewer to trust this repo?”*

| Area | Examples |
|------|----------|
| Secrets | `.gitignore`, secret-scan configs, no committed `.env` |
| HITL | Review/checkpoint before prod submit · dry-run defaults |
| Headers | CSP / HSTS / `nosniff` sketches · `security.txt` |
| LGPD | Data minimization notes · no PII in logs |
| Supply chain | Dependabot · CodeQL/Semgrep · `SECURITY.md` |

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
— Felipe Fernandes · Crystal Engineer / Agentic AI
White-hat / defensive only · https://github.com/felipeofdev-ai/secure-ship-kit
```

---

## Templates included

| Path | Purpose |
|------|---------|
| `templates/github/dependabot.yml` | Weekly npm + Actions updates |
| `templates/github/codeql.yml` | GitHub CodeQL workflow |
| `templates/github/semgrep.yml` | Semgrep CI (defensive rules) |
| `templates/security-txt/security.txt` | RFC 9116 example |
| `rules/semgrep/` | Example Semgrep rules (secrets / dangerous sinks — defensive) |
| `checklists/` | Human-readable Markdown checklists (EN + LGPD) |

Copy templates into your repo; adapt contacts and scopes.

---

## Topics

`security` · `whitehat` · `owasp` · `lgpd` · `typescript` · `secure-by-default` · `hitl` · `csp`

---

## Related work by Felipe

- [TrustHire](https://github.com/felipeofdev-ai/trusthire) — hiring fraud / anti-scam defense  
- [hitl-langgraph-kit](https://github.com/felipeofdev-ai/hitl-langgraph-kit) — interrupt before irreversible actions  
- [Meridian](https://github.com/felipeofdev-ai/Meridian) — append-only engineering audit  

---

## Contributing

PRs welcome if they stay **defensive**. Offensive exploit content will be closed without merge.

```
© 2026 Felipe Fernandes · felipeofdev-ai
```

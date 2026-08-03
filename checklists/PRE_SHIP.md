# Pre-ship defensive checklist (human)

## Blockers
- [ ] No secrets in git history / working tree (`.env` gitignored)
- [ ] Auth/session cookies: `Secure`, `HttpOnly`, appropriate `SameSite`
- [ ] HITL / review gate before irreversible prod submit

## High
- [ ] Dependabot or Renovate enabled
- [ ] CodeQL or Semgrep (or equivalent SAST) in CI
- [ ] CSP + HSTS + `X-Content-Type-Options: nosniff` planned or set
- [ ] SECURITY.md with contact for responsible disclosure

## Medium / LGPD
- [ ] Collect only data needed for stated purpose (minimization)
- [ ] Document retention & deletion path for personal data
- [ ] Redact CPF / tokens / passwords from logs
- [ ] Third-party processors listed (DPA where required)

## Info
- [ ] `/.well-known/security.txt` (RFC 9116)
- [ ] Dry-run default for outreach / external writes

— Felipe Fernandes · Crystal Engineer / Agentic AI

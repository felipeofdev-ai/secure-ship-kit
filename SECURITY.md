# Security Policy

## Supported versions

| Version | Supported |
|---------|-----------|
| 1.x     | yes       |

## Reporting a vulnerability

This project is **defensive documentation + checklist tooling**. Please report security issues privately:

- Email: **felipe.of.dev@gmail.com**
- Subject: `[secure-ship-kit] vulnerability report`

Please **do not** open a public issue with exploit details.

We aim to acknowledge within 5 business days.

## Scope

In scope: the CLI, templates, and Semgrep example rules in this repository.  
Out of scope: using this kit to attack third-party systems (that violates the project ethos).

## Human-in-the-loop (HITL)

This kit’s ship gate is a **review / checkpoint** before irreversible prod submit. Treat `secure-ship check` failures as a hold — not an auto-bypass. For agentic systems, prefer dry-run defaults and explicit human confirmation (same ethos as TrustHire anti-fraud).

## Logging

Do not log PII (CPF, passwords, session tokens, full card PANs). Prefer redaction helpers in application loggers.

— Felipe Fernandes · @felipeofdev-ai

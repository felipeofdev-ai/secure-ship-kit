/** Checklist definitions — defensive / secure-by-default only. */

export type Severity = "blocker" | "high" | "medium" | "info";

export type ChecklistItem = {
  id: string;
  title: string;
  severity: Severity;
  rationale: string;
  /** Heuristic file globs / names that satisfy the item when present. */
  evidenceGlobs: string[];
  /** Optional content needles (case-insensitive) that strengthen a pass. */
  contentNeedles?: string[];
};

export type ChecklistCategory = {
  id: string;
  title: string;
  items: ChecklistItem[];
};

export const CATEGORIES: ChecklistCategory[] = [
  {
    id: "secrets",
    title: "Secret detection & hygiene",
    items: [
      {
        id: "SEC-01",
        title: ".gitignore excludes .env and credential files",
        severity: "blocker",
        rationale: "Prevent accidental commit of secrets (OWASP A02 / ASVS V13).",
        evidenceGlobs: [".gitignore"],
        contentNeedles: [".env", "credentials", "*.pem"],
      },
      {
        id: "SEC-02",
        title: "No committed .env with real-looking secrets",
        severity: "blocker",
        rationale: "Tracked .env files are a top breach vector.",
        evidenceGlobs: [],
      },
      {
        id: "SEC-03",
        title: "Secret-scanning config present (gitleaks / trufflehog / secretlint)",
        severity: "high",
        rationale: "CI should catch leaked tokens before merge.",
        evidenceGlobs: [
          ".gitleaks.toml",
          ".secretlintrc*",
          "**/.github/workflows/*secret*",
          "**/.github/workflows/*gitleak*",
          "trufflehog*",
        ],
      },
    ],
  },
  {
    id: "hitl",
    title: "Human-in-the-loop before irreversible actions",
    items: [
      {
        id: "HITL-01",
        title: "Review / confirm gate documented before prod submit",
        severity: "high",
        rationale:
          "Agentic systems must checkpoint before irreversible submit (fraud / ATS / payments).",
        evidenceGlobs: [
          "**/REVIEW*",
          "**/HITL*",
          "**/*checkpoint*",
          "**/SECURITY.md",
          "**/README.md",
        ],
        contentNeedles: [
          "human-in-the-loop",
          "hitl",
          "review mode",
          "checkpoint",
          "dry-run",
        ],
      },
      {
        id: "HITL-02",
        title: "Dry-run default for outreach / external write actions",
        severity: "medium",
        rationale: "Default-deny for side effects; opt-in for live send.",
        evidenceGlobs: ["**/*", "**/README.md"],
        contentNeedles: ["dry-run", "dryRun", "--dry-run", "DRY_RUN"],
      },
    ],
  },
  {
    id: "headers",
    title: "HTTP security headers (sketch)",
    items: [
      {
        id: "HDR-01",
        title: "CSP / security headers mentioned or configured",
        severity: "high",
        rationale: "CSP + HSTS + nosniff reduce XSS and MITM impact (OWASP Secure Headers).",
        evidenceGlobs: [
          "**/next.config.*",
          "**/middleware.*",
          "**/helmet*",
          "**/security-headers*",
          "**/nginx*.conf",
        ],
        contentNeedles: [
          "Content-Security-Policy",
          "Strict-Transport-Security",
          "X-Content-Type-Options",
          "helmet",
          "contentSecurityPolicy",
        ],
      },
      {
        id: "HDR-02",
        title: "security.txt template or well-known path documented",
        severity: "info",
        rationale: "RFC 9116 — responsible disclosure contact for white-hats.",
        evidenceGlobs: [
          "**/security.txt",
          "**/.well-known/security.txt",
          "**/SECURITY.md",
        ],
        contentNeedles: ["Contact:", "security.txt", "RFC 9116"],
      },
    ],
  },
  {
    id: "lgpd",
    title: "LGPD / privacy data minimization",
    items: [
      {
        id: "LGPD-01",
        title: "Privacy / data-minimization notes present",
        severity: "medium",
        rationale:
          "Collect only what is needed; document purpose (LGPD Arts. 6, 7 — Brazil).",
        evidenceGlobs: [
          "**/PRIVACY*",
          "**/LGPD*",
          "**/privacy*",
          "**/SECURITY.md",
          "**/README.md",
        ],
        contentNeedles: [
          "lgpd",
          "data minimization",
          "minimiza",
          "privacy",
          "personal data",
          "dados pessoais",
        ],
      },
      {
        id: "LGPD-02",
        title: "No PII in logs guidance (or redaction helpers)",
        severity: "medium",
        rationale: "Avoid logging CPF, tokens, passwords, full card PANs.",
        evidenceGlobs: ["**/logger*", "**/logging*", "**/redact*", "**/SECURITY.md"],
        contentNeedles: ["redact", "pii", "mask", "sanitize log"],
      },
    ],
  },
  {
    id: "supply",
    title: "Dependency & CI defensive hygiene",
    items: [
      {
        id: "SUP-01",
        title: "Dependabot or Renovate config present",
        severity: "high",
        rationale: "Keep vulnerable transitive deps patched.",
        evidenceGlobs: [
          ".github/dependabot.yml",
          ".github/dependabot.yaml",
          "renovate.json",
          ".renovaterc*",
        ],
      },
      {
        id: "SUP-02",
        title: "CodeQL / Semgrep / SAST workflow present",
        severity: "high",
        rationale: "Static analysis catches insecure patterns before merge.",
        evidenceGlobs: [
          "**/.github/workflows/*codeql*",
          "**/.github/workflows/*semgrep*",
          "**/.github/workflows/*sast*",
          "**/.semgrep*",
          "semgrep.yml",
        ],
      },
      {
        id: "SUP-03",
        title: "SECURITY.md with vulnerability reporting path",
        severity: "medium",
        rationale: "Clear disclosure channel = white-hat friendly.",
        evidenceGlobs: ["SECURITY.md", "docs/SECURITY.md"],
      },
    ],
  },
];

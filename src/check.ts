import { access, readFile, readdir, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { CATEGORIES, type ChecklistItem, type Severity } from "./checklist.js";

export type FindingStatus = "pass" | "fail" | "warn" | "skip";

export type Finding = {
  id: string;
  category: string;
  title: string;
  severity: Severity;
  status: FindingStatus;
  detail: string;
  rationale: string;
};

export type CheckReport = {
  root: string;
  findings: Finding[];
  passed: number;
  failed: number;
  warned: number;
};

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  "coverage",
  "vendor",
  ".turbo",
]);

async function exists(p: string): Promise<boolean> {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function walkFiles(root: string, max = 4000): Promise<string[]> {
  const out: string[] = [];
  const stack = [root];
  while (stack.length && out.length < max) {
    const dir = stack.pop()!;
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      if (e.name.startsWith(".") && e.name !== ".github" && e.name !== ".gitignore" && e.name !== ".env" && e.name !== ".env.example" && e.name !== ".well-known" && e.name !== ".gitleaks.toml" && e.name !== ".semgrep.yml") {
        if (e.name !== ".github") continue;
      }
      const full = join(dir, e.name);
      if (e.isDirectory()) {
        if (SKIP_DIRS.has(e.name)) continue;
        stack.push(full);
      } else if (e.isFile()) {
        out.push(full);
      }
    }
  }
  return out;
}

function matchGlob(rel: string, pattern: string): boolean {
  const norm = rel.replace(/\\/g, "/");
  let p = pattern.replace(/\\/g, "/");
  if (p === "**/*") return true;
  // `**/file` should also match root `file`
  if (p.startsWith("**/")) p = p.slice(3);
  // Very small glob: ** / * support
  const esc = p
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*\*/g, "§§")
    .replace(/\*/g, "[^/]*")
    .replace(/§§/g, ".*");
  return new RegExp(`(^|/)${esc}$`, "i").test(norm);
}

async function readTextSafe(p: string, maxBytes = 200_000): Promise<string | null> {
  try {
    const s = await stat(p);
    if (s.size > maxBytes) return null;
    return await readFile(p, "utf8");
  } catch {
    return null;
  }
}

const SECRETISH =
  /(?:api[_-]?key|secret|password|token|private[_-]?key)\s*[:=]\s*['\"]?[A-Za-z0-9_\-]{16,}/i;

async function evaluateItem(
  root: string,
  files: string[],
  categoryId: string,
  item: ChecklistItem,
): Promise<Finding> {
  const base = {
    id: item.id,
    category: categoryId,
    title: item.title,
    severity: item.severity,
    rationale: item.rationale,
  };

  // Special: SEC-02 — fail if tracked-looking .env with secretish content exists at root
  if (item.id === "SEC-02") {
    const envPath = join(root, ".env");
    if (await exists(envPath)) {
      const body = await readTextSafe(envPath);
      if (body && SECRETISH.test(body) && !body.includes("CHANGE_ME") && !body.includes("your-")) {
        return {
          ...base,
          status: "fail",
          detail: ".env present with secret-like values — ensure it is gitignored and never committed.",
        };
      }
      return {
        ...base,
        status: "warn",
        detail: ".env exists locally (ok if gitignored). Prefer .env.example with placeholders only.",
      };
    }
    return { ...base, status: "pass", detail: "No root .env with secret-like payloads detected." };
  }

  const rels = files.map((f) => relative(root, f));
  const matchedFiles = rels.filter((rel) =>
    item.evidenceGlobs.some((g) => matchGlob(rel, g) || matchGlob(rel.replace(/\\/g, "/"), g)),
  );

  if (item.evidenceGlobs.length === 0) {
    return { ...base, status: "skip", detail: "No file heuristic configured." };
  }

  if (matchedFiles.length === 0) {
    // Also try basename-only patterns at root
    const rootHits: string[] = [];
    for (const g of item.evidenceGlobs) {
      if (!g.includes("/") && !g.includes("*")) {
        if (await exists(join(root, g))) rootHits.push(g);
      }
    }
    if (rootHits.length === 0) {
      const status: FindingStatus =
        item.severity === "blocker" || item.severity === "high" ? "fail" : "warn";
      return {
        ...base,
        status,
        detail: `Missing evidence for patterns: ${item.evidenceGlobs.slice(0, 4).join(", ")}`,
      };
    }
  }

  const needles = item.contentNeedles ?? [];
  if (needles.length === 0) {
    return {
      ...base,
      status: "pass",
      detail: `Found: ${(matchedFiles.length ? matchedFiles : ["(root)"]).slice(0, 3).join(", ")}`,
    };
  }

  const haystackFiles =
    matchedFiles.length > 0
      ? matchedFiles.map((r) => join(root, r))
      : item.evidenceGlobs
          .filter((g) => !g.includes("*"))
          .map((g) => join(root, g));

  let foundNeedle = false;
  let hitFile = "";
  for (const fp of haystackFiles.slice(0, 40)) {
    const body = await readTextSafe(fp);
    if (!body) continue;
    const lower = body.toLowerCase();
    if (needles.some((n) => lower.includes(n.toLowerCase()))) {
      foundNeedle = true;
      hitFile = relative(root, fp);
      break;
    }
  }

  if (foundNeedle) {
    return { ...base, status: "pass", detail: `Matched guidance in ${hitFile}` };
  }

  const status: FindingStatus =
    item.severity === "info" ? "warn" : item.severity === "medium" ? "warn" : "fail";
  return {
    ...base,
    status,
    detail: `Files present but missing expected guidance (${needles.slice(0, 3).join(", ")}…)`,
  };
}

export async function runCheck(root: string): Promise<CheckReport> {
  const files = await walkFiles(root);
  const findings: Finding[] = [];
  for (const cat of CATEGORIES) {
    for (const item of cat.items) {
      findings.push(await evaluateItem(root, files, cat.id, item));
    }
  }
  return {
    root,
    findings,
    passed: findings.filter((f) => f.status === "pass").length,
    failed: findings.filter((f) => f.status === "fail").length,
    warned: findings.filter((f) => f.status === "warn").length,
  };
}

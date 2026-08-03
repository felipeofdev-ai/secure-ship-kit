#!/usr/bin/env node
/**
 * secure-ship-kit — defensive shipping checklist CLI
 * Author: Felipe Fernandes <felipe.of.dev@gmail.com>
 * Ethos: white-hat only. No scanners against live third parties. No exploit payloads.
 */
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { runCheck } from "./check.js";
import { printReport } from "./report.js";

function usage(): never {
  console.log(`secure-ship — defensive pre-ship checklist (white-hat only)

Usage:
  secure-ship check [path]     Scan a project for defensive guardrails
  secure-ship list             Print checklist categories
  secure-ship --help

Examples:
  secure-ship check .
  secure-ship check ./apps/web

Signature: Felipe Fernandes · Crystal Engineer / Agentic AI
Docs: https://github.com/felipeofdev-ai/secure-ship-kit
`);
  process.exit(0);
}

async function main(): Promise<void> {
  const [, , cmd = "check", target = "."] = process.argv;
  if (cmd === "--help" || cmd === "-h" || cmd === "help") usage();
  if (cmd === "list") {
    const { CATEGORIES } = await import("./checklist.js");
    for (const c of CATEGORIES) {
      console.log(`\n## ${c.id} — ${c.title}`);
      for (const item of c.items) console.log(`  - [${item.id}] ${item.title}`);
    }
    process.exit(0);
  }
  if (cmd !== "check") {
    console.error(`Unknown command: ${cmd}`);
    usage();
  }
  const root = resolve(process.cwd(), target);
  const report = await runCheck(root);
  printReport(report);
  process.exit(report.failed > 0 ? 1 : 0);
}

const isDirect =
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (isDirect) {
  main().catch((err: unknown) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(2);
  });
}

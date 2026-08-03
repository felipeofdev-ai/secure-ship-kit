import type { CheckReport } from "./check.js";

const ICON: Record<string, string> = {
  pass: "✓",
  fail: "✗",
  warn: "!",
  skip: "·",
};

export function printReport(report: CheckReport): void {
  console.log(`\nsecure-ship-kit · defensive check`);
  console.log(`root: ${report.root}`);
  console.log(`— Felipe Fernandes · Crystal Engineer / Agentic AI —\n`);

  let current = "";
  for (const f of report.findings) {
    if (f.category !== current) {
      current = f.category;
      console.log(`\n[${current}]`);
    }
    const mark = ICON[f.status] ?? "?";
    console.log(`  ${mark} ${f.id} ${f.title}`);
    console.log(`      ${f.detail}`);
    if (f.status === "fail" || f.status === "warn") {
      console.log(`      why: ${f.rationale}`);
    }
  }

  console.log(
    `\nsummary: ${report.passed} pass · ${report.warned} warn · ${report.failed} fail`,
  );
  console.log(
    report.failed === 0
      ? "ship gate: OPEN (still review HITL before irreversible submit)"
      : "ship gate: HOLD — fix blockers/high fails first",
  );
  console.log("");
}

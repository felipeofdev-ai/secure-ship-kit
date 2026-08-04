import test from "node:test";
import assert from "node:assert/strict";
import { CATEGORIES } from "../src/checklist.ts";

test("checklist has security categories", () => {
  assert.ok(CATEGORIES.length >= 3);
  const ids = CATEGORIES.map((c) => c.id);
  assert.ok(ids.includes("secrets"));
  assert.ok(ids.includes("hitl"));
});

test("each item has required fields", () => {
  for (const cat of CATEGORIES) {
    assert.ok(cat.items.length > 0);
    for (const item of cat.items) {
      assert.ok(item.id.length > 0);
      assert.ok(item.title.length > 0);
      assert.ok(["blocker", "high", "medium", "info"].includes(item.severity));
    }
  }
});

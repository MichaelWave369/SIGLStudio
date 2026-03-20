import { describe, expect, it } from "vitest";
import { aggregateBatchResults } from "../lib/batch";

describe("batch aggregation", () => {
  it("aggregates pass/fail/obligation counts", () => {
    const stats = aggregateBatchResults([
      { item: { id: "1", title: "a", source: "Φ", sequence: false }, sourceHash: "x", inspect: null, validation: { valid: true, bridgeScore: 1, issues: [], warnings: [], obligations: [], mode: "mock", modeReason: "m" } },
      { item: { id: "2", title: "b", source: "Ω", sequence: false }, sourceHash: "y", inspect: null, validation: { valid: false, bridgeScore: 0.2, issues: ["i"], warnings: [], obligations: [{ id: "o", label: "o", status: "fail", detail: "d" }], mode: "mock", modeReason: "m" } }
    ]);
    expect(stats.total).toBe(2);
    expect(stats.fail).toBe(1);
    expect(stats.obligations).toBe(1);
  });
});

import { describe, expect, it } from "vitest";
import { summarizeDiff } from "../lib/diffInspect";

describe("diff summary generation", () => {
  it("detects structure/source differences", () => {
    const summary = summarizeDiff(
      { source: "Φ", inspect: null, validation: null, sourceHash: "a", sequencePresent: false },
      { source: "Ω", inspect: null, validation: null, sourceHash: "b", sequencePresent: true }
    );
    expect(summary.same).toBe(false);
    expect(summary.sourceHashEqual).toBe(false);
  });
});

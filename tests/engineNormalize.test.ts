import { describe, expect, it } from "vitest";
import { normalizeInspectResult, normalizeValidationResult } from "../lib/engineNormalize";
import { mockInspect, mockValidate } from "../lib/mockEngine";

describe("engine normalization", () => {
  it("falls back on malformed validation result", () => {
    const fallback = mockValidate("Φ");
    const normalized = normalizeValidationResult({ nope: true }, fallback);
    expect(normalized.mode).toBe("mock");
    expect(normalized.valid).toBe(fallback.valid);
  });

  it("normalizes inspect with missing fields", () => {
    const fallback = mockInspect("Φ");
    const normalized = normalizeInspectResult({ mode: "vibe", parsedSummary: { inferredForm: "linear" } }, fallback);
    expect(normalized.mode).toBe("vibe");
    expect(normalized.graph.nodes.length).toBeGreaterThan(0);
  });
});

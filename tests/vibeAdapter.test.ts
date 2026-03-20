import { afterEach, describe, expect, it, vi } from "vitest";
import { inspectSigil, validateSigil } from "../lib/vibeAdapter";

describe("vibe adapter fallback", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("falls back when fetch rejects", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    const result = await validateSigil("Φ");
    expect(result.mode).toBe("mock");
    expect(result.modeReason.toLowerCase()).toContain("failed");
  });

  it("normalizes malformed inspect response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ mode: "vibe", parsedSummary: { inferredForm: "linear" } }) })
    );
    const result = await inspectSigil("Φ");
    expect(result.mode).toBe("vibe");
    expect(result.graph.nodes.length).toBeGreaterThan(0);
  });
});

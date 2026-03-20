import { describe, expect, it } from "vitest";
import { buildExportBundle, deterministicHash } from "../lib/exportBundle";

describe("export bundle", () => {
  it("generates deterministic hash", () => {
    expect(deterministicHash("Φ ∴ ☉")).toBe(deterministicHash("Φ ∴ ☉"));
  });

  it("includes metadata", () => {
    const bundle = buildExportBundle({
      source: "Φ",
      svg: "<svg />",
      canonicalJson: { source: "Φ" },
      engineMode: "mock",
      obligationsCount: 2,
      createdAt: "2026-01-01T00:00:00.000Z"
    });
    expect(bundle.metadata.glyph_count).toBe(1);
    expect(bundle.metadata.obligation_count).toBe(2);
  });
});

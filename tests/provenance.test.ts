import { describe, expect, it } from "vitest";
import { buildProvenance } from "../lib/provenance";

describe("provenance normalization", () => {
  it("fills defaults", () => {
    const provenance = buildProvenance({ engine_mode: "mock", mode_reason: "test" });
    expect(provenance.export_version).toBe("0.4");
    expect(provenance.normalized_shape_version).toContain("siglstudio");
  });
});

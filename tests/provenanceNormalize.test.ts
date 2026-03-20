import { describe, expect, it } from "vitest";
import { normalizeProvenance } from "../lib/provenanceNormalize";

describe("provenance normalization with partial engine fields", () => {
  it("handles partial engine fields gracefully", () => {
    const normalized = normalizeProvenance(
      { engine_mode: "mock", mode_reason: "local", export_version: "0.5", created_at: "now", obligation_count: 1, issue_count: 0 },
      { engine_version: "1.2.3" }
    );
    expect(normalized.engine.engine_version).toBe("1.2.3");
    expect(normalized.engine.engine_source).toBeNull();
  });
});

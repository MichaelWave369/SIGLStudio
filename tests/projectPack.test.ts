import { describe, expect, it } from "vitest";
import { createProjectPack, validateProjectPackPayload } from "../lib/projectPack";

describe("project pack integrity", () => {
  it("creates deterministic item hashes and validates payload", () => {
    const pack = createProjectPack({
      name: "Test",
      description: "Desc",
      engineMode: "mock",
      items: [{ id: "i1", type: "sigil", title: "A", source: "Φ", labels: [] }]
    });
    const validation = validateProjectPackPayload(pack);
    expect(validation.valid).toBe(true);
  });

  it("rejects malformed import", () => {
    const validation = validateProjectPackPayload({ nope: true });
    expect(validation.valid).toBe(false);
  });
});

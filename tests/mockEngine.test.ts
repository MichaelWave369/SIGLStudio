import { describe, expect, it } from "vitest";
import { mockInspect, mockValidate } from "../lib/mockEngine";

describe("mock engine", () => {
  it("returns valid result for basic source", () => {
    const result = mockValidate("⟨ Φ ∴ ☉ ⟩");
    expect(result.valid).toBe(true);
    expect(result.mode).toBe("mock");
  });

  it("builds inspect graph nodes", () => {
    const inspect = mockInspect("Φ ⟡ Ω");
    expect(inspect.graph.nodes.length).toBe(3);
    expect(inspect.mode).toBe("mock");
  });
});

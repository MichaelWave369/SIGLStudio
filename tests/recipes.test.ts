import { describe, expect, it } from "vitest";
import { runRecipe, validateRecipe } from "@/lib/recipes";

describe("recipes", () => {
  it("validates deterministic recipe model", () => {
    const recipe = { id: "r1", name: "R", description: "", source_scope: "global", output_target: "none", actions: [], schema_version: "0.8" };
    expect(validateRecipe(recipe)).toBe(true);
  });

  it("builds deterministic run summary", () => {
    const run = runRecipe({ id: "r1", name: "R", description: "", source_scope: "global", output_target: "none", actions: [{ id: "a", kind: "validate", params: {} }], schema_version: "0.8" } as any);
    expect(run.action_count).toBe(1);
  });
});

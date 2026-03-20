import { describe, expect, it } from "vitest";
import { builtInBlueprints, instantiateBlueprint, validatePipelineBlueprint } from "@/lib/pipelineBlueprints";

describe("pipeline blueprints", () => {
  it("instantiates blueprint to manifest", () => {
    const manifest = instantiateBlueprint({ blueprint: builtInBlueprints[0], source_id: "src", included_ids: ["b", "a"] });
    expect(manifest.included_ids).toEqual(["a", "b"]);
  });

  it("rejects incomplete blueprint shape", () => {
    expect(validatePipelineBlueprint({ id: "x", outputs: [] })).toBe(false);
  });
});

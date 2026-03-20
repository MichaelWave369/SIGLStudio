import { describe, expect, it } from "vitest";
import { buildPipelineManifest } from "@/lib/pipelineManifests";

describe("pipeline manifests", () => {
  it("sorts included ids deterministically", () => {
    const manifest = buildPipelineManifest({ source_type: "board", source_id: "b1", target_type: "artifact-set", included_ids: ["c", "a"], theme_id: "observatory" });
    expect(manifest.included_ids).toEqual(["a", "c"]);
    expect(manifest.export_version).toBe("0.8");
  });
});

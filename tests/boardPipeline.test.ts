import { describe, expect, it } from "vitest";
import { createBoardPipelineManifest } from "@/lib/boardPipeline";

describe("board pipeline", () => {
  it("creates deterministic selection ordering", () => {
    const manifest = createBoardPipelineManifest({
      board: { id: "b1", title: "B", description: "", zoom: 1, blocks: [], layers: [], connections: [], schema_version: "0.7", created_at: "", updated_at: "" },
      selected_block_ids: ["z", "a"],
      output_type: "artifact-set",
      theme_id: "observatory"
    });
    expect(manifest.selected_block_ids).toEqual(["a", "z"]);
    expect(manifest.export_version).toBe("0.7");
  });
});

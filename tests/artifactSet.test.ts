import { describe, expect, it } from "vitest";
import { buildArtifactSetManifest } from "@/lib/artifactSet";

describe("artifact set", () => {
  it("builds deterministic manifest shape", () => {
    const manifest = buildArtifactSetManifest({ preset: "diff-package", source_ref: "diff:1", theme_id: "observatory" });
    expect(manifest.export_version).toBe("0.6");
    expect(manifest.items.length).toBeGreaterThan(0);
  });
});

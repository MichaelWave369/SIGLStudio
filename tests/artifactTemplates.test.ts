import { describe, expect, it } from "vitest";
import { buildArtifactTemplate } from "../lib/artifactTemplates";

describe("artifact template metadata", () => {
  it("builds artifact export metadata", () => {
    const artifact = buildArtifactTemplate({ id: "a", type: "poster", title: "T", subtitle: "S", source: "Φ" });
    expect(artifact.export_version).toBe("0.4");
    expect(artifact.svg.includes("<svg")).toBe(true);
  });
});

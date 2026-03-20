import { describe, expect, it } from "vitest";
import { bundleSummary, createPublishingBundle } from "@/lib/publishingBundle";

describe("publishing bundle", () => {
  it("creates deterministic included ordering", () => {
    const bundle = createPublishingBundle({ bundle_type: "review-bundle", title: "B", subtitle: "", description: "", source_context: "review", included_items: ["z", "a"], theme_id: "observatory", provenance_summary: "", notes: "", next_actions: [] });
    expect(bundle.included_items).toEqual(["a", "z"]);
    expect(bundle.export_version).toBe("0.9");
  });

  it("builds summary output", () => {
    const bundle = createPublishingBundle({ bundle_type: "archive-bundle", title: "B", subtitle: "", description: "", source_context: "review", included_items: [], theme_id: "observatory", provenance_summary: "", notes: "", next_actions: [] });
    expect(bundleSummary(bundle).bundle_type).toBe("archive-bundle");
  });
});

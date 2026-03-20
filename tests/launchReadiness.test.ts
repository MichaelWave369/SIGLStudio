import { describe, expect, it } from "vitest";
import { createPublishingBundle, validatePublishingBundle } from "@/lib/publishingBundle";
import { builtInBlueprints, validatePipelineBlueprint } from "@/lib/pipelineBlueprints";
import { dryRunAutomationPack, validateAutomationPack } from "@/lib/automationPacks";

describe("v1.0 readiness regressions", () => {
  it("validates publishing bundle shape", () => {
    const bundle = createPublishingBundle({ bundle_type: "review-bundle", title: "Bundle", subtitle: "", description: "", source_context: "review", included_items: ["a"], theme_id: "observatory", provenance_summary: "", notes: "", next_actions: [] });
    expect(validatePublishingBundle(bundle).valid).toBe(true);
  });

  it("validates built-in blueprint shape", () => {
    expect(validatePipelineBlueprint(builtInBlueprints[0])).toBe(true);
  });

  it("reports automation dry-run warnings with policy mismatch", () => {
    const pack = { id: "p", name: "pack", schema_version: "1.0", validation_policy: { require_source_match: true, allow_destructive: false }, recipes: [{ id: "r", name: "recipe", description: "", source_scope: "global", output_target: "none", schema_version: "1.0", actions: [{ id: "a", kind: "export-handoff", params: {} }] }] } as any;
    expect(validateAutomationPack(pack).valid).toBe(true);
    const report = dryRunAutomationPack(pack, false);
    expect(report.reports[0].warnings.length).toBeGreaterThan(0);
  });
});

import { describe, expect, it } from "vitest";
import { dryRunAutomationPack } from "@/lib/automationPacks";

describe("automation packs", () => {
  it("produces dry-run summaries", () => {
    const report = dryRunAutomationPack({ id: "p", name: "Pack", schema_version: "1.0", validation_policy: { require_source_match: true, allow_destructive: false }, recipes: [{ id: "r", name: "Recipe", description: "", source_scope: "global", output_target: "none", schema_version: "0.8", actions: [{ id: "a", kind: "export-handoff", params: {} }] }] } as any, false);
    expect(report.recipe_count).toBe(1);
    expect(report.reports[0].warnings.length).toBeGreaterThan(0);
  });
});

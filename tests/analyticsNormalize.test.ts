import { describe, expect, it } from "vitest";
import { buildAnalyticsSummary } from "@/lib/analyticsNormalize";

describe("analytics normalize", () => {
  it("handles partial payloads", () => {
    const summary = buildAnalyticsSummary({ source: "validate", proof: { obligations: [{ type: "bridge", status: "pass" }] }, report: { issues: [1], warnings: [], graph: { nodes: [], edges: [] } } });
    expect(summary.obligations_by_type.bridge).toBe(1);
    expect(summary.issue_by_severity.issue).toBe(1);
  });
});

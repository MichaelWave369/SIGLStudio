import { describe, expect, it } from "vitest";
import { normalizeVibeProof } from "@/lib/vibeProofNormalize";
import { normalizeVibeReport } from "@/lib/vibeReportNormalize";

describe("vibe normalizers", () => {
  it("normalizes proof obligations", () => {
    const proof = normalizeVibeProof({ obligations: [{ type: "bridge", status: "pass" }, { type: "bridge", status: "warn" }] });
    expect(proof.obligations_by_type.bridge).toBe(2);
    expect(proof.obligations_by_status.pass).toBe(1);
  });

  it("normalizes report summary", () => {
    const report = normalizeVibeReport({ issues: [1, 2], warnings: [1], graph: { nodes: [1], edges: [1, 2] } });
    expect(report.summary.issue_count).toBe(2);
    expect(report.graph_summary.edge_count).toBe(2);
  });
});

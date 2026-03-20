import { describe, expect, it } from "vitest";
import { buildBatchReport, buildDiffReport } from "../lib/reportExport";

describe("report metadata generation", () => {
  it("builds diff report metadata", () => {
    const report = buildDiffReport({ leftHash: "a", rightHash: "b", engineMode: "mock", summary: { same: false, glyphCountDelta: 1, obligationCountDelta: 0, sequencePresenceDelta: false, sourceHashEqual: false, categories: ["structure changed"] } });
    expect(report.export_version).toBe("0.3");
  });

  it("builds batch report metadata", () => {
    const report = buildBatchReport({ results: [], engineMode: "mock" });
    expect(report.item_count).toBe(0);
  });
});

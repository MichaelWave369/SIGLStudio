import { describe, expect, it } from "vitest";
import { createReviewFlow, sortReviewSections, updateReviewStatus } from "@/lib/reviewFlow";

describe("reviewFlow", () => {
  it("creates deterministic section ordering", () => {
    const flow = createReviewFlow({ title: "Flow" });
    const sorted = sortReviewSections(flow.sections);
    expect(sorted[0].id).toBe("overview");
    expect(sorted.at(-1)?.id).toBe("next-actions");
  });

  it("updates status", () => {
    const flow = createReviewFlow({ title: "Flow" });
    expect(updateReviewStatus(flow, "approved").status).toBe("approved");
  });
});

import { describe, expect, it } from "vitest";
import { createReviewPack, validateReviewPack } from "../lib/reviewPack";

describe("review pack section generation/order", () => {
  it("creates deterministic section order", () => {
    const pack = createReviewPack({ project_id: "p1", title: "Review", notes: "", included_items: [] });
    expect(pack.sections[0].id).toBe("overview");
    expect(pack.sections[pack.sections.length - 1].id).toBe("next-actions");
  });

  it("validates review pack import", () => {
    expect(validateReviewPack({ nope: true }).valid).toBe(false);
  });
});

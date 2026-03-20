import { describe, expect, it } from "vitest";
import { builtInReviewTemplates, validateReviewTemplate } from "@/lib/reviewTemplates";

describe("review templates", () => {
  it("has deterministic built-in templates", () => {
    expect(builtInReviewTemplates.length).toBeGreaterThan(5);
    expect(builtInReviewTemplates[0].sections[0].order).toBe(0);
  });

  it("validates template shape", () => {
    expect(validateReviewTemplate(builtInReviewTemplates[0])).toBe(true);
    expect(validateReviewTemplate({})).toBe(false);
  });
});

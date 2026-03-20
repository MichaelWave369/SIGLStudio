import { describe, expect, it } from "vitest";
import { getNextStepGuidance } from "@/lib/workflowGuidance";

describe("workflow guidance", () => {
  it("returns route-aware guidance", () => {
    expect(getNextStepGuidance('/boards').length).toBeGreaterThan(0);
  });
});

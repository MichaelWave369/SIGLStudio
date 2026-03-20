import { describe, expect, it } from "vitest";
import { defaultStep, sessionSummaryHash, validateSessionImport } from "../lib/sessionStorage";

describe("session step orchestration", () => {
  it("creates default steps with checkpoint", () => {
    const step = defaultStep("compose");
    expect(step.checkpoints.length).toBe(1);
  });

  it("hashes session summary deterministically", () => {
    const session = { id: "1", title: "A", description: "B", created_at: "c", updated_at: "d", steps: [defaultStep("inspect")] };
    expect(sessionSummaryHash(session as any)).toBe(sessionSummaryHash(session as any));
  });

  it("validates import shape", () => {
    expect(validateSessionImport({} as any).valid).toBe(false);
  });
});

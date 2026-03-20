import { describe, expect, it } from "vitest";
import { createPresentationConfig, sessionToPresentation } from "../lib/presentationConfig";

describe("presentation slide shaping/order", () => {
  it("creates deterministic slide order", () => {
    const config = createPresentationConfig({
      title: "T",
      sourceType: "compose",
      focusMode: "balanced",
      slides: [{ id: "1", title: "A", source: "Φ" }, { id: "2", title: "B", source: "Ω" }]
    });
    expect(config.slides[0].id).toBe("1");
  });

  it("converts session to presentation", () => {
    const presentation = sessionToPresentation({
      id: "s1",
      title: "Session",
      description: "",
      created_at: "",
      updated_at: "",
      steps: [{ id: "a", type: "compose", title: "Compose", note: "", checkpoints: [] }]
    } as any);
    expect(presentation.sourceType).toBe("session");
  });
});

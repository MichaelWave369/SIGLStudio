import { describe, expect, it } from "vitest";
import { shouldShowEngineStatus } from "../lib/engineStatus";

describe("engine status visibility", () => {
  it("respects settings and panel toggle", () => {
    expect(shouldShowEngineStatus({ showEngineStatus: true, shortcutsEnabled: true, reducedMotion: false }, true)).toBe(true);
    expect(shouldShowEngineStatus({ showEngineStatus: false, shortcutsEnabled: true, reducedMotion: false }, true)).toBe(false);
  });
});

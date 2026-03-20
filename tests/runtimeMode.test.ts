import { describe, expect, it } from "vitest";
import { detectRuntimeMode } from "@/lib/runtimeMode";

describe("runtime mode", () => {
  it("defaults to web in test env", () => {
    expect(detectRuntimeMode()).toBe("web");
  });
});

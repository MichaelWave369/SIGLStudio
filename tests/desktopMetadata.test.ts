import { describe, expect, it } from "vitest";
import { getDesktopMetadata } from "@/lib/desktopMetadata";

describe("desktop metadata", () => {
  it("returns explicit metadata shape", () => {
    const meta = getDesktopMetadata();
    expect(meta.app_name).toBe("SIGLStudio");
    expect(meta.icon_placeholder_path).toContain("desktop/");
  });
});

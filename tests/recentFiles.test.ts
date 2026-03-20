import { describe, expect, it } from "vitest";
import { getRecentFiles, pushRecentFile } from "@/lib/recentFiles";

describe("recent files", () => {
  it("persists recent files", () => {
    localStorage.clear();
    pushRecentFile({ id: "f1", name: "one.json", kind: "import" });
    expect(getRecentFiles().length).toBe(1);
  });
});

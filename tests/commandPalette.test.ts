import { describe, expect, it } from "vitest";
import { filterCommands } from "../lib/commandPalette";

describe("command palette helpers", () => {
  it("filters commands by query", () => {
    const commands = [
      { id: "1", label: "Go to Compose" },
      { id: "2", label: "Go to Validate" }
    ];
    expect(filterCommands(commands, "validate")).toHaveLength(1);
  });
});

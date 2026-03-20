import { describe, expect, it } from "vitest";
import { getWorkflowSnapshots, pushWorkflowSnapshot } from "@/lib/workflowSnapshots";

describe("workflow snapshots", () => {
  it("persists snapshots", () => {
    localStorage.clear();
    pushWorkflowSnapshot({ id: "s1", route: "/boards", label: "Boards" });
    expect(getWorkflowSnapshots().length).toBe(1);
  });
});

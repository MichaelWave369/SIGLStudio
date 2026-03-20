import type { WorkflowSnapshot } from "@/lib/types";

const key = "siglstudio-workflow-snapshots";

export function getWorkflowSnapshots(): WorkflowSnapshot[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(key) ?? "[]") as WorkflowSnapshot[];
}

export function pushWorkflowSnapshot(input: Omit<WorkflowSnapshot, "created_at">) {
  const next = [{ ...input, created_at: new Date().toISOString() }, ...getWorkflowSnapshots()].slice(0, 20);
  localStorage.setItem(key, JSON.stringify(next));
}

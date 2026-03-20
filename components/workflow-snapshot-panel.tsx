"use client";

import { getWorkflowSnapshots } from "@/lib/workflowSnapshots";

export function WorkflowSnapshotPanel() {
  const snapshots = getWorkflowSnapshots();
  return (
    <div className="panel space-y-1 text-xs">
      <p className="font-semibold">Workflow Snapshots</p>
      {snapshots.slice(0, 8).map((snapshot) => <p key={snapshot.id}>{snapshot.label} · {snapshot.route}</p>)}
    </div>
  );
}

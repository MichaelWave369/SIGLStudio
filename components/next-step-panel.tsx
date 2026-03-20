"use client";

import { usePathname } from "next/navigation";
import { getNextStepGuidance } from "@/lib/workflowGuidance";

export function NextStepPanel() {
  const pathname = usePathname();
  const guidance = getNextStepGuidance(pathname);
  return (
    <div className="panel space-y-1 text-xs">
      <p className="font-semibold">Next Steps</p>
      {guidance.map((step) => <p key={step} className="text-muted">• {step}</p>)}
    </div>
  );
}

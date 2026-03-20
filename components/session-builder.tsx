"use client";

import type { GuidedSession } from "@/lib/types";
import { defaultStep } from "@/lib/sessionStorage";

export function SessionBuilder({ session, onChange }: { session: GuidedSession; onChange: (next: GuidedSession) => void }) {
  const addStep = () => onChange({ ...session, steps: [...session.steps, defaultStep("reflect")], updated_at: new Date().toISOString() });

  return (
    <div className="panel space-y-2">
      <h3 className="font-semibold">Session Builder</h3>
      <input value={session.title} onChange={(e) => onChange({ ...session, title: e.target.value })} className="w-full rounded border border-line bg-slate-950/50 p-2 text-sm" />
      <textarea value={session.description} onChange={(e) => onChange({ ...session, description: e.target.value })} className="w-full rounded border border-line bg-slate-950/50 p-2 text-sm" />
      <button className="rounded border border-line px-3 py-1 text-sm" onClick={addStep}>Add Step</button>
    </div>
  );
}

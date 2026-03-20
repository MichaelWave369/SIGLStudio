"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { GuidedSession, SessionStep } from "@/lib/types";
import { saveProgress } from "@/lib/sessionStorage";
import { SessionStepCard } from "@/components/session-step-card";

export function SessionRunner({ session, onChange }: { session: GuidedSession; onChange: (next: GuidedSession) => void }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const step = session.steps[index];

  const completedCount = useMemo(() => session.steps.flatMap((s) => s.checkpoints).filter((c) => c.completed).length, [session]);

  const setStep = (updater: (step: SessionStep) => SessionStep) => {
    const steps = session.steps.map((s, i) => (i === index ? updater(s) : s));
    const next = { ...session, steps, updated_at: new Date().toISOString() };
    onChange(next);
    saveProgress({ sessionId: session.id, currentStepIndex: index, completedCheckpointIds: steps.flatMap((s) => s.checkpoints.filter((c) => c.completed).map((c) => c.id)) });
  };

  const launch = () => {
    const routeMap: Record<string, string> = { compose: "/compose", inspect: "/compose", validate: "/validate", compare: "/diff", reflect: "/sessions", export: "/export", present: "/present" };
    router.push((routeMap[step.type] ?? "/") as any);
  };

  return (
    <div className="panel space-y-3">
      <div className="flex items-center justify-between text-sm">
        <p>Step {index + 1} / {session.steps.length}</p>
        <p>Completed checkpoints: {completedCount}</p>
      </div>
      <SessionStepCard
        step={step}
        onNote={(value) => setStep((s) => ({ ...s, note: value }))}
        onToggleCheckpoint={(id) => setStep((s) => ({ ...s, checkpoints: s.checkpoints.map((cp) => (cp.id === id ? { ...cp, completed: !cp.completed } : cp)) }))}
      />
      <div className="flex gap-2 text-sm">
        <button className="rounded border border-line px-3 py-1" onClick={() => setIndex((v) => Math.max(v - 1, 0))}>Prev</button>
        <button className="rounded border border-line px-3 py-1" onClick={() => setIndex((v) => Math.min(v + 1, session.steps.length - 1))}>Next</button>
        <button className="rounded border border-line px-3 py-1" onClick={launch}>Launch Route</button>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { SessionBuilder } from "@/components/session-builder";
import { SessionRunner } from "@/components/session-runner";
import { createSession, getSessions, saveSessions, sessionSummaryHash, validateSessionImport } from "@/lib/sessionStorage";
import { downloadTextFile } from "@/lib/utils";
import { sessionToPresentation } from "@/lib/presentationConfig";

export default function SessionsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const sessions = useMemo(() => getSessions(), []);
  const selected = sessions.find((s) => s.id === selectedId) ?? sessions[0] ?? null;

  if (!selected) {
    return (
      <main className="space-y-4">
        <div className="panel">
          <h2 className="text-xl font-semibold">Guided Sessions</h2>
          <p className="mt-2 text-sm text-muted">Create deterministic symbolic walkthrough sessions with checkpoints.</p>
          <button className="mt-3 rounded border border-line px-3 py-1 text-sm" onClick={() => { createSession("Starter Session", "Onboarding flow"); setSelectedId(null); location.reload(); }}>Create Starter Session</button>
        </div>
      </main>
    );
  }

  const update = (next: typeof selected) => {
    const mapped = sessions.map((s) => (s.id === next.id ? next : s));
    saveSessions(mapped);
    setSelectedId(next.id);
  };

  return (
    <main className="space-y-4">
      <div className="panel flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Guided Sessions</h2>
        <div className="flex gap-2 text-sm">
          <button className="rounded border border-line px-3 py-1" onClick={() => { createSession(`Session ${sessions.length + 1}`, "New session"); location.reload(); }}>New</button>
          <button className="rounded border border-line px-3 py-1" onClick={() => downloadTextFile(`${selected.title}.session.json`, JSON.stringify(selected, null, 2))}>Export Session</button>
          <button className="rounded border border-line px-3 py-1" onClick={() => downloadTextFile(`${selected.title}.session-summary.json`, JSON.stringify({ hash: sessionSummaryHash(selected), step_count: selected.steps.length }, null, 2))}>Export Summary</button>
          <button className="rounded border border-line px-3 py-1" onClick={() => downloadTextFile(`${selected.title}.presentation.json`, JSON.stringify(sessionToPresentation(selected), null, 2))}>Run as Presentation</button>
        </div>
      </div>
      <div className="panel">
        <input
          type="file"
          accept="application/json"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const parsed = JSON.parse(await file.text()) as unknown;
            const validated = validateSessionImport(parsed);
            if (!validated.valid || !validated.session) return alert(validated.reason);
            saveSessions([validated.session, ...sessions]);
            location.reload();
          }}
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
        <SessionBuilder session={selected} onChange={update} />
        <SessionRunner session={selected} onChange={update} />
      </div>
    </main>
  );
}

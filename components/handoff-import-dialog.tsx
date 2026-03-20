"use client";

import { useRouter } from "next/navigation";
import { validateHandoff } from "@/lib/handoff";

export function HandoffImportDialog() {
  const router = useRouter();
  return (
    <div className="panel text-sm">
      <label className="rounded border border-line px-3 py-1">
        Import Handoff
        <input
          type="file"
          accept="application/json"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const parsed = JSON.parse(await file.text()) as unknown;
            const validated = validateHandoff(parsed);
            if (!validated.valid || !validated.handoff) return alert(validated.reason);
            const routeMap: Record<string, string> = { sigil: "/compose", sequence: "/sequences", diff: "/diff", batch: "/batch", project: "/projects", "review-pack": "/review-packs", board: "/boards", session: "/sessions" };
            router.push((routeMap[validated.handoff.handoff_type] ?? "/") as any);
          }}
        />
      </label>
    </div>
  );
}

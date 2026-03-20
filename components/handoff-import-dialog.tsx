"use client";

import { useRouter } from "next/navigation";
import { validateHandoff } from "@/lib/handoff";
import { openTextFileFromUser } from "@/lib/fileSystemBridge";
import { pushRecentFile } from "@/lib/recentFiles";

export function HandoffImportDialog() {
  const router = useRouter();
  return (
    <div className="panel text-sm">
      <button
        className="rounded border border-line px-3 py-1"
        onClick={async () => {
          const file = await openTextFileFromUser("application/json,.json,.sigl");
          pushRecentFile({ id: file.name, name: file.name, kind: "handoff" });
          const parsed = JSON.parse(file.content) as unknown;
          const validated = validateHandoff(parsed);
          if (!validated.valid || !validated.handoff) return alert(validated.reason);
          const routeMap: Record<string, string> = {
            sigil: "/compose",
            sequence: "/sequences",
            diff: "/diff",
            batch: "/batch",
            project: "/projects",
            "review-pack": "/review-packs",
            "review-flow": "/review-flows",
            board: "/boards",
            session: "/sessions",
            "artifact-set": "/artifacts"
          };
          router.push((routeMap[validated.handoff.handoff_type] ?? "/") as never);
        }}
      >
        Import Handoff
      </button>
    </div>
  );
}

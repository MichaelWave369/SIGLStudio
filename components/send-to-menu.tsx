"use client";

import { useRouter } from "next/navigation";

export function SendToMenu({ source }: { source: string }) {
  const router = useRouter();
  const targets: Array<{ label: string; route: string }> = [
    { label: "Send to Boards", route: "/boards" },
    { label: "Send to Review Packs", route: "/review-packs" },
    { label: "Send to Review Flows", route: "/review-flows" },
    { label: "Send to Artifacts", route: "/artifacts" },
    { label: "Send to Present", route: "/present" }
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="text-muted">Send {source} to:</span>
      {targets.map((target) => <button key={target.route} className="rounded border border-line px-2 py-1" onClick={() => router.push(target.route as never)}>{target.label}</button>)}
    </div>
  );
}

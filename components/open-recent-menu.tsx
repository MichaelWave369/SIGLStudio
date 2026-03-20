"use client";

import { getRecentFiles } from "@/lib/recentFiles";

export function OpenRecentMenu() {
  const files = getRecentFiles();
  return (
    <div className="panel space-y-1 text-xs">
      <p className="font-semibold">Open Recent</p>
      {files.slice(0, 8).map((file) => <p key={`${file.id}-${file.opened_at}`} className="text-muted">{file.name}</p>)}
      {files.length === 0 ? <p className="text-muted">No recent files yet.</p> : null}
    </div>
  );
}

"use client";

import Link from "next/link";
import { getRecentItems } from "@/lib/recentItems";
import { getRecentFiles } from "@/lib/recentFiles";

export function RecentItemsPanel() {
  const recentItems = getRecentItems();
  const recentFiles = getRecentFiles();

  return (
    <div className="panel space-y-2 text-xs">
      <p className="font-semibold">Recent Items</p>
      {recentItems.slice(0, 5).map((item) => <Link key={`${item.id}-${item.updated_at}`} href={item.route as never} className="block text-muted hover:text-accent">{item.label}</Link>)}
      <p className="pt-2 font-semibold">Recent Files</p>
      {recentFiles.slice(0, 5).map((file) => <p key={`${file.id}-${file.opened_at}`} className="text-muted">{file.name} ({file.kind})</p>)}
    </div>
  );
}

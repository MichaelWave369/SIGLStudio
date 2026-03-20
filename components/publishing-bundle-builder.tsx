"use client";

import { useMemo, useState } from "react";
import type { PublishingBundleType } from "@/lib/types";
import { createPublishingBundle, bundleSummary } from "@/lib/publishingBundle";
import { PublishingBundleSummary } from "@/components/publishing-bundle-summary";
import { PublishingBundleSectionList } from "@/components/publishing-bundle-section-list";
import { downloadTextFile } from "@/lib/utils";

export function PublishingBundleBuilder() {
  const [bundleType, setBundleType] = useState<PublishingBundleType>("review-bundle");
  const [title, setTitle] = useState("SIGLStudio Bundle");
  const [items, setItems] = useState<string[]>(["overview", "artifacts", "review-notes"]);

  const bundle = useMemo(() => createPublishingBundle({
    bundle_type: bundleType,
    title,
    subtitle: "Local-first publishing bundle",
    description: "Deterministic publishing output",
    source_context: "publishing",
    included_items: items,
    theme_id: "observatory",
    provenance_summary: "Derived from local workstation context",
    notes: "",
    next_actions: ["Share bundle", "Review feedback"]
  }), [bundleType, title, items]);

  return (
    <div className="panel space-y-2 text-sm">
      <div className="flex flex-wrap gap-2">
        <select value={bundleType} onChange={(e) => setBundleType(e.target.value as PublishingBundleType)} className="rounded border border-line bg-slate-950/50 p-2 text-xs">
          <option value="review-bundle">review bundle</option>
          <option value="presentation-bundle">presentation bundle</option>
          <option value="project-handoff-bundle">project handoff bundle</option>
          <option value="board-snapshot-bundle">board snapshot bundle</option>
          <option value="research-bundle">research bundle</option>
          <option value="archive-bundle">archive bundle</option>
        </select>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="rounded border border-line bg-slate-950/50 p-2 text-xs" />
        <button className="rounded border border-line px-2 py-1 text-xs" onClick={() => setItems((prev) => [...prev, `item-${prev.length + 1}`])}>Add Item</button>
        <button className="rounded border border-line px-2 py-1 text-xs" onClick={() => downloadTextFile(`${bundle.title}.bundle.manifest.json`, JSON.stringify(bundle, null, 2))}>Export Manifest</button>
        <button className="rounded border border-line px-2 py-1 text-xs" onClick={() => downloadTextFile(`${bundle.title}.bundle.summary.json`, JSON.stringify(bundleSummary(bundle), null, 2))}>Export Summary</button>
      </div>
      <PublishingBundleSectionList items={items} />
      <PublishingBundleSummary bundle={bundle} />
    </div>
  );
}

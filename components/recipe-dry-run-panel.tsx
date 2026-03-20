"use client";

import { useState } from "react";
import { dryRunAutomationPack, getAutomationPacks } from "@/lib/automationPacks";
import { downloadTextFile } from "@/lib/utils";

export function RecipeDryRunPanel() {
  const packs = getAutomationPacks();
  const [report, setReport] = useState<ReturnType<typeof dryRunAutomationPack> | null>(null);

  return (
    <div className="panel space-y-2 text-sm">
      <h3 className="font-semibold">Dry Run</h3>
      {packs.map((pack) => <button key={pack.id} className="mr-2 rounded border border-line px-2 py-1 text-xs" onClick={() => {
        const r = dryRunAutomationPack(pack, true);
        setReport(r);
        downloadTextFile(`${pack.name}.dry-run.json`, JSON.stringify(r, null, 2));
      }}>{pack.name}</button>)}
      {report ? <p className="text-xs text-muted">Recipes: {report.recipe_count} · Actions: {report.action_count}</p> : null}
    </div>
  );
}

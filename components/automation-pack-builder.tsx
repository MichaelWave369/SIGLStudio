"use client";

import { useState } from "react";
import { getAutomationPacks, saveAutomationPacks } from "@/lib/automationPacks";
import type { AutomationPack } from "@/lib/types";
import { EmptyState } from "@/components/empty-state";

export function AutomationPackBuilder() {
  const [, setRefresh] = useState(0);
  const packs = getAutomationPacks();

  const createPack = () => {
    const pack: AutomationPack = {
      id: crypto.randomUUID(),
      name: `Automation Pack ${packs.length + 1}`,
      schema_version: "1.0",
      validation_policy: { require_source_match: true, allow_destructive: false },
      recipes: [{ id: crypto.randomUUID(), name: "Validate + Artifact", description: "", source_scope: "global", output_target: "artifact-set", schema_version: "1.0", actions: [{ id: crypto.randomUUID(), kind: "validate", params: {} }, { id: crypto.randomUUID(), kind: "create-artifact-set", params: { preset: "review-pack" } }] }]
    };
    saveAutomationPacks([pack, ...packs]);
    setRefresh((v) => v + 1);
  };

  return (
    <div className="panel space-y-2 text-sm">
      <button className="rounded border border-line px-2 py-1 text-xs" onClick={createPack}>Create Automation Pack</button>
      {packs.length === 0 ? <EmptyState title="No automation packs yet" description="Create a starter automation pack to run dry-run guardrails before execution." /> : packs.map((pack) => <p key={pack.id} className="text-xs">{pack.name} ({pack.recipes.length} recipes)</p>)}
    </div>
  );
}

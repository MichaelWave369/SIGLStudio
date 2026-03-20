"use client";

import type { ProjectPack } from "@/lib/types";
import { updateProject } from "@/lib/projectStorage";
import { packHash } from "@/lib/projectPack";
import { ProjectIntegrityCard } from "@/components/project-integrity-card";
import { downloadTextFile } from "@/lib/utils";
import { buildProjectIntegritySummary } from "@/lib/reportExport";
import { ProvenanceCard } from "@/components/provenance-card";
import { buildProvenance } from "@/lib/provenance";

export function ProjectDetail({ project, onBack }: { project: ProjectPack; onBack: () => void }) {
  const renameItem = (id: string) => {
    const name = prompt("Rename item");
    if (!name) return;
    const items = project.items.map((item) => (item.id === id ? { ...item, title: name } : item));
    updateProject({ ...project, items, updated_at: new Date().toISOString(), pack_hash: packHash(items, { name: project.name, description: project.description, version: project.version }) });
    location.reload();
  };

  const removeItem = (id: string) => {
    const items = project.items.filter((item) => item.id !== id);
    updateProject({ ...project, items, updated_at: new Date().toISOString(), pack_hash: packHash(items, { name: project.name, description: project.description, version: project.version }) });
    location.reload();
  };

  return (
    <div className="space-y-4">
      <div className="panel flex items-center justify-between">
        <h2 className="text-xl font-semibold">{project.name}</h2>
        <button className="rounded border border-line px-3 py-1 text-sm" onClick={onBack}>Back</button>
      </div>
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="panel space-y-2">
          {project.items.map((item) => (
            <div key={item.id} className="rounded border border-line bg-slate-950/40 p-2 text-sm">
              <p className="font-medium">{item.title} <span className="text-xs text-muted">({item.type})</span></p>
              <p className="font-mono text-xs text-muted">{item.source}</p>
              <div className="mt-1 flex gap-2 text-xs">
                <button onClick={() => renameItem(item.id)}>Rename</button>
                <button onClick={() => removeItem(item.id)} className="text-rose-300">Remove</button>
              </div>
            </div>
          ))}
          <div className="flex gap-2">
            <button className="rounded border border-line px-3 py-1 text-sm" onClick={() => downloadTextFile(`${project.name}.project.json`, JSON.stringify(project, null, 2))}>Export Project Pack JSON</button>
            <button className="rounded border border-line px-3 py-1 text-sm" onClick={() => downloadTextFile(`${project.name}.integrity.json`, JSON.stringify(buildProjectIntegritySummary(project), null, 2))}>Export Integrity Summary</button>
          </div>
        </div>
        <div className="space-y-4">
          <ProjectIntegrityCard project={project} />
          <ProvenanceCard meta={buildProvenance({ engine_mode: project.engine_mode_last_used, mode_reason: "Project pack local metadata", pack_hash: project.pack_hash, obligation_count: 0, issue_count: 0 })} />
        </div>
      </div>
    </div>
  );
}

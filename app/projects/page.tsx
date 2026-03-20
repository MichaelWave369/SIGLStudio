"use client";

import { useMemo, useState } from "react";
import { ImportProjectDialog } from "@/components/import-project-dialog";
import { ProjectDetail } from "@/components/project-detail";
import { ProjectList } from "@/components/project-list";
import { getProjects } from "@/lib/projectStorage";
import { SendToMenu } from "@/components/send-to-menu";

export default function ProjectsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const projects = useMemo(() => getProjects(), []);
  const selected = projects.find((project) => project.id === selectedId) ?? null;

  if (selected) {
    return <ProjectDetail project={selected} onBack={() => setSelectedId(null)} />;
  }

  return (
    <main className="space-y-4">
      <div className="panel">
        <h2 className="text-xl font-semibold">Project Packs</h2>
        <p className="mt-2 text-sm text-muted">Organize sigils and sequences into local-first project packs with deterministic integrity metadata.</p>
      </div>
      <SendToMenu source="project" />
      <ImportProjectDialog />
      <ProjectList projects={projects} onOpen={setSelectedId} />
    </main>
  );
}

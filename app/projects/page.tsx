"use client";

import { useMemo, useState } from "react";
import { ImportProjectDialog } from "@/components/import-project-dialog";
import { ProjectDetail } from "@/components/project-detail";
import { ProjectList } from "@/components/project-list";
import { getProjects } from "@/lib/projectStorage";
import { SendToMenu } from "@/components/send-to-menu";
import { PageIntro } from "@/components/page-intro";

export default function ProjectsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const projects = useMemo(() => getProjects(), []);
  const selected = projects.find((project) => project.id === selectedId) ?? null;

  if (selected) {
    return <ProjectDetail project={selected} onBack={() => setSelectedId(null)} />;
  }

  return (
    <main className="space-y-4">
      <PageIntro title="Project Packs" description="Organize sigils and sequences into local-first project packs with deterministic integrity metadata." cta="Tip: import a project, then flow into Review Packs or Boards." />
      <SendToMenu source="project" />
      <ImportProjectDialog />
      <ProjectList projects={projects} onOpen={setSelectedId} />
    </main>
  );
}

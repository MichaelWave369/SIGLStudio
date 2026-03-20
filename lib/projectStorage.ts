import type { ProjectPack, ProjectPackItem } from "@/lib/types";
import { storageKeys, getCurrentSource } from "@/lib/studioStorage";
import { createProjectPack, itemHash, packHash } from "@/lib/projectPack";

const projectsKey = "siglstudio-project-packs";

export function getProjects(): ProjectPack[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(projectsKey) ?? "[]") as ProjectPack[];
}

export function saveProjects(projects: ProjectPack[]) {
  localStorage.setItem(projectsKey, JSON.stringify(projects));
}

export function createProject(name: string, description: string, engineMode: "mock" | "vibe" = "mock") {
  const project = createProjectPack({ name, description, engineMode });
  const projects = getProjects();
  saveProjects([project, ...projects]);
  return project;
}

export function addCurrentDraftToProject(projectId: string, title: string) {
  const source = getCurrentSource();
  const projects = getProjects();
  const next = projects.map((project) => {
    if (project.id !== projectId) return project;
    const item: ProjectPackItem = {
      id: crypto.randomUUID(),
      type: "sigil",
      title,
      source,
      labels: ["draft"],
      hash: itemHash({ id: "", type: "sigil", title, source, labels: ["draft"] })
    };
    const items = [item, ...project.items];
    return {
      ...project,
      items,
      updated_at: new Date().toISOString(),
      pack_hash: packHash(items, { name: project.name, description: project.description, version: project.version })
    };
  });
  saveProjects(next);
}

export function deleteProject(id: string) {
  saveProjects(getProjects().filter((project) => project.id !== id));
}

export function updateProject(project: ProjectPack) {
  const next = getProjects().map((p) => (p.id === project.id ? project : p));
  saveProjects(next);
}

export function exportProjectPack(project: ProjectPack) {
  return JSON.stringify(project, null, 2);
}

"use client";

import { useState } from "react";
import type { ProjectPack } from "@/lib/types";
import { createProject, deleteProject, addCurrentDraftToProject } from "@/lib/projectStorage";

export function ProjectList({ projects, onOpen }: { projects: ProjectPack[]; onOpen: (id: string) => void }) {
  const [name, setName] = useState("New Project");
  const [description, setDescription] = useState("Local project pack");

  return (
    <div className="space-y-4">
      <div className="panel space-y-2">
        <h3 className="font-semibold">Create Project</h3>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded border border-line bg-slate-950/50 p-2 text-sm" />
        <input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded border border-line bg-slate-950/50 p-2 text-sm" />
        <button className="rounded border border-line px-3 py-1 text-sm" onClick={() => { createProject(name, description); location.reload(); }}>Create</button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {projects.map((project) => (
          <div key={project.id} className="panel space-y-2">
            <h4 className="font-semibold">{project.name}</h4>
            <p className="text-xs text-muted">{project.description}</p>
            <p className="text-xs">Items: {project.items.length}</p>
            <div className="flex gap-2 text-xs">
              <button onClick={() => onOpen(project.id)}>Open</button>
              <button onClick={() => { addCurrentDraftToProject(project.id, "Draft Import"); location.reload(); }}>Add current draft</button>
              <button className="text-rose-300" onClick={() => { deleteProject(project.id); location.reload(); }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { sigilExamples, temporalExampleSource } from "@/lib/data/atlas";
import { getCurrentSource, setCurrentSource, storageKeys } from "@/lib/studioStorage";
import { downloadTextFile } from "@/lib/utils";
import { filterCommands } from "@/lib/commandPalette";

interface Command {
  id: string;
  label: string;
  run: () => void;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const commands: Command[] = useMemo(
    () => [
      { id: "go-compose", label: "Go to Compose", run: () => router.push("/compose") },
      { id: "go-validate", label: "Go to Validate", run: () => router.push("/validate") },
      { id: "go-atlas", label: "Go to Atlas", run: () => router.push("/atlas") },
      { id: "go-seq", label: "Go to Sequences", run: () => router.push("/sequences") },
      { id: "go-export", label: "Go to Export", run: () => router.push("/export") },
      { id: "go-diff", label: "Go to Diff", run: () => router.push("/diff") },
      { id: "go-batch", label: "Go to Batch", run: () => router.push("/batch") },
      { id: "go-projects", label: "Go to Projects", run: () => router.push("/projects") },
      { id: "go-present", label: "Go to Present", run: () => router.push("/present") },
      { id: "go-sessions", label: "Go to Sessions", run: () => router.push("/sessions") },
      { id: "go-artifacts", label: "Go to Artifacts", run: () => router.push("/artifacts") },
      { id: "go-boards", label: "Go to Boards", run: () => router.push("/boards") },
      { id: "go-review", label: "Go to Review Packs", run: () => router.push("/review-packs") },
      { id: "go-review-flows", label: "Go to Review Flows", run: () => router.push("/review-flows") },
      { id: "insert-basic", label: "Insert basic sigil example", run: () => setCurrentSource(sigilExamples.basic) },
      { id: "insert-coupled", label: "Insert coupled sigil example", run: () => setCurrentSource(sigilExamples.coupled) },
      { id: "insert-recursive", label: "Insert recursive sigil example", run: () => setCurrentSource(sigilExamples.recursive) },
      { id: "insert-temporal", label: "Insert temporal example", run: () => setCurrentSource(temporalExampleSource) },
      { id: "copy-source", label: "Copy current sigil source", run: () => void navigator.clipboard.writeText(getCurrentSource()) },
      { id: "export-json", label: "Export JSON", run: () => downloadTextFile("sigil.json", JSON.stringify({ source: getCurrentSource() }, null, 2)) },
      {
        id: "export-svg",
        label: "Export SVG",
        run: () => downloadTextFile("sigil.svg", `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='120'><text x='20' y='70'>${getCurrentSource()}</text></svg>`)
      },
      {
        id: "toggle-engine",
        label: "Toggle mock/vibe status view",
        run: () => {
          const current = localStorage.getItem(storageKeys.engineStatusOpen) === "true";
          localStorage.setItem(storageKeys.engineStatusOpen, String(!current));
          window.dispatchEvent(new Event("studio-engine-visibility"));
        }
      },
      { id: "template-board", label: "Starter template: Board", run: () => router.push("/boards") },
      { id: "template-review-flow", label: "Starter template: Review Flow", run: () => router.push("/review-flows") },
      { id: "template-artifact-set", label: "Starter template: Artifact Set", run: () => router.push("/artifacts") },
      { id: "template-desktop-handoff", label: "Starter template: Desktop Handoff", run: () => router.push("/review-packs") },
      { id: "clear-draft", label: "Clear current draft", run: () => setCurrentSource("") }
    ],
    [router]
  );

  const filtered = filterCommands(commands, query);

  if (!open) {
    return (
      <button className="rounded-lg border border-line px-3 py-1 text-xs hover:border-accent/40" onClick={() => setOpen(true)}>
        ⌘K
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-20" onClick={() => setOpen(false)}>
      <div className="w-full max-w-2xl rounded-2xl border border-line bg-panel p-4" onClick={(e) => e.stopPropagation()}>
        <div className="mb-2 text-xs text-muted">Command Palette · {pathname}</div>
                <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && filtered[0]) {
              filtered[0].run();
              setOpen(false);
            }
          }}
          placeholder="Search command..."
          className="mb-3 w-full rounded-lg border border-line bg-slate-950/60 p-2 text-sm"
        />
        <div className="max-h-72 space-y-1 overflow-auto">
          {filtered.map((command) => (
            <button
              key={command.id}
              className="block w-full rounded-lg border border-transparent px-3 py-2 text-left text-sm hover:border-accent/30 hover:bg-slate-900/60"
              onClick={() => {
                command.run();
                setOpen(false);
              }}
            >
              {command.label}
            </button>
          ))}
          {filtered.length === 0 ? <p className="text-sm text-muted">No matching command.</p> : null}
        </div>
      </div>
    </div>
  );
}

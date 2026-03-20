"use client";

import { useState } from "react";
import { glyphShortcuts } from "@/lib/keyboardShortcuts";

export function KeyboardShortcutsHelp() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button className="rounded-lg border border-line px-3 py-1 text-xs hover:border-accent/40" onClick={() => setOpen(true)}>
        Keyboard Shortcuts
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="panel w-full max-w-xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Glyph Shortcuts</h3>
              <button className="text-sm text-muted" onClick={() => setOpen(false)}>Close</button>
            </div>
            <p className="mb-3 text-sm text-muted">Use Alt + key on Compose/Sequences editors.</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {glyphShortcuts.map((item) => (
                <div key={item.key} className="rounded-md border border-line bg-slate-950/40 p-2">
                  <span className="font-mono">Alt + {item.key}</span> → {item.glyph} <span className="text-muted">({item.label})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { clearAllLocalStudioData, getSettings, setSettings } from "@/lib/studioStorage";
import type { StudioSettings } from "@/lib/types";

export function SettingsPanel() {
  const [open, setOpen] = useState(false);
  const [settings, setLocalSettings] = useState<StudioSettings>(getSettings());

  useEffect(() => {
    const next = getSettings();
    setLocalSettings(next);
    document.body.classList.toggle("reduce-motion", next.reducedMotion);
  }, []);

  const update = (partial: Partial<StudioSettings>) => {
    const next = { ...settings, ...partial };
    setLocalSettings(next);
    setSettings(next);
    document.body.classList.toggle("reduce-motion", next.reducedMotion);
  };

  return (
    <>
      <button className="rounded-lg border border-line px-3 py-1 text-xs hover:border-accent/40" onClick={() => setOpen(true)}>
        Settings
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="panel w-full max-w-md space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Studio Settings</h3>
              <button className="text-sm text-muted" onClick={() => setOpen(false)}>Close</button>
            </div>
            <label className="flex items-center justify-between text-sm">
              Show engine status
              <input type="checkbox" checked={settings.showEngineStatus} onChange={(e) => update({ showEngineStatus: e.target.checked })} />
            </label>
            <label className="flex items-center justify-between text-sm">
              Enable keyboard shortcuts
              <input type="checkbox" checked={settings.shortcutsEnabled} onChange={(e) => update({ shortcutsEnabled: e.target.checked })} />
            </label>
            <label className="flex items-center justify-between text-sm">
              Reduced motion
              <input type="checkbox" checked={settings.reducedMotion} onChange={(e) => update({ reducedMotion: e.target.checked })} />
            </label>
            <button
              className="rounded-lg border border-rose-400/40 px-3 py-1 text-sm text-rose-300"
              onClick={() => {
                clearAllLocalStudioData();
                location.reload();
              }}
            >
              Clear local data
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

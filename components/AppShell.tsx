"use client";

import Link from "next/link";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CommandPalette } from "@/components/command-palette";
import { GlobalEngineStatus } from "@/components/GlobalEngineStatus";
import { SettingsPanel } from "@/components/SettingsPanel";
import { KeyboardShortcutsHelp } from "@/components/keyboard-shortcuts-help";
import { storageKeys } from "@/lib/studioStorage";
import { cn } from "@/lib/utils";

const nav = [
  ["/", "Home"],
  ["/compose", "Compose"],
  ["/validate", "Validate"],
  ["/atlas", "Atlas"],
  ["/sequences", "Sequences"],
  ["/export", "Export"],
  ["/diff", "Diff"],
  ["/batch", "Batch"],
  ["/projects", "Projects"],
  ["/present", "Present"],
  ["/sessions", "Sessions"],
  ["/artifacts", "Artifacts"]
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    localStorage.setItem(storageKeys.route, pathname);
  }, [pathname]);

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-5 py-8">
      <header className="sticky top-0 z-40 mb-6 rounded-2xl border border-line bg-[#090d17]/90 p-4 backdrop-blur">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">SIGL Studio v0.4</p>
            <h1 className="text-2xl font-semibold">Symbolic Observatory</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <GlobalEngineStatus />
            <CommandPalette />
            <KeyboardShortcutsHelp />
            <SettingsPanel />
          </div>
        </div>
        <p className="mb-2 text-xs text-muted">Context: {pathname}</p>
        <nav className="flex flex-wrap gap-2">
          {nav.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-sm transition",
                pathname === href ? "border-accent/50 bg-accent/10 text-accent" : "border-line hover:border-accent/40"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
    </div>
  );
}

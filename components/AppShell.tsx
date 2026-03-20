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
import { pushRecentItem } from "@/lib/recentItems";
import { RuntimeBadge } from "@/components/runtime-badge";
import { WorkflowJumpMenu } from "@/components/workflow-jump-menu";
import { RecentItemsPanel } from "@/components/recent-items-panel";
import { WorkflowSnapshotPanel } from "@/components/workflow-snapshot-panel";
import { pushWorkflowSnapshot } from "@/lib/workflowSnapshots";
import { DesktopActionsPanel } from "@/components/desktop-actions-panel";
import { DesktopAboutPanel } from "@/components/desktop-about-panel";
import { OpenRecentMenu } from "@/components/open-recent-menu";
import { NextStepPanel } from "@/components/next-step-panel";

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
  ["/artifacts", "Artifacts"],
  ["/boards", "Boards"],
  ["/review-packs", "Review Packs"],
  ["/review-flows", "Review Flows"],
  ["/analytics", "Analytics"],
  ["/recipes", "Recipes"],
  ["/publishing", "Publishing"]
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    localStorage.setItem(storageKeys.route, pathname);
    pushRecentItem({ id: pathname, route: pathname, label: pathname });
    pushWorkflowSnapshot({ id: crypto.randomUUID(), route: pathname, label: `Visited ${pathname}` });
  }, [pathname]);

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-5 py-8">
      <header className="sticky top-0 z-40 mb-6 rounded-2xl border border-line bg-[#090d17]/90 p-4 backdrop-blur">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">SIGL Studio v0.9</p>
              <RuntimeBadge />
            </div>
            <h1 className="text-2xl font-semibold">1.0 Readiness and Publishing Bundles</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <GlobalEngineStatus />
            <CommandPalette />
            <KeyboardShortcutsHelp />
            <SettingsPanel />
          </div>
        </div>
        <p className="mb-2 text-xs text-muted">Context: {pathname}</p>
        <WorkflowJumpMenu />
        <nav className="mt-2 flex flex-wrap gap-2">
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
      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <div>{children}</div>
        <aside className="space-y-4">
          <NextStepPanel />
          <RecentItemsPanel />
          <OpenRecentMenu />
          <WorkflowSnapshotPanel />
          <DesktopActionsPanel />
          <DesktopAboutPanel />
        </aside>
      </div>
    </div>
  );
}

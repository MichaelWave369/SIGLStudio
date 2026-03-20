export interface DesktopMenuAction {
  id: string;
  label: string;
  description: string;
}

export const desktopMenuActions: DesktopMenuAction[] = [
  { id: "open-file", label: "Open Local File", description: "Use desktop file picker for JSON/SIGL files." },
  { id: "save-current", label: "Save Current", description: "Save current workspace payload to disk." },
  { id: "open-recent", label: "Open Recent", description: "Access recent local files tracked by the workstation." },
  { id: "desktop-help", label: "Desktop Help", description: "Show runtime/shortcut and file association guidance." }
];

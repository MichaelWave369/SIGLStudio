import { desktopMenuActions } from "@/lib/desktopMenuModel";

export function DesktopActionsPanel() {
  return (
    <div className="panel space-y-2 text-xs">
      <p className="font-semibold">Desktop Actions</p>
      {desktopMenuActions.map((action) => (
        <div key={action.id} className="rounded border border-line p-2">
          <p>{action.label}</p>
          <p className="text-muted">{action.description}</p>
        </div>
      ))}
    </div>
  );
}

import { getDesktopMetadata } from "@/lib/desktopMetadata";

export function DesktopAboutPanel() {
  const metadata = getDesktopMetadata();
  return (
    <div className="panel space-y-1 text-xs">
      <p className="font-semibold">Desktop About</p>
      <p>App: {metadata.app_name} v{metadata.app_version}</p>
      <p>Runtime: {metadata.runtime_mode}</p>
      <p>Icon path: {metadata.icon_placeholder_path}</p>
    </div>
  );
}

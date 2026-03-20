import type { DesktopMetadata } from "@/lib/types";
import { detectRuntimeMode } from "@/lib/runtimeMode";

export function getDesktopMetadata(): DesktopMetadata {
  return {
    app_name: "SIGLStudio",
    app_version: "0.9.0",
    runtime_mode: detectRuntimeMode(),
    icon_placeholder_path: "desktop/icon-placeholder.txt"
  };
}

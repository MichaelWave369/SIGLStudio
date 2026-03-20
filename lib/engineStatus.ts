import type { StudioSettings } from "@/lib/types";

export function shouldShowEngineStatus(settings: StudioSettings, panelVisible: boolean): boolean {
  return settings.showEngineStatus && panelVisible;
}

import type { DraftEntry, StudioSettings } from "@/lib/types";

export const storageKeys = {
  source: "siglstudio-current-source",
  drafts: "siglstudio-drafts-v2",
  sequence: "siglstudio-current-sequence",
  engineStatusOpen: "siglstudio-engine-status-open",
  settings: "siglstudio-settings",
  route: "siglstudio-current-route"
} as const;

const defaultSettings: StudioSettings = {
  showEngineStatus: true,
  shortcutsEnabled: true,
  reducedMotion: false
};

export function getCurrentSource(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(storageKeys.source) ?? "";
}

export function setCurrentSource(source: string) {
  localStorage.setItem(storageKeys.source, source);
  window.dispatchEvent(new CustomEvent("studio-source-updated", { detail: source }));
}

export function getDrafts(): DraftEntry[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(storageKeys.drafts) ?? "[]") as DraftEntry[];
}

export function setDrafts(drafts: DraftEntry[]) {
  localStorage.setItem(storageKeys.drafts, JSON.stringify(drafts));
}

export function getSettings(): StudioSettings {
  if (typeof window === "undefined") return defaultSettings;
  const parsed = JSON.parse(localStorage.getItem(storageKeys.settings) ?? "null") as StudioSettings | null;
  return { ...defaultSettings, ...parsed };
}

export function setSettings(next: StudioSettings) {
  localStorage.setItem(storageKeys.settings, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("studio-settings-updated", { detail: next }));
}

export function clearAllLocalStudioData() {
  Object.values(storageKeys).forEach((key) => localStorage.removeItem(key));
  window.dispatchEvent(new Event("studio-data-cleared"));
}

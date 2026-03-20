import type { RuntimeMode } from "@/lib/types";

export function detectRuntimeMode(): RuntimeMode {
  if (typeof window === "undefined") return "web";
  const desktopHint = (window as Window & { __SIGL_DESKTOP__?: boolean }).__SIGL_DESKTOP__;
  const userAgent = navigator.userAgent.toLowerCase();
  if (desktopHint || userAgent.includes(" electron/") || userAgent.includes(" tauri")) {
    return "desktop";
  }
  return "web";
}

export function isDesktopRuntime(): boolean {
  return detectRuntimeMode() === "desktop";
}

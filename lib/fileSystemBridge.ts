import { isDesktopRuntime } from "@/lib/runtimeMode";

type DesktopBridge = {
  openTextFile?: () => Promise<{ name: string; content: string }>;
  saveTextFile?: (payload: { suggestedName: string; content: string }) => Promise<void>;
};

function getDesktopBridge(): DesktopBridge | null {
  if (typeof window === "undefined") return null;
  return (window as Window & { siglDesktopBridge?: DesktopBridge }).siglDesktopBridge ?? null;
}

export async function openTextFileFromUser(accept = ".json,.sigl,.txt") {
  const desktop = getDesktopBridge();
  if (isDesktopRuntime() && desktop?.openTextFile) return desktop.openTextFile();

  if (typeof window === "undefined") throw new Error("File open unavailable in server runtime.");
  return new Promise<{ name: string; content: string }>((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return reject(new Error("No file selected."));
      const reader = new FileReader();
      reader.onload = () => resolve({ name: file.name, content: String(reader.result ?? "") });
      reader.onerror = () => reject(new Error("Unable to read file."));
      reader.readAsText(file);
    };
    input.click();
  });
}

export async function saveTextFileFromUser(input: { suggestedName: string; content: string }) {
  const desktop = getDesktopBridge();
  if (isDesktopRuntime() && desktop?.saveTextFile) return desktop.saveTextFile(input);

  const { downloadTextFile } = await import("@/lib/utils");
  downloadTextFile(input.suggestedName, input.content);
}

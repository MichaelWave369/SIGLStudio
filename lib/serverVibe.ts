import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { writeFile, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { InspectResult, ValidationResult } from "@/lib/types";
import { mockInspect, mockValidate } from "@/lib/mockEngine";

const execFileAsync = promisify(execFile);

async function withTempVibeFile<T>(source: string, run: (path: string) => Promise<T>) {
  const dir = await mkdtemp(join(tmpdir(), "siglstudio-"));
  const filePath = join(dir, "input.vibe");
  await writeFile(filePath, source, "utf8");
  try {
    return await run(filePath);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

export async function isVibeAvailable(): Promise<boolean> {
  if (process.env.ENABLE_VIBE_CLI !== "true") return false;
  try {
    await execFileAsync("vibec", ["--version"]);
    return true;
  } catch {
    return false;
  }
}

export async function validateSigilServer(source: string): Promise<ValidationResult> {
  if (!(await isVibeAvailable())) return mockValidate(source);

  try {
    return await withTempVibeFile(source, async (filePath) => {
      const { stdout } = await execFileAsync("vibec", ["sigil-validate", filePath, "--report", "json"]);
      const parsed = JSON.parse(stdout) as Omit<ValidationResult, "mode">;
      return { ...parsed, mode: "vibe" };
    });
  } catch {
    return mockValidate(source);
  }
}

export async function inspectSigilServer(source: string): Promise<InspectResult> {
  if (!(await isVibeAvailable())) return mockInspect(source);

  try {
    return await withTempVibeFile(source, async (filePath) => {
      const { stdout } = await execFileAsync("vibec", ["sigil-inspect", filePath, "--report", "json"]);
      const parsed = JSON.parse(stdout) as Omit<InspectResult, "mode">;
      return { ...parsed, mode: "vibe" };
    });
  } catch {
    return mockInspect(source);
  }
}

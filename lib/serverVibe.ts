import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { writeFile, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { InspectResult, ValidationResult } from "@/lib/types";
import { mockInspect, mockValidate } from "@/lib/mockEngine";
import { normalizeInspectResult, normalizeValidationResult } from "@/lib/engineNormalize";

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
  if (!(await isVibeAvailable())) return mockValidate(source, "Vibe CLI not found or ENABLE_VIBE_CLI is false.");

  const fallback = mockValidate(source);
  try {
    return await withTempVibeFile(source, async (filePath) => {
      const { stdout } = await execFileAsync("vibec", ["sigil-validate", filePath, "--report", "json"]);
      const raw = JSON.parse(stdout) as unknown;
      return normalizeValidationResult({ ...(raw as object), mode: "vibe", modeReason: "Validated via Vibe CLI." }, fallback);
    });
  } catch {
    return mockValidate(source, "Vibe validate command failed; using mock mode.");
  }
}

export async function inspectSigilServer(source: string): Promise<InspectResult> {
  if (!(await isVibeAvailable())) return mockInspect(source, "Vibe CLI not found or ENABLE_VIBE_CLI is false.");

  const fallback = mockInspect(source);
  try {
    return await withTempVibeFile(source, async (filePath) => {
      const { stdout } = await execFileAsync("vibec", ["sigil-inspect", filePath, "--report", "json"]);
      const raw = JSON.parse(stdout) as unknown;
      return normalizeInspectResult({ ...(raw as object), mode: "vibe", modeReason: "Inspected via Vibe CLI." }, fallback);
    });
  } catch {
    return mockInspect(source, "Vibe inspect command failed; using mock mode.");
  }
}

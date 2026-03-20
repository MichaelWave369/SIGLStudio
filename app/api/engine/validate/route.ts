import { NextResponse } from "next/server";
import { validateSigilServer } from "@/lib/serverVibe";

export async function POST(req: Request) {
  try {
    const { source } = (await req.json()) as { source: string };
    const result = await validateSigilServer(source ?? "");
    return NextResponse.json(result);
  } catch {
    const result = await validateSigilServer("");
    return NextResponse.json(result);
  }
}

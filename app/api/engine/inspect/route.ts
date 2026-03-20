import { NextResponse } from "next/server";
import { inspectSigilServer } from "@/lib/serverVibe";

export async function POST(req: Request) {
  try {
    const { source } = (await req.json()) as { source: string };
    const result = await inspectSigilServer(source ?? "");
    return NextResponse.json(result);
  } catch {
    const result = await inspectSigilServer("");
    return NextResponse.json(result);
  }
}

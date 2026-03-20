import { NextResponse } from "next/server";
import { inspectSigilServer } from "@/lib/serverVibe";

export async function POST(req: Request) {
  const { source } = (await req.json()) as { source: string };
  const result = await inspectSigilServer(source ?? "");
  return NextResponse.json(result);
}

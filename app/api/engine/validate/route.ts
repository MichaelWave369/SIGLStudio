import { NextResponse } from "next/server";
import { validateSigilServer } from "@/lib/serverVibe";

export async function POST(req: Request) {
  const { source } = (await req.json()) as { source: string };
  const result = await validateSigilServer(source ?? "");
  return NextResponse.json(result);
}

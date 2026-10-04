import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { getSettings, saveSettings } from "@/lib/admin/db";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  if (!isAuthenticated()) return unauthorized();
  return NextResponse.json(getSettings());
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  const body = await req.json();
  saveSettings(body);
  return NextResponse.json({ ok: true });
}

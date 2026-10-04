import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/admin/auth";

export async function POST() {
  clearAuthCookie();
  return NextResponse.json({ ok: true });
}

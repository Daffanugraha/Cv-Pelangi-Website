import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials, setAuthCookie } from "@/lib/admin/auth";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (verifyCredentials(username, password)) {
    setAuthCookie();
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false, error: "Username atau password salah." }, { status: 401 });
}

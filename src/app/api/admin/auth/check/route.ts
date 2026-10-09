import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";

export async function GET() {
  if (isAuthenticated()) {
    return NextResponse.json({ ok: true, active: true });
  }

  return NextResponse.json(
    { ok: false, active: false, error: "Sesi login telah berakhir (lebih dari 2 jam)." },
    { status: 401 }
  );
}

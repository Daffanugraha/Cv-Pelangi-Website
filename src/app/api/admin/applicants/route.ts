import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import {
  getApplicants,
  updateApplicantStatus,
  deleteApplicant,
} from "@/lib/admin/db";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  if (!isAuthenticated()) return unauthorized();
  return NextResponse.json(getApplicants());
}

export async function PATCH(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "ID dan status diperlukan" }, { status: 400 });
    }
    updateApplicantStatus(id, status);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error updating applicant:", err);
    return NextResponse.json({ error: "Gagal memperbarui status" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID diperlukan" }, { status: 400 });
    }
    deleteApplicant(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error deleting applicant:", err);
    return NextResponse.json({ error: "Gagal menghapus pelamar" }, { status: 500 });
  }
}

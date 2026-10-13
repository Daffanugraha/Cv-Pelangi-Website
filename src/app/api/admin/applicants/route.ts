import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import {
  getApplicants,
  updateApplicantStatus,
  updateApplicant,
  deleteApplicant,
  JobApplicantItem,
} from "@/lib/admin/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  if (!isAuthenticated()) return unauthorized();
  return NextResponse.json(getApplicants(), {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });
}

export async function PATCH(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  try {
    const body = await req.json();
    const { id, status, cvUrl, fileName, portfolioUrl } = body;
    if (!id) {
      return NextResponse.json({ error: "ID pelamar diperlukan" }, { status: 400 });
    }

    const patch: Partial<JobApplicantItem> = {};
    if (status !== undefined) patch.status = status;
    if (cvUrl !== undefined) patch.cvUrl = cvUrl;
    if (fileName !== undefined) patch.fileName = fileName;
    if (portfolioUrl !== undefined) patch.portfolioUrl = portfolioUrl;

    const updated = updateApplicant(id, patch);
    return NextResponse.json({ ok: true, data: updated });
  } catch (err) {
    console.error("Error updating applicant:", err);
    return NextResponse.json({ error: "Gagal memperbarui data pelamar" }, { status: 500 });
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

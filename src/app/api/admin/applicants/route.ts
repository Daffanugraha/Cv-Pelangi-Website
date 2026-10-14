import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import {
  getApplicants,
  updateApplicant,
  deleteApplicant,
  JobApplicantItem,
} from "@/lib/admin/db";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function mapSupabaseRow(row: any): JobApplicantItem {
  return {
    id: row.id,
    jobId: row.job_id || "",
    jobTitle: row.job_title || "",
    name: row.name || "",
    birthPlaceDate: row.birth_place_date || "",
    maritalStatus: row.marital_status || "Single",
    age: row.age || "",
    phone: row.phone || "",
    email: row.email || "",
    address: row.address || "",
    education: row.education || "",
    educationMajor: row.education_major || "",
    hasExperience: row.has_experience || "yes",
    experience: row.experience || "",
    experience1: row.experience1 || "",
    experience2: row.experience2 || "",
    experience3: row.experience3 || "",
    reference1: row.reference1 || "",
    reference2: row.reference2 || "",
    referencePhone: row.reference_phone || "",
    referenceRelation: row.reference_relation || "",
    readyNoWorkNoPay: row.ready_no_work_no_pay || "Ya",
    readyOvertime: row.ready_overtime || "Ya",
    expectedSalary: row.expected_salary || "",
    expectedFacilities: row.expected_facilities || "",
    threeWeaknesses: row.three_weaknesses || "",
    threeStrengths: row.three_strengths || "",
    fiveSkills: row.five_skills || "",
    strengths: row.strengths || "",
    weaknesses: row.weaknesses || "",
    hasPortfolio: row.has_portfolio || "no",
    portfolioUrl: row.portfolio_url || "",
    cvUrl: row.cv_url || "",
    fileName: row.file_name || "",
    status: row.status || "new",
    createdAt: row.created_at || new Date().toISOString(),
  };
}

export async function GET() {
  if (!isAuthenticated()) return unauthorized();

  const applicantMap = new Map<string, JobApplicantItem>();

  // 1. Ambil data lokal terlebih dahulu
  for (const item of getApplicants()) {
    applicantMap.set(item.id, item);
  }

  // 2. Timpa dan perkaya dengan data real-time dari Supabase
  try {
    const sb = getSupabaseAdmin();
    if (sb) {
      const { data, error } = await sb
        .from("job_applicants")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data)) {
        for (const row of data) {
          applicantMap.set(row.id, mapSupabaseRow(row));
        }
      }
    }
  } catch (err) {
    console.warn("[Supabase GET Applicants Fallback]:", err);
  }

  // 3. Urutkan dari yang paling baru
  const merged = Array.from(applicantMap.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return NextResponse.json(merged, {
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

    // 1. Update di Supabase
    try {
      const sb = getSupabaseAdmin();
      if (sb) {
        const updatePayload: Record<string, any> = {
          updated_at: new Date().toISOString(),
        };
        if (status !== undefined) updatePayload.status = status;
        if (cvUrl !== undefined) updatePayload.cv_url = cvUrl;
        if (fileName !== undefined) updatePayload.file_name = fileName;
        if (portfolioUrl !== undefined) updatePayload.portfolio_url = portfolioUrl;

        await sb.from("job_applicants").update(updatePayload).eq("id", id);
      }
    } catch (err) {
      console.warn("[Supabase PATCH Applicant Error]:", err);
    }

    // 2. Update di store lokal
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

    // 1. Delete dari Supabase
    try {
      const sb = getSupabaseAdmin();
      if (sb) {
        await sb.from("job_applicants").delete().eq("id", id);
      }
    } catch (err) {
      console.warn("[Supabase DELETE Applicant Error]:", err);
    }

    // 2. Delete dari store lokal
    deleteApplicant(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error deleting applicant:", err);
    return NextResponse.json({ error: "Gagal menghapus pelamar" }, { status: 500 });
  }
}

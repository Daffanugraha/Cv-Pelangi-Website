import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/admin/auth";
import {
  getJobsFromSupabase,
  getJobs,
  addJobItem,
  updateJobItem,
  deleteJobItem,
  slugifyJobTitle,
  CareerJobItem,
} from "@/lib/admin/db";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  if (!isAuthenticated()) return unauthorized();
  try {
    const jobs = await getJobsFromSupabase();
    return NextResponse.json(jobs, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch {
    return NextResponse.json(getJobs(), {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  try {
    const body = await req.json();
    if (!body.title || !body.division) {
      return NextResponse.json({ error: "Title and division are required" }, { status: 400 });
    }

    const baseSlug = (body.id || body.slug || slugifyJobTitle(body.title) || "posisi").trim();
    const cleanSlug = slugifyJobTitle(baseSlug);

    // Dapatkan data lowongan terkini untuk memastikan slug bersih dan unik tanpa angka acak
    const existingJobs = await getJobsFromSupabase();
    let newId = cleanSlug;
    let counter = 2;
    while (existingJobs.some((j) => j.id.toLowerCase() === newId.toLowerCase())) {
      newId = `${cleanSlug}-${counter}`;
      counter++;
    }
    const createdAt = new Date().toISOString();

    const newJob: CareerJobItem = {
      id: newId,
      title: body.title.trim(),
      division: body.division.trim(),
      type: (body.type || "Full-Time").trim(),
      location: (body.location || "Bizpark C17-C19, Sidoarjo").trim(),
      isOpen: body.isOpen !== false,
      qualifications: Array.isArray(body.qualifications) ? body.qualifications : [],
      responsibilities: Array.isArray(body.responsibilities) ? body.responsibilities : [],
      createdAt,
    };

    // 1. Simpan langsung ke Supabase (Source of Truth terpusat di Cloud)
    try {
      const sb = getSupabaseAdmin();
      if (sb) {
        const { error: sbError } = await sb.from("career_jobs").insert({
          id: newJob.id,
          title: newJob.title,
          division: newJob.division,
          type: newJob.type,
          location: newJob.location,
          qualifications: newJob.qualifications,
          responsibilities: newJob.responsibilities,
          is_open: newJob.isOpen,
          created_at: newJob.createdAt,
          updated_at: newJob.createdAt,
        });
        if (sbError) {
          console.warn("[Supabase Insert Job Error]:", sbError.message);
        }
      }
    } catch (err) {
      console.warn("[Supabase Insert Exception]:", err);
    }

    // 2. Simpan juga ke cache lokal
    addJobItem(newJob);

    try {
      revalidatePath("/karir", "layout");
      revalidatePath("/api/jobs");
    } catch {}

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  return PATCH(req);
}

export async function PATCH(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  try {
    const { id, ...patch } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    // 1. Update langsung di Supabase (Source of Truth)
    try {
      const sb = getSupabaseAdmin();
      if (sb) {
        const updatePayload: Record<string, any> = {
          updated_at: new Date().toISOString(),
        };
        if (patch.title !== undefined) updatePayload.title = patch.title;
        if (patch.division !== undefined) updatePayload.division = patch.division;
        if (patch.type !== undefined) updatePayload.type = patch.type;
        if (patch.location !== undefined) updatePayload.location = patch.location;
        if (patch.isOpen !== undefined) updatePayload.is_open = patch.isOpen;
        if (patch.qualifications !== undefined) updatePayload.qualifications = patch.qualifications;
        if (patch.responsibilities !== undefined) updatePayload.responsibilities = patch.responsibilities;

        const { error: sbUpdErr } = await sb.from("career_jobs").update(updatePayload).eq("id", id);
        if (sbUpdErr) {
          console.warn("[Supabase Update Job Error]:", sbUpdErr.message);
        }
      }
    } catch (err) {
      console.warn("[Supabase Update Exception]:", err);
    }

    // 2. Update cache lokal
    const updated = updateJobItem(id, patch);

    try {
      revalidatePath("/karir", "layout");
      revalidatePath("/api/jobs");
    } catch {}

    return NextResponse.json(updated || { id, ...patch, isOpen: patch.isOpen !== false });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  try {
    let id = req.nextUrl.searchParams.get("id");
    if (!id) {
      try {
        const body = await req.json();
        id = body?.id;
      } catch {
        // body might be empty when called with query param
      }
    }

    if (!id) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    // 1. Hapus langsung dari Supabase (Source of Truth)
    try {
      const sb = getSupabaseAdmin();
      if (sb) {
        const { error: sbDelErr } = await sb.from("career_jobs").delete().eq("id", id);
        if (sbDelErr) {
          console.warn("[Supabase Delete Job Error]:", sbDelErr.message);
        }
      }
    } catch (err) {
      console.warn("[Supabase Delete Exception]:", err);
    }

    // 2. Hapus dari cache lokal
    deleteJobItem(id);

    try {
      revalidatePath("/karir", "layout");
      revalidatePath("/api/jobs");
    } catch {}

    return NextResponse.json({ ok: true, id });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}

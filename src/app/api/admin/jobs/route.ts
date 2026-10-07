import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { getJobs, addJobItem, updateJobItem, deleteJobItem } from "@/lib/admin/db";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  if (!isAuthenticated()) return unauthorized();
  return NextResponse.json(getJobs());
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  try {
    const body = await req.json();
    if (!body.title || !body.division) {
      return NextResponse.json({ error: "Title and division are required" }, { status: 400 });
    }

    const job = addJobItem({
      title: body.title,
      division: body.division,
      type: body.type || "Full-Time (WFO)",
      location: body.location || "Bizpark C17-C19, Sidoarjo",
      isOpen: body.isOpen !== false,
      qualifications: Array.isArray(body.qualifications) ? body.qualifications : [],
      responsibilities: Array.isArray(body.responsibilities) ? body.responsibilities : [],
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  try {
    const { id, ...patch } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }
    updateJobItem(id, patch);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }
    deleteJobItem(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}

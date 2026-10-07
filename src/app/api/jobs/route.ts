import { NextResponse } from "next/server";
import { getJobs } from "@/lib/admin/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const jobs = getJobs();
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

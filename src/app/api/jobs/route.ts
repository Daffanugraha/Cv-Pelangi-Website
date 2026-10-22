import { NextResponse } from "next/server";
import { getJobsFromSupabase, getJobs } from "@/lib/admin/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const jobs = await getJobsFromSupabase();
    return NextResponse.json(jobs, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (error) {
    return NextResponse.json(getJobs(), { status: 200 });
  }
}

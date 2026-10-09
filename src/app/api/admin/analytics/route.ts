import { NextRequest, NextResponse } from "next/server";
import { getAnalyticsData } from "@/lib/admin/analytics";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rangeParam = searchParams.get("range");

    let rangeDays: 7 | 14 | 30 = 7;
    if (rangeParam === "14") rangeDays = 14;
    else if (rangeParam === "30") rangeDays = 30;

    const data = getAnalyticsData(rangeDays);

    return NextResponse.json(data);
  } catch (err) {
    console.error("Admin analytics fetch error:", err);
    return NextResponse.json(
      { error: "Gagal memuat data analitik pengunjung" },
      { status: 500 }
    );
  }
}

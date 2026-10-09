import { NextRequest, NextResponse } from "next/server";
import { recordPageView } from "@/lib/admin/analytics";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { path, referrer, device, visitorId } = body || {};

    if (!path || typeof path !== "string") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    recordPageView(path, {
      referrer: typeof referrer === "string" ? referrer : undefined,
      device: device === "desktop" || device === "tablet" ? device : "mobile",
      visitorId: typeof visitorId === "string" ? visitorId : undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Analytics track error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

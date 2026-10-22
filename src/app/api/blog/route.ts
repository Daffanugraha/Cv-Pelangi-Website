import { NextResponse } from "next/server";
import { getBlogArticlesFromSupabase, getBlogArticles } from "@/lib/admin/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const articles = await getBlogArticlesFromSupabase();
    return NextResponse.json(articles, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch {
    return NextResponse.json(getBlogArticles(), {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  }
}

import { NextResponse } from "next/server";
import { getBlogArticles } from "@/lib/admin/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const articles = getBlogArticles();
  return NextResponse.json(articles, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });
}

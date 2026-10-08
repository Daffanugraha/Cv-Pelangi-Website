import { NextResponse } from "next/server";
import { getBlogArticles } from "@/lib/admin/db";

export async function GET() {
  const articles = getBlogArticles();
  return NextResponse.json(articles);
}

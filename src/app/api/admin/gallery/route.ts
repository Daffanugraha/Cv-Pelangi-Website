import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { getGallery, addGalleryItem, deleteGalleryItem, updateGalleryItem } from "@/lib/admin/db";

export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || undefined;
  const items = getGallery(type);
  return NextResponse.json(items, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  const body = await req.json();
  const item = addGalleryItem({
    title: body.title ?? "",
    category: body.category ?? "Umum",
    technique: body.technique ?? "",
    imageUrl: body.imageUrl ?? "",
    fileName: body.fileName ?? "",
    featured: body.featured ?? false,
    galleryType: body.galleryType || "produk",
    videoUrl: body.videoUrl ?? "",
    tag: body.tag ?? "",
  });
  return NextResponse.json(item, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  const { id, ...patch } = await req.json();
  updateGalleryItem(id, patch);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  const { id } = await req.json();
  deleteGalleryItem(id);
  return NextResponse.json({ ok: true });
}

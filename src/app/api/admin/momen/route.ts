import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import {
  getMomenAlbums,
  addMomenAlbum,
  updateMomenAlbum,
  deleteMomenAlbum,
  MomenAlbumItem,
} from "@/lib/admin/db";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

// GET all momen albums (Admin)
export async function GET() {
  if (!isAuthenticated()) return unauthorized();
  return NextResponse.json(getMomenAlbums());
}

// POST create new momen album
export async function POST(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  try {
    const body = await req.json();
    const { title, desc, category, photos, isHighlight } = body;

    if (!title?.trim() || !desc?.trim()) {
      return NextResponse.json(
        { error: "Judul dan deskripsi momen wajib diisi" },
        { status: 400 }
      );
    }

    if (!Array.isArray(photos) || photos.length === 0) {
      return NextResponse.json(
        { error: "Setiap momen minimal harus memiliki 1 gambar/foto" },
        { status: 400 }
      );
    }

    // Validate and sanitize photos
    const sanitizedPhotos = photos.map((p: any, idx: number) => ({
      src: p.src?.trim() || "",
      title: p.title?.trim() || p.cardTitle?.trim() || `Foto ${idx + 1}`,
      cardTitle: p.cardTitle?.trim() || p.title?.trim() || `Foto ${idx + 1}`,
      caption: p.caption?.trim() || p.cardDesc?.trim() || "",
      cardDesc: p.cardDesc?.trim() || p.caption?.trim() || "",
      alt: p.alt?.trim() || p.title?.trim() || `Foto ${idx + 1}`,
    })).filter((p: any) => Boolean(p.src));

    if (sanitizedPhotos.length === 0) {
      return NextResponse.json(
        { error: "Foto harus memiliki URL atau gambar yang valid" },
        { status: 400 }
      );
    }

    const newAlbum = addMomenAlbum({
      title: title.trim(),
      desc: desc.trim(),
      category: category?.trim() || "",
      photos: sanitizedPhotos,
      isHighlight: isHighlight !== false,
    });

    return NextResponse.json({ ok: true, data: newAlbum }, { status: 201 });
  } catch (err) {
    console.error("Error creating momen:", err);
    return NextResponse.json(
      { error: "Gagal membuat momen baru" },
      { status: 500 }
    );
  }
}

// PUT update existing momen album
export async function PUT(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  try {
    const body = await req.json();
    const { id, title, desc, category, photos, isHighlight } = body;

    if (!id) {
      return NextResponse.json({ error: "ID momen diperlukan" }, { status: 400 });
    }

    const patch: Partial<MomenAlbumItem> = {};
    if (title !== undefined) patch.title = title.trim();
    if (desc !== undefined) patch.desc = desc.trim();
    if (category !== undefined) patch.category = category.trim();
    if (isHighlight !== undefined) patch.isHighlight = Boolean(isHighlight);

    if (Array.isArray(photos)) {
      patch.photos = photos.map((p: any, idx: number) => ({
        src: p.src?.trim() || "",
        title: p.title?.trim() || p.cardTitle?.trim() || `Foto ${idx + 1}`,
        cardTitle: p.cardTitle?.trim() || p.title?.trim() || `Foto ${idx + 1}`,
        caption: p.caption?.trim() || p.cardDesc?.trim() || "",
        cardDesc: p.cardDesc?.trim() || p.caption?.trim() || "",
        alt: p.alt?.trim() || p.title?.trim() || `Foto ${idx + 1}`,
      })).filter((p: any) => Boolean(p.src));
    }

    updateMomenAlbum(id, patch);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error updating momen:", err);
    return NextResponse.json(
      { error: "Gagal memperbarui momen" },
      { status: 500 }
    );
  }
}

// DELETE momen album
export async function DELETE(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID momen diperlukan" }, { status: 400 });
    }

    deleteMomenAlbum(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error deleting momen:", err);
    return NextResponse.json(
      { error: "Gagal menghapus momen" },
      { status: 500 }
    );
  }
}

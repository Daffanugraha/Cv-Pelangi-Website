import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import {
  getBlogArticles,
  addBlogArticle,
  updateBlogArticle,
  deleteBlogArticle,
} from "@/lib/admin/db";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  return NextResponse.json(getBlogArticles(), {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  try {
    const body = await req.json();
    if (!body.title || !body.desc) {
      return NextResponse.json(
        { error: "Judul dan ringkasan artikel wajib diisi" },
        { status: 400 }
      );
    }
    const item = addBlogArticle({
      title: body.title,
      slug: body.slug,
      category: body.category || "Kabar Perusahaan",
      categoryKey: body.categoryKey || "kabar-perusahaan",
      tag: body.tag || body.category,
      date: body.date,
      readTime: body.readTime || "4 Menit Baca",
      views: body.views || "1 Views",
      commentsCount: body.commentsCount || "0 Komentar",
      author: body.author || "Admin Pelangi UV",
      desc: body.desc,
      img: body.img || "/images/placeholder.jpg",
      isFeatured: !!body.isFeatured,
      technicalChips: body.technicalChips || [],
      content: Array.isArray(body.content) && body.content.length > 0 ? body.content : [body.desc],
      keyTakeaways: body.keyTakeaways || [],
    });
    return NextResponse.json(item, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Gagal membuat artikel" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  try {
    const { id, ...patch } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID artikel wajib disertakan" }, { status: 400 });
    }
    updateBlogArticle(id, patch);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Gagal memperbarui artikel" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID artikel wajib disertakan" }, { status: 400 });
    }
    deleteBlogArticle(id);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Gagal menghapus artikel" }, { status: 500 });
  }
}

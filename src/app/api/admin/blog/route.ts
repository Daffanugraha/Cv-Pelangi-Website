import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/admin/auth";
import {
  getBlogArticlesFromSupabase,
  getBlogArticles,
  addBlogArticle,
  updateBlogArticle,
  deleteBlogArticle,
  BlogArticleItem,
} from "@/lib/admin/db";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  if (!isAuthenticated()) return unauthorized();
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

    const idSlug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const newArticle: BlogArticleItem = {
      id: `art_${Date.now()}`,
      slug: idSlug || `berita-${Date.now()}`,
      title: body.title.trim(),
      category: body.category || "Kabar Perusahaan",
      categoryKey: body.categoryKey || "kabar-perusahaan",
      tag: body.tag || body.category,
      date:
        body.date ||
        new Date().toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
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
    };

    // 1. Simpan ke Supabase
    try {
      const sb = getSupabaseAdmin();
      if (sb) {
        const { error: sbError } = await sb.from("blog_articles").insert({
          id: newArticle.id,
          slug: newArticle.slug,
          title: newArticle.title,
          category: newArticle.category,
          category_key: newArticle.categoryKey || null,
          date: newArticle.date,
          read_time: newArticle.readTime || null,
          views: newArticle.views || null,
          comments_count: newArticle.commentsCount || null,
          author: newArticle.author || "Admin Pelangi UV",
          description: newArticle.desc || "",
          image_url: newArticle.img || "",
          is_featured: !!newArticle.isFeatured,
          key_takeaways: newArticle.keyTakeaways || [],
          content: newArticle.content || [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        if (sbError) {
          console.warn("[Supabase Insert Blog Error]:", sbError.message);
        }
      }
    } catch (err) {
      console.warn("[Supabase Insert Blog Exception]:", err);
    }

    // 2. Simpan juga ke cache lokal
    addBlogArticle(newArticle);

    try {
      revalidatePath("/blog", "layout");
      revalidatePath("/api/blog");
    } catch {}

    return NextResponse.json(newArticle, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Gagal membuat artikel" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  return PATCH(req);
}

export async function PATCH(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  try {
    const { id, ...patch } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID artikel wajib disertakan" }, { status: 400 });
    }

    // 1. Update di Supabase
    try {
      const sb = getSupabaseAdmin();
      if (sb) {
        const updatePayload: Record<string, any> = {
          updated_at: new Date().toISOString(),
        };
        if (patch.title !== undefined) updatePayload.title = patch.title;
        if (patch.slug !== undefined) updatePayload.slug = patch.slug;
        if (patch.category !== undefined) updatePayload.category = patch.category;
        if (patch.categoryKey !== undefined) updatePayload.category_key = patch.categoryKey;
        if (patch.date !== undefined) updatePayload.date = patch.date;
        if (patch.readTime !== undefined) updatePayload.read_time = patch.readTime;
        if (patch.views !== undefined) updatePayload.views = patch.views;
        if (patch.commentsCount !== undefined) updatePayload.comments_count = patch.commentsCount;
        if (patch.author !== undefined) updatePayload.author = patch.author;
        if (patch.desc !== undefined) updatePayload.description = patch.desc;
        if (patch.img !== undefined) updatePayload.image_url = patch.img;
        if (patch.isFeatured !== undefined) updatePayload.is_featured = !!patch.isFeatured;
        if (patch.keyTakeaways !== undefined) updatePayload.key_takeaways = patch.keyTakeaways;
        if (patch.content !== undefined) updatePayload.content = patch.content;

        await sb
          .from("blog_articles")
          .update(updatePayload)
          .or(`id.eq.${id},slug.eq.${id}`);
      }
    } catch (err) {
      console.warn("[Supabase PATCH Blog Exception]:", err);
    }

    // 2. Update di cache lokal
    updateBlogArticle(id, patch);

    try {
      revalidatePath("/blog", "layout");
      revalidatePath("/api/blog");
    } catch {}

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Gagal memperbarui artikel" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  try {
    let id = req.nextUrl.searchParams.get("id");
    if (!id) {
      try {
        const body = await req.json();
        id = body?.id;
      } catch {}
    }
    if (!id) {
      return NextResponse.json({ error: "ID artikel wajib disertakan" }, { status: 400 });
    }

    // 1. Delete dari Supabase
    try {
      const sb = getSupabaseAdmin();
      if (sb) {
        await sb
          .from("blog_articles")
          .delete()
          .or(`id.eq.${id},slug.eq.${id}`);
      }
    } catch (err) {
      console.warn("[Supabase DELETE Blog Exception]:", err);
    }

    // 2. Delete dari cache lokal
    deleteBlogArticle(id);

    try {
      revalidatePath("/blog", "layout");
      revalidatePath("/api/blog");
    } catch {}

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Gagal menghapus artikel" }, { status: 500 });
  }
}

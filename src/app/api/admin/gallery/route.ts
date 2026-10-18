import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/admin/auth";
import {
  getGallery,
  addGalleryItem,
  deleteGalleryItem,
  updateGalleryItem,
  GalleryItem,
} from "@/lib/admin/db";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || undefined;

  try {
    const sb = getSupabaseAdmin();
    if (sb) {
      // 1. Jika minta type=beranda -> ambil dari gallery_beranda_videos
      if (type === "beranda") {
        const { data, error } = await sb
          .from("gallery_beranda_videos")
          .select("*")
          .order("sort_order", { ascending: true });

        if (!error && Array.isArray(data) && data.length > 0) {
          const formatted: GalleryItem[] = data.map((d: any) => ({
            id: d.id,
            title: d.title,
            category: d.category || "Finishing",
            technique: d.description || "",
            imageUrl: d.image_url,
            fileName: d.image_url?.split("/").pop() || "media.jpg",
            createdAt: d.created_at,
            order: d.sort_order ?? 0,
            featured: d.featured !== false,
            galleryType: "beranda",
            videoUrl: d.video_url || "",
            tag: d.tag || d.category || "Finishing",
            objectPosition: "center",
          }));
          return NextResponse.json(formatted, {
            headers: {
              "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            },
          });
        }
      }

      // 2. Jika minta type=produk -> ambil dari gallery_products
      if (type === "produk") {
        const { data, error } = await sb
          .from("gallery_products")
          .select("*")
          .order("sort_order", { ascending: true });

        if (!error && Array.isArray(data) && data.length > 0) {
          const formatted: GalleryItem[] = data.map((d: any) => ({
            id: d.id,
            title: d.title,
            category: d.category_label || d.category || "Umum",
            technique: d.technique || d.tag || "",
            imageUrl: d.image_url,
            fileName: d.file_name || d.image_url?.split("/").pop() || "product.jpg",
            createdAt: d.created_at,
            order: d.sort_order ?? 0,
            featured: d.featured !== false,
            galleryType: "produk",
            videoUrl: "",
            tag: d.tag || d.technique || "",
            objectPosition: d.object_position || "center",
            description: d.description || undefined,
            badges: d.badges || undefined,
            material: d.material || undefined,
            notes: d.notes || undefined,
            highlight: d.highlight || undefined,
            paperSuitability: d.paper_suitability || undefined,
            resultCharacteristics: d.result_characteristics || undefined,
            alternativeOption: d.alternative_option || undefined,
          }));
          return NextResponse.json(formatted, {
            headers: {
              "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            },
          });
        }
      }

      // 3. Jika tanpa filter type / minta all -> gabungkan keduanya
      if (!type || type === "all") {
        const [bRes, pRes] = await Promise.all([
          sb
            .from("gallery_beranda_videos")
            .select("*")
            .order("sort_order", { ascending: true }),
          sb
            .from("gallery_products")
            .select("*")
            .order("sort_order", { ascending: true }),
        ]);

        const bData = Array.isArray(bRes.data) ? bRes.data : [];
        const pData = Array.isArray(pRes.data) ? pRes.data : [];

        if (bData.length > 0 || pData.length > 0) {
          const bFormatted: GalleryItem[] = bData.map((d: any) => ({
            id: d.id,
            title: d.title,
            category: d.category || "Finishing",
            technique: d.description || "",
            imageUrl: d.image_url,
            fileName: d.image_url?.split("/").pop() || "media.jpg",
            createdAt: d.created_at,
            order: d.sort_order ?? 0,
            featured: d.featured !== false,
            galleryType: "beranda",
            videoUrl: d.video_url || "",
            tag: d.tag || d.category || "Finishing",
            objectPosition: "center",
          }));

          const pFormatted: GalleryItem[] = pData.map((d: any) => ({
            id: d.id,
            title: d.title,
            category: d.category_label || d.category || "Umum",
            technique: d.technique || d.tag || "",
            imageUrl: d.image_url,
            fileName: d.file_name || d.image_url?.split("/").pop() || "product.jpg",
            createdAt: d.created_at,
            order: d.sort_order ?? 0,
            featured: d.featured !== false,
            galleryType: "produk",
            videoUrl: "",
            tag: d.tag || d.technique || "",
            objectPosition: d.object_position || "center",
            description: d.description || undefined,
            badges: d.badges || undefined,
            material: d.material || undefined,
            notes: d.notes || undefined,
            highlight: d.highlight || undefined,
            paperSuitability: d.paper_suitability || undefined,
            resultCharacteristics: d.result_characteristics || undefined,
            alternativeOption: d.alternative_option || undefined,
          }));

          return NextResponse.json([...bFormatted, ...pFormatted], {
            headers: {
              "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            },
          });
        }
      }
    }
  } catch (sbErr) {
    console.warn("[Supabase Gallery GET Error]:", sbErr);
  }

  // Fallback ke local data jika Supabase belum ada data / offline
  const items = getGallery(type);
  return NextResponse.json(items, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  try {
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
      objectPosition: body.objectPosition || "center",
    });

    // Sinkronisasi Real-Time ke Supabase
    try {
      const sb = getSupabaseAdmin();
      if (sb) {
        if (item.galleryType === "beranda") {
          let embedUrl = item.videoUrl || "";
          if (embedUrl) {
            const match = embedUrl.match(/\/(reel|p)\/([a-zA-Z0-9_\-]+)/);
            if (match) {
              embedUrl = `https://www.instagram.com/reel/${match[2]}/embed/`;
            } else if (!embedUrl.endsWith("/embed/")) {
              embedUrl = embedUrl.endsWith("/") ? `${embedUrl}embed/` : `${embedUrl}/embed/`;
            }
          }
          await sb.from("gallery_beranda_videos").upsert({
            id: item.id,
            title: item.title,
            category: item.category || "Finishing",
            tag: item.tag || item.category || "Finishing",
            description: item.technique || "",
            duration: "0:45 • Pelangi UV",
            capacity: "CV Pelangi UV Showcase",
            source: "Instagram Reels",
            image_url: item.imageUrl,
            video_url: item.videoUrl || "",
            embed_url: embedUrl,
            sort_order: item.order ?? 0,
            featured: item.featured !== false,
            created_at: item.createdAt || new Date().toISOString(),
          });
        } else {
          await sb.from("gallery_products").upsert({
            id: item.id,
            title: item.title,
            category: item.category,
            category_label: item.category,
            technique: item.technique || item.tag || "",
            tag: item.tag || item.technique || "",
            image_url: item.imageUrl,
            file_name: item.fileName || null,
            object_position: item.objectPosition || "center",
            sort_order: item.order ?? 0,
            featured: item.featured !== false,
            created_at: item.createdAt || new Date().toISOString(),
          });
        }
      }
    } catch (sbErr) {
      console.warn("[Supabase POST Gallery Error]:", sbErr);
    }

    try {
      revalidatePath("/", "layout");
      revalidatePath("/galeri", "layout");
      revalidatePath("/galeri/pengaplikasian-produk", "layout");
      revalidatePath("/api/admin/gallery");
      revalidatePath("/api/instagram");
    } catch {}

    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Gagal menambah media galeri" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  try {
    const body = await req.json();
    const { id, ...patch } = body;
    if (!id) {
      return NextResponse.json({ error: "ID media diperlukan" }, { status: 400 });
    }

    updateGalleryItem(id, patch);

    // Sinkronisasi Update ke Supabase
    try {
      const sb = getSupabaseAdmin();
      if (sb) {
        const bUpdate: Record<string, any> = {};
        const pUpdate: Record<string, any> = {};

        if (patch.title !== undefined) {
          bUpdate.title = patch.title;
          pUpdate.title = patch.title;
        }
        if (patch.featured !== undefined) {
          bUpdate.featured = patch.featured;
          pUpdate.featured = patch.featured;
        }
        if (patch.category !== undefined) {
          bUpdate.category = patch.category;
          pUpdate.category = patch.category;
          pUpdate.category_label = patch.category;
        }
        if (patch.tag !== undefined) {
          bUpdate.tag = patch.tag;
          pUpdate.tag = patch.tag;
        }
        if (patch.technique !== undefined) {
          bUpdate.description = patch.technique;
          pUpdate.technique = patch.technique;
        }
        if (patch.imageUrl !== undefined) {
          bUpdate.image_url = patch.imageUrl;
          pUpdate.image_url = patch.imageUrl;
        }
        if (patch.videoUrl !== undefined) {
          bUpdate.video_url = patch.videoUrl;
          let embedUrl = patch.videoUrl;
          if (embedUrl) {
            const match = embedUrl.match(/\/(reel|p)\/([a-zA-Z0-9_\-]+)/);
            if (match) {
              embedUrl = `https://www.instagram.com/reel/${match[2]}/embed/`;
            } else if (!embedUrl.endsWith("/embed/")) {
              embedUrl = embedUrl.endsWith("/") ? `${embedUrl}embed/` : `${embedUrl}/embed/`;
            }
            bUpdate.embed_url = embedUrl;
          }
        }
        if (patch.objectPosition !== undefined) {
          pUpdate.object_position = patch.objectPosition;
        }
        if (patch.order !== undefined) {
          bUpdate.sort_order = patch.order;
          pUpdate.sort_order = patch.order;
        }

        if (Object.keys(bUpdate).length > 0) {
          await sb.from("gallery_beranda_videos").update(bUpdate).eq("id", id);
        }
        if (Object.keys(pUpdate).length > 0) {
          await sb.from("gallery_products").update(pUpdate).eq("id", id);
        }
      }
    } catch (sbErr) {
      console.warn("[Supabase PATCH Gallery Error]:", sbErr);
    }

    try {
      revalidatePath("/", "layout");
      revalidatePath("/galeri", "layout");
      revalidatePath("/galeri/pengaplikasian-produk", "layout");
      revalidatePath("/api/admin/gallery");
      revalidatePath("/api/instagram");
    } catch {}

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Gagal update media galeri" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  let id = req.nextUrl.searchParams.get("id");
  if (!id) {
    try {
      const body = await req.json();
      id = body?.id;
    } catch {}
  }
  if (!id) {
    return NextResponse.json({ error: "ID media diperlukan" }, { status: 400 });
  }

  deleteGalleryItem(id);

  // Sinkronisasi Hapus dari Supabase
  try {
    const sb = getSupabaseAdmin();
    if (sb) {
      await Promise.all([
        sb.from("gallery_beranda_videos").delete().eq("id", id),
        sb.from("gallery_products").delete().eq("id", id),
      ]);
    }
  } catch (sbErr) {
    console.warn("[Supabase DELETE Gallery Error]:", sbErr);
  }

  try {
    revalidatePath("/", "layout");
    revalidatePath("/layanan", "layout");
    revalidatePath("/galeri", "layout");
    revalidatePath("/galeri/pengaplikasian-produk", "layout");
    revalidatePath("/api/admin/gallery");
    revalidatePath("/api/instagram");
  } catch {}

  return NextResponse.json({ ok: true });
}

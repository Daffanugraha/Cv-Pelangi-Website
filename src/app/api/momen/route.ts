import { NextResponse } from "next/server";
import { getMomenAlbums, MomenAlbumItem } from "@/lib/admin/db";
import { MOMEN_FILTERS } from "@/lib/data/galeriMomen";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    let albums: MomenAlbumItem[] = [];

    // 1. Coba baca dari Supabase
    try {
      const sb = getSupabaseAdmin();
      if (sb) {
        const { data, error } = await sb
          .from("momen_albums")
          .select("*")
          .order("order", { ascending: true });

        if (!error && Array.isArray(data) && data.length > 0) {
          albums = data.map((d: any) => ({
            id: d.id,
            category: d.category,
            title: d.title,
            desc: d.description || d.desc || "",
            photos: Array.isArray(d.photos) ? d.photos : [],
            isHighlight: d.is_highlight !== false,
            order: d.order || 0,
            createdAt: d.created_at,
          }));
        }
      }
    } catch (sbErr) {
      console.warn("[Supabase Momen Fetch Fallback]:", sbErr);
    }

    // 2. Fallback jika Supabase kosong
    if (albums.length === 0) {
      albums = getMomenAlbums();
    }

    // Generate dynamic filters based on existing albums and default filters
    const existingFilterKeys = new Set(MOMEN_FILTERS.map((f) => f.key));
    const dynamicFilters = [...MOMEN_FILTERS];

    albums.forEach((album) => {
      if (album.category && !existingFilterKeys.has(album.category)) {
        existingFilterKeys.add(album.category);
        dynamicFilters.push({
          key: album.category,
          label: album.title,
        });
      }
    });

    return NextResponse.json(
      {
        albums,
        filters: dynamicFilters,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (err) {
    console.error("Error fetching momen:", err);
    return NextResponse.json(
      { error: "Gagal mengambil data momen" },
      { status: 500 }
    );
  }
}

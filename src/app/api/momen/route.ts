import { NextResponse } from "next/server";
import { getMomenAlbums } from "@/lib/admin/db";
import { MOMEN_FILTERS } from "@/lib/data/galeriMomen";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const albums = getMomenAlbums();

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

    return NextResponse.json({
      albums,
      filters: dynamicFilters,
    });
  } catch (err) {
    console.error("Error fetching momen:", err);
    return NextResponse.json(
      { error: "Gagal mengambil data momen" },
      { status: 500 }
    );
  }
}

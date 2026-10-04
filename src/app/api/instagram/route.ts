import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "instagram_reels.json");

interface ReelItem {
  id: string;
  shortcode: string;
  source: string;
  tag: string;
  duration: string;
  title: string;
  desc: string;
  capacity: string;
  img: string;
  videoUrl: string;
  embedUrl: string;
  date?: string;
  isReal?: boolean;
}

function getStoredReels(): ReelItem[] {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      return JSON.parse(fileData);
    }
  } catch (err) {
    console.error("Error reading stored reels:", err);
  }
  return [];
}

function saveStoredReels(reels: ReelItem[]) {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(reels, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving reels:", err);
  }
}

/**
 * GET /api/instagram
 * Fetches the latest Instagram reels either from live Meta Graph API (if token provided)
 * or from the local real data cache.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const forceRefresh = searchParams.get("refresh") === "true";
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  // 1. If Meta Instagram Graph API Token is configured, attempt live fetch
  if (accessToken && (forceRefresh || true)) {
    try {
      const apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=12&access_token=${accessToken}`;
      const res = await fetch(apiUrl, { next: { revalidate: 1800 } });
      
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data)) {
          const liveReels: ReelItem[] = json.data.map((item: any, idx: number) => {
            const shortcodeMatch = item.permalink ? item.permalink.match(/\/(reel|p)\/([a-zA-Z0-9_\-]+)/) : null;
            const shortcode = shortcodeMatch ? shortcodeMatch[2] : `live-${item.id}`;
            const captionLines = (item.caption || "").split("\n").filter(Boolean);
            const firstLine = captionLines[0] || "Update Produksi Pelangi UV";
            const cleanTitle = firstLine.replace(/^[#\s]+/, "").slice(0, 75);

            return {
              id: item.id || `live-${idx}`,
              shortcode,
              source: "Instagram Reels",
              tag: "Update Terbaru",
              duration: "Reel • Pelangi UV",
              title: cleanTitle,
              desc: item.caption || "Tonton dokumentasi finishing cetak terbaru langsung dari Instagram resmi Pelangi UV.",
              capacity: "Live Update",
              img: item.thumbnail_url || item.media_url || "/images/instagram/DdYdcznzLJY.jpg",
              videoUrl: item.permalink || `https://www.instagram.com/pelangi.uv/`,
              embedUrl: `https://www.instagram.com/reel/${shortcode}/embed/`,
              date: item.timestamp || new Date().toISOString(),
              isReal: true,
            };
          });

          // Save/cache live reels for offline reliability
          if (liveReels.length > 0) {
            saveStoredReels(liveReels);
            return NextResponse.json({
              success: true,
              source: "instagram_graph_api",
              count: liveReels.length,
              lastUpdated: new Date().toISOString(),
              data: liveReels,
            });
          }
        }
      }
    } catch (apiErr) {
      console.warn("Instagram Graph API request failed, using cached feed:", apiErr);
    }
  }

  // 2. Return cached authentic reels
  const cached = getStoredReels();
  return NextResponse.json({
    success: true,
    source: "local_cache",
    count: cached.length,
    lastUpdated: new Date().toISOString(),
    account: "pelangi.uv",
    profileUrl: "https://www.instagram.com/pelangi.uv/",
    data: cached,
  });
}

/**
 * POST /api/instagram
 * Allows instantaneous synchronization or manual addition of newly uploaded Instagram Reels.
 * When the company posts a new Reel, this endpoint extracts its details and places it at the top of the feed!
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, title, tag, desc } = body;

    if (!url) {
      return NextResponse.json(
        { success: false, message: "URL Instagram wajib disertakan." },
        { status: 400 }
      );
    }

    // Extract shortcode from URL: https://www.instagram.com/reel/SHORTCODE/ or /p/SHORTCODE/
    const match = url.match(/\/(reel|p)\/([a-zA-Z0-9_\-]+)/);
    if (!match) {
      return NextResponse.json(
        { success: false, message: "Format URL Instagram tidak valid. Gunakan format https://www.instagram.com/reel/XXXX/ atau /p/XXXX/" },
        { status: 400 }
      );
    }

    const shortcode = match[2];
    const existing = getStoredReels();

    // Check if shortcode already exists
    const alreadyExists = existing.find((item) => item.shortcode === shortcode);
    if (alreadyExists) {
      return NextResponse.json({
        success: true,
        message: "Reel ini sudah ada di galeri website.",
        reel: alreadyExists,
        data: existing,
      });
    }

    // Create new Reel item
    const newReel: ReelItem = {
      id: `reel-${Date.now()}`,
      shortcode,
      source: "Instagram Reels",
      tag: tag || "Reel Baru",
      duration: "0:45 • Pelangi UV",
      title: title || `Update Instagram Reel Pelangi UV (${shortcode})`,
      desc: desc || "Dokumentasi & edukasi proses finishing percetakan terbaru dari akun resmi @pelangi.uv di Bizpark Sidoarjo.",
      capacity: "Terbaru",
      img: `/images/instagram/${shortcode}.jpg`, // local fallback if saved
      videoUrl: `https://www.instagram.com/reel/${shortcode}/`,
      embedUrl: `https://www.instagram.com/reel/${shortcode}/embed/`,
      date: new Date().toISOString(),
      isReal: true,
    };

    // Prepend to top so the newly uploaded reel shows first!
    const updated = [newReel, ...existing];
    saveStoredReels(updated);

    return NextResponse.json({
      success: true,
      message: "Reel berhasil disinkronkan dan ditambahkan ke galeri!",
      reel: newReel,
      data: updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || "Gagal memproses sinkronisasi reel." },
      { status: 500 }
    );
  }
}

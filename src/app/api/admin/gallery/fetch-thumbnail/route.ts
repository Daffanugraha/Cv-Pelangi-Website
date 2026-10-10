import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();

  try {
    const body = await req.json();
    const rawUrl = (body.url || "").trim();

    if (!rawUrl) {
      return NextResponse.json(
        { error: "URL Instagram, TikTok, atau YouTube wajib diisi." },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "images", "gallery");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // -------------------------------------------------------------------------
    // 1. INSTAGRAM (Reels & Posts)
    // -------------------------------------------------------------------------
    const isInstagram = /instagram\.com|instagr\.am/i.test(rawUrl);
    if (isInstagram) {
      const match = rawUrl.match(/\/(?:reel|p)\/([a-zA-Z0-9_\-]+)/);
      if (!match) {
        return NextResponse.json(
          { error: "Format link Instagram tidak valid. Gunakan format https://www.instagram.com/reel/XXXX/ atau /p/XXXX/" },
          { status: 400 }
        );
      }

      const shortcode = match[1];
      const igMediaUrl = `https://www.instagram.com/p/${shortcode}/media/?size=l`;

      try {
        const imgRes = await fetch(igMediaUrl, {
          redirect: "follow",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          },
        });

        if (imgRes.ok) {
          const buffer = Buffer.from(await imgRes.arrayBuffer());
          if (buffer.length > 1000) {
            const fileName = `ig_${shortcode}_${Date.now()}.jpg`;
            fs.writeFileSync(path.join(uploadDir, fileName), buffer);

            return NextResponse.json({
              ok: true,
              platform: "Instagram",
              imageUrl: `/images/gallery/${fileName}`,
              fileName,
              videoUrl: `https://www.instagram.com/reel/${shortcode}/`,
              suggestedTitle: `Dokumentasi Finishing Instagram (${shortcode})`,
              message: "Thumbnail Instagram berhasil diunduh dan disimpan otomatis!",
            });
          }
        }
      } catch (igErr) {
        console.warn("Gagal download media Instagram via media redirect:", igErr);
      }

      return NextResponse.json(
        { error: "Gagal mengunduh thumbnail dari Instagram. Pastikan akun dan postingan bersifat publik." },
        { status: 502 }
      );
    }

    // -------------------------------------------------------------------------
    // 2. TIKTOK
    // -------------------------------------------------------------------------
    const isTikTok = /tiktok\.com/i.test(rawUrl);
    if (isTikTok) {
      let resolvedUrl = rawUrl;
      // Handle shortened URL (vt.tiktok.com)
      if (rawUrl.includes("vt.tiktok.com")) {
        try {
          const headRes = await fetch(rawUrl, {
            redirect: "follow",
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            },
          });
          resolvedUrl = headRes.url;
        } catch (resolveErr) {
          console.warn("Gagal resolve vt.tiktok.com link:", resolveErr);
        }
      }

      let thumbUrl = "";
      let videoTitle = "";

      // Coba Cara A: TikTok oEmbed resmi
      try {
        const oembedEndpoint = `https://www.tiktok.com/oembed?url=${encodeURIComponent(resolvedUrl)}`;
        const oembedRes = await fetch(oembedEndpoint, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          },
        });
        if (oembedRes.ok) {
          const data = await oembedRes.json();
          if (data.thumbnail_url) {
            thumbUrl = data.thumbnail_url;
            videoTitle = data.title || "";
          }
        }
      } catch (oembedErr) {
        console.warn("Gagal TikTok oEmbed:", oembedErr);
      }

      // Coba Cara B: TikWM API fallback jika oEmbed gagal
      if (!thumbUrl) {
        try {
          const tikwmEndpoint = `https://www.tikwm.com/api/?url=${encodeURIComponent(resolvedUrl)}`;
          const tikwmRes = await fetch(tikwmEndpoint);
          if (tikwmRes.ok) {
            const data = await tikwmRes.json();
            if (data.data && data.data.cover) {
              thumbUrl = data.data.cover;
              videoTitle = videoTitle || data.data.title || "";
            }
          }
        } catch (tikwmErr) {
          console.warn("Gagal TikWM API:", tikwmErr);
        }
      }

      if (thumbUrl) {
        const imgRes = await fetch(thumbUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          },
        });
        if (imgRes.ok) {
          const buffer = Buffer.from(await imgRes.arrayBuffer());
          if (buffer.length > 1000) {
            const fileName = `tiktok_${Date.now()}.jpg`;
            fs.writeFileSync(path.join(uploadDir, fileName), buffer);

            const cleanTitle = (videoTitle || "Video TikTok Pelangi UV")
              .replace(/^[#\s]+/, "")
              .slice(0, 80);

            return NextResponse.json({
              ok: true,
              platform: "TikTok",
              imageUrl: `/images/gallery/${fileName}`,
              fileName,
              videoUrl: resolvedUrl,
              suggestedTitle: cleanTitle,
              message: "Thumbnail TikTok berhasil diunduh dan disimpan otomatis!",
            });
          }
        }
      }

      return NextResponse.json(
        { error: "Gagal mengambil thumbnail dari link TikTok tersebut. Pastikan video publik dan link masih aktif." },
        { status: 502 }
      );
    }

    // -------------------------------------------------------------------------
    // 3. YOUTUBE (Shorts & Videos - Bonus dukungan)
    // -------------------------------------------------------------------------
    const isYouTube = /youtube\.com|youtu\.be/i.test(rawUrl);
    if (isYouTube) {
      const match =
        rawUrl.match(/(?:youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_\-]{11})/);
      if (!match) {
        return NextResponse.json(
          { error: "Format link YouTube tidak valid." },
          { status: 400 }
        );
      }

      const videoId = match[1];
      const candidates = [
        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      ];

      for (const ytUrl of candidates) {
        try {
          const imgRes = await fetch(ytUrl);
          if (imgRes.ok) {
            const buffer = Buffer.from(await imgRes.arrayBuffer());
            if (buffer.length > 2000) {
              const fileName = `yt_${videoId}_${Date.now()}.jpg`;
              fs.writeFileSync(path.join(uploadDir, fileName), buffer);

              return NextResponse.json({
                ok: true,
                platform: "YouTube",
                imageUrl: `/images/gallery/${fileName}`,
                fileName,
                videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
                suggestedTitle: `Video YouTube Pelangi UV (${videoId})`,
                message: "Thumbnail YouTube berhasil diunduh dan disimpan otomatis!",
              });
            }
          }
        } catch (ytErr) {
          console.warn("Gagal fetch YouTube thumbnail candidate:", ytErr);
        }
      }

      return NextResponse.json(
        { error: "Gagal mengunduh thumbnail dari video YouTube." },
        { status: 502 }
      );
    }

    // Jika bukan dari platform yang didukung
    return NextResponse.json(
      {
        error:
          "Platform tidak dikenali. Masukkan tautan video dari Instagram (Reels/Post), TikTok, atau YouTube.",
      },
      { status: 400 }
    );
  } catch (err: any) {
    console.error("Kesalahan fetch-thumbnail:", err);
    return NextResponse.json(
      { error: err?.message || "Terjadi kesalahan internal saat memproses thumbnail." },
      { status: 500 }
    );
  }
}

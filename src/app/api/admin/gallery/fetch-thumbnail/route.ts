import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

// Helper untuk menyimpan file ke disk lokal (jika writable) atau fallback ke Base64 Data URI (di Vercel Serverless read-only)
function saveBufferOrDataUri(buffer: Buffer, fileName: string, mimeType: string = "image/jpeg"): string {
  try {
    const uploadDir = path.join(process.cwd(), "public", "images", "gallery");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    fs.writeFileSync(path.join(uploadDir, fileName), buffer);
    return `/images/gallery/${fileName}`;
  } catch {
    // Vercel Serverless environment memiliki filesystem read-only.
    // Fallback aman: kembalikan Data URI Base64 agar gambar langsung tampil dan tersimpan sempurna.
    return `data:${mimeType};base64,${buffer.toString("base64")}`;
  }
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
      const targetUrls = [
        `https://www.instagram.com/reel/${shortcode}/`,
        `https://www.instagram.com/p/${shortcode}/`,
      ];

      const userAgents = [
        "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
        "WhatsApp/2.21.12.21 A",
        "Twitterbot/1.0",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      ];

      let imgUrl = "";
      let rawTitle = "";

      // Scrape Open Graph meta tags yang disediakan Instagram untuk preview sosmed
      outerLoop: for (const targetUrl of targetUrls) {
        for (const ua of userAgents) {
          try {
            const res = await fetch(targetUrl, {
              headers: {
                "User-Agent": ua,
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "id,en-US;q=0.7,en;q=0.3",
              },
            });

            if (!res.ok) continue;

            const html = await res.text();

            // 1. Ambil URL og:image
            const imgMatch =
              html.match(/<meta\s+[^>]*?(?:property|name)=["']og:image["'][^>]*?content=["']([^"']+)["']/i) ||
              html.match(/<meta\s+[^>]*?content=["']([^"']+)["'][^>]*?(?:property|name)=["']og:image["']/i);

            if (imgMatch && imgMatch[1]) {
              imgUrl = imgMatch[1].replace(/&amp;/g, "&");
            }

            // 2. Ambil title/caption dari og:title jika ada
            const titleMatch =
              html.match(/<meta\s+[^>]*?(?:property|name)=["']og:title["'][^>]*?content=["']([^"']+)["']/i) ||
              html.match(/<meta\s+[^>]*?content=["']([^"']+)["'][^>]*?(?:property|name)=["']og:title["']/i);

            if (titleMatch && titleMatch[1]) {
              rawTitle = titleMatch[1]
                .replace(/&quot;/g, '"')
                .replace(/&#x27;/g, "'")
                .replace(/&amp;/g, "&")
                .trim();
            }

            if (imgUrl) break outerLoop;
          } catch (fetchErr) {
            console.warn(`Gagal scrape Instagram (${targetUrl}) dengan UA: ${ua}`, fetchErr);
          }
        }
      }

      // Download buffer gambar jika URL ditemukan
      if (imgUrl) {
        try {
          const imgRes = await fetch(imgUrl);
          if (imgRes.ok) {
            const buffer = Buffer.from(await imgRes.arrayBuffer());
            if (buffer.length > 500) {
              const fileName = `ig_${shortcode}_${Date.now()}.jpg`;
              const finalImageUrl = saveBufferOrDataUri(buffer, fileName, "image/jpeg");

              const cleanTitle = rawTitle
                ? rawTitle.slice(0, 80)
                : `Dokumentasi Finishing Instagram (${shortcode})`;

              return NextResponse.json({
                ok: true,
                platform: "Instagram",
                imageUrl: finalImageUrl,
                fileName,
                videoUrl: `https://www.instagram.com/reel/${shortcode}/`,
                suggestedTitle: cleanTitle,
                message: "Thumbnail Instagram berhasil diambil dan dipasang otomatis!",
              });
            }
          }
        } catch (downloadErr) {
          console.warn("Gagal download image buffer dari CDN Instagram:", downloadErr);
        }

        // Fallback jika download buffer gagal tapi imgUrl tersedia: gunakan direct CDN URL
        return NextResponse.json({
          ok: true,
          platform: "Instagram",
          imageUrl: imgUrl,
          fileName: `ig_${shortcode}.jpg`,
          videoUrl: `https://www.instagram.com/reel/${shortcode}/`,
          suggestedTitle: rawTitle ? rawTitle.slice(0, 80) : `Dokumentasi Finishing Instagram (${shortcode})`,
          message: "Thumbnail Instagram berhasil diambil dari CDN!",
        });
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
        try {
          const imgRes = await fetch(thumbUrl, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            },
          });
          if (imgRes.ok) {
            const buffer = Buffer.from(await imgRes.arrayBuffer());
            if (buffer.length > 500) {
              const fileName = `tiktok_${Date.now()}.jpg`;
              const finalImageUrl = saveBufferOrDataUri(buffer, fileName, "image/jpeg");

              const cleanTitle = (videoTitle || "Video TikTok Pelangi UV")
                .replace(/^[#\s]+/, "")
                .slice(0, 80);

              return NextResponse.json({
                ok: true,
                platform: "TikTok",
                imageUrl: finalImageUrl,
                fileName,
                videoUrl: resolvedUrl,
                suggestedTitle: cleanTitle,
                message: "Thumbnail TikTok berhasil diunduh dan disimpan otomatis!",
              });
            }
          }
        } catch (downloadErr) {
          console.warn("Gagal download TikTok thumbnail:", downloadErr);
        }

        // Fallback langsung ke URL jika download buffer gagal
        return NextResponse.json({
          ok: true,
          platform: "TikTok",
          imageUrl: thumbUrl,
          fileName: `tiktok_${Date.now()}.jpg`,
          videoUrl: resolvedUrl,
          suggestedTitle: (videoTitle || "Video TikTok Pelangi UV").slice(0, 80),
          message: "Thumbnail TikTok berhasil diambil!",
        });
      }

      return NextResponse.json(
        { error: "Gagal mengambil thumbnail dari link TikTok tersebut. Pastikan video publik dan link masih aktif." },
        { status: 502 }
      );
    }

    // -------------------------------------------------------------------------
    // 3. YOUTUBE (Shorts & Videos)
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
              const finalImageUrl = saveBufferOrDataUri(buffer, fileName, "image/jpeg");

              return NextResponse.json({
                ok: true,
                platform: "YouTube",
                imageUrl: finalImageUrl,
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

      // Fallback ke hqdefault URL langsung
      return NextResponse.json({
        ok: true,
        platform: "YouTube",
        imageUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        fileName: `yt_${videoId}.jpg`,
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        suggestedTitle: `Video YouTube Pelangi UV (${videoId})`,
        message: "Thumbnail YouTube berhasil diambil!",
      });
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

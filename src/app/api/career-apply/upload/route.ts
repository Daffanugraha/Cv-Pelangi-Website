import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Tidak ada file yang dipilih" }, { status: 400 });
    }

    const maxSize = 15 * 1024 * 1024; // 15MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Ukuran berkas terlalu besar. Maksimum 15 MB." },
        { status: 400 }
      );
    }

    const allowedMime = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/zip",
      "application/x-zip-compressed",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    const ext = (file.name.split(".").pop() || "").toLowerCase();
    const allowedExts = ["pdf", "doc", "docx", "zip", "rar", "jpg", "jpeg", "png", "webp"];

    if (!allowedExts.includes(ext) && !allowedMime.includes(file.type)) {
      return NextResponse.json(
        { error: "Format berkas tidak didukung. Harap unggah PDF, DOC, DOCX, ZIP, atau Gambar." },
        { status: 400 }
      );
    }

    const safeBaseName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 40);
    const finalFileName = `cv_${Date.now()}_${safeBaseName}.${ext || "pdf"}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "cv");
    const buffer = Buffer.from(await file.arrayBuffer());

    let url = "";

    try {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      fs.writeFileSync(path.join(uploadDir, finalFileName), buffer);
      url = `/uploads/cv/${finalFileName}`;
    } catch {
      // Vercel Serverless read-only filesystem fallback: simpan sebagai Base64 Data URI
      const mimeType = file.type || (ext === "pdf" ? "application/pdf" : "application/octet-stream");
      url = `data:${mimeType};base64,${buffer.toString("base64")}`;
    }

    return NextResponse.json({
      ok: true,
      url,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type || ext,
    });
  } catch (err: any) {
    console.error("Gagal memproses upload CV:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memproses berkas: " + (err?.message || "Internal error") },
      { status: 500 }
    );
  }
}

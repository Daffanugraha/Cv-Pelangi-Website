import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import fs from "fs";
import path from "path";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Tipe file tidak didukung. Gunakan JPG, PNG, atau WEBP." }, { status: 400 });
  }

  const maxSize = 10 * 1024 * 1024; // 10 MB
  if (file.size > maxSize) {
    return NextResponse.json({ error: "Ukuran file terlalu besar (maks 10MB)." }, { status: 400 });
  }

  const ext = file.name.split(".").pop();
  const fileName = `admin_${Date.now()}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "images", "gallery");
  const buffer = Buffer.from(await file.arrayBuffer());

  let url = "";
  try {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    fs.writeFileSync(path.join(uploadDir, fileName), buffer);
    url = `/images/gallery/${fileName}`;
  } catch {
    // Vercel Serverless read-only filesystem fallback: simpan sebagai Base64 Data URI
    url = `data:${file.type};base64,${buffer.toString("base64")}`;
  }

  return NextResponse.json({
    ok: true,
    url,
    fileName,
  });
}

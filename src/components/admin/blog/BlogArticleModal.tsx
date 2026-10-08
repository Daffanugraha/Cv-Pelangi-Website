"use client";

import React, { useState, useEffect, useRef } from "react";
import AdminModal from "../AdminModal";
import type { BlogArticleItem } from "@/lib/admin/db";

const BLOG_CATEGORY_OPTIONS = [
  { key: "mesin-teknologi", label: "Mesin & Teknologi" },
  { key: "tips-finishing", label: "Tips Finishing Cetak" },
  { key: "bahan-baku", label: "Bahan Baku & Material" },
  { key: "kabar-perusahaan", label: "Kabar Perusahaan" },
] as const;

interface BlogArticleModalProps {
  isOpen: boolean;
  article: BlogArticleItem | null;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

export default function BlogArticleModal({
  isOpen,
  article,
  onClose,
  onSuccess,
}: BlogArticleModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [categoryKey, setCategoryKey] = useState<
    "mesin-teknologi" | "tips-finishing" | "bahan-baku" | "kabar-perusahaan"
  >("mesin-teknologi");
  const [author, setAuthor] = useState("Admin Pelangi UV");
  const [readTime, setReadTime] = useState("5 Menit Baca");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [contentRaw, setContentRaw] = useState("");
  const [keyTakeawaysRaw, setKeyTakeawaysRaw] = useState("");

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    if (article) {
      setTitle(article.title || "");
      setCategoryKey(article.categoryKey || "mesin-teknologi");
      setAuthor(article.author || "Admin Pelangi UV");
      setReadTime(article.readTime || "5 Menit Baca");
      setDesc(article.desc || "");
      setImg(article.img || "");
      setPreviewUrl(article.img || "");
      setIsFeatured(!!article.isFeatured);
      setContentRaw(
        Array.isArray(article.content) ? article.content.join("\n\n") : ""
      );
      setKeyTakeawaysRaw(
        Array.isArray(article.keyTakeaways)
          ? article.keyTakeaways.join("\n")
          : ""
      );
    } else {
      setTitle("");
      setCategoryKey("mesin-teknologi");
      setAuthor("Admin Pelangi UV");
      setReadTime("5 Menit Baca");
      setDesc("");
      setImg("");
      setPreviewUrl("");
      setIsFeatured(false);
      setContentRaw("");
      setKeyTakeawaysRaw("");
    }
    setError("");
  }, [isOpen, article]);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setUploading(true);
    setError("");

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();

      if (data.ok) {
        setImg(data.url);
      } else {
        setError(data.error ?? "Gagal mengunggah gambar");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat upload berkas gambar.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!title.trim()) {
      setError("Judul artikel wajib diisi.");
      return;
    }
    if (!desc.trim()) {
      setError("Ringkasan artikel wajib diisi.");
      return;
    }

    setSaving(true);
    setError("");

    const categoryLabel =
      BLOG_CATEGORY_OPTIONS.find((c) => c.key === categoryKey)?.label ||
      "Kabar Perusahaan";

    const contentParagraphs = contentRaw
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean);

    const keyTakeaways = keyTakeawaysRaw
      .split("\n")
      .map((k) => k.replace(/^[•\-\*]\s*/, "").trim())
      .filter(Boolean);

    const payload = {
      title: title.trim(),
      category: categoryLabel,
      categoryKey,
      tag: categoryLabel,
      author: author.trim() || "Admin Pelangi UV",
      readTime: readTime.trim() || "5 Menit Baca",
      desc: desc.trim(),
      img: img.trim() || "/images/placeholder.jpg",
      isFeatured,
      content: contentParagraphs.length > 0 ? contentParagraphs : [desc.trim()],
      keyTakeaways: keyTakeaways.length > 0 ? keyTakeaways : undefined,
    };

    try {
      let res;
      if (article) {
        res = await fetch("/api/admin/blog", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: article.id, ...payload }),
        });
      } else {
        res = await fetch("/api/admin/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Gagal menyimpan artikel.");
        setSaving(false);
        return;
      }

      onSuccess(
        article
          ? "Artikel berita berhasil diperbarui!"
          : "Artikel berita baru berhasil diterbitkan!"
      );
      onClose();
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setSaving(false);
    }
  }

  if (!isOpen) return null;

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={article ? "Edit Artikel Berita" : "Tulis Berita Baru di Blog"}
      subtitle="Publikasikan edukasi teknik cetak, kabar mesin, dan update perusahaan ke portal Blog."
      maxWidth="4xl"
      footer={
        <div className="w-full flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={saving || uploading}
            className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-100 text-xs font-semibold text-gray-700 transition cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || uploading}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#F65456] hover:bg-[#E03F41] text-white text-xs font-bold transition shadow-xs disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <>
                <span className="material-symbols-outlined animate-spin text-sm">
                  progress_activity
                </span>
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">publish</span>
                <span>{article ? "Simpan Perubahan" : "Terbitkan Artikel"}</span>
              </>
            )}
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Section 1: Detail Utama */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-mono">
              Judul Artikel Berita <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Mengenal Keunggulan Mesin Pond Otomatis Oyang WH 1050SS"
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#F65456] transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-mono">
                Kategori Berita
              </label>
              <select
                value={categoryKey}
                onChange={(e) => setCategoryKey(e.target.value as any)}
                className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#F65456]"
              >
                {BLOG_CATEGORY_OPTIONS.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-mono">
                Penulis / Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Admin Pelangi UV"
                className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#F65456]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-mono">
                Estimasi Baca
              </label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="5 Menit Baca"
                className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#F65456]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Banner Gambar */}
        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider font-mono">
            Thumbnail / Foto Sampul Artikel
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-4 aspect-video rounded-xl overflow-hidden bg-white border border-gray-300 flex items-center justify-center relative">
              {previewUrl ? (
                <img src={previewUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-3 text-gray-400">
                  <span className="material-symbols-outlined text-3xl">image</span>
                  <p className="text-[10px]">Belum ada thumbnail</p>
                </div>
              )}
              {uploading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-gray-200 border-t-[#F65456] rounded-full animate-spin" />
                </div>
              )}
            </div>

            <div className="sm:col-span-8 space-y-2.5">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 rounded-xl bg-white border border-gray-300 hover:border-[#F65456] text-xs font-bold text-gray-700 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-sm">upload</span>
                  <span>Pilih Berkas Foto</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>

              <div>
                <input
                  type="text"
                  value={img}
                  onChange={(e) => {
                    setImg(e.target.value);
                    setPreviewUrl(e.target.value);
                  }}
                  placeholder="Atau tempelkan tautan URL gambar (https://...)"
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-[#F65456] bg-white font-mono"
                />
              </div>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none pt-1">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 rounded text-[#F65456] focus:ring-[#F65456] cursor-pointer"
            />
            <span className="text-xs font-bold text-gray-700 flex items-center gap-1">
              <span className="material-symbols-outlined text-amber-500 text-base">star</span>
              Jadikan Artikel Sorotan Utama di Halaman Blog
            </span>
          </label>
        </div>

        {/* Section 3: Ringkasan & Konten */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-mono">
              Ringkasan Singkat (Lead Paragraph) <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={2}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Tulis 1-2 kalimat pengantar artikel yang menarik perhatian pembaca..."
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2 text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#F65456]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-mono">
              Poin Penting / Key Takeaways (Opsional - 1 per baris)
            </label>
            <textarea
              rows={3}
              value={keyTakeawaysRaw}
              onChange={(e) => setKeyTakeawaysRaw(e.target.value)}
              placeholder={"• Akurasi register potong hingga ±0.15 mm\n• Daya tahan bodi baja tuang HT250\n• Ketersediaan suku cadang resmi di Bizpark Waru"}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2 text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#F65456] font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-mono">
              Isi Lengkap Artikel (Pisahkan Paragraf dengan 2x Enter)
            </label>
            <textarea
              rows={8}
              value={contentRaw}
              onChange={(e) => setContentRaw(e.target.value)}
              placeholder="Tuliskan uraian isi berita atau artikel teknis selengkapnya di sini..."
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#F65456] font-sans leading-relaxed"
            />
          </div>
        </div>
      </div>
    </AdminModal>
  );
}

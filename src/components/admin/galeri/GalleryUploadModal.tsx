"use client";

import React, { useState, useEffect, useRef } from "react";
import AdminModal from "../AdminModal";
import type { GalleryItem } from "@/lib/admin/db";

export const GALLERY_CATEGORIES = [
  "Kemasan Skincare",
  "Rigid Box Parfum",
  "Food-grade Box",
  "Hardcover Book",
  "Shopping Bag",
  "Umum",
];

export const GALLERY_TECHNIQUES = [
  "Spot UV",
  "Hot Stamp Foil",
  "Laminating Doff",
  "Laminating Glossy",
  "Cast & Cure",
  "Emboss/Deboss",
  "Pond Otomatis",
  "Lainnya",
];

interface GalleryUploadModalProps {
  isOpen: boolean;
  item: GalleryItem | null;
  defaultGalleryType?: "beranda" | "produk";
  onClose: () => void;
  onSuccess: (message: string, savedType: "beranda" | "produk") => void;
}

export default function GalleryUploadModal({
  isOpen,
  item,
  defaultGalleryType = "produk",
  onClose,
  onSuccess,
}: GalleryUploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [galleryType, setGalleryType] = useState<"beranda" | "produk">(defaultGalleryType);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(GALLERY_CATEGORIES[0]);
  const [technique, setTechnique] = useState(GALLERY_TECHNIQUES[0]);
  const [tag, setTag] = useState("Sorotan");
  const [videoUrl, setVideoUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    if (item) {
      setGalleryType(item.galleryType || defaultGalleryType);
      setTitle(item.title);
      setCategory(item.category || GALLERY_CATEGORIES[0]);
      setTechnique(item.technique || GALLERY_TECHNIQUES[0]);
      setTag(item.tag || item.category || "Sorotan");
      setVideoUrl(item.videoUrl || "");
      setFeatured(!!item.featured);
      setImageUrl(item.imageUrl || "");
      setFileName(item.fileName || "");
      setPreviewUrl(item.imageUrl || "");
    } else {
      setGalleryType(defaultGalleryType);
      setTitle("");
      setCategory(GALLERY_CATEGORIES[0]);
      setTechnique(GALLERY_TECHNIQUES[0]);
      setTag("Sorotan Produksi");
      setVideoUrl("");
      setFeatured(false);
      setImageUrl("");
      setFileName("");
      setPreviewUrl("");
    }
    setError("");
  }, [isOpen, item, defaultGalleryType]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
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
        setImageUrl(data.url);
        setFileName(data.fileName);
        if (!title) {
          const autoTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
          setTitle(autoTitle);
        }
      } else {
        setError(data.error ?? "Gagal mengunggah foto.");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan jaringan saat upload.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!title.trim()) {
      setError("Judul foto/media wajib diisi.");
      return;
    }
    if (!imageUrl.trim()) {
      setError("Silakan pilih atau unggah berkas foto terlebih dahulu.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload = {
        title: title.trim(),
        category: galleryType === "beranda" ? tag : category,
        technique: galleryType === "beranda" ? "Showcase Beranda" : technique,
        tag: tag.trim(),
        videoUrl: videoUrl.trim(),
        featured,
        imageUrl: imageUrl.trim(),
        fileName,
        galleryType,
      };

      let res;
      if (item) {
        res = await fetch("/api/admin/gallery", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: item.id, ...payload }),
        });
      } else {
        res = await fetch("/api/admin/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Gagal menyimpan foto.");
        setSaving(false);
        return;
      }

      onSuccess(
        item
          ? `Perubahan ${galleryType === "beranda" ? "Media Beranda" : "Foto Produk"} berhasil disimpan!`
          : `${galleryType === "beranda" ? "Media Galeri Beranda" : "Foto Pengaplikasian Produk"} berhasil ditambahkan!`,
        galleryType
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
      title={
        item
          ? `Edit ${galleryType === "beranda" ? "Media Galeri Beranda" : "Portofolio Produk"}`
          : `Tambah ${galleryType === "beranda" ? "Media Galeri Beranda" : "Foto Pengaplikasian Produk"}`
      }
      subtitle={
        galleryType === "beranda"
          ? "Media yang ditambahkan di sini akan tampil di section Galeri halaman Beranda."
          : "Unggah hasil cetak dan tentukan teknik finishing serta kategori kemasan."
      }
      maxWidth="3xl"
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
                <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">save</span>
                <span>{item ? "Simpan Perubahan" : "Tambahkan ke Galeri"}</span>
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

        {/* Gallery Type Selector (If creating new) */}
        {!item && (
          <div className="p-1 bg-gray-100 rounded-xl flex gap-1">
            <button
              type="button"
              onClick={() => setGalleryType("produk")}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                galleryType === "produk"
                  ? "bg-white text-gray-900 shadow-xs"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <span className="material-symbols-outlined text-sm">inventory_2</span>
              <span>1. Galeri Pengaplikasian Produk</span>
            </button>
            <button
              type="button"
              onClick={() => setGalleryType("beranda")}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                galleryType === "beranda"
                  ? "bg-[#F65456] text-white shadow-xs"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <span className="material-symbols-outlined text-sm">home</span>
              <span>2. Galeri di Beranda</span>
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-5 items-start">
          {/* Upload Area */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 font-mono">
              Berkas Foto / Thumbnail <span className="text-red-500">*</span>
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative aspect-video rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#F65456] cursor-pointer transition overflow-hidden bg-gray-50 flex items-center justify-center group"
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-4">
                  <span className="material-symbols-outlined text-4xl text-gray-400 group-hover:text-[#F65456] transition">
                    upload_file
                  </span>
                  <p className="text-gray-700 text-xs sm:text-sm mt-2 font-bold">
                    Pilih File Foto
                  </p>
                  <p className="text-gray-400 text-[11px] mt-0.5">JPG, PNG, WEBP — maks 10MB</p>
                </div>
              )}
              {uploading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gray-200 border-t-[#F65456] rounded-full animate-spin" />
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <div className="mt-2.5">
              <label className="block text-[11px] text-gray-500 font-mono mb-1">
                Atau masukkan tautan URL gambar langsung:
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setPreviewUrl(e.target.value);
                }}
                placeholder="https://... atau /uploads/..."
                className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456] bg-gray-50/50 font-mono"
              />
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-mono">
                Judul {galleryType === "beranda" ? "Media / Sorotan" : "Foto Portofolio"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  galleryType === "beranda"
                    ? "cth. Mesin Spot UV Otomatis Bizpark Waru"
                    : "cth. Rigid Box Parfum Hot Stamp Gold"
                }
                className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#F65456] transition"
              />
            </div>

            {galleryType === "beranda" ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-mono">
                    Tag / Label Sorotan
                  </label>
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="cth. Spot UV, Hot Foil, Mesin Otomatis"
                    className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#F65456] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-mono">
                    Link Video / Reels (Opsional)
                  </label>
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="cth. https://instagram.com/reel/... atau link MP4"
                    className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#F65456] transition font-mono"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">
                    Jika diisi, pengunjung di Beranda dapat memutar video ini.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-mono">
                    Kategori Kemasan
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#F65456] transition"
                  >
                    {GALLERY_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-mono">
                    Teknik Finishing
                  </label>
                  <select
                    value={technique}
                    onChange={(e) => setTechnique(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#F65456] transition"
                  >
                    {GALLERY_TECHNIQUES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <label className="flex items-center gap-2.5 cursor-pointer select-none pt-1">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-[#F65456] focus:ring-[#F65456] cursor-pointer"
              />
              <span className="text-xs sm:text-sm text-gray-700 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-amber-500 text-base">star</span>
                Tampilkan sebagai media unggulan prioritas
              </span>
            </label>
          </div>
        </div>
      </div>
    </AdminModal>
  );
}

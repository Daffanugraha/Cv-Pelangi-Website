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
  const [objectPosition, setObjectPosition] = useState<"top" | "center" | "bottom">("center");
  const [uploading, setUploading] = useState(false);
  const [fetchingThumb, setFetchingThumb] = useState(false);
  const [thumbSuccessMsg, setThumbSuccessMsg] = useState("");
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
      setObjectPosition((item.objectPosition as "top" | "center" | "bottom") || "center");
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
      setObjectPosition("center");
    }
    setError("");
    setThumbSuccessMsg("");
  }, [isOpen, item, defaultGalleryType]);

  // Fungsi unduh thumbnail otomatis dari Instagram, TikTok, atau YouTube
  async function handleAutoFetchThumbnail(inputUrl?: string) {
    const targetUrl = (inputUrl !== undefined ? inputUrl : videoUrl).trim();
    if (!targetUrl) {
      setError("Masukkan URL Instagram atau TikTok terlebih dahulu.");
      return;
    }

    setFetchingThumb(true);
    setError("");
    setThumbSuccessMsg("");

    try {
      const res = await fetch("/api/admin/gallery/fetch-thumbnail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setImageUrl(data.imageUrl);
        setPreviewUrl(data.imageUrl);
        setFileName(data.fileName);
        if (data.videoUrl) setVideoUrl(data.videoUrl);
        if (!title.trim() && data.suggestedTitle) {
          setTitle(data.suggestedTitle);
        }
        setThumbSuccessMsg(
          data.message || `Thumbnail ${data.platform} berhasil diunduh dan dipasang otomatis!`
        );
      } else {
        setError(data.error || "Gagal mengunduh thumbnail dari link tersebut.");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan jaringan saat mengunduh thumbnail.");
    } finally {
      setFetchingThumb(false);
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setUploading(true);
    setError("");
    setThumbSuccessMsg("");

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
        objectPosition,
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
          ? `Edit ${galleryType === "beranda" ? "Media Beranda" : "Foto Produk"}`
          : `Tambah ${galleryType === "beranda" ? "Media Beranda" : "Foto Produk"}`
      }
      maxWidth="5xl"
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
                <span>{item ? "Simpan Perubahan" : "Simpan ke Galeri"}</span>
              </>
            )}
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{error}</span>
          </div>
        )}

        {thumbSuccessMsg && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-xs">
            <span className="material-symbols-outlined text-base text-emerald-600">check_circle</span>
            <span>{thumbSuccessMsg}</span>
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
              <span>Galeri Pengaplikasian Produk</span>
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
              <span>Galeri di Beranda</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Kolom Kiri: Foto / Preview & Pengaturan Fokus Crop (Lebih Luas) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider font-mono">
                Foto / Sampul <span className="text-red-500">*</span>
              </label>
              {previewUrl && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-[#F65456] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xs">upload_file</span>
                  Ganti Foto
                </button>
              )}
            </div>

            {/* Container Preview Gambar yang Besar */}
            <div
              onClick={() => !previewUrl && fileInputRef.current?.click()}
              className={`relative aspect-[16/10] sm:aspect-[16/9] min-h-[260px] sm:min-h-[320px] w-full rounded-2xl border-2 ${
                previewUrl ? "border-gray-200" : "border-dashed border-gray-300 hover:border-[#F65456] cursor-pointer"
              } transition overflow-hidden bg-gray-900 flex items-center justify-center group shadow-xs`}
            >
              {previewUrl ? (
                <>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      objectPosition === "top"
                        ? "object-top"
                        : objectPosition === "bottom"
                        ? "object-bottom"
                        : "object-center"
                    }`}
                  />
                  {/* Badge Posisi Saat Ini */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-xs text-[#F65456]">crop</span>
                    <span>
                      {objectPosition === "top"
                        ? "Fokus Atas"
                        : objectPosition === "bottom"
                        ? "Fokus Bawah"
                        : "Fokus Tengah"}
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-center p-6">
                  <span className="material-symbols-outlined text-5xl text-gray-400 group-hover:text-[#F65456] transition">
                    upload_file
                  </span>
                  <p className="text-gray-200 text-sm mt-3 font-bold">
                    Klik untuk Pilih Foto
                  </p>
                  <p className="text-gray-400 text-xs mt-1">Maks. 10MB (JPG, PNG, WEBP)</p>
                </div>
              )}
              {uploading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gray-200 border-t-[#F65456] rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* Kontrol Fokus Crop (Atas, Tengah, Bawah) */}
            {previewUrl && (
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700 font-mono flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-[#F65456]">crop</span>
                    Posisi Fokus Gambar (Crop)
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setObjectPosition("top")}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      objectPosition === "top"
                        ? "bg-[#F65456] text-white shadow-xs"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">align_vertical_top</span>
                    <span>Atas</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setObjectPosition("center")}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      objectPosition === "center"
                        ? "bg-[#F65456] text-white shadow-xs"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">align_vertical_center</span>
                    <span>Tengah</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setObjectPosition("bottom")}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      objectPosition === "bottom"
                        ? "bg-[#F65456] text-white shadow-xs"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">align_vertical_bottom</span>
                    <span>Bawah</span>
                  </button>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <div>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setPreviewUrl(e.target.value);
                }}
                placeholder="URL gambar langsung (opsional): https://... atau /images/..."
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456] bg-gray-50/50 font-mono"
              />
            </div>
          </div>

          {/* Kolom Kanan: Detail & Form Input */}
          <div className="lg:col-span-5 space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-mono">
                Judul {galleryType === "beranda" ? "Media" : "Produk"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  galleryType === "beranda"
                    ? "cth. Mesin Spot UV Otomatis"
                    : "cth. Rigid Box Parfum Hot Stamp Gold"
                }
                className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#F65456] transition"
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
                    placeholder="cth. Spot UV, Hot Foil"
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#F65456] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-mono">
                    Link Instagram / TikTok
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://instagram.com/reel/... atau https://tiktok.com/..."
                      className="flex-1 min-w-0 bg-white border border-gray-300 rounded-xl px-3 py-2 text-gray-900 text-xs focus:outline-none focus:border-[#F65456] transition font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => handleAutoFetchThumbnail()}
                      disabled={fetchingThumb || !videoUrl.trim()}
                      className="px-3 py-2 bg-[#F65456] hover:bg-[#E03F41] text-white rounded-xl text-xs font-bold shrink-0 transition shadow-xs disabled:opacity-40 flex items-center gap-1 cursor-pointer"
                    >
                      {fetchingThumb ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-xs">progress_activity</span>
                          <span>Mengunduh...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-xs">download</span>
                          <span>Ambil Thumbnail</span>
                        </>
                      )}
                    </button>
                  </div>
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
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#F65456] transition"
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
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#F65456] transition"
                  >
                    {GALLERY_TECHNIQUES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-mono">
                    Link Instagram / TikTok (Opsional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://instagram.com/reel/... atau https://tiktok.com/..."
                      className="flex-1 min-w-0 bg-white border border-gray-300 rounded-xl px-3 py-2 text-gray-900 text-xs focus:outline-none focus:border-[#F65456] transition font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => handleAutoFetchThumbnail()}
                      disabled={fetchingThumb || !videoUrl.trim()}
                      className="px-3 py-2 bg-[#F65456] hover:bg-[#E03F41] text-white rounded-xl text-xs font-bold shrink-0 transition disabled:opacity-40 flex items-center gap-1 cursor-pointer"
                    >
                      {fetchingThumb ? (
                        <span className="material-symbols-outlined animate-spin text-xs">progress_activity</span>
                      ) : (
                        <span className="material-symbols-outlined text-xs">download</span>
                      )}
                      <span>Ambil Foto</span>
                    </button>
                  </div>
                </div>
              </>
            )}

            <label className="flex items-center gap-2 cursor-pointer select-none pt-2">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-[#F65456] focus:ring-[#F65456] cursor-pointer"
              />
              <span className="text-xs sm:text-sm text-gray-700 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-amber-500 text-base">star</span>
                Tampilkan sebagai unggulan prioritas
              </span>
            </label>
          </div>
        </div>
      </div>
    </AdminModal>
  );
}

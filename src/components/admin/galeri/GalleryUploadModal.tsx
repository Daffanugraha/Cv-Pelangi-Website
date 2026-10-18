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
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; initX: number; initY: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [uploading, setUploading] = useState(false);
  const [fetchingThumb, setFetchingThumb] = useState(false);
  const [thumbSuccessMsg, setThumbSuccessMsg] = useState("");
  const [previewTab, setPreviewTab] = useState<"foto" | "video">("foto");
  const [caption, setCaption] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function getEmbedUrl(url: string): { type: "iframe" | "video" | "external"; embedUrl: string } | null {
    if (!url) return null;
    const clean = url.trim();

    // YouTube / YouTube Shorts
    const yt = clean.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (yt) {
      return { type: "iframe", embedUrl: `https://www.youtube-nocookie.com/embed/${yt[1]}` };
    }

    // Instagram Reel / Post
    const ig = clean.match(/(?:instagram\.com)\/(?:reel|p)\/([a-zA-Z0-9_\-]+)/);
    if (ig) {
      return { type: "iframe", embedUrl: `https://www.instagram.com/reel/${ig[1]}/embed/` };
    }

    // TikTok
    const tt = clean.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
    if (tt) {
      return { type: "iframe", embedUrl: `https://www.tiktok.com/embed/v2/${tt[1]}` };
    }

    // Direct MP4 / WebM
    if (clean.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i)) {
      return { type: "video", embedUrl: clean };
    }

    return { type: "external", embedUrl: clean };
  }

  function parsePosition(pos?: string) {
    if (!pos || pos === "center") return { x: 50, y: 50 };
    if (pos === "top") return { x: 50, y: 15 };
    if (pos === "bottom") return { x: 50, y: 85 };
    const m = pos.match(/(\d+)%\s+(\d+)%/);
    if (m) {
      return { x: parseInt(m[1], 10), y: parseInt(m[2], 10) };
    }
    return { x: 50, y: 50 };
  }

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
      const { x, y } = parsePosition(item.objectPosition);
      setPosX(x);
      setPosY(y);
      setCaption(item.caption || item.description || item.desc || "");
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
      setPosX(50);
      setPosY(50);
      setCaption("");
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

  // Interactive Drag & Pan handlers for custom thumbnail positioning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!previewUrl) return;
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: posX,
      initY: posY,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStartRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const deltaX = e.clientX - dragStartRef.current.startX;
    const deltaY = e.clientY - dragStartRef.current.startY;

    const pctX = (deltaX / rect.width) * 100;
    const pctY = (deltaY / rect.height) * 100;

    const newX = Math.min(100, Math.max(0, Math.round(dragStartRef.current.initX - pctX)));
    const newY = Math.min(100, Math.max(0, Math.round(dragStartRef.current.initY - pctY)));

    setPosX(newX);
    setPosY(newY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!previewUrl || e.touches.length === 0) return;
    const touch = e.touches[0];
    setIsDragging(true);
    dragStartRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      initX: posX,
      initY: posY,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !dragStartRef.current || !containerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const deltaX = touch.clientX - dragStartRef.current.startX;
    const deltaY = touch.clientY - dragStartRef.current.startY;

    const pctX = (deltaX / rect.width) * 100;
    const pctY = (deltaY / rect.height) * 100;

    const newX = Math.min(100, Math.max(0, Math.round(dragStartRef.current.initX - pctX)));
    const newY = Math.min(100, Math.max(0, Math.round(dragStartRef.current.initY - pctY)));

    setPosX(newX);
    setPosY(newY);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

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
        objectPosition: `${posX}% ${posY}%`,
        caption: caption.trim(),
        description: caption.trim(),
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
              {videoUrl.trim() ? (
                <div className="p-0.5 bg-gray-100 rounded-lg flex gap-1">
                  <button
                    type="button"
                    onClick={() => setPreviewTab("foto")}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition cursor-pointer flex items-center gap-1 ${
                      previewTab === "foto"
                        ? "bg-white text-gray-900 shadow-2xs"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    <span className="material-symbols-outlined text-xs text-[#F65456]">image</span>
                    <span>Thumbnail Foto</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTab("video")}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition cursor-pointer flex items-center gap-1 ${
                      previewTab === "video"
                        ? "bg-[#F65456] text-white shadow-2xs"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    <span className="material-symbols-outlined text-xs">play_circle</span>
                    <span>Preview Video</span>
                  </button>
                </div>
              ) : (
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider font-mono">
                  Foto / Sampul <span className="text-red-500">*</span>
                </label>
              )}

              <div className="flex items-center gap-2">
                {previewUrl && previewTab === "foto" && (
                  <button
                    type="button"
                    onClick={() => {
                      setPosX(50);
                      setPosY(50);
                    }}
                    title="Kembalikan posisi thumbnail ke tengah (50% 50%)"
                    className="text-[11px] text-gray-500 hover:text-[#F65456] font-semibold flex items-center gap-0.5 cursor-pointer px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 transition"
                  >
                    <span className="material-symbols-outlined text-xs">restart_alt</span>
                    Reset Posisi
                  </button>
                )}
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
            </div>

            {/* Container Preview: Foto (Mouse Drag) atau Video Player */}
            {previewTab === "video" && videoUrl.trim() ? (
              (() => {
                const embedInfo = getEmbedUrl(videoUrl);
                return (
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] min-h-[260px] sm:min-h-[320px] w-full rounded-2xl border-2 border-gray-200 overflow-hidden bg-black flex items-center justify-center shadow-xs">
                    {embedInfo?.type === "iframe" ? (
                      <iframe
                        src={embedInfo.embedUrl}
                        className="w-full h-full border-0"
                        allowFullScreen
                        scrolling="no"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        title="Preview Video"
                      />
                    ) : embedInfo?.type === "video" ? (
                      <video
                        src={embedInfo.embedUrl}
                        controls
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="p-6 text-center text-white flex flex-col items-center justify-center">
                        <span className="material-symbols-outlined text-5xl text-[#F65456] mb-2">play_circle</span>
                        <p className="text-sm font-bold text-white mb-1">Preview Video Siap</p>
                        <p className="text-gray-400 text-xs mb-3 max-w-sm truncate">{videoUrl}</p>
                        <a
                          href={videoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F65456] hover:bg-[#E03F41] text-white text-xs font-bold transition shadow-xs"
                        >
                          <span>Tonton Video di Tab Baru</span>
                          <span className="material-symbols-outlined text-xs">open_in_new</span>
                        </a>
                      </div>
                    )}
                  </div>
                );
              })()
            ) : (
              /* Container Preview Gambar yang Besar & Interaktif Pan/Drag via Mouse */
              <div
                ref={containerRef}
                onClick={() => !previewUrl && fileInputRef.current?.click()}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={`relative aspect-[16/10] sm:aspect-[16/9] min-h-[260px] sm:min-h-[320px] w-full rounded-2xl border-2 ${
                  previewUrl
                    ? `border-gray-200 select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`
                    : "border-dashed border-gray-300 hover:border-[#F65456] cursor-pointer"
                } transition-colors overflow-hidden bg-gray-900 flex items-center justify-center group shadow-xs`}
              >
                {previewUrl ? (
                  <>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      draggable={false}
                      className="w-full h-full object-cover pointer-events-none select-none transition-[object-position] duration-75"
                      style={{ objectPosition: `${posX}% ${posY}%` }}
                    />
                    {/* Badge Posisi Saat Ini */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1.5 shadow-sm pointer-events-none">
                      <span className="material-symbols-outlined text-xs text-[#F65456]">pan_tool</span>
                      <span>
                        Posisi: {posX}% X, {posY}% Y
                      </span>
                    </div>
                    {/* Hint Drag Overlay */}
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-medium flex items-center gap-1 pointer-events-none">
                      <span className="material-symbols-outlined text-[13px]">drag_indicator</span>
                      <span>Geser Foto dengan Mouse</span>
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

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-mono">
                Caption / Deskripsi Singkat
              </label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={2}
                placeholder={
                  galleryType === "beranda"
                    ? "cth. Hasil pengerjaan mesin Spot UV berkecepatan tinggi dengan detail kilap presisi..."
                    : "cth. Finishing cetak hot stamping gold mewah dengan kombinasi laminasi doff..."
                }
                className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#F65456] transition resize-none placeholder:text-gray-400"
              />
            </div>

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

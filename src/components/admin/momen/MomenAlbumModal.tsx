"use client";

import React, { useState, useEffect } from "react";
import AdminModal from "../AdminModal";
import type { MomenAlbumItem } from "@/lib/admin/db";

interface FormPhotoState {
  src: string;
  title: string;
  cardTitle: string;
  caption: string;
  cardDesc: string;
  alt: string;
  isUploading?: boolean;
}

interface MomenAlbumModalProps {
  isOpen: boolean;
  album: MomenAlbumItem | null;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export default function MomenAlbumModal({
  isOpen,
  album,
  onClose,
  onSuccess,
}: MomenAlbumModalProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formIsHighlight, setFormIsHighlight] = useState(true);
  const [formPhotos, setFormPhotos] = useState<FormPhotoState[]>([]);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    if (album) {
      setEditingId(album.id || album.category);
      setFormTitle(album.title || "");
      setFormCategory(album.category || "");
      setFormDesc(album.desc || "");
      setFormIsHighlight(album.isHighlight !== false);
      setFormPhotos(
        album.photos?.length
          ? album.photos.map((p) => ({
              src: p.src || "",
              title: p.title || p.cardTitle || "",
              cardTitle: p.cardTitle || p.title || "",
              caption: p.caption || p.cardDesc || "",
              cardDesc: p.cardDesc || p.caption || "",
              alt: p.alt || p.title || "",
            }))
          : [
              {
                src: "",
                title: "",
                cardTitle: "",
                caption: "",
                cardDesc: "",
                alt: "",
              },
            ]
      );
    } else {
      setEditingId(null);
      setFormTitle("");
      setFormCategory("");
      setFormDesc("");
      setFormIsHighlight(true);
      setFormPhotos([
        {
          src: "",
          title: "",
          cardTitle: "",
          caption: "",
          cardDesc: "",
          alt: "",
        },
      ]);
    }
    setFormError("");
  }, [isOpen, album]);

  function handleAddPhotoSlot() {
    setFormPhotos((prev) => [
      ...prev,
      {
        src: "",
        title: "",
        cardTitle: "",
        caption: "",
        cardDesc: "",
        alt: "",
      },
    ]);
  }

  function handleRemovePhotoSlot(idx: number) {
    if (formPhotos.length <= 1) {
      alert("Momen harus memiliki minimal 1 foto.");
      return;
    }
    setFormPhotos((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleMovePhoto(idx: number, direction: "up" | "down") {
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= formPhotos.length) return;
    setFormPhotos((prev) => {
      const copy = [...prev];
      const temp = copy[idx];
      copy[idx] = copy[targetIdx];
      copy[targetIdx] = temp;
      return copy;
    });
  }

  function handlePhotoChange(idx: number, field: keyof FormPhotoState, value: any) {
    setFormPhotos((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      if (field === "title" && !copy[idx].cardTitle) {
        copy[idx].cardTitle = value;
      }
      if (field === "caption" && !copy[idx].cardDesc) {
        copy[idx].cardDesc = value;
      }
      return copy;
    });
  }

  async function handleFileUpload(idx: number, file: File) {
    handlePhotoChange(idx, "isUploading", true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Gagal mengunggah gambar");
        return;
      }

      handlePhotoChange(idx, "src", data.url);
      if (!formPhotos[idx].title) {
        const defaultName = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
        handlePhotoChange(idx, "title", defaultName);
        handlePhotoChange(idx, "cardTitle", defaultName);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengunggah file");
    } finally {
      handlePhotoChange(idx, "isUploading", false);
    }
  }

  async function handleSave() {
    setFormError("");

    if (!formTitle.trim()) {
      setFormError("Judul momen wajib diisi.");
      return;
    }

    if (!formDesc.trim()) {
      setFormError("Deskripsi momen wajib diisi.");
      return;
    }

    const validPhotos = formPhotos.filter((p) => Boolean(p.src.trim()));
    if (validPhotos.length === 0) {
      setFormError("Minimal harus ada 1 foto dengan URL gambar atau file yang diupload.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        id: editingId,
        title: formTitle.trim(),
        category:
          formCategory.trim() ||
          formTitle
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "")
            .slice(0, 15),
        desc: formDesc.trim(),
        isHighlight: formIsHighlight,
        photos: validPhotos.map((p, idx) => ({
          src: p.src.trim(),
          title: p.title.trim() || `Foto ${idx + 1}`,
          cardTitle: p.cardTitle.trim() || p.title.trim() || `Foto ${idx + 1}`,
          caption: p.caption.trim() || p.cardDesc.trim() || "",
          cardDesc: p.cardDesc.trim() || p.caption.trim() || "",
          alt: p.alt.trim() || p.title.trim() || `Foto ${idx + 1}`,
        })),
      };

      const url = "/api/admin/momen";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (!res.ok) {
        setFormError(resData.error || "Gagal menyimpan momen");
        setSaving(false);
        return;
      }

      onSuccess(
        editingId
          ? "Momen berhasil diperbarui!"
          : "Momen baru berhasil ditambahkan!"
      );
      onClose();
    } catch (err) {
      console.error(err);
      setFormError("Terjadi kesalahan jaringan.");
    } finally {
      setSaving(false);
    }
  }

  if (!isOpen) return null;

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={editingId ? "Edit Momen Kegiatan" : "Tambah Momen Kegiatan Baru"}
      subtitle="Isi data momen dan tambahkan gambar lengkap dengan caption & deskripsi."
      maxWidth="4xl"
      footer={
        <div className="w-full flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-100 text-xs font-semibold text-gray-700 transition cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
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
                <span className="material-symbols-outlined text-sm">save</span>
                <span>{editingId ? "Perbarui Momen" : "Simpan Momen"}</span>
              </>
            )}
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {formError && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{formError}</span>
          </div>
        )}

        {/* Section 1: Informasi Utama */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
            1. Informasi Utama Momen
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Judul Momen <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Surabaya Printing Expo 2026"
                value={formTitle}
                onChange={(e) => {
                  setFormTitle(e.target.value);
                  if (!editingId && !formCategory) {
                    setFormCategory(
                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "")
                        .slice(0, 15)
                    );
                  }
                }}
                className="w-full px-3.5 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Kategori / Slug Filter
              </label>
              <input
                type="text"
                placeholder="Contoh: expo2026 atau gathering2026"
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456] font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Deskripsi Momen <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Jelaskan mengenai momen ini, kegiatan yang diadakan, interaksi tim, atau nilai bersejarahnya..."
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456]"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isHighlight"
              checked={formIsHighlight}
              onChange={(e) => setFormIsHighlight(e.target.checked)}
              className="w-4 h-4 text-[#F65456] rounded border-gray-300 focus:ring-[#F65456] cursor-pointer"
            />
            <label htmlFor="isHighlight" className="text-xs text-gray-700 font-medium cursor-pointer">
              Tampilkan di banner Showcase Highlight Momen
            </label>
          </div>
        </div>

        {/* Section 2: Daftar Gambar & Caption */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
                2. Gambar & Caption ({formPhotos.length} Foto)
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Tambahkan foto, unggah file atau masukkan URL, serta atur judul dan caption masing-masing.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddPhotoSlot}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-semibold transition cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>+ Tambah Foto</span>
            </button>
          </div>

          {/* List of Photo Cards */}
          <div className="space-y-3">
            {formPhotos.map((photo, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-gray-200/80">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#F65456] text-white text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-gray-800">
                      Foto #{idx + 1}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {idx > 0 && (
                      <button
                        type="button"
                        onClick={() => handleMovePhoto(idx, "up")}
                        title="Geser ke atas"
                        className="w-6 h-6 rounded flex items-center justify-center text-gray-500 hover:bg-gray-200 text-xs cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                      </button>
                    )}
                    {idx < formPhotos.length - 1 && (
                      <button
                        type="button"
                        onClick={() => handleMovePhoto(idx, "down")}
                        title="Geser ke bawah"
                        className="w-6 h-6 rounded flex items-center justify-center text-gray-500 hover:bg-gray-200 text-xs cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">arrow_downward</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemovePhotoSlot(idx)}
                      title="Hapus foto ini"
                      className="w-6 h-6 rounded flex items-center justify-center text-red-500 hover:bg-red-50 text-xs ml-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
                  {/* Thumbnail Preview */}
                  <div className="md:col-span-3">
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Pratinjau Foto
                    </label>
                    <div className="w-full aspect-video rounded-xl overflow-hidden border border-gray-200 bg-white flex items-center justify-center relative">
                      {photo.src ? (
                        <img
                          src={photo.src}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-2 text-gray-400">
                          <span className="material-symbols-outlined text-2xl">
                            image
                          </span>
                          <p className="text-[10px] mt-0.5">Belum ada gambar</p>
                        </div>
                      )}
                      {photo.isUploading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">
                          <span className="material-symbols-outlined animate-spin text-xl">
                            progress_activity
                          </span>
                        </div>
                      )}
                    </div>

                    <label className="mt-2 block w-full text-center px-2 py-1.5 rounded-xl border border-gray-300 hover:border-[#F65456] hover:text-[#F65456] bg-white text-[11px] font-semibold text-gray-700 cursor-pointer transition shadow-2xs">
                      <span className="inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">upload</span>
                        <span>Unggah Berkas</span>
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(idx, file);
                        }}
                      />
                    </label>
                  </div>

                  {/* Fields */}
                  <div className="md:col-span-9 space-y-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">
                        URL Gambar Foto <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="https://... atau /images/... atau unggah berkas"
                        value={photo.src}
                        onChange={(e) => handlePhotoChange(idx, "src", e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456] bg-white font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">
                          Judul Foto
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: Booth Pameran CV Pelangi UV"
                          value={photo.cardTitle || photo.title}
                          onChange={(e) => {
                            handlePhotoChange(idx, "cardTitle", e.target.value);
                            handlePhotoChange(idx, "title", e.target.value);
                          }}
                          className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456] bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">
                          Caption Foto
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: Interaksi tim dan mitra industri percetakan"
                          value={photo.caption}
                          onChange={(e) => handlePhotoChange(idx, "caption", e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456] bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">
                        Deskripsi Singkat Kartu
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Sambutan hangat di booth SPE 2025"
                        value={photo.cardDesc}
                        onChange={(e) => handlePhotoChange(idx, "cardDesc", e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456] bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddPhotoSlot}
            className="w-full py-2.5 rounded-xl border border-dashed border-gray-300 hover:border-[#F65456] hover:bg-red-50/30 text-xs font-semibold text-gray-600 hover:text-[#F65456] transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>Tambah Foto Lainnya ke Momen Ini</span>
          </button>
        </div>
      </div>
    </AdminModal>
  );
}

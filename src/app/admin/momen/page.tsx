"use client";

import { useEffect, useState, useRef } from "react";
import AdminShell from "../AdminShell";
import { useRouter } from "next/navigation";
import type { MomenAlbumItem, MomenPhotoItem } from "@/lib/admin/db";

interface FormPhotoState {
  src: string;
  title: string;
  cardTitle: string;
  caption: string;
  cardDesc: string;
  alt: string;
  isUploading?: boolean;
}

export default function AdminMomenPage() {
  const router = useRouter();
  const [albums, setAlbums] = useState<MomenAlbumItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formIsHighlight, setFormIsHighlight] = useState(true);
  const [formPhotos, setFormPhotos] = useState<FormPhotoState[]>([]);
  const [formError, setFormError] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  useEffect(() => {
    loadAlbums();
  }, [router]);

  async function loadAlbums() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/momen");
      if (res.status === 401) {
        router.push("/admin");
        return;
      }
      const data = await res.json();
      setAlbums(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Gagal memuat momen:", err);
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
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
    setFormError("");
    setIsModalOpen(true);
  }

  function openEditModal(album: MomenAlbumItem) {
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
    setFormError("");
    setIsModalOpen(true);
  }

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
      // Sync helpers for convenience
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

      setFeedbackMsg(
        editingId
          ? "Momen berhasil diperbarui!"
          : "Momen baru berhasil ditambahkan!"
      );
      setTimeout(() => setFeedbackMsg(""), 3500);

      setIsModalOpen(false);
      loadAlbums();
    } catch (err) {
      console.error(err);
      setFormError("Terjadi kesalahan jaringan.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(album: MomenAlbumItem) {
    const confirmDelete = window.confirm(
      `Apakah Anda yakin ingin menghapus momen "${album.title}" beserta ${album.photos.length} fotonya?`
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/momen?id=${encodeURIComponent(album.id || album.category)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setFeedbackMsg(`Momen "${album.title}" berhasil dihapus.`);
        setTimeout(() => setFeedbackMsg(""), 3000);
        loadAlbums();
      } else {
        alert("Gagal menghapus momen.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menghapus momen.");
    }
  }

  // Filter list by search query
  const filteredAlbums = albums.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.desc.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalPhotos = albums.reduce((acc, a) => acc + (a.photos?.length || 0), 0);

  return (
    <AdminShell>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* Feedback Alert Toast */}
        {feedbackMsg && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center justify-between shadow-sm animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600">check_circle</span>
              <span>{feedbackMsg}</span>
            </div>
            <button onClick={() => setFeedbackMsg("")} className="text-emerald-500 hover:text-emerald-700">
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        )}

        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200/80">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-2xl text-bracket-border">
                collections_bookmark
              </span>
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-gray-900 tracking-tight">
                Momen & Kegiatan
              </h1>
            </div>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-bracket-border hover:bg-bracket-border/90 text-white font-medium text-sm transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer shrink-0 self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-lg">add_photo_alternate</span>
            <span>+ Tambah Momen Baru</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="material-symbols-outlined text-2xl text-bracket-border">photo_library</span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-red-50 text-bracket-border">
                Album
              </span>
            </div>
            <p className="text-3xl font-heading font-extrabold text-gray-900">{albums.length}</p>
            <p className="text-xs text-gray-500 mt-1">Total Album Kegiatan</p>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="material-symbols-outlined text-2xl text-blue-600">image</span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                Koleksi
              </span>
            </div>
            <p className="text-3xl font-heading font-extrabold text-gray-900">{totalPhotos}</p>
            <p className="text-xs text-gray-500 mt-1">Total Foto Tersimpan</p>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="material-symbols-outlined text-2xl text-emerald-600">visibility</span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                Live
              </span>
            </div>
            <p className="text-sm font-semibold text-gray-900 truncate">
              {albums[0]?.title || "Belum ada momen"}
            </p>
            <p className="text-xs text-gray-500 mt-1">Momen Terbaru Publik</p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <span className="material-symbols-outlined text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Cari momen atau kegiatan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-bracket-border focus:ring-1 focus:ring-bracket-border bg-gray-50/50"
            />
          </div>

          <div className="text-xs text-gray-500 self-end sm:self-center font-mono">
            Menampilkan <span className="font-bold text-gray-800">{filteredAlbums.length}</span> dari {albums.length} momen
          </div>
        </div>

        {/* Album Cards List */}
        {loading ? (
          <div className="py-20 text-center">
            <span className="material-symbols-outlined animate-spin text-3xl text-bracket-border mb-2">
              progress_activity
            </span>
            <p className="text-sm text-gray-500">Memuat album momen & kegiatan...</p>
          </div>
        ) : filteredAlbums.length === 0 ? (
          <div className="bg-white border border-gray-200/80 rounded-2xl p-12 text-center shadow-sm">
            <span className="material-symbols-outlined text-5xl text-gray-300 mb-3">
              image_not_supported
            </span>
            <h3 className="text-base font-bold text-gray-800">Tidak ada momen yang ditemukan</h3>
            <p className="text-xs text-gray-500 mt-1">
              {search ? "Coba kata kunci pencarian yang lain." : "Mulai dengan menambahkan momen kegiatan baru."}
            </p>
            <button
              onClick={openAddModal}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-bracket-border text-white text-xs font-semibold hover:bg-bracket-border/90 transition shadow-sm"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>Tambah Momen Sekarang</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {filteredAlbums.map((album) => (
              <div
                key={album.id || album.category}
                className="bg-white border border-gray-200/80 rounded-2xl p-5 sm:p-6 shadow-sm hover:border-bracket-border/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header: Title, Category Badge, Action Buttons */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-gray-100">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-heading font-bold text-gray-900 group-hover:text-bracket-border transition-colors">
                          {album.title}
                        </h2>
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                          #{album.category}
                        </span>
                        {album.isHighlight && (
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">star</span> Highlight
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 font-sans line-clamp-2 leading-relaxed">
                        {album.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      <button
                        onClick={() => openEditModal(album)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-bracket-border hover:text-bracket-border bg-gray-50 hover:bg-red-50/50 text-xs font-medium text-gray-700 transition"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(album)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-xs font-medium text-red-600 transition"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>

                  {/* Photo Thumbnails Preview */}
                  <div className="pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-bold text-gray-700 uppercase tracking-wider font-mono">
                        Daftar Foto ({album.photos?.length || 0} Foto)
                      </p>
                      <span className="text-[11px] text-gray-400">
                        Klik Edit untuk menambah/mengubah caption & deskripsi
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {album.photos?.slice(0, 6).map((photo, pIdx) => (
                        <div
                          key={pIdx}
                          className="relative group/thumb rounded-xl overflow-hidden border border-gray-200 bg-gray-50 aspect-video"
                        >
                          <img
                            src={photo.src}
                            alt={photo.alt || photo.title}
                            className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/thumb:opacity-100 transition-opacity p-2 flex flex-col justify-end text-white text-[10px]">
                            <p className="font-bold truncate">{photo.cardTitle || photo.title}</p>
                            <p className="text-gray-300 line-clamp-1 text-[9px]">{photo.caption}</p>
                          </div>
                        </div>
                      ))}
                      {album.photos && album.photos.length > 6 && (
                        <div
                          onClick={() => openEditModal(album)}
                          className="rounded-xl border border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center p-2 text-center aspect-video cursor-pointer hover:bg-red-50/50 hover:border-bracket-border transition"
                        >
                          <span className="text-xs font-bold text-gray-600">
                            +{album.photos.length - 6} Lainnya
                          </span>
                          <span className="text-[10px] text-gray-400">Lihat semua</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Form Tambah / Edit Momen */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-4xl w-full border border-gray-200 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-scale-up">
              {/* Modal Header */}
              <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-gray-50/80 shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-2xl text-bracket-border">
                    {editingId ? "edit_calendar" : "add_photo_alternate"}
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-heading font-bold text-gray-900">
                      {editingId ? "Edit Momen Kegiatan" : "Tambah Momen Kegiatan Baru"}
                    </h2>
                    <p className="text-xs text-gray-500">
                      Isi data momen dan tambahkan beberapa gambar lengkap dengan caption & deskripsi.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-gray-200 text-gray-500 flex items-center justify-center transition"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
                {formError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">error</span>
                    <span>{formError}</span>
                  </div>
                )}

                {/* Section 1: Informasi Dasar Momen */}
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
                        className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-bracket-border focus:ring-1 focus:ring-bracket-border"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Kategori / Filter Key (Slug)
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: expo2026 atau gathering2026"
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-bracket-border focus:ring-1 focus:ring-bracket-border font-mono text-xs"
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
                      className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-bracket-border focus:ring-1 focus:ring-bracket-border"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="isHighlight"
                      checked={formIsHighlight}
                      onChange={(e) => setFormIsHighlight(e.target.checked)}
                      className="w-4 h-4 text-bracket-border rounded border-gray-300 focus:ring-bracket-border cursor-pointer"
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
                        Anda dapat menambahkan beberapa foto, mengunggah file langsung atau menggunakan URL, serta mengatur caption masing-masing.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddPhotoSlot}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-black text-white text-xs font-medium transition cursor-pointer shadow-sm"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                      <span>+ Tambah Foto</span>
                    </button>
                  </div>

                  {/* List of Photo Cards */}
                  <div className="space-y-4">
                    {formPhotos.map((photo, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 space-y-3 relative group"
                      >
                        {/* Photo item top bar */}
                        <div className="flex items-center justify-between pb-2 border-b border-gray-200/80">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-bracket-border text-white text-[10px] font-bold flex items-center justify-center">
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
                                className="w-6 h-6 rounded flex items-center justify-center text-gray-500 hover:bg-gray-200 text-xs"
                              >
                                <span className="material-symbols-outlined text-sm">arrow_upward</span>
                              </button>
                            )}
                            {idx < formPhotos.length - 1 && (
                              <button
                                type="button"
                                onClick={() => handleMovePhoto(idx, "down")}
                                title="Geser ke bawah"
                                className="w-6 h-6 rounded flex items-center justify-center text-gray-500 hover:bg-gray-200 text-xs"
                              >
                                <span className="material-symbols-outlined text-sm">arrow_downward</span>
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemovePhotoSlot(idx)}
                              title="Hapus foto ini"
                              className="w-6 h-6 rounded flex items-center justify-center text-red-500 hover:bg-red-50 text-xs ml-1"
                            >
                              <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                          </div>
                        </div>

                        {/* Image Upload / URL Input & Preview */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
                          {/* Thumbnail Preview */}
                          <div className="md:col-span-3">
                            <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                              Pratinjau Foto
                            </label>
                            <div className="w-full aspect-video rounded-lg overflow-hidden border border-gray-200 bg-white flex items-center justify-center relative">
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

                            {/* Upload button */}
                            <label className="mt-2 block w-full text-center px-2 py-1 rounded-lg border border-gray-300 hover:border-bracket-border hover:text-bracket-border bg-white text-[11px] font-medium text-gray-700 cursor-pointer transition shadow-sm">
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
                                className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-bracket-border bg-white font-mono"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">
                                  Judul Foto (Kartu & Modal)
                                </label>
                                <input
                                  type="text"
                                  placeholder="Contoh: Booth Pameran CV Pelangi UV"
                                  value={photo.cardTitle || photo.title}
                                  onChange={(e) => {
                                    handlePhotoChange(idx, "cardTitle", e.target.value);
                                    handlePhotoChange(idx, "title", e.target.value);
                                  }}
                                  className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-bracket-border bg-white"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">
                                  Caption Foto (Saat Dibuka di Modal)
                                </label>
                                <input
                                  type="text"
                                  placeholder="Contoh: Interaksi tim dan mitra industri percetakan"
                                  value={photo.caption}
                                  onChange={(e) => handlePhotoChange(idx, "caption", e.target.value)}
                                  className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-bracket-border bg-white"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">
                                Deskripsi Singkat Kartu Foto
                              </label>
                              <input
                                type="text"
                                placeholder="Contoh: Sambutan hangat di booth SPE 2025"
                                value={photo.cardDesc}
                                onChange={(e) => handlePhotoChange(idx, "cardDesc", e.target.value)}
                                className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-bracket-border bg-white"
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
                    className="w-full py-2.5 rounded-xl border border-dashed border-gray-300 hover:border-bracket-border hover:bg-red-50/30 text-xs font-semibold text-gray-600 hover:text-bracket-border transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">add_circle</span>
                    <span>Tambah Foto Lainnya ke Momen Ini</span>
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 border-t border-gray-200 flex items-center justify-end gap-2.5 bg-gray-50/80 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={saving}
                  className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-100 text-xs font-semibold text-gray-700 transition"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-bracket-border hover:bg-bracket-border/90 text-white text-xs font-semibold transition shadow-sm disabled:opacity-50 cursor-pointer"
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
                      <span>{editingId ? "Perbarui Momen" : "Simpan Momen Baru"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}

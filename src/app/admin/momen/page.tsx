"use client";

import { useEffect, useState } from "react";
import AdminShell from "../AdminShell";
import { useRouter } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import MomenAlbumCard from "@/components/admin/momen/MomenAlbumCard";
import MomenAlbumModal from "@/components/admin/momen/MomenAlbumModal";
import type { MomenAlbumItem } from "@/lib/admin/db";

export default function AdminMomenPage() {
  const router = useRouter();
  const [albums, setAlbums] = useState<MomenAlbumItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<MomenAlbumItem | null>(null);

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<MomenAlbumItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Feedback state
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

  function handleOpenAdd() {
    setEditingAlbum(null);
    setIsModalOpen(true);
  }

  function handleOpenEdit(album: MomenAlbumItem) {
    setEditingAlbum(album);
    setIsModalOpen(true);
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      const res = await fetch(
        `/api/admin/momen?id=${encodeURIComponent(deleteTarget.id || deleteTarget.category)}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setFeedbackMsg(`Momen "${deleteTarget.title}" berhasil dihapus.`);
        setTimeout(() => setFeedbackMsg(""), 3000);
        setDeleteTarget(null);
        loadAlbums();
      } else {
        alert("Gagal menghapus momen.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menghapus momen.");
    } finally {
      setDeleting(false);
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
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-xs animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600">check_circle</span>
              <span>{feedbackMsg}</span>
            </div>
            <button
              onClick={() => setFeedbackMsg("")}
              className="text-emerald-500 hover:text-emerald-700 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        )}

        {/* Header Action Bar */}
        <AdminPageHeader
          title="Momen & Kegiatan"
          description="Dokumentasikan kegiatan, pameran industri, dan kenangan tim CV Pelangi UV."
          badge={`${albums.length} Album`}
          badgeVariant="primary"
          actions={
            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F65456] hover:bg-[#E03F41] text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-base">add_photo_alternate</span>
              <span>+ Tambah Momen</span>
            </button>
          }
        />

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <AdminStatCard
            label="Total Album"
            value={albums.length}
            sublabel="Momen kegiatan terdokumentasi"
            icon="collections_bookmark"
            color="red"
          />
          <AdminStatCard
            label="Koleksi Foto"
            value={totalPhotos}
            sublabel="Foto tersimpan di album"
            icon="image"
            color="blue"
          />
          <AdminStatCard
            label="Momen Terbaru"
            value={albums[0]?.title || "Belum ada"}
            sublabel="Tampil di galeri publik"
            icon="visibility"
            color="emerald"
          />
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <span className="material-symbols-outlined text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Cari momen atau kegiatan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456] bg-gray-50/50"
            />
          </div>

          <div className="text-xs text-gray-500 self-end sm:self-center font-mono">
            Menampilkan <span className="font-bold text-gray-800">{filteredAlbums.length}</span> dari {albums.length} momen
          </div>
        </div>

        {/* Album Cards List */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-[#F65456] rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs sm:text-sm text-gray-500">Memuat album momen & kegiatan...</p>
          </div>
        ) : filteredAlbums.length === 0 ? (
          <AdminEmptyState
            icon="image_not_supported"
            title="Tidak ada momen yang ditemukan"
            description={search ? "Coba kata kunci pencarian yang lain." : "Mulai dengan menambahkan momen kegiatan baru."}
            action={
              <button
                type="button"
                onClick={handleOpenAdd}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F65456] text-white text-xs font-bold hover:bg-[#E03F41] transition shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">add</span>
                <span>Tambah Momen Sekarang</span>
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {filteredAlbums.map((album) => (
              <MomenAlbumCard
                key={album.id || album.category}
                album={album}
                onEdit={handleOpenEdit}
                onDelete={(alb) => setDeleteTarget(alb)}
              />
            ))}
          </div>
        )}

        {/* Modal Form Tambah / Edit Momen */}
        <MomenAlbumModal
          isOpen={isModalOpen}
          album={editingAlbum}
          onClose={() => setIsModalOpen(false)}
          onSuccess={(msg) => {
            setFeedbackMsg(msg);
            setTimeout(() => setFeedbackMsg(""), 3500);
            loadAlbums();
          }}
        />

        {/* Dialog Konfirmasi Hapus */}
        <AdminConfirmDialog
          isOpen={!!deleteTarget}
          title="Hapus Momen Kegiatan?"
          message={`Apakah Anda yakin ingin menghapus album momen "${deleteTarget?.title}" beserta seluruh fotonya? Tindakan ini tidak dapat dibatalkan.`}
          confirmLabel="Ya, Hapus Momen"
          loading={deleting}
          onConfirm={handleConfirmDelete}
          onClose={() => setDeleteTarget(null)}
        />
      </div>
    </AdminShell>
  );
}

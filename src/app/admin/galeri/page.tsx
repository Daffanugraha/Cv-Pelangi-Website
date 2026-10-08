"use client";

import { useEffect, useState, useMemo } from "react";
import AdminShell from "../AdminShell";
import { useRouter } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import GalleryPhotoCard from "@/components/admin/galeri/GalleryPhotoCard";
import GalleryUploadModal, {
  GALLERY_CATEGORIES,
} from "@/components/admin/galeri/GalleryUploadModal";
import type { GalleryItem } from "@/lib/admin/db";

export default function AdminGaleriPage() {
  const router = useRouter();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<GalleryItem | null>(null);

  // Delete confirm state
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function fetchGallery() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/gallery");
      if (res.status === 401) {
        router.push("/admin");
        return;
      }
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Gagal memuat galeri:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGallery();
  }, [router]);

  function handleOpenUpload() {
    setEditItem(null);
    setIsModalOpen(true);
  }

  function handleOpenEdit(item: GalleryItem) {
    setEditItem(item);
    setIsModalOpen(true);
  }

  async function handleToggleFeatured(item: GalleryItem) {
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, featured: !item.featured }),
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((it) => (it.id === item.id ? { ...it, featured: !it.featured } : it))
        );
      }
    } catch (err) {
      console.error("Gagal toggle featured:", err);
    }
  }

  async function handleConfirmDelete() {
    if (!deleteTargetId) return;

    setDeleting(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteTargetId }),
      });
      if (res.ok) {
        setItems((prev) => prev.filter((it) => it.id !== deleteTargetId));
        setDeleteTargetId(null);
      }
    } catch (err) {
      console.error("Gagal menghapus foto:", err);
    } finally {
      setDeleting(false);
    }
  }

  // Filtered Items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchSearch =
        !search ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        item.technique.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        categoryFilter === "ALL" || item.category === categoryFilter;

      return matchSearch && matchCategory;
    });
  }, [items, search, categoryFilter]);

  const featuredCount = items.filter((i) => i.featured).length;

  return (
    <AdminShell>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <AdminPageHeader
          title="Galeri Hasil Cetak & Finishing"
          description="Katalog portofolio kemasan dan finishing cetak berkualitas tinggi."
          badge={`${items.length} Foto`}
          badgeVariant="primary"
          actions={
            <button
              type="button"
              onClick={handleOpenUpload}
              className="inline-flex items-center gap-2 bg-[#F65456] hover:bg-[#E03F41] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
            >
              <span className="material-symbols-outlined text-lg">add_photo_alternate</span>
              <span>Upload Foto Baru</span>
            </button>
          }
        />

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <AdminStatCard
            label="Total Foto"
            value={items.length}
            sublabel="Portofolio aktif di galeri"
            icon="photo_library"
            color="gray"
            active={categoryFilter === "ALL"}
            onClick={() => setCategoryFilter("ALL")}
          />
          <AdminStatCard
            label="Foto Unggulan"
            value={featuredCount}
            sublabel="Ditampilkan di showcase utama"
            icon="star"
            color="amber"
          />
          <AdminStatCard
            label="Kategori Produk"
            value={GALLERY_CATEGORIES.length}
            sublabel="Varian kategori finishing"
            icon="category"
            color="blue"
          />
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari judul, kategori, teknik finishing..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-semibold focus:outline-none focus:border-[#F65456]"
            >
              <option value="ALL">Semua Kategori ({items.length})</option>
              {GALLERY_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {(categoryFilter !== "ALL" || search) && (
              <button
                type="button"
                onClick={() => {
                  setCategoryFilter("ALL");
                  setSearch("");
                }}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-[#F65456] bg-red-50 hover:bg-red-100 transition cursor-pointer"
                title="Reset filter"
              >
                <span className="material-symbols-outlined text-sm">restart_alt</span>
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-[#F65456] rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs sm:text-sm text-gray-500">Memuat galeri portofolio...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <AdminEmptyState
            icon="photo_library"
            title="Belum ada foto yang cocok"
            description={
              search || categoryFilter !== "ALL"
                ? "Coba gunakan kata kunci pencarian atau kategori lain."
                : "Klik tombol 'Upload Foto Baru' untuk menambahkan portofolio pertama."
            }
            action={
              <button
                type="button"
                onClick={handleOpenUpload}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F65456] text-white text-xs font-bold hover:bg-[#E03F41] transition shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">add</span>
                <span>Upload Foto Sekarang</span>
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <GalleryPhotoCard
                key={item.id}
                item={item}
                onToggleFeatured={handleToggleFeatured}
                onEdit={handleOpenEdit}
                onDelete={(id) => setDeleteTargetId(id)}
              />
            ))}
          </div>
        )}

        {/* Upload & Edit Modal */}
        <GalleryUploadModal
          isOpen={isModalOpen}
          item={editItem}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchGallery}
        />

        {/* Delete Confirm Modal */}
        <AdminConfirmDialog
          isOpen={!!deleteTargetId}
          title="Hapus Foto Portofolio?"
          message="Apakah Anda yakin ingin menghapus foto portofolio ini? Tindakan ini bersifat permanen dan tidak dapat dibatalkan."
          confirmLabel="Ya, Hapus Foto"
          loading={deleting}
          onConfirm={handleConfirmDelete}
          onClose={() => setDeleteTargetId(null)}
        />
      </div>
    </AdminShell>
  );
}

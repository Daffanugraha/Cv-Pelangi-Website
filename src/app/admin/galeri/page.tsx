"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import AdminShell from "../AdminShell";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import GalleryPhotoCard from "@/components/admin/galeri/GalleryPhotoCard";
import GalleryUploadModal, {
  GALLERY_CATEGORIES,
} from "@/components/admin/galeri/GalleryUploadModal";
import type { GalleryItem, MomenAlbumItem } from "@/lib/admin/db";

function GaleriContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawTab = searchParams.get("tab");
  const activeTab = rawTab === "beranda" ? "beranda" : rawTab === "momen" ? "momen" : "produk";

  const [items, setItems] = useState<GalleryItem[]>([]);
  const [momenAlbums, setMomenAlbums] = useState<MomenAlbumItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedbackMsg, setFeedbackMsg] = useState("");

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
      const [galRes, momRes] = await Promise.all([
        fetch("/api/admin/gallery", { cache: "no-store" }),
        fetch("/api/admin/momen", { cache: "no-store" }),
      ]);

      if (galRes.status === 401 || momRes.status === 401) {
        router.push("/admin");
        return;
      }

      if (galRes.ok) {
        const galData = await galRes.json();
        setItems(Array.isArray(galData) ? galData : []);
      }
      if (momRes.ok) {
        const momData = await momRes.json();
        setMomenAlbums(Array.isArray(momData) ? momData : []);
      }
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

  // Filter items by active tab (produk vs beranda)
  const tabItems = useMemo(() => {
    if (activeTab === "beranda") {
      return items.filter((i) => i.galleryType === "beranda");
    }
    // Default produk: items with galleryType === "produk" or unset (legacy)
    return items.filter((i) => !i.galleryType || i.galleryType === "produk");
  }, [items, activeTab]);

  // Filtered by search & category
  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    tabItems.forEach((it) => {
      if (it.category) cats.add(it.category);
    });
    GALLERY_CATEGORIES.forEach((c) => cats.add(c));
    return Array.from(cats);
  }, [tabItems]);

  const filteredItems = useMemo(() => {
    return tabItems.filter((item) => {
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.technique && item.technique.toLowerCase().includes(q)) ||
        (item.tag && item.tag.toLowerCase().includes(q));

      const matchCategory =
        categoryFilter === "ALL" || item.category === categoryFilter;

      return matchSearch && matchCategory;
    });
  }, [tabItems, search, categoryFilter]);

  const countProduk = items.filter((i) => !i.galleryType || i.galleryType === "produk").length;
  const countBeranda = items.filter((i) => i.galleryType === "beranda").length;
  const countMomen = momenAlbums.reduce((acc, a) => acc + (a.photos?.length || 0), 0);

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
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

      {/* Header */}
      <AdminPageHeader
        title="Manajemen Galeri & Portofolio"
        description="Kelola 3 jenis galeri website: Galeri Beranda, Galeri Momen, dan Galeri Pengaplikasian Produk."
        badge={`${items.length + countMomen} Total Media`}
        badgeVariant="primary"
        actions={
          <div className="flex items-center gap-2">
            {activeTab !== "momen" ? (
              <button
                type="button"
                onClick={handleOpenUpload}
                className="inline-flex items-center gap-2 bg-[#F65456] hover:bg-[#E03F41] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
              >
                <span className="material-symbols-outlined text-lg">add_photo_alternate</span>
                <span>
                  {activeTab === "beranda" ? "+ Tambah Media Beranda" : "+ Upload Foto Produk"}
                </span>
              </button>
            ) : (
              <Link
                href="/admin/momen"
                className="inline-flex items-center gap-2 bg-[#F65456] hover:bg-[#E03F41] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
              >
                <span className="material-symbols-outlined text-lg">collections_bookmark</span>
                <span>Kelola Momen Lengkap</span>
              </Link>
            )}
            <button
              type="button"
              onClick={fetchGallery}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition shadow-xs cursor-pointer"
              title="Segarkan data"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
            </button>
          </div>
        }
      />

      {/* 3 Galeri Tabs Switcher */}
      <div className="bg-white p-1.5 rounded-2xl border border-gray-200/90 shadow-xs flex flex-col sm:flex-row gap-1">
        <Link
          href="/admin/galeri?tab=produk"
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 text-center cursor-pointer ${
            activeTab === "produk"
              ? "bg-[#111216] text-white shadow-xs"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <span className="material-symbols-outlined text-base">inventory_2</span>
          <span>1. Pengaplikasian Produk</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-mono ${
              activeTab === "produk" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            {countProduk}
          </span>
        </Link>

        <Link
          href="/admin/galeri?tab=beranda"
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 text-center cursor-pointer ${
            activeTab === "beranda"
              ? "bg-[#F65456] text-white shadow-xs"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <span className="material-symbols-outlined text-base">home</span>
          <span>2. Galeri di Beranda</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-mono ${
              activeTab === "beranda" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            {countBeranda}
          </span>
        </Link>

        <Link
          href="/admin/galeri?tab=momen"
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 text-center cursor-pointer ${
            activeTab === "momen"
              ? "bg-[#111216] text-white shadow-xs"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <span className="material-symbols-outlined text-base">collections_bookmark</span>
          <span>3. Galeri Momen Kegiatan</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-mono ${
              activeTab === "momen" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            {momenAlbums.length} Album
          </span>
        </Link>
      </div>

      {/* Content depending on Active Tab */}
      {activeTab === "momen" ? (
        /* Momen Section Summary & Quick Access */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <AdminStatCard
              label="Total Album Momen"
              value={momenAlbums.length}
              sublabel="Dokumentasi event & pameran"
              icon="collections_bookmark"
              color="red"
            />
            <AdminStatCard
              label="Total Foto Kegiatan"
              value={countMomen}
              sublabel="Koleksi foto di dalam album"
              icon="image"
              color="blue"
            />
            <AdminStatCard
              label="Halaman Publik"
              value="/galeri"
              sublabel="Tampil di menu navigasi publik"
              icon="visibility"
              color="emerald"
            />
          </div>

          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-heading font-black text-base text-gray-900">
                Pusat Dokumentasi Momen & Kegiatan Tim Pelangi UV
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-xl">
                Album kegiatan, pameran industri (SPE), gathering, dan momen internal diatur dengan fitur multi-foto, judul, serta caption lengkap.
              </p>
            </div>
            <Link
              href="/admin/momen"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F65456] hover:bg-[#E03F41] text-white font-bold text-xs sm:text-sm shadow-xs transition shrink-0"
            >
              <span>Buka Editor Momen Lengkap</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>

          {/* Album Previews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {momenAlbums.map((album) => (
              <div
                key={album.id || album.category}
                className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-xs hover:border-[#F65456]/40 transition space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                    #{album.category}
                  </span>
                  <span className="text-xs font-bold text-gray-500 font-mono">
                    {album.photos?.length || 0} Foto
                  </span>
                </div>
                <h4 className="font-bold text-sm text-gray-900 truncate">{album.title}</h4>
                <p className="text-xs text-gray-500 line-clamp-2">{album.desc}</p>
                {album.photos && album.photos[0] && (
                  <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={album.photos[0].src}
                      alt={album.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Tab Produk & Tab Beranda */
        <div className="space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <AdminStatCard
              label={activeTab === "beranda" ? "Media Beranda" : "Foto Portofolio"}
              value={tabItems.length}
              sublabel={activeTab === "beranda" ? "Tampil di landing page" : "Produk & hasil finishing"}
              icon={activeTab === "beranda" ? "home" : "inventory_2"}
              color="red"
            />
            <AdminStatCard
              label="Media Unggulan"
              value={tabItems.filter((i) => i.featured).length}
              sublabel="Disorot prioritas"
              icon="star"
              color="amber"
            />
            <AdminStatCard
              label={activeTab === "beranda" ? "Tipe Konten" : "Kategori Produk"}
              value={activeTab === "beranda" ? "Video / Foto" : GALLERY_CATEGORIES.length}
              sublabel={activeTab === "beranda" ? "Format reels & display" : "Varian kemasan"}
              icon={activeTab === "beranda" ? "play_circle" : "category"}
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
                placeholder={
                  activeTab === "beranda"
                    ? "Cari media beranda, tag, reels..."
                    : "Cari produk, kategori, teknik finishing..."
                }
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456]"
              />
            </div>

            {activeTab === "produk" && (
              <div className="flex items-center gap-2">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-semibold focus:outline-none focus:border-[#F65456]"
                >
                  <option value="ALL">Semua Kategori ({tabItems.length})</option>
                  {availableCategories.map((cat) => (
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
            )}
          </div>

          {/* Grid Cards */}
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-[#F65456] rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs sm:text-sm text-gray-500">Memuat koleksi galeri...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <AdminEmptyState
              icon={activeTab === "beranda" ? "home" : "inventory_2"}
              title={
                activeTab === "beranda"
                  ? "Belum ada media galeri di Beranda"
                  : "Belum ada foto pengaplikasian produk yang cocok"
              }
              description={
                search || categoryFilter !== "ALL"
                  ? "Coba gunakan kata kunci pencarian atau kategori lain."
                  : activeTab === "beranda"
                  ? "Klik tombol '+ Tambah Media Beranda' untuk menampilkan sorotan di homepage."
                  : "Klik tombol '+ Upload Foto Produk' untuk menambahkan portofolio baru."
              }
              action={
                <button
                  type="button"
                  onClick={handleOpenUpload}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F65456] text-white text-xs font-bold hover:bg-[#E03F41] transition shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                  <span>
                    {activeTab === "beranda"
                      ? "Tambah Media Beranda Sekarang"
                      : "Upload Foto Produk Sekarang"}
                  </span>
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
        </div>
      )}

      {/* Upload & Edit Modal */}
      <GalleryUploadModal
        isOpen={isModalOpen}
        item={editItem}
        defaultGalleryType={activeTab === "beranda" ? "beranda" : "produk"}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(msg, savedType) => {
          setFeedbackMsg(msg);
          setTimeout(() => setFeedbackMsg(""), 4000);
          fetchGallery();
          if (savedType !== activeTab) {
            router.push(`/admin/galeri?tab=${savedType}`);
          }
        }}
      />

      {/* Delete Confirm Modal */}
      <AdminConfirmDialog
        isOpen={!!deleteTargetId}
        title="Hapus Media Galeri?"
        message="Apakah Anda yakin ingin menghapus media ini? Tindakan ini bersifat permanen dan tidak dapat dibatalkan."
        confirmLabel="Ya, Hapus Media"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteTargetId(null)}
      />
    </div>
  );
}

export default function AdminGaleriPage() {
  return (
    <AdminShell>
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20 text-gray-400">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-[#F65456] rounded-full animate-spin" />
          </div>
        }
      >
        <GaleriContent />
      </Suspense>
    </AdminShell>
  );
}

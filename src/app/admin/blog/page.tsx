"use client";

import { useEffect, useState, useMemo } from "react";
import AdminShell from "../AdminShell";
import { useRouter } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import BlogArticleCard from "@/components/admin/blog/BlogArticleCard";
import BlogArticleModal from "@/components/admin/blog/BlogArticleModal";
import type { BlogArticleItem } from "@/lib/admin/db";

const CATEGORY_TABS = [
  { key: "all", label: "Semua Kategori" },
  { key: "mesin-teknologi", label: "Mesin & Teknologi" },
  { key: "tips-finishing", label: "Tips Finishing" },
  { key: "bahan-baku", label: "Bahan Baku" },
  { key: "kabar-perusahaan", label: "Kabar Perusahaan" },
];

export default function AdminBlogPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<BlogArticleItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<BlogArticleItem | null>(null);

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Toast feedback
  const [feedbackMsg, setFeedbackMsg] = useState("");

  async function loadArticles() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blog", { cache: "no-store" });
      if (res.status === 401) {
        router.push("/admin");
        return;
      }
      const data = await res.json();
      setArticles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Gagal memuat artikel blog:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadArticles();
  }, [router]);

  function handleOpenAdd() {
    setEditingArticle(null);
    setIsModalOpen(true);
  }

  function handleOpenEdit(art: BlogArticleItem) {
    setEditingArticle(art);
    setIsModalOpen(true);
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      const res = await fetch("/api/admin/blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteTarget.id }),
      });
      if (res.ok) {
        setFeedbackMsg(`Artikel "${deleteTarget.title}" berhasil dihapus.`);
        setTimeout(() => setFeedbackMsg(""), 3500);
        setArticles((prev) => prev.filter((a) => a.id !== deleteTarget.id));
        setDeleteTarget(null);
      }
    } catch (err) {
      console.error("Gagal menghapus artikel:", err);
    } finally {
      setDeleting(false);
    }
  }

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        art.title.toLowerCase().includes(q) ||
        art.desc.toLowerCase().includes(q) ||
        art.category.toLowerCase().includes(q) ||
        (art.author && art.author.toLowerCase().includes(q));

      const matchCategory =
        activeCategory === "all" || art.categoryKey === activeCategory;

      return matchSearch && matchCategory;
    });
  }, [articles, search, activeCategory]);

  const featuredCount = articles.filter((a) => a.isFeatured).length;

  return (
    <AdminShell>
      <div className="space-y-6">
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

        {/* Header */}
        <AdminPageHeader
          title="Manajemen Berita & Artikel Blog"
          description="Tulis, terbitkan, dan kelola artikel edukasi teknis serta berita terkini CV Pelangi UV."
          badge={`${articles.length} Artikel`}
          badgeVariant="primary"
          actions={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleOpenAdd}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F65456] hover:bg-[#E03F41] text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer shrink-0"
              >
                <span className="material-symbols-outlined text-base">edit_document</span>
                <span>+ Tulis Berita Baru</span>
              </button>
              <button
                type="button"
                onClick={loadArticles}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition shadow-xs cursor-pointer"
                title="Segarkan data"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
              </button>
            </div>
          }
        />

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <AdminStatCard
            label="Total Artikel Terbit"
            value={articles.length}
            sublabel="Berita di portal Blog website"
            icon="newspaper"
            color="red"
            active={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          />
          <AdminStatCard
            label="Artikel Sorotan"
            value={featuredCount}
            sublabel="Tampil di banner utama blog"
            icon="star"
            color="amber"
          />
          <AdminStatCard
            label="Kategori Publikasi"
            value={CATEGORY_TABS.length - 1}
            sublabel="Topik mesin, teknik & kabar"
            icon="category"
            color="blue"
          />
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari judul berita, topik, atau kata kunci artikel..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveCategory(tab.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeCategory === tab.key
                    ? "bg-[#F65456] text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-[#F65456] rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs sm:text-sm text-gray-500">Memuat artikel berita...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <AdminEmptyState
            icon="article"
            title="Tidak ada artikel berita yang cocok"
            description={
              search || activeCategory !== "all"
                ? "Coba gunakan kata kunci pencarian atau kategori yang lain."
                : "Mulai buat artikel berita pertama Anda dengan tombol di atas."
            }
            action={
              <button
                type="button"
                onClick={handleOpenAdd}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F65456] text-white text-xs font-bold hover:bg-[#E03F41] transition shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">add</span>
                <span>Tulis Berita Sekarang</span>
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredArticles.map((article) => (
              <BlogArticleCard
                key={article.id}
                article={article}
                onEdit={handleOpenEdit}
                onDelete={(id, title) => setDeleteTarget({ id, title })}
              />
            ))}
          </div>
        )}

        {/* Modal Form Tambah / Edit */}
        <BlogArticleModal
          isOpen={isModalOpen}
          article={editingArticle}
          onClose={() => setIsModalOpen(false)}
          onSuccess={(msg) => {
            setFeedbackMsg(msg);
            setTimeout(() => setFeedbackMsg(""), 3500);
            loadArticles();
          }}
        />

        {/* Confirm Delete Dialog */}
        <AdminConfirmDialog
          isOpen={!!deleteTarget}
          title="Hapus Artikel Berita?"
          message={`Apakah Anda yakin ingin menghapus artikel "${deleteTarget?.title}"? Artikel tidak akan lagi tampil di halaman publik Blog.`}
          confirmLabel="Ya, Hapus Artikel"
          loading={deleting}
          onConfirm={handleConfirmDelete}
          onClose={() => setDeleteTarget(null)}
        />
      </div>
    </AdminShell>
  );
}

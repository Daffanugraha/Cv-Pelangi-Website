"use client";

import { useEffect, useRef, useState } from "react";
import AdminShell from "../AdminShell";
import { useRouter } from "next/navigation";
import type { GalleryItem } from "@/lib/admin/db";

const CATEGORIES = ["Kemasan Skincare", "Rigid Box Parfum", "Food-grade Box", "Hardcover Book", "Shopping Bag", "Umum"];
const TECHNIQUES = ["Spot UV", "Hot Stamp Foil", "Laminating Doff", "Laminating Glossy", "Cast & Cure", "Emboss/Deboss", "Pond Otomatis", "Lainnya"];

export default function AdminGaleriPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<GalleryItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [form, setForm] = useState({
    title: "",
    category: CATEGORIES[0],
    technique: TECHNIQUES[0],
    featured: false,
    imageUrl: "",
    fileName: "",
  });

  async function fetchGallery() {
    const res = await fetch("/api/admin/gallery");
    if (res.status === 401) { router.push("/admin"); return; }
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchGallery(); }, []);

  function resetForm() {
    setForm({ title: "", category: CATEGORIES[0], technique: TECHNIQUES[0], featured: false, imageUrl: "", fileName: "" });
    setPreviewUrl("");
    setEditItem(null);
    setShowForm(false);
  }

  function openEdit(item: GalleryItem) {
    setEditItem(item);
    setForm({
      title: item.title,
      category: item.category,
      technique: item.technique,
      featured: item.featured,
      imageUrl: item.imageUrl,
      fileName: item.fileName,
    });
    setPreviewUrl(item.imageUrl);
    setShowForm(true);
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setUploading(true);

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);

    if (data.ok) {
      setForm((f) => ({ ...f, imageUrl: data.url, fileName: data.fileName }));
    } else {
      alert(data.error ?? "Upload gagal.");
    }
  }

  async function handleSave() {
    if (!form.title) { alert("Judul wajib diisi."); return; }
    if (!form.imageUrl) { alert("Upload foto terlebih dahulu."); return; }

    if (editItem) {
      await fetch("/api/admin/gallery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editItem.id, ...form }),
      });
    } else {
      await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    resetForm();
    fetchGallery();
  }

  async function handleDelete(id: string) {
    await fetch("/api/admin/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setDeleteId(null);
    fetchGallery();
  }

  async function toggleFeatured(item: GalleryItem) {
    await fetch("/api/admin/gallery", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, featured: !item.featured }),
    });
    fetchGallery();
  }

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-bracket-border rounded-full animate-spin" />
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-bracket-border/10 text-bracket-border text-xs font-bold uppercase tracking-wider mb-1 font-mono">
            Katalog Visual
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-gray-900">Galeri Hasil Cetak &amp; Finishing</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">{items.length} foto tersimpan dalam database</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 bg-bracket-border hover:bg-primary text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer active:scale-95 shrink-0"
        >
          <span className="material-symbols-outlined text-lg">add_photo_alternate</span>
          Upload Foto Baru
        </button>
      </div>

      {/* Upload / Edit Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm animate-fade-in">
          <h2 className="font-heading font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-bracket-border" />
            {editItem ? "Edit Data Foto" : "Upload Portofolio Foto Baru"}
          </h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Image Upload */}
            <div>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative aspect-video rounded-xl border-2 border-dashed border-gray-300 hover:border-bracket-border cursor-pointer transition overflow-hidden bg-gray-50 flex items-center justify-center group"
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <span className="material-symbols-outlined text-4xl text-gray-400 group-hover:text-bracket-border transition">upload_file</span>
                    <p className="text-gray-700 text-xs sm:text-sm mt-2 font-semibold">Klik untuk memilih file foto</p>
                    <p className="text-gray-400 text-xs mt-0.5">JPG, PNG, WEBP — maksimal 10MB</p>
                  </div>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-gray-200 border-t-bracket-border rounded-full animate-spin" />
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
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-mono">Judul Foto *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="cth. Rigid Box Parfum Hot Stamp Gold"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-bracket-border focus:ring-1 focus:ring-bracket-border transition font-sans"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-mono">Kategori Produk</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-bracket-border focus:ring-1 focus:ring-bracket-border transition font-sans"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-mono">Teknik Finishing</label>
                <select
                  value={form.technique}
                  onChange={(e) => setForm((f) => ({ ...f, technique: e.target.value }))}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-bracket-border focus:ring-1 focus:ring-bracket-border transition font-sans"
                >
                  {TECHNIQUES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                  className="w-4 h-4 rounded accent-bracket-border"
                />
                <span className="text-xs sm:text-sm text-gray-700 font-medium">
                  <span className="material-symbols-outlined text-amber-500 text-base align-middle mr-1">star</span>
                  Tampilkan sebagai foto unggulan di website
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
            <button
              onClick={handleSave}
              disabled={uploading}
              className="flex items-center gap-2 bg-bracket-border hover:bg-primary disabled:opacity-50 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-base">save</span>
              {editItem ? "Simpan Perubahan" : "Tambahkan ke Galeri"}
            </button>
            <button
              onClick={resetForm}
              className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 px-4 py-2.5 rounded-xl border border-gray-200 hover:border-gray-300 transition cursor-pointer"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      {items.length === 0 ? (
        <div className="bg-white border border-gray-200/80 rounded-2xl p-12 text-center shadow-xs">
          <span className="material-symbols-outlined text-5xl text-gray-300">photo_library</span>
          <p className="text-gray-700 font-semibold mt-3">Belum ada foto di galeri.</p>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">Klik tombol &ldquo;Upload Foto Baru&rdquo; untuk menambahkan portofolio pertama.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group bg-white border border-gray-200/80 rounded-2xl overflow-hidden hover:border-bracket-border/50 hover:shadow-md transition-all shadow-xs flex flex-col">
              {/* Image */}
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                {item.featured && (
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-amber-400 text-black text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                    <span className="material-symbols-outlined text-xs font-bold">star</span>
                    Unggulan
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    <span className="text-[11px] bg-bracket-border/10 text-bracket-border border border-bracket-border/20 px-2 py-0.5 rounded-full font-medium">
                      {item.category}
                    </span>
                    <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {item.technique}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center border-t border-gray-100 bg-gray-50/50">
                <button
                  onClick={() => toggleFeatured(item)}
                  title={item.featured ? "Hapus dari unggulan" : "Jadikan unggulan"}
                  className={`flex-1 py-2.5 text-xs flex items-center justify-center gap-1 transition cursor-pointer ${
                    item.featured ? "text-amber-500 hover:bg-amber-50" : "text-gray-400 hover:bg-gray-100 hover:text-amber-500"
                  }`}
                >
                  <span className="material-symbols-outlined text-base">star</span>
                </button>
                <button
                  onClick={() => openEdit(item)}
                  title="Edit foto"
                  className="flex-1 py-2.5 text-xs text-gray-500 hover:bg-gray-100 hover:text-gray-900 flex items-center justify-center gap-1 transition border-l border-gray-100 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">edit</span>
                </button>
                <button
                  onClick={() => setDeleteId(item.id)}
                  title="Hapus foto"
                  className="flex-1 py-2.5 text-xs text-gray-400 hover:bg-red-50 hover:text-red-600 flex items-center justify-center gap-1 transition border-l border-gray-100 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-red-600">delete_forever</span>
              </div>
              <div>
                <p className="font-heading font-bold text-gray-900 text-base">Hapus Foto Portofolio?</p>
                <p className="text-xs text-gray-500 mt-0.5">Tindakan ini permanen dan tidak dapat dibatalkan.</p>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold py-2.5 rounded-xl transition shadow-xs cursor-pointer active:scale-95"
              >
                Ya, Hapus
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-gray-200 text-gray-700 text-xs sm:text-sm py-2.5 rounded-xl hover:bg-gray-50 transition cursor-pointer"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

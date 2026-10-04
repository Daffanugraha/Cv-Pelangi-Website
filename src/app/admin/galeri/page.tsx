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
          <div className="w-8 h-8 border-2 border-gray-700 border-t-violet-500 rounded-full animate-spin" />
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Galeri Foto</h1>
          <p className="text-gray-400 text-sm mt-0.5">{items.length} foto tersimpan</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <span className="material-symbols-outlined text-lg">add_photo_alternate</span>
          Upload Foto
        </button>
      </div>

      {/* Upload / Edit Form */}
      {showForm && (
        <div className="bg-gray-900 border border-violet-600/30 rounded-2xl p-6 mb-6">
          <h2 className="font-semibold text-white mb-4">{editItem ? "Edit Foto" : "Upload Foto Baru"}</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Image Upload */}
            <div>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative aspect-video rounded-xl border-2 border-dashed border-gray-700 hover:border-violet-500 cursor-pointer transition overflow-hidden bg-gray-800 flex items-center justify-center"
              >
                {previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <span className="material-symbols-outlined text-4xl text-gray-600">upload_file</span>
                    <p className="text-gray-500 text-sm mt-2">Klik untuk pilih foto</p>
                    <p className="text-gray-600 text-xs">JPG, PNG, WEBP — maks 10MB</p>
                  </div>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
                <label className="block text-sm font-medium text-gray-300 mb-1">Judul Foto *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="cth. Rigid Box Parfum Hot Stamp Gold"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-violet-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Kategori Produk</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500 transition"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Teknik Finishing</label>
                <select
                  value={form.technique}
                  onChange={(e) => setForm((f) => ({ ...f, technique: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500 transition"
                >
                  {TECHNIQUES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                  className="w-4 h-4 rounded accent-violet-500"
                />
                <span className="text-sm text-gray-300">
                  <span className="material-symbols-outlined text-yellow-400 text-base align-middle mr-1">star</span>
                  Tampilkan sebagai foto unggulan
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-800">
            <button
              onClick={handleSave}
              disabled={uploading}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              <span className="material-symbols-outlined text-lg">save</span>
              {editItem ? "Simpan Perubahan" : "Tambahkan Foto"}
            </button>
            <button
              onClick={resetForm}
              className="text-sm text-gray-400 hover:text-gray-200 px-4 py-2.5 rounded-xl border border-gray-700 hover:border-gray-500 transition"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      {items.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
          <span className="material-symbols-outlined text-5xl text-gray-700">photo_library</span>
          <p className="text-gray-500 mt-3">Belum ada foto di galeri.</p>
          <p className="text-gray-600 text-sm">Klik "Upload Foto" untuk menambahkan portofolio pertama.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition">
              {/* Image */}
              <div className="aspect-video bg-gray-800 relative overflow-hidden">
                {item.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                {item.featured && (
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-yellow-500/90 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                    <span className="material-symbols-outlined text-xs">star</span>
                    Unggulan
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="text-sm font-medium text-white truncate">{item.title}</p>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full">{item.category}</span>
                  <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">{item.technique}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center border-t border-gray-800">
                <button
                  onClick={() => toggleFeatured(item)}
                  title={item.featured ? "Hapus dari unggulan" : "Jadikan unggulan"}
                  className={`flex-1 py-2.5 text-xs flex items-center justify-center gap-1 transition ${
                    item.featured ? "text-yellow-400 hover:bg-yellow-500/10" : "text-gray-500 hover:bg-gray-800 hover:text-yellow-400"
                  }`}
                >
                  <span className="material-symbols-outlined text-base">star</span>
                </button>
                <button
                  onClick={() => openEdit(item)}
                  className="flex-1 py-2.5 text-xs text-gray-400 hover:bg-gray-800 hover:text-white flex items-center justify-center gap-1 transition border-l border-gray-800"
                >
                  <span className="material-symbols-outlined text-base">edit</span>
                </button>
                <button
                  onClick={() => setDeleteId(item.id)}
                  className="flex-1 py-2.5 text-xs text-gray-500 hover:bg-red-950 hover:text-red-400 flex items-center justify-center gap-1 transition border-l border-gray-800"
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
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-950 flex items-center justify-center">
                <span className="material-symbols-outlined text-red-400">delete_forever</span>
              </div>
              <div>
                <p className="font-semibold text-white">Hapus Foto?</p>
                <p className="text-sm text-gray-400">Tindakan ini tidak bisa dibatalkan.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold py-2.5 rounded-xl transition"
              >
                Ya, Hapus
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-gray-700 text-gray-300 hover:bg-gray-800 text-sm py-2.5 rounded-xl transition"
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

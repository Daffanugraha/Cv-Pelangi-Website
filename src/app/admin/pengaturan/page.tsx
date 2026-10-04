"use client";

import { useEffect, useState } from "react";
import AdminShell from "../AdminShell";
import { useRouter } from "next/navigation";
import type { SiteSettings } from "@/lib/admin/db";

const DEFAULT: SiteSettings = {
  bannerEnabled: false,
  bannerText: "Penerimaan order finishing tutup tanggal 20. Segera konfirmasi jadwal produksi Anda.",
  waNumber: "6282231019363",
  operationalHours: "Senin – Sabtu: 08.00 – 17.00 WIB",
  closedDates: "",
};

export default function AdminPengaturanPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/settings");
      if (res.status === 401) { router.push("/admin"); return; }
      const data = await res.json();
      setSettings(data);
      setLoading(false);
    }
    load();
  }, [router]);

  async function handleSave() {
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function set<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSettings((s) => ({ ...s, [key]: value }));
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
      <div className="max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-white">Pengaturan Website</h1>
          <p className="text-gray-400 text-sm mt-0.5">Ubah konfigurasi website tanpa perlu menyentuh kode.</p>
        </div>

        {/* Success Toast */}
        {saved && (
          <div className="mb-5 flex items-center gap-3 bg-emerald-950 border border-emerald-800 rounded-xl px-4 py-3">
            <span className="material-symbols-outlined text-emerald-400">check_circle</span>
            <p className="text-sm text-emerald-300 font-medium">Pengaturan berhasil disimpan!</p>
          </div>
        )}

        {/* Section: Banner Pengumuman */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-white">Banner Pengumuman</h2>
              <p className="text-xs text-gray-500 mt-0.5">Tampilkan teks pengumuman di bagian atas website.</p>
            </div>
            {/* Toggle */}
            <button
              onClick={() => set("bannerEnabled", !settings.bannerEnabled)}
              className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
                settings.bannerEnabled ? "bg-violet-600" : "bg-gray-700"
              }`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                settings.bannerEnabled ? "translate-x-5" : "translate-x-0"
              }`} />
            </button>
          </div>
          {settings.bannerEnabled && (
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Teks Banner</label>
              <textarea
                value={settings.bannerText}
                onChange={(e) => set("bannerText", e.target.value)}
                rows={2}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-violet-500 transition resize-none"
                placeholder="Tulis pesan pengumuman di sini..."
              />
              {/* Preview */}
              <div className="mt-3 bg-violet-600 text-white text-xs text-center py-2 px-4 rounded-lg">
                📢 {settings.bannerText || "Teks banner akan tampil di sini."}
              </div>
            </div>
          )}
        </div>

        {/* Section: Kontak & WhatsApp */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-4">
          <h2 className="font-semibold text-white mb-4">Nomor WhatsApp Utama</h2>
          <div>
            <label className="block text-sm text-gray-300 mb-1.5">No. WA (format: 628xxx)</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl">chat</span>
              <input
                type="text"
                value={settings.waNumber}
                onChange={(e) => set("waNumber", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-violet-500 transition"
                placeholder="6282231019363"
              />
            </div>
            <p className="text-xs text-gray-600 mt-1.5">Contoh: 6282231019363 (tanpa tanda + atau spasi)</p>
          </div>
        </div>

        {/* Section: Jam Operasional */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-4">
          <h2 className="font-semibold text-white mb-4">Jam Operasional Pabrik</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Jam Kerja Normal</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl">schedule</span>
                <input
                  type="text"
                  value={settings.operationalHours}
                  onChange={(e) => set("operationalHours", e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-violet-500 transition"
                  placeholder="Senin – Sabtu: 08.00 – 17.00 WIB"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Tanggal Libur / Tutup (opsional)</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl">event_busy</span>
                <input
                  type="text"
                  value={settings.closedDates}
                  onChange={(e) => set("closedDates", e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-violet-500 transition"
                  placeholder="cth: 1 Jan 2025, 31 Mar – 5 Apr 2025"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold py-3 rounded-2xl transition-colors"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">save</span>
              Simpan Semua Pengaturan
            </>
          )}
        </button>
      </div>
    </AdminShell>
  );
}

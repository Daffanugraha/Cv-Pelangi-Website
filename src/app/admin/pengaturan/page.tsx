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
        <div className="flex items-center justify-center h-64 text-gray-400">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-bracket-border rounded-full animate-spin" />
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="max-w-2xl">
        {/* Header */}
        <div className="mb-6 pb-2 border-b border-gray-200">
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-gray-900">Pengaturan Website</h1>
        </div>

        {/* Success Toast */}
        {saved && (
          <div className="mb-5 flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 animate-fade-in shadow-sm">
            <span className="material-symbols-outlined text-emerald-600">check_circle</span>
            <p className="text-xs sm:text-sm text-emerald-800 font-semibold font-sans">Pengaturan berhasil disimpan ke sistem!</p>
          </div>
        )}

        {/* Section: Banner Pengumuman */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 sm:p-6 mb-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-heading font-bold text-gray-900 text-base">Banner Siaran Pengumuman</h2>
              <p className="text-xs text-gray-500 mt-0.5 font-sans">Tampilkan pita informasi prioritas di bagian atas seluruh halaman website.</p>
            </div>
            {/* Toggle */}
            <button
              onClick={() => set("bannerEnabled", !settings.bannerEnabled)}
              className={`relative w-12 h-6 rounded-full transition-colors shrink-0 cursor-pointer ${
                settings.bannerEnabled ? "bg-bracket-border shadow-sm" : "bg-gray-300"
              }`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${
                settings.bannerEnabled ? "translate-x-6" : "translate-x-0"
              }`} />
            </button>
          </div>
          {settings.bannerEnabled && (
            <div className="mt-3 pt-3 border-t border-gray-100 animate-fade-in">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-mono">Teks Pengumuman</label>
              <textarea
                value={settings.bannerText}
                onChange={(e) => set("bannerText", e.target.value)}
                rows={2}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-bracket-border focus:ring-1 focus:ring-bracket-border transition resize-none font-sans"
                placeholder="Tulis pesan pengumuman di sini..."
              />
              {/* Preview */}
              <div className="mt-3 bg-bracket-border text-white text-xs font-medium text-center py-2.5 px-4 rounded-xl shadow-sm flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">campaign</span>
                <span>{settings.bannerText || "Teks banner akan tampil di sini."}</span>
              </div>
            </div>
          )}
        </div>

        {/* Section: Kontak & WhatsApp */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 sm:p-6 mb-5 shadow-sm">
          <h2 className="font-heading font-bold text-gray-900 text-base mb-1">Nomor WhatsApp Hotline Resmi</h2>
          <p className="text-xs text-gray-500 mb-4 font-sans">Nomor tujuan untuk tombol konsultasi dan chat cepat di website.</p>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-mono">No. WhatsApp (Format: 628xxx)</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none">chat</span>
              <input
                type="text"
                value={settings.waNumber}
                onChange={(e) => set("waNumber", e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-xl pl-11 pr-4 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-bracket-border focus:ring-1 focus:ring-bracket-border transition font-mono"
                placeholder="6282231019363"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1.5 font-mono">Contoh: 6282231019363 (tanpa tanda + atau spasi)</p>
          </div>
        </div>

        {/* Section: Jam Operasional */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
          <h2 className="font-heading font-bold text-gray-900 text-base mb-1">Jam Operasional Fasilitas Pabrik</h2>
          <p className="text-xs text-gray-500 mb-4 font-sans">Informasi jam kerja yang ditampilkan di footer dan halaman kontak.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-mono">Jam Kerja Normal</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none">schedule</span>
                <input
                  type="text"
                  value={settings.operationalHours}
                  onChange={(e) => set("operationalHours", e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl pl-11 pr-4 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-bracket-border focus:ring-1 focus:ring-bracket-border transition font-sans"
                  placeholder="Senin – Sabtu: 08.00 – 17.00 WIB"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-mono">Jadwal Libur Produksi (Opsional)</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none">event_busy</span>
                <input
                  type="text"
                  value={settings.closedDates}
                  onChange={(e) => set("closedDates", e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl pl-11 pr-4 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-bracket-border focus:ring-1 focus:ring-bracket-border transition font-sans"
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
          className="w-full flex items-center justify-center gap-2 bg-bracket-border hover:bg-primary disabled:opacity-50 text-white font-bold py-3.5 rounded-2xl transition-all shadow-md shadow-bracket-border/20 cursor-pointer active:scale-98"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="text-sm">Menyimpan Perubahan...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">save</span>
              <span className="text-sm">Simpan Semua Pengaturan</span>
            </>
          )}
        </button>
      </div>
    </AdminShell>
  );
}

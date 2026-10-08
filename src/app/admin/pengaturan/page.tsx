"use client";

import { useEffect, useState } from "react";
import AdminShell from "../AdminShell";
import { useRouter } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import SiteBannerSettings from "@/components/admin/pengaturan/SiteBannerSettings";
import SiteContactSettings from "@/components/admin/pengaturan/SiteContactSettings";
import SiteOperationalSettings from "@/components/admin/pengaturan/SiteOperationalSettings";
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
      try {
        const res = await fetch("/api/admin/settings");
        if (res.status === 401) {
          router.push("/admin");
          return;
        }
        const data = await res.json();
        setSettings(data);
      } catch (err) {
        console.error("Gagal memuat pengaturan:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  async function handleSave() {
    setSaving(true);
    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Gagal menyimpan pengaturan:", err);
    } finally {
      setSaving(false);
    }
  }

  function set<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSettings((s) => ({ ...s, [key]: value }));
  }

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center py-20 text-gray-400">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-[#F65456] rounded-full animate-spin" />
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <AdminPageHeader
          title="Pengaturan Website"
          description="Konfigurasi banner pengumuman, nomor WhatsApp hotline, dan jam operasional pabrik."
          badge="Sistem"
          badgeVariant="neutral"
        />

        {/* Success Toast */}
        {saved && (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 animate-fade-in shadow-xs">
            <span className="material-symbols-outlined text-emerald-600">check_circle</span>
            <p className="text-xs sm:text-sm text-emerald-800 font-bold font-sans">
              Pengaturan berhasil disimpan ke sistem!
            </p>
          </div>
        )}

        {/* Section 1: Banner Pengumuman */}
        <SiteBannerSettings settings={settings} onChange={set} />

        {/* Section 2: Kontak & WhatsApp */}
        <SiteContactSettings settings={settings} onChange={set} />

        {/* Section 3: Jam Operasional */}
        <SiteOperationalSettings settings={settings} onChange={set} />

        {/* Save Button */}
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 bg-[#F65456] hover:bg-[#E03F41] disabled:opacity-50 text-white font-bold py-3.5 rounded-2xl transition-all shadow-md shadow-[#F65456]/20 cursor-pointer active:scale-98"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="text-sm">Menyimpan Perubahan...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-lg">save</span>
              <span className="text-sm">Simpan Semua Pengaturan</span>
            </>
          )}
        </button>
      </div>
    </AdminShell>
  );
}

"use client";

import React from "react";
import type { SiteSettings } from "@/lib/admin/db";

interface SiteOperationalSettingsProps {
  settings: SiteSettings;
  onChange: <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => void;
}

export default function SiteOperationalSettings({
  settings,
  onChange,
}: SiteOperationalSettingsProps) {
  return (
    <div className="bg-white border border-gray-200/90 rounded-2xl p-5 sm:p-6 shadow-xs">
      <h2 className="font-heading font-black text-gray-900 text-base mb-1">
        Jam Operasional Fasilitas Pabrik
      </h2>
      <p className="text-xs text-gray-500 mb-4 font-sans">
        Informasi jam kerja yang ditampilkan di footer dan halaman kontak.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-mono">
            Jam Kerja Normal
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none">
              schedule
            </span>
            <input
              type="text"
              value={settings.operationalHours}
              onChange={(e) => onChange("operationalHours", e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-xl pl-11 pr-4 py-2.5 text-gray-900 text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:border-[#F65456] transition font-sans"
              placeholder="Senin – Sabtu: 08.00 – 17.00 WIB"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-mono">
            Jadwal Libur Produksi (Opsional)
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none">
              event_busy
            </span>
            <input
              type="text"
              value={settings.closedDates}
              onChange={(e) => onChange("closedDates", e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-xl pl-11 pr-4 py-2.5 text-gray-900 text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:border-[#F65456] transition font-sans"
              placeholder="cth: 1 Jan 2025, 31 Mar – 5 Apr 2025"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

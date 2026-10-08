"use client";

import React from "react";
import type { SiteSettings } from "@/lib/admin/db";

interface SiteBannerSettingsProps {
  settings: SiteSettings;
  onChange: <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => void;
}

export default function SiteBannerSettings({
  settings,
  onChange,
}: SiteBannerSettingsProps) {
  return (
    <div className="bg-white border border-gray-200/90 rounded-2xl p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-heading font-black text-gray-900 text-base">
            Banner Siaran Pengumuman
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Tampilkan pita informasi prioritas di bagian atas seluruh halaman website.
          </p>
        </div>

        {/* Toggle Switch */}
        <button
          type="button"
          onClick={() => onChange("bannerEnabled", !settings.bannerEnabled)}
          className={`relative w-12 h-6 rounded-full transition-colors shrink-0 cursor-pointer ${
            settings.bannerEnabled ? "bg-[#F65456] shadow-xs" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-xs ${
              settings.bannerEnabled ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {settings.bannerEnabled && (
        <div className="mt-3 pt-3 border-t border-gray-100 animate-fade-in space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 font-mono">
            Teks Pengumuman
          </label>
          <textarea
            value={settings.bannerText}
            onChange={(e) => onChange("bannerText", e.target.value)}
            rows={2}
            className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:border-[#F65456] transition resize-none font-sans"
            placeholder="Tulis pesan pengumuman di sini..."
          />

          {/* Live Preview */}
          <div className="bg-[#F65456] text-white text-xs font-medium text-center py-2.5 px-4 rounded-xl shadow-xs flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">campaign</span>
            <span>{settings.bannerText || "Teks banner akan tampil di sini."}</span>
          </div>
        </div>
      )}
    </div>
  );
}

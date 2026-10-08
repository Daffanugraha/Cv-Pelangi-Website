"use client";

import React from "react";
import type { SiteSettings } from "@/lib/admin/db";

interface SiteContactSettingsProps {
  settings: SiteSettings;
  onChange: <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => void;
}

export default function SiteContactSettings({
  settings,
  onChange,
}: SiteContactSettingsProps) {
  return (
    <div className="bg-white border border-gray-200/90 rounded-2xl p-5 sm:p-6 shadow-xs">
      <h2 className="font-heading font-black text-gray-900 text-base mb-1">
        Nomor WhatsApp Hotline Resmi
      </h2>
      <p className="text-xs text-gray-500 mb-4 font-sans">
        Nomor tujuan untuk tombol konsultasi dan chat cepat di seluruh website.
      </p>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-mono">
          No. WhatsApp (Format: 628xxx)
        </label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none">
            chat
          </span>
          <input
            type="text"
            value={settings.waNumber}
            onChange={(e) => onChange("waNumber", e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-xl pl-11 pr-4 py-2.5 text-gray-900 text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:border-[#F65456] transition font-mono"
            placeholder="6282231019363"
          />
        </div>
        <p className="text-[11px] text-gray-400 mt-1.5 font-mono">
          Contoh: 6282231019363 (tanpa tanda + atau spasi)
        </p>
      </div>
    </div>
  );
}

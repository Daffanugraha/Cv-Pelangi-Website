import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-bright flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="w-full max-w-md bg-surface-container-lowest border-2 border-divider-tint/60 rounded-3xl p-8 sm:p-10 shadow-[0_12px_40px_-10px_rgba(246,84,86,0.15)] flex flex-col items-center">
        <span className="font-stat-number text-6xl sm:text-7xl font-extrabold text-secondary-container leading-none mb-3">
          404
        </span>

        <h1 className="text-xl sm:text-2xl font-bold text-navbar-black tracking-tight mb-2">
          Halaman Tidak Ditemukan
        </h1>

        <p className="text-sm text-text-muted leading-relaxed mb-6">
          Maaf, halaman atau rute yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>

        <Link
          href="/"
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-secondary-container hover:bg-primary text-on-primary font-semibold text-sm transition-all shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
            arrow_back
          </span>
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </div>
  );
}

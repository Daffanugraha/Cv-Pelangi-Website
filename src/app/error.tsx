"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error("Application Error Boundary caught an error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-surface-bright flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="w-full max-w-md bg-surface-container-lowest border-2 border-divider-tint/60 rounded-3xl p-8 shadow-[0_12px_40px_-10px_rgba(246,84,86,0.15)] flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-surface-tint-light text-secondary-container flex items-center justify-center mb-5 shadow-sm">
          <span translate="no" className="material-symbols-outlined notranslate text-[32px]">
            warning
          </span>
        </div>

        <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-surface-tint-light text-primary border border-divider-tint/60 mb-3">
          Terjadi Gangguan Sesi
        </span>

        <h2 className="text-xl sm:text-2xl font-bold text-navbar-black tracking-tight mb-2">
          Terjadi Kesalahan Sementara
        </h2>

        <p className="text-sm text-text-muted leading-relaxed mb-6">
          Sistem sedang memuat ulang komponen. Anda dapat mencoba memuat ulang halaman atau kembali ke Beranda.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-secondary-container hover:bg-primary text-on-primary font-semibold text-sm transition-all shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
              refresh
            </span>
            <span>Coba Lagi</span>
          </button>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-divider-tint/60 hover:bg-surface-tint-light text-navbar-black font-semibold text-sm transition-colors"
          >
            <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
              home
            </span>
            <span>Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Halaman Tidak Ditemukan | CV Pelangi UV",
  description:
    "Halaman yang Anda tuju tidak ditemukan atau telah dipindahkan. Kembali ke beranda CV Pelangi UV.",
};

export default function NotFound() {
  return (
    <section className="min-h-[75vh] w-full flex items-center justify-center bg-surface-neutral-alt px-6 py-20 relative overflow-hidden">
      {/* Decorative Blur Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-secondary-container/10 filter blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full text-center relative z-10 space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-secondary-container/10 text-secondary-container mb-2">
          <span translate="no" className="material-symbols-outlined notranslate text-[44px]">
            find_in_page
          </span>
        </div>

        <div className="space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-secondary-container/10 text-secondary-container font-label-meta text-xs uppercase tracking-widest font-bold">
            Status 404
          </span>
          <h1 className="font-display-hero text-3xl sm:text-4xl text-navbar-black font-extrabold tracking-tight">
            Halaman Tidak Ditemukan
          </h1>
          <p className="font-body-md text-text-muted text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            Halaman yang Anda tuju mungkin telah dipindahkan atau alamat URL kurang tepat. Silakan gunakan navigasi berikut untuk menemukan informasi yang Anda butuhkan.
          </p>
        </div>

        {/* Quick Shortcut Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary-container hover:bg-primary text-on-primary font-cta-pill text-sm font-semibold transition-all shadow-md active:scale-95"
          >
            <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
              home
            </span>
            <span>Kembali ke Beranda</span>
          </Link>
          <Link
            href="/layanan"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-surface-tint-light text-navbar-black border border-surface-container font-cta-pill text-sm font-semibold transition-all shadow-xs active:scale-95"
          >
            <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
              layers
            </span>
            <span>Layanan Finishing</span>
          </Link>
          <Link
            href="/produk/bahan-baku"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-surface-tint-light text-navbar-black border border-surface-container font-cta-pill text-sm font-semibold transition-all shadow-xs active:scale-95"
          >
            <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
              inventory_2
            </span>
            <span>Bahan Baku</span>
          </Link>
          <Link
            href="/kontak"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-surface-tint-light text-navbar-black border border-surface-container font-cta-pill text-sm font-semibold transition-all shadow-xs active:scale-95"
          >
            <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
              chat
            </span>
            <span>Kontak Kami</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

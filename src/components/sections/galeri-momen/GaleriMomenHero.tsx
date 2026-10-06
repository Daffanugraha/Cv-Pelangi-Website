"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HERO_LOOPING_ITEMS } from "@/lib/data/galeriMomen";

export default function GaleriMomenHero() {
  const [loopIndex, setLoopIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setLoopIndex((prev) => (prev + 1) % HERO_LOOPING_ITEMS.length);
        setFade(false);
      }, 250);
    }, 3800);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#0d0e11] border-b border-white/10">
      {/* Ambient Backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <iframe
            style={{
              width: "100vw",
              minWidth: "178vh",
              height: "56.25vw",
              minHeight: "100%",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              border: 0,
            }}
            className="opacity-70 sm:opacity-65 transition-opacity duration-700 pointer-events-none"
            src="https://www.youtube-nocookie.com/embed/J0MpMC4K-dA?autoplay=1&mute=1&loop=1&playlist=J0MpMC4K-dA&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&vq=hd720"
            title="Video Latar Belakang Galeri Momen Pelangi UV"
            allow="autoplay; encrypted-media"
          />
        </div>
        <img
          alt="Fasilitas Workshop CV Pelangi UV"
          className="w-full h-full object-cover opacity-20 -z-10"
          src="/images/momen-hero-backdrop.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0e11]/45 via-black/35 to-[#0d0e11]/95" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-bracket-border/10 blur-3xl" />
        <div className="absolute top-48 -left-32 w-80 h-80 rounded-full bg-bracket-border/10 blur-3xl" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-12 sm:pt-14 pb-14 sm:pb-20 relative z-10 flex flex-col gap-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md self-start text-xs sm:text-sm text-surface-dim"
        >
          <Link
            href="/"
            className="hover:text-bracket-border transition-colors flex items-center gap-1.5"
          >
            <span translate="no" className="material-symbols-outlined notranslate text-[15px]">
              home
            </span>
            <span>Beranda</span>
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-white/70 font-medium">Galeri</span>
          <span className="text-white/30">/</span>
          <span className="text-bracket-border font-semibold">
            Dokumentasi Momen &amp; Kegiatan
          </span>
        </nav>

        {/* Headline & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Galeri Momen &amp; Kegiatan Pelangi UV
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-surface-dim/80 leading-relaxed font-normal max-w-3xl">
              Dokumentasi rekam jejak dedikasi dan kebersamaan keluarga besar CV Pelangi UV: menampilkan{" "}
              <span
                className={`inline-block font-bold text-accent-gold text-base sm:text-lg lg:text-xl transition-all duration-300 ease-out ${
                  fade ? "opacity-0 -translate-y-1 scale-95" : "opacity-100 translate-y-0 scale-100"
                }`}
              >
                {HERO_LOOPING_ITEMS[loopIndex]}
              </span>
              , serta komitmen konsisten dalam menjamin hasil finishing cetak presisi tanpa kompromi untuk ratusan mitra percetakan se-Indonesia.
            </p>
          </div>

          <div className="lg:col-span-5 flex items-center sm:justify-start lg:justify-end gap-3.5 sm:gap-4 flex-wrap sm:flex-nowrap">
            <div className="flex-1 min-w-[120px] sm:min-w-[135px] bg-white/[0.05] border border-white/10 hover:border-bracket-border/40 rounded-2xl py-6 px-4 sm:py-7 sm:px-5 text-center shadow-xl backdrop-blur-md transition-all">
              <span className="block text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                20+
              </span>
              <span className="text-[11px] sm:text-xs text-surface-dim/80 uppercase font-semibold tracking-wider mt-2 block">
                Tahun Berkarya
              </span>
            </div>
            <div className="flex-1 min-w-[120px] sm:min-w-[135px] bg-white/[0.05] border border-white/10 hover:border-bracket-border/40 rounded-2xl py-6 px-4 sm:py-7 sm:px-5 text-center shadow-xl backdrop-blur-md transition-all">
              <span className="block text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                1.500+
              </span>
              <span className="text-[11px] sm:text-xs text-surface-dim/80 uppercase font-semibold tracking-wider mt-2 block">
                Mitra Percetakan
              </span>
            </div>
            <div className="flex-1 min-w-[120px] sm:min-w-[135px] bg-white/[0.05] border border-white/10 hover:border-bracket-border/40 rounded-2xl py-6 px-4 sm:py-7 sm:px-5 text-center shadow-xl backdrop-blur-md transition-all">
              <span className="block text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                5
              </span>
              <span className="text-[11px] sm:text-xs text-surface-dim/80 uppercase font-semibold tracking-wider mt-2 block">
                Kategori Momen
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

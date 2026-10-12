"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const ROTATING_PACKAGING = [
  "Kemasan & Etiket Rokok Sigaret",
  "Kemasan Box Rokok Eksklusif",
  "Kemasan Box Skincare & Kosmetik Mewah",
  "Kemasan Box Makanan Food-Grade",
  "Kemasan Farmasi & Dus Obat Presisi",
  "Kemasan Rigid Box & Hardbox Ekspor",
];

export default function PengaplikasianHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ROTATING_PACKAGING.length);
        setFade(false);
      }, 250);
    }, 2800);

    return () => clearInterval(timer);
  }, []);
  return (
    <section className="relative w-full overflow-hidden bg-navbar-black pt-12 pb-14 sm:pb-16 border-b border-white/10">
      {/* Ambient Background Video Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-0 bg-navbar-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-105 opacity-75 filter brightness-100 contrast-105"
        >
          <source src="/videos/video-pengaplikasian.mp4" type="video/mp4" />
        </video>
        {/* Soft balanced gradient overlay - clear video visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-navbar-black/90 via-navbar-black/35 to-navbar-black/55" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Breadcrumb Ringkas */}
          <nav
            aria-label="Breadcrumb"
            className="inline-flex items-center gap-2 text-xs text-surface-dim/80 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 mb-6"
          >
            <Link
              href="/"
              className="hover:text-bracket-border transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[15px]">home</span>
              <span>Beranda</span>
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white/70">Galeri</span>
            <span className="text-white/30">/</span>
            <span className="text-bracket-border font-semibold">Pengaplikasian Produk</span>
          </nav>

          {/* Headline Utama Galeri */}
          <h1 className="font-heading font-extrabold tracking-tight text-white mb-4 text-3xl sm:text-4xl lg:text-5xl leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
            Galeri Pengaplikasian <span className="text-bracket-border">Produk Cetak</span>
          </h1>

          {/* Headline Subtitle yang Jelas & Informatif */}
          <p className="text-surface-dim/95 max-w-3xl leading-relaxed text-sm sm:text-base lg:text-lg text-center font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
            Katalog dan portofolio visualisasi hasil nyata finishing cetak presisi tinggi dari CV Pelangi UV mulai dari{" "}
            <span
              className={`font-semibold text-accent-gold inline transition-opacity duration-300 ease-in-out ${
                fade ? "opacity-0" : "opacity-100"
              }`}
            >
              {ROTATING_PACKAGING[currentIndex]}
            </span>{" "}
            hingga beragam kemasan komersial dan korporat berstandar industri ekspor.
          </p>
        </div>
      </div>
    </section>
  );
}

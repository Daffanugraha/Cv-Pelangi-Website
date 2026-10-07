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
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          alt="Latar Belakang Mesin Finishing Industri CV Pelangi UV"
          className="w-full h-full object-cover opacity-20 filter brightness-75 scale-105"
          src="https://lh3.googleusercontent.com/aida/AEtjO1X8hUYRnyrzcmk40q8h_QhSLFCdR_322fC-Sf0MzF_son0DBlP6sBiJThSE0RcBy0Nr1HytYFhIPNdQjXaMSA99Ozsq3yPKMyOsMrdQj7xUfD7EUMIBm0O8yfWnjQks2v9efmAGY1Vubn0IQP1VtA8Sn6t_8rllU2UjdGRyMh4Z4ys0vr2MHZ8evYEiU1BQB_lDhDiF5TCtd0qVFsQvQ_vFtJugqUG11f_FwNOSA0C8tXbBt-3NGoXtwU4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navbar-black via-navbar-black/85 to-navbar-black/95" />
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
          <h1 className="font-heading font-extrabold tracking-tight text-white mb-4 text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Galeri Pengaplikasian <span className="text-bracket-border">Produk Cetak</span>
          </h1>

          {/* Headline Subtitle yang Jelas & Informatif */}
          <p className="text-surface-dim max-w-3xl leading-relaxed text-sm sm:text-base lg:text-lg text-center font-normal">
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

          {/* Quick Category / Showcase Pills (Menjelaskan ini Galeri Sampel Fisik) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-medium backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-bracket-border" />
              Kemasan &amp; Packaging Mewah
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-medium backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
              Hot Stamping Foil &amp; Spot UV
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-medium backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-action-whatsapp" />
              Pond &amp; Presisi Pasca-Cetak
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

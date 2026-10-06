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
    <section className="relative w-full overflow-hidden bg-navbar-black rounded-b-[40px] shadow-2xl pt-12 pb-20 border-b border-white/10">
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
          {/* Breadcrumb */}
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
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link href="/galeri" className="hover:text-bracket-border transition-colors">
              Galeri
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-white font-medium">Pengaplikasian Produk</span>
          </nav>

          {/* Headline */}
          <h1 className="font-heading font-extrabold tracking-tight text-white mb-4 text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Galeri Pengaplikasian <span className="text-bracket-border">Produk Cetak</span>
          </h1>

          {/* Headline Subtitle */}
          <p className="text-surface-dim max-w-3xl leading-relaxed mb-8 text-base sm:text-lg min-h-[3rem] flex flex-wrap items-center justify-center gap-1.5">
            <span>
              Solusi visualisasi hasil aplikasi finishing cetak presisi tinggi dari CV Pelangi UV — mulai dari
            </span>
            <span
              className={`inline-block font-bold text-white transition-all duration-300 transform bg-white/10 px-3 py-0.5 rounded-full border border-bracket-border/40 shadow-xs text-bracket-border ${
                fade ? "opacity-0 -translate-y-1.5 scale-95" : "opacity-100 translate-y-0 scale-100"
              }`}
            >
              {ROTATING_PACKAGING[currentIndex]}
            </span>
            <span>
              hingga beragam kemasan berstandar industri ekspor.
            </span>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/6282231019363?text=Halo%20Pelangi%20UV%2C%20saya%20tertarik%20dengan%20sampel%20fisik%20hasil%20finishing%20kemasan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-bracket-border text-white font-semibold shadow-[0_8px_24px_rgba(246,84,86,0.4)] hover:bg-primary-container transition-all hover:scale-105 active:scale-95 text-sm"
            >
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              <span>Minta Swatch Sample Fisik</span>
            </a>
            <a
              href="/katalog/katalog-pelangi-uv.pdf"
              download="KATALOG PELANGI UV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 transition-all hover:scale-105 text-sm"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Unduh E-Katalog Hasil Cetak</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

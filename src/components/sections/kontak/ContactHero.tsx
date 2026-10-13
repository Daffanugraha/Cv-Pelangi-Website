"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const PHRASES_ID = [
  "Laminasi Doff atau Glossy",
  "Efek Hot Stamping Foil",
  "Kilau Spot UV & Tekstur Pasir",
  "Pola Pond & Die-Cut Kemasan",
  "Detail Emboss & Deboss 3D",
  "Bahan Baku Film BOPP & Foil Roll",
];

const PHRASES_EN = [
  "Matte or Glossy Lamination",
  "Hot Stamping Foil Effects",
  "Spot UV & Sand Texture Gloss",
  "Packaging Die-Cut & Creasing",
  "3D Emboss & Deboss Details",
  "BOPP Film & Foil Roll Materials",
];

export default function ContactHero() {
  const { language, t } = useLanguage();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const phrases = language === "EN" ? PHRASES_EN : PHRASES_ID;

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setIsVisible(true);
      }, 350);
    }, 2800);

    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <section className="w-full bg-[#0B0B0B] text-white pt-12 pb-20 lg:pt-20 lg:pb-28 relative overflow-hidden">
      {/* Cinematic Print Facility Workshop Backdrop (Bright & Clearly Visible) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transform scale-105 brightness-[0.95] contrast-[1.05]"
        >
          <source
            src="/videos/hero/video-kontak.mp4"
            type="video/mp4"
          />
        </video>
        {/* Soft elegant gradient overlays - transparent enough so video shines through */}
        <div className="absolute inset-0 bg-gradient-to-r from-navbar-black/80 via-navbar-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/90 via-transparent to-[#0B0B0B]/40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-xs font-label-meta tracking-wider uppercase text-slate-400"
        >
          <Link
            href="/"
            className="hover:text-secondary-container transition-colors flex items-center gap-1 font-medium text-slate-300"
          >
            <span translate="no" className="material-symbols-outlined notranslate text-[15px]">home</span>
            Beranda
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-white font-semibold">Kontak &amp; Konsultasi</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Hero Left Column */}
          <div className="lg:col-span-7 space-y-5">
            <h1 className="font-headline-xl text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              {t("contact_hero_title")}{" "}
              <br className="hidden sm:inline" />
              <span className="inline-block text-secondary-container relative">
                <span
                  translate="no"
                  className={`notranslate inline-block transition-all duration-300 ease-out transform ${
                    isVisible
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                >
                  {phrases[phraseIndex]}
                </span>
                <span className="inline-block w-1 h-7 sm:h-9 lg:h-11 bg-secondary-container ml-1.5 align-middle animate-pulse" />{" "}
                {t("contact_hero_suffix")}
              </span>
            </h1>

            <p className="text-slate-300 font-body-md text-base sm:text-lg max-w-2xl leading-relaxed">
              {t("contact_hero_desc")}
            </p>
          </div>

          {/* Hero Right Column: Premium Hotline WhatsApp Card */}
          <div className="lg:col-span-5 flex justify-start lg:justify-end">
            <div className="w-full max-w-md bg-gradient-to-b from-[#18191d] to-[#111215] rounded-3xl p-7 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 relative overflow-hidden group">
              {/* Subtle top glow line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#25D366] to-transparent opacity-75" />

              {/* Direct Phone Link (Klik langsung mengarah ke WhatsApp) */}
              <div className="mb-3 relative z-10">
                <span className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Hotline Resmi CV Pelangi UV
                </span>
                <a
                  className="inline-flex items-center gap-2 text-2xl sm:text-3xl font-headline-sm font-extrabold text-white hover:text-[#25D366] transition-colors tracking-tight group/link"
                  href={`https://wa.me/6282231019363?text=${encodeURIComponent(
                    "Halo Customer Service CV Pelangi UV, saya ingin konsultasi seputar layanan finishing cetak dan produk percetakan. Boleh dibantu informasinya? Terima kasih."
                  )}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>+62 822-3101-9363</span>
                  <span className="text-[#25D366] text-xl">↗</span>
                </a>
              </div>

              {/* Brief Description */}
              <p className="text-xs text-zinc-300 leading-relaxed relative z-10 mb-4">
                Diskusikan langsung file cetak, alternatif finishing Spot UV / Foil, kalkulasi oplah efisien, atau kirim sampel fisik ke workshop Anda.
              </p>

              <a
                href={`https://wa.me/6282231019363?text=${encodeURIComponent(
                  "Halo Customer Service CV Pelangi UV, saya ingin konsultasi seputar layanan finishing cetak dan produk percetakan. Boleh dibantu informasinya? Terima kasih."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 relative z-10"
              >
                Chat WhatsApp Sekarang
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Organic Curved Transition to Next Section */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          className="relative block w-full h-8 sm:h-12 lg:h-16 text-[#faf7f6]"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          fill="currentColor"
        >
          <path d="M0,0 C150,90 350,-40 600,50 C850,140 1050,10 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}

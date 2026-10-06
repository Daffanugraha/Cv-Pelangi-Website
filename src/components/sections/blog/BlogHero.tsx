"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const rotatingKeywords = [
  "Spot UV Varnish",
  "Finishing Cetak",
  "Hot Stamping Foil",
  "Laminating Presisi",
  "Bahan Baku Cetak",
];

export default function BlogHero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");

  useEffect(() => {
    const timer = setInterval(() => {
      setFadeState("out");
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % rotatingKeywords.length);
        setFadeState("in");
      }, 350);
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full relative overflow-hidden bg-navbar-black text-surface pt-8 pb-20 lg:pt-10 lg:pb-28">
      {/* Background Image with Cinematic Industrial Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-40 scale-105 transform transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAu_3av_j9Z3yGYR5UJNR4-DZ5SOCPk5mpHkoAN_5vQTsS475BWc3Otxy_TBK6sWAlq5UhvDwieFm3zTF3q95ufB5tDWfDAUbQ5orIM_PiaVNkqPjyV5Y5cYBZ9vFqv-hc-wbEtgwlwS3ODaMhWgnEmo3SV4hnIUGGIbfZ6f5hu6CI2qs8XKLORLDEVeUCXFo9ZmP5R8N7O4u0jd73SarVlNomhuI3g7HEhmcWxWTt5nKQqBux-VKrQ')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navbar-black via-navbar-black/95 to-navbar-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-navbar-black via-transparent to-navbar-black/50" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-20">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-[#a1a1aa] font-label-meta text-label-meta mb-8">
          <Link
            href="/"
            className="hover:text-bracket-border transition-colors flex items-center gap-1.5 text-[#d4d4d8]"
          >
            <span translate="no" className="material-symbols-outlined notranslate text-sm">
              home
            </span>
            <span>Beranda</span>
          </Link>
          <span translate="no" className="material-symbols-outlined notranslate text-xs text-outline-variant">
            chevron_right
          </span>
          <span className="text-bracket-border font-semibold">Blog &amp; Berita Industri</span>
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl flex flex-col items-start gap-6 py-4">
          <h1 className="font-display-hero text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-surface font-extrabold tracking-tight leading-tight">
            Blog, Berita &amp; Panduan{" "}
            <span
              className={`text-bracket-border inline-block transition-all duration-300 transform ${
                fadeState === "in"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
            >
              {rotatingKeywords[currentIdx]}
            </span>
          </h1>

          <p className="font-body-lg text-base sm:text-lg text-surface-container-high leading-relaxed max-w-3xl">
            Informasi terkini seputar optimasi mesin presisi, inovasi formulasi Spot UV, Hot Stamping Foil, teknik laminasi, hingga tren industri percetakan modern dari tim ahli CV Pelangi UV.
          </p>
        </div>
      </div>

      {/* Smooth Bottom Wave Curve Divider */}
      <div className="absolute -bottom-px left-0 right-0 pointer-events-none w-full leading-none">
        <svg
          className="w-full h-8 text-surface-bright fill-current block"
          preserveAspectRatio="none"
          viewBox="0 0 1440 32"
        >
          <path d="M0,0 C480,32 960,32 1440,0 L1440,32 L0,32 Z" />
        </svg>
      </div>
    </section>
  );
}

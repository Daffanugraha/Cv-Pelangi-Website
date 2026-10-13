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
    <section className="w-full relative overflow-hidden bg-[#0B0B0B] text-surface pt-8 pb-20 lg:pt-10 lg:pb-28">
      {/* Cinematic Video Background (Bright & Clearly Visible) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover transform scale-105 brightness-[0.98] contrast-[1.05]"
        >
          <source src="/videos/hero/video-blog.mp4" type="video/mp4" />
        </video>
        {/* Soft elegant gradient overlays - transparent enough so video shines through brightly */}
        <div className="absolute inset-0 bg-gradient-to-r from-navbar-black/80 via-navbar-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/85 via-transparent to-[#0B0B0B]/35" />
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

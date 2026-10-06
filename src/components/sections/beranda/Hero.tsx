"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { heroTestimonials } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";

const ROTATING_SERVICES_ID = [
  "29+ Layanan Finishing.",
  "Spot UV & Tekstur Pasir.",
  "Hot Stamping Foil Mewah.",
  "Laminasi Doff & Glossy.",
  "Cast & Cure 3D Hologram.",
  "Pond Otomatis Kemasan.",
  "Rigid Box Skincare Mewah.",
  "Lem Karton Food Grade.",
];

const ROTATING_SERVICES_EN = [
  "29+ Finishing Services.",
  "Raised Spot UV & Texture.",
  "Hot Stamping Foil.",
  "Matte & Glossy Lamination.",
  "3D Hologram Cast & Cure.",
  "Auto Packaging Die-Cut.",
  "Luxury Rigid Box Solutions.",
  "Food Grade Cartoning Glue.",
];

function renderServiceText(text: string) {
  if (text.startsWith("29+")) {
    const rest = text.replace("29+", "").trim();
    return (
      <span className="inline-flex items-baseline">
        <span
          translate="no"
          className="notranslate font-black text-white text-[28px] sm:text-[36px] lg:text-[44px] tracking-tight leading-none drop-shadow-[0_2px_14px_rgba(255,255,255,0.45)] mr-1.5"
        >
          29+
        </span>
        <span
          translate="no"
          className="notranslate font-extrabold text-[18px] sm:text-[22px] lg:text-[26px]"
        >
          {rest}
        </span>
      </span>
    );
  }
  return (
    <span
      translate="no"
      className="notranslate font-extrabold text-[19px] sm:text-[24px] lg:text-[28px]"
    >
      {text}
    </span>
  );
}

export default function Hero() {
  const { language } = useLanguage();
  const [activeTesti, setActiveTesti] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [serviceIndex, setServiceIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const duration = 5000;
  const step = 50;

  const rotatingServices =
    language === "EN" ? ROTATING_SERVICES_EN : ROTATING_SERVICES_ID;

  // Immediate clean reset when language changes - prevents desync and getting stuck
  useEffect(() => {
    setServiceIndex(0);
    setPrevIndex(null);
  }, [language]);

  // Rotate hero services vertically every 2.8s
  useEffect(() => {
    if (isHovered) return;

    const srvInterval = setInterval(() => {
      setServiceIndex((current) => {
        setPrevIndex(current);
        return (current + 1) % rotatingServices.length;
      });

      const clearTimer = setTimeout(() => {
        setPrevIndex(null);
      }, 550);

      return () => clearTimeout(clearTimer);
    }, 2800);

    return () => clearInterval(srvInterval);
  }, [language, isHovered, rotatingServices.length]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveTesti((cur) => (cur + 1) % heroTestimonials.length);
          return 0;
        }
        return prev + (step / duration) * 100;
      });
    }, step);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (idx: number) => {
    setActiveTesti(idx);
    setProgress(0);
  };

  const nextSlide = () => {
    setActiveTesti((prev) => (prev + 1) % heroTestimonials.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setActiveTesti(
      (prev) => (prev - 1 + heroTestimonials.length) % heroTestimonials.length
    );
    setProgress(0);
  };

  const currentT = heroTestimonials[activeTesti];

  return (
    <section
      className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between overflow-hidden bg-navbar-black"
      id="beranda"
    >
      {/* Factory Motion Simulated Visual Plate */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-bracket-border/20 filter blur-3xl anim-aura pointer-events-none z-0"></div>
        <div
          className="absolute top-1/3 -right-24 w-[420px] h-[420px] rounded-full bg-accent-gold/15 filter blur-3xl anim-aura pointer-events-none z-0"
          style={{ animationDelay: "-3.5s" }}
        ></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transform scale-105 brightness-[0.85] contrast-[1.05]"
        >
          <source src="/videos/video-beranda.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-navbar-black/85 via-navbar-black/45 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navbar-black/90 via-transparent to-transparent"></div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-gutter pt-space-3xl pb-space-2xl my-auto flex flex-col lg:flex-row items-center justify-between">
        {/* Left Column */}
        <div className="w-full lg:w-3/5 text-left">
          <h1 className="anim-hero-2 font-display-hero text-display-hero text-on-secondary tracking-tight mb-space-md leading-[1.2] [text-shadow:0_3px_18px_rgba(0,0,0,0.65)]">
            <span className="block text-surface-bright text-[28px] sm:text-[34px] lg:text-[40px] font-bold tracking-tight mb-2">
              {language === "EN"
                ? "Print Finishing Center"
                : "Pusat Jasa Finishing Cetak"}
            </span>

            {/* Baris Utama: 35+ Mesin Finishing & Teks Layanan Looping Atas-Bawah */}
            <div
              translate="no"
              className="notranslate text-bracket-border font-extrabold [text-shadow:0_0_24px_rgba(246,84,86,0.6)] flex flex-wrap items-center gap-x-3.5 gap-y-2"
            >
              {/* 35+ Mesin Finishing (Nilai diperbesar & diproteksi translate) */}
              <span className="inline-flex items-baseline hover:scale-105 transition-transform duration-300 whitespace-nowrap">
                <span
                  translate="no"
                  className="notranslate font-black text-white text-[32px] sm:text-[40px] lg:text-[48px] tracking-tight leading-none drop-shadow-[0_2px_14px_rgba(255,255,255,0.45)]"
                >
                  35+
                </span>
                <span className="font-extrabold text-white/95 text-[18px] sm:text-[22px] lg:text-[26px] ml-1.5 align-baseline">
                  {language === "EN"
                    ? "Finishing Machines."
                    : "Mesin Finishing."}
                </span>
              </span>

              {/* Looping Teks Layanan Atas Bawah (Dual-layer Keyframe Roll) */}
              <span
                className="relative inline-flex items-center h-[38px] sm:h-[46px] lg:h-[54px] overflow-hidden align-middle cursor-default select-none"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                title="Pelangi UV Finishing Services"
              >
                {/* Outgoing previous service (slides up and fades out) */}
                {prevIndex !== null && (
                  <span
                    key={`prev-${language}-${prevIndex}`}
                    translate="no"
                    className="notranslate absolute inset-0 flex items-center whitespace-nowrap text-white font-extrabold anim-roll-out pointer-events-none drop-shadow-[0_2px_12px_rgba(246,84,86,0.5)]"
                  >
                    {renderServiceText(rotatingServices[prevIndex])}
                  </span>
                )}

                {/* Entering/Current active service (slides up from bottom into view) */}
                <span
                  key={`cur-${language}-${serviceIndex}`}
                  translate="no"
                  className={`notranslate flex items-center whitespace-nowrap text-white hover:text-accent-gold transition-colors duration-200 font-extrabold drop-shadow-[0_2px_12px_rgba(246,84,86,0.5)] ${
                    prevIndex !== null ? "anim-roll-in" : ""
                  }`}
                >
                  {renderServiceText(rotatingServices[serviceIndex])}
                </span>
              </span>

              {/* 1.500+ Pelanggan (Nilai diperbesar & diproteksi translate) */}
              <span className="inline-flex items-baseline hover:scale-105 transition-transform duration-300 whitespace-nowrap">
                <span
                  translate="no"
                  className="notranslate font-black text-accent-gold text-[32px] sm:text-[40px] lg:text-[48px] tracking-tight leading-none drop-shadow-[0_2px_14px_rgba(254,209,0,0.5)]"
                >
                  1.500+
                </span>
                <span className="font-extrabold text-accent-gold/95 text-[18px] sm:text-[22px] lg:text-[26px] ml-1.5 align-baseline">
                  {language === "EN"
                    ? "Happy Clients."
                    : "Pelanggan."}
                </span>
              </span>
            </div>
          </h1>

          <div className="anim-hero-3 mb-space-xl">
            <p className="font-body-lg text-body-lg text-surface-dim/95 max-w-xl font-normal leading-relaxed [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]">
              {language === "EN"
                ? "Trusted print finishing service provider since 2004 at Bizpark Sidoarjo. Delivering luxury touches in Spot UV, Hot Stamping Foil, Matte & Glossy Lamination, Auto Die-Cutting, and high-grade raw materials."
                : "Penyedia jasa finishing percetakan terpercaya sejak 2004 di Bizpark Sidoarjo. Menghadirkan sentuhan mewah Spot UV, Hot Stamping Foil, Laminasi Doff/Glossy, Pond Otomatis, dan grosir bahan baku berkualitas tinggi."}
            </p>
          </div>

          <div className="anim-hero-4 flex flex-wrap items-center gap-space-md">
            <a
              className="anim-cta-glow inline-flex items-center justify-center gap-2 px-space-xl py-space-sm rounded-full bg-bracket-border text-on-primary font-cta-pill text-cta-pill hover:bg-primary transition-all duration-300 hover:scale-105 active:scale-95 group shadow-[0_8px_24px_rgba(246,84,86,0.45)]"
              href="#pesan-sekarang"
            >
              <span>{language === "EN" ? "Order Now" : "Pesan Sekarang"}</span>
              <span
                translate="no" className="material-symbols-outlined notranslate text-[18px] transition-transform duration-300 group-hover:translate-x-1"
              >
                arrow_forward
              </span>
            </a>
            <a
              className="inline-flex items-center justify-center gap-2 px-space-lg py-space-sm rounded-full bg-surface-canvas/10 text-on-secondary hover:bg-surface-canvas hover:text-navbar-black font-cta-pill text-cta-pill backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-bracket-border hover:scale-105 active:scale-95 shadow-md hover:shadow-[0_0_20px_rgba(246,84,86,0.3)]"
              href="/katalog/katalog-pelangi-uv.pdf"
              download="KATALOG PELANGI UV.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                translate="no" className="material-symbols-outlined notranslate text-[18px]"
              >
                download
              </span>
              <span>{language === "EN" ? "Download Catalog" : "Unduh Katalog"}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Testimonial Slider Card */}
        <div className="w-full lg:w-2/5 mt-space-xl lg:mt-0 flex justify-end">
          <div
            className="relative bg-surface-canvas/15 backdrop-blur-md rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-white/20 text-on-secondary overflow-hidden group anim-card-float"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="pb-3 mb-4 border-b border-white/10">
              <span className="font-label-meta text-xs text-white/70 font-semibold uppercase tracking-widest">
                {language === "EN" ? "Testimonial" : "Testimoni"}
              </span>
            </div>

            <div className="relative min-h-[140px] flex flex-col justify-between">
              <div className="transition-all duration-500 ease-out">
                <p className="font-body-md text-[14px] sm:text-[15px] text-white leading-relaxed italic mb-4">
                  {currentT.quote}
                </p>
                <div>
                  <h4 className="font-headline-sm text-[15px] font-bold text-white truncate">
                    {currentT.author}
                  </h4>
                  {currentT.role ? (
                    <p className="font-body-sm text-[12px] text-surface-dim truncate">
                      {currentT.role}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                {heroTestimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`transition-all cursor-pointer ${
                      activeTesti === idx
                        ? "w-6 h-1.5 rounded-full bg-bracket-border"
                        : "w-2 h-1.5 rounded-full bg-white/30 hover:bg-bracket-border"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Testimoni sebelumnya"
                  className="w-8 h-8 rounded-full bg-surface-canvas/10 hover:bg-bracket-border text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                >
                  <span
                    translate="no" className="material-symbols-outlined notranslate text-[16px]"
                  >
                    chevron_left
                  </span>
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Testimoni selanjutnya"
                  className="w-8 h-8 rounded-full bg-surface-canvas/10 hover:bg-bracket-border text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                >
                  <span
                    translate="no" className="material-symbols-outlined notranslate text-[16px]"
                  >
                    chevron_right
                  </span>
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-bracket-border to-accent-gold transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Arch Transition */}
      <div className="relative z-10 w-full overflow-hidden leading-none pointer-events-none -mb-1">
        <svg
          className="w-full h-8 sm:h-12 md:h-16 text-surface-canvas fill-current block"
          preserveAspectRatio="none"
          viewBox="0 0 1440 60"
        >
          <path d="M0,60 C420,10 1020,10 1440,60 L1440,60 L0,60 Z"></path>
        </svg>
      </div>
    </section>
  );
}

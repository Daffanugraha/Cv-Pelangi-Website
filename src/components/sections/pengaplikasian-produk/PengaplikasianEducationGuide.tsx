"use client";

import React, { useState, useEffect } from "react";
import { EDUCATIONAL_SLIDES } from "@/lib/data/galleryProducts";

export default function PengaplikasianEducationGuide() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isSlidePaused, setIsSlidePaused] = useState(false);

  useEffect(() => {
    if (isSlidePaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % EDUCATIONAL_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isSlidePaused]);

  const slide = EDUCATIONAL_SLIDES[activeSlide];

  return (
    <section className="w-full bg-surface-neutral-alt py-12 sm:py-16 border-t border-surface-container/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Bersih Tanpa Badge Berlebihan */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8">
          <div className="max-w-3xl">
            <h2 className="font-heading font-extrabold text-on-surface text-2xl sm:text-3xl tracking-tight">
              Bingung Pilih Jasa Finishing untuk Produk Anda?
            </h2>
            <p className="text-sm text-text-muted mt-1.5 leading-relaxed font-sans">
              Pilih jenis produk Anda di bawah ini untuk melihat kombinasi jasa finishing yang paling cocok dari CV Pelangi UV.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() =>
                setActiveSlide(
                  (prev) => (prev - 1 + EDUCATIONAL_SLIDES.length) % EDUCATIONAL_SLIDES.length
                )
              }
              className="w-10 h-10 rounded-full border border-surface-container/80 bg-surface-canvas text-on-surface hover:bg-bracket-border hover:text-white flex items-center justify-center transition shadow-xs active:scale-95 cursor-pointer"
              title="Kategori Sebelumnya"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveSlide((prev) => (prev + 1) % EDUCATIONAL_SLIDES.length)
              }
              className="w-10 h-10 rounded-full border border-surface-container/80 bg-surface-canvas text-on-surface hover:bg-bracket-border hover:text-white flex items-center justify-center transition shadow-xs active:scale-95 cursor-pointer"
              title="Kategori Berikutnya"
            >
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
          {EDUCATIONAL_SLIDES.map((item, idx) => {
            const isActive = activeSlide === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlide(idx)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-bracket-border text-white shadow-md shadow-bracket-border/25 scale-105"
                    : "bg-surface-canvas border border-surface-container/80 text-on-surface hover:bg-surface-container"
                }`}
              >
                <span>{item.category}</span>
              </button>
            );
          })}
        </div>

        {/* Display Card Rekomendasi Jasa */}
        {slide && (
          <div
            onMouseEnter={() => setIsSlidePaused(true)}
            onMouseLeave={() => setIsSlidePaused(false)}
            className="bg-surface-canvas border border-surface-container/80 rounded-[24px] p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Kolom Kiri: Rekomendasi Jasa Utama */}
              <div className="lg:col-span-7 flex flex-col gap-5">
                <div>
                  <h3 className="font-heading font-extrabold text-on-surface text-xl sm:text-2xl mt-1 leading-snug">
                    {slide.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed font-sans">
                    {slide.desc}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <p className="text-xs font-bold text-on-surface uppercase tracking-wider">
                    Jasa Finishing Pelangi UV yang Direkomendasikan:
                  </p>
                  {slide.recommendations.map((rec, rIdx) => (
                    <div
                      key={rIdx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-neutral-alt border border-surface-container/60 hover:border-bracket-border/40 transition"
                    >
                      <span className="w-6 h-6 rounded-full bg-bracket-border/15 text-bracket-border flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {rIdx + 1}
                      </span>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-on-surface">{rec.title}</p>
                        <p className="text-xs text-text-body mt-0.5 leading-relaxed font-sans">
                          {rec.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kolom Kanan: Murni Foto Visual Produk Tanpa Kotak Hitam / Tulisan Sampah */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="relative aspect-[16/11] rounded-[20px] overflow-hidden bg-surface-container shadow-md border border-surface-container/80 group">
                  <img
                    src={slide.sampleImage}
                    alt={slide.sampleTitle}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                    <span className="text-[11px] font-bold text-bracket-border uppercase tracking-wider mb-0.5">
                      Contoh Produk Jadi
                    </span>
                    <p className="text-sm sm:text-base font-bold text-white leading-snug drop-shadow-md">
                      {slide.sampleTitle}
                    </p>
                  </div>
                </div>

                {/* Tombol WhatsApp Simpel Bersih */}
                <a
                  href={`https://wa.me/6282231019363?text=Halo%20Pelangi%20UV%2C%20saya%20mau%20konsultasi%20jasa%20finishing%20untuk%20produk%20*${encodeURIComponent(
                    slide.category
                  )}*%20seperti%20contoh%20*${encodeURIComponent(
                    slide.sampleTitle
                  )}*.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-action-whatsapp hover:bg-action-whatsapp-hover text-white text-xs font-bold shadow-sm transition active:scale-95"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  <span>Konsultasi Jasa via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

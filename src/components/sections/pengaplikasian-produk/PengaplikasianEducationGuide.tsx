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
    }, 7000);
    return () => clearInterval(timer);
  }, [isSlidePaused]);

  const slide = EDUCATIONAL_SLIDES[activeSlide];

  return (
    <section className="w-full bg-gradient-to-b from-surface-container-low via-surface to-surface-container-low py-16 border-t border-surface-container-high relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-tint-light border border-bracket-border/20 text-bracket-border text-xs font-bold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-sm animate-pulse">
                verified
              </span>
              Panduan Seleksi Pasca-Cetak Industri
            </div>
            <h2 className="font-heading font-bold text-on-surface text-2xl sm:text-3xl lg:text-4xl tracking-tight">
              Mengapa Efek Tertentu Wajib Dipilih untuk Produk Anda?
            </h2>
            <p className="text-sm text-text-body mt-2 leading-relaxed">
              Finishing bukan sekadar riasan visual—ini tentang proteksi higienitas fungsional, kepatuhan regulasi BPOM &amp; cukai, hingga pemicu keputusan impulsif saat sentuhan pertama konsumen di rak display.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setActiveSlide(
                    (prev) => (prev - 1 + EDUCATIONAL_SLIDES.length) % EDUCATIONAL_SLIDES.length
                  )
                }
                className="w-10 h-10 rounded-full border border-surface-container-high bg-surface-container-lowest text-on-surface hover:bg-bracket-border hover:text-white flex items-center justify-center transition shadow-sm active:scale-95"
                title="Kategori Sebelumnya"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveSlide((prev) => (prev + 1) % EDUCATIONAL_SLIDES.length)
                }
                className="w-10 h-10 rounded-full border border-surface-container-high bg-surface-container-lowest text-on-surface hover:bg-bracket-border hover:text-white flex items-center justify-center transition shadow-sm active:scale-95"
                title="Kategori Berikutnya"
              >
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
            <a
              href="https://wa.me/6282231019363?text=Halo%20Pelangi%20UV%2C%20saya%20ingin%20konsultasi%20spesifikasi%20finishing%20kemasan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-bracket-border text-white text-xs font-semibold shadow hover:bg-primary transition"
            >
              <span>Konsultasi Formulasi Teknis</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* Interactive Category Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
          {EDUCATIONAL_SLIDES.map((item, idx) => {
            const isActive = activeSlide === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlide(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
                  isActive
                    ? "bg-gradient-to-r from-bracket-border to-primary text-white shadow-md shadow-bracket-border/30 scale-105"
                    : "bg-surface-container-lowest border border-surface-container-high text-on-surface hover:bg-surface-container"
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                  0{idx + 1}
                </span>
                <span>{item.category}</span>
              </button>
            );
          })}
        </div>

        {/* Active Slide Display Card */}
        {slide && (
          <div
            onMouseEnter={() => setIsSlidePaused(true)}
            onMouseLeave={() => setIsSlidePaused(false)}
            className="bg-surface-container-lowest border border-surface-container-high rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden transition-all duration-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Recommendations */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <span className="text-xs font-bold text-bracket-border uppercase tracking-wider">
                    Kategori Pilihan 0{activeSlide + 1} / 0{EDUCATIONAL_SLIDES.length}
                  </span>
                  <h3 className="font-heading font-extrabold text-on-surface text-xl sm:text-2xl mt-1">
                    {slide.headline}
                  </h3>
                  <p className="text-sm text-text-body mt-2 leading-relaxed">
                    {slide.desc}
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-bold text-on-surface uppercase tracking-wider">
                    Rekomendasi Finishing Berdasarkan Standard Industri:
                  </p>
                  {slide.recommendations.map((rec, rIdx) => (
                    <div
                      key={rIdx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-low border border-surface-container hover:border-bracket-border/40 transition"
                    >
                      <span className="material-symbols-outlined text-bracket-border text-lg shrink-0 mt-0.5">
                        task_alt
                      </span>
                      <div>
                        <p className="text-xs font-bold text-on-surface">{rec.title}</p>
                        <p className="text-xs text-text-body mt-0.5 leading-relaxed">
                          {rec.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Technical Specs & WhatsApp CTA */}
              <div className="lg:col-span-5 bg-navbar-black text-white rounded-2xl p-6 flex flex-col justify-between gap-6 shadow-xl border border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                    <span className="material-symbols-outlined text-accent-gold text-xl">
                      precision_manufacturing
                    </span>
                    <p className="font-heading font-bold text-sm text-white">
                      Parameter Presisi Pabrik Bizpark
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <p className="text-[11px] text-gray-400">Standar Pengujian Mutu</p>
                      <p className="text-xs font-semibold text-white mt-0.5">
                        {slide.technicalSpec.standard}
                      </p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <p className="text-[11px] text-gray-400">Toleransi Register Mesin</p>
                      <p className="text-xs font-semibold text-accent-gold mt-0.5">
                        {slide.technicalSpec.register}
                      </p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <p className="text-[11px] text-gray-400">Garansi Daya Tahan</p>
                      <p className="text-xs font-semibold text-white mt-0.5">
                        {slide.technicalSpec.durability}
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/6282231019363?text=Halo%20Pelangi%20UV%2C%20saya%20ingin%20konsultasi%20finishing%20untuk%20kategori%20${encodeURIComponent(
                    slide.category
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-bracket-border hover:bg-primary-container text-white text-xs font-bold shadow-lg transition active:scale-95"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  <span>Uji Sampel Bahan Kategori Ini</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

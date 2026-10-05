"use client";

import React, { useState, useEffect } from "react";
import { journeyStoryPhases } from "@/lib/data/journey";
import JawaTimurGlobe from "./JawaTimurGlobe";

export default function JourneySection() {
  const [activeIdx, setActiveIdx] = useState(0); // Start from 2004
  const [enlargedImageIndex, setEnlargedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    if (enlargedImageIndex !== null) return;

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % journeyStoryPhases.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [enlargedImageIndex]);

  useEffect(() => {
    if (enlargedImageIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setEnlargedImageIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enlargedImageIndex]);

  const navJourney = (dir: number) => {
    setActiveIdx(
      (prev) =>
        (prev + dir + journeyStoryPhases.length) % journeyStoryPhases.length
    );
  };

  const cur = journeyStoryPhases[activeIdx];
  const prevIdx =
    (activeIdx - 1 + journeyStoryPhases.length) % journeyStoryPhases.length;
  const nextIdx = (activeIdx + 1) % journeyStoryPhases.length;

  return (
    <section
      className="w-full bg-[#0d0d0e] py-space-3xl relative overflow-hidden text-white group"
      id="perjalanan"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="max-w-7xl mx-auto px-gutter relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-3 mb-2.5">
            <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-white/40"></span>
            <span className="font-label-meta text-xs sm:text-sm uppercase tracking-[0.25em] text-white/70 font-semibold">
              PERJALANAN KAMI
            </span>
            <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-white/40"></span>
          </div>
          <h2 className="font-headline-xl text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight uppercase anim-text-shimmer select-none">
            CV PELANGI UV
          </h2>
          <div className="w-16 sm:w-24 h-[2px] mx-auto mt-3 bg-gradient-to-r from-transparent via-white/50 to-transparent anim-title-glow rounded-full"></div>
        </div>

        {/* Phase Story Narration (Clean without box, proportional size) */}
        <div className="relative max-w-3xl mx-auto text-center mb-8 px-8 sm:px-14">
          {/* Left Button */}
          <button
            aria-label="Fase sebelumnya"
            onClick={() => navJourney(-1)}
            type="button"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-white/5 hover:bg-bracket-border text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/15 hover:border-bracket-border cursor-pointer shadow-md active:scale-95 z-20"
          >
            <span translate="no" className="material-symbols-outlined notranslate text-[20px] sm:text-[22px]">
              chevron_left
            </span>
          </button>

          {/* Right Button */}
          <button
            aria-label="Fase selanjutnya"
            onClick={() => navJourney(1)}
            type="button"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-white/5 hover:bg-bracket-border text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/15 hover:border-bracket-border cursor-pointer shadow-md active:scale-95 z-20"
          >
            <span translate="no" className="material-symbols-outlined notranslate text-[20px] sm:text-[22px]">
              chevron_right
            </span>
          </button>

          <div className="transition-all duration-300">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-1.5">
              {cur.year}
            </div>
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white/80 mb-2.5 tracking-wider uppercase">
              {cur.title}
            </h3>
            <p className="text-surface-dim text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-xl mx-auto">
              {cur.desc}
            </p>
          </div>
        </div>

        {/* Dome Globe Component */}
        <JawaTimurGlobe
          currentYearText={cur.year}
          activePhaseIdx={activeIdx}
        />

        {/* Simple Stage Indicators */}
        <div className="max-w-2xl mx-auto flex items-center justify-between px-4 sm:px-8 pt-4 pb-6">
          <button
            type="button"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-surface-dim hover:text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer hover:border-bracket-border"
            onClick={() => navJourney(-1)}
          >
            <span translate="no" className="material-symbols-outlined notranslate text-[16px]">arrow_back</span>
            <span>{journeyStoryPhases[prevIdx].year}</span>
          </button>

          <div className="flex items-center gap-2">
            {journeyStoryPhases.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIdx === idx
                    ? "w-8 bg-bracket-border shadow-[0_0_10px_rgba(246,84,86,0.8)]"
                    : "w-2 bg-white/25 hover:bg-white/50"
                }`}
                aria-label={`Pindah ke fase ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-surface-dim hover:text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer hover:border-bracket-border"
            onClick={() => navJourney(1)}
          >
            <span>{journeyStoryPhases[nextIdx].year}</span>
            <span translate="no" className="material-symbols-outlined notranslate text-[16px]">arrow_forward</span>
          </button>
        </div>

        {/* 3 Images Grid with Always-Visible Captions */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {cur.images?.map((imgItem, imgIdx) => (
            <div
              key={`${activeIdx}-${imgIdx}`}
              className="group rounded-2xl overflow-hidden bg-[#141416]/80 border border-white/15 hover:border-bracket-border/60 transition-all duration-300 shadow-lg flex flex-col text-left"
            >
              {/* Photo Area (Click to enlarge) */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setEnlargedImageIndex(imgIdx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setEnlargedImageIndex(imgIdx);
                  }
                }}
                className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-black/40"
                title="Klik untuk memperbesar foto"
              >
                <img
                  src={imgItem.url}
                  alt={imgItem.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity pointer-events-none" />

                {/* Subtle zoom icon on hover */}
                <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white/90 border border-white/15 pointer-events-none">
                  <span translate="no" className="material-symbols-outlined notranslate text-[16px]">zoom_in</span>
                </div>
              </div>

              {/* Caption already visible right here when sliding / changing years */}
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-center bg-surface-canvas/20 border-t border-white/10">
                <p className="text-white/85 text-xs sm:text-[13px] leading-relaxed font-normal">
                  {imgItem.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pure Enlarged Image Lightbox (No Caption, with blurred ambient background) */}
      {enlargedImageIndex !== null && cur.images[enlargedImageIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl animate-fade-in"
          onClick={() => setEnlargedImageIndex(null)}
        >
          {/* Ambient blurred backdrop of the photo */}
          <div
            className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-25 pointer-events-none scale-125"
            style={{
              backgroundImage: `url(${cur.images[enlargedImageIndex].url})`,
            }}
          />

          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setEnlargedImageIndex(null)}
              aria-label="Tutup pratinjau foto"
              className="absolute -top-12 right-0 sm:right-2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-bracket-border text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xl"
            >
              <span translate="no" className="material-symbols-outlined notranslate text-[20px]">close</span>
            </button>

            {/* Prev Photo Arrow */}
            <button
              type="button"
              onClick={() =>
                setEnlargedImageIndex(
                  (enlargedImageIndex - 1 + cur.images.length) % cur.images.length
                )
              }
              aria-label="Foto sebelumnya"
              className="absolute -left-3 sm:-left-12 top-1/2 -translate-y-1/2 w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-black/70 hover:bg-bracket-border text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer active:scale-95 shadow-lg z-20"
            >
              <span translate="no" className="material-symbols-outlined notranslate text-[20px]">chevron_left</span>
            </button>

            {/* Next Photo Arrow */}
            <button
              type="button"
              onClick={() =>
                setEnlargedImageIndex(
                  (enlargedImageIndex + 1) % cur.images.length
                )
              }
              aria-label="Foto selanjutnya"
              className="absolute -right-3 sm:-right-12 top-1/2 -translate-y-1/2 w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-black/70 hover:bg-bracket-border text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer active:scale-95 shadow-lg z-20"
            >
              <span translate="no" className="material-symbols-outlined notranslate text-[20px]">chevron_right</span>
            </button>

            {/* Pure Clean Photo - No Caption! */}
            <div className="overflow-hidden rounded-2xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.85)] bg-black/70">
              <img
                src={cur.images[enlargedImageIndex].url}
                alt="Foto Dokumentasi CV Pelangi UV"
                className="max-h-[78vh] max-w-[88vw] w-auto h-auto object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

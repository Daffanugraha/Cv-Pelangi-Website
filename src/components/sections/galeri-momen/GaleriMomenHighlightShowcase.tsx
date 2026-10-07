"use client";

import React, { useState, useEffect, useRef } from "react";
import { MOMEN_HIGHLIGHTS, MomenHighlight, MomenPhoto } from "@/lib/data/galeriMomen";

interface GaleriMomenHighlightShowcaseProps {
  onSelectPhoto: (photo: MomenPhoto) => void;
  onFilterChange: (filterKey: string) => void;
  highlights?: MomenHighlight[];
}

export default function GaleriMomenHighlightShowcase({
  onSelectPhoto,
  onFilterChange,
  highlights = MOMEN_HIGHLIGHTS,
}: GaleriMomenHighlightShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeHighlights = highlights.length > 0 ? highlights : MOMEN_HIGHLIGHTS;
  const total = activeHighlights.length;
  const current = activeHighlights[currentIndex] || activeHighlights[0];

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, total]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handleViewAlbum = (filterKey: string) => {
    onFilterChange(filterKey);
    const targetEl = document.querySelector(`[data-album-category="${filterKey}"]`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="highlightSection"
      className="w-full py-8 md:py-10 bg-[#0c0d0e] border-y border-white/10 transition-all duration-300"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header: Clean Title & Controls */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-bracket-border animate-pulse" />
            <h2 className="font-headline-xl text-lg sm:text-xl lg:text-2xl text-white font-bold tracking-tight">
              Sorotan Momen
            </h2>
          </div>

          {/* Controls: Counter + Prev/Next */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold text-zinc-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full tracking-wide">
              {currentIndex + 1} / {total}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Sebelumnya"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-bracket-border text-white border border-white/10 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90"
            >
              <span translate="no" className="material-symbols-outlined notranslate text-[16px]">
                arrow_back
              </span>
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Selanjutnya"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-bracket-border text-white border border-white/10 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90"
            >
              <span translate="no" className="material-symbols-outlined notranslate text-[16px]">
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        {/* Main Dark Card */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="group relative rounded-2xl overflow-hidden bg-[#141518] border border-white/10 shadow-2xl transition-all duration-300"
        >
          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/5 overflow-hidden">
            <div
              className="h-full bg-bracket-border transition-all duration-500 ease-out"
              style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[380px]">
            {/* Col 1: Gambar */}
            <div className="lg:col-span-7 p-4 sm:p-6">
              <div
                onClick={() =>
                  onSelectPhoto({
                    alt: current.title,
                    caption: current.caption,
                    title: current.title,
                    src: current.img,
                    cardTitle: current.title,
                    cardDesc: current.desc,
                  })
                }
                className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] rounded-xl overflow-hidden bg-black/40 shadow-lg cursor-pointer group/img"
              >
                <img
                  className="w-full h-full object-cover transition-all duration-500 ease-out transform group-hover/img:scale-105"
                  alt={current.title}
                  src={current.img}
                />
                <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/0 transition-colors" />

                {/* Hover Zoom Prompt */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 bg-black/30">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-bracket-border font-bold text-xs shadow-lg backdrop-blur-sm">
                    <span translate="no" className="material-symbols-outlined notranslate text-[16px]">
                      zoom_in
                    </span>
                    Perbesar
                  </span>
                </div>
              </div>
            </div>

            {/* Col 2: Deskripsi */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between h-full">
              <div className="transition-all duration-300 ease-out">
                <h3 className="font-headline-xl text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight mb-3">
                  {current.title}
                </h3>
                <p className="font-body-md text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                  {current.desc}
                </p>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleViewAlbum(current.filterKey)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-bracket-border hover:bg-[#d61e1b] text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <span>Lihat Album Lengkap</span>
                    <span translate="no" className="material-symbols-outlined notranslate text-[16px]">
                      arrow_downward
                    </span>
                  </button>
                </div>
              </div>

              {/* Dots Navigator */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-center sm:justify-start">
                <div className="flex items-center gap-2">
                  {activeHighlights.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => setCurrentIndex(dotIdx)}
                      aria-label={`Slide ${dotIdx + 1}`}
                      className={`transition-all duration-300 cursor-pointer ${
                        dotIdx === currentIndex
                          ? "w-6 h-2 rounded-full bg-bracket-border"
                          : "w-2 h-2 rounded-full bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

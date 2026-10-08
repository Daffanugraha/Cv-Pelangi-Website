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
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeHighlights = highlights.length > 0 ? highlights : MOMEN_HIGHLIGHTS;
  const total = activeHighlights.length;
  const current = activeHighlights[currentIndex] || activeHighlights[0];

  // Ambil hingga 4 foto terbaik dari album/sorotan momen saat ini
  const displayPhotos: MomenPhoto[] = React.useMemo(() => {
    if (current?.photos && current.photos.length > 0) {
      return current.photos.slice(0, 4);
    }
    return [
      {
        src: current.img,
        title: current.title,
        caption: current.caption || current.desc,
        alt: current.title,
        cardTitle: current.title,
        cardDesc: current.desc,
      },
    ];
  }, [current]);

  useEffect(() => {
    if (total <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total, currentIndex]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4500);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    resetTimer();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
    resetTimer();
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
            {/* Col 1: Bento Grid 4 Foto Estetik */}
            <div className="lg:col-span-7 p-4 sm:p-6">
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] rounded-xl overflow-hidden bg-black/40 shadow-lg p-1.5 sm:p-2 bg-[#1a1b1e]/80 border border-white/10">
                <div className="w-full h-full grid grid-cols-4 grid-rows-2 gap-2">
                  {displayPhotos.map((photo, i) => {
                    let spanClass = "col-span-4 row-span-2";
                    if (displayPhotos.length === 2) {
                      spanClass = "col-span-2 row-span-2";
                    } else if (displayPhotos.length === 3) {
                      spanClass = i === 0 ? "col-span-2 row-span-2" : "col-span-2 row-span-1";
                    } else if (displayPhotos.length >= 4) {
                      spanClass =
                        i === 0
                          ? "col-span-2 row-span-2"
                          : i === 1
                          ? "col-span-2 row-span-1"
                          : "col-span-1 row-span-1";
                    }

                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() =>
                          onSelectPhoto({
                            alt: photo.alt || photo.title || current.title,
                            caption: photo.caption || current.caption || current.desc,
                            title: photo.title || current.title,
                            src: photo.src,
                            cardTitle: photo.cardTitle || current.title,
                            cardDesc: photo.cardDesc || current.desc,
                          })
                        }
                        aria-label={`Perbesar foto ${i + 1} - ${photo.title || current.title}`}
                        className={`group/tile relative overflow-hidden rounded-lg bg-black/40 cursor-zoom-in text-left border border-white/5 hover:border-white/20 transition-all ${spanClass}`}
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt || photo.title || current.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/tile:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/15 group-hover/tile:bg-transparent transition-colors" />

                        {/* Hover Zoom Icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/tile:opacity-100 transition-opacity duration-200 bg-black/25">
                          <span className="p-2 rounded-full bg-black/60 text-white backdrop-blur-sm shadow-md">
                            <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                              zoom_in
                            </span>
                          </span>
                        </div>
                      </button>
                    );
                  })}
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

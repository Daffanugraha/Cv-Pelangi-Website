"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArticleItem } from "@/lib/data/articles";

interface BlogHighlightShowcaseProps {
  articles: ArticleItem[];
  onReadArticle?: (article: ArticleItem) => void;
}

export default function BlogHighlightShowcase({
  articles,
  onReadArticle,
}: BlogHighlightShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = articles.length;

  // Auto-slide every 6 seconds if not paused
  useEffect(() => {
    if (total <= 1) return;

    if (timerRef.current) clearInterval(timerRef.current);

    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % total);
      }, 6000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total, isPaused]);

  if (total === 0) return null;

  const currentArticle = articles[currentIndex] || articles[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const progressPercent = ((currentIndex + 1) / total) * 100;

  return (
    <section
      id="highlightSection"
      className="w-full py-8 md:py-10 bg-[#0c0d0e] border-y border-white/10 transition-all duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        {/* Header: Clean Title & Controls identik dengan Sorotan Galeri */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-bracket-border animate-pulse" />
            <h2 className="font-headline-xl text-lg sm:text-xl lg:text-2xl text-white font-bold tracking-tight">
              Wawasan Unggulan
            </h2>
          </div>

          {/* Controls: Counter + Prev/Next Buttons */}
          <div className="flex items-center gap-2.5">
            <span
              id="hlCounter"
              className="text-xs font-semibold text-zinc-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full tracking-wide"
            >
              {currentIndex + 1} / {total}
            </span>
            <button
              id="hlPrevBtn"
              type="button"
              aria-label="Artikel Sebelumnya"
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-bracket-border text-white border border-white/10 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90"
            >
              <span
                translate="no"
                className="material-symbols-outlined notranslate text-[16px]"
              >
                arrow_back
              </span>
            </button>
            <button
              id="hlNextBtn"
              type="button"
              aria-label="Artikel Selanjutnya"
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-bracket-border text-white border border-white/10 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90"
            >
              <span
                translate="no"
                className="material-symbols-outlined notranslate text-[16px]"
              >
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        {/* Main Dark Card (Identik style dengan galeri) */}
        <div
          id="highlightShowcaseCard"
          className="group relative rounded-2xl overflow-hidden bg-[#141518] border border-white/10 shadow-2xl transition-all duration-300"
        >
          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/5 overflow-hidden">
            <div
              id="hlProgressBar"
              className="h-full bg-bracket-border transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[380px]">
            {/* Col 1: Gambar 1 saja dengan hover zoom effect */}
            <div className="lg:col-span-7 p-4 sm:p-6">
              <Link
                href={`/blog/${currentArticle.slug}`}
                id="hlImageWrapper"
                className="relative block w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] rounded-xl overflow-hidden bg-black/40 shadow-lg cursor-pointer group/img"
              >
                {/* Image */}
                <img
                  id="hlImg"
                  key={currentArticle.id}
                  src={currentArticle.img}
                  alt={currentArticle.title}
                  className="w-full h-full object-cover transition-all duration-500 ease-out transform group-hover/img:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/0 transition-colors" />

                {/* Hover Zoom Prompt */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 bg-black/30">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 text-bracket-border font-bold text-xs shadow-lg backdrop-blur-sm">
                    <span
                      translate="no"
                      className="material-symbols-outlined notranslate text-[16px]"
                    >
                      menu_book
                    </span>
                    Baca Selengkapnya
                  </span>
                </div>
              </Link>
            </div>

            {/* Col 2: Deskripsi & Informasi Artikel */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between h-full">
              <div
                id="hlContentBox"
                key={currentArticle.id}
                className="transition-all duration-300 ease-out animate-fadeIn"
              >
                {/* Meta Bar */}
                <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-zinc-400">
                  <span className="px-2.5 py-0.5 rounded-full bg-bracket-border/20 text-bracket-border font-bold text-xs border border-bracket-border/30">
                    {currentArticle.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="flex items-center gap-1">
                    <span
                      translate="no"
                      className="material-symbols-outlined notranslate text-[15px] text-zinc-400"
                    >
                      event
                    </span>
                    <span>{currentArticle.date}</span>
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="flex items-center gap-1">
                    <span
                      translate="no"
                      className="material-symbols-outlined notranslate text-[15px] text-zinc-400"
                    >
                      timer
                    </span>
                    <span>{currentArticle.readTime}</span>
                  </span>
                </div>

                {/* Title */}
                <h3
                  id="hlTitle"
                  className="font-headline-xl text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight mb-3 hover:text-bracket-border transition-colors line-clamp-2"
                >
                  <Link href={`/blog/${currentArticle.slug}`}>
                    {currentArticle.title}
                  </Link>
                </h3>

                {/* Description */}
                <p
                  id="hlDesc"
                  className="font-body-md text-sm sm:text-base text-zinc-300 leading-relaxed mb-6 line-clamp-3"
                >
                  {currentArticle.desc}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={`/blog/${currentArticle.slug}`}
                    id="hlViewAlbumBtn"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-bracket-border hover:bg-[#d61e1b] text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <span>Baca Selengkapnya</span>
                    <span
                      translate="no"
                      className="material-symbols-outlined notranslate text-[16px]"
                    >
                      arrow_forward
                    </span>
                  </Link>

                  {onReadArticle && (
                    <button
                      type="button"
                      onClick={() => onReadArticle(currentArticle)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-semibold text-xs transition-colors border border-white/10 cursor-pointer"
                    >
                      <span
                        translate="no"
                        className="material-symbols-outlined notranslate text-[16px]"
                      >
                        visibility
                      </span>
                      <span>Preview Cepat</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Dots Navigator */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <div id="hlDotsContainer" className="flex items-center gap-2">
                  {articles.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={`Slide ${idx + 1}: ${item.category}`}
                      onClick={() => setCurrentIndex(idx)}
                      className={`hl-dot transition-all duration-300 cursor-pointer rounded-full ${
                        idx === currentIndex
                          ? "w-6 h-2 bg-bracket-border"
                          : "w-2 h-2 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>

                <span className="text-[11px] text-zinc-500 font-medium">
                  {currentArticle.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

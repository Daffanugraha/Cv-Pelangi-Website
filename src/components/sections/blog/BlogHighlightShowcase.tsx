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
      className="w-full py-8 md:py-12 bg-surface-bright border-b border-divider-tint/40 transition-colors duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        {/* Header: Clean Title & Controls */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-bracket-border animate-pulse" />
            <h2 className="font-headline-lg text-xl sm:text-2xl lg:text-[28px] text-on-surface font-bold tracking-tight">
              Wawasan Unggulan
            </h2>
          </div>

          {/* Controls: Counter + Prev/Next Buttons */}
          <div className="flex items-center gap-2">
            <span
              id="hlCounter"
              className="text-xs font-semibold text-text-muted bg-surface-canvas border border-divider-tint/60 px-3.5 py-1.5 rounded-full shadow-xs tracking-wide"
            >
              {currentIndex + 1} / {total}
            </span>
            <button
              id="hlPrevBtn"
              type="button"
              aria-label="Artikel Sebelumnya"
              onClick={handlePrev}
              className="w-9 h-9 rounded-full bg-surface-canvas hover:bg-bracket-border hover:text-white text-on-surface border border-divider-tint/60 flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer active:scale-90"
            >
              <span
                translate="no"
                className="material-symbols-outlined notranslate text-[18px]"
              >
                arrow_back
              </span>
            </button>
            <button
              id="hlNextBtn"
              type="button"
              aria-label="Artikel Selanjutnya"
              onClick={handleNext}
              className="w-9 h-9 rounded-full bg-surface-canvas hover:bg-bracket-border hover:text-white text-on-surface border border-divider-tint/60 flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer active:scale-90"
            >
              <span
                translate="no"
                className="material-symbols-outlined notranslate text-[18px]"
              >
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        {/* Main Showcase Card */}
        <div
          id="highlightShowcaseCard"
          className="group relative rounded-3xl overflow-hidden bg-surface-canvas border border-divider-tint/60 shadow-[0_12px_36px_-10px_rgba(246,84,86,0.10),0_4px_16px_rgba(0,0,0,0.03)] transition-all duration-300"
        >
          {/* Progress Bar */}
          <div className="w-full h-1 bg-surface-container overflow-hidden">
            <div
              id="hlProgressBar"
              className="h-full bg-bracket-border transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[380px]">
            {/* Col 1: Gambar Utama dengan Fallback & Efek Hover Zoom */}
            <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-center">
              <Link
                href={`/blog/${currentArticle.slug}`}
                id="hlImageWrapper"
                className="relative block w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] rounded-2xl overflow-hidden bg-surface-container shadow-sm cursor-pointer group/img"
              >
                <img
                  id="hlImg"
                  key={currentArticle.id}
                  src={currentArticle.img || "/images/placeholder.jpg"}
                  alt={currentArticle.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes("placeholder.jpg")) {
                      target.src = "/images/placeholder.jpg";
                    }
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                />

                {/* Soft gradient bottom overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover/img:opacity-80 transition-opacity" />

                {/* Category Pill Tag di Pojok Gambar */}
                <div className="absolute top-4 left-4 bg-black/65 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2 text-white text-xs font-bold border border-white/20 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-bracket-border animate-pulse" />
                  <span>{currentArticle.category}</span>
                </div>

                {/* Quick Hint on Hover */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-on-surface font-semibold text-xs shadow-md backdrop-blur-sm opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                  <span
                    translate="no"
                    className="material-symbols-outlined notranslate text-[16px] text-bracket-border"
                  >
                    menu_book
                  </span>
                  <span>Buka Artikel</span>
                </div>
              </Link>
            </div>

            {/* Col 2: Deskripsi & Informasi Artikel */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:pl-0 flex flex-col justify-between h-full">
              <div
                id="hlContentBox"
                key={currentArticle.id}
                className="transition-all duration-300 ease-out animate-fadeIn flex flex-col justify-center h-full"
              >
                {/* Meta Bar */}
                <div className="flex flex-wrap items-center gap-2.5 mb-3.5 text-xs text-text-muted">
                  <span className="px-3 py-1 rounded-full bg-bracket-border/10 text-bracket-border font-bold text-xs border border-bracket-border/20">
                    {currentArticle.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-divider-tint" />
                  <span className="flex items-center gap-1">
                    <span
                      translate="no"
                      className="material-symbols-outlined notranslate text-[16px] text-text-muted"
                    >
                      event
                    </span>
                    <span>{currentArticle.date}</span>
                  </span>
                  <span className="w-1 h-1 rounded-full bg-divider-tint" />
                  <span className="flex items-center gap-1">
                    <span
                      translate="no"
                      className="material-symbols-outlined notranslate text-[16px] text-text-muted"
                    >
                      timer
                    </span>
                    <span>{currentArticle.readTime}</span>
                  </span>
                </div>

                {/* Title */}
                <h3
                  id="hlTitle"
                  className="font-headline-lg text-xl sm:text-2xl lg:text-[26px] font-bold text-on-surface leading-snug tracking-tight mb-3.5 hover:text-bracket-border transition-colors line-clamp-2"
                >
                  <Link href={`/blog/${currentArticle.slug}`}>
                    {currentArticle.title}
                  </Link>
                </h3>

                {/* Description */}
                <p
                  id="hlDesc"
                  className="font-body-md text-sm sm:text-base text-text-body leading-relaxed mb-6 line-clamp-3"
                >
                  {currentArticle.desc}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Link
                    href={`/blog/${currentArticle.slug}`}
                    id="hlViewAlbumBtn"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-bracket-border hover:bg-secondary text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
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
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs sm:text-sm transition-all border border-divider-tint/50 shadow-xs cursor-pointer active:scale-95"
                    >
                      <span
                        translate="no"
                        className="material-symbols-outlined notranslate text-[16px] text-bracket-border"
                      >
                        visibility
                      </span>
                      <span>Preview Cepat</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Dots Navigator */}
              <div className="mt-8 pt-4 border-t border-divider-tint/40 flex items-center justify-between">
                <div id="hlDotsContainer" className="flex items-center gap-2">
                  {articles.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={`Slide ${idx + 1}: ${item.category}`}
                      onClick={() => setCurrentIndex(idx)}
                      className={`hl-dot transition-all duration-300 cursor-pointer rounded-full ${
                        idx === currentIndex
                          ? "w-7 h-2 bg-bracket-border shadow-xs"
                          : "w-2 h-2 bg-surface-container-highest hover:bg-divider-tint"
                      }`}
                    />
                  ))}
                </div>

                <span className="text-[11px] text-text-muted font-medium">
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

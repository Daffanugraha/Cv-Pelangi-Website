"use client";

import React, { useState, useEffect } from "react";
import { aboutSlides } from "@/lib/data/about";
import { protectBrandText } from "@/lib/utils";

export default function AboutSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const duration = 8000;
  const step = 100;

  // Listen to YouTube player state changes via postMessage
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (data && data.event === "onStateChange") {
          // 1 = PLAYING, 3 = BUFFERING -> pause auto-slide
          // 2 = PAUSED, 0 = ENDED -> resume auto-slide
          if (data.info === 1 || data.info === 3) {
            setIsVideoPlaying(true);
          } else if (data.info === 2 || data.info === 0) {
            setIsVideoPlaying(false);
          }
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Auto-slide loop with progress retention
  useEffect(() => {
    // If paused by hover OR if video is currently playing, hold progress at exact point
    if (isPaused || isVideoPlaying) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (step / duration) * 100;
        if (next >= 100) {
          return 100;
        }
        return next;
      });
    }, step);

    return () => clearInterval(timer);
  }, [isPaused, isVideoPlaying]);

  // Handle slide transition cleanly when progress reaches 100%
  useEffect(() => {
    if (progress >= 100) {
      setActiveIdx((prev) => (prev + 1) % aboutSlides.length);
      setProgress(0);
    }
  }, [progress]);

  const goToSlide = (idx: number) => {
    setActiveIdx(idx);
    setProgress(0);
  };

  const nextSlide = () => {
    setActiveIdx((prev) => (prev + 1) % aboutSlides.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setActiveIdx((prev) => (prev - 1 + aboutSlides.length) % aboutSlides.length);
    setProgress(0);
  };

  const slide = aboutSlides[activeIdx] || aboutSlides[0];

  const tabLabels = aboutSlides.map(
    (s, idx) => s.tabLabel || (idx === 0 ? "Profil Perusahaan" : idx === 1 ? "Visi" : "Misi")
  );

  return (
    <section
      className="w-full bg-surface-canvas py-space-3xl relative overflow-hidden"
      id="profil-perusahaan"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="absolute -right-24 top-20 w-96 h-96 rounded-full bg-surface-tint-light filter blur-3xl opacity-70 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-gutter relative z-10">
        <div
          className="relative mb-space-3xl select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Header Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-surface-container">
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-navbar-black/5 border border-navbar-black/10">
              {tabLabels.map((lbl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-label-nav text-[13px] sm:text-label-nav transition-all duration-300 cursor-pointer ${
                    activeIdx === idx
                      ? "bg-bracket-border text-on-primary font-semibold shadow-sm"
                      : "bg-surface-neutral-alt hover:bg-surface-container text-text-body hover:text-bracket-border font-medium"
                  }`}
                >
                  {lbl}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Slide sebelumnya"
                className="w-9 h-9 rounded-full bg-surface-neutral-alt hover:bg-bracket-border hover:text-white text-on-surface flex items-center justify-center transition-all cursor-pointer shadow-sm border border-surface-container"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                  chevron_left
                </span>
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Slide selanjutnya"
                className="w-9 h-9 rounded-full bg-surface-neutral-alt hover:bg-bracket-border hover:text-white text-on-surface flex items-center justify-center transition-all cursor-pointer shadow-sm border border-surface-container"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                  chevron_right
                </span>
              </button>
            </div>
          </div>

          {/* Slide Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center transition-all duration-500">
            {/* Left Description */}
            <div className="lg:col-span-6 space-y-space-md">
              <h2 className="font-headline-xl text-2xl sm:text-3xl lg:text-[34px] text-on-surface font-extrabold leading-tight">
                {protectBrandText(slide.title)}
              </h2>

              {slide.points ? (
                <div className="space-y-3">
                  <p className="font-body-md text-text-body leading-relaxed text-sm sm:text-base">
                    {protectBrandText(slide.desc)}
                  </p>
                  <div className="space-y-2 pt-1">
                    {slide.points.map((pt, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-surface-neutral-alt border border-surface-container hover:border-bracket-border/40 transition-colors shadow-2xs"
                      >
                        <span className="w-6 h-6 rounded-full bg-bracket-border text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                          {pIdx + 1}
                        </span>
                        <p className="font-body-md text-navbar-black font-semibold text-sm sm:text-base leading-relaxed">
                          {protectBrandText(pt)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="font-body-md text-text-body leading-relaxed text-sm sm:text-base">
                  {protectBrandText(slide.desc)}
                </p>
              )}

              <div className="pt-2 flex items-center gap-4">
                <a
                  href="#pesan-sekarang"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-bracket-border hover:bg-primary text-white font-cta-pill text-sm font-semibold shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <span>{slide.ctaText}</span>
                  <span translate="no" className="material-symbols-outlined notranslate text-[16px]">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>

            {/* Right Media Card (YouTube Video or Image) */}
            <div className="lg:col-span-6">
              {slide.youtubeId ? (
                <div
                  className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video bg-black border border-surface-container"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${slide.youtubeId}?enablejsapi=1&rel=0&modestbranding=1`}
                    title={slide.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    onLoad={(e) => {
                      try {
                        e.currentTarget.contentWindow?.postMessage(
                          JSON.stringify({ event: "listening" }),
                          "*"
                        );
                      } catch {
                        // ignore
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video bg-surface-container border border-surface-container group">
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {aboutSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`transition-all cursor-pointer ${
                  activeIdx === idx
                    ? "w-8 h-2 rounded-full bg-bracket-border"
                    : "w-2.5 h-2 rounded-full bg-outline-variant hover:bg-bracket-border"
                }`}
              />
            ))}
          </div>

          {/* Timer Progress Bar (Always visible, smoothly pauses & holds progress) */}
          <div className="w-full h-1 bg-surface-container rounded-full mt-4 overflow-hidden">
            <div
              className={`h-full transition-all duration-100 ease-linear rounded-full ${
                isPaused || isVideoPlaying
                  ? "bg-accent-gold shadow-[0_0_8px_rgba(254,209,0,0.6)]"
                  : "bg-bracket-border"
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}

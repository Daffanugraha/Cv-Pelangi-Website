"use client";

import React, { useState } from "react";
import { PELANGI_LIFE_REELS, PelangiLifeReel } from "@/data/careers";

export default function PelangiLifeSection() {
  const [activeReel, setActiveReel] = useState<PelangiLifeReel | null>(null);

  const handleOpenReel = (reel: PelangiLifeReel) => {
    setActiveReel(reel);
  };

  return (
    <section className="w-full py-12 sm:py-16 bg-white text-on-surface relative overflow-hidden border-b border-surface-container">
      <div className="max-w-7xl mx-auto px-gutter relative z-10">
        {/* Section Header Ringkas & Bersih */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-surface-container">
          <div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
              CV Pelangi Life
            </h2>
            <p className="font-sans text-text-muted text-sm mt-1">
              Dokumentasi aktivitas tim dan keseruan kerja di CV Pelangi UV.
            </p>
          </div>

          {/* Social Media Links (TikTok & Instagram) */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href="https://www.tiktok.com/@pelangi.uv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-neutral-alt hover:bg-surface-container border border-outline-variant/40 text-on-surface text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4 fill-current text-black" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.26 6.26 0 0 0 1.85-4.49v-7.4a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.85-.69z" />
              </svg>
              <span>TikTok @pelangi.uv</span>
            </a>

            <a
              href="https://www.instagram.com/pelangi.uv/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-neutral-alt hover:bg-surface-container border border-outline-variant/40 text-on-surface text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4 fill-current text-bracket-border" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Instagram @pelangi.uv</span>
            </a>
          </div>
        </div>

        {/* Reels Grid (5 Vertical Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {PELANGI_LIFE_REELS.map((reel) => (
            <button
              type="button"
              key={reel.id}
              onClick={() => handleOpenReel(reel)}
              aria-label={`Putar video ${reel.title}`}
              className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-surface-container hover:border-bracket-border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer flex flex-col justify-between aspect-[9/15] text-left w-full p-0 select-none active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-bracket-border"
            >
              {/* Background Thumbnail Image */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark Gradient Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 group-hover:via-black/25 transition-colors" />
              </div>

              {/* Card Header (Badge & Reel Icon) */}
              <div className="relative z-10 p-4 flex items-center justify-between w-full pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-white border border-white/20">
                  {reel.tag}
                </span>
                <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/20 text-white group-hover:bg-bracket-border group-hover:border-bracket-border transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                  </svg>
                </div>
              </div>

              {/* Center Play Button Overlay */}
              <div className="relative z-10 self-center pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-bracket-border/90 text-white flex items-center justify-center group-hover:scale-115 group-hover:bg-primary transition-all duration-300 shadow-2xl">
                  <svg className="w-7 h-7 fill-current translate-x-0.5" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 p-4 pointer-events-none w-full">
                <div className="flex items-center gap-2 text-xs text-white/80 font-medium mb-1">
                  <span>{reel.views} tayangan</span>
                  <span>&bull;</span>
                  <span className="text-bracket-border font-semibold">{reel.duration}</span>
                </div>
                <h3 className="font-heading font-bold text-white text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-bracket-border transition-colors">
                  {reel.title}
                </h3>
                <p className="text-white/70 text-xs line-clamp-2 mt-1 font-sans">
                  {reel.caption}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Modal Video Player (Immersive Full-Bleed Reels Style) */}
      {activeReel && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveReel(null)}
        >
          {/* Container Player ala Reels / TikTok */}
          <div
            className="relative w-full max-w-[380px] sm:max-w-[410px] aspect-[9/16] max-h-[92vh] rounded-[28px] overflow-hidden bg-black shadow-2xl border border-white/15 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Video Player */}
            <div className="absolute inset-0 z-0 bg-black">
              {activeReel.videoSrc ? (
                <video
                  key={activeReel.id}
                  src={activeReel.videoSrc}
                  poster={activeReel.thumbnail}
                  controls
                  autoPlay
                  playsInline
                  loop
                  preload="auto"
                  className="w-full h-full object-cover"
                />
              ) : (
                <iframe
                  src={`${activeReel.instagramUrl.split("?")[0].replace(/\/+$/, "")}/embed/`}
                  className="w-full h-full border-0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>

            {/* Top Bar Floating Over Video */}
            <div className="relative z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
                <span className="w-2 h-2 rounded-full bg-bracket-border animate-pulse" />
                CV Pelangi Life
              </span>

              <button
                type="button"
                onClick={() => setActiveReel(null)}
                className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md hover:bg-bracket-border text-white flex items-center justify-center text-lg font-bold border border-white/20 transition-all cursor-pointer pointer-events-auto hover:scale-110 active:scale-95 shadow-lg"
                aria-label="Tutup video"
              >
                ✕
              </button>
            </div>

            {/* Bottom Overlay Info & Direct Links (Full Bleed Transparan Elegan) */}
            <div className="relative z-10 p-5 pt-12 bg-gradient-to-t from-black/95 via-black/70 to-transparent pointer-events-none">
              <div className="flex items-center gap-2 text-xs text-white/80 font-medium mb-1.5">
                <span>{activeReel.views} tayangan</span>
                <span>&bull;</span>
                <span className="text-bracket-border font-semibold">{activeReel.duration}</span>
              </div>

              <h4 className="font-heading font-bold text-white text-base leading-snug drop-shadow-md">
                {activeReel.title}
              </h4>
              <p className="text-white/80 text-xs font-sans mt-1 line-clamp-2 leading-relaxed drop-shadow-sm">
                {activeReel.caption}
              </p>

              {/* Action Buttons Link Langsung ke Post */}
              <div className="flex items-center gap-2.5 mt-3.5 pointer-events-auto">
                <a
                  href={activeReel.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-bracket-border hover:bg-primary text-white text-xs font-bold transition-all shadow-md hover:scale-105 active:scale-95"
                >
                  <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span>Buka di Instagram</span>
                </a>

                <a
                  href="https://www.tiktok.com/@pelangi.uv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95"
                >
                  <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.26 6.26 0 0 0 1.85-4.49v-7.4a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.85-.69z" />
                  </svg>
                  <span>TikTok</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

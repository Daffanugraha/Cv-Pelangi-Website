"use client";

import React, { useState } from "react";
import { PELANGI_LIFE_REELS, PelangiLifeReel } from "@/data/careers";

export default function PelangiLifeSection() {
  const [activeReel, setActiveReel] = useState<PelangiLifeReel | null>(null);

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

        {/* Reels Grid (4 Vertical Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PELANGI_LIFE_REELS.map((reel) => (
            <div
              key={reel.id}
              onClick={() => setActiveReel(reel)}
              className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-surface-container hover:border-bracket-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer flex flex-col justify-between aspect-[9/15]"
            >
              {/* Background Thumbnail Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark Gradient Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 group-hover:via-black/25 transition-colors" />
              </div>

              {/* Card Header (Badge & Reel Icon) */}
              <div className="relative z-10 p-4 flex items-center justify-between">
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
              <div className="relative z-10 self-center">
                <div className="w-13 h-13 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-bracket-border transition-all duration-300 shadow-xl">
                  <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 p-4">
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
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Modal Preview Video Dummy */}
      {activeReel && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveReel(null)}
        >
          <div
            className="w-full max-w-sm rounded-3xl overflow-hidden bg-neutral-900 border border-white/20 shadow-2xl relative text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[9/16] bg-black">
              <img
                src={activeReel.thumbnail}
                alt={activeReel.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40 flex flex-col justify-between p-5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/60 text-xs font-bold text-white border border-white/20">
                    {activeReel.tag}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveReel(null)}
                    className="w-8 h-8 rounded-full bg-black/60 hover:bg-bracket-border flex items-center justify-center text-white cursor-pointer transition-colors"
                  >
                    &times;
                  </button>
                </div>

                <div>
                  <h4 className="font-bold text-base text-white mb-1">
                    {activeReel.title}
                  </h4>
                  <p className="text-xs text-white/80 line-clamp-3 mb-3">
                    {activeReel.caption}
                  </p>
                <div className="flex flex-col gap-2">
                  <a
                    href={activeReel.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-bracket-border hover:bg-primary text-white text-xs font-bold transition-all"
                  >
                    Tonton di Instagram Reels
                  </a>
                  <a
                    href="https://www.tiktok.com/@pelangi.uv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/20"
                  >
                    Kunjungi TikTok @pelangi.uv
                  </a>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

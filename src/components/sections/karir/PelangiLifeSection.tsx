"use client";

import React, { useState } from "react";
import { PELANGI_LIFE_REELS, PelangiLifeReel } from "@/data/careers";

export default function PelangiLifeSection() {
  const [activeReel, setActiveReel] = useState<PelangiLifeReel | null>(null);

  return (
    <section className="w-full py-12 md:py-16 bg-navbar-black text-white relative overflow-hidden">
      {/* Glow background accents */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-bracket-border/10 filter blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-accent-gold/10 filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-gutter relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider text-bracket-border border border-bracket-border/30 mb-3">
              <span className="w-2 h-2 rounded-full bg-bracket-border animate-pulse" />
              <span>Budaya &amp; Kegiatan Kerja</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
              CV Pelangi Life
            </h2>
            <p className="font-sans text-surface-dim text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Intip keseruan, dedikasi tim, dan aktivitas harian di balik mesin-mesin presisi CV Pelangi UV di Bizpark Sidoarjo.
            </p>
          </div>

          <a
            href="https://www.instagram.com/pelangi.uv/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shrink-0 w-fit"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span>Follow @pelangi.uv</span>
          </a>
        </div>

        {/* Reels Grid (4 Vertical Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PELANGI_LIFE_REELS.map((reel) => (
            <div
              key={reel.id}
              onClick={() => setActiveReel(reel)}
              className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 hover:border-bracket-border/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-bracket-border/20 cursor-pointer flex flex-col justify-between aspect-[9/15]"
            >
              {/* Background Thumbnail Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark Gradient Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30 group-hover:via-black/20 transition-colors" />
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
                <div className="w-14 h-14 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-bracket-border transition-all duration-300 shadow-xl">
                  <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 p-4">
                <div className="flex items-center gap-3 text-xs text-white/80 font-medium mb-1.5">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 fill-current text-white/60" viewBox="0 0 24 24">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                    {reel.views}
                  </span>
                  <span>&bull;</span>
                  <span className="text-accent-gold font-semibold">{reel.duration}</span>
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

      {/* Modal Video Reels Preview (Dummy Player) */}
      {activeReel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setActiveReel(null)}
        >
          <div
            className="relative w-full max-w-sm rounded-3xl overflow-hidden bg-neutral-900 border border-white/20 shadow-2xl p-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-bracket-border animate-ping" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  CV Pelangi Life &bull; Reels
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveReel(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                &times;
              </button>
            </div>

            {/* Video Placeholder Container (Aspect 9:16) */}
            <div className="relative aspect-[9/16] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeReel.thumbnail}
                alt={activeReel.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

              {/* Placeholder text indicating dumb/dummy video */}
              <div className="absolute inset-x-4 top-1/3 text-center p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10">
                <div className="w-12 h-12 rounded-full bg-bracket-border mx-auto flex items-center justify-center text-white mb-2 shadow-lg">
                  <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <h4 className="font-heading font-bold text-white text-sm">
                  {activeReel.title}
                </h4>
                <p className="text-[11px] text-white/70 mt-1">
                  Preview video placeholder (Reels dummy siap diganti link video/file user).
                </p>
                <a
                  href={activeReel.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black hover:bg-bracket-border hover:text-white font-semibold text-xs transition-all shadow"
                >
                  <span>Tonton di Instagram</span>
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Modal Caption */}
            <div className="p-4 bg-black/60">
              <p className="text-white text-xs leading-relaxed font-sans">
                {activeReel.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

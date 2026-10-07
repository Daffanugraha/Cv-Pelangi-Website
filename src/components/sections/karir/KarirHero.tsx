"use client";

import React from "react";

interface KarirHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDivision: string;
  setSelectedDivision: (div: string) => void;
  totalOpenJobs: number;
}

export default function KarirHero({
  searchQuery,
  setSearchQuery,
  selectedDivision,
  setSelectedDivision,
  totalOpenJobs,
}: KarirHeroProps) {
  return (
    <section className="w-full relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-gradient-to-b from-[#FFF0F0] via-[#FCF9F8] to-[#FFFFFF] border-b border-surface-container">
      {/* Background radial gradient blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-bracket-border/15 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-accent-gold/15 filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-gutter relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-canvas border border-bracket-border/30 text-bracket-border shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-bracket-border animate-ping" />
            <span className="font-label-meta text-xs uppercase tracking-widest font-bold">
              Peluang Karir &amp; Rekrutmen
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-on-surface tracking-tight leading-tight mb-4">
            Temukan Tujuanmu &amp; Berkarya Bersama{" "}
            <span className="text-bracket-border">CV Pelangi UV</span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-text-body text-base sm:text-lg leading-relaxed">
            Bergabunglah dengan industri finishing cetak presisi terdepan sejak 2004 di Bizpark Sidoarjo. Bangun karir profesional Anda bersama lingkungan kerja yang suportif dan berorientasi kualitas mutu.
          </p>
        </div>

        {/* Search and Division Filter Bar */}
        <div className="max-w-4xl mx-auto bg-surface-canvas rounded-2xl md:rounded-full p-2.5 sm:p-3 shadow-xl border border-outline-variant/40 flex flex-col md:flex-row items-center gap-3">
          {/* Keyword Search */}
          <div className="flex-1 w-full flex items-center gap-2.5 px-3 py-2">
            <svg
              className="w-5 h-5 text-text-muted shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berdasarkan posisi atau keahlian..."
              className="w-full bg-transparent border-none outline-none font-sans text-sm sm:text-base text-on-surface placeholder:text-text-muted"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-text-muted hover:text-bracket-border text-xs font-bold"
              >
                &times;
              </button>
            )}
          </div>

          <div className="hidden md:block w-px h-8 bg-surface-container" />

          {/* Division Dropdown */}
          <div className="w-full md:w-56 px-2">
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="w-full py-2.5 px-3 bg-surface-neutral-alt hover:bg-surface-container rounded-xl md:rounded-full font-sans text-xs sm:text-sm text-on-surface font-semibold outline-none cursor-pointer border border-outline-variant/30 transition-colors"
            >
              <option value="ALL">Semua Divisi</option>
              <option value="Finance">Finance &amp; Pajak</option>
              <option value="Marketing">Marketing &amp; Sales</option>
              <option value="Operational">Operasional &amp; Maintenance</option>
              <option value="Production">Produksi &amp; Mesin</option>
              <option value="Warehouse">Warehouse &amp; Gudang</option>
            </select>
          </div>

          {/* Reset / Status pill */}
          <div className="w-full md:w-auto px-2 pb-1 md:pb-0 flex items-center justify-between md:justify-center">
            <div className="px-4 py-2 rounded-full bg-bracket-border/10 text-bracket-border font-bold text-xs whitespace-nowrap">
              {totalOpenJobs} Posisi Terbuka
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

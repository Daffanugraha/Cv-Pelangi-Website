"use client";

import React from "react";
import { FILTER_TABS } from "@/lib/data/galleryProducts";

interface PengaplikasianFiltersProps {
  activeFilter: string;
  onFilterChange: (key: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function PengaplikasianFilters({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: PengaplikasianFiltersProps) {
  return (
    <section className="relative z-10 bg-surface py-5 shadow-sm border-b border-surface-container-high transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Filter Pills Marquee (Bergerak pelan terus-menerus & pause saat hover) */}
          <div className="relative flex-1 overflow-hidden min-w-0 w-full py-1">
            {/* Fade masks */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

            <div className="category-marquee-track items-center py-1">
              {[...Array(2)].map((_, loopIdx) => (
                <div key={loopIdx} className="flex items-center gap-2.5 px-1.5 shrink-0">
                  {FILTER_TABS.map((tab) => {
                    const isActive = activeFilter === tab.key;
                    return (
                      <button
                        key={`${loopIdx}-${tab.key}`}
                        type="button"
                        onClick={() => onFilterChange(tab.key)}
                        className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer select-none ${
                          isActive
                            ? "bg-gradient-to-r from-bracket-border to-primary text-white shadow-md shadow-bracket-border/30 scale-105"
                            : "bg-surface-container text-on-surface hover:bg-divider-tint hover:text-bracket-border"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari efek finishing atau produk..."
              className="w-full pl-9 pr-4 py-2 bg-surface-container-lowest border border-surface-container-high rounded-full text-xs text-on-surface placeholder-gray-400 focus:outline-none focus:border-bracket-border transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

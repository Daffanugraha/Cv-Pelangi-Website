"use client";

import React from "react";
import { blogCategories } from "@/lib/data/articles";

interface BlogFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  totalArticles: number;
}

export default function BlogFilters({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  totalArticles,
}: BlogFiltersProps) {
  return (
    <section className="w-full bg-surface-bright py-8 border-b border-divider-tint/40">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5">
          {/* Search Input Bar */}
          <div className="w-full lg:w-[420px] relative">
            <span
              translate="no"
              className="material-symbols-outlined notranslate absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl pointer-events-none"
            >
              search
            </span>
            <input
              id="article-search"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari artikel, panduan mesin, atau teknik finishing..."
              className="w-full h-[52px] pl-12 pr-10 rounded-full bg-surface-neutral-alt text-on-surface font-body-md text-sm sm:text-base placeholder:text-text-muted focus:outline-none focus:bg-surface-canvas focus:ring-2 focus:ring-bracket-border/30 border border-transparent focus:border-bracket-border shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Bersihkan pencarian"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors cursor-pointer"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[16px]">
                  close
                </span>
              </button>
            )}
          </div>

          {/* Filter Category Tabs */}
          <div
            id="category-filters"
            className="w-full lg:w-auto flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none no-scrollbar"
          >
            {blogCategories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => onCategoryChange(cat.key)}
                  className={`filter-btn whitespace-nowrap px-5 py-2.5 rounded-full font-cta-pill text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-bracket-border text-on-primary shadow-md shadow-bracket-border/25"
                      : "bg-surface-neutral-alt text-on-surface hover:bg-surface-tint-light hover:text-bracket-border border border-divider-tint/30"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search / Filter Status Summary */}
        {(searchQuery || activeCategory !== "all") && (
          <div className="flex items-center justify-between text-xs sm:text-sm text-text-muted pt-1">
            <span>
              Menampilkan <strong>{totalArticles}</strong> artikel{" "}
              {searchQuery && (
                <>
                  untuk kata kunci &ldquo;<strong>{searchQuery}</strong>&rdquo;
                </>
              )}
              {activeCategory !== "all" && (
                <>
                  {" "}
                  dalam kategori &ldquo;
                  <strong>
                    {blogCategories.find((c) => c.key === activeCategory)?.label}
                  </strong>
                  &rdquo;
                </>
              )}
            </span>
            <button
              type="button"
              onClick={() => {
                onSearchChange("");
                onCategoryChange("all");
              }}
              className="text-bracket-border hover:underline font-semibold cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

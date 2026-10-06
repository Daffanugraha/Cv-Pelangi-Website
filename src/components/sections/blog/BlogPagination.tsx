"use client";

import React from "react";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  // Generate pagination items with ellipses (misal: 1 2 3 ... 10)
  const getPaginationItems = (): (number | string)[] => {
    // Jika total halaman sedikit (<= 7), tampilkan semua
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const items: (number | string)[] = [];

    // Selalu tampilkan halaman 1
    items.push(1);

    if (currentPage > 3) {
      items.push("...");
    }

    // Tampilkan rentang sekitar currentPage
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      items.push(i);
    }

    if (currentPage < totalPages - 2) {
      items.push("...");
    }

    // Selalu tampilkan halaman terakhir
    items.push(totalPages);

    return items;
  };

  const paginationItems = getPaginationItems();

  return (
    <div className="w-full bg-surface-bright pb-16 flex items-center justify-center gap-1.5 sm:gap-2">
      {/* Previous Page */}
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Halaman Sebelumnya"
        className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-neutral-alt text-on-surface hover:bg-surface-tint-light hover:text-bracket-border transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer border border-divider-tint/40 shadow-xs active:scale-95"
      >
        <span translate="no" className="material-symbols-outlined notranslate text-base">
          chevron_left
        </span>
      </button>

      {/* Number Buttons & Ellipses */}
      {paginationItems.map((item, idx) => {
        if (item === "...") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="w-8 h-10 flex items-center justify-center text-text-muted font-bold text-sm select-none tracking-widest"
            >
              ...
            </span>
          );
        }

        const pageNum = Number(item);
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            aria-current={isActive ? "page" : undefined}
            aria-label={`Halaman ${pageNum}`}
            className={`min-w-[40px] h-10 px-2 rounded-full flex items-center justify-center font-cta-pill text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              isActive
                ? "bg-bracket-border text-on-primary shadow-md shadow-bracket-border/25 scale-105"
                : "bg-surface-neutral-alt text-on-surface hover:bg-surface-tint-light hover:text-bracket-border border border-divider-tint/40 active:scale-95"
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Next Page */}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Halaman Berikutnya"
        className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-neutral-alt text-on-surface hover:bg-surface-tint-light hover:text-bracket-border transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer border border-divider-tint/40 shadow-xs active:scale-95"
      >
        <span translate="no" className="material-symbols-outlined notranslate text-base">
          chevron_right
        </span>
      </button>
    </div>
  );
}

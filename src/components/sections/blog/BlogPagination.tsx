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

  return (
    <div className="w-full bg-surface-bright pb-16 flex items-center justify-center gap-2">
      {/* Previous Page */}
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Halaman Sebelumnya"
        className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-neutral-alt text-on-surface hover:bg-surface-tint-light hover:text-bracket-border transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer border border-divider-tint/40 shadow-xs"
      >
        <span translate="no" className="material-symbols-outlined notranslate text-base">
          chevron_left
        </span>
      </button>

      {/* Number Buttons */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
        const isActive = pageNum === currentPage;
        return (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-cta-pill text-sm font-semibold transition-all cursor-pointer ${
              isActive
                ? "bg-bracket-border text-on-primary shadow-md shadow-bracket-border/25 scale-105"
                : "bg-surface-neutral-alt text-on-surface hover:bg-surface-tint-light hover:text-bracket-border border border-divider-tint/40"
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
        className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-neutral-alt text-on-surface hover:bg-surface-tint-light hover:text-bracket-border transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer border border-divider-tint/40 shadow-xs"
      >
        <span translate="no" className="material-symbols-outlined notranslate text-base">
          chevron_right
        </span>
      </button>
    </div>
  );
}

"use client";

import React, { useRef } from "react";
import { MOMEN_FILTERS } from "@/lib/data/galeriMomen";

interface GaleriMomenFiltersProps {
  activeFilter: string;
  onFilterChange: (filterKey: string) => void;
}

export default function GaleriMomenFilters({
  activeFilter,
  onFilterChange,
}: GaleriMomenFiltersProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -280, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 280, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full relative z-20 bg-surface-canvas border-b border-surface-container-high/80 shadow-xs py-3.5 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between gap-4">
          <div className="w-full flex-1 relative flex items-center gap-3 group/carousel">
            {/* Prev Button */}
            <button
              onClick={scrollLeft}
              className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-bracket-border hover:text-surface-canvas text-on-surface flex items-center justify-center shrink-0 border border-surface-container-high transition-all duration-200 cursor-pointer shadow-sm hover:scale-110 active:scale-90 z-10"
              type="button"
              aria-label="Previous categories"
            >
              <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                chevron_left
              </span>
            </button>

            {/* Marquee Filter Container */}
            <div
              ref={containerRef}
              className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-none relative select-none cursor-grab active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]"
            >
              <div className="flex items-center gap-3 py-1.5 w-max select-none">
                {MOMEN_FILTERS.map((tab) => {
                  const isActive = activeFilter === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => onFilterChange(tab.key)}
                      type="button"
                      className={`filter-pill shrink-0 flex-none text-center px-5 py-2.5 rounded-full font-cta-pill text-cta-pill transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer ${
                        isActive
                          ? "bg-bracket-border text-surface-canvas shadow-[0_4px_16px_rgba(246,84,86,0.35)]"
                          : "bg-surface-neutral-alt text-on-surface hover:bg-surface-tint-light hover:text-bracket-border hover:shadow-sm"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={scrollRight}
              className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-bracket-border hover:text-surface-canvas text-on-surface flex items-center justify-center shrink-0 border border-surface-container-high transition-all duration-200 cursor-pointer shadow-sm hover:scale-110 active:scale-90 z-10"
              type="button"
              aria-label="Next categories"
            >
              <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

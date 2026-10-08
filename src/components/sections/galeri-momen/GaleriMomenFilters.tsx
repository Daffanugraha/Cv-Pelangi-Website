"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { MOMEN_FILTERS } from "@/lib/data/galeriMomen";

interface GaleriMomenFiltersProps {
  activeFilter: string;
  onFilterChange: (filterKey: string) => void;
  filters?: { key: string; label: string }[];
}

export default function GaleriMomenFilters({
  activeFilter,
  onFilterChange,
  filters = MOMEN_FILTERS,
}: GaleriMomenFiltersProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);

  // 4 set identik untuk seamless looping tanpa putus
  const duplicatedSets = useMemo(() => {
    return [0, 1, 2, 3];
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let rafId: number;

    const getSetWidth = () => {
      const firstSet = track.querySelector<HTMLElement>(".filter-set");
      return firstSet ? firstSet.offsetWidth + 12 : 800;
    };

    // Inisialisasi posisi di Set ke-2
    const initTimer = setTimeout(() => {
      const setWidth = getSetWidth();
      if (container.scrollLeft < setWidth) {
        container.scrollLeft = setWidth;
      }
    }, 50);

    const checkBoundary = () => {
      const setWidth = getSetWidth();
      if (container.scrollLeft >= setWidth * 2.5) {
        container.scrollLeft -= setWidth;
      } else if (container.scrollLeft <= setWidth * 0.5) {
        container.scrollLeft += setWidth;
      }
    };

    // Continuous smooth auto-loop gliding
    const tick = () => {
      if (!isDraggingRef.current) {
        // Melambat saat di-hover tapi tetap meluncur santai
        const speed = isHoveredRef.current ? 0.12 : 0.45;
        container.scrollLeft += speed;
        checkBoundary();
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      clearTimeout(initTimer);
      cancelAnimationFrame(rafId);
    };
  }, [filters]);

  const handlePrev = () => {
    if (containerRef.current && trackRef.current) {
      const firstSet = trackRef.current.querySelector<HTMLElement>(".filter-set");
      const setWidth = firstSet ? firstSet.offsetWidth + 12 : 800;
      if (containerRef.current.scrollLeft <= setWidth * 0.5) {
        containerRef.current.scrollLeft += setWidth;
      }
      containerRef.current.scrollBy({ left: -280, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (containerRef.current && trackRef.current) {
      const firstSet = trackRef.current.querySelector<HTMLElement>(".filter-set");
      const setWidth = firstSet ? firstSet.offsetWidth + 12 : 800;
      if (containerRef.current.scrollLeft >= setWidth * 2.5) {
        containerRef.current.scrollLeft -= setWidth;
      }
      containerRef.current.scrollBy({ left: 280, behavior: "smooth" });
    }
  };

  // Mouse Drag Support
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || !containerRef.current) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX;
    startScrollLeftRef.current = containerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current || !trackRef.current) return;
    const deltaX = e.pageX - startXRef.current;
    if (Math.abs(deltaX) > 5) {
      hasDraggedRef.current = true;
    }
    const firstSet = trackRef.current.querySelector<HTMLElement>(".filter-set");
    const setWidth = firstSet ? firstSet.offsetWidth + 12 : 800;

    let nextScroll = startScrollLeftRef.current - deltaX;
    if (nextScroll >= setWidth * 2.5) {
      nextScroll -= setWidth;
      startScrollLeftRef.current -= setWidth;
    } else if (nextScroll <= setWidth * 0.5) {
      nextScroll += setWidth;
      startScrollLeftRef.current += setWidth;
    }
    containerRef.current.scrollLeft = nextScroll;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Touch Swipe Support (Mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.touches[0].pageX;
    startScrollLeftRef.current = containerRef.current.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !containerRef.current || !trackRef.current) return;
    const deltaX = e.touches[0].pageX - startXRef.current;
    if (Math.abs(deltaX) > 5) {
      hasDraggedRef.current = true;
    }
    const firstSet = trackRef.current.querySelector<HTMLElement>(".filter-set");
    const setWidth = firstSet ? firstSet.offsetWidth + 12 : 800;

    let nextScroll = startScrollLeftRef.current - deltaX;
    if (nextScroll >= setWidth * 2.5) {
      nextScroll -= setWidth;
      startScrollLeftRef.current -= setWidth;
    } else if (nextScroll <= setWidth * 0.5) {
      nextScroll += setWidth;
      startScrollLeftRef.current += setWidth;
    }
    containerRef.current.scrollLeft = nextScroll;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <section className="w-full relative z-20 bg-surface-canvas border-b border-surface-container-high/80 shadow-xs py-3.5 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between gap-4">
          <div className="w-full flex-1 relative flex items-center gap-3 group/carousel">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-bracket-border hover:text-surface-canvas text-on-surface flex items-center justify-center shrink-0 border border-surface-container-high transition-all duration-200 cursor-pointer shadow-sm hover:scale-110 active:scale-90 z-10"
              type="button"
              aria-label="Previous categories"
            >
              <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                chevron_left
              </span>
            </button>

            {/* Seamless Infinite Auto-Loop Filter Container */}
            <div
              ref={containerRef}
              onMouseEnter={() => {
                isHoveredRef.current = true;
              }}
              onMouseLeave={() => {
                isHoveredRef.current = false;
                isDraggingRef.current = false;
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-none no-scrollbar relative select-none cursor-grab active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]"
            >
              <div
                ref={trackRef}
                className="flex items-center gap-3 py-1.5 w-max select-none"
              >
                {duplicatedSets.map((setIdx) => (
                  <div
                    key={setIdx}
                    className="flex items-center gap-3 shrink-0 filter-set"
                  >
                    {filters.map((tab) => {
                      const isActive = activeFilter === tab.key;
                      return (
                        <button
                          key={`${setIdx}-${tab.key}`}
                          onClick={() => {
                            if (hasDraggedRef.current) return;
                            onFilterChange(tab.key);
                          }}
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
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
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

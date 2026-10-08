"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { MOMEN_ALBUMS, MomenAlbum, MomenPhoto } from "@/lib/data/galeriMomen";

interface GaleriMomenAlbumsProps {
  activeFilter: string;
  onSelectPhoto: (photo: MomenPhoto) => void;
  albums?: MomenAlbum[];
}

interface AlbumCarouselTrackProps {
  album: MomenAlbum;
  onSelectPhoto: (photo: MomenPhoto) => void;
}

function AlbumCarouselTrack({ album, onSelectPhoto }: AlbumCarouselTrackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);

  // Duplikasi foto agar track panjang minimal 8 item dan membentuk 2 set seamless infinite loop
  const duplicatedPhotos = useMemo(() => {
    const list = album.photos;
    if (list.length === 0) return [];
    let baseList = [...list];
    while (baseList.length < 8) {
      baseList = [...baseList, ...list];
    }
    // 2 set identik untuk looping tanpa putus
    return [...baseList, ...baseList];
  }, [album.photos]);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let rafId: number;
    let currentScrollPos = container.scrollLeft;

    const getHalfWidth = () => {
      return track.scrollWidth / 2 || 1000;
    };

    // Auto-scroll loop tenang & pas (tetap jalan perlahan saat hover agar tidak macet)
    const tick = () => {
      if (!isDraggingRef.current) {
        const half = getHalfWidth();
        const speed = isHoveredRef.current ? 0.12 : 0.4;
        currentScrollPos += speed;
        if (currentScrollPos >= half) {
          currentScrollPos -= half;
        }
        container.scrollLeft = currentScrollPos;
      } else {
        currentScrollPos = container.scrollLeft;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [duplicatedPhotos]);

  const handlePrev = () => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    const half = track.scrollWidth / 2 || 1000;

    if (container.scrollLeft <= 380) {
      container.scrollLeft += half;
    }
    container.scrollBy({ left: -380, behavior: "smooth" });
  };

  const handleNext = () => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    const half = track.scrollWidth / 2 || 1000;

    if (container.scrollLeft >= half - 380) {
      container.scrollLeft -= half;
    }
    container.scrollBy({ left: 380, behavior: "smooth" });
  };

  // Mouse Drag Events
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX;
    startScrollLeftRef.current = containerRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current || !trackRef.current) return;
    const deltaX = e.pageX - startXRef.current;
    if (Math.abs(deltaX) > 6) {
      hasDraggedRef.current = true;
    }
    const half = trackRef.current.scrollWidth / 2 || 1000;
    let nextScroll = startScrollLeftRef.current - deltaX;
    if (nextScroll >= half) {
      nextScroll -= half;
      startScrollLeftRef.current -= half;
    } else if (nextScroll <= 0) {
      nextScroll += half;
      startScrollLeftRef.current += half;
    }
    containerRef.current.scrollLeft = nextScroll;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Touch Swipe Events (Mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.touches[0].pageX;
    startScrollLeftRef.current = containerRef.current?.scrollLeft || 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !containerRef.current || !trackRef.current) return;
    const deltaX = e.touches[0].pageX - startXRef.current;
    if (Math.abs(deltaX) > 6) {
      hasDraggedRef.current = true;
    }
    const half = trackRef.current.scrollWidth / 2 || 1000;
    let nextScroll = startScrollLeftRef.current - deltaX;
    if (nextScroll >= half) {
      nextScroll -= half;
      startScrollLeftRef.current -= half;
    } else if (nextScroll <= 0) {
      nextScroll += half;
      startScrollLeftRef.current += half;
    }
    containerRef.current.scrollLeft = nextScroll;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const isHut = album.category === "hut79";
  const isMomen = album.category === "momenpertama";

  return (
    <section
      key={album.category}
      data-album-category={album.category}
      className={`w-full py-12 album-container relative border-b border-bracket-border/15 ${
        isHut
          ? "bg-gradient-to-b from-[#FFF0F1] via-[#FFF8F8] to-[#FFF1F2]"
          : isMomen
          ? "bg-gradient-to-b from-[#FFF9F5] via-surface to-[#FFF5ED]"
          : "bg-gradient-to-b from-[#FFF5F5] via-surface to-[#FFF8F8]"
      }`}
    >
      {/* Album Header & Prev/Next Carousel Navigation */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold">
            {album.title}
          </h2>
          <p className="font-body-md text-text-muted mt-1 max-w-3xl leading-relaxed">
            {album.desc}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          {/* Tombol Navigasi Manual Carousel */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Foto Sebelumnya"
              className="w-8 h-8 rounded-full bg-white hover:bg-bracket-border hover:text-white text-on-surface border border-surface-container-high flex items-center justify-center transition shadow-xs cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-base">chevron_left</span>
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Foto Selanjutnya"
              className="w-8 h-8 rounded-full bg-white hover:bg-bracket-border hover:text-white text-on-surface border border-surface-container-high flex items-center justify-center transition shadow-xs cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-base">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1x4 Infinite Loop Draggable Horizontal Track */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative w-full">
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
          className="relative w-full overflow-x-auto overflow-y-hidden scrollbar-none no-scrollbar [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)] select-none cursor-grab active:cursor-grabbing"
        >
          <div
            ref={trackRef}
            className="flex items-stretch gap-6 py-3 w-max"
            style={{ willChange: "transform" }}
          >
            {duplicatedPhotos.map((photo, pIdx) => (
              <div
                key={pIdx}
                onClick={() => {
                  if (hasDraggedRef.current) return;
                  onSelectPhoto(photo);
                }}
                className="w-[300px] sm:w-[340px] lg:w-[380px] flex-none rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] bg-surface-container-lowest border border-surface-container-high flex flex-col group select-none"
              >
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-black/5">
                  <img
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                    alt={photo.alt}
                    src={photo.src}
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="w-10 h-10 rounded-full bg-surface-canvas text-bracket-border flex items-center justify-center shadow-lg">
                      <span translate="no" className="material-symbols-outlined notranslate text-[20px]">
                        zoom_in
                      </span>
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-surface-container-lowest">
                  <div>
                    <h3 className="font-headline-sm text-sm sm:text-base font-bold text-on-surface leading-snug group-hover:text-bracket-border transition-colors">
                      {photo.cardTitle}
                    </h3>
                    <p className="font-body-sm text-xs text-text-muted mt-1.5 line-clamp-2 leading-relaxed">
                      {photo.cardDesc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function GaleriMomenAlbums({
  activeFilter,
  onSelectPhoto,
  albums = MOMEN_ALBUMS,
}: GaleriMomenAlbumsProps) {
  const visibleAlbums =
    activeFilter === "all"
      ? albums
      : albums.filter((a) => a.category === activeFilter);

  return (
    <div className="w-full space-y-0">
      {visibleAlbums.map((album) => (
        <AlbumCarouselTrack
          key={album.category}
          album={album}
          onSelectPhoto={onSelectPhoto}
        />
      ))}
    </div>
  );
}

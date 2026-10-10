"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { MaterialCategory } from "@/lib/data/rawMaterials";

interface BahanBakuCatalogProps {
  categories: MaterialCategory[];
  onOpenPricelist: (categoryId: string) => void;
  onRequestSample?: (categoryId?: string) => void;
}

const categoryIcons: Record<string, string> = {
  opp: "filter_frames",
  foil: "auto_awesome",
  "foil-stamping": "local_fire_department",
  lem: "water_drop",
  spotuv: "brush",
};

export default function BahanBakuCatalog({
  categories,
  onOpenPricelist,
}: BahanBakuCatalogProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const singleSetWidthRef = useRef(0);

  // 3 set kartu untuk infinite seamless loop nyata:
  // [Set 0 (buffer kiri), Set 1 (tengah - posisi awal), Set 2 (buffer kanan)]
  // Pengguna selalu berada di Set 1 sehingga geser ke kiri menyambung kartu 05, dan geser ke kanan menyambung kartu 01 tanpa celah putih!
  const loopSets = [0, 1, 2];

  // Hitung lebar 1 set kartu secara presisi
  const updateSetWidth = useCallback(() => {
    if (setRef.current) {
      // offsetWidth + 24px (gap-6)
      const width = setRef.current.offsetWidth + 24;
      singleSetWidthRef.current = width;
      return width;
    }
    return 0;
  }, []);

  // Posisikan scroll awal tepat di awal Set 1 (kartu 01)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const timer = setTimeout(() => {
      const setWidth = updateSetWidth();
      if (setWidth > 0) {
        container.scrollLeft = setWidth;
      }
    }, 60);

    const handleResize = () => {
      updateSetWidth();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateSetWidth]);

  // Infinite Wrap Engine: Memastikan scroll selalu bersirkulasi tanpa pernah ada celah putih
  const checkSeamlessBoundary = useCallback(() => {
    const container = containerRef.current;
    const setWidth = singleSetWidthRef.current;
    if (!container || setWidth <= 0) return;

    // Jika digeser ke kanan melewati Set 1, kembalikan posisi ke Set 1 secara instan tanpa kedip
    if (container.scrollLeft >= setWidth * 2) {
      container.scrollLeft -= setWidth;
      if (isDraggingRef.current) {
        startScrollLeftRef.current -= setWidth;
      }
    }
    // Jika digeser ke kiri mendekati batas awal, kembalikan posisi ke Set 1
    else if (container.scrollLeft <= 10) {
      container.scrollLeft += setWidth;
      if (isDraggingRef.current) {
        startScrollLeftRef.current += setWidth;
      }
    }
  }, []);

  // Continuous auto-scroll halus saat tidak disentuh / tidak dihover
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;

    const tick = () => {
      if (!isHovered && !isDraggingRef.current) {
        container.scrollLeft += 0.55;
        checkSeamlessBoundary();
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isHovered, checkSeamlessBoundary]);

  // Scroll listener untuk trackpad / shift + mouse wheel
  const handleScroll = () => {
    checkSeamlessBoundary();
  };

  // Mouse Drag Support (Desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || !containerRef.current) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX;
    startScrollLeftRef.current = containerRef.current.scrollLeft;
    setIsHovered(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !containerRef.current) return;
      const deltaX = e.pageX - startXRef.current;
      if (Math.abs(deltaX) > 4) {
        hasDraggedRef.current = true;
      }
      containerRef.current.scrollLeft = startScrollLeftRef.current - deltaX;
      checkSeamlessBoundary();
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [checkSeamlessBoundary]);

  // Touch Swipe Support (Mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.touches[0].pageX;
    startScrollLeftRef.current = containerRef.current.scrollLeft;
    setIsHovered(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const deltaX = e.touches[0].pageX - startXRef.current;
    if (Math.abs(deltaX) > 4) {
      hasDraggedRef.current = true;
    }
    containerRef.current.scrollLeft = startScrollLeftRef.current - deltaX;
    checkSeamlessBoundary();
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    setIsHovered(false);
  };

  // Navigasi Geser Kiri / Kanan
  const handlePrev = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: -420, behavior: "smooth" });
  };

  const handleNext = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: 420, behavior: "smooth" });
  };

  // Filter Quick Jump
  const handleFilterClick = (catId: string) => {
    setActiveFilter(catId);
    if (!containerRef.current) return;

    if (catId === "all") {
      const setWidth = singleSetWidthRef.current;
      if (setWidth > 0) {
        containerRef.current.scrollTo({ left: setWidth, behavior: "smooth" });
      }
    } else {
      const card = document.getElementById(`product-card-1-${catId}`);
      if (card && containerRef.current) {
        const containerLeft = containerRef.current.getBoundingClientRect().left;
        const cardLeft = card.getBoundingClientRect().left;
        const targetScroll = containerRef.current.scrollLeft + (cardLeft - containerLeft) - 24;
        containerRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });

        card.classList.add("ring-4", "ring-secondary-container", "scale-[1.02]");
        setTimeout(() => {
          card.classList.remove("ring-4", "ring-secondary-container", "scale-[1.02]");
        }, 2200);
      }
    }
  };

  const renderCard = (cat: MaterialCategory, setIdx: number) => {
    const waText = encodeURIComponent(
      `Halo Tim Marketing CV Pelangi UV, saya ingin konsultasi harga dan pemesanan grosir untuk Bahan Baku: *${cat.title}*. Mohon info ketersediaan stok & penawaran terbaik.`
    );
    const waUrl = `https://wa.me/6282231019363?text=${waText}`;

    return (
      <div
        key={`${cat.id}-set-${setIdx}`}
        id={`product-card-${setIdx}-${cat.id}`}
        data-category-key={cat.id}
        className="shrink-0 w-[340px] sm:w-[380px] lg:w-[410px] rounded-3xl bg-surface-container-lowest border-2 border-divider-tint/60 text-on-surface p-7 sm:p-8 flex flex-col justify-between shadow-[0_12px_40px_-10px_rgba(246,84,86,0.12)] transition-transform duration-300 hover:-translate-y-2 group relative overflow-hidden sheen-effect hover:shadow-2xl select-none"
        style={{
          transition: "transform 0.15s ease-out, box-shadow 0.2s ease-out",
        }}
      >
        {/* Decorative Top-Right Blob */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-surface-tint-light rounded-bl-full pointer-events-none -z-0 opacity-80 group-hover:scale-110 transition-transform" />

        <div className="relative z-10">
          {/* Header with Number and Category Icon */}
          <div className="flex items-start justify-between mb-5 sm:mb-6">
            <span className="font-stat-number text-stat-number text-secondary-container leading-none font-extrabold stat-rainbow-hover">
              {cat.num}
            </span>
            <span className="w-12 h-12 rounded-2xl bg-surface-tint-light flex items-center justify-center text-secondary-container shadow-sm">
              <span translate="no" className="material-symbols-outlined notranslate text-[24px]">
                {categoryIcons[cat.id] || "inventory_2"}
              </span>
            </span>
          </div>

          {/* Process / Product Photo */}
          <div className="service-process-photo relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-surface-container-high/40 shadow-sm border border-divider-tint/50 group-hover:border-secondary-container/40 transition-colors">
            <img
              src={cat.img}
              alt={cat.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 pointer-events-none"
              loading="lazy"
            />
          </div>

          {/* Title */}
          <h3
            onClick={(e) => {
              if (hasDraggedRef.current) return;
              onOpenPricelist(cat.id);
            }}
            className="font-headline-lg text-xl sm:text-2xl lg:text-[25px] text-navbar-black tracking-tight mb-2.5 font-extrabold group-hover:text-primary transition-colors cursor-pointer"
          >
            {cat.title}
          </h3>

          {/* Description */}
          <p className="font-body-md text-xs sm:text-sm text-text-body leading-relaxed line-clamp-3">
            {cat.shortDesc}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 sm:pt-8 relative z-10 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={(e) => {
              if (hasDraggedRef.current) return;
              onOpenPricelist(cat.id);
            }}
            className="w-full inline-flex items-center justify-between px-5 py-3 sm:py-3.5 rounded-full bg-secondary-container hover:bg-primary text-on-primary font-cta-pill text-xs sm:text-sm font-semibold transition-all duration-200 shadow-[0_4px_14px_rgba(246,84,86,0.39)] cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                receipt_long
              </span>
              <span>Lihat Pricelist &amp; Spesifikasi</span>
            </span>
            <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
              arrow_forward
            </span>
          </button>

          <a
            className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-divider-tint/60 hover:bg-surface-tint-light text-text-body hover:text-primary font-label-nav text-xs sm:text-sm font-semibold transition-colors"
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (hasDraggedRef.current) e.preventDefault();
            }}
          >
            <span translate="no" className="material-symbols-outlined notranslate text-[16px] text-action-whatsapp">
              chat
            </span>
            <span>Konsultasi Cepat via WhatsApp</span>
          </a>
        </div>
      </div>
    );
  };

  return (
    <section
      id="katalog-material"
      className="relative w-full bg-surface-bright overflow-hidden py-16 lg:py-20"
    >
      {/* Ambient Blurred Blobs */}
      <div className="absolute -top-32 -right-32 w-[680px] h-[680px] bg-divider-tint/50 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/2 -left-48 w-[720px] h-[720px] bg-surface-tint-light/80 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col mb-10">
        {/* Section Header Matching Layanan */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col items-start gap-4">
            <span className="px-5 py-2 rounded-full bg-secondary-container text-on-primary font-cta-pill text-cta-pill shadow-[0_4px_16px_rgba(246,84,86,0.25)]">
              Katalog Bahan Baku Pasca Cetak
            </span>
            <div>
              <h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-extrabold sm:text-4xl lg:text-[42px] leading-tight">
                Bahan Baku Finishing Standar Industri
              </h2>
              <p className="font-body-md text-body-md text-text-muted mt-1">
                Material esensial percetakan modern dengan daya rekat superior, kilau optimal, dan toleransi putaran mesin berkecepatan tinggi.
              </p>
            </div>

            {/* Filter / Quick Jump Pills */}
            <div className="flex flex-wrap items-center gap-2.5 mt-2 pt-1">
              <span className="font-label-meta text-xs sm:text-sm font-semibold text-text-muted flex items-center gap-1.5 mr-1">
                <span translate="no" className="material-symbols-outlined notranslate text-[18px] text-accent-gold">
                  hotel_class
                </span>
                Pilihan Kategori:
              </span>
              <button
                type="button"
                onClick={() => handleFilterClick("all")}
                className={`px-4 py-2 rounded-full font-label-nav text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeFilter === "all"
                    ? "bg-secondary-container text-on-primary shadow-sm"
                    : "bg-white text-neutral-800 border border-neutral-300 hover:border-secondary-container hover:text-primary shadow-xs"
                }`}
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[17px]">
                  star
                </span>
                Semua Bahan
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleFilterClick(cat.id)}
                  className={`px-4 py-2 rounded-full font-label-nav text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    activeFilter === cat.id
                      ? "bg-secondary-container text-on-primary shadow-sm"
                      : "bg-white text-neutral-800 border border-neutral-300 hover:border-secondary-container hover:text-primary shadow-xs"
                  }`}
                >
                  <span
                    translate="no"
                    className={`material-symbols-outlined notranslate text-[17px] ${
                      activeFilter === cat.id ? "text-on-primary" : "text-secondary-container"
                    }`}
                  >
                    {categoryIcons[cat.id] || "inventory_2"}
                  </span>
                  {cat.id === "opp"
                    ? "Film OPP / BOPP"
                    : cat.id === "foil"
                    ? "Foil"
                    : cat.id === "foil-stamping"
                    ? "Foil Stamping"
                    : cat.id === "lem"
                    ? "Lem Laminasi"
                    : "Spot UV Varnish"}
                </button>
              ))}
            </div>
          </div>

          {/* Tombol Navigasi Prev & Next + Panduan Geser */}
          <div className="flex items-center gap-3 self-start lg:self-end">
            <span className="text-xs text-text-muted hidden sm:inline-flex items-center gap-1 font-medium mr-1">
              <span className="material-symbols-outlined text-[16px]">swipe</span>
              <span>Bisa digeser bebas</span>
            </span>

            <button
              type="button"
              onClick={handlePrev}
              aria-label="Geser ke kiri"
              className="w-10 h-10 rounded-full bg-white border border-neutral-300 hover:bg-secondary-container hover:text-white text-on-surface flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
            >
              <span translate="no" className="material-symbols-outlined notranslate text-[20px]">
                chevron_left
              </span>
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Geser ke kanan"
              className="w-10 h-10 rounded-full bg-white border border-neutral-300 hover:bg-secondary-container hover:text-white text-on-surface flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
            >
              <span translate="no" className="material-symbols-outlined notranslate text-[20px]">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Draggable Seamless Infinite Carousel */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          if (!isDraggingRef.current) setIsHovered(false);
        }}
        className="relative w-full overflow-x-auto no-scrollbar py-4 cursor-grab active:cursor-grabbing select-none"
      >
        {/* Edge Gradient Vignettes */}
        <div className="pointer-events-none fixed left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-surface-bright to-transparent z-10" />
        <div className="pointer-events-none fixed right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-surface-bright to-transparent z-10" />

        {/* 3 Continuous Linked Sets: [Set 0, Set 1, Set 2] */}
        <div className="flex gap-6 w-max px-6">
          {loopSets.map((setIdx) => (
            <div
              key={setIdx}
              ref={setIdx === 0 ? setRef : undefined}
              className="flex gap-6 shrink-0"
            >
              {categories.map((cat) => renderCard(cat, setIdx))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

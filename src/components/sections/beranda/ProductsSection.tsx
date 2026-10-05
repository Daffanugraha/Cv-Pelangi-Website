"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { productsJasa, productsBahan } from "@/lib/data";

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState<"jasa" | "bahan">("jasa");
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentPosRef = useRef(0);

  const currentProducts = activeTab === "jasa" ? productsJasa : productsBahan;

  // Infinite Draggable & Seamless Auto-Scroll Engine (Prevents any blank/white void)
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let isDragging = false;
    let isSlowed = false;
    let startX = 0;
    let startScrollLeft = 0;
    let hasDragged = false;
    let currentPos = container.scrollLeft;
    let rafId: number;

    const getLoopWidth = () => {
      const firstChild = track.firstElementChild as HTMLElement | null;
      return firstChild ? firstChild.offsetWidth + 24 : container.scrollWidth / 3;
    };

    const activeContainer = container;

    function tick() {
      if (!isDragging && activeContainer) {
        const speed = isSlowed ? 0.15 : 0.65;
        currentPos += speed;
        const loopWidth = getLoopWidth();
        if (loopWidth > 0) {
          if (currentPos >= loopWidth) {
            currentPos -= loopWidth;
          } else if (currentPos <= 0) {
            currentPos += loopWidth;
          }
          activeContainer.scrollLeft = Math.round(currentPos);
          currentPosRef.current = currentPos;
        }
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    const onMouseEnter = () => {
      isSlowed = true;
    };
    const onMouseLeave = () => {
      isSlowed = false;
    };
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    const onScroll = () => {
      if (!isDragging && Math.abs(container.scrollLeft - currentPos) > 6) {
        currentPos = container.scrollLeft;
        const loopWidth = getLoopWidth();
        if (loopWidth > 0) {
          if (currentPos >= loopWidth) {
            currentPos -= loopWidth;
            container.scrollLeft = Math.round(currentPos);
          } else if (currentPos <= 0) {
            currentPos += loopWidth;
            container.scrollLeft = Math.round(currentPos);
          }
        }
        currentPosRef.current = currentPos;
      }
    };
    container.addEventListener("scroll", onScroll, { passive: true });

    // Mouse Drag (Desktop)
    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      isDragging = true;
      hasDragged = false;
      startX = e.pageX;
      startScrollLeft = container.scrollLeft;
      container.classList.add("cursor-grabbing");
      container.classList.remove("cursor-grab");
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.pageX - startX;
      if (Math.abs(deltaX) > 4) {
        hasDragged = true;
      }
      currentPos = startScrollLeft - deltaX;
      const loopWidth = getLoopWidth();
      if (loopWidth > 0) {
        if (currentPos >= loopWidth) {
          currentPos -= loopWidth;
          startScrollLeft -= loopWidth;
        } else if (currentPos <= 0) {
          currentPos += loopWidth;
          startScrollLeft += loopWidth;
        }
      }
      container.scrollLeft = Math.round(currentPos);
      currentPosRef.current = currentPos;
    };

    const onMouseUp = () => {
      if (isDragging) {
        isDragging = false;
        currentPos = container.scrollLeft;
        container.classList.remove("cursor-grabbing");
        container.classList.add("cursor-grab");
      }
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Touch Support (Mobile)
    const onTouchStart = (e: TouchEvent) => {
      isDragging = true;
      hasDragged = false;
      startX = e.touches[0].pageX;
      startScrollLeft = container.scrollLeft;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const deltaX = e.touches[0].pageX - startX;
      if (Math.abs(deltaX) > 4) hasDragged = true;
      currentPos = startScrollLeft - deltaX;
      const loopWidth = getLoopWidth();
      if (loopWidth > 0) {
        if (currentPos >= loopWidth) {
          currentPos -= loopWidth;
          startScrollLeft -= loopWidth;
        } else if (currentPos <= 0) {
          currentPos += loopWidth;
          startScrollLeft += loopWidth;
        }
      }
      container.scrollLeft = Math.round(currentPos);
      currentPosRef.current = currentPos;
    };

    const onTouchEnd = () => {
      isDragging = false;
      currentPos = container.scrollLeft;
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });

    const onClickCapture = (e: MouseEvent) => {
      if (hasDragged) {
        e.stopPropagation();
        e.preventDefault();
        hasDragged = false;
      }
    };
    container.addEventListener("click", onClickCapture, true);

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("scroll", onScroll);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("click", onClickCapture, true);
    };
  }, [activeTab]);

  const handlePrev = () => {
    if (!containerRef.current || !trackRef.current) return;
    const container = containerRef.current;
    const firstChild = trackRef.current.firstElementChild as HTMLElement | null;
    const loopWidth = firstChild ? firstChild.offsetWidth + 24 : container.scrollWidth / 3;
    let nextPos = container.scrollLeft - 360;
    if (nextPos <= 0) nextPos += loopWidth;
    container.scrollTo({ left: nextPos, behavior: "smooth" });
    currentPosRef.current = nextPos;
  };

  const handleNext = () => {
    if (!containerRef.current || !trackRef.current) return;
    const container = containerRef.current;
    const firstChild = trackRef.current.firstElementChild as HTMLElement | null;
    const loopWidth = firstChild ? firstChild.offsetWidth + 24 : container.scrollWidth / 3;
    let nextPos = container.scrollLeft + 360;
    if (nextPos >= loopWidth) nextPos -= loopWidth;
    container.scrollTo({ left: nextPos, behavior: "smooth" });
    currentPosRef.current = nextPos;
  };

  return (
    <section
      className="w-full bg-surface-neutral-alt py-space-3xl relative overflow-hidden"
      id="produk"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="absolute -left-20 top-1/3 w-[500px] h-[500px] rounded-full bg-divider-tint/40 filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-gutter relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
          <div>
            <span className="font-label-meta text-label-meta uppercase tracking-widest text-bracket-border font-bold">
              {activeTab === "jasa" ? "Portofolio Layanan" : "Katalog Bahan Baku"}
            </span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold mt-1">
              Produk Kami
            </h2>
            <p className="font-body-md text-body-md text-text-muted mt-1">
              {activeTab === "jasa"
                ? "Ahlinya jasa finishing cetak dan pasca-cetak berkecepatan tinggi"
                : "Pusat grosir distributor resmi bahan baku finishing langsung pabrik"}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div
              className="flex items-center gap-2 p-1.5 rounded-full bg-surface-canvas border border-surface-container/80 shadow-sm"
              id="productCategoryTabs"
            >
              <button
                type="button"
                onClick={() => {
                  setActiveTab("jasa");
                  if (containerRef.current) containerRef.current.scrollLeft = 0;
                  currentPosRef.current = 0;
                }}
                className={`px-space-md py-space-xs rounded-full font-cta-pill text-cta-pill transition-all duration-300 cursor-pointer ${
                  activeTab === "jasa"
                    ? "bg-bracket-border text-on-primary shadow-md font-semibold"
                    : "text-text-body hover:text-bracket-border font-medium"
                }`}
              >
                Layanan Jasa Finishing (13)
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("bahan");
                  if (containerRef.current) containerRef.current.scrollLeft = 0;
                  currentPosRef.current = 0;
                }}
                className={`px-space-md py-space-xs rounded-full font-cta-pill text-cta-pill transition-all duration-300 cursor-pointer ${
                  activeTab === "bahan"
                    ? "bg-bracket-border text-on-primary shadow-md font-semibold"
                    : "text-text-body hover:text-bracket-border font-medium"
                }`}
              >
                Bahan Baku Finishing (4)
              </button>
            </div>

            {/* Prev & Next Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Geser ke kiri"
                className="w-10 h-10 rounded-full bg-surface-canvas border border-surface-container hover:bg-bracket-border hover:text-white text-on-surface flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[20px]">
                  chevron_left
                </span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Geser ke kanan"
                className="w-10 h-10 rounded-full bg-surface-canvas border border-surface-container hover:bg-bracket-border hover:text-white text-on-surface flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[20px]">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Area: Draggable, Touch-Ready, and 100% Infinite Without Blank Gap */}
        <div
          ref={containerRef}
          className="relative overflow-x-auto pb-space-lg -mx-gutter px-gutter no-scrollbar cursor-grab active:cursor-grabbing select-none"
        >
          <div ref={trackRef} className="product-loop-track flex gap-space-lg">
            {/* Repeated 3 times for seamless buffer on both sides */}
            {[...Array(3)].map((_, loopIdx) => (
              <div key={loopIdx} className="flex gap-space-lg shrink-0">
                {currentProducts.map((p, pIdx) => (
                  <div
                    key={pIdx}
                    className="w-[320px] sm:w-[360px] bg-surface-canvas rounded-3xl p-space-lg flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 shrink-0 hover:scale-[1.02] border border-surface-container/80"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-space-md">
                        <span className="font-stat-number-mobile text-stat-number-mobile text-bracket-border/30 font-black">
                          {p.num}
                        </span>
                      </div>
                      <div className="rounded-2xl overflow-hidden aspect-[16/10] mb-space-md bg-surface-container border border-surface-container">
                        <img
                          className="w-full h-full object-cover"
                          alt={p.title}
                          src={p.img}
                        />
                      </div>
                      <h3
                        translate="no"
                        className="notranslate font-headline-md text-headline-md text-on-surface font-bold mb-1"
                      >
                        {p.title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-text-body leading-relaxed line-clamp-3">
                        {p.desc}
                      </p>
                    </div>

                    <div className="pt-space-md mt-space-md border-t border-surface-container flex items-center justify-between">
                      <span className="font-label-meta text-label-meta text-text-muted font-medium">
                        {p.capacity}
                      </span>
                      <Link
                        className="inline-flex items-center gap-1 text-bracket-border hover:text-primary font-cta-pill text-cta-pill font-semibold transition-colors"
                        href={p.href || (activeTab === "jasa" ? "/layanan" : "/produk/bahan-baku")}
                      >
                        <span>Selengkapnya</span>
                        <span translate="no" className="material-symbols-outlined notranslate text-[16px]">
                          arrow_forward
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}

                {/* Banner Callout Card */}
                {activeTab === "jasa" ? (
                  <div className="w-[320px] sm:w-[360px] bg-gradient-to-br from-bracket-border via-primary to-navbar-black rounded-3xl p-space-lg flex flex-col justify-between shadow-2xl transition-transform duration-300 shrink-0 text-white hover:scale-[1.02] border-2 border-bracket-border/40">
                    <div className="space-y-space-md">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white font-label-meta text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse"></span>{" "}
                        13+ Macam Layanan
                      </div>
                      <h3 className="font-headline-lg text-headline-lg font-extrabold leading-tight text-white">
                        Eksplorasi Seluruh Layanan Finishing
                      </h3>
                      <p className="font-body-sm text-body-sm text-white/90 leading-relaxed">
                        Temukan spesifikasi detail, jenis mesin pendukung, kapasitas
                        harian, dan panduan persiapan file plano untuk setiap varian.
                      </p>
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center gap-2 text-[12px] font-medium text-white/90">
                          <span translate="no" className="material-symbols-outlined notranslate text-[16px] text-accent-gold">
                            check_circle
                          </span>{" "}
                          Spot UV, Varnish, &amp; Drip Off
                        </div>
                        <div className="flex items-center gap-2 text-[12px] font-medium text-white/90">
                          <span translate="no" className="material-symbols-outlined notranslate text-[16px] text-accent-gold">
                            check_circle
                          </span>{" "}
                          Hot Foil, Emboss, &amp; Deboss
                        </div>
                        <div className="flex items-center gap-2 text-[12px] font-medium text-white/90">
                          <span translate="no" className="material-symbols-outlined notranslate text-[16px] text-accent-gold">
                            check_circle
                          </span>{" "}
                          Pond, Window Patch, &amp; Lem Lipat
                        </div>
                      </div>
                    </div>

                    <div className="pt-space-md mt-space-md border-t border-white/20">
                      <Link
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-navbar-black hover:bg-surface-neutral-alt font-cta-pill text-cta-pill transition-all duration-200 shadow-xl hover:scale-105 active:scale-95 group"
                        href="/layanan"
                      >
                        <span className="font-bold">Lihat Selengkapnya</span>
                        <span translate="no" className="material-symbols-outlined notranslate text-[18px] transition-transform duration-200 group-hover:translate-x-1 text-bracket-border">
                          arrow_forward
                        </span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="w-[320px] sm:w-[360px] bg-gradient-to-br from-[#1c1b1b] via-[#2a1617] to-bracket-border rounded-3xl p-space-lg flex flex-col justify-between shadow-2xl transition-transform duration-300 shrink-0 text-white hover:scale-[1.02] border-2 border-bracket-border/40">
                    <div className="space-y-space-md">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bracket-border/20 text-bracket-border font-label-meta text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm border border-bracket-border/40">
                        <span className="w-2 h-2 rounded-full bg-bracket-border animate-pulse"></span>{" "}
                        Suplai Grosir Pabrik
                      </div>
                      <h3 className="font-headline-lg text-headline-lg font-extrabold leading-tight text-white">
                        Eksplorasi Seluruh Bahan Baku
                      </h3>
                      <p className="font-body-sm text-body-sm text-surface-dim leading-relaxed">
                        Dapatkan pricelist grosir terlengkap, spesifikasi teknis TDS,
                        serta opsi custom slitting ukuran roll untuk efisiensi workshop.
                      </p>
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center gap-2 text-[12px] font-medium text-white/90">
                          <span translate="no" className="material-symbols-outlined notranslate text-[16px] text-bracket-border">
                            verified
                          </span>{" "}
                          Direct Importer &amp; Harga Pabrik
                        </div>
                        <div className="flex items-center gap-2 text-[12px] font-medium text-white/90">
                          <span translate="no" className="material-symbols-outlined notranslate text-[16px] text-bracket-border">
                            verified
                          </span>{" "}
                          Layanan Potong / Slitting Akurat
                        </div>
                        <div className="flex items-center gap-2 text-[12px] font-medium text-white/90">
                          <span translate="no" className="material-symbols-outlined notranslate text-[16px] text-bracket-border">
                            verified
                          </span>{" "}
                          Pengiriman Cepat Se-Indonesia
                        </div>
                      </div>
                    </div>

                    <div className="pt-space-md mt-space-md border-t border-white/20">
                      <Link
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-bracket-border hover:bg-primary text-white font-cta-pill text-cta-pill transition-all duration-200 shadow-xl hover:scale-105 active:scale-95 group"
                        href="/produk/bahan-baku"
                      >
                        <span className="font-bold">Lihat Selengkapnya</span>
                        <span translate="no" className="material-symbols-outlined notranslate text-[18px] transition-transform duration-200 group-hover:translate-x-1">
                          arrow_forward
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Category Indicators */}
        <div className="flex items-center justify-center gap-2 mt-space-md">
          <span className="w-8 h-2.5 rounded-full bg-bracket-border transition-all"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-outline-variant hover:bg-bracket-border cursor-pointer"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-outline-variant hover:bg-bracket-border cursor-pointer"></span>
        </div>
      </div>
    </section>
  );
}

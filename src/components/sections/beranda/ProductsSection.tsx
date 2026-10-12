"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { productsJasa, productsBahan, ProductItem } from "@/lib/data";

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState<"jasa" | "bahan">("jasa");
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentPosRef = useRef(0);

  const currentProducts: ProductItem[] = activeTab === "jasa" ? productsJasa : productsBahan;

  // Infinite Draggable & Seamless Auto-Scroll Engine
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

    const initialWidth = getLoopWidth();
    if (initialWidth > 0 && container.scrollLeft === 0) {
      container.scrollLeft = initialWidth;
      currentPos = initialWidth;
    }

    const activeContainer = container;

    function tick() {
      if (!isDragging && activeContainer) {
        const speed = isSlowed ? 0.15 : 0.65;
        currentPos += speed;
        const loopWidth = getLoopWidth();
        if (loopWidth > 0) {
          if (currentPos >= loopWidth * 2) {
            currentPos -= loopWidth;
          } else if (currentPos <= 10) {
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
        if (currentPos >= loopWidth * 2) {
          currentPos -= loopWidth;
          startScrollLeft -= loopWidth;
        } else if (currentPos <= 10) {
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
        if (currentPos >= loopWidth * 2) {
          currentPos -= loopWidth;
          startScrollLeft -= loopWidth;
        } else if (currentPos <= 10) {
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
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: -390, behavior: "smooth" });
  };

  const handleNext = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: 390, behavior: "smooth" });
  };

  return (
    <section
      className="w-full bg-surface-neutral-alt py-16 lg:py-24 relative overflow-hidden"
      id="produk"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="absolute -left-20 top-1/3 w-[500px] h-[500px] rounded-full bg-divider-tint/40 filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="px-4 py-1.5 rounded-full bg-secondary-container/10 text-secondary-container font-label-meta text-xs uppercase tracking-widest font-bold">
              {activeTab === "jasa" ? "Portofolio Layanan Unggulan" : "Katalog Bahan Baku"}
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-navbar-black font-extrabold mt-3 tracking-tight">
              Produk &amp; Layanan Finishing
            </h2>
            <p className="font-body-md text-text-muted text-sm sm:text-base mt-1.5 max-w-2xl leading-relaxed">
              {activeTab === "jasa"
                ? "Solusi finishing pasca-cetak berpresisi tinggi dengan kapasitas industri langsung dari Bizpark Sidoarjo."
                : "Pusat grosir distributor resmi bahan baku finishing impor langsung dari pabrik."}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div
              className="flex items-center gap-2 p-1.5 rounded-full bg-surface-canvas border border-surface-container/80 shadow-xs"
              id="productCategoryTabs"
            >
              <button
                type="button"
                onClick={() => {
                  setActiveTab("jasa");
                  if (containerRef.current) containerRef.current.scrollLeft = 0;
                  currentPosRef.current = 0;
                }}
                className={`px-5 py-2 rounded-full font-cta-pill text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  activeTab === "jasa"
                    ? "bg-secondary-container text-on-primary shadow-sm font-semibold"
                    : "text-text-body hover:text-secondary-container font-medium"
                }`}
              >
                Layanan Finishing (5)
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("bahan");
                  if (containerRef.current) containerRef.current.scrollLeft = 0;
                  currentPosRef.current = 0;
                }}
                className={`px-5 py-2 rounded-full font-cta-pill text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  activeTab === "bahan"
                    ? "bg-secondary-container text-on-primary shadow-sm font-semibold"
                    : "text-text-body hover:text-secondary-container font-medium"
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
                className="w-10 h-10 rounded-full bg-surface-canvas border border-surface-container hover:bg-secondary-container hover:text-white text-on-surface flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 cursor-pointer"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[20px]">
                  chevron_left
                </span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Geser ke kanan"
                className="w-10 h-10 rounded-full bg-surface-canvas border border-surface-container hover:bg-secondary-container hover:text-white text-on-surface flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 cursor-pointer"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[20px]">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Area: Draggable, Touch-Ready, and 100% Clean Infinite Loop */}
        <div
          ref={containerRef}
          className="relative overflow-x-auto pb-6 -mx-6 px-6 lg:-mx-12 lg:px-12 no-scrollbar cursor-grab active:cursor-grabbing select-none"
        >
          <div ref={trackRef} className="product-loop-track flex gap-6">
            {/* Repeated 3 times for seamless infinite buffer */}
            {[...Array(3)].map((_, loopIdx) => (
              <div key={loopIdx} className="flex gap-6 shrink-0">
                {currentProducts.map((p, pIdx) => (
                  <div
                    key={pIdx}
                    className="shrink-0 w-[360px] lg:w-[390px] rounded-3xl bg-surface-container-lowest border-2 border-divider-tint/60 text-on-surface p-7 sm:p-8 flex flex-col justify-between shadow-[0_12px_40px_-10px_rgba(246,84,86,0.12)] transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden hover:shadow-2xl hover:border-secondary-container/40"
                  >
                    {/* Decorative Corner Background */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-surface-tint-light rounded-bl-full pointer-events-none -z-0 opacity-80 group-hover:scale-110 transition-transform"></div>

                    {/* Card Body */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-5">
                        <span className="font-stat-number text-stat-number text-secondary-container leading-none font-extrabold">
                          {p.num}
                        </span>
                        <div className="flex items-center gap-2">
                          {p.tag && (
                            <span className="px-3 py-1 rounded-full text-xs font-label-meta font-bold bg-surface-tint-light text-primary border border-divider-tint/60">
                              {p.tag}
                            </span>
                          )}
                          <span className="w-12 h-12 rounded-2xl bg-surface-tint-light flex items-center justify-center text-secondary-container shadow-xs">
                            <span translate="no" className="material-symbols-outlined notranslate text-[24px]">
                              {p.icon || "auto_awesome"}
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* Photo */}
                      <Link
                        href={p.href}
                        className="service-process-photo block relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-surface-container-high/40 shadow-xs border border-divider-tint/50 group-hover:border-secondary-container/40 transition-colors"
                      >
                        <img
                          src={p.img}
                          alt={p.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </Link>

                      {/* Title */}
                      <h3 className="font-headline-lg text-2xl text-navbar-black tracking-tight mb-3 font-extrabold group-hover:text-primary transition-colors">
                        <Link href={p.href}>
                          {p.title}
                        </Link>
                      </h3>

                      {/* Badges / Feature Pills */}
                      {p.badges && p.badges.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {p.badges.map((badge, bIdx) => (
                            <span
                              key={bIdx}
                              className="px-3 py-1 rounded-full text-xs font-label-meta bg-surface-tint-light text-primary border border-divider-tint/60 font-semibold"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Description */}
                      <p className="font-body-md text-sm text-text-body leading-relaxed line-clamp-3">
                        {p.desc}
                      </p>
                    </div>

                    {/* Action Buttons (Matches Exactly Layanan Card Format) */}
                    <div className="pt-6 mt-6 border-t border-surface-container relative z-10 flex flex-col gap-2.5">
                      <Link
                        href={p.href}
                        className="w-full inline-flex items-center justify-between px-6 py-3.5 rounded-full bg-secondary-container hover:bg-primary text-on-primary font-cta-pill text-sm sm:text-base font-semibold transition-all duration-200 shadow-[0_4px_14px_rgba(246,84,86,0.39)] cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
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
                      </Link>

                      <a
                        href={`https://wa.me/6282231019363?text=${encodeURIComponent(
                          p.waText || "Halo CV Pelangi UV, saya ingin tanya informasi produk & layanan finishing."
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-divider-tint/60 hover:bg-surface-tint-light text-text-body hover:text-primary font-label-nav text-xs sm:text-sm font-semibold transition-colors"
                      >
                        <span translate="no" className="material-symbols-outlined notranslate text-[16px] text-action-whatsapp">
                          chat
                        </span>
                        <span>Konsultasi Cepat via WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}

                {/* Banner Callout Card */}
                <div className="shrink-0 w-[360px] lg:w-[390px] rounded-3xl bg-navbar-black text-white p-7 sm:p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/10 group">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-secondary-container">
                      <span translate="no" className="material-symbols-outlined notranslate text-[26px]">
                        {activeTab === "jasa" ? "layers" : "inventory_2"}
                      </span>
                    </div>
                    <h3 className="font-headline-lg text-2xl text-white font-extrabold tracking-tight">
                      {activeTab === "jasa" ? "Lihat Semua Layanan (13+)" : "Katalog Lengkap Bahan Baku"}
                    </h3>
                    <p className="font-body-md text-sm text-surface-dim leading-relaxed">
                      {activeTab === "jasa"
                        ? "Jelajahi spesifikasi teknis dan estimasi kapasitas 13+ ragam finishing pasca-cetak kami: Cast & Cure, Transfer Metalized, Cold Foil, Micro Emboss, dll."
                        : "Katalog lengkap roll foil, film BOPP laminasi, lem industri, dan varnish kemasan."}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex flex-col gap-2.5">
                    <Link
                      className="w-full inline-flex items-center justify-between px-6 py-3.5 rounded-full bg-secondary-container hover:bg-primary text-on-primary font-cta-pill text-sm sm:text-base font-semibold transition-all duration-200 shadow-md group-hover:scale-[1.02]"
                      href={activeTab === "jasa" ? "/layanan" : "/produk/bahan-baku"}
                    >
                      <span>
                        {activeTab === "jasa" ? "Buka Semua Layanan" : "Buka Katalog Bahan"}
                      </span>
                      <span translate="no" className="material-symbols-outlined notranslate text-[18px] transition-transform duration-200 group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </Link>

                    <a
                      href="https://wa.me/6282231019363?text=Halo%20CV%20Pelangi%20UV%2C%20saya%20ingin%20konsultasi%20kebutuhan%20finishing%20oplah%20besar."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 text-surface-dim hover:text-white font-label-nav text-xs sm:text-sm font-semibold transition-colors"
                    >
                      <span translate="no" className="material-symbols-outlined notranslate text-[16px] text-action-whatsapp">
                        chat
                      </span>
                      <span>Hubungi Sales Oplah Besar</span>
                    </a>
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

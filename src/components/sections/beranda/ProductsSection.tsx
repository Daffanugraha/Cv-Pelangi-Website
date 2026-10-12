"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { productsJasa, productsBahan, servicesPricelistData, ServiceDetailPricelist } from "@/lib/data";

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState<"jasa" | "bahan">("jasa");
  const [selectedPricelistKey, setSelectedPricelistKey] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentPosRef = useRef(0);

  const currentProducts = activeTab === "jasa" ? productsJasa : productsBahan;

  // Keyboard shortcut (Escape) to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPricelistKey(null);
      }
    };
    if (selectedPricelistKey) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPricelistKey]);

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

    // Set awal ke set tengah (set 1) jika masih di 0 agar ada buffer kiri dan kanan
    const initialWidth = getLoopWidth();
    if (initialWidth > 0 && container.scrollLeft === 0) {
      container.scrollLeft = initialWidth;
      currentPos = initialWidth;
    }

    const activeContainer = container;

    function tick() {
      if (!isDragging && activeContainer && !selectedPricelistKey) {
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
  }, [activeTab, selectedPricelistKey]);

  const handlePrev = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: -380, behavior: "smooth" });
  };

  const handleNext = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: 380, behavior: "smooth" });
  };

  const activeServiceModal: ServiceDetailPricelist =
    selectedPricelistKey && servicesPricelistData[selectedPricelistKey]
      ? servicesPricelistData[selectedPricelistKey]
      : servicesPricelistData.laminating;

  const downloadPricelistPdf = () => {
    const a = document.createElement("a");
    a.href = "/katalog/katalog-pelangi-uv.pdf";
    a.download = "KATALOG PELANGI UV.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
              {activeTab === "jasa" ? "Portofolio Layanan Unggulan" : "Katalog Bahan Baku"}
            </span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold mt-1">
              Produk &amp; Layanan Finishing
            </h2>
            <p className="font-body-md text-body-md text-text-muted mt-1">
              {activeTab === "jasa"
                ? "Layanan pasca-cetak presisi toleransi mikron langsung dari workshop Bizpark Sidoarjo"
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
                Layanan Finishing (5)
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
                {currentProducts.map((p, pIdx) => {
                  const isJasa = activeTab === "jasa";
                  return (
                    <div
                      key={pIdx}
                      className="w-[320px] sm:w-[360px] bg-surface-canvas rounded-3xl p-space-lg flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 shrink-0 hover:scale-[1.02] border border-surface-container/80 group"
                    >
                      <div>
                        <div className="flex items-start justify-between mb-space-md">
                          <span className="font-stat-number-mobile text-stat-number-mobile text-bracket-border/30 font-black">
                            {p.num}
                          </span>
                          {p.tag && (
                            <span className="px-3 py-1 rounded-full text-[11px] font-label-meta font-bold bg-secondary-container/10 text-secondary-container border border-secondary-container/20">
                              {p.tag}
                            </span>
                          )}
                        </div>
                        <div
                          onClick={() => {
                            if (isJasa && p.serviceKey) setSelectedPricelistKey(p.serviceKey);
                          }}
                          className={`rounded-2xl overflow-hidden aspect-[16/10] mb-space-md bg-surface-container border border-surface-container ${
                            isJasa ? "cursor-pointer" : ""
                          }`}
                        >
                          <img
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            alt={p.title}
                            src={p.img}
                          />
                        </div>
                        <h3
                          translate="no"
                          onClick={() => {
                            if (isJasa && p.serviceKey) setSelectedPricelistKey(p.serviceKey);
                          }}
                          className={`notranslate font-headline-md text-headline-md text-on-surface font-bold mb-1 group-hover:text-bracket-border transition-colors ${
                            isJasa ? "cursor-pointer" : ""
                          }`}
                        >
                          {p.title}
                        </h3>
                        <p className="font-body-sm text-body-sm text-text-body leading-relaxed line-clamp-3">
                          {p.desc}
                        </p>
                      </div>

                      <div className="pt-space-md mt-space-md border-t border-surface-container flex items-center justify-between gap-2">
                        <div className="flex flex-col">
                          {p.priceStarting ? (
                            <span className="font-headline-sm text-xs sm:text-sm font-extrabold text-bracket-border">
                              {p.priceStarting}
                            </span>
                          ) : null}
                          <span className="font-label-meta text-[11px] text-text-muted font-medium">
                            {p.capacity}
                          </span>
                        </div>

                        {isJasa ? (
                          <button
                            type="button"
                            onClick={() => setSelectedPricelistKey(p.serviceKey || "laminating")}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-bracket-border/10 hover:bg-bracket-border text-bracket-border hover:text-white font-cta-pill text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
                          >
                            <span>Selengkapnya</span>
                            <span translate="no" className="material-symbols-outlined notranslate text-[15px]">
                              receipt_long
                            </span>
                          </button>
                        ) : (
                          <Link
                            className="inline-flex items-center gap-1 text-bracket-border hover:text-primary font-cta-pill text-cta-pill font-semibold transition-colors"
                            href={p.href || "/produk/bahan-baku"}
                          >
                            <span>Selengkapnya</span>
                            <span translate="no" className="material-symbols-outlined notranslate text-[16px]">
                              arrow_forward
                            </span>
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Banner Callout Card */}
                <div className="w-[320px] sm:w-[360px] bg-navbar-black rounded-3xl p-space-lg flex flex-col justify-between shadow-xl transition-all duration-300 shrink-0 text-white hover:scale-[1.02] border border-white/10">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                      <span translate="no" className="material-symbols-outlined notranslate text-[24px]">
                        {activeTab === "jasa" ? "layers" : "inventory_2"}
                      </span>
                    </div>
                    <h3 className="font-headline-md text-headline-md font-bold text-white">
                      {activeTab === "jasa" ? "Lihat Semua Layanan (13+)" : "Lihat Semua Bahan Baku"}
                    </h3>
                    <p className="font-body-sm text-body-sm text-surface-dim leading-relaxed">
                      {activeTab === "jasa"
                        ? "Jelajahi spesifikasi teknis dan estimasi kapasitas 13+ ragam finishing cetak kami: Cast & Cure, Transfer Metalized, Cold Foil, dll."
                        : "Katalog lengkap roll foil, film BOPP laminasi, lem industri, dan varnish."}
                    </p>
                  </div>

                  <div className="pt-space-md mt-space-md border-t border-white/10">
                    <Link
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-bracket-border text-white border border-white/20 hover:border-bracket-border font-cta-pill text-cta-pill transition-all duration-200 shadow-md group"
                      href={activeTab === "jasa" ? "/layanan" : "/produk/bahan-baku"}
                    >
                      <span className="font-semibold">
                        {activeTab === "jasa" ? "Buka Katalog Layanan" : "Buka Katalog Bahan Baku"}
                      </span>
                      <span translate="no" className="material-symbols-outlined notranslate text-[18px] transition-transform duration-200 group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POPUP MODAL PRICELIST LANGSUNG DI BERANDA */}
      {selectedPricelistKey && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navbar-black/80 backdrop-blur-md transition-all duration-300 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label={`Pricelist ${activeServiceModal.name}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedPricelistKey(null);
          }}
        >
          <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.4)] border border-divider-tint/60 overflow-hidden transform transition-all duration-300 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-surface-container bg-surface-bright">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-surface-tint-light flex items-center justify-center text-secondary-container shadow-xs">
                  <span translate="no" className="material-symbols-outlined notranslate text-[24px]">
                    {activeServiceModal.icon}
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-md text-lg sm:text-xl text-on-surface font-extrabold flex items-center gap-2">
                    <span>{activeServiceModal.name}</span>
                    <span className="text-[11px] font-label-meta px-2 py-0.5 rounded-full bg-secondary-container/10 text-secondary-container font-semibold">
                      Pricelist
                    </span>
                  </h3>
                  <p className="font-body-sm text-xs text-text-muted mt-0.5">
                    {activeServiceModal.capacity} • {activeServiceModal.speed}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPricelistKey(null)}
                className="w-9 h-9 rounded-full bg-surface-container hover:bg-secondary-container hover:text-on-primary text-text-body flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Tutup modal"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[20px]">
                  close
                </span>
              </button>
            </div>

            {/* Quick Service Switch Tabs */}
            <div className="px-6 py-2.5 bg-surface-neutral-alt border-b border-surface-container overflow-x-auto no-scrollbar flex items-center gap-2">
              <span className="text-[11px] font-label-meta text-text-muted uppercase font-semibold shrink-0 mr-1">
                Layanan:
              </span>
              {Object.keys(servicesPricelistData).map((key) => {
                const svc = servicesPricelistData[key];
                const isActive = key === selectedPricelistKey;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedPricelistKey(key)}
                    className={`px-3 py-1 rounded-full font-label-nav text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? "bg-secondary-container text-on-primary shadow-xs"
                        : "bg-surface-container text-text-body hover:text-on-surface"
                    }`}
                  >
                    {svc.name.split(" ")[0]}
                  </button>
                );
              })}
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-5" style={{ scrollbarWidth: "thin" }}>
              <div className="rounded-2xl p-4 bg-surface-tint-light/40 border border-divider-tint/50 text-xs sm:text-sm text-text-body leading-relaxed">
                {activeServiceModal.desc}
              </div>

              <div>
                <p className="font-label-meta text-xs uppercase tracking-wider text-text-muted font-bold mb-2.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                  Daftar Tarif Resmi &amp; Spesifikasi Layanan
                </p>
                <div className="overflow-x-auto rounded-2xl border border-divider-tint/60 shadow-xs">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-surface-container text-on-surface font-headline-sm uppercase text-[11px] tracking-wider border-b border-surface-container">
                      <tr>
                        <th className="py-3 px-4 text-center w-12 font-bold">No</th>
                        <th className="py-3 px-4 font-bold">Varian Layanan</th>
                        <th className="py-3 px-4 font-bold text-secondary-container">Tarif / Satuan</th>
                        <th className="py-3 px-4 text-right font-bold">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container font-body-sm">
                      {activeServiceModal.pricelist.map((item, idx) => (
                        <tr
                          key={item.no}
                          className={
                            idx % 2 === 1
                              ? "bg-surface-container-low/50 hover:bg-surface-tint-light/40 transition-colors"
                              : "hover:bg-surface-tint-light/40 transition-colors"
                          }
                        >
                          <td className="py-3.5 px-4 text-center font-medium text-text-muted">
                            {item.no}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-on-surface">
                            {item.variant}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-secondary-container whitespace-nowrap">
                            {item.unit}
                          </td>
                          <td className="py-3.5 px-4 text-right text-text-muted font-medium">
                            {item.note}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="font-label-meta text-[11px] text-text-muted leading-relaxed">
                *NB: Tarif di atas dapat disesuaikan untuk kebutuhan oplah besar (grosir/partai) dan format plano khusus. Hubungi tim marketing kami untuk estimasi kalkulasi akurat.
              </p>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-surface-container bg-surface-neutral-alt">
              <button
                type="button"
                onClick={downloadPricelistPdf}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-surface-container hover:bg-surface-container text-on-surface font-cta-pill text-xs font-semibold transition-colors cursor-pointer"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                  download
                </span>
                <span>Download PDF Katalog</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedPricelistKey(null)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full text-text-muted hover:text-on-surface font-cta-pill text-xs font-semibold transition-colors cursor-pointer"
                >
                  Tutup
                </button>
                <a
                  href={`https://wa.me/6282231019363?text=${encodeURIComponent(activeServiceModal.waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-action-whatsapp hover:bg-action-whatsapp-hover text-on-primary font-cta-pill text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                    chat
                  </span>
                  <span>Pesan via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

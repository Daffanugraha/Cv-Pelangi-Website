"use client";

import React, { useRef, useState } from "react";
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const slideCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const amount = 430;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  const handleFilterClick = (catId: string) => {
    setActiveFilter(catId);
    if (catId === "all") {
      if (carouselRef.current) {
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    } else {
      const card = document.getElementById(`product-card-${catId}`);
      if (card && carouselRef.current) {
        const offset = card.offsetLeft - 32;
        carouselRef.current.scrollTo({ left: Math.max(0, offset), behavior: "smooth" });
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        card.classList.add("ring-4", "ring-bracket-border", "scale-[1.02]");
        setTimeout(() => {
          card.classList.remove("ring-4", "ring-bracket-border", "scale-[1.02]");
        }, 2000);
      }
    }
  };

  const renderCard = (cat: MaterialCategory) => {
    const waText = encodeURIComponent(
      `Halo Tim Marketing CV Pelangi UV, saya ingin konsultasi harga dan pemesanan grosir untuk Bahan Baku: *${cat.title}*. Mohon info ketersediaan stok & penawaran terbaik.`
    );
    const waUrl = `https://wa.me/6282231019363?text=${waText}`;

    return (
      <div
        key={cat.id}
        id={`product-card-${cat.id}`}
        data-category-key={cat.id}
        className="shrink-0 w-[360px] lg:w-[410px] rounded-3xl bg-surface-container-lowest border-2 border-divider-tint/60 text-on-surface p-8 flex flex-col justify-between shadow-[0_12px_40px_-10px_rgba(246,84,86,0.12)] transition-transform duration-300 hover:-translate-y-2 group relative overflow-hidden sheen-effect hover:shadow-2xl"
        style={{
          transition: "transform 0.15s ease-out, box-shadow 0.2s ease-out",
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {/* Decorative Top-Right Blob */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-surface-tint-light rounded-bl-full pointer-events-none -z-0 opacity-80 group-hover:scale-110 transition-transform" />

        <div className="relative z-10">
          {/* Header with Number and Category Icon */}
          <div className="flex items-start justify-between mb-6">
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
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>

          {/* Title */}
          <h3
            onClick={() => onOpenPricelist(cat.id)}
            className="font-headline-lg text-2xl lg:text-[26px] text-navbar-black tracking-tight mb-3 font-extrabold group-hover:text-primary transition-colors cursor-pointer"
          >
            {cat.title}
          </h3>

          {/* Popular Variant Badges / Pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {cat.popularVariants.map((variant, vIdx) => (
              <span
                key={vIdx}
                className="px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-label-meta bg-surface-tint-light text-primary border border-divider-tint/60 font-semibold"
              >
                {variant}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="font-body-md text-sm sm:text-[15px] text-text-body leading-relaxed">
            {cat.shortDesc}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-8 relative z-10 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() => onOpenPricelist(cat.id)}
            className="w-full inline-flex items-center justify-between px-6 py-3.5 rounded-full bg-secondary-container hover:bg-primary text-on-primary font-cta-pill text-sm sm:text-base font-semibold transition-all duration-200 shadow-[0_4px_14px_rgba(246,84,86,0.39)] cursor-pointer"
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
      <style>{`
        @keyframes foilShimmer {
          0% { transform: translateX(-150%) rotate(25deg); opacity: 0; }
          30% { opacity: 0.7; }
          100% { transform: translateX(250%) rotate(25deg); opacity: 0; }
        }
        .sheen-effect {
          position: relative;
          overflow: hidden;
        }
        .sheen-effect::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -60%;
          width: 60%;
          height: 200%;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 100%);
          transform: rotate(25deg);
          pointer-events: none;
          opacity: 0;
          z-index: 15;
        }
        .sheen-effect:hover::after {
          animation: foilShimmer 1.1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .sheen-effect:hover .stat-rainbow-hover {
          background: linear-gradient(135deg, #fe5453 0%, #FFD700 50%, #25D366 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 8px rgba(246,84,86,0.25));
          transition: all 0.3s ease;
        }
        .sheen-effect {
          transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .sheen-effect:hover {
          border-color: rgba(246, 84, 86, 0.45) !important;
        }
        #materials-carousel::-webkit-scrollbar {
          display: none;
        }
        #materials-carousel {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Ambient Blurred Blobs */}
      <div className="absolute -top-32 -right-32 w-[680px] h-[680px] bg-divider-tint/50 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/2 -left-48 w-[720px] h-[720px] bg-surface-tint-light/80 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col">
        {/* Section Header Matching Layanan */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col items-start gap-4">
            <span className="px-5 py-2 rounded-full bg-secondary-container text-on-primary font-cta-pill text-cta-pill shadow-[0_4px_16px_rgba(246,84,86,0.25)]">
              Katalog Bahan Baku Pasca Cetak
            </span>
            <div>
              <h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-extrabold text-navbar-black sm:text-4xl lg:text-[42px] leading-tight">
                Bahan Baku Finishing Standar Industri
              </h2>
              <p className="font-body-md text-body-md text-text-muted mt-1">
                Empat pilar material esensial percetakan modern dengan daya rekat superior, kilau optimal, dan toleransi putaran mesin berkecepatan tinggi.
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
                className={`px-4 py-2 rounded-full font-label-nav text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
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
                  className={`px-4 py-2 rounded-full font-label-nav text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
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

          {/* Left / Right Carousel Navigation Buttons */}
          <div className="hidden sm:flex items-center gap-2 self-end mb-1 shrink-0">
            <button
              type="button"
              onClick={() => slideCarousel("left")}
              aria-label="Geser ke kiri"
              className="w-10 h-10 rounded-full bg-white hover:bg-secondary-container hover:text-white text-neutral-800 border border-neutral-300 transition-all flex items-center justify-center shadow-xs cursor-pointer hover:scale-105 active:scale-95"
            >
              <span translate="no" className="material-symbols-outlined notranslate text-[20px]">
                arrow_back
              </span>
            </button>
            <button
              type="button"
              onClick={() => slideCarousel("right")}
              aria-label="Geser ke kanan"
              className="w-10 h-10 rounded-full bg-white hover:bg-secondary-container hover:text-white text-neutral-800 border border-neutral-300 transition-all flex items-center justify-center shadow-xs cursor-pointer hover:scale-105 active:scale-95"
            >
              <span translate="no" className="material-symbols-outlined notranslate text-[20px]">
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        {/* Carousel matching Layanan */}
        <div
          id="materials-carousel"
          ref={carouselRef}
          className="flex items-stretch gap-6 overflow-x-auto pb-8 pt-2 cursor-grab active:cursor-grabbing select-none"
        >
          <div className="flex items-stretch gap-6 pb-8 pt-2">
            {categories.map((cat) => renderCard(cat))}
          </div>
        </div>
      </div>
    </section>
  );
}

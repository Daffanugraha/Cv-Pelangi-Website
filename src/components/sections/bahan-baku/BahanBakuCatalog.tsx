"use client";

import React, { useState } from "react";
import { MaterialCategory } from "@/lib/data/rawMaterials";

interface BahanBakuCatalogProps {
  categories: MaterialCategory[];
  onOpenPricelist: (categoryId: "opp" | "foil" | "lem" | "spotuv") => void;
  onRequestSample?: (categoryId?: "opp" | "foil" | "lem" | "spotuv") => void;
}

export default function BahanBakuCatalog({
  categories,
  onOpenPricelist,
}: BahanBakuCatalogProps) {
  const [isHovered, setIsHovered] = useState(false);

  // 2 sets per track (8 cards) so each track is ~3,300px wide, preventing any blank gap on any screen width
  const cardList = [...categories, ...categories];

  const renderCard = (cat: MaterialCategory, key: string) => {
    const waText = encodeURIComponent(
      `Halo Tim CV Pelangi UV, saya tertarik untuk konsultasi dan order Bahan Baku: ${cat.title}. Mohon informasi ketersediaan stok & penawaran terbaik.`
    );
    const waUrl = `https://wa.me/6282231019363?text=${waText}`;

    return (
      <div
        key={key}
        className="w-[275px] sm:w-[315px] lg:w-[345px] flex-shrink-0"
      >
        <div
          id={`product-card-${cat.id}-${key}`}
          className="h-full bg-surface-canvas text-on-surface rounded-[22px] sm:rounded-[24px] p-4 sm:p-5 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-outline-variant group"
        >
          <div>
            {/* Top Number & Accent bar */}
            <div className="flex items-baseline justify-between mb-2.5">
              <span className="font-stat-number text-[24px] sm:text-[28px] leading-none text-bracket-border font-extrabold tracking-tighter">
                {cat.num}
              </span>
              <span className="h-1.5 w-8 bg-bracket-border rounded-full" />
            </div>

            {/* Thumbnail Image */}
            <div className="relative rounded-xl overflow-hidden aspect-[16/10] mb-3 bg-surface-container shadow-inner border border-outline-variant">
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Title */}
            <h3
              translate="no"
              className="notranslate font-headline-lg text-[15px] sm:text-[16.5px] font-bold text-on-surface group-hover:text-bracket-border transition-colors mb-1.5 leading-snug line-clamp-1"
            >
              {cat.title}
            </h3>

            {/* Short Description */}
            <div className="mb-3 p-2.5 rounded-lg bg-surface-tint-light/50 border border-divider-tint/50">
              <p className="font-body-sm text-[11px] sm:text-[12px] text-text-body leading-relaxed line-clamp-2 min-h-[32px]">
                {cat.shortDesc}
              </p>
            </div>

            {/* Popular Variants Box */}
            <div className="space-y-1 mb-3.5 bg-surface-neutral-alt border border-outline-variant/70 p-2.5 rounded-lg">
              <span className="font-label-meta text-[10px] text-bracket-border uppercase font-bold tracking-wider block">
                Varian Populer:
              </span>
              <ul className="text-text-body font-body-sm text-[11px] space-y-1">
                {cat.popularVariants.map((variant, vIdx) => (
                  <li key={vIdx} className="flex items-center gap-1.5 leading-tight">
                    <span translate="no" className="material-symbols-outlined notranslate text-[13px] text-bracket-border shrink-0 notranslate"
                    >
                      check_circle
                    </span>
                    <span translate="no" className="notranslate line-clamp-1">
                      {variant}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card Action Buttons */}
          <div className="flex flex-col gap-1.5 pt-2 border-t border-surface-container mt-auto">
            <button
              type="button"
              onClick={() => onOpenPricelist(cat.id)}
              className="inline-flex items-center justify-center gap-1.5 w-full px-3.5 py-2 rounded-full bg-surface-tint-light text-primary hover:bg-bracket-border hover:text-on-primary font-cta-pill text-xs sm:text-[12px] font-semibold border border-bracket-border/40 transition-all cursor-pointer shadow-2xs"
            >
              <span translate="no" className="material-symbols-outlined notranslate text-[15px] notranslate">
                payments
              </span>
              <span>Lihat Pricelist ({cat.items.length} Item)</span>
            </button>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full px-3.5 py-2 rounded-full bg-bracket-border text-on-primary hover:bg-primary font-cta-pill text-xs sm:text-[12px] font-semibold shadow-2xs transition-all"
            >
              <span>Konsultasi &amp; Order</span>
              <span translate="no" className="material-symbols-outlined notranslate text-[15px] notranslate">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="katalog-material"
      className="w-full bg-surface-tint-light/40 relative py-14 sm:py-20 rounded-t-[40px] sm:rounded-t-[56px] shadow-sm border-t border-divider-tint/40 overflow-hidden"
    >
      <style>{`
        @keyframes continuousMarqueeTrack {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-100%, 0, 0);
          }
        }
        .marquee-track {
          animation: continuousMarqueeTrack 38s linear infinite;
          will-change: transform;
        }
        .marquee-track.paused {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-9 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="font-headline-xl text-[26px] sm:text-[32px] md:text-headline-xl text-on-surface font-bold tracking-tight">
            Bahan Baku Finishing Standar Industri
          </h2>
          <p className="font-body-md text-xs sm:text-sm text-text-body mt-2 leading-relaxed text-center">
            Empat pilar material esensial percetakan modern dengan daya rekat superior, kilau optimal, dan toleransi putaran mesin berkecepatan tinggi tanpa resiko macet.
          </p>
        </div>
      </div>

      {/* Full-width continuous conveyor with twin identical tracks */}
      <div
        className="relative w-full overflow-hidden py-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        {/* Edge Gradient Vignettes for smooth entry/exit */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-surface-tint-light/90 via-surface-tint-light/50 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-surface-tint-light/90 via-surface-tint-light/50 to-transparent z-10" />

        {/* Dual Synchronized Tracks for Seamless Never-Ending Loop */}
        <div className="flex w-max">
          <div className={`marquee-track flex gap-5 sm:gap-6 pr-5 sm:pr-6 shrink-0 ${isHovered ? "paused" : ""}`}>
            {cardList.map((cat, idx) => renderCard(cat, `t1-${idx}`))}
          </div>
          <div
            className={`marquee-track flex gap-5 sm:gap-6 pr-5 sm:pr-6 shrink-0 ${isHovered ? "paused" : ""}`}
            aria-hidden="true"
          >
            {cardList.map((cat, idx) => renderCard(cat, `t2-${idx}`))}
          </div>
        </div>
      </div>
    </section>
  );
}

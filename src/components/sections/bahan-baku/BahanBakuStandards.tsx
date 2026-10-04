"use client";

import React from "react";
import { materialQualityPillars } from "@/lib/data/rawMaterials";

export default function BahanBakuStandards() {
  return (
    <section className="w-full bg-surface-canvas py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-headline-xl text-[26px] sm:text-[34px] md:text-headline-xl text-on-surface tracking-tight font-bold">
            Keunggulan Kualitas Material{" "}
            <span translate="no" className="notranslate text-primary">
              CV Pelangi UV
            </span>
          </h2>
          <p className="font-body-md text-sm sm:text-body-md text-text-body mt-2">
            Bahan baku finishing kami telah lolos uji laboratorium presisi tinggi dan terstandarisasi
            untuk menjamin hasil rekat sempurna, kilau maksimal, dan kompatibilitas optimal di segala
            jenis mesin cetak industri Anda.
          </p>
        </div>

        {/* 4 Open-Corner Bracket Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {materialQualityPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="relative bg-surface-tint-light p-6 sm:p-7 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              {/* Corner bracket accents matching brand identity */}
              <div className="absolute top-0 left-0 w-8 h-8 rounded-tl-2xl border-t-2 border-l-2 border-bracket-border pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 rounded-br-2xl border-b-2 border-r-2 border-bracket-border pointer-events-none" />

              <div className="w-12 h-12 rounded-xl bg-bracket-border text-on-primary flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform">
                <span translate="no" className="material-symbols-outlined notranslate text-[26px] notranslate">
                  {pillar.icon}
                </span>
              </div>

              <h3 className="font-headline-sm text-[16px] sm:text-headline-sm text-on-surface font-bold mb-2">
                {pillar.title}
              </h3>
              <p className="font-body-sm text-xs sm:text-body-sm text-text-body leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";

interface FactoryMapEmbedProps {
  className?: string;
  minHeightClass?: string;
}

export default function FactoryMapEmbed({
  className = "",
  minHeightClass = "min-h-[380px] lg:min-h-[460px]",
}: FactoryMapEmbedProps) {
  return (
    <div
      className={`relative w-full h-full ${minHeightClass} rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-surface-neutral-alt group ${className}`}
    >
      <iframe
        className={`w-full h-full ${minHeightClass} border-0`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src="https://maps.google.com/maps?q=-7.3633984,112.7802609+(CV%20Pelangi%20UV)&z=16&output=embed"
        title="Peta Lokasi CV Pelangi UV Bizpark Sidoarjo"
      />

      {/* Minimalist Floating Badge on Map */}
      <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-slate-200/90 px-3.5 py-2 text-slate-900 flex items-center gap-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-slate-900">CV Pelangi UV</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-medium">Bizpark C17-C19 Waru</span>
        </div>
      </div>
    </div>
  );
}

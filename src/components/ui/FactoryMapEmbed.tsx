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

      {/* Floating Google Maps Place Card */}
      <div className="absolute top-3 left-3 z-10 max-w-[310px] sm:max-w-[350px] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/90 p-3 sm:p-3.5 text-slate-900 transition-all">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-50 text-[#EA4335] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 leading-tight truncate">
                CV Pelangi UV
              </h4>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">
                Pabrik Utama
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1 leading-snug">
              Kompleks Pergudangan Bizpark C17-C19, Tambaksawah, Waru, Sidoarjo 61256
            </p>

            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-2">
              <a
                href="https://maps.app.goo.gl/sfBs972qUZfScwMJ6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A73E8] hover:bg-[#1557B0] text-white text-[11px] font-bold shadow-xs transition hover:scale-102 active:scale-98"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M21.71 11.29l-9-9a.996.996 0 00-1.41 0l-9 9a.996.996 0 000 1.41l9 9c.39.39 1.02.39 1.41 0l9-9a.996.996 0 000-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z" />
                </svg>
                <span>Petunjuk Arah</span>
              </a>
              <a
                href="https://maps.app.goo.gl/sfBs972qUZfScwMJ6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1A73E8] hover:underline px-1 py-1"
              >
                <span>Buka Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

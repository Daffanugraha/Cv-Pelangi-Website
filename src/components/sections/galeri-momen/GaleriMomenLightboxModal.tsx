"use client";

import React, { useEffect } from "react";
import { MomenPhoto } from "@/lib/data/galeriMomen";

interface GaleriMomenLightboxModalProps {
  photo: MomenPhoto | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function GaleriMomenLightboxModal({
  photo,
  onClose,
  onPrev,
  onNext,
}: GaleriMomenLightboxModalProps) {
  useEffect(() => {
    if (!photo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [photo, onClose, onPrev, onNext]);

  if (!photo) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full flex flex-col bg-surface-canvas rounded-2xl overflow-hidden shadow-2xl border border-white/10"
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between p-4 bg-navbar-black text-surface-canvas border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-bracket-border" />
            <span className="text-xs font-semibold text-zinc-400">
              Pratinjau Foto Dokumentasi
            </span>
          </div>
          <button
            onClick={onClose}
            type="button"
            aria-label="Tutup pratinjau"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-bracket-border text-surface-canvas flex items-center justify-center transition-colors cursor-pointer"
          >
            <span translate="no" className="material-symbols-outlined notranslate text-xl">
              close
            </span>
          </button>
        </div>

        {/* Image Area with Navigation Buttons */}
        <div className="relative w-full bg-black/95 flex items-center justify-center min-h-[360px] max-h-[70vh] overflow-hidden">
          <img
            alt={photo.alt || photo.title}
            src={photo.src}
            className="max-h-[68vh] w-auto max-w-full object-contain select-none"
          />

          {/* Prev & Next Buttons */}
          <button
            onClick={onPrev}
            type="button"
            aria-label="Foto Sebelumnya"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-bracket-border text-surface-canvas flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <span translate="no" className="material-symbols-outlined notranslate text-2xl">
              chevron_left
            </span>
          </button>
          <button
            onClick={onNext}
            type="button"
            aria-label="Foto Selanjutnya"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-bracket-border text-surface-canvas flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <span translate="no" className="material-symbols-outlined notranslate text-2xl">
              chevron_right
            </span>
          </button>
        </div>

        {/* Caption & Metadata Footer */}
        <div className="p-6 bg-surface-canvas">
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
            {photo.title || photo.cardTitle}
          </h3>
          <p className="font-body-md text-body-md text-text-body mt-2 leading-relaxed">
            {photo.caption || photo.cardDesc}
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect } from "react";
import { GalleryProduct } from "@/lib/data/galleryProducts";

interface PengaplikasianDetailModalProps {
  product: GalleryProduct | null;
  onClose: () => void;
}

export default function PengaplikasianDetailModal({
  product,
  onClose,
}: PengaplikasianDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-surface-canvas rounded-3xl overflow-hidden border border-surface-container-high shadow-2xl my-auto animate-scale-up max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Tutup detail modal"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-bracket-border text-white flex items-center justify-center transition cursor-pointer backdrop-blur-md"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Modal Image Hero */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-black/10 overflow-hidden">
          <img
            src={product.img}
            alt={product.title}
            className={`w-full h-full object-cover ${
              product.objectPosition === "top"
                ? "object-top"
                : product.objectPosition === "bottom"
                ? "object-bottom"
                : "object-center"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-bracket-border text-white shadow-md">
              {product.categoryLabel}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-black/70 text-white backdrop-blur-md border border-white/20">
              {product.tag}
            </span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
              {product.title}
            </h3>
            <p className="text-sm text-text-body mt-2 leading-relaxed">
              {product.desc}
            </p>
          </div>

          {/* Badges Row */}
          {product.badges && product.badges.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {product.badges.map((b, bIdx) => (
                <span
                  key={bIdx}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-surface-container-lowest text-text-muted border border-surface-container"
                >
                  ✓ {b}
                </span>
              ))}
            </div>
          )}

          {/* Technical Specifications & Finishing Guide */}
          <div className="bg-surface-container-low rounded-2xl p-5 sm:p-6 border border-surface-container-high space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <p className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-2 font-mono">
                <span className="material-symbols-outlined text-bracket-border text-lg">
                  tune
                </span>
                Spesifikasi Teknis &amp; Rekomendasi Finishing
              </p>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-container text-text-muted border border-surface-container-high hidden sm:inline-block">
                Standar CV Pelangi UV
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
              {/* 1. Teknik Finishing */}
              <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container flex flex-col justify-between">
                <div>
                  <span className="text-[11px] text-text-muted font-medium flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-bracket-border shrink-0" />
                    Teknik Finishing Utama:
                  </span>
                  <p className="text-on-surface font-bold text-sm leading-snug">
                    {product.finishing}
                  </p>
                </div>
                {product.alternativeOption && (
                  <div className="mt-3 pt-2.5 border-t border-surface-container text-[11px] text-text-muted leading-relaxed">
                    <span className="font-semibold text-bracket-border">Opsi Variasi / Upgrade:</span>{" "}
                    {product.alternativeOption}
                  </div>
                )}
              </div>

              {/* 2. Bahan / Kertas */}
              <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container flex flex-col justify-between">
                <div>
                  <span className="text-[11px] text-text-muted font-medium flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    Rekomendasi Bahan / Kertas:
                  </span>
                  <p className="text-on-surface font-bold text-sm leading-snug">
                    {product.material}
                  </p>
                </div>
                {product.paperSuitability && (
                  <div className="mt-3 pt-2.5 border-t border-surface-container text-[11px] text-text-muted leading-relaxed">
                    <span className="font-semibold text-blue-600">Karakter Kertas:</span>{" "}
                    {product.paperSuitability}
                  </div>
                )}
              </div>
            </div>

            {/* 3. Hasil Akhir & Keunggulan Produk (Customer-Centric) */}
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container text-xs space-y-1.5">
              <span className="text-[11px] font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <span className="material-symbols-outlined text-emerald-600 text-base">verified</span>
                Karakteristik Hasil Akhir &amp; Ketahanan:
              </span>
              <p className="text-on-surface leading-relaxed text-xs sm:text-[13px] font-sans">
                {product.resultCharacteristics || product.notes}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <a
              href={`https://wa.me/6282231019363?text=Halo%20Pelangi%20UV%2C%20saya%20tertarik%20dengan%20finishing%20produk%20*${encodeURIComponent(
                product.title
              )}*%20(${encodeURIComponent(
                product.finishing
              )}).%20Bisa%20konsultasi%20bahan%20kertas%20dan%20biayanya%3F`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-action-whatsapp hover:bg-action-whatsapp-hover text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-action-whatsapp/30 transition active:scale-95"
            >
              <span className="material-symbols-outlined text-lg">chat</span>
              <span>Konsultasi Produk Ini via WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto py-3.5 px-6 rounded-full border border-surface-container-high bg-surface-container-lowest text-on-surface hover:bg-surface-container text-xs font-semibold transition cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

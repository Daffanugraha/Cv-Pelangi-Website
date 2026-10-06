"use client";

import React from "react";
import { GalleryProduct } from "@/lib/data/galleryProducts";

interface PengaplikasianDetailModalProps {
  product: GalleryProduct | null;
  onClose: () => void;
}

export default function PengaplikasianDetailModal({
  product,
  onClose,
}: PengaplikasianDetailModalProps) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-lowest border border-surface-container-high rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition shadow-md cursor-pointer"
          title="Tutup Modal"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Modal Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-surface-container rounded-t-3xl">
          <img
            src={product.img}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-bracket-border text-white text-xs font-bold shadow">
              {product.tag}
            </span>
            <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-medium border border-white/20">
              {product.categoryLabel}
            </span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-heading font-extrabold text-2xl text-on-surface">
              {product.title}
            </h3>
            <p className="text-sm text-text-body mt-2 leading-relaxed">
              {product.desc}
            </p>
          </div>

          {/* Technical Specifications Table */}
          <div className="bg-surface-container-low rounded-2xl p-5 border border-surface-container-high space-y-3">
            <p className="text-xs font-bold text-on-surface uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-bracket-border text-base">
                tune
              </span>
              Spesifikasi Teknis &amp; Finishing
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container">
                <span className="text-text-muted font-medium block">
                  Teknik Finishing:
                </span>
                <span className="text-on-surface font-semibold mt-0.5 block">
                  {product.finishing}
                </span>
              </div>

              <div className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container">
                <span className="text-text-muted font-medium block">
                  Bahan / Kertas:
                </span>
                <span className="text-on-surface font-semibold mt-0.5 block">
                  {product.material}
                </span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-surface-container text-xs">
              <span className="text-text-muted font-medium block">
                Standar Kualitas &amp; Toleransi:
              </span>
              <span className="text-bracket-border font-bold mt-0.5 block">
                {product.notes}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <a
              href={`https://wa.me/6282231019363?text=Halo%20Pelangi%20UV%2C%20saya%20tertarik%20dengan%20finishing%20produk%20*${encodeURIComponent(
                product.title
              )}*%20(${encodeURIComponent(
                product.finishing
              )}).%20Bisa%20info%20minimal%20oplah%20dan%20biayanya%3F`}
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

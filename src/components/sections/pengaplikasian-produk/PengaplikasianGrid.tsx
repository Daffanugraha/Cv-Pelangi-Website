"use client";

import React from "react";
import { GalleryProduct } from "@/lib/data/galleryProducts";

interface PengaplikasianGridProps {
  products: GalleryProduct[];
  onSelectProduct: (p: GalleryProduct) => void;
  onResetFilter: () => void;
}

export default function PengaplikasianGrid({
  products,
  onSelectProduct,
  onResetFilter,
}: PengaplikasianGridProps) {
  return (
    <section id="pengaplikasian-grid" className="w-full py-10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-surface-container/60">
          <div className="flex items-center gap-2">
            <h2 className="font-heading font-extrabold text-on-surface text-xl sm:text-2xl tracking-tight">
              Katalog Produk
            </h2>
            <span className="text-xs font-semibold text-text-muted bg-surface-container px-2.5 py-0.5 rounded-full">
              {products.length} Produk
            </span>
          </div>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="bg-surface-container-lowest border border-surface-container-high rounded-3xl p-16 text-center shadow-sm">
            <span className="material-symbols-outlined text-5xl text-gray-400">
              search_off
            </span>
            <h3 className="text-lg font-bold text-on-surface mt-3">
              Tidak Ada Produk yang Cocok
            </h3>
            <p className="text-sm text-text-muted mt-1">
              Coba gunakan kata kunci pencarian lain atau pilih kategori &quot;Semua Produk&quot;.
            </p>
            <button
              type="button"
              onClick={onResetFilter}
              className="mt-5 px-5 py-2.5 rounded-full bg-bracket-border text-white text-xs font-semibold hover:bg-primary transition shadow"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <article
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group cursor-pointer bg-surface-container-lowest rounded-[24px] overflow-hidden border border-surface-container/60 hover:border-bracket-border/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                  <img
                    src={product.img}
                    alt={product.title}
                    className={`w-full h-full object-cover ${
                      product.objectPosition === "top"
                        ? "object-top"
                        : product.objectPosition === "bottom"
                        ? "object-bottom"
                        : "object-center"
                    } group-hover:scale-105 transition-transform duration-500`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-xs font-semibold flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                      <span className="material-symbols-outlined text-sm">visibility</span>
                      Lihat Detail
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between flex-1 gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-bracket-border uppercase tracking-wider">
                      {product.categoryLabel}
                    </span>
                    <h3 className="font-heading font-bold text-on-surface text-base sm:text-lg group-hover:text-bracket-border transition-colors mt-0.5">
                      {product.title}
                    </h3>
                    <p className="text-xs text-text-body line-clamp-2 leading-relaxed mt-1">
                      {product.desc}
                    </p>
                  </div>

                  {/* Footer Row Simpel & Bersih (Tanpa Teks Akurasi Berlebihan) */}
                  <div className="pt-3 border-t border-surface-container/60 flex items-center justify-between mt-auto">
                    <span className="text-xs font-medium text-text-muted">
                      {product.tag}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-bracket-border group-hover:text-primary transition-colors">
                      <span>Detail</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

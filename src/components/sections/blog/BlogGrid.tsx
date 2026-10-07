"use client";

import React from "react";
import Link from "next/link";
import { ArticleItem } from "@/lib/data/articles";

interface BlogGridProps {
  articles: ArticleItem[];
  onReadArticle?: (article: ArticleItem) => void;
  onResetFilters: () => void;
}

export default function BlogGrid({
  articles,
  onReadArticle,
  onResetFilters,
}: BlogGridProps) {
  return (
    <section className="w-full bg-surface-bright py-12">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        {/* Section Header */}
        <div className="mb-8">
          <span className="font-label-meta text-xs sm:text-sm text-bracket-border font-bold uppercase tracking-wider block mb-1">
            Koleksi Wawasan Terkini
          </span>
          <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-[36px] font-bold text-on-surface">
            Artikel &amp; Panduan Produksi
          </h2>
        </div>

        {/* Empty State */}
        {articles.length === 0 ? (
          <div className="w-full py-16 flex flex-col items-center justify-center text-center bg-surface-neutral-alt rounded-3xl border border-divider-tint/50 p-8">
            <div className="w-16 h-16 rounded-full bg-surface-tint-light text-bracket-border flex items-center justify-center mb-4">
              <span translate="no" className="material-symbols-outlined notranslate text-3xl">
                article
              </span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">
              Tidak Ada Artikel yang Cocok
            </h3>
            <p className="text-sm text-text-muted max-w-md mb-6 leading-relaxed">
              Coba gunakan kata kunci pencarian lain atau pilih kategori artikel yang berbeda.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="px-6 py-2.5 rounded-full bg-bracket-border hover:bg-secondary text-white font-semibold text-sm transition-all shadow-sm cursor-pointer"
            >
              Tampilkan Semua Artikel
            </button>
          </div>
        ) : (
          /* Articles 3x Grid Layout Matching code.html */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((art) => (
              <article
                key={art.id}
                className="flex flex-col h-full rounded-3xl bg-surface-canvas overflow-hidden border border-divider-tint/50 shadow-[0_10px_30px_-10px_rgba(246,84,86,0.08),0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Image Container Clean (Tanpa Tag Menempel) */}
                <Link
                  href={`/blog/${art.slug}`}
                  className="relative h-56 w-full overflow-hidden bg-surface-container cursor-pointer block"
                >
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${art.img}')` }}
                  />
                </Link>

                {/* Content Area */}
                <div className="p-7 flex flex-col justify-between flex-grow">
                  <div className="flex flex-col gap-3">
                    {/* Meta info */}
                    <div className="flex items-center gap-2 text-text-muted font-label-meta text-xs">
                      <span className="text-bracket-border font-bold">{art.category}</span>
                      <span>•</span>
                      <span>{art.date}</span>
                      <span>•</span>
                      <span>{art.views}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-headline-sm text-lg sm:text-[20px] font-bold text-on-surface group-hover:text-bracket-border transition-colors line-clamp-2 leading-snug">
                      <Link href={`/blog/${art.slug}`}>
                        {art.title}
                      </Link>
                    </h3>

                    {/* Description */}
                    <p className="font-body-sm text-xs sm:text-sm text-text-body leading-relaxed line-clamp-3">
                      {art.desc}
                    </p>
                  </div>

                  {/* Footer Meta & Action */}
                  <div className="pt-6 mt-6 border-t border-surface-container-high flex items-center justify-between">
                    <span className="font-label-meta text-xs text-on-surface-variant font-medium">
                      {art.author}
                    </span>
                    <Link
                      href={`/blog/${art.slug}`}
                      className="inline-flex items-center gap-1 font-cta-pill text-xs sm:text-sm text-bracket-border hover:text-secondary group-hover:translate-x-1 transition-all font-semibold cursor-pointer"
                    >
                      <span>Baca Selengkapnya</span>
                      <span translate="no" className="material-symbols-outlined notranslate text-sm">
                        arrow_forward
                      </span>
                    </Link>
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

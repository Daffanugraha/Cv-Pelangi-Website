"use client";

import React from "react";
import Link from "next/link";
import { ArticleItem } from "@/lib/data/articles";

interface BlogFeaturedCardProps {
  article: ArticleItem;
  onReadArticle?: (article: ArticleItem) => void;
}

export default function BlogFeaturedCard({
  article,
  onReadArticle,
}: BlogFeaturedCardProps) {
  return (
    <section className="w-full bg-surface-bright py-6 lg:py-8">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <div className="w-full rounded-3xl bg-surface-canvas overflow-hidden border border-divider-tint/60 shadow-[0_10px_30px_-10px_rgba(246,84,86,0.12),0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-2xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Image Column */}
            <Link
              href={`/blog/${article.slug}`}
              className="lg:col-span-6 relative min-h-[320px] lg:min-h-[460px] overflow-hidden group cursor-pointer block"
            >
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url('${article.img}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navbar-black/70 via-transparent to-transparent lg:hidden" />

              {/* Badge Pilihan Redaksi */}
              <div className="absolute top-4 left-4 bg-navbar-black/85 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-surface text-label-meta font-bold shadow-md">
                <span translate="no" className="material-symbols-outlined notranslate text-accent-gold text-base">
                  stars
                </span>
                <span>Pilihan Redaksi</span>
              </div>
            </Link>

            {/* Content Column */}
            <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between bg-surface-canvas relative">
              <div className="flex flex-col gap-4">
                {/* Category & Meta */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full bg-surface-tint-light text-bracket-border font-label-meta text-xs font-bold border border-divider-tint/50">
                    {article.category}
                  </span>
                  <span className="text-text-muted font-label-meta text-xs flex items-center gap-1">
                    <span translate="no" className="material-symbols-outlined notranslate text-sm">
                      event
                    </span>
                    <span>{article.date}</span>
                  </span>
                  <span className="text-text-muted font-label-meta text-xs flex items-center gap-1">
                    <span translate="no" className="material-symbols-outlined notranslate text-sm">
                      timer
                    </span>
                    <span>{article.readTime}</span>
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-headline-xl text-2xl sm:text-3xl lg:text-[34px] font-bold text-on-surface hover:text-bracket-border transition-colors tracking-tight leading-tight">
                  <Link href={`/blog/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>

                {/* Summary */}
                <p className="font-body-md text-sm sm:text-base text-text-body leading-relaxed">
                  {article.desc}
                </p>

                {/* Technical Highlight Chips */}
                {article.technicalChips && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {article.technicalChips.map((chip, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-surface-neutral-alt text-on-surface-variant font-label-meta text-xs font-semibold border border-divider-tint/30"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Meta Footer & Action */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-8 mt-6 border-t border-surface-container-high">
                <div className="flex items-center gap-4 text-text-muted font-label-meta text-xs">
                  <span className="flex items-center gap-1">
                    <span translate="no" className="material-symbols-outlined notranslate text-base text-bracket-border">
                      account_circle
                    </span>
                    <span>{article.author}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span translate="no" className="material-symbols-outlined notranslate text-base">
                      visibility
                    </span>
                    <span>{article.views}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span translate="no" className="material-symbols-outlined notranslate text-base">
                      forum
                    </span>
                    <span>{article.commentsCount}</span>
                  </span>
                </div>

                <Link
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-bracket-border hover:bg-secondary text-on-primary font-cta-pill text-sm font-semibold shadow-[0_8px_20px_rgba(246,84,86,0.35)] transition-all transform hover:scale-[1.02] cursor-pointer"
                >
                  <span>Baca Selengkapnya</span>
                  <span translate="no" className="material-symbols-outlined notranslate text-base">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

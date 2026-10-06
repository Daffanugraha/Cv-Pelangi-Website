import React from "react";
import Link from "next/link";
import { articlesData } from "@/lib/data";

export default function BlogSection() {
  return (
    <section
      className="w-full bg-surface-neutral-alt py-space-3xl relative"
      id="blog"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-md">
          <div>
            <span className="font-label-meta text-label-meta uppercase tracking-widest text-bracket-border font-bold">
              Wawasan Percetakan
            </span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold mt-1">
              Cari Tahu Berita Terbaru
            </h2>
          </div>
          <Link
            className="font-cta-pill text-cta-pill text-bracket-border hover:text-primary inline-flex items-center gap-1 font-semibold"
            href="/blog"
          >
            <span>Lihat Semua Artikel</span>
            <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
              chevron_right
            </span>
          </Link>
        </div>

        {/* 3-Column Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {articlesData.map((art, idx) => (
            <article
              key={idx}
              className="bg-surface-canvas rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-surface-container"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={art.title}
                  src={art.img}
                />
                <span className="absolute top-space-sm right-space-sm px-space-sm py-space-2xs rounded-full bg-navbar-black/80 backdrop-blur-sm text-on-secondary font-label-meta text-label-meta font-medium">
                  {art.category || art.tag}
                </span>
              </div>

              <div className="p-space-lg flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-space-sm font-label-meta text-label-meta text-text-muted mb-2">
                    <span>{art.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span translate="no" className="material-symbols-outlined notranslate text-[14px]">
                        visibility
                      </span>{" "}
                      {art.views}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-xs group-hover:text-bracket-border transition-colors leading-snug">
                    <Link href={`/blog/${art.slug}`}>
                      {art.title}
                    </Link>
                  </h3>
                  <p className="font-body-sm text-body-sm text-text-body line-clamp-2 leading-relaxed">
                    {art.desc}
                  </p>
                </div>

                <div className="pt-space-md mt-space-md border-t border-surface-container flex items-center justify-between">
                  <Link
                    className="font-cta-pill text-cta-pill text-bracket-border group-hover:text-primary inline-flex items-center gap-1 font-semibold"
                    href={`/blog/${art.slug}`}
                  >
                    <span>Baca Selengkapnya</span>
                    <span translate="no" className="material-symbols-outlined notranslate text-[16px]">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


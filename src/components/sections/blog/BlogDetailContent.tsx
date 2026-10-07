"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArticleItem, getAllArticles } from "@/lib/data/articles";

interface BlogDetailContentProps {
  article: ArticleItem;
}

export default function BlogDetailContent({ article }: BlogDetailContentProps) {
  const [copied, setCopied] = useState(false);

  // Other related articles (excluding current article)
  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  const sidebarArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 4);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const waShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `Baca artikel menarik dari CV Pelangi UV: "${article.title}" di ${
      typeof window !== "undefined" ? window.location.href : "https://pelangiuv.com/blog/" + article.slug
    }`
  )}`;

  const waConsultText = encodeURIComponent(
    `Halo Tim Marketing CV Pelangi UV, saya membaca artikel: "${article.title}". Saya ingin konsultasi lebih lanjut terkait pengaplikasian atau pemesanan.`
  );
  const waConsultUrl = `https://wa.me/6282231019363?text=${waConsultText}`;

  return (
    <div className="w-full bg-surface-bright selection:bg-bracket-border selection:text-white min-h-screen py-8 lg:py-12">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        {/* Top Breadcrumb & Back Bar (di sebelah kiri ada blog / judulnya) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-divider-tint/50">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-text-muted font-label-meta">
            <Link
              href="/"
              className="hover:text-bracket-border transition-colors flex items-center gap-1 text-text-muted"
            >
              <span translate="no" className="material-symbols-outlined notranslate text-sm">
                home
              </span>
              <span>Beranda</span>
            </Link>
            <span translate="no" className="material-symbols-outlined notranslate text-xs text-outline-variant">
              chevron_right
            </span>
            <Link
              href="/blog"
              className="hover:text-bracket-border transition-colors font-semibold text-text-body"
            >
              Blog
            </Link>
            <span translate="no" className="material-symbols-outlined notranslate text-xs text-outline-variant">
              chevron_right
            </span>
            <span className="text-bracket-border font-bold truncate max-w-[200px] sm:max-w-md">
              {article.title}
            </span>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-canvas border border-divider-tint/60 hover:bg-surface-tint-light hover:text-bracket-border text-xs sm:text-sm font-semibold text-navbar-black transition-colors shadow-xs"
          >
            <span translate="no" className="material-symbols-outlined notranslate text-base">
              arrow_back
            </span>
            <span>Kembali ke Blog</span>
          </Link>
        </div>

        {/* 2-Column Editorial Grid: Main Content (8 cols) & Sidebar (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Article Content Column */}
          <main className="lg:col-span-8 flex flex-col gap-6">
            {/* Category Pill & Meta */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-surface-tint-light text-bracket-border font-label-meta text-xs font-bold border border-divider-tint/60 shadow-xs">
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
              <span className="text-text-muted font-label-meta text-xs flex items-center gap-1">
                <span translate="no" className="material-symbols-outlined notranslate text-sm">
                  visibility
                </span>
                <span>{article.views}</span>
              </span>
            </div>

            {/* Article Headline */}
            <h1 className="font-headline-xl text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-navbar-black tracking-tight leading-tight">
              {article.title}
            </h1>

            {/* Author Byline */}
            <div className="flex items-center gap-3 py-3 border-y border-divider-tint/40">
              <div className="w-10 h-10 rounded-full bg-bracket-border/15 text-bracket-border flex items-center justify-center font-bold">
                <span translate="no" className="material-symbols-outlined notranslate text-xl">
                  account_circle
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-navbar-black leading-tight">
                  {article.author}
                </p>
                <p className="text-xs text-text-muted">
                  Spesialis Finishing &amp; Konsultan Grafika CV Pelangi UV
                </p>
              </div>
            </div>

            {/* Featured Image Banner */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-lg border border-divider-tint/50 bg-surface-container">
              <img
                src={article.img}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Technical Chips if available */}
            {article.technicalChips && article.technicalChips.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider mr-1">
                  Topik &amp; Spesifikasi:
                </span>
                {article.technicalChips.map((chip, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1 rounded-lg bg-surface-canvas text-bracket-border font-label-meta text-xs font-semibold border border-divider-tint/60 shadow-2xs"
                  >
                    #{chip}
                  </span>
                ))}
              </div>
            )}

            {/* Key Takeaways Highlight Box */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <div className="p-6 rounded-3xl bg-surface-tint-light/60 border border-divider-tint/70 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-bracket-border font-bold text-xs uppercase tracking-wider">
                  <span translate="no" className="material-symbols-outlined notranslate text-[20px]">
                    verified
                  </span>
                  <span>Poin Penting &amp; Ringkasan Teknis</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-text-body font-body-md">
                  {article.keyTakeaways.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-bracket-border mt-2 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Content Paragraphs */}
            <div className="space-y-5 text-base sm:text-lg text-text-body leading-relaxed font-body-md pt-2">
              {article.content.map((paragraph, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Share and Interactive Footer Bar */}
            <div className="mt-8 pt-6 border-t border-divider-tint/60 flex flex-wrap items-center justify-between gap-4 bg-surface-canvas p-6 rounded-2xl shadow-xs border">
              <span className="font-label-meta text-xs sm:text-sm font-bold text-navbar-black flex items-center gap-2">
                <span translate="no" className="material-symbols-outlined notranslate text-bracket-border text-lg">
                  share
                </span>
                Bagikan Artikel Ini:
              </span>

              <div className="flex items-center gap-2.5">
                <a
                  href={waShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-action-whatsapp hover:bg-action-whatsapp-hover text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
                >
                  <span translate="no" className="material-symbols-outlined notranslate text-base">
                    chat
                  </span>
                  <span>WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-neutral-alt hover:bg-surface-tint-light text-text-body hover:text-bracket-border border border-divider-tint/60 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                >
                  <span translate="no" className="material-symbols-outlined notranslate text-base">
                    {copied ? "check" : "link"}
                  </span>
                  <span>{copied ? "Tautan Disalin!" : "Salin Link"}</span>
                </button>
              </div>
            </div>
          </main>

          {/* Sidebar Column (4 cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-8 lg:sticky lg:top-28">
            {/* Consultation Widget */}
            <div className="p-6 rounded-3xl bg-navbar-black text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-bracket-border/20 rounded-bl-full pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <span className="px-3 py-1 rounded-full bg-bracket-border/20 text-bracket-border font-label-meta text-[11px] font-bold uppercase tracking-wider border border-bracket-border/40 inline-block">
                  Konsultasi Gratis
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-headline-sm leading-snug">
                  Butuh Solusi Finishing atau Sampel Cetak?
                </h3>
                <p className="text-xs sm:text-sm text-surface-container-high leading-relaxed">
                  Hubungi tim teknisi CV Pelangi UV untuk uji coba sampel swatch Spot UV, Hot Stamp Foil, dan Laminasi di workshop Anda.
                </p>
                <a
                  href={waConsultUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-bracket-border hover:bg-primary text-white font-cta-pill text-sm font-semibold shadow-md transition-all cursor-pointer"
                >
                  <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                    chat
                  </span>
                  <span>Konsultasi Cepat via WA</span>
                </a>
              </div>
            </div>

            {/* Other Popular Articles */}
            <div className="p-6 rounded-3xl bg-surface-canvas border border-divider-tint/60 shadow-xs space-y-4">
              <h3 className="font-headline-sm text-base sm:text-lg font-bold text-navbar-black border-l-3 border-bracket-border pl-2.5">
                Artikel &amp; Panduan Lainnya
              </h3>

              <div className="divide-y divide-divider-tint/40">
                {sidebarArticles.map((sArt) => (
                  <Link
                    key={sArt.id}
                    href={`/blog/${sArt.slug}`}
                    className="py-3.5 first:pt-1 last:pb-1 flex items-start gap-3 group"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-divider-tint/40">
                      <img
                        src={sArt.img}
                        alt={sArt.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold text-bracket-border uppercase block">
                        {sArt.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-navbar-black group-hover:text-bracket-border transition-colors line-clamp-2 leading-snug">
                        {sArt.title}
                      </h4>
                      <span className="text-[11px] text-text-muted mt-0.5 block">
                        {sArt.date}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t border-divider-tint/60">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="font-label-meta text-xs text-bracket-border font-bold uppercase tracking-wider block mb-1">
                  Rekomendasi Bacaan
                </span>
                <h3 className="font-headline-lg text-xl sm:text-2xl font-bold text-navbar-black">
                  Artikel Pilihan Terkait
                </h3>
              </div>
              <Link
                href="/blog"
                className="text-xs sm:text-sm font-bold text-bracket-border hover:underline flex items-center gap-1"
              >
                <span>Lihat Semua Artikel</span>
                <span translate="no" className="material-symbols-outlined notranslate text-sm">
                  arrow_forward
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rArt) => (
                <Link
                  key={rArt.id}
                  href={`/blog/${rArt.slug}`}
                  className="rounded-3xl bg-surface-canvas overflow-hidden border border-divider-tint/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                    <img
                      src={rArt.img}
                      alt={rArt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <span className="text-[11px] text-text-muted block mb-1.5">
                        <span className="text-bracket-border font-bold mr-1">{rArt.category}</span>• {rArt.date} • {rArt.views}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-navbar-black group-hover:text-bracket-border transition-colors line-clamp-2 leading-snug mb-2">
                        {rArt.title}
                      </h4>
                      <p className="text-xs text-text-body line-clamp-2 leading-relaxed">
                        {rArt.desc}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-surface-container-high flex items-center justify-between text-xs font-semibold text-bracket-border">
                      <span>Baca Selengkapnya</span>
                      <span translate="no" className="material-symbols-outlined notranslate text-sm">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

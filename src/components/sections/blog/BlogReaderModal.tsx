"use client";

import React, { useEffect } from "react";
import { ArticleItem } from "@/lib/data/articles";

interface BlogReaderModalProps {
  article: ArticleItem | null;
  onClose: () => void;
}

export default function BlogReaderModal({
  article,
  onClose,
}: BlogReaderModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && article) {
        onClose();
      }
    };
    if (article) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  const waText = encodeURIComponent(
    `Halo Tim Ahli CV Pelangi UV, saya baru membaca artikel blog: "${article.title}". Saya ingin konsultasi lebih lanjut terkait teknik finishing/mesin tersebut.`
  );
  const waUrl = `https://wa.me/6282231019363?text=${waText}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navbar-black/80 backdrop-blur-sm transition-all duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-surface-canvas rounded-[24px] sm:rounded-[32px] shadow-2xl border border-divider-tint/60 overflow-hidden flex flex-col max-h-[92vh] text-on-surface"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 sm:px-8 py-4 border-b border-surface-container bg-surface-neutral-alt/60 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-surface-tint-light text-bracket-border font-label-meta text-xs font-bold border border-divider-tint/60">
              {article.category}
            </span>
            <span className="text-text-muted font-label-meta text-xs hidden sm:inline-block">
              {article.date} • {article.readTime}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Artikel"
            className="w-9 h-9 rounded-full bg-surface-canvas border border-outline-variant hover:bg-bracket-border hover:text-white text-on-surface flex items-center justify-center transition-all cursor-pointer shadow-sm"
          >
            <span translate="no" className="material-symbols-outlined notranslate text-[20px]">
              close
            </span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1 text-left">
          {/* Title */}
          <h1 className="font-headline-xl text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-navbar-black tracking-tight leading-tight">
            {article.title}
          </h1>

          {/* Author & Stats Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-text-muted pb-4 border-b border-divider-tint/40">
            <span className="flex items-center gap-1.5 font-semibold text-navbar-black">
              <span translate="no" className="material-symbols-outlined notranslate text-base text-bracket-border">
                account_circle
              </span>
              {article.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span translate="no" className="material-symbols-outlined notranslate text-base">
                visibility
              </span>
              {article.views}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span translate="no" className="material-symbols-outlined notranslate text-base">
                forum
              </span>
              {article.commentsCount}
            </span>
          </div>

          {/* Article Featured Photo */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-surface-container shadow-md border border-divider-tint/50">
            <img
              src={article.img}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Technical Highlight Chips if present */}
          {article.technicalChips && article.technicalChips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider mr-1">
                Fokus Spesifikasi:
              </span>
              {article.technicalChips.map((chip, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-surface-tint-light text-bracket-border font-label-meta text-xs font-bold border border-divider-tint/50"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}

          {/* Key Takeaways Box */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-surface-tint-light/40 border border-divider-tint/60 space-y-2.5">
              <div className="flex items-center gap-2 text-bracket-border font-bold text-xs uppercase tracking-wider">
                <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                  verified
                </span>
                <span>Poin Penting &amp; Kesimpulan Teknis:</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-text-body">
                {article.keyTakeaways.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-bracket-border mt-2 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Full Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-text-body leading-relaxed font-body-md pt-2">
            {article.content.map((p, pIdx) => (
              <p key={pIdx} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Modal Footer Call to Action */}
        <div className="px-5 sm:px-8 py-4 border-t border-surface-container bg-surface-neutral-alt flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <p className="text-xs sm:text-sm text-text-muted text-center sm:text-left">
            Butuh konsultasi teknis seputar formulasi cetak atau uji coba sampel gratis?
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-surface-canvas border border-outline-variant hover:bg-surface-container text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Tutup
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-action-whatsapp hover:bg-action-whatsapp-hover text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer"
            >
              <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                chat
              </span>
              <span>Tanya Engineer via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

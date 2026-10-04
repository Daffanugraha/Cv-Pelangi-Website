"use client";

import React, { useState, useEffect } from "react";
import { MaterialCategory } from "@/lib/data/rawMaterials";

interface BahanBakuPricelistModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: "opp" | "foil" | "lem" | "spotuv";
  categories: MaterialCategory[];
  onRequestSample: (categoryKey?: "opp" | "foil" | "lem" | "spotuv") => void;
}

export default function BahanBakuPricelistModal({
  isOpen,
  onClose,
  initialCategory = "opp",
  categories,
  onRequestSample,
}: BahanBakuPricelistModalProps) {
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    setFilterQuery("");
  }, [initialCategory, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentCategory =
    categories.find((c) => c.id === initialCategory) || categories[0];

  const filteredItems = currentCategory.items.filter((item) =>
    item.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const waText = encodeURIComponent(
    `Halo Pelangi UV Bizpark, saya ingin konfirmasi pricelist & order grosir untuk kategori: ${currentCategory.title}.`
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
        className="relative w-full max-w-4xl bg-surface-canvas rounded-[24px] sm:rounded-[28px] shadow-2xl border border-divider-tint/60 overflow-hidden flex flex-col max-h-[92vh] text-on-surface"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-surface-container bg-surface-tint-light/40 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-bracket-border text-on-primary flex items-center justify-center shadow-sm shrink-0">
              <span translate="no" className="material-symbols-outlined notranslate text-[22px] notranslate">
                inventory_2
              </span>
            </div>
            <div>
              <h3 className="font-headline-sm text-base sm:text-headline-sm text-on-surface leading-tight font-bold">
                Detail &amp; Pricelist: <span translate="no" className="notranslate">{currentCategory.title}</span>
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Modal"
            className="w-9 h-9 rounded-full bg-surface-canvas border border-outline-variant hover:bg-bracket-border hover:text-on-primary text-on-surface flex items-center justify-center transition-all cursor-pointer shadow-sm"
          >
            <span translate="no" className="material-symbols-outlined notranslate text-[20px] notranslate">
              close
            </span>
          </button>
        </div>

        {/* Modal Body Content (Scrollable) */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Material Characteristic Banner */}
          <div className="p-3.5 sm:p-4 bg-surface-tint-light/50 rounded-2xl border border-divider-tint/60">
            <span className="text-primary font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span translate="no" className="material-symbols-outlined notranslate text-[16px] notranslate">
                info
              </span>
              Karakteristik &amp; Deskripsi {currentCategory.title}:
            </span>
            <p className="font-body-sm text-xs sm:text-[13px] text-text-body leading-relaxed">
              {currentCategory.fullDesc}
            </p>
            <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-divider-tint/40">
              {currentCategory.specsHighlight.map((spec, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2.5 py-0.5 rounded-md bg-surface-canvas text-on-surface text-[11px] font-medium border border-divider-tint/40"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Filter Box */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-neutral-alt rounded-xl border border-outline-variant/70">
            <span translate="no" className="material-symbols-outlined notranslate text-[18px] text-text-muted notranslate">
              search
            </span>
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder={`Saring produk dalam kategori ${currentCategory.title}...`}
              className="w-full bg-transparent border-none text-xs sm:text-sm focus:outline-none text-on-surface placeholder-text-muted"
            />
            {filterQuery && (
              <button
                type="button"
                onClick={() => setFilterQuery("")}
                className="text-xs text-text-muted hover:text-on-surface"
              >
                Clear
              </button>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-outline-variant shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm font-body-sm">
              <thead className="bg-surface-neutral-alt text-on-surface font-label-nav text-xs border-b border-outline-variant uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">No</th>
                  <th className="py-3 px-4">Nama Produk / Spesifikasi</th>
                  <th className="py-3 px-4">Satuan</th>
                  <th className="py-3 px-4 text-right font-bold">Harga Grosir</th>
                  <th className="py-3 px-4 text-center w-20">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/60">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-text-muted text-xs">
                      Tidak ada produk yang cocok dengan pencarian &quot;{filterQuery}&quot;.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item, idx) => {
                    const itemWaText = encodeURIComponent(
                      `Halo Pelangi UV Bizpark, saya ingin pesan: ${item.name} (${item.unit}) seharga ${item.price}. Mohon info stok.`
                    );
                    const itemWaUrl = `https://wa.me/6282231019363?text=${itemWaText}`;

                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-surface-tint-light/40 transition-colors"
                      >
                        <td className="py-2.5 px-4 font-mono text-text-muted text-center text-xs">
                          {String(idx + 1).padStart(2, "0")}
                        </td>
                        <td className="py-2.5 px-4 font-medium text-on-surface">
                          <span translate="no" className="notranslate">{item.name}</span>
                        </td>
                        <td className="py-2.5 px-4 text-text-muted text-xs">
                          {item.unit}
                        </td>
                        <td className="py-2.5 px-4 text-right font-bold text-bracket-border whitespace-nowrap">
                          {item.price}
                        </td>
                        <td className="py-2.5 px-4 text-center">
                          <a
                            href={itemWaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-action-whatsapp/15 text-action-whatsapp hover:bg-action-whatsapp hover:text-white text-[11px] font-medium transition-colors"
                            title="Order item ini via WhatsApp"
                          >
                            <span translate="no" className="material-symbols-outlined notranslate text-[13px] notranslate">
                              chat
                            </span>
                            Order
                          </a>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* NB Note */}
          <div className="p-3 bg-surface-neutral-alt rounded-xl border border-divider-tint flex items-start gap-2.5">
            <span translate="no" className="material-symbols-outlined notranslate text-bracket-border text-[20px] shrink-0 mt-0.5 notranslate">
              warning
            </span>
            <div className="text-xs text-text-body font-body-sm leading-relaxed">
              <p className="font-semibold text-bracket-border">
                *NB : Harga dapat berubah sewaktu-waktu
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3.5 border-t border-surface-container bg-surface-neutral-alt flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              onClose();
              onRequestSample(currentCategory.id);
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-outline-variant text-on-surface hover:bg-surface-canvas font-label-nav text-xs sm:text-[13px] text-center transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span translate="no" className="material-symbols-outlined notranslate text-[16px] text-bracket-border notranslate">
              mail
            </span>
            Minta Sampel Gratis
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high font-label-nav text-xs sm:text-[13px] transition-all cursor-pointer"
            >
              Tutup
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-action-whatsapp hover:bg-action-whatsapp-hover text-on-primary font-cta-pill text-xs sm:text-cta-pill shadow-sm transition-all"
            >
              <span translate="no" className="material-symbols-outlined notranslate text-[17px] notranslate">
                chat
              </span>
              <span>Pesan via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

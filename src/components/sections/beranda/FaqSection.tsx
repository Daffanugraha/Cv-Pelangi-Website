"use client";

import React, { useState } from "react";
import { faqData } from "@/lib/data";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      className="w-full bg-surface-neutral-alt py-12 relative overflow-hidden"
      id="faq"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="absolute -left-24 top-10 w-96 h-96 rounded-full bg-surface-tint-light filter blur-3xl opacity-70 pointer-events-none"></div>
      <div className="absolute -right-24 bottom-10 w-96 h-96 rounded-full bg-bracket-border/5 filter blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-gutter relative z-10">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2.5 h-1 bg-bracket-border rounded-full"></span>
            <span className="font-label-meta text-label-meta text-bracket-border font-bold uppercase tracking-widest">
              FAQ Singkat
            </span>
            <span className="w-2.5 h-1 bg-bracket-border rounded-full"></span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold mt-1">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="font-body-sm text-body-sm text-text-muted mt-1.5">
            3 informasi esensial seputar layanan finishing, pengiriman, dan sampel{" "}
            <span translate="no" className="notranslate">CV Pelangi UV</span>.
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-3">
          {faqData.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`bg-surface-canvas rounded-xl border shadow-sm transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-bracket-border shadow-md"
                    : "border-divider-tint/50"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-headline-sm text-[15px] sm:text-[16px] font-bold text-on-surface flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-bracket-border/10 text-bracket-border flex items-center justify-center text-[12px] font-black shrink-0">
                      {item.num}
                    </span>
                    {item.question}
                  </span>
                  <span
                    translate="no" className={`material-symbols-outlined notranslate text-bracket-border text-[22px] transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-text-body font-body-sm text-[14px] leading-relaxed border-t border-surface-container/80 transition-all duration-300">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Technical Support Callout */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-surface-canvas border border-bracket-border/20 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-bracket-border/10 text-bracket-border flex items-center justify-center shrink-0">
              <span translate="no" className="material-symbols-outlined notranslate text-[22px]">
                contact_support
              </span>
            </div>
            <div>
              <h4 className="font-headline-sm text-[15px] font-bold text-on-surface">
                Ada pertanyaan teknis finishing lainnya?
              </h4>
              <p className="font-body-sm text-[12px] text-text-muted">
                Tim konsultan spesifikasi percetakan kami siap membantu kalkulasi
                Anda.
              </p>
            </div>
          </div>
          <a
            className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-action-whatsapp hover:bg-action-whatsapp-hover text-on-primary font-cta-pill text-[13px] transition-all duration-200 shadow-md shrink-0"
            href={`https://wa.me/6282231019363?text=${encodeURIComponent(
              "Halo Tim Marketing CV Pelangi UV,\n\nSaya [Nama] dari [Perusahaan], mau tanya tentang spesifikasi teknis finishing cetak:\n- Jenis Layanan: \n- Pertanyaan / Spesifikasi: \n\nMohon bantuannya. Terima kasih!"
            )}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span translate="no" className="material-symbols-outlined notranslate text-[16px]">chat</span>
            <span>Tanya CS WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}

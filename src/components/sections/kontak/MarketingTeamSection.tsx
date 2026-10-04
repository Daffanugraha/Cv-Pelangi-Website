"use client";

import React, { useState, useEffect } from "react";
import { marketingTeam, MarketingMember } from "@/lib/data";

export default function MarketingTeamSection() {
  const [selectedPic, setSelectedPic] = useState<MarketingMember | null>(null);
  const [copied, setCopied] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedPic) {
        setSelectedPic(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPic]);

  const handleCopy = (phone: string) => {
    navigator.clipboard.writeText(phone).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section
      className="w-full bg-[#faf7f6] py-16 lg:py-20 border-b border-slate-200/80"
      id="section-tim-marketing"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-headline-xl text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tim Marketing Kami
          </h2>
          <p className="text-slate-600 font-body-sm text-sm sm:text-base mt-2.5 leading-relaxed">
            Hubungi perwakilan Marketing &amp; Sales Executive spesialis produk
            kami secara langsung untuk respon cepat dan konsultasi spesifikasi
            cetak.
          </p>
        </div>

        {/* 3 Marketing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {marketingTeam.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 pb-2">
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 mb-5 shadow-xs">
                  <img
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    src={member.imgSrc}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-headline-sm text-lg font-bold text-slate-900">
                    {member.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-secondary text-xs font-label-meta font-semibold">
                    {member.role}
                  </span>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-2.5 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPic(member);
                    setCopied(false);
                  }}
                  className="w-full py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-label-nav font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer active:scale-95"
                >
                  <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                    chat
                  </span>{" "}
                  Hubungi via WhatsApp
                </button>
                <a
                  className="w-full py-2.5 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-label-nav font-medium flex items-center justify-center gap-1.5 transition-colors"
                  href={`tel:${member.phoneRaw.replace("+", "")}`}
                >
                  <span translate="no" className="material-symbols-outlined notranslate text-[16px]">
                    call
                  </span>{" "}
                  {member.phoneDisplay}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PIC WHATSAPP POP-UP MODAL DIALOG */}
      {selectedPic && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedPic(null);
          }}
        >
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative transform transition-all duration-300 scale-100 opacity-100 animate-in fade-in zoom-in-95">
            {/* Header Modal */}
            <div className="bg-gradient-to-r from-navbar-dark to-slate-900 p-6 text-white relative">
              <button
                type="button"
                onClick={() => setSelectedPic(null)}
                aria-label="Tutup Dialog"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[20px]">
                  close
                </span>
              </button>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={selectedPic.imgSrc}
                    alt={selectedPic.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-emerald-400"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-label-meta font-semibold mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />{" "}
                    PIC Marketing Aktif
                  </div>
                  <h3 className="font-headline-sm text-lg font-bold text-white leading-snug">
                    {selectedPic.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-body-sm">
                    {selectedPic.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Body Modal */}
            <div className="p-6 space-y-5">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-label-meta font-semibold text-slate-500 uppercase tracking-wider">
                    Nomor WhatsApp Resmi PIC:
                  </span>
                  {copied && (
                    <span className="text-[11px] font-label-meta text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
                      Nomor tersalin!
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span translate="no" className="material-symbols-outlined notranslate text-emerald-600 text-[22px]">
                      chat
                    </span>
                    <span className="font-headline-sm text-base font-extrabold text-slate-900 tracking-tight">
                      {selectedPic.phoneDisplay}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(selectedPic.phoneDisplay)}
                    className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-label-meta font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span translate="no" className="material-symbols-outlined notranslate text-[16px]">
                      content_copy
                    </span>{" "}
                    {copied ? "Tersalin" : "Salin"}
                  </button>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                <a
                  href={`https://wa.me/${selectedPic.phoneRaw}?text=${encodeURIComponent(
                    selectedPic.prefillText
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-cta-pill text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all cursor-pointer"
                >
                  <span translate="no" className="material-symbols-outlined notranslate text-[20px]">
                    send
                  </span>{" "}
                  Mulai Chat WhatsApp Sekarang
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedPic(null)}
                  className="w-full py-2.5 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-label-nav text-xs font-medium transition-colors cursor-pointer"
                >
                  Tutup Dialog
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import React from "react";

export interface GoogleReviewItem {
  id: string;
  name: string;
  avatarText: string;
  rating: number;
  timeAgo: string;
  reviewCount: string;
  text: string;
  responseOwner?: string;
  highlightTag: string;
}

export const TOP_GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: "rev-1",
    name: "Arif B. Ramadhan",
    avatarText: "AB",
    rating: 5,
    timeAgo: "Ulasan Terverifikasi Google",
    reviewCount: "4 ulasan · 7 foto",
    text: "Pelayanan cepat dan responsive oleh admin. Harga cukup terjangkau tapi hasil tetap berkualitas. Recomended buat bisnis yang baru berjalan dan butuh jasa finishing 👍👍👍",
    responseOwner: "Hi Kak, terima kasih atas ulasan positifnya ya! :)",
    highlightTag: "Pelayanan Cepat & Responsif",
  },
  {
    id: "rev-2",
    name: "Dicky Bagus",
    avatarText: "DB",
    rating: 5,
    timeAgo: "Ulasan Terverifikasi Google",
    reviewCount: "1 ulasan · 1 foto",
    text: "Pelayanan baik dan bahan bakunya sangat berkualitas. Joss markotop 😁",
    responseOwner: "Terima kasih atas ulasan positifnya kak!",
    highlightTag: "Bahan Baku & Pelayanan Prima",
  },
  {
    id: "rev-3",
    name: "Novi Ana",
    avatarText: "NA",
    rating: 5,
    timeAgo: "Ulasan Terverifikasi Google",
    reviewCount: "3 ulasan · 1 foto",
    text: "Pelayanan oke banget..... Armadanya banyak dan delivery Ontime 👍👍👍",
    responseOwner: "Hi Kak, terima kasih atas ulasan positifnya ya! :)",
    highlightTag: "Armada Banyak & Delivery On-Time",
  },
];

export default function ContactTestimonialsSection() {
  return (
    <section
      className="w-full py-16 lg:py-24 text-white relative bg-[#0c0d0e] border-y border-white/10"
      id="section-testimoni"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>Google Maps Verified Reviews</span>
          </div>
          <h2 className="font-headline-xl text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Ulasan Kepuasan Pelayanan <span className="text-bracket-border">CV Pelangi UV</span>
          </h2>
          <p className="text-zinc-400 font-body-sm text-sm sm:text-base mt-3 leading-relaxed">
            Transparansi penilaian langsung dari para pemilik bisnis dan mitra percetakan se-Jawa Timur di Google Maps Business Profile.
          </p>
        </div>

        {/* 2-Column Layout: Kiri Rating Card (SS Profile) | Kanan 1x3 Review Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* SISI KIRI: Google Rating Showcase Card (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="h-full bg-[#141518] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
              {/* Top Accent Glow */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-bracket-border via-[#25D366] to-[#4285F4]" />

              {/* Brand & Maps Badge */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-6 pb-5 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    {/* Google 'G' Styled Badge */}
                    <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-md shrink-0">
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-sm font-bold text-white">
                        CV PELANGI UV
                      </h3>
                      <p className="text-[11px] text-zinc-400">
                        Jasa Finishing &amp; Supplier Bahan Baku
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                    Google Maps
                  </span>
                </div>

                {/* Score Big Display */}
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-5xl sm:text-6xl font-black font-headline-xl text-white tracking-tight">
                    4,5
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center text-amber-400">
                      {[1, 2, 3, 4].map((star) => (
                        <span
                          key={star}
                          translate="no"
                          className="material-symbols-outlined notranslate text-[22px] fill-current"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                      ))}
                      <span
                        translate="no"
                        className="material-symbols-outlined notranslate text-[22px] fill-current"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star_half
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 font-medium">
                      Berdasarkan <strong className="text-white">91 ulasan</strong> publik
                    </p>
                  </div>
                </div>

                {/* Rating Distribution Bars */}
                <div className="space-y-1.5 pt-3 pb-6 border-b border-white/10 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="w-3 text-right">5</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: "82%" }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 text-right">4</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: "12%" }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 text-right">3</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: "3%" }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 text-right">2</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: "1%" }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 text-right">1</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: "2%" }} />
                    </div>
                  </div>
                </div>

                {/* Top Mentioned Topics */}
                <div className="pt-4">
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-2.5">
                    Topik yang Sering Disebut:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-bracket-border/20 text-white font-medium text-xs border border-bracket-border/40">
                      Pelayanan (11)
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/5 text-zinc-300 text-xs border border-white/10">
                      Harga (5)
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/5 text-zinc-300 text-xs border border-white/10">
                      Pengiriman (2)
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/5 text-zinc-300 text-xs border border-white/10">
                      Kualitas (2)
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/5 text-zinc-300 text-xs border border-white/10">
                      Profesional (2)
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom CTA to View Google Maps */}
              <div className="pt-6 mt-6 border-t border-white/10">
                <a
                  href="https://www.google.com/maps/place/CV+PELANGI+UV+-+Jasa+Finishing+Percetakan+%26+Suplier+Bahan+Baku+Finishing+Cetak/@-7.3633984,112.7802609,17z/data=!4m8!3m7!1s0x2dd7e53c2202811f:0xf4b0972c649cd75a!8m2!3d-7.3633984!4d112.7802609!9m1!1b1!16s%2Fg%2F11c5qrf1zm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 border border-white/10 transition-colors"
                >
                  <span>Buka Halaman Google Maps Resmi</span>
                  <span translate="no" className="material-symbols-outlined notranslate text-[16px]">
                    open_in_new
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* SISI KANAN: 1x3 Stacked Review Cards (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            {TOP_GOOGLE_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#141518] rounded-2xl p-6 border border-white/10 hover:border-bracket-border/40 transition-all duration-300 shadow-lg flex flex-col justify-between gap-4"
              >
                <div>
                  {/* Review Header: User Info & Star Rating */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-bracket-border/20 text-bracket-border font-extrabold text-sm flex items-center justify-center border border-bracket-border/30 shrink-0">
                        {rev.avatarText}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-tight">
                          {rev.name}
                        </h4>
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          {rev.reviewCount}
                        </p>
                      </div>
                    </div>

                    {/* Star Rating & Badge */}
                    <div className="text-right shrink-0">
                      <div className="flex text-amber-400 justify-end">
                        {[...Array(rev.rating)].map((_, i) => (
                          <span
                            key={i}
                            translate="no"
                            className="material-symbols-outlined notranslate text-[16px] fill-current"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                        ))}
                      </div>
                      <span className="inline-block text-[10px] text-emerald-400 font-medium mt-0.5">
                        Bintang 5 ★
                      </span>
                    </div>
                  </div>

                  {/* Highlight Pill */}
                  <div className="mb-2.5">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-white/5 text-[11px] font-semibold text-zinc-300 border border-white/10">
                      {rev.highlightTag}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>

                {/* Owner Reply Box (Tanggapan Pemilik) */}
                {rev.responseOwner && (
                  <div className="p-3 rounded-xl bg-white/[0.03] border-l-2 border-bracket-border text-[11px] text-zinc-400 space-y-0.5">
                    <span className="font-semibold text-zinc-200 block">
                      Tanggapan CV Pelangi UV:
                    </span>
                    <p className="leading-snug">{rev.responseOwner}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

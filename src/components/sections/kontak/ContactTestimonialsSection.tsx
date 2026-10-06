"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { contactTestimonials, ContactTestimonial } from "@/lib/data";

export default function ContactTestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = contactTestimonials.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % total);
      }, 4500);
    }
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [total]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  return (
    <section
      className="w-full py-16 lg:py-20 text-white relative bg-gradient-to-b from-slate-900 to-[#0B0B0B] border-y border-slate-800"
      id="section-testimoni"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="font-headline-xl text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Testimoni Pelanggan <span translate="no" className="notranslate">CV Pelangi UV</span>
          </h2>
          <p className="text-slate-300 font-body-sm text-sm sm:text-base mt-2.5 leading-relaxed">
            Apa kata para pemilik percetakan, penerbit, dan packaging house
            mengenai keandalan finishing cetak presisi serta suplai bahan baku
            prima dari <span translate="no" className="notranslate">CV Pelangi UV</span>.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          onMouseEnter={stopTimer}
          onMouseLeave={startTimer}
          className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-2xl relative"
        >
          <div className="relative overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500 ease-out w-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {contactTestimonials.map((item, idx) => (
                <div key={idx} className="w-full shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Visual Media Column (Left) */}
                    <div className="lg:col-span-5 relative">
                      {item.type === "image" && (
                        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
                          <img
                            src={item.img}
                            alt={item.author}
                            className="w-full h-[320px] sm:h-[380px] lg:h-[400px] object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-white/20 shadow-lg">
                            <div className="flex items-center gap-2 mb-0.5">
                              <div className="flex text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                  <span
                                    key={i}
                                    translate="no" className="material-symbols-outlined notranslate text-[16px]"
                                  >
                                    star
                                  </span>
                                ))}
                              </div>
                              <span className="text-xs font-bold text-slate-800 font-label-meta">
                                {item.overlayTitle}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 font-body-sm italic leading-snug">
                              {item.overlayDesc}
                            </p>
                          </div>
                        </div>
                      )}

                      {item.type === "whatsapp" && (
                        <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-[#075E54] text-white">
                          <div className="bg-[#075E54] px-4 py-3 flex items-center justify-between border-b border-white/10">
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                                <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                                  {item.contactIcon || "support_agent"}
                                </span>
                              </div>
                              <div>
                                <div className="flex items-center gap-1">
                                  <p className="text-xs font-bold leading-tight">
                                    {item.contactName}
                                  </p>
                                  <span translate="no" className="material-symbols-outlined notranslate text-emerald-400 text-[14px]">
                                    verified
                                  </span>
                                </div>
                                <p className="text-[10px] text-emerald-200">
                                  {item.contactStatus}
                                </p>
                              </div>
                            </div>
                            <span translate="no" className="material-symbols-outlined notranslate text-[18px] text-white/80">
                              more_vert
                            </span>
                          </div>

                          <div className="p-4 bg-[#ECE5DD] space-y-3 min-h-[280px] sm:min-h-[320px] flex flex-col justify-center text-slate-800">
                            {item.chatMessages?.map((msg, mIdx) => (
                              <div
                                key={mIdx}
                                className={
                                  msg.from === "sales"
                                    ? "self-start bg-white p-3 rounded-xl rounded-tl-none max-w-[88%] shadow-xs border border-slate-200 text-xs font-body-sm"
                                    : "self-end bg-[#DCF8C6] p-3 rounded-xl rounded-tr-none max-w-[88%] shadow-xs text-xs font-body-sm"
                                }
                              >
                                <p
                                  className={
                                    msg.from === "client"
                                      ? "text-slate-800 leading-snug font-medium"
                                      : "text-slate-800 leading-snug"
                                  }
                                >
                                  {msg.text}
                                </p>
                                <div className="flex items-center justify-end gap-1 mt-1">
                                  <span className="text-[9px] text-slate-400">
                                    {msg.time}
                                  </span>
                                  {msg.from === "client" && (
                                    <span translate="no" className="material-symbols-outlined notranslate text-blue-600 text-[13px]">
                                      done_all
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.type === "technical" && (
                        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-800">
                          <div className="w-full h-[320px] sm:h-[380px] lg:h-[400px] bg-gradient-to-br from-slate-800 to-slate-900 p-6 flex flex-col justify-between text-white">
                            <div className="space-y-3">
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 text-xs font-label-meta font-semibold">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />{" "}
                                {item.cardTag}
                              </div>
                              <h4 className="font-headline-sm text-lg font-bold">
                                {item.cardTitle}
                              </h4>
                              <p className="text-xs text-slate-300 leading-relaxed font-body-sm">
                                {item.cardDesc}
                              </p>
                            </div>
                            <div className="space-y-2 bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/10">
                              {item.metrics?.map((m, mIdx) => (
                                <div
                                  key={mIdx}
                                  className="flex items-center justify-between text-xs"
                                >
                                  <span className="text-slate-300">
                                    {m.label}
                                  </span>
                                  <span className={`${m.color} font-bold`}>
                                    {m.val}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Floating Badge Tag */}
                      <span className="hidden sm:inline-flex items-center gap-1.5 absolute -top-3 -left-3 bg-secondary-container text-white px-3.5 py-1.5 rounded-full text-xs font-label-meta font-bold shadow-md">
                        <span translate="no" className="material-symbols-outlined notranslate text-[15px]">
                          {item.type === "whatsapp"
                            ? "chat"
                            : item.type === "technical"
                            ? "psychology"
                            : "verified"}
                        </span>{" "}
                        {item.badge}
                      </span>
                    </div>

                    {/* Testimonial Content Column (Right) */}
                    <div className="lg:col-span-7 space-y-5">
                      <div className="relative bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100 min-h-[220px] flex flex-col justify-between">
                        <span translate="no" className="material-symbols-outlined notranslate text-secondary-container/20 text-4xl absolute top-3 right-4 select-none">
                          format_quote
                        </span>
                        <p className="font-body-md text-sm sm:text-base text-slate-700 leading-relaxed relative z-10 italic">
                          {item.quote}
                        </p>

                        <div className="mt-4 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-secondary-container/10 text-secondary-container font-bold flex items-center justify-center font-headline-sm text-sm border border-secondary-container/20">
                              {item.initials}
                            </div>
                            <div>
                              <p className="font-headline-sm text-sm sm:text-base font-bold text-slate-900">
                                {item.author}
                              </p>
                              <p className="text-xs font-body-sm text-slate-500">
                                {item.role}
                              </p>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1 text-[11px] font-label-meta text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{" "}
                            {item.partnershipBadge}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls & Dots */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100 mt-6">
            <div className="flex items-center gap-2">
              {contactTestimonials.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setCurrentIndex(dotIdx)}
                  aria-label={`Testimoni ${dotIdx + 1}`}
                  className={`transition-all cursor-pointer ${
                    dotIdx === currentIndex
                      ? "w-7 h-2 rounded-full bg-secondary-container"
                      : "w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Testimoni Sebelumnya"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors border border-slate-200 cursor-pointer active:scale-95"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                  chevron_left
                </span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Testimoni Selanjutnya"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors border border-slate-200 cursor-pointer active:scale-95"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                  chevron_right
                </span>
              </button>
            </div>
          </div>

          {/* Highlights / Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <p
                translate="no"
                className="notranslate font-headline-sm text-lg sm:text-xl font-extrabold text-slate-900"
              >
                1.500+
              </p>
              <p className="text-xs font-label-meta text-slate-500 mt-0.5">
                Percetakan Bermitra
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <p
                translate="no"
                className="notranslate font-headline-sm text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-1.5"
              >
                4.9{" "}
                <span className="flex text-amber-500 text-sm">
                  <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                    star
                  </span>
                </span>
              </p>
              <p className="text-xs font-label-meta text-slate-500 mt-0.5">
                Rating Kepuasan Mitra
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <p className="font-headline-sm text-lg sm:text-xl font-extrabold text-emerald-600">
                99.4%
              </p>
              <p className="text-xs font-label-meta text-slate-500 mt-0.5">
                Tingkat Kepuasan Pelanggan
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <Link
              href="/#galeri"
              className="py-3 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-cta-pill text-xs font-semibold flex items-center gap-2 border border-slate-700 shadow-sm transition-all"
            >
              <span translate="no" className="material-symbols-outlined notranslate text-[18px] text-amber-400">
                photo_library
              </span>{" "}
              Lihat Galeri Hasil Cetak
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

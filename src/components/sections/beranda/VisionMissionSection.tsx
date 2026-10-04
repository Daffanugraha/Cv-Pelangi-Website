"use client";

import React, { useState, useEffect } from "react";
import { whyChooseUsCards } from "@/lib/data";

export default function VisionMissionSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const duration = 5000;
  const intervalStep = 50;

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (intervalStep / duration) * 100;
        if (next >= 100) {
          return 100;
        }
        return next;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    if (progress >= 100) {
      setActiveIndex((prev) => (prev + 1) % whyChooseUsCards.length);
      setProgress(0);
    }
  }, [progress]);

  const goToCard = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % whyChooseUsCards.length);
    setProgress(0);
  };

  const prevCard = () => {
    setActiveIndex(
      (prev) => (prev - 1 + whyChooseUsCards.length) % whyChooseUsCards.length
    );
    setProgress(0);
  };

  const cur = whyChooseUsCards[activeIndex];

  return (
    <section
      className="w-full relative py-space-3xl overflow-hidden bg-gradient-to-b from-[#2c3345] via-[#212635] to-[#181c26] text-white"
      id="nilai-pembeda"
    >
      {/* Subtle ambient lighting (brightened & clean) */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 rounded-full bg-bracket-border/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-space-md">
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-white font-bold leading-tight">
              Mengapa Harus <span translate="no" className="notranslate">CV Pelangi UV</span>
            </h2>
            <p className="font-body-md text-surface-dim text-sm sm:text-base leading-relaxed">
              Didukung 35 unit mesin berkecepatan tinggi dan pasokan bahan langsung,
              kami memproses kebutuhan pasca-cetak skala ribuan lembar dengan mutu presisi
              dan kepastian waktu.
            </p>
          </div>

          {/* Right Column: Seamless Auto-Looping Feature (5 seconds) */}
          <div
            className="lg:col-span-7 flex flex-col justify-between py-2 sm:py-4 transition-all"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Top: Step Dots Indicator (no 02/03 counter) */}
            <div className="flex items-center justify-end gap-1.5 mb-4">
              {whyChooseUsCards.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToCard(idx)}
                  aria-label={`Keunggulan ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? "w-8 bg-bracket-border shadow-[0_0_8px_rgba(246,84,86,0.7)]"
                      : "w-2.5 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            {/* Middle: Content with smooth transition */}
            <div
              key={cur.id}
              className="my-auto py-2 transition-all duration-300 animate-fade-in"
            >
              <h3 className="font-headline-sm text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 tracking-tight">
                {cur.title}
              </h3>
              <p className="font-body-md text-surface-dim text-sm sm:text-base lg:text-[17px] leading-relaxed">
                {cur.desc}
              </p>
            </div>

            {/* Progress bar line (no arrow buttons below) */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-6">
              <div
                className="h-full bg-bracket-border transition-all duration-75 ease-linear rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

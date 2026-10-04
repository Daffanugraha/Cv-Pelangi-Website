"use client";

import React, { useEffect, useState, useRef } from "react";
import { statsData } from "@/lib/data";

function formatDots(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>(statsData.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const startTime = performance.now();
          const duration = 1600;

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            setCounts(
              statsData.map((item) => Math.floor(ease * item.target))
            );

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts(statsData.map((item) => item.target));
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section className="w-full bg-surface-canvas py-space-2xl relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-7xl mx-auto">
          {statsData.map((item, idx) => (
            <div
              key={idx}
              className="relative bg-surface-bright p-6 sm:p-7 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-bracket-border/60 hover:shadow-[0_12px_32px_rgba(246,84,86,0.22)] group border border-surface-container flex flex-col justify-between"
            >
              {/* Corner brackets */}
              <span
                className="absolute top-0 left-0 w-8 h-8 rounded-tl-xl bg-bracket-border transition-all duration-300 group-hover:scale-110"
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, 100% 3px, 3px 3px, 3px 100%, 0 100%)",
                }}
              />
              <span
                className="absolute bottom-0 right-0 w-8 h-8 rounded-br-xl bg-bracket-border transition-all duration-300 group-hover:scale-110"
                style={{
                  clipPath:
                    "polygon(calc(100% - 3px) 0, 100% 0, 100% 100%, 0 100%, 0 calc(100% - 3px), calc(100% - 3px) calc(100% - 3px))",
                }}
              />

              <div className="flex flex-col justify-center h-full pt-1">
                {/* Angka Utama - Diperbesar & Sangat Bold */}
                <div className="flex items-baseline gap-1 mb-2">
                  <span
                    translate="no"
                    className="notranslate font-heading font-black text-4xl sm:text-5xl lg:text-[44px] xl:text-[52px] text-bracket-border tracking-tight leading-none transition-transform duration-300 group-hover:scale-105 inline-block drop-shadow-xs"
                  >
                    {hasAnimated ? formatDots(counts[idx]) : 0}
                    {item.suffix}
                  </span>
                </div>

                {/* Judul Label */}
                <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface mb-1.5 group-hover:text-bracket-border transition-colors leading-snug">
                  {item.label}
                </h3>

                {/* Deskripsi */}
                <p className="font-sans text-xs sm:text-sm text-text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 3-color rainbow bar */}
        <div
          className="w-full h-1.5 rounded-full mt-space-2xl shadow-sm"
          style={{
            background:
              "linear-gradient(90deg, rgb(230, 33, 41) 0%, rgb(254, 209, 0) 50%, rgb(0, 155, 76) 100%)",
          }}
        />
      </div>
    </section>
  );
}

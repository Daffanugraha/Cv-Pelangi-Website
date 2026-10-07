"use client";

import React, { useState } from "react";
import { CareerJob } from "@/data/careers";

interface KarirJobListingsProps {
  jobs: CareerJob[];
  onApply: (job: CareerJob) => void;
}

export default function KarirJobListings({ jobs, onApply }: KarirJobListingsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(jobs[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getDivisionBadgeColor = (division: string) => {
    switch (division) {
      case "Finance":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Marketing":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Production":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Warehouse":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Operational":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-neutral-50 text-neutral-700 border-neutral-200";
    }
  };

  if (jobs.length === 0) {
    return (
      <div className="text-center py-16 bg-surface-canvas rounded-3xl border border-dashed border-outline-variant/60 my-8">
        <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mx-auto mb-3 text-text-muted">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h4 className="font-heading font-bold text-lg text-on-surface">Tidak Ada Posisi yang Sesuai</h4>
        <p className="text-sm text-text-body max-w-md mx-auto mt-1 font-sans">
          Coba ganti kata kunci pencarian atau pilih filter divisi lain untuk melihat lowongan yang tersedia.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => {
        const isExpanded = expandedId === job.id;
        return (
          <div
            key={job.id}
            className={`rounded-2xl transition-all duration-300 border bg-surface-canvas overflow-hidden ${
              isExpanded
                ? "border-bracket-border/50 shadow-xl shadow-bracket-border/5 ring-1 ring-bracket-border/20"
                : "border-outline-variant/40 hover:border-outline-variant/80 hover:shadow-md"
            }`}
          >
            {/* Header / Clickable summary */}
            <div
              onClick={() => toggleExpand(job.id)}
              className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-3 py-0.5 rounded-full text-[11px] font-bold border ${getDivisionBadgeColor(
                      job.division
                    )}`}
                  >
                    Divisi {job.division}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-surface-neutral-alt text-text-muted border border-outline-variant/30">
                    {job.type}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-surface-neutral-alt text-text-muted border border-outline-variant/30">
                    📍 {job.location}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-on-surface hover:text-bracket-border transition-colors">
                  {job.title}
                </h3>
              </div>

              {/* Right side toggle & action */}
              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onApply(job);
                  }}
                  className="px-5 py-2 rounded-full bg-bracket-border hover:bg-primary text-white text-xs font-bold transition shadow-md active:scale-95"
                >
                  Lamar Sekarang
                </button>
                <div
                  className={`w-8 h-8 rounded-full bg-surface-neutral-alt flex items-center justify-center text-on-surface transition-transform duration-300 ${
                    isExpanded ? "rotate-180 bg-bracket-border/10 text-bracket-border" : ""
                  }`}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Expandable Specifications Area */}
            {isExpanded && (
              <div className="px-5 pb-6 sm:px-6 sm:pb-8 pt-2 border-t border-surface-container/60 bg-surface-neutral-alt/30 animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-3">
                  {/* Kualifikasi */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-surface-canvas border border-outline-variant/30">
                    <h4 className="font-heading font-bold text-sm text-on-surface flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-bracket-border" />
                      Persyaratan &amp; Kualifikasi:
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-text-body font-sans leading-relaxed list-disc list-inside">
                      {job.qualifications.map((item, idx) => (
                        <li key={idx} className="pl-1">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tanggung Jawab */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-surface-canvas border border-outline-variant/30">
                    <h4 className="font-heading font-bold text-sm text-on-surface flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-accent-gold" />
                      Tanggung Jawab Pekerjaan:
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-text-body font-sans leading-relaxed list-disc list-inside">
                      {job.responsibilities.map((item, idx) => (
                        <li key={idx} className="pl-1">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between p-3 sm:p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
                  <p className="text-xs text-text-muted font-sans">
                    Penempatan kerja di Kompleks Pergudangan Bizpark C17-C19, Tambaksawah, Sidoarjo.
                  </p>
                  <button
                    type="button"
                    onClick={() => onApply(job)}
                    className="px-5 py-2 rounded-full bg-bracket-border hover:bg-primary text-white text-xs font-bold transition shadow active:scale-95 shrink-0"
                  >
                    Kirim Lamaran Posisi Ini
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

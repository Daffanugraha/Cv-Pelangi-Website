"use client";

import React, { useState, useMemo, useEffect } from "react";
import KarirHero from "./KarirHero";
import PelangiLifeSection from "./PelangiLifeSection";
import KarirJobListings from "./KarirJobListings";
import KarirApplyModal from "./KarirApplyModal";
import { CAREER_JOBS, CareerJob } from "@/data/careers";

interface KarirPageContentProps {
  initialJobs?: CareerJob[];
}

export default function KarirPageContent({ initialJobs }: KarirPageContentProps) {
  const [jobs, setJobs] = useState<CareerJob[]>(Array.isArray(initialJobs) ? initialJobs : CAREER_JOBS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("ALL");
  const [selectedJobToApply, setSelectedJobToApply] = useState<CareerJob | null>(null);

  // Sync with /api/jobs in case updated or deleted from admin
  useEffect(() => {
    const fetchLatestJobs = () => {
      fetch("/api/jobs")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (Array.isArray(data)) {
            setJobs(data);
          }
        })
        .catch(() => {});
    };

    fetchLatestJobs();

    // Sync otomatis ketika tab browser kembali fokus
    window.addEventListener("focus", fetchLatestJobs);
    return () => window.removeEventListener("focus", fetchLatestJobs);
  }, []);

  // Filter jobs based on search query & selected division
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchDivision =
        selectedDivision === "ALL" || job.division === selectedDivision;
      const matchSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.division.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.qualifications.some((q) => q.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchDivision && matchSearch;
    });
  }, [jobs, searchQuery, selectedDivision]);

  return (
    <div className="w-full min-h-screen bg-surface-canvas text-text-body font-sans antialiased selection:bg-bracket-border selection:text-white">
      {/* 1. Hero Section */}
      <KarirHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDivision={selectedDivision}
        setSelectedDivision={setSelectedDivision}
        totalOpenJobs={jobs.filter((j) => j.isOpen).length}
      />

      {/* 2. CV Pelangi Life (Instagram Reels Activities Section) */}
      <PelangiLifeSection />

      {/* 3. Job Vacancies & Recruitment Flow Section */}
      <section className="w-full py-16 md:py-20 bg-surface-canvas relative">
        <div className="max-w-7xl mx-auto px-gutter">
          {/* Recruitment Process Info Flow (Diletakkan di Atas dengan Tanda Panah & Alur Logis) */}
          <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-surface-neutral-alt border border-surface-container/80 shadow-xs">
            <div className="max-w-2xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bracket-border/10 text-bracket-border text-xs font-bold uppercase tracking-wider mb-2">
                Tahapan Seleksi
              </div>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-3xl text-on-surface">
                Alur Rekrutmen CV Pelangi UV
              </h3>
              <p className="text-text-muted text-xs sm:text-sm font-sans mt-1">
                Tahapan seleksi transparan dan terstandarisasi untuk menjamin kecocokan karakter dan keahlian kerja.
              </p>
            </div>

            {/* Stepper Grid dengan Tanda Panah Penghubung */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative">
              {/* Step 1 */}
              <div className="relative p-5 rounded-2xl bg-surface-canvas border border-surface-container/80 shadow-xs flex flex-col justify-between group hover:border-bracket-border/40 transition">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono text-bracket-border bg-bracket-border/10 px-2.5 py-0.5 rounded-full">
                      01
                    </span>
                    <span className="material-symbols-outlined text-bracket-border text-lg">
                      description
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-on-surface mb-1">
                    Seleksi Berkas
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed font-sans">
                    Skrining CV, kelengkapan berkas, riwayat kerja, dan portofolio keahlian.
                  </p>
                </div>

                {/* Panah ke kanan (Desktop) */}
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-surface-canvas border border-surface-container/80 items-center justify-center text-text-muted shadow-xs">
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>

              {/* Step 2: Tes Psikotes (DISC & PAPI Kostick) */}
              <div className="relative p-5 rounded-2xl bg-surface-canvas border border-surface-container/80 shadow-xs flex flex-col justify-between group hover:border-bracket-border/40 transition">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono text-bracket-border bg-bracket-border/10 px-2.5 py-0.5 rounded-full">
                      02
                    </span>
                    <span className="material-symbols-outlined text-bracket-border text-lg">
                      psychology
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-on-surface mb-1">
                    Psikotes (DISC &amp; PAPI)
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed font-sans">
                    Asesmen kepribadian DISC, PAPI Kostick, dan tes ketelitian kerja.
                  </p>
                </div>

                {/* Panah ke kanan (Desktop) */}
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-surface-canvas border border-surface-container/80 items-center justify-center text-text-muted shadow-xs">
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>

              {/* Step 3: Interview HR & User */}
              <div className="relative p-5 rounded-2xl bg-surface-canvas border border-surface-container/80 shadow-xs flex flex-col justify-between group hover:border-bracket-border/40 transition">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono text-bracket-border bg-bracket-border/10 px-2.5 py-0.5 rounded-full">
                      03
                    </span>
                    <span className="material-symbols-outlined text-bracket-border text-lg">
                      record_voice_over
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-on-surface mb-1">
                    Interview HR &amp; User
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed font-sans">
                    Wawancara kompetensi dan kesesuaian budaya kerja bersama kepala divisi.
                  </p>
                </div>

                {/* Panah ke kanan (Desktop) */}
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-surface-canvas border border-surface-container/80 items-center justify-center text-text-muted shadow-xs">
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>

              {/* Step 4: Uji Kompetensi Bidang Sesuai Posisi */}
              <div className="relative p-5 rounded-2xl bg-surface-canvas border border-surface-container/80 shadow-xs flex flex-col justify-between group hover:border-bracket-border/40 transition">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono text-bracket-border bg-bracket-border/10 px-2.5 py-0.5 rounded-full">
                      04
                    </span>
                    <span className="material-symbols-outlined text-bracket-border text-lg">
                      fact_check
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-on-surface mb-1">
                    Uji Kompetensi Bidang
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed font-sans">
                    Tes keahlian teknis sesuai posisi yang dilamar (Finance, Marketing, Logistik, atau Produksi).
                  </p>
                </div>

                {/* Panah ke kanan (Desktop) */}
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-surface-canvas border border-surface-container/80 items-center justify-center text-text-muted shadow-xs">
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>

              {/* Step 5: Offering & Onboarding */}
              <div className="relative p-5 rounded-2xl bg-surface-canvas border border-surface-container/80 shadow-xs flex flex-col justify-between group hover:border-bracket-border/40 transition">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono text-bracket-border bg-bracket-border/10 px-2.5 py-0.5 rounded-full">
                      05
                    </span>
                    <span className="material-symbols-outlined text-bracket-border text-lg">
                      badge
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-on-surface mb-1">
                    Offering &amp; Onboarding
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed font-sans">
                    Penawaran kontrak kerja resmi dan orientasi fasilitas di Bizpark Sidoarjo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Posisi Terbuka Section Header */}
          <div id="posisi-terbuka" className="max-w-3xl mb-8 pb-4 border-b border-surface-container scroll-mt-24">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-on-surface">
              Bangun Masa Depan Anda Bersama Kami
            </h2>
            <p className="font-sans text-text-muted text-sm sm:text-base mt-2 leading-relaxed">
              Kami selalu membuka kesempatan bagi talenta yang berdedikasi, jujur, dan ingin terus berkembang. Temukan peran yang sesuai dengan potensi Anda di bawah ini:
            </p>
          </div>

          {/* Job listings accordion */}
          <KarirJobListings
            jobs={filteredJobs}
            onApply={(job) => setSelectedJobToApply(job)}
          />
        </div>
      </section>

      {/* 4. Modal Apply Form */}
      <KarirApplyModal
        job={selectedJobToApply}
        onClose={() => setSelectedJobToApply(null)}
      />
    </div>
  );
}

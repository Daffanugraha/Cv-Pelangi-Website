"use client";

import React, { useState, useMemo } from "react";
import KarirHero from "./KarirHero";
import PelangiLifeSection from "./PelangiLifeSection";
import KarirJobListings from "./KarirJobListings";
import KarirApplyModal from "./KarirApplyModal";
import { CAREER_JOBS, CareerJob } from "@/data/careers";

export default function KarirPageContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("ALL");
  const [selectedJobToApply, setSelectedJobToApply] = useState<CareerJob | null>(null);

  // Filter jobs based on search query & selected division
  const filteredJobs = useMemo(() => {
    return CAREER_JOBS.filter((job) => {
      const matchDivision =
        selectedDivision === "ALL" || job.division === selectedDivision;
      const matchSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.division.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.qualifications.some((q) => q.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchDivision && matchSearch;
    });
  }, [searchQuery, selectedDivision]);

  return (
    <div className="w-full min-h-screen bg-surface-canvas text-text-body font-sans antialiased selection:bg-bracket-border selection:text-white">
      {/* 1. Hero Section */}
      <KarirHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDivision={selectedDivision}
        setSelectedDivision={setSelectedDivision}
        totalOpenJobs={CAREER_JOBS.length}
      />

      {/* 2. CV Pelangi Life (Instagram Reels Activities Section) */}
      <PelangiLifeSection />

      {/* 3. Job Vacancies List Section */}
      <section className="w-full py-16 md:py-20 bg-surface-canvas relative">
        <div className="max-w-7xl mx-auto px-gutter">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bracket-border/10 text-bracket-border text-xs font-bold uppercase tracking-wider mb-2">
                Daftar Peluang Karir
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-on-surface">
                Posisi Terbuka Saat Ini
              </h2>
              <p className="font-sans text-text-muted text-sm mt-1">
                Menampilkan {filteredJobs.length} posisi yang sesuai dengan kriteria Anda.
              </p>
            </div>

            {/* Division pill filters on mobile/tablet */}
            <div className="flex flex-wrap gap-1.5">
              {["ALL", "Finance", "Marketing", "Production", "Warehouse", "Operational"].map((div) => (
                <button
                  key={div}
                  type="button"
                  onClick={() => setSelectedDivision(div)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedDivision === div
                      ? "bg-bracket-border text-white shadow-sm"
                      : "bg-surface-neutral-alt text-text-muted hover:text-on-surface hover:bg-surface-container"
                  }`}
                >
                  {div === "ALL" ? "Semua" : div}
                </button>
              ))}
            </div>
          </div>

          {/* Job listings accordion */}
          <KarirJobListings
            jobs={filteredJobs}
            onApply={(job) => setSelectedJobToApply(job)}
          />

          {/* Recruitment Process Info Banner */}
          <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-surface-neutral-alt to-surface-container border border-outline-variant/30">
            <h3 className="font-heading font-bold text-lg sm:text-xl text-on-surface mb-2">
              Alur Tahapan Rekrutmen di CV Pelangi UV
            </h3>
            <p className="text-text-body text-xs sm:text-sm font-sans mb-6 max-w-2xl">
              Proses rekrutmen kami berjalan transparan, profesional, dan bebas dari pungutan biaya apapun.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-surface-canvas border border-outline-variant/20 shadow-xs">
                <span className="text-xs font-bold text-bracket-border font-mono block mb-1">01. Seleksi Berkas</span>
                <p className="text-xs text-text-body">Peninjauan CV, pengalaman, dan portofolio pelamar oleh tim HRD.</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface-canvas border border-outline-variant/20 shadow-xs">
                <span className="text-xs font-bold text-bracket-border font-mono block mb-1">02. Wawancara HRD</span>
                <p className="text-xs text-text-body">Wawancara pengenalan diri, motivasi, dan kecocokan budaya kerja.</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface-canvas border border-outline-variant/20 shadow-xs">
                <span className="text-xs font-bold text-bracket-border font-mono block mb-1">03. Tes Praktik &amp; User</span>
                <p className="text-xs text-text-body">Uji keterampilan teknis mesin atau administrasi bersama kepala divisi.</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface-canvas border border-outline-variant/20 shadow-xs">
                <span className="text-xs font-bold text-bracket-border font-mono block mb-1">04. Penawaran &amp; Onboarding</span>
                <p className="text-xs text-text-body">Penawaran kerja resmi dan orientasi fasilitas di workshop Bizpark.</p>
              </div>
            </div>
          </div>
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

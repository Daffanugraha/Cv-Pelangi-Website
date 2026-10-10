"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { CareerJob } from "@/data/careers";

interface KarirHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDivision: string;
  setSelectedDivision: (div: string) => void;
  totalOpenJobs: number;
  jobs?: CareerJob[];
  onApply?: (job: CareerJob) => void;
}

export default function KarirHero({
  searchQuery,
  setSearchQuery,
  selectedDivision,
  setSelectedDivision,
  totalOpenJobs,
  jobs = [],
  onApply,
}: KarirHeroProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Typewriter animation phrases for search bar
  const searchPhrases = [
    "Cari posisi Admin Pajak & Keuangan...",
    "Cari posisi Checker Gudang & Logistik...",
    "Cari posisi Marketing Executive Percetakan...",
    "Cari posisi Operator Mesin Finishing...",
    "Cari posisi Teknisi Maintenance Industri...",
    "Cari posisi Admin Operasional & SPK...",
  ];

  const [placeholderText, setPlaceholderText] = useState(searchPhrases[0]);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(searchPhrases[0].length);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (searchQuery) return;

    const currentPhrase = searchPhrases[phraseIdx];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (charIdx < currentPhrase.length) {
        timeout = setTimeout(() => {
          setPlaceholderText(currentPhrase.slice(0, charIdx + 1));
          setCharIdx((prev) => prev + 1);
        }, 70);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      // Keep "Cari posisi " (length 12) always visible
      if (charIdx > 12) {
        timeout = setTimeout(() => {
          setPlaceholderText(currentPhrase.slice(0, charIdx - 1));
          setCharIdx((prev) => prev - 1);
        }, 30);
      } else {
        setIsDeleting(false);
        setPhraseIdx((prev) => (prev + 1) % searchPhrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, phraseIdx, searchQuery, searchPhrases]);

  const handleSelectDivision = (div: string) => {
    setSelectedDivision(div);
    setIsDropdownOpen(false);
    // Langsung scroll/direct ke daftar lowongan pekerjaan yang sesuai
    setTimeout(() => {
      const targetEl = document.getElementById("posisi-terbuka");
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  const divisionsList = [
    { id: "ALL", label: "Semua Posisi" },
    { id: "Finance", label: "Finance & Pajak" },
    { id: "Production", label: "Produksi & Mesin" },
    { id: "Warehouse", label: "Gudang & Logistik" },
    { id: "Marketing", label: "Marketing & Sales" },
    { id: "Operational", label: "Operasional & Maintenance" },
  ];

  const matchingJobs = useMemo(() => {
    if (!searchQuery.trim() || !jobs) return [];
    const q = searchQuery.toLowerCase().trim();
    return jobs.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.division.toLowerCase().includes(q) ||
        j.qualifications?.some((qual) => qual.toLowerCase().includes(q))
    );
  }, [searchQuery, jobs]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    if (searchQuery.trim() && matchingJobs.length > 0 && onApply) {
      onApply(matchingJobs[0]);
      return;
    }
    const targetEl = document.getElementById("posisi-terbuka");
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="w-full bg-navbar-black text-on-secondary relative pt-12 sm:pt-16 pb-16 sm:pb-20 border-b border-surface-canvas/10 overflow-hidden rounded-b-[40px] sm:rounded-b-[48px]">
      {/* Background Gambar Galeri Momen (Employee Gathering & Kebersamaan Tim) - Lebih Terang & Jelas */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/gathering-2023/gathering-2023-1.jpg"
          alt="Latar Belakang Galeri Momen & Kebersamaan Tim CV Pelangi UV"
          className="w-full h-full object-cover object-center transform scale-105 brightness-[0.65] contrast-[1.10]"
        />
        {/* Subtle Vignette & Gradient Overlays for Text Legibility (Seimbang & Lebih Terang) */}
        <div className="absolute inset-0 bg-gradient-to-r from-navbar-black/85 via-navbar-black/40 to-navbar-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-navbar-black/95 via-transparent to-navbar-black/60" />
      </div>

      {/* Ambient Red Glow Accents */}
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-bracket-border/25 blur-3xl pointer-events-none z-[1]" />
      <div className="absolute -left-20 bottom-0 w-80 h-80 rounded-full bg-bracket-border/20 blur-3xl pointer-events-none z-[1]" />

      {/* Subtle Pattern Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-[1]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 mb-5 sm:mb-6 font-label-meta text-label-meta justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navbar-black/60 border border-white/15 backdrop-blur-md shadow-md">
            <Link
              href="/"
              className="hover:text-bracket-border transition-colors flex items-center gap-1 text-surface-dim uppercase tracking-wider text-[11px]"
            >
              <span translate="no" className="material-symbols-outlined notranslate text-[15px]">
                home
              </span>
              Beranda
            </Link>
            <span className="text-outline-variant text-[11px]">/</span>
            <span className="text-bracket-border font-semibold uppercase tracking-wider text-[11px]">
              Karir &amp; Rekrutmen
            </span>
          </div>
        </nav>

        {/* Hero Title & Subtitle */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="font-heading text-[30px] sm:text-[40px] md:text-[46px] font-extrabold tracking-tight text-white mb-3 leading-tight drop-shadow-md">
            Peluang Karir{" "}
            <span translate="no" className="notranslate text-bracket-border">
              Pelangi UV
            </span>
          </h1>

          <p className="font-sans text-[14px] sm:text-[16px] text-white/90 leading-relaxed max-w-2xl mb-8 drop-shadow-sm">
            Mari bertumbuh dan bangun karir profesional Anda bersama kami di bidang layanan jasa finishing percetakan presisi. Temukan peluang yang tepat dari {totalOpenJobs} lowongan terbuka saat ini.
          </p>

          {/* Search Container */}
          <div className="w-full max-w-2xl">
            <div className="relative">
              <form
                onSubmit={handleSearchSubmit}
                className="relative flex items-center bg-surface-neutral-alt/10 border border-surface-canvas/20 rounded-2xl p-1.5 sm:p-2 backdrop-blur-md shadow-2xl focus-within:border-bracket-border transition-colors"
              >
                <span
                  translate="no"
                  className="material-symbols-outlined notranslate text-bracket-border text-[22px] sm:text-[24px] ml-3 mr-2 shrink-0"
                >
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder={placeholderText}
                  className="flex-1 bg-transparent border-none text-on-secondary placeholder-text-muted text-sm sm:text-base focus:outline-none py-2 px-1"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-text-muted hover:text-white px-2 cursor-pointer"
                    aria-label="Hapus pencarian"
                  >
                    <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                      close
                    </span>
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 sm:px-5 py-2.5 rounded-xl bg-bracket-border hover:bg-primary text-on-primary font-cta-pill text-xs sm:text-cta-pill transition-all shrink-0 flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <span>Cari</span>
                  <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                    arrow_forward
                  </span>
                </button>
              </form>

              {/* Instant Suggestion Dropdown */}
              {isDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-navbar-dark/95 backdrop-blur-md border border-divider-tint/40 shadow-2xl rounded-2xl p-3 z-50 text-left max-h-[380px] overflow-y-auto">
                  {/* Jika ada pencarian teks dan ada lowongan cocok */}
                  {searchQuery.trim() && matchingJobs.length > 0 ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-bold text-text-muted px-2 py-1 uppercase tracking-wider">
                        <span>Lowongan Ditemukan ({matchingJobs.length}):</span>
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(false)}
                          className="text-text-muted hover:text-white cursor-pointer"
                        >
                          Tutup
                        </button>
                      </div>
                      <div className="space-y-1">
                        {matchingJobs.map((j) => (
                          <div
                            key={j.id}
                            onClick={() => {
                              setIsDropdownOpen(false);
                              if (onApply && j.isOpen) onApply(j);
                            }}
                            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-bracket-border/40 flex items-center justify-between gap-3 text-on-secondary transition-all cursor-pointer group"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="text-[13px] font-bold text-white group-hover:text-bracket-border transition-colors truncate">
                                {j.title}
                              </div>
                              <div className="text-[11px] text-surface-dim">
                                Divisi {j.division} • {j.type}
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {onApply && j.isOpen && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsDropdownOpen(false);
                                    onApply(j);
                                  }}
                                  className="px-3.5 py-1.5 rounded-lg bg-bracket-border hover:bg-primary text-white text-xs font-bold transition shadow-xs cursor-pointer flex items-center gap-1"
                                >
                                  <span className="material-symbols-outlined text-[14px]">send</span>
                                  <span>Lamar Langsung</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between text-[11px] font-bold text-text-muted px-2 py-1 uppercase tracking-wider">
                        <span>Filter Kategori Cepat:</span>
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(false)}
                          className="text-text-muted hover:text-white cursor-pointer"
                        >
                          Tutup
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
                        {[
                          { id: "ALL", title: "Semua Posisi", desc: `${totalOpenJobs} lowongan aktif`, icon: "work" },
                          { id: "Finance", title: "Finance & Pajak", desc: "Admin Pajak, Akuntansi", icon: "account_balance" },
                          { id: "Marketing", title: "Marketing & Sales", desc: "Account Executive B2B", icon: "campaign" },
                          { id: "Production", title: "Produksi & Mesin", desc: "Operator Spot UV & Foil", icon: "precision_manufacturing" },
                          { id: "Warehouse", title: "Gudang & Logistik", desc: "Checker Plano & FIFO", icon: "inventory_2" },
                          { id: "Operational", title: "Operasional & SPK", desc: "Teknisi Mesin & Admin", icon: "build" },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelectDivision(item.id)}
                            className="text-left p-2 rounded-xl hover:bg-surface-canvas/10 border border-transparent hover:border-bracket-border/40 flex items-start gap-2.5 text-on-secondary transition-all cursor-pointer"
                          >
                            <span translate="no" className="material-symbols-outlined notranslate text-[18px] text-bracket-border shrink-0 mt-0.5">
                              {item.icon}
                            </span>
                            <div>
                              <div className="text-[12px] font-semibold text-on-secondary">
                                {item.title}
                              </div>
                              <div className="text-[11px] text-surface-dim line-clamp-1">
                                {item.desc}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Division Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4">
              {divisionsList.map((div) => {
                const isActive = selectedDivision === div.id;
                return (
                  <button
                    key={div.id}
                    type="button"
                    onClick={() => handleSelectDivision(div.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                      isActive
                        ? "bg-bracket-border text-on-primary border-bracket-border shadow-sm"
                        : "bg-surface-canvas/10 text-surface-dim hover:text-white hover:bg-surface-canvas/20 border-surface-canvas/10"
                    }`}
                  >
                    {div.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

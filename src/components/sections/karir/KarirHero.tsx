"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface KarirHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDivision: string;
  setSelectedDivision: (div: string) => void;
  totalOpenJobs: number;
}

export default function KarirHero({
  searchQuery,
  setSearchQuery,
  selectedDivision,
  setSelectedDivision,
  totalOpenJobs,
}: KarirHeroProps) {
  const [activeTab, setActiveTab] = useState<"search" | "recommend">("search");
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
  };

  return (
    <section className="w-full bg-navbar-black text-on-secondary relative pt-12 sm:pt-16 pb-20 sm:pb-24 border-b border-surface-canvas/10 overflow-hidden rounded-b-[40px] sm:rounded-b-[48px]">
      {/* Ambient Red Glow Accents (Tanpa Video Background) */}
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-bracket-border/25 blur-3xl pointer-events-none z-[1]" />
      <div className="absolute -left-20 bottom-0 w-80 h-80 rounded-full bg-bracket-border/15 blur-3xl pointer-events-none z-[1]" />

      {/* Grid Pattern Background subtle */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 mb-6 sm:mb-8 font-label-meta text-label-meta justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-canvas/10 border border-surface-canvas/10 backdrop-blur-md">
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
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="font-headline-xl text-[30px] sm:text-[40px] md:text-headline-xl text-on-secondary tracking-tight font-extrabold mb-4 leading-tight">
            Peluang Karir &amp; Rekrutmen{" "}
            <span translate="no" className="notranslate text-bracket-border">
              Pelangi UV
            </span>
          </h1>

          <p className="font-body-md text-[14px] sm:text-[16px] text-surface-dim leading-relaxed max-w-3xl mb-8">
            Bergabunglah bersama keluarga besar industri finishing cetak presisi terdepan sejak 2004 di Kompleks Pergudangan Bizpark Sidoarjo. Bangun karir profesional Anda bersama lingkungan kerja yang bertumbuh, solid, dan berorientasi mutu kualitas tinggi.
          </p>

          {/* Search & Recommendation Container */}
          <div className="w-full max-w-3xl">
            {/* Tab Switchers */}
            <div className="inline-flex items-center p-1 rounded-full bg-surface-canvas/10 border border-surface-canvas/10 backdrop-blur-md mb-4">
              <button
                type="button"
                onClick={() => setActiveTab("search")}
                className={`px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "search"
                    ? "bg-bracket-border text-on-primary shadow-sm"
                    : "text-surface-dim hover:text-on-primary"
                }`}
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[16px]">
                  search
                </span>
                Cari Posisi
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("recommend")}
                className={`px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "recommend"
                    ? "bg-bracket-border text-on-primary shadow-sm"
                    : "text-surface-dim hover:text-on-primary"
                }`}
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[16px]">
                  bolt
                </span>
                Divisi Unggulan
              </button>
            </div>

            {/* TAB 1: Search Panel */}
            {activeTab === "search" && (
              <div className="relative animate-fadeIn">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsDropdownOpen(false);
                  }}
                  className="relative flex items-center bg-surface-neutral-alt/10 border border-surface-canvas/20 rounded-2xl p-2 backdrop-blur-md shadow-2xl focus-within:border-bracket-border transition-colors"
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
                    <span className="hidden sm:inline">Cari Karir</span>
                    <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                      arrow_forward
                    </span>
                  </button>
                </form>

                {/* Instant Suggestion Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-navbar-dark/95 backdrop-blur-md border border-divider-tint/40 shadow-2xl rounded-2xl p-3 z-50 text-left">
                    <div className="flex items-center justify-between text-[11px] font-bold text-text-muted px-2 py-1 uppercase tracking-wider">
                      <span>Pilih Kategori Divisi:</span>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(false)}
                        className="text-text-muted hover:text-white cursor-pointer"
                      >
                        Tutup
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                      {[
                        { id: "ALL", title: "Semua Posisi Terbuka", desc: `${totalOpenJobs} lowongan aktif`, icon: "work" },
                        { id: "Finance", title: "Finance & Pajak", desc: "Admin Pajak, Akuntansi, Brevet", icon: "account_balance" },
                        { id: "Marketing", title: "Marketing & Sales", desc: "Account Executive B2B Percetakan", icon: "campaign" },
                        { id: "Production", title: "Produksi & Mesin", desc: "Operator Spot UV, Foil, & Laminasi", icon: "precision_manufacturing" },
                        { id: "Warehouse", title: "Gudang & Logistik", desc: "Checker Plano & Penataan FIFO", icon: "inventory_2" },
                        { id: "Operational", title: "Operasional & Maintenance", desc: "Teknisi Mesin & Admin SPK", icon: "build" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectDivision(item.id)}
                          className="text-left p-2.5 rounded-xl hover:bg-surface-canvas/10 border border-transparent hover:border-bracket-border/40 flex items-start gap-2.5 text-on-secondary transition-all cursor-pointer"
                        >
                          <span translate="no" className="material-symbols-outlined notranslate text-[20px] text-bracket-border shrink-0 mt-0.5">
                            {item.icon}
                          </span>
                          <div>
                            <div className="text-[13px] font-semibold text-on-secondary">
                              {item.title}
                            </div>
                            <div className="text-[11px] text-surface-dim line-clamp-1">
                              {item.desc}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Tags */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                  <span className="text-[12px] font-label-meta text-surface-dim/80 mr-1">
                    Paling Dicari:
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSelectDivision("Finance")}
                    className={`px-3 py-1 rounded-full text-[12px] font-label-meta border transition-all cursor-pointer ${
                      selectedDivision === "Finance"
                        ? "bg-bracket-border text-on-primary border-bracket-border"
                        : "bg-surface-canvas/10 hover:bg-bracket-border hover:text-on-primary text-surface-dim border-surface-canvas/10"
                    }`}
                  >
                    Admin Pajak &amp; Finance
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectDivision("Production")}
                    className={`px-3 py-1 rounded-full text-[12px] font-label-meta border transition-all cursor-pointer ${
                      selectedDivision === "Production"
                        ? "bg-bracket-border text-on-primary border-bracket-border"
                        : "bg-surface-canvas/10 hover:bg-bracket-border hover:text-on-primary text-surface-dim border-surface-canvas/10"
                    }`}
                  >
                    Operator Mesin Finishing
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectDivision("Warehouse")}
                    className={`px-3 py-1 rounded-full text-[12px] font-label-meta border transition-all cursor-pointer ${
                      selectedDivision === "Warehouse"
                        ? "bg-bracket-border text-on-primary border-bracket-border"
                        : "bg-surface-canvas/10 hover:bg-bracket-border hover:text-on-primary text-surface-dim border-surface-canvas/10"
                    }`}
                  >
                    Checker Gudang
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectDivision("Marketing")}
                    className={`px-3 py-1 rounded-full text-[12px] font-label-meta border transition-all cursor-pointer ${
                      selectedDivision === "Marketing"
                        ? "bg-bracket-border text-on-primary border-bracket-border"
                        : "bg-surface-canvas/10 hover:bg-bracket-border hover:text-on-primary text-surface-dim border-surface-canvas/10"
                    }`}
                  >
                    Marketing Executive
                  </button>
                  {selectedDivision !== "ALL" && (
                    <button
                      type="button"
                      onClick={() => handleSelectDivision("ALL")}
                      className="px-3 py-1 rounded-full text-[12px] font-label-meta text-bracket-border bg-bracket-border/10 border border-bracket-border/30 hover:bg-bracket-border hover:text-white transition-all cursor-pointer"
                    >
                      Reset Filter
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: Quick Recommendations */}
            {activeTab === "recommend" && (
              <div className="animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  {/* Rekomendasi 1: Finance */}
                  <div
                    onClick={() => handleSelectDivision("Finance")}
                    className="p-3.5 rounded-2xl bg-surface-neutral-alt/10 border border-surface-canvas/20 backdrop-blur-md hover:border-bracket-border transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        translate="no"
                        className="notranslate px-2 py-0.5 rounded-md bg-action-whatsapp/20 text-action-whatsapp font-label-meta text-[11px] font-semibold flex items-center gap-1"
                      >
                        <span translate="no" className="material-symbols-outlined notranslate text-[13px]">
                          verified
                        </span>
                        Finance &amp; Pajak
                      </span>
                    </div>
                    <h4
                      translate="no"
                      className="notranslate font-headline-sm text-[14px] font-bold text-on-secondary group-hover:text-bracket-border transition-colors flex items-center justify-between"
                    >
                      Admin Pajak &amp; Keuangan
                      <span translate="no" className="material-symbols-outlined notranslate text-[16px] text-surface-dim group-hover:text-bracket-border group-hover:translate-x-1 transition-all">
                        arrow_forward
                      </span>
                    </h4>
                    <p className="font-body-sm text-[12px] text-surface-dim mt-0.5 line-clamp-2">
                      Pengelolaan PPh, PPN e-Faktur, Brevet A/B, serta rekonsiliasi database keuangan perusahaan.
                    </p>
                  </div>

                  {/* Rekomendasi 2: Production */}
                  <div
                    onClick={() => handleSelectDivision("Production")}
                    className="p-3.5 rounded-2xl bg-surface-neutral-alt/10 border border-surface-canvas/20 backdrop-blur-md hover:border-bracket-border transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        translate="no"
                        className="notranslate px-2 py-0.5 rounded-md bg-accent-gold/20 text-accent-gold font-label-meta text-[11px] font-semibold flex items-center gap-1"
                      >
                        <span translate="no" className="material-symbols-outlined notranslate text-[13px]">
                          star
                        </span>
                        Produksi
                      </span>
                    </div>
                    <h4
                      translate="no"
                      className="notranslate font-headline-sm text-[14px] font-bold text-on-secondary group-hover:text-bracket-border transition-colors flex items-center justify-between"
                    >
                      Operator Mesin Finishing
                      <span translate="no" className="material-symbols-outlined notranslate text-[16px] text-surface-dim group-hover:text-bracket-border group-hover:translate-x-1 transition-all">
                        arrow_forward
                      </span>
                    </h4>
                    <p className="font-body-sm text-[12px] text-surface-dim mt-0.5 line-clamp-2">
                      Pengoperasian mesin Spot UV, Hot Stamp Foil, &amp; Laminating Thermal berkecepatan tinggi.
                    </p>
                  </div>

                  {/* Rekomendasi 3: Warehouse */}
                  <div
                    onClick={() => handleSelectDivision("Warehouse")}
                    className="p-3.5 rounded-2xl bg-surface-neutral-alt/10 border border-surface-canvas/20 backdrop-blur-md hover:border-bracket-border transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        translate="no"
                        className="notranslate px-2 py-0.5 rounded-md bg-primary/20 text-primary font-label-meta text-[11px] font-semibold flex items-center gap-1"
                      >
                        <span translate="no" className="material-symbols-outlined notranslate text-[13px]">
                          inventory_2
                        </span>
                        Gudang
                      </span>
                    </div>
                    <h4
                      translate="no"
                      className="notranslate font-headline-sm text-[14px] font-bold text-on-secondary group-hover:text-bracket-border transition-colors flex items-center justify-between"
                    >
                      Checker Gudang &amp; Logistik
                      <span translate="no" className="material-symbols-outlined notranslate text-[16px] text-surface-dim group-hover:text-bracket-border group-hover:translate-x-1 transition-all">
                        arrow_forward
                      </span>
                    </h4>
                    <p className="font-body-sm text-[12px] text-surface-dim mt-0.5 line-clamp-2">
                      Pengecekan fisik lembaran plano cetakan, mutasi barang surat jalan, dan sistem penataan FIFO.
                    </p>
                  </div>

                  {/* Rekomendasi 4: Marketing */}
                  <div
                    onClick={() => handleSelectDivision("Marketing")}
                    className="p-3.5 rounded-2xl bg-surface-neutral-alt/10 border border-surface-canvas/20 backdrop-blur-md hover:border-bracket-border transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        translate="no"
                        className="notranslate px-2 py-0.5 rounded-md bg-bracket-border/20 text-bracket-border font-label-meta text-[11px] font-semibold flex items-center gap-1"
                      >
                        <span translate="no" className="material-symbols-outlined notranslate text-[13px]">
                          campaign
                        </span>
                        Marketing
                      </span>
                    </div>
                    <h4
                      translate="no"
                      className="notranslate font-headline-sm text-[14px] font-bold text-on-secondary group-hover:text-bracket-border transition-colors flex items-center justify-between"
                    >
                      Marketing &amp; Account Executive
                      <span translate="no" className="material-symbols-outlined notranslate text-[16px] text-surface-dim group-hover:text-bracket-border group-hover:translate-x-1 transition-all">
                        arrow_forward
                      </span>
                    </h4>
                    <p className="font-body-sm text-[12px] text-surface-dim mt-0.5 line-clamp-2">
                      Kemitraan B2B dengan industri percetakan dan packaging, presentasi swatch kit, &amp; estimasi order.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MaterialCategory } from "@/lib/data/rawMaterials";

interface BahanBakuHeroProps {
  categories: MaterialCategory[];
  onOpenPricelist: (categoryId?: "opp" | "foil" | "lem" | "spotuv") => void;
  onSelectCategoryCard: (categoryId: "opp" | "foil" | "lem" | "spotuv") => void;
  onRequestSample?: () => void;
}

export default function BahanBakuHero({
  categories,
  onOpenPricelist,
  onSelectCategoryCard,
}: BahanBakuHeroProps) {
  const [activeTab, setActiveTab] = useState<"search" | "recommend">("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Typewriter animation phrases for search bar
  const searchPhrases = [
    "Cari Roll Foil Gold & Silver 120m...",
    "Cari BOPP Thermal Doff & Glossy...",
    "Cari Lem Wet & Dry Laminating...",
    "Cari Varnish & Tinta Spot UV...",
    "Cari Foil Hologram Rainbow...",
    "Cari Roll Foil Hot Stamping...",
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
      // Keep "Cari " (length 5) always visible, only backspace the product name
      if (charIdx > 5) {
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

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      onSelectCategoryCard("opp");
      return;
    }
    if (q.includes("foil") || q.includes("gold") || q.includes("silver") || q.includes("holo")) {
      onSelectCategoryCard("foil");
    } else if (q.includes("lem") || q.includes("wet") || q.includes("dry") || q.includes("adhesiv")) {
      onSelectCategoryCard("lem");
    } else if (q.includes("uv") || q.includes("spot") || q.includes("tinta") || q.includes("varnish")) {
      onSelectCategoryCard("spotuv");
    } else {
      onSelectCategoryCard("opp");
    }
    setIsDropdownOpen(false);
  };

  const handleSuggestionClick = (catId: "opp" | "foil" | "lem" | "spotuv") => {
    onSelectCategoryCard(catId);
    setIsDropdownOpen(false);
  };

  return (
    <section
      className="w-full bg-navbar-black text-on-secondary relative pt-12 sm:pt-16 pb-20 sm:pb-24 border-b border-surface-canvas/10 overflow-hidden rounded-b-[40px] sm:rounded-b-[48px]"
    >
      {/* Cinematic Looping Video Background for Bahan Baku */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transform scale-105 brightness-[0.65] contrast-[1.15]"
        >
          <source src="/videos/video-bahan-baku.mp4" type="video/mp4" />
        </video>
        {/* Subtle Vignette & Gradient Overlays for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-navbar-black/90 via-navbar-black/45 to-navbar-black/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-navbar-black via-transparent to-navbar-black/70" />
      </div>

      {/* Ambient Red Glow Accents */}
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-bracket-border/25 blur-3xl pointer-events-none z-[1]" />
      <div className="absolute -left-20 bottom-0 w-80 h-80 rounded-full bg-bracket-border/15 blur-3xl pointer-events-none z-[1]" />

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
              <span translate="no" className="material-symbols-outlined notranslate text-[15px] notranslate">
                home
              </span>
              Beranda
            </Link>
            <span className="text-outline-variant text-[11px]">/</span>
            <Link
              href="/#produk"
              className="hover:text-bracket-border transition-colors text-surface-dim uppercase tracking-wider text-[11px]"
            >
              Produk
            </Link>
            <span className="text-outline-variant text-[11px]">/</span>
            <span className="text-bracket-border font-semibold uppercase tracking-wider text-[11px]">
              Bahan Baku Finishing
            </span>
          </div>
        </nav>

        {/* Hero Title & Subtitle */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="font-headline-xl text-[30px] sm:text-[40px] md:text-headline-xl text-on-secondary tracking-tight font-extrabold mb-4 leading-tight">
            Katalog Bahan Baku Finishing Cetak{" "}
            <span translate="no" className="notranslate text-bracket-border">
              Pelangi UV
            </span>
          </h1>

          <p className="font-body-md text-[14px] sm:text-[16px] text-surface-dim leading-relaxed max-w-3xl mb-8">
            Tingkatkan keuntungan dan standar kualitas hasil cetak Anda dengan pasokan bahan baku finishing
            tangan pertama. Teruji performanya di mesin berkecepatan tinggi, rekat lebih kuat, kilau lebih mewah,
            dan rilis presisi bebas kendala. Ribuan stok Foil Stamping, Film BOPP Thermal, Lem Wet, hingga
            Varnish Spot UV siap kirim hari ini ke seluruh Indonesia.
          </p>

          {/* Search & Recommendation Container */}
          <div className="w-full max-w-3xl">
            {/* Tab switchers */}
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
                <span translate="no" className="material-symbols-outlined notranslate text-[16px] notranslate">
                  search
                </span>
                Cari Material
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
                <span translate="no" className="material-symbols-outlined notranslate text-[16px] notranslate">
                  bolt
                </span>
                Rekomendasi Cepat
              </button>
            </div>

            {/* TAB 1: Search Panel */}
            {activeTab === "search" && (
              <div className="relative animate-fadeIn">
                <form
                  onSubmit={handleSearchSubmit}
                  className="relative flex items-center bg-surface-neutral-alt/10 border border-surface-canvas/20 rounded-2xl p-2 backdrop-blur-md shadow-2xl focus-within:border-bracket-border transition-colors"
                >
                  <span translate="no" className="material-symbols-outlined notranslate text-bracket-border text-[22px] sm:text-[24px] ml-3 mr-2 shrink-0 notranslate"
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
                  <button
                    type="submit"
                    className="px-4 sm:px-5 py-2.5 rounded-xl bg-bracket-border hover:bg-primary text-on-primary font-cta-pill text-xs sm:text-cta-pill transition-all shrink-0 flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <span className="hidden sm:inline">Cari Stok</span>
                    <span translate="no" className="material-symbols-outlined notranslate text-[18px] notranslate">
                      arrow_forward
                    </span>
                  </button>
                </form>

                {/* Instant Suggestion Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-navbar-dark/95 backdrop-blur-md border border-divider-tint/40 shadow-2xl rounded-2xl p-3 z-50 text-left">
                    <div className="flex items-center justify-between text-[11px] font-bold text-text-muted px-2 py-1 uppercase tracking-wider">
                      <span>Pilih untuk Langsung Menuju Produk:</span>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(false)}
                        className="text-text-muted hover:text-white"
                      >
                        Tutup
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleSuggestionClick(cat.id)}
                          className="text-left p-2.5 rounded-xl hover:bg-surface-canvas/10 border border-transparent hover:border-bracket-border/40 flex items-start gap-2.5 text-on-secondary transition-all cursor-pointer"
                        >
                          <span translate="no" className="material-symbols-outlined notranslate text-[20px] text-bracket-border shrink-0 mt-0.5 notranslate"
                          >
                            inventory_2
                          </span>
                          <div>
                            <div className="text-[13px] font-semibold text-on-secondary">
                              {cat.title}
                            </div>
                            <div className="text-[11px] text-surface-dim line-clamp-1">
                              {cat.items.length} varian spesifikasi
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
                    onClick={() => onSelectCategoryCard("foil")}
                    className="px-3 py-1 rounded-full bg-surface-canvas/10 hover:bg-bracket-border hover:text-on-primary text-surface-dim text-[12px] font-label-meta border border-surface-canvas/10 transition-all cursor-pointer"
                  >
                    Roll Foil Gold 120m
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectCategoryCard("opp")}
                    className="px-3 py-1 rounded-full bg-surface-canvas/10 hover:bg-bracket-border hover:text-on-primary text-surface-dim text-[12px] font-label-meta border border-surface-canvas/10 transition-all cursor-pointer"
                  >
                    BOPP Thermal Doff 18 mic
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectCategoryCard("lem")}
                    className="px-3 py-1 rounded-full bg-surface-canvas/10 hover:bg-bracket-border hover:text-on-primary text-surface-dim text-[12px] font-label-meta border border-surface-canvas/10 transition-all cursor-pointer"
                  >
                    Lem Wet Emulsi 20kg
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectCategoryCard("spotuv")}
                    className="px-3 py-1 rounded-full bg-surface-canvas/10 hover:bg-bracket-border hover:text-on-primary text-surface-dim text-[12px] font-label-meta border border-surface-canvas/10 transition-all cursor-pointer"
                  >
                    Tinta Spot UV LumineX
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: Quick Recommendations */}
            {activeTab === "recommend" && (
              <div className="animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  {/* Rekomendasi 1: OPP */}
                  <div
                    onClick={() => onOpenPricelist("opp")}
                    className="p-3.5 rounded-2xl bg-surface-neutral-alt/10 border border-surface-canvas/20 backdrop-blur-md hover:border-bracket-border transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        translate="no"
                        className="notranslate px-2 py-0.5 rounded-md bg-action-whatsapp/20 text-action-whatsapp font-label-meta text-[11px] font-semibold flex items-center gap-1"
                      >
                        <span translate="no" className="material-symbols-outlined notranslate text-[13px] notranslate">
                          verified
                        </span>
                        OPP
                      </span>
                    </div>
                    <h4
                      translate="no"
                      className="notranslate font-headline-sm text-[14px] font-bold text-on-secondary group-hover:text-bracket-border transition-colors flex items-center justify-between"
                    >
                      BOPP Thermal Doff &amp; Glossy
                      <span translate="no" className="material-symbols-outlined notranslate text-[16px] text-surface-dim group-hover:text-bracket-border group-hover:translate-x-1 transition-all notranslate">
                        arrow_forward
                      </span>
                    </h4>
                    <p className="font-body-sm text-[12px] text-surface-dim mt-0.5 line-clamp-2">
                      Rekomendasi terbaik untuk cover buku, packaging box, &amp; brosur agar tahan goresan dan anti-air.
                    </p>
                  </div>

                  {/* Rekomendasi 2: Foil */}
                  <div
                    onClick={() => onOpenPricelist("foil")}
                    className="p-3.5 rounded-2xl bg-surface-neutral-alt/10 border border-surface-canvas/20 backdrop-blur-md hover:border-bracket-border transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        translate="no"
                        className="notranslate px-2 py-0.5 rounded-md bg-accent-gold/20 text-accent-gold font-label-meta text-[11px] font-semibold flex items-center gap-1"
                      >
                        <span translate="no" className="material-symbols-outlined notranslate text-[13px] notranslate">
                          star
                        </span>
                        Foil
                      </span>
                    </div>
                    <h4
                      translate="no"
                      className="notranslate font-headline-sm text-[14px] font-bold text-on-secondary group-hover:text-bracket-border transition-colors flex items-center justify-between"
                    >
                      Foil Gold, Silver &amp; Hologram 120M
                      <span translate="no" className="material-symbols-outlined notranslate text-[16px] text-surface-dim group-hover:text-bracket-border group-hover:translate-x-1 transition-all notranslate">
                        arrow_forward
                      </span>
                    </h4>
                    <p className="font-body-sm text-[12px] text-surface-dim mt-0.5 line-clamp-2">
                      Rilis lepas presisi pada 100°C–120°C, pantulan cermin mewah untuk hardbox, etiket, &amp; undangan.
                    </p>
                  </div>

                  {/* Rekomendasi 3: Lem */}
                  <div
                    onClick={() => onOpenPricelist("lem")}
                    className="p-3.5 rounded-2xl bg-surface-neutral-alt/10 border border-surface-canvas/20 backdrop-blur-md hover:border-bracket-border transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        translate="no"
                        className="notranslate px-2 py-0.5 rounded-md bg-primary/20 text-primary font-label-meta text-[11px] font-semibold flex items-center gap-1"
                      >
                        <span translate="no" className="material-symbols-outlined notranslate text-[13px] notranslate">
                          handshake
                        </span>
                        Lem
                      </span>
                    </div>
                    <h4
                      translate="no"
                      className="notranslate font-headline-sm text-[14px] font-bold text-on-secondary group-hover:text-bracket-border transition-colors flex items-center justify-between"
                    >
                      Lem Wet &amp; Dry Laminating
                      <span translate="no" className="material-symbols-outlined notranslate text-[16px] text-surface-dim group-hover:text-bracket-border group-hover:translate-x-1 transition-all notranslate">
                        arrow_forward
                      </span>
                    </h4>
                    <p className="font-body-sm text-[12px] text-surface-dim mt-0.5 line-clamp-2">
                      Daya rekat superior cepat meresap ke serat karton tebal, anti-delaminasi, &amp; bebas kerut di mesin rotari.
                    </p>
                  </div>

                  {/* Rekomendasi 4: Spot UV */}
                  <div
                    onClick={() => onOpenPricelist("spotuv")}
                    className="p-3.5 rounded-2xl bg-surface-neutral-alt/10 border border-surface-canvas/20 backdrop-blur-md hover:border-bracket-border transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        translate="no"
                        className="notranslate px-2 py-0.5 rounded-md bg-bracket-border/20 text-bracket-border font-label-meta text-[11px] font-semibold flex items-center gap-1"
                      >
                        <span translate="no" className="material-symbols-outlined notranslate text-[13px] notranslate">
                          auto_awesome
                        </span>
                        Spot UV
                      </span>
                    </div>
                    <h4
                      translate="no"
                      className="notranslate font-headline-sm text-[14px] font-bold text-on-secondary group-hover:text-bracket-border transition-colors flex items-center justify-between"
                    >
                      Varnish &amp; Tinta Spot UV LumineX
                      <span translate="no" className="material-symbols-outlined notranslate text-[16px] text-surface-dim group-hover:text-bracket-border group-hover:translate-x-1 transition-all notranslate">
                        arrow_forward
                      </span>
                    </h4>
                    <p className="font-body-sm text-[12px] text-surface-dim mt-0.5 line-clamp-2">
                      Kontras kilau basah 98 GU mewah atau doff eksklusif, cepat kering di mesin UV kecepatan tinggi.
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

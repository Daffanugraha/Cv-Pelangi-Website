"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { searchCatalog, navLinks } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";

function FlagID({ className = "w-4 h-3" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg
        className="w-full h-full rounded-[2px] shadow-2xs border border-white/20 overflow-hidden"
        viewBox="0 0 3 2"
        aria-hidden="true"
      >
        <rect width="3" height="1" fill="#E70011" />
        <rect y="1" width="3" height="1" fill="#FFFFFF" />
      </svg>
    </span>
  );
}

function FlagGB({ className = "w-4 h-3" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg
        className="w-full h-full rounded-[2px] shadow-2xs border border-white/20 overflow-hidden"
        viewBox="0 0 60 30"
        aria-hidden="true"
      >
        <clipPath id="uk-clip-nav">
          <path d="M0,0 v30 h60 v-30 z" />
        </clipPath>
        <clipPath id="uk-diag-nav">
          <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
        </clipPath>
        <g clipPath="url(#uk-clip-nav)">
          <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-diag-nav)" stroke="#C8102E" strokeWidth="4" />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </g>
      </svg>
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isContactPage = pathname === "/kontak";
  const isLayananPage =
    pathname === "/layanan" || pathname === "/produk/jasa-finishing";
  const isBahanBakuPage =
    pathname === "/produk/bahan-baku" || pathname === "/bahan-baku";
  const isGaleriPage =
    pathname === "/galeri" || pathname.startsWith("/galeri");
  const isGaleriAplikasiPage =
    pathname === "/galeri/pengaplikasian-produk" ||
    pathname.startsWith("/galeri/pengaplikasian-produk") ||
    pathname === "/galeri/produk";
  const isGaleriMomenPage =
    pathname === "/galeri/momen" || pathname.startsWith("/galeri/momen");
  const isKarirPage = pathname === "/karir" || pathname.startsWith("/karir");
  const { language, setLanguage, t } = useLanguage();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);

  const langDropdownRef = useRef<HTMLDivElement>(null);
  const mobileLangDropdownRef = useRef<HTMLDivElement>(null);

  // Filter search items
  const filteredSearch = searchQuery.trim()
    ? searchCatalog.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSelectSearchResult = (targetLink: string, e?: React.SyntheticEvent) => {
    if (typeof window === "undefined") return;

    const targetPath = targetLink.split("?")[0].split("#")[0];
    const isSamePage =
      (isLayananPage && (targetLink.startsWith("/layanan") || targetLink.startsWith("/produk/jasa-finishing"))) ||
      (isBahanBakuPage && (targetLink.startsWith("/produk/bahan-baku") || targetLink.startsWith("/bahan-baku"))) ||
      (pathname === targetPath);

    setIsSearchOpen(false);
    setSearchQuery("");

    if (isSamePage) {
      if (e) {
        e.preventDefault();
      }
      // Update browser URL without Next.js page transition / reload delay
      window.history.pushState(null, "", targetLink);
      window.dispatchEvent(
        new CustomEvent("pelangi-nav-target", { detail: targetLink })
      );
    } else {
      router.push(targetLink);
      window.dispatchEvent(
        new CustomEvent("pelangi-nav-target", { detail: targetLink })
      );
    }
  };

  // Close search and language dropdowns on ESC / outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isSearchOpen) setIsSearchOpen(false);
        if (isLangOpen) setIsLangOpen(false);
        if (isMobileLangOpen) setIsMobileLangOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(e.target as Node)
      ) {
        setIsLangOpen(false);
      }
      if (
        mobileLangDropdownRef.current &&
        !mobileLangDropdownRef.current.contains(e.target as Node)
      ) {
        setIsMobileLangOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen, isLangOpen, isMobileLangOpen]);

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (pathname === "/") {
      e.preventDefault();
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleMobileHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    setMobileMenuOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 anim-nav-down">
      <div className="relative bg-[#111111] shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 gap-2 xl:gap-4">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 transition-all duration-300 hover:scale-[1.03] hover:drop-shadow-[0_0_12px_rgba(246,84,86,0.45)] py-1"
              title="CV Pelangi UV - Beranda"
            >
              <img
                src="/images/logo.png"
                alt="CV Pelangi UV - When Quality Be A Priority"
                className="h-10 sm:h-11 md:h-12 w-auto object-contain shrink-0 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2 whitespace-nowrap text-[13px] 2xl:text-[14px]">
            {/* 1. Tentang Kami */}
            <Link
              href="/#tentang-kami"
              onClick={(e) => handleHashClick(e, "#tentang-kami")}
              className="text-white/85 hover:text-white hover:bg-white/5 font-medium px-3 py-2 rounded-lg transition-all"
            >
              {t("nav_about")}
            </Link>

            {/* 2. Partner (sebelum Perjalanan) */}
            <Link
              href="/#partner"
              onClick={(e) => handleHashClick(e, "#partner")}
              className="text-white/85 hover:text-white hover:bg-white/5 font-medium px-3 py-2 rounded-lg transition-all"
            >
              {t("nav_partner")}
            </Link>

            {/* 3. Perjalanan */}
            <Link
              href="/#perjalanan"
              onClick={(e) => handleHashClick(e, "#perjalanan")}
              className="text-white/85 hover:text-white hover:bg-white/5 font-medium px-3 py-2 rounded-lg transition-all"
            >
              {t("nav_journey")}
            </Link>

            {/* 4. Karir (di sebelah Perjalanan) */}
            <Link
              href="/karir"
              className={`font-medium px-3 py-2 rounded-lg transition-all ${
                isKarirPage
                  ? "bg-bracket-border/15 text-bracket-border font-semibold shadow-xs"
                  : "text-white/85 hover:text-white hover:bg-white/5"
              }`}
            >
              {t("nav_career")}
            </Link>

            {/* 5. Dropdown Produk */}
            <div className="relative group py-2">
              <Link
                href="/layanan"
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                  isLayananPage || isBahanBakuPage
                    ? "bg-bracket-border/15 text-bracket-border font-semibold shadow-xs"
                    : "text-white/85 hover:text-white hover:bg-white/5 font-medium"
                }`}
              >
                <span>{t("nav_products")}</span>
                <span
                  translate="no"
                  className="material-symbols-outlined notranslate text-[16px] text-white/50 group-hover:text-white transition-transform duration-200 group-hover:rotate-180"
                >
                  expand_more
                </span>
              </Link>
              <div className="absolute left-0 top-[calc(100%-4px)] hidden group-hover:block w-56 bg-[#161616] border border-white/10 shadow-2xl rounded-xl p-1.5 z-50 backdrop-blur-md">
                <Link
                  href="/layanan"
                  className={`block px-3 py-2.5 text-xs 2xl:text-sm rounded-lg transition-colors ${
                    isLayananPage
                      ? "bg-bracket-border text-white font-semibold"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {t("nav_services")}
                </Link>
                <Link
                  href="/produk/bahan-baku"
                  className={`block px-3 py-2.5 text-xs 2xl:text-sm rounded-lg transition-colors ${
                    isBahanBakuPage
                      ? "bg-bracket-border text-white font-semibold"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {t("nav_materials")}
                </Link>
              </div>
            </div>

            {/* 6. Kontak */}
            <Link
              href="/kontak"
              className={`font-medium px-3 py-2 rounded-lg transition-all ${
                isContactPage
                  ? "bg-bracket-border/15 text-bracket-border font-semibold shadow-xs"
                  : "text-white/85 hover:text-white hover:bg-white/5"
              }`}
            >
              {t("nav_contact")}
            </Link>

            {/* 7. Dropdown Galeri */}
            <div className="relative group py-2">
              <Link
                href="/#galeri"
                onClick={(e) => handleHashClick(e, "#galeri")}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                  isGaleriPage
                    ? "bg-bracket-border/15 text-bracket-border font-semibold shadow-xs"
                    : "text-white/85 hover:text-white hover:bg-white/5 font-medium"
                }`}
              >
                <span>{t("nav_gallery")}</span>
                <span
                  translate="no"
                  className="material-symbols-outlined notranslate text-[16px] text-white/50 group-hover:text-white transition-transform duration-200 group-hover:rotate-180"
                >
                  expand_more
                </span>
              </Link>
              <div className="absolute left-0 top-[calc(100%-4px)] hidden group-hover:block w-60 bg-[#161616] border border-white/10 shadow-2xl rounded-xl p-1.5 z-50 backdrop-blur-md">
                <Link
                  href="/galeri/pengaplikasian-produk"
                  className={`block px-3 py-2.5 text-xs 2xl:text-sm rounded-lg transition-colors ${
                    isGaleriAplikasiPage
                      ? "bg-bracket-border text-white font-semibold"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {t("nav_gallery_products")}
                </Link>
                <Link
                  href="/galeri/momen"
                  className={`block px-3 py-2.5 text-xs 2xl:text-sm rounded-lg transition-colors ${
                    isGaleriMomenPage
                      ? "bg-bracket-border text-white font-semibold"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {t("nav_gallery_moments")}
                </Link>
              </div>
            </div>

            {/* 8. Blog */}
            <Link
              href="/blog"
              className={`font-medium px-3 py-2 rounded-lg transition-all ${
                pathname === "/blog"
                  ? "bg-bracket-border/15 text-bracket-border font-semibold shadow-xs"
                  : "text-white/85 hover:text-white hover:bg-white/5"
              }`}
            >
              {t("nav_blog")}
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 xl:gap-3 shrink-0">
            {/* Search Trigger Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-bracket-border text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer hover:scale-105 active:scale-95 border border-white/10"
              aria-label="Buka pencarian"
              title="Cari layanan, bahan, artikel"
            >
              <span
                translate="no" className="material-symbols-outlined notranslate text-[18px]"
              >
                search
              </span>
            </button>

            {/* Language Switcher Dropdown (ID & GB) */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all cursor-pointer active:scale-95"
                aria-label="Pilih Bahasa / Select Language"
                title="Pilih Bahasa / Select Language"
              >
                {language === "ID" ? (
                  <FlagID className="w-4 h-2.5" />
                ) : (
                  <FlagGB className="w-4 h-2.5" />
                )}
                <span className="font-bold text-xs uppercase tracking-wider">
                  {language === "ID" ? "ID" : "GB"}
                </span>
                <span
                  translate="no" className={`material-symbols-outlined notranslate text-[16px] text-white/70 transition-transform duration-200 ${
                    isLangOpen ? "rotate-180 text-white" : ""
                  }`}
                >
                  expand_more
                </span>
              </button>

              {isLangOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-[#18181b] border border-white/15 rounded-xl shadow-2xl py-1 z-50 overflow-hidden anim-fade-in">
                  <button
                    type="button"
                    onClick={() => {
                      setLanguage("ID");
                      setIsLangOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      language === "ID"
                        ? "bg-secondary-container text-white font-bold"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <FlagID className="w-4 h-3" />
                      <span>ID (Indonesia)</span>
                    </span>
                    {language === "ID" && (
                      <span
                        translate="no" className="material-symbols-outlined notranslate text-[14px]"
                      >
                        check
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLanguage("EN");
                      setIsLangOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      language === "EN"
                        ? "bg-secondary-container text-white font-bold"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <FlagGB className="w-4 h-3" />
                      <span>GB (English)</span>
                    </span>
                    {language === "EN" && (
                      <span
                        translate="no" className="material-symbols-outlined notranslate text-[14px]"
                      >
                        check
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Header CTA Buttons */}
            <a
              href="/katalog/katalog-pelangi-uv.pdf"
              download="KATALOG PELANGI UV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden 2xl:inline-flex items-center justify-center px-3 py-1.5 rounded-full border border-white/30 text-white hover:bg-white/20 hover:border-bracket-border text-xs font-medium transition-all duration-300 hover:scale-105 active:scale-95 shrink-0 whitespace-nowrap hover:shadow-[0_0_12px_rgba(255,255,255,0.2)]"
            >
              {t("nav_download_catalog")}
            </a>
            <Link
              href="/kontak#section-form"
              className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-bracket-border text-white hover:bg-primary text-xs font-semibold shadow-[0_4px_14px_rgba(246,84,86,0.39)] hover:shadow-[0_6px_20px_rgba(246,84,86,0.65)] transition-all duration-300 hover:scale-105 active:scale-95 shrink-0 whitespace-nowrap"
            >
              {t("nav_order_now")}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Menu Mobile"
            >
              <span
                translate="no" className="material-symbols-outlined notranslate text-[20px]"
              >
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-navbar-dark border-t border-white/10 px-4 py-4 space-y-2 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto anim-fade-in">
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
              <span className="text-xs text-white/70 font-medium">Pilih Bahasa / Language:</span>
              <div className="relative" ref={mobileLangDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all cursor-pointer active:scale-95 shadow-2xs"
                  aria-label="Pilih Bahasa / Select Language"
                >
                  {language === "ID" ? (
                    <FlagID className="w-4 h-2.5" />
                  ) : (
                    <FlagGB className="w-4 h-2.5" />
                  )}
                  <span className="font-bold text-xs uppercase tracking-wider">
                    {language === "ID" ? "ID" : "GB"}
                  </span>
                  <span
                    translate="no" className={`material-symbols-outlined notranslate text-[16px] text-white/70 transition-transform duration-200 ${
                      isMobileLangOpen ? "rotate-180 text-white" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {isMobileLangOpen && (
                  <div className="absolute right-0 top-full mt-2 w-44 bg-[#18181b] border border-white/15 rounded-xl shadow-2xl py-1 z-50 overflow-hidden anim-fade-in">
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage("ID");
                        setIsMobileLangOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        language === "ID"
                          ? "bg-secondary-container text-white font-bold"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <FlagID className="w-4 h-3" />
                        <span>ID (Indonesia)</span>
                      </span>
                      {language === "ID" && (
                        <span
                          translate="no" className="material-symbols-outlined notranslate text-[14px]"
                        >
                          check
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage("EN");
                        setIsMobileLangOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        language === "EN"
                          ? "bg-secondary-container text-white font-bold"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <FlagGB className="w-4 h-3" />
                        <span>GB (English)</span>
                      </span>
                      {language === "EN" && (
                        <span
                          translate="no" className="material-symbols-outlined notranslate text-[14px]"
                        >
                          check
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Nav Links - Exact requested order */}
            {/* 1. Beranda */}
            <Link
              href="/#beranda"
              onClick={(e) => handleMobileHashClick(e, "#beranda")}
              className="block px-3.5 py-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/5 text-sm font-medium transition-all"
            >
              {t("nav_home")}
            </Link>

            {/* 2. Tentang Kami */}
            <Link
              href="/#tentang-kami"
              onClick={(e) => handleMobileHashClick(e, "#tentang-kami")}
              className="block px-3.5 py-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/5 text-sm font-medium transition-all"
            >
              {t("nav_about")}
            </Link>

            {/* 3. Partner (sebelum Perjalanan) */}
            <Link
              href="/#partner"
              onClick={(e) => handleMobileHashClick(e, "#partner")}
              className="block px-3.5 py-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/5 text-sm font-medium transition-all"
            >
              {t("nav_partner")}
            </Link>

            {/* 4. Perjalanan */}
            <Link
              href="/#perjalanan"
              onClick={(e) => handleMobileHashClick(e, "#perjalanan")}
              className="block px-3.5 py-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/5 text-sm font-medium transition-all"
            >
              {t("nav_journey")}
            </Link>

            {/* 5. Karir (di sebelah Perjalanan) */}
            <Link
              href="/karir"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                isKarirPage
                  ? "bg-bracket-border/15 text-bracket-border font-semibold shadow-xs"
                  : "text-white/90 hover:text-white hover:bg-white/5 font-medium"
              }`}
            >
              {t("nav_career")}
            </Link>

            {/* 6. Produk */}
            <div className="pt-1">
              <div className="px-3.5 py-1 text-[11px] font-bold text-white/40 uppercase tracking-wider">
                <span>{t("nav_products")}</span>
              </div>
              <div className="space-y-0.5 mt-0.5">
                <Link
                  href="/layanan"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3.5 py-2 rounded-xl text-sm transition-all ${
                    isLayananPage
                      ? "bg-bracket-border/15 text-bracket-border font-semibold shadow-xs"
                      : "text-white/80 hover:text-white hover:bg-white/5 font-medium"
                  }`}
                >
                  {t("nav_services")}
                </Link>
                <Link
                  href="/produk/bahan-baku"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3.5 py-2 rounded-xl text-sm transition-all ${
                    isBahanBakuPage
                      ? "bg-bracket-border/15 text-bracket-border font-semibold shadow-xs"
                      : "text-white/80 hover:text-white hover:bg-white/5 font-medium"
                  }`}
                >
                  {t("nav_materials")}
                </Link>
              </div>
            </div>

            {/* 7. Kontak */}
            <Link
              href="/kontak"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                isContactPage
                  ? "bg-bracket-border/15 text-bracket-border font-semibold shadow-xs"
                  : "text-white/90 hover:text-white hover:bg-white/5 font-medium"
              }`}
            >
              {t("nav_contact")}
            </Link>

            {/* 8. Galeri */}
            <div className="pt-1">
              <div className="px-3.5 py-1 text-[11px] font-bold text-white/40 uppercase tracking-wider">
                <span>{t("nav_gallery")}</span>
              </div>
              <div className="space-y-0.5 mt-0.5">
                <Link
                  href="/galeri/pengaplikasian-produk"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3.5 py-2 rounded-xl text-sm transition-all ${
                    isGaleriAplikasiPage
                      ? "bg-bracket-border/15 text-bracket-border font-semibold shadow-xs"
                      : "text-white/80 hover:text-white hover:bg-white/5 font-medium"
                  }`}
                >
                  {t("nav_gallery_products")}
                </Link>
                <Link
                  href="/galeri/momen"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3.5 py-2 rounded-xl text-sm transition-all ${
                    isGaleriMomenPage
                      ? "bg-bracket-border/15 text-bracket-border font-semibold shadow-xs"
                      : "text-white/80 hover:text-white hover:bg-white/5 font-medium"
                  }`}
                >
                  {t("nav_gallery_moments")}
                </Link>
              </div>
            </div>

            {/* 9. Blog */}
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                pathname === "/blog"
                  ? "bg-bracket-border/15 text-bracket-border font-semibold shadow-xs"
                  : "text-white/90 hover:text-white hover:bg-white/5 font-medium"
              }`}
            >
              {t("nav_blog")}
            </Link>

            {/* Mobile Action Buttons */}
            <div className="pt-3 flex flex-col gap-2">
              <a
                href="/katalog/katalog-pelangi-uv.pdf"
                download="KATALOG PELANGI UV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-white text-sm font-semibold active:scale-95 transition-all"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[18px]">download</span>
                <span>{t("nav_download_catalog")}</span>
              </a>
              <Link
                href="/kontak#section-form"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-bracket-border hover:bg-primary text-white text-sm font-semibold shadow-md active:scale-95 transition-all"
              >
                <span>{t("nav_order_now")}</span>
                <span translate="no" className="material-symbols-outlined notranslate text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Decorative Bottom Arch */}
      <div className="w-full overflow-hidden leading-none pointer-events-none -mt-[1px]">
        <svg
          className="w-full h-4 sm:h-6 md:h-8 text-[#111111] fill-current block"
          preserveAspectRatio="none"
          viewBox="0 0 1440 40"
        >
          <path d="M0,0 C360,40 1080,40 1440,0 L1440,0 L0,0 Z"></path>
        </svg>
      </div>

      {/* Search Modal - Clean & Modern */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 transition-all duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsSearchOpen(false);
              setSearchQuery("");
            }
          }}
        >
          <div className="w-full max-w-2xl bg-[#131418] border border-white/10 rounded-2xl shadow-2xl p-4 sm:p-5 relative text-white">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <span className="text-xs uppercase tracking-wider text-white/50 font-bold">
                Pencarian Pelangi UV
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Tutup pencarian"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                  close
                </span>
              </button>
            </div>

            {/* Clean Search Input */}
            <div className="relative flex items-center mb-3">
              <span
                translate="no"
                className="material-symbols-outlined notranslate absolute left-3.5 text-white/40 text-[20px]"
              >
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && filteredSearch.length > 0) {
                    e.preventDefault();
                    handleSelectSearchResult(filteredSearch[0].link, e);
                  }
                }}
                autoFocus
                placeholder="Cari layanan, bahan baku, galeri, atau kontak..."
                className="w-full h-11 pl-10 pr-9 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/40 text-sm outline-none focus:border-bracket-border focus:bg-white/[0.07] transition-all"
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-white/40 hover:text-white cursor-pointer"
                >
                  <span translate="no" className="material-symbols-outlined notranslate text-[16px]">
                    close
                  </span>
                </button>
              )}
            </div>

            {/* Results or Clean Quick Links */}
            <div className="max-h-[380px] overflow-y-auto no-scrollbar space-y-2 pt-1">
              {searchQuery.trim() ? (
                <div className="space-y-1.5">
                  <p className="text-[11px] uppercase tracking-wider text-white/40 font-semibold px-1">
                    Hasil Pencarian ({filteredSearch.length})
                  </p>
                  {filteredSearch.length === 0 ? (
                    <div className="p-6 text-center rounded-xl bg-white/[0.02] border border-white/5 text-white/50 text-xs">
                      <p className="mb-1 text-white/80 font-medium">
                        Tidak ada hasil yang sesuai dengan &quot;{searchQuery}&quot;
                      </p>
                      <p className="text-[11px] text-white/40">
                        Coba kata kunci lain seperti: foil, uv, laminasi, lem, atau galeri.
                      </p>
                    </div>
                  ) : (
                    filteredSearch.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.link}
                        onClick={(e) => {
                          handleSelectSearchResult(item.link, e);
                        }}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/15 transition-all group"
                      >
                        <div className="min-w-0 pr-3">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-white group-hover:text-bracket-border transition-colors truncate">
                              {item.title}
                            </p>
                            <span className="text-[10px] uppercase font-medium px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/10 shrink-0">
                              {item.tag}
                            </span>
                          </div>
                          <p className="text-xs text-white/50 truncate mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                        <span
                          translate="no"
                          className="material-symbols-outlined notranslate text-[18px] text-white/30 group-hover:text-bracket-border group-hover:translate-x-0.5 transition-all shrink-0"
                        >
                          arrow_forward
                        </span>
                      </Link>
                    ))
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Clean Quick Nav Links */}
                  <div className="space-y-1.5">
                    <p className="text-[11px] uppercase tracking-wider text-white/40 font-semibold px-1">
                      Menu &amp; Halaman Utama
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        {
                          title: "Layanan Jasa Finishing",
                          desc: "Hot Stamp Foil, Spot UV, Laminasi Thermal, Pond",
                          link: "/layanan",
                          tag: "Layanan",
                        },
                        {
                          title: "Katalog Bahan Baku",
                          desc: "Master Roll Foil, Film BOPP, Lem, & Varnish",
                          link: "/produk/bahan-baku",
                          tag: "Bahan Baku",
                        },
                        {
                          title: "Galeri Produk & Kemasan",
                          desc: "Sampel kemasan kosmetik, dus farmasi, & hardbox",
                          link: "/galeri/pengaplikasian-produk",
                          tag: "Galeri",
                        },
                        {
                          title: "Dokumentasi Momen",
                          desc: "Pameran Surabaya Printing Expo & kegiatan",
                          link: "/galeri/momen",
                          tag: "Momen",
                        },
                        {
                          title: "Hubungi Kami / Konsultasi",
                          desc: "Alamat bengkel Bizpark Sidoarjo & WhatsApp",
                          link: "/kontak",
                          tag: "Kontak",
                        },
                        {
                          title: "Unduh Katalog Resmi (PDF)",
                          desc: "Download langsung file PDF spesifikasi lengkap",
                          link: "/katalog/katalog-pelangi-uv.pdf",
                          tag: "Unduh PDF",
                        },
                      ].map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.link}
                          onClick={(e) => {
                            handleSelectSearchResult(item.link, e);
                          }}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/15 transition-all group text-left"
                        >
                          <div className="min-w-0 pr-2">
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs font-semibold text-white group-hover:text-bracket-border transition-colors truncate">
                                {item.title}
                              </p>
                            </div>
                            <p className="text-[11px] text-white/50 truncate mt-0.5">
                              {item.desc}
                            </p>
                          </div>
                          <span
                            translate="no"
                            className="material-symbols-outlined notranslate text-[16px] text-white/30 group-hover:text-bracket-border group-hover:translate-x-0.5 transition-all shrink-0"
                          >
                            arrow_forward
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Clean Popular Search Keywords */}
                  <div className="pt-2 border-t border-white/10 space-y-2">
                    <p className="text-[11px] uppercase tracking-wider text-white/40 font-semibold px-1">
                      Pencarian Populer
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Hot Stamp Foil",
                        "Spot UV",
                        "Laminating Thermal",
                        "Cast and Cure",
                        "BOPP Film",
                        "Lem Food Grade",
                        "Window Patch",
                        "Printing Expo",
                        "Katalog",
                      ].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setSearchQuery(tag)}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-bracket-border hover:text-white text-white/70 text-xs transition-colors cursor-pointer border border-white/10"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Clean Modal Footer */}
            <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-[10px] text-white/80">
                  ESC
                </kbd>{" "}
                untuk menutup
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-[10px] text-white/80">
                  Enter
                </kbd>{" "}
                untuk memilih
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

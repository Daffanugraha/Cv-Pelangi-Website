"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between h-20 gap-3 xl:gap-6">
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
                className="h-11 md:h-12 w-auto object-contain shrink-0 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4 whitespace-nowrap text-sm font-medium">
            <Link
              href="/#beranda"
              onClick={(e) => handleHashClick(e, "#beranda")}
              className={`nav-link-item ${
                !isContactPage
                  ? "text-white hover:text-bracket-border"
                  : "text-white/80 hover:text-secondary-container"
              } font-medium text-sm flex items-center px-3 py-2 rounded-lg transition-colors`}
            >
              {t("nav_home")}
            </Link>
            <Link
              href="/#tentang-kami"
              onClick={(e) => handleHashClick(e, "#tentang-kami")}
              className="nav-link-item text-white hover:text-bracket-border font-medium text-sm flex items-center px-3 py-2 rounded-lg transition-colors"
            >
              {t("nav_about")}
            </Link>
            <Link
              href="/#perjalanan"
              onClick={(e) => handleHashClick(e, "#perjalanan")}
              className="nav-link-item text-white hover:text-bracket-border font-medium text-sm flex items-center px-3 py-2 rounded-lg transition-colors"
            >
              {t("nav_journey")}
            </Link>

            {/* Dropdown Produk */}
            <div className="relative group py-2">
              <Link
                href="/layanan"
                className={`nav-link-item ${
                  isLayananPage || isBahanBakuPage
                    ? "text-secondary-container font-bold"
                    : "text-white group-hover:text-bracket-border font-medium"
                } text-sm inline-flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer`}
              >
                <span>{t("nav_products")}</span>
                <span
                  translate="no" className="material-symbols-outlined notranslate text-[16px] transition-transform duration-200 group-hover:rotate-180"
                >
                  expand_more
                </span>
              </Link>
              <div className="absolute left-0 top-full hidden group-hover:block w-64 bg-navbar-dark border border-white/10 shadow-2xl rounded-xl p-2 z-50">
                <Link
                  href="/layanan"
                  className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                    isLayananPage
                      ? "bg-bracket-border text-white font-semibold"
                      : "text-white hover:bg-bracket-border"
                  }`}
                >
                  {t("nav_services")}
                </Link>
                <Link
                  href="/produk/bahan-baku"
                  className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                    isBahanBakuPage
                      ? "bg-bracket-border text-white font-semibold"
                      : "text-white hover:bg-bracket-border"
                  }`}
                >
                  {t("nav_materials")}
                </Link>
              </div>
            </div>

            <Link
              href="/#partner"
              onClick={(e) => handleHashClick(e, "#partner")}
              className="nav-link-item text-white hover:text-bracket-border font-medium text-sm flex items-center px-3 py-2 rounded-lg transition-colors"
            >
              {t("nav_partner")}
            </Link>
            <Link
              href="/kontak"
              className={`nav-link-item relative ${
                isContactPage
                  ? "text-secondary-container font-bold after:content-[''] after:absolute after:bottom-1 after:left-3 after:right-3 after:h-[2px] after:bg-secondary-container"
                  : "text-white hover:text-bracket-border font-medium"
              } text-sm flex items-center px-3 py-2 rounded-lg transition-colors`}
            >
              {t("nav_contact")}
            </Link>

            {/* Dropdown Galeri */}
            <div className="relative group py-2">
              <Link
                href="/#galeri"
                onClick={(e) => handleHashClick(e, "#galeri")}
                className={`nav-link-item relative ${
                  isGaleriPage
                    ? "text-secondary-container font-bold after:content-[''] after:absolute after:bottom-1 after:left-3 after:right-3 after:h-[2px] after:bg-secondary-container"
                    : "text-white hover:text-bracket-border font-medium"
                } text-sm inline-flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer`}
              >
                <span>{t("nav_gallery")}</span>
                <span
                  translate="no" className="material-symbols-outlined notranslate text-[16px] transition-transform duration-200 group-hover:rotate-180"
                >
                  expand_more
                </span>
              </Link>
              <div className="absolute left-0 top-full hidden group-hover:block w-64 bg-navbar-dark border border-white/10 shadow-2xl rounded-xl p-2 z-50">
                <Link
                  href="/galeri/pengaplikasian-produk"
                  className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                    isGaleriAplikasiPage
                      ? "bg-bracket-border text-white font-semibold"
                      : "text-white hover:bg-bracket-border"
                  }`}
                >
                  {t("nav_gallery_products")}
                </Link>
                <Link
                  href="/galeri/momen"
                  className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                    isGaleriMomenPage
                      ? "bg-bracket-border text-white font-semibold"
                      : "text-white hover:bg-bracket-border"
                  }`}
                >
                  {t("nav_gallery_moments")}
                </Link>
              </div>
            </div>

            <Link
              href="/#blog"
              onClick={(e) => handleHashClick(e, "#blog")}
              className="nav-link-item text-white hover:text-bracket-border font-medium text-sm flex items-center px-3 py-2 rounded-lg transition-colors"
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
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-bracket-border text-white flex items-center justify-center transition-all duration-300 shrink-0 cursor-pointer hover:shadow-[0_0_15px_rgba(246,84,86,0.6)] hover:scale-110 active:scale-95"
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all cursor-pointer active:scale-95 shadow-2xs"
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
            <Link
              href="/kontak#section-form"
              className="hidden md:inline-flex items-center justify-center px-3.5 py-1.5 rounded-full border border-white/30 text-white hover:bg-white/20 hover:border-bracket-border text-xs font-medium transition-all duration-300 hover:scale-105 active:scale-95 shrink-0 whitespace-nowrap hover:shadow-[0_0_12px_rgba(255,255,255,0.2)]"
            >
              {t("nav_download_catalog")}
            </Link>
            <Link
              href="/kontak#section-form"
              className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-bracket-border text-white hover:bg-primary text-xs font-semibold shadow-[0_4px_14px_rgba(246,84,86,0.39)] hover:shadow-[0_6px_20px_rgba(246,84,86,0.65)] transition-all duration-300 hover:scale-105 active:scale-95 shrink-0 whitespace-nowrap"
            >
              {t("nav_order_now")}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
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

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-navbar-dark border-t border-white/10 px-4 py-4 space-y-2">
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

            <Link
              href="/#beranda"
              onClick={(e) => handleMobileHashClick(e, "#beranda")}
              className="block px-3 py-2 rounded-lg text-white hover:bg-bracket-border text-sm font-medium"
            >
              {t("nav_home")}
            </Link>
            <Link
              href="/#tentang-kami"
              onClick={(e) => handleMobileHashClick(e, "#tentang-kami")}
              className="block px-3 py-2 rounded-lg text-white hover:bg-bracket-border text-sm font-medium"
            >
              {t("nav_about")}
            </Link>
            <Link
              href="/#perjalanan"
              onClick={(e) => handleMobileHashClick(e, "#perjalanan")}
              className="block px-3 py-2 rounded-lg text-white hover:bg-bracket-border text-sm font-medium"
            >
              {t("nav_journey")}
            </Link>
            <div>
              <div className="flex items-center justify-between px-3 py-1.5 text-xs font-bold text-white/50 uppercase tracking-wider">
                <span>{t("nav_products")}</span>
              </div>
              <div className="space-y-1 pl-2">
                <Link
                  href="/layanan"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg ${
                    isLayananPage
                      ? "bg-secondary-container text-white font-bold"
                      : "text-white hover:bg-bracket-border"
                  } text-sm font-medium`}
                >
                  {t("nav_services")}
                </Link>
                <Link
                  href="/produk/bahan-baku"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg ${
                    isBahanBakuPage
                      ? "bg-secondary-container text-white font-bold"
                      : "text-white hover:bg-bracket-border"
                  } text-sm font-medium`}
                >
                  {t("nav_materials")}
                </Link>
              </div>
            </div>
            <Link
              href="/#partner"
              onClick={(e) => handleMobileHashClick(e, "#partner")}
              className="block px-3 py-2 rounded-lg text-white hover:bg-bracket-border text-sm font-medium"
            >
              {t("nav_partner")}
            </Link>
            <Link
              href="/kontak"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg ${
                isContactPage
                  ? "bg-secondary-container text-white font-bold"
                  : "text-white hover:bg-bracket-border"
              } text-sm font-medium`}
            >
              {t("nav_contact")}
            </Link>
            <div>
              <div className="flex items-center justify-between px-3 py-1.5 text-xs font-bold text-white/50 uppercase tracking-wider">
                <span>{t("nav_gallery")}</span>
              </div>
              <div className="space-y-1 pl-2">
                <Link
                  href="/galeri/pengaplikasian-produk"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg ${
                    isGaleriAplikasiPage
                      ? "bg-secondary-container text-white font-bold"
                      : "text-white hover:bg-bracket-border"
                  } text-sm font-medium`}
                >
                  {t("nav_gallery_products")}
                </Link>
                <Link
                  href="/galeri/momen"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg ${
                    isGaleriMomenPage
                      ? "bg-secondary-container text-white font-bold"
                      : "text-white hover:bg-bracket-border"
                  } text-sm font-medium`}
                >
                  {t("nav_gallery_moments")}
                </Link>
              </div>
            </div>
            <Link
              href="/#blog"
              onClick={(e) => handleMobileHashClick(e, "#blog")}
              className="block px-3 py-2 rounded-lg text-white hover:bg-bracket-border text-sm font-medium"
            >
              {t("nav_blog")}
            </Link>

            {/* Mobile Order Now Button */}
            <div className="pt-3">
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

      {/* Search Interactive Modal */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 bg-navbar-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4 transition-all duration-300"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsSearchOpen(false);
          }}
        >
          <div className="w-full max-w-2xl bg-navbar-dark border border-bracket-border/40 rounded-2xl shadow-2xl p-4 sm:p-6 relative text-white">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-bracket-border animate-pulse"></span>
                <span className="font-label-meta text-xs uppercase tracking-wider text-surface-dim font-bold">
                  Pencarian Interaktif <span translate="no" className="notranslate">Pelangi UV</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-bracket-border text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Tutup pencarian"
              >
                <span
                  translate="no" className="material-symbols-outlined notranslate text-[18px]"
                >
                  close
                </span>
              </button>
            </div>

            <div className="relative flex items-center mb-3">
              <span
                translate="no" className="material-symbols-outlined notranslate absolute left-4 text-bracket-border text-[22px]"
              >
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                placeholder="Cari layanan, foil, spot uv, lem, atau artikel..."
                className="w-full h-12 pl-12 pr-10 rounded-xl bg-white/5 border border-white/15 text-white placeholder-text-muted text-sm font-body-md outline-none focus:border-bracket-border focus:bg-white/10 transition-all"
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-surface-dim hover:text-white cursor-pointer"
                >
                  <span
                    translate="no" className="material-symbols-outlined notranslate text-[18px]"
                  >
                    backspace
                  </span>
                </button>
              )}
            </div>

            <div className="max-h-[360px] overflow-y-auto no-scrollbar space-y-3 pt-1">
              {searchQuery.trim() ? (
                <div className="space-y-2">
                  <p className="text-[11px] font-label-meta uppercase tracking-wider text-bracket-border font-semibold">
                    Hasil Rekomendasi Cocok ({filteredSearch.length}):
                  </p>
                  <div className="space-y-1.5">
                    {filteredSearch.length === 0 ? (
                      <div className="p-4 text-center rounded-xl bg-white/5 text-surface-dim text-xs">
                        <p className="mb-1">
                          Tidak ada hasil pas untuk &quot;
                          <span className="text-white font-semibold">{searchQuery}</span>
                          &quot;
                        </p>
                        <p className="text-[11px] text-text-muted">
                          Coba kata kunci lain seperti: foil, uv, lem, laminasi, atau pond.
                        </p>
                      </div>
                    ) : (
                      filteredSearch.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.link}
                          onClick={() => setIsSearchOpen(false)}
                          className="search-item flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-bracket-border transition-all group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-lg bg-bracket-border/20 text-bracket-border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                              <span
                                translate="no" className="material-symbols-outlined notranslate text-[18px]"
                              >
                                {item.icon}
                              </span>
                            </div>
                            <div className="text-left min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-xs font-bold text-white group-hover:text-bracket-border truncate">
                                  {item.title}
                                </p>
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-label-meta bg-white/10 text-accent-gold shrink-0">
                                  {item.tag}
                                </span>
                              </div>
                              <p className="text-[11px] text-surface-dim truncate mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                          <span
                            translate="no" className="material-symbols-outlined notranslate text-[18px] text-surface-dim group-hover:text-bracket-border group-hover:translate-x-1 transition-all ml-2 shrink-0"
                          >
                            arrow_forward
                          </span>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-label-meta uppercase tracking-wider text-surface-dim font-semibold flex items-center gap-1.5">
                        <span
                          translate="no" className="material-symbols-outlined notranslate text-[14px] text-accent-gold"
                        >
                          trending_up
                        </span>{" "}
                        Tren Pencarian Populer
                      </p>
                      <span className="text-[11px] text-surface-dim/70">
                        Klik untuk mengisi
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Hot Stamp Foil Gold/Silver",
                        "Spot UV Vernis Kilap",
                        "Laminating Thermal Doff & Gloss",
                        "Cast and Cure Hologram",
                        "Lem Wet & Dry Food Grade",
                        "Pond & Window Patch",
                      ].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          translate="no"
                          onClick={() => setSearchQuery(tag)}
                          className="notranslate px-3 py-1 rounded-full bg-white/5 hover:bg-bracket-border hover:text-white text-surface-dim text-xs transition-colors cursor-pointer border border-white/10"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <p className="text-[11px] font-label-meta uppercase tracking-wider text-surface-dim font-semibold flex items-center gap-1.5">
                      <span
                        translate="no" className="material-symbols-outlined notranslate text-[14px] text-bracket-border"
                      >
                        verified
                      </span>{" "}
                      Layanan & Produk Rekomendasi Utama
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {searchCatalog.slice(0, 4).map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.link}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-bracket-border transition-all group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-bracket-border/20 text-bracket-border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <span
                              translate="no" className="material-symbols-outlined notranslate text-[18px]"
                            >
                              {item.icon}
                            </span>
                          </div>
                          <div className="min-w-0 text-left">
                            <p className="text-xs font-bold text-white group-hover:text-bracket-border truncate">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-surface-dim truncate">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-surface-dim font-label-meta">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-[10px] text-white">
                  ESC
                </kbd>{" "}
                untuk menutup
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

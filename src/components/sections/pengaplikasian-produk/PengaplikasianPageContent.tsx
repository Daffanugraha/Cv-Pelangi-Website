"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  GalleryProduct,
  DEFAULT_GALLERY_PRODUCTS,
} from "@/lib/data/galleryProducts";
import PengaplikasianHero from "./PengaplikasianHero";
import PengaplikasianFilters from "./PengaplikasianFilters";
import PengaplikasianGrid from "./PengaplikasianGrid";
import PengaplikasianPagination from "./PengaplikasianPagination";
import PengaplikasianEducationGuide from "./PengaplikasianEducationGuide";
import PengaplikasianDetailModal from "./PengaplikasianDetailModal";

const ITEMS_PER_PAGE = 6;

export default function PengaplikasianPageContent() {
  // 1. Filter state
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 2. State produk yang disinkronkan langsung dari Admin Galeri
  const [adminProducts, setAdminProducts] = useState<GalleryProduct[] | null>(null);

  useEffect(() => {
    fetch("/api/admin/gallery?type=produk", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: any[]) => {
        if (Array.isArray(data)) {
          const mapped: GalleryProduct[] = data
            .filter((item) => !item.galleryType || item.galleryType === "produk")
            .map((item) => {
              const defaultItem = DEFAULT_GALLERY_PRODUCTS.find((d) => d.id === item.id);
              const catLower = (item.category || "").toLowerCase();
              let catKey: "kosmetik" | "makanan" | "buku" | "identity" | "paperbag" | "rokok" = defaultItem?.category || "kosmetik";
              if (catLower.includes("food") || catLower.includes("makan")) catKey = "makanan";
              else if (catLower.includes("book") || catLower.includes("buku") || catLower.includes("hardcover")) catKey = "buku";
              else if (catLower.includes("bag") || catLower.includes("paper")) catKey = "paperbag";
              else if (catLower.includes("rokok")) catKey = "rokok";
              else if (catLower.includes("ident") || catLower.includes("kartu")) catKey = "identity";

              return {
                id: item.id,
                category: catKey,
                categoryLabel: item.category || defaultItem?.categoryLabel || "Kemasan Khusus",
                title: item.title,
                desc: item.desc || defaultItem?.desc || `${item.technique || "Finishing Khusus"} — hasil finishing presisi tinggi CV Pelangi UV.`,
                tag: item.tag || defaultItem?.tag || item.technique || "Custom Finishing",
                badges: item.badges || defaultItem?.badges || [item.technique, item.category, "Custom Spec"].filter(Boolean),
                finishing: item.technique || defaultItem?.finishing || "Spot UV / Hot Stamp",
                material: item.material || defaultItem?.material || "Sesuai permintaan percetakan mitra",
                notes: item.notes || defaultItem?.notes || "Diproduksi dengan kalibrasi presisi tinggi oleh tim spesialis CV Pelangi UV.",
                highlight: item.highlight || defaultItem?.highlight || "Presisi CV Pelangi UV",
                img: item.imageUrl,
                paperSuitability: item.paperSuitability || defaultItem?.paperSuitability,
                resultCharacteristics: item.resultCharacteristics || defaultItem?.resultCharacteristics,
                alternativeOption: item.alternativeOption || defaultItem?.alternativeOption,
                objectPosition: item.objectPosition || defaultItem?.objectPosition || "center",
              };
            });
          setAdminProducts(mapped);
        }
      })
      .catch(() => {});
  }, []);

  // 3. Gunakan data admin saat sudah termuat, atau fallback default saat loading
  const allProducts = useMemo(() => {
    return adminProducts !== null ? adminProducts : DEFAULT_GALLERY_PRODUCTS;
  }, [adminProducts]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchFilter = activeFilter === "all" || p.category === activeFilter;
      const matchSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.finishing.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [allProducts, activeFilter, searchQuery]);

  // 4. Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;

  // Auto-correct page if filteredProducts shrink
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const gridEl = document.getElementById("pengaplikasian-grid");
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleResetFilter = () => {
    setActiveFilter("all");
    setSearchQuery("");
    setCurrentPage(1);
  };

  // 5. Modal State
  const [selectedProduct, setSelectedProduct] = useState<GalleryProduct | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProduct(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div
      suppressHydrationWarning
      className="w-full bg-surface min-h-screen font-sans text-text-body antialiased selection:bg-bracket-border selection:text-white"
    >
      {/* 1. TOP BREADCRUMB & HERO SHOWCASE */}
      <PengaplikasianHero />

      {/* 2. FILTER & SEARCH CONTROLS */}
      <PengaplikasianFilters
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* 3. INTERACTIVE PRODUCT GALLERY SHOWCASE */}
      <PengaplikasianGrid
        products={paginatedProducts}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onResetFilter={handleResetFilter}
      />

      {/* 4. PAGINATION CONTROLS (1 2 3 ... N) */}
      <PengaplikasianPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* 5. EDUCATIONAL SELECTION GUIDE (PANDUAN SELEKSI PASCA-CETAK) */}
      <PengaplikasianEducationGuide />

      {/* 6. INTERACTIVE SPECIFICATION MODAL (POPUP INSPEKSI FINISHING) */}
      <PengaplikasianDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

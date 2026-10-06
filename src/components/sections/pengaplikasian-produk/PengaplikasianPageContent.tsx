"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  GalleryProduct,
  DEFAULT_GALLERY_PRODUCTS,
} from "@/lib/data/galleryProducts";
import PengaplikasianHero from "./PengaplikasianHero";
import PengaplikasianFilters from "./PengaplikasianFilters";
import PengaplikasianGrid from "./PengaplikasianGrid";
import PengaplikasianEducationGuide from "./PengaplikasianEducationGuide";
import PengaplikasianDetailModal from "./PengaplikasianDetailModal";

export default function PengaplikasianPageContent() {
  // 1. Filter state
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // 2. Admin gallery items merge (if any uploaded from admin panel)
  const [extraGallery, setExtraGallery] = useState<GalleryProduct[]>([]);

  useEffect(() => {
    fetch("/api/admin/gallery")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: any[]) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped: GalleryProduct[] = data.map((item) => ({
            id: item.id,
            category: "kosmetik",
            categoryLabel: item.category || "Kemasan Khusus",
            title: item.title,
            desc: `${item.technique} — hasil finishing presisi tinggi CV Pelangi UV.`,
            tag: item.technique || "Custom Finishing",
            badges: [item.technique, item.category, "Custom Spec"].filter(Boolean),
            finishing: item.technique,
            material: "Sesuai permintaan percetakan mitra",
            notes: "Diproduksi dengan kalibrasi ketat di pabrik Bizpark Sidoarjo.",
            highlight: "Presisi Pabrik Bizpark",
            img: item.imageUrl,
          }));
          setExtraGallery(mapped);
        }
      })
      .catch(() => {});
  }, []);

  // 3. Combined products
  const allProducts = useMemo(() => {
    return [...DEFAULT_GALLERY_PRODUCTS, ...extraGallery];
  }, [extraGallery]);

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

  // 4. Modal State
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
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 3. INTERACTIVE PRODUCT GALLERY SHOWCASE */}
      <PengaplikasianGrid
        products={filteredProducts}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onResetFilter={() => {
          setActiveFilter("all");
          setSearchQuery("");
        }}
      />

      {/* 4. EDUCATIONAL SELECTION GUIDE (PANDUAN SELEKSI PASCA-CETAK) */}
      <PengaplikasianEducationGuide />

      {/* 5. INTERACTIVE SPECIFICATION MODAL (POPUP INSPEKSI FINISHING) */}
      <PengaplikasianDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { rawMaterialCategories } from "@/lib/data/rawMaterials";
import BahanBakuHero from "./BahanBakuHero";
import BahanBakuStandards from "./BahanBakuStandards";
import BahanBakuCatalog from "./BahanBakuCatalog";
import BahanBakuOrderForm from "./BahanBakuOrderForm";
import BahanBakuPricelistModal from "./BahanBakuPricelistModal";
import BahanBakuSampleModal from "./BahanBakuSampleModal";

export default function BahanBakuPageContent() {
  const [isPricelistOpen, setIsPricelistOpen] = useState(false);
  const [pricelistCategory, setPricelistCategory] = useState<"opp" | "foil" | "lem" | "spotuv">("opp");
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [sampleCategory, setSampleCategory] = useState<"opp" | "foil" | "lem" | "spotuv">("opp");

  const handleOpenPricelist = (categoryId?: "opp" | "foil" | "lem" | "spotuv") => {
    if (categoryId) setPricelistCategory(categoryId);
    setIsPricelistOpen(true);
  };

  const handleSelectCategoryCard = (categoryId: "opp" | "foil" | "lem" | "spotuv") => {
    const card = document.getElementById(`product-card-${categoryId}`);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.classList.add("ring-4", "ring-bracket-border", "scale-[1.02]");
      setTimeout(() => {
        card.classList.remove("ring-4", "ring-bracket-border", "scale-[1.02]");
      }, 2500);
    }
  };

  const handleRequestSample = (categoryId?: "opp" | "foil" | "lem" | "spotuv") => {
    if (categoryId) setSampleCategory(categoryId);
    setIsPricelistOpen(false);
    const formEl = document.getElementById("form-sample-gratis");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col w-full bg-surface-canvas selection:bg-bracket-border selection:text-white">
      {/* 1. Hero with Breadcrumb, Search, and Recommendations */}
      <BahanBakuHero
        categories={rawMaterialCategories}
        onOpenPricelist={handleOpenPricelist}
        onSelectCategoryCard={handleSelectCategoryCard}
      />

      {/* 2. Standards of Quality (4 Pillars) */}
      <BahanBakuStandards />

      {/* 3. Product Catalog with 4 Main Cards */}
      <BahanBakuCatalog
        categories={rawMaterialCategories}
        onOpenPricelist={handleOpenPricelist}
        onRequestSample={handleRequestSample}
      />

      {/* 4. Unified Sample Request Form */}
      <BahanBakuOrderForm requestedCategory={sampleCategory} />

      {/* Interactive Modals */}
      <BahanBakuPricelistModal
        isOpen={isPricelistOpen}
        onClose={() => setIsPricelistOpen(false)}
        initialCategory={pricelistCategory}
        categories={rawMaterialCategories}
        onRequestSample={handleRequestSample}
      />

      <BahanBakuSampleModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
        defaultCategory={sampleCategory}
      />
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { MaterialCategory } from "@/lib/data/rawMaterials";

interface BahanBakuOrderFormProps {
  categories?: MaterialCategory[];
  requestedCategory?: string;
}

interface RawMaterialOption {
  name: string;
  icon: string;
  shortDesc: string;
  variants: string[];
}

const RAW_MATERIAL_OPTIONS: Record<string, RawMaterialOption> = {
  opp: {
    name: "1. Film BOPP Thermal / Waterbase",
    icon: "layers",
    shortDesc: "Doff Velvet, Glossy & Waterbase Film",
    variants: [
      "Semua Varian Film BOPP (Doff & Glossy)",
      "BOPP Thermal Doff Velvet 18 mic",
      "BOPP Thermal Glossy 24 mic",
      "BOPP Waterbase Doff 15 mic",
      "BOPP Waterbase Glossy 12 mic",
      "PET Metalized Silver 20 mic",
    ],
  },
  foil: {
    name: "2. Roll Foil Hot & Cold Stamping",
    icon: "auto_awesome",
    shortDesc: "Gold, Silver, Hologram & Cold Foil",
    variants: [
      "Semua Varian Foil (Gold, Silver & Hologram)",
      "Roll Foil Gold Mewah 120m (Grade A+)",
      "Roll Foil Silver Mirror 120m",
      "Roll Foil Hologram Prismatik Pelangi",
      "Roll Cold Foil Inline UV Silver",
      "Roll Cold Foil Inline UV Gold",
    ],
  },
  lem: {
    name: "3. Lem Laminating Industri",
    icon: "water_drop",
    shortDesc: "Lem Wet Emulsi & Dry Laminating",
    variants: [
      "Semua Varian Lem (Wet & Dry)",
      "Lem Wet Laminating Emulsi Waterbase",
      "Lem Dry Laminating Solventless",
      "Lem Karton Packaging Food Grade",
      "Lem Hot Melt Roller Coating",
    ],
  },
  spotuv: {
    name: "4. Varnish & Tinta Spot UV",
    icon: "brush",
    shortDesc: "LumineX High Gloss & Doff Pasir",
    variants: [
      "Semua Varian Spot UV (Gloss & Pasir)",
      "Varnish UV High Gloss LumineX (98 GU)",
      "Tinta Spot UV Efek Pasir (Sand Texture)",
      "Varnish Spot UV Matte Doff Halus",
      "UV Curing Screen Printing Coating",
    ],
  },
  all: {
    name: "5. Paket Lengkap (Semua 4 Kategori Bahan)",
    icon: "all_inclusive",
    shortDesc: "BOPP, Foil, Lem, & Spot UV Komplit",
    variants: [
      "Paket Swatch Komplit (BOPP, Foil, Lem, & Spot UV)",
      "Paket Khusus Kemasan Box Karton & Packaging",
      "Paket Khusus Percetakan Hardbox & Undangan Mewah",
    ],
  },
};

export default function BahanBakuOrderForm({
  requestedCategory,
}: BahanBakuOrderFormProps) {
  const [picName, setPicName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Surabaya");
  const [notes, setNotes] = useState("");

  // Dropdown states (matching Layanan Finishing)
  const [selectedCategory, setSelectedCategory] = useState<string>("opp");
  const [selectedVariant, setSelectedVariant] = useState<string>(
    RAW_MATERIAL_OPTIONS.opp.variants[0]
  );

  // Multi-select list of chosen samples
  const [chosenSamples, setChosenSamples] = useState<
    { categoryId: string; categoryName: string; variantName: string; icon: string }[]
  >([
    {
      categoryId: "opp",
      categoryName: "Film BOPP Thermal / Waterbase",
      variantName: "BOPP Thermal Doff Velvet 18 mic",
      icon: "layers",
    },
  ]);

  // Sync when requestedCategory prop changes
  useEffect(() => {
    if (!requestedCategory) return;
    const cat = requestedCategory === "foil-stamping" ? "foil" : requestedCategory;
    if (RAW_MATERIAL_OPTIONS[cat]) {
      setSelectedCategory(cat);
      const defaultVariant = RAW_MATERIAL_OPTIONS[cat].variants[1] || RAW_MATERIAL_OPTIONS[cat].variants[0];
      setSelectedVariant(defaultVariant);
      setChosenSamples((prev) => {
        const exists = prev.some((p) => p.categoryId === cat);
        if (!exists) {
          return [
            ...prev,
            {
              categoryId: cat,
              categoryName: RAW_MATERIAL_OPTIONS[cat].name.replace(/^\d+\.\s*/, ""),
              variantName: defaultVariant,
              icon: RAW_MATERIAL_OPTIONS[cat].icon,
            },
          ];
        }
        return prev;
      });
    }
  }, [requestedCategory]);

  const handleCategoryChange = (catKey: string) => {
    setSelectedCategory(catKey);
    const firstVariant = RAW_MATERIAL_OPTIONS[catKey]?.variants[0] || "";
    setSelectedVariant(firstVariant);
  };

  // Add the currently selected dropdown variant into multi-select list
  const handleAddCurrentVariant = () => {
    const opt = RAW_MATERIAL_OPTIONS[selectedCategory];
    if (!opt) return;
    const cleanCatName = opt.name.replace(/^\d+\.\s*/, "");
    const exists = chosenSamples.some(
      (s) => s.categoryId === selectedCategory && s.variantName === selectedVariant
    );
    if (!exists) {
      setChosenSamples((prev) => [
        ...prev,
        {
          categoryId: selectedCategory,
          categoryName: cleanCatName,
          variantName: selectedVariant,
          icon: opt.icon,
        },
      ]);
    }
  };

  // Toggle quick category selection (Checkbox / Card Click)
  const toggleQuickCategory = (catKey: string) => {
    const opt = RAW_MATERIAL_OPTIONS[catKey];
    if (!opt) return;
    const cleanCatName = opt.name.replace(/^\d+\.\s*/, "");
    const isAlreadySelected = chosenSamples.some((s) => s.categoryId === catKey);

    if (isAlreadySelected) {
      // Remove all samples under this category
      setChosenSamples((prev) => prev.filter((s) => s.categoryId !== catKey));
    } else {
      // Add default variant for this category
      const variantToAdd = opt.variants[1] || opt.variants[0];
      setChosenSamples((prev) => [
        ...prev,
        {
          categoryId: catKey,
          categoryName: cleanCatName,
          variantName: variantToAdd,
          icon: opt.icon,
        },
      ]);
      setSelectedCategory(catKey);
      setSelectedVariant(variantToAdd);
    }
  };

  // Select all 4 categories at once
  const handleSelectAllCategories = () => {
    const allList: { categoryId: string; categoryName: string; variantName: string; icon: string }[] = [];
    (["opp", "foil", "lem", "spotuv"] as const).forEach((key) => {
      const opt = RAW_MATERIAL_OPTIONS[key];
      allList.push({
        categoryId: key,
        categoryName: opt.name.replace(/^\d+\.\s*/, ""),
        variantName: opt.variants[0],
        icon: opt.icon,
      });
    });
    setChosenSamples(allList);
    setSelectedCategory("all");
    setSelectedVariant(RAW_MATERIAL_OPTIONS.all.variants[0]);
  };

  // Remove a specific sample chip
  const handleRemoveSample = (index: number) => {
    setChosenSamples((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure at least the currently selected dropdown item is included if list is empty
    let sampleList = chosenSamples;
    if (sampleList.length === 0) {
      const opt = RAW_MATERIAL_OPTIONS[selectedCategory];
      sampleList = [
        {
          categoryId: selectedCategory,
          categoryName: opt.name.replace(/^\d+\.\s*/, ""),
          variantName: selectedVariant,
          icon: opt.icon,
        },
      ];
    }

    const sampleTextList = sampleList
      .map((item, idx) => `${idx + 1}. *${item.categoryName}* — ${item.variantName}`)
      .join("\n");

    let text =
      `*FORMULIR PERMINTAAN SAMPEL BAHAN GRATIS*\n` +
      `*CV PELANGI UV — BIZPARK SIDOARJO*\n\n` +
      `*Nama Lengkap / PIC:* ${picName.trim() || "-"}\n` +
      `*Perusahaan / Percetakan:* ${companyName.trim() || "-"}\n` +
      `*Nomor WhatsApp:* ${phone.trim() || "-"}\n` +
      `*Alamat Pengiriman:* ${address.trim() || "-"}\n` +
      `*Kota / Wilayah Tujuan:* ${city.trim() || "-"}\n\n` +
      `*Total Sampel yang Diminta (${sampleList.length} Bahan):*\n${sampleTextList}\n\n` +
      (notes.trim() ? `*Catatan Spesifikasi / Kebutuhan:* ${notes.trim()}\n\n` : "") +
      `Mohon konfirmasi ketersediaan dan jadwal pengiriman paket sampel fisiknya. Terima kasih!`;

    const url = `https://wa.me/6282231019363?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section
      id="form-sample-gratis"
      className="w-full py-16 lg:py-24 bg-surface-canvas relative overflow-hidden"
    >
      {/* Anchor for backward compatibility */}
      <span id="form-konsultasi-bahan" className="sr-only" />

      {/* Ambient background decoration */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-divider-tint/30 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-surface-tint-light/60 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header Matching Layanan */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="px-5 py-2 rounded-full bg-secondary-container text-on-primary font-cta-pill text-cta-pill shadow-[0_4px_16px_rgba(246,84,86,0.25)] inline-block mb-4">
            Permintaan Sampel Fisik Gratis
          </span>
          <h2 className="font-headline-xl text-headline-xl font-extrabold text-navbar-black sm:text-4xl lg:text-[42px] leading-tight">
            Minta Sampel Bahan Gratis
          </h2>
          <p className="font-body-lg text-body-lg text-text-muted mt-3 max-w-2xl mx-auto leading-relaxed">
            Ingin mencoba kualitas bahan terlebih dahulu sebelum memesan? Isi formulir di bawah ini untuk mendapatkan contoh fisik bahan langsung ke alamat Anda, atau konsultasikan kebutuhan percetakan Anda dengan tim kami.
          </p>
        </div>

        {/* Outer Card Matching Layanan Finishing */}
        <div className="w-full max-w-5xl mx-auto rounded-[32px] bg-surface-container-lowest p-8 sm:p-12 lg:p-14 shadow-[0_20px_60px_-15px_rgba(246,84,86,0.16)] border border-divider-tint/60 relative overflow-hidden">
          {/* Decorative Corner Background Blob */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-surface-tint-light/60 rounded-bl-[120px] pointer-events-none -z-0" />

          {/* Card Header Matching Layanan Finishing */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-surface-container">
            <div>
              <h3 className="font-headline-md text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-navbar-black tracking-tight leading-tight">
                Formulir Permintaan Sampel Bahan Gratis
              </h3>
              <p className="text-sm sm:text-base text-text-muted mt-1.5 leading-relaxed">
                Pilih satu atau lebih sampel material cetak yang ingin Anda uji coba di workshop atau mesin produksi Anda.
              </p>
            </div>
            <span className="w-14 h-14 rounded-2xl bg-surface-tint-light flex items-center justify-center text-secondary-container shrink-0 shadow-xs border border-divider-tint/40">
              <span translate="no" className="material-symbols-outlined notranslate text-[30px]">
                redeem
              </span>
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Row 1: Nama Lengkap & Perusahaan (Grid 2 Kolom) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="sample_form_pic"
                  className="font-label-nav text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5"
                >
                  Nama Lengkap / PIC <span className="text-primary text-sm">*</span>
                </label>
                <input
                  type="text"
                  id="sample_form_pic"
                  required
                  value={picName}
                  onChange={(e) => setPicName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface placeholder:text-text-muted focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="sample_form_company"
                  className="font-label-nav text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5"
                >
                  Nama Usaha / Percetakan <span className="text-primary text-sm">*</span>
                </label>
                <input
                  type="text"
                  id="sample_form_company"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Contoh: Percetakan Jaya / PT Grafika Mandiri"
                  className="w-full h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface placeholder:text-text-muted focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Row 2: WhatsApp & Kota (Grid 2 Kolom) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="sample_form_phone"
                  className="font-label-nav text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5"
                >
                  Nomor WhatsApp Aktif <span className="text-primary text-sm">*</span>
                </label>
                <input
                  type="tel"
                  id="sample_form_phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contoh: 0812 3456 7890"
                  className="w-full h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface placeholder:text-text-muted focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="sample_form_city"
                  className="font-label-nav text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5"
                >
                  Kota / Wilayah Tujuan <span className="text-primary text-sm">*</span>
                </label>
                <input
                  type="text"
                  id="sample_form_city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Contoh: Surabaya / Sidoarjo / Jakarta"
                  className="w-full h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface placeholder:text-text-muted focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Row 3: Alamat Pengiriman Lengkap */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="sample_form_address"
                className="font-label-nav text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5"
              >
                Alamat Pengiriman Lengkap <span className="text-primary text-sm">*</span>
              </label>
              <input
                type="text"
                id="sample_form_address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Contoh: Jl. Ahmad Yani No. 12, Kel. Wonokromo, Pergudangan Bizpark Blok A"
                className="w-full h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface placeholder:text-text-muted focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all"
              />
            </div>

            {/* Row 4: Dropdowns Kategori & Varian (MIRIP PERSIS LAYANAN FINISHING) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
              <div className="flex flex-col gap-2">
                <label className="font-label-nav text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5">
                  Pilihan Kategori Bahan Utama <span className="text-primary text-sm">*</span>
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all cursor-pointer font-medium"
                >
                  <option value="opp">1. Film BOPP Thermal / Waterbase</option>
                  <option value="foil">2. Roll Foil Hot &amp; Cold Stamping</option>
                  <option value="lem">3. Lem Laminating Industri</option>
                  <option value="spotuv">4. Varnish &amp; Tinta Spot UV</option>
                  <option value="all">5. Paket Lengkap (Semua 4 Kategori Bahan)</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="font-label-nav text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5">
                    Pilihan Varian Spesifik <span className="text-primary text-sm">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAddCurrentVariant}
                    className="text-xs font-bold text-secondary-container hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span translate="no" className="material-symbols-outlined notranslate text-[16px]">
                      add_circle
                    </span>
                    + Tambah ke Daftar
                  </button>
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedVariant}
                    onChange={(e) => setSelectedVariant(e.target.value)}
                    className="flex-1 h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all cursor-pointer font-medium"
                  >
                    {RAW_MATERIAL_OPTIONS[selectedCategory]?.variants.map((variant) => (
                      <option key={variant} value={variant}>
                        {variant}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleAddCurrentVariant}
                    title="Tambahkan varian ini ke daftar sampel Anda"
                    className="px-4 h-14 rounded-2xl bg-secondary-container hover:bg-primary text-on-primary font-cta-pill text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-xs cursor-pointer active:scale-95"
                  >
                    <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                      add
                    </span>
                    <span className="hidden md:inline">Tambah</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Row 5: KONTROL MULTI-SELECT SAMPEL (BISA PILIH LEBIH DARI SATU DENGAN SANGAT MUDAH) */}
            <div className="p-5 rounded-2xl bg-surface-neutral-alt/70 border border-surface-container space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <div className="text-xs sm:text-sm font-bold text-navbar-black flex items-center gap-2">
                    <span translate="no" className="material-symbols-outlined notranslate text-secondary-container text-[18px]">
                      checklist
                    </span>
                    <span>Pilihan Cepat Kategori Bahan (Bisa Pilih Lebih dari 1)</span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container/15 text-secondary-container text-[11px] font-bold">
                      {chosenSamples.length} Terpilih
                    </span>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">
                    Centang kategori bahan di bawah untuk memilih beberapa sampel sekaligus:
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSelectAllCategories}
                  className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-white hover:bg-surface-tint-light text-secondary-container font-cta-pill text-xs font-bold border border-divider-tint/70 shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span translate="no" className="material-symbols-outlined notranslate text-[15px]">
                    select_all
                  </span>
                  Pilih Semua 4 Bahan Sekaligus
                </button>
              </div>

              {/* 4 Quick Category Cards (Centang Cepat Lebih dari 1) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {(["opp", "foil", "lem", "spotuv"] as const).map((key) => {
                  const opt = RAW_MATERIAL_OPTIONS[key];
                  const isChecked = chosenSamples.some((s) => s.categoryId === key);
                  return (
                    <div
                      key={key}
                      onClick={() => toggleQuickCategory(key)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 select-none ${
                        isChecked
                          ? "bg-surface-tint-light border-bracket-border shadow-xs"
                          : "bg-white border-surface-container hover:border-outline-variant hover:bg-surface-neutral-alt"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isChecked
                              ? "bg-bracket-border text-white shadow-2xs"
                              : "bg-surface-neutral-alt text-text-muted"
                          }`}
                        >
                          <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                            {opt.icon}
                          </span>
                        </span>
                        <div className="min-w-0">
                          <div
                            className={`text-xs font-bold truncate leading-tight ${
                              isChecked ? "text-navbar-black" : "text-on-surface"
                            }`}
                          >
                            {opt.name.replace(/^\d+\.\s*/, "")}
                          </div>
                          <div className="text-[11px] text-text-muted truncate mt-0.5">
                            {opt.shortDesc}
                          </div>
                        </div>
                      </div>

                      {/* Custom Checkbox */}
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                          isChecked
                            ? "bg-bracket-border border-bracket-border text-white"
                            : "border-outline-variant bg-white"
                        }`}
                      >
                        {isChecked && (
                          <span translate="no" className="material-symbols-outlined notranslate text-[15px]">
                            check
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Daftar Sampel yang Sedang Dipilih (Chips dengan tombol hapus X) */}
              {chosenSamples.length > 0 && (
                <div className="pt-2 border-t border-surface-container/80">
                  <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Sampel yang Akan Dikirimkan ({chosenSamples.length}):</span>
                    <button
                      type="button"
                      onClick={() => setChosenSamples([])}
                      className="text-text-muted hover:text-primary transition-colors text-[11px]"
                    >
                      Kosongkan Semua
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {chosenSamples.map((sample, idx) => (
                      <span
                        key={`${sample.categoryId}-${sample.variantName}-${idx}`}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-bracket-border/40 text-on-surface font-label-nav text-xs shadow-2xs group"
                      >
                        <span translate="no" className="material-symbols-outlined notranslate text-[15px] text-secondary-container">
                          {sample.icon}
                        </span>
                        <span className="font-semibold text-navbar-black">
                          {sample.categoryName}:
                        </span>
                        <span className="text-text-body">{sample.variantName}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveSample(idx);
                          }}
                          className="w-4 h-4 rounded-full bg-surface-container hover:bg-primary hover:text-white flex items-center justify-center text-text-muted transition-colors cursor-pointer"
                          title="Hapus sampel ini"
                        >
                          <span translate="no" className="material-symbols-outlined notranslate text-[12px]">
                            close
                          </span>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Row 6: Catatan Tambahan */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="sample_form_notes"
                className="font-label-nav text-xs sm:text-sm font-bold text-on-surface"
              >
                Catatan Spesifikasi (Opsional: Ukuran Roll, Gramatur Kertas, Pertanyaan Khusus)
              </label>
              <textarea
                id="sample_form_notes"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tuliskan spesifikasi detail kebutuhan Anda (misal: Art Carton 260gsm, Ivory 300gsm, ukuran mesin laminating, atau warna foil tertentu)..."
                className="w-full p-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface placeholder:text-text-muted focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all leading-relaxed"
              />
            </div>

            {/* Row 7: Action Buttons Matching Layanan Finishing */}
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                className="flex-1 w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-secondary-container hover:bg-primary text-on-primary font-cta-pill text-base sm:text-lg font-bold transition-all shadow-[0_10px_25px_rgba(246,84,86,0.38)] cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[24px]">
                  send
                </span>
                <span>
                  Kirim Permintaan Sampel via WhatsApp ({chosenSamples.length || 1} Bahan)
                </span>
              </button>

              <a
                href="https://wa.me/6282231019363?text=Halo%20Tim%20Pelangi%20UV%2C%20saya%20ingin%20konsultasi%20bahan%20baku"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full bg-surface-neutral-alt hover:bg-white border border-surface-container text-on-surface font-cta-pill text-base font-bold transition-all shadow-xs hover:border-bracket-border shrink-0 cursor-pointer"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[22px] text-action-whatsapp">
                  chat
                </span>
                <span>Konsultasi Langsung CS</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

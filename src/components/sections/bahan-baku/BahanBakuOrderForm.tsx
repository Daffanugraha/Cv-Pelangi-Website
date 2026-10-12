"use client";

import React, { useState, useEffect } from "react";
import { MaterialCategory } from "@/lib/data/rawMaterials";

interface BahanBakuOrderFormProps {
  categories?: MaterialCategory[];
  requestedCategory?: string;
}

interface RawMaterialOption {
  name: string;
  variants: string[];
}

const RAW_MATERIAL_OPTIONS: Record<string, RawMaterialOption> = {
  opp: {
    name: "1. Film BOPP Thermal & Waterbase",
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
    variants: [
      "Semua Varian Spot UV (Gloss & Pasir)",
      "Varnish UV High Gloss LumineX (98 GU)",
      "Tinta Spot UV Efek Pasir (Sand Texture)",
      "Varnish Spot UV Matte Doff Halus",
      "UV Curing Screen Printing Coating",
    ],
  },
  all: {
    name: "5. Paket Lengkap (Semua Kategori Bahan Baku)",
    variants: [
      "Paket Swatch Komplit (BOPP, Foil, Lem, & Spot UV)",
      "Paket Khusus Kemasan Box Karton & Packaging",
      "Paket Khusus Percetakan Hardbox & Undangan",
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

  // Dropdown states (1:1 seperti Layanan Finishing)
  const [selectedCategory, setSelectedCategory] = useState<string>("opp");
  const [selectedVariant, setSelectedVariant] = useState<string>(
    RAW_MATERIAL_OPTIONS.opp.variants[0]
  );

  // Sync when requestedCategory prop changes
  useEffect(() => {
    if (!requestedCategory) return;
    const cat = requestedCategory === "foil-stamping" ? "foil" : requestedCategory;
    if (RAW_MATERIAL_OPTIONS[cat]) {
      setSelectedCategory(cat);
      setSelectedVariant(RAW_MATERIAL_OPTIONS[cat].variants[0]);
    }
  }, [requestedCategory]);

  const handleCategoryChange = (catKey: string) => {
    setSelectedCategory(catKey);
    const firstVariant = RAW_MATERIAL_OPTIONS[catKey]?.variants[0] || "";
    setSelectedVariant(firstVariant);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const catData = RAW_MATERIAL_OPTIONS[selectedCategory];
    const categoryName = catData ? catData.name.replace(/^\d+\.\s*/, "") : "Bahan Baku";

    let text =
      `*FORMULIR PERMINTAAN SAMPEL BAHAN GRATIS*\n` +
      `*CV PELANGI UV — BIZPARK SIDOARJO*\n\n` +
      `*Nama Lengkap / PIC:* ${picName.trim() || "-"}\n` +
      `*Perusahaan / Percetakan:* ${companyName.trim() || "-"}\n` +
      `*Nomor WhatsApp:* ${phone.trim() || "-"}\n` +
      `*Alamat Pengiriman:* ${address.trim() || "-"}\n` +
      `*Kota / Wilayah Tujuan:* ${city.trim() || "-"}\n\n` +
      `*Pilihan Kategori Bahan:* ${categoryName}\n` +
      `*Varian Spesifik:* ${selectedVariant}\n\n` +
      (notes.trim() ? `*Catatan Spesifikasi:* ${notes.trim()}\n\n` : "") +
      `Mohon info ketersediaan dan jadwal pengiriman sampel fisiknya. Terima kasih!`;

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
            Ingin mencoba kualitas bahan terlebih dahulu sebelum memesan? Isi formulir di bawah ini untuk mendapatkan contoh fisik bahan langsung ke alamat Anda, atau hubungi langsung via WhatsApp resmi.
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
                Pilih kategori dan varian bahan yang ingin Anda uji coba di workshop atau mesin produksi Anda.
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
                  placeholder="Contoh: PT Grafika Prima / CV Mandiri"
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

            {/* Row 4: Dropdowns Kategori & Varian (1:1 PERSIS SEPERTI LAYANAN FINISHING) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-label-nav text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5">
                  Pilihan Kategori Bahan Utama <span className="text-primary text-sm">*</span>
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all cursor-pointer font-medium"
                >
                  <option value="opp">1. Film BOPP Thermal &amp; Waterbase</option>
                  <option value="foil">2. Roll Foil Hot &amp; Cold Stamping</option>
                  <option value="lem">3. Lem Laminating Industri</option>
                  <option value="spotuv">4. Varnish &amp; Tinta Spot UV</option>
                  <option value="all">5. Paket Lengkap (Semua Kategori Bahan Baku)</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-nav text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5">
                  Pilihan Varian Spesifik <span className="text-primary text-sm">*</span>
                </label>
                <select
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                  className="w-full h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all cursor-pointer font-medium"
                >
                  {RAW_MATERIAL_OPTIONS[selectedCategory]?.variants.map((variant) => (
                    <option key={variant} value={variant}>
                      {variant}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 5: Catatan Spesifikasi */}
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

            {/* Row 6: Action Buttons Matching Layanan Finishing */}
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                className="flex-1 w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-secondary-container hover:bg-primary text-on-primary font-cta-pill text-base sm:text-lg font-bold transition-all shadow-[0_10px_25px_rgba(246,84,86,0.38)] cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[24px]">
                  send
                </span>
                <span>Kirim Permintaan Sampel via WhatsApp</span>
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

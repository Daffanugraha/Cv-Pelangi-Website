"use client";

import React, { useState, useEffect } from "react";
import { rawMaterialCategories, MaterialCategory } from "@/lib/data/rawMaterials";

interface BahanBakuOrderFormProps {
  categories?: MaterialCategory[];
  requestedCategory?: string;
}

// Single-Source-of-Truth yang diturunkan otomatis dari master rawMaterialCategories
const RAW_MATERIALS_DATA: Record<
  string,
  { name: string; variants: string[] }
> = {
  opp: {
    name: "1. Film BOPP / OPP Thermal & Waterbase (Doff / Glossy)",
    variants: [
      "Semua Varian Film BOPP (Doff & Glossy)",
      ...(rawMaterialCategories.find((c) => c.id === "opp")?.items.map((i) => i.name) || []),
    ],
  },
  foil: {
    name: "2. Foil (Gold, Silver, Hologram, Transparan & Putih BO1)",
    variants: [
      "Semua Varian Foil (Gold, Silver, Hologram, Transparan)",
      ...(rawMaterialCategories.find((c) => c.id === "foil")?.items.map((i) => i.name) || [
        "Gold (120 Meter)",
        "Silver (120 Meter)",
        "Warna - Warni (120 Meter)",
        "Gold & Silver Hologram (120 Meter)",
        "Transparan (120 Meter)",
        "Putih BO1",
        "White BO1",
      ]),
    ],
  },
  lem: {
    name: "3. Lem Laminating Industri (Wet & Dry Emulsi)",
    variants: [
      "Semua Varian Lem Laminating (Wet & Dry)",
      ...(rawMaterialCategories.find((c) => c.id === "lem")?.items.map((i) => i.name) || []),
    ],
  },
  spotuv: {
    name: "5. Varnish & Tinta Spot UV (Gloss, Matte & Pasir)",
    variants: [
      "Semua Varian Spot UV (Gloss, Matte & Pasir)",
      ...(rawMaterialCategories.find((c) => c.id === "spotuv")?.items.map((i) => i.name) || []),
    ],
  },
};

export default function BahanBakuOrderForm({
  requestedCategory,
}: BahanBakuOrderFormProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [qty, setQty] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("foil");
  const [selectedVariant, setSelectedVariant] = useState<string>(
    RAW_MATERIALS_DATA.foil.variants[0]
  );
  const [notes, setNotes] = useState("");

  // Sync if page URL / props has specific category
  useEffect(() => {
    if (!requestedCategory) return;
    let targetKey = requestedCategory.toLowerCase();
    if (targetKey === "bopp") targetKey = "opp";
    if (RAW_MATERIALS_DATA[targetKey]) {
      setSelectedCategory(targetKey);
      setSelectedVariant(RAW_MATERIALS_DATA[targetKey].variants[0]);
    }
  }, [requestedCategory]);

  const handleCategoryChange = (key: string) => {
    setSelectedCategory(key);
    const firstVariant = RAW_MATERIALS_DATA[key]?.variants[0] || "";
    setSelectedVariant(firstVariant);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const matData = RAW_MATERIALS_DATA[selectedCategory];
    const catName = matData ? matData.name : "Bahan Baku";

    let msg =
      `Halo Tim Marketing CV Pelangi UV,\n\n` +
      `Saya *${name.trim() || "-"}*`;
    if (company.trim()) {
      msg += ` dari perusahaan *${company.trim()}*`;
    }
    msg +=
      `,\nmau tanya tentang penawaran harga & spesifikasi bahan baku.\n\n` +
      `*Rincian Spesifikasi & Kebutuhan:*\n` +
      `- Kategori Bahan: *${catName}*\n` +
      `- Varian Bahan: *${selectedVariant}*\n`;
    if (qty.trim()) {
      msg += `- Estimasi Kuantitas / Kebutuhan: *${qty.trim()}*\n`;
    }
    if (notes.trim()) {
      msg += `- Catatan Spesifikasi: *${notes.trim()}*\n`;
    }
    if (phone.trim()) {
      msg += `- No. WhatsApp: *${phone.trim()}*\n`;
    }
    msg += `\nMohon kalkulasi penawaran harga terbaik dan ketersediaan stoknya. Terima kasih!`;

    const url = `https://wa.me/6282231019363?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <section
      id="form-sample-gratis"
      className="w-full py-16 lg:py-24 bg-surface-canvas relative overflow-hidden"
    >
      {/* Anchor for backward compatibility */}
      <span id="form-konsultasi-bahan" className="sr-only" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header 1:1 Matching Layanan Finishing */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="px-5 py-2 rounded-full bg-secondary-container text-on-primary font-cta-pill text-cta-pill shadow-[0_4px_16px_rgba(246,84,86,0.25)] inline-block mb-4">
            Konsultasi &amp; Penawaran Harga
          </span>
          <h2 className="font-headline-xl text-headline-xl font-extrabold text-navbar-black sm:text-4xl lg:text-[42px] leading-tight">
            Mulai Konsultasi &amp; Penawaran Harga Spesifikasi
          </h2>
          <p className="font-body-lg text-body-lg text-text-muted mt-3 max-w-2xl mx-auto leading-relaxed">
            Dapatkan kalkulasi harga spesial langsung dari estimator pabrik kami. Kirimkan rincian teknis kebutuhan bahan baku Anda atau hubungi langsung via WhatsApp resmi.
          </p>
        </div>

        {/* Outer Card 1:1 Matching Layanan Finishing */}
        <div className="w-full max-w-5xl mx-auto rounded-[32px] bg-surface-container-lowest p-8 sm:p-12 lg:p-14 shadow-[0_20px_60px_-15px_rgba(246,84,86,0.16)] border border-divider-tint/60 relative overflow-hidden">
          {/* Decorative Corner Background Blob */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-surface-tint-light/60 rounded-bl-[120px] pointer-events-none -z-0" />

          {/* Card Header 1:1 Matching Layanan Finishing */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-surface-container">
            <div>
              <h3 className="font-headline-md text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-navbar-black tracking-tight leading-tight">
                Formulir Rincian Spesifikasi Cetak
              </h3>
              <p className="text-sm sm:text-base text-text-muted mt-1.5 leading-relaxed">
                Pilih kategori dan spesifikasi bahan baku finishing kami untuk mendapatkan kalkulasi harga akurat via WhatsApp.
              </p>
            </div>
            <span className="w-14 h-14 rounded-2xl bg-surface-tint-light flex items-center justify-center text-secondary-container shrink-0 shadow-xs border border-divider-tint/40">
              <span translate="no" className="material-symbols-outlined notranslate text-[30px]">
                edit_document
              </span>
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Row 1: Nama Lengkap & Perusahaan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-label-nav text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5">
                  Nama Lengkap <span className="text-primary text-sm">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface placeholder:text-text-muted focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-nav text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5">
                  Nama Perusahaan / Percetakan (Opsional)
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Contoh: PT Grafika Prima / CV Mandiri"
                  className="w-full h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface placeholder:text-text-muted focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Row 2: Nomor WhatsApp & Estimasi Kuantitas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-label-nav text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5">
                  Nomor WhatsApp Aktif <span className="text-primary text-sm">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contoh: 0812 3456 7890"
                  className="w-full h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface placeholder:text-text-muted focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-nav text-xs sm:text-sm font-bold text-on-surface">
                  Estimasi Kuantitas / Kebutuhan
                </label>
                <input
                  type="text"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  placeholder="Contoh: 10 roll / 5 drum / 100 kg"
                  className="w-full h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface placeholder:text-text-muted focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Row 3: Dropdown 1 & Dropdown 2 (1:1 Matching Layanan Finishing) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-label-nav text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5">
                  Pilihan Bahan Baku Finishing (4 Kategori) <span className="text-primary text-sm">*</span>
                </label>
                <select
                  id="quote-category"
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all cursor-pointer font-medium"
                >
                  <option value="opp">1. Film OPP / BOPP Thermal &amp; Waterbase (Doff / Glossy)</option>
                  <option value="foil">2. Foil (Gold, Silver, Hologram, Transparan &amp; Putih BO1)</option>
                  <option value="lem">3. Lem Laminating Industri (Wet &amp; Dry Emulsi)</option>
                  <option value="spotuv">4. Varnish &amp; Tinta Spot UV (Gloss, Matte &amp; Pasir)</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-nav text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5">
                  Pilihan Varian Bahan <span className="text-primary text-sm">*</span>
                </label>
                <select
                  id="quote-variant"
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                  className="w-full h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all cursor-pointer font-medium"
                >
                  {RAW_MATERIALS_DATA[selectedCategory]?.variants.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 4: Catatan Spesifikasi */}
            <div className="flex flex-col gap-2">
              <label className="font-label-nav text-xs sm:text-sm font-bold text-on-surface">
                Catatan Spesifikasi (Opsional: Ukuran Roll, Gramatur Kertas, Efek Khusus)
              </label>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tuliskan spesifikasi detail kebutuhan Anda (misal: Art Carton 260gsm, lebar roll custom, warna foil, atau efek khusus yang diinginkan)..."
                className="w-full p-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface placeholder:text-text-muted focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all leading-relaxed"
              />
            </div>

            {/* Row 5: Action Button 1:1 Matching Layanan Finishing */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-secondary-container hover:bg-primary text-on-primary font-cta-pill text-base sm:text-lg font-bold transition-all shadow-[0_10px_25px_rgba(246,84,86,0.38)] cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[24px]">
                  send
                </span>
                <span>Kirim Spesifikasi via WhatsApp</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

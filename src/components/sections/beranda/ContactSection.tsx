"use client";

import React, { useState, useMemo } from "react";

interface SubServiceItem {
  name: string;
  variants: string[];
}

interface ServiceGroup {
  label: string;
  subLabel: string;
  items: SubServiceItem[];
}

const BERANDA_SERVICE_CONFIG: Record<string, ServiceGroup> = {
  finishing: {
    label: "Layanan Jasa Finishing Pasca-Cetak (Spot UV / Foil / Laminasi / Pond)",
    subLabel: "Pilih Jenis Finishing",
    items: [
      {
        name: "Laminating (Doff / Glossy / Velvet)",
        variants: [
          "Laminating Doff Halus (Standard)",
          "Laminating Doff Velvet (Soft Touch Beludru)",
          "Laminating Doff Anti-Scratch (Anti Gores)",
          "Laminating Glossy Cermin (High Gloss)",
          "Laminating Window / Mika Box",
        ],
      },
      {
        name: "Spot UV Selektif",
        variants: [
          "Spot UV Gloss (Kilap Cermin)",
          "Spot UV Pasir / Sand (Timbul Kasar Taktil)",
          "Spot UV Doff / Matte Kontras",
          "Spot UV Drip-Off (Kombinasi Tekstur)",
          "Spot UV Glitter Emas / Perak",
        ],
      },
      {
        name: "Hot Stamping Foil (Hot Print)",
        variants: [
          "Hot Stamping Foil Emas (Gold Brilliant)",
          "Hot Stamping Foil Emas Doff (Matt Gold)",
          "Hot Stamping Foil Perak (Silver Mirror)",
          "Hot Stamping Foil Rose Gold Mewah",
          "Hot Stamping Foil Hologram Pelangi",
          "Hot Stamping Foil Hitam / Merah / Warna Custom",
        ],
      },
      {
        name: "Pond & Die-Cut / Creasing",
        variants: [
          "Pond Bentuk Box Packaging / Kemasan",
          "Pond Rel Creasing Anti-Pecah Karton Tebal",
          "Half-Cut Stiker Presisi Tinggi",
          "Emboss & Deboss Timbul 3D",
        ],
      },
      {
        name: "Cast & Cure / Micro Emboss",
        variants: [
          "Cast & Cure Efek Pelangi Hologram",
          "Micro Emboss Hologram Prismatik",
          "Cast & Cure Motif Pasir",
        ],
      },
    ],
  },
  bahan_baku: {
    label: "Bahan Baku: OPP Thermal / Foil / Lem / Varnish",
    subLabel: "Pilih Kategori Bahan Baku",
    items: [
      {
        name: "Plastik OPP Thermal Film",
        variants: [
          "Roll OPP Thermal Doff (Bebas Sidik Jari)",
          "Roll OPP Thermal Glossy",
          "Roll OPP Thermal Velvet (Soft Touch Beludru)",
          "Roll OPP Wet (Laminasi Lem Basah)",
        ],
      },
      {
        name: "Roll Stamping Foil (Hot Print)",
        variants: [
          "Roll Foil Emas (Gold 12 Micron)",
          "Roll Foil Perak (Silver Mirror)",
          "Roll Foil Hologram & Pattern",
          "Roll Foil Rose Gold & Cooper",
          "Jasa Slitting / Potong Lebar Roll Foil Custom",
        ],
      },
      {
        name: "Lem Percetakan & Finishing",
        variants: [
          "Lem Side Gluer Box (Water-based)",
          "Lem Mesin Laminasi Kering / Basah",
          "Lem Hotmelt Jilid Buku / Blok Lem",
        ],
      },
      {
        name: "Varnish & Tinta UV Coating",
        variants: [
          "Tinta Spot UV Gloss High Cure",
          "Varnish Spot UV Pasir Kristal",
          "Water-based Overprint Varnish (OPV)",
        ],
      },
      {
        name: "Pisau & Perlengkapan Pond",
        variants: [
          "Pisau Pond Potong & Rel Tekuk",
          "Karet Bantalan / Spons Ejector",
          "Pertinax Matrix Creasing Channel",
        ],
      },
    ],
  },
  paket_lengkap: {
    label: "Paket Jasa Finishing + Penyediaan Bahan Baku Lengkap",
    subLabel: "Pilih Solusi Paket",
    items: [
      {
        name: "Paket Produksi One-Stop",
        variants: [
          "Finishing Lengkap Box Kemasan (Laminasi + Foil + Pond)",
          "Finishing Hardcover Buku / Agenda (Velvet + Foil + Spot UV)",
          "Finishing Hangtag & Paper Bag Mewah",
          "Kustomisasi Sesuai Spesifikasi Brand",
        ],
      },
    ],
  },
  sample: {
    label: "Permintaan Sampel Fisik / Uji Coba Proofing",
    subLabel: "Pilih Jenis Sampel / Uji Coba",
    items: [
      {
        name: "Sampel Fisik & Demo",
        variants: [
          "Swatch Card Lengkap (Spot UV, Foil, Laminating)",
          "Sample Pack Dus Kemasan Skincare & Makanan",
          "Uji Coba Proofing Kertas Klien di Mesin Workshop",
          "Katalog Fisik & Pricelist Lengkap Percetakan",
        ],
      },
    ],
  },
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    categoryKey: "finishing",
    subItemIndex: 0,
    variant: "Laminating Doff Halus (Standard)",
    quantity: "2.000 – 10.000 Lembar",
    paper: "Art Paper / Art Carton (150 - 310 gsm)",
    message: "",
  });

  const activeGroup = useMemo(() => {
    return BERANDA_SERVICE_CONFIG[formData.categoryKey] || BERANDA_SERVICE_CONFIG.finishing;
  }, [formData.categoryKey]);

  const activeSubItem = useMemo(() => {
    const idx = Math.min(formData.subItemIndex, activeGroup.items.length - 1);
    return activeGroup.items[idx] || activeGroup.items[0];
  }, [activeGroup, formData.subItemIndex]);

  const handleCategoryChange = (key: string) => {
    const targetGroup = BERANDA_SERVICE_CONFIG[key] || BERANDA_SERVICE_CONFIG.finishing;
    const defaultSub = targetGroup.items[0];
    const defaultVar = defaultSub.variants[0] || "";

    setFormData((prev) => ({
      ...prev,
      categoryKey: key,
      subItemIndex: 0,
      variant: defaultVar,
    }));
  };

  const handleSubItemChange = (index: number) => {
    const targetSub = activeGroup.items[index] || activeGroup.items[0];
    const defaultVar = targetSub.variants[0] || "";

    setFormData((prev) => ({
      ...prev,
      subItemIndex: index,
      variant: defaultVar,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const name = formData.name.trim();
    const company = formData.company.trim();
    const phone = formData.phone.trim();
    const categoryLabel = activeGroup.label;
    const subServiceName = activeSubItem.name;
    const variantName = formData.variant;
    const quantity = formData.quantity;
    const paper = formData.paper;
    const message = formData.message.trim();

    // Catat ke admin leads jika tersedia
    try {
      fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          company: company || "-",
          phone: phone,
          email: "",
          service: `${categoryLabel} > ${subServiceName} (${variantName})`,
          message: `[Kuantitas: ${quantity}] [Bahan: ${paper}] ${message || "Permintaan penawaran via beranda"}`,
        }),
      }).catch(() => {});
    } catch {}

    let msg = `Halo Tim Marketing CV Pelangi UV,%0A%0ASaya *${encodeURIComponent(
      name
    )}*`;
    if (company) {
      msg += ` dari perusahaan/percetakan *${encodeURIComponent(company)}*`;
    }
    msg += `.%0A%0A*Permintaan Spesifikasi & Penawaran:*%0A`;
    msg += `- Kategori: *${encodeURIComponent(categoryLabel)}*%0A`;
    msg += `- Layanan: *${encodeURIComponent(subServiceName)}*%0A`;
    msg += `- Varian / Jenis Efek: *${encodeURIComponent(variantName)}*%0A`;
    msg += `- Estimasi Kuantitas / Oplah: *${encodeURIComponent(quantity)}*%0A`;
    msg += `- Jenis Bahan Kertas: *${encodeURIComponent(paper)}*%0A`;

    if (message) {
      msg += `%0A*Catatan Spesifikasi Tambahan:*%0A${encodeURIComponent(message)}%0A`;
    }
    if (phone) {
      msg += `%0A- No. WhatsApp: *${encodeURIComponent(phone)}*%0A`;
    }
    msg += `%0AMohon informasi penawaran harga & estimasi jadwal pengerjaan/pengiriman. Terima kasih!`;

    window.open(`https://wa.me/6282231019363?text=${msg}`, "_blank");
  };

  return (
    <section
      className="w-full bg-gradient-to-br from-bracket-border via-primary to-secondary py-space-3xl relative text-on-primary overflow-hidden"
      id="kontak"
      style={{ scrollMarginTop: "80px" }}
    >
      <div id="pesan-sekarang" className="absolute -top-24 pointer-events-none" />
      <div className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full bg-on-primary/10 pointer-events-none"></div>
      <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-on-primary/5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-gutter relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-headline-xl text-headline-xl text-on-primary font-black leading-tight sm:text-4xl lg:text-[42px] tracking-tight">
            Mulai Konsultasi &amp; Penawaran Harga Spesifikasi
          </h2>
          <p className="font-body-lg text-body-lg text-on-primary/90 mt-3 leading-relaxed">
            Dapatkan sampel cetak gratis dan kalkulasi biaya terbaik untuk kebutuhan jasa finishing maupun bahan baku dari tim ahli <span translate="no" className="notranslate">CV Pelangi UV</span>.
          </p>
        </div>

        {/* Centered Expanded Card */}
        <div className="w-full max-w-5xl mx-auto rounded-[32px] bg-surface-canvas text-on-surface p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-surface-container">
            <div>
              <h3 className="font-headline-md text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-navbar-black tracking-tight leading-tight">
                Formulir Rincian Spesifikasi
              </h3>
              <p className="text-sm sm:text-base text-text-muted mt-1.5 leading-relaxed">
                Pilih kebutuhan spesifik jasa finishing atau bahan baku untuk mendapatkan kalkulasi harga akurat via WhatsApp.
              </p>
            </div>
            <span className="w-14 h-14 rounded-2xl bg-surface-tint-light flex items-center justify-center text-secondary-container shrink-0 shadow-xs border border-divider-tint/40">
              <span translate="no" className="material-symbols-outlined notranslate text-[30px]">edit_document</span>
            </span>
          </div>

          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            {/* Nama & Perusahaan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-label-nav text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5">
                  Nama Lengkap <span className="text-primary text-sm">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Contoh: Hendra Pratama"
                  className="w-full h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface placeholder:text-text-muted focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-nav text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5">
                  Nama Perusahaan / Percetakan (Opsional)
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="Contoh: PT Grafika Prima / CV Mandiri"
                  className="w-full h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface placeholder:text-text-muted focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Nomor WA & Kategori Utama */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-label-nav text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5">
                  Nomor WhatsApp / HP <span className="text-primary text-sm">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Contoh: 0812 3456 7890"
                  className="w-full h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface placeholder:text-text-muted focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-nav text-xs sm:text-sm font-bold text-on-surface">
                  Kategori Kebutuhan Utama <span className="text-primary text-sm">*</span>
                </label>
                <select
                  value={formData.categoryKey}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all cursor-pointer font-semibold"
                >
                  {Object.entries(BERANDA_SERVICE_CONFIG).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Kotak Pilihan Bertingkat Dinamis */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide font-label-meta border-b border-slate-200 pb-2">
                <span translate="no" className="material-symbols-outlined notranslate text-[20px] text-secondary-container">
                  tune
                </span>
                Spesifikasi & Pilihan Layanan Detail
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Level 2: Sub-Layanan */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-nav text-xs font-bold text-slate-700">
                    {activeGroup.subLabel} <span className="text-primary">*</span>
                  </label>
                  <select
                    value={formData.subItemIndex}
                    onChange={(e) => handleSubItemChange(Number(e.target.value))}
                    className="w-full h-12 px-4 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 focus:border-secondary-container focus:ring-1 focus:ring-secondary-container outline-none font-medium transition-all"
                  >
                    {activeGroup.items.map((sub, idx) => (
                      <option key={sub.name} value={idx}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level 3: Varian Spesifik */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-nav text-xs font-bold text-slate-700">
                    Pilihan Varian / Jenis Efek <span className="text-primary">*</span>
                  </label>
                  <select
                    value={formData.variant}
                    onChange={(e) =>
                      setFormData({ ...formData, variant: e.target.value })
                    }
                    className="w-full h-12 px-4 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-secondary-container font-semibold focus:border-secondary-container focus:ring-1 focus:ring-secondary-container outline-none transition-all"
                  >
                    {activeSubItem.variants.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tambahan Teknis: Oplag & Bahan Kertas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-nav text-xs font-medium text-slate-600">
                    Estimasi Kuantitas / Oplah Cetak
                  </label>
                  <select
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    className="w-full h-11 px-3.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 focus:border-secondary-container outline-none"
                  >
                    <option value="Belum Dihitung / Konsultasi">Belum Dihitung / Konsultasi</option>
                    <option value="Di bawah 500 Lembar">&lt; 500 Lembar (Order Minimal)</option>
                    <option value="500 – 2.000 Lembar">500 – 2.000 Lembar</option>
                    <option value="2.000 – 10.000 Lembar">2.000 – 10.000 Lembar (Kapasitas Cepat)</option>
                    <option value="Lebih dari 10.000 Lembar">&gt; 10.000 Lembar (Partai Besar Industri)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-nav text-xs font-medium text-slate-600">
                    Jenis Bahan Kertas / Media
                  </label>
                  <select
                    value={formData.paper}
                    onChange={(e) =>
                      setFormData({ ...formData, paper: e.target.value })
                    }
                    className="w-full h-11 px-3.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 focus:border-secondary-container outline-none"
                  >
                    <option value="Belum Tahu / Rekomendasi">Belum Tahu / Mohon Rekomendasi</option>
                    <option value="Art Paper / Art Carton (150 - 310 gsm)">Art Paper / Art Carton (150 - 310 gsm)</option>
                    <option value="Karton Ivory / Paperboard (210 - 350 gsm)">Karton Ivory / Paperboard (210 - 350 gsm)</option>
                    <option value="Duplex / Greyboard Tebal">Duplex / Greyboard Tebal</option>
                    <option value="Fancy Paper / Kraft / Linen">Fancy Paper / Kraft / Linen</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Catatan Tambahan */}
            <div className="flex flex-col gap-2">
              <label className="font-label-nav text-xs sm:text-sm font-bold text-on-surface">
                Catatan Spesifikasi Tambahan (Opsional)
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Tuliskan spesifikasi detail bidang plano (misal: plano 65x100 cm), deadline, atau catatan teknis lainnya..."
                className="w-full p-4 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface placeholder:text-text-muted focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all leading-relaxed"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-secondary-container hover:bg-primary text-on-primary font-cta-pill text-base sm:text-lg font-bold transition-all shadow-[0_10px_25px_rgba(246,84,86,0.38)] cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[24px]">send</span>
                <span>Kirim Spesifikasi via WhatsApp</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

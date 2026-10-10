"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface SubServiceItem {
  name: string;
  variants: string[];
}

interface ServiceGroup {
  label: string;
  subLabel: string;
  items: SubServiceItem[];
}

const SERVICE_CONFIG: Record<string, ServiceGroup> = {
  finishing: {
    label: "Layanan Jasa Finishing Percetakan",
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
    label: "Grosir Bahan Baku (OPP / Lem / Foil)",
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
  sample: {
    label: "Permintaan Sample Swatch / Demo Mesin",
    subLabel: "Pilih Kebutuhan Sample / Demo",
    items: [
      {
        name: "Sample Kit & Swatch Card",
        variants: [
          "Swatch Card Lengkap (Spot UV, Foil, Laminating)",
          "Sample Pack Dus Kemasan Skincare & Makanan",
          "Katalog Fisik & Pricelist Lengkap Percetakan",
        ],
      },
      {
        name: "Uji Coba / Demo Mesin",
        variants: [
          "Trial Uji Kertas Milik Klien di Mesin Workshop",
          "Konsultasi Kalibrasi Warna & Bahan Cetak Baru",
        ],
      },
    ],
  },
  pickup: {
    label: "Penjemputan Order Express",
    subLabel: "Pilih Area Penjemputan",
    items: [
      {
        name: "Area Penjemputan Armada Pelangi",
        variants: [
          "Area Surabaya (Pusat, Barat, Timur, Selatan, Utara)",
          "Area Sidoarjo (Waru, Sedati, Buduran, Candi, Porong)",
          "Area Gresik / Krian / Mojokerto / Pasuruan",
          "Luar Kota / Pulau (Kirim via Ekspedisi / Cargo)",
        ],
      },
      {
        name: "Estimasi Muatan Lembar Cetak",
        variants: [
          "1 - 5 Rim Kertas",
          "6 - 20 Rim Kertas",
          "> 20 Rim (Muatan Pick-up / Truk Penuh)",
        ],
      },
    ],
  },
  lainnya: {
    label: "Kebutuhan Lainnya / Kerjasama Bisnis",
    subLabel: "Pilih Topik Diskusi",
    items: [
      {
        name: "Kemitraan & Diskusi Khusus",
        variants: [
          "PKS / Vendor Finishing Rutin Percetakan",
          "Konsultasi Spesifikasi Proyek Tender Brand",
          "Jasa Rewinding & Slitting Roll Klien",
          "Kebutuhan Khusus Lainnya",
        ],
      },
    ],
  },
};

export default function InquiryFormSection() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    nama: "",
    perusahaan: "",
    wa: "",
    kategoriKey: "finishing",
    subItemIndex: 0,
    varian: "Laminating Doff Halus (Standard)",
    oplag: "Belum Dihitung / Konsultasi",
    kertas: "Belum Tahu / Rekomendasi",
    pesan: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Group config aktif berdasarkan kategori
  const activeGroup = useMemo(() => {
    return SERVICE_CONFIG[formData.kategoriKey] || SERVICE_CONFIG.finishing;
  }, [formData.kategoriKey]);

  // Sub-layanan aktif
  const activeSubItem = useMemo(() => {
    const idx = Math.min(formData.subItemIndex, activeGroup.items.length - 1);
    return activeGroup.items[idx] || activeGroup.items[0];
  }, [activeGroup, formData.subItemIndex]);

  // Handle perubahan Kategori Utama
  const handleCategoryChange = (key: string) => {
    const targetGroup = SERVICE_CONFIG[key] || SERVICE_CONFIG.finishing;
    const defaultSub = targetGroup.items[0];
    const defaultVarian = defaultSub.variants[0] || "";

    setFormData((prev) => ({
      ...prev,
      kategoriKey: key,
      subItemIndex: 0,
      varian: defaultVarian,
    }));
  };

  // Handle perubahan Sub-Layanan
  const handleSubItemChange = (index: number) => {
    const targetSub = activeGroup.items[index] || activeGroup.items[0];
    const defaultVarian = targetSub.variants[0] || "";

    setFormData((prev) => ({
      ...prev,
      subItemIndex: index,
      varian: defaultVarian,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nama = formData.nama.trim();
    const perusahaan = formData.perusahaan.trim();
    const wa = formData.wa.trim();
    const kategori = activeGroup.label;
    const subLayanan = activeSubItem.name;
    const varian = formData.varian;
    const oplag = formData.oplag;
    const kertas = formData.kertas;
    const pesan = formData.pesan.trim();

    // Simpan lead ke backend jika memungkinkan
    try {
      fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nama,
          company: perusahaan || "-",
          phone: wa,
          email: "",
          service: `${kategori} > ${subLayanan} (${varian})`,
          message: `[Oplag: ${oplag}] [Bahan: ${kertas}] ${pesan || "Mohon konsultasi penawaran"}`,
        }),
      }).catch(() => {});
    } catch {}

    // Format WhatsApp super detail dan profesional
    let msg = `Halo Tim Marketing CV Pelangi UV,%0A%0A`;
    msg += `Perkenalkan saya *${encodeURIComponent(nama)}*`;
    if (perusahaan && perusahaan !== "-") {
      msg += ` dari perusahaan/percetakan *${encodeURIComponent(perusahaan)}*`;
    }
    msg += `.%0A%0A`;
    msg += `Saya ingin mengajukan pertanyaan / penawaran untuk:%0A`;
    msg += `*Kategori:* ${encodeURIComponent(kategori)}%0A`;
    msg += `*Layanan:* ${encodeURIComponent(subLayanan)}%0A`;
    msg += `*Pilihan Spesifik:* ${encodeURIComponent(varian)}%0A`;

    if (formData.kategoriKey === "finishing" || formData.kategoriKey === "bahan_baku") {
      msg += `*Perkiraan Oplag / Kuantitas:* ${encodeURIComponent(oplag)}%0A`;
      msg += `*Jenis Kertas / Media:* ${encodeURIComponent(kertas)}%0A`;
    }

    if (pesan) {
      msg += `%0A*Rincian Kebutuhan & Catatan Khusus:*%0A${encodeURIComponent(pesan)}%0A`;
    }

    msg += `%0A*Nomor WhatsApp Saya:* ${encodeURIComponent(wa)}%0A`;
    msg += `%0AMohon bantuan informasi estimasi harga dan jadwal pengerjaan mesin. Terima kasih!`;

    window.open(`https://wa.me/6282231019363?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section
      className="w-full bg-[#faf7f6] border-t border-slate-200/80 py-16 lg:py-20"
      id="section-form"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-sm">
          <div className="mb-6">
            <span className="font-label-meta text-xs text-secondary font-bold uppercase tracking-wider block mb-1">
              {t("form_badge")}
            </span>
            <h2 className="font-headline-lg text-2xl font-bold text-slate-900">
              {t("form_title")}
            </h2>
            <p className="font-body-sm text-xs sm:text-sm text-slate-500 mt-1">
              {t("form_desc")}
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-sm">
                <span translate="no" className="material-symbols-outlined notranslate text-[24px]">
                  check
                </span>
              </div>
              <h3 className="font-headline-sm text-base font-bold text-slate-900">
                Permintaan Sedang Dialihkan ke WhatsApp!
              </h3>
              <p className="font-body-sm text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                Terima kasih, Bapak/Ibu {formData.nama}. Tim estimasi dan PIC
                Pelangi UV siap menyambut pesan spesifikasi Anda via WhatsApp.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      nama: "",
                      perusahaan: "",
                      wa: "",
                      kategoriKey: "finishing",
                      subItemIndex: 0,
                      varian: "Laminating Doff Halus (Standard)",
                      oplag: "Belum Dihitung / Konsultasi",
                      kertas: "Belum Tahu / Rekomendasi",
                      pesan: "",
                    });
                  }}
                  className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all cursor-pointer"
                >
                  Kirim Permintaan Lain
                </button>
              </div>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Kontak Pengirim */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xs font-label-meta font-semibold text-slate-700 mb-1.5"
                    htmlFor="input-nama"
                  >
                    {t("form_name_label")}
                  </label>
                  <input
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all"
                    id="input-nama"
                    placeholder={t("form_name_placeholder")}
                    required
                    type="text"
                    value={formData.nama}
                    onChange={(e) =>
                      setFormData({ ...formData, nama: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-label-meta font-semibold text-slate-700 mb-1.5"
                    htmlFor="input-perusahaan"
                  >
                    {t("form_company_label")}
                  </label>
                  <input
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all"
                    id="input-perusahaan"
                    placeholder={t("form_company_placeholder")}
                    type="text"
                    value={formData.perusahaan}
                    onChange={(e) =>
                      setFormData({ ...formData, perusahaan: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* No WA & Kategori Utama */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xs font-label-meta font-semibold text-slate-700 mb-1.5"
                    htmlFor="input-wa"
                  >
                    {t("form_wa_label")}
                  </label>
                  <input
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all"
                    id="input-wa"
                    placeholder={t("form_wa_placeholder")}
                    required
                    type="tel"
                    value={formData.wa}
                    onChange={(e) =>
                      setFormData({ ...formData, wa: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-label-meta font-semibold text-slate-700 mb-1.5"
                    htmlFor="input-kategori"
                  >
                    {t("form_category_label")}
                  </label>
                  <select
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all bg-white font-medium"
                    id="input-kategori"
                    required
                    value={formData.kategoriKey}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  >
                    {Object.entries(SERVICE_CONFIG).map(([key, item]) => (
                      <option key={key} value={key}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sub-Pilihan Dinamis (Level 2 & Level 3) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wide font-label-meta border-b border-slate-200 pb-2">
                  <span translate="no" className="material-symbols-outlined notranslate text-[18px] text-secondary-container">
                    tune
                  </span>
                  Spesifikasi & Pilihan Layanan
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Dropdown Level 2: Sub-Layanan */}
                  <div>
                    <label
                      className="block text-xs font-label-meta font-semibold text-slate-700 mb-1.5"
                      htmlFor="input-subitem"
                    >
                      {activeGroup.subLabel} *
                    </label>
                    <select
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all bg-white font-medium"
                      id="input-subitem"
                      value={formData.subItemIndex}
                      onChange={(e) => handleSubItemChange(Number(e.target.value))}
                    >
                      {activeGroup.items.map((sub, idx) => (
                        <option key={sub.name} value={idx}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dropdown Level 3: Varian Spesifik */}
                  <div>
                    <label
                      className="block text-xs font-label-meta font-semibold text-slate-700 mb-1.5"
                      htmlFor="input-varian"
                    >
                      Pilihan Varian / Jenis Efek *
                    </label>
                    <select
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all bg-white font-semibold text-secondary-container"
                      id="input-varian"
                      value={formData.varian}
                      onChange={(e) =>
                        setFormData({ ...formData, varian: e.target.value })
                      }
                    >
                      {activeSubItem.variants.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tambahan Teknis untuk Finishing / Bahan Baku */}
                {(formData.kategoriKey === "finishing" || formData.kategoriKey === "bahan_baku") && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label
                        className="block text-[11px] font-label-meta font-medium text-slate-600 mb-1.5"
                        htmlFor="input-oplag"
                      >
                        Perkiraan Jumlah / Oplag (Opsional)
                      </label>
                      <select
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-secondary-container bg-white"
                        id="input-oplag"
                        value={formData.oplag}
                        onChange={(e) =>
                          setFormData({ ...formData, oplag: e.target.value })
                        }
                      >
                        <option value="Belum Dihitung / Konsultasi">Belum Dihitung / Konsultasi</option>
                        <option value="Di bawah 500 Lembar">&lt; 500 Lembar (Order Minimal)</option>
                        <option value="500 - 2.000 Lembar">500 – 2.000 Lembar</option>
                        <option value="2.000 - 10.000 Lembar">2.000 – 10.000 Lembar (Kapasitas Cepat)</option>
                        <option value="Lebih dari 10.000 Lembar">&gt; 10.000 Lembar (Partai Besar Industri)</option>
                      </select>
                    </div>

                    <div>
                      <label
                        className="block text-[11px] font-label-meta font-medium text-slate-600 mb-1.5"
                        htmlFor="input-kertas"
                      >
                        Jenis Kertas / Bahan Baku (Opsional)
                      </label>
                      <select
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-secondary-container bg-white"
                        id="input-kertas"
                        value={formData.kertas}
                        onChange={(e) =>
                          setFormData({ ...formData, kertas: e.target.value })
                        }
                      >
                        <option value="Belum Tahu / Rekomendasi">Belum Tahu / Mohon Rekomendasi</option>
                        <option value="Art Paper / Art Carton (150 - 310 gsm)">Art Paper / Art Carton (150 - 310 gsm)</option>
                        <option value="Karton Ivory / Paperboard (210 - 350 gsm)">Karton Ivory / Paperboard (210 - 350 gsm)</option>
                        <option value="Duplex / Greyboard Tebal">Duplex / Greyboard Tebal</option>
                        <option value="Fancy Paper / Kraft / Linen">Fancy Paper / Kraft / Linen</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Catatan / Pesan Tambahan */}
              <div>
                <label
                  className="block text-xs font-label-meta font-semibold text-slate-700 mb-1.5"
                  htmlFor="input-pesan"
                >
                  {t("form_msg_label")}
                </label>
                <textarea
                  className="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all"
                  id="input-pesan"
                  placeholder="Contoh: Ukuran plano 65x100 cm, perlu selesai hari Rabu, mohon info perkiraan biaya dan jadwal jemput bahan..."
                  rows={3}
                  value={formData.pesan}
                  onChange={(e) =>
                    setFormData({ ...formData, pesan: e.target.value })
                  }
                />
              </div>

              <div className="pt-2">
                <button
                  className="w-full py-3.5 px-6 rounded-full bg-secondary-container hover:bg-primary text-white font-cta-pill text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(254,84,83,0.3)] transition-all cursor-pointer active:scale-95"
                  type="submit"
                >
                  <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                    send
                  </span>
                  Kirim & Konsultasi Spesifikasi via WhatsApp
                </button>
                <p className="text-[11px] font-label-meta text-center text-slate-400 mt-2.5">
                  Data Anda aman dan diteruskan langsung ke PIC Marketing resmi <span translate="no" className="notranslate font-semibold">CV Pelangi UV</span>.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

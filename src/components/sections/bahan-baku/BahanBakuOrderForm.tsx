"use client";

import React, { useState, useEffect } from "react";
import { MaterialCategory } from "@/lib/data/rawMaterials";

interface BahanBakuOrderFormProps {
  categories?: MaterialCategory[];
  requestedCategory?: string;
}

const SAMPLE_OPTIONS = [
  { id: "opp", label: "BOPP Thermal Film (Doff Velvet & Glossy)" },
  { id: "foil", label: "Hot & Cold Stamping Foil (Gold, Silver, Hologram)" },
  { id: "lem", label: "Sampel Lem Wet & Dry Laminating" },
  { id: "spotuv", label: "Sampel Uji Varnish & Tinta Spot UV" },
];

export default function BahanBakuOrderForm({
  requestedCategory,
}: BahanBakuOrderFormProps) {
  const [picName, setPicName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Surabaya");
  const [selectedSamples, setSelectedSamples] = useState<string[]>([
    SAMPLE_OPTIONS[0].label,
  ]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (requestedCategory === "foil" || requestedCategory === "foil-stamping") {
      setSelectedSamples([SAMPLE_OPTIONS[1].label]);
    } else if (requestedCategory === "lem") {
      setSelectedSamples([SAMPLE_OPTIONS[2].label]);
    } else if (requestedCategory === "spotuv") {
      setSelectedSamples([SAMPLE_OPTIONS[3].label]);
    } else if (requestedCategory === "opp") {
      setSelectedSamples([SAMPLE_OPTIONS[0].label]);
    }
  }, [requestedCategory]);

  const toggleSample = (label: string) => {
    setSelectedSamples((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let text =
      `Halo Tim Marketing CV Pelangi UV,\n\n` +
      `Saya *${picName.trim() || "-"}*`;
    if (companyName.trim() && companyName.trim() !== "-") {
      text += ` dari perusahaan *${companyName.trim()}*`;
    }
    text +=
      `, mau tanya tentang sampel bahan baku finishing gratis.\n\n` +
      `*Pilihan Sampel yang Diminta:*\n${selectedSamples.map((s) => `• ${s}`).join("\n") || "• (Belum memilih sampel)"}\n\n` +
      `*Alamat Pengiriman:*\n${address.trim() || "-"}, ${city.trim() || "-"}\n\n` +
      `*Catatan Spesifikasi (Opsional):*\n${notes.trim() || "Tidak ada catatan tambahan"}\n\n` +
      `Mohon konfirmasi dan informasi pengiriman sampel fisiknya. Terima kasih!`;

    const url = `https://wa.me/6282231019363?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section
      id="form-sample-gratis"
      className="w-full bg-surface-neutral-alt py-14 sm:py-20 relative overflow-hidden"
    >
      {/* Anchor for backward compatibility */}
      <span id="form-konsultasi-bahan" className="sr-only" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-headline-xl text-[26px] sm:text-[34px] md:text-headline-xl text-on-surface tracking-tight font-bold">
            Minta Sampel Bahan Gratis
          </h2>
          <p className="font-body-md text-sm sm:text-body-md text-text-body mt-2 leading-relaxed">
            Ingin mencoba kualitas bahan terlebih dahulu sebelum memesan? Isi formulir di bawah ini untuk mendapatkan contoh fisik bahan langsung ke alamat Anda, atau konsultasikan kebutuhan percetakan Anda dengan tim kami.
          </p>
        </div>

        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-surface-canvas rounded-[24px] sm:rounded-[28px] p-6 sm:p-10 border border-outline-variant shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-surface-container">
              <h3 className="font-headline-sm text-[18px] sm:text-headline-sm text-on-surface font-bold flex items-center gap-2">
                <span translate="no" className="material-symbols-outlined notranslate text-bracket-border text-[22px] notranslate">
                  redeem
                </span>
                Formulir Permintaan Sampel Bahan Gratis
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: PIC & Usaha */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="sample_form_pic"
                    className="block font-label-nav text-xs sm:text-[13px] text-on-surface font-semibold mb-1"
                  >
                    Nama Lengkap / PIC <span className="text-bracket-border">*</span>
                  </label>
                  <input
                    type="text"
                    id="sample_form_pic"
                    required
                    value={picName}
                    onChange={(e) => setPicName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-neutral-alt border border-outline-variant focus:border-bracket-border focus:ring-1 focus:ring-[#F65456] text-on-surface text-sm focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sample_form_company"
                    className="block font-label-nav text-xs sm:text-[13px] text-on-surface font-semibold mb-1"
                  >
                    Nama Usaha / Percetakan <span className="text-bracket-border">*</span>
                  </label>
                  <input
                    type="text"
                    id="sample_form_company"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Contoh: Percetakan Jaya / Toko / Pribadi"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-neutral-alt border border-outline-variant focus:border-bracket-border focus:ring-1 focus:ring-[#F65456] text-on-surface text-sm focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Alamat Pengiriman & Kota */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label
                    htmlFor="sample_form_address"
                    className="block font-label-nav text-xs sm:text-[13px] text-on-surface font-semibold mb-1"
                  >
                    Alamat Pengiriman Lengkap <span className="text-bracket-border">*</span>
                  </label>
                  <input
                    type="text"
                    id="sample_form_address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Contoh: Jl. Ahmad Yani No. 12, Kel. Wonokromo"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-neutral-alt border border-outline-variant focus:border-bracket-border focus:ring-1 focus:ring-[#F65456] text-on-surface text-sm focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sample_form_city"
                    className="block font-label-nav text-xs sm:text-[13px] text-on-surface font-semibold mb-1"
                  >
                    Kota / Wilayah <span className="text-bracket-border">*</span>
                  </label>
                  <input
                    type="text"
                    id="sample_form_city"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Contoh: Surabaya"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-neutral-alt border border-outline-variant focus:border-bracket-border focus:ring-1 focus:ring-[#F65456] text-on-surface text-sm focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Pilihan Sampel Bahan */}
              <div>
                <label className="block font-label-nav text-xs sm:text-[13px] text-on-surface font-semibold mb-2">
                  Pilihan Contoh Bahan yang Dibutuhkan:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SAMPLE_OPTIONS.map((sample) => {
                    const isChecked = selectedSamples.includes(sample.label);
                    return (
                      <label
                        key={sample.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer text-xs sm:text-[13px] ${
                          isChecked
                            ? "bg-bracket-border/5 border-bracket-border font-medium text-on-surface"
                            : "bg-surface-neutral-alt border-outline-variant text-text-muted hover:border-outline"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSample(sample.label)}
                          className="rounded text-bracket-border focus:ring-bracket-border w-4 h-4"
                        />
                        <span translate="no" className="notranslate">{sample.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Row 4: Catatan Tambahan */}
              <div>
                <label
                  htmlFor="sample_form_notes"
                  className="block font-label-nav text-xs sm:text-[13px] text-on-surface font-semibold mb-1"
                >
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  id="sample_form_notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tuliskan spesifikasi khusus, ukuran roll, atau pertanyaan konsultasi jika ada..."
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-neutral-alt border border-outline-variant focus:border-bracket-border focus:ring-1 focus:ring-[#F65456] text-on-surface text-sm focus:outline-none transition-all resize-none"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 w-full py-3 px-6 rounded-full bg-bracket-border hover:bg-primary text-on-primary font-cta-pill text-xs sm:text-cta-pill transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span translate="no" className="material-symbols-outlined notranslate text-[20px] notranslate">
                    send
                  </span>
                  <span>Kirim Permintaan Sampel via WhatsApp</span>
                </button>
                <a
                  href="https://wa.me/6282231019363?text=Halo%20Tim%20Pelangi%20UV%2C%20saya%20ingin%20konsultasi%20bahan%20baku"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3 px-6 rounded-full bg-action-whatsapp hover:bg-action-whatsapp-hover text-on-primary font-cta-pill text-xs sm:text-cta-pill transition-all flex items-center justify-center gap-2 shadow-md shrink-0"
                >
                  <span translate="no" className="material-symbols-outlined notranslate text-[20px] notranslate">
                    chat
                  </span>
                  <span>Konsultasi Langsung CS</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

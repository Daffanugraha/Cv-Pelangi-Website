"use client";

import React, { useState, useEffect } from "react";

interface BahanBakuSampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: "opp" | "foil" | "lem" | "spotuv";
}

export default function BahanBakuSampleModal({
  isOpen,
  onClose,
  defaultCategory,
}: BahanBakuSampleModalProps) {
  const [picName, setPicName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Surabaya");
  const [selectedSamples, setSelectedSamples] = useState<string[]>([
    "BOPP Thermal Film (Doff Velvet & Glossy)",
  ]);
  const [extraNotes, setExtraNotes] = useState("");

  useEffect(() => {
    if (defaultCategory === "foil") {
      setSelectedSamples(["Hot & Cold Stamping Foil (Gold, Silver, Hologram)"]);
    } else if (defaultCategory === "lem") {
      setSelectedSamples(["Sampel Lem Wet & Dry Laminating"]);
    } else if (defaultCategory === "spotuv") {
      setSelectedSamples(["Sampel Uji Varnish & Tinta Spot UV"]);
    } else {
      setSelectedSamples(["BOPP Thermal Film (Doff Velvet & Glossy)"]);
    }
  }, [defaultCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleSample = (sample: string) => {
    setSelectedSamples((prev) =>
      prev.includes(sample) ? prev.filter((s) => s !== sample) : [...prev, sample]
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
      `*Catatan Spesifikasi (Opsional):*\n${extraNotes.trim() || "Tidak ada catatan tambahan"}\n\n` +
      `Mohon konfirmasi dan informasi pengiriman sampel fisiknya. Terima kasih!`;

    const url = `https://wa.me/6282231019363?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navbar-black/80 backdrop-blur-sm transition-all duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-surface-canvas rounded-[24px] sm:rounded-[28px] shadow-2xl border border-divider-tint/60 overflow-hidden flex flex-col max-h-[92vh] text-on-surface"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-surface-container bg-surface-tint-light/50 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-bracket-border text-on-primary flex items-center justify-center shadow-sm shrink-0">
              <span translate="no" className="material-symbols-outlined notranslate text-[22px] notranslate">
                redeem
              </span>
            </div>
            <div>
              <h3 className="font-headline-sm text-base sm:text-headline-sm text-on-surface font-bold leading-tight">
                Permintaan Sampel Bahan
              </h3>
              <p className="text-xs text-text-muted">
                Dapatkan contoh fisik bahan langsung ke alamat Anda
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Modal"
            className="w-8 h-8 rounded-full bg-surface-canvas border border-outline-variant hover:bg-bracket-border hover:text-on-primary text-on-surface flex items-center justify-center transition-all cursor-pointer"
          >
            <span translate="no" className="material-symbols-outlined notranslate text-[18px] notranslate">
              close
            </span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="sample_pic_name"
                className="block text-xs font-semibold text-on-surface mb-1"
              >
                Nama PIC / Pemohon <span className="text-bracket-border">*</span>
              </label>
              <input
                type="text"
                id="sample_pic_name"
                required
                value={picName}
                onChange={(e) => setPicName(e.target.value)}
                placeholder="Contoh: Budi Santoso"
                className="w-full px-3.5 py-2 rounded-xl bg-surface-neutral-alt border border-outline-variant text-xs sm:text-sm focus:border-bracket-border focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="sample_company_name"
                className="block text-xs font-semibold text-on-surface mb-1"
              >
                Nama Usaha / Percetakan <span className="text-bracket-border">*</span>
              </label>
              <input
                type="text"
                id="sample_company_name"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Contoh: Percetakan Jaya / Toko / Pribadi"
                className="w-full px-3.5 py-2 rounded-xl bg-surface-neutral-alt border border-outline-variant text-xs sm:text-sm focus:border-bracket-border focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label
                htmlFor="sample_address"
                className="block text-xs font-semibold text-on-surface mb-1"
              >
                Alamat Pengiriman Lengkap <span className="text-bracket-border">*</span>
              </label>
              <input
                type="text"
                id="sample_address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Contoh: Jl. Ahmad Yani No. 12, Kel. Wonokromo"
                className="w-full px-3.5 py-2 rounded-xl bg-surface-neutral-alt border border-outline-variant text-xs sm:text-sm focus:border-bracket-border focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="sample_city"
                className="block text-xs font-semibold text-on-surface mb-1"
              >
                Kota / Wilayah <span className="text-bracket-border">*</span>
              </label>
              <input
                type="text"
                id="sample_city"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Contoh: Surabaya"
                className="w-full px-3.5 py-2 rounded-xl bg-surface-neutral-alt border border-outline-variant text-xs sm:text-sm focus:border-bracket-border focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-2">
              Pilihan Contoh Material yang Dibutuhkan:
            </label>
            <div className="space-y-2">
              {[
                "BOPP Thermal Film (Doff Velvet & Glossy)",
                "Hot & Cold Stamping Foil (Gold, Silver, Hologram)",
                "Sampel Lem Wet & Dry Laminating",
                "Sampel Uji Varnish & Tinta Spot UV",
              ].map((sample, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-surface-neutral-alt hover:bg-surface-tint-light cursor-pointer text-xs transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedSamples.includes(sample)}
                    onChange={() => toggleSample(sample)}
                    className="rounded text-bracket-border focus:ring-bracket-border"
                  />
                  <span translate="no" className="notranslate text-on-surface">
                    {sample}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="sample_extra_notes"
              className="block text-xs font-semibold text-on-surface mb-1"
            >
              Catatan Tambahan (Opsional)
            </label>
            <textarea
              id="sample_extra_notes"
              rows={2}
              value={extraNotes}
              onChange={(e) => setExtraNotes(e.target.value)}
              placeholder="Tuliskan kebutuhan khusus atau catatan tambahan jika ada..."
              className="w-full px-3.5 py-2 rounded-xl bg-surface-neutral-alt border border-outline-variant text-xs sm:text-sm focus:border-bracket-border focus:outline-none resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-surface-container">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high text-xs sm:text-sm font-medium transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-bracket-border hover:bg-primary text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span translate="no" className="material-symbols-outlined notranslate text-[16px] notranslate">
                send
              </span>
              Kirim via WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

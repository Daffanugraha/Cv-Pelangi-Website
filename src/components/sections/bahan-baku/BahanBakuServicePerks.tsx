"use client";

import React from "react";
import { b2bServicePerks } from "@/lib/data/rawMaterials";

interface BahanBakuServicePerksProps {
  onRequestSample: () => void;
}

export default function BahanBakuServicePerks({
  onRequestSample,
}: BahanBakuServicePerksProps) {
  return (
    <section className="w-full bg-surface-canvas py-14 sm:py-20 border-b border-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-tint-light text-primary font-label-meta text-xs font-semibold mb-3">
            <span translate="no" className="material-symbols-outlined notranslate text-[16px] notranslate">
              handshake
            </span>
            Jaminan Layanan Grosir B2B
          </div>
          <h2 className="font-headline-xl text-[26px] sm:text-[34px] md:text-headline-xl text-on-surface font-bold tracking-tight">
            Kemudahan Berbelanja Bahan di{" "}
            <span translate="no" className="notranslate text-bracket-border">
              Pelangi UV
            </span>
          </h2>
          <p className="font-body-md text-sm sm:text-body-md text-text-body mt-2">
            Kami memahami efisiensi waktu &amp; presisi ukuran adalah kunci produktivitas percetakan.
            Nikmati layanan bernilai tambah gratis untuk setiap mitra bisnis kami.
          </p>
        </div>

        {/* 4 B2B Perks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {b2bServicePerks.map((perk, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-surface-neutral-alt border border-outline-variant/80 hover:border-bracket-border hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-tint-light text-primary flex items-center justify-center mb-4 border border-divider-tint/60">
                  <span translate="no" className="material-symbols-outlined notranslate text-[26px] notranslate">
                    {perk.icon}
                  </span>
                </div>
                <h3 className="font-headline-sm text-[16px] font-bold text-on-surface mb-2">
                  {perk.title}
                </h3>
                <p className="font-body-sm text-xs sm:text-[13px] text-text-body leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Free Swatch Sample Physical Delivery Banner */}
        <div
          id="sample-gratis"
          className="mt-10 rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-navbar-black to-[#1a1112] text-white border border-divider-tint/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-bracket-border text-white flex items-center justify-center shrink-0 shadow-md">
              <span translate="no" className="material-symbols-outlined notranslate text-[30px] notranslate">
                inventory_2
              </span>
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-accent-gold/20 text-accent-gold font-label-meta text-[11px] font-bold mb-1">
                <span translate="no" className="material-symbols-outlined notranslate text-[13px] notranslate">
                  redeem
                </span>
                Gratis untuk Percetakan &amp; Workshop Cetak
              </div>
              <h3 className="font-headline-sm text-[18px] sm:text-[20px] font-bold text-white">
                Butuh Swatch Sample Fisik Sebelum Order Massal?
              </h3>
              <p className="font-body-sm text-xs sm:text-[13px] text-surface-dim mt-1 max-w-xl">
                Kami siap kirimkan paket swatch book BOPP film (gloss/doff/velvet), contoh potongan
                roll foil warna-warni, serta sampel lem uji lab langsung ke alamat percetakan Anda.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={onRequestSample}
              className="flex-1 md:flex-initial px-6 py-3 rounded-full bg-bracket-border hover:bg-primary text-white font-cta-pill text-xs sm:text-cta-pill shadow-md transition-all text-center cursor-pointer"
            >
              Minta Sample Gratis Sekarang
            </button>
            <a
              href="https://wa.me/6282231019363?text=Halo%20Pelangi%20UV%2C%20saya%20ingin%20meminta%20Paket%20Swatch%20Sample%20Fisik%20Bahan%20Baku%20Finishing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-cta-pill text-xs sm:text-cta-pill transition-all text-center"
            >
              Chat via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

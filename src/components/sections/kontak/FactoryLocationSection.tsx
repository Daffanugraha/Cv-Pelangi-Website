import React from "react";
import FactoryMapEmbed from "@/components/ui/FactoryMapEmbed";

export default function FactoryLocationSection() {
  return (
    <section
      className="w-full bg-white border-y border-slate-200/80 py-12 lg:py-16"
      id="lokasi-peta"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Ringkas */}
        <div className="mb-6 sm:mb-8">
          <h2 className="font-headline-xl text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Lokasi Pabrik &amp; Gudang Operasional
          </h2>
          <p className="font-body-md text-xs sm:text-sm text-slate-600 mt-1">
            Kompleks Pergudangan Bizpark Waru, Sidoarjo — 10 menit dari Tol Tambak Sumur &amp; Bandara Juanda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Peta Google Maps (7 Kolom) */}
          <div className="lg:col-span-7 flex flex-col">
            <FactoryMapEmbed minHeightClass="min-h-[380px] lg:min-h-full" />
          </div>

          {/* Kartu Informasi Inti (5 Kolom) - Bersih & To-the-point */}
          <div className="lg:col-span-5 bg-slate-50/80 rounded-2xl p-6 sm:p-7 border border-slate-200/90 flex flex-col justify-between">
            <div className="space-y-6">
              {/* 1. Alamat Pabrik */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-secondary-container flex items-center justify-center shrink-0 mt-0.5 border border-red-100">
                  <span translate="no" className="material-symbols-outlined notranslate text-[20px]">
                    location_on
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Alamat Pabrik
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Kompleks Pergudangan Bizpark C17-C19, Tambaksawah, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256
                  </p>
                </div>
              </div>

              {/* 2. Jam Operasional */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 border border-blue-100">
                  <span translate="no" className="material-symbols-outlined notranslate text-[20px]">
                    schedule
                  </span>
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-slate-900 text-sm">
                    Jam Operasional
                  </h4>
                  <div className="mt-2 text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200/80 space-y-1.5 shadow-2xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Senin – Jumat</span>
                      <span className="font-bold text-slate-900">07.30 – 15.30 WIB</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Sabtu</span>
                      <span className="font-bold text-slate-900">07.30 – 13.00 WIB</span>
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-slate-100 text-secondary">
                      <span>Minggu &amp; Libur</span>
                      <span className="font-semibold text-[11px]">Tutup (WA Tetap Aktif)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol Aksi Bersih & Fungsional */}
            <div className="pt-6 border-t border-slate-200/80 mt-6 space-y-2.5">
              <a
                className="w-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-98"
                href="https://wa.me/6282231019363?text=Halo%20Pelangi%20UV,%20saya%20mau%20konfirmasi%20kunjungan%20ke%20pabrik"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                  chat
                </span>
                <span>Chat WhatsApp Pabrik</span>
              </a>

              <a
                className="w-full py-2.5 px-5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 transition-colors cursor-pointer active:scale-98"
                href="https://maps.app.goo.gl/sfBs972qUZfScwMJ6"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[18px] text-secondary">
                  directions
                </span>
                <span>Buka di Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import FactoryMapEmbed from "@/components/ui/FactoryMapEmbed";

export default function FactoryLocationSection() {
  return (
    <section
      className="w-full bg-white border-y border-slate-200/80 py-12 lg:py-16"
      id="lokasi-peta"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Bersih & To-the-Point */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
            <span translate="no" className="material-symbols-outlined notranslate text-[16px] text-secondary">
              warehouse
            </span>
            Pabrik &amp; Workshop
          </div>
          <h2 className="font-headline-xl text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Lokasi Pabrik &amp; Gudang Operasional
          </h2>
          <p className="font-body-md text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Kompleks Pergudangan Bizpark Waru, Sidoarjo — Akses muat armada box &amp; pick-up mudah, hanya 10 menit dari Tol Tambak Sumur dan Bandara Juanda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Peta Google Maps Interaktif (7 Kolom) */}
          <div className="lg:col-span-7 flex flex-col">
            <FactoryMapEmbed minHeightClass="min-h-[360px] lg:min-h-full" />
          </div>

          {/* Kartu Informasi & Aksi Langsung (5 Kolom) */}
          <div className="lg:col-span-5 bg-slate-50/70 rounded-2xl p-6 lg:p-7 border border-slate-200 flex flex-col justify-between shadow-xs">
            <div className="space-y-5">
              {/* 1. Alamat Pabrik */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-red-100 text-secondary-container flex items-center justify-center shrink-0 mt-0.5">
                  <span translate="no" className="material-symbols-outlined notranslate text-[20px]">
                    location_on
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Alamat Lengkap
                  </h4>
                  <p className="text-xs sm:text-[13px] text-slate-600 mt-1 leading-relaxed">
                    Kompleks Pergudangan Bizpark C17-C19, Tambaksawah, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256
                  </p>
                </div>
              </div>

              {/* 2. Jam Operasional */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <span translate="no" className="material-symbols-outlined notranslate text-[20px]">
                    schedule
                  </span>
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-slate-900 text-sm">
                    Jam Operasional Kantor &amp; Workshop
                  </h4>
                  <div className="mt-2 text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-500">Senin – Jumat</span>
                      <span className="font-bold text-slate-900">07.30 – 15.30 WIB</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-500">Sabtu</span>
                      <span className="font-bold text-slate-900">07.30 – 13.00 WIB</span>
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-slate-100 text-secondary">
                      <span className="font-medium">Minggu &amp; Tanggal Merah</span>
                      <span className="font-bold text-[11px]">Tutup (Hotline WA Aktif)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Fasilitas Kunjungan */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <span translate="no" className="material-symbols-outlined notranslate text-[20px]">
                    check_circle
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Layanan Langsung di Lokasi
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Terima drop-off lembaran cetak plano, pengecekan swatch fisik, dan konsultasi teknis mesin.
                  </p>
                </div>
              </div>
            </div>

            {/* Dua Tombol Aksi Utama: Google Maps & Janji Kunjungan WhatsApp */}
            <div className="pt-6 border-t border-slate-200/80 mt-6 space-y-2.5">
              <a
                className="w-full py-3 px-5 rounded-xl bg-secondary-container hover:bg-primary text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-98"
                href="https://maps.app.goo.gl/sfBs972qUZfScwMJ6"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                  near_me
                </span>
                <span>Buka Navigasi Google Maps</span>
              </a>

              <a
                className="w-full py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 shadow-2xs"
                href="https://wa.me/6282231019363?text=Halo%20Tim%20Pelangi%20UV,%20saya%20ingin%20jadwalkan%20kunjungan%20ke%20workshop%20Bizpark"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                  chat
                </span>
                <span>Jadwalkan Kunjungan via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

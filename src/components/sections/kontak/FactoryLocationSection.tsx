import React from "react";

export default function FactoryLocationSection() {
  return (
    <section
      className="w-full bg-white border-y border-slate-200/80 py-16 lg:py-20"
      id="lokasi-peta"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-secondary text-xs font-label-meta font-bold uppercase tracking-wider mb-2">
            <span translate="no" className="material-symbols-outlined notranslate text-[16px]">
              warehouse
            </span>
            Pabrik &amp; Pergudangan Utama
          </div>
          <h2 className="font-headline-xl text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Lokasi Pabrik &amp; Gudang Operasional
          </h2>
          <p className="font-body-md text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Berada di pusat pergudangan strategis Waru Sidoarjo, memudahkan akses
            penjemputan dan pengantaran armada box untuk seluruh wilayah
            Surabaya, Sidoarjo, Gresik, dan sekitarnya.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map Preview Left Column (60%) */}
          <div className="lg:col-span-7 bg-[#f8fafc] rounded-2xl p-2 sm:p-3 border border-slate-200 shadow-xs flex flex-col overflow-hidden">
            <div className="relative w-full h-full min-h-[380px] lg:min-h-[460px] rounded-xl overflow-hidden border border-slate-200/80">
              <iframe
                allowFullScreen
                className="w-full h-full min-h-[380px] lg:min-h-[460px] rounded-xl"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=-7.3633984,112.7802609+(CV%20Pelangi%20UV)&output=embed"
                style={{ border: 0 }}
                title="Peta Lokasi CV Pelangi UV Bizpark Sidoarjo"
                width="100%"
              />
              <a
                href="https://maps.app.goo.gl/sfBs972qUZfScwMJ6"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 left-3 bg-slate-900/90 hover:bg-black backdrop-blur-md text-white px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2.5 transition-all hover:scale-105"
                title="Buka lokasi di Google Maps"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-secondary-container text-[20px]">
                  pin_drop
                </span>
                <div>
                  <p className="text-xs font-bold leading-tight flex items-center gap-1">
                    <span translate="no" className="notranslate">CV Pelangi UV</span> — Pabrik Utama
                    <span translate="no" className="material-symbols-outlined notranslate text-[12px] opacity-70">open_in_new</span>
                  </p>
                  <p className="text-[11px] text-slate-300">
                    Kompleks Bizpark Jabon Blok C17-C19
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Location Information Details Card Right Column (40%) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="font-headline-sm text-lg font-bold text-slate-900">
                  Kunjungi Pabrik Kami
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Datang langsung untuk konsultasi bahan plano, cek mesin, atau
                  membawa file cetakan Anda.
                </p>
              </div>

              <div className="space-y-4 text-xs font-body-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-secondary-container flex items-center justify-center shrink-0 mt-0.5">
                    <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                      location_on
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-xs">
                      Alamat Pabrik:
                    </p>
                    <a
                      href="https://maps.app.goo.gl/sfBs972qUZfScwMJ6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 mt-0.5 leading-relaxed block hover:text-secondary-container transition-colors group"
                      title="Buka lokasi di Google Maps"
                    >
                      <span>
                        Kompleks Pergudangan Bizpark C17-C19, Jabon, Tambaksawah,
                        Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-secondary-container font-semibold mt-0.5">
                        <span translate="no" className="material-symbols-outlined notranslate text-[13px]">near_me</span>
                        Buka di Google Maps
                      </span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-secondary-container flex items-center justify-center shrink-0 mt-0.5">
                    <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                      near_me
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-xs">
                      Aksesibilitas:
                    </p>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">
                      Hanya 10 menit dari Tol Tambak Sumur &amp; Bandara Juanda.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-secondary-container flex items-center justify-center shrink-0 mt-0.5">
                    <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                      schedule
                    </span>
                  </div>
                  <div className="w-full">
                    <p className="font-bold text-slate-800 text-xs">
                      Jam Operasional:
                    </p>
                    <div className="mt-2 space-y-1 text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div className="flex justify-between">
                        <span className="font-medium">Senin - Jumat:</span>
                        <span className="font-semibold text-slate-900">
                          07.30 - 15.30 WIB
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Sabtu:</span>
                        <span className="font-semibold text-slate-900">
                          07.30 - 13.00 WIB
                        </span>
                      </div>
                      <div className="flex justify-between text-secondary">
                        <span className="font-medium">Minggu &amp; Libur:</span>
                        <span className="font-semibold">
                          Tutup (Hotline WA Aktif)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-2.5">
              <a
                className="w-full py-3 px-6 rounded-full bg-secondary-container hover:bg-primary text-white font-cta-pill text-xs font-semibold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(254,84,83,0.3)] transition-all cursor-pointer active:scale-95"
                href="https://maps.app.goo.gl/sfBs972qUZfScwMJ6"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                  directions
                </span>
                Buka di Google Maps
              </a>
              <a
                className="w-full py-2.5 px-6 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-label-nav text-xs font-medium flex items-center justify-center gap-2 border border-slate-200 transition-colors cursor-pointer active:scale-95"
                href="https://wa.me/6282231019363?text=Halo%20Pelangi%20UV,%20saya%20mau%20konfirmasi%20jadwal%20kunjungan%20ke%20gudang"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[16px]">
                  calendar_month
                </span>
                Konfirmasi Jadwal Kunjungan
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

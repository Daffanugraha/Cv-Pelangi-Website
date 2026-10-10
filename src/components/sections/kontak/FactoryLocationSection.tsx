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
              {/* Google Maps Place Card Style */}
              <div className="absolute top-3 left-3 z-10 max-w-[310px] sm:max-w-[350px] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/90 p-3 sm:p-3.5 text-slate-900 transition-all">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-red-50 text-[#EA4335] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 leading-tight truncate">
                        CV Pelangi UV
                      </h4>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">
                        Pabrik Utama
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                      Kompleks Pergudangan Bizpark C17-C19, Tambaksawah, Waru, Sidoarjo 61256
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-2">
                      <a
                        href="https://maps.app.goo.gl/sfBs972qUZfScwMJ6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A73E8] hover:bg-[#1557B0] text-white text-[11px] font-bold shadow-xs transition hover:scale-102 active:scale-98"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M21.71 11.29l-9-9a.996.996 0 00-1.41 0l-9 9a.996.996 0 000 1.41l9 9c.39.39 1.02.39 1.41 0l9-9a.996.996 0 000-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z" />
                        </svg>
                        <span>Petunjuk Arah</span>
                      </a>
                      <a
                        href="https://maps.app.goo.gl/sfBs972qUZfScwMJ6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1A73E8] hover:underline px-1 py-1"
                      >
                        <span>Buka Google Maps</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
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

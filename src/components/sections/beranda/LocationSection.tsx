import React from "react";

export default function LocationSection() {
  return (
    <section
      className="w-full bg-surface-canvas py-space-3xl relative"
      id="lokasi"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="text-center max-w-2xl mx-auto mb-space-2xl">
          <span className="font-label-meta text-label-meta uppercase tracking-widest text-bracket-border font-bold">
            Kunjungi Fasilitas Kami
          </span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold mt-1">
            Lokasi Kantor Kami
          </h2>
          <p className="font-body-md text-body-md text-text-muted mt-1">
            Kunjungi kantor &amp; gudang produksi kami di kawasan industri Bizpark Sidoarjo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-stretch">
          {/* Map Frame */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-xl min-h-[380px] bg-surface-neutral-alt relative group">
            <iframe
              className="w-full h-full min-h-[380px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=-7.3633984,112.7802609+(CV%20Pelangi%20UV)&amp;z=16&amp;output=embed"
              title="Peta Lokasi CV Pelangi UV Bizpark Sidoarjo"
            ></iframe>
            <a
              href="https://maps.app.goo.gl/sfBs972qUZfScwMJ6"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 left-3 bg-slate-900/90 hover:bg-black text-white px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2.5 transition-all hover:scale-105"
              title="Buka rute langsung di Google Maps"
            >
              <span translate="no" className="material-symbols-outlined notranslate text-bracket-border text-[20px]">
                near_me
              </span>
              <div>
                <p className="text-xs font-bold leading-tight flex items-center gap-1">
                  <span translate="no" className="notranslate">CV Pelangi UV</span>
                  <span translate="no" className="material-symbols-outlined notranslate text-[12px] opacity-70">open_in_new</span>
                </p>
                <p className="text-[11px] text-slate-300">
                  Bizpark Jabon Blok C17-C19
                </p>
              </div>
            </a>
          </div>

          {/* Location Information Card */}
          <div className="lg:col-span-5 bg-surface-neutral-alt p-space-xl rounded-3xl flex flex-col justify-between shadow-sm">
            <div className="space-y-space-md">
              <div className="flex items-start gap-space-sm">
                <div className="w-10 h-10 rounded-full bg-bracket-border/10 text-bracket-border flex items-center justify-center shrink-0">
                  <span translate="no" className="material-symbols-outlined notranslate text-[22px]">
                    location_on
                  </span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Alamat Utama
                  </h4>
                  <a
                    href="https://maps.app.goo.gl/sfBs972qUZfScwMJ6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body-sm text-body-sm text-text-body mt-1 leading-relaxed block hover:text-bracket-border transition-colors group"
                    title="Buka alamat di Google Maps"
                  >
                    <span>
                      Kompleks Pergudangan Bizpark C17-C19, Jabon, Tambaksawah, Kec.
                      Waru, Kabupaten Sidoarjo, Jawa Timur 61256
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-bracket-border font-semibold mt-1">
                      <span translate="no" className="material-symbols-outlined notranslate text-[14px]">near_me</span>
                      Petunjuk Arah Google Maps
                    </span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-space-sm">
                <div className="w-10 h-10 rounded-full bg-bracket-border/10 text-bracket-border flex items-center justify-center shrink-0">
                  <span translate="no" className="material-symbols-outlined notranslate text-[22px]">
                    schedule
                  </span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Jam Operasional
                  </h4>
                  <div className="font-body-sm text-body-sm text-text-body mt-1 leading-relaxed space-y-0.5">
                    <p>Senin - Jumat: 07.30 - 15.30 WIB</p>
                    <p>Sabtu: 07.30 - 13.00 WIB</p>
                    <p className="text-bracket-border font-semibold pt-0.5">
                      Lini Mesin: 24 Jam Non-Stop (Shift Khusus)
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-space-sm">
                <div className="w-10 h-10 rounded-full bg-action-whatsapp/15 text-action-whatsapp flex items-center justify-center shrink-0">
                  <span translate="no" className="material-symbols-outlined notranslate text-[22px]">
                    chat
                  </span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Hubungi Kami Langsung
                  </h4>
                  <p className="font-body-sm text-body-sm text-text-body mt-1 leading-relaxed">
                    Telp: 031 866 7469 / 031 867 7468
                    <br />
                    WhatsApp: 0822 3101 9363
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-space-lg mt-space-md border-t border-outline-variant/30 flex flex-col sm:flex-row gap-space-sm">
              <a
                className="w-full inline-flex items-center justify-center gap-2 px-space-lg py-space-sm rounded-full bg-bracket-border text-on-primary font-cta-pill text-cta-pill hover:bg-primary transition-all duration-200 shadow-md"
                href="https://maps.app.goo.gl/sfBs972qUZfScwMJ6"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                  near_me
                </span>
                <span>Buka di Google Maps</span>
              </a>
              <a
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-space-lg py-space-sm rounded-full bg-action-whatsapp hover:bg-action-whatsapp-hover text-on-primary font-cta-pill text-cta-pill transition-all duration-200 shadow-md"
                href="https://wa.me/6282231019363"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                  chat
                </span>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

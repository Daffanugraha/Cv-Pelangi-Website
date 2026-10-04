import React from "react";

export default function LayananCtaSection() {
  return (
    <section className="relative w-full py-16 lg:py-24 bg-navbar-black text-on-primary overflow-hidden" id="pesan-sekarang">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 text-center flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white max-w-4xl tracking-tight leading-tight mb-4">
          Siap Meningkatkan Nilai Jual Kemasan Produk Anda?
        </h2>
        <p className="text-base text-surface-dim/80 max-w-2xl leading-relaxed mb-8">
          Konsultasikan kebutuhan spesifikasi finishing Anda bersama tim teknis CV Pelangi UV. Kami berikan solusi terbaik, estimasi oplah, dan jadwal produksi yang tepat waktu.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="https://wa.me/6282231019363?text=Halo%20CV%20Pelangi%20UV%2C%20saya%20ingin%20konsultasi%20layanan%20finishing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-secondary-container hover:bg-primary text-white font-bold text-base shadow-[0_8px_24px_rgba(246,84,86,0.4)] transition-all hover:scale-105 active:scale-95">
            <span translate="no" className="material-symbols-outlined notranslate text-[20px]">chat</span>
            <span>Hubungi via WhatsApp</span>
          </a>
          <a href="/kontak" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-base border border-white/20 transition-all hover:scale-105">
            <span translate="no" className="material-symbols-outlined notranslate text-[20px]">location_on</span>
            <span>Kunjungi Workshop Bizpark</span>
          </a>
        </div>
      </div>
    </section>
  );
}

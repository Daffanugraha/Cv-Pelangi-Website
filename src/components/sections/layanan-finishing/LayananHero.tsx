import React from "react";

export default function LayananHero() {
  return (
    <section className="relative w-full overflow-hidden bg-navbar-black text-on-primary rounded-b-[48px]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-0 bg-navbar-black">
        <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover scale-105 opacity-45 filter brightness-90 contrast-105">
          <source src="/videos/video-layanan.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-navbar-black/90 via-navbar-black/75 to-navbar-black" style={{ background: "linear-gradient(rgba(10, 12, 16, 0.75) 0%, rgba(15, 17, 23, 0.88) 100%)" }} />
      </div>
      <div className="relative w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-12 pb-20 flex flex-col items-center text-center">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md mb-8 self-start">
          <a className="font-label-meta text-label-meta text-surface-dim hover:text-on-primary transition-colors flex items-center gap-1" data-path="beranda" href="/">
            <span translate="no" className="material-symbols-outlined notranslate text-[14px]">home</span> Beranda
          </a>
          <span className="text-surface-dim/60 font-body-sm text-[12px]">/</span>
          <span className="font-label-meta text-label-meta text-surface-dim">Produk</span>
          <span className="text-surface-dim/60 font-body-sm text-[12px]">/</span>
          <span className="font-label-meta text-label-meta text-secondary-container font-semibold">Layanan &amp; Finishing</span>
        </nav>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black max-w-5xl tracking-tight text-white mb-6 leading-[1.12]">
          Layanan Jasa <span className="text-secondary-container">Finishing Cetak</span> &amp; Pasca-Cetak Presisi
        </h1>
        <p className="text-sm sm:text-base text-surface-dim/80 max-w-2xl leading-relaxed mb-8 font-normal">
          Solusi terlengkap spesialis finishing pasca-cetak berpresisi tinggi untuk industri kemasan &amp; percetakan sejak 2004: Spot UV, Hot Foil Stamping, Laminasi Velvet Doff &amp; Glossy, Pond Die-Cut, hingga Cast &amp; Cure berkecepatan tinggi.
        </p>

        <a href="#view-jasa-section" className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-cta-pill text-cta-pill transition-all duration-300 bg-secondary-container hover:bg-primary text-on-primary shadow-[0_8px_20px_rgba(246,84,86,0.35)] cursor-pointer hover:scale-105 active:scale-95" id="tab-jasa-btn">
          <span translate="no" className="material-symbols-outlined notranslate text-[18px]">layers</span>
          <span>Layanan Jasa Finishing</span>
          <span translate="no" className="material-symbols-outlined notranslate text-[18px]">arrow_downward</span>
        </a>
      </div>
    </section>
  );
}

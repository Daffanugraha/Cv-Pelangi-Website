import React from "react";

export default function LayananValueSection() {
  return (
    <section className="w-full py-16 lg:py-20 bg-surface-bright relative overflow-hidden">
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col items-center">
        <div className="text-center flex flex-col items-center max-w-3xl mb-12">
          <h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-extrabold sm:text-4xl leading-tight">Keunggulan Layanan Finishing CV Pelangi UV</h2>
          <p className="font-body-lg text-body-lg text-text-muted mt-3 leading-relaxed">Mengapa ratusan mitra percetakan dan industri kemasan mempercayakan pengerjaan pasca-cetak berpresisi tinggi kepada kami.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          <div className="rounded-3xl bg-surface-container-lowest border border-divider-tint/60 p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-surface-tint-light flex items-center justify-center text-secondary-container">
                <span translate="no" className="material-symbols-outlined notranslate text-[24px]">precision_manufacturing</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold text-navbar-black">Presisi Mesin Modern</h3>
                <p className="font-body-sm text-secondary-container font-semibold mt-0.5">High Precision Standard</p>
              </div>
              <p className="font-body-md text-text-body leading-relaxed">Dikerjakan dengan mesin otomatis berteknologi tinggi dan kontrol register toleransi mikron untuk memastikan setiap lembar cetak presisi tanpa cacat.</p>
            </div>
            <div className="pt-6 border-t border-surface-container mt-6">
              <span className="font-label-meta text-xs text-text-muted flex items-center gap-1.5"><span translate="no" className="material-symbols-outlined notranslate text-[16px] text-secondary-container">check</span> Register presisi &amp; detail tajam</span>
            </div>
          </div>
          <div className="rounded-3xl bg-surface-container-lowest border-2 border-bracket-border p-8 flex flex-col justify-between shadow-[0_12px_40px_-10px_rgba(246,84,86,0.18)] relative overflow-hidden group hover:-translate-y-1 transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-surface-tint-light flex items-center justify-center text-secondary-container">
                <span translate="no" className="material-symbols-outlined notranslate text-[24px]">speed</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold text-navbar-black">Kapasitas Oplah Besar &amp; Cepat</h3>
                <p className="font-body-sm text-secondary-container font-semibold mt-0.5">High Output &amp; Fast Turnaround</p>
              </div>
              <p className="font-body-md text-text-body leading-relaxed">Didukung puluhan lini mesin berkecepatan tinggi dengan output hingga ratusan ribu lembar per hari, siap memenuhi deadline proyek Anda tepat waktu.</p>
            </div>
            <div className="pt-6 border-t border-divider-tint/60 mt-6">
              <span className="font-label-meta text-xs text-primary font-semibold flex items-center gap-1.5"><span translate="no" className="material-symbols-outlined notranslate text-[16px] text-secondary-container">check</span> Kapasitas s/d 170.000 lembar/hari</span>
            </div>
          </div>
          <div className="rounded-3xl bg-surface-container-lowest border border-divider-tint/60 p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-surface-tint-light flex items-center justify-center text-secondary-container">
                <span translate="no" className="material-symbols-outlined notranslate text-[24px]">verified</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold text-navbar-black">Material Berkualitas &amp; QC Ketat</h3>
                <p className="font-body-sm text-secondary-container font-semibold mt-0.5">Strict Quality Assurance</p>
              </div>
              <p className="font-body-md text-text-body leading-relaxed">Menggunakan material baku impor grade industri (foil stamping, lem waterbase, film BOPP) dengan inspeksi kualitas berlapis sebelum pengiriman.</p>
            </div>
            <div className="pt-6 border-t border-surface-container mt-6">
              <span className="font-label-meta text-xs text-text-muted flex items-center gap-1.5"><span translate="no" className="material-symbols-outlined notranslate text-[16px] text-secondary-container">check</span> Bebas cacat &amp; daya rekat kuat</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

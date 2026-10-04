"use client";

import React, { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    category: "Layanan Jasa Finishing (Spot UV / Foil / Laminasi / Pond / dll)",
    quantity: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const name = formData.name.trim();
    const company = formData.company.trim();
    const phone = formData.phone.trim();
    const category = formData.category.trim();
    const quantity = formData.quantity.trim();
    const message = formData.message.trim();

    let msg = `Halo Tim Marketing CV Pelangi UV,%0A%0ASaya *${encodeURIComponent(
      name
    )}*`;
    if (company) {
      msg += ` dari perusahaan *${encodeURIComponent(company)}*`;
    }
    msg += `, mau tanya tentang kebutuhan: *${encodeURIComponent(
      category
    )}*.%0A%0A*Rincian Kebutuhan & Spesifikasi:*%0A`;
    if (quantity) {
      msg += `- Estimasi Oplah / Kebutuhan: *${encodeURIComponent(quantity)}*%0A`;
    }
    if (message) {
      msg += `- Catatan Spesifikasi (Opsional): *${encodeURIComponent(message)}*%0A`;
    }
    if (phone) {
      msg += `- No. WhatsApp: *${encodeURIComponent(phone)}*%0A`;
    }
    msg += `%0AMohon informasi penawaran harga & estimasi jadwal pengerjaan/pengiriman. Terima kasih!`;

    window.open(`https://wa.me/6282231019363?text=${msg}`, "_blank");
  };

  return (
    <section
      className="w-full bg-gradient-to-br from-bracket-border via-primary to-secondary py-space-3xl relative text-on-primary overflow-hidden"
      id="kontak"
      style={{ scrollMarginTop: "80px" }}
    >
      <div id="pesan-sekarang" className="absolute -top-24 pointer-events-none" />
      <div className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full bg-on-primary/10 pointer-events-none"></div>
      <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-on-primary/5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-gutter relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-headline-xl text-headline-xl text-on-primary font-black leading-tight sm:text-4xl lg:text-[42px] tracking-tight">
            Mulai Konsultasi &amp; Penawaran Harga Spesifikasi
          </h2>
          <p className="font-body-lg text-body-lg text-on-primary/90 mt-3 leading-relaxed">
            Dapatkan sampel cetak gratis dan kalkulasi biaya terbaik untuk kebutuhan jasa finishing maupun bahan baku dari tim ahli <span translate="no" className="notranslate">CV Pelangi UV</span>.
          </p>
        </div>

        {/* Centered Expanded Card */}
        <div className="w-full max-w-5xl mx-auto rounded-[32px] bg-surface-canvas text-on-surface p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-surface-container">
            <div>
              <h3 className="font-headline-md text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-navbar-black tracking-tight leading-tight">
                Formulir Rincian Spesifikasi
              </h3>
              <p className="text-sm sm:text-base text-text-muted mt-1.5 leading-relaxed">
                Pilih kebutuhan jasa finishing atau bahan baku untuk mendapatkan kalkulasi harga akurat via WhatsApp.
              </p>
            </div>
            <span className="w-14 h-14 rounded-2xl bg-surface-tint-light flex items-center justify-center text-secondary-container shrink-0 shadow-xs border border-divider-tint/40">
              <span translate="no" className="material-symbols-outlined notranslate text-[30px]">edit_document</span>
            </span>
          </div>

          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-label-nav text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5">
                  Nama Lengkap <span className="text-primary text-sm">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Contoh: Hendra Pratama"
                  className="w-full h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface placeholder:text-text-muted focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-nav text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5">
                  Nama Perusahaan / Percetakan (Opsional)
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="Contoh: PT Grafika Prima / CV Mandiri"
                  className="w-full h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface placeholder:text-text-muted focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-label-nav text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5">
                  Nomor WhatsApp / HP <span className="text-primary text-sm">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Contoh: 0812 3456 7890"
                  className="w-full h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface placeholder:text-text-muted focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-nav text-xs sm:text-sm font-bold text-on-surface">
                  Kategori Kebutuhan <span className="text-primary text-sm">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all cursor-pointer font-medium"
                >
                  <option value="Jasa Finishing Pasca-Cetak (Spot UV / Foil / Laminasi / Pond / dll)">
                    Jasa Finishing Pasca-Cetak (Spot UV, Foil, Laminasi, Pond, dll)
                  </option>
                  <option value="Bahan Baku: Film BOPP Thermal (Doff Velvet & Glossy)">
                    Bahan Baku: Film BOPP Thermal (Doff Velvet &amp; Glossy)
                  </option>
                  <option value="Bahan Baku: Roll Foil Stamping (Gold, Silver, Hologram)">
                    Bahan Baku: Roll Foil Stamping (Gold, Silver, Hologram)
                  </option>
                  <option value="Bahan Baku: Lem Waterbase & Chemical Laminating">
                    Bahan Baku: Lem Waterbase &amp; Chemical Laminating
                  </option>
                  <option value="Bahan Baku: Tinta & Varnish Spot UV">
                    Bahan Baku: Tinta &amp; Varnish Spot UV
                  </option>
                  <option value="Paket Jasa Finishing + Penyediaan Bahan Baku Lengkap">
                    Paket Jasa Finishing + Penyediaan Bahan Baku Lengkap
                  </option>
                  <option value="Permintaan Sampel Fisik / Uji Coba Proofing">
                    Permintaan Sampel Fisik / Uji Coba Proofing
                  </option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label-nav text-xs sm:text-sm font-bold text-on-surface">
                Estimasi Kuantitas / Oplah Cetak / Kebutuhan Roll
              </label>
              <input
                type="text"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                placeholder="Contoh: 5.000 lembar plano / 10 roll foil / 2 pail lem"
                className="w-full h-14 px-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface placeholder:text-text-muted focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label-nav text-xs sm:text-sm font-bold text-on-surface">
                Catatan Spesifikasi (Opsional: Ukuran Bidang Plano, Gramatur Kertas, Efek Khusus)
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Tuliskan spesifikasi detail kertas (misal: Art Carton 260gsm, Ivory 300gsm), ukuran bidang plano, atau spesifikasi bahan baku yang dibutuhkan..."
                className="w-full p-5 rounded-2xl bg-surface-neutral-alt border border-surface-container text-sm sm:text-base text-on-surface placeholder:text-text-muted focus:bg-white focus:border-bracket-border focus:ring-2 focus:ring-bracket-border/20 outline-none transition-all leading-relaxed"
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-secondary-container hover:bg-primary text-on-primary font-cta-pill text-base sm:text-lg font-bold transition-all shadow-[0_10px_25px_rgba(246,84,86,0.38)] cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[24px]">send</span>
                <span>Kirim Spesifikasi via WhatsApp</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

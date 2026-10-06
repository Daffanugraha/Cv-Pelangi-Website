"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function InquiryFormSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    nama: "",
    perusahaan: "",
    wa: "",
    kebutuhan: "Layanan Jasa Finishing Percetakan",
    pesan: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nama = formData.nama.trim();
    const perusahaan = formData.perusahaan.trim();
    const wa = formData.wa.trim();
    const kebutuhan = formData.kebutuhan;
    const pesan = formData.pesan.trim();

    let msg = `Halo Tim Marketing CV Pelangi UV,%0A%0ASaya *${encodeURIComponent(
      nama
    )}*`;
    if (perusahaan && perusahaan !== "-") {
      msg += ` dari perusahaan *${encodeURIComponent(perusahaan)}*`;
    }
    msg += `, mau tanya tentang: *${encodeURIComponent(
      kebutuhan
    )}*.%0A%0A*Rincian Spesifikasi & Kebutuhan:*%0A${encodeURIComponent(
      pesan || "Tidak ada spesifikasi khusus (mohon konsultasi)"
    )}%0A%0A*Kontak WhatsApp:* ${encodeURIComponent(
      wa
    )}%0A%0AMohon informasi penawaran harga dan ketersediaan jadwal mesin. Terima kasih!`;

    window.open(`https://wa.me/6282231019363?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section
      className="w-full bg-[#faf7f6] border-t border-slate-200/80 py-16 lg:py-20"
      id="section-form"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-sm">
            <div className="mb-6">
              <span className="font-label-meta text-xs text-secondary font-bold uppercase tracking-wider block mb-1">
                {t("form_badge")}
              </span>
              <h2 className="font-headline-lg text-2xl font-bold text-slate-900">
                {t("form_title")}
              </h2>
              <p className="font-body-sm text-xs sm:text-sm text-slate-500 mt-1">
                {t("form_desc")}
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-sm">
                  <span translate="no" className="material-symbols-outlined notranslate text-[24px]">
                    check
                  </span>
                </div>
                <h3 className="font-headline-sm text-base font-bold text-slate-900">
                  Permintaan Sedang Dialihkan ke WhatsApp!
                </h3>
                <p className="font-body-sm text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                  Terima kasih, Bapak/Ibu {formData.nama}. Tim estimasi dan PIC
                  Pelangi UV siap menyambut pesan Anda via WhatsApp.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        nama: "",
                        perusahaan: "",
                        wa: "",
                        kebutuhan: "Layanan Jasa Finishing Percetakan",
                        pesan: "",
                      });
                    }}
                    className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    Kirim Permintaan Lain
                  </button>
                </div>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs font-label-meta font-semibold text-slate-700 mb-1.5"
                      htmlFor="input-nama"
                    >
                      {t("form_name_label")}
                    </label>
                    <input
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all"
                      id="input-nama"
                      placeholder={t("form_name_placeholder")}
                      required
                      type="text"
                      value={formData.nama}
                      onChange={(e) =>
                        setFormData({ ...formData, nama: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-label-meta font-semibold text-slate-700 mb-1.5"
                      htmlFor="input-perusahaan"
                    >
                      {t("form_company_label")}
                    </label>
                    <input
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all"
                      id="input-perusahaan"
                      placeholder={t("form_company_placeholder")}
                      type="text"
                      value={formData.perusahaan}
                      onChange={(e) =>
                        setFormData({ ...formData, perusahaan: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs font-label-meta font-semibold text-slate-700 mb-1.5"
                      htmlFor="input-wa"
                    >
                      {t("form_wa_label")}
                    </label>
                    <input
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all"
                      id="input-wa"
                      placeholder={t("form_wa_placeholder")}
                      required
                      type="tel"
                      value={formData.wa}
                      onChange={(e) =>
                        setFormData({ ...formData, wa: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-label-meta font-semibold text-slate-700 mb-1.5"
                      htmlFor="input-kebutuhan"
                    >
                      {t("form_category_label")}
                    </label>
                    <select
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all bg-white"
                      id="input-kebutuhan"
                      required
                      value={formData.kebutuhan}
                      onChange={(e) =>
                        setFormData({ ...formData, kebutuhan: e.target.value })
                      }
                    >
                      <option value="Layanan Jasa Finishing Percetakan">
                        Layanan Jasa Finishing Percetakan
                      </option>
                      <option value="Grosir Bahan Baku (OPP / Lem / Foil)">
                        Grosir Bahan Baku (OPP / Lem / Foil)
                      </option>
                      <option value="Permintaan Sample Swatch / Demo Mesin">
                        Permintaan Sample Swatch / Demo Mesin
                      </option>
                      <option value="Penjemputan Order Express">
                        Penjemputan Order Express
                      </option>
                      <option value="Kebutuhan Lainnya">Kebutuhan Lainnya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs font-label-meta font-semibold text-slate-700 mb-1.5"
                    htmlFor="input-pesan"
                  >
                    {t("form_msg_label")}
                  </label>
                  <textarea
                    className="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all"
                    id="input-pesan"
                    placeholder={t("form_msg_placeholder")}
                    rows={3}
                    value={formData.pesan}
                    onChange={(e) =>
                      setFormData({ ...formData, pesan: e.target.value })
                    }
                  />
                </div>

                <div className="pt-2">
                  <button
                    className="w-full py-3.5 px-6 rounded-full bg-secondary-container hover:bg-primary text-white font-cta-pill text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(254,84,83,0.3)] transition-all cursor-pointer active:scale-95"
                    type="submit"
                  >
                    <span translate="no" className="material-symbols-outlined notranslate text-[18px]">
                      send
                    </span>
                    {t("form_submit_btn")}
                  </button>
                  <p className="text-[11px] font-label-meta text-center text-slate-400 mt-2.5">
                    Data Anda aman dan hanya digunakan untuk korespondensi
                    penawaran resmi <span translate="no" className="notranslate font-semibold">CV Pelangi UV</span>.
                  </p>
                </div>
              </form>
            )}
        </div>
      </div>
    </section>
  );
}

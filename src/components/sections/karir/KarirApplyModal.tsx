"use client";

import React, { useState } from "react";
import { CareerJob } from "@/data/careers";

interface KarirApplyModalProps {
  job: CareerJob | null;
  onClose: () => void;
}

export default function KarirApplyModal({ job, onClose }: KarirApplyModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    position: job ? job.title : "",
    agreement: "ya",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending application
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-surface-canvas rounded-3xl shadow-2xl border border-outline-variant/30 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-navbar-black to-neutral-900 text-white flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bracket-border text-white text-[11px] font-bold uppercase tracking-wider mb-2">
              Divisi {job.division}
            </div>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
              Kirimkan Lamaran Anda
            </h3>
            <p className="text-surface-dim text-xs sm:text-sm mt-1">
              Melamar untuk posisi: <span className="text-white font-bold">{job.title}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-lg"
          >
            &times;
          </button>
        </div>

        {/* Content / Form */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-action-whatsapp/20 text-action-whatsapp flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <h4 className="font-heading font-bold text-xl text-on-surface mb-2">
                Lamaran Berhasil Terkirim!
              </h4>
              <p className="text-text-body text-sm max-w-md mx-auto leading-relaxed mb-6 font-sans">
                Terima kasih, <strong className="text-on-surface">{formData.name}</strong>. Berkas lamaran Anda untuk posisi <strong className="text-on-surface">{job.title}</strong> telah tersimpan di sistem rekrutmen CV Pelangi UV. Tim HRD kami akan meninjau kualifikasi Anda dan menghubungi via WhatsApp atau email.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-bracket-border hover:bg-primary text-white text-sm font-semibold transition shadow-md active:scale-95"
              >
                Selesai
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nama Lengkap */}
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                  Nama Lengkap <span className="text-bracket-border">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Masukkan nama lengkap Anda"
                  className="w-full px-4 py-3 rounded-xl bg-surface-neutral-alt border border-outline-variant/50 focus:border-bracket-border focus:bg-white text-sm text-on-surface outline-none transition"
                />
              </div>

              {/* Email & Telepon / WA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                    Email Aktif <span className="text-bracket-border">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-surface-neutral-alt border border-outline-variant/50 focus:border-bracket-border focus:bg-white text-sm text-on-surface outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                    Nomor WhatsApp / HP <span className="text-bracket-border">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-4 py-3 rounded-xl bg-surface-neutral-alt border border-outline-variant/50 focus:border-bracket-border focus:bg-white text-sm text-on-surface outline-none transition"
                  />
                </div>
              </div>

              {/* Alamat Lengkap */}
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                  Alamat Lengkap / Domisili <span className="text-bracket-border">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Contoh: Jl. Raya Waru No. 12, Sidoarjo"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-neutral-alt border border-outline-variant/50 focus:border-bracket-border focus:bg-white text-sm text-on-surface outline-none transition"
                />
              </div>

              {/* Upload CV / Resume */}
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                  Lampiran Dokumen / CV (PDF / DOCX) <span className="text-bracket-border">*</span>
                </label>
                <div className="border-2 border-dashed border-outline-variant hover:border-bracket-border/60 rounded-2xl p-4 text-center bg-surface-neutral-alt/50 transition cursor-pointer relative">
                  <input
                    type="file"
                    required
                    accept=".pdf,.docx,.doc"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <svg className="w-8 h-8 text-bracket-border" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-xs font-semibold text-on-surface">
                      {selectedFile ? selectedFile.name : "Klik atau seret file CV / Resume ke sini"}
                    </p>
                    <p className="text-[11px] text-text-muted">
                      Format: PDF atau DOCX (Maksimal 5 MB)
                    </p>
                  </div>
                </div>
              </div>

              {/* Persetujuan */}
              <div className="pt-2 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                <p className="text-xs text-text-body leading-relaxed mb-2">
                  <strong className="text-on-surface">Persetujuan:</strong> Apakah Anda menyetujui serta memberikan wewenang kepada CV Pelangi UV untuk memproses data pribadi yang telah Anda berikan untuk keperluan proses seleksi rekrutmen?
                </p>
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2 text-xs font-semibold text-on-surface cursor-pointer">
                    <input
                      type="radio"
                      name="agreement"
                      value="ya"
                      checked={formData.agreement === "ya"}
                      onChange={() => setFormData({ ...formData, agreement: "ya" })}
                      className="text-bracket-border focus:ring-bracket-border"
                    />
                    <span>Ya, Saya Setuju</span>
                  </label>
                  <label className="inline-flex items-center gap-2 text-xs font-semibold text-on-surface cursor-pointer">
                    <input
                      type="radio"
                      name="agreement"
                      value="tidak"
                      checked={formData.agreement === "tidak"}
                      onChange={() => setFormData({ ...formData, agreement: "tidak" })}
                      className="text-bracket-border focus:ring-bracket-border"
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-surface-container">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-outline-variant text-xs font-semibold text-text-body hover:bg-surface-container transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || formData.agreement !== "ya"}
                  className="px-6 py-2.5 rounded-full bg-bracket-border hover:bg-primary disabled:opacity-50 text-xs font-bold text-white transition shadow-md active:scale-95 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Mengirimkan...</span>
                    </>
                  ) : (
                    <span>Kirim Lamaran Sekarang</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

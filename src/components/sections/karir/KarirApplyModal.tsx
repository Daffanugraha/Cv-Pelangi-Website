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
    age: "",
    phone: "",
    referencePhone: "",
    email: "",
    address: "",
    education: "SMK / SMA Sederajat",
    experience: "",
    strengths: "",
    weaknesses: "",
    cvUrl: "",
    agreement: "ya",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!job) return null;

  // Format WhatsApp message text
  const generateWhatsAppMessage = () => {
    let msg = `Halo HRD CV Pelangi UV,\nSaya ingin mengirimkan formulir lamaran kerja untuk posisi:\n*${job.title}* (Divisi ${job.division})\n\n`;
    msg += `📋 *DATA DIRI PELAMAR*\n`;
    msg += `• Nama Lengkap: ${formData.name}\n`;
    if (formData.age) msg += `• Usia: ${formData.age} Tahun\n`;
    msg += `• No. WhatsApp: ${formData.phone}\n`;
    if (formData.referencePhone) msg += `• No. Referensi / Kontak Darurat: ${formData.referencePhone}\n`;
    if (formData.email) msg += `• Email: ${formData.email}\n`;
    if (formData.address) msg += `• Domisili: ${formData.address}\n`;
    if (formData.education) msg += `• Pendidikan Terakhir: ${formData.education}\n\n`;

    msg += `💼 *PENGALAMAN KERJA*\n${formData.experience || "Fresh Graduate / Siap dilatih"}\n\n`;
    msg += `⭐ *KELEBIHAN DIRI*\n${formData.strengths || "-"}\n\n`;
    msg += `🔍 *KEKURANGAN DIRI & CARA MENGATASINYA*\n${formData.weaknesses || "-"}\n\n`;

    if (formData.cvUrl) {
      msg += `📎 *LINK CV / PORTOFOLIO*\n${formData.cvUrl}\n\n`;
    }

    msg += `Demikian data diri dan kualifikasi saya. Mohon informasi jadwal interview atau tahap selanjutnya. Terima kasih!`;
    return encodeURIComponent(msg);
  };

  const handleFileUpload = async (file: File) => {
    setSelectedFile(file);
    setIsUploadingFile(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, cvUrl: data.url }));
      }
    } catch (err) {
      console.warn("Upload file offline fallback:", err);
    } finally {
      setIsUploadingFile(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg("Nama lengkap dan nomor WhatsApp wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/career-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job.id,
          jobTitle: job.title,
          name: formData.name,
          age: formData.age,
          phone: formData.phone,
          referencePhone: formData.referencePhone,
          email: formData.email,
          address: formData.address,
          education: formData.education,
          experience: formData.experience,
          strengths: formData.strengths,
          weaknesses: formData.weaknesses,
          cvUrl: formData.cvUrl,
          fileName: selectedFile?.name || "",
        }),
      });

      if (!res.ok) {
        const d = await res.json();
        setErrorMsg(d.error || "Gagal mengirim formulir.");
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMsg("Terjadi kesalahan jaringan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const waHref = `https://wa.me/6282231019363?text=${generateWhatsAppMessage()}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-surface-canvas rounded-3xl shadow-2xl border border-surface-container-high overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="p-5 sm:p-6 bg-[#121316] text-white flex items-start justify-between border-b border-white/10 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-bracket-border text-white text-[11px] font-bold uppercase tracking-wider mb-2 font-mono">
              Divisi {job.division}
            </div>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
              Formulir Rekrutmen &amp; Profil Pelamar
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Melamar untuk posisi: <span className="text-white font-bold">{job.title}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-bracket-border text-white flex items-center justify-center transition-colors text-lg cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 font-sans">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                <span className="material-symbols-outlined text-3xl">check_circle</span>
              </div>
              <h4 className="font-heading font-bold text-2xl text-gray-900">
                Lamaran Berhasil Diterima!
              </h4>
              <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                Terima kasih, <strong className="text-gray-900">{formData.name}</strong>. Berkas lamaran Anda untuk posisi <strong className="text-gray-900">{job.title}</strong> telah tersimpan di sistem rekrutmen CV Pelangi UV.
              </p>

              {/* Fast-Track WhatsApp CTA */}
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 max-w-md mx-auto text-left space-y-2 mt-4">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase font-mono">
                  <span className="material-symbols-outlined text-sm">bolt</span>
                  <span>Jalur Cepat (Fast-Track HRD)</span>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Ingin respon lebih cepat? Teruskan ringkasan data lamaran Anda langsung ke WhatsApp HRD CV Pelangi UV:
                </p>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-action-whatsapp hover:bg-action-whatsapp-hover text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  <span>Kirim Data Lamaran ke WhatsApp HRD</span>
                </a>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-100 transition cursor-pointer"
                >
                  Selesai &amp; Tutup
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* SECTION 1: DATA DIRI & KONTAK */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-2 pb-1 border-b border-gray-100">
                  <span className="material-symbols-outlined text-bracket-border text-lg">badge</span>
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider font-mono">
                    1. Data Pribadi &amp; Kontak
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                  {/* Nama Lengkap */}
                  <div className="sm:col-span-8">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Nama Lengkap <span className="text-bracket-border">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Masukkan nama lengkap sesuai KTP"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border focus:ring-1 focus:ring-bracket-border text-sm text-gray-900 outline-none transition"
                    />
                  </div>

                  {/* Usia / Umur */}
                  <div className="sm:col-span-4">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Usia / Umur <span className="text-bracket-border">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min={17}
                        max={60}
                        required
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        placeholder="Contoh: 23"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border focus:ring-1 focus:ring-bracket-border text-sm text-gray-900 outline-none transition pr-14"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-mono">
                        Tahun
                      </span>
                    </div>
                  </div>
                </div>

                {/* Nomor WhatsApp & Nomor Referensi */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Nomor WhatsApp / HP Aktif <span className="text-bracket-border">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Contoh: 081234567890"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border focus:ring-1 focus:ring-bracket-border text-sm text-gray-900 outline-none transition font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Nomor Kontak Referensi / Darurat
                    </label>
                    <input
                      type="tel"
                      value={formData.referencePhone}
                      onChange={(e) => setFormData({ ...formData, referencePhone: e.target.value })}
                      placeholder="Nomor atasan lama / keluarga (08xx)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border focus:ring-1 focus:ring-bracket-border text-sm text-gray-900 outline-none transition font-mono"
                    />
                    <span className="text-[10px] text-gray-400 mt-0.5 block">
                      Kontak atasan sebelumnya atau kerabat yang dapat dihubungi.
                    </span>
                  </div>
                </div>

                {/* Email & Domisili */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Aktif
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nama@email.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border focus:ring-1 focus:ring-bracket-border text-sm text-gray-900 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Pendidikan Terakhir
                    </label>
                    <select
                      value={formData.education}
                      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border focus:ring-1 focus:ring-bracket-border text-sm text-gray-900 outline-none transition"
                    >
                      <option value="SMK Grafika / Teknik">SMK Grafika / Teknik</option>
                      <option value="SMA / SMK Sederajat">SMA / SMK Sederajat</option>
                      <option value="Diploma (D3)">Diploma (D3)</option>
                      <option value="Sarjana (S1)">Sarjana (S1)</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>

                {/* Alamat Lengkap / Domisili */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Alamat Lengkap / Domisili Saat Ini <span className="text-bracket-border">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Contoh: Jl. Waru Indah No. 15, Sidoarjo / Surabaya"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border focus:ring-1 focus:ring-bracket-border text-sm text-gray-900 outline-none transition"
                  />
                </div>
              </div>

              {/* SECTION 2: PENGALAMAN KERJA */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 pb-1 border-b border-gray-100">
                  <span className="material-symbols-outlined text-blue-600 text-lg">work_history</span>
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider font-mono">
                    2. Riwayat &amp; Pengalaman Kerja
                  </h4>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Ringkasan Pengalaman Kerja <span className="text-bracket-border">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="Tuliskan pengalaman Anda, contoh:&#10;• 2 Tahun sebagai Operator Mesin Pond di Percetakan ABC (2022 - 2024)&#10;• Menguasai setting pisau pond dan kalibrasi cetak presisi.&#10;(Jika Fresh Graduate, tuliskan jurusan & kegiatan magang PKL)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border focus:ring-1 focus:ring-bracket-border text-sm text-gray-900 outline-none transition font-sans leading-relaxed"
                  />
                </div>
              </div>

              {/* SECTION 3: KELEBIHAN & KEKURANGAN DIRI */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 pb-1 border-b border-gray-100">
                  <span className="material-symbols-outlined text-amber-600 text-lg">psychology</span>
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider font-mono">
                    3. Profil Diri (Kelebihan &amp; Kekurangan)
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Kelebihan */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-emerald-600 text-sm">thumb_up</span>
                      <span>Kelebihan Diri (Strengths) <span className="text-bracket-border">*</span></span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.strengths}
                      onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
                      placeholder="Contoh: Teliti, cepat belajar mesin baru, disiplin waktu, terbiasa kerja tim di bawah target..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border focus:ring-1 focus:ring-bracket-border text-xs sm:text-sm text-gray-900 outline-none transition leading-relaxed"
                    />
                  </div>

                  {/* Kekurangan */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-amber-600 text-sm">tune</span>
                      <span>Kekurangan &amp; Cara Mengatasinya <span className="text-bracket-border">*</span></span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.weaknesses}
                      onChange={(e) => setFormData({ ...formData, weaknesses: e.target.value })}
                      placeholder="Contoh: Terkadang pelupa bila banyak tugas, tetapi saya mengatasinya dengan membuat checklist kerja harian..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border focus:ring-1 focus:ring-bracket-border text-xs sm:text-sm text-gray-900 outline-none transition leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 4: DOKUMEN CV / RESUME */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 pb-1 border-b border-gray-100">
                  <span className="material-symbols-outlined text-purple-600 text-lg">attach_file</span>
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider font-mono">
                    4. Lampiran CV / Berkas
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-start">
                  {/* File Upload */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Unggah File CV (PDF / DOCX)
                    </label>
                    <div className="border border-dashed border-gray-300 hover:border-bracket-border rounded-xl p-3 text-center bg-gray-50/70 transition cursor-pointer relative">
                      <input
                        type="file"
                        accept=".pdf,.docx,.doc,image/*"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleFileUpload(f);
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <div className="flex flex-col items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-bracket-border text-2xl">
                          upload_file
                        </span>
                        <p className="text-xs font-semibold text-gray-800 truncate max-w-[200px]">
                          {selectedFile ? selectedFile.name : "Pilih Berkas CV Anda"}
                        </p>
                        <p className="text-[10px] text-gray-400">PDF atau DOCX (Maks 10MB)</p>
                      </div>
                    </div>
                  </div>

                  {/* Link Drive / Portfolio */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Atau Tautan Google Drive / LinkedIn
                    </label>
                    <input
                      type="url"
                      value={formData.cvUrl}
                      onChange={(e) => setFormData({ ...formData, cvUrl: e.target.value })}
                      placeholder="https://drive.google.com/..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border focus:ring-1 focus:ring-bracket-border text-xs text-gray-900 outline-none transition font-mono"
                    />
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      Pastikan link Google Drive sudah diatur ke publik (&quot;Siapa saja yang memiliki link&quot;).
                    </span>
                  </div>
                </div>
              </div>

              {/* Persetujuan Privasi */}
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 text-xs">
                <p className="text-gray-600 leading-relaxed">
                  <strong className="text-gray-900">Pernyataan Pelamar:</strong> Saya menyatakan bahwa data yang saya cantumkan adalah benar dan bersedia mengikuti prosedur seleksi rekrutmen di CV Pelangi UV.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100">
                {/* Fast Option via WA */}
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm active:scale-95"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                  <span>Kirim via WhatsApp HRD</span>
                </a>

                {/* Standard Submit */}
                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || isUploadingFile}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-bracket-border hover:bg-bracket-border/90 disabled:opacity-50 text-xs font-bold text-white transition shadow-sm active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-sm">
                          progress_activity
                        </span>
                        <span>Mengirimkan Data...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-sm">send</span>
                        <span>Kirim Lamaran Sekarang</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

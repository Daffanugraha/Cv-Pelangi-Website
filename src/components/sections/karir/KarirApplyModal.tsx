"use client";

import React, { useState } from "react";
import { CareerJob } from "@/data/careers";

interface KarirApplyModalProps {
  job: CareerJob | null;
  onClose: () => void;
}

export default function KarirApplyModal({ job, onClose }: KarirApplyModalProps) {
  // Step State: 1 = Identitas & Pendidikan, 2 = Pengalaman & Referensi, 3 = Profil Diri & Berkas
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [formData, setFormData] = useState({
    // Step 1: Identitas & Pendidikan
    name: "",
    age: "",
    phone: "",
    email: "",
    address: "",
    education: "SMK",
    educationMajor: "",

    // Step 2: Pengalaman Kerja & Referensi
    hasExperience: "no" as "yes" | "no",
    companyName: "",
    jobRole: "",
    workDuration: "",
    experience: "",
    internshipExperience: "",
    referenceName: "",
    referenceRelation: "Atasan / Supervisor",
    referencePhone: "",

    // Step 3: Karakter Diri & Berkas
    strengths: "",
    weaknesses: "",
    cvUrl: "",
    agreement: true,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!job) return null;

  // Format WhatsApp message text
  const generateWhatsAppMessage = () => {
    let msg = `Halo HRD CV Pelangi UV,\nSaya ingin mengirimkan berkas lamaran kerja untuk posisi:\n*${job.title}* (Divisi ${job.division})\n\n`;

    msg += `📋 *DATA PRIBADI & PENDIDIKAN*\n`;
    msg += `• Nama Lengkap: ${formData.name}\n`;
    if (formData.age) msg += `• Usia: ${formData.age} Tahun\n`;
    msg += `• No. WhatsApp: ${formData.phone}\n`;
    if (formData.email) msg += `• Email: ${formData.email}\n`;
    if (formData.address) msg += `• Domisili: ${formData.address}\n`;

    const eduDisplay = formData.educationMajor
      ? `${formData.education} - Jurusan ${formData.educationMajor}`
      : formData.education;
    msg += `• Pendidikan: ${eduDisplay}\n\n`;

    msg += `💼 *STATUS & RIWAYAT KERJA*\n`;
    if (formData.hasExperience === "yes") {
      msg += `• Status: Pernah Bekerja\n`;
      if (formData.companyName || formData.jobRole) {
        msg += `• Posisi/Perusahaan: ${formData.jobRole || "-"} (${formData.companyName || "-"})\n`;
      }
      if (formData.workDuration) msg += `• Durasi: ${formData.workDuration}\n`;
      if (formData.experience) msg += `• Detail Pengalaman:\n${formData.experience}\n`;
      if (formData.referencePhone) {
        msg += `• Kontak Referensi Kerja: ${formData.referencePhone} (${formData.referenceName ? formData.referenceName + " - " : ""}${formData.referenceRelation})\n`;
      }
    } else {
      msg += `• Status: Fresh Graduate / Belum Pernah Bekerja (Siap Dilatih)\n`;
      if (formData.internshipExperience) {
        msg += `• Catatan/Magang PKL: ${formData.internshipExperience}\n`;
      }
      if (formData.referencePhone) {
        msg += `• Kontak Darurat / Kerabat: ${formData.referencePhone} (${formData.referenceName ? formData.referenceName + " - " : ""}${formData.referenceRelation})\n`;
      }
    }
    msg += `\n`;

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
      console.warn("Upload file fallback:", err);
    } finally {
      setIsUploadingFile(false);
    }
  };

  // Navigasi Step 1 -> Step 2
  const handleNextStep1 = () => {
    setErrorMsg("");
    if (!formData.name.trim()) {
      setErrorMsg("Silakan isi nama lengkap Anda.");
      return;
    }
    if (!formData.age.trim() || Number(formData.age) < 17 || Number(formData.age) > 65) {
      setErrorMsg("Silakan isi usia yang valid (minimal 17 tahun).");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg("Nomor WhatsApp / HP wajib diisi.");
      return;
    }
    if (!formData.address.trim()) {
      setErrorMsg("Alamat domisili saat ini wajib diisi.");
      return;
    }
    // Jika SMK atau Perguruan Tinggi, anjurkan jurusan
    if (
      ["SMK", "SMA", "Diploma (D3/D4)", "Sarjana (S1)"].includes(formData.education) &&
      !formData.educationMajor.trim()
    ) {
      setErrorMsg("Silakan cantumkan jurusan / program studi pendidikan Anda.");
      return;
    }

    setCurrentStep(2);
  };

  // Navigasi Step 2 -> Step 3
  const handleNextStep2 = () => {
    setErrorMsg("");
    if (formData.hasExperience === "yes") {
      if (!formData.experience.trim() && !formData.jobRole.trim()) {
        setErrorMsg("Silakan ceritakan sedikit posisi atau tugas yang pernah Anda kerjakan.");
        return;
      }
    }
    setCurrentStep(3);
  };

  // Submit Final
  const handleSubmitFinal = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg("");

    if (!formData.strengths.trim()) {
      setErrorMsg("Silakan isi kelebihan utama diri Anda.");
      return;
    }
    if (!formData.weaknesses.trim()) {
      setErrorMsg("Silakan sebutkan kekurangan diri dan cara Anda mengatasinya.");
      return;
    }

    setIsSubmitting(true);

    // Susun riwayat teks gabungan pengalaman
    let finalExperience = "";
    if (formData.hasExperience === "yes") {
      const parts = [];
      if (formData.jobRole) parts.push(`Posisi: ${formData.jobRole}`);
      if (formData.companyName) parts.push(`Perusahaan: ${formData.companyName}`);
      if (formData.workDuration) parts.push(`Lama Kerja: ${formData.workDuration}`);
      if (formData.experience) parts.push(`Deskripsi: ${formData.experience}`);
      finalExperience = parts.join(" | ");
    } else {
      finalExperience = formData.internshipExperience
        ? `Fresh Graduate / Belum Pernah Bekerja. Catatan Magang/PKL: ${formData.internshipExperience}`
        : "Fresh Graduate / Belum Pernah Bekerja (Siap Dilatih)";
    }

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
          referenceRelation: `${formData.referenceName ? formData.referenceName + " - " : ""}${formData.referenceRelation}`,
          email: formData.email,
          address: formData.address,
          education: formData.education,
          educationMajor: formData.educationMajor,
          hasExperience: formData.hasExperience,
          experience: finalExperience,
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
      setErrorMsg("Terjadi gangguan jaringan saat mengirim data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const waHref = `https://wa.me/6282231019363?text=${generateWhatsAppMessage()}`;

  // Apakah jurusan perlu ditampilkan
  const showMajorField = ["SMK", "SMA", "Diploma (D3/D4)", "Sarjana (S1)"].includes(
    formData.education
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-surface-canvas rounded-3xl shadow-2xl border border-surface-container-high overflow-hidden my-4 max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="p-5 sm:p-6 bg-[#121316] text-white flex items-start justify-between border-b border-white/10 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-bracket-border text-white text-[11px] font-bold uppercase tracking-wider mb-1.5 font-mono">
              Divisi {job.division}
            </div>
            <h3 className="font-heading font-extrabold text-lg sm:text-2xl text-white">
              Formulir Rekrutmen Pelamar
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
              Posisi: <span className="text-white font-bold">{job.title}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-bracket-border text-white flex items-center justify-center transition-colors text-lg cursor-pointer"
            title="Tutup Modal"
          >
            &times;
          </button>
        </div>

        {/* 3-STEP PROGRESS WIZARD BAR */}
        {!isSuccess && (
          <div className="px-5 sm:px-8 py-3 bg-gray-50 border-b border-gray-200 shrink-0">
            <div className="flex items-center justify-between">
              {/* Step 1 */}
              <div
                className={`flex items-center gap-2 cursor-pointer transition ${
                  currentStep === 1
                    ? "text-bracket-border font-bold"
                    : currentStep > 1
                    ? "text-emerald-600 font-semibold"
                    : "text-gray-400"
                }`}
                onClick={() => {
                  if (currentStep > 1) setCurrentStep(1);
                }}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition shadow-xs ${
                    currentStep === 1
                      ? "bg-bracket-border text-white ring-2 ring-bracket-border/30"
                      : currentStep > 1
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > 1 ? "✓" : "1"}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-[11px] uppercase tracking-wider font-mono">Tahap 1</p>
                  <p className="text-xs font-bold leading-tight">Data &amp; Pendidikan</p>
                </div>
              </div>

              {/* Line 1-2 */}
              <div
                className={`flex-1 h-0.5 mx-2.5 sm:mx-4 transition ${
                  currentStep >= 2 ? "bg-emerald-600" : "bg-gray-200"
                }`}
              />

              {/* Step 2 */}
              <div
                className={`flex items-center gap-2 cursor-pointer transition ${
                  currentStep === 2
                    ? "text-bracket-border font-bold"
                    : currentStep > 2
                    ? "text-emerald-600 font-semibold"
                    : "text-gray-400"
                }`}
                onClick={() => {
                  if (currentStep > 2) setCurrentStep(2);
                }}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition shadow-xs ${
                    currentStep === 2
                      ? "bg-bracket-border text-white ring-2 ring-bracket-border/30"
                      : currentStep > 2
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > 2 ? "✓" : "2"}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-[11px] uppercase tracking-wider font-mono">Tahap 2</p>
                  <p className="text-xs font-bold leading-tight">Pengalaman Kerja</p>
                </div>
              </div>

              {/* Line 2-3 */}
              <div
                className={`flex-1 h-0.5 mx-2.5 sm:mx-4 transition ${
                  currentStep >= 3 ? "bg-emerald-600" : "bg-gray-200"
                }`}
              />

              {/* Step 3 */}
              <div
                className={`flex items-center gap-2 transition ${
                  currentStep === 3 ? "text-bracket-border font-bold" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition shadow-xs ${
                    currentStep === 3
                      ? "bg-bracket-border text-white ring-2 ring-bracket-border/30"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  3
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-[11px] uppercase tracking-wider font-mono">Tahap 3</p>
                  <p className="text-xs font-bold leading-tight">Profil &amp; Berkas</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 font-sans">
          {/* SUCCESS SCREEN */}
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                <span className="material-symbols-outlined text-3xl">check_circle</span>
              </div>
              <h4 className="font-heading font-bold text-2xl text-gray-900">
                Lamaran Berhasil Terkirim!
              </h4>
              <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                Terima kasih, <strong className="text-gray-900">{formData.name}</strong>. Berkas lamaran Anda untuk posisi <strong className="text-gray-900">{job.title}</strong> telah tersimpan di sistem seleksi rekrutmen CV Pelangi UV.
              </p>

              {/* Fast-Track WhatsApp CTA */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 max-w-md mx-auto text-left space-y-2.5 mt-4">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase font-mono">
                  <span className="material-symbols-outlined text-sm">bolt</span>
                  <span>Jalur Cepat (Fast-Track HRD)</span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  Ingin respon lebih cepat? Anda dapat langsung mengirimkan ringkasan data lamaran ke WhatsApp Tim HRD CV Pelangi UV:
                </p>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-action-whatsapp hover:bg-action-whatsapp-hover text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  <span>Kirim Ringkasan Lamaran ke WhatsApp HRD</span>
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
            <div>
              {errorMsg && (
                <div className="p-3.5 mb-5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-fade-in">
                  <span className="material-symbols-outlined text-base">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* ======================================================== */}
              {/* PAGE 1: IDENTITAS & PENDIDIKAN */}
              {/* ======================================================== */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="pb-2 border-b border-gray-100">
                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 font-mono">
                      <span className="material-symbols-outlined text-bracket-border text-lg">badge</span>
                      Langkah 1 dari 3: Data Pribadi &amp; Pendidikan
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Lengkapi data identitas diri dan latar belakang pendidikan terakhir Anda.
                    </p>
                  </div>

                  {/* Nama Lengkap & Usia */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
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

                    <div className="sm:col-span-4">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Usia / Umur <span className="text-bracket-border">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min={17}
                          max={65}
                          required
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                          placeholder="Contoh: 21"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border focus:ring-1 focus:ring-bracket-border text-sm text-gray-900 outline-none transition pr-14"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-mono">
                          Tahun
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Kontak WhatsApp & Email */}
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
                      <span className="text-[10px] text-gray-400 mt-1 block">
                        Pastikan nomor aktif untuk pemanggilan interview.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Alamat Email (Opsional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nama@email.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border focus:ring-1 focus:ring-bracket-border text-sm text-gray-900 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Domisili */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Alamat Domisili Saat Ini <span className="text-bracket-border">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Contoh: Jl. Brigjend Katamso, Waru, Sidoarjo / Surabaya"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border focus:ring-1 focus:ring-bracket-border text-sm text-gray-900 outline-none transition"
                    />
                  </div>

                  {/* PENDIDIKAN & JURUSAN (KONDISIONAL) */}
                  <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200/80 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Jenjang Pendidikan Terakhir <span className="text-bracket-border">*</span>
                        </label>
                        <select
                          value={formData.education}
                          onChange={(e) =>
                            setFormData({ ...formData, education: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border focus:ring-1 focus:ring-bracket-border text-sm text-gray-900 outline-none transition font-medium"
                        >
                          <option value="SMK">SMK (Sekolah Menengah Kejuruan)</option>
                          <option value="SMA">SMA / MA</option>
                          <option value="Diploma (D3/D4)">Diploma (D3 / D4)</option>
                          <option value="Sarjana (S1)">Sarjana (S1)</option>
                          <option value="SMP / Sederajat">SMP / Sederajat</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                      </div>

                      {/* Field Jurusan (Muncul jika SMK/SMA/Diploma/Sarjana) */}
                      {showMajorField ? (
                        <div className="animate-fade-in">
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Jurusan / Program Studi <span className="text-bracket-border">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.educationMajor}
                            onChange={(e) =>
                              setFormData({ ...formData, educationMajor: e.target.value })
                            }
                            placeholder={
                              formData.education === "SMK"
                                ? "Contoh: Grafika, Teknik Mesin, DKV, Akuntansi"
                                : formData.education === "SMA"
                                ? "Contoh: IPA / IPS"
                                : "Contoh: Desain Grafis, Teknik Industri, Manajemen"
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border focus:ring-1 focus:ring-bracket-border text-sm text-gray-900 outline-none transition"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center text-xs text-gray-500 pt-6">
                          <span>Informasi jenjang telah disesuaikan.</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tombol Navigasi Page 1 */}
                  <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep1}
                      className="px-6 py-2.5 rounded-xl bg-bracket-border hover:bg-bracket-border/90 text-xs font-bold text-white transition shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
                    >
                      <span>Lanjut ke Pengalaman Kerja</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* PAGE 2: PENGALAMAN KERJA & REFERENSI */}
              {/* ======================================================== */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="pb-2 border-b border-gray-100">
                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 font-mono">
                      <span className="material-symbols-outlined text-blue-600 text-lg">work_history</span>
                      Langkah 2 dari 3: Pengalaman Kerja &amp; Referensi
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Apakah Anda pernah bekerja sebelumnya atau fresh graduate?
                    </p>
                  </div>

                  {/* PILIHAN: SUDAH KERJA ATAU FRESH GRADUATE (YA / TIDAK) */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-2 font-mono uppercase tracking-wider">
                      Apakah Anda sudah memiliki pengalaman kerja sebelumnya? <span className="text-bracket-border">*</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Opsi 1: Ya, Pernah Bekerja */}
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, hasExperience: "yes" })}
                        className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition cursor-pointer ${
                          formData.hasExperience === "yes"
                            ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full mt-0.5 flex items-center justify-center border transition ${
                            formData.hasExperience === "yes"
                              ? "border-blue-600 bg-blue-600 text-white"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {formData.hasExperience === "yes" && (
                            <span className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900">
                            Ya, Sudah Pernah Bekerja
                          </p>
                          <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                            Memiliki riwayat pekerjaan di percetakan, pabrik, atau bidang lainnya.
                          </p>
                        </div>
                      </button>

                      {/* Opsi 2: Belum Pernah / Fresh Graduate */}
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, hasExperience: "no" })}
                        className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition cursor-pointer ${
                          formData.hasExperience === "no"
                            ? "border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full mt-0.5 flex items-center justify-center border transition ${
                            formData.hasExperience === "no"
                              ? "border-emerald-600 bg-emerald-600 text-white"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {formData.hasExperience === "no" && (
                            <span className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900">
                            Belum Pernah / Fresh Graduate
                          </p>
                          <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                            Lulusan baru yang belum pernah bekerja, siap belajar dan mengikuti training.
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* KONDISI 1: JIKA PERNAH BEKERJA (YA) -> MUNCULKAN FORM PENGALAMAN & REFERENSI KERJA */}
                  {formData.hasExperience === "yes" ? (
                    <div className="space-y-3.5 p-4 rounded-2xl bg-blue-50/40 border border-blue-200/80 animate-fade-in">
                      <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs uppercase font-mono">
                        <span className="material-symbols-outlined text-sm">business_center</span>
                        <span>Detail Riwayat Pekerjaan Terakhir</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Nama Perusahaan / Tempat Kerja
                          </label>
                          <input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) =>
                              setFormData({ ...formData, companyName: e.target.value })
                            }
                            placeholder="Contoh: PT Percetakan Jaya Makmur"
                            className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-blue-500 text-xs text-gray-900 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Posisi / Jabatan
                          </label>
                          <input
                            type="text"
                            value={formData.jobRole}
                            onChange={(e) =>
                              setFormData({ ...formData, jobRole: e.target.value })
                            }
                            placeholder="Contoh: Operator Mesin Pond / Helper Finshing"
                            className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-blue-500 text-xs text-gray-900 outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Lama Bekerja / Periode
                        </label>
                        <input
                          type="text"
                          value={formData.workDuration}
                          onChange={(e) =>
                            setFormData({ ...formData, workDuration: e.target.value })
                          }
                          placeholder="Contoh: 1,5 Tahun (2022 - 2024)"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-blue-500 text-xs text-gray-900 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Ringkasan Tugas &amp; Pengalaman <span className="text-bracket-border">*</span>
                        </label>
                        <textarea
                          rows={3}
                          value={formData.experience}
                          onChange={(e) =>
                            setFormData({ ...formData, experience: e.target.value })
                          }
                          placeholder="Jelaskan jenis mesin atau pekerjaan yang Anda tangani, contoh: Mengoperasikan mesin pond otomatis, setting pisau, sortir kualitas lembar cetak foil, dsb."
                          className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-blue-500 text-xs text-gray-900 outline-none leading-relaxed"
                        />
                      </div>

                      {/* KONTAK REFERENSI ATASAN KERJA */}
                      <div className="pt-2 border-t border-blue-200/60 space-y-2">
                        <label className="block text-xs font-bold text-blue-950 font-mono">
                          Kontak Referensi Kerja (Atasan / HRD Tempat Lama)
                        </label>
                        <p className="text-[11px] text-gray-500">
                          Orang yang dapat mengonfirmasi kinerja Anda di tempat kerja sebelumnya (opsional namun diprioritaskan).
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <input
                              type="text"
                              value={formData.referenceName}
                              onChange={(e) =>
                                setFormData({ ...formData, referenceName: e.target.value })
                              }
                              placeholder="Nama Atasan / Supervisor (misal: Bpk. Bambang)"
                              className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-blue-500 text-xs text-gray-900 outline-none"
                            />
                          </div>
                          <div>
                            <input
                              type="tel"
                              value={formData.referencePhone}
                              onChange={(e) =>
                                setFormData({ ...formData, referencePhone: e.target.value })
                              }
                              placeholder="Nomor HP / WA Atasan (08xx)"
                              className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-blue-500 text-xs text-gray-900 outline-none font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* KONDISI 2: FRESH GRADUATE (TIDAK ADA PENGALAMAN) -> TIDAK MUNCUL FORM PENGALAMAN */
                    <div className="space-y-3.5 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 animate-fade-in">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase font-mono">
                        <span className="material-symbols-outlined text-base">school</span>
                        <span>Fresh Graduate / Siap Mengikuti Training</span>
                      </div>
                      <p className="text-xs text-emerald-950 leading-relaxed">
                        CV Pelangi UV membuka kesempatan bagi lulusan baru yang berkeinginan kuat untuk berkembang di bidang finishing percetakan presisi (UV coating, laminasi doff/glossy, hot stamping foil, pond).
                      </p>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Pengalaman Magang (PKL) / Proyek Sekolah (Bila ada)
                        </label>
                        <textarea
                          rows={2}
                          value={formData.internshipExperience}
                          onChange={(e) =>
                            setFormData({ ...formData, internshipExperience: e.target.value })
                          }
                          placeholder="Contoh: Pernah PKL di percetakan XYZ selama 3 bulan, atau memiliki ketertarikan tinggi pada mesin industri..."
                          className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-emerald-500 text-xs text-gray-900 outline-none leading-relaxed"
                        />
                      </div>

                      {/* KONTAK DARURAT / KELUARGA */}
                      <div className="pt-2 border-t border-emerald-200/60 space-y-2">
                        <label className="block text-xs font-bold text-emerald-950 font-mono">
                          Kontak Darurat / Kerabat (Keluarga)
                        </label>
                        <p className="text-[11px] text-gray-500">
                          Nomor kontak orang tua atau keluarga yang dapat dihubungi dalam keadaan penting.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <input
                              type="text"
                              value={formData.referenceName}
                              onChange={(e) =>
                                setFormData({ ...formData, referenceName: e.target.value })
                              }
                              placeholder="Nama Kerabat (misal: Ibu Sri / Orang Tua)"
                              className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-emerald-500 text-xs text-gray-900 outline-none"
                            />
                          </div>
                          <div>
                            <input
                              type="tel"
                              value={formData.referencePhone}
                              onChange={(e) =>
                                setFormData({ ...formData, referencePhone: e.target.value })
                              }
                              placeholder="Nomor HP Keluarga (08xx)"
                              className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-emerald-500 text-xs text-gray-900 outline-none font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tombol Navigasi Page 2 */}
                  <div className="pt-4 flex items-center justify-between gap-2.5 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">arrow_back</span>
                      <span>Kembali ke Tahap 1</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep2}
                      className="px-6 py-2.5 rounded-xl bg-bracket-border hover:bg-bracket-border/90 text-xs font-bold text-white transition shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
                    >
                      <span>Lanjut ke Profil Diri</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* PAGE 3: PROFIL DIRI (KELEBIHAN & KEKURANGAN) & BERKAS CV */}
              {/* ======================================================== */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="pb-2 border-b border-gray-100">
                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 font-mono">
                      <span className="material-symbols-outlined text-purple-600 text-lg">psychology</span>
                      Langkah 3 dari 3: Profil Diri &amp; Lampiran CV
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Ceritakan karakter kerja Anda secara jujur dan lampirkan berkas CV bila ada.
                    </p>
                  </div>

                  {/* Kelebihan & Kekurangan */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Kelebihan */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-emerald-600 text-sm">thumb_up</span>
                        <span>Kelebihan Utama (Strengths) <span className="text-bracket-border">*</span></span>
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.strengths}
                        onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
                        placeholder="Contoh: Sangat teliti dalam menghitung jumlah lembar cetak, cepat beradaptasi dengan mesin baru, disiplin waktu, bertanggung jawab..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border focus:ring-1 focus:ring-bracket-border text-xs sm:text-sm text-gray-900 outline-none transition leading-relaxed"
                      />
                    </div>

                    {/* Kekurangan */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-amber-600 text-sm">tune</span>
                        <span>Kekurangan Diri &amp; Solusinya <span className="text-bracket-border">*</span></span>
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.weaknesses}
                        onChange={(e) => setFormData({ ...formData, weaknesses: e.target.value })}
                        placeholder="Contoh: Saya terkadang mudah lupa jika instruksi terlalu banyak sekaligus, sehingga saya selalu mencatat dan membuat checklist tugas harian..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border focus:ring-1 focus:ring-bracket-border text-xs sm:text-sm text-gray-900 outline-none transition leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Lampiran Dokumen CV / Drive */}
                  <div className="p-3.5 rounded-2xl bg-gray-50/80 border border-gray-200/80 space-y-3">
                    <label className="block text-xs font-bold text-gray-800 font-mono">
                      Lampiran Dokumen CV / Portofolio (Opsional)
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
                      {/* Upload File */}
                      <div className="border border-dashed border-gray-300 hover:border-bracket-border rounded-xl p-3 text-center bg-white transition cursor-pointer relative">
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
                          <p className="text-xs font-semibold text-gray-800 truncate max-w-[180px]">
                            {selectedFile ? selectedFile.name : "Unggah File CV"}
                          </p>
                          <p className="text-[10px] text-gray-400">PDF atau DOCX (Maks 10MB)</p>
                        </div>
                      </div>

                      {/* Google Drive Link */}
                      <div>
                        <input
                          type="url"
                          value={formData.cvUrl}
                          onChange={(e) => setFormData({ ...formData, cvUrl: e.target.value })}
                          placeholder="Atau link Google Drive / LinkedIn..."
                          className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-bracket-border text-xs text-gray-900 outline-none font-mono"
                        />
                        <span className="text-[10px] text-gray-400 mt-1 block">
                          Pastikan link Drive sudah dibuka akses &quot;Siapa saja memiliki link&quot;.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Ringkasan Singkat */}
                  <div className="p-3 rounded-xl bg-gray-100/70 border border-gray-200 text-[11px] text-gray-600 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-800">
                        {formData.name} ({formData.age} Tahun)
                      </span>
                      <span className="text-bracket-border font-bold">{job.title}</span>
                    </div>
                    <p className="truncate">
                      Pendidikan: {formData.education} {formData.educationMajor ? `(${formData.educationMajor})` : ""} &bull; Domisili: {formData.address}
                    </p>
                    <p>
                      Status: {formData.hasExperience === "yes" ? "Pernah Bekerja" : "Fresh Graduate"}
                    </p>
                  </div>

                  {/* Tombol Navigasi Page 3 & Submit */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">arrow_back</span>
                      <span>Kembali ke Tahap 2</span>
                    </button>

                    <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                      {/* Jalur Cepat WA */}
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm active:scale-95"
                      >
                        <span className="material-symbols-outlined text-sm">chat</span>
                        <span>Fast-Track WA</span>
                      </a>

                      {/* Tombol Submit Utama */}
                      <button
                        type="button"
                        onClick={() => handleSubmitFinal()}
                        disabled={isSubmitting || isUploadingFile}
                        className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-bracket-border hover:bg-bracket-border/90 disabled:opacity-50 text-xs font-bold text-white transition shadow-sm active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="material-symbols-outlined animate-spin text-sm">
                              progress_activity
                            </span>
                            <span>Menyimpan...</span>
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-sm">send</span>
                            <span>Kirim Lamaran</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

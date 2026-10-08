"use client";

import React, { useState } from "react";
import { CareerJob } from "@/data/careers";

interface KarirApplyModalProps {
  job: CareerJob | null;
  onClose: () => void;
}

export default function KarirApplyModal({ job, onClose }: KarirApplyModalProps) {
  // Step State: 1 = Identitas & Pendidikan, 2 = Pengalaman Kerja & Referensi, 3 = Komitmen, Evaluasi Diri & Berkas
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [formData, setFormData] = useState({
    // Step 1: Identitas Pribadi & Pendidikan
    name: "",
    birthPlace: "",
    birthDate: "",
    maritalStatus: "Single" as "Single" | "Menikah",
    phone: "",
    email: "",
    address: "",
    education: "SMK",
    educationMajor: "",

    // Step 2: Pengalaman Kerja & Referensi Kantor Sebelumnya
    hasExperience: "yes" as "yes" | "no",
    // Pengalaman Kerja 1
    exp1Company: "",
    exp1Period: "", // Bulan & Tahun Masuk - Keluar
    exp1Role: "",
    // Pengalaman Kerja 2
    exp2Company: "",
    exp2Period: "",
    exp2Role: "",
    // Pengalaman Kerja 3
    exp3Company: "",
    exp3Period: "",
    exp3Role: "",
    // Catatan Fresh Graduate
    internshipNote: "",

    // Nomor Referensi Kantor Sebelumnya
    reference1: "", // Nama - No Tlp - Jabatan
    reference2: "", // Nama - No Tlp - Jabatan
    emergencyContact: "", // Untuk Fresh Graduate (Nama - No Tlp - Hubungan)

    // Step 3: Komitmen Kerja, Evaluasi Diri & Berkas
    readyNoWorkNoPay: "Ya" as "Ya" | "Tidak",
    readyOvertime: "Ya" as "Ya" | "Tidak",
    expectedSalary: "",
    expectedFacilities: "",

    threeWeaknesses: "",
    threeStrengths: "",
    fiveSkills: "",

    cvUrl: "",
    agreement: true,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!job) return null;

  // Generate pesan WhatsApp HRD terstruktur rapi
  const generateWhatsAppMessage = () => {
    let msg = `Halo HRD CV Pelangi UV,\nSaya ingin mengajukan lamaran kerja untuk posisi:\n*${job.title}* (Divisi ${job.division})\n\n`;

    msg += `📋 *DATA PRIBADI PELAMAR*\n`;
    msg += `• Nama Lengkap: ${formData.name}\n`;
    const ttl = [formData.birthPlace, formData.birthDate].filter(Boolean).join(", ");
    if (ttl) msg += `• Tempat/Tgl Lahir: ${ttl}\n`;
    msg += `• Status Pernikahan: ${formData.maritalStatus === "Menikah" ? "Menikah" : "Single (Belum Menikah)"}\n`;
    msg += `• No. WhatsApp / HP: ${formData.phone}\n`;
    if (formData.email) msg += `• Email: ${formData.email}\n`;
    msg += `• Alamat Domisili: ${formData.address}\n`;
    const eduDisplay = formData.educationMajor
      ? `${formData.education} - ${formData.educationMajor}`
      : formData.education;
    msg += `• Pendidikan & Jurusan: ${eduDisplay}\n\n`;

    msg += `💼 *RIWAYAT PENGALAMAN KERJA*\n`;
    if (formData.hasExperience === "yes") {
      if (formData.exp1Company) {
        msg += `1. ${formData.exp1Company} (${formData.exp1Period || "-"}): ${formData.exp1Role || "-"}\n`;
      }
      if (formData.exp2Company) {
        msg += `2. ${formData.exp2Company} (${formData.exp2Period || "-"}): ${formData.exp2Role || "-"}\n`;
      }
      if (formData.exp3Company) {
        msg += `3. ${formData.exp3Company} (${formData.exp3Period || "-"}): ${formData.exp3Role || "-"}\n`;
      }
      if (!formData.exp1Company && !formData.exp2Company && !formData.exp3Company) {
        msg += `(Pernah bekerja di industri terkait)\n`;
      }

      msg += `\n📞 *NOMOR REFERENSI KANTOR SEBELUMNYA*\n`;
      if (formData.reference1) msg += `• Ref 1: ${formData.reference1}\n`;
      if (formData.reference2) msg += `• Ref 2: ${formData.reference2}\n`;
    } else {
      msg += `• Status: Fresh Graduate / Siap Dilatih Training\n`;
      if (formData.internshipNote) msg += `• Catatan Magang/PKL: ${formData.internshipNote}\n`;
      if (formData.emergencyContact) msg += `• Kontak Darurat/Keluarga: ${formData.emergencyContact}\n`;
    }
    msg += `\n`;

    msg += `⚖️ *KOMITMEN KERJA & EKSPEKTASI*\n`;
    msg += `• Bersedia No Work No Pay: ${formData.readyNoWorkNoPay}\n`;
    msg += `• Bersedia Lembur: ${formData.readyOvertime}\n`;
    if (formData.expectedSalary) msg += `• Gaji yang Diinginkan: ${formData.expectedSalary}\n`;
    if (formData.expectedFacilities) msg += `• Fasilitas yang Diinginkan: ${formData.expectedFacilities}\n`;
    msg += `\n`;

    msg += `⭐ *3 KELEBIHAN DIRI*\n${formData.threeStrengths || "-"}\n\n`;
    msg += `🔍 *3 KEKURANGAN DIRI*\n${formData.threeWeaknesses || "-"}\n\n`;
    msg += `🛠️ *MINIMAL 5 SKILL YANG DIMILIKI*\n${formData.fiveSkills || "-"}\n\n`;

    if (formData.cvUrl) {
      msg += `📎 *BERKAS CV / IJAZAH / KTP / SERTIFIKAT*\n${formData.cvUrl}\n\n`;
    }

    msg += `Demikian profil lengkap saya. Mohon informasi jadwal interview atau tes selanjutnya. Terima kasih!`;
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
      console.warn("Upload fallback error:", err);
    } finally {
      setIsUploadingFile(false);
    }
  };

  // Navigasi Step 1 -> Step 2
  const handleNextStep1 = () => {
    setErrorMsg("");
    if (!formData.name.trim()) {
      setErrorMsg("Nama lengkap wajib diisi.");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg("Nomor WhatsApp / HP wajib diisi.");
      return;
    }
    if (!formData.address.trim()) {
      setErrorMsg("Alamat lengkap domisili wajib diisi.");
      return;
    }
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
      if (!formData.exp1Company.trim() && !formData.exp1Role.trim()) {
        setErrorMsg("Silakan isi minimal Pengalaman Kerja 1 (Perusahaan, periode, dan posisi).");
        return;
      }
      if (!formData.reference1.trim()) {
        setErrorMsg("Silakan cantumkan minimal 1 nomor referensi di kantor sebelumnya (Nama - No Tlp - Jabatan).");
        return;
      }
    }
    setCurrentStep(3);
  };

  // Submit Final
  const handleSubmitFinal = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg("");

    if (!formData.threeStrengths.trim()) {
      setErrorMsg("Silakan sebutkan 3 kelebihan Anda.");
      return;
    }
    if (!formData.threeWeaknesses.trim()) {
      setErrorMsg("Silakan sebutkan 3 kekurangan Anda.");
      return;
    }
    if (!formData.fiveSkills.trim()) {
      setErrorMsg("Silakan sebutkan minimal 5 skill yang Anda miliki.");
      return;
    }

    setIsSubmitting(true);

    const ttl = [formData.birthPlace, formData.birthDate].filter(Boolean).join(", ");

    // Susun ringkasan pengalaman
    let finalExperience = "";
    if (formData.hasExperience === "yes") {
      const parts = [];
      if (formData.exp1Company) {
        parts.push(`[1] ${formData.exp1Company} (${formData.exp1Period || "-"}): ${formData.exp1Role || "-"}`);
      }
      if (formData.exp2Company) {
        parts.push(`[2] ${formData.exp2Company} (${formData.exp2Period || "-"}): ${formData.exp2Role || "-"}`);
      }
      if (formData.exp3Company) {
        parts.push(`[3] ${formData.exp3Company} (${formData.exp3Period || "-"}): ${formData.exp3Role || "-"}`);
      }
      finalExperience = parts.join(" | ");
    } else {
      finalExperience = formData.internshipNote
        ? `Fresh Graduate / Belum Pernah Bekerja. Magang/PKL: ${formData.internshipNote}`
        : "Fresh Graduate / Belum Pernah Bekerja (Siap Mengikuti Pelatihan)";
    }

    const payload = {
      jobId: job.id,
      jobTitle: job.title,
      name: formData.name,
      birthPlaceDate: ttl,
      maritalStatus: formData.maritalStatus,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      education: formData.education,
      educationMajor: formData.educationMajor,
      hasExperience: formData.hasExperience,

      // Pengalaman & Referensi
      experience1: formData.exp1Company
        ? `${formData.exp1Company} (${formData.exp1Period || "-"}) - ${formData.exp1Role || "-"}`
        : "",
      experience2: formData.exp2Company
        ? `${formData.exp2Company} (${formData.exp2Period || "-"}) - ${formData.exp2Role || "-"}`
        : "",
      experience3: formData.exp3Company
        ? `${formData.exp3Company} (${formData.exp3Period || "-"}) - ${formData.exp3Role || "-"}`
        : "",
      experience: finalExperience,

      reference1: formData.reference1,
      reference2: formData.reference2,
      referencePhone: formData.reference1 || formData.emergencyContact,
      referenceRelation: formData.hasExperience === "yes" ? "Atasan Kantor Sebelumnya" : "Keluarga / Kerabat",

      // Komitmen & Gaji
      readyNoWorkNoPay: formData.readyNoWorkNoPay,
      readyOvertime: formData.readyOvertime,
      expectedSalary: formData.expectedSalary,
      expectedFacilities: formData.expectedFacilities,

      // Evaluasi & Skill
      threeWeaknesses: formData.threeWeaknesses,
      threeStrengths: formData.threeStrengths,
      fiveSkills: formData.fiveSkills,
      strengths: formData.threeStrengths,
      weaknesses: formData.threeWeaknesses,

      // Berkas
      cvUrl: formData.cvUrl,
      fileName: selectedFile?.name || "",
    };

    try {
      const res = await fetch("/api/career-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const d = await res.json();
        setErrorMsg(d.error || "Gagal menyimpan berkas lamaran.");
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMsg("Terjadi gangguan jaringan saat mengirim formulir.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const waHref = `https://wa.me/6282231019363?text=${generateWhatsAppMessage()}`;

  const showMajorField = ["SMK", "SMA", "Diploma (D3/D4)", "Sarjana (S1)"].includes(
    formData.education
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-surface-canvas rounded-3xl shadow-2xl border border-surface-container-high overflow-hidden my-4 max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="p-5 sm:p-6 bg-[#121316] text-white flex items-start justify-between border-b border-white/10 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-bracket-border text-white text-[11px] font-bold uppercase tracking-wider mb-1.5 font-mono">
              Divisi {job.division}
            </div>
            <h3 className="font-heading font-extrabold text-lg sm:text-2xl text-white">
              Formulir Rekrutmen Calon Karyawan
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
              Posisi yang Dilamar: <span className="text-white font-bold">{job.title}</span>
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

        {/* 3-STEP PROGRESS BAR WIZARD */}
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
                  <p className="text-[10px] uppercase tracking-wider font-mono">Tahap 1</p>
                  <p className="text-xs font-bold leading-tight">Identitas &amp; Pendidikan</p>
                </div>
              </div>

              {/* Line 1-2 */}
              <div
                className={`flex-1 h-0.5 mx-2 sm:mx-4 transition ${
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
                  <p className="text-[10px] uppercase tracking-wider font-mono">Tahap 2</p>
                  <p className="text-xs font-bold leading-tight">Pengalaman &amp; Referensi</p>
                </div>
              </div>

              {/* Line 2-3 */}
              <div
                className={`flex-1 h-0.5 mx-2 sm:mx-4 transition ${
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
                  <p className="text-[10px] uppercase tracking-wider font-mono">Tahap 3</p>
                  <p className="text-xs font-bold leading-tight">Komitmen, Skill &amp; Berkas</p>
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
                Formulir Lamaran Berhasil Diterima!
              </h4>
              <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                Terima kasih, <strong className="text-gray-900">{formData.name}</strong>. Berkas lamaran Anda untuk posisi <strong className="text-gray-900">{job.title}</strong> telah tersimpan di sistem HRD CV Pelangi UV.
              </p>

              {/* Fast-Track WhatsApp CTA */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 max-w-md mx-auto text-left space-y-2.5 mt-4">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase font-mono">
                  <span className="material-symbols-outlined text-sm">bolt</span>
                  <span>Jalur Cepat (Fast-Track HRD WhatsApp)</span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  Ingin respon lebih cepat? Teruskan ringkasan data lamaran lengkap Anda langsung ke kontak WhatsApp HRD:
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
            <div>
              {errorMsg && (
                <div className="p-3.5 mb-5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-fade-in">
                  <span className="material-symbols-outlined text-base">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* ======================================================== */}
              {/* PAGE 1: IDENTITAS PRIBADI & PENDIDIKAN */}
              {/* ======================================================== */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="pb-2 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 font-mono">
                        <span className="material-symbols-outlined text-bracket-border text-lg">badge</span>
                        Halaman 1: Identitas Pribadi &amp; Pendidikan
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Lengkapi informasi dasar diri, kontak aktif, dan latar belakang pendidikan.
                      </p>
                    </div>
                  </div>

                  {/* Posisi yang Dilamar (Readonly Badge) */}
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-gray-500 uppercase">
                      Posisi yang Dilamar:
                    </span>
                    <span className="text-xs font-bold text-bracket-border bg-red-50 px-3 py-1 rounded-lg border border-red-100">
                      {job.title} ({job.division})
                    </span>
                  </div>

                  {/* Nama Lengkap */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      NAMA LENGKAP <span className="text-bracket-border">*</span>
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

                  {/* Tempat Tanggal Lahir & Status Pernikahan */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                    {/* Tempat Lahir */}
                    <div className="sm:col-span-4">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        TEMPAT LAHIR
                      </label>
                      <input
                        type="text"
                        value={formData.birthPlace}
                        onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                        placeholder="Contoh: Sidoarjo"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border focus:ring-1 focus:ring-bracket-border text-sm text-gray-900 outline-none transition"
                      />
                    </div>

                    {/* Tanggal Lahir */}
                    <div className="sm:col-span-4">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        TANGGAL LAHIR
                      </label>
                      <input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border focus:ring-1 focus:ring-bracket-border text-sm text-gray-900 outline-none transition font-mono"
                      />
                    </div>

                    {/* Status Pernikahan */}
                    <div className="sm:col-span-4">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        STATUS PERNIKAHAN <span className="text-bracket-border">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, maritalStatus: "Single" })}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                            formData.maritalStatus === "Single"
                              ? "bg-bracket-border text-white border-bracket-border shadow-xs"
                              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          Single
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, maritalStatus: "Menikah" })}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                            formData.maritalStatus === "Menikah"
                              ? "bg-bracket-border text-white border-bracket-border shadow-xs"
                              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          Menikah
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Nomor Kontak WhatsApp & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        NOMOR TELEPON / WHATSAPP <span className="text-bracket-border">*</span>
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
                        ALAMAT EMAIL
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

                  {/* Alamat Lengkap */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      ALAMAT LENGKAP (DOMISILI SAAT INI) <span className="text-bracket-border">*</span>
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten (Contoh: Jl. Tropodo II No. 10, Waru, Sidoarjo)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border focus:ring-1 focus:ring-bracket-border text-sm text-gray-900 outline-none transition"
                    />
                  </div>

                  {/* 1. PENDIDIKAN TERAKHIR DAN JURUSAN */}
                  <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200/80 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 font-mono uppercase">
                      <span className="material-symbols-outlined text-sm text-bracket-border">school</span>
                      <span>1. Pendidikan Terakhir dan Jurusan</span>
                    </div>

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

                      {/* Jurusan */}
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
                        <div className="flex items-center text-xs text-gray-400 pt-6">
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
              {/* PAGE 2: PENGALAMAN KERJA 1, 2, 3 & NOMOR REFERENSI */}
              {/* ======================================================== */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="pb-2 border-b border-gray-100">
                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 font-mono">
                      <span className="material-symbols-outlined text-blue-600 text-lg">work_history</span>
                      Halaman 2: Pengalaman Kerja &amp; Nomor Referensi Kantor Sebelumnya
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Sebutkan riwayat perusahaan sebelumnya serta nomor kontak referensi atasan.
                    </p>
                  </div>

                  {/* Pertanyaan Pilihan: Pernah Kerja vs Fresh Graduate */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-2 font-mono uppercase">
                      Apakah Anda memiliki pengalaman kerja sebelumnya? <span className="text-bracket-border">*</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            Memiliki pengalaman kerja di perusahaan sebelumnya.
                          </p>
                        </div>
                      </button>

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
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            Lulusan baru, belum pernah bekerja secara formal.
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* KONDISIONAL: JIKA PERNAH BEKERJA */}
                  {formData.hasExperience === "yes" ? (
                    <div className="space-y-4 animate-fade-in">
                      {/* 2. PENGALAMAN KERJA 1 */}
                      <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-200/80 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-900 font-mono">
                          <span className="material-symbols-outlined text-sm">business</span>
                          <span>2. Pengalaman Kerja 1 (Wajib Diisi):</span>
                        </div>
                        <p className="text-[11px] text-gray-500">
                          Sebutkan Perusahaan sebelumnya, bulan &amp; tahun masuk dan keluar, serta posisi Anda.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                          <div className="sm:col-span-6">
                            <input
                              type="text"
                              value={formData.exp1Company}
                              onChange={(e) =>
                                setFormData({ ...formData, exp1Company: e.target.value })
                              }
                              placeholder="Nama Perusahaan (misal: PT Percetakan Jaya)"
                              className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-blue-500 text-xs text-gray-900 outline-none"
                            />
                          </div>
                          <div className="sm:col-span-6">
                            <input
                              type="text"
                              value={formData.exp1Period}
                              onChange={(e) =>
                                setFormData({ ...formData, exp1Period: e.target.value })
                              }
                              placeholder="Bulan & Tahun Masuk - Keluar (misal: Jan 2022 - Des 2023)"
                              className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-blue-500 text-xs text-gray-900 outline-none font-mono"
                            />
                          </div>
                          <div className="sm:col-span-12">
                            <input
                              type="text"
                              value={formData.exp1Role}
                              onChange={(e) =>
                                setFormData({ ...formData, exp1Role: e.target.value })
                              }
                              placeholder="Posisi & Uraian Tugas Singkat (misal: Operator Mesin Pond - Setting pisau & sortir)"
                              className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-blue-500 text-xs text-gray-900 outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 3. PENGALAMAN KERJA 2 */}
                      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-800 font-mono">
                          <span className="material-symbols-outlined text-sm">business</span>
                          <span>3. Pengalaman Kerja 2 (Jika Ada):</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                          <div className="sm:col-span-6">
                            <input
                              type="text"
                              value={formData.exp2Company}
                              onChange={(e) =>
                                setFormData({ ...formData, exp2Company: e.target.value })
                              }
                              placeholder="Nama Perusahaan ke-2"
                              className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-blue-500 text-xs text-gray-900 outline-none"
                            />
                          </div>
                          <div className="sm:col-span-6">
                            <input
                              type="text"
                              value={formData.exp2Period}
                              onChange={(e) =>
                                setFormData({ ...formData, exp2Period: e.target.value })
                              }
                              placeholder="Bulan & Tahun Masuk - Keluar"
                              className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-blue-500 text-xs text-gray-900 outline-none font-mono"
                            />
                          </div>
                          <div className="sm:col-span-12">
                            <input
                              type="text"
                              value={formData.exp2Role}
                              onChange={(e) =>
                                setFormData({ ...formData, exp2Role: e.target.value })
                              }
                              placeholder="Posisi & Tugas Singkat"
                              className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-blue-500 text-xs text-gray-900 outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 4. PENGALAMAN KERJA 3 */}
                      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-800 font-mono">
                          <span className="material-symbols-outlined text-sm">business</span>
                          <span>4. Pengalaman Kerja 3 (Jika Ada):</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                          <div className="sm:col-span-6">
                            <input
                              type="text"
                              value={formData.exp3Company}
                              onChange={(e) =>
                                setFormData({ ...formData, exp3Company: e.target.value })
                              }
                              placeholder="Nama Perusahaan ke-3"
                              className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-blue-500 text-xs text-gray-900 outline-none"
                            />
                          </div>
                          <div className="sm:col-span-6">
                            <input
                              type="text"
                              value={formData.exp3Period}
                              onChange={(e) =>
                                setFormData({ ...formData, exp3Period: e.target.value })
                              }
                              placeholder="Bulan & Tahun Masuk - Keluar"
                              className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-blue-500 text-xs text-gray-900 outline-none font-mono"
                            />
                          </div>
                          <div className="sm:col-span-12">
                            <input
                              type="text"
                              value={formData.exp3Role}
                              onChange={(e) =>
                                setFormData({ ...formData, exp3Role: e.target.value })
                              }
                              placeholder="Posisi & Tugas Singkat"
                              className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-blue-500 text-xs text-gray-900 outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* NOMOR REFERENSI DI KANTOR SEBELUMNYA (1 & 2) */}
                      <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950 font-mono">
                          <span className="material-symbols-outlined text-sm text-amber-600">contact_phone</span>
                          <span>NOMOR REFERENSI DI KANTOR SEBELUMNYA (NAMA - NO TLP - JABATAN)</span>
                        </div>
                        <p className="text-[11px] text-gray-600">
                          Sebutkan kontak atasan atau rekan kerja di kantor sebelumnya yang dapat mengonfirmasi kinerja Anda.
                        </p>

                        <div className="space-y-2.5">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                              Referensi Kantor Sebelumnya 1 <span className="text-bracket-border">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.reference1}
                              onChange={(e) =>
                                setFormData({ ...formData, reference1: e.target.value })
                              }
                              placeholder="Contoh: Bpk. Heru - 08123456789 - Spv Produksi PT ABC"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border text-xs text-gray-900 outline-none font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                              Referensi Kantor Sebelumnya 2 (Opsional)
                            </label>
                            <input
                              type="text"
                              value={formData.reference2}
                              onChange={(e) =>
                                setFormData({ ...formData, reference2: e.target.value })
                              }
                              placeholder="Contoh: Ibu Rina - 08198765432 - HRD PT XYZ"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border text-xs text-gray-900 outline-none font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* KONDISIONAL: JIKA FRESH GRADUATE / BELUM PERNAH KERJA */
                    <div className="space-y-4 animate-fade-in">
                      <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2.5">
                        <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase font-mono">
                          <span className="material-symbols-outlined text-sm">school</span>
                          <span>Program Pelatihan &amp; Training Kerja CV Pelangi UV</span>
                        </div>
                        <p className="text-xs text-emerald-950 leading-relaxed">
                          CV Pelangi UV menyambut calon tenaga kerja yang baru lulus. Anda akan mendapatkan bimbingan teknis langsung terkait mesin finishing cetak presisi (Spot UV, Laminasi, Hot Stamping Foil).
                        </p>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Catatan Pengalaman Magang (PKL) / Organisasi Sekolah (Jika Ada):
                          </label>
                          <textarea
                            rows={3}
                            value={formData.internshipNote}
                            onChange={(e) =>
                              setFormData({ ...formData, internshipNote: e.target.value })
                            }
                            placeholder="Contoh: Pernah PKL selama 3 bulan di percetakan, aktif di ekstrakurikuler bengkel / komputer..."
                            className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-emerald-500 text-xs text-gray-900 outline-none leading-relaxed"
                          />
                        </div>
                      </div>

                      {/* Kontak Darurat / Keluarga */}
                      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                        <label className="block text-xs font-bold text-gray-800 font-mono">
                          Kontak Darurat / Keluarga (NAMA - NO TLP - HUBUNGAN)
                        </label>
                        <input
                          type="text"
                          value={formData.emergencyContact}
                          onChange={(e) =>
                            setFormData({ ...formData, emergencyContact: e.target.value })
                          }
                          placeholder="Contoh: Bpk. Sastro (Orang Tua) - 08123456789"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border text-xs text-gray-900 outline-none font-mono"
                        />
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
                      <span>Lanjut ke Komitmen &amp; Skill</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* PAGE 3: KOMITMEN KERJA, EVALUASI DIRI, SKILL & BERKAS */}
              {/* ======================================================== */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="pb-2 border-b border-gray-100">
                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 font-mono">
                      <span className="material-symbols-outlined text-purple-600 text-lg">fact_check</span>
                      Halaman 3: Komitmen Kerja, Evaluasi Diri &amp; Berkas Dokumen
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Jawab pertanyaan komitmen kerja, sebutkan kelebihan, kekurangan, minimal 5 skill, serta berkas Anda.
                    </p>
                  </div>

                  {/* 1-4. PERTANYAAN KOMITMEN KERJA & GAJI */}
                  <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200 space-y-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 font-mono uppercase">
                      <span className="material-symbols-outlined text-sm text-bracket-border">gavel</span>
                      <span>Pertanyaan Komitmen Kerja &amp; Harapan Gaji</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* 1. No Work No Pay */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          1. Apakah anda bersedia bekerja dengan system No Work No Pay ? <span className="text-bracket-border">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, readyNoWorkNoPay: "Ya" })}
                            className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                              formData.readyNoWorkNoPay === "Ya"
                                ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            Ya, Bersedia
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, readyNoWorkNoPay: "Tidak" })}
                            className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                              formData.readyNoWorkNoPay === "Tidak"
                                ? "bg-red-600 text-white border-red-600 shadow-xs"
                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            Tidak Bersedia
                          </button>
                        </div>
                      </div>

                      {/* 2. Bersedia Lembur */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          2. Apakah anda bersedia bekerja lembur ? <span className="text-bracket-border">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, readyOvertime: "Ya" })}
                            className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                              formData.readyOvertime === "Ya"
                                ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            Ya, Bersedia
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, readyOvertime: "Tidak" })}
                            className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                              formData.readyOvertime === "Tidak"
                                ? "bg-red-600 text-white border-red-600 shadow-xs"
                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            Tidak Bersedia
                          </button>
                        </div>
                      </div>

                      {/* 3. Gaji yang Diinginkan */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          3. Berapa Gaji yang anda inginkan ? <span className="text-bracket-border">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.expectedSalary}
                          onChange={(e) =>
                            setFormData({ ...formData, expectedSalary: e.target.value })
                          }
                          placeholder="Contoh: Rp 3.500.000 / UMK / Nego"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border text-xs text-gray-900 outline-none"
                        />
                      </div>

                      {/* 4. Fasilitas yang Diinginkan */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          4. Fasilitas apa saja yang anda inginkan ?
                        </label>
                        <input
                          type="text"
                          value={formData.expectedFacilities}
                          onChange={(e) =>
                            setFormData({ ...formData, expectedFacilities: e.target.value })
                          }
                          placeholder="Contoh: BPJS Kesehatan, Mess Karyawan, Makan Siang"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border text-xs text-gray-900 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* EVALUASI DIRI: 3 KEKURANGAN, 3 KELEBIHAN, MINIMAL 5 SKILL */}
                  <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-200/80 space-y-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-purple-950 font-mono uppercase">
                      <span className="material-symbols-outlined text-sm text-purple-600">psychology</span>
                      <span>Evaluasi Karakter &amp; Kemampuan Diri</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* 1. Tiga Kekurangan */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-amber-600 text-sm">tune</span>
                          <span>1. Sebutkan 3 kekurangan anda <span className="text-bracket-border">*</span></span>
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={formData.threeWeaknesses}
                          onChange={(e) =>
                            setFormData({ ...formData, threeWeaknesses: e.target.value })
                          }
                          placeholder="Contoh:&#10;1. Kurang teliti jika tergesa-gesa (diatasi dengan checklist)&#10;2. Belum fasih mesin baru (diatasi cepat bertanya)&#10;3. Sering cemas di awal tugas..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border text-xs text-gray-900 outline-none leading-relaxed"
                        />
                      </div>

                      {/* 2. Tiga Kelebihan */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-emerald-600 text-sm">thumb_up</span>
                          <span>2. Sebutkan 3 kelebihan anda <span className="text-bracket-border">*</span></span>
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={formData.threeStrengths}
                          onChange={(e) =>
                            setFormData({ ...formData, threeStrengths: e.target.value })
                          }
                          placeholder="Contoh:&#10;1. Sangat disiplin waktu dan rajin&#10;2. Cepat beradaptasi dan belajar mesin industri&#10;3. Kuat bekerja tim dan bertanggung jawab..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border text-xs text-gray-900 outline-none leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* 3. Minimal 5 Skill */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-blue-600 text-sm">star</span>
                        <span>3. Sebutkan skill yang anda miliki minimal 5 <span className="text-bracket-border">*</span></span>
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.fiveSkills}
                        onChange={(e) =>
                          setFormData({ ...formData, fiveSkills: e.target.value })
                        }
                        placeholder="Contoh:&#10;1. Mengoperasikan mesin percetakan/pond&#10;2. Ketelitian sortir cacat cetak & foil&#10;3. Komunikasi & koordinasi tim&#10;4. Manajemen waktu kerja&#10;5. Perawatan dasar & pelumasan mesin"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-bracket-border text-xs text-gray-900 outline-none leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* 6. UPLOAD CV, IJAZAH, KTP, SERTIFIKAT LAINNYA */}
                  <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 font-mono uppercase">
                      <span className="material-symbols-outlined text-sm text-bracket-border">folder_zip</span>
                      <span>6. Upload CV, Ijazah, KTP, Sertifikat lainnya</span>
                    </div>
                    <p className="text-[11px] text-gray-500">
                      Anda dapat mengunggah file gabungan (PDF / ZIP) atau mencantumkan link folder Google Drive publik.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
                      {/* Upload File */}
                      <div className="border border-dashed border-gray-300 hover:border-bracket-border rounded-xl p-3 text-center bg-white transition cursor-pointer relative">
                        <input
                          type="file"
                          accept=".pdf,.zip,.rar,.docx,.doc,image/*"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleFileUpload(f);
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <div className="flex flex-col items-center justify-center gap-1">
                          <span className="material-symbols-outlined text-bracket-border text-2xl">
                            cloud_upload
                          </span>
                          <p className="text-xs font-semibold text-gray-800 truncate max-w-[200px]">
                            {selectedFile ? selectedFile.name : "Pilih File Dokumen (PDF / ZIP)"}
                          </p>
                          <p className="text-[10px] text-gray-400">CV, KTP, Ijazah, Sertifikat (Maks 15MB)</p>
                        </div>
                      </div>

                      {/* Google Drive Link */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Atau Tautan Google Drive Dokumen:
                        </label>
                        <input
                          type="url"
                          value={formData.cvUrl}
                          onChange={(e) => setFormData({ ...formData, cvUrl: e.target.value })}
                          placeholder="https://drive.google.com/drive/folders/..."
                          className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-bracket-border text-xs text-gray-900 outline-none font-mono"
                        />
                        <span className="text-[10px] text-gray-400 mt-1 block">
                          Pastikan link Google Drive diatur ke &quot;Siapa saja memiliki link&quot;.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tombol Navigasi Page 3 & Submit Final */}
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
                      {/* Jalur Cepat WhatsApp */}
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm active:scale-95"
                      >
                        <span className="material-symbols-outlined text-sm">chat</span>
                        <span>Fast-Track WA HRD</span>
                      </a>

                      {/* Tombol Submit Server */}
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
                            <span>Menyimpan Berkas...</span>
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-sm">send</span>
                            <span>Kirim Lamaran Lengkap</span>
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

"use client";

import React, { useState } from "react";
import { CareerJob } from "@/data/careers";

interface KarirApplyModalProps {
  job: CareerJob | null;
  onClose: () => void;
}

interface WorkExperience {
  id: string;
  company: string;
  period: string;
  role: string;
}

interface WorkReference {
  id: string;
  name: string;
  phone: string;
  position: string;
}

export default function KarirApplyModal({ job, onClose }: KarirApplyModalProps) {
  // Step State: 1 = Data Diri & Pendidikan, 2 = Pengalaman & Referensi, 3 = Komitmen & Berkas
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Identitas & Pendidikan
    name: "",
    birthPlace: "",
    birthDate: "",
    maritalStatus: "Single" as "Single" | "Menikah",
    phone: "",
    email: "",
    address: "",
    education: "SMK",
    educationMajor: "",

    // Step 2: Pengalaman Kerja Dinamis
    hasExperience: "yes" as "yes" | "no",
    hasReference: "no" as "yes" | "no",
    internshipNote: "",
    emergencyContact: "",

    // Step 3: Komitmen & Skill
    readyNoWorkNoPay: "Ya" as "Ya" | "Tidak",
    readyOvertime: "Ya" as "Ya" | "Tidak",
    expectedSalary: "",
    expectedFacilities: "",

    threeWeaknesses: "",
    threeStrengths: "",
    fiveSkills: "",

    cvUrl: "",
  });

  // Pengalaman Kerja Dinamis (Bisa tambah lebih dari 1)
  const [experiences, setExperiences] = useState<WorkExperience[]>([
    { id: "exp-1", company: "", period: "", role: "" },
  ]);

  // Nomor Referensi Dinamis (Hanya jika hasReference === 'yes')
  const [references, setReferences] = useState<WorkReference[]>([
    { id: "ref-1", name: "", phone: "", position: "" },
  ]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!job) return null;

  // Handlers Pengalaman Dinamis
  const handleAddExperience = () => {
    setExperiences((prev) => [
      ...prev,
      { id: `exp-${Date.now()}`, company: "", period: "", role: "" },
    ]);
  };

  const handleRemoveExperience = (id: string) => {
    if (experiences.length === 1) return;
    setExperiences((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateExperience = (
    id: string,
    field: keyof WorkExperience,
    val: string
  ) => {
    setExperiences((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    );
  };

  // Handlers Referensi Dinamis
  const handleAddReference = () => {
    setReferences((prev) => [
      ...prev,
      { id: `ref-${Date.now()}`, name: "", phone: "", position: "" },
    ]);
  };

  const handleRemoveReference = (id: string) => {
    if (references.length === 1) return;
    setReferences((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateReference = (
    id: string,
    field: keyof WorkReference,
    val: string
  ) => {
    setReferences((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    );
  };

  // Upload Berkas
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

  // Format Pesan WhatsApp HRD
  const generateWhatsAppMessage = () => {
    let msg = `Halo HRD CV Pelangi UV,\nSaya mengajukan lamaran pekerjaan untuk posisi:\n*${job.title}* (${job.division})\n\n`;

    msg += `📋 *DATA PELAMAR*\n`;
    msg += `• Nama: ${formData.name}\n`;
    const ttl = [formData.birthPlace, formData.birthDate].filter(Boolean).join(", ");
    if (ttl) msg += `• TTL: ${ttl}\n`;
    msg += `• Status: ${formData.maritalStatus === "Menikah" ? "Menikah" : "Single"}\n`;
    msg += `• WhatsApp/HP: ${formData.phone}\n`;
    if (formData.email) msg += `• Email: ${formData.email}\n`;
    msg += `• Alamat: ${formData.address}\n`;
    const edu = formData.educationMajor
      ? `${formData.education} (${formData.educationMajor})`
      : formData.education;
    msg += `• Pendidikan: ${edu}\n\n`;

    msg += `💼 *PENGALAMAN KERJA*\n`;
    if (formData.hasExperience === "yes") {
      experiences.forEach((exp, idx) => {
        if (exp.company || exp.role) {
          msg += `${idx + 1}. ${exp.company || "-"} [${exp.period || "-"}] - ${exp.role || "-"}\n`;
        }
      });

      if (formData.hasReference === "yes") {
        msg += `\n📞 *REFERENSI KERJA*\n`;
        references.forEach((ref, idx) => {
          if (ref.name || ref.phone) {
            msg += `• Ref ${idx + 1}: ${ref.name || "-"} (${ref.phone || "-"}) - ${ref.position || "-"}\n`;
          }
        });
      }
    } else {
      msg += `• Fresh Graduate / Siap Mengikuti Pelatihan\n`;
      if (formData.internshipNote) msg += `• Magang/PKL: ${formData.internshipNote}\n`;
      if (formData.emergencyContact) msg += `• Kontak Darurat: ${formData.emergencyContact}\n`;
    }
    msg += `\n`;

    msg += `⚖️ *KOMITMEN KERJA*\n`;
    msg += `• No Work No Pay: ${formData.readyNoWorkNoPay}\n`;
    msg += `• Bersedia Lembur: ${formData.readyOvertime}\n`;
    if (formData.expectedSalary) msg += `• Gaji: ${formData.expectedSalary}\n`;
    if (formData.expectedFacilities) msg += `• Fasilitas: ${formData.expectedFacilities}\n`;
    msg += `\n`;

    if (formData.threeStrengths) msg += `⭐ *3 Kelebihan:*\n${formData.threeStrengths}\n\n`;
    if (formData.threeWeaknesses) msg += `🔍 *3 Kekurangan:*\n${formData.threeWeaknesses}\n\n`;
    if (formData.fiveSkills) msg += `🛠️ *5 Skill:*\n${formData.fiveSkills}\n\n`;

    if (formData.cvUrl) {
      msg += `📎 *Link Berkas:* ${formData.cvUrl}\n\n`;
    }

    return encodeURIComponent(msg);
  };

  // Navigasi Step 1 -> Step 2
  const handleNextStep1 = () => {
    setErrorMsg("");
    if (!formData.name.trim()) {
      setErrorMsg("Nama lengkap wajib diisi.");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg("Nomor WhatsApp/HP wajib diisi.");
      return;
    }
    if (!formData.address.trim()) {
      setErrorMsg("Alamat lengkap wajib diisi.");
      return;
    }
    if (
      ["SMK", "SMA", "Diploma (D3/D4)", "Sarjana (S1)"].includes(formData.education) &&
      !formData.educationMajor.trim()
    ) {
      setErrorMsg("Silakan cantumkan jurusan pendidikan Anda.");
      return;
    }
    setCurrentStep(2);
  };

  // Navigasi Step 2 -> Step 3
  const handleNextStep2 = () => {
    setErrorMsg("");
    if (formData.hasExperience === "yes") {
      const first = experiences[0];
      if (!first.company.trim() && !first.role.trim()) {
        setErrorMsg("Silakan isi nama perusahaan dan posisi pengalaman kerja Anda.");
        return;
      }
    }
    setCurrentStep(3);
  };

  // Submit Final
  const handleSubmitFinal = async () => {
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
      finalExperience = experiences
        .filter((e) => e.company || e.role)
        .map(
          (e, i) =>
            `[${i + 1}] ${e.company || "-"} (${e.period || "-"}): ${e.role || "-"}`
        )
        .join(" | ");
    } else {
      finalExperience = formData.internshipNote
        ? `Fresh Graduate. Catatan: ${formData.internshipNote}`
        : "Fresh Graduate / Siap Dilatih";
    }

    // Susun referensi
    const ref1Str =
      formData.hasReference === "yes" && references[0]
        ? `${references[0].name} - ${references[0].phone} - ${references[0].position}`
        : "";
    const ref2Str =
      formData.hasReference === "yes" && references[1]
        ? `${references[1].name} - ${references[1].phone} - ${references[1].position}`
        : "";

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

      experience1: experiences[0] ? `${experiences[0].company} - ${experiences[0].role}` : "",
      experience2: experiences[1] ? `${experiences[1].company} - ${experiences[1].role}` : "",
      experience3: experiences[2] ? `${experiences[2].company} - ${experiences[2].role}` : "",
      experience: finalExperience,

      reference1: ref1Str,
      reference2: ref2Str,
      referencePhone: ref1Str || formData.emergencyContact,
      referenceRelation: formData.hasExperience === "yes" ? "Atasan Kantor Sebelumnya" : "Keluarga",

      readyNoWorkNoPay: formData.readyNoWorkNoPay,
      readyOvertime: formData.readyOvertime,
      expectedSalary: formData.expectedSalary,
      expectedFacilities: formData.expectedFacilities,

      threeWeaknesses: formData.threeWeaknesses,
      threeStrengths: formData.threeStrengths,
      fiveSkills: formData.fiveSkills,
      strengths: formData.threeStrengths,
      weaknesses: formData.threeWeaknesses,

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
        setErrorMsg(d.error || "Gagal mengirim data.");
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
  const showMajorField = ["SMK", "SMA", "Diploma (D3/D4)", "Sarjana (S1)"].includes(
    formData.education
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-2 sm:p-4 md:p-6 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl lg:max-w-5xl bg-surface-canvas rounded-3xl shadow-2xl border border-surface-container-high overflow-hidden my-auto max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal - Bersih & Elegan */}
        <div className="px-6 py-5 sm:px-8 sm:py-6 bg-[#121316] text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-bracket-border text-white text-[11px] font-bold font-mono uppercase">
                {job.division}
              </span>
              <span className="text-gray-400 text-xs">Formulir Rekrutmen</span>
            </div>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
              {job.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-bracket-border text-white flex items-center justify-center transition text-xl cursor-pointer"
            title="Tutup"
          >
            &times;
          </button>
        </div>

        {/* Wizard Steps Header */}
        {!isSuccess && (
          <div className="px-6 sm:px-8 py-3.5 bg-gray-50/90 border-b border-gray-200 shrink-0">
            <div className="flex items-center justify-between max-w-xl mx-auto">
              {/* Step 1 */}
              <div
                className={`flex items-center gap-2.5 cursor-pointer ${
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
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition ${
                    currentStep === 1
                      ? "bg-bracket-border text-white shadow-xs"
                      : currentStep > 1
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > 1 ? "✓" : "1"}
                </div>
                <span className="text-xs sm:text-sm font-semibold">1. Data Diri &amp; Pendidikan</span>
              </div>

              <div
                className={`flex-1 h-0.5 mx-3 sm:mx-6 transition ${
                  currentStep >= 2 ? "bg-emerald-600" : "bg-gray-200"
                }`}
              />

              {/* Step 2 */}
              <div
                className={`flex items-center gap-2.5 cursor-pointer ${
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
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition ${
                    currentStep === 2
                      ? "bg-bracket-border text-white shadow-xs"
                      : currentStep > 2
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > 2 ? "✓" : "2"}
                </div>
                <span className="text-xs sm:text-sm font-semibold">2. Pengalaman Kerja</span>
              </div>

              <div
                className={`flex-1 h-0.5 mx-3 sm:mx-6 transition ${
                  currentStep >= 3 ? "bg-emerald-600" : "bg-gray-200"
                }`}
              />

              {/* Step 3 */}
              <div
                className={`flex items-center gap-2.5 ${
                  currentStep === 3 ? "text-bracket-border font-bold" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition ${
                    currentStep === 3
                      ? "bg-bracket-border text-white shadow-xs"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  3
                </div>
                <span className="text-xs sm:text-sm font-semibold">3. Komitmen &amp; Skill</span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Form Body - Lapang & Nyaman */}
        <div className="p-6 sm:p-8 md:p-10 overflow-y-auto flex-1 font-sans">
          {isSuccess ? (
            <div className="text-center py-8 max-w-lg mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                <span className="material-symbols-outlined text-3xl">check_circle</span>
              </div>
              <h4 className="font-heading font-bold text-2xl text-gray-900">
                Lamaran Berhasil Terkirim!
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Data lamaran Anda untuk posisi <strong className="text-gray-900">{job.title}</strong> telah tersimpan di sistem CV Pelangi UV.
              </p>

              {/* Fast Track WA */}
              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-left space-y-2.5 mt-4">
                <p className="text-xs font-bold text-emerald-900 font-mono uppercase">
                  Fast-Track WhatsApp HRD
                </p>
                <p className="text-xs text-emerald-950">
                  Kirimkan langsung ringkasan data lamaran Anda ke WhatsApp HRD:
                </p>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-1 py-3 px-4 rounded-xl bg-action-whatsapp hover:bg-action-whatsapp-hover text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  <span>Kirim Data ke WhatsApp HRD</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-100 transition cursor-pointer"
                >
                  Tutup Form
                </button>
              </div>
            </div>
          ) : (
            <div>
              {errorMsg && (
                <div className="p-3.5 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2 animate-fade-in">
                  <span className="material-symbols-outlined text-base">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* ======================================================== */}
              {/* HALAMAN 1: IDENTITAS PRIBADI & PENDIDIKAN */}
              {/* ======================================================== */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  {/* Grid Baris 1: Nama Lengkap & Status Pernikahan */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-8">
                      <label className="block text-xs font-bold text-gray-800 mb-1.5 uppercase font-mono">
                        Nama Lengkap <span className="text-bracket-border">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Masukkan nama lengkap sesuai KTP"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-bracket-border focus:ring-1 focus:ring-bracket-border text-sm text-gray-900 outline-none transition"
                      />
                    </div>

                    <div className="md:col-span-4">
                      <label className="block text-xs font-bold text-gray-800 mb-1.5 uppercase font-mono">
                        Status Pernikahan <span className="text-bracket-border">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2 h-[46px]">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, maritalStatus: "Single" })}
                          className={`rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
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
                          className={`rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
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

                  {/* Grid Baris 2: Tempat & Tanggal Lahir */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1.5 uppercase font-mono">
                        Tempat Lahir
                      </label>
                      <input
                        type="text"
                        value={formData.birthPlace}
                        onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                        placeholder="Contoh: Sidoarjo"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-bracket-border text-sm text-gray-900 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1.5 uppercase font-mono">
                        Tanggal Lahir
                      </label>
                      <input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-bracket-border text-sm text-gray-900 outline-none font-mono"
                      />
                    </div>
                  </div>

                  {/* Grid Baris 3: WhatsApp & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1.5 uppercase font-mono">
                        Nomor WhatsApp / HP Aktif <span className="text-bracket-border">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Contoh: 081234567890"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-bracket-border text-sm text-gray-900 outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1.5 uppercase font-mono">
                        Email (Opsional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nama@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-bracket-border text-sm text-gray-900 outline-none"
                      />
                    </div>
                  </div>

                  {/* Grid Baris 4: Alamat Domisili */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1.5 uppercase font-mono">
                      Alamat Lengkap (Domisili Saat Ini) <span className="text-bracket-border">*</span>
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Jalan, No Rumah, Kelurahan, Kecamatan, Kota/Kabupaten"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-bracket-border text-sm text-gray-900 outline-none"
                    />
                  </div>

                  {/* Grid Baris 5: Pendidikan Terakhir & Jurusan */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1.5 uppercase font-mono">
                          Pendidikan Terakhir <span className="text-bracket-border">*</span>
                        </label>
                        <select
                          value={formData.education}
                          onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-bracket-border text-sm text-gray-900 outline-none font-medium"
                        >
                          <option value="SMK">SMK</option>
                          <option value="SMA">SMA / MA</option>
                          <option value="Diploma (D3/D4)">Diploma (D3 / D4)</option>
                          <option value="Sarjana (S1)">Sarjana (S1)</option>
                          <option value="SMP / Sederajat">SMP / Sederajat</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                      </div>

                      {showMajorField ? (
                        <div>
                          <label className="block text-xs font-bold text-gray-800 mb-1.5 uppercase font-mono">
                            Jurusan / Program Studi <span className="text-bracket-border">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.educationMajor}
                            onChange={(e) =>
                              setFormData({ ...formData, educationMajor: e.target.value })
                            }
                            placeholder="Contoh: Grafika, Teknik Mesin, DKV, Akuntansi"
                            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-bracket-border text-sm text-gray-900 outline-none"
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Navigasi Step 1 */}
                  <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep1}
                      className="px-7 py-3 rounded-xl bg-bracket-border hover:bg-bracket-border/90 text-xs font-bold text-white transition shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
                    >
                      <span>Lanjut ke Pengalaman</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* HALAMAN 2: PENGALAMAN KERJA DINAMIS & REFERENSI */}
              {/* ======================================================== */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  {/* Pertanyaan Status Kerja */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-2 font-mono uppercase">
                      Apakah Anda Memiliki Pengalaman Kerja Sebelumnya? <span className="text-bracket-border">*</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, hasExperience: "yes" })}
                        className={`p-4 rounded-2xl border text-left transition cursor-pointer flex items-center gap-3 ${
                          formData.hasExperience === "yes"
                            ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20 text-blue-950 font-bold"
                            : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center border transition ${
                            formData.hasExperience === "yes"
                              ? "border-blue-600 bg-blue-600 text-white"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {formData.hasExperience === "yes" && <span className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className="text-sm">Ya, Pernah Bekerja</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, hasExperience: "no" })}
                        className={`p-4 rounded-2xl border text-left transition cursor-pointer flex items-center gap-3 ${
                          formData.hasExperience === "no"
                            ? "border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20 text-emerald-950 font-bold"
                            : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center border transition ${
                            formData.hasExperience === "no"
                              ? "border-emerald-600 bg-emerald-600 text-white"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {formData.hasExperience === "no" && <span className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className="text-sm">Fresh Graduate / Belum Pernah Bekerja</span>
                      </button>
                    </div>
                  </div>

                  {/* KONDISIONAL JIKA PERNAH BEKERJA: DAFTAR PENGALAMAN DINAMIS */}
                  {formData.hasExperience === "yes" ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-800 font-mono uppercase">
                          Daftar Riwayat Pekerjaan ({experiences.length})
                        </span>
                        <button
                          type="button"
                          onClick={handleAddExperience}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold transition cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">add</span>
                          <span>+ Tambah Pengalaman Kerja</span>
                        </button>
                      </div>

                      {experiences.map((exp, idx) => (
                        <div
                          key={exp.id}
                          className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 space-y-3 relative shadow-xs"
                        >
                          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                            <span className="text-xs font-bold text-blue-900 font-mono">
                              Pengalaman Kerja #{idx + 1}
                            </span>
                            {experiences.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveExperience(exp.id)}
                                className="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1 cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-sm">delete</span>
                                <span>Hapus</span>
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                            <div className="sm:col-span-6">
                              <label className="block text-[11px] font-bold text-gray-600 mb-1">
                                Nama Perusahaan
                              </label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) =>
                                  handleUpdateExperience(exp.id, "company", e.target.value)
                                }
                                placeholder="Contoh: PT Percetakan Maju"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 text-xs text-gray-900 outline-none"
                              />
                            </div>

                            <div className="sm:col-span-6">
                              <label className="block text-[11px] font-bold text-gray-600 mb-1">
                                Bulan &amp; Tahun Masuk - Keluar
                              </label>
                              <input
                                type="text"
                                value={exp.period}
                                onChange={(e) =>
                                  handleUpdateExperience(exp.id, "period", e.target.value)
                                }
                                placeholder="Contoh: Jan 2022 - Des 2023"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 text-xs text-gray-900 outline-none font-mono"
                              />
                            </div>

                            <div className="sm:col-span-12">
                              <label className="block text-[11px] font-bold text-gray-600 mb-1">
                                Posisi / Jabatan &amp; Uraian Tugas
                              </label>
                              <input
                                type="text"
                                value={exp.role}
                                onChange={(e) =>
                                  handleUpdateExperience(exp.id, "role", e.target.value)
                                }
                                placeholder="Contoh: Operator Mesin Pond (Setting pisau cetak & kontrol kualitas)"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 text-xs text-gray-900 outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* TOGGLE REFERENSI: ADA ATAU TIDAK ADA (KALAU TIDAK ADA, GAUSAH KELUARIN) */}
                      <div className="pt-3 border-t border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl bg-gray-50 border border-gray-200">
                          <div>
                            <p className="text-xs font-bold text-gray-900 font-mono uppercase">
                              Apakah ada nomor kontak referensi kerja di kantor sebelumnya?
                            </p>
                            <p className="text-[11px] text-gray-500 mt-0.5">
                              (Atasan / Rekan kerja yang dapat dikonfirmasi)
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, hasReference: "yes" })}
                              className={`px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                                formData.hasReference === "yes"
                                  ? "bg-bracket-border text-white border-bracket-border shadow-xs"
                                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                              }`}
                            >
                              Ada
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, hasReference: "no" })}
                              className={`px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                                formData.hasReference === "no"
                                  ? "bg-gray-800 text-white border-gray-800 shadow-xs"
                                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                              }`}
                            >
                              Tidak Ada
                            </button>
                          </div>
                        </div>

                        {/* MUNCULKAN HANYA JIKA ADA REFERENSI */}
                        {formData.hasReference === "yes" && (
                          <div className="mt-3 space-y-3 p-4 rounded-2xl bg-amber-50/50 border border-amber-200 animate-fade-in">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-amber-950 font-mono uppercase">
                                Kontak Referensi Kantor Sebelumnya ({references.length})
                              </span>
                              <button
                                type="button"
                                onClick={handleAddReference}
                                className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 cursor-pointer"
                              >
                                + Tambah Kontak
                              </button>
                            </div>

                            {references.map((ref, idx) => (
                              <div
                                key={ref.id}
                                className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 p-3 rounded-xl bg-white border border-amber-200"
                              >
                                <div className="sm:col-span-4">
                                  <input
                                    type="text"
                                    value={ref.name}
                                    onChange={(e) =>
                                      handleUpdateReference(ref.id, "name", e.target.value)
                                    }
                                    placeholder={`Nama Atasan ${idx + 1}`}
                                    className="w-full px-3 py-2 rounded-lg bg-gray-50 text-xs text-gray-900 border border-gray-200 outline-none"
                                  />
                                </div>
                                <div className="sm:col-span-4">
                                  <input
                                    type="tel"
                                    value={ref.phone}
                                    onChange={(e) =>
                                      handleUpdateReference(ref.id, "phone", e.target.value)
                                    }
                                    placeholder="Nomor Telepon / WA"
                                    className="w-full px-3 py-2 rounded-lg bg-gray-50 text-xs text-gray-900 border border-gray-200 outline-none font-mono"
                                  />
                                </div>
                                <div className="sm:col-span-3">
                                  <input
                                    type="text"
                                    value={ref.position}
                                    onChange={(e) =>
                                      handleUpdateReference(ref.id, "position", e.target.value)
                                    }
                                    placeholder="Jabatan / Perusahaan"
                                    className="w-full px-3 py-2 rounded-lg bg-gray-50 text-xs text-gray-900 border border-gray-200 outline-none"
                                  />
                                </div>
                                {references.length > 1 && (
                                  <div className="sm:col-span-1 flex items-center justify-center">
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveReference(ref.id)}
                                      className="text-red-500 hover:text-red-700 cursor-pointer"
                                      title="Hapus"
                                    >
                                      &times;
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* JIKA FRESH GRADUATE: BERSIH & SEDERHANA TANPA TEKS BERLEBIHAN */
                    <div className="space-y-4 animate-fade-in">
                      <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                        <label className="block text-xs font-bold text-emerald-950 mb-1.5 font-mono">
                          Pengalaman Magang / PKL Sekolah (Jika Ada):
                        </label>
                        <textarea
                          rows={2}
                          value={formData.internshipNote}
                          onChange={(e) =>
                            setFormData({ ...formData, internshipNote: e.target.value })
                          }
                          placeholder="Sebutkan tempat magang PKL atau kegiatan proyek sekolah yang pernah diikuti..."
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-emerald-200 text-xs text-gray-900 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1.5 font-mono uppercase">
                          Kontak Darurat / Kerabat (Opsional)
                        </label>
                        <input
                          type="text"
                          value={formData.emergencyContact}
                          onChange={(e) =>
                            setFormData({ ...formData, emergencyContact: e.target.value })
                          }
                          placeholder="Nama Keluarga & No HP (Contoh: Bpk. Sastro - 08123456789)"
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs text-gray-900 outline-none font-mono"
                        />
                      </div>
                    </div>
                  )}

                  {/* Navigasi Step 2 */}
                  <div className="pt-4 flex items-center justify-between gap-3 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">arrow_back</span>
                      <span>Kembali</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep2}
                      className="px-7 py-3 rounded-xl bg-bracket-border hover:bg-bracket-border/90 text-xs font-bold text-white transition shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
                    >
                      <span>Lanjut ke Komitmen &amp; Skill</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* HALAMAN 3: KOMITMEN KERJA, SKILL & BERKAS */}
              {/* ======================================================== */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  {/* Pertanyaan Komitmen & Harapan Gaji */}
                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* No Work No Pay */}
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1.5 uppercase font-mono">
                          Bersedia system No Work No Pay? <span className="text-bracket-border">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, readyNoWorkNoPay: "Ya" })}
                            className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                              formData.readyNoWorkNoPay === "Ya"
                                ? "bg-emerald-600 text-white border-emerald-600"
                                : "bg-white text-gray-700 border-gray-200"
                            }`}
                          >
                            Ya, Bersedia
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, readyNoWorkNoPay: "Tidak" })}
                            className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                              formData.readyNoWorkNoPay === "Tidak"
                                ? "bg-red-600 text-white border-red-600"
                                : "bg-white text-gray-700 border-gray-200"
                            }`}
                          >
                            Tidak Bersedia
                          </button>
                        </div>
                      </div>

                      {/* Lembur */}
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1.5 uppercase font-mono">
                          Bersedia Bekerja Lembur? <span className="text-bracket-border">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, readyOvertime: "Ya" })}
                            className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                              formData.readyOvertime === "Ya"
                                ? "bg-emerald-600 text-white border-emerald-600"
                                : "bg-white text-gray-700 border-gray-200"
                            }`}
                          >
                            Ya, Bersedia
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, readyOvertime: "Tidak" })}
                            className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                              formData.readyOvertime === "Tidak"
                                ? "bg-red-600 text-white border-red-600"
                                : "bg-white text-gray-700 border-gray-200"
                            }`}
                          >
                            Tidak Bersedia
                          </button>
                        </div>
                      </div>

                      {/* Gaji */}
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1.5 uppercase font-mono">
                          Berapa Gaji yang Anda Inginkan? <span className="text-bracket-border">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.expectedSalary}
                          onChange={(e) =>
                            setFormData({ ...formData, expectedSalary: e.target.value })
                          }
                          placeholder="Contoh: Rp 3.500.000 / UMK"
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs text-gray-900 outline-none"
                        />
                      </div>

                      {/* Fasilitas */}
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1.5 uppercase font-mono">
                          Fasilitas yang Anda Inginkan
                        </label>
                        <input
                          type="text"
                          value={formData.expectedFacilities}
                          onChange={(e) =>
                            setFormData({ ...formData, expectedFacilities: e.target.value })
                          }
                          placeholder="Contoh: BPJS, Makan Siang, Mess"
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs text-gray-900 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Evaluasi Diri (3 Kelebihan & 3 Kekurangan) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1.5 uppercase font-mono">
                        Sebutkan 3 Kelebihan Anda <span className="text-bracket-border">*</span>
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.threeStrengths}
                        onChange={(e) =>
                          setFormData({ ...formData, threeStrengths: e.target.value })
                        }
                        placeholder="1. Disiplin waktu&#10;2. Cepat beradaptasi&#10;3. Tanggung jawab tinggi"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs text-gray-900 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1.5 uppercase font-mono">
                        Sebutkan 3 Kekurangan Anda <span className="text-bracket-border">*</span>
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.threeWeaknesses}
                        onChange={(e) =>
                          setFormData({ ...formData, threeWeaknesses: e.target.value })
                        }
                        placeholder="1. Kurang teliti jika terburu-buru (diatasi dengan checklist)&#10;2. Belum paham mesin baru (diatasi cepat bertanya)&#10;3. Mudah cemas di awal"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs text-gray-900 outline-none"
                      />
                    </div>
                  </div>

                  {/* Minimal 5 Skill */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1.5 uppercase font-mono">
                      Sebutkan Skill yang Anda Miliki (Minimal 5) <span className="text-bracket-border">*</span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.fiveSkills}
                      onChange={(e) =>
                        setFormData({ ...formData, fiveSkills: e.target.value })
                      }
                      placeholder="1. Mesin pond&#10;2. Hot stamping foil&#10;3. Sortir kualitas&#10;4. Perawatan mesin&#10;5. Kerja tim shift malam"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs text-gray-900 outline-none"
                    />
                  </div>

                  {/* Berkas Dokumen */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-200">
                    <label className="block text-xs font-bold text-gray-800 mb-2 uppercase font-mono">
                      Upload Berkas (CV, Ijazah, KTP, Sertifikat)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
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
                            {selectedFile ? selectedFile.name : "Unggah Dokumen (PDF / ZIP)"}
                          </p>
                        </div>
                      </div>

                      <div>
                        <input
                          type="url"
                          value={formData.cvUrl}
                          onChange={(e) => setFormData({ ...formData, cvUrl: e.target.value })}
                          placeholder="Atau Tautan Google Drive Dokumen"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-xs text-gray-900 outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Navigasi Step 3 & Submit Final */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">arrow_back</span>
                      <span>Kembali</span>
                    </button>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm active:scale-95"
                      >
                        <span className="material-symbols-outlined text-sm">chat</span>
                        <span>Fast-Track WA HRD</span>
                      </a>

                      <button
                        type="button"
                        onClick={handleSubmitFinal}
                        disabled={isSubmitting || isUploadingFile}
                        className="flex-1 sm:flex-none px-7 py-3 rounded-xl bg-bracket-border hover:bg-bracket-border/90 disabled:opacity-50 text-xs font-bold text-white transition shadow-sm active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
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

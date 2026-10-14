"use client";

import React, { useState, useEffect } from "react";
import AdminModal from "../AdminModal";
import type { JobApplicantItem } from "@/lib/admin/db";

interface ApplicantDetailModalProps {
  applicant: JobApplicantItem | null;
  initialTab?: "identitas" | "pengalaman" | "komitmen" | "skill" | "berkas";
  dateTime: { day: string; date: string; time: string; full: string };
  onClose: () => void;
  onUpdateStatus: (applicant: JobApplicantItem, status: JobApplicantItem["status"]) => void;
  onUpdateApplicant?: (updatedApplicant: JobApplicantItem) => void;
  onOpenInterview?: (applicant: JobApplicantItem) => void;
}

function getEmbedUrl(url?: string): string {
  if (!url) return "";
  const trimmed = url.trim();

  // 1. Google Drive direct view/share -> convert to embed preview
  const gdMatch = trimmed.match(
    /drive\.google\.com\/(?:file\/d\/([a-zA-Z0-9_-]+)|open\?id=([a-zA-Z0-9_-]+))/
  );
  if (gdMatch) {
    const fileId = gdMatch[1] || gdMatch[2];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }

  // 2. Data URI, relative URL, or direct PDF
  return trimmed;
}

function isPdf(url?: string, fileName?: string): boolean {
  if (!url && !fileName) return false;
  const s = ((url || "") + " " + (fileName || "")).toLowerCase();
  return (
    s.includes(".pdf") ||
    s.startsWith("data:application/pdf") ||
    s.includes("drive.google.com")
  );
}

export default function ApplicantDetailModal({
  applicant,
  initialTab = "identitas",
  dateTime,
  onClose,
  onUpdateStatus,
  onUpdateApplicant,
  onOpenInterview,
}: ApplicantDetailModalProps) {
  const [activeTab, setActiveTab] = useState<
    "identitas" | "pengalaman" | "komitmen" | "skill" | "berkas"
  >(initialTab);

  const [isPdfExpanded, setIsPdfExpanded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // State untuk form upload / input CV oleh admin
  const [showEditCv, setShowEditCv] = useState(false);
  const [inputCvUrl, setInputCvUrl] = useState("");
  const [isUploadingCv, setIsUploadingCv] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
    setShowEditCv(false);
    setUploadError("");
    setCopiedLink(false);
  }, [applicant, initialTab]);

  if (!applicant) return null;

  const currentCvUrl = applicant.cvUrl || "";
  const hasCv = Boolean(currentCvUrl.trim());
  const embedPreviewUrl = getEmbedUrl(currentCvUrl);

  const handleCopyLink = () => {
    if (!currentCvUrl) return;
    navigator.clipboard.writeText(currentCvUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Upload berkas CV langsung dari modal admin
  const handleUploadNewCv = async (file: File) => {
    setIsUploadingCv(true);
    setUploadError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/career-apply/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Gagal mengunggah berkas CV");
      }

      // Simpan ke database via PATCH /api/admin/applicants
      const patchRes = await fetch("/api/admin/applicants", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: applicant.id,
          cvUrl: data.url,
          fileName: file.name,
        }),
      });

      if (!patchRes.ok) {
        throw new Error("Gagal menyimpan tautan berkas CV ke data pelamar");
      }

      const updated = {
        ...applicant,
        cvUrl: data.url,
        fileName: file.name,
      };

      if (onUpdateApplicant) {
        onUpdateApplicant(updated);
      }
      setShowEditCv(false);
    } catch (err: any) {
      console.error(err);
      setUploadError(err?.message || "Terjadi kesalahan saat mengunggah berkas");
    } finally {
      setIsUploadingCv(false);
    }
  };

  // Simpan URL CV manual (misal Google Drive) dari modal admin
  const handleSaveCvUrlManual = async () => {
    if (!inputCvUrl.trim()) return;
    setIsUploadingCv(true);
    setUploadError("");
    try {
      const patchRes = await fetch("/api/admin/applicants", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: applicant.id,
          cvUrl: inputCvUrl.trim(),
          fileName: "Tautan Berkas Cloud",
        }),
      });

      if (!patchRes.ok) {
        throw new Error("Gagal menyimpan tautan CV ke data pelamar");
      }

      const updated = {
        ...applicant,
        cvUrl: inputCvUrl.trim(),
        fileName: "Tautan Berkas Cloud",
      };

      if (onUpdateApplicant) {
        onUpdateApplicant(updated);
      }
      setShowEditCv(false);
      setInputCvUrl("");
    } catch (err: any) {
      console.error(err);
      setUploadError(err?.message || "Terjadi kesalahan saat menyimpan tautan");
    } finally {
      setIsUploadingCv(false);
    }
  };

  return (
    <AdminModal
      isOpen={!!applicant}
      onClose={onClose}
      title={`${applicant.name}${applicant.age ? ` (${applicant.age} Thn)` : ""}`}
      subtitle={`Posisi: ${applicant.jobTitle} • Terkirim: ${dateTime.full}`}
      maxWidth={isPdfExpanded ? "5xl" : "4xl"}
      footer={
        <div className="w-full flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-bold">Ubah Status:</span>
            <select
              value={applicant.status}
              onChange={(e) => onUpdateStatus(applicant, e.target.value as any)}
              className="px-3 py-1.5 text-xs font-bold bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#F65456] text-gray-800 cursor-pointer"
            >
              {applicant.status === "new" && (
                <option value="new" disabled>Ubah Status...</option>
              )}
              <option value="reviewed">Ditinjau</option>
              <option value="interview">Jadwal Interview</option>
              <option value="accepted">Diterima</option>
              <option value="rejected">Ditolak</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            {applicant.phone && (
              <a
                href={`https://wa.me/${applicant.phone.replace(/^0/, "62")}?text=Halo%20${encodeURIComponent(applicant.name)}%2C%20kami%20dari%20Tim%20HRD%20CV%20Pelangi%20UV%20terkait%20lamaran%20posisi%20*${encodeURIComponent(applicant.jobTitle)}*...`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">chat</span>
                <span>Hubungi via WA</span>
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-xl overflow-x-auto text-xs font-bold text-gray-600">
          <button
            type="button"
            onClick={() => setActiveTab("identitas")}
            className={`px-3 py-1.5 rounded-lg transition shrink-0 cursor-pointer ${
              activeTab === "identitas"
                ? "bg-white text-gray-900 shadow-xs"
                : "hover:text-gray-900"
            }`}
          >
            1. Data Pribadi
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("pengalaman")}
            className={`px-3 py-1.5 rounded-lg transition shrink-0 cursor-pointer ${
              activeTab === "pengalaman"
                ? "bg-white text-gray-900 shadow-xs"
                : "hover:text-gray-900"
            }`}
          >
            2. Pengalaman Kerja
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("komitmen")}
            className={`px-3 py-1.5 rounded-lg transition shrink-0 cursor-pointer ${
              activeTab === "komitmen"
                ? "bg-white text-gray-900 shadow-xs"
                : "hover:text-gray-900"
            }`}
          >
            3. Komitmen &amp; Gaji
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("skill")}
            className={`px-3 py-1.5 rounded-lg transition shrink-0 cursor-pointer ${
              activeTab === "skill"
                ? "bg-white text-gray-900 shadow-xs"
                : "hover:text-gray-900"
            }`}
          >
            4. Karakter &amp; Skill
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("berkas")}
            className={`px-3 py-1.5 rounded-lg transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeTab === "berkas"
                ? "bg-white text-gray-900 shadow-xs font-black text-red-600"
                : "hover:text-gray-900"
            }`}
          >
            <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
            <span>5. Berkas CV &amp; Dokumen</span>
            {hasCv && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>
        </div>

        {/* Tab 1: Identitas */}
        {activeTab === "identitas" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs">
            <div>
              <span className="text-gray-400 block font-mono text-[11px]">Nama Lengkap:</span>
              <span className="font-bold text-gray-900 text-sm">{applicant.name}</span>
            </div>
            <div>
              <span className="text-gray-400 block font-mono text-[11px]">Tempat &amp; Tanggal Lahir:</span>
              <span className="font-bold text-gray-900">{applicant.birthPlaceDate || "-"}</span>
            </div>
            <div>
              <span className="text-gray-400 block font-mono text-[11px]">Status Pernikahan:</span>
              <span className="font-bold text-gray-900">{applicant.maritalStatus || "Single"}</span>
            </div>
            <div>
              <span className="text-gray-400 block font-mono text-[11px]">Usia:</span>
              <span className="font-bold text-gray-900">{applicant.age ? `${applicant.age} Tahun` : "-"}</span>
            </div>
            <div>
              <span className="text-gray-400 block font-mono text-[11px]">Nomor WhatsApp:</span>
              <span className="font-bold text-gray-900 font-mono">{applicant.phone}</span>
            </div>
            <div>
              <span className="text-gray-400 block font-mono text-[11px]">Alamat Email:</span>
              <span className="font-bold text-gray-900">{applicant.email || "-"}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-gray-400 block font-mono text-[11px]">Pendidikan Terakhir:</span>
              <span className="font-bold text-gray-900">
                {applicant.education || "-"}
                {applicant.educationMajor ? ` - Jurusan ${applicant.educationMajor}` : ""}
              </span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-gray-400 block font-mono text-[11px]">Alamat Domisili:</span>
              <span className="font-bold text-gray-900">{applicant.address || "-"}</span>
            </div>
          </div>
        )}

        {/* Tab 2: Pengalaman */}
        {activeTab === "pengalaman" && (
          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-1.5">
              <span className="font-bold text-blue-900 font-mono uppercase block">
                Riwayat Pengalaman Kerja:
              </span>
              <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                {applicant.experience || "Fresh Graduate / Siap mengikuti pelatihan kerja."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-1.5">
              <span className="font-bold text-amber-950 font-mono uppercase block">
                Kontak Referensi Kerja:
              </span>
              {applicant.reference1 && <p className="text-gray-800 font-mono">• Referensi 1: <strong>{applicant.reference1}</strong></p>}
              {applicant.reference2 && <p className="text-gray-800 font-mono">• Referensi 2: <strong>{applicant.reference2}</strong></p>}
              {!applicant.reference1 && !applicant.reference2 && applicant.referencePhone && (
                <p className="text-gray-800 font-mono">• Kontak: <strong>{applicant.referencePhone}</strong> ({applicant.referenceRelation || "Darurat"})</p>
              )}
              {!applicant.reference1 && !applicant.reference2 && !applicant.referencePhone && (
                <p className="text-gray-500 italic">Tidak ada referensi yang dicantumkan.</p>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Komitmen & Gaji */}
        {activeTab === "komitmen" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs">
            <div>
              <span className="text-gray-400 block font-mono text-[11px]">Bersedia No Work No Pay?</span>
              <span className={`font-bold ${applicant.readyNoWorkNoPay === "Ya" ? "text-emerald-700" : "text-red-600"}`}>
                {applicant.readyNoWorkNoPay || "Ya"}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block font-mono text-[11px]">Bersedia Lembur?</span>
              <span className={`font-bold ${applicant.readyOvertime === "Ya" ? "text-emerald-700" : "text-red-600"}`}>
                {applicant.readyOvertime || "Ya"}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block font-mono text-[11px]">Ekspektasi Gaji:</span>
              <span className="font-bold text-gray-900">{applicant.expectedSalary || "-"}</span>
            </div>
            <div>
              <span className="text-gray-400 block font-mono text-[11px]">Fasilitas yang Diinginkan:</span>
              <span className="font-bold text-gray-900">{applicant.expectedFacilities || "-"}</span>
            </div>
          </div>
        )}

        {/* Tab 4: Skill & Karakter */}
        {activeTab === "skill" && (
          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200">
              <span className="font-bold text-emerald-900 font-mono uppercase block mb-1">
                3 Kelebihan Diri:
              </span>
              <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                {applicant.threeStrengths || applicant.strengths || "-"}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200">
              <span className="font-bold text-amber-900 font-mono uppercase block mb-1">
                3 Kekurangan &amp; Solusi:
              </span>
              <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                {applicant.threeWeaknesses || applicant.weaknesses || "-"}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-200">
              <span className="font-bold text-purple-900 font-mono uppercase block mb-1">
                Keahlian / Skill yang Dikuasai:
              </span>
              <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                {applicant.fiveSkills || "-"}
              </p>
            </div>
          </div>
        )}

        {/* Tab 5: Berkas Dokumen & Live PDF Preview */}
        {activeTab === "berkas" && (
          <div className="space-y-4 text-xs">
            {/* Header Status Dokumen CV */}
            <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                  <span className="material-symbols-outlined text-2xl">picture_as_pdf</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-900 text-sm">
                      Dokumen CV / Resume Kandidat
                    </p>
                    {hasCv ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Berkas Terlampir
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        Belum Terlampir
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 font-mono text-[11px] truncate max-w-sm">
                    {applicant.fileName || (hasCv ? "Berkas PDF / Dokumen Pelamar" : "Kandidat belum mengunggah file CV")}
                  </p>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {hasCv && (
                  <>
                    <a
                      href={currentCvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#111216] hover:bg-black text-white text-xs font-bold transition shadow-xs cursor-pointer"
                      title="Buka dokumen di tab browser baru"
                    >
                      <span className="material-symbols-outlined text-xs">open_in_new</span>
                      <span>Buka Tab Baru</span>
                    </a>

                    <a
                      href={currentCvUrl}
                      download={applicant.fileName || `CV_${applicant.name.replace(/\s+/g, "_")}.pdf`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition border border-gray-200 cursor-pointer"
                      title="Unduh file dokumen"
                    >
                      <span className="material-symbols-outlined text-xs">download</span>
                      <span>Unduh</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold transition border border-gray-200 cursor-pointer"
                      title="Salin tautan berkas"
                    >
                      <span className="material-symbols-outlined text-xs">
                        {copiedLink ? "check" : "content_copy"}
                      </span>
                      <span>{copiedLink ? "Tersalin!" : "Salin Link"}</span>
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setShowEditCv(!showEditCv)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-[#F65456] text-xs font-bold transition border border-red-200 cursor-pointer"
                  title="Ganti atau unggah berkas CV"
                >
                  <span className="material-symbols-outlined text-xs">
                    {showEditCv ? "close" : "upload_file"}
                  </span>
                  <span>{showEditCv ? "Batal" : hasCv ? "Ganti Berkas" : "+ Unggah CV"}</span>
                </button>
              </div>
            </div>

            {/* Panel Form Upload / Ganti Berkas oleh Admin (Jika Dibuka) */}
            {showEditCv && (
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-950 font-mono uppercase text-xs">
                    Unggah / Perbarui Berkas CV Kandidat:
                  </span>
                  <span className="text-[11px] text-amber-800">
                    Format: PDF, DOC, DOCX, ZIP (Maks 15MB)
                  </span>
                </div>

                {uploadError && (
                  <p className="text-xs text-red-600 font-semibold bg-red-50 p-2 rounded-lg border border-red-200">
                    {uploadError}
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
                  {/* Pilihan 1: Unggah File Langsung */}
                  <div className="relative border-2 border-dashed border-amber-300 hover:border-amber-500 rounded-xl p-4 bg-white text-center flex flex-col items-center justify-center transition cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.zip,.rar,image/*"
                      disabled={isUploadingCv}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleUploadNewCv(f);
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full disabled:cursor-not-allowed"
                    />
                    <span className="material-symbols-outlined text-amber-600 text-3xl mb-1">
                      {isUploadingCv ? "progress_activity" : "upload_file"}
                    </span>
                    <p className="font-bold text-gray-800 text-xs">
                      {isUploadingCv ? "Mengunggah Berkas..." : "Pilih File Dokumen (PDF)"}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      Klik untuk memilih file dari komputer
                    </p>
                  </div>

                  {/* Pilihan 2: Tempel Link Cloud / Google Drive */}
                  <div className="p-3.5 bg-white rounded-xl border border-amber-200 flex flex-col justify-between gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Atau Tempel Tautan Google Drive / Cloud CV:
                      </label>
                      <input
                        type="url"
                        value={inputCvUrl}
                        onChange={(e) => setInputCvUrl(e.target.value)}
                        placeholder="https://drive.google.com/file/d/.../view"
                        className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg outline-none font-mono focus:border-amber-500"
                      />
                    </div>
                    <button
                      type="button"
                      disabled={!inputCvUrl.trim() || isUploadingCv}
                      onClick={handleSaveCvUrlManual}
                      className="w-full py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                    >
                      Simpan Tautan Berkas
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* LIVE PREVIEW PDF VIEWER */}
            {hasCv ? (
              <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-xs">
                {/* Viewer Header Toolbar */}
                <div className="px-4 py-2.5 bg-gray-900 text-white flex items-center justify-between border-b border-gray-800">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-red-400 text-base">
                      picture_as_pdf
                    </span>
                    <span className="font-mono text-xs font-semibold text-gray-200 truncate max-w-[280px] sm:max-w-md">
                      Preview Berkas: {applicant.fileName || `${applicant.name}_CV.pdf`}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsPdfExpanded(!isPdfExpanded)}
                      className="text-gray-300 hover:text-white flex items-center gap-1 text-[11px] font-semibold transition cursor-pointer"
                      title={isPdfExpanded ? "Kecilkan tampilan" : "Perbesar tampilan"}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {isPdfExpanded ? "collapse_content" : "expand_content"}
                      </span>
                      <span className="hidden sm:inline">
                        {isPdfExpanded ? "Normal" : "Perbesar"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Embedded Viewer (Iframe) */}
                <div
                  className={`w-full bg-gray-100 transition-all duration-200 ${
                    isPdfExpanded ? "h-[750px]" : "h-[540px]"
                  }`}
                >
                  <iframe
                    src={embedPreviewUrl}
                    title={`Preview CV ${applicant.name}`}
                    className="w-full h-full border-0 bg-white"
                    allow="autoplay; encrypted-media; fullscreen"
                    loading="lazy"
                  />
                </div>

                {/* Viewer Helper Footnote */}
                <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-gray-400">info</span>
                    <span>
                      Gunakan kontrol zoom, scroll halaman, atau cetak di reader di atas.
                    </span>
                  </span>
                  <a
                    href={currentCvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F65456] hover:underline font-bold flex items-center gap-1"
                  >
                    <span>Buka langsung di tab baru</span>
                    <span className="material-symbols-outlined text-xs">arrow_outward</span>
                  </a>
                </div>
              </div>
            ) : (
              /* State Kosong Jika Belum Ada CV */
              <div className="p-8 rounded-2xl bg-gray-50 border border-dashed border-gray-300 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-2xl">description</span>
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">
                    Kandidat Belum Melampirkan File CV
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5 max-w-md mx-auto">
                    Kandidat mungkin mengirimkan berkas melalui WhatsApp atau email. Anda dapat mengunggah file CV atau menempelkan tautan dokumen di atas.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEditCv(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111216] hover:bg-black text-white text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">upload_file</span>
                  <span>Unggah Berkas CV Sekarang</span>
                </button>
              </div>
            )}

            {/* Portofolio Section (Jika Ada) */}
            <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                  <span className="material-symbols-outlined text-2xl">folder_zip</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-xs sm:text-sm">
                    Portofolio Hasil Kerja / Proyek
                  </p>
                  <p className="text-gray-500 font-mono text-[11px]">
                    {applicant.hasPortfolio === "yes"
                      ? applicant.portfolioUrl
                        ? "Kandidat melampirkan portofolio karya"
                        : "Kandidat memiliki portofolio (belum terunggah)"
                      : "Tidak melampirkan portofolio"}
                  </p>
                </div>
              </div>

              {applicant.portfolioUrl ? (
                <a
                  href={applicant.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <span className="material-symbols-outlined text-xs">open_in_new</span>
                  <span>Lihat Portofolio</span>
                </a>
              ) : (
                <span className="text-gray-400 italic text-[11px]">Tidak ada link</span>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminModal>
  );
}

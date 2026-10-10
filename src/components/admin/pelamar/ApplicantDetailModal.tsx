"use client";

import React, { useState } from "react";
import AdminModal from "../AdminModal";
import type { JobApplicantItem } from "@/lib/admin/db";

interface ApplicantDetailModalProps {
  applicant: JobApplicantItem | null;
  dateTime: { day: string; date: string; time: string; full: string };
  onClose: () => void;
  onUpdateStatus: (applicant: JobApplicantItem, status: JobApplicantItem["status"]) => void;
  onOpenInterview?: (applicant: JobApplicantItem) => void;
}

export default function ApplicantDetailModal({
  applicant,
  dateTime,
  onClose,
  onUpdateStatus,
  onOpenInterview,
}: ApplicantDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"identitas" | "pengalaman" | "komitmen" | "skill" | "berkas">("identitas");

  if (!applicant) return null;

  return (
    <AdminModal
      isOpen={!!applicant}
      onClose={onClose}
      title={`${applicant.name}${applicant.age ? ` (${applicant.age} Thn)` : ""}`}
      subtitle={`Posisi: ${applicant.jobTitle} • Terkirim: ${dateTime.full}`}
      maxWidth="4xl"
      footer={
        <div className="w-full flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-bold">Ubah Status:</span>
            <select
              value={applicant.status}
              onChange={(e) => onUpdateStatus(applicant, e.target.value as any)}
              className="px-3 py-1.5 text-xs font-bold bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#F65456] text-gray-800"
            >
              <option value="new">Status: Baru</option>
              <option value="reviewed">Ditinjau</option>
              <option value="interview">Jadwal Interview</option>
              <option value="accepted">Diterima</option>
              <option value="rejected">Ditolak</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            {onOpenInterview && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenInterview(applicant);
                }}
                className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">event_available</span>
                <span>Undang Interview (WA)</span>
              </button>
            )}
            <a
              href={`https://wa.me/${applicant.phone.replace(/^0/, "62")}?text=Halo%20${encodeURIComponent(applicant.name)}%2C%20kami%20dari%20Tim%20HRD%20CV%20Pelangi%20UV%20terkait%20lamaran%20posisi%20*${encodeURIComponent(applicant.jobTitle)}*...`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              <span>Hubungi via WA</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold transition"
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
            className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
              activeTab === "identitas" ? "bg-white text-gray-900 shadow-xs" : "hover:text-gray-900"
            }`}
          >
            1. Data Pribadi
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("pengalaman")}
            className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
              activeTab === "pengalaman" ? "bg-white text-gray-900 shadow-xs" : "hover:text-gray-900"
            }`}
          >
            2. Pengalaman Kerja
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("komitmen")}
            className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
              activeTab === "komitmen" ? "bg-white text-gray-900 shadow-xs" : "hover:text-gray-900"
            }`}
          >
            3. Komitmen &amp; Gaji
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("skill")}
            className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
              activeTab === "skill" ? "bg-white text-gray-900 shadow-xs" : "hover:text-gray-900"
            }`}
          >
            4. Karakter &amp; Skill
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("berkas")}
            className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
              activeTab === "berkas" ? "bg-white text-gray-900 shadow-xs" : "hover:text-gray-900"
            }`}
          >
            5. Berkas Dokumen
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

        {/* Tab 5: Berkas */}
        {activeTab === "berkas" && (
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-red-600 text-2xl">picture_as_pdf</span>
                <div>
                  <p className="font-bold text-gray-900">Dokumen CV / Resume</p>
                  <p className="text-gray-500 font-mono text-[11px]">Format PDF / Dokumen Pelamar</p>
                </div>
              </div>
              {applicant.cvUrl ? (
                <a
                  href={applicant.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#111216] text-white font-bold hover:bg-black transition flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-xs">open_in_new</span>
                  <span>Buka Berkas</span>
                </a>
              ) : (
                <span className="text-gray-400 italic">Tidak dilampirkan</span>
              )}
            </div>

            <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-blue-600 text-2xl">folder_zip</span>
                <div>
                  <p className="font-bold text-gray-900">Portofolio Karya</p>
                  <p className="text-gray-500 font-mono text-[11px]">
                    {applicant.hasPortfolio === "yes" ? "Kandidat memiliki portofolio" : "Tidak ada portofolio"}
                  </p>
                </div>
              </div>
              {applicant.portfolioUrl ? (
                <a
                  href={applicant.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-xs">open_in_new</span>
                  <span>Lihat Portofolio</span>
                </a>
              ) : (
                <span className="text-gray-400 italic">Tidak dilampirkan</span>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminModal>
  );
}

"use client";

import React from "react";
import type { JobApplicantItem } from "@/lib/admin/db";

interface ApplicantCardItemProps {
  applicant: JobApplicantItem;
  dateTime: { day: string; date: string; time: string; full: string };
  onUpdateStatus: (applicant: JobApplicantItem, status: JobApplicantItem["status"]) => void;
  onOpenDetail: (applicant: JobApplicantItem) => void;
  onOpenRejection: (applicant: JobApplicantItem) => void;
  onOpenInterview?: (applicant: JobApplicantItem) => void;
  onDelete: (id: string, name: string) => void;
}

const APPLICANT_STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; border: string }> = {
  new: { label: "Baru", bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  reviewed: { label: "Ditinjau", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  interview: { label: "Interview", bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  accepted: { label: "Diterima", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  rejected: { label: "Ditolak", bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200" },
};

export default function ApplicantCardItem({
  applicant,
  dateTime,
  onUpdateStatus,
  onOpenDetail,
  onOpenRejection,
  onOpenInterview,
  onDelete,
}: ApplicantCardItemProps) {
  const currentStatus = APPLICANT_STATUS_CONFIG[applicant.status] || APPLICANT_STATUS_CONFIG.new;

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md transition-all duration-200 p-5 sm:p-6 overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Kolom Kiri: Profil Singkat Kandidat */}
        <div className="space-y-2 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${currentStatus.bg} ${currentStatus.text} ${currentStatus.border}`}
            >
              ● {currentStatus.label}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
              {applicant.jobTitle}
            </span>
            {applicant.hasExperience === "yes" ? (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Berpengalaman
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                Fresh Graduate
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-baseline gap-2">
            <h3 className="font-heading font-black text-lg text-gray-900">
              {applicant.name}
            </h3>
            {applicant.age && (
              <span className="text-xs text-gray-500 font-medium">
                ({applicant.age} tahun)
              </span>
            )}
            {applicant.education && (
              <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">school</span>
                {applicant.education} {applicant.educationMajor ? `(${applicant.educationMajor})` : ""}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
            <a
              href={`tel:${applicant.phone}`}
              className="inline-flex items-center gap-1 hover:text-[#F65456]"
            >
              <span className="material-symbols-outlined text-sm text-gray-400">call</span>
              <span>{applicant.phone}</span>
            </a>
            {applicant.email && (
              <a
                href={`mailto:${applicant.email}`}
                className="inline-flex items-center gap-1 hover:text-[#F65456]"
              >
                <span className="material-symbols-outlined text-sm text-gray-400">mail</span>
                <span>{applicant.email}</span>
              </a>
            )}
            <div className="inline-flex items-center gap-1 text-gray-500">
              <span className="material-symbols-outlined text-sm text-gray-400">schedule</span>
              <span>{dateTime.full}</span>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Status Dropdown & Tombol Aksi */}
        <div className="flex flex-wrap items-center gap-2.5 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100 shrink-0">
          <select
            value={applicant.status}
            onChange={(e) => {
              const newStatus = e.target.value as any;
              onUpdateStatus(applicant, newStatus);
            }}
            className="px-3 py-1.5 text-xs font-semibold bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-[#F65456] text-gray-700 cursor-pointer"
          >
            <option value="new">Status: Baru</option>
            <option value="reviewed">Ditinjau</option>
            <option value="interview">Jadwal Interview</option>
            <option value="accepted">Diterima</option>
            <option value="rejected">Ditolak</option>
          </select>

          {/* Tombol WhatsApp Direct */}
          <a
            href={`https://wa.me/${applicant.phone.replace(/^0/, "62")}?text=Halo%20${encodeURIComponent(applicant.name)}%2C%20kami%20dari%20Tim%20HRD%20CV%20Pelangi%20UV%20terkait%20lamaran%20posisi%20*${encodeURIComponent(applicant.jobTitle)}*...`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
            title="Hubungi via WhatsApp"
          >
            <span className="material-symbols-outlined text-sm">chat</span>
            <span>WA</span>
          </a>

          {/* Tombol Template Tolak */}
          <button
            type="button"
            onClick={() => onOpenRejection(applicant)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-600 text-xs font-semibold transition cursor-pointer"
            title="Kirim template penolakan ramah"
          >
            <span className="material-symbols-outlined text-sm text-gray-400">mail</span>
            <span>Tolak</span>
          </button>

          {/* Tombol Hapus */}
          <button
            type="button"
            onClick={() => onDelete(applicant.id, applicant.name)}
            className="w-8 h-8 rounded-xl border border-gray-200 hover:bg-red-50 hover:text-red-600 text-gray-400 flex items-center justify-center transition cursor-pointer"
            title="Hapus Berkas"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
          </button>

          {/* Tombol Rincian Berkas */}
          <button
            type="button"
            onClick={() => onOpenDetail(applicant)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#111216] hover:bg-black text-white text-xs font-bold shadow-sm transition cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">visibility</span>
            <span>Rincian Berkas</span>
          </button>
        </div>
      </div>
    </div>
  );
}

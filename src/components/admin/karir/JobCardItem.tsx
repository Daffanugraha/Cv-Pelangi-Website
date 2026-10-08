"use client";

import React from "react";
import Link from "next/link";
import type { CareerJobItem } from "@/lib/admin/db";

interface JobCardItemProps {
  job: CareerJobItem;
  applicantCount: { total: number; newCount: number };
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
  onEdit: (job: CareerJobItem) => void;
  onToggleStatus: (job: CareerJobItem) => void;
  onDelete: (id: string) => void;
}

export default function JobCardItem({
  job,
  applicantCount,
  isExpanded,
  onToggleExpand,
  onEdit,
  onToggleStatus,
  onDelete,
}: JobCardItemProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  job.isOpen
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-gray-200 text-gray-700 border border-gray-300"
                }`}
              >
                {job.isOpen ? "● Dibuka" : "✕ Ditutup"}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-[#F65456] border border-red-100">
                {job.division}
              </span>
            </div>

            <h3 className="font-heading font-extrabold text-base sm:text-lg text-gray-900">
              {job.title}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Tombol Langsung ke Berkas Pelamar Posisi Ini */}
            <Link
              href={`/admin/pelamar?posisi=${encodeURIComponent(job.title)}`}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
                applicantCount.total > 0
                  ? "bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200 border border-gray-200"
              }`}
              title="Lihat seluruh pelamar pada lowongan ini"
            >
              <span className="material-symbols-outlined text-sm">group</span>
              <span>{applicantCount.total} Pelamar</span>
              {applicantCount.newCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-[#F65456] text-white text-[10px] font-black">
                  +{applicantCount.newCount} baru
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => onToggleStatus(job)}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition cursor-pointer"
              title={job.isOpen ? "Tutup Lowongan Ini" : "Buka Lowongan Ini"}
            >
              <span className="material-symbols-outlined text-lg">
                {job.isOpen ? "toggle_on" : "toggle_off"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onEdit(job)}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition cursor-pointer"
              title="Edit Data Lowongan"
            >
              <span className="material-symbols-outlined text-lg">edit</span>
            </button>

            <button
              type="button"
              onClick={() => onDelete(job.id)}
              className="p-2 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 transition cursor-pointer"
              title="Hapus Lowongan"
            >
              <span className="material-symbols-outlined text-lg">delete</span>
            </button>
          </div>
        </div>

        {/* Collapsible Kualifikasi & Tanggung Jawab */}
        <div className="mt-4 pt-3.5 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>{job.qualifications?.length || 0} Syarat Kualifikasi</span>
              <span>•</span>
              <span>{job.responsibilities?.length || 0} Tanggung Jawab</span>
            </div>

            <button
              type="button"
              onClick={() => onToggleExpand(job.id)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#F65456] hover:underline cursor-pointer"
            >
              <span>{isExpanded ? "Tutup Detail" : "Lihat Rincian"}</span>
              <span className="material-symbols-outlined text-sm">
                {isExpanded ? "expand_less" : "expand_more"}
              </span>
            </button>
          </div>

          {isExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 pt-3 border-t border-dashed border-gray-200 animate-fade-in">
              <div>
                <p className="text-xs font-bold text-gray-700 mb-2">Kualifikasi Pelamar:</p>
                <ul className="space-y-1 text-xs text-gray-600 list-disc list-inside">
                  {job.qualifications?.map((q, idx) => (
                    <li key={idx} className="leading-relaxed">{q}</li>
                  ))}
                  {(!job.qualifications || job.qualifications.length === 0) && (
                    <li className="list-none text-gray-400 italic">Tidak ada syarat kualifikasi khusus.</li>
                  )}
                </ul>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-700 mb-2">Tanggung Jawab Pekerjaan:</p>
                <ul className="space-y-1 text-xs text-gray-600 list-disc list-inside">
                  {job.responsibilities?.map((r, idx) => (
                    <li key={idx} className="leading-relaxed">{r}</li>
                  ))}
                  {(!job.responsibilities || job.responsibilities.length === 0) && (
                    <li className="list-none text-gray-400 italic">Tidak ada deskripsi tanggung jawab khusus.</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

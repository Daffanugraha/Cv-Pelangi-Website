import React from "react";
import Link from "next/link";
import type { JobApplicantItem } from "@/lib/admin/db";

interface DashboardRecentApplicantsProps {
  applicants: JobApplicantItem[];
}

const APPLICANT_STATUS_MAP: Record<string, { label: string; color: string }> = {
  new: { label: "Baru", color: "bg-amber-50 text-amber-800 border-amber-200" },
  reviewed: { label: "Ditinjau", color: "bg-blue-50 text-blue-800 border-blue-200" },
  interview: { label: "Interview", color: "bg-purple-50 text-purple-800 border-purple-200" },
  rejected: { label: "Ditolak", color: "bg-gray-100 text-gray-700 border-gray-200" },
};

export default function DashboardRecentApplicants({
  applicants,
}: DashboardRecentApplicantsProps) {
  return (
    <div className="bg-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-xs flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-amber-600 text-lg">badge</span>
          <h2 className="font-heading font-bold text-gray-900 text-sm sm:text-base">
            Pelamar Karir Terbaru
          </h2>
        </div>
        <Link
          href="/admin/pelamar"
          className="text-xs font-bold text-[#F65456] hover:underline transition"
        >
          Lihat Semua ({applicants.length}) →
        </Link>
      </div>

      <div className="divide-y divide-gray-100 flex-1">
        {applicants.slice(0, 5).map((app) => {
          const statusCfg = APPLICANT_STATUS_MAP[app.status] || APPLICANT_STATUS_MAP.new;
          return (
            <div
              key={app.id}
              className="px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-gray-50/80 transition"
            >
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {app.name}
                </p>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {app.jobTitle} • {app.phone}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${statusCfg.color}`}
                >
                  {statusCfg.label}
                </span>
                <Link
                  href="/admin/pelamar"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition"
                  title="Buka Berkas"
                >
                  <span className="material-symbols-outlined text-base">visibility</span>
                </Link>
              </div>
            </div>
          );
        })}

        {applicants.length === 0 && (
          <div className="p-8 text-center text-gray-400 text-xs sm:text-sm">
            Belum ada berkas pelamar karir yang masuk saat ini.
          </div>
        )}
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";

interface DashboardQuickActionsProps {
  newApplicantsCount: number;
}

export default function DashboardQuickActions({
  newApplicantsCount,
}: DashboardQuickActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-7">
      <Link
        href="/admin/pelamar"
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-2xs transition active:scale-95 cursor-pointer"
      >
        <span className="material-symbols-outlined text-base">how_to_reg</span>
        <span>Tinjau Pelamar {newApplicantsCount > 0 ? `(${newApplicantsCount})` : ""}</span>
      </Link>

      <Link
        href="/admin/karir"
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-semibold text-xs border border-gray-200 shadow-2xs transition active:scale-95 cursor-pointer"
      >
        <span className="material-symbols-outlined text-base">add_circle</span>
        <span>Tambah Lowongan</span>
      </Link>

      <Link
        href="/admin/momen"
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-semibold text-xs border border-gray-200 shadow-2xs transition active:scale-95 cursor-pointer"
      >
        <span className="material-symbols-outlined text-base">add_photo_alternate</span>
        <span>Tambah Momen</span>
      </Link>
    </div>
  );
}

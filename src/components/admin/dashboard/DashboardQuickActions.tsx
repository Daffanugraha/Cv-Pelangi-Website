import React from "react";
import Link from "next/link";

interface DashboardQuickActionsProps {
  newApplicantsCount: number;
}

export default function DashboardQuickActions({
  newApplicantsCount,
}: DashboardQuickActionsProps) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-gray-900 via-neutral-900 to-gray-800 text-white mb-7 shadow-sm border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 className="font-heading font-extrabold text-sm sm:text-base text-white">
          Pusat Aksi Cepat Manajemen
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Kelola lowongan pekerjaan, tinjau berkas pelamar masuk, atau update konten visual website secara langsung.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 shrink-0">
        <Link
          href="/admin/pelamar"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm transition active:scale-95"
        >
          <span className="material-symbols-outlined text-base">how_to_reg</span>
          <span>Tinjau Pelamar ({newApplicantsCount})</span>
        </Link>

        <Link
          href="/admin/karir"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 transition active:scale-95"
        >
          <span className="material-symbols-outlined text-base">add_circle</span>
          <span>Tambah Lowongan</span>
        </Link>

        <Link
          href="/admin/momen"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 transition active:scale-95"
        >
          <span className="material-symbols-outlined text-base">add_photo_alternate</span>
          <span>Tambah Momen</span>
        </Link>
      </div>
    </div>
  );
}

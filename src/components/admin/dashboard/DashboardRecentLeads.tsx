import React from "react";
import Link from "next/link";
import type { LeadItem } from "@/lib/admin/db";

interface DashboardRecentLeadsProps {
  leads: LeadItem[];
}

const LEAD_STATUS_MAP: Record<string, { label: string; color: string }> = {
  new: { label: "Baru", color: "bg-red-50 text-red-700 border-red-200" },
  contacted: { label: "Dihubungi", color: "bg-blue-50 text-blue-700 border-blue-200" },
  sample_sent: { label: "Sampel Dikirim", color: "bg-purple-50 text-purple-700 border-purple-200" },
  closed: { label: "Closed / Order", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
};

export default function DashboardRecentLeads({
  leads,
}: DashboardRecentLeadsProps) {
  return (
    <div className="bg-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-xs flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-600 text-lg">inbox</span>
          <h2 className="font-heading font-bold text-gray-900 text-sm sm:text-base">
            Pesan Lead Masuk
          </h2>
        </div>
        <Link
          href="/admin/leads"
          className="text-xs font-bold text-[#F65456] hover:underline transition"
        >
          Lihat Semua ({leads.length}) →
        </Link>
      </div>

      <div className="divide-y divide-gray-100 flex-1">
        {leads.slice(0, 5).map((lead) => {
          const statusCfg = LEAD_STATUS_MAP[lead.status] || LEAD_STATUS_MAP.new;
          return (
            <div
              key={lead.id}
              className="px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-gray-50/80 transition"
            >
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {lead.name}
                </p>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {lead.company || "Perseorangan"} • Layanan {lead.service}
                </p>
              </div>

              <span
                className={`shrink-0 text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${statusCfg.color}`}
              >
                {statusCfg.label}
              </span>
            </div>
          );
        })}

        {leads.length === 0 && (
          <div className="p-8 text-center text-gray-400 text-xs sm:text-sm">
            Belum ada pesan lead masuk dari calon pelanggan.
          </div>
        )}
      </div>
    </div>
  );
}

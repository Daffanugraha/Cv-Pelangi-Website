"use client";

import React from "react";
import type { LeadItem } from "@/lib/admin/db";

export const LEAD_STATUS_CONFIG: Record<
  LeadItem["status"],
  { label: string; bg: string; text: string; border: string; icon: string }
> = {
  new: {
    label: "Baru Masuk",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    icon: "mark_email_unread",
  },
  contacted: {
    label: "Sudah Dihubungi",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    icon: "chat",
  },
  sample_sent: {
    label: "Sampel Terkirim",
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
    icon: "local_shipping",
  },
  closed: {
    label: "Closed / Order",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    icon: "verified",
  },
};

export function formatLeadDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "-";
  }
}

interface LeadCardItemProps {
  lead: LeadItem;
  onClick: () => void;
}

export default function LeadCardItem({ lead, onClick }: LeadCardItemProps) {
  const statusInfo = LEAD_STATUS_CONFIG[lead.status] || LEAD_STATUS_CONFIG.new;

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/80 cursor-pointer transition select-none group"
    >
      {/* Avatar */}
      <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0 group-hover:bg-[#F65456] transition-colors">
        <span className="text-sm font-black text-[#F65456] group-hover:text-white transition-colors">
          {lead.name ? lead.name.charAt(0).toUpperCase() : "L"}
        </span>
      </div>

      {/* Main Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-gray-900 truncate">{lead.name}</p>
          {lead.company && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 truncate">
              {lead.company}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 truncate mt-0.5 font-sans">
          Layanan: <span className="font-semibold text-gray-700">{lead.service}</span>
          {lead.phone && <span className="ml-2 font-mono">· {lead.phone}</span>}
        </p>
      </div>

      {/* Status Badge */}
      <span
        className={`hidden sm:inline-flex shrink-0 text-xs px-2.5 py-1 rounded-full border font-bold ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}
      >
        ● {statusInfo.label}
      </span>

      {/* Date */}
      <span className="hidden md:block shrink-0 text-xs text-gray-400 font-mono">
        {formatLeadDate(lead.createdAt)}
      </span>

      {/* Chevron */}
      <span className="material-symbols-outlined text-gray-400 text-lg shrink-0 group-hover:text-[#F65456] transition-colors">
        chevron_right
      </span>
    </div>
  );
}

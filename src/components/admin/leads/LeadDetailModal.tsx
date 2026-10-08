"use client";

import React from "react";
import AdminModal from "../AdminModal";
import type { LeadItem } from "@/lib/admin/db";
import { LEAD_STATUS_CONFIG, formatLeadDate } from "./LeadCardItem";

interface LeadDetailModalProps {
  lead: LeadItem | null;
  onClose: () => void;
  onStatusChange: (id: string, status: LeadItem["status"]) => void;
  onDelete: (id: string) => void;
}

const ALL_STATUS_KEYS: LeadItem["status"][] = [
  "new",
  "contacted",
  "sample_sent",
  "closed",
];

export default function LeadDetailModal({
  lead,
  onClose,
  onStatusChange,
  onDelete,
}: LeadDetailModalProps) {
  if (!lead) return null;

  const phoneClean = lead.phone.replace(/\D/g, "").replace(/^0/, "62");

  return (
    <AdminModal
      isOpen={!!lead}
      onClose={onClose}
      title={lead.name}
      subtitle={lead.company ? `${lead.company} • ${lead.service}` : `Perseorangan • ${lead.service}`}
      maxWidth="md"
    >
      <div className="space-y-5">
        {/* Quick Actions (WhatsApp & Email) */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`https://wa.me/${phoneClean}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-3 py-2.5 rounded-xl transition shadow-xs cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">chat</span>
            Hubungi WA
          </a>
          {lead.email ? (
            <a
              href={`mailto:${lead.email}`}
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm font-bold px-3 py-2.5 rounded-xl transition cursor-pointer border border-gray-200"
            >
              <span className="material-symbols-outlined text-lg">mail</span>
              Kirim Email
            </a>
          ) : (
            <div className="flex items-center justify-center bg-gray-50 border border-gray-200 text-gray-400 text-xs py-2.5 rounded-xl font-medium">
              Tidak ada email
            </div>
          )}
        </div>

        {/* Info Grid */}
        <div className="bg-gray-50/80 border border-gray-200/90 rounded-2xl divide-y divide-gray-200/80 overflow-hidden text-xs">
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-gray-500 font-medium">Nomor WhatsApp</span>
            <span className="text-gray-900 font-mono font-bold text-right">{lead.phone}</span>
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-gray-500 font-medium">Alamat Email</span>
            <span className="text-gray-900 font-semibold text-right">{lead.email || "-"}</span>
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-gray-500 font-medium">Layanan Cetak</span>
            <span className="text-[#F65456] font-bold text-right">{lead.service}</span>
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-gray-500 font-medium">Waktu Kirim</span>
            <span className="text-gray-600 font-mono text-right">{formatLeadDate(lead.createdAt)}</span>
          </div>
        </div>

        {/* Message Content */}
        {lead.message && (
          <div className="bg-gray-50/80 border border-gray-200/90 rounded-2xl p-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 font-mono">
              Pesan / Kebutuhan Cetak
            </p>
            <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-sans whitespace-pre-wrap">
              {lead.message}
            </p>
          </div>
        )}

        {/* Status Updater */}
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 font-mono">
            Perbarui Status Lead
          </p>
          <div className="grid grid-cols-2 gap-2">
            {ALL_STATUS_KEYS.map((key) => {
              const cfg = LEAD_STATUS_CONFIG[key];
              const isActive = lead.status === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onStatusChange(lead.id, key)}
                  className={`text-xs px-3 py-2.5 rounded-xl border font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    isActive
                      ? `${cfg.bg} ${cfg.text} ${cfg.border} ring-2 ring-[#F65456]/20 shadow-xs`
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">{cfg.icon}</span>
                  <span>{cfg.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Delete Button */}
        <div className="pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={() => onDelete(lead.id)}
            className="w-full text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 py-2.5 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">delete</span>
            Hapus Data Lead Ini
          </button>
        </div>
      </div>
    </AdminModal>
  );
}

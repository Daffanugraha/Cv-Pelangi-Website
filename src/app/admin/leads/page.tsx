"use client";

import { useEffect, useState } from "react";
import AdminShell from "../AdminShell";
import { useRouter } from "next/navigation";
import type { LeadItem } from "@/lib/admin/db";

const STATUS_OPTIONS: { value: LeadItem["status"]; label: string; color: string }[] = [
  { value: "new", label: "🟡 Baru Masuk", color: "bg-red-50 text-red-700 border border-red-200" },
  { value: "contacted", label: "🔵 Sudah Dihubungi", color: "bg-blue-50 text-blue-700 border border-blue-200" },
  { value: "sample_sent", label: "🟣 Sampel Terkirim", color: "bg-purple-50 text-purple-700 border border-purple-200" },
  { value: "closed", label: "🟢 Closed / Order", color: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
];

function statusStyle(status: string) {
  return STATUS_OPTIONS.find((s) => s.value === status) ?? STATUS_OPTIONS[0];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminLeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selected, setSelected] = useState<LeadItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function fetchLeads() {
    const res = await fetch("/api/admin/leads");
    if (res.status === 401) { router.push("/admin"); return; }
    setLeads(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchLeads(); }, []);

  async function handleStatusChange(id: string, status: LeadItem["status"]) {
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
    if (selected?.id === id) setSelected((s) => s ? { ...s, status } : null);
  }

  async function handleDelete(id: string) {
    await fetch("/api/admin/leads", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setDeleteId(null);
    setSelected(null);
    fetchLeads();
  }

  const filtered = filterStatus === "all" ? leads : leads.filter((l) => l.status === filterStatus);

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-64 text-gray-400">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-bracket-border rounded-full animate-spin" />
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-gray-900">Kotak Masuk Lead</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5 font-sans">
            {leads.filter((l) => l.status === "new").length} lead baru
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
            filterStatus === "all"
              ? "bg-bracket-border text-white shadow-sm font-bold"
              : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50 shadow-sm"
          }`}
        >
          Semua ({leads.length})
        </button>
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s.value}
            onClick={() => setFilterStatus(s.value)}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
              filterStatus === s.value
                ? "bg-bracket-border text-white shadow-sm font-bold"
                : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50 shadow-sm"
            }`}
          >
            {s.label} ({leads.filter((l) => l.status === s.value).length})
          </button>
        ))}
      </div>

      {/* Table / List */}
      <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <span className="material-symbols-outlined text-5xl">inbox</span>
            <p className="mt-2 text-sm font-semibold text-gray-600">Tidak ada data lead pada kategori ini.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map((lead) => {
              const s = statusStyle(lead.status);
              return (
                <div
                  key={lead.id}
                  onClick={() => setSelected(lead)}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/80 cursor-pointer transition select-none"
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-xl bg-bracket-border/10 border border-bracket-border/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-extrabold text-bracket-border">
                      {lead.name.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  {/* Main Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{lead.name}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {lead.company || "Perseorangan"} · {lead.service}
                    </p>
                  </div>

                  {/* Status */}
                  <span className={`hidden sm:flex shrink-0 text-xs px-2.5 py-1 rounded-full border font-semibold ${s.color}`}>
                    {s.label}
                  </span>

                  {/* Date */}
                  <span className="hidden md:block shrink-0 text-xs text-gray-400 font-mono">
                    {formatDate(lead.createdAt)}
                  </span>

                  <span className="material-symbols-outlined text-gray-400 text-lg shrink-0">
                    chevron_right
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Drawer Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:justify-end z-50 p-0 sm:p-4 animate-fade-in">
          <div className="bg-white border border-gray-200 rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div>
                <p className="font-heading font-bold text-gray-900 text-base">{selected.name}</p>
                <p className="text-xs text-bracket-border font-medium mt-0.5">{selected.company || "Perseorangan"}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 flex items-center justify-center transition cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${selected.phone.replace(/\D/g, "").replace(/^0/, "62")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-3 py-2.5 rounded-xl transition shadow-sm cursor-pointer active:scale-95"
                >
                  <span className="material-symbols-outlined text-lg">chat</span>
                  Hubungi WA
                </a>
                {selected.email ? (
                  <a
                    href={`mailto:${selected.email}`}
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
              <div className="bg-gray-50 border border-gray-200 rounded-2xl divide-y divide-gray-200/80 overflow-hidden">
                {[
                  { label: "Nomor WhatsApp", value: selected.phone },
                  { label: "Alamat Email", value: selected.email || "-" },
                  { label: "Layanan Cetak", value: selected.service },
                  { label: "Waktu Pengiriman", value: formatDate(selected.createdAt) },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center px-4 py-3">
                    <span className="text-xs text-gray-500 font-medium">{row.label}</span>
                    <span className="text-xs text-gray-900 font-semibold text-right max-w-[60%]">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Message */}
              {selected.message && (
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 font-mono">Pesan / Kebutuhan</p>
                  <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-sans">{selected.message}</p>
                </div>
              )}

              {/* Status Changer */}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 font-mono">Perbarui Status Lead</p>
                <div className="grid grid-cols-2 gap-2">
                  {STATUS_OPTIONS.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => handleStatusChange(selected.id, s.value)}
                      className={`text-xs px-3 py-2.5 rounded-xl border font-semibold transition cursor-pointer ${
                        selected.status === s.value
                          ? s.color + " ring-1 ring-black/10 font-bold"
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => setDeleteId(selected.id)}
                className="w-full text-xs sm:text-sm text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 py-2.5 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <span className="material-symbols-outlined text-base">delete</span>
                Hapus Data Lead Ini
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <p className="font-heading font-bold text-gray-900 text-base mb-1">Hapus Lead Ini?</p>
            <p className="text-xs text-gray-500 mb-5">Data lead akan dihapus secara permanen dari server.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold py-2.5 rounded-xl transition cursor-pointer active:scale-95 shadow-sm"
              >
                Ya, Hapus
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-gray-200 text-gray-700 text-xs sm:text-sm py-2.5 rounded-xl hover:bg-gray-50 transition cursor-pointer"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

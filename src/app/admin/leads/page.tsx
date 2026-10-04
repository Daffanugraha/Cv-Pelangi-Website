"use client";

import { useEffect, useState } from "react";
import AdminShell from "../AdminShell";
import { useRouter } from "next/navigation";
import type { LeadItem } from "@/lib/admin/db";

const STATUS_OPTIONS: { value: LeadItem["status"]; label: string; color: string }[] = [
  { value: "new", label: "🟡 Baru Masuk", color: "bg-yellow-500/20 text-yellow-400 border-yellow-600/30" },
  { value: "contacted", label: "🔵 Sudah Dihubungi", color: "bg-blue-500/20 text-blue-400 border-blue-600/30" },
  { value: "sample_sent", label: "🟣 Sampel Terkirim", color: "bg-purple-500/20 text-purple-400 border-purple-600/30" },
  { value: "closed", label: "🟢 Closed / Order", color: "bg-emerald-500/20 text-emerald-400 border-emerald-600/30" },
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
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-gray-700 border-t-violet-500 rounded-full animate-spin" />
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Kotak Masuk Lead</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            {leads.filter((l) => l.status === "new").length} lead baru perlu direspon
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
            filterStatus === "all" ? "bg-violet-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"
          }`}
        >
          Semua ({leads.length})
        </button>
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s.value}
            onClick={() => setFilterStatus(s.value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              filterStatus === s.value ? "bg-violet-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"
            }`}
          >
            {s.label} ({leads.filter((l) => l.status === s.value).length})
          </button>
        ))}
      </div>

      {/* Table / List */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-600">
            <span className="material-symbols-outlined text-5xl">inbox</span>
            <p className="mt-2">Tidak ada lead di kategori ini.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {filtered.map((lead) => {
              const s = statusStyle(lead.status);
              return (
                <div
                  key={lead.id}
                  onClick={() => setSelected(lead)}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-gray-800/50 cursor-pointer transition"
                >
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-violet-600/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-violet-400">
                      {lead.name.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  {/* Main Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{lead.name}</p>
                    <p className="text-xs text-gray-400 truncate">{lead.company} · {lead.service}</p>
                  </div>

                  {/* Status */}
                  <span className={`hidden sm:flex flex-shrink-0 text-xs px-2.5 py-1 rounded-full border font-medium ${s.color}`}>
                    {s.label}
                  </span>

                  {/* Date */}
                  <span className="hidden md:block flex-shrink-0 text-xs text-gray-500">
                    {formatDate(lead.createdAt)}
                  </span>

                  <span className="material-symbols-outlined text-gray-600 text-lg flex-shrink-0">chevron_right</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Drawer */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center sm:justify-end z-50 p-0 sm:p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800 sticky top-0 bg-gray-900">
              <div>
                <p className="font-semibold text-white">{selected.name}</p>
                <p className="text-xs text-gray-500">{selected.company}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white transition">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Contact */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${selected.phone.replace(/\D/g, "").replace(/^0/, "62")}`}
                  target="_blank"
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-3 py-2.5 rounded-xl transition"
                >
                  <span className="material-symbols-outlined text-lg">chat</span>
                  WhatsApp
                </a>
                {selected.email && (
                  <a
                    href={`mailto:${selected.email}`}
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-semibold px-3 py-2.5 rounded-xl transition"
                  >
                    <span className="material-symbols-outlined text-lg">mail</span>
                    Email
                  </a>
                )}
              </div>

              {/* Info Grid */}
              <div className="bg-gray-800 rounded-xl divide-y divide-gray-700">
                {[
                  { label: "No. HP", value: selected.phone },
                  { label: "Email", value: selected.email || "-" },
                  { label: "Layanan", value: selected.service },
                  { label: "Masuk", value: formatDate(selected.createdAt) },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between px-4 py-2.5">
                    <span className="text-xs text-gray-400">{row.label}</span>
                    <span className="text-xs text-white font-medium text-right max-w-[60%]">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Message */}
              {selected.message && (
                <div className="bg-gray-800 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Pesan</p>
                  <p className="text-sm text-white">{selected.message}</p>
                </div>
              )}

              {/* Status Changer */}
              <div>
                <p className="text-xs text-gray-400 mb-2">Ubah Status</p>
                <div className="grid grid-cols-2 gap-2">
                  {STATUS_OPTIONS.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => handleStatusChange(selected.id, s.value)}
                      className={`text-xs px-3 py-2.5 rounded-xl border font-medium transition ${
                        selected.status === s.value
                          ? s.color + " border"
                          : "bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delete */}
              <button
                onClick={() => setDeleteId(selected.id)}
                className="w-full text-sm text-red-400 hover:bg-red-950 border border-gray-800 py-2.5 rounded-xl transition flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">delete</span>
                Hapus Lead Ini
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-sm w-full">
            <p className="font-semibold text-white mb-1">Hapus lead ini?</p>
            <p className="text-sm text-gray-400 mb-5">Data tidak bisa dipulihkan kembali.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold py-2.5 rounded-xl transition">
                Ya, Hapus
              </button>
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-700 text-gray-300 text-sm py-2.5 rounded-xl hover:bg-gray-800 transition">
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

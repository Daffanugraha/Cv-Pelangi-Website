"use client";

import { useEffect, useState, useMemo } from "react";
import AdminShell from "../AdminShell";
import { useRouter } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import LeadCardItem, { LEAD_STATUS_CONFIG } from "@/components/admin/leads/LeadCardItem";
import LeadDetailModal from "@/components/admin/leads/LeadDetailModal";
import type { LeadItem } from "@/lib/admin/db";

export default function AdminLeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<LeadItem | null>(null);

  // Delete state
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function fetchLeads() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      if (res.status === 401) {
        router.push("/admin");
        return;
      }
      const data = await res.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Gagal memuat lead:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeads();
  }, [router]);

  async function handleStatusChange(id: string, status: LeadItem["status"]) {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status } : l))
        );
        if (selected?.id === id) {
          setSelected((s) => (s ? { ...s, status } : null));
        }
      }
    } catch (err) {
      console.error("Gagal update status lead:", err);
    }
  }

  async function handleConfirmDelete() {
    if (!deleteTargetId) return;

    setDeleting(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteTargetId }),
      });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== deleteTargetId));
        if (selected?.id === deleteTargetId) {
          setSelected(null);
        }
        setDeleteTargetId(null);
      }
    } catch (err) {
      console.error("Gagal menghapus lead:", err);
    } finally {
      setDeleting(false);
    }
  }

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const matchStatus = filterStatus === "all" || l.status === filterStatus;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        l.name.toLowerCase().includes(q) ||
        (l.company && l.company.toLowerCase().includes(q)) ||
        l.service.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        (l.email && l.email.toLowerCase().includes(q));

      return matchStatus && matchSearch;
    });
  }, [leads, filterStatus, search]);

  const newCount = leads.filter((l) => l.status === "new").length;
  const contactedCount = leads.filter((l) => l.status === "contacted").length;
  const closedCount = leads.filter((l) => l.status === "closed").length;

  return (
    <AdminShell>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <AdminPageHeader
          title="Kotak Masuk Lead"
          description="Daftar permintaan penawaran harga, konsultasi, dan kontak prospek cetak."
          badge={`${leads.length} Total Lead`}
          badgeVariant="primary"
          actions={
            <button
              type="button"
              onClick={fetchLeads}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              <span>Segarkan</span>
            </button>
          }
        />

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <AdminStatCard
            label="Total Masuk"
            value={leads.length}
            icon="inbox"
            color="gray"
            active={filterStatus === "all"}
            onClick={() => setFilterStatus("all")}
          />
          <AdminStatCard
            label="Lead Baru"
            value={newCount}
            icon="mark_email_unread"
            color="red"
            active={filterStatus === "new"}
            onClick={() => setFilterStatus("new")}
          />
          <AdminStatCard
            label="Dihubungi"
            value={contactedCount}
            icon="chat"
            color="blue"
            active={filterStatus === "contacted"}
            onClick={() => setFilterStatus("contacted")}
          />
          <AdminStatCard
            label="Closed / Order"
            value={closedCount}
            icon="verified"
            color="emerald"
            active={filterStatus === "closed"}
            onClick={() => setFilterStatus("closed")}
          />
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama lead, perusahaan, kontak HP..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                filterStatus === "all"
                  ? "bg-[#F65456] text-white shadow-xs"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Semua ({leads.length})
            </button>
            {(["new", "contacted", "sample_sent", "closed"] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  filterStatus === st
                    ? "bg-[#F65456] text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {LEAD_STATUS_CONFIG[st].label} ({leads.filter((l) => l.status === st).length})
              </button>
            ))}
          </div>
        </div>

        {/* List Content */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-[#F65456] rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs sm:text-sm text-gray-500">Memuat data leads...</p>
          </div>
        ) : filtered.length === 0 ? (
          <AdminEmptyState
            icon="inbox"
            title="Tidak ada data lead pada kategori ini"
            description="Silakan sesuaikan filter status atau kata kunci pencarian Anda."
            action={
              (filterStatus !== "all" || search) ? (
                <button
                  type="button"
                  onClick={() => {
                    setFilterStatus("all");
                    setSearch("");
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111216] text-white text-xs font-bold hover:bg-black transition cursor-pointer"
                >
                  Reset Filter
                </button>
              ) : undefined
            }
          />
        ) : (
          <div className="bg-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-xs divide-y divide-gray-100">
            {filtered.map((lead) => (
              <LeadCardItem
                key={lead.id}
                lead={lead}
                onClick={() => setSelected(lead)}
              />
            ))}
          </div>
        )}

        {/* Detail Modal */}
        <LeadDetailModal
          lead={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
          onDelete={(id) => setDeleteTargetId(id)}
        />

        {/* Delete Confirmation */}
        <AdminConfirmDialog
          isOpen={!!deleteTargetId}
          title="Hapus Data Lead?"
          message="Apakah Anda yakin ingin menghapus data lead ini? Data yang telah dihapus tidak dapat dipulihkan."
          confirmLabel="Ya, Hapus Lead"
          loading={deleting}
          onConfirm={handleConfirmDelete}
          onClose={() => setDeleteTargetId(null)}
        />
      </div>
    </AdminShell>
  );
}

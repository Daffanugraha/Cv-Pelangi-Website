"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import AdminShell from "../AdminShell";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import JobCardItem from "@/components/admin/karir/JobCardItem";
import JobFormModal from "@/components/admin/karir/JobFormModal";
import type { CareerJobItem, JobApplicantItem } from "@/lib/admin/db";

const DIVISIONS = ["Finance", "Marketing", "Operational", "Production", "Warehouse"] as const;

export default function AdminKarirPage() {
  const [jobs, setJobs] = useState<CareerJobItem[]>([]);
  const [applicants, setApplicants] = useState<JobApplicantItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDivision, setFilterDivision] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<CareerJobItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Collapsible Job Card
  const [expandedJobIds, setExpandedJobIds] = useState<Record<string, boolean>>({});
  const toggleExpandJob = (id: string) => {
    setExpandedJobIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Delete Confirm
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function fetchJobs() {
    try {
      setLoading(true);
      const [jobsRes, appRes] = await Promise.all([
        fetch("/api/admin/jobs"),
        fetch("/api/admin/applicants"),
      ]);
      if (jobsRes.ok) {
        const data = await jobsRes.json();
        setJobs(data);
      }
      if (appRes.ok) {
        const appData = await appRes.json();
        setApplicants(Array.isArray(appData) ? appData : []);
      }
    } catch (err) {
      console.error("Gagal memuat lowongan atau pelamar:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  // Filter Jobs Memo
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.division.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.qualifications?.some((q) => q.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchDivision = filterDivision === "ALL" || job.division === filterDivision;
      const matchStatus =
        filterStatus === "ALL" ||
        (filterStatus === "OPEN" && job.isOpen) ||
        (filterStatus === "CLOSED" && !job.isOpen);

      return matchSearch && matchDivision && matchStatus;
    });
  }, [jobs, searchQuery, filterDivision, filterStatus]);

  // Applicant Count Stats per Job
  const jobApplicantStats = useMemo(() => {
    const stats: Record<string, { total: number; newCount: number }> = {};
    for (const app of applicants) {
      const key = (app.jobTitle || app.jobId || "Lainnya").trim();
      if (!stats[key]) stats[key] = { total: 0, newCount: 0 };
      stats[key].total += 1;
      if (app.status === "new") stats[key].newCount += 1;
    }
    return stats;
  }, [applicants]);

  const getApplicantCountForJob = (job: CareerJobItem) => {
    if (jobApplicantStats[job.title]) return jobApplicantStats[job.title];
    if (jobApplicantStats[job.id]) return jobApplicantStats[job.id];
    const match = Object.entries(jobApplicantStats).find(
      ([k]) =>
        k.toLowerCase() === job.title.toLowerCase() ||
        k.toLowerCase() === job.id.toLowerCase()
    );
    return match ? match[1] : { total: 0, newCount: 0 };
  };

  // Stats Metrics
  const openCount = jobs.filter((j) => j.isOpen).length;
  const closedCount = jobs.length - openCount;
  const newApplicantCount = applicants.filter((a) => a.status === "new").length;

  // Actions
  const handleSaveJob = async (payload: {
    title: string;
    division: CareerJobItem["division"];
    isOpen: boolean;
    qualifications: string[];
    responsibilities: string[];
  }) => {
    setSaving(true);
    try {
      if (editingJob) {
        const res = await fetch("/api/admin/jobs", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingJob.id, ...payload }),
        });
        if (res.ok) {
          const updated = await res.json();
          setJobs(jobs.map((j) => (j.id === updated.id ? updated : j)));
          setIsModalOpen(false);
        }
      } else {
        const res = await fetch("/api/admin/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const created = await res.json();
          setJobs([created, ...jobs]);
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error("Gagal menyimpan lowongan:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleJobStatus = async (job: CareerJobItem) => {
    const updatedIsOpen = !job.isOpen;
    try {
      const res = await fetch("/api/admin/jobs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: job.id, isOpen: updatedIsOpen }),
      });
      if (res.ok) {
        setJobs(jobs.map((j) => (j.id === job.id ? { ...j, isOpen: updatedIsOpen } : j)));
      }
    } catch (err) {
      console.error("Gagal mengubah status lowongan:", err);
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/jobs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setJobs(jobs.filter((j) => j.id !== id));
        setDeletingId(null);
      }
    } catch (err) {
      console.error("Gagal menghapus lowongan:", err);
    }
  };

  return (
    <AdminShell>
      {/* 1. Header */}
      <AdminPageHeader
        title="Lowongan Karir"
        description="Kelola publikasi posisi rekrutmen kerja, syarat kualifikasi, dan penempatan CV Pelangi UV."
        badge={`${openCount} Lowongan Dibuka`}
        badgeVariant="success"
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/admin/pelamar"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition shadow-2xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">badge</span>
              <span>Lihat Berkas Pelamar ({applicants.length})</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                setEditingJob(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F65456] hover:bg-[#d61e1b] text-white text-xs font-bold shadow-md transition cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>Tambah Lowongan</span>
            </button>
          </div>
        }
      />

      {/* 2. Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        <AdminStatCard
          icon="work"
          label="Total Lowongan"
          value={jobs.length}
          color="red"
          onClick={() => {
            setFilterDivision("ALL");
            setFilterStatus("ALL");
          }}
        />
        <AdminStatCard
          icon="check_circle"
          label="Dibuka (Aktif)"
          value={openCount}
          sublabel="Tayang di website"
          color="emerald"
          active={filterStatus === "OPEN"}
          onClick={() => setFilterStatus(filterStatus === "OPEN" ? "ALL" : "OPEN")}
        />
        <AdminStatCard
          icon="cancel"
          label="Ditutup (Arsip)"
          value={closedCount}
          sublabel="Tidak menerima lamaran"
          color="gray"
          active={filterStatus === "CLOSED"}
          onClick={() => setFilterStatus(filterStatus === "CLOSED" ? "ALL" : "CLOSED")}
        />
        <AdminStatCard
          icon="badge"
          label="Berkas Masuk"
          value={applicants.length}
          sublabel={newApplicantCount > 0 ? `+${newApplicantCount} berkas baru` : "Semua telah ditinjau"}
          color="amber"
          onClick={() => (window.location.href = "/admin/pelamar")}
        />
      </div>

      {/* 3. Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-xs mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Cari nama lowongan, divisi, atau kualifikasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456] focus:bg-white transition"
            />
          </div>

          <div className="flex gap-2.5">
            <select
              value={filterDivision}
              onChange={(e) => setFilterDivision(e.target.value)}
              className="px-3.5 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456] font-semibold text-gray-700"
            >
              <option value="ALL">Semua Divisi</option>
              {DIVISIONS.map((d) => (
                <option key={d} value={d}>
                  Divisi {d}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3.5 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456] font-semibold text-gray-700"
            >
              <option value="ALL">Semua Status</option>
              <option value="OPEN">● Dibuka</option>
              <option value="CLOSED">✕ Ditutup</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Jobs List */}
      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-white rounded-2xl border border-gray-200 p-5" />
          ))}
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <JobCardItem
              key={job.id}
              job={job}
              applicantCount={getApplicantCountForJob(job)}
              isExpanded={!!expandedJobIds[job.id]}
              onToggleExpand={toggleExpandJob}
              onEdit={(j) => {
                setEditingJob(j);
                setIsModalOpen(true);
              }}
              onToggleStatus={handleToggleJobStatus}
              onDelete={(id) => setDeletingId(id)}
            />
          ))}
        </div>
      ) : (
        <AdminEmptyState
          icon="work_off"
          title="Tidak Ada Lowongan Ditemukan"
          description={
            searchQuery || filterDivision !== "ALL" || filterStatus !== "ALL"
              ? "Tidak ada posisi kerja yang sesuai dengan kata kunci filter pencarian Anda."
              : "Belum ada lowongan kerja yang dibuat. Silakan tambahkan lowongan pertama."
          }
          action={
            <button
              type="button"
              onClick={() => {
                setEditingJob(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F65456] text-white text-xs font-bold shadow-md hover:bg-[#d61e1b] transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>Tambah Lowongan Baru</span>
            </button>
          }
        />
      )}

      {/* 5. Job Form Modal */}
      <JobFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingJob={editingJob}
        onSave={handleSaveJob}
        saving={saving}
      />

      {/* 6. Confirm Delete Dialog */}
      <AdminConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={() => {
          if (deletingId) handleDeleteJob(deletingId);
        }}
        title="Hapus Lowongan Kerja?"
        message="Lowongan ini akan dihapus secara permanen dari database dan tidak lagi ditampilkan pada portal website."
        confirmLabel="Ya, Hapus Lowongan"
      />
    </AdminShell>
  );
}

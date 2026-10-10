"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AdminShell from "../AdminShell";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import ApplicantCardItem from "@/components/admin/pelamar/ApplicantCardItem";
import ApplicantDetailModal from "@/components/admin/pelamar/ApplicantDetailModal";
import ApplicantRejectionModal from "@/components/admin/pelamar/ApplicantRejectionModal";
import ApplicantInterviewModal from "@/components/admin/pelamar/ApplicantInterviewModal";
import { CareerJobItem, JobApplicantItem } from "@/lib/admin/db";

type ApplicantSortOption = "newest" | "oldest" | "name_asc" | "name_desc" | "status";

function formatApplicantDateTime(iso?: string) {
  if (!iso) return { day: "-", date: "-", time: "-", full: "-" };
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return { day: "-", date: "-", time: "-", full: "-" };
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const dayName = days[d.getDay()];
    const dateFormatted = d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const timeFormatted =
      d.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }).replace(".", ":") + " WIB";
    return {
      day: dayName,
      date: dateFormatted,
      time: timeFormatted,
      full: `${dayName}, ${dateFormatted} • ${timeFormatted}`,
    };
  } catch {
    return { day: "-", date: "-", time: "-", full: "-" };
  }
}

function PelamarContent() {
  const searchParams = useSearchParams();
  const initialJobFilter = searchParams.get("posisi") || "ALL";

  const [applicants, setApplicants] = useState<JobApplicantItem[]>([]);
  const [jobs, setJobs] = useState<CareerJobItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & Sort State
  const [applicantSearch, setApplicantSearch] = useState("");
  const [applicantFilterStatus, setApplicantFilterStatus] = useState<string>("ALL");
  const [applicantFilterJob, setApplicantFilterJob] = useState<string>(initialJobFilter);
  const [applicantSort, setApplicantSort] = useState<ApplicantSortOption>("newest");

  // Modal State
  const [selectedApplicant, setSelectedApplicant] = useState<JobApplicantItem | null>(null);
  const [rejectionTarget, setRejectionTarget] = useState<JobApplicantItem | null>(null);
  const [interviewTarget, setInterviewTarget] = useState<JobApplicantItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const p = searchParams.get("posisi");
    if (p) setApplicantFilterJob(p);
  }, [searchParams]);

  async function loadData() {
    try {
      setLoading(true);
      const [appRes, jobRes] = await Promise.all([
        fetch("/api/admin/applicants"),
        fetch("/api/admin/career-jobs"),
      ]);

      if (appRes.ok) {
        const appData = await appRes.json();
        setApplicants(Array.isArray(appData) ? appData : []);
      }
      if (jobRes.ok) {
        const jobData = await jobRes.json();
        setJobs(Array.isArray(jobData) ? jobData : []);
      }
    } catch (err) {
      console.error("Gagal memuat data pelamar:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleUpdateApplicantStatus(applicant: JobApplicantItem, status: JobApplicantItem["status"]) {
    try {
      const res = await fetch("/api/admin/applicants", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: applicant.id, status }),
      });
      if (res.ok) {
        setApplicants((prev) =>
          prev.map((a) => (a.id === applicant.id ? { ...a, status } : a))
        );
        if (selectedApplicant && selectedApplicant.id === applicant.id) {
          setSelectedApplicant((prev) => (prev ? { ...prev, status } : null));
        }
        if (status === "rejected") {
          setRejectionTarget(applicant);
        }
        if (status === "interview") {
          setInterviewTarget(applicant);
        }
      }
    } catch (err) {
      console.error("Gagal update status pelamar:", err);
    }
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      const res = await fetch(`/api/admin/applicants?id=${encodeURIComponent(deleteTarget.id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setApplicants((prev) => prev.filter((a) => a.id !== deleteTarget.id));
        if (selectedApplicant && selectedApplicant.id === deleteTarget.id) {
          setSelectedApplicant(null);
        }
        setDeleteTarget(null);
      }
    } catch (err) {
      console.error("Gagal hapus pelamar:", err);
    } finally {
      setDeleting(false);
    }
  }

  // Count applicants per job
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

  // Filter Applicants
  const filteredApplicants = useMemo(() => {
    return applicants.filter((app) => {
      const q = applicantSearch.toLowerCase().trim();
      const matchSearch =
        !q ||
        app.name.toLowerCase().includes(q) ||
        app.jobTitle.toLowerCase().includes(q) ||
        app.phone.includes(q) ||
        (app.email && app.email.toLowerCase().includes(q));

      const matchStatus =
        applicantFilterStatus === "ALL" || app.status === applicantFilterStatus;

      const matchJob =
        applicantFilterJob === "ALL" ||
        app.jobTitle.toLowerCase() === applicantFilterJob.toLowerCase() ||
        app.jobId === applicantFilterJob;

      return matchSearch && matchStatus && matchJob;
    });
  }, [applicants, applicantSearch, applicantFilterStatus, applicantFilterJob]);

  // Sort Applicants
  const sortedApplicants = useMemo(() => {
    const list = [...filteredApplicants];
    switch (applicantSort) {
      case "newest":
        list.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
        break;
      case "oldest":
        list.sort(
          (a, b) =>
            new Date(a.createdAt || 0).getTime() -
            new Date(b.createdAt || 0).getTime()
        );
        break;
      case "name_asc":
        list.sort((a, b) => a.name.localeCompare(b.name, "id-ID"));
        break;
      case "name_desc":
        list.sort((a, b) => b.name.localeCompare(a.name, "id-ID"));
        break;
      case "status": {
        const order: Record<string, number> = {
          new: 0,
          reviewed: 1,
          interview: 2,
          accepted: 3,
          rejected: 4,
        };
        list.sort(
          (a, b) => (order[a.status] ?? 99) - (order[b.status] ?? 99)
        );
        break;
      }
    }
    return list;
  }, [filteredApplicants, applicantSort]);

  // KPIs
  const newApplicantCount = applicants.filter((a) => a.status === "new").length;
  const interviewCount = applicants.filter((a) => a.status === "interview").length;
  const acceptedCount = applicants.filter((a) => a.status === "accepted").length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <AdminPageHeader
        title="Berkas Pelamar Masuk"
        description="Pantau kandidat, evaluasi kualifikasi, jadwal interview, dan hubungi pelamar via WhatsApp."
        badge={`${applicants.length} Total`}
        badgeVariant="primary"
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/admin/karir"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition shadow-xs"
            >
              <span className="material-symbols-outlined text-sm text-[#F65456]">work</span>
              <span>Kelola Lowongan</span>
            </Link>
            <button
              type="button"
              onClick={loadData}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition shadow-xs cursor-pointer"
              title="Refresh Data"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              <span>Segarkan</span>
            </button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <AdminStatCard
          label="Total Pelamar"
          value={applicants.length}
          icon="groups"
          color="gray"
          active={applicantFilterStatus === "ALL"}
          onClick={() => setApplicantFilterStatus("ALL")}
        />
        <AdminStatCard
          label="Berkas Baru"
          value={newApplicantCount}
          icon="mark_email_unread"
          color="red"
          active={applicantFilterStatus === "new"}
          onClick={() => setApplicantFilterStatus("new")}
        />
        <AdminStatCard
          label="Interview"
          value={interviewCount}
          icon="event"
          color="blue"
          active={applicantFilterStatus === "interview"}
          onClick={() => setApplicantFilterStatus("interview")}
        />
        <AdminStatCard
          label="Diterima"
          value={acceptedCount}
          icon="verified"
          color="emerald"
          active={applicantFilterStatus === "accepted"}
          onClick={() => setApplicantFilterStatus("accepted")}
        />
      </div>

      {/* Toolbar Pencarian, Filter & Sorting */}
      <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Input Pencarian */}
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
            search
          </span>
          <input
            type="text"
            value={applicantSearch}
            onChange={(e) => setApplicantSearch(e.target.value)}
            placeholder="Cari nama kandidat, nomor HP, email..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456]"
          />
        </div>

        {/* Filter Controls Group */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Dropdown Posisi */}
          <select
            value={applicantFilterJob}
            onChange={(e) => setApplicantFilterJob(e.target.value)}
            className="px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-semibold focus:outline-none focus:border-[#F65456] max-w-[210px] truncate"
          >
            <option value="ALL">Semua Posisi ({applicants.length})</option>
            {jobs.map((job) => {
              const stats = getApplicantCountForJob(job);
              return (
                <option key={job.id} value={job.title}>
                  {job.title} ({stats.total})
                </option>
              );
            })}
          </select>

          {/* Dropdown Filter Status */}
          <select
            value={applicantFilterStatus}
            onChange={(e) => setApplicantFilterStatus(e.target.value)}
            className="px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-semibold focus:outline-none focus:border-[#F65456]"
          >
            <option value="ALL">Semua Status</option>
            <option value="new">Baru ({newApplicantCount})</option>
            <option value="reviewed">Ditinjau</option>
            <option value="interview">Interview ({interviewCount})</option>
            <option value="accepted">Diterima ({acceptedCount})</option>
            <option value="rejected">Ditolak</option>
          </select>

          {/* Dropdown Urutkan / Sort */}
          <select
            value={applicantSort}
            onChange={(e) => setApplicantSort(e.target.value as ApplicantSortOption)}
            className="px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-semibold focus:outline-none focus:border-[#F65456]"
          >
            <option value="newest">🕒 Submit: Terbaru</option>
            <option value="oldest">⏳ Submit: Terlama</option>
            <option value="name_asc">🔤 Nama: A → Z</option>
            <option value="name_desc">🔤 Nama: Z → A</option>
            <option value="status">📊 Status Seleksi</option>
          </select>

          {/* Reset Filter Button if active */}
          {(applicantFilterJob !== "ALL" || applicantFilterStatus !== "ALL" || applicantSearch) && (
            <button
              type="button"
              onClick={() => {
                setApplicantFilterJob("ALL");
                setApplicantFilterStatus("ALL");
                setApplicantSearch("");
              }}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-[#F65456] bg-red-50 hover:bg-red-100 transition cursor-pointer"
              title="Reset Semua Filter"
            >
              <span className="material-symbols-outlined text-sm">restart_alt</span>
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* List Pelamar */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-[#F65456] rounded-full animate-spin" />
        </div>
      ) : sortedApplicants.length === 0 ? (
        <AdminEmptyState
          icon="person_search"
          title="Tidak ada berkas pelamar yang cocok"
          description="Coba sesuaikan filter status, posisi, atau kata kunci pencarian."
          action={
            (applicantFilterJob !== "ALL" || applicantFilterStatus !== "ALL" || applicantSearch) ? (
              <button
                type="button"
                onClick={() => {
                  setApplicantFilterJob("ALL");
                  setApplicantFilterStatus("ALL");
                  setApplicantSearch("");
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#111216] hover:bg-black transition cursor-pointer"
              >
                Reset Filter
              </button>
            ) : undefined
          }
        />
      ) : (
        <div className="space-y-4">
          {sortedApplicants.map((applicant) => (
            <ApplicantCardItem
              key={applicant.id}
              applicant={applicant}
              dateTime={formatApplicantDateTime(applicant.createdAt)}
              onUpdateStatus={handleUpdateApplicantStatus}
              onOpenDetail={(app) => setSelectedApplicant(app)}
              onOpenRejection={(app) => setRejectionTarget(app)}
              onOpenInterview={(app) => setInterviewTarget(app)}
              onDelete={(id, name) => setDeleteTarget({ id, name })}
            />
          ))}
        </div>
      )}

      {/* Modal Detail Pelamar */}
      <ApplicantDetailModal
        applicant={selectedApplicant}
        dateTime={formatApplicantDateTime(selectedApplicant?.createdAt)}
        onClose={() => setSelectedApplicant(null)}
        onUpdateStatus={handleUpdateApplicantStatus}
        onOpenInterview={(app) => setInterviewTarget(app)}
      />

      {/* Modal Template Undangan Interview WhatsApp */}
      <ApplicantInterviewModal
        applicant={interviewTarget}
        onClose={() => setInterviewTarget(null)}
      />

      {/* Modal Template Penolakan WhatsApp */}
      <ApplicantRejectionModal
        applicant={rejectionTarget}
        onClose={() => setRejectionTarget(null)}
      />

      {/* Dialog Konfirmasi Hapus */}
      <AdminConfirmDialog
        isOpen={!!deleteTarget}
        title="Hapus Berkas Pelamar?"
        message={`Apakah Anda yakin ingin menghapus data pelamar ${deleteTarget?.name}? Berkas CV dan data riwayat pelamar akan dihapus secara permanen.`}
        confirmLabel="Ya, Hapus Berkas"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export default function AdminPelamarPage() {
  return (
    <AdminShell>
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20 text-gray-400">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-[#F65456] rounded-full animate-spin" />
          </div>
        }
      >
        <PelamarContent />
      </Suspense>
    </AdminShell>
  );
}

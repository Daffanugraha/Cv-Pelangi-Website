"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AdminShell from "../AdminShell";
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
  const [detailTab, setDetailTab] = useState<"identitas" | "pengalaman" | "komitmen" | "skill" | "berkas">("identitas");
  const [rejectionTarget, setRejectionTarget] = useState<JobApplicantItem | null>(null);
  const [copiedReject, setCopiedReject] = useState(false);

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
          setCopiedReject(false);
        }
      }
    } catch (err) {
      console.error("Gagal update status pelamar:", err);
    }
  }

  async function handleDeleteApplicant(id: string, name: string) {
    if (!confirm(`Hapus berkas pelamar ${name}?`)) return;
    try {
      const res = await fetch(`/api/admin/applicants?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setApplicants((prev) => prev.filter((a) => a.id !== id));
        if (selectedApplicant && selectedApplicant.id === id) {
          setSelectedApplicant(null);
        }
      }
    } catch (err) {
      console.error("Gagal hapus pelamar:", err);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#F65456] text-2xl">badge</span>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-gray-900 tracking-tight">
              Berkas Pelamar Masuk
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Pantau kandidat, evaluasi kualifikasi, jadwal interview, dan hubungi pelamar via WhatsApp.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/karir"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition shadow-sm"
          >
            <span className="material-symbols-outlined text-sm text-[#F65456]">work</span>
            <span>Kelola Lowongan</span>
          </Link>

          <button
            type="button"
            onClick={loadData}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition shadow-sm cursor-pointer"
            title="Refresh Data"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            <span>Segarkan</span>
          </button>
        </div>
      </div>

      {/* KPI Cards (4 Kolom Rapi) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <p className="text-[11px] font-bold text-gray-500 uppercase font-mono">Total Pelamar</p>
          <p className="text-2xl font-heading font-extrabold text-gray-900 mt-1">{applicants.length}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-red-200 shadow-sm">
          <p className="text-[11px] font-bold text-[#F65456] uppercase font-mono">Berkas Baru</p>
          <p className="text-2xl font-heading font-extrabold text-[#F65456] mt-1">{newApplicantCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-sm">
          <p className="text-[11px] font-bold text-blue-700 uppercase font-mono">Tahap Interview</p>
          <p className="text-2xl font-heading font-extrabold text-blue-700 mt-1">{interviewCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-sm">
          <p className="text-[11px] font-bold text-emerald-700 uppercase font-mono">Diterima</p>
          <p className="text-2xl font-heading font-extrabold text-emerald-700 mt-1">{acceptedCount}</p>
        </div>
      </div>

      {/* Toolbar Pencarian, Filter & Sorting (Satu Baris Sejajar & Proporsional) */}
      <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
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

      {/* List Pelamar - Card ATS Profesional 3 Tingkat */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-[#F65456] rounded-full animate-spin" />
        </div>
      ) : sortedApplicants.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-gray-200 text-gray-500">
          <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">person_search</span>
          <p className="text-base font-bold text-gray-700">Tidak ada berkas pelamar yang cocok</p>
          <p className="text-xs text-gray-500 mt-1">
            Coba sesuaikan filter status, posisi, atau kata kunci pencarian.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedApplicants.map((applicant) => {
            const dt = formatApplicantDateTime(applicant.createdAt);
            const initials = applicant.name
              ? applicant.name
                  .split(" ")
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : "PL";

            return (
              <div
                key={applicant.id}
                className="bg-white rounded-2xl border border-gray-200 hover:border-gray-300 shadow-sm transition hover:shadow-md overflow-hidden"
              >
                {/* Tingkat 1: Header Card (Profil Utama + Waktu Submit Lengkap) */}
                <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-gray-50/60 to-white">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Avatar Inisial */}
                    <div className="w-10 h-10 rounded-xl bg-[#121316] text-white font-heading font-extrabold text-sm flex items-center justify-center shrink-0 shadow-sm tracking-wider">
                      {initials}
                    </div>

                    {/* Nama, Usia, Posisi, Status Pengalaman */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-heading font-extrabold text-base sm:text-lg text-gray-900 truncate">
                          {applicant.name}
                        </h3>
                        {applicant.age && (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold font-mono bg-gray-100 text-gray-600">
                            {applicant.age} Thn
                          </span>
                        )}
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-[#F65456] border border-red-100">
                          {applicant.jobTitle}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            applicant.hasExperience === "yes"
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          }`}
                        >
                          {applicant.hasExperience === "yes" ? "Pernah Bekerja" : "Fresh Graduate"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Badge Waktu Submit (Kanan Atas, Tidak Pernah Turun Baris) */}
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100/90 border border-gray-200 text-xs font-mono text-gray-700 whitespace-nowrap self-start sm:self-auto shrink-0"
                    title={`Waktu Masuk: ${dt.full}`}
                  >
                    <span className="material-symbols-outlined text-[#F65456] text-sm">schedule</span>
                    <span className="font-semibold">{dt.day}, {dt.date}</span>
                    <span className="text-gray-400 font-bold">•</span>
                    <span className="font-extrabold text-gray-900">{dt.time}</span>
                  </div>
                </div>

                {/* Tingkat 2: Grid Data Terstruktur (Pendidikan, HP, Email) */}
                <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs bg-white">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="material-symbols-outlined text-gray-400 text-lg shrink-0">school</span>
                    <div className="min-w-0">
                      <span className="text-gray-400 text-[11px] block font-mono">Pendidikan Terakhir</span>
                      <span className="font-semibold text-gray-800 truncate block">
                        {applicant.education || "-"} {applicant.educationMajor ? `(${applicant.educationMajor})` : ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="material-symbols-outlined text-gray-400 text-lg shrink-0">call</span>
                    <div className="min-w-0">
                      <span className="text-gray-400 text-[11px] block font-mono">WhatsApp / HP</span>
                      <span className="font-mono font-bold text-gray-800 truncate block">
                        {applicant.phone}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="material-symbols-outlined text-gray-400 text-lg shrink-0">mail</span>
                    <div className="min-w-0">
                      <span className="text-gray-400 text-[11px] block font-mono">Email</span>
                      <span className="font-medium text-gray-800 truncate block">
                        {applicant.email || "-"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tingkat 3: Footer Action Bar (Status Selector & Tombol Aksi Sejajar) */}
                <div className="px-4 py-3 sm:px-5 bg-gray-50/70 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                  {/* Status Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-500">Status Seleksi:</span>
                    <select
                      value={applicant.status}
                      onChange={(e) =>
                        handleUpdateApplicantStatus(applicant, e.target.value as any)
                      }
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition outline-none cursor-pointer ${
                        applicant.status === "new"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : applicant.status === "interview"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : applicant.status === "accepted"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : applicant.status === "rejected"
                          ? "bg-gray-100 text-gray-600 border-gray-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      <option value="new">● Berkas Baru</option>
                      <option value="reviewed">Ditinjau</option>
                      <option value="interview">Jadwal Interview</option>
                      <option value="accepted">Diterima</option>
                      <option value="rejected">Ditolak</option>
                    </select>
                  </div>

                  {/* Tombol Aksi */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Tombol WhatsApp */}
                    <a
                      href={`https://wa.me/${applicant.phone.replace(/^0/, "62")}?text=Halo%20${encodeURIComponent(applicant.name)}%2C%20kami%20dari%20Tim%20HRD%20CV%20Pelangi%20UV%20terkait%20lamaran%20posisi%20*${encodeURIComponent(applicant.jobTitle)}*...`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm cursor-pointer"
                      title="Hubungi via WhatsApp"
                    >
                      <span className="material-symbols-outlined text-sm">chat</span>
                      <span>Hubungi WA</span>
                    </a>

                    {/* Tombol Template Tolak */}
                    <button
                      type="button"
                      onClick={() => {
                        setRejectionTarget(applicant);
                        setCopiedReject(false);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold transition cursor-pointer"
                      title="Template Penolakan"
                    >
                      <span className="material-symbols-outlined text-sm text-gray-500">mail</span>
                      <span>Template Tolak</span>
                    </button>

                    {/* Tombol Hapus */}
                    <button
                      type="button"
                      onClick={() => handleDeleteApplicant(applicant.id, applicant.name)}
                      className="w-8 h-8 rounded-xl border border-gray-200 hover:bg-red-50 hover:text-red-600 text-gray-400 flex items-center justify-center transition cursor-pointer"
                      title="Hapus berkas"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>

                    {/* Tombol Utama: Lihat Rincian Berkas */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedApplicant(applicant);
                        setDetailTab("identitas");
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#121316] hover:bg-black text-white text-xs font-bold transition shadow-sm cursor-pointer active:scale-95 ml-1"
                    >
                      <span className="material-symbols-outlined text-sm">visibility</span>
                      <span>Lihat Rincian Berkas</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL DETAIL LENGKAP PROFIL PELAMAR */}
      {/* ======================================================== */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-[#121316] text-white flex items-start justify-between border-b border-white/10 shrink-0">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-bracket-border text-white text-[11px] font-bold font-mono uppercase">
                    Posisi: {selectedApplicant.jobTitle}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono ${
                    selectedApplicant.status === "new"
                      ? "bg-red-500 text-white"
                      : selectedApplicant.status === "interview"
                      ? "bg-blue-500 text-white"
                      : selectedApplicant.status === "accepted"
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-600 text-white"
                  }`}>
                    Status: {selectedApplicant.status.toUpperCase()}
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                  {selectedApplicant.name}
                  {selectedApplicant.age ? ` (${selectedApplicant.age} Tahun)` : ""}
                </h3>

                {(() => {
                  const dt = formatApplicantDateTime(selectedApplicant.createdAt);
                  return (
                    <div className="flex items-center gap-1.5 text-xs text-gray-300 mt-1.5 font-mono">
                      <span className="material-symbols-outlined text-sm text-[#F65456]">schedule</span>
                      <span>
                        Diajukan pada: <strong className="text-white font-bold">{dt.day}, {dt.date}</strong> pukul <strong className="text-white font-bold">{dt.time}</strong>
                      </span>
                    </div>
                  );
                })()}
              </div>

              <button
                type="button"
                onClick={() => setSelectedApplicant(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-bracket-border text-white flex items-center justify-center transition text-xl cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-1 p-2 bg-gray-100 border-b border-gray-200 overflow-x-auto shrink-0 text-xs font-bold">
              <button
                type="button"
                onClick={() => setDetailTab("identitas")}
                className={`px-3 py-2 rounded-xl transition shrink-0 ${
                  detailTab === "identitas"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-gray-200/60"
                }`}
              >
                1. Data Pribadi &amp; Pendidikan
              </button>

              <button
                type="button"
                onClick={() => setDetailTab("pengalaman")}
                className={`px-3 py-2 rounded-xl transition shrink-0 ${
                  detailTab === "pengalaman"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-gray-200/60"
                }`}
              >
                2. Pengalaman &amp; Referensi
              </button>

              <button
                type="button"
                onClick={() => setDetailTab("komitmen")}
                className={`px-3 py-2 rounded-xl transition shrink-0 ${
                  detailTab === "komitmen"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-gray-200/60"
                }`}
              >
                3. Komitmen &amp; Gaji
              </button>

              <button
                type="button"
                onClick={() => setDetailTab("skill")}
                className={`px-3 py-2 rounded-xl transition shrink-0 ${
                  detailTab === "skill"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-gray-200/60"
                }`}
              >
                4. Karakter &amp; Skill
              </button>

              <button
                type="button"
                onClick={() => setDetailTab("berkas")}
                className={`px-3 py-2 rounded-xl transition shrink-0 ${
                  detailTab === "berkas"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-gray-200/60"
                }`}
              >
                5. Berkas &amp; Portofolio
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 font-sans text-xs sm:text-sm">
              {/* TAB DETAIL 1: IDENTITAS */}
              {detailTab === "identitas" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-200">
                    <div>
                      <span className="text-gray-400 block font-mono text-xs">Nama Lengkap:</span>
                      <span className="font-bold text-gray-900 text-sm">{selectedApplicant.name}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block font-mono text-xs">Tempat &amp; Tanggal Lahir:</span>
                      <span className="font-bold text-gray-900">{selectedApplicant.birthPlaceDate || "-"}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block font-mono text-xs">Status Pernikahan:</span>
                      <span className="font-bold text-gray-900">{selectedApplicant.maritalStatus || "Single"}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block font-mono text-xs">Usia:</span>
                      <span className="font-bold text-gray-900">{selectedApplicant.age ? `${selectedApplicant.age} Tahun` : "-"}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block font-mono text-xs">Nomor WhatsApp / HP:</span>
                      <span className="font-bold text-gray-900 font-mono text-sm">{selectedApplicant.phone}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block font-mono text-xs">Alamat Email:</span>
                      <span className="font-bold text-gray-900">{selectedApplicant.email || "-"}</span>
                    </div>

                    <div className="sm:col-span-2">
                      <span className="text-gray-400 block font-mono text-xs">Pendidikan Terakhir &amp; Jurusan:</span>
                      <span className="font-bold text-gray-900 text-sm">
                        {selectedApplicant.education || "-"}
                        {selectedApplicant.educationMajor ? ` - Jurusan ${selectedApplicant.educationMajor}` : ""}
                      </span>
                    </div>

                    <div className="sm:col-span-2">
                      <span className="text-gray-400 block font-mono text-xs">Alamat Domisili:</span>
                      <span className="font-bold text-gray-900">{selectedApplicant.address || "-"}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB DETAIL 2: PENGALAMAN & REFERENSI */}
              {detailTab === "pengalaman" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-2">
                    <span className="text-xs font-bold text-blue-900 font-mono uppercase block">
                      Status &amp; Riwayat Pengalaman Kerja:
                    </span>
                    <p className="text-gray-800 leading-relaxed whitespace-pre-line text-xs sm:text-sm pl-2">
                      {selectedApplicant.experience || "Fresh Graduate / Siap mengikuti pelatihan kerja."}
                    </p>
                  </div>

                  {/* Referensi */}
                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
                    <span className="text-xs font-bold text-amber-950 font-mono uppercase block">
                      Kontak Referensi Kerja / Kerabat:
                    </span>
                    {selectedApplicant.reference1 && (
                      <p className="text-gray-800 font-mono text-xs pl-2">
                        • Referensi 1: <strong className="text-gray-900">{selectedApplicant.reference1}</strong>
                      </p>
                    )}
                    {selectedApplicant.reference2 && (
                      <p className="text-gray-800 font-mono text-xs pl-2">
                        • Referensi 2: <strong className="text-gray-900">{selectedApplicant.reference2}</strong>
                      </p>
                    )}
                    {!selectedApplicant.reference1 && !selectedApplicant.reference2 && selectedApplicant.referencePhone && (
                      <p className="text-gray-800 font-mono text-xs pl-2">
                        • Kontak: <strong className="text-gray-900">{selectedApplicant.referencePhone}</strong> ({selectedApplicant.referenceRelation || "Darurat"})
                      </p>
                    )}
                    {!selectedApplicant.reference1 && !selectedApplicant.reference2 && !selectedApplicant.referencePhone && (
                      <p className="text-gray-500 text-xs italic pl-2">Tidak ada referensi yang dicantumkan.</p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB DETAIL 3: KOMITMEN & GAJI */}
              {detailTab === "komitmen" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-200">
                    <div>
                      <span className="text-gray-400 block font-mono text-xs">Bersedia No Work No Pay?</span>
                      <span className={`font-bold text-sm ${
                        selectedApplicant.readyNoWorkNoPay === "Ya" ? "text-emerald-700" : "text-red-600"
                      }`}>
                        {selectedApplicant.readyNoWorkNoPay || "Ya"}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-400 block font-mono text-xs">Bersedia Bekerja Lembur?</span>
                      <span className={`font-bold text-sm ${
                        selectedApplicant.readyOvertime === "Ya" ? "text-emerald-700" : "text-red-600"
                      }`}>
                        {selectedApplicant.readyOvertime || "Ya"}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-400 block font-mono text-xs">Gaji yang Diinginkan:</span>
                      <span className="font-bold text-gray-900 text-sm">{selectedApplicant.expectedSalary || "-"}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block font-mono text-xs">Fasilitas yang Diinginkan:</span>
                      <span className="font-bold text-gray-900">{selectedApplicant.expectedFacilities || "-"}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB DETAIL 4: SKILL & KARAKTER */}
              {detailTab === "skill" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-1">
                    <span className="text-xs font-bold text-emerald-900 font-mono uppercase block">
                      3 Kelebihan Diri:
                    </span>
                    <p className="text-gray-800 leading-relaxed whitespace-pre-line pl-2">
                      {selectedApplicant.threeStrengths || selectedApplicant.strengths || "-"}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-1">
                    <span className="text-xs font-bold text-amber-900 font-mono uppercase block">
                      3 Kekurangan Diri &amp; Solusi:
                    </span>
                    <p className="text-gray-800 leading-relaxed whitespace-pre-line pl-2">
                      {selectedApplicant.threeWeaknesses || selectedApplicant.weaknesses || "-"}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-1">
                    <span className="text-xs font-bold text-purple-900 font-mono uppercase block">
                      Minimal 5 Skill yang Dikuasai:
                    </span>
                    <p className="text-gray-800 leading-relaxed whitespace-pre-line pl-2">
                      {selectedApplicant.fiveSkills || "-"}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB DETAIL 5: BERKAS & PORTOFOLIO */}
              {detailTab === "berkas" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
                    {/* CV Berkas */}
                    <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-gray-200">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-red-600 text-2xl">picture_as_pdf</span>
                        <div>
                          <p className="font-bold text-gray-900 text-xs sm:text-sm">Dokumen CV / Resume</p>
                          <p className="text-gray-500 text-xs font-mono">Format PDF / Dokumen Pelamar</p>
                        </div>
                      </div>

                      {selectedApplicant.cvUrl ? (
                        <a
                          href={selectedApplicant.cvUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 rounded-xl bg-[#121316] text-white text-xs font-bold hover:bg-black transition flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-sm">open_in_new</span>
                          <span>Buka Berkas</span>
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Tidak dilampirkan</span>
                      )}
                    </div>

                    {/* Portofolio */}
                    <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-gray-200">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-blue-600 text-2xl">folder_zip</span>
                        <div>
                          <p className="font-bold text-gray-900 text-xs sm:text-sm">Portofolio / Karya</p>
                          <p className="text-gray-500 text-xs font-mono">
                            {selectedApplicant.hasPortfolio === "yes" ? "Kandidat menyertakan portofolio" : "Tidak menyertakan portofolio"}
                          </p>
                        </div>
                      </div>

                      {selectedApplicant.portfolioUrl ? (
                        <a
                          href={selectedApplicant.portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-sm">open_in_new</span>
                          <span>Lihat Portofolio</span>
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Tidak ada portofolio</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500">Ubah Status:</span>
                <select
                  value={selectedApplicant.status}
                  onChange={(e) => handleUpdateApplicantStatus(selectedApplicant, e.target.value as any)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold border border-gray-300 bg-white text-gray-800"
                >
                  <option value="new">● Baru</option>
                  <option value="reviewed">Ditinjau</option>
                  <option value="interview">Jadwal Interview</option>
                  <option value="accepted">Diterima</option>
                  <option value="rejected">Ditolak</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${selectedApplicant.phone.replace(/^0/, "62")}?text=Halo%20${encodeURIComponent(selectedApplicant.name)}%2C%20kami%20dari%20Tim%20HRD%20CV%20Pelangi%20UV...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                  <span>WhatsApp Pelamar</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedApplicant(null)}
                  className="px-4 py-1.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold transition cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL TEMPLATE PENOLAKAN */}
      {/* ======================================================== */}
      {rejectionTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-gray-200 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-600">
                <span className="material-symbols-outlined text-2xl">mail</span>
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-gray-900">
                  Template Penolakan Pelamar
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setRejectionTarget(null)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                &times;
              </button>
            </div>

            <p className="text-xs text-gray-600">
              Kandidat <strong className="text-gray-900">{rejectionTarget.name}</strong> ditandai sebagai ditolak. Anda dapat menyalin pesan ramah ini untuk dikirimkan via WhatsApp atau Email:
            </p>

            <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 font-sans text-xs text-gray-800 leading-relaxed whitespace-pre-line max-h-56 overflow-y-auto">
{`Halo ${rejectionTarget.name},

Terima kasih atas minat dan waktu yang Anda luangkan untuk melamar posisi ${rejectionTarget.jobTitle} di CV Pelangi UV.

Setelah meninjau berkas dan kualifikasi seluruh kandidat secara cermat, saat ini kami memutuskan untuk melanjutkan proses dengan kandidat lain yang profilnya lebih mendekati kebutuhan posisi ini.

Data Anda tetap tersimpan dalam basis data kami untuk peluang yang sesuai di masa mendatang. Kami mendoakan kesuksesan dalam perjalanan karir Anda.

Salam hangat,
Tim HRD CV Pelangi UV`}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  const text = `Halo ${rejectionTarget.name},\n\nTerima kasih atas minat dan waktu yang Anda luangkan untuk melamar posisi ${rejectionTarget.jobTitle} di CV Pelangi UV.\n\nSetelah meninjau berkas dan kualifikasi seluruh kandidat secara cermat, saat ini kami memutuskan untuk melanjutkan proses dengan kandidat lain yang profilnya lebih mendekati kebutuhan posisi ini.\n\nData Anda tetap tersimpan dalam basis data kami untuk peluang yang sesuai di masa mendatang. Kami mendoakan kesuksesan dalam perjalanan karir Anda.\n\nSalam hangat,\nTim HRD CV Pelangi UV`;
                  navigator.clipboard.writeText(text);
                  setCopiedReject(true);
                  setTimeout(() => setCopiedReject(false), 2500);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  copiedReject
                    ? "bg-emerald-600 text-white"
                    : "bg-[#121316] hover:bg-black text-white"
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {copiedReject ? "check" : "content_copy"}
                </span>
                <span>{copiedReject ? "Tersalin ke Clipboard!" : "Salin Pesan"}</span>
              </button>

              <button
                type="button"
                onClick={() => setRejectionTarget(null)}
                className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition cursor-pointer"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPelamarPage() {
  return (
    <AdminShell>
      <Suspense fallback={
        <div className="flex items-center justify-center py-20 text-gray-400">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-[#F65456] rounded-full animate-spin" />
        </div>
      }>
        <PelamarContent />
      </Suspense>
    </AdminShell>
  );
}

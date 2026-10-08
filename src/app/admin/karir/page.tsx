"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import AdminShell from "../AdminShell";
import { CareerJobItem, JobApplicantItem } from "@/lib/admin/db";

const DIVISIONS = ["Finance", "Marketing", "Operational", "Production", "Warehouse"] as const;

export default function AdminKarirPage() {
  const [activeTab, setActiveTab] = useState<"jobs" | "applicants">("jobs");
  const [jobs, setJobs] = useState<CareerJobItem[]>([]);
  const [applicants, setApplicants] = useState<JobApplicantItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter Jobs
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDivision, setFilterDivision] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  // Filter Applicants
  const [applicantSearch, setApplicantSearch] = useState("");
  const [applicantFilterStatus, setApplicantFilterStatus] = useState<string>("ALL");
  const [selectedApplicant, setSelectedApplicant] = useState<JobApplicantItem | null>(null);
  const [detailTab, setDetailTab] = useState<"identitas" | "pengalaman" | "komitmen" | "skill" | "berkas">("identitas");

  // Modal Jobs State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<CareerJobItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Form Fields Jobs
  const [formTitle, setFormTitle] = useState("");
  const [formDivision, setFormDivision] = useState<CareerJobItem["division"]>("Production");
  const [formType, setFormType] = useState("Full-Time (WFO)");
  const [formLocation, setFormLocation] = useState("Bizpark C17-C19, Sidoarjo");
  const [formIsOpen, setFormIsOpen] = useState(true);

  // Qualifications & Responsibilities List State
  const [qualifications, setQualifications] = useState<string[]>([]);
  const [newQualInput, setNewQualInput] = useState("");
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [newRespInput, setNewRespInput] = useState("");

  // Delete Confirm Modal
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Template Penolakan / Gagal Seleksi Modal
  const [rejectionTarget, setRejectionTarget] = useState<JobApplicantItem | null>(null);
  const [copiedReject, setCopiedReject] = useState(false);

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

  // Filter Applicants Memo
  const filteredApplicants = useMemo(() => {
    return applicants.filter((app) => {
      const q = applicantSearch.toLowerCase();
      const matchSearch =
        !applicantSearch.trim() ||
        app.name.toLowerCase().includes(q) ||
        app.jobTitle.toLowerCase().includes(q) ||
        app.phone.includes(q) ||
        (app.email && app.email.toLowerCase().includes(q));

      const matchStatus =
        applicantFilterStatus === "ALL" || app.status === applicantFilterStatus;

      return matchSearch && matchStatus;
    });
  }, [applicants, applicantSearch, applicantFilterStatus]);

  // Stats
  const openCount = jobs.filter((j) => j.isOpen).length;
  const closedCount = jobs.length - openCount;
  const newApplicantCount = applicants.filter((a) => a.status === "new").length;
  const interviewCount = applicants.filter((a) => a.status === "interview").length;
  const acceptedCount = applicants.filter((a) => a.status === "accepted").length;

  function handleOpenCreate() {
    setEditingJob(null);
    setFormTitle("");
    setFormDivision("Production");
    setFormType("Full-Time (WFO)");
    setFormLocation("Bizpark C17-C19, Sidoarjo");
    setFormIsOpen(true);
    setQualifications([]);
    setNewQualInput("");
    setResponsibilities([]);
    setNewRespInput("");
    setIsModalOpen(true);
  }

  function handleOpenEdit(job: CareerJobItem) {
    setEditingJob(job);
    setFormTitle(job.title);
    setFormDivision(job.division);
    setFormType(job.type);
    setFormLocation(job.location);
    setFormIsOpen(job.isOpen);
    setQualifications(job.qualifications || []);
    setNewQualInput("");
    setResponsibilities(job.responsibilities || []);
    setNewRespInput("");
    setIsModalOpen(true);
  }

  function handleAddQual() {
    if (!newQualInput.trim()) return;
    setQualifications((prev) => [...prev, newQualInput.trim()]);
    setNewQualInput("");
  }

  function handleRemoveQual(index: number) {
    setQualifications((prev) => prev.filter((_, i) => i !== index));
  }

  function handleAddResp() {
    if (!newRespInput.trim()) return;
    setResponsibilities((prev) => [...prev, newRespInput.trim()]);
    setNewRespInput("");
  }

  function handleRemoveResp(index: number) {
    setResponsibilities((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleToggleStatus(job: CareerJobItem) {
    const updatedIsOpen = !job.isOpen;
    try {
      const res = await fetch("/api/admin/jobs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...job,
          isOpen: updatedIsOpen,
        }),
      });

      if (res.ok) {
        setJobs((prev) =>
          prev.map((j) => (j.id === job.id ? { ...j, isOpen: updatedIsOpen } : j))
        );
      }
    } catch (err) {
      console.error("Gagal ubah status lowongan:", err);
    }
  }

  async function handleSubmitJob(e: React.FormEvent) {
    e.preventDefault();
    if (!formTitle.trim()) return;

    setSaving(true);
    const payload = {
      ...(editingJob ? { id: editingJob.id } : {}),
      title: formTitle.trim(),
      division: formDivision,
      type: formType,
      location: formLocation,
      isOpen: formIsOpen,
      qualifications,
      responsibilities,
    };

    try {
      const method = editingJob ? "PUT" : "POST";
      const res = await fetch("/api/admin/jobs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        await fetchJobs();
      }
    } catch (err) {
      console.error("Gagal simpan lowongan:", err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteJob(id: string) {
    try {
      const res = await fetch(`/api/admin/jobs?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setJobs((prev) => prev.filter((j) => j.id !== id));
        setDeletingId(null);
      }
    } catch (err) {
      console.error("Gagal hapus lowongan:", err);
    }
  }

  return (
    <AdminShell>
      <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#F65456] text-2xl">work</span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-tight">
              Manajemen Karir &amp; Rekrutmen
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Kelola lowongan pekerjaan CV Pelangi UV dan pantau berkas lamaran kandidat yang masuk secara terorganisir.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/karir"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs sm:text-sm font-semibold text-gray-700 transition shadow-xs"
          >
            <span className="material-symbols-outlined text-base">visibility</span>
            <span>Lihat Halaman Karir</span>
          </Link>

          {activeTab === "jobs" && (
            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F65456] hover:bg-[#d94143] text-white text-xs sm:text-sm font-bold transition shadow-sm active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>Tambah Lowongan</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex items-center gap-2 p-1.5 bg-gray-100/90 rounded-2xl w-fit border border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab("jobs")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
            activeTab === "jobs"
              ? "bg-white text-gray-900 shadow-xs border border-gray-200/80"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
          }`}
        >
          <span className="material-symbols-outlined text-base">work</span>
          <span>Daftar Lowongan ({jobs.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("applicants")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
            activeTab === "applicants"
              ? "bg-[#F65456] text-white shadow-xs"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
          }`}
        >
          <span className="material-symbols-outlined text-base">people</span>
          <span>Berkas Pelamar Masuk ({applicants.length})</span>
          {newApplicantCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-white text-[#F65456] text-[10px] font-bold border border-red-200 shadow-xs">
              {newApplicantCount} Baru
            </span>
          )}
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: DAFTAR LOWONGAN */}
      {/* ======================================================== */}
      {activeTab === "jobs" ? (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Posisi</p>
                <p className="text-2xl font-heading font-extrabold text-gray-900 mt-1">{jobs.length}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                <span className="material-symbols-outlined">badge</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-green-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-green-700 uppercase tracking-wider">Lowongan Dibuka</p>
                <p className="text-2xl font-heading font-extrabold text-green-700 mt-1">{openCount}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">Lowongan Ditutup</p>
                <p className="text-2xl font-heading font-extrabold text-amber-700 mt-1">{closedCount}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <span className="material-symbols-outlined">lock</span>
              </div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari posisi kerja, divisi..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={filterDivision}
                onChange={(e) => setFilterDivision(e.target.value)}
                className="px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-medium focus:outline-none focus:border-[#F65456]"
              >
                <option value="ALL">Semua Divisi</option>
                {DIVISIONS.map((d) => (
                  <option key={d} value={d}>Divisi {d}</option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-medium focus:outline-none focus:border-[#F65456]"
              >
                <option value="ALL">Semua Status</option>
                <option value="OPEN">Hanya Dibuka</option>
                <option value="CLOSED">Hanya Ditutup</option>
              </select>
            </div>
          </div>

          {/* Jobs List */}
          {loading ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-gray-200 text-gray-500">
              <div className="inline-block w-8 h-8 border-4 border-[#F65456] border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-sm font-medium">Memuat data lowongan...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-gray-200 text-gray-500">
              <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">work_off</span>
              <p className="text-base font-bold text-gray-700">Tidak ada lowongan ditemukan</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className={`p-5 rounded-2xl bg-white border transition shadow-xs hover:shadow-md ${
                    job.isOpen ? "border-gray-200" : "border-gray-200 bg-gray-50/60 opacity-80"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          job.isOpen
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-gray-200 text-gray-700 border border-gray-300"
                        }`}>
                          {job.isOpen ? "● Dibuka" : "✕ Ditutup"}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-[#F65456] border border-red-100">
                          {job.division}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                          &bull; {job.type}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                          &bull; {job.location}
                        </span>
                      </div>

                      <h3 className="font-heading font-extrabold text-lg text-gray-900">
                        {job.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(job)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                          job.isOpen
                            ? "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                            : "bg-green-50 text-green-800 border-green-200 hover:bg-green-100"
                        }`}
                      >
                        {job.isOpen ? "Tutup Lowongan" : "Buka Lowongan"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenEdit(job)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeletingId(job.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                        Hapus
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-1">
                    <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#F65456] text-base">checklist</span>
                        Kualifikasi ({job.qualifications?.length || 0}):
                      </p>
                      <ul className="space-y-1 text-xs text-gray-600 list-disc list-inside">
                        {job.qualifications?.map((q, idx) => (
                          <li key={idx} className="leading-relaxed">{q}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-blue-600 text-base">assignment</span>
                        Tanggung Jawab ({job.responsibilities?.length || 0}):
                      </p>
                      <ul className="space-y-1 text-xs text-gray-600 list-disc list-inside">
                        {job.responsibilities?.map((r, idx) => (
                          <li key={idx} className="leading-relaxed">{r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* ======================================================== */
        /* TAB 2: BERKAS PELAMAR MASUK (PROPORSI RAPI & BERSIH) */
        /* ======================================================== */
        <div className="space-y-6">
          {/* Summary KPIs Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs">
              <p className="text-[11px] font-bold text-gray-500 uppercase font-mono">Total Pelamar</p>
              <p className="text-2xl font-heading font-extrabold text-gray-900 mt-1">{applicants.length}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-red-200 shadow-xs">
              <p className="text-[11px] font-bold text-[#F65456] uppercase font-mono">Berkas Baru</p>
              <p className="text-2xl font-heading font-extrabold text-[#F65456] mt-1">{newApplicantCount}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-xs">
              <p className="text-[11px] font-bold text-blue-700 uppercase font-mono">Tahap Interview</p>
              <p className="text-2xl font-heading font-extrabold text-blue-700 mt-1">{interviewCount}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-xs">
              <p className="text-[11px] font-bold text-emerald-700 uppercase font-mono">Diterima</p>
              <p className="text-2xl font-heading font-extrabold text-emerald-700 mt-1">{acceptedCount}</p>
            </div>
          </div>

          {/* Search & Filter Bar Pelamar */}
          <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                search
              </span>
              <input
                type="text"
                value={applicantSearch}
                onChange={(e) => setApplicantSearch(e.target.value)}
                placeholder="Cari nama kandidat, nomor HP, posisi..."
                className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">Filter Status:</span>
              <select
                value={applicantFilterStatus}
                onChange={(e) => setApplicantFilterStatus(e.target.value)}
                className="px-3.5 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-semibold focus:outline-none focus:border-[#F65456]"
              >
                <option value="ALL">Semua Status ({applicants.length})</option>
                <option value="new">Baru ({newApplicantCount})</option>
                <option value="reviewed">Ditinjau</option>
                <option value="interview">Jadwal Interview ({interviewCount})</option>
                <option value="accepted">Diterima ({acceptedCount})</option>
                <option value="rejected">Ditolak</option>
              </select>
            </div>
          </div>

          {/* List Pelamar - Card Rapi & Proporsional */}
          {filteredApplicants.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-gray-200 text-gray-500">
              <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">person_search</span>
              <p className="text-base font-bold text-gray-700">Tidak ada berkas pelamar yang cocok</p>
              <p className="text-xs text-gray-500 mt-1">Coba sesuaikan filter status atau kata kunci pencarian.</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredApplicants.map((applicant) => (
                <div
                  key={applicant.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 shadow-xs transition flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  {/* Kolom 1: Profil Dasar Pelamar */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-heading font-extrabold text-base sm:text-lg text-gray-900 truncate">
                        {applicant.name}
                      </h3>
                      {applicant.age && (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold font-mono bg-gray-100 text-gray-700">
                          {applicant.age} Thn
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-[#F65456] border border-red-100">
                        {applicant.jobTitle}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold font-mono ${
                        applicant.hasExperience === "yes"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}>
                        {applicant.hasExperience === "yes" ? "Pernah Bekerja" : "Fresh Graduate"}
                      </span>
                    </div>

                    {/* Sub-info: Pendidikan & Kontak */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1 text-gray-700">
                        <span className="material-symbols-outlined text-sm text-gray-400">school</span>
                        <span>{applicant.education || "-"} {applicant.educationMajor ? `(${applicant.educationMajor})` : ""}</span>
                      </span>

                      <span className="flex items-center gap-1 font-mono text-gray-700">
                        <span className="material-symbols-outlined text-sm text-gray-400">call</span>
                        <span>{applicant.phone}</span>
                      </span>

                      {applicant.email && (
                        <span className="flex items-center gap-1 text-gray-700 truncate max-w-[200px]">
                          <span className="material-symbols-outlined text-sm text-gray-400">mail</span>
                          <span>{applicant.email}</span>
                        </span>
                      )}

                      <span className="text-[11px] text-gray-400 font-mono">
                        {new Date(applicant.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Kolom 2: Status & Tombol Aksi (Proporsional & Sejajar) */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                    {/* Status Dropdown */}
                    <select
                      value={applicant.status}
                      onChange={(e) =>
                        handleUpdateApplicantStatus(applicant, e.target.value as any)
                      }
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition outline-none cursor-pointer ${
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
                      <option value="new">● Baru</option>
                      <option value="reviewed">Ditinjau</option>
                      <option value="interview">Jadwal Interview</option>
                      <option value="accepted">Diterima</option>
                      <option value="rejected">Ditolak</option>
                    </select>

                    {/* Tombol Lihat Detail Lengkap */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedApplicant(applicant);
                        setDetailTab("identitas");
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#121316] hover:bg-black text-white text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
                    >
                      <span className="material-symbols-outlined text-sm">visibility</span>
                      <span>Rincian Berkas</span>
                    </button>

                    {/* Tombol WhatsApp */}
                    <a
                      href={`https://wa.me/${applicant.phone.replace(/^0/, "62")}?text=Halo%20${encodeURIComponent(applicant.name)}%2C%20kami%20dari%20Tim%20HRD%20CV%20Pelangi%20UV%20terkait%20lamaran%20posisi%20*${encodeURIComponent(applicant.jobTitle)}*...`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                      title="Hubungi via WhatsApp"
                    >
                      <span className="material-symbols-outlined text-sm">chat</span>
                      <span className="hidden sm:inline">WA</span>
                    </a>

                    {/* Tombol Template Tolak */}
                    <button
                      type="button"
                      onClick={() => {
                        setRejectionTarget(applicant);
                        setCopiedReject(false);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold transition"
                      title="Template Penolakan"
                    >
                      <span className="material-symbols-outlined text-sm text-gray-500">unsubscribe</span>
                      <span className="hidden sm:inline">Tolak</span>
                    </button>

                    {/* Tombol Hapus */}
                    <button
                      type="button"
                      onClick={() => handleDeleteApplicant(applicant.id, applicant.name)}
                      className="w-9 h-9 rounded-xl border border-gray-200 hover:bg-red-50 hover:text-red-600 text-gray-400 flex items-center justify-center transition"
                      title="Hapus berkas"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL DETAIL LENGKAP PROFIL PELAMAR (PROPORSI RAPI) */}
      {/* ======================================================== */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
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

                <p className="text-gray-400 text-xs mt-1 font-mono">
                  Diajukan pada: {new Date(selectedApplicant.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
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
                    ? "bg-white text-gray-900 shadow-xs"
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
                    ? "bg-white text-gray-900 shadow-xs"
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
                    ? "bg-white text-gray-900 shadow-xs"
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
                    ? "bg-white text-gray-900 shadow-xs"
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
                    ? "bg-white text-gray-900 shadow-xs"
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
                    {/* Berkas CV */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white border border-gray-200">
                      <div>
                        <p className="font-bold text-gray-900 text-xs sm:text-sm">Lampiran Berkas (CV, KTP, Ijazah)</p>
                        <p className="text-xs text-gray-500 font-mono mt-0.5 truncate max-w-sm">
                          {selectedApplicant.fileName || selectedApplicant.cvUrl || "Tidak ada berkas"}
                        </p>
                      </div>

                      {selectedApplicant.cvUrl && (
                        <a
                          href={selectedApplicant.cvUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-bracket-border hover:bg-bracket-border/90 text-white font-bold text-xs flex items-center gap-1.5 transition shrink-0"
                        >
                          <span className="material-symbols-outlined text-sm">open_in_new</span>
                          <span>Buka Berkas</span>
                        </a>
                      )}
                    </div>

                    {/* Portofolio */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white border border-gray-200">
                      <div>
                        <p className="font-bold text-gray-900 text-xs sm:text-sm">Portofolio Karya</p>
                        <p className="text-xs text-gray-500 font-mono mt-0.5 truncate max-w-sm">
                          {selectedApplicant.hasPortfolio === "yes" && selectedApplicant.portfolioUrl
                            ? selectedApplicant.portfolioUrl
                            : "Tidak menyertakan portofolio"}
                        </p>
                      </div>

                      {selectedApplicant.hasPortfolio === "yes" && selectedApplicant.portfolioUrl && (
                        <a
                          href={selectedApplicant.portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 transition shrink-0"
                        >
                          <span className="material-symbols-outlined text-sm">collections_bookmark</span>
                          <span>Buka Portofolio</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-semibold">Ubah Status:</span>
                <select
                  value={selectedApplicant.status}
                  onChange={(e) =>
                    handleUpdateApplicantStatus(selectedApplicant, e.target.value as any)
                  }
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-gray-300 text-gray-800 outline-none"
                >
                  <option value="new">● Baru</option>
                  <option value="reviewed">Ditinjau</option>
                  <option value="interview">Jadwal Interview</option>
                  <option value="accepted">Diterima</option>
                  <option value="rejected">Ditolak</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setRejectionTarget(selectedApplicant);
                    setCopiedReject(false);
                  }}
                  className="px-3.5 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 text-xs font-bold text-gray-700 transition"
                >
                  Template Tolak
                </button>

                <a
                  href={`https://wa.me/${selectedApplicant.phone.replace(/^0/, "62")}?text=Halo%20${encodeURIComponent(selectedApplicant.name)}%2C%20kami%20dari%20Tim%20HRD%20CV%20Pelangi%20UV...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                  <span>Hubungi WA</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedApplicant(null)}
                  className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-semibold transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL TEMPLATE PENOLAKAN / GAGAL SELEKSI */}
      {/* ======================================================== */}
      {rejectionTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden my-6 flex flex-col">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-red-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">unsubscribe</span>
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-base text-gray-900">
                    Template Penolakan Lamaran
                  </h3>
                  <p className="text-xs text-gray-500 font-mono">
                    Kandidat: {rejectionTarget.name} &bull; {rejectionTarget.jobTitle}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRejectionTarget(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center text-lg"
              >
                &times;
              </button>
            </div>

            <div className="p-6 space-y-4 font-sans text-xs">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-800 whitespace-pre-line leading-relaxed font-sans max-h-60 overflow-y-auto">
{`Yth. Bapak/Ibu ${rejectionTarget.name},

Terima kasih atas minat dan antusiasme Anda dalam melamar posisi ${rejectionTarget.jobTitle} di CV Pelangi UV.

Setelah melalui proses peninjauan berkas yang seksama oleh Tim Rekrutmen kami, mohon maaf saat ini kualifikasi yang kami butuhkan belum sesuai dengan profil Anda, atau posisi tersebut telah terisi oleh kandidat lain.

Data lamaran Anda akan tetap kami simpan di database talent kami untuk kemungkinan peluang karir di masa mendatang apabila ada posisi yang sesuai.

Kami sangat menghargai waktu dan usaha yang telah Anda berikan, serta mendoakan kesuksesan untuk perjalanan karir Anda selanjutnya.

Salam hangat,
Tim HRD & Rekrutmen
CV Pelangi UV`}
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-gray-100/70 border border-gray-200 font-mono text-[11px]">
                <div>
                  <span className="text-gray-500 block">WhatsApp:</span>
                  <span className="font-bold text-gray-900">{rejectionTarget.phone}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Email:</span>
                  <span className="font-bold text-gray-900 truncate block">{rejectionTarget.email || "-"}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    const text = `Yth. Bapak/Ibu ${rejectionTarget.name},\n\nTerima kasih atas minat dan antusiasme Anda dalam melamar posisi ${rejectionTarget.jobTitle} di CV Pelangi UV.\n\nSetelah melalui proses peninjauan berkas yang seksama oleh Tim Rekrutmen kami, mohon maaf saat ini kualifikasi yang kami butuhkan belum sesuai dengan profil Anda, atau posisi tersebut telah terisi oleh kandidat lain.\n\nData lamaran Anda akan tetap kami simpan di database talent kami untuk kemungkinan peluang karir di masa mendatang apabila ada posisi yang sesuai.\n\nKami sangat menghargai waktu dan usaha yang telah Anda berikan, serta mendoakan kesuksesan untuk perjalanan karir Anda selanjutnya.\n\nSalam hangat,\nTim HRD & Rekrutmen\nCV Pelangi UV`;
                    navigator.clipboard.writeText(text);
                    setCopiedReject(true);
                    setTimeout(() => setCopiedReject(false), 2500);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">
                    {copiedReject ? "done" : "content_copy"}
                  </span>
                  <span>{copiedReject ? "Tersalin!" : "Salin Pesan"}</span>
                </button>

                <div className="flex items-center gap-2">
                  {rejectionTarget.email && (
                    <a
                      href={`mailto:${rejectionTarget.email}?subject=Informasi Hasil Seleksi Rekrutmen - CV Pelangi UV&body=${encodeURIComponent(`Yth. Bapak/Ibu ${rejectionTarget.name},\n\nTerima kasih atas minat dan antusiasme Anda dalam melamar posisi ${rejectionTarget.jobTitle} di CV Pelangi UV.\n\nSetelah melalui proses peninjauan berkas yang seksama oleh Tim Rekrutmen kami, mohon maaf saat ini kualifikasi yang kami butuhkan belum sesuai dengan profil Anda.\n\nData lamaran Anda akan tetap kami simpan di database talent kami untuk kemungkinan peluang karir di masa mendatang.\n\nSalam hangat,\nTim HRD & Rekrutmen\nCV Pelangi UV`)}`}
                      className="px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 font-bold flex items-center gap-1.5 transition"
                    >
                      <span className="material-symbols-outlined text-sm">mail</span>
                      <span>Kirim Email</span>
                    </a>
                  )}

                  <a
                    href={`https://wa.me/${rejectionTarget.phone.replace(/^0/, "62")}?text=${encodeURIComponent(`Halo Bapak/Ibu *${rejectionTarget.name}*,\n\nTerima kasih atas minat dan antusiasme Anda dalam melamar posisi *${rejectionTarget.jobTitle}* di CV Pelangi UV.\n\nSetelah melalui proses peninjauan berkas yang seksama oleh Tim Rekrutmen kami, mohon maaf saat ini kualifikasi yang kami butuhkan belum sesuai dengan profil Anda.\n\nData lamaran Anda akan tetap kami simpan di database talent kami untuk kemungkinan peluang karir di masa mendatang apabila ada posisi yang sesuai.\n\nKami sangat menghargai waktu dan usaha yang Anda berikan, serta mendoakan kesuksesan untuk perjalanan karir Anda selanjutnya.\n\nSalam hangat,\n*Tim HRD & Rekrutmen CV Pelangi UV*`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 transition shadow-xs"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span>
                    <span>Kirim WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL TAMBAH / EDIT LOWONGAN */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-100 text-[#F65456] flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">
                    {editingJob ? "edit_note" : "post_add"}
                  </span>
                </div>
                <div>
                  <h2 className="font-heading font-extrabold text-lg text-gray-900">
                    {editingJob ? "Edit Lowongan Pekerjaan" : "Tambah Lowongan Baru"}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center text-lg cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmitJob} className="p-6 space-y-4 overflow-y-auto flex-1 font-sans">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Nama Posisi Pekerjaan <span className="text-[#F65456]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Contoh: Operator Mesin Spot UV"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#F65456]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Divisi Pekerjaan</label>
                  <select
                    value={formDivision}
                    onChange={(e) => setFormDivision(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#F65456]"
                  >
                    {DIVISIONS.map((d) => (
                      <option key={d} value={d}>Divisi {d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Tipe Pekerjaan</label>
                  <input
                    type="text"
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#F65456]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Lokasi Kerja</label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#F65456]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Status Publikasi</label>
                  <div className="pt-2">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                      <input
                        type="checkbox"
                        checked={formIsOpen}
                        onChange={(e) => setFormIsOpen(e.target.checked)}
                        className="rounded text-[#F65456] focus:ring-[#F65456] w-4 h-4 cursor-pointer"
                      />
                      <span>Tampilkan Sebagai "Dibuka"</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Kualifikasi */}
              <div className="pt-2 border-t border-gray-100">
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Kualifikasi Persyaratan (Poin-Poin)
                </label>
                <div className="space-y-1.5 mb-2 max-h-32 overflow-y-auto">
                  {qualifications.map((q, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700">
                      <span className="flex-1">&bull; {q}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveQual(idx)}
                        className="text-red-500 hover:text-red-700 font-bold px-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newQualInput}
                    onChange={(e) => setNewQualInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddQual(); } }}
                    placeholder="Ketik kualifikasi lalu klik Tambah..."
                    className="flex-1 px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#F65456]"
                  />
                  <button
                    type="button"
                    onClick={handleAddQual}
                    className="px-3 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                  >
                    + Tambah
                  </button>
                </div>
              </div>

              {/* Tanggung Jawab */}
              <div className="pt-2 border-t border-gray-100">
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Tanggung Jawab Pekerjaan
                </label>
                <div className="space-y-1.5 mb-2 max-h-32 overflow-y-auto">
                  {responsibilities.map((r, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700">
                      <span className="flex-1">&bull; {r}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveResp(idx)}
                        className="text-red-500 hover:text-red-700 font-bold px-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newRespInput}
                    onChange={(e) => setNewRespInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddResp(); } }}
                    placeholder="Ketik tanggung jawab lalu klik Tambah..."
                    className="flex-1 px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#F65456]"
                  />
                  <button
                    type="button"
                    onClick={handleAddResp}
                    className="px-3 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                  >
                    + Tambah
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#F65456] hover:bg-[#d94143] transition shadow-md disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-base">check</span>
                      <span>{editingJob ? "Simpan Perubahan" : "Terbitkan Lowongan"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL HAPUS LOWONGAN */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-gray-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-2xl">delete</span>
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base text-gray-900">
                Hapus Lowongan Kerja?
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Posisi ini akan dihapus dari daftar lowongan. Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleDeleteJob(deletingId)}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition shadow-md"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </AdminShell>
  );
}

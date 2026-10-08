"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import AdminShell from "../AdminShell";
import { CareerJobItem, JobApplicantItem } from "@/lib/admin/db";

const DIVISIONS = ["Finance", "Marketing", "Operational", "Production", "Warehouse"] as const;

export default function AdminKarirPage() {
  const [jobs, setJobs] = useState<CareerJobItem[]>([]);
  const [applicants, setApplicants] = useState<JobApplicantItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter Jobs
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDivision, setFilterDivision] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

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

  // Expandable details for job cards to avoid text dumping
  const [expandedJobIds, setExpandedJobIds] = useState<Record<string, boolean>>({});
  const toggleExpandJob = (id: string) => {
    setExpandedJobIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Delete Confirm Modal
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

  // Hitung jumlah pelamar per posisi pekerjaan
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

  // Stats
  const openCount = jobs.filter((j) => j.isOpen).length;
  const closedCount = jobs.length - openCount;
  const newApplicantCount = applicants.filter((a) => a.status === "new").length;

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

  function handleAddQualification() {
    if (!newQualInput.trim()) return;
    setQualifications([...qualifications, newQualInput.trim()]);
    setNewQualInput("");
  }

  function handleRemoveQualification(index: number) {
    setQualifications(qualifications.filter((_, i) => i !== index));
  }

  function handleAddResponsibility() {
    if (!newRespInput.trim()) return;
    setResponsibilities([...responsibilities, newRespInput.trim()]);
    setNewRespInput("");
  }

  function handleRemoveResponsibility(index: number) {
    setResponsibilities(responsibilities.filter((_, i) => i !== index));
  }

  async function handleSubmitJob(e: React.FormEvent) {
    e.preventDefault();
    if (!formTitle.trim()) return;

    setSaving(true);
    try {
      const payload = {
        title: formTitle.trim(),
        division: formDivision,
        type: formType.trim(),
        location: formLocation.trim(),
        isOpen: formIsOpen,
        qualifications,
        responsibilities,
      };

      if (editingJob) {
        const res = await fetch("/api/admin/jobs", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingJob.id, ...payload }),
        });
        if (res.ok) {
          const updated = await res.json();
          setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
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
          setJobs((prev) => [created, ...prev]);
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error("Gagal simpan lowongan:", err);
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleStatus(job: CareerJobItem) {
    try {
      const res = await fetch("/api/admin/jobs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: job.id, isOpen: !job.isOpen }),
      });
      if (res.ok) {
        setJobs((prev) =>
          prev.map((j) => (j.id === job.id ? { ...j, isOpen: !job.isOpen } : j))
        );
      }
    } catch (err) {
      console.error("Gagal toggle status lowongan:", err);
    }
  }

  async function handleDeleteJob(id: string) {
    try {
      const res = await fetch(`/api/admin/jobs?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
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
      <div className="space-y-6">
        {/* Header Area */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#F65456] text-2xl">work</span>
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-gray-900 tracking-tight">
                Lowongan Karir
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Kelola daftar lowongan pekerjaan resmi CV Pelangi UV yang tayang di halaman publik.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/karir"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs sm:text-sm font-semibold text-gray-700 transition shadow-sm"
            >
              <span className="material-symbols-outlined text-base">visibility</span>
              <span>Lihat Halaman Publik</span>
            </Link>

            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F65456] hover:bg-[#d94143] text-white text-xs sm:text-sm font-bold transition shadow-sm active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>Tambah Lowongan</span>
            </button>
          </div>
        </div>

        {/* Navigation Switcher Antar Route (Lowongan vs Berkas Pelamar) */}
        <div className="flex items-center gap-2 p-1.5 bg-gray-100 rounded-2xl w-fit border border-gray-200">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white text-gray-900 shadow-sm border border-gray-200">
            <span className="material-symbols-outlined text-base text-[#F65456]">work</span>
            <span>Daftar Lowongan ({jobs.length})</span>
          </div>

          <Link
            href="/admin/pelamar"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-200/60 transition"
          >
            <span className="material-symbols-outlined text-base">badge</span>
            <span>Berkas Pelamar ({applicants.length})</span>
            {newApplicantCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#F65456] text-white text-[10px] font-extrabold shadow-sm">
                +{newApplicantCount} Baru
              </span>
            )}
          </Link>
        </div>

        {/* Stats Cards Lowongan */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider font-mono">Total Posisi</p>
              <p className="text-2xl font-heading font-extrabold text-gray-900 mt-0.5">{jobs.length}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
              <span className="material-symbols-outlined">badge</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-green-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-green-700 uppercase tracking-wider font-mono">Dibuka</p>
              <p className="text-2xl font-heading font-extrabold text-green-700 mt-0.5">{openCount}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-amber-700 uppercase tracking-wider font-mono">Ditutup</p>
              <p className="text-2xl font-heading font-extrabold text-amber-700 mt-0.5">{closedCount}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <span className="material-symbols-outlined">lock</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar Lowongan */}
        <div className="p-3.5 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
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

        {/* Daftar Lowongan Pekerjaan */}
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
          <div className="grid grid-cols-1 gap-3.5">
            {filteredJobs.map((job) => {
              const stats = getApplicantCountForJob(job);
              return (
                <div
                  key={job.id}
                  className={`p-4 sm:p-5 rounded-2xl bg-white border transition shadow-sm hover:shadow-md ${
                    job.isOpen ? "border-gray-200" : "border-gray-200 bg-gray-50/60 opacity-80"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          job.isOpen
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-gray-200 text-gray-700 border border-gray-300"
                        }`}>
                          {job.isOpen ? "● Dibuka" : "✕ Ditutup"}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-[#F65456] border border-red-100">
                          {job.division}
                        </span>
                      </div>

                      <h3 className="font-heading font-extrabold text-base sm:text-lg text-gray-900">
                        {job.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      {/* Tombol Langsung ke Berkas Pelamar Posisi Ini */}
                      <Link
                        href={`/admin/pelamar?posisi=${encodeURIComponent(job.title)}`}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer active:scale-95 ${
                          stats.total > 0
                            ? "bg-red-50 text-[#F65456] border-red-200 hover:bg-red-100"
                            : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                        }`}
                        title={`Lihat ${stats.total} pelamar untuk posisi ${job.title}`}
                      >
                        <span className="material-symbols-outlined text-sm">groups</span>
                        <span>{stats.total} Pelamar</span>
                        {stats.newCount > 0 && (
                          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#F65456] text-white">
                            +{stats.newCount} baru
                          </span>
                        )}
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleToggleStatus(job)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                          job.isOpen
                            ? "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                            : "bg-green-50 text-green-800 border-green-200 hover:bg-green-100"
                        }`}
                      >
                        {job.isOpen ? "Tutup" : "Buka"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenEdit(job)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeletingId(job.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                        Hapus
                      </button>
                    </div>
                  </div>

                  {/* Summary Bar & Toggle Detail */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                      <span>{job.qualifications?.length || 0} Kualifikasi</span>
                      <span>&bull;</span>
                      <span>{job.responsibilities?.length || 0} Tanggung Jawab</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleExpandJob(job.id)}
                      className="text-xs font-semibold text-gray-600 hover:text-[#F65456] flex items-center gap-1 transition cursor-pointer"
                    >
                      <span>{expandedJobIds[job.id] ? "Sembunyikan Rincian" : "Lihat Rincian"}</span>
                      <span className="material-symbols-outlined text-sm">
                        {expandedJobIds[job.id] ? "expand_less" : "expand_more"}
                      </span>
                    </button>
                  </div>

                  {/* Expandable Details */}
                  {expandedJobIds[job.id] && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-3 pt-3 border-t border-gray-100 animate-fade-in">
                      <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
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

                      <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
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
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* MODAL TAMBAH / EDIT LOWONGAN */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
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
                    <label className="block text-xs font-bold text-gray-800 mb-1">Status Publikasi</label>
                    <div className="pt-2">
                      <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                        <input
                          type="checkbox"
                          checked={formIsOpen}
                          onChange={(e) => setFormIsOpen(e.target.checked)}
                          className="w-4 h-4 rounded text-[#F65456] focus:ring-[#F65456]"
                        />
                        <span>Aktifkan &amp; Tayangkan di Website</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Kualifikasi */}
                <div className="pt-2 border-t border-gray-100">
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Kualifikasi Pekerjaan ({qualifications.length})
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newQualInput}
                      onChange={(e) => setNewQualInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddQualification();
                        }
                      }}
                      placeholder="Ketik kualifikasi lalu tekan Tambah / Enter..."
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#F65456]"
                    />
                    <button
                      type="button"
                      onClick={handleAddQualification}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold"
                    >
                      Tambah
                    </button>
                  </div>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto">
                    {qualifications.map((q, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-2 p-2 bg-gray-50 rounded-lg text-xs">
                        <span className="text-gray-700">&bull; {q}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveQualification(idx)}
                          className="text-red-500 hover:text-red-700 font-bold px-1"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tanggung Jawab */}
                <div className="pt-2 border-t border-gray-100">
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Tanggung Jawab Pekerjaan ({responsibilities.length})
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newRespInput}
                      onChange={(e) => setNewRespInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddResponsibility();
                        }
                      }}
                      placeholder="Ketik tanggung jawab lalu tekan Tambah / Enter..."
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#F65456]"
                    />
                    <button
                      type="button"
                      onClick={handleAddResponsibility}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold"
                    >
                      Tambah
                    </button>
                  </div>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto">
                    {responsibilities.map((r, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-2 p-2 bg-gray-50 rounded-lg text-xs">
                        <span className="text-gray-700">&bull; {r}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveResponsibility(idx)}
                          className="text-red-500 hover:text-red-700 font-bold px-1"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer"
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
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
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

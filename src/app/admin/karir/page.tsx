"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { CareerJobItem } from "@/lib/admin/db";

const DIVISIONS = ["Finance", "Marketing", "Operational", "Production", "Warehouse"] as const;

export default function AdminKarirPage() {
  const [jobs, setJobs] = useState<CareerJobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDivision, setFilterDivision] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<CareerJobItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Form Fields
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

  async function fetchJobs() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/jobs");
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      }
    } catch (err) {
      console.error("Gagal memuat lowongan:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  function handleOpenCreate() {
    setEditingJob(null);
    setFormTitle("");
    setFormDivision("Production");
    setFormType("Full-Time (WFO)");
    setFormLocation("Bizpark C17-C19, Sidoarjo");
    setFormIsOpen(true);
    setQualifications([
      "Pendidikan minimal SMK / D3 / S1 jurusan terkait.",
      "Memiliki pengalaman kerja minimal 1 tahun di bidangnya.",
      "Teliti, disiplin, jujur, dan bertanggung jawab.",
    ]);
    setNewQualInput("");
    setResponsibilities([
      "Melaksanakan tugas harian sesuai Surat Perintah Kerja (SPK).",
      "Berkoordinasi aktif dengan rekan tim dan pimpinan divisi.",
      "Menjaga standar kualitas dan keselamatan kerja (K3) pabrik.",
    ]);
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
    setQualifications([...qualifications, newQualInput.trim()]);
    setNewQualInput("");
  }

  function handleRemoveQual(idx: number) {
    setQualifications(qualifications.filter((_, i) => i !== idx));
  }

  function handleAddResp() {
    if (!newRespInput.trim()) return;
    setResponsibilities([...responsibilities, newRespInput.trim()]);
    setNewRespInput("");
  }

  function handleRemoveResp(idx: number) {
    setResponsibilities(responsibilities.filter((_, i) => i !== idx));
  }

  async function handleSaveJob(e: React.FormEvent) {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert("Judul posisi wajib diisi!");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: formTitle.trim(),
        division: formDivision,
        type: formType.trim(),
        location: formLocation.trim(),
        isOpen: formIsOpen,
        qualifications: qualifications.filter(q => q.trim()),
        responsibilities: responsibilities.filter(r => r.trim()),
      };

      if (editingJob) {
        // PATCH
        const res = await fetch("/api/admin/jobs", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingJob.id, ...payload }),
        });
        if (!res.ok) throw new Error("Gagal mengupdate lowongan");
      } else {
        // POST
        const res = await fetch("/api/admin/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Gagal menambahkan lowongan");
      }

      setIsModalOpen(false);
      fetchJobs();
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan saat menyimpan lowongan");
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
        setJobs(jobs.map(j => j.id === job.id ? { ...j, isOpen: !j.isOpen } : j));
      }
    } catch (err) {
      console.error("Gagal mengubah status:", err);
    }
  }

  async function handleDeleteJob(id: string) {
    try {
      const res = await fetch("/api/admin/jobs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setJobs(jobs.filter(j => j.id !== id));
        setDeletingId(null);
      }
    } catch (err) {
      console.error("Gagal menghapus lowongan:", err);
    }
  }

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(j => {
      const matchSearch =
        j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.qualifications.some(q => q.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchDivision = filterDivision === "ALL" || j.division === filterDivision;
      const matchStatus =
        filterStatus === "ALL" ||
        (filterStatus === "OPEN" && j.isOpen) ||
        (filterStatus === "CLOSED" && !j.isOpen);
      return matchSearch && matchDivision && matchStatus;
    });
  }, [jobs, searchQuery, filterDivision, filterStatus]);

  const openCount = jobs.filter(j => j.isOpen).length;
  const closedCount = jobs.filter(j => !j.isOpen).length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-gray-900 tracking-tight flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#F65456] text-3xl">work</span>
            Manajemen Lowongan Karir
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Kelola lowongan pekerjaan, deskripsi, kualifikasi persyaratan, dan status aktif langsung di website CV Pelangi UV.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/karir"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition shadow-xs"
          >
            <span className="material-symbols-outlined text-sm">open_in_new</span>
            Buka Halaman Karir
          </Link>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#F65456] hover:bg-[#d94143] rounded-xl transition shadow-md hover:shadow-lg active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">add_circle</span>
            Tambah Lowongan Baru
          </button>
        </div>
      </div>

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
            placeholder="Cari posisi kerja, kualifikasi..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F65456]/20 focus:border-[#F65456]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Divisi Filter */}
          <select
            value={filterDivision}
            onChange={(e) => setFilterDivision(e.target.value)}
            className="px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-medium focus:outline-none focus:border-[#F65456]"
          >
            <option value="ALL">Semua Divisi</option>
            {DIVISIONS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Status Filter */}
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
          <p className="text-sm font-medium">Memuat data lowongan pekerjaan...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-gray-200 text-gray-500">
          <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">work_off</span>
          <p className="text-base font-bold text-gray-700">Tidak ada lowongan ditemukan</p>
          <p className="text-xs text-gray-500 mt-1">Coba sesuaikan kata kunci pencarian atau tambah lowongan baru.</p>
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
                  {/* Status Toggle Button */}
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

                  {/* Edit Button */}
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(job)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition shadow-xs"
                  >
                    <span className="material-symbols-outlined text-sm">edit</span>
                    Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => setDeletingId(job.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition shadow-xs"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                    Hapus
                  </button>
                </div>
              </div>

              {/* Accordion / Details Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-1">
                {/* Kualifikasi */}
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#F65456] text-base">checklist</span>
                    Kualifikasi Persyaratan ({job.qualifications?.length || 0}):
                  </p>
                  <ul className="space-y-1.5 text-xs text-gray-600 list-disc list-inside">
                    {job.qualifications?.map((q, idx) => (
                      <li key={idx} className="leading-relaxed">{q}</li>
                    ))}
                  </ul>
                </div>

                {/* Tanggung Jawab / Deskripsi */}
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-blue-600 text-base">assignment</span>
                    Tanggung Jawab Pekerjaan ({job.responsibilities?.length || 0}):
                  </p>
                  <ul className="space-y-1.5 text-xs text-gray-600 list-disc list-inside">
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

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
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
                  <p className="text-xs text-gray-500">
                    Masukkan detail informasi posisi, kualifikasi, dan tanggung jawab kerja.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center text-sm font-bold transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveJob} className="p-6 space-y-4 overflow-y-auto flex-1">
              {/* Judul Posisi */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Judul Posisi Lowongan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Contoh: Operator Mesin Hot Stamping Foil"
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456] focus:bg-white transition"
                />
              </div>

              {/* Grid 2 Kolom: Divisi & Tipe */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Divisi / Departemen <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formDivision}
                    onChange={(e) => setFormDivision(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456] focus:bg-white transition font-medium"
                  >
                    {DIVISIONS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Tipe Pekerjaan
                  </label>
                  <input
                    type="text"
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    placeholder="Contoh: Full-Time (WFO)"
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456] focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Lokasi & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Lokasi Penempatan
                  </label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="Bizpark C17-C19, Sidoarjo"
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F65456] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Status Lowongan
                  </label>
                  <div className="flex items-center gap-3 pt-2">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-semibold text-gray-700">
                      <input
                        type="checkbox"
                        checked={formIsOpen}
                        onChange={(e) => setFormIsOpen(e.target.checked)}
                        className="w-4 h-4 rounded text-[#F65456] focus:ring-[#F65456] accent-[#F65456]"
                      />
                      <span>Tampilkan Sebagai "Dibuka"</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Kualifikasi Persyaratan (Multi Items) */}
              <div className="pt-2 border-t border-gray-100">
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Kualifikasi & Persyaratan (Poin-Poin)
                </label>
                <p className="text-[11px] text-gray-500 mb-2">
                  Tambahkan syarat pendidikan, pengalaman, dan keahlian yang dibutuhkan.
                </p>

                <div className="space-y-1.5 mb-2.5 max-h-36 overflow-y-auto">
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
                    placeholder="Ketik kualifikasi lalu klik Tambah / Enter..."
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

              {/* Tanggung Jawab / Deskripsi (Multi Items) */}
              <div className="pt-2 border-t border-gray-100">
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Tanggung Jawab Pekerjaan (Deskripsi Kerja)
                </label>
                <p className="text-[11px] text-gray-500 mb-2">
                  Tambahkan rincian tugas dan tanggung jawab harian pekerjaan ini.
                </p>

                <div className="space-y-1.5 mb-2.5 max-h-36 overflow-y-auto">
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
                    placeholder="Ketik tanggung jawab lalu klik Tambah / Enter..."
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

              {/* Modal Actions */}
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

      {/* DELETE CONFIRMATION MODAL */}
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
                Posisi ini akan dihapus dari daftar lowongan website CV Pelangi UV. Tindakan ini tidak dapat dibatalkan.
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
  );
}

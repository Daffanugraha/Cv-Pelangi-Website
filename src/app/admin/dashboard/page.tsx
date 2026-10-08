"use client";

import { useEffect, useState, useMemo } from "react";
import AdminShell from "../AdminShell";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";
import type { GalleryItem, LeadItem, CareerJobItem, JobApplicantItem } from "@/lib/admin/db";

const LEAD_STATUS_MAP: Record<string, { label: string; color: string }> = {
  new: { label: "Baru", color: "bg-red-50 text-red-700 border-red-200" },
  contacted: { label: "Dihubungi", color: "bg-blue-50 text-blue-700 border-blue-200" },
  sample_sent: { label: "Sampel Dikirim", color: "bg-purple-50 text-purple-700 border-purple-200" },
  closed: { label: "Closed / Order", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
};

const APPLICANT_STATUS_MAP: Record<string, { label: string; color: string }> = {
  new: { label: "Baru", color: "bg-amber-50 text-amber-800 border-amber-200" },
  reviewed: { label: "Ditinjau", color: "bg-blue-50 text-blue-800 border-blue-200" },
  interview: { label: "Interview", color: "bg-purple-50 text-purple-800 border-purple-200" },
  rejected: { label: "Ditolak", color: "bg-gray-100 text-gray-700 border-gray-200" },
};

export default function DashboardPage() {
  const router = useRouter();
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [momenCount, setMomenCount] = useState(0);
  const [jobs, setJobs] = useState<CareerJobItem[]>([]);
  const [applicants, setApplicants] = useState<JobApplicantItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadDashboardData() {
    try {
      const [gRes, lRes, mRes, jRes, aRes] = await Promise.all([
        fetch("/api/admin/gallery"),
        fetch("/api/admin/leads"),
        fetch("/api/admin/momen"),
        fetch("/api/admin/jobs"),
        fetch("/api/admin/applicants"),
      ]);


      if (gRes.ok) setGallery(await gRes.json());
      if (lRes.ok) setLeads(await lRes.json());
      if (mRes.ok) {
        const mData = await mRes.json();
        setMomenCount(Array.isArray(mData?.albums) ? mData.albums.length : Array.isArray(mData) ? mData.length : 0);
      }
      if (jRes.ok) setJobs(await jRes.json());
      if (aRes.ok) setApplicants(await aRes.json());
    } catch (err) {
      console.error("Gagal memuat data dashboard:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboardData();
  }, [router]);

  // Derived Metrics
  const newLeads = useMemo(() => leads.filter((l) => l.status === "new").length, [leads]);
  const newApplicants = useMemo(() => applicants.filter((a) => a.status === "new").length, [applicants]);
  const openJobs = useMemo(() => jobs.filter((j) => j.isOpen).length, [jobs]);

  if (loading) {
    return (
      <AdminShell>
        <div className="space-y-6 animate-pulse">
          <div className="h-10 bg-gray-200 rounded-xl w-64" />
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-28 bg-white border border-gray-200 rounded-2xl p-4" />
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="h-80 bg-white border border-gray-200 rounded-2xl" />
            <div className="h-80 bg-white border border-gray-200 rounded-2xl" />
          </div>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      {/* 1. Header dengan Quick Actions */}
      <AdminPageHeader
        title="Dashboard Ikhtisar"
        description="Ringkasan aktivitas operasional, berkas kandidat pelamar, pesanan lead, dan katalog media CV Pelangi UV."
        badge="Sistem Aktif"
        badgeVariant="success"
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                loadDashboardData();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold shadow-2xs transition cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-base">refresh</span>
              <span>Muat Ulang</span>
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111216] hover:bg-black text-white text-xs font-bold shadow-xs transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">open_in_new</span>
              <span>Lihat Website</span>
            </a>
          </div>
        }
      />

      {/* 2. Stat Cards Grid (5 Metrik Kunci) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-7">
        <AdminStatCard
          icon="badge"
          label="Berkas Pelamar"
          value={applicants.length}
          sublabel={newApplicants > 0 ? `+${newApplicants} berkas baru` : "Semua telah ditinjau"}
          color="amber"
          onClick={() => router.push("/admin/pelamar")}
        />

        <AdminStatCard
          icon="work"
          label="Lowongan Karir"
          value={jobs.length}
          sublabel={`${openJobs} posisi dibuka`}
          color="emerald"
          onClick={() => router.push("/admin/karir")}
        />

        <AdminStatCard
          icon="inbox"
          label="Pesan Lead"
          value={leads.length}
          sublabel={newLeads > 0 ? `+${newLeads} pesan baru` : "Semua direspon ✓"}
          color="blue"
          onClick={() => router.push("/admin/leads")}
        />

        <AdminStatCard
          icon="photo_library"
          label="Foto Galeri"
          value={gallery.length}
          sublabel="Katalog portofolio"
          color="red"
          onClick={() => router.push("/admin/galeri")}
        />

        <AdminStatCard
          icon="collections_bookmark"
          label="Album Momen"
          value={momenCount}
          sublabel="Event & aktivitas tim"
          color="gray"
          onClick={() => router.push("/admin/momen")}
        />
      </div>

      {/* 3. Quick Shortcuts Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-gray-900 via-neutral-900 to-gray-800 text-white mb-7 shadow-sm border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-sm sm:text-base text-white">
            Pusat Aksi Cepat Manajemen
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Kelola lowongan pekerjaan, tinjau berkas pelamar masuk, atau update konten visual website secara langsung.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Link
            href="/admin/pelamar"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm transition active:scale-95"
          >
            <span className="material-symbols-outlined text-base">how_to_reg</span>
            <span>Tinjau Pelamar ({newApplicants})</span>
          </Link>

          <Link
            href="/admin/karir"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 transition active:scale-95"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>Tambah Lowongan</span>
          </Link>

          <Link
            href="/admin/momen"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 transition active:scale-95"
          >
            <span className="material-symbols-outlined text-base">add_photo_alternate</span>
            <span>Tambah Momen</span>
          </Link>
        </div>
      </div>

      {/* 4. Two Primary Data Grids: Pelamar Terbaru & Pesan Leads */}
      <div className="grid lg:grid-cols-2 gap-6 mb-7">
        {/* Widget 1: Pelamar Karir Masuk Terbaru */}
        <div className="bg-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-xs flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-600 text-lg">badge</span>
              <h2 className="font-heading font-bold text-gray-900 text-sm sm:text-base">
                Pelamar Karir Terbaru
              </h2>
            </div>
            <Link
              href="/admin/pelamar"
              className="text-xs font-bold text-[#F65456] hover:underline transition"
            >
              Lihat Semua ({applicants.length}) →
            </Link>
          </div>

          <div className="divide-y divide-gray-100 flex-1">
            {applicants.slice(0, 5).map((app) => {
              const statusCfg = APPLICANT_STATUS_MAP[app.status] || APPLICANT_STATUS_MAP.new;
              return (
                <div
                  key={app.id}
                  className="px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-gray-50/80 transition"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {app.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {app.jobTitle} • {app.phone}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${statusCfg.color}`}
                    >
                      {statusCfg.label}
                    </span>
                    <Link
                      href={`/admin/pelamar`}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition"
                      title="Buka Berkas"
                    >
                      <span className="material-symbols-outlined text-base">visibility</span>
                    </Link>
                  </div>
                </div>
              );
            })}

            {applicants.length === 0 && (
              <div className="p-8 text-center text-gray-400 text-xs sm:text-sm">
                Belum ada berkas pelamar karir yang masuk saat ini.
              </div>
            )}
          </div>
        </div>

        {/* Widget 2: Pesan Lead Pelanggan Terbaru */}
        <div className="bg-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-xs flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600 text-lg">inbox</span>
              <h2 className="font-heading font-bold text-gray-900 text-sm sm:text-base">
                Pesan Lead Masuk
              </h2>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-bold text-[#F65456] hover:underline transition"
            >
              Lihat Semua ({leads.length}) →
            </Link>
          </div>

          <div className="divide-y divide-gray-100 flex-1">
            {leads.slice(0, 5).map((lead) => {
              const statusCfg = LEAD_STATUS_MAP[lead.status] || LEAD_STATUS_MAP.new;
              return (
                <div
                  key={lead.id}
                  className="px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-gray-50/80 transition"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {lead.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {lead.company || "Perseorangan"} • Layanan {lead.service}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${statusCfg.color}`}
                  >
                    {statusCfg.label}
                  </span>
                </div>
              );
            })}

            {leads.length === 0 && (
              <div className="p-8 text-center text-gray-400 text-xs sm:text-sm">
                Belum ada pesan lead masuk dari calon pelanggan.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Koleksi Galeri Preview */}
      <div className="bg-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-xs">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-bracket-border text-lg">photo_library</span>
            <h2 className="font-heading font-bold text-gray-900 text-sm sm:text-base">
              Portofolio Galeri Terkini
            </h2>
          </div>
          <Link
            href="/admin/galeri"
            className="text-xs font-bold text-[#F65456] hover:underline transition"
          >
            Kelola Galeri →
          </Link>
        </div>

        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
            {gallery.slice(0, 9).map((item) => (
              <div
                key={item.id}
                className="aspect-square rounded-xl overflow-hidden bg-gray-100 relative group border border-gray-200/80 shadow-2xs"
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                {item.featured && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-amber-400 text-black rounded-full flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-[10px] font-bold">star</span>
                  </div>
                )}
              </div>
            ))}

            {gallery.length === 0 && (
              <div className="col-span-full py-8 text-center text-gray-400 text-xs sm:text-sm">
                Belum ada foto yang diunggah ke galeri portofolio.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

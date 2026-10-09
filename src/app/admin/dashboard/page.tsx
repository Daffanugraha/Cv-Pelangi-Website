"use client";

import { useEffect, useState, useMemo } from "react";
import AdminShell from "../AdminShell";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DashboardSkeleton from "@/components/admin/dashboard/DashboardSkeleton";
import DashboardMetricsGrid from "@/components/admin/dashboard/DashboardMetricsGrid";
import DashboardVisitorStats from "@/components/admin/dashboard/DashboardVisitorStats";
import DashboardQuickActions from "@/components/admin/dashboard/DashboardQuickActions";
import DashboardRecentApplicants from "@/components/admin/dashboard/DashboardRecentApplicants";
import DashboardRecentLeads from "@/components/admin/dashboard/DashboardRecentLeads";
import DashboardGalleryPreview from "@/components/admin/dashboard/DashboardGalleryPreview";
import type { GalleryItem, LeadItem, CareerJobItem, JobApplicantItem } from "@/lib/admin/db";

export default function DashboardPage() {
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
        setMomenCount(
          Array.isArray(mData?.albums)
            ? mData.albums.length
            : Array.isArray(mData)
            ? mData.length
            : 0
        );
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
  }, []);

  // Derived Metrics
  const newLeads = useMemo(
    () => leads.filter((l) => l.status === "new").length,
    [leads]
  );
  const newApplicants = useMemo(
    () => applicants.filter((a) => a.status === "new").length,
    [applicants]
  );
  const openJobs = useMemo(
    () => jobs.filter((j) => j.isOpen).length,
    [jobs]
  );

  if (loading) {
    return (
      <AdminShell>
        <DashboardSkeleton />
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      {/* 1. Header */}
      <AdminPageHeader
        title="Dashboard"
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
      <DashboardMetricsGrid
        applicantsCount={applicants.length}
        newApplicantsCount={newApplicants}
        jobsCount={jobs.length}
        openJobsCount={openJobs}
        leadsCount={leads.length}
        newLeadsCount={newLeads}
        galleryCount={gallery.length}
        momenCount={momenCount}
      />

      {/* 3. Grafik Statistik Pengunjung & Halaman Sering Dilihat */}
      <DashboardVisitorStats initialRange={7} />

      {/* 4. Quick Shortcuts Banner */}
      <DashboardQuickActions newApplicantsCount={newApplicants} />

      {/* 4. Two Primary Data Grids: Pelamar Terbaru & Pesan Leads */}
      <div className="grid lg:grid-cols-2 gap-6 mb-7">
        <DashboardRecentApplicants applicants={applicants} />
        <DashboardRecentLeads leads={leads} />
      </div>

      {/* 5. Koleksi Galeri Preview */}
      <DashboardGalleryPreview gallery={gallery} />
    </AdminShell>
  );
}

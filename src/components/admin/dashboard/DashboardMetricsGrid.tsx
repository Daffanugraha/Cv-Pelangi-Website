"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AdminStatCard from "../AdminStatCard";

interface DashboardMetricsGridProps {
  applicantsCount: number;
  newApplicantsCount: number;
  jobsCount: number;
  openJobsCount: number;
  leadsCount: number;
  newLeadsCount: number;
  galleryCount: number;
  momenCount: number;
}

export default function DashboardMetricsGrid({
  applicantsCount,
  newApplicantsCount,
  jobsCount,
  openJobsCount,
  leadsCount,
  newLeadsCount,
  galleryCount,
  momenCount,
}: DashboardMetricsGridProps) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-7">
      <AdminStatCard
        icon="badge"
        label="Berkas Pelamar"
        value={applicantsCount}
        sublabel={newApplicantsCount > 0 ? `+${newApplicantsCount} berkas baru` : "Semua telah ditinjau"}
        color="amber"
        onClick={() => router.push("/admin/pelamar")}
      />

      <AdminStatCard
        icon="work"
        label="Lowongan Karir"
        value={jobsCount}
        sublabel={`${openJobsCount} posisi dibuka`}
        color="emerald"
        onClick={() => router.push("/admin/karir")}
      />

      <AdminStatCard
        icon="inbox"
        label="Pesan Lead"
        value={leadsCount}
        sublabel={newLeadsCount > 0 ? `+${newLeadsCount} pesan baru` : "Semua direspon ✓"}
        color="blue"
        onClick={() => router.push("/admin/leads")}
      />

      <AdminStatCard
        icon="photo_library"
        label="Foto Galeri"
        value={galleryCount}
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
  );
}

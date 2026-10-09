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
        label="Pelamar"
        value={applicantsCount}
        sublabel={newApplicantsCount > 0 ? `${newApplicantsCount} baru` : undefined}
        color="amber"
        onClick={() => router.push("/admin/pelamar")}
      />

      <AdminStatCard
        icon="work"
        label="Lowongan"
        value={jobsCount}
        sublabel={`${openJobsCount} aktif`}
        color="emerald"
        onClick={() => router.push("/admin/karir")}
      />

      <AdminStatCard
        icon="inbox"
        label="Pesan Lead"
        value={leadsCount}
        sublabel={newLeadsCount > 0 ? `${newLeadsCount} baru` : undefined}
        color="blue"
        onClick={() => router.push("/admin/leads")}
      />

      <AdminStatCard
        icon="photo_library"
        label="Galeri"
        value={galleryCount}
        sublabel="Portofolio"
        color="red"
        onClick={() => router.push("/admin/galeri")}
      />

      <AdminStatCard
        icon="collections_bookmark"
        label="Momen"
        value={momenCount}
        sublabel="Album"
        color="gray"
        onClick={() => router.push("/admin/momen")}
      />
    </div>
  );
}

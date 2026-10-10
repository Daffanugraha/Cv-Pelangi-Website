import React from "react";
import type { Metadata } from "next";
import KarirPageContent from "@/components/sections/karir/KarirPageContent";
import { getJobs } from "@/lib/admin/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Karir & Rekrutmen - CV Pelangi UV | Peluang Kerja Industri Percetakan",
  description:
    "Bergabunglah dengan CV Pelangi UV. Buka kesempatan karir di bidang Finance & Pajak, Marketing, Operasional, Operator Mesin Finishing, dan Warehouse Logistik.",
  keywords: [
    "karir pelangi uv",
    "lowongan kerja percetakan",
    "loker finishing cetak",
    "loker admin pajak",
    "loker operator mesin cetak",
    "CV Pelangi UV karir",
  ],
};

export default function KarirPage() {
  const jobs = getJobs();
  return <KarirPageContent initialJobs={jobs} />;
}


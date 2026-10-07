import React from "react";
import type { Metadata } from "next";
import KarirPageContent from "@/components/sections/karir/KarirPageContent";
import { getJobs } from "@/lib/admin/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Karir & Rekrutmen - CV Pelangi UV | Peluang Kerja Industri Percetakan",
  description:
    "Bergabunglah dengan CV Pelangi UV di Bizpark Sidoarjo. Buka kesempatan karir di bidang Finance & Pajak, Marketing, Operasional, Operator Mesin Finishing, dan Warehouse Logistik.",
  keywords: [
    "karir pelangi uv",
    "lowongan kerja percetakan sidoarjo",
    "loker finishing cetak",
    "loker admin pajak sidoarjo",
    "loker operator mesin cetak",
    "CV Pelangi UV karir",
    "loker bizpark sidoarjo",
  ],
};

export default function KarirPage() {
  const jobs = getJobs();
  return <KarirPageContent initialJobs={jobs} />;
}


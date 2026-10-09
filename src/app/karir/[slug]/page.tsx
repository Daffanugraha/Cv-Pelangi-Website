import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJobs, getJobBySlug, slugifyJobTitle } from "@/lib/admin/db";
import KarirJobDetailClient from "./KarirJobDetailClient";

export const dynamic = "force-dynamic";

interface KarirDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: KarirDetailPageProps): Promise<Metadata> {
  const job = getJobBySlug(params.slug);

  if (!job) {
    return {
      title: "Lowongan Tidak Ditemukan - Karir CV Pelangi UV",
      description: "Lowongan kerja yang Anda cari tidak ditemukan atau sudah ditutup.",
    };
  }

  const title = `${job.title} (${job.division}) - Lowongan Karir CV Pelangi UV`;
  const description = `Lowongan kerja ${job.title} di CV Pelangi UV Bizpark Sidoarjo. Tipe ${job.type}, penempatan di Sidoarjo. Kirim berkas lamaran dan CV Anda sekarang secara online.`;

  return {
    title,
    description,
    keywords: [
      `lowongan ${job.title.toLowerCase()}`,
      `loker ${job.title.toLowerCase()} sidoarjo`,
      `karir pelangi uv ${job.division.toLowerCase()}`,
      "loker percetakan sidoarjo",
      "loker bizpark sidoarjo",
      "CV Pelangi UV karir",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "id_ID",
      siteName: "CV Pelangi UV",
    },
  };
}

export async function generateStaticParams() {
  const jobs = getJobs();
  const params: { slug: string }[] = [];

  for (const job of jobs) {
    params.push({ slug: job.id });
    const slug = slugifyJobTitle(job.title);
    if (slug !== job.id) {
      params.push({ slug });
    }
  }

  return params;
}

export default function KarirDetailPage({ params }: KarirDetailPageProps) {
  const job = getJobBySlug(params.slug);

  if (!job) {
    notFound();
  }

  const allJobs = getJobs();
  const otherJobs = allJobs.filter((j) => j.id !== job.id && j.isOpen);

  return <KarirJobDetailClient job={job} otherJobs={otherJobs} />;
}

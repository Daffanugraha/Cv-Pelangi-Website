import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getJobBySlug } from "@/lib/admin/db";

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
  const description = `Lowongan kerja ${job.title} di CV Pelangi UV. Tipe ${job.type}. Kirim berkas lamaran dan CV Anda sekarang secara online.`;

  return {
    title,
    description,
    keywords: [
      `lowongan ${job.title.toLowerCase()}`,
      `loker ${job.title.toLowerCase()}`,
      `karir pelangi uv ${job.division.toLowerCase()}`,
      "loker percetakan",
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

export default function KarirDetailPage({ params }: KarirDetailPageProps) {
  // Langsung direct ke halaman utama karir dengan posisi aktif dan popup formulir lamaran
  redirect(`/karir?posisi=${encodeURIComponent(params.slug)}#posisi-terbuka`);
}

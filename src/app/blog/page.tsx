import React from "react";
import type { Metadata } from "next";
import { BlogPageContent } from "@/components/sections/blog";

import { getBlogArticles } from "@/lib/admin/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title:
    "Blog & Berita Percetakan - CV Pelangi UV | Panduan Mesin & Tips Finishing Cetak",
  description:
    "Kumpulan artikel, inovasi formulasi Spot UV, Hot Stamping Foil, teknik laminating presisi, hingga panduan mesin pond otomatis dari tim ahli CV Pelangi UV Sidoarjo.",
  keywords: [
    "blog percetakan",
    "panduan spot uv",
    "tips hot stamping foil",
    "mesin pond otomatis oyang",
    "mesin laminating yzfm",
    "cv pelangi uv blog",
    "artikel finishing cetak surabaya",
  ],
};

export default function BlogPage() {
  const initialArticles = getBlogArticles();
  return <BlogPageContent initialArticles={initialArticles} />;
}

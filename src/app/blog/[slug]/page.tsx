import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/lib/data/articles";
import { BlogDetailContent } from "@/components/sections/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan - CV Pelangi UV",
      description: "Artikel yang Anda cari tidak ditemukan atau telah dipindahkan.",
    };
  }

  return {
    title: `${article.title} - CV Pelangi UV Blog`,
    description: article.desc,
    keywords: [
      article.category,
      ...(article.technicalChips || []),
      "cv pelangi uv",
      "finishing cetak surabaya",
      "blog percetakan",
    ],
    openGraph: {
      title: `${article.title} - CV Pelangi UV`,
      description: article.desc,
      images: [{ url: article.img }],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <BlogDetailContent article={article} />;
}

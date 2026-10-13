import { MetadataRoute } from "next";
import { articlesData, featuredArticle } from "@/lib/data/articles";
import { CAREER_JOBS } from "@/data/careers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://cv-pelangi-website.vercel.app";

  const now = new Date();

  // 1. Halaman Publik Utama
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/layanan`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bahan-baku`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/galeri`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/galeri/pengaplikasian-produk`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/galeri/momen`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kontak`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/karir`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // 2. Artikel Blog Dinamis
  const allArticles = [featuredArticle, ...articlesData];
  const uniqueArticles = Array.from(
    new Map(allArticles.map((item) => [item.slug, item])).values()
  );

  function parseSafeDate(dateStr?: string): Date {
    if (!dateStr) return now;
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? now : parsed;
  }

  const blogRoutes: MetadataRoute.Sitemap = uniqueArticles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: parseSafeDate(article.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 3. Lowongan Karir Dinamis
  const careerRoutes: MetadataRoute.Sitemap = CAREER_JOBS.filter(
    (job) => job.isOpen
  ).map((job) => ({
    url: `${baseUrl}/karir/${job.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...careerRoutes];
}

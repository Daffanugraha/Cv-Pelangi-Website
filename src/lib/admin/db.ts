/**
 * Admin DB helpers — lightweight file-based data store
 * No external database needed. Data is persisted in JSON files inside /data/admin/
 * on the server filesystem. Perfect for a single-operator admin panel.
 */

import fs from "fs";
import path from "path";
import { CAREER_JOBS, CareerJob } from "@/data/careers";
import { MOMEN_ALBUMS, MomenAlbum, MomenPhoto } from "@/lib/data/galeriMomen";
import { featuredArticle, articlesData, ArticleItem } from "@/lib/data/articles";
import { query, isPostgresConfigured } from "@/lib/db/postgres";

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const DATA_DIR = path.join(process.cwd(), "data", "admin");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function filePath(name: string) {
  return path.join(DATA_DIR, `${name}.json`);
}

function readJSON<T>(name: string, fallback: T): T {
  ensureDir();
  const fp = filePath(name);
  if (!fs.existsSync(fp)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(fp, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

function writeJSON(name: string, data: unknown) {
  ensureDir();
  fs.writeFileSync(filePath(name), JSON.stringify(data, null, 2), "utf-8");
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  technique: string;
  imageUrl: string;
  fileName: string;
  createdAt: string;
  order: number;
  featured: boolean;
  galleryType?: "beranda" | "produk";
  videoUrl?: string;
  tag?: string;
}

export interface LeadItem {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  status: "new" | "contacted" | "sample_sent" | "closed";
  createdAt: string;
}

export interface SiteSettings {
  bannerEnabled: boolean;
  bannerText: string;
  waNumber: string;
  operationalHours: string;
  closedDates: string;
}

// ---------------------------------------------------------------------------
// Gallery CRUD
// ---------------------------------------------------------------------------
export function getGallery(type?: string): GalleryItem[] {
  const items = readJSON<GalleryItem[]>("gallery", []);
  if (!type || type === "all") return items;
  return items.filter((i) => (i.galleryType || "produk") === type);
}

export function saveGallery(items: GalleryItem[]) {
  writeJSON("gallery", items);
}

export function addGalleryItem(item: Omit<GalleryItem, "id" | "createdAt" | "order">) {
  const items = getGallery();
  const newItem: GalleryItem = {
    ...item,
    id: `g_${Date.now()}`,
    createdAt: new Date().toISOString(),
    order: 0,
  };
  items.unshift(newItem);
  saveGallery(items);
  return newItem;
}

export function deleteGalleryItem(id: string) {
  const items = getGallery().filter((i) => i.id !== id);
  saveGallery(items);
}

export function updateGalleryItem(id: string, patch: Partial<GalleryItem>) {
  const items = getGallery().map((i) => (i.id === id ? { ...i, ...patch } : i));
  saveGallery(items);
}

// ---------------------------------------------------------------------------
// Leads CRUD
// ---------------------------------------------------------------------------
export function getLeads(): LeadItem[] {
  return readJSON<LeadItem[]>("leads", []);
}

export function addLead(lead: Omit<LeadItem, "id" | "createdAt" | "status">) {
  const leads = getLeads();
  const newLead: LeadItem = {
    ...lead,
    id: `l_${Date.now()}`,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  leads.unshift(newLead);
  writeJSON("leads", leads);
  return newLead;
}

export function updateLeadStatus(id: string, status: LeadItem["status"]) {
  const leads = getLeads().map((l) => (l.id === id ? { ...l, status } : l));
  writeJSON("leads", leads);
}

export function deleteLead(id: string) {
  const leads = getLeads().filter((l) => l.id !== id);
  writeJSON("leads", leads);
}

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------
const DEFAULT_SETTINGS: SiteSettings = {
  bannerEnabled: false,
  bannerText: "Penerimaan order finishing tutup tanggal 20. Segera konfirmasi jadwal produksi Anda.",
  waNumber: "6282231019363",
  operationalHours: "Senin – Sabtu: 08.00 – 17.00 WIB",
  closedDates: "",
};

export function getSettings(): SiteSettings {
  return readJSON<SiteSettings>("settings", DEFAULT_SETTINGS);
}

export function saveSettings(settings: SiteSettings) {
  writeJSON("settings", settings);
}

// ---------------------------------------------------------------------------
// Jobs CRUD (Lowongan Kerja)
// ---------------------------------------------------------------------------
export type CareerJobItem = CareerJob & {
  createdAt?: string;
};

export function getJobs(): CareerJobItem[] {
  return readJSON<CareerJobItem[]>("jobs", CAREER_JOBS);
}

export function saveJobs(jobs: CareerJobItem[]) {
  writeJSON("jobs", jobs);
}

export function addJobItem(job: Omit<CareerJobItem, "id" | "createdAt">): CareerJobItem {
  const jobs = getJobs();
  const idSlug = job.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const newJob: CareerJobItem = {
    ...job,
    id: `${idSlug || "posisi"}-${Date.now().toString().slice(-4)}`,
    createdAt: new Date().toISOString(),
  };
  jobs.unshift(newJob);
  saveJobs(jobs);
  return newJob;
}

export function updateJobItem(id: string, patch: Partial<CareerJobItem>) {
  const jobs = getJobs().map((j) => (j.id === id ? { ...j, ...patch } : j));
  saveJobs(jobs);

  if (isPostgresConfigured()) {
    const existing = jobs.find((j) => j.id === id);
    if (existing) {
      query(
        `UPDATE career_jobs SET
          title = $1, division = $2, type = $3, location = $4,
          qualifications = $5, responsibilities = $6, is_open = $7,
          updated_at = NOW()
        WHERE id = $8`,
        [
          existing.title,
          existing.division,
          existing.type,
          existing.location,
          JSON.stringify(existing.qualifications || []),
          JSON.stringify(existing.responsibilities || []),
          existing.isOpen !== false,
          id,
        ]
      ).catch((err) => console.warn("[Postgres Update Job Error]:", err.message));
    }
  }
}

export function deleteJobItem(id: string) {
  const jobs = getJobs().filter((j) => j.id !== id);
  saveJobs(jobs);

  if (isPostgresConfigured()) {
    query("DELETE FROM career_jobs WHERE id = $1", [id]).catch((err) =>
      console.warn("[Postgres Delete Job Error]:", err.message)
    );
  }
}

// ---------------------------------------------------------------------------
// Momen CRUD (Momen & Kegiatan Pelangi UV)
// ---------------------------------------------------------------------------
export type MomenPhotoItem = MomenPhoto;

export type MomenAlbumItem = {
  id: string;
  category: string;
  title: string;
  desc: string;
  photos: MomenPhotoItem[];
  isHighlight?: boolean;
  createdAt?: string;
  order?: number;
};

export function getMomenAlbums(): MomenAlbumItem[] {
  const initialData: MomenAlbumItem[] = MOMEN_ALBUMS.map((album, idx) => ({
    id: album.category || `momen-${idx}`,
    category: album.category,
    title: album.title,
    desc: album.desc,
    photos: album.photos,
    isHighlight: true,
    order: idx + 1,
  }));
  return readJSON<MomenAlbumItem[]>("momen", initialData);
}

export function saveMomenAlbums(albums: MomenAlbumItem[]) {
  writeJSON("momen", albums);
}

export function addMomenAlbum(album: Omit<MomenAlbumItem, "id" | "createdAt">): MomenAlbumItem {
  const albums = getMomenAlbums();
  const idSlug = album.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const newAlbum: MomenAlbumItem = {
    ...album,
    id: `${idSlug || "momen"}-${Date.now().toString().slice(-4)}`,
    category: album.category || idSlug || `momen-${Date.now()}`,
    createdAt: new Date().toISOString(),
    order: albums.length + 1,
  };
  albums.unshift(newAlbum);
  saveMomenAlbums(albums);
  return newAlbum;
}

export function updateMomenAlbum(id: string, patch: Partial<MomenAlbumItem>) {
  const albums = getMomenAlbums().map((item) =>
    item.id === id || item.category === id ? { ...item, ...patch } : item
  );
  saveMomenAlbums(albums);
}

export function deleteMomenAlbum(id: string) {
  const albums = getMomenAlbums().filter((item) => item.id !== id && item.category !== id);
  saveMomenAlbums(albums);
}

// ---------------------------------------------------------------------------
// Applicants CRUD (Data Pelamar Karir)
// ---------------------------------------------------------------------------
export interface JobApplicantItem {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  age?: number | string;
  birthPlaceDate?: string;
  maritalStatus?: "Single" | "Menikah" | string;
  phone: string;
  email?: string;
  address: string;
  education?: string;
  educationMajor?: string;
  hasExperience?: "yes" | "no";

  // Referensi kantor sebelumnya
  reference1?: string; // Nama - No Tlp - Jabatan
  reference2?: string; // Nama - No Tlp - Jabatan
  referencePhone?: string; // Legacy fallback
  referenceRelation?: string;

  // Riwayat Pengalaman Kerja 1, 2, 3
  experience1?: string;
  experience2?: string;
  experience3?: string;
  experience: string; // Combined summary

  // Komitmen & Fasilitas
  readyNoWorkNoPay?: "Ya" | "Tidak" | string;
  readyOvertime?: "Ya" | "Tidak" | string;
  expectedSalary?: string;
  expectedFacilities?: string;

  // Evaluasi Diri
  threeWeaknesses?: string;
  threeStrengths?: string;
  fiveSkills?: string;
  strengths: string;
  weaknesses: string;

  // Berkas & Portofolio
  hasPortfolio?: "yes" | "no";
  portfolioUrl?: string;
  cvUrl?: string;
  fileName?: string;
  status: "new" | "reviewed" | "interview" | "rejected" | "accepted";
  createdAt: string;
}

export function getApplicants(): JobApplicantItem[] {
  return readJSON<JobApplicantItem[]>("applicants", []);
}

export function saveApplicants(items: JobApplicantItem[]) {
  writeJSON("applicants", items);
}

export function addApplicant(
  item: Omit<JobApplicantItem, "id" | "createdAt" | "status">
): JobApplicantItem {
  const applicants = getApplicants();
  const newApplicant: JobApplicantItem = {
    ...item,
    id: `app_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  applicants.unshift(newApplicant);
  saveApplicants(applicants);

  // Sync ke PostgreSQL di background jika DATABASE_URL terkonfigurasi
  if (isPostgresConfigured()) {
    query(
      `INSERT INTO job_applicants (
        id, job_id, job_title, name, birth_place_date, marital_status, age,
        phone, email, address, education, education_major, has_experience,
        experience, experience1, experience2, experience3,
        reference1, reference2, reference_phone, reference_relation,
        ready_no_work_no_pay, ready_overtime, expected_salary, expected_facilities,
        three_weaknesses, three_strengths, five_skills, strengths, weaknesses,
        has_portfolio, portfolio_url, cv_url, file_name, status, created_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12, $13,
        $14, $15, $16, $17,
        $18, $19, $20, $21,
        $22, $23, $24, $25,
        $26, $27, $28, $29, $30,
        $31, $32, $33, $34, $35, $36
      ) ON CONFLICT (id) DO NOTHING`,
      [
        newApplicant.id,
        newApplicant.jobId || null,
        newApplicant.jobTitle,
        newApplicant.name,
        newApplicant.birthPlaceDate || null,
        newApplicant.maritalStatus || "Single",
        newApplicant.age ? String(newApplicant.age) : null,
        newApplicant.phone,
        newApplicant.email || "-",
        newApplicant.address,
        newApplicant.education || null,
        newApplicant.educationMajor || null,
        newApplicant.hasExperience || "yes",
        newApplicant.experience || null,
        newApplicant.experience1 || null,
        newApplicant.experience2 || null,
        newApplicant.experience3 || null,
        newApplicant.reference1 || null,
        newApplicant.reference2 || null,
        newApplicant.referencePhone || null,
        newApplicant.referenceRelation || null,
        newApplicant.readyNoWorkNoPay || "Ya",
        newApplicant.readyOvertime || "Ya",
        newApplicant.expectedSalary || null,
        newApplicant.expectedFacilities || null,
        newApplicant.threeWeaknesses || null,
        newApplicant.threeStrengths || null,
        newApplicant.fiveSkills || null,
        newApplicant.strengths || null,
        newApplicant.weaknesses || null,
        newApplicant.hasPortfolio || "no",
        newApplicant.portfolioUrl || null,
        newApplicant.cvUrl || null,
        newApplicant.fileName || null,
        newApplicant.status,
        new Date(newApplicant.createdAt),
      ]
    ).catch((err) => console.warn("[Postgres Sync Applicant Error]:", err.message));
  }

  return newApplicant;
}

export function updateApplicantStatus(
  id: string,
  status: JobApplicantItem["status"]
) {
  const applicants = getApplicants().map((a) =>
    a.id === id ? { ...a, status } : a
  );
  saveApplicants(applicants);

  if (isPostgresConfigured()) {
    query("UPDATE job_applicants SET status = $1, updated_at = NOW() WHERE id = $2", [
      status,
      id,
    ]).catch((err) => console.warn("[Postgres Update Status Error]:", err.message));
  }
}

export function deleteApplicant(id: string) {
  const applicants = getApplicants().filter((a) => a.id !== id);
  saveApplicants(applicants);

  if (isPostgresConfigured()) {
    query("DELETE FROM job_applicants WHERE id = $1", [id]).catch((err) =>
      console.warn("[Postgres Delete Applicant Error]:", err.message)
    );
  }
}

// ---------------------------------------------------------------------------
// Blog Articles CRUD (Berita & Artikel Publikasi)
// ---------------------------------------------------------------------------
export type BlogArticleItem = ArticleItem;

export function getBlogArticles(): BlogArticleItem[] {
  const initial = [featuredArticle, ...articlesData];
  return readJSON<BlogArticleItem[]>("blog", initial);
}

export function saveBlogArticles(articles: BlogArticleItem[]) {
  writeJSON("blog", articles);
}

export function addBlogArticle(
  item: Omit<BlogArticleItem, "id">
): BlogArticleItem {
  const articles = getBlogArticles();
  const idSlug =
    item.slug ||
    item.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  const newArticle: BlogArticleItem = {
    ...item,
    id: `art_${Date.now()}`,
    slug: idSlug || `berita-${Date.now()}`,
    date:
      item.date ||
      new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    views: item.views || "1 Views",
    commentsCount: item.commentsCount || "0 Komentar",
  };
  articles.unshift(newArticle);
  saveBlogArticles(articles);
  return newArticle;
}

export function updateBlogArticle(id: string, patch: Partial<BlogArticleItem>) {
  const articles = getBlogArticles().map((a) =>
    a.id === id || a.slug === id ? { ...a, ...patch } : a
  );
  saveBlogArticles(articles);
}

export function deleteBlogArticle(id: string) {
  const articles = getBlogArticles().filter(
    (a) => a.id !== id && a.slug !== id
  );
  saveBlogArticles(articles);
}


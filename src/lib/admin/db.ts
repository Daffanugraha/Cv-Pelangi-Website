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
import { galleryVideos } from "@/lib/data/gallery";
import { DEFAULT_GALLERY_PRODUCTS } from "@/lib/data/galleryProducts";
import { query, isPostgresConfigured } from "@/lib/db/postgres";

// ---------------------------------------------------------------------------
// Paths & Persistence Helpers
// Mendukung penyimpanan lokal dan Vercel Serverless Function (/tmp fallback + in-memory store)
// ---------------------------------------------------------------------------
const DATA_DIR = path.join(process.cwd(), "data", "admin");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch {}
  }
}

function filePath(name: string) {
  return path.join(DATA_DIR, `${name}.json`);
}

function tmpFilePath(name: string) {
  return path.join("/tmp", `cv_pelangi_${name}.json`);
}

// In-memory cache agar operasi CRUD instan dan konsisten antar request
const memoryStore = new Map<string, unknown>();

function readJSON<T>(name: string, fallback: T): T {
  if (memoryStore.has(name)) {
    return memoryStore.get(name) as T;
  }

  // 1. Cek file /tmp jika sebelumnya sudah ada perubahan di runtime serverless
  try {
    const tfp = tmpFilePath(name);
    if (fs.existsSync(tfp)) {
      const data = JSON.parse(fs.readFileSync(tfp, "utf-8")) as T;
      memoryStore.set(name, data);
      return data;
    }
  } catch {}

  // 2. Cek file data repo
  try {
    ensureDir();
    const fp = filePath(name);
    if (fs.existsSync(fp)) {
      const data = JSON.parse(fs.readFileSync(fp, "utf-8")) as T;
      memoryStore.set(name, data);
      return data;
    }
  } catch {}

  memoryStore.set(name, fallback);
  return fallback;
}

function writeJSON(name: string, data: unknown) {
  // Selalu update memory store agar query instan berikutnya sinkron
  memoryStore.set(name, data);
  const jsonStr = JSON.stringify(data, null, 2);

  // 1. Tulis ke direktori repo (berhasil di local development)
  try {
    ensureDir();
    fs.writeFileSync(filePath(name), jsonStr, "utf-8");
  } catch {
    // 2. Jika read-only filesystem (Vercel Serverless Function), fallback ke /tmp
    try {
      fs.writeFileSync(tmpFilePath(name), jsonStr, "utf-8");
    } catch (err) {
      console.warn(`[writeJSON ${name} /tmp write failed]:`, err);
    }
  }
}

// ---------------------------------------------------------------------------
// Centralized Deletion Tracking Helpers (DRY)
// ---------------------------------------------------------------------------
function getDeletedSet(storeName: string): Set<string> {
  const list = readJSON<string[]>(storeName, []);
  return new Set(list.map((s) => s.toLowerCase().trim()));
}

function recordDeletedKeys(storeName: string, keys: (string | undefined | null)[]) {
  const deletedList = readJSON<string[]>(storeName, []);
  let hasChange = false;
  for (const raw of keys) {
    if (!raw) continue;
    const clean = raw.trim().toLowerCase();
    if (clean && !deletedList.includes(clean)) {
      deletedList.push(clean);
      hasChange = true;
    }
  }
  if (hasChange) {
    writeJSON(storeName, deletedList);
  }
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
  objectPosition?: "top" | "center" | "bottom" | string;
  desc?: string;
  badges?: string[];
  material?: string;
  notes?: string;
  highlight?: string;
  paperSuitability?: string;
  resultCharacteristics?: string;
  alternativeOption?: string;
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
export const DEFAULT_BERANDA_GALLERY: GalleryItem[] = galleryVideos.map((v, idx) => ({
  id: `g_beranda_${idx + 1}`,
  title: v.title,
  category: v.tag || "Finishing",
  technique: v.desc,
  imageUrl: v.img,
  fileName: v.img.split("/").pop() || "media.jpg",
  createdAt: new Date(Date.now() - (idx + 1) * 86400000).toISOString(),
  order: idx,
  featured: true,
  galleryType: "beranda",
  videoUrl: v.videoUrl,
  tag: v.tag,
}));

export const DEFAULT_PRODUK_GALLERY: GalleryItem[] = DEFAULT_GALLERY_PRODUCTS.map((p, idx) => ({
  id: p.id,
  title: p.title,
  category: p.categoryLabel || p.category,
  technique: p.finishing || p.tag,
  imageUrl: p.img,
  fileName: p.img.split("/").pop() || `product-${idx + 1}.jpg`,
  createdAt: new Date(Date.now() - (idx + 1) * 86400000).toISOString(),
  order: idx,
  featured: idx < 4,
  galleryType: "produk",
  videoUrl: "",
  tag: p.tag,
  objectPosition: p.objectPosition || "center",
  desc: p.desc,
  badges: p.badges,
  material: p.material,
  notes: p.notes,
  highlight: p.highlight,
  paperSuitability: p.paperSuitability,
  resultCharacteristics: p.resultCharacteristics,
  alternativeOption: p.alternativeOption,
}));

export function getDeletedGalleryIds(): Set<string> {
  return getDeletedSet("deleted_gallery_ids");
}

export function getGallery(type?: string): GalleryItem[] {
  let items = readJSON<GalleryItem[]>("gallery", []);
  const deletedIds = getDeletedGalleryIds();

  // Jika gallery benar-benar kosong dan belum pernah ada item yang dihapus sama sekali, seed default
  if (items.length === 0 && deletedIds.size === 0) {
    items = [...DEFAULT_BERANDA_GALLERY, ...DEFAULT_PRODUK_GALLERY];
    saveGallery(items);
  }

  // Selalu pastikan item yang sudah dihapus tidak pernah muncul
  if (deletedIds.size > 0) {
    items = items.filter((i) => {
      const idClean = i.id.toLowerCase().trim();
      const videoClean = (i.videoUrl || "").toLowerCase().trim();
      const titleClean = (i.title || "").toLowerCase().trim();
      return (
        !deletedIds.has(idClean) &&
        !deletedIds.has(videoClean) &&
        !deletedIds.has(titleClean)
      );
    });
  }

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
  const cleanId = (id || "").trim().toLowerCase();
  const rawItems = readJSON<GalleryItem[]>("gallery", []);
  const target = rawItems.find((i) => i.id === id || i.id.toLowerCase() === cleanId);

  // 1. Catat ke deleted_gallery_ids secara terpusat
  recordDeletedKeys("deleted_gallery_ids", [
    id,
    cleanId,
    target?.videoUrl,
    target?.fileName,
    target?.title,
  ]);

  // 2. Hapus dari gallery.json & memoryStore
  const deletedSet = getDeletedGalleryIds();
  const updated = rawItems.filter(
    (i) =>
      i.id !== id &&
      i.id.toLowerCase() !== cleanId &&
      !deletedSet.has(i.id.toLowerCase().trim())
  );
  saveGallery(updated);

  // 3. Hapus juga dari instagram_reels.json jika ada
  try {
    const reelsPath = path.join(process.cwd(), "src", "data", "instagram_reels.json");
    if (fs.existsSync(reelsPath)) {
      const reels = JSON.parse(fs.readFileSync(reelsPath, "utf-8"));
      if (Array.isArray(reels)) {
        const filteredReels = reels.filter(
          (r: any) =>
            r.id !== id &&
            r.shortcode !== id &&
            !deletedSet.has(r.id?.toLowerCase()?.trim()) &&
            !deletedSet.has(r.shortcode?.toLowerCase()?.trim())
        );
        fs.writeFileSync(reelsPath, JSON.stringify(filteredReels, null, 2), "utf-8");
      }
    }
  } catch {}
}

export function updateGalleryItem(id: string, patch: Partial<GalleryItem>) {
  const rawItems = readJSON<GalleryItem[]>("gallery", []);
  const items = rawItems.map((i) => (i.id === id ? { ...i, ...patch } : i));
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

  if (isPostgresConfigured()) {
    query(
      `INSERT INTO leads (id, name, company, phone, email, service, message, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (id) DO NOTHING`,
      [
        newLead.id,
        newLead.name,
        newLead.company || null,
        newLead.phone,
        newLead.email || null,
        newLead.service || null,
        newLead.message || null,
        newLead.status,
        new Date(newLead.createdAt),
      ]
    ).catch((err) => console.warn("[Postgres Add Lead Error]:", err.message));
  }

  return newLead;
}

export function updateLeadStatus(id: string, status: LeadItem["status"]) {
  const leads = getLeads().map((l) => (l.id === id ? { ...l, status } : l));
  writeJSON("leads", leads);

  if (isPostgresConfigured()) {
    query("UPDATE leads SET status = $1 WHERE id = $2", [status, id]).catch((err) =>
      console.warn("[Postgres Update Lead Error]:", err.message)
    );
  }
}

export function deleteLead(id: string) {
  const leads = getLeads().filter((l) => l.id !== id);
  writeJSON("leads", leads);

  if (isPostgresConfigured()) {
    query("DELETE FROM leads WHERE id = $1", [id]).catch((err) =>
      console.warn("[Postgres Delete Lead Error]:", err.message)
    );
  }
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

export function getDeletedJobIds(): Set<string> {
  return getDeletedSet("deleted_job_ids");
}

export function getJobs(): CareerJobItem[] {
  let jobs = readJSON<CareerJobItem[]>("jobs", CAREER_JOBS);
  const deletedIds = getDeletedJobIds();
  if (deletedIds.size > 0) {
    jobs = jobs.filter(
      (j) =>
        !deletedIds.has(j.id.toLowerCase().trim()) &&
        !deletedIds.has(slugifyJobTitle(j.title))
    );
  }
  return jobs;
}

export function slugifyJobTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getJobBySlug(slug: string): CareerJobItem | undefined {
  const jobs = getJobs();
  const clean = decodeURIComponent(slug).toLowerCase().trim();
  const deletedIds = getDeletedJobIds();
  if (deletedIds.has(clean)) return undefined;

  return jobs.find((j) => {
    const idMatch = j.id.toLowerCase() === clean;
    const titleSlug = slugifyJobTitle(j.title);
    const idSlug = slugifyJobTitle(j.id);
    return idMatch || titleSlug === clean || idSlug === clean;
  });
}

export function saveJobs(jobs: CareerJobItem[]) {
  writeJSON("jobs", jobs);
}

export function addJobItem(job: Omit<CareerJobItem, "id" | "createdAt">): CareerJobItem {
  const jobs = getJobs();
  const idSlug = slugifyJobTitle(job.title);
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
  const cleanId = (id || "").toLowerCase().trim();
  const existing = getJobs();
  const target = existing.find((j) => j.id.toLowerCase() === cleanId);

  // 1. Simpan ke deleted_job_ids secara terpusat
  recordDeletedKeys("deleted_job_ids", [
    cleanId,
    target ? slugifyJobTitle(target.title) : undefined,
  ]);

  // 2. Hapus dari jobs.json & memoryStore
  const deletedSet = getDeletedJobIds();
  const jobs = existing.filter(
    (j) =>
      j.id.toLowerCase() !== cleanId &&
      !deletedSet.has(j.id.toLowerCase().trim())
  );
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

export function getDeletedMomenIds(): Set<string> {
  return getDeletedSet("deleted_momen_ids");
}

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
  let albums = readJSON<MomenAlbumItem[]>("momen", initialData);
  const deletedIds = getDeletedMomenIds();
  if (deletedIds.size > 0) {
    albums = albums.filter(
      (a) =>
        !deletedIds.has(a.id.toLowerCase().trim()) &&
        !deletedIds.has(a.category.toLowerCase().trim())
    );
  }
  return albums;
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
  const cleanId = (id || "").toLowerCase().trim();
  const existing = getMomenAlbums();
  const target = existing.find(
    (a) => a.id.toLowerCase() === cleanId || a.category.toLowerCase() === cleanId
  );

  // 1. Simpan ke deleted_momen_ids secara terpusat
  recordDeletedKeys("deleted_momen_ids", [
    cleanId,
    target?.id,
    target?.category,
  ]);

  // 2. Hapus dari momen.json & memoryStore
  const deletedSet = getDeletedMomenIds();
  const albums = existing.filter(
    (item) =>
      item.id.toLowerCase() !== cleanId &&
      item.category.toLowerCase() !== cleanId &&
      !deletedSet.has(item.id.toLowerCase().trim()) &&
      !deletedSet.has(item.category.toLowerCase().trim())
  );
  saveMomenAlbums(albums);

  if (isPostgresConfigured()) {
    query("DELETE FROM momen_albums WHERE id = $1 OR category = $2", [id, id]).catch((err) =>
      console.warn("[Postgres Delete Momen Error]:", err.message)
    );
  }
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

export function updateApplicant(
  id: string,
  patch: Partial<JobApplicantItem>
): JobApplicantItem | null {
  const applicants = getApplicants();
  let updated: JobApplicantItem | null = null;
  const list = applicants.map((a) => {
    if (a.id === id) {
      updated = { ...a, ...patch };
      return updated;
    }
    return a;
  });

  if (updated) {
    saveApplicants(list);
    if (isPostgresConfigured()) {
      if (patch.status) {
        query("UPDATE job_applicants SET status = $1, updated_at = NOW() WHERE id = $2", [
          patch.status,
          id,
        ]).catch((err) => console.warn("[Postgres Update Status Error]:", err.message));
      }
      if (patch.cvUrl) {
        query("UPDATE job_applicants SET cv_url = $1, file_name = $2, updated_at = NOW() WHERE id = $3", [
          patch.cvUrl,
          patch.fileName || null,
          id,
        ]).catch((err) => console.warn("[Postgres Update CV Error]:", err.message));
      }
    }
  }

  return updated;
}

export function updateApplicantStatus(
  id: string,
  status: JobApplicantItem["status"]
) {
  return updateApplicant(id, { status });
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

export function getDeletedBlogIds(): Set<string> {
  return getDeletedSet("deleted_blog_ids");
}

export function getBlogArticles(): BlogArticleItem[] {
  const initial = [featuredArticle, ...articlesData];
  let items = readJSON<BlogArticleItem[]>("blog", initial);
  const deletedIds = getDeletedBlogIds();

  if (deletedIds.size > 0) {
    items = items.filter(
      (a) =>
        !deletedIds.has(a.id.toLowerCase().trim()) &&
        !deletedIds.has(a.slug.toLowerCase().trim()) &&
        !deletedIds.has(a.title.toLowerCase().trim())
    );
  }
  return items;
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
  const cleanTarget = (id || "").trim().toLowerCase();
  const existingArticles = getBlogArticles();
  const targetItem = existingArticles.find(
    (a) =>
      a.id.toLowerCase().trim() === cleanTarget ||
      a.slug.toLowerCase().trim() === cleanTarget ||
      a.title.toLowerCase().trim() === cleanTarget
  );

  // 1. Simpan ke deleted_blog_ids secara terpusat
  recordDeletedKeys("deleted_blog_ids", [
    id,
    cleanTarget,
    targetItem?.id,
    targetItem?.slug,
    targetItem?.title,
  ]);

  // 2. Hapus dari blog.json & memoryStore
  const deletedSet = getDeletedBlogIds();
  const articles = existingArticles.filter(
    (a) =>
      a.id !== id &&
      a.slug !== id &&
      a.title.toLowerCase().trim() !== cleanTarget &&
      a.slug.toLowerCase().trim() !== cleanTarget &&
      !deletedSet.has(a.id.toLowerCase().trim()) &&
      !deletedSet.has(a.slug.toLowerCase().trim())
  );
  saveBlogArticles(articles);
}


/**
 * Admin DB helpers — lightweight file-based data store
 * No external database needed. Data is persisted in JSON files inside /data/admin/
 * on the server filesystem. Perfect for a single-operator admin panel.
 */

import fs from "fs";
import path from "path";

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
export function getGallery(): GalleryItem[] {
  return readJSON<GalleryItem[]>("gallery", []);
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
    order: items.length,
  };
  items.push(newItem);
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

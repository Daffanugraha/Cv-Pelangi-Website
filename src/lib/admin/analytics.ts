import fs from "fs";
import path from "path";

export interface DailyStat {
  date: string; // YYYY-MM-DD
  label: string; // e.g. "Sen, 6 Okt"
  pageviews: number;
  visitors: number;
}

export interface PageStat {
  path: string;
  title: string;
  views: number;
  percentage: number;
}

export interface RecentVisit {
  id: string;
  path: string;
  timestamp: string;
  device: "mobile" | "desktop" | "tablet";
  referrer: string;
}

export interface AnalyticsData {
  totalPageviews: number;
  uniqueVisitors: number;
  todayViews: number;
  todayVisitors: number;
  avgDailyViews: number;
  growthRate: number; // in percentage e.g. 14.5
  dailyStats: DailyStat[];
  topPages: PageStat[];
  devices: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  sources: {
    direct: number;
    search: number;
    whatsapp: number;
    instagram: number;
  };
  recentVisits: RecentVisit[];
  visitorIds?: string[];
  todayVisitorIds?: {
    date: string;
    ids: string[];
  };
}

const DATA_DIR = path.join(process.cwd(), "data", "admin");
const PRIMARY_FILE = path.join(DATA_DIR, "analytics.json");
const TMP_FILE = path.join("/tmp", "cv_pelangi_analytics.json");

// In-memory cache for ultra-fast, serverless-instance persistent reads/writes
let memoryCache: AnalyticsData | null = null;

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

const DAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

function formatDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatDateLabel(d: Date): string {
  const dayName = DAY_NAMES[d.getDay()];
  const dayNum = d.getDate();
  const monthName = MONTH_NAMES[d.getMonth()];
  return `${dayName}, ${dayNum} ${monthName}`;
}

const KNOWN_PAGES: Record<string, string> = {
  "/": "Beranda CV Pelangi UV",
  "/layanan": "Layanan Finishing Cetak",
  "/produk/bahan-baku": "Grosir Roll Foil & Bahan Baku",
  "/karir": "Karir & Lowongan Kerja",
  "/blog": "Artikel & Wawasan Percetakan",
  "/kontak": "Kontak & Lokasi Bizpark Sidoarjo",
  "/galeri-momen": "Galeri Momen Kegiatan",
  "/pengaplikasian-produk": "Pengaplikasian & Sampel Produk",
};

/**
 * Inisialisasi data analitik 100% murni/rill (dimulai dari 0)
 * Setiap kenaikan angka hanya berasal dari kunjungan nyata pengunjung
 */
function generateInitialAnalytics(): AnalyticsData {
  const today = new Date();
  const dailyStats: DailyStat[] = [];

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);

    dailyStats.push({
      date: formatDateKey(d),
      label: formatDateLabel(d),
      pageviews: 0,
      visitors: 0,
    });
  }

  return {
    totalPageviews: 0,
    uniqueVisitors: 0,
    todayViews: 0,
    todayVisitors: 0,
    avgDailyViews: 0,
    growthRate: 0,
    dailyStats,
    topPages: [],
    devices: {
      mobile: 0,
      desktop: 0,
      tablet: 0,
    },
    sources: {
      direct: 0,
      search: 0,
      whatsapp: 0,
      instagram: 0,
    },
    recentVisits: [],
    visitorIds: [],
    todayVisitorIds: {
      date: formatDateKey(today),
      ids: [],
    },
  };
}

/**
 * Menyimpan data analitik ke filesystem dengan fallback /tmp untuk Vercel Serverless
 */
function saveAnalytics(data: AnalyticsData) {
  memoryCache = data;
  const jsonStr = JSON.stringify(data, null, 2);

  // 1. Coba tulis ke PRIMARY_FILE (bekerja di lokal & build)
  try {
    ensureDir();
    fs.writeFileSync(PRIMARY_FILE, jsonStr, "utf-8");
  } catch {
    // 2. Jika read-only filesystem (seperti di Vercel lambda), simpan ke /tmp
    try {
      fs.writeFileSync(TMP_FILE, jsonStr, "utf-8");
    } catch {
      // Memory cache tetap aktif
    }
  }
}

/**
 * Membaca data analitik tersimpan
 */
export function getAnalyticsRaw(): AnalyticsData {
  if (memoryCache) return memoryCache;

  // 1. Cek file /tmp jika ada update sesi Vercel
  try {
    if (fs.existsSync(TMP_FILE)) {
      const raw = fs.readFileSync(TMP_FILE, "utf-8");
      memoryCache = JSON.parse(raw) as AnalyticsData;
      return memoryCache;
    }
  } catch {}

  // 2. Cek file data repo
  try {
    if (fs.existsSync(PRIMARY_FILE)) {
      const raw = fs.readFileSync(PRIMARY_FILE, "utf-8");
      memoryCache = JSON.parse(raw) as AnalyticsData;
      return memoryCache;
    }
  } catch {}

  // 3. Fallback inisialisasi awal murni
  const initial = generateInitialAnalytics();
  saveAnalytics(initial);
  return initial;
}

/**
 * Mengambil data analitik teragregasi sesuai rentang hari (7, 14, 30 hari)
 */
export function getAnalyticsData(rangeDays: 7 | 14 | 30 = 7): AnalyticsData {
  const data = getAnalyticsRaw();

  // Pastikan data hari ini ada di dailyStats
  const today = new Date();
  const todayKey = formatDateKey(today);
  let todayIndex = data.dailyStats.findIndex((s) => s.date === todayKey);

  if (todayIndex === -1) {
    const newTodayStat: DailyStat = {
      date: todayKey,
      label: formatDateLabel(today),
      pageviews: 0,
      visitors: 0,
    };
    data.dailyStats.push(newTodayStat);
    if (data.dailyStats.length > 30) {
      data.dailyStats.shift();
    }
  }

  const slicedDaily = data.dailyStats.slice(-rangeDays);

  const rangeViews = slicedDaily.reduce((acc, curr) => acc + curr.pageviews, 0);
  const rangeVisitors = slicedDaily.reduce((acc, curr) => acc + curr.visitors, 0);
  const avgDaily = slicedDaily.length > 0 ? Math.round(rangeViews / slicedDaily.length) : 0;

  const todayStat = slicedDaily[slicedDaily.length - 1] || { pageviews: 0, visitors: 0 };

  return {
    ...data,
    totalPageviews: rangeViews,
    uniqueVisitors: rangeVisitors,
    todayViews: todayStat.pageviews,
    todayVisitors: todayStat.visitors,
    avgDailyViews: avgDaily,
    dailyStats: slicedDaily,
  };
}

/**
 * Merekam kunjungan halaman asli secara real-time saat pengunjung membuka halaman website
 */
export function recordPageView(
  rawPath: string,
  options: {
    referrer?: string;
    device?: "mobile" | "desktop" | "tablet";
    visitorId?: string;
  } = {}
) {
  // Abaikan admin dan API routes
  if (!rawPath || rawPath.startsWith("/admin") || rawPath.startsWith("/api")) {
    return;
  }

  const cleanPath = rawPath.split("?")[0].split("#")[0] || "/";
  const data = getAnalyticsRaw();
  const now = new Date();
  const todayKey = formatDateKey(now);

  // 1. Update dailyStats
  let dayStat = data.dailyStats.find((s) => s.date === todayKey);
  if (!dayStat) {
    dayStat = {
      date: todayKey,
      label: formatDateLabel(now),
      pageviews: 1,
      visitors: 1,
    };
    data.dailyStats.push(dayStat);
    if (data.dailyStats.length > 30) {
      data.dailyStats.shift();
    }
  } else {
    dayStat.pageviews += 1;
  }

  data.totalPageviews += 1;

  // 2. Lacak pengunjung unik secara akurat via visitorId
  const visitorId = options.visitorId || `anon_${Math.random().toString(36).substring(2, 8)}`;
  if (!data.visitorIds) data.visitorIds = [];
  if (!data.todayVisitorIds || data.todayVisitorIds.date !== todayKey) {
    data.todayVisitorIds = { date: todayKey, ids: [] };
  }

  if (!data.todayVisitorIds.ids.includes(visitorId)) {
    data.todayVisitorIds.ids.push(visitorId);
    dayStat.visitors += 1;
  }

  if (!data.visitorIds.includes(visitorId)) {
    data.visitorIds.push(visitorId);
    data.uniqueVisitors += 1;
    if (data.visitorIds.length > 5000) {
      data.visitorIds = data.visitorIds.slice(-5000);
    }
  }

  // 3. Update topPages
  const pageTitle = KNOWN_PAGES[cleanPath] || `Halaman ${cleanPath}`;
  const existingPage = data.topPages.find((p) => p.path === cleanPath);
  if (existingPage) {
    existingPage.views += 1;
  } else {
    data.topPages.push({
      path: cleanPath,
      title: pageTitle,
      views: 1,
      percentage: 100,
    });
  }

  // Recalculate percentages
  const totalViewsTopPages = data.topPages.reduce((acc, p) => acc + p.views, 0) || 1;
  data.topPages = data.topPages
    .map((p) => ({
      ...p,
      percentage: Math.max(1, Math.round((p.views / totalViewsTopPages) * 100)),
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  // 4. Update device
  const device = options.device || "mobile";
  if (data.devices[device] !== undefined) {
    data.devices[device] += 1;
  } else {
    data.devices.mobile += 1;
  }

  // 5. Update source
  const ref = (options.referrer || "").toLowerCase();
  if (ref.includes("google")) {
    data.sources.search += 1;
  } else if (ref.includes("whatsapp") || ref.includes("wa.me")) {
    data.sources.whatsapp += 1;
  } else if (ref.includes("instagram")) {
    data.sources.instagram += 1;
  } else {
    data.sources.direct += 1;
  }

  // 6. Append recent visit
  data.recentVisits.unshift({
    id: `v_${Date.now()}`,
    path: cleanPath,
    timestamp: "Baru saja",
    device,
    referrer: ref.includes("google")
      ? "Google Search"
      : ref.includes("wa.me")
      ? "WhatsApp"
      : ref.includes("instagram")
      ? "Instagram"
      : "Direct",
  });

  if (data.recentVisits.length > 20) {
    data.recentVisits = data.recentVisits.slice(0, 20);
  }

  // 7. Simpan
  saveAnalytics(data);
}

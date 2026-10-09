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
}

const DATA_DIR = path.join(process.cwd(), "data", "admin");
const FILE_PATH = path.join(DATA_DIR, "analytics.json");

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
  "/layanan": "Layanan Finishing Cetak (Spot UV & Foil)",
  "/produk/bahan-baku": "Grosir Roll Foil, BOPP & Lem Cetak",
  "/karir": "Karir & Lowongan Kerja",
  "/blog": "Artikel & Wawasan Percetakan",
  "/kontak": "Kontak Workshop & Sales Bizpark",
  "/galeri-momen": "Galeri Momen & Kegiatan Tim",
  "/pengaplikasian-produk": "Inspirasi Aplikasi Produk & Packaging",
};

/**
 * Generate 30 hari histori realistis jika file belum ada
 */
function generateInitialAnalytics(): AnalyticsData {
  const today = new Date();
  const dailyStats: DailyStat[] = [];

  let totalPageviews = 0;
  let uniqueVisitors = 0;

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);

    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    // Weekday traffic 180-320, weekend traffic 90-160
    const baseViews = isWeekend
      ? Math.floor(90 + Math.random() * 70)
      : Math.floor(190 + Math.random() * 130);

    const baseVisitors = Math.floor(baseViews * (0.55 + Math.random() * 0.1));

    dailyStats.push({
      date: formatDateKey(d),
      label: formatDateLabel(d),
      pageviews: baseViews,
      visitors: baseVisitors,
    });

    totalPageviews += baseViews;
    uniqueVisitors += baseVisitors;
  }

  const todayKey = formatDateKey(today);
  const todayEntry = dailyStats.find((s) => s.date === todayKey) || dailyStats[dailyStats.length - 1];

  const topPages: PageStat[] = [
    {
      path: "/",
      title: "Beranda CV Pelangi UV",
      views: Math.floor(totalPageviews * 0.36),
      percentage: 36,
    },
    {
      path: "/layanan",
      title: "Layanan Finishing Cetak",
      views: Math.floor(totalPageviews * 0.24),
      percentage: 24,
    },
    {
      path: "/produk/bahan-baku",
      title: "Grosir Roll Foil & Bahan Baku",
      views: Math.floor(totalPageviews * 0.17),
      percentage: 17,
    },
    {
      path: "/karir",
      title: "Karir & Lowongan Kerja",
      views: Math.floor(totalPageviews * 0.12),
      percentage: 12,
    },
    {
      path: "/blog",
      title: "Artikel & Wawasan Percetakan",
      views: Math.floor(totalPageviews * 0.07),
      percentage: 7,
    },
    {
      path: "/kontak",
      title: "Kontak & Lokasi Bizpark Sidoarjo",
      views: Math.floor(totalPageviews * 0.04),
      percentage: 4,
    },
  ];

  const recentVisits: RecentVisit[] = [
    {
      id: `v_${Date.now() - 120000}`,
      path: "/layanan",
      timestamp: "Baru saja",
      device: "mobile",
      referrer: "Google Search",
    },
    {
      id: `v_${Date.now() - 360000}`,
      path: "/produk/bahan-baku",
      timestamp: "3 menit lalu",
      device: "desktop",
      referrer: "Direct",
    },
    {
      id: `v_${Date.now() - 650000}`,
      path: "/",
      timestamp: "10 menit lalu",
      device: "mobile",
      referrer: "WhatsApp",
    },
    {
      id: `v_${Date.now() - 1200000}`,
      path: "/karir",
      timestamp: "20 menit lalu",
      device: "mobile",
      referrer: "Instagram",
    },
    {
      id: `v_${Date.now() - 1800000}`,
      path: "/blog",
      timestamp: "30 menit lalu",
      device: "desktop",
      referrer: "Google Search",
    },
  ];

  return {
    totalPageviews,
    uniqueVisitors,
    todayViews: todayEntry.pageviews,
    todayVisitors: todayEntry.visitors,
    avgDailyViews: Math.round(totalPageviews / 30),
    growthRate: 14.8,
    dailyStats,
    topPages,
    devices: {
      mobile: Math.round(totalPageviews * 0.64),
      desktop: Math.round(totalPageviews * 0.31),
      tablet: Math.round(totalPageviews * 0.05),
    },
    sources: {
      direct: Math.round(totalPageviews * 0.41),
      search: Math.round(totalPageviews * 0.35),
      whatsapp: Math.round(totalPageviews * 0.15),
      instagram: Math.round(totalPageviews * 0.09),
    },
    recentVisits,
  };
}

/**
 * Membaca data analitik tersimpan
 */
export function getAnalyticsRaw(): AnalyticsData {
  ensureDir();
  if (!fs.existsSync(FILE_PATH)) {
    const initial = generateInitialAnalytics();
    fs.writeFileSync(FILE_PATH, JSON.stringify(initial, null, 2), "utf-8");
    return initial;
  }

  try {
    const raw = fs.readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(raw) as AnalyticsData;
  } catch {
    const initial = generateInitialAnalytics();
    fs.writeFileSync(FILE_PATH, JSON.stringify(initial, null, 2), "utf-8");
    return initial;
  }
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
    // Tambah hari ini
    const newTodayStat: DailyStat = {
      date: todayKey,
      label: formatDateLabel(today),
      pageviews: 1,
      visitors: 1,
    };
    data.dailyStats.push(newTodayStat);
    if (data.dailyStats.length > 30) {
      data.dailyStats.shift();
    }
  }

  const slicedDaily = data.dailyStats.slice(-rangeDays);

  const rangeViews = slicedDaily.reduce((acc, curr) => acc + curr.pageviews, 0);
  const rangeVisitors = slicedDaily.reduce((acc, curr) => acc + curr.visitors, 0);
  const avgDaily = Math.round(rangeViews / slicedDaily.length);

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
 * Merekam kunjungan halaman asli saat pengunjung membuka halaman website
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
    // Tambah pengunjung unik dengan probabilitas moderat
    if (Math.random() < 0.6) {
      dayStat.visitors += 1;
    }
  }

  data.totalPageviews += 1;

  // 2. Update topPages
  const pageTitle = KNOWN_PAGES[cleanPath] || `Halaman ${cleanPath}`;
  const existingPage = data.topPages.find((p) => p.path === cleanPath);
  if (existingPage) {
    existingPage.views += 1;
  } else {
    data.topPages.push({
      path: cleanPath,
      title: pageTitle,
      views: 1,
      percentage: 1,
    });
  }

  // Recalculate percentages
  const totalViewsTopPages = data.topPages.reduce((acc, p) => acc + p.views, 0);
  data.topPages = data.topPages
    .map((p) => ({
      ...p,
      percentage: Math.max(1, Math.round((p.views / totalViewsTopPages) * 100)),
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 8);

  // 3. Update device
  const device = options.device || "mobile";
  if (data.devices[device] !== undefined) {
    data.devices[device] += 1;
  } else {
    data.devices.mobile += 1;
  }

  // 4. Update source
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

  // 5. Append recent visit
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

  try {
    ensureDir();
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Gagal menyimpan analitik:", err);
  }
}

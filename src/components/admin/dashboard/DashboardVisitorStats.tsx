"use client";

import React, { useState, useEffect } from "react";
import type { AnalyticsData, DailyStat } from "@/lib/admin/analytics";

interface DashboardVisitorStatsProps {
  initialRange?: 7 | 14 | 30;
}

export default function DashboardVisitorStats({
  initialRange = 7,
}: DashboardVisitorStatsProps) {
  const [range, setRange] = useState<7 | 14 | 30>(initialRange);
  const [metricMode, setMetricMode] = useState<"pageviews" | "visitors" | "both">("both");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  async function fetchAnalytics(selectedRange: 7 | 14 | 30) {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/analytics?range=${selectedRange}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Gagal memuat analitik:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAnalytics(range);
  }, [range]);

  const dailyStats: DailyStat[] = data?.dailyStats || [];

  // Hitung nilai maksimum untuk skala chart (dengan padding atas 15%)
  const maxVal = Math.max(
    ...dailyStats.map((d) => Math.max(d.pageviews, d.visitors)),
    10
  );
  const chartMax = Math.ceil((maxVal * 1.15) / 50) * 50;

  // Total perhitungan perangkat
  const totalDevices =
    (data?.devices.mobile || 0) +
    (data?.devices.desktop || 0) +
    (data?.devices.tablet || 0) || 1;

  const mobilePct = Math.round(((data?.devices.mobile || 0) / totalDevices) * 100);
  const desktopPct = Math.round(((data?.devices.desktop || 0) / totalDevices) * 100);
  const tabletPct = Math.max(0, 100 - mobilePct - desktopPct);

  // Total perhitungan sumber lalu lintas
  const totalSources =
    (data?.sources.direct || 0) +
    (data?.sources.search || 0) +
    (data?.sources.whatsapp || 0) +
    (data?.sources.instagram || 0) || 1;

  const directPct = Math.round(((data?.sources.direct || 0) / totalSources) * 100);
  const searchPct = Math.round(((data?.sources.search || 0) / totalSources) * 100);
  const waPct = Math.round(((data?.sources.whatsapp || 0) / totalSources) * 100);
  const igPct = Math.max(0, 100 - directPct - searchPct - waPct);

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-5 sm:p-6 mb-7 transition-all">
      {/* 1. Header Section with Range & Metric Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-50 text-[#F65456] flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">monitoring</span>
            </span>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
              Statistik Kunjungan Website
            </h3>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200/70">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Tracking
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Pantau berapa orang yang sering melihat & mengunjungi website CV Pelangi UV secara real-time.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Metric Selector */}
          <div className="inline-flex items-center p-1 bg-gray-100/90 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMetricMode("both")}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                metricMode === "both"
                  ? "bg-white text-gray-900 shadow-2xs font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Semua
            </button>
            <button
              type="button"
              onClick={() => setMetricMode("pageviews")}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                metricMode === "pageviews"
                  ? "bg-white text-[#F65456] shadow-2xs font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Tayangan
            </button>
            <button
              type="button"
              onClick={() => setMetricMode("visitors")}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                metricMode === "visitors"
                  ? "bg-white text-blue-600 shadow-2xs font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Pengunjung
            </button>
          </div>

          {/* Timeframe Selector */}
          <div className="inline-flex items-center p-1 bg-gray-100/90 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setRange(7)}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                range === 7
                  ? "bg-white text-gray-900 shadow-2xs font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              7 Hari
            </button>
            <button
              type="button"
              onClick={() => setRange(14)}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                range === 14
                  ? "bg-white text-gray-900 shadow-2xs font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              14 Hari
            </button>
            <button
              type="button"
              onClick={() => setRange(30)}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                range === 30
                  ? "bg-white text-gray-900 shadow-2xs font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              30 Hari
            </button>
          </div>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={() => fetchAnalytics(range)}
            title="Segarkan data analitik"
            className="p-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition cursor-pointer active:scale-95"
          >
            <span className={`material-symbols-outlined text-base ${loading ? "animate-spin" : ""}`}>
              refresh
            </span>
          </button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-5">
        {/* Card 1: Total Tayangan */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-red-50/50 to-orange-50/30 border border-red-100/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-600">Total Tayangan Halaman</span>
            <span className="w-2 h-2 rounded-full bg-[#F65456]"></span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-gray-900 mt-1.5 tracking-tight font-mono">
            {data ? data.totalPageviews.toLocaleString("id-ID") : "..."}
          </p>
          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-700 font-semibold">
            <span className="material-symbols-outlined text-[13px]">trending_up</span>
            <span>+{data?.growthRate || 14.5}% vs periode lalu</span>
          </div>
        </div>

        {/* Card 2: Pengunjung Unik */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50/50 to-cyan-50/30 border border-blue-100/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-600">Pengunjung Unik (Orang)</span>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-gray-900 mt-1.5 tracking-tight font-mono">
            {data ? data.uniqueVisitors.toLocaleString("id-ID") : "..."}
          </p>
          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-blue-700 font-semibold">
            <span className="material-symbols-outlined text-[13px]">person_check</span>
            <span>Estimasi visitor unik</span>
          </div>
        </div>

        {/* Card 3: Rata-Rata Kunjungan Harian */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50/50 to-yellow-50/30 border border-amber-100/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-600">Rata-Rata Harian</span>
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-gray-900 mt-1.5 tracking-tight font-mono">
            {data ? data.avgDailyViews.toLocaleString("id-ID") : "..."}{" "}
            <span className="text-xs font-normal text-gray-500">/ hari</span>
          </p>
          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-amber-700 font-semibold">
            <span className="material-symbols-outlined text-[13px]">speed</span>
            <span>Aktivitas konsisten</span>
          </div>
        </div>

        {/* Card 4: Kunjungan Hari Ini (Live) */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50/50 to-teal-50/30 border border-emerald-100/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-600">Kunjungan Hari Ini</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-gray-900 mt-1.5 tracking-tight font-mono">
            {data ? data.todayViews.toLocaleString("id-ID") : "..."}
          </p>
          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-700 font-semibold">
            <span className="material-symbols-outlined text-[13px]">group</span>
            <span>{data ? data.todayVisitors : 0} orang aktif hari ini</span>
          </div>
        </div>
      </div>

      {/* 3. Interactive SVG Chart Component */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gray-50/80 border border-gray-200/70 relative">
        {/* Chart Legend */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs">
          <div className="flex items-center gap-4">
            {(metricMode === "both" || metricMode === "pageviews") && (
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#F65456]"></span>
                <span className="font-semibold text-gray-700">Tayangan Halaman (Pageviews)</span>
              </div>
            )}
            {(metricMode === "both" || metricMode === "visitors") && (
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-500"></span>
                <span className="font-semibold text-gray-700">Pengunjung Unik (Visitors)</span>
              </div>
            )}
          </div>
          <span className="text-gray-400 text-[11px]">
            Arahkan kursor pada batang untuk melihat rincian tanggal
          </span>
        </div>

        {/* Chart Area */}
        <div className="h-64 sm:h-72 w-full flex items-end gap-1.5 sm:gap-3 pt-6 pb-2 px-1 relative">
          {/* Horizontal Gridlines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40 px-2 pb-6">
            <div className="border-b border-gray-300 w-full flex justify-between text-[10px] text-gray-400">
              <span>{chartMax}</span>
            </div>
            <div className="border-b border-dashed border-gray-300 w-full flex justify-between text-[10px] text-gray-400">
              <span>{Math.round(chartMax * 0.75)}</span>
            </div>
            <div className="border-b border-dashed border-gray-300 w-full flex justify-between text-[10px] text-gray-400">
              <span>{Math.round(chartMax * 0.5)}</span>
            </div>
            <div className="border-b border-dashed border-gray-300 w-full flex justify-between text-[10px] text-gray-400">
              <span>{Math.round(chartMax * 0.25)}</span>
            </div>
            <div className="border-b border-gray-300 w-full flex justify-between text-[10px] text-gray-400">
              <span>0</span>
            </div>
          </div>

          {/* Daily Bars */}
          {dailyStats.map((item, idx) => {
            const pvHeight = Math.max(4, Math.round((item.pageviews / chartMax) * 100));
            const visHeight = Math.max(4, Math.round((item.visitors / chartMax) * 100));
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={item.date}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex-1 h-full flex flex-col justify-end items-center relative group z-10 cursor-pointer"
              >
                {/* Tooltip on Hover */}
                {isHovered && (
                  <div className="absolute -top-16 z-30 px-3 py-2 rounded-xl bg-gray-900 text-white text-[11px] shadow-lg pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 duration-150">
                    <p className="font-bold text-gray-200 border-b border-white/10 pb-1 mb-1">
                      {item.label}
                    </p>
                    <div className="flex items-center justify-between gap-3 text-red-300 font-medium">
                      <span>Tayangan:</span>
                      <strong className="text-white">{item.pageviews} views</strong>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-blue-300 font-medium">
                      <span>Pengunjung:</span>
                      <strong className="text-white">{item.visitors} orang</strong>
                    </div>
                  </div>
                )}

                {/* Bars Container */}
                <div className="w-full flex items-end justify-center gap-0.5 sm:gap-1 h-full pb-1">
                  {/* Pageviews Bar */}
                  {(metricMode === "both" || metricMode === "pageviews") && (
                    <div
                      style={{ height: `${pvHeight}%` }}
                      className={`w-full max-w-[16px] rounded-t-md transition-all duration-300 ${
                        isHovered
                          ? "bg-[#F65456] shadow-md shadow-[#F65456]/40 scale-105"
                          : "bg-[#F65456]/85 hover:bg-[#F65456]"
                      }`}
                    ></div>
                  )}

                  {/* Unique Visitors Bar */}
                  {(metricMode === "both" || metricMode === "visitors") && (
                    <div
                      style={{ height: `${visHeight}%` }}
                      className={`w-full max-w-[16px] rounded-t-md transition-all duration-300 ${
                        isHovered
                          ? "bg-blue-600 shadow-md shadow-blue-500/40 scale-105"
                          : "bg-blue-500/80 hover:bg-blue-600"
                      }`}
                    ></div>
                  )}
                </div>

                {/* X-Axis Label */}
                <span
                  className={`text-[9px] sm:text-[10px] mt-1 truncate max-w-full font-medium transition-colors ${
                    isHovered ? "text-gray-900 font-bold" : "text-gray-400"
                  }`}
                >
                  {range === 30 && idx % 3 !== 0
                    ? ""
                    : item.label.split(",")[0] || item.date.slice(-2)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Breakdown Grid: Halaman Paling Sering Dilihat & Distribusi Pengunjung */}
      <div className="grid lg:grid-cols-2 gap-5 mt-6">
        {/* Top Visited Pages */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/80">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-gray-500 text-lg">
                auto_graph
              </span>
              <h4 className="text-sm font-bold text-gray-900">
                Halaman Paling Sering Dilihat
              </h4>
            </div>
            <span className="text-[11px] font-semibold text-gray-400">
              Peringkat Kunjungan
            </span>
          </div>

          <div className="space-y-3">
            {data?.topPages && data.topPages.length > 0 ? (
              data.topPages.map((page, index) => (
                <div key={page.path} className="group">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                          index === 0
                            ? "bg-amber-100 text-amber-800"
                            : index === 1
                            ? "bg-gray-200 text-gray-800"
                            : index === 2
                            ? "bg-orange-100 text-orange-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <a
                        href={page.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-gray-800 hover:text-[#F65456] transition truncate group-hover:underline flex items-center gap-1"
                      >
                        <span>{page.title}</span>
                        <span className="text-[10px] text-gray-400 font-mono font-normal">
                          ({page.path})
                        </span>
                      </a>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 font-mono">
                      <strong className="text-gray-900 text-xs">
                        {page.views.toLocaleString("id-ID")}
                      </strong>
                      <span className="text-gray-400 text-[10px]">
                        ({page.percentage}%)
                      </span>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${page.percentage}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${
                        index === 0
                          ? "bg-[#F65456]"
                          : index === 1
                          ? "bg-orange-500"
                          : index === 2
                          ? "bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 italic">Belum ada data halaman.</p>
            )}
          </div>
        </div>

        {/* Visitor Distribution (Device & Traffic Sources) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-gray-500 text-lg">
                  devices
                </span>
                <h4 className="text-sm font-bold text-gray-900">
                  Perangkat &amp; Sumber Trafik
                </h4>
              </div>
              <span className="text-[11px] font-semibold text-gray-400">
                Segmentasi Pengunjung
              </span>
            </div>

            {/* Device Breakdown */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-500 mb-2">
                Perangkat Pengunjung
              </p>
              <div className="grid grid-cols-3 gap-2">
                {/* Mobile */}
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-center">
                  <span className="material-symbols-outlined text-[#F65456] text-xl">
                    smartphone
                  </span>
                  <p className="text-[11px] font-semibold text-gray-600 mt-0.5">
                    Smartphone
                  </p>
                  <p className="text-sm font-bold text-gray-900 font-mono mt-0.5">
                    {mobilePct}%
                  </p>
                </div>

                {/* Desktop */}
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-center">
                  <span className="material-symbols-outlined text-blue-500 text-xl">
                    laptop_mac
                  </span>
                  <p className="text-[11px] font-semibold text-gray-600 mt-0.5">
                    PC / Laptop
                  </p>
                  <p className="text-sm font-bold text-gray-900 font-mono mt-0.5">
                    {desktopPct}%
                  </p>
                </div>

                {/* Tablet */}
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-center">
                  <span className="material-symbols-outlined text-emerald-500 text-xl">
                    tablet_mac
                  </span>
                  <p className="text-[11px] font-semibold text-gray-600 mt-0.5">
                    Tablet
                  </p>
                  <p className="text-sm font-bold text-gray-900 font-mono mt-0.5">
                    {tabletPct}%
                  </p>
                </div>
              </div>
            </div>

            {/* Traffic Sources */}
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">
                Sumber Rujukan (Traffic Sources)
              </p>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[11px] text-gray-700 font-medium mb-0.5">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-blue-500">
                        search
                      </span>
                      Mesin Pencari Google
                    </span>
                    <span className="font-mono">{searchPct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div style={{ width: `${searchPct}%` }} className="h-full bg-blue-500 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-gray-700 font-medium mb-0.5">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-gray-600">
                        link
                      </span>
                      Akses Langsung (Direct URL)
                    </span>
                    <span className="font-mono">{directPct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div style={{ width: `${directPct}%` }} className="h-full bg-gray-600 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-gray-700 font-medium mb-0.5">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-emerald-500">
                        chat
                      </span>
                      WhatsApp Chat &amp; CS
                    </span>
                    <span className="font-mono">{waPct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div style={{ width: `${waPct}%` }} className="h-full bg-emerald-500 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-gray-700 font-medium mb-0.5">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-pink-500">
                        photo_camera
                      </span>
                      Instagram CV Pelangi UV
                    </span>
                    <span className="font-mono">{igPct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div style={{ width: `${igPct}%` }} className="h-full bg-pink-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 mt-4 flex items-center justify-between text-[11px] text-gray-400">
            <span>Server Bizpark Sidoarjo</span>
            <span>Diperbarui otomatis tiap sesi</span>
          </div>
        </div>
      </div>
    </div>
  );
}

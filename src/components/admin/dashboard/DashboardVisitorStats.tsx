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

  const maxVal = Math.max(
    ...dailyStats.map((d) => Math.max(d.pageviews, d.visitors)),
    0
  );
  // Default clean ceiling of 10 if views are minimal/0
  const chartMax = maxVal === 0 ? 10 : Math.max(10, Math.ceil((maxVal * 1.25) / 5) * 5);

  const realTotalDevices =
    (data?.devices?.mobile || 0) +
    (data?.devices?.desktop || 0) +
    (data?.devices?.tablet || 0);

  const mobilePct = realTotalDevices > 0 ? Math.round(((data?.devices?.mobile || 0) / realTotalDevices) * 100) : 0;
  const desktopPct = realTotalDevices > 0 ? Math.round(((data?.devices?.desktop || 0) / realTotalDevices) * 100) : 0;
  const tabletPct = realTotalDevices > 0 ? Math.max(0, 100 - mobilePct - desktopPct) : 0;

  const realTotalSources =
    (data?.sources?.direct || 0) +
    (data?.sources?.search || 0) +
    (data?.sources?.whatsapp || 0) +
    (data?.sources?.instagram || 0);

  const directPct = realTotalSources > 0 ? Math.round(((data?.sources?.direct || 0) / realTotalSources) * 100) : 0;
  const searchPct = realTotalSources > 0 ? Math.round(((data?.sources?.search || 0) / realTotalSources) * 100) : 0;
  const waPct = realTotalSources > 0 ? Math.round(((data?.sources?.whatsapp || 0) / realTotalSources) * 100) : 0;
  const igPct = realTotalSources > 0 ? Math.max(0, 100 - directPct - searchPct - waPct) : 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-5 sm:p-6 mb-7">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <h3 className="text-base font-bold text-gray-900 tracking-tight">
            Statistik Pengunjung
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Grafik kunjungan dan halaman paling sering dilihat
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Metric Selector */}
          <div className="inline-flex items-center p-1 bg-gray-100 rounded-xl text-xs font-semibold">
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
          <div className="inline-flex items-center p-1 bg-gray-100 rounded-xl text-xs font-semibold">
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
            title="Muat ulang analitik"
            className="p-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition cursor-pointer active:scale-95"
          >
            <span className={`material-symbols-outlined text-base ${loading ? "animate-spin" : ""}`}>
              refresh
            </span>
          </button>
        </div>
      </div>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-5">
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80">
          <span className="text-xs font-semibold text-gray-500">Total Tayangan</span>
          <p className="text-xl sm:text-2xl font-black text-gray-900 mt-1 font-mono">
            {data ? data.totalPageviews.toLocaleString("id-ID") : "0"}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80">
          <span className="text-xs font-semibold text-gray-500">Pengunjung Unik</span>
          <p className="text-xl sm:text-2xl font-black text-gray-900 mt-1 font-mono">
            {data ? data.uniqueVisitors.toLocaleString("id-ID") : "0"}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80">
          <span className="text-xs font-semibold text-gray-500">Rata-Rata / Hari</span>
          <p className="text-xl sm:text-2xl font-black text-gray-900 mt-1 font-mono">
            {data ? data.avgDailyViews.toLocaleString("id-ID") : "0"}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Hari Ini</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-gray-900 mt-1 font-mono">
            {data ? data.todayViews.toLocaleString("id-ID") : "0"}
          </p>
        </div>
      </div>

      {/* 3. Interactive Chart */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gray-50/80 border border-gray-200/70 relative">
        <div className="flex items-center gap-4 mb-4 text-xs">
          {(metricMode === "both" || metricMode === "pageviews") && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#F65456]"></span>
              <span className="font-semibold text-gray-700">Tayangan</span>
            </div>
          )}
          {(metricMode === "both" || metricMode === "visitors") && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-500"></span>
              <span className="font-semibold text-gray-700">Pengunjung</span>
            </div>
          )}
        </div>

        <div className="h-60 sm:h-64 w-full flex items-end gap-1.5 sm:gap-3 pt-6 pb-2 px-1 relative">
          {/* Gridlines */}
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
            const pvHeight = item.pageviews > 0 ? Math.max(6, Math.round((item.pageviews / chartMax) * 100)) : 0;
            const visHeight = item.visitors > 0 ? Math.max(6, Math.round((item.visitors / chartMax) * 100)) : 0;
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={item.date}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex-1 h-full flex flex-col justify-end items-center relative z-10 cursor-pointer"
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-16 z-30 px-3 py-1.5 rounded-xl bg-gray-900 text-white text-[11px] shadow-lg pointer-events-none whitespace-nowrap">
                    <p className="font-bold text-gray-300 border-b border-white/10 pb-0.5 mb-1">
                      {item.label}
                    </p>
                    <div className="flex items-center justify-between gap-3 text-red-300">
                      <span>Tayangan:</span>
                      <strong className="text-white">{item.pageviews}</strong>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-blue-300">
                      <span>Pengunjung:</span>
                      <strong className="text-white">{item.visitors}</strong>
                    </div>
                  </div>
                )}

                <div className="w-full flex items-end justify-center gap-0.5 sm:gap-1 h-full pb-1">
                  {(metricMode === "both" || metricMode === "pageviews") && (
                    <div
                      style={{ height: `${pvHeight}%` }}
                      className={`w-full max-w-[16px] rounded-t-sm transition-all duration-200 ${
                        pvHeight === 0
                          ? "bg-transparent"
                          : isHovered
                          ? "bg-[#F65456]"
                          : "bg-[#F65456]/85"
                      }`}
                    ></div>
                  )}

                  {(metricMode === "both" || metricMode === "visitors") && (
                    <div
                      style={{ height: `${visHeight}%` }}
                      className={`w-full max-w-[16px] rounded-t-sm transition-all duration-200 ${
                        visHeight === 0
                          ? "bg-transparent"
                          : isHovered
                          ? "bg-blue-600"
                          : "bg-blue-500/80"
                      }`}
                    ></div>
                  )}
                </div>

                <span
                  className={`text-[9px] sm:text-[10px] mt-1 truncate max-w-full font-medium ${
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

      {/* 4. Bottom Breakdown */}
      <div className="grid lg:grid-cols-2 gap-5 mt-6">
        {/* Top Pages */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/80">
          <h4 className="text-sm font-bold text-gray-900 mb-4">
            Halaman Paling Sering Dilihat
          </h4>

          <div className="space-y-3">
            {data?.topPages && data.topPages.length > 0 ? (
              data.topPages.map((page, index) => (
                <div key={page.path}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-700 shrink-0">
                        {index + 1}
                      </span>
                      <a
                        href={page.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-gray-800 hover:text-[#F65456] transition truncate hover:underline"
                      >
                        {page.title}
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
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${page.percentage}%` }}
                      className="h-full rounded-full bg-[#F65456]"
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <span className="material-symbols-outlined text-gray-300 text-3xl mb-1">
                  query_stats
                </span>
                <p className="text-xs text-gray-500 font-medium">Belum ada kunjungan halaman tercatat.</p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Data akan otomatis muncul saat pengunjung mengakses halaman website.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Devices & Sources */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/80">
          <h4 className="text-sm font-bold text-gray-900 mb-4">
            Perangkat &amp; Sumber Trafik
          </h4>

          {/* Devices */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-500 mb-2">
              Perangkat Pengunjung
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-center">
                <span className="text-xs text-gray-500">Smartphone</span>
                <p className="text-sm font-bold text-gray-900 font-mono mt-0.5">
                  {mobilePct}%
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-center">
                <span className="text-xs text-gray-500">PC / Laptop</span>
                <p className="text-sm font-bold text-gray-900 font-mono mt-0.5">
                  {desktopPct}%
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-center">
                <span className="text-xs text-gray-500">Tablet</span>
                <p className="text-sm font-bold text-gray-900 font-mono mt-0.5">
                  {tabletPct}%
                </p>
              </div>
            </div>
          </div>

          {/* Sources */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">
              Sumber Rujukan (Traffic Sources)
            </p>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] text-gray-700 font-medium mb-0.5">
                  <span>Google Search</span>
                  <span className="font-mono">{searchPct}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div style={{ width: `${searchPct}%` }} className="h-full bg-blue-500 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-gray-700 font-medium mb-0.5">
                  <span>Akses Langsung (Direct URL)</span>
                  <span className="font-mono">{directPct}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div style={{ width: `${directPct}%` }} className="h-full bg-gray-600 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-gray-700 font-medium mb-0.5">
                  <span>WhatsApp Chat</span>
                  <span className="font-mono">{waPct}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div style={{ width: `${waPct}%` }} className="h-full bg-emerald-500 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-gray-700 font-medium mb-0.5">
                  <span>Instagram</span>
                  <span className="font-mono">{igPct}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div style={{ width: `${igPct}%` }} className="h-full bg-pink-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

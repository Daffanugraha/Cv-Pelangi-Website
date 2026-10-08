import React from "react";

interface AdminStatCardProps {
  label: string;
  value: number | string;
  sublabel?: string;
  icon: string;
  color?: "red" | "emerald" | "amber" | "blue" | "gray";
  onClick?: () => void;
  active?: boolean;
}

export default function AdminStatCard({
  label,
  value,
  sublabel,
  icon,
  color = "red",
  onClick,
  active = false,
}: AdminStatCardProps) {
  const colorMap = {
    red: {
      bg: "bg-red-50 text-[#F65456]",
      borderActive: "border-[#F65456] bg-red-50/30",
    },
    emerald: {
      bg: "bg-emerald-50 text-emerald-600",
      borderActive: "border-emerald-500 bg-emerald-50/30",
    },
    amber: {
      bg: "bg-amber-50 text-amber-600",
      borderActive: "border-amber-500 bg-amber-50/30",
    },
    blue: {
      bg: "bg-blue-50 text-blue-600",
      borderActive: "border-blue-500 bg-blue-50/30",
    },
    gray: {
      bg: "bg-gray-100 text-gray-600",
      borderActive: "border-gray-500 bg-gray-50/50",
    },
  };

  const currentTheme = colorMap[color] || colorMap.red;

  return (
    <div
      onClick={onClick}
      className={`p-4 sm:p-5 rounded-2xl bg-white border transition-all duration-200 flex items-center justify-between ${
        onClick ? "cursor-pointer hover:shadow-md hover:border-gray-300 active:scale-[0.99]" : ""
      } ${active ? currentTheme.borderActive : "border-gray-200/80 shadow-xs"}`}
    >
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono">
          {label}
        </p>
        <p className="font-heading font-black text-2xl sm:text-3xl text-gray-900 mt-1">
          {value}
        </p>
        {sublabel && (
          <p className="text-[11px] text-gray-400 mt-0.5 font-medium">{sublabel}</p>
        )}
      </div>

      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${currentTheme.bg}`}
      >
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>
    </div>
  );
}

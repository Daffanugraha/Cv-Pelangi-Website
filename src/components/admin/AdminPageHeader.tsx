import React from "react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  badgeVariant?: "primary" | "success" | "neutral";
  actions?: React.ReactNode;
}

export default function AdminPageHeader({
  title,
  description,
  badge,
  badgeVariant = "primary",
  actions,
}: AdminPageHeaderProps) {
  const badgeStyles = {
    primary: "bg-red-50 text-bracket-border border-red-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    neutral: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-gray-200/80">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="font-heading font-black text-xl sm:text-2xl text-gray-900 tracking-tight">
            {title}
          </h1>
          {badge && (
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeStyles[badgeVariant]}`}
            >
              {badge}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}

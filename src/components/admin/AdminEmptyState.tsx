import React from "react";

interface AdminEmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function AdminEmptyState({
  icon = "inbox",
  title,
  description,
  action,
}: AdminEmptyStateProps) {
  return (
    <div className="py-14 sm:py-16 px-4 text-center rounded-2xl bg-white border border-gray-200/80 shadow-xs flex flex-col items-center justify-center">
      <div className="w-14 h-14 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mb-3.5">
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      <h3 className="font-heading font-extrabold text-base sm:text-lg text-gray-900 mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed mb-4">
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

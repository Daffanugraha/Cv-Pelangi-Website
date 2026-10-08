import React from "react";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 bg-gray-200 rounded-xl w-64" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-28 bg-white border border-gray-200 rounded-2xl p-4" />
        ))}
      </div>
      <div className="h-24 bg-gray-200 rounded-2xl" />
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="h-80 bg-white border border-gray-200 rounded-2xl" />
        <div className="h-80 bg-white border border-gray-200 rounded-2xl" />
      </div>
    </div>
  );
}

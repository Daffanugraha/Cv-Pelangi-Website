import React from "react";
import Link from "next/link";
import type { GalleryItem } from "@/lib/admin/db";

interface DashboardGalleryPreviewProps {
  gallery: GalleryItem[];
}

export default function DashboardGalleryPreview({
  gallery,
}: DashboardGalleryPreviewProps) {
  return (
    <div className="bg-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-xs">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-bracket-border text-lg">
            photo_library
          </span>
          <h2 className="font-heading font-bold text-gray-900 text-sm sm:text-base">
            Portofolio Galeri Terkini
          </h2>
        </div>
        <Link
          href="/admin/galeri"
          className="text-xs font-bold text-[#F65456] hover:underline transition"
        >
          Kelola Galeri →
        </Link>
      </div>

      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
          {gallery.slice(0, 9).map((item) => (
            <div
              key={item.id}
              className="aspect-square rounded-xl overflow-hidden bg-gray-100 relative group border border-gray-200/80 shadow-2xs"
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              {item.featured && (
                <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-amber-400 text-black rounded-full flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[10px] font-bold">
                    star
                  </span>
                </div>
              )}
            </div>
          ))}

          {gallery.length === 0 && (
            <div className="col-span-full py-8 text-center text-gray-400 text-xs sm:text-sm">
              Belum ada foto yang diunggah ke galeri portofolio.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

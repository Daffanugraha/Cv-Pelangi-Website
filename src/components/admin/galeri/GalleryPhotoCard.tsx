"use client";

import React from "react";
import type { GalleryItem } from "@/lib/admin/db";

interface GalleryPhotoCardProps {
  item: GalleryItem;
  onToggleFeatured: (item: GalleryItem) => void;
  onEdit: (item: GalleryItem) => void;
  onDelete: (id: string) => void;
}

export default function GalleryPhotoCard({
  item,
  onToggleFeatured,
  onEdit,
  onDelete,
}: GalleryPhotoCardProps) {
  return (
    <div className="group bg-white border border-gray-200/90 rounded-2xl overflow-hidden hover:border-[#F65456]/40 hover:shadow-md transition-all shadow-xs flex flex-col">
      {/* Image Container */}
      <div className="aspect-video bg-gray-100 relative overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="material-symbols-outlined text-3xl">image</span>
          </div>
        )}
        {item.featured && (
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-amber-400 text-black text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
            <span className="material-symbols-outlined text-xs font-bold">star</span>
            Unggulan
          </div>
        )}
      </div>

      {/* Info Content */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-sm font-bold text-gray-900 truncate" title={item.title}>
            {item.title}
          </p>
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            <span className="text-[11px] bg-red-50 text-[#F65456] border border-red-100 px-2.5 py-0.5 rounded-full font-bold">
              {item.category}
            </span>
            <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
              {item.technique}
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center border-t border-gray-100 bg-gray-50/60">
        <button
          type="button"
          onClick={() => onToggleFeatured(item)}
          title={item.featured ? "Hapus dari unggulan" : "Jadikan unggulan"}
          className={`flex-1 py-2.5 text-xs flex items-center justify-center gap-1 transition cursor-pointer ${
            item.featured
              ? "text-amber-500 hover:bg-amber-50 font-bold"
              : "text-gray-400 hover:bg-gray-100 hover:text-amber-500"
          }`}
        >
          <span className="material-symbols-outlined text-base">star</span>
          <span className="text-[11px]">{item.featured ? "Unggulan" : "Favorit"}</span>
        </button>
        <button
          type="button"
          onClick={() => onEdit(item)}
          title="Edit foto"
          className="flex-1 py-2.5 text-xs text-gray-600 hover:bg-gray-100 hover:text-gray-900 flex items-center justify-center gap-1 transition border-l border-gray-100 cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">edit</span>
          <span className="text-[11px]">Edit</span>
        </button>
        <button
          type="button"
          onClick={() => onDelete(item.id)}
          title="Hapus foto"
          className="flex-1 py-2.5 text-xs text-gray-400 hover:bg-red-50 hover:text-red-600 flex items-center justify-center gap-1 transition border-l border-gray-100 cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">delete</span>
          <span className="text-[11px]">Hapus</span>
        </button>
      </div>
    </div>
  );
}

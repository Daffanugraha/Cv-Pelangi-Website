import authenticReels from "@/data/instagram_reels.json";

export interface GalleryVideoItem {
  id?: string;
  shortcode?: string;
  source: string;
  tag: string;
  duration: string;
  title: string;
  desc: string;
  capacity: string;
  img: string;
  videoUrl: string;
  embedUrl: string;
  objectPosition?: string;
  date?: string;
  isReal?: boolean;
}

// Single-source-of-truth video galeri bersumber dari data autentik instagram_reels.json
export const galleryVideos: GalleryVideoItem[] = authenticReels as GalleryVideoItem[];

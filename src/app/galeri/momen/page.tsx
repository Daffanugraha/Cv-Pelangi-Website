import GaleriMomenPageContent from "@/components/sections/galeri-momen";
import { getMomenAlbums } from "@/lib/admin/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Galeri Momen & Kegiatan CV Pelangi UV | Dokumentasi & Event",
  description:
    "Dokumentasi rekam jejak dedikasi dan kebersamaan keluarga besar CV Pelangi UV: Surabaya Printing Expo (SPE), HUT RI ke-79, dan Employee Gathering.",
};

export default function GaleriMomenPage() {
  const albums = getMomenAlbums();
  return <GaleriMomenPageContent initialAlbums={albums} />;
}

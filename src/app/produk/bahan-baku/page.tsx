import React from "react";
import type { Metadata } from "next";
import { BahanBakuPageContent } from "@/components/sections/bahan-baku";

export const metadata: Metadata = {
  title:
    "Katalog Bahan Baku Finishing Cetak - CV Pelangi UV | BOPP, Foil Stamping, Lem & Spot UV",
  description:
    "Pusat grosir dan distributor bahan baku finishing cetak pasca-cetak: Roll Foil Hot & Cold Stamping, Film Thermal BOPP Doff/Glossy, Lem Wet Laminating, serta Tinta & Varnish Spot UV. Ready stock pergudangan Bizpark Sidoarjo.",
  keywords: [
    "bahan baku finishing cetak",
    "bopp thermal film",
    "foil hot stamping sidoarjo",
    "foil gold 120m",
    "lem wet laminating",
    "tinta spot uv",
    "slitting roll custom",
    "cv pelangi uv",
    "grosir bahan percetakan surabaya",
  ],
};

export default function BahanBakuPage() {
  return <BahanBakuPageContent />;
}

import React from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Protects brand names and slogans from being translated by Google Translate:
 * - "CV Pelangi UV"
 * - "Pelangi UV"
 * - "When Quality Be A Priority"
 */
export function protectBrandText(text: string): React.ReactNode {
  if (!text || typeof text !== "string") return text;
  const regex = /(CV\s+Pelangi\s+UV|Pelangi\s+UV|When\s+Quality\s+Be\s+A\s+Priority)/gi;
  if (!regex.test(text)) return text;

  const parts = text.split(regex);
  return parts.map((part, i) => {
    if (/(CV\s+Pelangi\s+UV|Pelangi\s+UV|When\s+Quality\s+Be\s+A\s+Priority)/i.test(part)) {
      return React.createElement(
        "span",
        { key: i, translate: "no", className: "notranslate" },
        part
      );
    }
    return part;
  });
}

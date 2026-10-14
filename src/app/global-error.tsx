"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Boundary caught:", error);
  }, [error]);

  return (
    <html lang="id">
      <head>
        <title>Terjadi Kesalahan - CV Pelangi UV</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          backgroundColor: "#f8f9fa",
          color: "#1a1a1a",
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "460px",
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "24px",
            padding: "36px 32px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
            textAlign: "center",
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "18px",
              backgroundColor: "rgba(246, 84, 86, 0.12)",
              color: "#f65456",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            !
          </div>

          <h2
            style={{
              fontSize: "22px",
              fontWeight: 800,
              margin: "0 0 10px",
              color: "#0a0c10",
            }}
          >
            Terjadi Kendala Teknis
          </h2>

          <p
            style={{
              fontSize: "14px",
              color: "#555555",
              lineHeight: 1.6,
              margin: "0 0 24px",
            }}
          >
            Halaman sedang mengalami gangguan sementara. Silakan tekan tombol di bawah untuk memuat ulang sistem.
          </p>

          <button
            type="button"
            onClick={() => reset()}
            style={{
              width: "100%",
              padding: "14px 24px",
              borderRadius: "9999px",
              backgroundColor: "#f65456",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "14px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(246,84,86,0.35)",
              transition: "transform 0.15s ease",
            }}
          >
            Muat Ulang Halaman
          </button>
        </div>
      </body>
    </html>
  );
}

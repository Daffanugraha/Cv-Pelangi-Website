import { NextRequest, NextResponse } from "next/server";
import { getSmartAdvisorReply } from "@/lib/chatbotAdvisor";

interface HistoryMessage {
  sender?: string;
  text?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, conversationHistory } = body as {
      message?: string;
      conversationHistory?: HistoryMessage[];
    };

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Pesan tidak boleh kosong" },
        { status: 400 }
      );
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;

    // Jika user mengonfigurasi GEMINI_API_KEY di .env.local, gunakan Gemini LLM
    if (geminiApiKey) {
      try {
        const systemPrompt = `Anda adalah "Pelangi Assistant", konsultan teknis finishing & bahan baku resmi dari CV Pelangi UV ("When Quality Be A Priority", berdiri sejak 2004).

DATA RESMI & FAKTA CV PELANGI UV (WAJIB AKURAT & JANGAN NGAWUR):
1. LOKASI PABRIK & WORKSHOP:
   Kompleks Pergudangan Bizpark Blok C17-C19, Jabon, Tambaksawah, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256 (dekat Bandara Juanda & akses Tol Rungkut).
2. JAM OPERASIONAL:
   - Senin – Jumat: 07.30 – 15.30 WIB
   - Sabtu: 07.30 – 13.00 WIB
   - Minggu & Hari Libur Nasional: Tutup (mesin produksi beroperasi shift penuh untuk order skala besar).
3. KONTAK RESMI:
   - WhatsApp Marketing/Konsultasi: 0822 3101 9363 (atau +62 822-3101-9363)
   - Telepon Kantor: 031 866 7469 / 031 867 7468
   - Email: info@pelangiuv.com
4. LAYANAN JASA FINISHING UTAMA:
   - Hot Stamp Foil: Emas (Gold), Perak (Silver), Rose Gold, Hologram, Warna-Warni, Pigment Foil.
   - Spot UV: Spot Gloss kilap tinggi, Spot Doff/Matte, Tekstur Pasir taktil presisi mikron.
   - Laminating: Thermal BOPP (Doff Halus, Glossy Bening, Velvet Soft-Touch anti-sidik jari).
   - Cast and Cure: Efek hologram prisma mikro ramah lingkungan tanpa film laminasi mika konvensional.
   - Pond & Window: Die-cut otomatis pisau tajam (tidak retak pada tekukan) & pasang jendela mika transparan food-grade.
5. GROSIR BAHAN BAKU:
   - Film BOPP Thermal & Waterbase (Doff, Glossy, Velvet 12-30 mic, free slitting potong belah ukuran custom).
   - Roll Hot Stamping Foil (standar 120m s/d roll jumbo 3000m).
   - Lem Wet & Dry Laminating Waterbased ramah pangan dan cepat kering.
   - Varnish Spot UV curing.
6. FASILITAS & KEUNGGULAN:
   - 35+ unit mesin otomatis dan semi-otomatis berkapasitas besar (mampu menyelesaikan hingga 200.000+ lembar/hari).
   - Antar-Jemput Plano Cetakan GRATIS se-Jawa Timur (Surabaya, Sidoarjo, Gresik, Mojokerto, Pasuruan, Malang) menggunakan armada truk boks tertutup mandiri.
   - MOQ fleksibel: melayani UMKM hingga partai besar industri kemasan & rokok.
   - Swatch Sample Kit fisik GRATIS dikirim ke alamat workshop rekanan.

PANDUAN GAYA JAWABAN:
1. Lugas, profesional, ramah, dan solutif.
2. Jawab secara tepat sesuai fakta di atas. JANGAN mengarang informasi atau harga fiktif jika tidak tahu. Arahkan user untuk konfirmasi ukuran plano & kuantiti via WhatsApp Marketing (0822 3101 9363).
3. Gunakan HTML rapi sederhana (<p>, <strong>, <em>, <ul>, <li>). JANGAN gunakan tag markdown code block.`;

        const contents: { role: string; parts: { text: string }[] }[] = [];

        // Masukkan riwayat percakapan sebelumnya jika ada
        if (Array.isArray(conversationHistory)) {
          for (const msg of conversationHistory.slice(-6)) {
            contents.push({
              role: msg.sender === "user" ? "user" : "model",
              parts: [{ text: msg.text || "" }],
            });
          }
        }

        // Masukkan prompt user terkini
        contents.push({
          role: "user",
          parts: [{ text: message }],
        });

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents,
              systemInstruction: {
                parts: [{ text: systemPrompt }],
              },
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 800,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const generatedText: string | undefined =
            data.candidates?.[0]?.content?.parts?.[0]?.text;

          if (generatedText) {
            // Bersihkan format markdown jika ada markdown code block
            let cleanHtml = generatedText
              .replace(/```html/gi, "")
              .replace(/```/g, "")
              .trim();

            // Ubah baris baru jadi paragraf jika tidak ada tag html
            if (!cleanHtml.includes("<p>") && !cleanHtml.includes("<div>")) {
              cleanHtml = cleanHtml
                .split("\n\n")
                .map((p: string) => `<p class="mb-2">${p}</p>`)
                .join("");
            }

            // Tambahkan tombol WhatsApp
            const waUrl = `https://wa.me/6282231019363?text=${encodeURIComponent(
              `Halo Admin Pelangi UV, saya ingin konsultasi teknis: ${message.slice(
                0,
                80
              )}`
            )}`;

            cleanHtml += `
              <div class="pt-2 flex flex-wrap gap-2">
                <a href="${waUrl}" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-black text-white text-[11px] font-medium transition-all shadow-xs">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
                  <span>Diskusi Teknis di WhatsApp</span>
                  <span class="material-symbols-outlined text-[13px] text-neutral-400">arrow_forward</span>
                </a>
              </div>
            `;

            return NextResponse.json({
              html: cleanHtml,
              chips: [
                "Minta Sample Swatch Kit Gratis",
                "Hitung Estimasi Biaya",
                "Syarat Antar-Jemput Gratis Jatim",
                "Konsultasi Finishing Lainnya",
              ],
            });
          }
        }
      } catch (err) {
        console.error("Gemini API Error, falling back to local advisor:", err);
      }
    }

    // Fallback cerdas: Menggunakan Local Expert Advisor Engine Pelangi UV
    const advisorResult = getSmartAdvisorReply(message);
    return NextResponse.json(advisorResult);
  } catch (error) {
    console.error("Chat API error:", error);
    const fallback = getSmartAdvisorReply("halo");
    return NextResponse.json(fallback);
  }
}

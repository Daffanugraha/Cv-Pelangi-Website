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
        const systemPrompt = `Anda adalah "Pelangi UV Assistant", konsultan ahli grafika & spesifikasi finishing cetak resmi dari CV Pelangi UV (workshop & kantor di Bizpark C17-C19, Tambaksawah, Waru, Sidoarjo, Jawa Timur).
Fasilitas CV Pelangi UV: 35+ mesin finishing otomatis berkapasitas besar, melayani Hot Stamp Foil (Gold, Rose Gold, Silver, Hologram, dll), Laminasi Thermal BOPP (Doff, Glossy, Velvet Soft Touch), Spot UV Timbul, Pond Rel Creasing, Emboss/Deboss, Varnish UV, dan grosir bahan baku. Memiliki armada truk & pick-up antar-jemput cetakan plano GRATIS se-Jawa Timur (Surabaya, Sidoarjo, Gresik, Pasuruan, Mojokerto, Malang). Sedia Swatch Sample Kit Gratis.

GAYA KOMUNIKASI (SANGAT PENTING):
1. Merespons dengan empati tinggi, ramah, dan solutif ala konsultan berpengalaman.
2. Saat user bercerita/curhat kendala (misal: "aku gini gitu...", "bingung mau cetak apa", "box pecah pas ditekuk", "mau kelihatan mewah tapi budget terbatas"), selalu awali dengan validasi & pemahaman hangat seperti: "Oh iya kak, paham banget! Banyak rekan percetakan & brand yang ngalamin hal serupa...", lalu jelaskan mengapa hal itu terjadi.
3. Berikan saran praktis konkret (kombinasi bahan kertas + jenis finishing + trik hemat budget).
4. Gunakan format HTML sederhana yang aman (<p>, <strong>, <em>, <ul>, <li>, <div class="mt-2 p-2 bg-orange-50 rounded-lg"> dsb.) agar mudah dibaca.
5. Di akhir jawaban, ajak dengan ramah untuk mencoba Swatch Sample Kit Gratis atau konsultasi teknis via WhatsApp resmi (0822 3101 9363).`;

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

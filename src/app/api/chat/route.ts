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

    const groqApiKey = process.env.GROQ_API_KEY;
    const groqModel = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";
    const geminiApiKey = process.env.GEMINI_API_KEY;

    const systemPrompt = `Anda adalah "Pelangi Assistant", konsultan teknis finishing cetak & bahan baku resmi dari CV Pelangi UV ("When Quality Be A Priority", berdiri sejak 2004).

DATA RESMI PERUSAHAAN (MUTLAK & AKURAT):
1. LOKASI PABRIK & WORKSHOP:
   Kompleks Pergudangan Bizpark Blok C17-C19, Jabon, Tambaksawah, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256 (akses strategis dekat Bandara Juanda & Tol Rungkut).
2. JAM OPERASIONAL:
   - Senin – Jumat: 07.30 – 15.30 WIB
   - Sabtu: 07.30 – 13.00 WIB
   - Minggu & Hari Libur Nasional: Tutup (mesin produksi beroperasi shift penuh untuk order skala besar).
3. KONTAK RESMI:
   - WhatsApp Marketing/Konsultasi: 0822 3101 9363 (atau +62 822-3101-9363)
   - Telepon Kantor: (031) 866 7469 / (031) 867 7468
   - Email: info@pelangiuv.com
4. LAYANAN JASA FINISHING UTAMA:
   - Hot Stamp Foil: Emas (Gold), Perak (Silver), Rose Gold, Hologram, Warna-Warni, Pigment Foil.
   - Spot UV: Spot Gloss kilap tinggi, Spot Doff/Matte, Tekstur Pasir taktil presisi mikron.
   - Laminating: Thermal BOPP (Doff Halus, Glossy Bening, Velvet Soft-Touch anti-sidik jari).
   - Cast and Cure: Efek hologram prisma mikro ramah lingkungan tanpa film laminasi mika konvensional.
   - Pond & Window: Die-cut otomatis pisau tajam (tidak retak pada tekukan) & pasang jendela mika transparan food-grade.
5. GROSIR BAHAN BAKU:
   - Film BOPP Thermal & Waterbase (Doff, Glossy, Velvet 12-30 mic, free slitting potong belah ukuran custom presisi rotari ±0.5 mm).
   - Roll Hot Stamping Foil (standar 120m s/d roll jumbo 3000m).
   - Lem Wet & Dry Laminating Waterbased ramah pangan dan cepat kering.
   - Varnish Spot UV curing.
6. FASILITAS & KEUNGGULAN:
   - 35+ unit mesin otomatis dan semi-otomatis berkapasitas besar (mampu menyelesaikan hingga 200.000+ lembar/hari).
   - Antar-Jemput Plano Cetakan GRATIS se-Jawa Timur (Surabaya, Sidoarjo, Gresik, Mojokerto, Pasuruan, Malang) menggunakan armada truk boks tertutup mandiri.
   - MOQ fleksibel: melayani UMKM hingga partai besar industri kemasan & rokok.
   - Swatch Sample Kit fisik GRATIS dikirim ke alamat workshop rekanan.

PANDUAN GAYA & FORMAT JAWABAN (SANGAT KETAT):
1. JANGAN PERNAH gunakan sapaan santai/alay seperti: "hai kak", "halo kak", "oh iya kak", atau gaya chat informal. Gunakan bahasa Indonesia profesional, tegas, berbobot teknis, dan langsung to the point.
2. Jawab secara tepat sesuai fakta resmi di atas. JANGAN mengarang data teknis atau lokasi fiktif.
3. Jika ditanya kendala teknis (seperti box retak / pecah di tekukan), jelaskan secara presisi:
   - Arah serat kertas (grain direction) harus TEGAK LURUS terhadap garis lipatan (crease line).
   - Solusi pelapisan: Laminasi Thermal BOPP Pelangi UV (lem EVA elastis berdaya rekat tinggi sehingga karton tidak pecah saat ditekuk 180°).
   - Kalibrasi pisau creasing matrix sesuai gramasi kertas.
4. Gunakan format HTML bersih (<p>, <strong>, <em>, <ul>, <li>). JANGAN gunakan tag markdown code block.`;

    // 1. Prioritas Utama: Groq API (Qwen 3.8 / LLaMA berkecepatan tinggi)
    if (groqApiKey) {
      try {
        // 0. Keamanan Input: Pindai Pesan dengan meta-llama/llama-prompt-guard-2-22m
        try {
          const guardRes = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${groqApiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "meta-llama/llama-prompt-guard-2-22m",
                messages: [{ role: "user", content: message }],
                max_tokens: 1,
              }),
            }
          );

          if (guardRes.ok) {
            const guardData = await guardRes.json();
            const guardScoreRaw = guardData.choices?.[0]?.message?.content;
            const guardScore = parseFloat(guardScoreRaw);

            // Jika skor ancaman > 0.85 (indikasi prompt injection / jailbreak berbahaya)
            if (!isNaN(guardScore) && guardScore > 0.85) {
              return NextResponse.json({
                html: `<p class="text-neutral-800 leading-relaxed">Pertanyaan yang diajukan tidak dapat diproses. Mohon ajukan pertanyaan seputar layanan finishing cetak, spesifikasi teknis, atau bahan baku CV Pelangi UV.</p>`,
                chips: [
                  "Layanan Finishing Cetak",
                  "Pricelist Bahan Baku",
                  "Alamat Pabrik & Jam Buka",
                  "Kontak WhatsApp Marketing",
                ],
              });
            }
          }
        } catch (guardErr) {
          console.warn("Prompt guard check failed, proceeding safely:", guardErr);
        }

        const groqMessages: { role: string; content: string }[] = [
          { role: "system", content: systemPrompt },
        ];

        if (Array.isArray(conversationHistory)) {
          for (const msg of conversationHistory.slice(-4)) {
            groqMessages.push({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text || "",
            });
          }
        }

        groqMessages.push({ role: "user", content: message });

        const groqRes = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${groqApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: groqModel,
              messages: groqMessages,
              temperature: 0.2,
              max_tokens: 500,
            }),
          }
        );

        if (groqRes.ok) {
          const groqData = await groqRes.json();
          const generatedText: string | undefined =
            groqData.choices?.[0]?.message?.content;

          if (generatedText) {
            let cleanHtml = generatedText
              .replace(/```html/gi, "")
              .replace(/```/g, "")
              .trim();

            if (!cleanHtml.includes("<p>") && !cleanHtml.includes("<div>")) {
              cleanHtml = cleanHtml
                .split("\n\n")
                .map((p: string) => `<p class="mb-2 leading-relaxed">${p}</p>`)
                .join("");
            }

            const waUrl = `https://wa.me/6282231019363?text=${encodeURIComponent(
              `Halo Tim Marketing CV Pelangi UV, saya ingin konsultasi teknis: ${message.slice(
                0,
                80
              )}`
            )}`;

            cleanHtml += `
              <div class="pt-2 flex flex-wrap gap-2">
                <a href="${waUrl}" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-black text-white text-[11px] font-medium transition-all shadow-xs">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
                  <span>Hubungi Marketing via WhatsApp</span>
                  <span class="material-symbols-outlined text-[13px] text-neutral-400">arrow_forward</span>
                </a>
              </div>
            `;

            return NextResponse.json({
              html: cleanHtml,
              chips: [
                "Cek Pricelist & Biaya Plano",
                "Minta Swatch Sample Kit Gratis",
                "Syarat Antar-Jemput Gratis Jatim",
                "Spesifikasi Mesin & Bahan",
              ],
            });
          }
        }
      } catch (err) {
        console.error("Groq API error, attempting fallback:", err);
      }
    }

    // 2. Alternatif: Gemini LLM jika diatur
    if (geminiApiKey) {
      try {
        const contents: { role: string; parts: { text: string }[] }[] = [];

        if (Array.isArray(conversationHistory)) {
          for (const msg of conversationHistory.slice(-4)) {
            contents.push({
              role: msg.sender === "user" ? "user" : "model",
              parts: [{ text: msg.text || "" }],
            });
          }
        }

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
                temperature: 0.2,
                maxOutputTokens: 500,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const generatedText: string | undefined =
            data.candidates?.[0]?.content?.parts?.[0]?.text;

          if (generatedText) {
            let cleanHtml = generatedText
              .replace(/```html/gi, "")
              .replace(/```/g, "")
              .trim();

            if (!cleanHtml.includes("<p>") && !cleanHtml.includes("<div>")) {
              cleanHtml = cleanHtml
                .split("\n\n")
                .map((p: string) => `<p class="mb-2 leading-relaxed">${p}</p>`)
                .join("");
            }

            const waUrl = `https://wa.me/6282231019363?text=${encodeURIComponent(
              `Halo Tim Marketing CV Pelangi UV, saya ingin konsultasi teknis: ${message.slice(
                0,
                80
              )}`
            )}`;

            cleanHtml += `
              <div class="pt-2 flex flex-wrap gap-2">
                <a href="${waUrl}" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-black text-white text-[11px] font-medium transition-all shadow-xs">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
                  <span>Hubungi Marketing via WhatsApp</span>
                  <span class="material-symbols-outlined text-[13px] text-neutral-400">arrow_forward</span>
                </a>
              </div>
            `;

            return NextResponse.json({
              html: cleanHtml,
              chips: [
                "Cek Pricelist & Biaya Plano",
                "Minta Swatch Sample Kit Gratis",
                "Syarat Antar-Jemput Gratis Jatim",
                "Spesifikasi Mesin & Bahan",
              ],
            });
          }
        }
      } catch (err) {
        console.error("Gemini API Error, falling back to local advisor:", err);
      }
    }

    // 3. Fallback: Menggunakan Local Expert Advisor Engine Pelangi UV
    const advisorResult = getSmartAdvisorReply(message);
    return NextResponse.json(advisorResult);
  } catch (error) {
    console.error("Chat API error:", error);
    const fallback = getSmartAdvisorReply("halo");
    return NextResponse.json(fallback);
  }
}

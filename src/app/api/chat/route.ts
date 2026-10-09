import { NextRequest, NextResponse } from "next/server";
import { getSmartAdvisorReply, isOffTopicQuery } from "@/lib/chatbotAdvisor";

interface HistoryMessage {
  sender?: string;
  text?: string;
}

/**
 * Membersihkan riwayat chat dan teks dari sisa teks tombol marketing atau arrow_forward
 */
function sanitizeHistoryText(raw?: string): string {
  if (!raw) return "";
  return raw
    .replace(/<div class="pt-2 border-t border-neutral-100[\s\S]*$/gi, "")
    .replace(/Hubungi Tim Marketing Langsung via WhatsApp:?[\s\S]*$/gi, "")
    .replace(/WA\s+(Bu Nurul|Mbak Fathia|Pak Aris)[^\n<]*arrow_?forward[^\n<]*/gi, "")
    .replace(/\barrow_?forward\b/gi, "")
    .trim();
}

/**
 * Mengonversi output teks dari LLM (Markdown) menjadi struktur HTML bersih
 */
function formatLlmResponseToHtml(raw: string): string {
  let text = sanitizeHistoryText(raw.replace(/```[a-z]*\n?/gi, ""));

  if (/<(p|ul|ol|div|li)[^>]*>/i.test(text) && !text.includes("* ") && !text.includes("- ")) {
    return text;
  }

  const lines = text.split("\n");
  const result: string[] = [];
  let inUl = false;
  let inOl = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    if (!line) {
      if (inUl) {
        result.push("</ul>");
        inUl = false;
      }
      if (inOl) {
        result.push("</ol>");
        inOl = false;
      }
      continue;
    }

    line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    line = line.replace(/__(.*?)__/g, "<strong>$1</strong>");
    line = line.replace(/(^|[^*])\*(?!\s)([^*]+?)\*(?!\*)/g, "$1<em>$2</em>");
    line = line.replace(/(^|[^_])_(?!\s)([^_]+?)_(?!_)/g, "$1<em>$2</em>");
    line = line.replace(
      /\[(.*?)\]\((https?:\/\/[^\s\)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-neutral-900 underline font-medium hover:text-black">$1</a>'
    );

    if (/^[-*•]\s+/.test(line)) {
      if (inOl) {
        result.push("</ol>");
        inOl = false;
      }
      if (!inUl) {
        result.push('<ul class="my-2 space-y-1 pl-4 list-disc text-neutral-800">');
        inUl = true;
      }
      const itemContent = line.replace(/^[-*•]\s+/, "");
      result.push(`<li class="leading-relaxed">${itemContent}</li>`);
    } else if (/^\d+\.\s+/.test(line)) {
      if (inUl) {
        result.push("</ul>");
        inUl = false;
      }
      if (!inOl) {
        result.push('<ol class="my-2 space-y-1 pl-4 list-decimal text-neutral-800">');
        inOl = true;
      }
      const itemContent = line.replace(/^\d+\.\s+/, "");
      result.push(`<li class="leading-relaxed">${itemContent}</li>`);
    } else {
      if (inUl) {
        result.push("</ul>");
        inUl = false;
      }
      if (inOl) {
        result.push("</ol>");
        inOl = false;
      }

      if (/^<(p|h\d|div|ul|ol|table|blockquote)/i.test(line)) {
        result.push(line);
      } else {
        result.push(`<p class="mb-2 leading-relaxed text-neutral-800">${line}</p>`);
      }
    }
  }

  if (inUl) result.push("</ul>");
  if (inOl) result.push("</ol>");

  return result.join("");
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

    // 0. Guard Cepat: Tolak langsung pertanyaan matematika iseng ("1+1", "2*5") atau hal di luar percetakan
    if (isOffTopicQuery(message)) {
      const offTopicReply = getSmartAdvisorReply(message);
      return NextResponse.json({
        html: offTopicReply.html,
        chips: offTopicReply.chips,
        suggestedAction: offTopicReply.suggestedAction,
        source: "off-topic-guard",
      });
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    const groqModel = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";
    const geminiApiKey = process.env.GEMINI_API_KEY;

    const systemPrompt = `Anda adalah "Pelangi Assistant", konsultan teknis AI resmi dari CV Pelangi UV ("When Quality Be A Priority", berdiri sejak 2004 di Bizpark Sidoarjo).

KNOWLEDGE BASE LENGKAP ISI WEBSITE CV PELANGI UV:
1. INFORMASI PERUSAHAAN & TIM MARKETING RESMI:
   - Alamat Workshop: Kompleks Pergudangan Bizpark Blok C17-C19, Jabon, Tambaksawah, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256.
   - Jam Buka: Senin–Jumat 07.30–15.30 WIB, Sabtu 07.30–13.00 WIB.
   - Tim Marketing Resmi Pelangi UV:
     * Bu Nurul Islamiyah (Finishing Cetak, Uji Efek Spot UV & Foil, Bahan Percetakan)
     * Mbak Fathia Rizky (Kalkulasi Penawaran, Jadwal Jemput Plano, Tracking Order)
     * Pak Aris Waluyo (Grosir Roll OPP, Lem Wet/Waterbase, Foil Stamping, Mesin Cetak)
   - Layanan Pengiriman: Antar-Jemput Plano Cetakan GRATIS se-Jawa Timur (Surabaya, Sidoarjo, Gresik, Mojokerto, Pasuruan, Malang) armada truk boks tertutup mandiri.
   - Kapasitas: 35+ unit mesin otomatis (mampu s/d 200.000+ lembar/hari).

2. REFERENSI HARGA RESMI WEBSITE (DISEBUTKAN SECARA NATURAL JIKA DITANYA):
   A. GROSIR FOIL ROLL (Halaman /produk/bahan-baku?category=foil):
      - Roll Foil Gold / Silver (120m, 64cm): Rp 186.000 / roll
      - Warna-Warni (Merah, Biru, Hijau, Tembaga 120m): Rp 227.000 / roll
      - Hologram Laser Gold/Silver (120m): Rp 314.500 / roll
      - Transparan Security Stamp (120m): Rp 360.500 / roll
      - Putih BO1: Rp 398.000 / roll | White BO1 Jumbo: Rp 815.500 / roll
   B. JASA FINISHING PERCETAKAN (Halaman /layanan):
      - Jasa Hot Stamp Foil Gold / Silver: Rp 1,08 / cm² (Min. order Rp 300.000)
      - Jasa Hot Stamp Warna: Rp 1,7 / cm² | Hologram: Rp 2,0 / cm²
      - Cold Foil Inline: Rp 2,5 / cm²
      - Spot UV Gloss: Rp 0,22 / cm² | Matte / Pasir: Rp 0,25 / cm²
      - Laminating Doff: Rp 0,24 / cm² | Gloss: Rp 0,163 / cm² | Window Mika: mulai Rp 0,17 / cm²
      - Pond Die-Cut: Rp 80 / lembar | Micro Emboss: Rp 270 / lembar (Plat klise Rp 3.000.000) | Emboss 3D: Rp 90-100 / lembar
   C. FILM BOPP & THERMAL (Halaman /produk/bahan-baku?category=opp):
      - BOPP Glossy: Rp 41.100 - Rp 56.000 / roll | Doff: Rp 49.000 - Rp 57.000 / roll | PET Metalize: Rp 73.100 / roll (Free Slitting lebar 200-1200mm).
   D. LEM & VARNISH (Halaman /produk/bahan-baku):
      - Lem Wet & Dry: Rp 40.000 - Rp 45.000 / pail atau kg
      - Tinta Spot UV: mulai Rp 35.200 (WB Glossy) s/d Rp 165.000 - Rp 246.500 / can

CARA MENJAWAB SEBAGAI AI KONSULTAN CERDAS (PANDUAN KETAT):
1. JAWABAN SINGKAT, LUWES, DAN SOLUTIF (MAKSIMAL 1-2 PARAGRAF RINGKAS):
   - Jawab langsung intinya. Jika ditanya harga, sebutkan kisaran harga atau angka varian utamanya secara luwes dalam kalimat alami, TIDAK PERLU membuat list panjang tabel yang kaku.
   - JANGAN meminta file desain AI/PDF atau menyinggung "kirimkan file AI/PDF" atau "swatch sample kit gratis" kecuali memang ditanyakan oleh user.
   - Cukup berikan penjelasan teknis/harga secara singkat dan solutif. Jika relevan atau pengguna menanyakan kontak, sebutkan kontak tim marketing resmi CV Pelangi UV.
2. MULTI-TURN CONTEXT MEMORY:
   - Jika pengguna sudah menyebut namanya (misal Daffa), sapa dengan sopan "Pak Daffa" atau "Daffa".
   - Pahami alur percakapan sebelumnya (misal: kemasan rokok, micro emboss, dsb.) secara kontekstual tanpa mengulang dari nol.
3. LARANGAN & BATASAN RUANG LINGKUP (SANGAT KETAT):
   - RUANG LINGKUP KHUSUS: Anda HANYA asisten dan konsultan teknis resmi dari CV Pelangi UV. Anda HANYA melayani pertanyaan terkait jasa finishing percetakan (Spot UV, Hot Stamping Foil, Cold Foil, Laminating Doff/Glossy, Pond & Emboss), bahan baku cetak (roll foil, film BOPP, lem, tinta UV), spesifikasi kemasan, serta info kontak/workshop CV Pelangi UV di Bizpark Sidoarjo.
   - DILARANG KERAS menjawab hal di luar topik percetakan & CV Pelangi UV:
     * DILARANG menjawab pertanyaan perhitungan matematika murni / iseng seperti "1 + 1", "5 x 5", "hitung akar", dsb. JANGAN PERNAH menghitung atau memberi jawabannya!
     * DILARANG menjawab pertanyaan coding, resep masakan, cuaca, politik, lirik lagu, cerita, zodiak, atau hal umum lainnya.
     * JIKA DITANYA HAL DI LUAR TOPIK: Tolak dengan sangat sopan dan singkat (1-2 kalimat): Nyatakan bahwa Anda adalah asisten virtual khusus CV Pelangi UV yang fokus pada layanan finishing percetakan dan bahan baku cetak, lalu tawarkan apakah ada kebutuhan seputar kemasan atau cetakan yang bisa dibantu.
   - DILARANG menggunakan sapaan alay seperti "hai kak", "halo kak".
   - DILARANG KERAS menuliskan teks atau footer seperti "Hubungi Tim Marketing Langsung via WhatsApp", "WA Bu Nurul Islamiyah arrow_forward", kata "arrow_forward", atau menempelkan tombol WhatsApp tiruan. Jawab langsung secara informatif, ramah, dan profesional dalam kalimat percakapan mengalir.`;

    // 1. Prioritas Utama: Groq API
    if (groqApiKey) {
      try {
        // Keamanan Input dengan prompt guard
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
          for (const msg of conversationHistory.slice(-10)) {
            const cleanText = sanitizeHistoryText(msg.text);
            if (!cleanText) continue;
            groqMessages.push({
              role: msg.sender === "user" ? "user" : "assistant",
              content: cleanText,
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
              temperature: 0.3,
              max_tokens: 550,
            }),
          }
        );

        if (groqRes.ok) {
          const groqData = await groqRes.json();
          const generatedText: string | undefined =
            groqData.choices?.[0]?.message?.content;

          if (generatedText) {
            const cleanHtml = formatLlmResponseToHtml(generatedText);

            return NextResponse.json({
              html: cleanHtml,
              chips: [
                "Cek Stok Roll Foil Gold/Silver",
                "Harga Jasa Hot Stamp Foil",
                "Pricelist Film BOPP Thermal",
                "Jadwal Antar-Jemput Gratis",
              ],
            });
          }
        }
      } catch (err) {
        console.error("Groq API error, attempting fallback:", err);
      }
    }

    // 2. Alternatif Gemini LLM
    if (geminiApiKey) {
      try {
        const contents: { role: string; parts: { text: string }[] }[] = [];

        if (Array.isArray(conversationHistory)) {
          for (const msg of conversationHistory.slice(-10)) {
            const cleanText = sanitizeHistoryText(msg.text);
            if (!cleanText) continue;
            contents.push({
              role: msg.sender === "user" ? "user" : "model",
              parts: [{ text: cleanText }],
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
                temperature: 0.3,
                maxOutputTokens: 550,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const generatedText: string | undefined =
            data.candidates?.[0]?.content?.parts?.[0]?.text;

          if (generatedText) {
            const cleanHtml = formatLlmResponseToHtml(generatedText);

            return NextResponse.json({
              html: cleanHtml,
              chips: [
                "Cek Stok Roll Foil Gold/Silver",
                "Harga Jasa Hot Stamp Foil",
                "Pricelist Film BOPP Thermal",
                "Jadwal Antar-Jemput Gratis",
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

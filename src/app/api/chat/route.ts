import { NextRequest, NextResponse } from "next/server";
import { getSmartAdvisorReply } from "@/lib/chatbotAdvisor";

interface HistoryMessage {
  sender?: string;
  text?: string;
}

/**
 * Mengonversi output teks dari LLM (Markdown) menjadi struktur HTML bersih
 * dengan dukungan:
 * - List tidak berurut (bullet points: * atau -) -> <ul class="..."><li>...</li></ul>
 * - List berurut (1. item) -> <ol class="..."><li>...</li></ol>
 * - Bold (**teks**) -> <strong>teks</strong>
 * - Italic (*teks*) -> <em>teks</em>
 * - Paragraf biasa -> <p class="...">...</p>
 */
function formatLlmResponseToHtml(raw: string): string {
  // Bersihkan block code markdown jika LLM membungkus outputnya
  let text = raw.replace(/```[a-z]*\n?/gi, "").trim();

  // Jika teks sudah berupa HTML lengkap dengan tag <p> atau <ul> atau <div>, jangan diubah berlebihan
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

    // Bold formatting: **text** atau __text__
    line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    line = line.replace(/__(.*?)__/g, "<strong>$1</strong>");

    // Italic formatting: *text* atau _text_ (pastikan tidak bentrok dengan sisa karakter)
    line = line.replace(/(^|[^*])\*(?!\s)([^*]+?)\*(?!\*)/g, "$1<em>$2</em>");
    line = line.replace(/(^|[^_])_(?!\s)([^_]+?)_(?!_)/g, "$1<em>$2</em>");

    // Check bullet list: * item atau - item atau • item
    if (/^[-*•]\s+/.test(line)) {
      if (inOl) {
        result.push("</ol>");
        inOl = false;
      }
      if (!inUl) {
        result.push('<ul class="my-2 space-y-1.5 pl-4 list-disc text-neutral-800">');
        inUl = true;
      }
      const itemContent = line.replace(/^[-*•]\s+/, "");
      result.push(`<li class="leading-relaxed">${itemContent}</li>`);
    }
    // Check numbered list: 1. item
    else if (/^\d+\.\s+/.test(line)) {
      if (inUl) {
        result.push("</ul>");
        inUl = false;
      }
      if (!inOl) {
        result.push('<ol class="my-2 space-y-1.5 pl-4 list-decimal text-neutral-800">');
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

      // Hindari membungkus ganda jika baris sudah diawali tag HTML block
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

    const groqApiKey = process.env.GROQ_API_KEY;
    const groqModel = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";
    const geminiApiKey = process.env.GEMINI_API_KEY;

    const systemPrompt = `Anda adalah "Pelangi Assistant", konsultan teknis finishing cetak & grosir bahan baku resmi dari CV Pelangi UV ("When Quality Be A Priority", berdiri sejak 2004).

DATA RESMI PERUSAHAAN & WORKSHOP (MUTLAK BERDASARKAN WEBSITE RESMI):
1. LOKASI PABRIK & WORKSHOP:
   Kompleks Pergudangan Bizpark Blok C17-C19, Jabon, Tambaksawah, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256 (akses strategis dekat Bandara Juanda & Tol Rungkut).
2. JAM OPERASIONAL:
   - Senin – Jumat: 07.30 – 15.30 WIB
   - Sabtu: 07.30 – 13.00 WIB
   - Minggu & Hari Libur Nasional: Tutup (produksi shift tetap berjalan untuk pesanan industri besar).
3. KONTAK RESMI:
   - WhatsApp Marketing/Konsultasi: 0822 3101 9363 (atau +62 822-3101-9363)
   - Telepon Kantor: (031) 866 7469 / (031) 867 7468
   - Email: info@pelangiuv.com

4. KATALOG LENGKAP 13 LAYANAN JASA FINISHING CETAK CV PELANGI UV:
   1. Hot Stamp Foil: Finishing kilap metalik presisi tinggi (Gold, Silver, Rose Gold, Hologram, Warna-Warni, Pigment Foil tahan gores). Kapasitas: 120.000+ lembar/hari.
   2. Spot UV: Lapisan vernis mengkilap kontras tinggi (Spot Gloss kilap tinggi 98 GU, Spot Doff/Matte, dan Tekstur Pasir taktil presisi mikron). Kapasitas: 150.000+ lembar/hari.
   3. Laminating Thermal & Wet: Pelapisan plastik BOPP bebas gelembung (Doff Halus, Glossy Bening, Velvet Soft-Touch anti-sidik jari). Kapasitas: 200.000+ lembar/hari.
   4. Laminating Window Mika Box: Perekatan jendela mika transparan food-grade presisi untuk dus kue, box makanan, & kemasan souvenir. Kapasitas: 90.000+ lembar/hari.
   5. Cast and Cure Holographic: Efek kilau pelangi prisma mikro modern ramah lingkungan tanpa film laminasi mika, sulit dipalsukan. Kapasitas: 80.000+ lembar/hari.
   6. Pond & Die-Cut Presisi: Potong bentuk die-cut otomatis pisau tajam dan garis rel tekukan presisi, bebas retak pada lipatan kemasan karton.
   7. Micro Emboss Keamanan & Tekstur: Tekstur timbul mikro sub-milimeter presisi tinggi sebagai fitur anti-pemalsuan (security feature) dan aksen eksklusif untuk kemasan rokok, farmasi, kosmetik, serta segel cukai. CV Pelangi UV BISA dan rutin mengerjakan Micro Emboss!
   8. Emboss & Deboss Timbul 3D: Efek timbul relief 3D fisik atau tenggelam presisi pada cover buku, kartu, dan box packaging eksklusif.
   9. Transfer Metalized Paper: Transfer partikel foil metalik pengganti kertas metalized import, ramah lingkungan dan hemat biaya.
   10. Transfer PET Film Prismatik: Proteksi maksimal anti-keausan dengan pantulan spektrum pelangi mewah.
   11. Cold Foil Inline Printing: Finishing foil inline berkecepatan tinggi dengan overprinting warna langsung di atas foil.
   12. Rewinding Foil Roll: Jasa penggulungan master roll foil ke core gulungan shaft spesifik mesin cetak offset/rotari.
   13. Potong Foil (Slitting): Pemotongan slitting lebar roll foil custom akurasi ±0.5 mm sesuai area klise cetak.

5. GROSIR BAHAN BAKU RESMI CV PELANGI UV:
   1. Film BOPP / Thermal Film: Varian Thermal Glossy & Doff (18 mic), Waterbase Glossy & Doff (12-15 mic), Velvet Soft-Touch (30 mic), Metalize PET. Corona Dyne ≥ 42 dynes/cm. FREE slitting potong belah roll jumbo ke lebar custom 200 mm - 1200 mm akurasi ±0.5 mm.
   2. Roll Hot Stamping Foil: Master roll impor aneka warna (Gold, Silver, Rose Gold, Hologram, Hitam, Putih BO1, Clear, Pigment). Panjang roll 120m s/d roll jumbo 3000m, daya rekat kuat tidak rontok.
   3. Lem Wet Waterbase & Dry Thermal: Lem laminasi food-grade daya rekat tinggi anti bau kimia menyengat, cepat kering (Kemasan pail 20kg & drum).
   4. Tinta & Varnish Spot UV LumineX: Varnish UV ultra gloss 98 GU dan matte anti yellowing tahan gores (Kemasan can 5kg & 20kg).

6. KEUNGGULAN OPERASIONAL & LOGISTIK:
   - 35+ unit mesin otomatis & semi-otomatis berkapasitas total hingga 200.000+ lembar/hari.
   - Antar-Jemput Plano Cetakan GRATIS se-Jawa Timur (Surabaya, Sidoarjo, Gresik, Mojokerto, Pasuruan, Malang) menggunakan armada truk boks tertutup mandiri.
   - MOQ fleksibel: melayani UMKM percetakan hingga partai industri besar (rokok, farmasi, biskuit).
   - Swatch Sample Kit fisik GRATIS dikirim ke alamat workshop/kantor rekanan.

PANDUAN GAYA BAHASA & KONSISTENSI MULTI-TURN (WAJIB DIIKUTI):
1. MEMORI NAMA & PERSONALISASI KONSISTEN:
   - Jika pengguna menyebut namanya (misalnya: "panggil aku daffa" atau "Daffa"), Anda WAJIB mengingatnya di seluruh giliran percakapan berikutnya.
   - Sapa selalu dengan hormat dan ramah: "Pak Daffa" atau "Daffa".
   - DILARANG KERAS menggunakan sapaan santai/alay seperti: "hai kak", "kakak", "halo kak", "oh iya kak". Gunakan nada profesional, solutif, dan ramah bisnis B2B.
2. MEMAHAMI KONTEKS SEBELUMNYA SECARA UTUH (MULTI-TURN MEMORY):
   - Jaga kesinambungan percakapan. Hubungkan jawaban Anda dengan topik yang baru saja dibahas (misal: jika sedang membahas kemasan rokok, lalu user menanyakan "bukannya micro emboss ya?", jawab langsung bahwa CV Pelangi UV BISA dan MENYEDIAKAN Micro Emboss khusus untuk kemasan rokok sebagai tekstur timbul mikro anti-pemalsuan dan pattern mewah).
3. STRUKTUR JAWABAN TERORGANISIR & RAPI:
   - Paragraf pertama langsung menjawab inti pertanyaan (to the point).
   - Gunakan bullet points ringkas (tanda * atau -) dengan judul tebal (**Judul:** Penjelasan) agar mudah dibaca dan terstruktur.
   - Berikan rekomendasi teknis yang jelas beserta solusinya.
4. TERTIB DATA & INTEGRITAS:
   - Jangan pernah mengatakan CV Pelangi UV tidak bisa atau tidak melayani Micro Emboss, Emboss/Deboss, atau layanan lain yang terdaftar di atas. CV Pelangi UV BISA dan ahlinya!`;

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

        // Sertakan hingga 10 pesan riwayat terakhir agar bot mengingat nama dan alur percakapan
        if (Array.isArray(conversationHistory)) {
          for (const msg of conversationHistory.slice(-10)) {
            if (!msg.text || !msg.text.trim()) continue;
            groqMessages.push({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text.trim(),
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
              max_tokens: 650,
            }),
          }
        );

        if (groqRes.ok) {
          const groqData = await groqRes.json();
          const generatedText: string | undefined =
            groqData.choices?.[0]?.message?.content;

          if (generatedText) {
            let cleanHtml = formatLlmResponseToHtml(generatedText);

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
          for (const msg of conversationHistory.slice(-10)) {
            if (!msg.text || !msg.text.trim()) continue;
            contents.push({
              role: msg.sender === "user" ? "user" : "model",
              parts: [{ text: msg.text.trim() }],
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
                maxOutputTokens: 650,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const generatedText: string | undefined =
            data.candidates?.[0]?.content?.parts?.[0]?.text;

          if (generatedText) {
            let cleanHtml = formatLlmResponseToHtml(generatedText);

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

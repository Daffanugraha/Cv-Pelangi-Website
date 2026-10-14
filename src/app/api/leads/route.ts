import { NextRequest, NextResponse } from "next/server";
import { addLead } from "@/lib/admin/db";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, phone, email, service, message } = body;

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: "Nama dan nomor WhatsApp wajib diisi." },
        { status: 400 }
      );
    }

    const lead = addLead({
      name: name.trim(),
      company: company?.trim() || "-",
      phone: phone.trim(),
      email: email?.trim() || "",
      service: service?.trim() || "Konsultasi Finishing",
      message: message?.trim() || "",
    });

    // Sinkronisasi langsung ke Supabase
    try {
      const sb = getSupabaseAdmin();
      if (sb) {
        sb.from("leads")
          .upsert({
            id: lead.id,
            name: lead.name,
            company: lead.company,
            phone: lead.phone,
            email: lead.email || null,
            service: lead.service,
            message: lead.message || null,
            status: lead.status || "new",
            created_at: lead.createdAt,
          })
          .then(({ error }: any) => {
            if (error) console.warn("[Supabase POST Lead Error]:", error.message);
          });
      }
    } catch (sbErr) {
      console.warn("[Supabase Connect Error]:", sbErr);
    }

    return NextResponse.json({ ok: true, data: lead }, { status: 201 });
  } catch (err) {
    console.error("Error creating lead:", err);
    return NextResponse.json(
      { error: "Gagal menyimpan pesan konsultasi." },
      { status: 500 }
    );
  }
}

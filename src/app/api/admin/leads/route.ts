import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { getLeads, addLead, updateLeadStatus, deleteLead, LeadItem } from "@/lib/admin/db";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function mapSupabaseLead(row: any): LeadItem {
  return {
    id: row.id,
    name: row.name || "",
    company: row.company || "",
    phone: row.phone || "",
    email: row.email || "",
    service: row.service || "",
    message: row.message || "",
    status: row.status || "new",
    createdAt: row.created_at || new Date().toISOString(),
  };
}

export async function GET() {
  if (!isAuthenticated()) return unauthorized();

  try {
    const sb = getSupabaseAdmin();
    if (sb) {
      const { data, error } = await sb
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        return NextResponse.json(data.map(mapSupabaseLead), {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        });
      }
    }
  } catch (err) {
    console.warn("[Supabase GET Leads Fallback]:", err);
  }

  return NextResponse.json(getLeads(), {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  const body = await req.json();
  const lead = addLead({
    name: body.name ?? "",
    company: body.company ?? "",
    phone: body.phone ?? "",
    email: body.email ?? "",
    service: body.service ?? "",
    message: body.message ?? "",
  });

  try {
    const sb = getSupabaseAdmin();
    if (sb) {
      await sb.from("leads").upsert({
        id: lead.id,
        name: lead.name,
        company: lead.company,
        phone: lead.phone,
        email: lead.email,
        service: lead.service,
        message: lead.message,
        status: lead.status,
        created_at: lead.createdAt,
      });
    }
  } catch (err) {
    console.warn("[Supabase POST Lead Error]:", err);
  }

  return NextResponse.json(lead, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  const { id, status } = await req.json();

  try {
    const sb = getSupabaseAdmin();
    if (sb) {
      await sb.from("leads").update({ status }).eq("id", id);
    }
  } catch (err) {
    console.warn("[Supabase PATCH Lead Error]:", err);
  }

  updateLeadStatus(id, status);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  const { id } = await req.json();

  try {
    const sb = getSupabaseAdmin();
    if (sb) {
      await sb.from("leads").delete().eq("id", id);
    }
  } catch (err) {
    console.warn("[Supabase DELETE Lead Error]:", err);
  }

  deleteLead(id);
  return NextResponse.json({ ok: true });
}

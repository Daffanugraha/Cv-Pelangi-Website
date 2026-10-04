import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { getLeads, addLead, updateLeadStatus, deleteLead } from "@/lib/admin/db";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  if (!isAuthenticated()) return unauthorized();
  return NextResponse.json(getLeads());
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
  return NextResponse.json(lead, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  const { id, status } = await req.json();
  updateLeadStatus(id, status);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();
  const { id } = await req.json();
  deleteLead(id);
  return NextResponse.json({ ok: true });
}

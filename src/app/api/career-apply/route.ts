import { NextRequest, NextResponse } from "next/server";
import { addApplicant } from "@/lib/admin/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      jobId,
      jobTitle,
      name,
      age,
      phone,
      referencePhone,
      email,
      address,
      education,
      educationMajor,
      hasExperience,
      experience,
      referenceRelation,
      strengths,
      weaknesses,
      cvUrl,
      fileName,
    } = body;

    if (!name?.trim() || !phone?.trim() || !jobTitle?.trim()) {
      return NextResponse.json(
        { error: "Nama, nomor telepon, dan posisi wajib diisi." },
        { status: 400 }
      );
    }

    const applicant = addApplicant({
      jobId: jobId || "",
      jobTitle: jobTitle.trim(),
      name: name.trim(),
      age: age ? String(age).trim() : "",
      phone: phone.trim(),
      referencePhone: referencePhone?.trim() || "",
      referenceRelation: referenceRelation?.trim() || "",
      email: email?.trim() || "",
      address: address?.trim() || "",
      education: education?.trim() || "",
      educationMajor: educationMajor?.trim() || "",
      hasExperience: hasExperience === "yes" ? "yes" : "no",
      experience: experience?.trim() || "",
      strengths: strengths?.trim() || "",
      weaknesses: weaknesses?.trim() || "",
      cvUrl: cvUrl?.trim() || "",
      fileName: fileName?.trim() || "",
    });

    return NextResponse.json({ ok: true, data: applicant }, { status: 201 });
  } catch (err) {
    console.error("Error saving applicant:", err);
    return NextResponse.json(
      { error: "Gagal menyimpan berkas lamaran." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { addApplicant } from "@/lib/admin/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      jobId,
      jobTitle,
      name,
      birthPlaceDate,
      maritalStatus,
      age,
      phone,
      email,
      address,
      education,
      educationMajor,
      hasExperience,

      // Referensi kantor sebelumnya
      reference1,
      reference2,
      referencePhone,
      referenceRelation,

      // Pengalaman kerja
      experience1,
      experience2,
      experience3,
      experience,

      // Komitmen kerja
      readyNoWorkNoPay,
      readyOvertime,
      expectedSalary,
      expectedFacilities,

      // Evaluasi diri
      threeWeaknesses,
      threeStrengths,
      fiveSkills,
      strengths,
      weaknesses,

      // Dokumen
      cvUrl,
      fileName,
    } = body;

    if (!name?.trim() || !phone?.trim() || !jobTitle?.trim()) {
      return NextResponse.json(
        { error: "Nama lengkap, nomor telepon/WhatsApp, dan posisi wajib diisi." },
        { status: 400 }
      );
    }

    const applicant = addApplicant({
      jobId: jobId || "",
      jobTitle: jobTitle.trim(),
      name: name.trim(),
      birthPlaceDate: birthPlaceDate?.trim() || "",
      maritalStatus: maritalStatus?.trim() || "Single",
      age: age ? String(age).trim() : "",
      phone: phone.trim(),
      email: email?.trim() || "",
      address: address?.trim() || "",
      education: education?.trim() || "",
      educationMajor: educationMajor?.trim() || "",
      hasExperience: hasExperience === "yes" ? "yes" : "no",

      // Referensi
      reference1: reference1?.trim() || "",
      reference2: reference2?.trim() || "",
      referencePhone: referencePhone?.trim() || "",
      referenceRelation: referenceRelation?.trim() || "",

      // Pengalaman
      experience1: experience1?.trim() || "",
      experience2: experience2?.trim() || "",
      experience3: experience3?.trim() || "",
      experience: experience?.trim() || "",

      // Komitmen
      readyNoWorkNoPay: readyNoWorkNoPay?.trim() || "Ya",
      readyOvertime: readyOvertime?.trim() || "Ya",
      expectedSalary: expectedSalary?.trim() || "",
      expectedFacilities: expectedFacilities?.trim() || "",

      // Evaluasi
      threeWeaknesses: threeWeaknesses?.trim() || "",
      threeStrengths: threeStrengths?.trim() || "",
      fiveSkills: fiveSkills?.trim() || "",
      strengths: strengths?.trim() || threeStrengths?.trim() || "",
      weaknesses: weaknesses?.trim() || threeWeaknesses?.trim() || "",

      // Berkas
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

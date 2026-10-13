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

      // Dokumen & Portofolio
      hasPortfolio,
      portfolioUrl,
      cvUrl,
      fileName,
    } = body;

    if (!name?.trim() || !phone?.trim() || !email?.trim() || !jobTitle?.trim()) {
      return NextResponse.json(
        { error: "Nama lengkap, nomor telepon, alamat email, dan posisi wajib diisi." },
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

      // Berkas & Portofolio
      hasPortfolio: hasPortfolio === "yes" ? "yes" : "no",
      portfolioUrl: portfolioUrl?.trim() || "",
      cvUrl: cvUrl?.trim() || "",
      fileName: fileName?.trim() || "",
    });

    // Sinkronkan langsung ke tabel Supabase (PostgreSQL Cloud)
    try {
      const { getSupabaseAdmin } = await import("@/lib/supabase/admin");
      const sb = getSupabaseAdmin();
      if (sb) {
        sb.from("job_applicants")
          .upsert({
            id: applicant.id,
            job_id: applicant.jobId || null,
            job_title: applicant.jobTitle,
            name: applicant.name,
            birth_place_date: applicant.birthPlaceDate || null,
            marital_status: applicant.maritalStatus || "Single",
            age: applicant.age ? String(applicant.age) : null,
            phone: applicant.phone,
            email: applicant.email || "-",
            address: applicant.address,
            education: applicant.education || null,
            education_major: applicant.educationMajor || null,
            has_experience: applicant.hasExperience || "yes",
            experience: applicant.experience || null,
            experience1: applicant.experience1 || null,
            experience2: applicant.experience2 || null,
            experience3: applicant.experience3 || null,
            reference1: applicant.reference1 || null,
            reference2: applicant.reference2 || null,
            reference_phone: applicant.referencePhone || null,
            reference_relation: applicant.referenceRelation || null,
            ready_no_work_no_pay: applicant.readyNoWorkNoPay || "Ya",
            ready_overtime: applicant.readyOvertime || "Ya",
            expected_salary: applicant.expectedSalary || null,
            expected_facilities: applicant.expectedFacilities || null,
            three_weaknesses: applicant.threeWeaknesses || null,
            three_strengths: applicant.threeStrengths || null,
            five_skills: applicant.fiveSkills || null,
            strengths: applicant.strengths || null,
            weaknesses: applicant.weaknesses || null,
            has_portfolio: applicant.hasPortfolio || "no",
            portfolio_url: applicant.portfolioUrl || null,
            cv_url: applicant.cvUrl || null,
            file_name: applicant.fileName || null,
            status: applicant.status,
            created_at: applicant.createdAt,
          })
          .then(({ error }: any) => {
            if (error) console.warn("[Supabase Sync Applicant Error]:", error.message);
          });
      }
    } catch (sbErr) {
      console.warn("[Supabase Import Error]:", sbErr);
    }

    return NextResponse.json({ ok: true, data: applicant }, { status: 201 });
  } catch (err) {
    console.error("Error saving applicant:", err);
    return NextResponse.json(
      { error: "Gagal menyimpan berkas lamaran." },
      { status: 500 }
    );
  }
}

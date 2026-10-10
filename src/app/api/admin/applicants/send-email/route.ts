import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) return unauthorized();

  try {
    const body = await req.json();
    const { to, subject, text, appPassword } = body;

    if (!to || !text) {
      return NextResponse.json(
        { error: "Email tujuan dan isi pesan wajib diisi." },
        { status: 400 }
      );
    }

    const senderEmail = process.env.GMAIL_USER || "maharbasuki@gmail.com";
    const password = (appPassword || process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || "").replace(/\s+/g, "");

    if (!password) {
      return NextResponse.json(
        {
          ok: false,
          needAppPassword: true,
          error:
            "Sandi Aplikasi (App Password) Gmail 16-karakter belum diisi. Google mewajibkan Sandi Aplikasi untuk mengirim email langsung dari akun maharbasuki@gmail.com.",
        },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: senderEmail,
        pass: password,
      },
    });

    await transporter.sendMail({
      from: `"HRD CV Pelangi UV" <${senderEmail}>`,
      to: to.trim(),
      subject: subject || "Undangan Interview - CV Pelangi UV",
      text: text.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
          <div style="border-bottom: 2px solid #F65456; padding-bottom: 14px; margin-bottom: 20px;">
            <h2 style="color: #111827; margin: 0; font-size: 20px; font-weight: 800;">CV PELANGI UV</h2>
            <p style="color: #6b7280; font-size: 12px; margin: 4px 0 0;">Spesialis Finishing Percetakan &bull; Undangan Interview Resmi</p>
          </div>
          <div style="white-space: pre-line; font-size: 14px; color: #1f2937; line-height: 1.7;">
${text}
          </div>
          <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 28px 0 16px;" />
          <p style="font-size: 11px; color: #9ca3af; margin: 0; text-align: center;">
            Email ini dikirim oleh Tim Rekrutmen CV Pelangi UV (<a href="mailto:${senderEmail}" style="color: #F65456; text-decoration: none;">${senderEmail}</a>)
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      ok: true,
      message: `Email berhasil dikirim ke ${to} dari ${senderEmail}`,
    });
  } catch (err: any) {
    console.error("Gagal mengirim email via Nodemailer:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          err.message ||
          "Gagal mengirim email. Pastikan Sandi Aplikasi Gmail 16 karakter sudah benar.",
      },
      { status: 500 }
    );
  }
}

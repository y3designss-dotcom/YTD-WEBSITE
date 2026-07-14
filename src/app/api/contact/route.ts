import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "y3designss@gmail.com";
const FROM_EMAIL = "YTRE DEZEEN Enquiries <enquiries@ytredezeen.com>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, projectType, message } = await req.json();

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeProjectType = escapeHtml(
      typeof projectType === "string" && projectType.trim() ? projectType.trim() : "Not specified"
    );
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br />");

    const notifyHtml = `
      <div style="font-family: Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #111;">
        <h2 style="letter-spacing: 0.05em; text-transform: uppercase; font-size: 16px; border-bottom: 1px solid #eee; padding-bottom: 12px;">New Website Inquiry</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
          <tr><td style="padding: 6px 0; color: #888; width: 140px;">Name</td><td style="padding: 6px 0;">${safeName}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Email</td><td style="padding: 6px 0;">${safeEmail}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Project Type</td><td style="padding: 6px 0;">${safeProjectType}</td></tr>
        </table>
        <div style="margin-top: 20px;">
          <p style="color: #888; font-size: 13px; margin-bottom: 6px;">Message</p>
          <p style="font-size: 14px; line-height: 1.6;">${safeMessage}</p>
        </div>
      </div>
    `;

    const confirmationHtml = `
      <div style="font-family: Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #111;">
        <h2 style="letter-spacing: 0.05em; text-transform: uppercase; font-size: 16px;">Thank You, ${safeName}</h2>
        <p style="font-size: 14px; line-height: 1.6;">
          We've received your inquiry and will get back to you shortly.
        </p>
        <div style="margin-top: 20px; padding: 16px; background: #f7f7f7; border-radius: 4px;">
          <p style="color: #888; font-size: 13px; margin-bottom: 6px;">Your Message</p>
          <p style="font-size: 14px; line-height: 1.6;">${safeMessage}</p>
        </div>
        <p style="font-size: 13px; color: #888; margin-top: 24px;">— YTRE DEZEEN</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New Inquiry from ${name}`,
      html: notifyHtml,
      text: `Name: ${name}\nEmail: ${email}\nProject Type: ${safeProjectType}\n\nMessage:\n${message}`,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }

    resend.emails
      .send({
        from: FROM_EMAIL,
        to: email,
        subject: "We've received your inquiry — YTRE DEZEEN",
        html: confirmationHtml,
        text: `Thank you, ${name}. We've received your inquiry and will get back to you shortly.`,
      })
      .catch(() => {});

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send enquiry." },
      { status: 500 }
    );
  }
}

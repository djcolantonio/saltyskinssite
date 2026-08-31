import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "ssyogaretreats@gmail.com";
const FROM_EMAIL = "Salty Skins Website <notifications@ssyogaretreats.com>";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidEmail) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 }
    );
  }

  console.log("New newsletter signup:", {
    email,
    receivedAt: new Date().toISOString(),
  });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[Resend] Not configured yet — email not sent, signup logged above only.");
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: "New newsletter signup",
      text: `New subscriber: ${email}`,
    });
  } catch (err) {
    // Don't fail the request just because the notification email failed —
    // the signup is already logged above so nothing is lost.
    console.error("[Resend] Failed to send subscribe notification:", err);
  }

  return NextResponse.json({ ok: true });
}

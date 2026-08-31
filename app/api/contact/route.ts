import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "ssyogaretreats@gmail.com";
const FROM_EMAIL = "Salty Skins Website <notifications@ssyogaretreats.com>";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || !body.name || !body.email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  console.log("New contact form submission:", {
    name: body.name,
    email: body.email,
    message: body.message,
    receivedAt: new Date().toISOString(),
  });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[Resend] Not configured yet — email not sent, submission logged above only.");
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: body.email,
      subject: `New contact form message from ${body.name}`,
      text: [
        `Name: ${body.name}`,
        `Email: ${body.email}`,
        "",
        "Message:",
        body.message || "(no message provided)",
      ].join("\n"),
    });
  } catch (err) {
    // Don't fail the request just because the notification email failed —
    // the submission is already logged above so nothing is lost.
    console.error("[Resend] Failed to send contact notification:", err);
  }

  return NextResponse.json({ ok: true });
}

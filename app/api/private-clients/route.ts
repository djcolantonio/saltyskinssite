import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getCrmSupabase } from "@/lib/crmSupabase";

const TO_EMAIL = "ssyogaretreats@gmail.com";
const FROM_EMAIL = "Salty Skins Website <notifications@ssyogaretreats.com>";

const REQUIRED_FIELDS = ["name", "email", "phone", "preferredDate", "preferredTime"];

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const missing = REQUIRED_FIELDS.filter((field) => !body[field]);
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  console.log("New private client booking request:", {
    name: body.name,
    email: body.email,
    preferredDate: body.preferredDate,
    preferredTime: body.preferredTime,
    receivedAt: new Date().toISOString(),
  });

  // Save into the CRM as a booking request — independent of the email
  // notification below, so one failing doesn't block the other.
  const crm = getCrmSupabase();
  if (crm) {
    const { error } = await crm.from("ssr_private_bookings").insert({
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      preferred_date: body.preferredDate,
      preferred_time: body.preferredTime,
      message: body.message || null,
    });
    if (error) console.error("[CRM] Failed to save private booking request:", error);
  } else {
    console.log("[CRM] Not configured yet — booking request not saved to CRM.");
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[Resend] Not configured yet — email not sent, request logged above only.");
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: body.email,
      subject: `New private class request from ${body.name}`,
      text: [
        `Name: ${body.name}`,
        `Email: ${body.email}`,
        body.phone ? `Phone: ${body.phone}` : "Phone: (not provided)",
        `Preferred date: ${body.preferredDate}`,
        `Preferred time: ${body.preferredTime}`,
        body.message ? `\nNotes:\n${body.message}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch (err) {
    // Don't fail the request just because the notification email failed —
    // the request is already logged and saved to the CRM above.
    console.error("[Resend] Failed to send private booking notification:", err);
  }

  return NextResponse.json({ ok: true });
}

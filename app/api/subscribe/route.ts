import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getCrmSupabase } from "@/lib/crmSupabase";

const TO_EMAIL = "ssyogaretreats@gmail.com";
const FROM_EMAIL = "Salty Skins Website <notifications@ssyogaretreats.com>";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidEmail) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 }
    );
  }

  console.log("New newsletter signup:", {
    email,
    name: name || undefined,
    receivedAt: new Date().toISOString(),
  });

  // Save into the CRM as a subscriber — independent of the email
  // notification below, so one failing doesn't block the other.
  const crm = getCrmSupabase();
  if (crm) {
    // Upsert (not plain insert) so someone who already subscribed with just
    // an email and later signs up again with their name gets it added,
    // rather than silently no-op'ing on the duplicate-email conflict.
    const { error } = await crm
      .from("ssr_subscribers")
      .upsert({ email, name: name || null }, { onConflict: "email", ignoreDuplicates: false });
    if (error) {
      console.error("[CRM] Failed to save subscriber:", error);
    }
  } else {
    console.log("[CRM] Not configured yet — subscriber not saved to CRM.");
  }

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
    // the signup is already logged and saved to the CRM above.
    console.error("[Resend] Failed to send subscribe notification:", err);
  }

  return NextResponse.json({ ok: true });
}

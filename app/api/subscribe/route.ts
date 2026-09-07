import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getCrmSupabase } from "@/lib/crmSupabase";
import {
  escapeHtml,
  paragraph,
  privateSessionCta,
  renderConfirmationEmail,
  upstateRetreatCta,
} from "@/lib/emailTemplate";

const TO_EMAIL = "ssyogaretreats@gmail.com";
const FROM_EMAIL = "Salty Skins Website <notifications@saltyskinsyoga.com>";

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
  if (!name) {
    return NextResponse.json(
      { error: "Your name is required." },
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

  const resend = new Resend(apiKey);

  try {
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

  try {
    const safeName = escapeHtml(name || "there");
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: TO_EMAIL,
      subject: "You're on the list!",
      html: renderConfirmationEmail({
        heading: "You're on the list!",
        bodyHtml: [
          paragraph(`Hi ${safeName},`),
          paragraph(
            "Thanks for subscribing to Salty Skins. You'll be the first to know about upcoming retreats, new dates, and anything else worth sharing."
          ),
        ].join(""),
        ctas: [upstateRetreatCta(), privateSessionCta()],
        closingQuestion: "What are you working on in your yoga and fitness journey?",
      }),
      text: [
        `Hi ${name || "there"},`,
        "",
        "Thanks for subscribing to Salty Skins. You'll be the first to know about upcoming retreats, new dates, and anything else worth sharing.",
        "",
        "See the Upstate Retreat: https://saltyskinsyoga.com/upstate-retreat",
        "Book a private session with Marci: https://saltyskinsyoga.com/private-clients",
        "Follow along: instagram.com/saltyskinsretreats or instagram.com/marci_ville",
        "",
        "What are you working on in your yoga and fitness journey?",
        "",
        "Talk soon,",
        "Salty Skins",
      ].join("\n"),
    });
  } catch (err) {
    // Confirmation email is a nice-to-have — never fail the signup over it.
    console.error("[Resend] Failed to send subscriber confirmation:", err);
  }

  return NextResponse.json({ ok: true });
}

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

  // Save into the CRM as a lead — independent of the email notification
  // below, so one failing doesn't block the other.
  const crm = getCrmSupabase();
  if (crm) {
    const { error } = await crm.from("ssr_leads").insert({
      name: body.name,
      email: body.email,
      message: body.message || null,
    });
    if (error) console.error("[CRM] Failed to save lead:", error);
  } else {
    console.log("[CRM] Not configured yet — lead not saved to CRM.");
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[Resend] Not configured yet — email not sent, submission logged above only.");
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);

  try {
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
    // the submission is already logged and saved to the CRM above.
    console.error("[Resend] Failed to send contact notification:", err);
  }

  try {
    const safeName = escapeHtml(body.name);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: body.email,
      replyTo: TO_EMAIL,
      subject: "We got your message",
      html: renderConfirmationEmail({
        heading: "We got your message",
        bodyHtml: [
          paragraph(`Hi ${safeName},`),
          paragraph(
            "Thanks for reaching out to Salty Skins. We got your message and will get back to you within a day or two."
          ),
        ].join(""),
        ctas: [upstateRetreatCta(), privateSessionCta()],
        closingQuestion: "What are you working on in your yoga and fitness journey?",
      }),
      text: [
        `Hi ${body.name},`,
        "",
        "Thanks for reaching out to Salty Skins. We got your message and will get back to you within a day or two.",
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
    // Confirmation email is a nice-to-have — never fail the submission over it.
    console.error("[Resend] Failed to send contact confirmation:", err);
  }

  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { Resend } from "resend";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { portableTextToEmailHtml } from "@/lib/portableTextToEmailHtml";
import { signEmail } from "@/lib/emailAuth";

const FROM_EMAIL = "Salty Skins Retreats <notifications@ssyogaretreats.com>";
const REPLY_TO = "ssyogaretreats@gmail.com";

type SendRequestBody = {
  key?: string;
  postId?: string;
  emails?: string[];
};

export async function POST(req: NextRequest) {
  const expectedKey = process.env.NEXT_PUBLIC_BLOG_EMAIL_ADMIN_KEY;
  const sanityToken = process.env.SANITY_API_TOKEN;
  const resendKey = process.env.RESEND_API_KEY;

  if (!expectedKey) {
    return NextResponse.json({ error: "Not configured." }, { status: 503 });
  }
  if (!sanityToken || !projectId) {
    return NextResponse.json({ error: "Sanity is not fully configured." }, { status: 503 });
  }
  if (!resendKey) {
    return NextResponse.json({ error: "RESEND_API_KEY is not set." }, { status: 503 });
  }

  const body: SendRequestBody = await req.json().catch(() => ({}));
  if (body.key !== expectedKey) {
    return NextResponse.json({ error: "Invalid or missing key." }, { status: 401 });
  }

  const postId = body.postId;
  const recipients = Array.isArray(body.emails)
    ? Array.from(new Set(body.emails.map((e) => e.trim().toLowerCase()).filter(Boolean)))
    : [];

  if (!postId) {
    return NextResponse.json({ error: "postId is required." }, { status: 400 });
  }
  if (recipients.length === 0) {
    return NextResponse.json({ error: "No recipients selected." }, { status: 400 });
  }

  const sanity = createClient({
    projectId,
    dataset,
    apiVersion,
    token: sanityToken,
    useCdn: false,
  });

  const post = await sanity.fetch(
    `*[_type == "post" && _id == $postId][0]{ title, "slug": slug.current, excerpt, body }`,
    { postId }
  );

  if (!post) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  const origin = req.headers.get("origin") || "https://ssyogaretreats.com";
  const postUrl = `${origin}/blog/${post.slug}`;
  const bodyHtml = portableTextToEmailHtml(post.body);

  const resend = new Resend(resendKey);
  const results: { email: string; status: string; error?: string }[] = [];

  for (const email of recipients) {
    const sig = signEmail(email);
    const unsubscribeUrl = sig
      ? `${origin}/api/unsubscribe?email=${encodeURIComponent(email)}&sig=${sig}`
      : null;

    const html = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <p style="text-transform:uppercase; letter-spacing:2px; font-size:11px; color:#999; text-align:center;">Salty Skins Blog</p>
        <h1 style="text-align:center; font-weight:400; font-size:28px; margin:8px 0 24px;">${post.title}</h1>
        ${post.excerpt ? `<p style="color:#555; font-style:italic; margin-bottom:24px;">${post.excerpt}</p>` : ""}
        ${bodyHtml}
        <p style="margin-top:32px; text-align:center;">
          <a href="${postUrl}" style="color:#b08d57;">Read the full post on our site &rarr;</a>
        </p>
        <hr style="margin:40px 0; border:none; border-top:1px solid #eee;" />
        <p style="font-size:12px; color:#999; text-align:center;">
          You're receiving this because you signed up for updates from Salty Skins Retreats.
          ${unsubscribeUrl ? `<br /><a href="${unsubscribeUrl}" style="color:#999;">Unsubscribe</a>` : ""}
        </p>
      </div>
    `;

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        replyTo: REPLY_TO,
        subject: post.title,
        html,
      });
      results.push({ email, status: "ok" });
    } catch (err) {
      console.error("[send-post-email] Failed to send to", email, err);
      results.push({
        email,
        status: "error",
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  const anySucceeded = results.some((r) => r.status === "ok");
  if (anySucceeded) {
    try {
      await sanity.patch(postId).set({ emailSentAt: new Date().toISOString() }).commit();
    } catch (err) {
      console.error("[send-post-email] Failed to set emailSentAt:", err);
    }
  }

  return NextResponse.json({ done: true, results });
}

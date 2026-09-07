// Shared HTML shell for the confirmation emails sent from the subscribe,
// contact, and private-clients API routes. Keeping this in one place means
// all three emails stay visually consistent and only the copy/CTAs differ.

const SITE_URL = "https://saltyskinsyoga.com";

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type EmailCta = { label: string; href: string };

// A single body paragraph, styled consistently. Pass raw HTML (already
// escaped by the caller where it includes user-submitted values).
export function paragraph(html: string): string {
  return `<p style="margin:0 0 16px; font-family:Georgia,'Times New Roman',serif; font-size:16px; line-height:1.6; color:#26302B;">${html}</p>`;
}

export function upstateRetreatCta(): EmailCta {
  return { label: "See the Upstate Retreat", href: `${SITE_URL}/upstate-retreat` };
}

export function privateSessionCta(): EmailCta {
  return { label: "Book a Private Session with Marci", href: `${SITE_URL}/private-clients` };
}

export function renderConfirmationEmail({
  heading,
  bodyHtml,
  ctas,
  closingQuestion,
}: {
  heading: string;
  bodyHtml: string;
  ctas: EmailCta[];
  closingQuestion: string;
}): string {
  const ctasHtml = ctas
    .map(
      (c) => `
              <tr>
                <td style="padding:0 0 12px;">
                  <a href="${c.href}" style="display:block; box-sizing:border-box; padding:14px 20px; background-color:#26302B; color:#F6F4EE; text-decoration:none; font-family:Helvetica,Arial,sans-serif; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; text-align:center; border-radius:2px;">${c.label}</a>
                </td>
              </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin:0; padding:0; background-color:#F6F4EE;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F6F4EE;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px; background-color:#ffffff; border:1px solid #EFE3D0; border-top:4px solid #C9A876;">
            <tr>
              <td style="padding:40px 36px 8px; text-align:center;">
                <p style="margin:0 0 10px; font-family:Helvetica,Arial,sans-serif; font-size:11px; letter-spacing:3px; text-transform:uppercase; color:#B58F5C;">Salty Skins</p>
                <h1 style="margin:0 0 20px; font-family:Georgia,'Times New Roman',serif; font-weight:400; font-size:28px; color:#26302B;">${heading}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:0 36px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:8px 36px 4px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${ctasHtml}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 36px 4px;">
                <hr style="border:none; border-top:1px solid #EFE3D0; margin:0;" />
              </td>
            </tr>
            <tr>
              <td style="padding:16px 36px 32px; text-align:center;">
                <p style="margin:0 0 20px; font-family:Georgia,'Times New Roman',serif; font-style:italic; font-size:16px; color:#26302B; line-height:1.5;">${closingQuestion}</p>
                <p style="margin:0 0 8px; font-family:Helvetica,Arial,sans-serif; font-size:10px; letter-spacing:2px; text-transform:uppercase; color:#9a9184;">Follow along</p>
                <p style="margin:0; font-family:Helvetica,Arial,sans-serif; font-size:14px;">
                  <a href="https://instagram.com/saltyskinsretreats" style="color:#B58F5C; text-decoration:none;">@saltyskinsretreats</a>
                  &nbsp;&middot;&nbsp;
                  <a href="https://instagram.com/marci_ville" style="color:#B58F5C; text-decoration:none;">@marci_ville</a>
                </p>
              </td>
            </tr>
          </table>
          <p style="margin:20px 0 0; font-family:Helvetica,Arial,sans-serif; font-size:11px; color:#9a9184;">Salty Skins &middot; saltyskinsyoga.com</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

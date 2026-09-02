import { createHmac, timingSafeEqual } from "crypto";

// Signs an email address so unsubscribe links can't be forged to remove
// someone else's address, without needing a database column per-subscriber.
function normalize(email: string) {
  return email.trim().toLowerCase();
}

export function signEmail(email: string): string | null {
  const secret = process.env.EMAIL_UNSUB_SECRET;
  if (!secret) return null;
  return createHmac("sha256", secret).update(normalize(email)).digest("hex");
}

export function verifyEmailSignature(email: string, signature: string): boolean {
  const expected = signEmail(email);
  if (!expected) return false;
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(signature, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

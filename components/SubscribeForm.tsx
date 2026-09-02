"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = data.get("email");
    const name = data.get("name");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="mx-auto mt-8 max-w-md text-sm text-white/90">
        You&rsquo;re on the list — thanks for subscribing!
      </p>
    );
  }

  return (
    <div className="mx-auto mt-8 max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            name="name"
            placeholder="Your name (optional)"
            className="flex-1 border border-white/30 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/60 outline-none"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Your email address..."
            className="flex-1 border border-white/30 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/60 outline-none"
          />
        </div>
        <button type="submit" className="btn-solid" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Subscribe"}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-sm text-sand">
          Something went wrong — please try again.
        </p>
      )}
    </div>
  );
}

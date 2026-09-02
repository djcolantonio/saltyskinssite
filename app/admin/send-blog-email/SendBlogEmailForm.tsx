"use client";

import { useEffect, useMemo, useState } from "react";

type PostOption = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  emailSentAt?: string;
};

type SendResult = { email: string; status: string; error?: string };

export default function SendBlogEmailForm({
  posts,
  adminKey,
}: {
  posts: PostOption[];
  adminKey: string;
}) {
  const [selectedPostId, setSelectedPostId] = useState(posts[0]?._id || "");
  const [subscribers, setSubscribers] = useState<string[] | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loadError, setLoadError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [results, setResults] = useState<SendResult[] | null>(null);
  const [confirmResend, setConfirmResend] = useState(false);

  const selectedPost = useMemo(
    () => posts.find((p) => p._id === selectedPostId) || null,
    [posts, selectedPostId]
  );

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/admin/subscribers?key=${encodeURIComponent(adminKey)}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.error) {
          setLoadError(data.error);
          return;
        }
        const emails: string[] = data.emails || [];
        setSubscribers(emails);
        setSelected(new Set(emails)); // default: everyone selected
      })
      .catch(() => {
        if (!cancelled) setLoadError("Failed to load subscriber list.");
      });
    return () => {
      cancelled = true;
    };
  }, [adminKey]);

  function toggleOne(email: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(email)) next.delete(email);
      else next.add(email);
      return next;
    });
  }

  function toggleAll() {
    if (!subscribers) return;
    setSelected((prev) => (prev.size === subscribers.length ? new Set() : new Set(subscribers)));
  }

  async function handleSend() {
    if (!selectedPost || selected.size === 0) return;

    if (selectedPost.emailSentAt && !confirmResend) {
      setConfirmResend(true);
      return;
    }

    setSending(true);
    setResults(null);
    try {
      const res = await fetch("/api/admin/send-post-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: adminKey,
          postId: selectedPost._id,
          emails: Array.from(selected),
        }),
      });
      const data = await res.json();
      if (data.error) {
        setResults([{ email: "", status: "error", error: data.error }]);
      } else {
        setResults(data.results || []);
      }
    } catch (err) {
      setResults([{ email: "", status: "error", error: "Request failed." }]);
    } finally {
      setSending(false);
      setConfirmResend(false);
    }
  }

  if (posts.length === 0) {
    return <p className="text-ink/60">No published posts yet.</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <label className="label-caps block">Post</label>
        <select
          className="mt-2 w-full border border-black/15 bg-white px-3 py-2"
          value={selectedPostId}
          onChange={(e) => {
            setSelectedPostId(e.target.value);
            setResults(null);
            setConfirmResend(false);
          }}
        >
          {posts.map((post) => (
            <option key={post._id} value={post._id}>
              {post.title} {post.emailSentAt ? "— already sent" : ""}
            </option>
          ))}
        </select>
        {selectedPost?.emailSentAt && (
          <p className="mt-2 text-xs text-ink/50">
            Already emailed on{" "}
            {new Date(selectedPost.emailSentAt).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
            .
          </p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="label-caps block">Recipients</label>
          {subscribers && subscribers.length > 0 && (
            <button
              type="button"
              onClick={toggleAll}
              className="text-xs uppercase tracking-widest2 text-sand hover:underline"
            >
              {selected.size === subscribers.length ? "Deselect all" : "Select all"}
            </button>
          )}
        </div>

        {loadError && <p className="mt-2 text-sm text-red-600">{loadError}</p>}
        {!loadError && subscribers === null && (
          <p className="mt-2 text-sm text-ink/50">Loading subscribers…</p>
        )}
        {!loadError && subscribers && subscribers.length === 0 && (
          <p className="mt-2 text-sm text-ink/50">No subscribers yet.</p>
        )}
        {!loadError && subscribers && subscribers.length > 0 && (
          <div className="mt-3 max-h-64 overflow-y-auto border border-black/10 p-3">
            {subscribers.map((email) => (
              <label key={email} className="flex items-center gap-2 py-1 text-sm">
                <input
                  type="checkbox"
                  checked={selected.has(email)}
                  onChange={() => toggleOne(email)}
                />
                {email}
              </label>
            ))}
          </div>
        )}
        <p className="mt-2 text-xs text-ink/50">
          {selected.size} of {subscribers?.length ?? 0} selected
        </p>
      </div>

      {confirmResend && (
        <p className="text-sm text-amber-700">
          This post was already emailed before. Click Send again to confirm you want to re-send it
          to the selected recipients.
        </p>
      )}

      <button
        type="button"
        onClick={handleSend}
        disabled={sending || !selectedPost || selected.size === 0}
        className="btn-outline disabled:opacity-40"
      >
        {sending ? "Sending…" : confirmResend ? "Confirm Send" : "Send"}
      </button>

      {results && (
        <div className="border border-black/10 p-4 text-sm">
          <p className="font-medium">Results:</p>
          <ul className="mt-2 space-y-1">
            {results.map((r, i) => (
              <li key={i} className={r.status === "ok" ? "text-green-700" : "text-red-600"}>
                {r.email || "Request"}: {r.status}
                {r.error ? ` — ${r.error}` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

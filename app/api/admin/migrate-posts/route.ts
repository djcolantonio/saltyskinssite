import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import postsData from "./posts-data.json";

// One-time migration route: imports the old WordPress blog posts into Sanity.
// Protected by a secret query param so it can't be triggered by anyone else.
// Safe to run more than once — each post gets a deterministic _id derived
// from its slug, so re-running just no-ops on posts that already exist.
//
// Visit: /api/admin/migrate-posts?secret=YOUR_MIGRATE_SECRET
//
// Delete this whole folder once the migration has run successfully.

type MigratedPost = {
  title: string;
  slug: string;
  publishedAt: string;
  body: unknown[];
};

const posts = postsData as MigratedPost[];

export async function GET(req: NextRequest) {
  const expectedSecret = process.env.MIGRATE_SECRET;
  const token = process.env.SANITY_API_TOKEN;

  if (!expectedSecret) {
    return NextResponse.json(
      { error: "MIGRATE_SECRET is not set in the environment." },
      { status: 503 }
    );
  }
  if (!token) {
    return NextResponse.json(
      { error: "SANITY_API_TOKEN is not set in the environment." },
      { status: 503 }
    );
  }
  if (!projectId) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_SANITY_PROJECT_ID is not set in the environment." },
      { status: 503 }
    );
  }

  const providedSecret = req.nextUrl.searchParams.get("secret");
  if (providedSecret !== expectedSecret) {
    return NextResponse.json({ error: "Invalid or missing secret." }, { status: 401 });
  }

  const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

  const results: { slug: string; status: string; id?: string; error?: string }[] = [];

  for (const post of posts) {
    const id = `migrated-post-${post.slug}`;
    try {
      const created = await client.createIfNotExists({
        _id: id,
        _type: "post",
        title: post.title,
        slug: { _type: "slug", current: post.slug },
        publishedAt: post.publishedAt,
        body: post.body,
      });
      results.push({ slug: post.slug, status: "ok", id: created._id });
    } catch (err) {
      results.push({
        slug: post.slug,
        status: "error",
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return NextResponse.json({ done: true, results });
}

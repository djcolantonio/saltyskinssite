import { client } from "@/sanity/lib/client";
import SendBlogEmailForm from "./SendBlogEmailForm";

export const dynamic = "force-dynamic";

type PostOption = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  emailSentAt?: string;
};

async function getPosts(): Promise<PostOption[]> {
  try {
    return await client.fetch(
      `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
        _id, title, "slug": slug.current, publishedAt, emailSentAt
      }`
    );
  } catch (err) {
    console.error("[send-blog-email] Failed to load posts:", err);
    return [];
  }
}

export default async function SendBlogEmailPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const key = typeof searchParams.key === "string" ? searchParams.key : "";
  const expectedKey = process.env.BLOG_EMAIL_ADMIN_KEY;

  if (!expectedKey || key !== expectedKey) {
    return (
      <div className="mx-auto max-w-lg px-6 py-32 text-center">
        <p className="text-ink/60">Not authorized.</p>
      </div>
    );
  }

  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="label-caps">Salty Skins Admin</p>
      <h1 className="mt-2 font-serif text-3xl font-light">Send Blog Post Email</h1>
      <p className="mt-3 text-sm text-ink/60">
        Pick a published post and choose who on your subscriber list should get it.
      </p>
      <div className="mt-10">
        <SendBlogEmailForm posts={posts} adminKey={key} />
      </div>
    </div>
  );
}

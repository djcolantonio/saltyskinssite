import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 60;

type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: any;
  publishedAt: string;
};

async function getPosts(): Promise<PostSummary[]> {
  try {
    return await client.fetch(
      `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        coverImage,
        publishedAt
      }`
    );
  } catch (err) {
    console.error("[Sanity] Failed to fetch posts:", err);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <p className="label-caps text-center">Salty Skins Blog</p>
      <h1 className="mt-4 text-center font-serif text-4xl font-light md:text-5xl">
        Stories &amp; Updates
      </h1>

      {posts.length === 0 ? (
        <p className="mt-14 text-center text-ink/60">
          No posts yet — check back soon.
        </p>
      ) : (
        <div className="mt-14 space-y-14">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="block border-b border-black/10 pb-12 last:border-0"
            >
              {post.coverImage && (
                <div className="relative mb-5 aspect-[16/9] w-full overflow-hidden bg-sandLight">
                  <Image
                    src={urlForImage(post.coverImage).width(1200).height(675).url()}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                  />
                </div>
              )}
              <p className="text-xs uppercase tracking-widest2 text-ink/50">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h2 className="mt-2 font-serif text-2xl">{post.title}</h2>
              {post.excerpt && <p className="mt-3 text-ink/70">{post.excerpt}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

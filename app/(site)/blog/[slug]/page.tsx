import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 60;

type Post = {
  title: string;
  publishedAt: string;
  coverImage?: any;
  body: any;
};

async function getPost(slug: string): Promise<Post | null> {
  try {
    return await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{
        title,
        publishedAt,
        coverImage,
        body
      }`,
      { slug }
    );
  } catch (err) {
    console.error("[Sanity] Failed to fetch post:", err);
    return null;
  }
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-10 font-serif text-2xl">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 font-serif text-xl">{children}</h3>,
    normal: ({ children }) => <p className="mt-5 leading-relaxed text-ink/80">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-sand pl-4 italic text-ink/70">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="underline hover:text-sand"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <div className="relative my-8 aspect-[16/9] w-full overflow-hidden bg-sandLight">
        <Image
          src={urlForImage(value).width(1200).url()}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>
    ),
  },
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 py-24">
      <p className="label-caps text-center">Salty Skins Blog</p>
      <h1 className="mt-4 text-center font-serif text-4xl font-light md:text-5xl">
        {post.title}
      </h1>
      <p className="mt-4 text-center text-xs uppercase tracking-widest2 text-ink/50">
        {new Date(post.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {post.coverImage && (
        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden bg-sandLight">
          <Image
            src={urlForImage(post.coverImage).width(1600).height(900).url()}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-10">
        <PortableText value={post.body} components={portableTextComponents} />
      </div>
    </article>
  );
}

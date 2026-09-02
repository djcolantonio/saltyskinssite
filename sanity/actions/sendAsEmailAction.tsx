import type { DocumentActionComponent, DocumentActionProps } from "sanity";

// Adds a "Send as Email" button to the Studio action bar for blog posts,
// next to Publish/Duplicate/Delete. Rather than reimplementing the
// subscriber picker inside Studio's own plugin system, this just jumps to
// the send-blog-email admin page on the site itself with this post already
// selected — one click from the editor instead of a separate bookmark.
export const sendAsEmailAction: DocumentActionComponent = (
  props: DocumentActionProps
) => {
  const doc = (props.published ?? props.draft) as
    | { slug?: { current?: string } }
    | null;
  const slug = doc?.slug?.current;

  return {
    label: "Send as Email",
    icon: () => "✉️",
    disabled: !slug,
    title: slug ? undefined : "Publish this post first so it has a page to link to.",
    onHandle: () => {
      const key = process.env.NEXT_PUBLIC_BLOG_EMAIL_ADMIN_KEY || "";
      const url = `/admin/send-blog-email?key=${encodeURIComponent(key)}&post=${encodeURIComponent(
        slug || ""
      )}`;
      window.open(url, "_blank", "noopener,noreferrer");
      props.onComplete();
    },
  };
};

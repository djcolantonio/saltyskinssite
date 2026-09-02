import { urlForImage } from "@/sanity/lib/image";

// Minimal, dependency-free Portable Text -> HTML renderer for outgoing
// emails. Email clients need plain inline-friendly HTML (no React, no
// external stylesheets), so this intentionally doesn't reuse the
// PortableTextComponents used on the website — it covers the same set of
// marks/styles our blog schema actually produces (bold/italic/links,
// paragraphs, headings, bullet lists, inline images).

type Span = {
  _type: "span";
  text: string;
  marks?: string[];
};

type MarkDef = { _key: string; _type: string; href?: string };

type Block = {
  _type: string;
  _key: string;
  style?: string;
  listItem?: string;
  children?: Span[];
  markDefs?: MarkDef[];
  [key: string]: unknown;
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderSpan(span: Span, markDefs: MarkDef[]): string {
  let html = escapeHtml(span.text);
  const marks = span.marks || [];

  // Wrap link marks last-in-first-out so nested bold/italic inside a link
  // still ends up inside the <a>, matching how Portable Text marks stack.
  for (const mark of marks) {
    if (mark === "strong") {
      html = `<strong>${html}</strong>`;
    } else if (mark === "em") {
      html = `<em>${html}</em>`;
    } else {
      const def = markDefs.find((d) => d._key === mark);
      if (def?._type === "link" && def.href) {
        html = `<a href="${escapeHtml(def.href)}" style="color:#b08d57;">${html}</a>`;
      }
    }
  }
  return html;
}

function renderChildren(block: Block): string {
  return (block.children || []).map((span) => renderSpan(span, block.markDefs || [])).join("");
}

const HEADING_STYLE = "margin:24px 0 8px; font-family:Georgia,serif; font-weight:400;";
const PARAGRAPH_STYLE = "margin:0 0 16px; line-height:1.6; color:#2a2a2a;";

export function portableTextToEmailHtml(blocks: Block[] | undefined | null): string {
  if (!Array.isArray(blocks) || blocks.length === 0) return "";

  const html: string[] = [];
  let inList = false;

  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };

  for (const block of blocks) {
    if (block._type === "image") {
      closeList();
      try {
        const src = urlForImage(block as any).width(600).url();
        html.push(
          `<img src="${escapeHtml(src)}" alt="" style="max-width:100%; height:auto; margin:16px 0; display:block;" />`
        );
      } catch {
        // Skip images we can't build a URL for rather than breaking the email.
      }
      continue;
    }

    if (block._type !== "block") continue;

    if (block.listItem === "bullet") {
      if (!inList) {
        html.push("<ul style=\"margin:0 0 16px; padding-left:20px;\">");
        inList = true;
      }
      html.push(`<li style="margin-bottom:6px; color:#2a2a2a;">${renderChildren(block)}</li>`);
      continue;
    }

    closeList();

    const style = block.style || "normal";
    const content = renderChildren(block);
    if (!content) continue;

    if (style === "h1" || style === "h2") {
      html.push(`<h2 style="${HEADING_STYLE} font-size:22px;">${content}</h2>`);
    } else if (style === "h3") {
      html.push(`<h3 style="${HEADING_STYLE} font-size:19px;">${content}</h3>`);
    } else if (style === "h4") {
      html.push(`<h4 style="${HEADING_STYLE} font-size:17px;">${content}</h4>`);
    } else if (style === "blockquote") {
      html.push(
        `<blockquote style="margin:16px 0; padding-left:14px; border-left:3px solid #b08d57; color:#555; font-style:italic;">${content}</blockquote>`
      );
    } else {
      html.push(`<p style="${PARAGRAPH_STYLE}">${content}</p>`);
    }
  }

  closeList();
  return html.join("\n");
}

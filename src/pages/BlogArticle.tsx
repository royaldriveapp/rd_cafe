import { Fragment, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, Navigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useBlogPosts } from "@/hooks/useContent";
import type { BlogContentBlock, BlogPortableTextBlock, BlogPortableTextSpan } from "@/types/content";

const VIEW_STORAGE_PREFIX = "rd-cafe-blog-view:";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function formatViews(views: number) {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1).replace(/\.0$/, "")}m views`;
  }

  if (views >= 1000) {
    return `${(views / 1000).toFixed(1).replace(/\.0$/, "")}k views`;
  }

  return `${views} views`;
}

function renderPortableTextSpan(
  span: BlogPortableTextSpan,
  block: BlogPortableTextBlock,
  index: number
) {
  const markDefs = block.markDefs ?? [];
  const marks = span.marks ?? [];

  let content = <Fragment key={span._key ?? `${span.text}-${index}`}>{span.text}</Fragment>;

  for (const mark of marks) {
    if (mark === "strong") {
      content = <strong key={`${mark}-${index}`}>{content}</strong>;
      continue;
    }

    if (mark === "em") {
      content = <em key={`${mark}-${index}`}>{content}</em>;
      continue;
    }

    if (mark === "underline") {
      content = <span key={`${mark}-${index}`} className="underline decoration-[#C49A3C]/80 underline-offset-4">{content}</span>;
      continue;
    }

    if (mark === "code") {
      content = (
        <code
          key={`${mark}-${index}`}
          className="rounded bg-[#F1E5D8] px-1.5 py-0.5 font-sohne text-[0.88em] text-[#5C3A1A]"
        >
          {content}
        </code>
      );
      continue;
    }

    const linkDef = markDefs.find((def) => def._key === mark && def._type === "link");
    if (linkDef?.href) {
      content = (
        <a
          key={`${mark}-${index}`}
          href={linkDef.href}
          target={linkDef.href.startsWith("http") ? "_blank" : undefined}
          rel={linkDef.href.startsWith("http") ? "noreferrer" : undefined}
          className="text-[#A36B1F] underline decoration-[#C49A3C]/80 underline-offset-4 transition-colors hover:text-[#7C4F12]"
        >
          {content}
        </a>
      );
    }
  }

  return content;
}

function renderBlockNode(block: BlogPortableTextBlock, key: string) {
  const children = block.children?.map((span, index) => renderPortableTextSpan(span, block, index)) ?? null;

  if (block.style === "h2") {
    return (
      <h2 key={key} className="font-serif text-[1.9rem] leading-tight text-[#2A140D] md:text-[2.15rem]">
        {children}
      </h2>
    );
  }

  if (block.style === "h3") {
    return (
      <h3 key={key} className="font-serif text-[1.5rem] leading-tight text-[#2A140D] md:text-[1.65rem]">
        {children}
      </h3>
    );
  }

  if (block.style === "blockquote") {
    return (
      <blockquote
        key={key}
        className="rounded-r-md bg-[#FFF8EE] py-6 pl-6 pr-5"
        style={{ borderLeft: "2px solid #C49A3C" }}
      >
        <p className="font-display text-[1.45rem] italic leading-relaxed text-[#5C3A1A]">{children}</p>
      </blockquote>
    );
  }

  return (
    <p key={key} className="font-sohne text-[0.95rem] font-light leading-[1.9] text-[#3A2A1E] md:text-[1rem]">
      {children}
    </p>
  );
}

function renderArticleContent(content: BlogContentBlock[]) {
  const nodes: JSX.Element[] = [];
  let index = 0;

  while (index < content.length) {
    const block = content[index];

    if (block._type === "block" && block.listItem) {
      const listItems: BlogPortableTextBlock[] = [];
      const listType = block.listItem;
      const listTag = listType === "number" ? "ol" : "ul";

      while (index < content.length) {
        const current = content[index];
        if (current._type === "block" && current.listItem === listType) {
          listItems.push(current);
          index += 1;
        } else {
          break;
        }
      }

      const ListComponent = listTag;
      nodes.push(
        <ListComponent
          key={`list-${nodes.length}`}
          className={listType === "number" ? "list-decimal space-y-3 pl-6" : "list-disc space-y-3 pl-6"}
        >
          {listItems.map((item, itemIndex) => (
            <li
              key={item._key ?? `list-item-${itemIndex}`}
              className="font-sohne text-[0.95rem] font-light leading-[1.9] text-[#3A2A1E] md:text-[1rem]"
            >
              {item.children.map((span, spanIndex) => renderPortableTextSpan(span, item, spanIndex))}
            </li>
          ))}
        </ListComponent>
      );
      continue;
    }

    if (block._type === "pullQuote") {
      nodes.push(
        <blockquote
          key={block._key ?? `quote-${nodes.length}`}
          className="rounded-r-md bg-[#FFF8EE] py-6 pl-6 pr-5"
          style={{ borderLeft: "2px solid #C49A3C" }}
        >
          <p className="font-display text-[1.45rem] italic leading-relaxed text-[#5C3A1A]">
            "{block.text}"
          </p>
        </blockquote>
      );
      index += 1;
      continue;
    }

    if (block._type === "image") {
      nodes.push(
        <figure key={block._key ?? `image-${nodes.length}`} className="overflow-hidden rounded-[10px] bg-[#F1E5D8]">
          {block.src ? <img src={block.src} alt={block.alt ?? ""} className="w-full object-cover" /> : null}
          {block.alt ? (
            <figcaption className="px-4 py-3 font-sohne text-[0.82rem] text-[#8C7B6B]">{block.alt}</figcaption>
          ) : null}
        </figure>
      );
      index += 1;
      continue;
    }

    if (block._type === "block") {
      nodes.push(renderBlockNode(block, block._key ?? `block-${nodes.length}`));
    }

    index += 1;
  }

  return nodes;
}

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: posts = [], isLoading } = useBlogPosts();
  const [progress, setProgress] = useState(0);
  const [displayViews, setDisplayViews] = useState<number | null>(null);

  const post = useMemo(() => posts.find((entry) => entry.slug === slug), [posts, slug]);
  const relatedPosts = useMemo(
    () => posts.filter((entry) => entry.slug !== slug).slice(0, 2),
    [posts, slug]
  );

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const value = scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;
      setProgress(value);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    if (!post) {
      return;
    }

    setDisplayViews(post.views);

    if (typeof window === "undefined") {
      return;
    }

    const storageKey = `${VIEW_STORAGE_PREFIX}${post.slug}`;
    if (window.sessionStorage.getItem(storageKey)) {
      return;
    }

    let cancelled = false;

    fetch("/api/blog-view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug: post.slug }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to increment views with status ${response.status}`);
        }

        return response.json() as Promise<{ views?: number }>;
      })
      .then((payload) => {
        if (cancelled) {
          return;
        }

        if (typeof payload.views === "number") {
          setDisplayViews(payload.views);
        }

        window.sessionStorage.setItem(storageKey, "tracked");
      })
      .catch((error) => {
        console.warn("Unable to increment blog views.", error);
      });

    return () => {
      cancelled = true;
    };
  }, [post]);

  if (isLoading) {
    return (
      <Layout>
        <main className="min-h-screen bg-[#FAF6F1] pt-32">
          <div className="container-cafe font-sohne text-[#A08870]">Loading article…</div>
        </main>
      </Layout>
    );
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <Layout>
      <motion.main
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-[#FAF6F1] pt-24 text-[#2A140D] sm:pt-28 md:pt-32"
      >
        <div className="container-cafe">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-sohne text-[0.84rem] text-[#A08870] transition-colors duration-300 hover:text-[#C49A3C] sm:text-[0.88rem]"
          >
            <span aria-hidden="true">←</span>
            Back to journal
          </Link>
        </div>

        <section className="mt-5 sm:mt-6">
          <div className="overflow-hidden bg-[linear-gradient(180deg,rgba(18,8,0,0.22)_0%,rgba(18,8,0,0.72)_62%,rgba(18,8,0,0.92)_100%)]">
            <div className="relative h-[230px] sm:h-[280px]">
              {post.image ? (
                <img src={post.image} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#4A2414_0%,#2A140D_100%)]" />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,8,0,0.2)_0%,rgba(18,8,0,0.46)_38%,rgba(18,8,0,0.88)_100%)]" />
              <div className="container-cafe relative flex h-full items-end pb-8 sm:pb-10">
                <div className="max-w-[520px]">
                  <p className="font-sohne text-[0.7rem] uppercase tracking-[0.22em] text-[#C49A3C] sm:text-[0.78rem] sm:tracking-[0.28em]">
                    {post.category}
                  </p>
                  <h1 className="mt-3 font-serif text-[1.7rem] leading-tight text-[#F5ECD7] sm:text-[2rem] md:text-[2.5rem]">
                    {post.title}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container-cafe pb-20 pt-7 sm:pb-24 sm:pt-8">
          <div className="flex flex-col gap-5 border-b border-[#EDE3D8] pb-7 font-sohne text-[0.82rem] text-[#A08870] sm:flex-row sm:flex-wrap sm:items-center sm:pb-8 sm:text-[0.84rem]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C49A3C] font-sohne text-[1.1rem] font-medium text-[#2A140D]">
                {getInitials(post.author)}
              </div>
              <div>
                <p className="text-[#3A2A1E]">{post.author}</p>
                <p>{new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
              </div>
            </div>

            <div className="hidden h-8 w-px bg-[#E5D7C7] md:block" />
            <p>{post.readTime}</p>
            <div className="hidden h-8 w-px bg-[#E5D7C7] md:block" />
            <p>{formatViews(displayViews ?? post.views)}</p>
          </div>

          <div className="mt-8 h-[2px] w-full overflow-hidden rounded-full bg-[#EDE3D8]">
            <div
              className="h-full bg-[#C49A3C] transition-[width] duration-150"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <article className="mx-auto mt-10 max-w-[600px] sm:mt-14">
            <div className="space-y-10">{renderArticleContent(post.content)}</div>
          </article>

          <section className="mt-16 border-t border-[#EDE3D8] pt-8 sm:mt-20 sm:pt-10">
            <p className="font-sohne text-[0.58rem] uppercase tracking-[0.28em] text-[#C49A3C] sm:text-[0.62rem] sm:tracking-[0.34em]">
              Continue reading
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group flex items-center gap-4 rounded-lg border border-[#E6DACC] bg-[#FFF8EE] p-4 transition-colors duration-300 hover:border-[#C49A3C] sm:gap-5 sm:p-5"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-[linear-gradient(135deg,#4A2414_0%,#2A140D_100%)]">
                    {relatedPost.image ? (
                      <img src={relatedPost.image} alt={relatedPost.title} className="h-full w-full object-cover" />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-serif text-[1.12rem] leading-tight text-[#2A140D] transition-colors duration-300 group-hover:text-[#A36B1F] sm:text-[1.35rem]">
                      {relatedPost.title}
                    </h2>
                    <p className="mt-2 font-sohne text-[0.86rem] text-[#A08870]">
                      {relatedPost.category} • {relatedPost.readTime.replace(" read", "")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </section>
      </motion.main>
    </Layout>
  );
};

export default BlogArticle;

import { defaultBlogPageContent, defaultBlogPosts, defaultContactPageContent, defaultFacilitiesPageContent, defaultGalleryPageContent, defaultSiteSettings } from "@/data/siteContent";
import { isSanityConfigured, sanityFetch } from "@/lib/sanity";
import type { BlogPageContent, BlogPost, ContactPageContent, FacilitiesPageContent, GalleryPageContent, SiteSettings } from "@/types/content";

interface SanityBlogPostDocument extends Omit<BlogPost, "id" | "views"> {
  _id: string;
  views?: number | string;
}

const siteSettingsProjection = `{
  brandName,
  brandAccent,
  footerDescription,
  footerLinks,
  socialLinks,
  businessHours,
  addressLines,
  phone,
  email,
  footerBottomLeft,
  footerBottomRight,
  visitCta
}`;

const facilitiesProjection = `{
  convenienceSection,
  hoursSection,
  spacesSection,
  qualitySection
}`;

const galleryProjection = `{
  eyebrow,
  title,
  description,
  taglineTitle,
  taglineDescription,
  "images": images[]{
    "src": image.asset->url,
    alt,
    category,
    featured
  }
}`;

const contactProjection = `{
  heroEyebrow,
  heroTitle,
  heroDescription,
  visitTitle,
  visitHighlight,
  mapEmbedUrl
}`;

const blogPageProjection = `{
  eyebrow,
  title,
  description
}`;

const blogPostsProjection = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  author,
  publishedAt,
  readTime,
  "image": image.asset->url,
  views,
  featured,
  content[]{
    ...,
    markDefs[]{
      ...,
      href
    },
    children[]{
      ...,
      marks
    },
    "src": select(_type == "image" => asset->url, null)
  }
}`;

async function withFallback<T>(fallback: T, query: string): Promise<T> {
  if (!isSanityConfigured()) {
    return fallback;
  }

  try {
    const result = await sanityFetch<T | null>(query);
    return result ?? fallback;
  } catch (error) {
    console.warn("Falling back to local content because Sanity could not be reached.", error);
    return fallback;
  }
}

function normalizeViews(value: number | string | undefined) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return 0;
  }

  const normalized = value.trim().toLowerCase().replace(/views?/g, "").trim();
  const match = normalized.match(/^([\d.]+)\s*([km])?$/);

  if (!match) {
    return Number.parseInt(normalized.replace(/[^\d]/g, ""), 10) || 0;
  }

  const numeric = Number.parseFloat(match[1]);
  if (!Number.isFinite(numeric)) {
    return 0;
  }

  if (match[2] === "k") return Math.round(numeric * 1000);
  if (match[2] === "m") return Math.round(numeric * 1000000);
  return Math.round(numeric);
}

function mapSanityBlogPost(post: SanityBlogPostDocument): BlogPost {
  return {
    ...post,
    id: post._id,
    views: normalizeViews(post.views),
  };
}

export function getSiteSettings() {
  return withFallback<SiteSettings>(defaultSiteSettings, `*[_type == "siteSettings"][0] ${siteSettingsProjection}`);
}

export function getFacilitiesPageContent() {
  return withFallback<FacilitiesPageContent>(defaultFacilitiesPageContent, `*[_type == "facilitiesPage"][0] ${facilitiesProjection}`);
}

export function getGalleryPageContent() {
  return withFallback<GalleryPageContent>(defaultGalleryPageContent, `*[_type == "galleryPage"][0] ${galleryProjection}`);
}

export function getContactPageContent() {
  return withFallback<ContactPageContent>(defaultContactPageContent, `*[_type == "contactPage"][0] ${contactProjection}`);
}

export function getBlogPageContent() {
  return withFallback<BlogPageContent>(defaultBlogPageContent, `*[_type == "blogPage"][0] ${blogPageProjection}`);
}

export async function getBlogPosts() {
  if (!isSanityConfigured()) {
    return defaultBlogPosts;
  }

  try {
    const result = await sanityFetch<SanityBlogPostDocument[]>(`*[_type == "blogPost"] | order(publishedAt desc) ${blogPostsProjection}`);
    return result.map(mapSanityBlogPost);
  } catch (error) {
    console.warn("Falling back to local blog posts because Sanity could not be reached.", error);
    return defaultBlogPosts;
  }
}

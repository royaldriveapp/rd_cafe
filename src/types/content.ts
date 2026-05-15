export interface SocialLink {
  platform: string;
  url: string;
}

export interface FooterLink {
  label: string;
  path: string;
}

export interface BusinessHour {
  label: string;
  value: string;
}

export interface VisitInfoCard {
  iconKey: string;
  title: string;
  lines: string[];
}

export interface SiteSettings {
  brandName: string;
  brandAccent: string;
  footerDescription: string;
  footerLinks: FooterLink[];
  socialLinks: SocialLink[];
  businessHours: BusinessHour[];
  addressLines: string[];
  phone: string;
  email: string;
  footerBottomLeft: string;
  footerBottomRight: string;
  visitCta: {
    eyebrow: string;
    title: string;
    highlightedText: string;
    description: string;
    buttonLabel: string;
    buttonLink: string;
    infoCards: VisitInfoCard[];
  };
}

export interface ContentCard {
  iconKey: string;
  title: string;
  description: string;
}

export interface HighlightCard extends ContentCard {
  highlight?: string;
  time?: string;
}

export interface FacilitiesPageContent {
  convenienceSection: {
    eyebrow: string;
    title: string;
    items: ContentCard[];
  };
  hoursSection: {
    eyebrow: string;
    title: string;
    items: HighlightCard[];
  };
  spacesSection: {
    eyebrow: string;
    title: string;
    items: HighlightCard[];
  };
  qualitySection: {
    eyebrow: string;
    title: string;
    items: ContentCard[];
  };
}

export interface GalleryImageItem {
  src: string;
  alt: string;
  category: string;
  featured?: boolean;
}

export interface GalleryPageContent {
  eyebrow: string;
  title: string;
  description: string;
  taglineTitle: string;
  taglineDescription: string;
  images: GalleryImageItem[];
}

export interface ContactPageContent {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  visitTitle: string;
  visitHighlight: string;
  mapEmbedUrl: string;
}

export interface BlogPageContent {
  eyebrow: string;
  title: string;
  description: string;
}

export interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  image?: string;
}

export interface BlogPortableTextMarkDef {
  _key: string;
  _type: "link";
  href: string;
}

export interface BlogPortableTextSpan {
  _key?: string;
  _type: "span";
  text: string;
  marks?: string[];
}

export interface BlogPortableTextBlock {
  _key?: string;
  _type: "block";
  style?: "normal" | "h2" | "h3" | "blockquote";
  listItem?: "bullet" | "number";
  level?: number;
  children: BlogPortableTextSpan[];
  markDefs?: BlogPortableTextMarkDef[];
}

export interface BlogPullQuoteBlock {
  _key?: string;
  _type: "pullQuote";
  text: string;
}

export interface BlogImageBlock {
  _key?: string;
  _type: "image";
  alt?: string;
  src?: string;
}

export type BlogContentBlock = BlogPortableTextBlock | BlogPullQuoteBlock | BlogImageBlock;

export interface BlogPost extends BlogPostSummary {
  views: number;
  featured?: boolean;
  content: BlogContentBlock[];
}

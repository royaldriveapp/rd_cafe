import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const studioDir = path.resolve(__dirname, "..");
const appDir = path.resolve(studioDir, "..");
const outputDir = path.join(studioDir, "seed-data");
const outputPath = path.join(outputDir, "site-content.ndjson");

function imageField(relativePath) {
  const absoluteImagePath = path.resolve(appDir, relativePath);
  return {
    _type: "image",
    _sanityAsset: `image@file://${absoluteImagePath}`,
  };
}

function paragraphBlock(text) {
  return {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text }],
    markDefs: [],
  };
}

function pullQuoteBlock(text) {
  return {
    _type: "pullQuote",
    text,
  };
}

const documents = [
  {
    _id: "site-settings",
    _type: "siteSettings",
    brandName: "RD",
    brandAccent: "CAFE",
    footerDescription: "A cozy haven where every cup tells a story. Experience warmth, comfort, and exceptional coffee.",
    footerLinks: [
      { _type: "object", label: "Home", path: "/" },
      { _type: "object", label: "Menu", path: "/menu" },
      { _type: "object", label: "About", path: "/about" },
      { _type: "object", label: "Gallery", path: "/gallery" },
      { _type: "object", label: "Blog", path: "/blog" },
      { _type: "object", label: "Contact", path: "/contact" },
    ],
    socialLinks: [
      { _type: "object", platform: "instagram", url: "https://instagram.com" },
      { _type: "object", platform: "facebook", url: "https://facebook.com" },
    ],
    businessHours: [
      { _type: "object", label: "Monday to Friday", value: "7:00 AM – 9:00 PM" },
      { _type: "object", label: "Saturday to Sunday", value: "8:00 AM – 10:00 PM" },
    ],
    addressLines: ["123 Cozy Lane, Downtown District", "City 10001"],
    phone: "+1 (555) 123-4567",
    email: "hello@rdcafe.com",
    footerBottomLeft: "© 2026 RD CAFE. All rights reserved.",
    footerBottomRight: "Crafted with love for coffee lovers",
    visitCta: {
      _type: "object",
      eyebrow: "Plan Your Visit",
      title: "We'd Love to",
      highlightedText: "Welcome You",
      description: "Whether for a quiet morning coffee, a business meeting in our private lounge, or an evening with loved ones—your table is ready.",
      buttonLabel: "Get Directions",
      buttonLink: "/contact",
      infoCards: [
        { _type: "object", iconKey: "mapPin", title: "Find Us", lines: ["123 Cozy Lane, Downtown District", "City 10001"] },
        { _type: "object", iconKey: "clock", title: "Hours", lines: ["Monday – Friday: 7:00 AM – 9:00 PM", "Saturday – Sunday: 8:00 AM – 10:00 PM"] },
      ],
    },
  },
  {
    _id: "facilities-page",
    _type: "facilitiesPage",
    convenienceSection: {
      _type: "object",
      eyebrow: "Convenience",
      title: "Easy Access & Modern Amenities",
      items: [
        { _type: "object", iconKey: "mapPin", title: "Highway Accessible", description: "Conveniently located right off the highway for easy access — perfect for travellers and locals alike." },
        { _type: "object", iconKey: "car", title: "Vast Parking Space", description: "Ample parking for cars, bikes, and buses. Stress-free arrival every time, no matter your vehicle." },
        { _type: "object", iconKey: "zap", title: "EV Charging Station", description: "Power up your electric vehicle while you enjoy your meal — modern convenience for eco-conscious guests." },
        { _type: "object", iconKey: "clock", title: "Modern Ordering System", description: "State-of-the-art ordering and billing for a seamless, efficient dining experience." },
      ],
    },
    hoursSection: {
      _type: "object",
      eyebrow: "Flexible Hours",
      title: "Open When You Need Us",
      items: [
        { _type: "object", iconKey: "sunrise", title: "Early Bird Breakfast", time: "From 7:00 AM", description: "Start your day with freshly brewed coffee and warm pastries" },
        { _type: "object", iconKey: "moon", title: "Late-Night Dining", time: "Until 2:00 AM", description: "Perfect for night owls, travellers, and those late-night cravings" },
        { _type: "object", iconKey: "calendar", title: "Open Every Day", time: "7 Days a Week", description: "We're here for you, weekends and holidays included" },
      ],
    },
    spacesSection: {
      _type: "object",
      eyebrow: "Comfort & Privacy",
      title: "Thoughtfully Designed Spaces",
      items: [
        { _type: "object", iconKey: "doorOpen", title: "Private Lounges & Boardroom", description: "Exclusive spaces available for hourly or daily rental — perfect for meetings, events, or private gatherings.", highlight: "Book for your next event" },
        { _type: "object", iconKey: "heart", title: "Feeding Room", description: "A comfortable, private space for nursing mothers — because every guest deserves care and convenience.", highlight: "Designed for comfort" },
        { _type: "object", iconKey: "moon", title: "Prayer Room", description: "A dedicated, serene space for prayer and reflection, available to all guests throughout the day.", highlight: "Open to all faiths" },
        { _type: "object", iconKey: "shieldCheck", title: "24/7 Security", description: "Round-the-clock security ensures a safe environment for you and your family, day or night.", highlight: "Your safety, our priority" },
      ],
    },
    qualitySection: {
      _type: "object",
      eyebrow: "Quality Standards",
      title: "Purity You Can Trust",
      items: [
        { _type: "object", iconKey: "award", title: "Premium Ingredients", description: "We source only the finest, high-quality imported ingredients to ensure exceptional taste." },
        { _type: "object", iconKey: "ban", title: "No Artificial Flavours", description: "We never use artificial tastemakers or flavour enhancers — just pure, authentic taste." },
        { _type: "object", iconKey: "leaf", title: "Fresh & Natural", description: "From farm to table, we prioritize freshness and natural goodness in every preparation." },
        { _type: "object", iconKey: "sparkles", title: "Crafted with Care", description: "Every dish is thoughtfully prepared by our skilled chefs who take pride in their craft." },
      ],
    },
  },
  {
    _id: "gallery-page",
    _type: "galleryPage",
    eyebrow: "Visual Stories",
    title: "Gallery",
    description: "Moments captured at RD CAFE — where every cup tells a story",
    taglineTitle: "Every cup tells a story",
    taglineDescription: "From the first pour to the last sip, we craft moments worth remembering.",
    images: [
      { _type: "object", image: imageField("src/assets/hero-cafe.jpg"), alt: "RD Cafe Interior - Warm and inviting space with comfortable seating", category: "Interior", featured: true },
      { _type: "object", image: imageField("src/assets/gallery-1.jpg"), alt: "Cozy reading corner with natural lighting", category: "Ambiance" },
      { _type: "object", image: imageField("src/assets/gallery-2.jpg"), alt: "Barista crafting specialty coffee drinks", category: "Coffee" },
      { _type: "object", image: imageField("src/assets/coffee-latte.jpg"), alt: "Signature latte with intricate latte art", category: "Coffee" },
      { _type: "object", image: imageField("src/assets/espresso.jpg"), alt: "Fresh espresso shot in ceramic cup", category: "Coffee" },
      { _type: "object", image: imageField("src/assets/gallery-3.jpg"), alt: "Fresh pastry display with croissants and cakes", category: "Food" },
      { _type: "object", image: imageField("src/assets/croissant.jpg"), alt: "Freshly baked golden croissant", category: "Food" },
      { _type: "object", image: imageField("src/assets/chocolate-cake.jpg"), alt: "Rich chocolate cake with ganache topping", category: "Food" },
      { _type: "object", image: imageField("src/assets/gallery-4.jpg"), alt: "Premium roasted coffee beans close-up", category: "Coffee" },
    ],
  },
  {
    _id: "contact-page",
    _type: "contactPage",
    heroEyebrow: "Get in Touch",
    heroTitle: "Contact Us",
    heroDescription: "We'd love to hear from you. Drop by, give us a call, or send a message.",
    visitTitle: "Visit Our",
    visitHighlight: "Cozy Corner",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095919364!2d-74.00425878459473!3d40.74076794379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle%20NYC!5e0!3m2!1sen!2sus!4v1635959875969!5m2!1sen!2sus",
  },
  {
    _id: "blog-page",
    _type: "blogPage",
    eyebrow: "From the journal",
    title: "Stories From RD CAFE",
    description: "Coffee notes, cafe updates, seasonal specials, and the little rituals that make every visit memorable.",
  },
  {
    _id: "blog-post-house-roast",
    _type: "blogPost",
    title: "The Story Behind Our House Roast",
    slug: { _type: "slug", current: "the-story-behind-our-house-roast" },
    excerpt: "A look at how we choose beans, build balance, and create the cup that feels most like home at RD CAFE.",
    category: "Coffee",
    author: "RD CAFE Team",
    publishedAt: "2026-05-01T09:00:00.000Z",
    readTime: "4 min read",
    views: 1200,
    featured: true,
    image: imageField("src/assets/hero-cafe.jpg"),
    content: [
      paragraphBlock("Every cup at RD Café begins long before the machine hums to life. It starts with a question we ask ourselves every season — what does home taste like right now?"),
      pullQuoteBlock("We don't just source beans — we look for a feeling. Something that lingers after the last sip."),
      paragraphBlock("Our current house roast is a medium-dark blend of Ethiopian Yirgacheffe and Colombian Huila, roasted in small batches every Thursday morning. The result is a cup that's rich without being heavy — notes of dark chocolate, a hint of dried fig, and a finish that asks you to sit a little longer."),
      paragraphBlock("We test every batch as espresso, with milk, and as a longer pour. If a roast only sings in one format, it doesn't become our house cup. The blend needs to welcome regulars at 7 a.m. and still feel interesting to the guest who notices every nuance."),
    ],
  },
  {
    _id: "blog-post-quiet-mornings",
    _type: "blogPost",
    title: "Why Quiet Mornings Taste Better Here",
    slug: { _type: "slug", current: "why-quiet-mornings-taste-better-here" },
    excerpt: "From soft light to warm pastries, here is how we shape the first hours of the day for regulars and first-timers alike.",
    category: "Cafe Life",
    author: "RD CAFE Team",
    publishedAt: "2026-04-18T09:00:00.000Z",
    readTime: "3 min read",
    views: 864,
    image: imageField("src/assets/gallery-1.jpg"),
    content: [
      paragraphBlock("There is a hush that settles into the café before the city fully wakes. It is our favourite hour — light stretching across tables, grinders still warm from the first round, and the kind of quiet that makes a cup feel more generous."),
      pullQuoteBlock("Quiet doesn't empty a room. It lets the details become audible."),
      paragraphBlock("We keep the music low, leave breathing room between tables, and make the first trays of pastries just before doors open so the room feels lived-in rather than staged. Morning regulars notice these things, even if they don't say them aloud."),
    ],
  },
  {
    _id: "blog-post-private-lounge",
    _type: "blogPost",
    title: "5 Ways to Use Our Private Lounge",
    slug: { _type: "slug", current: "five-ways-to-use-our-private-lounge" },
    excerpt: "A few favorite ideas for client catchups, family celebrations, community circles, and low-key business meetings.",
    category: "Spaces",
    author: "RD CAFE Team",
    publishedAt: "2026-03-30T09:00:00.000Z",
    readTime: "5 min read",
    views: 642,
    image: imageField("src/assets/gallery-2.jpg"),
    content: [
      paragraphBlock("Our private lounge was designed for moments that need a little more privacy without losing the warmth of the café around them. Some guests come for business, others for celebration, and many discover the room becomes what they need it to be."),
      pullQuoteBlock("A good room should adapt to the people inside it, not the other way around."),
      paragraphBlock("We've seen the space host client breakfasts, bridal showers, book clubs, thoughtful family dinners, and quiet planning sessions that need decent coffee more than fluorescent lights. The best use tends to be the one that feels effortless once you're in it."),
    ],
  },
];

const menuSeedPath = path.join(studioDir, "seed-data", "menu.ndjson");
const menuDocuments = fs
  .readFileSync(menuSeedPath, "utf8")
  .trim()
  .split("\n")
  .filter(Boolean)
  .map((line) => JSON.parse(line));

fs.mkdirSync(outputDir, { recursive: true });
const ndjson = [...documents, ...menuDocuments].map((doc) => JSON.stringify(doc)).join("\n");
fs.writeFileSync(outputPath, `${ndjson}\n`, "utf8");

console.log(`Wrote ${documents.length + menuDocuments.length} documents to ${outputPath}`);

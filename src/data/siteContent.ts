import type {
  BlogPost,
  BlogPageContent,
  ContactPageContent,
  FacilitiesPageContent,
  GalleryPageContent,
  SiteSettings,
} from "@/types/content";
import heroImage from "@/assets/hero-cafe.jpg";
import latteImage from "@/assets/coffee-latte.jpg";
import espressoImage from "@/assets/espresso.jpg";
import croissantImage from "@/assets/croissant.jpg";
import cakeImage from "@/assets/chocolate-cake.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

export const RD_CAFE_MAPS_URL =
  "https://www.google.com/maps?vet=10CAAQoqAOahcKEwio-_j2jLuUAxUAAAAAHQAAAAAQEg..i&client=safari&pvq=Cg0vZy8xMXk4M2x0Y3FmIhYKEHJveWFsIGRyaXZlIGNhZmUQAhgD&lqi=ChByb3lhbCBkcml2ZSBjYWZlSM3dsrmgvYCACFoeEAAQARACGAAYARgCIhByb3lhbCBkcml2ZSBjYWZlkgEEY2FmZQ&fvr=1&cs=0&um=1&ie=UTF-8&fb=1&gl=bh&sa=X&ftid=0x3b087300293281c1:0xdfaf449da8db2380";

const paragraphBlock = (text: string) => ({
  _type: "block" as const,
  style: "normal" as const,
  children: [{ _type: "span" as const, text }],
  markDefs: [],
});

const pullQuoteBlock = (text: string) => ({
  _type: "pullQuote" as const,
  text,
});

export const defaultSiteSettings: SiteSettings = {
  brandName: "RD",
  brandAccent: "CAFE",
  footerDescription:
    "A cozy haven where every cup tells a story. Experience warmth, comfort, and exceptional coffee.",
  footerLinks: [
    { label: "Home", path: "/" },
    { label: "Menu", path: "/menu" },
    { label: "About", path: "/about" },
    { label: "Gallery", path: "/gallery" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ],
  socialLinks: [
    { platform: "instagram", url: "https://instagram.com" },
    { platform: "facebook", url: "https://facebook.com" },
  ],
  businessHours: [
    { label: "Daily", value: "Open · Closes 2:00 AM" },
  ],
  addressLines: [
    "INTUC Bus Stop, 220/B, NH66, Nettoor, Maradu, Kochi",
    "Ernakulam, Kerala 682040, India",
  ],
  phone: "+91 85930 01010",
  email: "",
  footerBottomLeft: "© 2026 RD CAFE. All rights reserved.",
  footerBottomRight: "Crafted with love for coffee lovers",
  visitCta: {
    eyebrow: "Plan Your Visit",
    title: "We'd Love to",
    highlightedText: "Welcome You",
    description:
      "Whether for a quiet morning coffee, a business meeting in our private lounge, or an evening with loved ones—your table is ready.",
    buttonLabel: "Get Directions",
    buttonLink: RD_CAFE_MAPS_URL,
    infoCards: [
      {
        iconKey: "mapPin",
        title: "Find Us",
        lines: [
          "INTUC Bus Stop, 220/B, NH66, Nettoor, Maradu, Kochi",
          "Ernakulam, Kerala 682040, India",
        ],
      },
      {
        iconKey: "clock",
        title: "Hours",
        lines: ["Open Daily", "Closes 2:00 AM"],
      },
    ],
  },
};

export const defaultFacilitiesPageContent: FacilitiesPageContent = {
  convenienceSection: {
    eyebrow: "Convenience",
    title: "Easy Access & Modern Amenities",
    items: [
      {
        iconKey: "mapPin",
        title: "Highway Accessible",
        description:
          "Conveniently located right off the highway for easy access — perfect for travellers and locals alike.",
      },
      {
        iconKey: "car",
        title: "Vast Parking Space",
        description:
          "Ample parking for cars, bikes, and buses. Stress-free arrival every time, no matter your vehicle.",
      },
      {
        iconKey: "zap",
        title: "EV Charging Station",
        description:
          "Power up your electric vehicle while you enjoy your meal — modern convenience for eco-conscious guests.",
      },
      {
        iconKey: "clock",
        title: "Modern Ordering System",
        description:
          "State-of-the-art ordering and billing for a seamless, efficient dining experience.",
      },
    ],
  },
  hoursSection: {
    eyebrow: "Flexible Hours",
    title: "Open When You Need Us",
    items: [
      {
        iconKey: "sunrise",
        title: "Early Bird Breakfast",
        time: "From 7:00 AM",
        description: "Start your day with freshly brewed coffee and warm pastries",
      },
      {
        iconKey: "moon",
        title: "Late-Night Dining",
        time: "Until 2:00 AM",
        description: "Perfect for night owls, travellers, and those late-night cravings",
      },
      {
        iconKey: "calendar",
        title: "Open Every Day",
        time: "7 Days a Week",
        description: "We're here for you, weekends and holidays included",
      },
    ],
  },
  spacesSection: {
    eyebrow: "Comfort & Privacy",
    title: "Thoughtfully Designed Spaces",
    items: [
      {
        iconKey: "doorOpen",
        title: "Private Lounges & Boardroom",
        description:
          "Exclusive spaces available for hourly or daily rental — perfect for meetings, events, or private gatherings.",
        highlight: "Book for your next event",
      },
      {
        iconKey: "heart",
        title: "Feeding Room",
        description:
          "A comfortable, private space for nursing mothers — because every guest deserves care and convenience.",
        highlight: "Designed for comfort",
      },
      {
        iconKey: "moon",
        title: "Prayer Room",
        description:
          "A dedicated, serene space for prayer and reflection, available to all guests throughout the day.",
        highlight: "Open to all faiths",
      },
      {
        iconKey: "shieldCheck",
        title: "24/7 Security",
        description:
          "Round-the-clock security ensures a safe environment for you and your family, day or night.",
        highlight: "Your safety, our priority",
      },
    ],
  },
  qualitySection: {
    eyebrow: "Quality Standards",
    title: "Purity You Can Trust",
    items: [
      {
        iconKey: "award",
        title: "Premium Ingredients",
        description:
          "We source only the finest, high-quality imported ingredients to ensure exceptional taste.",
      },
      {
        iconKey: "ban",
        title: "No Artificial Flavours",
        description:
          "We never use artificial tastemakers or flavour enhancers — just pure, authentic taste.",
      },
      {
        iconKey: "leaf",
        title: "Fresh & Natural",
        description:
          "From farm to table, we prioritize freshness and natural goodness in every preparation.",
      },
      {
        iconKey: "sparkles",
        title: "Crafted with Care",
        description:
          "Every dish is thoughtfully prepared by our skilled chefs who take pride in their craft.",
      },
    ],
  },
};

export const defaultGalleryPageContent: GalleryPageContent = {
  eyebrow: "Visual Stories",
  title: "Gallery",
  description: "Moments captured at RD CAFE — where every cup tells a story",
  taglineTitle: "Every cup tells a story",
  taglineDescription: "From the first pour to the last sip, we craft moments worth remembering.",
  images: [
    { src: heroImage, alt: "RD Cafe Interior - Warm and inviting space with comfortable seating", category: "Interior", featured: true },
    { src: gallery1, alt: "Cozy reading corner with natural lighting", category: "Ambiance" },
    { src: gallery2, alt: "Barista crafting specialty coffee drinks", category: "Coffee" },
    { src: latteImage, alt: "Signature latte with intricate latte art", category: "Coffee" },
    { src: espressoImage, alt: "Fresh espresso shot in ceramic cup", category: "Coffee" },
    { src: gallery3, alt: "Fresh pastry display with croissants and cakes", category: "Food" },
    { src: croissantImage, alt: "Freshly baked golden croissant", category: "Food" },
    { src: cakeImage, alt: "Rich chocolate cake with ganache topping", category: "Food" },
    { src: gallery4, alt: "Premium roasted coffee beans close-up", category: "Coffee" },
  ],
};

export const defaultContactPageContent: ContactPageContent = {
  heroEyebrow: "Get in Touch",
  heroTitle: "Contact Us",
  heroDescription: "We'd love to hear from you. Drop by, give us a call, or send a message.",
  visitTitle: "Visit Our",
  visitHighlight: "Cozy Corner",
  mapEmbedUrl: "",
};

export const defaultBlogPageContent: BlogPageContent = {
  eyebrow: "From the journal",
  title: "Stories From RD CAFE",
  description: "Coffee notes, cafe updates, seasonal specials, and the little rituals that make every visit memorable.",
};

export const defaultBlogPosts: BlogPost[] = [
  {
    id: "house-roast-story",
    title: "The Story Behind Our House Roast",
    slug: "the-story-behind-our-house-roast",
    excerpt:
      "A look at how we choose beans, build balance, and create the cup that feels most like home at RD CAFE.",
    category: "Coffee",
    author: "RD CAFE Team",
    publishedAt: "2026-05-01",
    readTime: "4 min read",
    image: heroImage,
    views: "1.2k views",
    featured: true,
    content: [
      paragraphBlock("Every cup at RD Café begins long before the machine hums to life. It starts with a question we ask ourselves every season — what does home taste like right now?"),
      pullQuoteBlock("We don't just source beans — we look for a feeling. Something that lingers after the last sip."),
      paragraphBlock("Our current house roast is a medium-dark blend of Ethiopian Yirgacheffe and Colombian Huila, roasted in small batches every Thursday morning. The result is a cup that's rich without being heavy — notes of dark chocolate, a hint of dried fig, and a finish that asks you to sit a little longer."),
      paragraphBlock("We test every batch as espresso, with milk, and as a longer pour. If a roast only sings in one format, it doesn't become our house cup. The blend needs to welcome regulars at 7 a.m. and still feel interesting to the guest who notices every nuance."),
      pullQuoteBlock("Balance matters more than bravado. We want depth, warmth, and clarity in the same breath."),
      paragraphBlock("That philosophy shapes everything around it — from the temperature we hold the milk to the ceramics we serve it in. The cup should feel generous, but never loud. Familiar, but never flat."),
      paragraphBlock("House roasts can easily become background noise. Ours is meant to be the opposite: a quiet signature, one that tells you exactly who we are without needing to announce itself."),
    ],
  },
  {
    id: "quiet-mornings-guide",
    title: "Why Quiet Mornings Taste Better Here",
    slug: "why-quiet-mornings-taste-better-here",
    excerpt:
      "From soft light to warm pastries, here is how we shape the first hours of the day for regulars and first-timers alike.",
    category: "Cafe Life",
    author: "RD CAFE Team",
    publishedAt: "2026-04-18",
    readTime: "3 min read",
    image: gallery1,
    views: "864 views",
    content: [
      paragraphBlock("There is a hush that settles into the café before the city fully wakes. It is our favourite hour — light stretching across tables, grinders still warm from the first round, and the kind of quiet that makes a cup feel more generous."),
      pullQuoteBlock("Quiet doesn't empty a room. It lets the details become audible."),
      paragraphBlock("We keep the music low, leave breathing room between tables, and make the first trays of pastries just before doors open so the room feels lived-in rather than staged. Morning regulars notice these things, even if they don't say them aloud."),
      paragraphBlock("The pace matters too. We move deliberately in the early hours because it changes the taste of the whole visit. Coffee seems rounder, conversation gets gentler, and even solo mornings feel companionable."),
    ],
  },
  {
    id: "private-lounge-ideas",
    title: "5 Ways to Use Our Private Lounge",
    slug: "five-ways-to-use-our-private-lounge",
    excerpt:
      "A few favorite ideas for client catchups, family celebrations, community circles, and low-key business meetings.",
    category: "Spaces",
    author: "RD CAFE Team",
    publishedAt: "2026-03-30",
    readTime: "5 min read",
    image: gallery2,
    views: "642 views",
    content: [
      paragraphBlock("Our private lounge was designed for moments that need a little more privacy without losing the warmth of the café around them. Some guests come for business, others for celebration, and many discover the room becomes what they need it to be."),
      pullQuoteBlock("A good room should adapt to the people inside it, not the other way around."),
      paragraphBlock("We've seen the space host client breakfasts, bridal showers, book clubs, thoughtful family dinners, and quiet planning sessions that need decent coffee more than fluorescent lights. The best use tends to be the one that feels effortless once you're in it."),
      paragraphBlock("If you're not sure how to shape the room for your visit, our team can help with layout, timing, and menu suggestions so it feels composed from the start."),
    ],
  },
  {
    id: "head-barista-day",
    title: "A Day With Our Head Barista",
    slug: "a-day-with-our-head-barista",
    excerpt:
      "A quieter look at the rituals, calibrations, and small choices that shape the cups served from open to close.",
    category: "People",
    author: "RD CAFE Team",
    publishedAt: "2026-03-12",
    readTime: "6 min read",
    image: latteImage,
    views: "956 views",
    content: [
      paragraphBlock("Before the first guest arrives, there is already a rhythm in motion: dial in, taste, adjust, repeat. Our head barista starts each day by listening closely to the beans and the weather because both change the cup in ways guests may never notice, but always feel."),
      pullQuoteBlock("Consistency is not repetition. It's attention, applied daily."),
      paragraphBlock("No shot is treated like a default. Even our most familiar drinks are approached with fresh calibration because yesterday's perfect extraction rarely survives unchanged into a new morning."),
      paragraphBlock("That care is part technique and part hospitality. A good barista reads the room as much as the grinder — noticing who wants conversation, who needs speed, and who is hoping to linger over a second pour."),
    ],
  },
  {
    id: "pastry-rituals",
    title: "The Pastry Rituals We Keep Every Morning",
    slug: "the-pastry-rituals-we-keep-every-morning",
    excerpt:
      "Why the first trays matter, how timing changes texture, and the small routines that make the pastry counter feel abundant.",
    category: "Kitchen",
    author: "RD CAFE Team",
    publishedAt: "2026-02-26",
    readTime: "4 min read",
    image: croissantImage,
    views: "501 views",
    content: [
      paragraphBlock("The pastry counter is one of the first things guests read when they walk in, so we treat it like a form of welcome. Warmth, abundance, and freshness all need to be visible before they are tasted."),
      pullQuoteBlock("A pastry should feel like it arrived at exactly the right moment."),
      paragraphBlock("That is why we stage the morning in waves rather than filling everything at once. Croissants peak differently from cakes, and cakes hold differently from fruit tarts. Timing the display keeps the counter alive instead of static."),
      paragraphBlock("The result is simple: even regulars who know the menu still feel a small sense of discovery at the case."),
    ],
  },
];

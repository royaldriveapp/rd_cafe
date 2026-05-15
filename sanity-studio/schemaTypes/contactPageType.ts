import { defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "heroEyebrow", title: "Hero Eyebrow", type: "string" }),
    defineField({ name: "heroTitle", title: "Hero Title", type: "string" }),
    defineField({ name: "heroDescription", title: "Hero Description", type: "text", rows: 3 }),
    defineField({ name: "visitTitle", title: "Visit Title", type: "string" }),
    defineField({ name: "visitHighlight", title: "Visit Highlight", type: "string" }),
    defineField({ name: "mapEmbedUrl", title: "Map Embed URL", type: "url" }),
  ],
});

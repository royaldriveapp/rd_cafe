import { defineField, defineType } from "sanity";

export const galleryPageType = defineType({
  name: "galleryPage",
  title: "Gallery Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "taglineTitle", title: "Tagline Title", type: "string" }),
    defineField({ name: "taglineDescription", title: "Tagline Description", type: "text", rows: 3 }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
            defineField({ name: "category", title: "Category", type: "string" }),
            defineField({ name: "featured", title: "Featured", type: "boolean" }),
          ],
        },
      ],
    }),
  ],
});

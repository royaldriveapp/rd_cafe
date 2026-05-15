import { defineField, defineType } from "sanity";

const cardFields = [
  defineField({ name: "iconKey", title: "Icon Key", type: "string", validation: (rule) => rule.required() }),
  defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
  defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
  defineField({ name: "highlight", title: "Highlight", type: "string" }),
  defineField({ name: "time", title: "Time", type: "string" }),
];

const sectionFields = [
  defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
  defineField({ name: "title", title: "Title", type: "string" }),
  defineField({ name: "items", title: "Items", type: "array", of: [{ type: "object", fields: cardFields }] }),
];

export const facilitiesPageType = defineType({
  name: "facilitiesPage",
  title: "Facilities Page",
  type: "document",
  fields: [
    defineField({ name: "convenienceSection", title: "Convenience Section", type: "object", fields: sectionFields }),
    defineField({ name: "hoursSection", title: "Open When You Need Us Section", type: "object", fields: sectionFields }),
    defineField({ name: "spacesSection", title: "Thoughtfully Designed Spaces Section", type: "object", fields: sectionFields }),
    defineField({ name: "qualitySection", title: "Purity You Can Trust Section", type: "object", fields: sectionFields }),
  ],
});

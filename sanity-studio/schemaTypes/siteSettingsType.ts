import { defineField, defineType } from "sanity";

const footerLinkFields = [
  defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
  defineField({ name: "path", title: "Path", type: "string", validation: (rule) => rule.required() }),
];

const socialLinkFields = [
  defineField({ name: "platform", title: "Platform", type: "string", validation: (rule) => rule.required() }),
  defineField({ name: "url", title: "URL", type: "url", validation: (rule) => rule.required() }),
];

const businessHourFields = [
  defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
  defineField({ name: "value", title: "Value", type: "string", validation: (rule) => rule.required() }),
];

const visitInfoCardFields = [
  defineField({ name: "iconKey", title: "Icon Key", type: "string", validation: (rule) => rule.required() }),
  defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
  defineField({ name: "lines", title: "Lines", type: "array", of: [{ type: "string" }] }),
];

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "brandAccent",
      title: "Brand Accent",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "footerDescription",
      title: "Footer Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "footerLinks",
      title: "Footer Links",
      type: "array",
      of: [{ type: "object", fields: footerLinkFields }],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [{ type: "object", fields: socialLinkFields }],
    }),
    defineField({
      name: "businessHours",
      title: "Business Hours",
      type: "array",
      of: [{ type: "object", fields: businessHourFields }],
    }),
    defineField({
      name: "addressLines",
      title: "Address Lines",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "footerBottomLeft",
      title: "Footer Bottom Left",
      type: "string",
    }),
    defineField({
      name: "footerBottomRight",
      title: "Footer Bottom Right",
      type: "string",
    }),
    defineField({
      name: "visitCta",
      title: "Visit CTA",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "highlightedText", title: "Highlighted Text", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
        defineField({ name: "buttonLabel", title: "Button Label", type: "string" }),
        defineField({ name: "buttonLink", title: "Button Link", type: "string" }),
        defineField({
          name: "infoCards",
          title: "Info Cards",
          type: "array",
          of: [{ type: "object", fields: visitInfoCardFields }],
        }),
      ],
    }),
  ],
});

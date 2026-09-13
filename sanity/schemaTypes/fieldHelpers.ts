import { defineField } from "sanity";

export const shortText = (name: string, title: string, description?: string) => defineField({
  name,
  title,
  description,
  type: "string",
  validation: (rule) => rule.required(),
});

export const longText = (name: string, title: string, rows = 3) => defineField({
  name,
  title,
  type: "text",
  rows,
  validation: (rule) => rule.required(),
});

export const metadataFields = [
  shortText("title", "Tytuł SEO"),
  longText("description", "Opis SEO", 2),
];

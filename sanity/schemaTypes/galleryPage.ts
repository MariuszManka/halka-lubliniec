import { defineField, defineType } from "sanity";

export const galleryPage = defineType({
  name: "galleryPage",
  title: "Teksty galerii",
  type: "document",
  groups: [
    { name: "hero", title: "Początek strony", default: true },
    { name: "archive", title: "Lista galerii" },
    { name: "home", title: "Strona główna" },
    { name: "return", title: "Zakończenie" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Początek strony",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "eyebrow", title: "Mały nagłówek", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "title", title: "Tytuł", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "titleAccent", title: "Wyróżniona część tytułu", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "lead", title: "Opis", type: "text", rows: 3, validation: (rule) => rule.required() }),
        defineField({ name: "ctaLabel", title: "Tekst przycisku", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "image", title: "Zdjęcie otwierające", type: "cmsImage" }),
        defineField({ name: "imageLabel", title: "Etykieta zdjęcia", type: "string" }),
        defineField({ name: "imageCaption", title: "Podpis zdjęcia", type: "string" }),
      ],
    }),
    defineField({
      name: "archive",
      title: "Lista galerii",
      type: "object",
      group: "archive",
      fields: [
        defineField({ name: "eyebrow", title: "Mały nagłówek", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "title", title: "Tytuł", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "lead", title: "Opis", type: "text", rows: 3, validation: (rule) => rule.required() }),
        defineField({ name: "allYearsLabel", title: "Etykieta wszystkich lat", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "emptyLabel", title: "Komunikat pustego roku", type: "string", validation: (rule) => rule.required() }),
      ],
    }),
    defineField({
      name: "home",
      title: "Sekcja galerii na stronie głównej",
      type: "object",
      group: "home",
      fields: [
        defineField({ name: "eyebrow", title: "Mały nagłówek", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "title", title: "Pierwsza linia tytułu", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "titleAccent", title: "Druga linia tytułu", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "lead", title: "Opis", type: "text", rows: 3, validation: (rule) => rule.required() }),
        defineField({ name: "albumCtaLabel", title: "Tekst odnośnika do albumu", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "eventLabel", title: "Etykieta wydarzenia", type: "string", validation: (rule) => rule.required() }),
      ],
    }),
    defineField({
      name: "return",
      title: "Zakończenie strony",
      type: "object",
      group: "return",
      fields: [
        defineField({ name: "eyebrow", title: "Mały nagłówek", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "title", title: "Tytuł", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "lead", title: "Opis", type: "text", rows: 3, validation: (rule) => rule.required() }),
        defineField({ name: "ctaLabel", title: "Tekst przycisku", type: "string", validation: (rule) => rule.required() }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Teksty galerii" }) },
});

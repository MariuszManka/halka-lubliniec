import { defineField, defineType } from "sanity";
import { metadataFields } from "./fieldHelpers";

export const galleryPage = defineType({
  name: "galleryPage",
  title: "Galeria",
  type: "document",
  groups: [
    { name: "meta", title: "SEO" },
    { name: "hero", title: "Początek strony", default: true },
    { name: "archive", title: "Lista galerii" },
    { name: "ui", title: "Teksty galerii" },
  ],
  fields: [
    defineField({ name: "meta", title: "SEO", type: "object", group: "meta", fields: metadataFields }),
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
      name: "ui",
      title: "Teksty galerii",
      type: "object",
      group: "ui",
      fields: [
        defineField({ name: "resultsOne", title: "Jedna galeria", type: "string" }),
        defineField({ name: "resultsMany", title: "Wiele galerii", description: "Użyj {count} w miejscu liczby.", type: "string" }),
        defineField({ name: "cardCta", title: "Odnośnik na karcie", type: "string" }),
        defineField({ name: "cardOpenLabel", title: "Etykieta otwarcia galerii", type: "string" }),
        defineField({ name: "close", title: "Zamknij galerię", type: "string" }),
        defineField({ name: "previous", title: "Poprzednie zdjęcie", type: "string" }),
        defineField({ name: "next", title: "Następne zdjęcie", type: "string" }),
        defineField({ name: "place", title: "Miejsce", type: "string" }),
        defineField({ name: "photos", title: "Zdjęcia", type: "string" }),
        defineField({ name: "author", title: "Autor", type: "string" }),
        defineField({ name: "hint", title: "Podpowiedź obsługi", type: "string" }),
        defineField({ name: "filterLabel", title: "Etykieta filtra", type: "string" }),
        defineField({ name: "choosePhoto", title: "Etykieta miniaturek", type: "string" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Galeria", subtitle: "/galeria" }) },
});

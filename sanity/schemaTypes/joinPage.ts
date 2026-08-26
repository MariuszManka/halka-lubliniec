import { defineField, defineType } from "sanity";

export const joinPage = defineType({
  name: "joinPage",
  title: "Dołącz do Halki",
  type: "document",
  groups: [
    { name: "hero", title: "Pierwszy ekran" },
    { name: "how", title: "Jak dołączyć" },
    { name: "groups", title: "Grupy" },
    { name: "firstVisit", title: "Pierwsza próba" },
    { name: "location", title: "Siedziba" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Pierwszy ekran",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "eyebrow", title: "Mały nagłówek", type: "string" }),
        defineField({ name: "title", title: "Nagłówek", description: "Możesz wstawić podział wiersza klawiszem Enter.", type: "text", rows: 2 }),
        defineField({ name: "titleAccent", title: "Czerwony fragment nagłówka", type: "string" }),
        defineField({ name: "lead", title: "Wprowadzenie", type: "text", rows: 4 }),
        defineField({ name: "primaryCtaLabel", title: "Główny przycisk", type: "string" }),
        defineField({ name: "secondaryCtaLabel", title: "Drugi przycisk", type: "string" }),
        defineField({ name: "facts", title: "Najważniejsze fakty", type: "array", of: [{ type: "factItem" }], validation: (rule) => rule.max(3) }),
        defineField({ name: "image", title: "Zdjęcie", type: "cmsImage" }),
        defineField({ name: "imageLabel", title: "Etykieta zdjęcia", type: "string" }),
        defineField({ name: "imageMeta", title: "Dopisek przy zdjęciu", type: "string" }),
        defineField({ name: "noteLabel", title: "Mała etykieta notatki", type: "string" }),
        defineField({ name: "noteText", title: "Notatka na zdjęciu", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "how",
      title: "Jak dołączyć",
      type: "object",
      group: "how",
      fields: [
        defineField({ name: "eyebrow", title: "Mały nagłówek", type: "string" }),
        defineField({ name: "title", title: "Nagłówek", type: "string" }),
        defineField({ name: "titleAccent", title: "Czerwony fragment nagłówka", type: "string" }),
        defineField({ name: "steps", title: "Kroki", type: "array", of: [{ type: "textItem" }], validation: (rule) => rule.max(4) }),
      ],
    }),
    defineField({
      name: "groups",
      title: "Grupy",
      type: "object",
      group: "groups",
      fields: [
        defineField({ name: "eyebrow", title: "Mały nagłówek", type: "string" }),
        defineField({ name: "title", title: "Nagłówek", type: "string" }),
        defineField({ name: "titleAccent", title: "Czerwony fragment nagłówka", type: "string" }),
        defineField({ name: "paths", title: "Skróty dla odbiorców", type: "array", of: [{ type: "audiencePath" }], validation: (rule) => rule.max(2) }),
        defineField({ name: "items", title: "Grupy zespołu", description: "Przeciągnij elementy, aby zmienić ich kolejność.", type: "array", of: [{ type: "recruitmentGroup" }], validation: (rule) => rule.max(4) }),
      ],
    }),
    defineField({
      name: "firstVisit",
      title: "Pierwsza próba",
      type: "object",
      group: "firstVisit",
      fields: [
        defineField({ name: "eyebrow", title: "Mały nagłówek", type: "string" }),
        defineField({ name: "title", title: "Nagłówek", type: "string" }),
        defineField({ name: "titleAccent", title: "Druga część nagłówka", type: "string" }),
        defineField({ name: "text", title: "Opis", type: "text", rows: 4 }),
        defineField({ name: "benefits", title: "Najważniejsze informacje", type: "array", of: [{ type: "textItem" }], validation: (rule) => rule.max(3) }),
      ],
    }),
    defineField({
      name: "location",
      title: "Siedziba",
      type: "object",
      group: "location",
      fields: [
        defineField({ name: "eyebrow", title: "Mały nagłówek", type: "string" }),
        defineField({ name: "title", title: "Nagłówek", type: "string" }),
        defineField({ name: "mapCtaLabel", title: "Przycisk mapy", type: "string" }),
        defineField({ name: "emailCtaLabel", title: "Odnośnik e-mail", type: "string" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Dołącz do Halki", subtitle: "Treść podstrony /dolacz" }) },
});


import { defineArrayMember, defineField, defineType } from "sanity";

export const galleryPhoto = defineType({
  name: "galleryPhoto",
  title: "Zdjęcie galerii",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Opis alternatywny",
      description: "Opcjonalnie: napisz krótko, co widać na zdjęciu. Jeśli zostawisz puste, strona użyje tytułu galerii.",
      type: "string",
    }),
    defineField({
      name: "caption",
      title: "Podpis pod zdjęciem",
      description: "Opcjonalny opis widoczny w powiększeniu zdjęcia.",
      type: "text",
      rows: 2,
    }),
  ],
});

export const galleryAlbum = defineType({
  name: "galleryAlbum",
  title: "Galeria",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Tytuł", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Adres galerii",
      description: "Kliknij Generate po wpisaniu tytułu.",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "date", title: "Data wydarzenia", type: "date", validation: (rule) => rule.required() }),
    defineField({ name: "location", title: "Miejsce", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Opis galerii", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "credit", title: "Autor zdjęć", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "tags",
      title: "Tagi",
      description: "Opcjonalnie, np. koncert, warsztaty, wyjazd.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "featured",
      title: "Wyróżnij na stronie głównej",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "coverFocus",
      title: "Kadr okładki",
      description: "Opcjonalna pozycja CSS, np. 50% 35%. Zwykle zostaw puste.",
      type: "string",
    }),
    defineField({
      name: "images",
      title: "Zdjęcia",
      description: "Pierwsze zdjęcie jest okładką. Przeciągnij zdjęcia, aby zmienić okładkę lub kolejność.",
      type: "array",
      of: [defineArrayMember({ type: "galleryPhoto" })],
      options: { layout: "grid" },
      validation: (rule) => rule.required().min(1).error("Dodaj co najmniej jedno zdjęcie."),
    }),
  ],
  orderings: [
    { title: "Najnowsze wydarzenia", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
    { title: "Najstarsze wydarzenia", name: "dateAsc", by: [{ field: "date", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", date: "date", location: "location", media: "images.0" },
    prepare: ({ title, date, location, media }) => ({
      title,
      subtitle: [date, location].filter(Boolean).join(" · "),
      media,
    }),
  },
});

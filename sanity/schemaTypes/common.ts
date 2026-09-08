import { defineField, defineType } from "sanity";

export const cmsImage = defineType({
  name: "cmsImage",
  title: "Zdjęcie",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Opis alternatywny",
      description: "Krótko opisz, co widać na zdjęciu. Ten tekst jest ważny dla dostępności strony.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});

export const textItem = defineType({
  name: "textItem",
  title: "Element tekstowy",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Tytuł", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "text", title: "Opis", type: "text", rows: 3, validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "title", subtitle: "text" } },
});

export const iconTextItem = defineType({
  name: "iconTextItem",
  title: "Element z ikoną",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Ikona",
      type: "string",
      options: {
        list: [
          { title: "Kalendarz", value: "calendar" },
          { title: "Potwierdzenie", value: "check" },
          { title: "Zegar", value: "clock" },
          { title: "Lokalizacja", value: "location" },
          { title: "Grupa", value: "people" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", title: "Tytuł", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "text", title: "Opis", type: "text", rows: 3, validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "title", subtitle: "text" } },
});

export const factItem = defineType({
  name: "factItem",
  title: "Fakt / liczba",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Wartość", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "label", title: "Opis", type: "string", validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});

export const audiencePath = defineType({
  name: "audiencePath",
  title: "Ścieżka wyboru",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Mały nagłówek", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "title", title: "Tytuł", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "text", title: "Doprecyzowanie", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "href",
      title: "Docelowa grupa",
      type: "string",
      options: {
        list: [
          { title: "Chór", value: "#chor" },
          { title: "Balet", value: "#balet" },
          { title: "Dzieci 1", value: "#grupa-1" },
          { title: "Dzieci 2", value: "#grupa-2" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "eyebrow" } },
});

export const recruitmentGroup = defineType({
  name: "recruitmentGroup",
  title: "Grupa zespołu",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "Identyfikator techniczny",
      type: "string",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "name", title: "Nazwa grupy", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "meta", title: "Wiek i rodzaj zajęć", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "schedule", title: "Stały termin", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Opis", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "statusLabel", title: "Status naboru", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "image", title: "Zdjęcie", type: "cmsImage" }),
  ],
  preview: { select: { title: "name", subtitle: "meta", media: "image" } },
});

export const suiteItem = defineType({
  name: "suiteItem",
  title: "Suita",
  type: "object",
  fields: [
    defineField({ name: "id", title: "Identyfikator techniczny", type: "string", readOnly: true, validation: (rule) => rule.required() }),
    defineField({ name: "name", title: "Nazwa", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "label", title: "Etykieta", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Opis", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "image", title: "Zdjęcie", type: "cmsImage" }),
  ],
  preview: { select: { title: "name", subtitle: "label", media: "image" } },
});


import { defineArrayMember, defineField, defineType } from "sanity";
import { longText, metadataFields, shortText } from "./fieldHelpers";

export const costumeLook = defineType({
  name: "costumeLook",
  title: "Kostium regionalny",
  type: "object",
  fields: [
    shortText("title", "Nazwa"), shortText("eyebrow", "Region"), longText("description", "Opis", 4),
    shortText("galleryKey", "Klucz galerii"),
    defineField({ name: "genders", title: "Dostępne wersje", type: "array", of: [defineArrayMember({ type: "string" })], options: { list: [{ title: "Damska", value: "female" }, { title: "Męska", value: "male" }] } }),
    defineField({ name: "images", title: "Klucze zdjęć", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "femaleImages", title: "Zdjęcia damskie", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "maleImages", title: "Zdjęcia męskie", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "details", title: "Najważniejsze detale", type: "array", of: [defineArrayMember({ type: "string" })] }),
  ],
  preview: { select: { title: "title", subtitle: "eyebrow" } },
});

export const costumeFact = defineType({
  name: "costumeFact",
  title: "Detal kostiumu",
  type: "object",
  fields: [
    shortText("image", "Klucz zdjęcia"), shortText("title", "Nazwa"), shortText("region", "Region"), longText("description", "Opis", 4),
    shortText("sourceLabel", "Nazwa źródła"), shortText("sourceUrl", "Adres źródła"),
  ],
  preview: { select: { title: "title", subtitle: "region" } },
});

export const costumesPage = defineType({
  name: "costumesPage",
  title: "Kostiumy",
  type: "document",
  groups: [
    { name: "meta", title: "SEO" }, { name: "hero", title: "Pierwszy ekran", default: true },
    { name: "intro", title: "Wprowadzenie" }, { name: "catalogue", title: "Katalog" }, { name: "details", title: "Detale" },
  ],
  fields: [
    defineField({ name: "meta", title: "SEO", type: "object", group: "meta", fields: metadataFields }),
    defineField({ name: "hero", title: "Pierwszy ekran", type: "object", group: "hero", fields: [
      shortText("eyebrow", "Mały nagłówek"), shortText("title", "Tytuł"), shortText("titleAccent", "Wyróżniony tytuł"), longText("lead", "Opis"),
      shortText("primaryCta", "Główny przycisk"), shortText("secondaryCta", "Drugi przycisk"), shortText("imageAlt", "Opis zdjęcia"),
    ] }),
    defineField({ name: "intro", title: "Wprowadzenie", type: "object", group: "intro", fields: [
      shortText("title", "Tytuł"), shortText("titleAccent", "Wyróżniony tytuł"), longText("text", "Opis"),
      shortText("layerTitle", "Warstwy — tytuł"), shortText("layerText", "Warstwy — opis"),
      shortText("colorTitle", "Kolor — tytuł"), shortText("colorText", "Kolor — opis"),
      shortText("motionTitle", "Ruch — tytuł"), shortText("motionText", "Ruch — opis"),
    ] }),
    defineField({ name: "catalogue", title: "Katalog", type: "object", group: "catalogue", fields: [
      shortText("eyebrow", "Mały nagłówek"), shortText("title", "Tytuł"), longText("lead", "Opis"), shortText("female", "Zakładka damska"), shortText("male", "Zakładka męska"), shortText("open", "Tekst otwarcia prezentacji"),
      shortText("typeLabel", "Etykieta rodzaju stroju"), shortText("categoriesLabel", "Opis kategorii dla czytników"),
    ] }),
    defineField({ name: "modal", title: "Okno prezentacji", type: "object", group: "catalogue", fields: [
      shortText("female", "Wersja damska"), shortText("male", "Wersja męska"), shortText("close", "Zamknij"), shortText("previous", "Poprzednie zdjęcie"), shortText("next", "Następne zdjęcie"),
      shortText("versionLabel", "Etykieta wersji stroju"), shortText("photosLabel", "Etykieta liczby zdjęć"), shortText("showPhoto", "Pokaż zdjęcie"),
    ] }),
    defineField({ name: "costumeLooks", title: "Kostiumy regionalne", type: "array", group: "catalogue", of: [defineArrayMember({ type: "costumeLook" })] }),
    defineField({ name: "details", title: "Sekcja detali", type: "object", group: "details", fields: [shortText("title", "Tytuł")] }),
    defineField({ name: "costumeFacts", title: "Detale kostiumów", type: "array", group: "details", of: [defineArrayMember({ type: "costumeFact" })] }),
  ],
  preview: { prepare: () => ({ title: "Kostiumy", subtitle: "/kostiumy" }) },
});

import { defineField, defineType } from "sanity";
import { longText, metadataFields, shortText } from "./fieldHelpers";

export const homePage = defineType({
  name: "homePage",
  title: "Strona główna",
  type: "document",
  groups: [
    { name: "meta", title: "SEO" },
    { name: "hero", title: "Pierwszy ekran", default: true },
    { name: "join", title: "Dołącz" },
    { name: "events", title: "Wydarzenia" },
    { name: "gallery", title: "Galeria" },
    { name: "offer", title: "Zaproś Halkę" },
    { name: "history", title: "Historia" },
    { name: "costumes", title: "Kostiumy" },
    { name: "contact", title: "Kontakt" },
  ],
  fields: [
    defineField({ name: "meta", title: "SEO", type: "object", group: "meta", fields: metadataFields }),
    shortText("skipLabel", "Tekst odnośnika „Przejdź do treści”"),
    defineField({ name: "hero", title: "Pierwszy ekran", type: "object", group: "hero", fields: [
      shortText("eyebrow", "Mały nagłówek"), shortText("title", "Tytuł"), shortText("titleAccent", "Wyróżniona część tytułu"),
      longText("lead", "Opis"), shortText("primaryCta", "Główny przycisk"), shortText("secondaryCta", "Drugi przycisk"),
      shortText("proofLabel", "Opis listy faktów dla czytników"), shortText("ariaLabel", "Opis sekcji dla czytników"),
      shortText("proof1Title", "Fakt 1 — nazwa"), shortText("proof1Value", "Fakt 1 — wartość"),
      shortText("proof2Title", "Fakt 2 — nazwa"), shortText("proof2Value", "Fakt 2 — wartość"),
      shortText("proof3Title", "Fakt 3 — nazwa"), shortText("proof3Value", "Fakt 3 — wartość"),
      shortText("imageAlt", "Opis zdjęcia"), shortText("imageLabel", "Etykieta zdjęcia"), shortText("imageCaption", "Podpis zdjęcia"),
    ] }),
    defineField({ name: "join", title: "Dołącz", type: "object", group: "join", fields: [
      shortText("eyebrow", "Mały nagłówek"), shortText("title", "Tytuł"), shortText("titleAccent", "Wyróżniony tytuł"),
      shortText("signalLabel", "Opis grup dla czytników"),
      shortText("groupWord", "Hasło: grupy"), shortText("teamWord", "Hasło: zespół"),
      shortText("fact1", "Informacja 1"), shortText("fact2", "Informacja 2"), shortText("fact3", "Informacja 3"), shortText("groupCta", "Odnośnik do grupy"),
    ] }),
    defineField({ name: "events", title: "Wydarzenia", type: "object", group: "events", fields: [
      shortText("eyebrow", "Mały nagłówek"), shortText("title", "Tytuł"), shortText("cta", "Odnośnik"), longText("empty", "Komunikat bez wydarzeń", 2),
      shortText("monthShort", "Skróty miesięcy", "Rozdziel skróty znakiem |, np. STY|LUT|MAR"),
    ] }),
    defineField({ name: "gallery", title: "Galeria", type: "object", group: "gallery", fields: [
      shortText("eyebrow", "Mały nagłówek"), shortText("title", "Tytuł"), shortText("titleAccent", "Wyróżniony tytuł"),
      longText("lead", "Opis"), shortText("albumCtaLabel", "Odnośnik do albumu"), shortText("eventLabel", "Etykieta wydarzenia"),
      shortText("railLabel", "Opis przewijanej galerii"), shortText("controlsLabel", "Opis przycisków galerii"),
      shortText("previous", "Poprzednie wydarzenie"), shortText("next", "Następne wydarzenie"),
    ] }),
    defineField({ name: "offer", title: "Zaproś Halkę", type: "object", group: "offer", fields: [
      shortText("eyebrow", "Mały nagłówek"), shortText("title", "Tytuł"), longText("lead", "Opis"), shortText("primaryCta", "Główny przycisk"),
      shortText("secondaryCta", "Odnośnik e-mail"), shortText("emailSubject", "Temat wiadomości"), shortText("imageAlt", "Opis zdjęcia"),
    ] }),
    defineField({ name: "history", title: "Historia", type: "object", group: "history", fields: [
      shortText("eyebrow", "Mały nagłówek"), shortText("start", "Rok początkowy"), shortText("now", "Etykieta teraz"),
      shortText("title", "Tytuł"), shortText("titleAccent", "Wyróżniony tytuł"), longText("lead", "Opis"),
      shortText("fact1Value", "Fakt 1 — wartość"), shortText("fact1Label", "Fakt 1 — opis"),
      shortText("fact2Value", "Fakt 2 — wartość"), shortText("fact2Label", "Fakt 2 — opis"),
      shortText("factsLabel", "Opis faktów dla czytników"), shortText("visualLabel", "Opis zdjęć dla czytników"),
      shortText("oldImageAlt", "Stare zdjęcie — opis"), shortText("oldImageLabel", "Stare zdjęcie — etykieta"), shortText("oldImageCaption", "Stare zdjęcie — podpis"),
      shortText("nowImageAlt", "Nowe zdjęcie — opis"), shortText("nowImageCaption", "Nowe zdjęcie — podpis"),
    ] }),
    defineField({ name: "costumes", title: "Kostiumy", type: "object", group: "costumes", fields: [
      shortText("eyebrow", "Mały nagłówek"), shortText("title", "Tytuł"), shortText("titleAccent", "Wyróżniony tytuł"), longText("lead", "Opis"), shortText("cta", "Przycisk"),
      shortText("mosaicLabel", "Opis mozaiki dla czytników"),
      ...Array.from({ length: 5 }, (_, index) => [
        shortText(`tile${index + 1}Alt`, `Detal ${index + 1} — opis zdjęcia`),
        shortText(`tile${index + 1}Caption`, `Detal ${index + 1} — podpis`),
      ]).flat(),
    ] }),
    defineField({ name: "contact", title: "Kontakt", type: "object", group: "contact", fields: [
      shortText("eyebrow", "Mały nagłówek"), shortText("title", "Tytuł"), longText("lead", "Opis"),
      shortText("emailLabel", "Etykieta e-mail"), shortText("phoneLabel", "Etykieta telefonu"), shortText("addressLabel", "Etykieta adresu"),
      shortText("krsLabel", "Etykieta KRS"), shortText("nipLabel", "Etykieta NIP"),
    ] }),
    defineField({ name: "social", title: "Media społecznościowe", type: "object", group: "contact", fields: [
      shortText("title", "Tytuł"), longText("lead", "Opis"),
      shortText("facebookTitle", "Facebook — tytuł"), shortText("facebookText", "Facebook — opis"),
      shortText("instagramTitle", "Instagram — tytuł"), shortText("instagramText", "Instagram — opis"),
      shortText("youtubeTitle", "YouTube — tytuł"), shortText("youtubeText", "YouTube — opis"),
      shortText("hint", "Podpowiedź"), shortText("ariaLabel", "Opis sekcji dla czytników"),
    ] }),
  ],
  preview: { prepare: () => ({ title: "Strona główna", subtitle: "/" }) },
});

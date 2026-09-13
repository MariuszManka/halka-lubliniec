import { defineField, defineType } from "sanity";
import { longText, metadataFields, shortText } from "./fieldHelpers";

export const eventsPage = defineType({
  name: "eventsPage",
  title: "Wydarzenia",
  type: "document",
  groups: [
    { name: "meta", title: "SEO" }, { name: "hero", title: "Pierwszy ekran", default: true },
    { name: "upcoming", title: "Najbliższe" }, { name: "calendar", title: "Kalendarz" },
    { name: "practices", title: "Próby" }, { name: "cta", title: "Zaproś Halkę" },
  ],
  fields: [
    defineField({ name: "meta", title: "SEO", type: "object", group: "meta", fields: metadataFields }),
    shortText("skipLabel", "Tekst odnośnika „Przejdź do treści”"),
    shortText("timeUnknown", "Komunikat o nieznanej godzinie"),
    defineField({ name: "hero", title: "Pierwszy ekran", type: "object", group: "hero", fields: [
      shortText("eyebrow", "Mały nagłówek"), shortText("title", "Tytuł"), shortText("titleAccent", "Wyróżniony tytuł"), longText("lead", "Opis"),
      shortText("primaryCta", "Główny przycisk"), shortText("secondaryCta", "Drugi przycisk"), shortText("imageAlt", "Opis zdjęcia"),
    ] }),
    defineField({ name: "upcoming", title: "Najbliższe", type: "object", group: "upcoming", fields: [
      shortText("eyebrow", "Mały nagłówek"), shortText("title", "Tytuł"), shortText("emptyTitle", "Brak wydarzeń — tytuł"), longText("emptyText", "Brak wydarzeń — opis", 2),
    ] }),
    defineField({ name: "calendar", title: "Kalendarz", type: "object", group: "calendar", fields: [
      shortText("eyebrow", "Mały nagłówek"), shortText("title", "Tytuł"), longText("lead", "Opis"), longText("empty", "Komunikat pustego miesiąca", 2),
      shortText("months", "Nazwy miesięcy", "Rozdziel nazwy znakiem |"), shortText("weekdays", "Skróty dni tygodnia", "Rozdziel skróty znakiem |"),
      shortText("selectMonthLabel", "Opis wyboru miesiąca"), shortText("performingGroupsLabel", "Etykieta występujących grup"),
      longText("practiceNote", "Informacja o próbach", 2),
    ] }),
    defineField({ name: "archive", title: "Archiwum", type: "object", group: "calendar", fields: [
      shortText("label", "Etykieta roku"), shortText("title", "Tytuł"), shortText("action", "Przycisk"),
    ] }),
    defineField({ name: "practices", title: "Próby", type: "object", group: "practices", fields: [
      shortText("eyebrow", "Mały nagłówek"), shortText("title", "Tytuł"), longText("lead", "Opis"), shortText("mapCta", "Odnośnik do mapy"), shortText("groupCta", "Odnośnik do grupy"),
    ] }),
    defineField({ name: "cta", title: "Zaproś Halkę", type: "object", group: "cta", fields: [
      shortText("eyebrow", "Mały nagłówek"), shortText("title", "Tytuł"), shortText("label", "Przycisk"),
    ] }),
  ],
  preview: { prepare: () => ({ title: "Wydarzenia", subtitle: "/wydarzenia" }) },
});

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "bj1fbyz1";
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const singletonTypes = new Set(["homePage", "joinPage", "invitePage", "eventsPage", "galleryPage", "costumesPage"]);

export default defineConfig({
  name: "halka",
  title: "Halka — panel treści",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Treści strony")
          .items([
            S.listItem().title("Strona główna").id("homePage").child(S.document().schemaType("homePage").documentId("homePage")),
            S.listItem()
              .title("Dołącz do Halki")
              .id("joinPage")
              .child(S.document().schemaType("joinPage").documentId("joinPage")),
            S.listItem()
              .title("Zaproś Halkę")
              .id("invitePage")
              .child(S.document().schemaType("invitePage").documentId("invitePage")),
            S.listItem().title("Wydarzenia").id("eventsPage").child(S.document().schemaType("eventsPage").documentId("eventsPage")),
            S.listItem()
              .title("Galeria")
              .id("galleryPage")
              .child(S.document().schemaType("galleryPage").documentId("galleryPage")),
            S.listItem()
              .title("Galerie")
              .id("galleryAlbums")
              .child(
                S.documentTypeList("galleryAlbum")
                  .title("Galerie")
                  .defaultOrdering([{ field: "date", direction: "desc" }]),
              ),
            S.listItem().title("Kostiumy").id("costumesPage").child(S.document().schemaType("costumesPage").documentId("costumesPage")),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
  document: {
    actions: (previous, context) => singletonTypes.has(context.schemaType)
      ? previous.filter((action) => action.action !== "duplicate" && action.action !== "delete")
      : previous,
  },
});


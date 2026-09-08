import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "bj1fbyz1";
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const singletonTypes = new Set(["joinPage", "invitePage", "galleryPage"]);

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
            S.listItem()
              .title("Dołącz do Halki")
              .id("joinPage")
              .child(S.document().schemaType("joinPage").documentId("joinPage")),
            S.listItem()
              .title("Zaproś Halkę")
              .id("invitePage")
              .child(S.document().schemaType("invitePage").documentId("invitePage")),
            S.divider(),
            S.listItem()
              .title("Teksty galerii")
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


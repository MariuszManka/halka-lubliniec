import { createHash } from "node:crypto";
import { getCliClient } from "sanity/cli";
import { costumeFacts, costumeLooks } from "../content/costumes";
import {
  costumesCopyDefaults,
  eventsCopyDefaults,
  galleryUiCopyDefaults,
  homeCopyDefaults,
  inviteUiCopyDefaults,
  joinUiCopyDefaults,
  type CopyMap,
} from "../content/page-copy-defaults";

const client = getCliClient({ apiVersion: "2026-08-26" });
const keyFor = (value: string) => createHash("sha1").update(value).digest("hex").slice(0, 20);

async function replaceDocumentType(document: Record<string, unknown> & { _id: string; _type: string }) {
  const currentType = await client.fetch<string | null>(`*[_id == $documentId][0]._type`, { documentId: document._id });
  if (currentType === document._type) return;
  if (currentType && currentType !== document._type) await client.delete(document._id);
  await client.createOrReplace(document);
}

function unflatten(copy: CopyMap): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [path, value] of Object.entries(copy)) {
    const parts = path.split(".");
    let target = result;
    parts.forEach((part, index) => {
      if (index === parts.length - 1) target[part] = value;
      else target = (target[part] ??= {}) as Record<string, unknown>;
    });
  }
  return result;
}

async function formerCopy(documentId: string, fallback: CopyMap): Promise<CopyMap> {
  const entries = await client.fetch<Array<{ key: string; value: string }> | null>(
    `*[_type == "pageCopy" && _id == $documentId][0].entries[]{key,value}`,
    { documentId },
  );
  const allowedKeys = new Set(Object.keys(fallback));
  return {
    ...fallback,
    ...Object.fromEntries((entries ?? []).filter(({ key }) => allowedKeys.has(key)).map(({ key, value }) => [key, value])),
  };
}

const [homeCopy, eventsCopy, costumesCopy, joinCopy, inviteCopy, galleryCopy] = await Promise.all([
  formerCopy("homePage", homeCopyDefaults),
  formerCopy("eventsPage", eventsCopyDefaults),
  formerCopy("costumesPage", costumesCopyDefaults),
  formerCopy("joinUi", joinUiCopyDefaults),
  formerCopy("inviteUi", inviteUiCopyDefaults),
  formerCopy("galleryUi", galleryUiCopyDefaults),
]);

await replaceDocumentType({ _id: "homePage", _type: "homePage", ...unflatten(homeCopy) });
await client.patch("homePage").setIfMissing({
  "gallery.eyebrow": homeCopy["gallery.eyebrow"],
  "gallery.title": homeCopy["gallery.title"],
  "gallery.titleAccent": homeCopy["gallery.titleAccent"],
  "gallery.lead": homeCopy["gallery.lead"],
  "gallery.albumCtaLabel": homeCopy["gallery.albumCtaLabel"],
  "gallery.eventLabel": homeCopy["gallery.eventLabel"],
}).commit();
await replaceDocumentType({ _id: "eventsPage", _type: "eventsPage", ...unflatten(eventsCopy) });
await replaceDocumentType({
  _id: "costumesPage",
  _type: "costumesPage",
  ...unflatten(costumesCopy),
  costumeLooks: costumeLooks.map((look, index) => ({
    ...look,
    _type: "costumeLook",
    _key: keyFor(`costume-look-${look.galleryKey}-${index}`),
  })),
  costumeFacts: costumeFacts.map((fact, index) => ({
    ...fact,
    _type: "costumeFact",
    _key: keyFor(`costume-fact-${fact.image}-${index}`),
  })),
});
await Promise.all([
  client.patch("eventsPage").unset(["content"]).commit(),
  client.patch("costumesPage").unset(["content"]).commit(),
]);

await client.patch("joinPage").setIfMissing({
  meta: { title: joinCopy["meta.title"], description: joinCopy["meta.description"] },
  "hero.accessibilityLabel": joinCopy["hero.noteLabel"],
  "groups.scheduleFixedLabel": joinCopy["schedule.fixed"],
  "groups.nextPracticesLabel": joinCopy["schedule.next"],
  "groups.locationLabel": joinCopy["schedule.location"],
  "location.mapTitle": joinCopy["map.title"],
}).unset(["how", "groups.paths", "hero.imageLabel", "hero.imageMeta"]).commit();

await client.patch("invitePage").setIfMissing({
  meta: { title: inviteCopy["meta.title"], description: inviteCopy["meta.description"] },
  skipLabel: inviteCopy["skipLabel"],
  "hero.title": inviteCopy["hero.title"],
  "hero.titleAccent": inviteCopy["hero.titleAccent"],
  "hero.primaryCtaLabel": inviteCopy["hero.primaryCta"],
  "hero.phoneLabel": inviteCopy["hero.phoneLabel"],
  "hero.noteText": inviteCopy["hero.note"],
  "hero.noteLabel": inviteCopy["hero.noteLabel"],
  "hero.fact1Title": inviteCopy["hero.fact1Title"],
  "hero.fact1Text": inviteCopy["hero.fact1Text"],
  "hero.fact2Title": inviteCopy["hero.fact2Title"],
  "hero.fact2Text": inviteCopy["hero.fact2Text"],
  "hero.fact3Title": inviteCopy["hero.fact3Title"],
  "hero.fact3Text": inviteCopy["hero.fact3Text"],
  "formats.title": inviteCopy["formats.title"],
  "formats.titleAccent": inviteCopy["formats.titleAccent"],
  "suites.title": inviteCopy["suites.title"],
  "suites.titleAccent": inviteCopy["suites.titleAccent"],
  "process.eyebrow": inviteCopy["process.eyebrow"],
  "process.title": inviteCopy["process.title"],
  "contact.title": inviteCopy["contact.title"],
  "contact.titleAccent": inviteCopy["contact.titleAccent"],
  "contact.emailLabel": inviteCopy["contact.emailLabel"],
  "contact.phoneLabel": inviteCopy["contact.phoneLabel"],
  "contact.messengerLabel": inviteCopy["social.messengerLabel"],
  "contact.instagramLabel": inviteCopy["social.instagramLabel"],
  booking: { subject: inviteCopy["booking.subject"], body: inviteCopy["booking.body"] },
}).unset(["stage", "hero.titleSuffix", "hero.secondaryCtaLabel", "hero.imageAlt", "formats.imageAlts", "process.activeImageAlt"]).commit();

await client.patch("galleryPage").setIfMissing({
  meta: { title: galleryCopy["meta.title"], description: galleryCopy["meta.description"] },
  ui: {
    resultsOne: galleryCopy["results.one"], resultsMany: galleryCopy["results.many"],
    cardCta: galleryCopy["card.cta"], cardOpenLabel: galleryCopy["card.openLabel"],
    close: galleryCopy["lightbox.close"], previous: galleryCopy["lightbox.previous"], next: galleryCopy["lightbox.next"],
    place: galleryCopy["lightbox.place"], photos: galleryCopy["lightbox.photos"], author: galleryCopy["lightbox.author"],
    hint: galleryCopy["lightbox.hint"], filterLabel: galleryCopy["filter.label"], choosePhoto: galleryCopy["lightbox.choosePhoto"],
  },
}).unset(["return", "hero.imageLabel", "hero.imageCaption", "home"]).commit();

const obsoleteIds = await client.fetch<string[]>(
  `*[_type == "pageCopy"]._id`,
);
for (const documentId of obsoleteIds) await client.delete(documentId);

console.log("Zapisano 6 prostych dokumentów podstron i zachowano dokumenty Galerie.");
console.log(`Usunięto ${obsoleteIds.length} nieużywanych dokumentów pomocniczych.`);
console.log("Historia pozostała bez dokumentu. Wydarzenia zawierają wyłącznie teksty interfejsu.");

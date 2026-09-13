import defaults from "../content/cms-defaults.json";
import galleryPageDefaults from "../content/gallery-page-defaults.json";
import { galleryEvents as localGalleryEvents } from "../content/generated-gallery";
import { calendarEvents, eventGroups } from "../content/events";
import { costumeFacts, costumeLooks } from "../content/costumes";
import { timeline } from "../content/site-content";
import {
  costumesCopyDefaults,
  eventsCopyDefaults,
  galleryUiCopyDefaults,
  historyCopyDefaults,
  homeCopyDefaults,
  inviteUiCopyDefaults,
  joinUiCopyDefaults,
  heroVariantsCopyDefaults,
  sharedContentDefaults,
  type CopyMap,
} from "../content/page-copy-defaults";
import type { GalleryEvent, GalleryPageContent, InvitePageContent, JoinPageContent } from "./content-types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "bj1fbyz1";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-26";
const sanityRequired = process.env.SANITY_REQUIRED === "true";
const buildFetchTag = `site-build-${(process.env.GITHUB_SHA || process.env.CF_PAGES_COMMIT_SHA || Date.now().toString()).slice(0, 24)}`;

const imageProjection = `{
  "src": asset->url,
  "alt": coalesce(alt, ""),
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`;

const joinPageQuery = `*[_type == "joinPage" && _id == "joinPage"][0]{
  meta,
  hero{..., "image": image${imageProjection}},
  groups{..., items[]{..., "image": image${imageProjection}}},
  firstVisit,
  location
}`;

const invitePageQuery = `*[_type == "invitePage" && _id == "invitePage"][0]{
  meta,
  hero{..., "image": image${imageProjection}},
  formats{..., items[]{..., "image": image${imageProjection}}},
  suites{..., items[]{..., "image": image${imageProjection}}},
  process{..., "image": image${imageProjection}},
  contact,
  booking
}`;

const galleryPageQuery = `*[_type == "galleryPage" && _id == "galleryPage"][0]{
  ...,
  hero{..., "image": image${imageProjection}}
}`;

const galleryAlbumsQuery = `*[_type == "galleryAlbum" && defined(slug.current) && count(images) > 0] | order(date desc){
  "id": slug.current,
  "year": date,
  "pinned": coalesce(featured, false),
  title,
  date,
  location,
  description,
  credit,
  "tags": coalesce(tags, []),
  coverFocus,
  "images": images[]{
    "src": asset->url + "?auto=format&fit=max&w=2200&q=82",
    "alt": coalesce(alt, ^.title),
    caption,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  }
}`;

function unflattenStrings(copy: CopyMap): Record<string, unknown> {
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

function flattenStrings(value: unknown, prefix = ""): CopyMap {
  const result: CopyMap = {};
  const visit = (current: unknown, path: string) => {
    if (typeof current === "string") result[path] = current;
    else if (current && typeof current === "object" && !Array.isArray(current)) {
      Object.entries(current).forEach(([key, nested]) => visit(nested, path ? `${path}.${key}` : key));
    }
  };
  visit(value, prefix);
  return result;
}

async function fetchSingleton<T>(documentId: string): Promise<T | null> {
  return fetchSanityDocument<T>(`*[_id == ${JSON.stringify(documentId)}][0]`);
}

function mergeContent<T>(fallback: T, incoming: unknown): T {
  if (incoming === undefined || incoming === null || incoming === "") return fallback;

  if (Array.isArray(fallback)) {
    if (!Array.isArray(incoming) || incoming.length === 0) return fallback;
    return incoming.map((item, index) => {
      const keyedFallback = typeof item === "object" && item !== null && "id" in item
        ? fallback.find((candidate) => typeof candidate === "object" && candidate !== null && "id" in candidate && candidate.id === item.id)
        : undefined;
      return mergeContent(keyedFallback ?? fallback[index] ?? {}, item);
    }) as T;
  }

  if (typeof fallback === "object" && fallback !== null && typeof incoming === "object" && incoming !== null) {
    const result: Record<string, unknown> = { ...(fallback as Record<string, unknown>) };
    for (const [key, value] of Object.entries(incoming as Record<string, unknown>)) {
      const fallbackValue = result[key];
      result[key] = fallbackValue === undefined ? value : mergeContent(fallbackValue, value);
    }
    return result as T;
  }

  return incoming as T;
}

async function fetchSanityDocument<T>(query: string): Promise<T | null> {
  if (!projectId) {
    if (sanityRequired) {
      throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required for the Firebase production build.");
    }
    return null;
  }

  try {
    const endpoint = new URL(`https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`);
    endpoint.searchParams.set("query", query);
    // A unique request tag keeps each static deployment fresh while still allowing
    // Next.js to finish a fully static export.
    endpoint.searchParams.set("tag", buildFetchTag);
    const response = await fetch(endpoint, { cache: "force-cache", headers: { Accept: "application/json" } });
    if (!response.ok) {
      throw new Error(`Sanity request failed with status ${response.status}.`);
    }
    const payload = await response.json() as { result?: T | null };
    if (payload.result == null && sanityRequired) {
      throw new Error("Sanity returned no published document for a required production page.");
    }
    return payload.result ?? null;
  } catch (error) {
    if (sanityRequired) throw error;
    console.warn("Sanity content unavailable; using local fallback.", error);
    return null;
  }
}

export async function getJoinPageContent(): Promise<JoinPageContent> {
  const fallback = mergeContent(defaults.joinPage, {
    meta: { title: joinUiCopyDefaults["meta.title"], description: joinUiCopyDefaults["meta.description"] },
    hero: { accessibilityLabel: joinUiCopyDefaults["hero.noteLabel"] },
    groups: {
      scheduleFixedLabel: joinUiCopyDefaults["schedule.fixed"],
      nextPracticesLabel: joinUiCopyDefaults["schedule.next"],
      locationLabel: joinUiCopyDefaults["schedule.location"],
    },
    location: { mapTitle: joinUiCopyDefaults["map.title"] },
  }) as JoinPageContent;
  const content = mergeContent(fallback, await fetchSanityDocument<Partial<JoinPageContent>>(joinPageQuery));
  // Keep legacy CMS names consistent with the current public group names.
  content.groups.items = content.groups.items.map((group) => ({
    ...group,
    name: group.name.replace(/^Grupa ([12])$/i, "Dzieci $1"),
  }));
  return content;
}

export async function getInvitePageContent(): Promise<InvitePageContent> {
  const fallback = mergeContent(defaults.invitePage, {
    meta: { title: inviteUiCopyDefaults["meta.title"], description: inviteUiCopyDefaults["meta.description"] },
    skipLabel: inviteUiCopyDefaults["skipLabel"],
    hero: {
      title: inviteUiCopyDefaults["hero.title"], titleAccent: inviteUiCopyDefaults["hero.titleAccent"],
      primaryCtaLabel: inviteUiCopyDefaults["hero.primaryCta"], phoneLabel: inviteUiCopyDefaults["hero.phoneLabel"],
      image: { src: "/invite/invite-header-image2.webp", alt: inviteUiCopyDefaults["hero.imageAlt"], width: 2500, height: 1667 },
      noteText: inviteUiCopyDefaults["hero.note"], noteLabel: inviteUiCopyDefaults["hero.noteLabel"],
      fact1Title: inviteUiCopyDefaults["hero.fact1Title"], fact1Text: inviteUiCopyDefaults["hero.fact1Text"],
      fact2Title: inviteUiCopyDefaults["hero.fact2Title"], fact2Text: inviteUiCopyDefaults["hero.fact2Text"],
      fact3Title: inviteUiCopyDefaults["hero.fact3Title"], fact3Text: inviteUiCopyDefaults["hero.fact3Text"],
    },
    formats: {
      title: inviteUiCopyDefaults["formats.title"], titleAccent: inviteUiCopyDefaults["formats.titleAccent"],
      items: defaults.invitePage.formats.items.map((item, index) => ({ ...item, image: [
        { src: "/gallery/dni-lublinca-2025/08.webp", alt: inviteUiCopyDefaults["formats.image1Alt"] },
        { src: "/gallery/tydzien-kultury-beskidzkiej-2026/10.webp", alt: inviteUiCopyDefaults["formats.image2Alt"] },
        { src: "/gallery/dni-lublinca-2025/14.webp", alt: inviteUiCopyDefaults["formats.image3Alt"] },
      ][index] })),
    },
    suites: { title: inviteUiCopyDefaults["suites.title"], titleAccent: inviteUiCopyDefaults["suites.titleAccent"] },
    process: {
      eyebrow: inviteUiCopyDefaults["process.eyebrow"], title: inviteUiCopyDefaults["process.title"],
      image: { src: "/session/modal-cieszyn-male-02.webp", alt: inviteUiCopyDefaults["process.imageAlt"], width: 1800, height: 1198 },
    },
    contact: {
      title: inviteUiCopyDefaults["contact.title"], titleAccent: inviteUiCopyDefaults["contact.titleAccent"],
      emailLabel: inviteUiCopyDefaults["contact.emailLabel"], phoneLabel: inviteUiCopyDefaults["contact.phoneLabel"],
      messengerLabel: inviteUiCopyDefaults["social.messengerLabel"], instagramLabel: inviteUiCopyDefaults["social.instagramLabel"],
    },
    booking: { subject: inviteUiCopyDefaults["booking.subject"], body: inviteUiCopyDefaults["booking.body"] },
  }) as unknown as InvitePageContent;
  return mergeContent(fallback, await fetchSanityDocument<Partial<InvitePageContent>>(invitePageQuery));
}

export async function getGalleryPageContent(): Promise<GalleryPageContent> {
  const fallback = mergeContent(galleryPageDefaults, {
    meta: { title: galleryUiCopyDefaults["meta.title"], description: galleryUiCopyDefaults["meta.description"] },
    ui: {
      resultsOne: galleryUiCopyDefaults["results.one"], resultsMany: galleryUiCopyDefaults["results.many"],
      cardCta: galleryUiCopyDefaults["card.cta"], cardOpenLabel: galleryUiCopyDefaults["card.openLabel"],
      close: galleryUiCopyDefaults["lightbox.close"], previous: galleryUiCopyDefaults["lightbox.previous"], next: galleryUiCopyDefaults["lightbox.next"],
      place: galleryUiCopyDefaults["lightbox.place"], photos: galleryUiCopyDefaults["lightbox.photos"], author: galleryUiCopyDefaults["lightbox.author"],
      hint: galleryUiCopyDefaults["lightbox.hint"], filterLabel: galleryUiCopyDefaults["filter.label"], choosePhoto: galleryUiCopyDefaults["lightbox.choosePhoto"],
    },
  }) as GalleryPageContent;
  return mergeContent(fallback, await fetchSanityDocument<Partial<GalleryPageContent>>(galleryPageQuery));
}

export async function getGalleryEvents(): Promise<GalleryEvent[]> {
  const incoming = await fetchSanityDocument<Array<Omit<GalleryEvent, "year"> & { year: string }>>(galleryAlbumsQuery);
  if (!incoming?.length) {
    return localGalleryEvents.map((event) => ({ ...event, tags: [], images: event.images.map((image) => ({ ...image })) }));
  }

  return incoming.map((event) => ({
    ...event,
    year: Number(event.year.slice(0, 4)),
  }));
}

export async function getSharedContent() {
  return structuredClone(sharedContentDefaults);
}

export async function getHomePageCopy() {
  const fallback = unflattenStrings(homeCopyDefaults);
  const incoming = await fetchSingleton<Record<string, unknown>>("homePage");
  return flattenStrings(mergeContent(fallback, incoming ?? {}));
}

export async function getHistoryPageContent() {
  return {
    copy: { ...historyCopyDefaults },
    timeline: structuredClone(timeline),
  };
}

export async function getCostumesPageContent() {
  const fallback = {
    ...unflattenStrings(costumesCopyDefaults),
    costumeLooks,
    costumeFacts,
  };
  const incoming = await fetchSingleton<typeof fallback>("costumesPage");
  const content = mergeContent(fallback, incoming ?? {});
  return {
    copy: flattenStrings(content),
    costumeLooks: content.costumeLooks,
    costumeFacts: content.costumeFacts,
  };
}

export async function getEventsPageContent() {
  const fallback = unflattenStrings(eventsCopyDefaults);
  const incoming = await fetchSingleton<Record<string, unknown>>("eventsPage");
  const content = mergeContent(fallback, incoming ?? {});
  return {
    copy: flattenStrings(content),
    calendarEvents: structuredClone(calendarEvents),
    eventGroups,
  };
}

export async function getGalleryUiCopy() {
  const content = await fetchSingleton<GalleryPageContent>("galleryPage");
  const ui = content?.ui;
  return {
    ...galleryUiCopyDefaults,
    ...(content?.meta ? { "meta.title": content.meta.title, "meta.description": content.meta.description } : {}),
    ...(ui ? {
      "results.one": ui.resultsOne, "results.many": ui.resultsMany, "card.cta": ui.cardCta, "card.openLabel": ui.cardOpenLabel,
      "lightbox.close": ui.close, "lightbox.previous": ui.previous, "lightbox.next": ui.next, "lightbox.place": ui.place,
      "lightbox.photos": ui.photos, "lightbox.author": ui.author, "lightbox.hint": ui.hint, "filter.label": ui.filterLabel,
      "lightbox.choosePhoto": ui.choosePhoto,
    } : {}),
  };
}

export async function getJoinUiCopy() {
  const content = await getJoinPageContent();
  return {
    ...joinUiCopyDefaults,
    "meta.title": content.meta.title,
    "meta.description": content.meta.description,
    "schedule.fixed": content.groups.scheduleFixedLabel,
    "schedule.next": content.groups.nextPracticesLabel,
    "schedule.location": content.groups.locationLabel,
    "map.title": content.location.mapTitle,
    "hero.noteLabel": content.hero.accessibilityLabel,
  };
}

export async function getHeroVariantsPageCopy() {
  return { ...heroVariantsCopyDefaults, ...(await getHomePageCopy()) };
}

export type SharedContent = Awaited<ReturnType<typeof getSharedContent>>;
export type HistoryPageCmsContent = Awaited<ReturnType<typeof getHistoryPageContent>>;
export type CostumesPageCmsContent = Awaited<ReturnType<typeof getCostumesPageContent>>;
export type EventsPageCmsContent = Awaited<ReturnType<typeof getEventsPageContent>>;


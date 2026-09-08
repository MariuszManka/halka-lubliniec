import defaults from "../content/cms-defaults.json";
import galleryPageDefaults from "../content/gallery-page-defaults.json";
import { galleryEvents as localGalleryEvents } from "../content/generated-gallery";
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
  hero{..., "image": image${imageProjection}},
  how,
  groups{..., items[]{..., "image": image${imageProjection}}},
  firstVisit,
  location
}`;

const invitePageQuery = `*[_type == "invitePage" && _id == "invitePage"][0]{
  hero{..., "image": image${imageProjection}},
  formats,
  suites{..., items[]{..., "image": image${imageProjection}}},
  process{..., "image": image${imageProjection}},
  stage{..., "image": image${imageProjection}},
  contact
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
  const fallback = defaults.joinPage as JoinPageContent;
  const content = mergeContent(fallback, await fetchSanityDocument<Partial<JoinPageContent>>(joinPageQuery));
  // Keep legacy CMS names consistent with the current public group names.
  content.groups.items = content.groups.items.map((group) => ({
    ...group,
    name: group.name.replace(/^Grupa ([12])$/i, "Dzieci $1"),
  }));
  return content;
}

export async function getInvitePageContent(): Promise<InvitePageContent> {
  const fallback = defaults.invitePage as InvitePageContent;
  return mergeContent(fallback, await fetchSanityDocument<Partial<InvitePageContent>>(invitePageQuery));
}

export async function getGalleryPageContent(): Promise<GalleryPageContent> {
  const fallback = galleryPageDefaults as GalleryPageContent;
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


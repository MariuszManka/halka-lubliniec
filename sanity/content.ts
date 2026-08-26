import defaults from "../content/cms-defaults.json";
import type { InvitePageContent, JoinPageContent } from "./content-types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-26";

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
  if (!projectId) return null;

  try {
    const endpoint = new URL(`https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`);
    endpoint.searchParams.set("query", query);
    const response = await fetch(endpoint, { cache: "no-store", headers: { Accept: "application/json" } });
    if (!response.ok) return null;
    const payload = await response.json() as { result?: T | null };
    return payload.result ?? null;
  } catch {
    return null;
  }
}

export async function getJoinPageContent(): Promise<JoinPageContent> {
  const fallback = defaults.joinPage as JoinPageContent;
  return mergeContent(fallback, await fetchSanityDocument<Partial<JoinPageContent>>(joinPageQuery));
}

export async function getInvitePageContent(): Promise<InvitePageContent> {
  const fallback = defaults.invitePage as InvitePageContent;
  return mergeContent(fallback, await fetchSanityDocument<Partial<InvitePageContent>>(invitePageQuery));
}


type SanityQueryParam = string | number | boolean | null | undefined;

const cmsEnabled = import.meta.env.VITE_ENABLE_CMS === "true";
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID?.trim();
const dataset = import.meta.env.VITE_SANITY_DATASET?.trim();
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION?.trim() || "2025-02-19";
const useCdn = import.meta.env.VITE_SANITY_USE_CDN !== "false";

export const sanityStudioUrl = import.meta.env.VITE_SANITY_STUDIO_URL?.trim();

export function isSanityConfigured() {
  return cmsEnabled && Boolean(projectId && dataset);
}

export async function sanityFetch<T>(
  query: string,
  params: Record<string, SanityQueryParam> = {}
): Promise<T> {
  if (!projectId || !dataset) {
    throw new Error("Sanity environment variables are not configured.");
  }

  const host = useCdn ? "apicdn" : "api";
  const url = new URL(`https://${projectId}.${host}.sanity.io/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set("query", query);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      url.searchParams.set(`$${key}`, JSON.stringify(value));
    }
  }

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Sanity request failed with status ${response.status}`);
  }

  const payload = await response.json() as { result: T };
  return payload.result;
}

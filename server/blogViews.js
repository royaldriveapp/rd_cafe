function parseLegacyViewCount(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return 0;
  }

  const normalized = value.trim().toLowerCase().replace(/views?/g, "").trim();
  const match = normalized.match(/^([\d.]+)\s*([km])?$/);

  if (!match) {
    return Number.parseInt(normalized.replace(/[^\d]/g, ""), 10) || 0;
  }

  const numeric = Number.parseFloat(match[1]);
  if (!Number.isFinite(numeric)) {
    return 0;
  }

  const suffix = match[2];
  if (suffix === "k") return Math.round(numeric * 1000);
  if (suffix === "m") return Math.round(numeric * 1000000);
  return Math.round(numeric);
}

function getServerConfig(overrides = {}) {
  const projectId = overrides.projectId || process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID;
  const dataset = overrides.dataset || process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || "production";
  const apiVersion = overrides.apiVersion || process.env.SANITY_API_VERSION || process.env.VITE_SANITY_API_VERSION || "2025-02-19";
  const token = overrides.token || process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId || !dataset || !token) {
    throw new Error("Sanity server configuration is incomplete. Expected SANITY_PROJECT_ID/SANITY_DATASET and SANITY_API_WRITE_TOKEN.");
  }

  return { projectId, dataset, apiVersion, token };
}

async function sanityRequest(url, init) {
  const response = await fetch(url, init);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Sanity request failed with status ${response.status}: ${message}`);
  }
  return response.json();
}

export async function incrementBlogViewBySlug(slug, overrides = {}) {
  if (!slug) {
    throw new Error("A blog slug is required to increment views.");
  }

  const { projectId, dataset, apiVersion, token } = getServerConfig(overrides);

  const queryUrl = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`);
  queryUrl.searchParams.set(
    "query",
    `*[_type == "blogPost" && slug.current == $slug][0]{_id, views}`
  );
  queryUrl.searchParams.set("$slug", JSON.stringify(slug));

  const queryPayload = await sanityRequest(queryUrl.toString(), {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const post = queryPayload?.result;
  if (!post?._id) {
    throw new Error(`No blog post found for slug "${slug}".`);
  }

  const nextViews = parseLegacyViewCount(post.views) + 1;

  await sanityRequest(`https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      mutations: [
        {
          patch: {
            id: post._id,
            set: { views: nextViews },
          },
        },
      ],
    }),
  });

  return { views: nextViews };
}

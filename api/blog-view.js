import { incrementBlogViewBySlug } from "../server/blogViews.js";
import { validateBlogViewRequest } from "../server/blogViewSecurity.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : req.body || {};

    const slug = body.slug;
    const validation = validateBlogViewRequest(req, slug);
    if (!validation.ok) {
      const status = validation.status ?? 400;
      if (validation.duplicate) {
        res.status(status).json({ duplicate: true });
        return;
      }
      res.status(status).json({ error: validation.error || "Invalid request" });
      return;
    }

    const result = await incrementBlogViewBySlug(slug);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to increment blog views",
    });
  }
}

const VIEW_WINDOW_MS = 12 * 60 * 60 * 1000;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 20;

const recentViewMap = new Map();
const rateLimitMap = new Map();

function cleanupExpiredEntries(now) {
  for (const [key, expiresAt] of recentViewMap.entries()) {
    if (expiresAt <= now) {
      recentViewMap.delete(key);
    }
  }

  for (const [key, record] of rateLimitMap.entries()) {
    if (record.resetAt <= now) {
      rateLimitMap.delete(key);
    }
  }
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0].trim();
  }

  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0];
  }

  return req.socket?.remoteAddress || "unknown";
}

function getRequestHost(req) {
  const host = req.headers.host;
  if (typeof host === "string") {
    return host;
  }

  if (Array.isArray(host) && host.length > 0) {
    return host[0];
  }

  return "";
}

export function validateBlogViewRequest(req, slug) {
  const now = Date.now();
  cleanupExpiredEntries(now);

  if (typeof slug !== "string" || !/^[a-z0-9-]{3,120}$/.test(slug)) {
    return { ok: false, status: 400, error: "Invalid blog slug." };
  }

  const origin = req.headers.origin;
  const requestHost = getRequestHost(req);

  if (typeof origin === "string" && requestHost) {
    try {
      const originUrl = new URL(origin);
      if (originUrl.host !== requestHost) {
        return { ok: false, status: 403, error: "Cross-origin blog view updates are not allowed." };
      }
    } catch {
      return { ok: false, status: 400, error: "Invalid request origin." };
    }
  }

  const clientIp = getClientIp(req);
  const rateKey = `${clientIp}:${slug}`;
  const existingRate = rateLimitMap.get(rateKey);

  if (existingRate && existingRate.count >= RATE_LIMIT_MAX && existingRate.resetAt > now) {
    return { ok: false, status: 429, error: "Too many view attempts. Please try again later." };
  }

  if (existingRate && existingRate.resetAt > now) {
    existingRate.count += 1;
  } else {
    rateLimitMap.set(rateKey, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  }

  const dedupeKey = `${clientIp}:${slug}`;
  const existingView = recentViewMap.get(dedupeKey);

  if (existingView && existingView > now) {
    return { ok: false, status: 202, duplicate: true };
  }

  recentViewMap.set(dedupeKey, now + VIEW_WINDOW_MS);
  return { ok: true };
}

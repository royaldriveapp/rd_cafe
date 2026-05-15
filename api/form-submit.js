import { submitFormToWebhook } from "../server/formSubmissions.js";

const ALLOWED_FORM_TYPES = new Set(["contact", "booking"]);

function normalizeBody(req) {
  if (typeof req.body === "string") {
    return JSON.parse(req.body);
  }

  return req.body ?? {};
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const payload = normalizeBody(req);

    if (!payload || !ALLOWED_FORM_TYPES.has(payload.formType)) {
      return res.status(400).json({ error: "Invalid form submission payload" });
    }

    await submitFormToWebhook(payload, {
      webhookUrl: process.env.N8N_FORM_WEBHOOK_URL,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to submit form",
    });
  }
}

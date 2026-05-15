const DEFAULT_N8N_WEBHOOK_URL = "https://n8n.srv1343557.hstgr.cloud/webhook/rd%20cafe";

function resolveWebhookUrl(webhookUrl) {
  const candidate = webhookUrl?.trim() || DEFAULT_N8N_WEBHOOK_URL;

  try {
    return new URL(candidate).toString();
  } catch {
    throw new Error("Invalid n8n webhook URL configuration");
  }
}

export async function submitFormToWebhook(payload, options = {}) {
  const endpoint = resolveWebhookUrl(options.webhookUrl);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const responseText = await response.text().catch(() => "");
    throw new Error(responseText || `Webhook returned status ${response.status}`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  return { ok: true };
}

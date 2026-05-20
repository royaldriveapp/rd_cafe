import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { incrementBlogViewBySlug } from "./server/blogViews.js";
import { validateBlogViewRequest } from "./server/blogViewSecurity.js";
import { submitFormToWebhook } from "./server/formSubmissions.js";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: 8080,
      proxy: {
        "/studio": {
          target: "http://127.0.0.1:3333",
          changeOrigin: true,
          ws: true,
        },
      },
    },
    plugins: [
      react(),
      {
        name: "dev-api-routes",
        configureServer(server) {
          server.middlewares.use("/api/blog-view", async (req, res, next) => {
            if (req.method !== "POST") {
              return next();
            }

            try {
              const chunks = [];
              for await (const chunk of req) {
                chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
              }

              const payload = chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8")) : {};
              const validation = validateBlogViewRequest(req, payload.slug);
              if (!validation.ok) {
                res.statusCode = validation.status ?? 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(validation.duplicate ? { duplicate: true } : { error: validation.error || "Invalid request" }));
                return;
              }

              const result = await incrementBlogViewBySlug(payload.slug, {
                projectId: env.SANITY_PROJECT_ID || env.VITE_SANITY_PROJECT_ID,
                dataset: env.SANITY_DATASET || env.VITE_SANITY_DATASET,
                apiVersion: env.SANITY_API_VERSION || env.VITE_SANITY_API_VERSION,
                token: env.SANITY_API_WRITE_TOKEN,
              });

              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(result));
            } catch (error) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  error: error instanceof Error ? error.message : "Failed to increment blog views",
                })
              );
            }
          });

          server.middlewares.use("/api/form-submit", async (req, res, next) => {
            if (req.method !== "POST") {
              return next();
            }

            try {
              const chunks = [];
              for await (const chunk of req) {
                chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
              }

              const payload = chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8")) : {};

              if (!payload || !["contact", "booking"].includes(payload.formType)) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Invalid form submission payload" }));
                return;
              }

              await submitFormToWebhook(payload, {
                webhookUrl: env.N8N_FORM_WEBHOOK_URL,
              });

              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: true }));
            } catch (error) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  error: error instanceof Error ? error.message : "Failed to submit form",
                })
              );
            }
          });
        },
      },
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

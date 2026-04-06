import { defineMiddleware } from "astro:middleware";

interface RateLimitEntry {
  count: number;
  windowStart: number;
  blockedUntil: number;
}

const WINDOW_MS = 30 * 60 * 1000;  // 30 minutos
const MAX_REQUESTS = 3;
const BLOCK_MS = 30 * 60 * 1000;   // 30 minutos de bloqueo
const MAX_BODY_BYTES = 10_240;      // 10 KB

const rateLimitStore = new Map<string, RateLimitEntry>();

// Limpieza periódica para evitar crecimiento ilimitado del Map
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore) {
    if (entry.blockedUntil < now && now - entry.windowStart > WINDOW_MS) {
      rateLimitStore.delete(ip);
    }
  }
}, 60 * 60 * 1000);

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { request } = context;
  const url = new URL(request.url);

  if (request.method === "POST" && url.pathname === "/api/sendEmail.json") {
    // Límite de tamaño de request
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
      return new Response(
        JSON.stringify({ message: "Solicitud demasiado grande." }),
        { status: 413, headers: { "Content-Type": "application/json" } }
      );
    }

    // Rate limiting por IP
    const ip = getClientIp(request);
    const now = Date.now();
    const entry = rateLimitStore.get(ip);

    if (entry) {
      if (entry.blockedUntil > now) {
        const retryAfterSecs = Math.ceil((entry.blockedUntil - now) / 1000);
        return new Response(
          JSON.stringify({ message: "Demasiadas solicitudes. Intenta más tarde." }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "Retry-After": String(retryAfterSecs),
            },
          }
        );
      }

      if (now - entry.windowStart > WINDOW_MS) {
        // Ventana expirada, reiniciar
        rateLimitStore.set(ip, { count: 1, windowStart: now, blockedUntil: 0 });
      } else if (entry.count >= MAX_REQUESTS) {
        // Límite alcanzado, aplicar bloqueo
        entry.blockedUntil = now + BLOCK_MS;
        const retryAfterSecs = Math.ceil(BLOCK_MS / 1000);
        return new Response(
          JSON.stringify({ message: "Demasiadas solicitudes. Intenta más tarde." }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "Retry-After": String(retryAfterSecs),
            },
          }
        );
      } else {
        entry.count += 1;
      }
    } else {
      rateLimitStore.set(ip, { count: 1, windowStart: now, blockedUntil: 0 });
    }
  }

  return next();
});

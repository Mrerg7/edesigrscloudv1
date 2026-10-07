const CANONICAL_HOST = "edesigrs.cloud";

interface Env {
  ASSETS: Fetcher;
}

const SECURITY_HEADERS: Record<string, string> = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Content-Security-Policy":
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; img-src 'self' https://imagedelivery.net data:; font-src 'self' https://fonts.gstatic.com data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self' 'unsafe-inline'; connect-src 'self'; form-action 'self'; upgrade-insecure-requests",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const canonicalUrl = getCanonicalUrl(request.url);
    if (request.url !== canonicalUrl) {
      return Response.redirect(canonicalUrl, 301);
    }

    const asset = await env.ASSETS.fetch(request);
    const headers = new Headers(asset.headers);
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      headers.set(key, value);
    }

    const path = new URL(request.url).pathname;
    const type = headers.get("content-type") ?? "";
    if (type.includes("text/html")) {
      headers.set("Cache-Control", "public, max-age=0, must-revalidate");
    } else if (path.startsWith("/_astro/")) {
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    }

    return new Response(asset.body, {
      status: asset.status,
      statusText: asset.statusText,
      headers,
    });
  },
} satisfies ExportedHandler<Env>;

function getCanonicalUrl(rawUrl: string): string {
  const url = new URL(rawUrl);
  url.protocol = "https:";
  url.hostname = CANONICAL_HOST;
  url.hash = "";

  if (url.pathname === "/index.html") {
    url.pathname = "/";
  }

  url.pathname = url.pathname.replace(/\/{2,}/g, "/");

  if (!url.pathname.endsWith("/") && !hasFileExtension(url.pathname)) {
    url.pathname += "/";
  }

  return url.href;
}

function hasFileExtension(pathname: string): boolean {
  const segment = pathname.split("/").pop() ?? "";
  return segment.includes(".");
}

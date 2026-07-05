const CANONICAL_HOST = 'edesigrs.cloud';

interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const canonicalUrl = getCanonicalUrl(request.url);
    if (request.url !== canonicalUrl) {
      return Response.redirect(canonicalUrl, 301);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

function getCanonicalUrl(rawUrl: string): string {
  const url = new URL(rawUrl);

  url.protocol = 'https:';
  url.hostname = CANONICAL_HOST;

  if (!url.pathname.endsWith('/') && !hasFileExtension(url.pathname)) {
    url.pathname += '/';
  }

  return url.href;
}

function hasFileExtension(pathname: string): boolean {
  const segment = pathname.split('/').pop() ?? '';
  return segment.includes('.');
}

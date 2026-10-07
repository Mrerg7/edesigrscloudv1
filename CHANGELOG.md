# Changelog

## 2026-10-07

- [FEAT]: Optimization improvements for the edesigrs.cloud prospectus.
- Title and description now lead with the domain, the $149,000 ask, and a buy-now call to action.
- Removed the homepage `noindex` header on `/index.html`. `/index.html` 301s to `/`. The worker forces HTTPS, the apex host, and a trailing slash.
- Security headers on every response: HSTS, nosniff, referrer policy, frame denial, permissions policy, and a content security policy. Still on the Cloudflare Workers free plan. No paid bindings.
- Dropped Font Awesome. Icons are inline, fonts load with `preconnect` and `display=swap`.
- Product, organization, FAQ, article, and breadcrumb structured data. Removed the self-issued star rating.
- Buy now, make an offer, and contact the owner. Inquiry forms open the visitor’s own email client. Nothing is stored on the site.
- Audience filter and guide search. New pages: `/acquire/`, `/faq/`, `/privacy/`, `/guides/`, `/guides/buy-cloud-domains/`, `/guides/premium-domain-valuation/`.
- Light and dark theme, collapsible mobile nav, 48px controls, 16px body text.
- Exit note offers the acquisition page. It does not invent a discount, a viewer count, or testimonials.
- Call-to-action clicks push `{ event: "cta", cta }` onto `window.dataLayer` when that array exists. No analytics vendor is loaded, because the repo has no measurement ID. Add one in `BaseLayout.astro` before turning a pixel on.
- Canonical tags remain on every page. Sitemap is still emitted by `@astrojs/sitemap`.

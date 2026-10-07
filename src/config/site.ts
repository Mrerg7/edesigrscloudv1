export const SITE = {
  name: "edesigrs.cloud",
  brand: "eDesigrs",
  title: "edesigrs.cloud | Premium Domain for Sale | eDesigrs",
  description:
    "edesigrs.cloud is available now for $149,000. Buy this premium .cloud domain for electronic designers and AI creatives. Escrow-protected transfer. Make an offer or buy now.",
  url: "https://edesigrs.cloud",
  email: "sales@desertrich.com",
  locale: "en_US",
  location: "Phoenix, Arizona",
  price: "149000",
  priceLabel: "$149,000",
  updated: "2026-10-07",
  googleSiteVerification: "Vn6IiqZd8hm7mEkc9uZNtYxatGIN8hXRe4FFIM3NOfo",
} as const;

export const CF_IMAGES = {
  accountHash: "-sPAUAWeA405NiWJ0SNIQA",
  heroImageId: "fb7221d2-dd3f-4e87-8831-df2f1bc06b00",
} as const;

export function cfImageUrl(imageId: string, variant = "public"): string {
  return `https://imagedelivery.net/${CF_IMAGES.accountHash}/${imageId}/${variant}`;
}

export const OG_IMAGE = cfImageUrl(CF_IMAGES.heroImageId);

export type Intent = "buy" | "offer" | "contact";

export function mailto(
  intent: Intent,
  fields?: { name?: string; email?: string; offer?: string; note?: string },
) {
  const subject =
    intent === "buy"
      ? "Buy now: edesigrs.cloud at $149,000"
      : intent === "offer"
        ? "Offer for edesigrs.cloud"
        : "edesigrs.cloud acquisition inquiry";

  const lines = [
    "Hello,",
    "",
    intent === "buy"
      ? "I am prepared to acquire edesigrs.cloud at the listed price of $149,000 USD."
      : intent === "offer"
        ? "I would like to make an offer on edesigrs.cloud."
        : "I am inquiring about acquiring edesigrs.cloud.",
    "",
    fields?.name ? `Name: ${fields.name}` : "Name:",
    fields?.email ? `Email: ${fields.email}` : "Email:",
    fields?.offer ? `Offer (USD): ${fields.offer}` : intent === "offer" ? "Offer (USD):" : "",
    "Intended use:",
    fields?.note ?? "",
    "",
    "Thank you.",
  ].filter((line, index, all) => line !== "" || all[index - 1] !== "");

  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

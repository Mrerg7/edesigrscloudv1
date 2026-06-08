export const SITE = {
  name: 'edesigrs.cloud',
  title: 'edesigrs.cloud • Premium Domain for Sale | Electronic Designers & AI Creatives',
  description:
    'edesigrs.cloud — The cloud-native premium domain for electronic designers, generative artists, and AI-powered creative platforms. Built for the future of scalable, AI-driven art and design. Strategic acquisition available.',
  url: 'https://edesigrs.cloud',
  email: 'sales@desertrich.com',
  locale: 'en_US',
  location: 'Arizona',
  googleSiteVerification: 'JfhhNFIgI1LyjjTtZzTC0qG6oQeEZJTi0DO329et1bw',
} as const;

export const CF_IMAGES = {
  accountHash: '-sPAUAWeA405NiWJ0SNIQA',
  heroImageId: 'fb7221d2-dd3f-4e87-8831-df2f1bc06b00',
} as const;

export function cfImageUrl(imageId: string, variant = 'public'): string {
  return `https://imagedelivery.net/${CF_IMAGES.accountHash}/${imageId}/${variant}`;
}

export const OG_IMAGE = cfImageUrl(CF_IMAGES.heroImageId);

export const ACQUISITION_MAILTO = `mailto:${SITE.email}?subject=${encodeURIComponent('edesigrs.cloud Domain Acquisition Inquiry')}&body=${encodeURIComponent('Hello,\n\nI am interested in acquiring edesigrs.cloud.\n\nIntended use:\nBudget range:\n\nThank you.')}`;

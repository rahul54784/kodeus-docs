/** Absolute URL for public assets when docs are proxied (e.g. warren.kodeus.ai/docs). */
export function publicAssetUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  return siteUrl ? `${siteUrl}${normalized}` : normalized;
}

/** Resolve MDX image src — string paths or Next.js StaticImageData objects. */
export function resolveImageSrc(src: unknown): string | undefined {
  if (!src) return undefined;

  if (typeof src === 'string') {
    return publicAssetUrl(src);
  }

  if (typeof src === 'object') {
    const record = src as { default?: { src?: string }; src?: string };
    const path =
      typeof record.default?.src === 'string'
        ? record.default.src
        : typeof record.src === 'string'
          ? record.src
          : undefined;

    if (path) {
      return path.startsWith('http://') || path.startsWith('https://')
        ? path
        : publicAssetUrl(path);
    }
  }

  return undefined;
}

export const appName = 'Kodeus';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const ogImagePath = '/og.png';
export const docsContentRoute = '/llms.mdx/docs';

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: 'fuma-nama',
  repo: 'fumadocs',
  branch: 'main',
};

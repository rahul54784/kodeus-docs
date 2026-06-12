/** Absolute URL for public assets when docs are proxied (e.g. warren.kodeus.ai/docs). */
export function publicAssetUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  return siteUrl ? `${siteUrl}${normalized}` : normalized;
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

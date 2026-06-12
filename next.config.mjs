import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

// Netlify sets URL at build time (e.g. https://magenta-cannoli-ae5215.netlify.app).
// Absolute asset URLs let warren.kodeus.ai/docs work with only a /docs/* proxy.
const siteUrl = process.env.URL?.replace(/\/$/, '');

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  assetPrefix: siteUrl || undefined,
  images: {
    // Avoid /_next/image on the proxy host; MDX uses plain <img> with publicAssetUrl().
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_SITE_URL: siteUrl ?? '',
  },
};

export default withMDX(config);

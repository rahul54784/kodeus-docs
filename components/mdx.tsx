import defaultMdxComponents from 'fumadocs-ui/mdx';
import { cn } from '@/lib/cn';
import { resolveImageSrc } from '@/lib/shared';
import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';

function DocsImage({ src, alt, className, ...props }: ComponentProps<'img'>) {
  const resolvedSrc = resolveImageSrc(src);

  return (
    // eslint-disable-next-line @next/next/no-img-element -- proxied docs need direct asset URLs, not /_next/image
    <img
      {...props}
      src={resolvedSrc}
      alt={alt ?? ''}
      className={cn('rounded-lg', className)}
    />
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    img: DocsImage,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}

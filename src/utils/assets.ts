import type { ImageMetadata } from 'astro';

const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/*.{jpeg,jpg,png,gif,webp,svg}');

export async function resolveImage(filename: string): Promise<ImageMetadata | null> {
  if (!filename) return null;
  const cleanName = filename.replace(/^\/?(src\/assets\/images\/|assets\/images\/|images\/|assets\/)?/, '');
  const key = `/src/assets/images/${cleanName}`;
  if (images[key]) {
    const mod = await images[key]();
    return mod.default;
  }
  return null;
}

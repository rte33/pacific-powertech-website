import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

export function loadYaml<T = any>(relPath: string): T {
  const fullPath = path.join(CONTENT_DIR, relPath);
  const raw = fs.readFileSync(fullPath, 'utf-8');
  return yaml.load(raw) as T;
}

export function getSiteSettings() {
  return loadYaml('settings/site.yaml');
}

export function getClients() {
  return loadYaml('settings/clients.yaml');
}

export function getHomePage() {
  return loadYaml('pages/home.yaml');
}

export function getAboutPage() {
  return loadYaml('pages/about.yaml');
}

export function getContactPage() {
  return loadYaml('pages/contact.yaml');
}

export function getAllProductSlugs() {
  const productsDir = path.join(CONTENT_DIR, 'pages', 'products');
  const files = fs.readdirSync(productsDir);
  return files
    .filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'))
    .map((f) => f.replace(/\.(yaml|yml)$/, ''))
    .filter((slug) => slug !== 'services'); // services has its own dedicated /services page
}

export function getProductBySlug(slug: string) {
  const filePath = path.join('pages', 'products', `${slug}.yaml`);
  return loadYaml(filePath);
}

export function getServicesPage() {
  return loadYaml('pages/products/services.yaml');
}

/**
 * Normalizes an internal path to account for Astro's base URL (e.g. for GitHub Pages subpath deployment)
 */
export function formatUrl(rawUrl: string, base: string = import.meta.env.BASE_URL || '/'): string {
  if (!rawUrl) return base;
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://') || rawUrl.startsWith('mailto:') || rawUrl.startsWith('tel:') || rawUrl.startsWith('#')) {
    return rawUrl;
  }
  
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = rawUrl.startsWith('/') ? rawUrl : `/${rawUrl}`;
  
  return `${cleanBase}${cleanPath}` || '/';
}


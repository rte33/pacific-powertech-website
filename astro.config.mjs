import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : 'pacific-powertech-website';
const owner = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[0] : 'rte33';

// When building on GitHub Actions or with repo subpath, prefix with repository name
const site = process.env.SITE_URL || (process.env.CI ? `https://${owner}.github.io` : 'https://www.pacificpowertech.com.bd');
const base = process.env.BASE_PATH !== undefined ? process.env.BASE_PATH : `/${repo}`;

export default defineConfig({
  site,
  base,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    remotePatterns: [],
  },
  build: {
    format: 'directory',
  },
});

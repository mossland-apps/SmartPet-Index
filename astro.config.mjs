import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://smartpetindex.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
});

import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://anupsahoo.github.io',
  output: 'static',
  integrations: [mdx(), tailwind()],
  build: {
    format: 'file'
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});

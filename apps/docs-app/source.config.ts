import { defineConfig } from 'fumadocs-mdx/config';
import remarkCjkFriendly from 'remark-cjk-friendly';

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkCjkFriendly],
  },
});

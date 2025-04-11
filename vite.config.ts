import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { fileURLToPath, URL } from 'node:url'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import mdx from '@mdx-js/rollup'
import VueRouter from 'unplugin-vue-router/vite'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    mdx({
      jsxImportSource: 'vue',
      remarkPlugins: [remarkGfm, remarkToc],
      rehypePlugins: [rehypeSlug],
    }),
    paraglideVitePlugin({ project: './project.inlang', outdir: './src/shared/lib/i18n', cookieName: 'locale' }),
    // paraglide({
    //   project: "./project.inlang", //Path to your inlang project
    //   outdir: "./src/shared/lib/i18n", //Where you want the generated files to be placed
    // }),
    Icons({
      compiler: 'vue3',
      defaultClass: 'size-4 flex-shrink-0',
    }),
    VueRouter({
      routesFolder:"src/routes"
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@i18n': fileURLToPath(new URL('./src/shared/lib/i18n', import.meta.url)),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      // Proxy API requests to the proper server
      '/api': {
        target: 'https://api-login.actsone.io.vn',
        changeOrigin: true,
        secure: false
      }
    }
  },
  preview:{
    port: 8080,
    host: true,
  }
})

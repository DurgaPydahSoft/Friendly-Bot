import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

/**
 * Build the embeddable widget as a single JS file (embed.js).
 * Run: npm run build:embed
 * Output: dist/embed.js — host sites load this and call EmbedBot.init({ apiUrl: '...' })
 */
export default defineConfig({
  plugins: [react(), tailwindcss(), cssInjectedByJsPlugin()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: 'src/embed.jsx',
      name: 'EmbedBot',
      fileName: () => 'embed.js',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        intro: "(function(){if(typeof process==='undefined'&&typeof window!=='undefined'){window.process={env:{NODE_ENV:'production'}};}})();",
      },
    },
    outDir: 'dist',
    emptyOutDir: false,
    sourcemap: true,
    minify: true,
  },
})

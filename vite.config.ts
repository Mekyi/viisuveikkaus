import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

const htmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html: any) {
      return html.replace(/<title>(.*?)<\/title>/, `<title>Viisuveikkaus</title>`)
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    VueDevTools(),

    // @quasar/plugin-vite options list:
    // https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
    quasar({
      sassVariables: 'src/styles/quasar-variables.sass',
      autoImportComponentCase: 'pascal'
    }),
    htmlPlugin()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: '/viisuveikkaus/'
})

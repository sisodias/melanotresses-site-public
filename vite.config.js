import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'open-chat-widget-tailwind-compat',
      enforce: 'pre',
      resolveId(source, importer) {
        const cleanSource = source.split('?')[0]
        const cleanImporter = importer?.split('?')[0] || ''
        if (
          cleanSource.endsWith('/@openchatwidget/sdk/dist/index.css') ||
          (source === './index.css' && cleanImporter.endsWith('/@openchatwidget/sdk/dist/index.js'))
        ) {
          return '\0openchatwidget-empty-css'
        }
        return null
      },
      load(id) {
        if (id === '\0openchatwidget-empty-css') return ''
        return null
      },
      transform(code, id) {
        const cleanId = id.split('?')[0]
        if (!cleanId.endsWith('/@openchatwidget/sdk/dist/index.js')) return null

        // The SDK bundles a Tailwind 4 global reset in its package entry. Its
        // runtime already injects the widget-scoped CSS, so strip only that
        // incompatible global import before this Tailwind 3 app processes it.
        return {
          code: code.replace(/import ["']\.\/index\.css["'];?\s*/g, ''),
          map: null,
        }
      },
    },
  ],
})

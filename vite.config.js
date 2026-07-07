import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { localBlogApi } from './vite-plugin-blog.js'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localBlogApi()],
  resolve: {
    alias: {
      '@mantine': path.resolve(__dirname, 'node_modules/@mantine')
    }
  }
})

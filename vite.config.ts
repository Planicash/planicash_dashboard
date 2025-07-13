import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import path from 'path'

export default defineConfig({
  plugins: [
    preact(),

  ],
  optimizeDeps: {
    include: ['tslib'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      tslib: 'tslib',
    },
  },
})

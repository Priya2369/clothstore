import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': '"development"',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    deps: {
      optimizer: {
        web: {
          include: ['react', 'react-dom'],
        },
      },
    },
  },
})

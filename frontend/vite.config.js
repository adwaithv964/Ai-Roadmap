import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add this 'server' section to connect to backend
  server: {
    proxy: {
      // Any request starting with /api will be forwarded
      '/api': {
        target: 'http://localhost:5000', // The address of backend server
        changeOrigin: true, // Recommended for this setup
        secure: false,      // Recommended for local development
      },
    }
  },
  build: {
    outDir: 'dist',
  },
})


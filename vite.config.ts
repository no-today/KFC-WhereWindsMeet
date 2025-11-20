import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This ensures the API key from Cloudflare env vars is embedded into the build
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
})
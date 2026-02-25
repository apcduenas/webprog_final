import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// VITE_BASE controls base path per platform:
//   GitHub Pages: '/webprog_final/' (set in deploy.yml)
//   Vercel:       '/'              (set in Vercel env vars)
export default defineConfig({
  plugins: [react()],
  // Automatically detect Vercel or Render environment
  base: (process.env.VERCEL || process.env.RENDER) ? '/' : (process.env.VITE_BASE || '/webprog_final/'),
})

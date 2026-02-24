import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// VITE_BASE env variable controls the deployment base path:
//   - GitHub Pages: '/webprog_final/'  (default, set in deploy.yml)
//   - Vercel:       '/'                (set as env var in Vercel dashboard)
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/webprog_final/',
})

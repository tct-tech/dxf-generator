/**
 * @Author: Your name
 * @Date:   2024-01-29 10:51:39
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-01-29 12:44:42
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/dxf-generator",
  plugins: [react()],
})

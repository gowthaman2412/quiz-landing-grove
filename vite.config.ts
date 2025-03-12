
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import path from 'path'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig(() => ({
  plugins: [react(),tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
  },
  // resolve: {
  //   alias: {
  //     '@assets': path.resolve(__dirname, '../../../packages/assets'),
  //   }
  // },
  server: {
    port: 8080
  }
}));


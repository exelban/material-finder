import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "tailwindcss"

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    host: "0.0.0.0",
    port: 47007,
  }
})

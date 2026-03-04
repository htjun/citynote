import path from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { adminApiPlugin } from "./src/api-plugin"

export default defineConfig({
  plugins: [react(), adminApiPlugin()],
  resolve: {
    alias: {
      "@citynote/data": path.resolve(__dirname, "../../data"),
      "@": path.resolve(__dirname, "../.."),
    },
  },
  server: {
    port: 5100,
  },
})

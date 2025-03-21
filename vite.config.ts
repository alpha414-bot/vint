import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src"
    },
  },
  define: {
    global: {},
  },
});

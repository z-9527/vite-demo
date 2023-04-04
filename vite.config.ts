import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import autoRouter from "./vite-plugins/vite-plugin-react-auto-router";
import mockServer from "./vite-plugins/vite-plugin-mock-server";
import pxtorem from "postcss-pxtorem";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), autoRouter(), mockServer()],
  resolve: {
    alias: {
      "@": path.resolve("src"),
    },
  },
  base: "./",
  server: {
    port: 8000,
  },
  preview: {
    open: true,
    port: 8888,
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
    cssCodeSplit: false,
  },
  css: {
    postcss: {
      plugins: [
        pxtorem({
          rootValue: 16,
          unitPrecision: 5,
          propList: ["*"],
          selectorBlackList: [],
          replace: true,
          mediaQuery: false,
          minPixelValue: 0,
          exclude: /node_modules/i,
        }),
      ],
    },
  },
});
